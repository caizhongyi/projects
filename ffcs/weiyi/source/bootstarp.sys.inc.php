<?php
/**
 * 微翼管理后台初始化文件
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */

$session = json_decode(base64_decode($_GPC['__session']), true);
if (is_array($session)) {
    $member = member_single(array(
        'uid' => $session['uid']
    ));
    if (is_array($member) && $session['hash'] == md5($member['password'] . $member['salt'])) {
        $_W['uid'] = $member['uid'];
        $_W['username'] = $member['username'];
        $member['currentvisit'] = $member['lastvisit'];
        $member['currentip'] = $member['lastip'];
        $member['lastvisit'] = $session['lastvisit'];
        $member['lastip'] = $session['lastip'];
        $_W['member'] = $member;
        $founder = explode(',', $_W['config']['setting']['founder']);
        $_W['isfounder'] = in_array($_W['uid'], $founder) ? true : false;
    } else {
        isetcookie('__session', false, - 100);
    }
    unset($member);
}
unset($session);

if (! empty($_GPC['__weid'])) {
    $_W['weid'] = intval($_GPC['__weid']);
} else {
    cache_load('weid:' . $_W['uid']);
    $_W['weid'] = intval($_W['cache']['weid'][$_W['uid']]);
}

if (! empty($_W['uid'])) {
    //获取当前用户可操作的公众号
    $_W['wechats'] = account_search();
} else {
    $_W['wechats'][$_W['weid']] = pdo_fetch("SELECT * FROM " . tablename('wechats') . " WHERE weid = :weid", array(
        ':weid' => $_W['weid']
    ));
}
foreach ( $_W['wechats'] as &$w ) {
    $w['default_message'] = iunserializer($w['default_message']);
    $w['access_token'] = iunserializer($w['access_token']);
}
if (! empty($_W['weid'])) {
    $_W['account'] = $_W['wechats'][$_W['weid']];
    $_W['account']['template'] = pdo_fetchcolumn("SELECT name FROM " . tablename('site_templates') . " WHERE id = '{$_W['account']['styleid']}'");
    $_W['account']['payment'] = iunserializer($_W['account']['payment']);
    $default = iunserializer($_W['account']['default']);
    $welcome = iunserializer($_W['account']['welcome']);
    $_W['account']['default'] = empty($default) ? $_W['account']['default'] : $default;
    $_W['account']['welcome'] = empty($welcome) ? $_W['account']['welcome'] : $welcome;
    $_W['account']['modules'] = account_module();
}
$action = $_GPC['act'];
$do = $_GPC['do'];

cache_load('modules');
$_W['setting'] = (array)cache_load("setting");


require IA_ROOT . '/source/class/menu.class.php';
$menu_obj = new menu();
//$menu_obj->check_priv();
$parent_menus = $menu_obj->admin_menu(0);

$menus = array();

if(!empty($parent_menus)){
	foreach ($parent_menus as $pmenu){
		$menu_items = array();
		$subs = $menu_obj->admin_menu($pmenu['id']);
		if(!empty($subs)){
			foreach ($subs as $sub){
				$sub_url = $sub['m'] . '.php?act=' . $sub['a'];
				if(!empty($sub['d'])) $sub_url .= '&do=' . $sub['d'];
				if(!empty($sub['n'])) $sub_url .= '&name=' . $sub['n'];
				if(!empty($sub['data'])) $sub_url .= '&' . $sub['data'];
				$menu_items[] = array($sub['ch_name'], $sub_url);
			}
		}
		if($pmenu['plink']){
			$_url = $pmenu['m'] . '.php?act=' . $pmenu['a'];
			if(!empty($pmenu['d'])) $_url .= '&do=' . $pmenu['d'];
			if(!empty($pmenu['n'])) $_url .= '&name=' . $pmenu['n'];
			if(!empty($pmenu['data'])) $_url .= '&' . $pmenu['data'];
		}
		$menus[] = array(
				'title' => $pmenu['ch_name'],
				'url' => $_url,
				'icon' => $pmenu['icon'],
				'items' => $menu_items,
				'plink' => $pmenu['plink']
		);
	}
}

$_W['menus'] = $menus;

//公众号分页
if($_W['isfounder']){
    $pindex = max(1, intval($_GPC['wechatpages']));
    $psize = 20;
    $condition .= $_W['isfounder'] ? '' : " AND uid = '{$uid}'";
    $sql = "SELECT * FROM " . tablename('wechats') . " WHERE 1 $condition ORDER BY `weid` DESC LIMIT ".($pindex - 1) * $psize.','. $psize;
    $_W['founder_wechats'] = pdo_fetchall($sql);
    $total = pdo_fetchcolumn("SELECT count(*) as num FROM " . tablename('wechats') . " WHERE 1 $condition");
    $_W['founder_pager'] = pagination($total, $pindex, $psize,'',array('before' => 1, 'after' => 1, 'ajaxcallback' => ''),"wechatpages");
}
