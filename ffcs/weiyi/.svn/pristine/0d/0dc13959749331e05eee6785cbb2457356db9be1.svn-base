
<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-3-13
 * Time: 下午7:02
 * 营业厅入口包括资源库、报表统计
 */
define('IN_SYS', true);
require 'source/bootstrap.inc.php';
define('CONTROLLER', 'businessoffice');
checklogin();
$actions = array('library', 'post', 'delete','update');
$action = in_array($action, $actions) ? $action : 'library';
require router(CONTROLLER, $action);