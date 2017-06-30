<?php 
/**
 * 设置中心
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
define('IN_SYS', true);
require 'source/bootstrap.inc.php';
checklogin();

if (empty($_W['isfounder'])) {
	$actions = array('profile', 'updatecache');
} else {
	$actions = array('profile', 'module', 'designer', 'common', 'updatecache', 'register', 'copyright', 'template', 'style', 'database', 'upgrade', 'category', 'fields', 'menu', 'help', 'helpcategory');
}
$action = in_array($_GPC['act'], $actions) ? $_GPC['act'] : message('您无权限进行该操作！');

$controller = 'setting';
require router($controller, $action);

