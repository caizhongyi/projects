<?php
/**
 * 粉丝管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */

require './source/bootstrap.inc.php';
define('CONTROLLER', 'fans');

checklogin();
checkaccount();

$actions = array('display', 'post', 'delete','update');
$action = in_array($action, $actions) ? $action : 'display';

require router(CONTROLLER, $action);