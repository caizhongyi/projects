<?php
/**
 * 粉丝管理
 * 更新移动互联网公众帐号的粉丝数据,更新
 * 20131210
 */

set_time_limit(0);
defined('IN_IA') or exit('Access Denied');
$id = MOBILE_INTERNET_ID;
$index = $_GPC['index']?intval($_GPC['index']):0;
$list = pdo_fetchall("SELECT id,from_user,follow FROM ".tablename('fans')." WHERE  weid = ".$id.' limit '.$index.', 200');
if(!$list){
    exit('更新完成！');
}
require_once  IA_ROOT.'/source/library/message/yixin.php';
$account = pdo_fetch("SELECT * FROM ".tablename('wechats')." WHERE weid = '$id'  limit 1");
$arr = array(
    'appid' =>$account['key'],
    'appsecret' => $account['secret'],
    'access_token'=>$account['access_token']
);

$yx = new Yixin($arr);
foreach ($list as $item){
    $b =  $yx->get_user_info($item['from_user']);
    if(in_array($b['errcode'],array(40014,41001,42001))){
        //access_token,错误，超时等情况，重新生成access_token
        $access_token =  $yx->get_access_token();
        //入库
        pdo_update('wechats',array('access_token'=>$access_token),array('weid'=>$id));
        //重发一次
        $b =  $yx->get_user_info($item['from_user']);

    }
    if(isset($b['subscribe'])){
        $fans_data = array('follow'=>1,'nickname'=>$b['nickname'],'gender'=>$b['sex']);
    }else{
        $fans_data = array('follow'=>1,'nickname'=>$b['nickname'],'gender'=>$b['sex']);
    }
    pdo_update("fans",$fans_data,array('id'=>$item['id']));
    WeUtility::logging('update_fans Id :', $item['id']);
}
$index +=200;
$url  = "http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?act=fans_update&index='.$index;
$msg = "更新成功跳转下一页".$url;
$message = "<script type=\"text/javascript\">";
$url && $message   .= "location.href = \"{$url}\";";
$message .= "</script>";
exit($message);


