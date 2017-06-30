<?php
/**
 * Created by JetBrains PhpStorm.
 * User: zcn
 * Date: 14-1-8
 * Time: 上午9:58
 * 考试管理模块
 */

defined('IN_IA') or exit('Access Denied');

class MessageModuleSite extends WeModuleSite {
    public $tablename = 'message_reply';
    public function doMobileList() {
        global $_GPC;
        $p=isset($_GET['p'])?$_GET['p']:1;
        $from_user = authcode(base64_decode($_GPC['from_user']), 'DECODE');
        $title = '留言墙';
        $temp=pdo_fetch("SELECT count(id) FROM ".tablename('message')." WHERE  isshow=1 and rid=".$_GPC['id']);
        $messagecount=$temp['count(id)'];
        $pagenum=10;
        $totalpage=floor($messagecount/$pagenum)+1;
        $prow=($p-1)*$pagenum;

        $posturl=$_W['siteroot'].$this->createMobileUrl('ajax', array( 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user']));
        $messagelist = pdo_fetchall("SELECT * FROM ".tablename('message')." WHERE  rid=".$_GPC['id']." and fid=0 and isshow=1  order by create_time desc  limit $prow,$pagenum" );
        foreach($messagelist as $k=>$v){
            $messagelist[$k]['reply']=pdo_fetchall("SELECT * FROM ".tablename('message')." WHERE  rid=".$_GPC['id']." and fid=".$v['id']." and isshow=1  limit 20" );
        }


        if($totalpage>$p){
            $nextpage= $_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user'], 'p'=>($p+1)));
        }else{
            $nextpage=$_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user'], 'p'=>$totalpage));
        }
        if($p>1){
            $prepage=$_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user'], 'p'=>($p-1)));
        }else{
            $prepage=$_W['siteroot'].$this->createMobileUrl('list', array( 'name' => 'message', 'id' => $_GPC['id'], 'from_user' => $_GPC['from_user'], 'p'=>1));
        }
        include $this->template('index');
    }

    public function doMobileAjax() {
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

}