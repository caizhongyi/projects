<?php 
/**
 * 微站风格管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
$rulename = "{$_W['account']['name']}公众号的微站首页";
$rule = pdo_fetch("SELECT id FROM ".tablename('rule')." WHERE name = '$rulename' AND weid = '{$_W['weid']}'");
if (empty($rule)) {
	header('Location: '.$_W['siteroot'] . create_url('rule/post', array('module' => 'news', 'name' => $rulename)));
	exit;
} else {
	header('Location: '.$_W['siteroot'] . create_url('rule/post', array('module' => 'news', 'id' => $rule['id'])));
	exit;
}