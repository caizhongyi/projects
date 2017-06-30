<?php 
/**
 * 微站模板管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
if ($do == 'edit') {
	
} else {
	$templateid = intval($_GPC['templateid']);
	$template = pdo_fetch("SELECT * FROM ".tablename('site_templates')." WHERE id = '{$templateid}'");
	if (empty($template)) {
		message('抱歉，模板不存在或是已经被删除！', '', 'error');
	}
	template('site/template');
}