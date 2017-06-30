<?php
/**
 * 微信墙 1.1升级程序
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 * ALTER TABLE `ims_wxwall_reply` ADD `syncwall` VARCHAR( 2000 ) NOT NULL DEFAULT '' COMMENT '第三方墙';
ALTER TABLE `ims_wxwall_members` DROP `nickname`, DROP `avatar`, DROP `isjoin`;
 */

$step = empty($_GPC['step']) ? 1 : intval($_GPC['step']);

if ($step == '1') {
	print '<p>本程序用于“微擎 - 微信墙”数据升级用。</p><p>升级前请强烈建议您备份好数据！确认升级请点击<a href="'.create_url('setting/module/upgrade', array('id' => 'wxwall', 'step' => 2)).'">“开始升级”</a></p>';
	exit();
} elseif ($step == '2') {
	$pindex = max(1, intval($_GPC['page']));
	$psize = 100;
	$start_limit = ($pindex - 1) * $psize;

	$users = pdo_fetchall("SELECT nickname, avatar, from_user, rid FROM ".tablename('wxwall_members')." WHERE nickname <> '' AND avatar <> '' LIMIT " . $start_limit . ',' . $psize);
	$total = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('wxwall_members')." WHERE nickname <> '' AND avatar <> ''");
	
	if (!empty($users)) {
		foreach ($users as $user) {
			$rids[$user['rid']] = $user['rid'];
		}
		if (!empty($rids)) {
			$rules = pdo_fetchall("SELECT weid, id FROM ".tablename('rule')." WHERE id IN (".implode(',', $rids).")", array(), 'id');
		}
		foreach ($users as $user) {
			$exists = pdo_fetch("SELECT id, weid FROM ".tablename('fans')." WHERE from_user = '{$user['from_user']}'");
			$data = array(
				'nickname' => $user['nickname'],
				'avatar' => $user['avatar'],
				'from_user' => $user['from_user'],
			);
			if (!empty($rules[$user['rid']]['weid'])) {
				$data['weid'] = $rules[$user['rid']]['weid'];
			}
			if (!empty($exists['id'])) {
				pdo_update('fans', $data, array('from_user' => $user['from_user']));
			} else {
				if (empty($data['weid'])) {
					$data['weid'] = 0;
				}
				pdo_insert('fans', $data);
			}
		}
	}
	$pindex += 1;
	$maxpages = ceil($total / $psize);
	if ($pindex <= $maxpages) {
		nexttips('已经完成'.$start_limit . ',' . ($start_limit + $psize) . '条数据！共 '.$total.'条数据！', 2, 'page='.$pindex);
	} else {
		nexttips('数据转换完成！', 3);
	}
} elseif ($step == 3) {
	pdo_query("ALTER TABLE ".tablename('wxwall_reply')." ADD `syncwall` VARCHAR( 2000 ) NOT NULL COMMENT 'syncwall';");
	pdo_query("ALTER TABLE ".tablename('wxwall_members')." DROP `nickname`, DROP `avatar`, DROP `isjoin`;");
	$menus = 'a:4:{i:0;a:2:{i:0;s:12:"查看内容";i:1;s:49:"index.php?act=module&do=detail&name=wxwall&id=%id";}i:1;a:2:{i:0;s:12:"审核内容";i:1;s:49:"index.php?act=module&do=manage&name=wxwall&id=%id";}i:2;a:2:{i:0;s:12:"中奖名单";i:1;s:52:"index.php?act=module&do=awardlist&name=wxwall&id=%id";}i:3;a:2:{i:0;s:9:"黑名单";i:1;s:52:"index.php?act=module&do=blacklist&name=wxwall&id=%id";}}';
	pdo_query("UPDATE ".tablename('modules')." SET menus = '$menus' WHERE name = 'wxwall';");
	cache_build_modules();
}
function nexttips($message = '', $step,  $suffix = '') {
	print '<p>'.$message.'。如果浏览器未自动跳转，请点击<a href="'.create_url('setting/module/upgrade', array('id' => 'wxwall')).'&step='.$step.'&'.$suffix.'">“下一步”</a></p>';
	print '<script type="text/javascript">';
	print 'setTimeout(function(){';
	print "location.href = '".create_url('setting/module/upgrade', array('id' => 'wxwall')).'&step='.$step.'&'.$suffix."';";
	print '}, 2000);';
	print '</script>';
	exit;
}
