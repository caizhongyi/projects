<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-15
 * Time: 上午9:29
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');

$infos = pdo_fetchall("SELECT  SrcUserName as openid,REPLACE(REPLACE(Content,'抽奖',''),'+','') as phone,DATE_FORMAT(CreateTimeD,'%Y年%m月%d日 %H时:%i分:%s秒') as time  from ".tablename('lottery_logs')." WHERE CreateTimeD < NOW();");

$csv_txt = "openid ,手机号码,时间\n";
foreach ($infos as $v) {
     $csv_txt .= $v['openid'] . ',' . $v['phone'] . ',' . $v['time']  . "\n";
}
$csv_txt = iconv("UTF-8", "GBK", $csv_txt);
header('Content-Type:application/octet-stream;');
header('Content-Disposition: attachment; filename=抽奖信息' . date('YmdHis') . '.csv');
echo $csv_txt;