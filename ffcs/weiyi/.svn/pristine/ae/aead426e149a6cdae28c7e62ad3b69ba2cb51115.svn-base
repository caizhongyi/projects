<?php 
/**
 * 设置中心
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
define('IN_SYS', true);
require './source/bootstrap.inc.php';
$actions = array('send_message','fans_update','history_update','fans_phone','hcode','group','update_menu');
$action = in_array($_GPC['act'], $actions) ? $_GPC['act'] : 'send_message';

$controller = 'task';

require router($controller, $action);

