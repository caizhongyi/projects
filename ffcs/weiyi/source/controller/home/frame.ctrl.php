<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */

defined('IN_IA') or exit('Access Denied');
checklogin(true);
$do = 'profile';

/*获取当前用户*/
$uid = $_W['uid'];
$sql = 'select * from ' . tablename('members') . ' where uid = ' . $uid;
$member = pdo_fetch($sql);
$todaytimestamp = strtotime(date('Y-m-d'));
$monthtimestamp = strtotime(date('Y-m'));
$modules = $_W['account']['modules'];
if (!empty($modules)) {
    foreach ($modules as $mid => $module) {
        if ($_W['modules'][$module['name']]['isrulefields']) {
            $modules[$mid]['response']['month'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_msg_history')." WHERE weid = :weid AND module = :module AND createtime >= '$monthtimestamp'", array(':weid' => $_W['weid'], ':module' => $module['name']));
            $modules[$mid]['response']['today'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_msg_history')." WHERE weid = :weid AND module = :module AND createtime >= '$todaytimestamp'", array(':weid' => $_W['weid'], ':module' => $module['name']));
            $modules[$mid]['rule'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('rule')." WHERE weid = :weid AND module = :module", array(':weid' => $_W['weid'], ':module' => $module['name']));
		}
	}
}
$wechats = $_W['wechats'];
$rule_nums = 0;//规则数目
if (!empty($wechats)) {
	$wechats[$_W['weid']]['fans']['total'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('fans')." WHERE weid = :weid AND follow = '1'", array(':weid' => $row['weid']));
	$wechats[$_W['weid']]['fans']['todayjoin'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('fans')." WHERE weid = :weid AND follow = '1' AND createtime >= :createtime", array(':weid' => $row['weid'], ':createtime' => $todaytimestamp));
	$wechats[$_W['weid']]['rule']['all'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('rule')." WHERE weid = :weid ", array(':weid' => $row['weid']));
	$rule_nums+=$row['rule']['all'];
	$wechats[$_W['weid']]['response']['total'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_msg_history')." WHERE weid = :weid", array(':weid' => $row['weid']));
	$wechats[$_W['weid']]['response']['month'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_msg_history')." WHERE weid = :weid AND createtime >= '$monthtimestamp'", array(':weid' => $row['weid']));
	$wechats[$_W['weid']]['response']['today'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('stat_msg_history')." WHERE weid = :weid AND createtime >= '$todaytimestamp'", array(':weid' => $row['weid']));
	$current_wechats = $wechats[$_W['weid']];
}
//判断是否有绑定公众帐号
if(empty($wechats)){
    //绑定公众帐号为空，进入引导界面
    header('location:'.create_url('account/blind'));
    exit;
}
include model('rule');
if (is_array($_W['account']['default'])) {
    $wechat['default'] = rule_single($_W['account']['default']['id']);
    $wechat['defaultrid'] = $_W['account']['default']['id'];
}
if (is_array($_W['account']['welcome'])) {
    $wechat['welcome'] = rule_single($_W['account']['welcome']['id']);
    $wechat['welcomerid'] = $_W['account']['welcome']['id'];
}

$starttime = empty($_GPC['start']) ?  strtotime(date("Y-m-d",strtotime("-7 day")))  : strtotime($_GPC['start']);
$endtime = empty($_GPC['end']) ? strtotime(date('Y-m-d')) + 86399 : strtotime($_GPC['end']) + 86399;
$where .= " AND createtime >= '$starttime' AND createtime < '$endtime'";

$dateflag = '';
if($endtime - $starttime >= (3*12*30*24*60*60)){ //3年以上 用年表示
    $cond = "%Y";
    $dateflag = '年';
}elseif(($endtime - $starttime >= (12*30*24*60*60+86399)) && $endtime - $starttime < (3*12*30*24*60*60+86399)){
    $cond = "%Y-%m";
    $dateflag = '月';
}elseif(($endtime - $starttime > (60*24*60*60+86399)) && ($endtime - $starttime < (12*30*24*60*60+86399))){
    $cond = "%Y-%u";
    $dateflag = '周';
}else{
    $cond = "%Y-%m-%d";
    $dateflag = '';
    if($endtime - $starttime == (7*24*60*60+86399)) $period = 7;
    elseif ($endtime - $starttime == (14*24*60*60+86399)) $period = 14;
    elseif ($endtime - $starttime == (30*24*60*60+86399)) $period = 30;
    elseif ($endtime - $starttime == (60*24*60*60+86399)) $period = 60;
}

$sql = "select date_format(from_unixtime(createtime),'".$cond."') as time,count(*) as pvcount,count(distinct(from_user)) as uvcount from ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where group by time order by time asc;";
$h_list = pdo_fetchall($sql);
$day = $hit = $users = array();
$pv = 0;
$hit_series ='';
$users_series ='';
if (!empty($h_list)) {
    foreach ($h_list as $h_row) {
        $day[] = $h_row['time'].$dateflag;
        $hit[] = $h_row['pvcount'];
        $users[] = $h_row['uvcount'];
    }
    $hit_series = implode(',', $hit);
    $users_series = implode(',', $users);
    if(!empty($hit)){
        $pv = array_sum($hit);
    }
}

$uv_list = pdo_fetch("SELECT count(distinct(from_user)) as total_uv_count FROM ".tablename('stat_msg_history')." WHERE weid = '{$_W['weid']}' $where");
$uv = $uv_list['total_uv_count'];

$newfans_list = pdo_fetchall("select date_format(from_unixtime(createtime),'".$cond."') as time,count(distinct(from_user)) as newcount from ".tablename('fans')." WHERE weid = '{$_W['weid']}' $where group by time order by time asc;");
$newfans_series = '';
if (!empty($newfans_list)) {
    foreach ($newfans_list as $newfans_row) {
        $newfans_day[] = $newfans_row['time'].$dateflag;
        $newfans_count[] = $newfans_row['newcount'];
    }
    $newfans_series = implode(',', $newfans_count);
    if(!empty($newfans_count)){
        $newfans_counts = array_sum($newfans_count);
    }
}

template('home/frame');
