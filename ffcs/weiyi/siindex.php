<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
define('IN_SYS', true);
require './source/bootstrap.inc.php';
define('CONTROLLER', 'sisite');

$actions = array('index');
$action = in_array($action, $actions) ? $action : 'index';

require router(CONTROLLER, $action);
