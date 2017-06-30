<?php
$matchs = array();
$ret1 = preg_match("/^能力展示$/", $this->message['content'], $matchs);

if($ret1){
	$url =  $_W['siteroot'] . create_url('index/module', array('do'=>'call', 'name' => 'userapi', 'from_user' => base64_encode(authcode($this->message['from'], 'ENCODE'))));
    return $this->respText("能力展示地址：<a>".$url."</a>");
}else{
    return $this->respText("您回复的格式有误，请重新输入。");
}



