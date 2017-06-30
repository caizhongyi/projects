<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
define('IN_MANAGEMENT', true);
$id = intval($_GPC['id']);
$row = pdo_fetch("SELECT weid, name, uid FROM ".tablename('wechats')." WHERE weid = '$id'");
if (!checkpermission('wechats', $row)) {
	message('抱歉，您没有权限操作该公众号！');
}
if (empty($row)) {
	message('抱歉，该公众号不存在或是已经被删除！', create_url('account/display'));
}
cache_write('weid:' . $_W['uid'], $row['weid']);
isetcookie('__weid', $row['weid'], 7 * 46800);
if($_GPC['action']=='guide'){
    $_W['action']='parent_reload';
    message('切换成功！',create_url('index/frame'));
}
$url = create_url('index/frame');
$script =  "<script>window.location.href='$url';</script>";
template('member/switch');
