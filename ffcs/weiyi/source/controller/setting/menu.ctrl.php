<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
require IA_ROOT . '/source/class/tree.class.php';
$tree = new tree();

$do = !empty($_GPC['do']) ? $_GPC['do'] : '';
$table_name = 'ims_menu';

$arr_modules = pdo_fetchall("SELECT name FROM " . tablename('modules') . " ORDER BY `name`");

if ($do == 'add') {
	if ($_GPC['dosubmit']) {
		$info = $_GPC['info'];
		$bool = pdo_insert('menu', $info);
		if($bool === false){
			message('菜单添加失败',create_url('setting/menu'));
		}else{
			message('菜单添加成功',create_url('setting/menu/add'));
		}
	}
	$show_validator = '';
	
	$sql = "select * from ".$table_name." order by listorder ASC,id DESC";
	$result = pdo_fetchall($sql);
	
	$array = array();
	foreach($result as $r) {
		$r['cname'] = $r['ch_name'];
	//	$r['selected'] = $r['id'] == $_GPC['parentid'] ? 'selected' : '';
		if($r['selected'] = $r['id'] == $_GPC['parentid']){
			$r['selected'] = 'selected';
			if($r['parentid'] == 0) $icon_flag = 1;
		}else{
			$r['selected'] = '';
		}
		$array[] = $r;
	}
	$str  = "<option value='\$id' \$selected>\$spacer \$cname</option>";
	$tree->init($array);
	$select_categorys = $tree->get_tree(0, $str);
	
	template('setting/menu/add');
}elseif($do == 'edit'){
	if($_GPC['dosubmit']){
		$id = intval($_GPC['id']);
		$info = $_GPC['info'];
		$info['data'] = htmlspecialchars_decode(htmlspecialchars_decode($info['data']));
		pdo_update('menu', $info, array('id' => $id));
		message('菜单更新成功',create_url('setting/menu/edit',array('id'=>$id)));
	}
	
	$show_validator = $array = $r = '';
	
	$id = intval($_GPC['id']);
	$sql = "select * from ".$table_name." where id = ".$id;
	$rs = pdo_fetch($sql);
	if($rs) extract($rs);
	
	$sql = "select * from ".$table_name." order by listorder ASC,id DESC";
	$result = pdo_fetchall($sql);
	foreach($result as $r) {
		$r['cname'] = $r['ch_name'];
		$r['selected'] = $r['id'] == $parentid ? 'selected' : '';
		$array[] = $r;
	}
	$str  = "<option value='\$id' \$selected>\$spacer \$cname</option>";
	$tree->init($array);
	$select_categorys = $tree->get_tree(0, $str);
	
	template('setting/menu/add');
}elseif($do == 'listorder'){
	if(isset($_POST['dosubmit'])) {
		foreach($_POST['listorders'] as $id => $listorder) {
			pdo_update('menu', array('listorder'=>$listorder), array('id'=>$id));
		}
		message('排序成功', create_url('setting/menu'));
	} else {
		message('排序失败', create_url('setting/menu'));
	}
}elseif($do == 'delete'){
	$id = intval($_GPC['id']);
	$bool = pdo_delete('menu', array('id'=>$id));
	if($bool === false){
		message('删除菜单失败', create_url('setting/menu'));
	}else{
		message('删除菜单成功', create_url('setting/menu'));
	}
}else{
	$tree->icon = array('&nbsp;&nbsp;&nbsp;│ ','&nbsp;&nbsp;&nbsp;├─ ','&nbsp;&nbsp;&nbsp;└─ ');
	$tree->nbsp = '&nbsp;&nbsp;&nbsp;';
	$userid = $_SESSION['userid'];
	$admin_username = $_W['username'];
	
	$table_name = 'ims_menu';
	$sql = "select * from ".$table_name." order by listorder ASC,id DESC";
	$result = pdo_fetchall($sql);
	
	$array = array();
	foreach($result as $r) {
		$r['cname'] = $r['ch_name'];
		$r['str_manage'] = '<a class="btn btn-success btn-minier" href="setting.php?act=menu&do=add&parentid='.$r['id'].'">添加子菜单</a> <a class="btn btn-info btn-minier" href="setting.php?act=menu&do=edit&id='.$r['id'].'">修改</a> <a class="btn btn-danger btn-minier" href="javascript:confirmurl(\'setting.php?act=menu&do=delete&id='.$r['id'].'\',\'确认要删除吗?\')">删除</a> ';
		//$r['str_manage'] = '<a class="btn btn-success" href="?m=admin&c=menu&a=add&parentid='.$r['id'].'&menuid='.$_GPC['menuid'].'">添加子菜单</a> <a class="btn btn-info" href="?m=admin&c=menu&a=edit&id='.$r['id'].'&menuid='.$GPC['menuid'].'">修改</a> <a class="btn btn-danger" href="javascript:confirmurl(\'?m=admin&c=menu&a=delete&id='.$r['id'].'&menuid='.$_GPC['menuid'].'\',\'确认要删除吗?\')">删除</a> ';
		$array[] = $r;
	}
	
	$str  = "<tr>
	<td align='center'><input name='listorders[\$id]' type='text' size='3' value='\$listorder' class='input-text-c' style='width:40px;height:24px;'></td>
	<td align='center'>\$id</td>
	<td >\$spacer\$cname</td>
	<td align='center'>\$str_manage</td>
	</tr>";
	$tree->init($array);
	$categorys = $tree->get_tree(0, $str);
	
	template('setting/menu/list');
}

