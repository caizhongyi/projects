<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 14-3-17
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');
class BusinessofficeModuleSite extends WeModuleSite{

    public function doWebDisplay()
    {
        global $_GPC, $_W;
        $jt_account = 0;
        $sj_account = 0;
        $tj_account = 0;
        $uid = $_W['uid'];

        //获取用户身份信息
        $userinfo = pdo_fetch("SELECT * FROM ".tablename('members')." WHERE uid = :uid" , array(':uid' => $uid));
        $groupid = $userinfo['groupid'];
        $isexit = pdo_fetch("SELECT * FROM ".tablename('members_group')." WHERE id = :id" , array(':id' => $groupid));
        if ($isexit){
            if ($isexit['parent_ids']==0){
                $jt_account = 1;
            }elseif ($isexit['parent_ids']!=0){
                $is_exit = pdo_fetch("SELECT * FROM ".tablename('members_group')." WHERE parent_ids = :parent_ids" , array(':parent_ids' => $userinfo['uid']));
                if ($is_exit){
                    $sj_account = 1;
                }else{
                    $tj_account = 1;
                }
            }
        }

        $type =  empty($_GPC['type']) ? 1 : $_GPC['type'];
        $do = isset($_GPC['foo'])&&!empty($_GPC['foo']) ? trim($_GPC['foo']) : 'display';

        //获取当前用户的父用户组信息
        $members_group =  pdo_fetch("SELECT * FROM ".tablename('members_group')." WHERE id = :id" , array(':id' => $userinfo['groupid']));
        if (!empty($members_group)) {
            $group_id = $members_group['parent_ids'];
        }else {
            $group_id = 0;
        }

        //获取接受文件库信息
        $libry_log = array();
        $_libry_log =  pdo_fetchall("SELECT * FROM ".tablename('businessoffice_library_log')." WHERE uid = :uid", array(':uid' => $_W['uid']));
        if (is_array($_libry_log)){
            foreach ($_libry_log as  $log_key => $log_value){
                $libry_log[$log_value['library_id']] = $log_value['flag'];
            }
        }

        //获取当前用户的生成的规则信息
        $rule_info = array();
        $_rule_info = pdo_fetchall("SELECT * FROM ".tablename('businessoffice_library_log')." WHERE uid = :uid and flag = 1", array(':uid' => $_W['uid']));
        if (is_array($_rule_info)){
            foreach ($_rule_info as  $rule_key => $rule_value){
                $rule_info[$rule_value['library_id']] = $rule_value['rid'];
            }
        }

        //获取资源库文件分类信息
        $category_info = array();
        $_category_info = pdo_fetchall("SELECT distinct(category),cat_id FROM ".tablename('businessoffice_library_cat')." WHERE type_id = :type", array('type' => $type));
        if (is_array($_category_info)){
            foreach ($_category_info as  $cat_key => $cat_value){
                $category_info[$cat_value['cat_id']] = $cat_value['category'];
            }
        }

        $selct_cat_info = array();
        $con = '';
        if ($tj_account==1){
            $con = " and lib_status !=-1 ";
        }
        $_select_cat_info = pdo_fetchall("SELECT distinct(category),lib.cat_id from ".tablename('businessoffice_library'). " lib INNER join". tablename('businessoffice_library_cat').  "lib_cat on lib.cat_id=lib_cat.cat_id where type_id = :type ".$con , array('type' => $type));;
        if (is_array($_select_cat_info)){
            foreach ($_select_cat_info as  $scat_key => $scat_value){
                $selct_cat_info[$scat_value['cat_id']] = $scat_value['category'];
            }
        }

        //获取资源库的状态信息及分类信息
        $status_info = array();
        $library_info = pdo_fetchall("SELECT distinct(lib_status) from ".tablename('businessoffice_library'). " lib INNER join". tablename('businessoffice_library_cat').  "lib_cat on lib.cat_id=lib_cat.cat_id where type_id = :type", array('type' => $type));
        if (is_array($library_info)){
            foreach ($library_info as  $lib_key => $lib_value){
                $status_info[] = $lib_value['lib_status'];
            }
        }

        if($do == "display"){
            $condition = '';
            $pindex = max(1, intval($_GPC['page']));
            $psize = 50;
            $keyword = $_GPC['keyword'];
            $starttime = empty($_GPC['start']) ? strtotime('-1 year') : strtotime($_GPC['start']);
            $endtime = empty($_GPC['end']) ? TIMESTAMP : strtotime($_GPC['end']) + 86399;
            $where = '';
            $where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";
            if(!empty($keyword)){
                $where .= " AND title like '%".$keyword."%'";
            }

            //根据登录用户的身份信息加载相应的数据
            if ($sj_account==1 && $type==2){
                $condition = " and uid=$group_id  and lib_status!=-1";
            }elseif ($sj_account==1 && $type == 1){
                if (!empty($_GPC['cate_1']) && $_GPC['cate_1']!=-2){
                    $condition = " and uid = {$_W['uid'] } and  parent_uid=0 and lib_status = {$_GPC['cate_1']} ";
                }else{
                    $condition = " and uid = {$_W['uid'] } and  parent_uid=0 ";
                }

            }elseif ($tj_account==1){
                $condition = " and uid=$group_id and lib_status!=-1";
            }else{
                if ((!empty($_GPC['cate_1']) && $_GPC['cate_1']!=0) || !empty($_GPC['cate_2']) && $_GPC['cate_2']!=-2){
                    if ($_GPC['cate_1']!=0){
                        $condition = " and uid = {$_W['uid'] } and  lib.cat_id = {$_GPC['cate_1']} ";
                    }
                    if ($_GPC['cate_2']!=-2){
                        $condition = " and uid = {$_W['uid'] } and lib_status = {$_GPC['cate_2']} ";
                    }
                    if ($_GPC['cate_1']!=0 && $_GPC['cate_2']!=-2){
                        $condition = " and uid = {$_W['uid'] } and lib_status = {$_GPC['cate_2']} and lib.cat_id = {$_GPC['cate_1']} ";
                    }

                }else{
                    $condition = " and uid = {$_W['uid'] } ";
                }
            }
            $list = pdo_fetchall("SELECT * from ".tablename('businessoffice_library'). " lib INNER join". tablename('businessoffice_library_cat').  "lib_cat on lib.cat_id=lib_cat.cat_id where type_id = :type " .$condition ."  $where ORDER BY id DESC LIMIT " . ($pindex - 1) * $psize . ',' . $psize, array('type' => $type));
            $total = pdo_fetchcolumn("SELECT count(*) from ".tablename('businessoffice_library'). " lib INNER join". tablename('businessoffice_library_cat').  "lib_cat on lib.cat_id=lib_cat.cat_id where type_id = :type " .$condition ."  $where " , array('type' => $type));
            $pager = pagination($total, $pindex, $psize);
        }elseif($do == "post"){
            $id = intval($_GPC['id']);
            if (!empty($id)) {
                $item = pdo_fetch("SELECT * FROM ".tablename('businessoffice_library')." WHERE id = :id" , array(':id' => $id));
            }

            if (checksubmit('submit')) {
                if (empty($_GPC['cate_1'])) {
                    message('分类不能为空，请选择分类！');
                }
                if (empty($_GPC['title'])) {
                    message('标题不能为空，请输入标题！');
                }
                if (empty($_GPC['content'])) {
                    message("内容不能为空，请输入！");
                }
                if (empty($_GPC['keyword'])) {
                    message("关键字不能为空，请输入！");
                }else{
                    if (isset($_GPC['b_falg']) && $_GPC['b_falg']==1){
                        $isexit = '';
                    }else{
                        $isexit = pdo_fetch("SELECT * FROM ".tablename('businessoffice_library')." WHERE keyword = :keyword or title = :title" , array( ':keyword' => $_GPC['keyword'], ':title' => $_GPC['title']));
                        if ($_GPC['title']==$isexit['title']){
                            message("文件库标题已经存在，请换个标题！");
                        }
                        if ($_GPC['keyword']==$isexit['keyword']){
                            message("该关键字已经存在，请换个关键字！");
                        }
                    }
                }

                $data = array(
                    'uid' => $userinfo['uid'],
                    'groupid' => $userinfo['groupid'],
                    'title' => $_GPC['title'],
                    'keyword' => $_GPC['keyword'],
                    'description' => $_GPC['description'],
                    'createtime' => TIMESTAMP,
                    'content' =>  htmlspecialchars_decode($_GPC['content']),
                    'lib_status' => 1,
                    'cat_id' => $_GPC['cate_1']
                );

                if (!empty($_FILES['thumb']['tmp_name'])) {
                    file_delete($_GPC['thumb_old']);
                    $upload = file_upload($_FILES['thumb']);
                    if (is_error($upload)) {
                        message($upload['message'], '', 'error');
                    }
                    $data['thumb'] = $upload['path'];
                } elseif (!empty($_GPC['autolitpic'])) {
                    $match = array();
                    preg_match('/attachment\/(.*?)["|\&quot\;]/', $_GPC['content'], $match);
                    if (!empty($match[1])) {
                        $data['thumb'] = $match[1];
                    }
                }
                //$data['thumb'] = $_W['attachurl'].$data['thumb'];
                if (empty($id)) {
                    pdo_insert('businessoffice_library', $data);
                } else {
                    unset($data['createtime']);
                    $data['lib_status'] = 1;
                    pdo_update('businessoffice_library', $data, array('id' => $id));
                }

                 message('添加库文件成功！',create_url('site/module', array('do' => 'display', 'name'=>'businessoffice', 'type' => $type)), 'success');
            }
        }elseif ($do == 'delete'){
            $id = intval($_GPC['id']);
            pdo_update('businessoffice_library', array('lib_status' => -1), array('id' => $id));
            $this->delLibrary($id, $sj_account, $jt_account);

           message('删除成功！', referer(), 'success');
        }
        include $this->template('library');
    }

    public  function  doWebStatistical()
    {
        global $_W, $_GPC;
        $lib_id = $_GPC['id'];
        $condition = '';
        $where = '';
        $pindex = max(1, intval($_GPC['page']));
        $psize = 50;

        $flag_info = array();
        $banding = pdo_fetchall("SELECT uid, flag from". tablename('businessoffice_library_log'). "where library_id =:lib_id ", array('lib_id' => $lib_id));
        if (count($banding) > 0){
            foreach ($banding as $key => $val){
                $flag_info[$val['uid']] = $val['flag'];
            }
        }

        $keyword = $_GPC['keyword'];
        if(!empty($keyword)){
            $where = " AND name like '%".$keyword."%'";
        }

        if (!empty($_GPC['cate_2'])){
            $str = '';
            foreach ($flag_info as $flag_key => $flag_val){
                if ($flag_val==1){
                    $str .= $flag_key.',';
                }

            }

            $str .= '0';
            if ($_GPC['cate_2']==1){
                $condition = "and uid in ({$str})";
            }elseif ($_GPC['cate_2']==2){
                $condition = "and uid not in ({$str})";
            }
        }

        $member = pdo_fetchall("SELECT uid, name, username from". tablename('members')." member INNER join ". tablename('members_group'). "mgroup on groupid=mgroup.id where parent_ids=:parent_id ". $condition.$where."  LIMIT ".($pindex - 1) * $psize.','.$psize, array(':parent_id'=>$_W['uid']));
        $total = pdo_fetchcolumn("SELECT count(*) from". tablename('members')." member INNER join ". tablename('members_group'). "mgroup on groupid=mgroup.id where parent_ids=:parent_id ". $condition.$where, array(':parent_id'=>$_W['uid']));
        $pager = pagination($total, $pindex, $psize);
        include $this->template('statistical');
    }

    //分类管理
    public function doWebCategory()
    {
        global $_W, $_GPC;
        $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
        $type = empty($_GPC['type'])? 1 : $_GPC['type'];
        if ($foo=='display'){
            $pindex = max(1, intval($_GPC['page']));
            $psize = 20;
            $condition = '';
            $params = array();

            $list = pdo_fetchall("select * from".tablename('businessoffice_library_cat')." WHERE type_id = :type ORDER BY cat_id DESC LIMIT ".($pindex - 1) * $psize.','.$psize, array(':type' => $type));
            $total = pdo_fetchcolumn("select count(*) from".tablename('businessoffice_library_cat'). "WHERE type_id = :type", array(':type' => $type));
            $pager = pagination($total, $pindex, $psize);
        }elseif ($foo=='post'){
            $id = intval($_GPC['op_id']);
            if (!empty($id)) {
                $list = pdo_fetch("SELECT * FROM ".tablename('businessoffice_library_cat')." WHERE cat_id = :id" , array(':id' => $id));
            }

            if (checksubmit('sd_submit')) {
                if (empty($_GPC['category'])) {
                    message('分类名称不能为空，请输入标题！');
                }

                //验证资源分类名是否存在
                $isexit = pdo_fetch("SELECT * FROM ".tablename('businessoffice_library_cat')." WHERE category = :category" , array(':category' => $_GPC['category']));
                if ($isexit){
                    message('添加资源库分类失败，该分类名已经存在！',referer(), 'error');
                }

                if (empty($id)) {
                    $data = array(
                        'category' => $_GPC['category'],
                        'describe' => $_GPC['describe'],
                        'type_id' => $type
                    );
                    //echo var_dump($data);
                    pdo_insert('businessoffice_library_cat', $data);
                    message('添加资源库分类成功！',create_url('site/module', array('do' => 'category', 'name'=>'businessoffice', 'type' => $type)), 'success');
                } else {
                    $data = array(
                        'category' => $_GPC['category'],
                        'describe' => $_GPC['describe']
                    );
                    pdo_update('businessoffice_library_cat', $data, array('id' => $id));
                    message('更新资源库分类成功！',create_url('site/module', array('do' => 'category', 'name'=>'businessoffice', 'type' => $type)), 'success');
                }

            }
        }elseif ($foo=='delete'){
            $id = intval($_GPC['op_id']);
            $row = pdo_fetch("SELECT cat_id FROM ".tablename('businessoffice_library_cat')." WHERE cat_id = :id", array(':id' => $id));
            if (empty($row)) {
                message('抱歉，该资源库分类不存在或者已经删除！');
            }
            pdo_delete('businessoffice_library_cat', array('id' => $id));
            message('删除资源库分类成功！', referer(), 'success');
        }

        include $this->template('category');
    }

    //删除库文件的同时把rule、rule_keyword、news_reply等表的状态更新
    public function delLibrary($id, $sj_account, $jt_account)
    {
        global $_W, $_GPC;
        //获取绑定规则信息
        $banding_info =   pdo_fetchall("SELECT id FROM ".tablename('members_group')." WHERE parent_ids = :parent_ids" , array(':parent_ids' =>  $_W['uid']));
        if (count($banding_info)>0){
			foreach ($banding_info as $bangding_key => $bangding_val){
				//取得集团账号下的所有组
				$member_info =   pdo_fetchall("SELECT uid FROM ".tablename('members')." WHERE groupid = :groupid" , array(':groupid' =>  $bangding_val['id']));
				 foreach ($member_info as $member_key => $member_val){
					 $isexists = pdo_fetchall("SELECT rid, id FROM ".tablename('businessoffice_library_log')." WHERE uid = :uid and library_id = :id", array( ':uid' => $member_val['uid'], ':id' => $id));
					 if ($isexists){
						 foreach ($isexists as $key => $val){
							 $rule = array(
								 'status' => 0
							 );
	
							 pdo_update('rule', $rule, array('id' => $val['rid']));
							 pdo_update('rule_keyword', $rule, array('rid' => $val['rid']));
                             if (empty($val['rid'])) {
                                 pdo_update('businessoffice_library_log', array('flag' => 0), array('id' => $val['id']));
                             }else{
                                 pdo_update('businessoffice_library_log', array('flag' => 0), array('rid' => $val['rid']));
                             }

						 }
					 }
	
				 }
			}
        }
    }

    //绑定规则
    public function doWebAddRule()
    {
        global $_GPC, $_W;
        $id = intval($_GPC['item_id']);
        $flag = $_GPC['flag'];
        $library_info =  pdo_fetch("SELECT * FROM ".tablename('businessoffice_library')." WHERE id = :id" , array(':id' => $id));

        //省级营业厅账号接受绑定处理
        $child_uid = pdo_fetchall("SELECT * FROM ".tablename('members_group')." WHERE parent_ids = :parent_ids" , array(':parent_ids' =>  $_W['uid']));
        if (count($child_uid)>0){
            $userinfo = pdo_fetch("SELECT * FROM ".tablename('members')." WHERE uid = :uid" , array(':uid' => $_W['uid']));
            $data = array(
                'uid' => $_W['uid'],
                'groupid' => $userinfo['groupid'],
                'title' => $library_info['title'],
                'keyword' => $library_info['keyword'],
                'description' => $library_info['description'],
                'createtime' => $library_info['createtime'],
                'content' =>  $library_info['content'],
                'thumb' => $library_info['thumb'],
                'parent_uid' => $library_info['id'],
                'flag' => ($flag==1 ? 1 : 0)
            );

            $child_info = pdo_fetch("SELECT id, title FROM ".tablename('businessoffice_library')." WHERE uid = :uid and parent_uid = :parent_uid" , array(':uid' => $_W['uid'],  'parent_uid' => $id));

           if (is_array($child_info)){
               if ($flag == 1){
                   //省级账号规则入库
                   pdo_update('businessoffice_library', array('flag' => 1, 'lib_status' => 1), array('id' => $child_info['id']));
                   $this->RuleControl($flag, $library_info);

               }else{
                   $isexists = pdo_fetchall("SELECT id, module FROM ".tablename('rule')." WHERE name = :name and module = 'news'", array( ':name' => $child_info['title']));
                   if ($isexists){
                       foreach ($isexists as $key => $val){
                           $rule = array(
                               'status' => 0
                           );

                           pdo_update('rule', $rule, array('id' => $val['id']));
                           pdo_update('rule_keyword', $rule, array('rid' => $val['id']));
                           pdo_update('businessoffice_library_log', array('flag' => 0), array('rid' => $val['id']));
                       }
                   }
                   pdo_update('businessoffice_library', $data, array('id' => $child_info['id']));
               }
           }else{
              pdo_insert('businessoffice_library', $data);
               $this->RuleControl($flag, $library_info);
           }

        }else{
            //厅级账号规则入库
            $this->RuleControl($flag, $library_info);
        }

    }

    public function doWebInsertLog()
    {
        global $_GPC, $_W;
        $id = intval($_GPC['item_id']);
        $flag = $_GPC['flag'];
        $library_info =  pdo_fetch("SELECT * FROM ".tablename('businessoffice_library')." WHERE id = :id" , array(':id' => $id));
        $log_val =  pdo_fetch("SELECT * FROM ".tablename('businessoffice_library_log')." WHERE library_id = :id and uid = :uid" , array(':id' => $id, ':uid' => $_W['uid']));
        //入library_log表
        $insert = array(
            'uid' => $_W['uid'],
            'library_id' => $library_info['id'],
            'flag' => 1,
            'keyword' => $library_info['keyword']
        );
        if (empty($log_val)) {
            $id = pdo_insert('businessoffice_library_log', $insert);
        } else {
            $insert['flag'] = ($flag == 1 ? 1 : 0);
            pdo_update('businessoffice_library_log', $insert, array('id' => $log_val['id']));
        }
    }

    public function doWebShow()
    {
        global $_GPC, $_W;
        $id = intval($_GPC['id']);
        $row =  pdo_fetch("SELECT * FROM ".tablename('businessoffice_library')." WHERE id = :id" , array(':id' => $id));
        include $this->template('display');
    }

    public function RuleControl($flag, $library_info)
    {
        global $_GPC, $_W;
        $modulename = $_GPC['name'];
        if (empty($modulename)) {
            message('您未启用、安装该模块或是您没有权限使用！', '', 'error');
        }

        $weid = $_W['weid'];
        $rule = array(
            'weid' => $_W['weid'],
            'cid' => '',
            'name' => $library_info['title'],
            'module' => 'news',
            'status' => 1
        );
        if (!empty($_GPC['istop'])) {
            $rule['displayorder'] = 255;
        } else {
            $rule['displayorder'] = intval($_GPC['displayorder']) > 254 ? 254 : intval($_GPC['displayorder']);
        }
        //调用模块处理
        $module = WeUtility::createModule($modulename);
        if (is_error($module)) {
            message('抱歉，模块不存在请重新选择其它模块！');
        }
        $msg = $module->fieldsFormValidate();
        if(is_string($msg) && trim($msg) != '') {
            message($msg);
        }

        $isexists = pdo_fetch("SELECT id, module FROM ".tablename('rule')." WHERE weid = :id and name = :name and module = 'news'", array(':id' => $weid, ':name' => $library_info['title']));
        if (empty($isexists)){
            $result = pdo_insert('rule', $rule);
            $rid = pdo_insertid();
        }else{
            $rid = $isexists['id'];
            $rule['status'] = ($flag==1 ? 1 : 0);
            $result = pdo_update('rule', $rule, array('id' => $rid));
        }

        if (!empty($rid)) {
            //更新，添加，删除关键字
            $sql = 'DELETE FROM '. tablename('rule_keyword') . ' WHERE `rid`=:rid AND `weid`=:weid';
            $pars = array();
            $pars[':rid'] = $rid;
            $pars[':weid'] = $_W['weid'];
            pdo_query($sql, $pars);

            $rows = array();
            $rowtpl = array(
                'rid' => $rid,
                'weid' => $_W['weid'],
                'module' => 'news',
                'status' => $rule['status'],
                'displayorder' => $rule['displayorder'],
            );

            if(!empty($library_info['keyword'])) {
                $kwds = explode(',', trim($library_info['keyword']));
                foreach($kwds as $kwd) {
                    $kwd = trim($kwd);
                    if(empty($kwd)) {
                        continue;
                    }
                    $rowtpl['content'] = $kwd;
                    $rowtpl['type'] = 1;
                    $rows[md5($rowtpl['type'] . $rowtpl['content'])] = $rowtpl;
                }
            }

            foreach($rows as $krow) {
                $result = pdo_insert('rule_keyword', $krow);
            }
            // $module->fieldsFormSubmit($rid);
            $temp = $this->AddNewsReply($rid, $library_info);
            if ($temp==true){

                $rule_val = pdo_fetch("SELECT * FROM ".tablename('businessoffice_library_log')." WHERE rid = :rid", array(':rid' => $rid));
                //入library_log表
                $insert = array(
                    'uid' => $_W['uid'],
                    'rid' => $rid,
                    'library_id' => $library_info['id'],
                    'flag' => 1,
                    'keyword' => $library_info['keyword']
                );
                if (empty($rule_val)) {
                    $id = pdo_insert('businessoffice_library_log', $insert);
                } else {
                    $insert['flag'] = ($flag == 1 ? 1 : 0);
                    pdo_update('businessoffice_library_log', $insert, array('rid' => $rid));
                }
            }
            message('规则操作成功！', 'rule.php?act=post&id='.$rid);
        } else {
            message('规则操作失败, 请联系网站管理员！');
        }
    }

    public function AddNewsReply($rid=0, $library_info)
    {
        global $_GPC, $_W;
        $rule_val = pdo_fetch("SELECT id FROM ".tablename('news_reply')." WHERE rid = :rid", array(':rid' => $rid));
        $insert = array(
            'rid' => $rid,
            'title' => $library_info['title'],
            'description' => $library_info['description'],
            'thumb' => $library_info['thumb'],
            'content' => $library_info['content'],
            'createtime' => $library_info['createtime']
        );

        if (empty($rule_val)) {
            //图片拷贝
            $file_name = $insert['thumb'];
            $file_qz = "./resource/attachment/";
            $file_info = pathinfo($file_name);
            $new_file_name =$file_info['dirname'] .'/'.random(30).'.'.$file_info['extension'];
            copy($file_qz.$file_name, $file_qz.$new_file_name);
            $insert['thumb'] = $new_file_name;
            $id = pdo_insert('news_reply', $insert);
        } else {
             pdo_update('news_reply', $insert, array('id' => $rid));
        }
        return true;
    }

}