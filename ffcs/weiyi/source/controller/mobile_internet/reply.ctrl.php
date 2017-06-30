<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-29
 * Time: 下午1:50
 * 点对点回复接口
 */

defined('IN_IA') or exit('Access Denied');
include model('stat');
$openid = $_GPC['openid'];
$content = $_GPC['content'];
$type = (isset($_GPC['type'])&&empty($_GPC['type'])) ? $_GPC['type']:'text';
if(!empty($openid)&&!empty($content)){
    $res = reply_by_yixin($openid,$content);
    $reply_data = array(
        'weid'=>$_W['weid'],
        'from_user'=>$openid,
        'message'=>$content,
        'type'=>$type,
        'createtime'=>TIMESTAMP,
        'send'=>1,
        'send_time'=>TIMESTAMP,
    );
    if(!empty($res) && $res['errcode']==0){
        $reply_data['returncode']=0;
        pdo_insert('stat_msg_history_reply',$reply_data);
        echo json_encode(array('errno'=>200,'error'=>'发送成功！'));
    }else{
        if(isset($res['errcode'])&& !empty($res['errcode'])){
            $reply_data['returncode']=$res['errcode'];
        }else{
            $reply_data['returncode']=-1;//请求失败;
        }
        pdo_insert('stat_msg_history_reply',$reply_data);
        echo json_encode(array('errno'=>$reply_data['returncode'],'error'=>'发送失败！'));
    }
}elseif(empty($content)){
    echo json_encode(array('errno'=>-2,'error'=>'发送内容不为空！'));
}else{
    echo json_encode(array('errno'=>-3,'error'=>'发送失败！'));
}
die();