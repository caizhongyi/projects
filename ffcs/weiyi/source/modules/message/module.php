<?php
/**
 * 留言墙模块定义
 *
 * @author 超级无聊
 * @url 
 */
defined('IN_IA') or exit('Access Denied');

class MessageModule extends WeModule {
	public $name = 'Message';
	public $title = '留言墙';
	public $ability = '';
	public $tablename = 'message_reply';

	public function fieldsFormDisplay($rid = 0) {
		global $_W;
      	if (!empty($rid)) {
			$reply = pdo_fetch("SELECT * FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $rid));		
 		} 
		include $this->template('form');
	}
  	public function fieldsFormValidate($rid = 0) {
		
        return true;
	}
  
  	public function fieldsFormSubmit($rid = 0) {
		global $_GPC, $_W;
 
        $id = intval($_GPC['reply_id']);
		$insert = array(
			'rid' => $rid,
			'title' => $_GPC['title'],
			'description' => $_GPC['description'],
			'thumb' => $_GPC['picture'],
          	'isshow'=>$_GPC['isshow'],
		);
      //处理图片
      	if (!empty($_GPC['picture'])) {
			file_delete($_GPC['picture-old']);
		} else {
			unset($insert['thumb']);
		}
		if (empty($id)) {
			$id=pdo_insert($this->tablename, $insert);
		} else {
			pdo_update($this->tablename, $insert, array('id' => $id));
		}
      	return true;
	}
   	public function ruleDeleted($rid = 0) {
		global $_W;
		$replies = pdo_fetchall("SELECT id,rid FROM ".tablename($this->tablename)." WHERE rid = '$rid'");
		$deleteid = array();
		if (!empty($replies)) {
          	foreach ($replies as $index => $row) {
				$deleteid[] = $row['id'];
			}
			pdo_delete('context_keycode', "rid =".$rid."");          
		}
		pdo_delete($this->tablename, "id IN ('".implode("','", $deleteid)."')");
		return true;
	}
	public function dolist() {
		global $_GPC;
      	$p=isset($_GET['p'])?$_GET['p']:1;
      	$from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');  
      	$title = '留言墙';	
        $temp=pdo_fetch("SELECT count(id) FROM ".tablename('message')." WHERE  isshow=1 and rid=".$_GPC['id']);
      	$messagecount=$temp['count(id)'];
      	$pagenum=10;
      	$totalpage=floor($messagecount/$pagenum)+1;
      	$prow=($p-1)*$pagenum;

      	$posturl=create_url('site/module', array('do' => 'ajax', 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user']));
    	$messagelist = pdo_fetchall("SELECT * FROM ".tablename('message')." WHERE  rid=".$_GPC['id']." and fid=0 and isshow=1  order by create_time desc  limit $prow,$pagenum" );	
		foreach($messagelist as $k=>$v){
			$messagelist[$k]['reply']=pdo_fetchall("SELECT * FROM ".tablename('message')." WHERE  rid=".$_GPC['id']." and fid=".$v['id']." and isshow=1  limit 20" );	
		}
      
      if($totalpage>$p){
        $nextpage=$_W['siteroot'] . create_url('site/module', array('do' => 'list', 'name' => 'message', 'id' => $_GPC['id'],'from_user' => $_GPC['from_user'],'p'=>($p+1)));
      }else{
         $nextpage=$_W['siteroot'] . create_url('site/module', array('do' => 'list', 'name' => 'message', 'id' => $_GPC['id'],'from_user' => $_GPC['from_user'],'p'=>$totalpage));
      }
      if($p>1){
        $prepage=$_W['siteroot'] . create_url('site/module', array('do' => 'list', 'name' => 'message', 'id' => $_GPC['id'],'from_user' => $_GPC['from_user'],'p'=>($p-1)));
      }else{
		$prepage=$_W['siteroot'] . create_url('site/module', array('do' => 'list', 'name' => 'message', 'id' => $_GPC['id'],'from_user' => $_GPC['from_user'],'p'=>1));
      }
   		include $this->template('index');
	}
  
  
	public function doajax() {
		global $_GPC;
		$_GPC['weid']=$_GET['weid'];
		$from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');  
    	$message = pdo_fetch("SELECT * FROM ".tablename('message')." WHERE fromuser = '".$from_user."' and rid=".$_GPC['id']." order by create_time desc limit 1" );	
      //判断是否要审核留言
      $reply = pdo_fetch("SELECT isshow FROM ".tablename($this->tablename)." WHERE rid = :rid ORDER BY `id` DESC", array(':rid' => $_GPC['id']));		
      if($reply==false){
        $isshow=1;
      }else{
		$isshow=$reply['isshow'];
      }
		$insert = array(
			'rid'=>$_GPC['id'],
			'weid'=>$_GPC['weid'],
			'nickname'=>$_GPC['nickname'],
			'info'=>$_GPC['info'],
			'fid'=>$_GPC['fid'],
			'fromuser'=>$from_user,
			'isshow'=>$isshow,
			'create_time'=>time(),
		);
		if($message==false){
			$id=pdo_insert('message', $insert);
			$data['success']=true;
			$data['msg']='留言发表成功';			
			if($isshow==0){$data['msg']=$data['msg'].',进入审核流程';}          
		}else{
			if((time()-$message['create_time'])<5){
				$data['msg']='您的留言速度太快了';
				$data['success']=false;
			}else{
				$id=pdo_insert('message', $insert);
				$data['success']=true;
				$data['msg']='留言发表成功';				
              	if($isshow==0){$data['msg']=$data['msg'].',进入审核流程';}
			}
		}
		echo json_encode($data);
	}
  
  	/*
	 * 内容管理
	 */
	public function doManage() {
		global $_GPC, $_W;
		checklogin();
		$id = intval($_GPC['id']);
		if (checksubmit('verify') && !empty($_GPC['select'])) {
			pdo_update('message', array('isshow' => 1, 'create_time' => TIMESTAMP), " id  IN  ('".implode("','", $_GPC['select'])."')");
			message('审核成功！', create_url('site/module', array('do' => 'manage', 'name' => 'message', 'id' => $id, 'page' => $_GPC['page'])));
		}
		if (checksubmit('delete') && !empty($_GPC['select'])) {
			pdo_delete('message', " id  IN  ('".implode("','", $_GPC['select'])."')");
			message('删除成功！', create_url('site/module', array('do' => 'manage', 'name' => 'message', 'id' => $id, 'page' => $_GPC['page'])));
		}
		$isshow = isset($_GPC['isshow']) ? intval($_GPC['isshow']) : 0;
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;

		$message = pdo_fetch("SELECT id, isshow, rid FROM ".tablename('message_reply')." WHERE rid = '{$id}' LIMIT 1");
		$list = pdo_fetchall("SELECT * FROM ".tablename('message')." WHERE rid = '{$message['rid']}' AND isshow = '$isshow' ORDER BY create_time DESC LIMIT ".($pindex - 1) * $psize.",{$psize}");
		if (!empty($list)) {
			$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('message') . " WHERE rid = '{$message['rid']}' AND isshow = '$isshow'");
			$pager = pagination($total, $pindex, $psize);

			foreach ($list as &$row) {
				$row['content'] = emotion($row['content']);
				$userids[] = $row['from_user'];
			}
			unset($row);
		}
		include $this->template('manage');
	}


  
}