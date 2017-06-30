<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-12-13
 * Time: 下午2:55
 * 分享有理自定义接口（移动互联网公众帐号）
 */
global $_W;
$root = str_replace('api.php','',"http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
if(strtolower(trim($this->message['content']))=="f"){
 $success =  pdo_fetchall("SELECT * FROM ".tablename('share_logs')." WHERE from_user = '".$this->message['from']."' and weid=".$_W['weid']." and success = 1" );
    if(empty($success)){
        return $this->respText('您当前没有任何分享成功记录，请点击公众号下方分享有礼按键进行分享');
    }else{
        $msg = '您当前已成功分享'.count($success).'个用户，共计可获得'.(count($success)*2).'元话费，请再接再厉。';
        return $this->respText($msg);
    }
}

$sql = "SELECT * FROM ".tablename('fans')." WHERE mobile > 0 and from_user ='".$this->message['from']."' and weid =".MOBILE_INTERNET_ID." limit 1";
$fans_info = pdo_fetch($sql);
$root = str_replace('api.php','',"http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
if(empty($fans_info['mobile'])){
    //还未绑定手机号码
    $url = $this->createMobileUrl('_mobile_blind', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>MOBILE_INTERNET_ID, 'from_user' => $this->message['from']));
    return $this->respText('您还未绑定手机，绑定手机请点击<a href="'.$url.'">绑定</a>');
}else{
    //判断是否为福建省网'段
    if(!fj_phone(trim($fans_info['mobile']))){
        //不是福建手机用户
        $url = $this->createMobileUrl('_mobile_blind', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>MOBILE_INTERNET_ID, 'from_user' => $this->message['from']));
        return $this->respText("您绑定的手机为".$fans_info['mobile'].'非福建省内号码，无法参加活动，修改绑定手机请点击<a href="'.$url.'">修改</a>');
    }else{
        //进入图文页面
        $row = array();
        $response['FromUserName'] = $this->message['to'];
        $response['ToUserName'] = $this->message['from'];
        $response['MsgType'] = 'news';
        $response['ArticleCount'] = 1;
        $response['Articles'] = array();
        $response['Articles'][] = array(
            'Title' =>  '分享易信有礼，赢取话费抽大奖！',
            'Description' => '用易信，短信免费发，更有电话留言、国际漫游等免费功能等你体验！新注册天翼用户送300M流量，次月再送60M流量。全网用户关注“移动互联网应用”易信公众号赢取高端智能机等好礼！',
            'PicUrl' =>$root . 'source/modules/userapi/template/img/banner.png',
            'Url' =>  $root.$this->createMobileUrl('_es_share',array('do' => '_es_share', 'name' => 'userapi','weid'=>MOBILE_INTERNET_ID,'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE')))),
            'TagName' => 'item',
        );
        return $response;
    }
}






