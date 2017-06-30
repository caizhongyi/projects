<?php 
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

include model('mobile');
$_W['styles'] = mobile_styles();

if (empty($_GPC['name'])) {
	message('抱歉，模块不存在或是已经被禁用！');
}

$modulename = !empty($_GPC['name']) ? $_GPC['name'] : 'basic';
$exist = false;
foreach($_W['account']['modules'] as $m) {
	if(strtolower($m['name']) == $modulename) {
		$exist = true;
		break;
	}
}
if(!$exist) {
	message('抱歉，你操作的模块不能被访问！');
}
$site = WeUtility::createModuleSite($modulename);
if (is_error($site)) {
	exit($site['errormsg']);
}
$site->module = $_W['account']['modules'][$modulename];
$site->weid = $_W['weid'];
$site->inMobile = true;

if(isset($_GPC['do'])) {
	$method = 'doMobile'.$_GPC['do'];
}

if (method_exists($site, $method)) {
	exit(@$site->$method());
} else {
	exit("访问的方法 {$method} 不存在.");
}
