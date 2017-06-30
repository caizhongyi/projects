<?php
/**
 * 文章管理--导入图文规则
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */

defined('IN_IA') or exit('Access Denied');
checkaccount();
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'all';
$condition = '';
if($do == 'all'){
    $rules = pdo_fetchall("SELECT * FROM ".tablename('rule')." WHERE weid = '{$_W['weid']}' and module = 'news' ORDER BY id DESC ");
    $news = pdo_fetchall("SELECT * FROM ".tablename('news_reply')." WHERE rid in (SELECT id FROM ".tablename('rule')." WHERE weid = '{$_W['weid']}' and module = 'news') ORDER BY id DESC ");
    if (!empty($_GPC['rid'])) {
        $rid = intval($_GPC['rid']);
        $condition .= " WHERE rid = '{$rid}'";
        $news = pdo_fetchall("SELECT * FROM ".tablename('news_reply').$condition." ORDER BY id DESC ");
    }

    $string = "SELECT nid FROM".tablename('article')."WHERE nid in (SELECT id FROM ".tablename('news_reply')." WHERE rid in (SELECT id FROM ".tablename('rule')." WHERE weid = '{$_W['weid']}' and module = 'news'))";
    $nids = pdo_fetchall($string);
}

template('site/news');