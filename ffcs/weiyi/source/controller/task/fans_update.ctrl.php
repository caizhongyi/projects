<?php
/**
 * 粉丝管理
 * 更新移动互联网公众帐号的粉丝数据
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
    'appsecret' => $account['secret']
);
$yx = new Yixin($arr);
foreach ($list as $item){
    $b =  $yx->get_user_info($item['from_user']);

    if(isset($b['subscribe'])){
        if($item['follow'] !=1){
            pdo_query("update " .tablename('fans')." set follow=1 where id = ".$item['id']);
            WeUtility::logging('update_fans 变为关注', $item);
        }
    }else{
        if($item['follow'] !=0){
            pdo_query("update " .tablename('fans')." set follow=0 where id = ".$item['id']);
            WeUtility::logging('update_fans 取消关注', $item);
        }
    }
}
$index +=200;
$url  = "http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?act=fans_update&index='.$index;
$msg = "更新成功跳转下一页".$url;
$message = "<script type=\"text/javascript\">";
$url && $message   .= "location.href = \"{$url}\";";
$message .= "</script>";
exit($message);


