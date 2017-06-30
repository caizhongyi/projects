<?php
/**
 * 统计分析
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
define('IN_SYS', true);
require './source/bootstrap.inc.php';
checklogin();
checkaccount();

$actions = array('history', 'rule', 'keyword', 'trend', 'reply', 'pu');
$action = in_array($_GPC['act'], $actions) ? $_GPC['act'] : 'history';

$controller = 'stat';
require router($controller, $action);

