<?php
/**
 * 用户管理
 * 
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
define('IN_SYS', true);
require 'source/bootstrap.inc.php';

$actions = array();
$action = $_GET['act'];
if($_W['uid']) {
	$actions = array('logout', 'setting', 'wechat', 'module','register','check','login', 'barcode','tpl','display', 'create', 'edit');

    if($_W['isfounder']) {
        $actions = array_merge($actions, array('select','login', 'group', 'fields', 'permission','tpl'));
    }
	if (!in_array($action, $actions)) {
		header('Location: ./index.php');
	}
} else {
	$actions = array('login','register', 'code', 'default','check','tpl');
	$action = in_array($action, $actions) ? $action : 'login';
}

$controller = 'member';
require router($controller, $action);

function _login($forward = '') {
	global $_GPC;
	require_once IA_ROOT . '/source/model/member.mod.php';
	hooks('member:login:before');
	$member = array();
	$username = trim($_GPC['username']);
	if(empty($username)) {
		//message('请输入要登录的用户名或者邮箱');
        echo json_encode(array('errno'=>-1,'error'=>'用户名不正确！','url_route'=>create_url('index/frame')));
        exit();
	}
	if(strpos($username, '@') > -1) {
		if(!preg_match(REGULAR_EMAIL, $username)) {
			//message('输入的邮箱不正确');
            echo json_encode(array('errno'=>-1,'error'=>'邮箱不正确！','url_route'=>create_url('index/frame')));
            exit();
		}
		$member['username'] = $username;
	} else {
		if(!preg_match(REGULAR_USERNAME, $username)) {
			//message('输入的用户名不正确！');
            echo json_encode(array('errno'=>-1,'error'=>'用户名不正确！','url_route'=>create_url('index/frame')));
            exit();
		}
		$member['username'] = $username;
	}
	$member['password'] = $_GPC['password'];
	if(empty($member['password'])) {
		//message('请输入密码');
        echo json_encode(array('errno'=>-2,'error'=>'请输入密码！','url_route'=>create_url('index/frame')));
        exit();
	}
	$record = member_single($member);

	if(!empty($record)) {
		if($record['status'] == -1) {
			//message('您的账号已经被系统禁止，请联系网站管理员解决！');
            echo json_encode(array('errno'=>-3,'error'=>'您的账号正在核合或是已经被系统禁止，请联系网站管理员解决！','url_route'=>create_url('index/frame')));
            exit();
		}
		$cookie = array();
		$cookie['uid'] = $record['uid'];
		$cookie['lastvisit'] = $record['lastvisit'];
		$cookie['lastip'] = $record['lastip'];
		$cookie['hash'] = md5($record['password'] . $record['salt']);
		$session = base64_encode(json_encode($cookie));
		isetcookie('__session', $session, !empty($_GPC['rember']) ? 7 * 86400 : 0);
		$status = array();
		$status['uid'] = $record['uid'];
		$status['lastvisit'] = TIMESTAMP;
		$status['lastip'] = CLIENT_IP;
		member_update($status);
		hooks('member:login:success');
		if(empty($forward)) {
			$forward = $_GPC['forward'];
		}
		if(empty($forward)) {
			//$forward = './index.php?act=frame';
            $forward = create_url('index/frame',array('t'=>TIMESTAMP));
		}
        //前台登录
        if(!empty($_GPC['indexlogin'])){
            $urltemp = json_encode(array('errno'=>200,'url_route'=>create_url('index/frame')));
            echo $urltemp;
            exit();
        }
        //后台登录
        if(!empty($_GPC['adminlogin'])){
            echo json_encode(array('errno'=>200,'url_route'=>create_url('index/frame')));
            exit();
        }
        //更新缓存
        include_once model('cache');
        include_once model('setting');
        cache_build_template();
        cache_build_modules();
        cache_build_fans_struct();
        cache_build_hook();
        cache_build_setting();
        header('location:'.$forward);
	} else {
        $check_member['username'] = $member['username'];
        if(!member_check($check_member)){
            echo json_encode(array('errno'=>-1,'error'=>'用户名不存在','url_route'=>create_url('index/frame')));
            exit();
        }
        $check_member['password'] = $member['password'];
        if(!member_check($check_member)){
            echo json_encode(array('errno'=>-2,'error'=>'密码错误！','url_route'=>create_url('index/frame')));
            exit();
        }
        echo json_encode(array('errno'=>-2,'error'=>'密码错误！','url_route'=>create_url('index/frame')));
        exit();
	}
}

