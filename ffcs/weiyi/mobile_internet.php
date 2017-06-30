<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-1-14
 * Time: 上午10:31
 * 移动互联网应用活动入口
 */

define('IN_SYS', true);
require './source/bootstrap.inc.php';
define('CONTROLLER', 'mobile_internet');
checklogin();
checkaccount();

$actions = array('bainian','reply','fans_update');
$action = $_GET['act'];
$action = in_array($action, $actions) ? $action : 'bainian';
require router(CONTROLLER, $action);