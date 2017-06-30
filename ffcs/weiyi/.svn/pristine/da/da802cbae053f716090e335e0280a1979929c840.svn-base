<?php
defined('IN_IA') or exit('Access Denied');
$member = array();
$clientids = array('username','email');
$clientid = trim($_GPC['clientid']);
$clientid = in_array($clientid, $clientids) ? $clientid: 'username';
if($clientid == 'username'){
    $member['username'] = trim($_GPC['username']);
    if(member_check($member)){
        echo 0;
        exit;
    }else{
        echo 1;
        exit;
    }
}elseif($clientid="email"){
    $member['email'] = trim($_GPC['email']);
    if(member_check($member)){
        echo 0;
        exit;
    }else{
        echo 1;
        exit;
    }
}

