<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
checkaccount();
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';

if ($do == 'display') {
	if (checksubmit('submit')) {
		if (!empty($_GPC['delete'])) {
			pdo_query("DELETE FROM ".tablename('members_group')." WHERE id IN ('".implode("','", $_GPC['delete'])."')");
		}
		message('用户组更新成功！', referer(), 'success');
	}
	$list = pdo_fetchall("SELECT * FROM ".tablename('members_group'));
	if (!empty($list)) {
		foreach ($list as &$row) {
			if (!empty($row['modules'])) {
				$modules = iunserializer($row['modules']);
				if (is_array($modules)) {
					$row['modules'] = pdo_fetchall("SELECT name, title FROM ".tablename('modules')." WHERE mid IN ('".implode("','", $modules)."')");
				}
			}
			if (!empty($row['templates'])) {
				$templates = iunserializer($row['templates']);
				if (is_array($templates)) {
					$row['templates'] = pdo_fetchall("SELECT name, title FROM ".tablename('site_templates')." WHERE id IN ('".implode("','", $templates)."')");
				}
			}
		}
	}
} elseif ($do == 'get_members') {
    $back = '';
    $groupid = intval($_GPC['groupid']);
    $uid = intval($_GPC['uid']);
    if($groupid!=0){
        $son_members  = pdo_fetchall("SELECT * FROM ".tablename('members')." WHERE groupid='".$groupid."'");
        foreach($son_members as $son_mem){
            $back .= '<option value="'.$son_mem['uid'].'"';
            if($son_mem['uid']==$uid){
                $back .= ' selected="selected"';
            }
            $back .= '>'.$son_mem['username'].'</option>';
        }
    }else{
        $back .= '<option value="0">无</option>';
    }
    echo $back;exit;
} elseif ($do == 'post') {
	$id = intval($_GPC['id']);
	$modules = $_W['modules'];
	if (!empty($id)) {
		$item = pdo_fetch("SELECT * FROM ".tablename('members_group') . " WHERE id = :id", array(':id' => $id));
		$item['modules'] = iunserializer($item['modules']);
		$item['templates'] = iunserializer($item['templates']);
        if($item['parent_ids']){
            $item['parent_group'] = pdo_fetchcolumn("SELECT groupid FROM ".tablename('members') . " WHERE uid = :uid", array(':uid' => $item['parent_ids']));
        }
	}
    //搜出前2级用户组
    $arr_groups = array();
	$top_groups  = pdo_fetchall("SELECT * FROM ".tablename('members_group')." WHERE parent_ids='0' and id!='$id'");
    foreach($top_groups as $top_group){
        $arr_groups[$top_group['id']] = $top_group['name'];
        $top_members  = pdo_fetchall("SELECT * FROM ".tablename('members')." WHERE groupid='".$top_group['id']."'");
        foreach ($top_members as $top_mem) {
            $sec_groups  = pdo_fetchall("SELECT * FROM ".tablename('members_group')." WHERE parent_ids='".$top_mem['uid']."' and id!='$id'");
            foreach ($sec_groups as $sec_group) {
                $arr_groups[$sec_group['id']] = $sec_group['name'];
            }
        }
    }
	$templates  = pdo_fetchall("SELECT * FROM ".tablename('site_templates'));
	if (checksubmit('submit')) {
		if (empty($_GPC['name'])) {
			message('请输入用户组名称！');
		}
		$data = array(
			'name' => $_GPC['name'],
			'modules' => iserializer($_GPC['modules']),
			'templates' => iserializer($_GPC['templates']),
			'maxaccount' => intval($_GPC['maxaccount']),
			'parent_ids' => $_GPC['parent_ids'],
		);
		if (empty($id)) {
			pdo_insert('members_group', $data);
		} else {
			pdo_update('members_group', $data, array('id' => $id));
		}
        //处理菜单
        //查询没有权限的模块名
        $no_modules_sql = '';
        if($_GPC['modules']){
            $no_modules_sql = " WHERE mid not in (".implode(',',$_GPC['modules']).")";
        }
        $no_modules = pdo_fetchall("SELECT name FROM ".tablename('modules').$no_modules_sql);
        foreach ($no_modules as $no_mod) {
            pdo_query("DELETE FROM ".tablename('menu_priv')." WHERE groupid='".$id."' and menuid in (SELECT id FROM ".tablename('menu')." WHERE modules='".$no_mod['name']."')");
        }
        message('用户组更新成功！', create_url('member/group/display'), 'success');
	}
}elseif($do == 'priv'){
	/**
	 * 用户组权限设置
	 */
	if(isset($_GPC['dosubmit'])){
		$groupid = !empty($_GPC['groupid']) ? intval($_GPC['groupid']) : 0; 
		if (is_array($_GPC['menuid']) && count($_GPC['menuid']) > 0) {
			pdo_delete('menu_priv', array('groupid'=>$groupid));
			$menuinfo = pdo_fetchall('select id from ims_menu');
			foreach ($menuinfo as $_v) $menu_info[$_v[id]] = $_v;
			$now = time();
			foreach($_GPC['menuid'] as $menuid){
				$info = array();
				$info['groupid'] = $groupid;
				$info['menuid'] = $menuid;
				$info['create_time'] = $now;
				pdo_insert('menu_priv', $info);
			}
		} else {
			pdo_delete('menu_priv', array('groupid'=>$groupid));
		}
		message('', create_url('member/group/priv', array('id'=>$groupid)));

	} else {
		$groupid = intval($_GPC['id']);
		
		set_time_limit(120);
		require IA_ROOT . '/source/class/tree.class.php';
		$menu = new tree();
		$menu->icon = array('│ ','├─ ','└─ ');
		$menu->nbsp = '&nbsp;&nbsp;&nbsp;';
		//取所有的菜单
		$result = pdo_fetchall('select * from ims_menu order by listorder asc');
        //获取没有权限的模块名,除去系统模块
        $member_group_modules = pdo_fetchcolumn("SELECT modules FROM ".tablename('members_group')." WHERE id='".$groupid."'");
        $mod_data = iunserializer($member_group_modules);
        $sys_moduleses = pdo_fetchall("SELECT mid FROM ".tablename('modules')." WHERE issystem='1'");
        foreach($sys_moduleses as $sys_modules){
            $mod_data[] = $sys_modules['mid'];
        }
        $no_modules = pdo_fetchall("SELECT name FROM ".tablename('modules')." WHERE mid not in (".implode(',',$mod_data).")");
        if(!empty($no_modules)){
            foreach ($no_modules as $no_mod){
                $arr_no_mod[] = $no_mod['name'];
            }
        }
		//获取权限表数据
		$priv_data = pdo_fetchall('select menuid from ims_menu_priv where groupid = '.$groupid);
		if(!empty($priv_data)){
			foreach ($priv_data as $pr){
				$privs[] = $pr['menuid'];
			}
		}
		foreach ($result as $n=>$t) {
			$result[$n]['cname'] = $t['ch_name'];
			$result[$n]['checked'] = is_checked($t['id'], $privs) ? ' checked' : '';
            if(!empty($arr_no_mod)&&in_array($t['modules'],$arr_no_mod)){
                $result[$n]['checked'] = 'disabled="disabled"';
            }
			$result[$n]['level'] = get_level($t['id'],$result); 	//注意，如果parentid与id相同，会导致死循环而无法显示菜单，如果菜单无法显示，请检查menu表的数据
			$result[$n]['parentid_node'] = ($t['parentid'])? ' class="child-of-node-'.$t['parentid'].'"' : '';
		}
		$str  = "<tr id='node-\$id' \$parentid_node>
		<td style='padding-left:30px;line-height:20px;'>\$spacer<input type='checkbox' name='menuid[]' value='\$id' level='\$level' \$checked onclick='javascript:checknode(this);'> \$cname</td>
		</tr>";
		$menu->init($result);
		$categorys = $menu->get_tree(0, $str);
		$show_header = true;
		$show_scroll = true;
		template('member/priv');
		die();
	}
	
}

/**
 *  检查指定菜单是否有权限
 * @param array $data menu表中数组
 * @param int $roleid 需要检查的角色ID
 */
function is_checked($data, $priv_data = array()) {
	if(!empty($priv_data)){
		$info = in_array($data, $priv_data);
		if($info){
			return true;
		} else {
			return false;
		}
	}
	return false;
}
/**
 * 获取菜单深度
 * @param $id
 * @param $array
 * @param $i
 */
function get_level($id,$array=array(),$i=0) {
	if(!empty($array)){
		foreach($array as $n=>$value){
			if($value['id'] == $id){
				if($value['parentid']== '0') return $i;
                else continue;
				$i++;
				return get_level($value['parentid'],$array,$i);
			}
		}
	}
}
template('member/group');