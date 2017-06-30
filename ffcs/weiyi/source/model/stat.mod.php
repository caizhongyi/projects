<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-29
 * Time: 上午11:53
 * To change this template use File | Settings | File Templates.
 */
defined('IN_IA') or exit('Access Denied');
/*
 * 易信点对点回复信息
 */
function reply_by_yixin($openid,$content){
    global $_W;
    $_W['weid'] && $fields['weid'] = $_W['weid'];
    $account = pdo_fetch("SELECT * FROM ".tablename('wechats')." WHERE weid =".$fields['weid']."  limit 1");
    $account['access_token'] = !empty($account['access_token']) ? iunserializer($account['access_token']) : '';
    require_once  IA_ROOT.'/source/library/message/yixin.php';
    $arr = array(
        'appid' =>$account['key'],
        'appsecret' =>$account['secret'],
        'access_token'=>$account['access_token']
    );
    $yx = new Yixin($account);
    //重新获取access_token
    $access_token =  $yx->get_access_token();
    $res = $yx->send($openid,$content);
    if($res['errcode']==0){
        return $res;
    }elseif(in_array($res['errcode'],array(40014,41001,42001))){
        //access_token,错误，超时等情况，重新生成access_token
       $access_token =  $yx->get_access_token(true);
        //重发一次
        $res = $yx->send($openid,$content);
        return $res;
    }
}
/*
 * 易信群发
 */
/*
function send_messages_by_yixin($message){
    global $_W;
    $_W['weid'] && $fields['weid'] = $_W['weid'];
    require_once  IA_ROOT.'/source/library/message/yixin.php';
    $arr = array(
        'appid' =>$_W['account']['key'],
        'appsecret' => $_W['account']['secret'],
        'access_token'=> $_W['account']['access_token']
    );
    $yx = new Yixin($arr);
    if(empty($_W['account']['access_token'])){
        //重新获取access_token
        $access_token =  $yx->get_access_token();
        pdo_update('wechats',array('access_token'=>$access_token),array('weid'=>$_W['weid']));
    }
    foreach($message as $k =>$v){
        $res = $yx->send($v['openid'],$v['content']);
        $reply_data = array(
            'weid'=>$_W['weid'],
            'from_user'=>$v['openid'],
            'message'=>$v['content'],
            'type'=>$v['type'],
            'createtime'=>time(),
        );
        if(!empty($res) && $res['errcode']==0){
            $reply_data['returncode']=0;

        }else{
            if(in_array($res['errcode'],array(40014,41001,42001))){
                //access_token,错误，超时等情况，重新生成access_token
                $access_token =  $yx->get_access_token();
                //入库
                pdo_update('wechats',array('access_token'=>$access_token),array('weid'=>$_W['weid']));
                //重发一次
                $res = $yx->send($v['openid'],$v['content']);
            }
            if(isset($res['errcode'])&& !empty($res['errcode'])){
                $reply_data['returncode']=$res['errcode'];
            }else{
                $reply_data['returncode']=-1;//请求失败;
            }
        }
        $reply_data = array(
            'send'=>1,
            'send_time'=>time(),
        );
        pdo_update('stat_msg_history_reply',$reply_data,array('id'=>$item['id']));
    }

}*/