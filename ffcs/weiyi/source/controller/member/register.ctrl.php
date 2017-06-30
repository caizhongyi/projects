<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

$current['register'] = ' class="current"';
$setting = cache_load('setting');
if (empty($setting['register']['open'])) {
	message('本站暂未开启注册功能，请联系管理员！');
}
$extendfields = pdo_fetchall("SELECT field, title, description, required FROM ".tablename('profile_fields')." WHERE available = '1' AND showinregister = '1' ORDER BY displayorder DESC");
if(checksubmit()) {
	require_once IA_ROOT . '/source/model/member.mod.php';
	hooks('member:register:before');
	$member = array();
	$member['username'] = trim($_GPC['username']);
	if(!preg_match(REGULAR_USERNAME, $member['username'])) {
		message('必须输入用户名，格式为 3-15 位字符，可以包括汉字、字母（不区分大小写）、数字、下划线和句点。');
	}
	if(member_check(array('username' => $member['username']))) {
		message('非常抱歉，此用户名已经被注册，你需要更换注册名称！');
	}
	$member['password'] = $_GPC['password'];
	if(istrlen($member['password']) < 8) {
		message('必须输入密码，且密码长度不得低于8位。');
	}
	$profile = array();
	if (!empty($extendfields)) {
		foreach ($extendfields as $row) {
			if (!empty($row['required']) && empty($_GPC[$row['field']])) {
				message('“'.$row['title'].'”此项为必填项，请返回填写完整！');
			}
			$profile[$row['field']] = $_GPC[$row['field']];
		}
	}
    $member['email'] = $_GPC['email']; //FIXME 增加邮件，请勿替换掉啦! by hongmingjie。
	if(!empty($setting['register']['code'])) {
		$code = $_GPC['code'];
		$hash = md5($code . $_W['config']['setting']['authkey']);
		if($_GPC['__code'] != $hash) {
			message('你输入的验证码不正确, 请重新输入.');
		}
	}
	$member['status'] = !empty($setting['register']['verify']) ? -1 : 0;
	$member['remark'] = '';
	$member['groupid'] = intval($setting['register']['groupid']);
	$uid = member_register($member);
	if($uid > 0) {
		unset($member['password']);
		$member['uid'] = $uid;
		//处理用户资料
		if (!empty($profile)) {
			$profile['uid'] = $uid;
			$profile['createtime'] = TIMESTAMP;
			pdo_insert('members_profile', $profile);
		}
		//有用户组则添加相关权限
		if (! empty($member['groupid'])) {
			$group = pdo_fetch("SELECT modules FROM " . tablename('members_group') . " WHERE id = :id", array(
				':id' => $member['groupid']
			));
			if (! empty($group['modules'])) {
				$group['modules'] = iunserializer($group['modules']);
				if (is_array($group['modules'])) {
					$modules = pdo_fetchall("SELECT mid FROM " . tablename('modules') . " WHERE mid IN ('" . implode("','", $group['modules']) . "')");
					if (! empty($modules)) {
						foreach ( $modules as $row ) {
							pdo_insert('members_modules', array(
								'uid' => $uid, 
								'mid' => $row['mid']
							));
						}
					}
				}
			}
		}
		hooks('member:register:success', $member);
		message('注册成功'.(!empty($setting['register']['verify']) ? '，請等待管理员审核！' : '，请重新登录！'), create_url('member/login', array('uid' => $uid, 'username' => $member['username'])));
	}
	message('增加用户失败，请稍候重试或联系网站管理员解决！');
}
template('member/register');