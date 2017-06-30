<?php 
/**
 * 分类管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
checkaccount();
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';

if ($do == 'display') {
	if (!empty($_GPC['displayorder'])) {
		foreach ($_GPC['displayorder'] as $id => $displayorder) {
			pdo_update('category', array('displayorder' => $displayorder), array('id' => $id));
		}
		cache_build_category();
		message('分类排序更新成功！', create_url('setting/category'), 'success');
	}
	$children = array();
	$category = pdo_fetchall("SELECT * FROM ".tablename('category')." WHERE weid = '{$_W['weid']}' ORDER BY parentid ASC");
	foreach ($category as $index => $row) {
		if (!empty($row['parentid'])){
			$children[$row['parentid']][] = $row;
			unset($category[$index]);
		}
	}
	template('site/category');	
} elseif ($do == 'post') {
	$parentid = intval($_GPC['parentid']);
	$id = intval($_GPC['id']);
	if(!empty($id)) {
		$category = pdo_fetch("SELECT * FROM ".tablename('category')." WHERE id = '$id'");
		if (!empty($category['nid'])) {
			$nav = pdo_fetch("SELECT * FROM ".tablename('site_nav')." WHERE id = :id" , array(':id' => $category['nid']));
			$nav['css'] = unserialize($nav['css']);
			if (strexists($nav['icon'], 'images/')) {
				$nav['fileicon'] = $nav['icon'];
				$nav['icon'] = '';
			}
		}
	} else {
		$category = array(
			'displayorder' => 0,
		);
	}
	if (!empty($parentid)) {
		$parent = pdo_fetch("SELECT id, name FROM ".tablename('category')." WHERE id = '$parentid'");
		if (empty($parent)) {
			message('抱歉，上级分类不存在或是已经被删除！', create_url('setting/category'), 'error');
		}
	}
	if (checksubmit('fileupload-delete')) {
		file_delete($_GPC['fileupload-delete']);
		pdo_update('site_nav', array('icon' => ''), array('id' => $category['nid']));
		message('删除成功！', referer(), 'success');
	}
	if (checksubmit('submit')) { 
		if (empty($_GPC['name'])) {
			message('抱歉，请输入分类名称！');
		}
		$data = array(
			'weid' => $_W['weid'],
			'name' => $_GPC['name'],
			'displayorder' => intval($_GPC['displayorder']),
			'parentid' => intval($parentid),
			'description' => $_GPC['description'],
		);
		if (!empty($id)) {
			unset($data['parentid']);
			pdo_update('category', $data, array('id' => $id));
		} else {
			pdo_insert('category', $data);
			$id = pdo_insertid();
		}
		if (!empty($_GPC['isnav'])) {
			$nav = array(
				'weid' => $_W['weid'],
				'name' => $data['name'],
				'displayorder' => 0,
				'position' => 1,
				'url' => create_url('mobile/channel', array('name' => 'list', 'cid' => $id)),
				'issystem' => 0,
				'status' => 1,
			);
			$nav['css'] = serialize(array(
				'icon' => array(
					'font-size' => $_GPC['icon']['size'],
					'color' => $_GPC['icon']['color'],
					'width' => $_GPC['icon']['size'],
					'icon' => $_GPC['icon']['icon'],
				),
			));
			if (!empty($_FILES['icon']['tmp_name'])) {
				file_delete($_GPC['icon_old']);
				$upload = file_upload($_FILES['icon']);
				if (is_error($upload)) {
					message($upload['message'], '', 'error');
				}
				$nav['icon'] = $upload['path'];
			}
			if (empty($category['nid'])) {
				pdo_insert('site_nav', $nav);
				pdo_update('category', array('nid' => pdo_insertid()), array('id' => $id));
			} else {
				pdo_update('site_nav', $nav, array('id' => $category['nid']));
			}
		}
		cache_build_category();
		message('更新分类成功！', create_url('site/category'), 'success');
	}
	template('site/category');
} elseif ($do == 'fetch') {
	$category = pdo_fetchall("SELECT id, name FROM ".tablename('category')." WHERE parentid = '".intval($_GPC['parentid'])."' ORDER BY id ASC");
	message($category, '', 'ajax');
} elseif ($do == 'delete') {
	$id = intval($_GPC['id']);
	$category = pdo_fetch("SELECT id, parentid, nid FROM ".tablename('category')." WHERE id = '$id'");
	if (empty($category)) {
		message('抱歉，分类不存在或是已经被删除！', create_url('site/category'), 'error');
	}
	$navs = pdo_fetchall("SELECT icon, id FROM ".tablename('site_nav')." WHERE id IN (SELECT nid FROM ".tablename('category')." WHERE id = {$id} OR parentid = '$id')", array(), 'id');
	if (!empty($navs)) {
		foreach ($navs as $row) {
			file_delete($row['icon']);
		}
		pdo_query("DELETE FROM ".tablename('site_nav')." WHERE id IN (".implode(',', array_keys($navs)).")");
	}
	pdo_delete('category', array('id' => $id, 'parentid' => $id), 'OR');
	cache_build_category();
	message('分类删除成功！', create_url('site/category'), 'success');
}
