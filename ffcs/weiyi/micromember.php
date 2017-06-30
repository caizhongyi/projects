<?php
/**
 * 微会员管理
 *
 */
define('IN_SYS', true);
require './source/bootstrap.inc.php';
checklogin();
checkaccount();

$actions = array('setbusiness', 'setcard', 'manage','setsubbusiness','cardright','member', 'setconfig','pointset','notify','coupon','giftvoucher','rule');

$action = $_GET['act'];
$action = in_array($action, $actions) ? $action : 'setbusiness';

$controller = 'micromember';
require router($controller, $action);
