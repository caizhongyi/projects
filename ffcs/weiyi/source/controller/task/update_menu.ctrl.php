<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-2-19
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');
$_W['weid'] = $_GPC['weid'];
$sql = 'select * from ' . tablename('wechats') . ' where weid =' . $_W['weid'] . ' limit 1';
$account = pdo_fetch($sql);
$atype = '';
$gateway = array();
if ($account['type'] == '1') {
    $atype = 'weixin';
    $gateway['get'] = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s";
    $gateway['create'] = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s";
    $gateway['delete'] = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s";
}
if ($account['type'] == '2') {
    $atype = 'yixin';
    $gateway['get'] = "https://api.yixin.im/cgi-bin/menu/get?access_token=%s";
    $gateway['create'] = "https://api.yixin.im/cgi-bin/menu/create?access_token=%s";
    $gateway['delete'] = "https://api.yixin.im/cgi-bin/menu/delete?access_token=%s";
}
$account_token = "account_{$atype}_token";
$account_code = "account_weixin_code";

$menus = array();
// fixme  $account为对应的公众帐号信息 小小小微助手

if (empty($menus) || !is_array($menus)) {
    $token = $account_token($account);
    $url = sprintf($gateway['get'], $token);
    $content = ihttp_get($url);
    if (empty($content)) {
        message('获取菜单数据失败，请重试！');
    }
    $dat = $content['content'];
    $menus = @json_decode($dat, true);
}
if (empty($menus) || !is_array($menus)) {
    message('获取菜单数据失败，请重试！');
}

if ($menus['errcode'] && !in_array($menus['errcode'], array(46003))) {
    message("公众平台返回接口错误. <br />错误代码为: {$menus['errcode']} <br />错误信息为: {$menus['errmsg']} <br />错误描述为: " . $account_code($menus['errcode']));
}
if (is_string($menus['menu'])) {
    $menus['menu'] = @json_decode($menus['menu'], true);
}
if (!is_array($menus['menu'])) {
    $menus['menu'] = array();
}
//自定义菜单显示bug
if (!is_array($menus['menu']['button'])) {
    $button = json_decode($menus['menu'], 1);
    $menus['menu'] = $button;
}
echo "更新前菜单：<br>";
var_dump($menus['menu']['button']);
echo "<br><hr>";
if (is_array($menus['menu']['button'])) {
    foreach ($menus['menu']['button'] as &$m) {
        if ($m['key']) {
            $result = explode(':', $m['key']);
            if ($result['1']) {
                $sql = 'select * from ' . tablename('rule_keyword') . ' where rid =' . trim($result['1']) . ' limit 1';
                $rule_keyword = pdo_fetch($sql);
                $m['key'] = urlencode($rule_keyword['content']);
            } else {
                $m['key'] = urlencode($m['key']);
            }
        }
        if ($m['name']) {
            $m['name'] = urlencode($m['name']);
        }
        if (is_array($m['sub_button'])) {
            foreach ($m['sub_button'] as &$s) {
                if ($s['key']) {
                    $result = explode(':', $s['key']);
                    if ($result['1']) {
                        $sql = 'select * from ' . tablename('rule_keyword') . ' where rid =' . trim($result['1']) . ' limit 1';
                        $rule_keyword = pdo_fetch($sql);
                        $s['key'] = urlencode($rule_keyword['content']);
                    } else {
                        $s['key'] = urlencode($s['key']);
                    }
                }
                if ($s['name']) {
                    $s['name'] = urlencode($s['name']);
                }
            }
        }
    }
    $update_menus = $menus['menu']['button'];
    $ms['button'] = $update_menus;
    $dat = json_encode($ms);
    $dat = urldecode($dat);
    echo "更新后菜单：<br>";
    var_dump($dat);
    $url = sprintf($gateway['create'], $token);
    $content = ihttp_post($url, $dat);
    $dat = $content['content'];
    $result = @json_decode($dat, true);
    if ($result['errcode'] == '0') {
        isetcookie($menusetcookie, '', -500);
        // message('已经成功创建菜单. ', create_url('menu'));
        echo "<br>" . $account['name'] . "更新成功！";
    } else {
        echo "<br>" . $account['name'] . "更新失败！";
    }
}
