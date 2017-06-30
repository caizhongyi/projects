<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-11-15
 * Time: 上午9:28
 * 数据导出
 */
define('IN_SYS', true);
define('CONTROLLER', 'export');
require './source/bootstrap.inc.php';
$actions = array('daren', 'lottery');
$action = in_array($_GPC['act'], $actions) ? $_GPC['act'] : 'daren';
require router(CONTROLLER, $action);
