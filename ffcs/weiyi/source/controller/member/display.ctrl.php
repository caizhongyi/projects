<?php 
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
$pindex = max(1, intval($_GPC['page']));
$psize = 20;
$where = "WHERE 1=1";
$condition = '';
if (isset($_GPC['status'])) {
	$where .= " and status = '".intval($_GPC['status'])."'";
}

//添加用户查询条件
if (!empty($_GPC['keyword'])) {
    $condition .= " AND username LIKE :username";
    $params[':username'] = "%{$_GPC['keyword']}%";
}

//将用户身份放入数组，只能看属于自己的群组
$group_val = array();
if(!$_W['isfounder']){
    $_group_val = get_son_groups($_W['uid']);
}else{
    $_group_val = pdo_fetchall("SELECT * from ".tablename('members_group'));
}
foreach ($_group_val as $_group_key=>$_group_v){
    $group_val[$_group_v['id']] = $_group_v['name'];
}
$arr_groupids = array_keys($group_val);

if (!empty($_GPC['cate_1'])&&in_array($_GPC['cate_1'],$arr_groupids)){
    $groupid = intval($_GPC['cate_1']);
    $condition .= "  AND groupid = '{$groupid}'";
}else{
    $condition .= "  AND groupid in (".implode(',',$arr_groupids).")";
}

$where .=$condition;

$sql = 'SELECT * FROM ' . tablename('members') .$where . " LIMIT " . ($pindex - 1) * $psize .',' .$psize;

$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('members') . $where, $params);

$members = pdo_fetchall($sql, $params);
$pager = pagination($total, $pindex, $psize);

$founders = explode(',', $_W['config']['setting']['founder']);
foreach($members as &$m) {
	$m['founder'] = in_array($m['uid'], $founders);
    $m['group_name'] = pdo_fetchcolumn('SELECT name FROM ' . tablename('members_group') . ' WHERE id="'.$m['groupid'].'"');
}

template('member/display');
