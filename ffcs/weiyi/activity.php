<?php
/**
 * 微活动模块
 *
 */
define('IN_SYS', true);
require './source/bootstrap.inc.php';
define('CONTROLLER', 'activity');
checklogin();
checkaccount();

$actions = array('display', 'post', 'system', 'delete');
$action = $_GET['act'];
$action = in_array($action, $actions) ? $action : 'display';

if (empty($_W['account']['modules'])) {
	message('抱歉，未发现您系统中的可用模块，请更新缓存或是联系官方！', '', 'error');
}
require router(CONTROLLER, $action);