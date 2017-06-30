<?php
/**
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');

include model('activity');
$pindex = max(1, intval($_GPC['page']));
$psize = 20;
$module = empty($_GPC['module']) ? 'all' : $_GPC['module'];
$cids = $parentcates = $list =  array();
$types = array('', '等价', '包含', '正则表达式匹配');

/*判断权限*/
$modulename = '';
foreach ($_W['account']['modules'] as $item) {
    if ($item['name'] == $_GPC['module']) {
        $modulename = $_GPC['module'];
        break;
    }
}

$category = cache_load("category:{$_W['weid']}");
if (!empty($category)) {
	$children = '';
	foreach ($category as $cid => $cate) {
		if (!empty($cate['parentid'])) {
			$children[$cate['parentid']][$cate['id']] = array($cate['id'], $cate['name']);
		}
	}
}
if (!empty($_GPC['cate_2'])) {
	$cid = intval($_GPC['cate_2']);
	$condition = " AND cid = '{$cid}'";
} elseif (!empty($_GPC['cate_1'])) {
	$cid = intval($_GPC['cate_1']);
	$cids = array();
	if (!empty($children[$cid])) {
		$cids = array_keys($children[$cid]);
	}
	$cids[] = $cid;
	$condition = " AND cid IN (".implode(',', $cids).")";
}

$modules = cache_load('modules');
$activity_modules = array('egg','lotery','scratch','vote','wxwall');	//定义活动的类型，需要手动更新
$list = activity_search("weid = '{$_W['weid']}' AND type = 1 $condition ". ($module == 'all' ? '' : " AND module = '$module'") . (!empty($_GPC['keyword']) ? " AND name LIKE '%{$_GPC['keyword']}%'" : ''), $pindex, $psize, $total);
$pager = pagination($total, $pindex, $psize);

if (!empty($list)) {
	foreach($list as &$item) {
		$condition = "`rid`={$item['id']}";
		$item['keywords'] = activity_keywords_search($condition);
		$cate = $category[$item['cid']];
		if (!empty($cate['parentid'])) {
			$item['cate'][0] = $category[$cate['parentid']];
			$item['cate'][1] = $cate;
		} else {
			$item['cate'][0] = $cate;
		}
        $item['options'] = '';
        if (!empty($modules[$item['module']]['options'])) {
            foreach ($modules[$item['module']]['options'] as $opt) {
                $vars = array();
                $vars['name'] = strtolower($item['module']);
                $vars['state'] = $opt['state'];
                $vars['id'] = $item['id'];
                $link = create_url('index/module/' . $opt['do'], $vars);
                $item['options'][] = array('title' => $opt['title'], 'link' => $link);
            }
        }
	}
}

$temp = iunserializer($_W['account']['default']);
if (is_array($temp)) {
	$_W['account']['default'] = $temp;
	$_W['account']['defaultrid'] = $temp['id'];
}
$temp = iunserializer($_W['account']['welcome']);
if (is_array($temp)) {
	$_W['account']['welcome'] = $temp;
	$_W['account']['welcomerid'] = $temp['id'];
}

template('activity/display');
