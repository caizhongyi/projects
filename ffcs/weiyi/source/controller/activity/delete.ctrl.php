<?php 
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
if ($_GPC['type'] == 'activity') {
	$rid = intval($_GPC['id']);
	$activity = pdo_fetch("SELECT id, module FROM ".tablename('rule')." WHERE id = :id", array(':id' => $rid));
	if (empty($activity)) {
		message('抱歉，要修改的规则不存在或是已经被删除！');
	}
	//删除回复，关键字及规则
	if (pdo_delete('rule', array('id' => $rid))) {
		//删除活动的同时,也删除掉对应的规则
		pdo_delete('rule_keyword', array('rid' => $rid));
		//删除统计相关数据
		pdo_delete('stat_rule', array('rid' => $rid));
		pdo_delete('stat_keyword', array('rid' => $rid));
		//调用模块中的删除
		$module = module($activity['module']);
		if (method_exists($module, 'ruleDeleted')) {
			$module->ruleDeleted($rid);
		}
	}
	message('活动操作成功！', create_url('activity/display'));	
} elseif ($_GPC['type'] == 'keyword') {
	$rid = intval($_GPC['rid']);
	$kid = intval($_GPC['kid']);
	$activity = pdo_fetch("SELECT id, module FROM ".tablename('rule')." WHERE id = :id", array(':id' => $rid));
	if (empty($activity)) {
		message('抱歉，要修改的活动不存在或是已经被删除！');
	}
	pdo_delete('rule_keyword', array('rid' => $rid, 'id' => $kid));
	pdo_delete('stat_keyword', array('kid' => $kid));
	message('关键字删除成功！', '', 'success');
}