<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-15
 * Time: 上午9:29
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');

$infos = pdo_fetchall("SELECT  SrcUserName as openid,REPLACE(REPLACE(Content,'达人赛',''),'+','') as phone,UNIX_TIMESTAMP(CreateTimeD) as time from ".tablename('daren_logs')." WHERE CreateTimeD BETWEEN  '2013-11-22 00:00:00' AND  '2013-11-28 00:00:00'");
$csv_txt = "openid ,手机号码,时间\n";

foreach ($infos as $v) {
     $csv_txt .= iconv("UTF-8", "GBK", $v['openid']) . ',' . $v['phone'] . ',' . date("Y年m月d日 H时i分s秒",$v['time'])  . "\n";
}
$csv_txt = iconv("UTF-8", "GBK", $csv_txt);
header('Content-Type:application/octet-stream;');
header('Content-Disposition: attachment; filename=达人赛信息' . date('YmdHis') . '.csv');
echo $csv_txt;