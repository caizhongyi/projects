<?php
global $_W;
$weid = $_W['weid'];
$sql = "SELECT * FROM ".tablename('fans')." WHERE mobile > 0 and from_user ='".$this->message['from']."' and weid =".$weid." limit 1";
$from_user = $this->message['from'];


//$root = str_replace('api.php','',"http://".$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']);
//$url = $root.create_url('index/module', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>$weid, 'from_user' => $from_user));

$url = $this->createMobileUrl('_mobile_blind', array('name' => 'userapi', 'do' => '_mobile_blind','weid'=>$weid, 'from_user' => $from_user));
$res = pdo_fetch($sql);
if(!empty($res['mobile'])){
    return $this->respText("您绑定的手机为".$res['mobile'].'，修改绑定手机请点击<a href="'.$url.'">修改</a>');
}else{
    return $this->respText('您还未绑定手机，绑定手机请点击<a href="'.$url.'">绑定</a>');
}




