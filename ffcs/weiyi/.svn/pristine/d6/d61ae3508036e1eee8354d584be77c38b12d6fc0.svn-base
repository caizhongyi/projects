<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
$founder = explode(',', $_W['config']['setting']['founder']);
$list = account_search($_W['uid'], intval($_GPC['type']));
if (!empty($list)) {
	foreach ($list as $row) {
		$uids[$row['uid']] = $row['uid'];
	}
	$users = pdo_fetchall("SELECT uid, username FROM ".tablename('members')." WHERE uid IN (".implode(',', $uids).")", array(), 'uid');
}
template('account/display');