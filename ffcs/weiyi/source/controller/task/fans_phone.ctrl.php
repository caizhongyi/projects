<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-12-13
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */
set_time_limit(0);
defined('IN_IA') or exit('Access Denied');

$infos = pdo_fetchall("SELECT  SrcUserName as openid ,REPLACE(REPLACE(Content,'达人赛',''),'+','') as phone,UNIX_TIMESTAMP(CreateTimeD) as time from ".tablename('daren_logs')." WHERE 1 ");
foreach ($infos as $v) {
   pdo_update('fans',array('mobile'=>$v['phone']),array('from_user'=>$v['openid'],'weid'=>4));
}
var_dump($infos);
$infos = pdo_fetchall("SELECT  SrcUserName as openid ,REPLACE(REPLACE(Content,'e邮',''),'+','') as phone,UNIX_TIMESTAMP(CreateTimeD) as time from ".tablename('189lottery_logs')." WHERE 1 ");
foreach ($infos as $v) {
    pdo_update('fans',array('mobile'=>$v['phone']),array('from_user'=>$v['openid'],'weid'=>4));
}
var_dump($info);
