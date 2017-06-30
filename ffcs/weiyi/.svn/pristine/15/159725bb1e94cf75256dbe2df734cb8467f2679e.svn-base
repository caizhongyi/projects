<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

if(!$_W['isajax'] || !$_W['ispost']) {
	exit('Access Denied');
}

include model('rule');

if(!empty($_GPC['rule'])) {
	$rid = intval($_GPC['rule']);
	$rule = rule_single($rid);
	if(!isset($_GPC['page']) && !isset($_GPC['keyword'])) {
		$isSingle = true;
	}
}

$pindex = max(1, intval($_GPC['page']));
$psize = 10;
$total = 0;
$condition = '`weid`=:weid';
$params = array();
$params[':weid'] = $_W['weid'];
if(isset($_GPC['keyword'])) {
	$condition .= ' AND `name` LIKE :keyword';
	$params[':keyword'] = "%{$_GPC['keyword']}%";
}
$list = rule_search($condition, $params, $pindex, $psize, $total);
if (!empty($list)) {
	foreach($list as &$item) {
		$condition = '`rid`=:rid';
		$params = array();
		$params[':rid'] = $item['id'];
		$item['keywords'] = rule_keywords_search($condition, $params);
	}
}
$pager = pagination($total, $pindex, $psize, create_url('menu/search'), array('ajaxcallback'=>'1'));

$wechat = $_W['account'];
$temp = iunserializer($wechat['default']);
if (is_array($temp)) {
	$wechat['default'] = $temp;
	$wechat['defaultrid'] = $temp['id'];
}
$temp = iunserializer($wechat['welcome']);
if (is_array($temp)) {
	$wechat['welcome'] = $temp;
	$wechat['welcomerid'] = $temp['id'];
}
template('menu/search');
