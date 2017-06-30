<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
include_once model('setting');

$uid = intval($_GPC['uid']);
$m = array();
$m['uid'] = $uid;
$member = member_single($m);
$founders = explode(',', $_W['config']['setting']['founder']);
if(empty($member) || in_array($m['uid'], $founders)) {
	message('访问错误.');
}
$do = $_GPC['do'];
$dos = array('edit', 'deny', 'delete', 'auth', 'revo', 'revos');
$do = in_array($do, $dos) ? $do: 'edit';

if ($do == 'edit') {
	$extendfields = pdo_fetchall("SELECT field, title, description, required FROM ".tablename('profile_fields')." WHERE available = '1' AND showinregister = '1'");

    $groups = array();
    if(!$_W['isfounder']){
        $groups = get_son_groups($_W['uid']);
    }else{
        $groups = pdo_fetchall("SELECT id, name FROM ".tablename('members_group')." ORDER BY id ASC");
    }
	if(checksubmit('profile_submit')) {
		require_once IA_ROOT . '/source/model/member.mod.php';
		$nMember = array();
		$nMember['uid'] = $uid;
		$nMember['password'] = $_GPC['password'];
		$nMember['salt'] = $member['salt'];
        $nMember['groupid'] = intval($_GPC['groupid']);
        $group_val = array();
        foreach ($groups as $_group_v){
            $group_val[$_group_v['id']] = $_group_v['name'];
        }
        $arr_groupids = array_keys($group_val);
        if(!in_array($nMember['groupid'],$arr_groupids)) {
            message('非常抱歉，您选择的用户组不存在！');
        }

		if(!empty($nMember['password']) && istrlen($nMember['password']) < 8) {
			message('必须输入密码，且密码长度不得低于8位。');
		}
		$nMember['lastip'] = $_GPC['lastip'];
		$nMember['lastvisit'] = strtotime($_GPC['lastvisit']);
		$nMember['remark'] = $_GPC['remark'];
		member_update($nMember);
		if (!empty($extendfields)) {
			foreach ($extendfields as $row) {
				if($row['field'] != 'profile') $profile[$row['field']] = $_GPC[$row['field']];
			}
			if (!empty($profile)) {
				$exists = pdo_fetchcolumn("SELECT uid FROM ".tablename('members_profile')." WHERE uid = :uid", array(':uid' => $uid));
				if (!empty($exists)) {
					pdo_update('members_profile', $profile, array('uid' => $uid));
				} else {
					$profile['uid'] = $uid;
					pdo_insert('members_profile', $profile);
				}
			}
		}
		$isupdategroup = false;
		if ($nMember['groupid'] != $member['groupid']) {
			$isupdategroup = true;
		}
		if(member_update($nMember) !== false) {
			//变更用户组后，变更相关模块操作权限
			//获取用户已有权限，跳过已有的模块权限，添加未有的
			$membermodules = pdo_fetchall("SELECT mid FROM ".tablename('members_modules')." WHERE uid = :uid", array(':uid' => $uid), 'mid');
			$newgroup = pdo_fetch("SELECT modules FROM ".tablename('members_group')." WHERE id = :id", array(':id' => $nMember['groupid']));
			$oldgroup = pdo_fetch("SELECT modules FROM ".tablename('members_group')." WHERE id = :id", array(':id' => $member['groupid']));
			
			if (!empty($newgroup['modules'])) {
				$newgroup['modules'] = iunserializer($newgroup['modules']);
				$newgroup['modules'] = pdo_fetchall("SELECT mid FROM ".tablename('modules')." WHERE mid IN ('".implode("','", (array)$newgroup['modules'])."')", array(), 'mid');
				
				$oldgroup['modules'] = iunserializer($oldgroup['modules']);
				$oldgroup['modules'] = pdo_fetchall("SELECT mid FROM ".tablename('modules')." WHERE mid IN ('".implode("','", (array)$oldgroup['modules'])."')", array(), 'mid');
				
				if (!empty($oldgroup['modules'])) {
					foreach ($oldgroup['modules'] as $group) {
						if (isset($newgroup['modules'][$group['mid']])) {
							unset($newgroup['modules'][$group['mid']]);
							unset($oldgroup['modules'][$group['mid']]);
						}
					}
				}
				if (!empty($newgroup['modules'])) {
					foreach ($newgroup['modules'] as $index => $row) {
						if (isset($membermodules[$row['mid']])) {
							continue;
						}
						pdo_insert('members_modules', array('uid' => $uid, 'mid' => $row['mid']));
					}
				}
				if (!empty($oldgroup['modules'])) {
					pdo_query("DELETE FROM ".tablename('members_modules')." WHERE mid IN (".implode(',', array_keys($oldgroup['modules'])).") AND uid = '$uid'");
				}
			}
			message('保存用户资料成功！', 'refresh');
		}
	}
	if (!empty($extendfields)) {
		foreach ($extendfields as $row) {
			$fields[] = $row['field'];
		}
		$member['profile'] = pdo_fetch("SELECT `".implode("`,`", $fields)."` FROM ".tablename('members_profile')." WHERE uid = :uid", array(':uid' => $uid));
	}

	template('member/edit');
} elseif($do == 'delete') {
	if($_W['ispost'] && $_W['isajax']) {
		$founders = explode(',', $_W['config']['setting']['founder']);
		if(in_array($uid, $founders)) {
			exit('管理员用户不能删除.');
		}
		$member = array();
		$member['uid'] = $uid;
		if(pdo_delete('members', $member) === 1) {
			exit('success');
		}
	}
}
elseif($do == 'deny') {
	if($_W['ispost'] && $_W['isajax']) {
		$founders = explode(',', $_W['config']['setting']['founder']);
		if(in_array($uid, $founders)) {
			exit('管理员用户不能禁用.');
		}
		$member = array();
		$member['uid'] = $uid;
		$status = $_GPC['status'];
		$member['status'] = $status == '-1' ? '-1' : '0';
		if(member_update($member)) {
			exit('success');
		}
	}
}
elseif($do == 'auth') {
	$mod = $_GPC['mod'];
	if($mod == 'account') {
		$weid = intval($_GPC['wechat']);
		if(empty($weid)) {
			exit('error');
		}

		if($member['status'] == '-1') {
			exit('此用户已经被禁用. ');
		}
		$wechat = array();
		$wechat['uid'] = $uid;

		if(pdo_update('wechats', $wechat, array('weid' => $weid))) {
			pdo_delete('wechats_modules', array('weid' => $weid));
			exit('success');
		} else {
			exit('error');
		}
	}
	if($mod == 'module') {
		$mid = intval($_GPC['mid']);
		$sql = 'SELECT * FROM ' . tablename('modules') . " WHERE `mid`='{$mid}'";
		$module = pdo_fetch($sql);
		if(empty($module) || $module['issystem']) {
			exit('不存在的模块, 或者此模块是系统模块, 不能操作.');
		}

		$sql = 'SELECT * FROM ' . tablename('members_modules') . " WHERE `uid`='{$uid}' AND `mid`='{$mid}'";
		$mapping = pdo_fetch($sql);
		if(empty($mapping)) {
			$record = array();
			$record['uid'] = $uid;
			$record['mid'] = $mid;
			if(pdo_insert('members_modules', $record)) {
				pdo_query("DELETE FROM ".tablename('wechats_modules')." WHERE mid = '$mid' AND weid IN (SELECT weid FROM ".tablename('wechats')." WHERE uid = '$uid')");
				exit('success');
			}
		}
		exit('error');
	}
}

elseif($do == 'revo') {
	$mod = $_GPC['mod'];
	if($mod == 'account') {
		$weid = intval($_GPC['wechat']);
		if(empty($weid)) {
			exit('error');
		}

		$wechat = array();
		$wechat['uid'] = $_W['uid'];

		if(pdo_update('wechats', $wechat, array('weid' => $weid))) {
			exit('success');
		} else {
			exit('error');
		}
	}
	if($mod == 'module') {
		$mid = intval($_GPC['mid']);
		$sql = 'SELECT * FROM ' . tablename('modules') . " WHERE `mid`='{$mid}'";
		$module = pdo_fetch($sql);
		if(empty($module) || $module['issystem']) {
			exit('不存在的模块, 或者此模块是系统模块, 不能操作.');
		}

		$record = array();
		$record['uid'] = $uid;
		$record['mid'] = $mid;
		if(pdo_delete('members_modules', $record)) {
			pdo_query("DELETE FROM ".tablename('wechats_modules')." WHERE mid = '$mid' AND weid IN (SELECT weid FROM ".tablename('wechats')." WHERE uid = '$uid')");
			exit('success');
		}
		exit('error');
	}
}
elseif($do == 'revos') {
	$mod = $_GPC['mod'];
	if($mod == 'account') {
		$uid = $_W['uid'];
		$wechats = explode(',', $_GPC['wechats']);
		$weids = array();
		foreach($wechats as $w) {
			$weid = intval($w);
			if($weid) {
				array_push($weids, $weid);
			}
		}
		$weids = implode(',', $weids);
		$sql = 'UPDATE ' . tablename('wechats') . " SET `uid`=:uid WHERE `weid` IN ({$weids})";
		$params = array();
		$params[':uid'] = $uid;
		if(pdo_query($sql, $params)) {
			exit('success');
		} else {
			exit('error');
		}
	}
	if($mod == 'module') {
		$mids = explode(',', $_GPC['mids']);
		$ms = array();
		foreach($mids as $w) {
			$mid = intval($w);
			if($mid) {
				array_push($ms, $mid);
			}
		}
		$mids = implode(',', $ms);
		$sql = 'DELETE FROM ' . tablename('members_modules') . " WHERE `uid`='{$uid}' AND `mid` IN ($mids)";
		if(pdo_query($sql)) {
			exit('success');
		}
		exit('error');
	}
}

