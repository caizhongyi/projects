<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-12-11
 * Time: 下午4:58
 * To change this template use File | Settings | File Templates.
 */
defined('IN_IA') or exit('Access Denied');
$id = intval($_GPC['id']);
if(empty($id)){
    return fasle;
}
$account = pdo_fetch("SELECT * FROM ".tablename('wechats')." WHERE weid = '$id'  limit 1");
$account['access_token'] = !empty($account['access_token']) ? iunserializer($account['access_token']) : '';
$lists = pdo_fetchall("SELECT * FROM ".tablename('stat_msg_history_reply')." WHERE weid = '$id' and send = 0 limit 100");
foreach($lists as $item ){
    //状态改为2表示正在发送中
    pdo_update('stat_msg_history_reply',array('send'=>2),array('id'=>$item['id']));
}
include model('stat');
if($account['type']==2){
    //易信
    require_once  IA_ROOT.'/source/library/message/yixin.php';
    $arr = array(
        'appid' =>$account['key'],
        'appsecret' => $account['secret'],
        'access_token'=>$account['access_token']
    );
    $yx = new Yixin($account);
    $access_token =  $yx->get_access_token();
    foreach($lists as $item ){
        $res =  $yx->send($item['from_user'],$item['message']);
        if(!empty($res) && $res['errcode']==0){
            $reply_data['returncode']=0;
        }else{
            if(in_array($res['errcode'],array(40014,41001,42001))){
                //access_token,错误，超时等情况，重新生成access_token
                $access_token =  $yx->get_access_token(true);
                //重发一次
                $res = $yx->send($openid,$content);
            }
            if(isset($res['errcode'])&& !empty($res['errcode'])){
                $reply_data['returncode']=$res['errcode'];
            }else{
                $reply_data['returncode']=-1;//请求失败;
            }
        }
        $reply_data['send']=1;
        $reply_data['send_time']=time();
        pdo_update('stat_msg_history_reply',$reply_data,array('id'=>$item['id']));
    }
}elseif($account['type']==1){
    //TODO 后续微信需求
    //微信
}

