<?php 
/**
 * 相册管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */
defined('IN_IA') or exit('Access Denied');
checkaccount();
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';

//创建相册
if ($do == 'create') {
	$id = intval($_GPC['id']);
	if (!empty($id)) {
		$item = pdo_fetch("SELECT * FROM ".tablename('album')." WHERE id = :id" , array(':id' => $id));
		if (empty($item)) {
			message('抱歉，相册不存在或是已经删除！', '', 'error');
		}
	}
	if (checksubmit('submit')) {
		if (empty($_GPC['title'])) {
			message('请输入相册名称！');
		}
		$data = array(
			'weid' => $_W['weid'],
			'title' => $_GPC['title'],
			'content' => $_GPC['content'],
			'displayorder' => intval($_GPC['displayorder']),
			'isview' => intval($_GPC['isview']),
			'createtime' => TIMESTAMP,
		);
		if (!empty($_FILES['thumb']['tmp_name'])) {
			file_delete($_GPC['thumb_old']);
			$upload = file_upload($_FILES['thumb']);
			if (is_error($upload)) {
				message($upload['message'], '', 'error');
			}
			$data['thumb'] = $upload['path'];
		}
		if (empty($id)) {
			pdo_insert('album', $data);
		} else {
			unset($data['createtime']);
			pdo_update('album', $data, array('id' => $id));
		}
		message('相册更新成功！', create_url('site/album/display'), 'success');
	}
	template('site/album');
} elseif ($do == 'display') {
	$pindex = max(1, intval($_GPC['page']));
	$psize = 20;
	$condition = '';
	if (!empty($_GPC['keyword'])) {
		$condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
	}
	
	$list = pdo_fetchall("SELECT * FROM ".tablename('album')." WHERE weid = '{$_W['weid']}' $condition ORDER BY displayorder DESC, id DESC LIMIT ".($pindex - 1) * $psize.','.$psize);
	$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('album') . " WHERE weid = '{$_W['weid']}' $condition");
	$pager = pagination($total, $pindex, $psize);
	if (!empty($list)) {
		foreach ($list as &$row) {
			$row['total'] = pdo_fetchcolumn("SELECT COUNT(*) FROM ".tablename('album_photo')." WHERE albumid = :albumid", array(':albumid' => $row['id']));
		}
	}
	template('site/album');
} elseif ($do == 'photo') {
	$id = intval($_GPC['albumid']);
	$album = pdo_fetch("SELECT id FROM ".tablename('album')." WHERE id = :id", array(':id' => $id));
	if (empty($album)) {
		message('相册不存在或是已经被删除！');
	}
	if (checksubmit('submit')) {
		if (!empty($_GPC['attachment-new'])) {
			foreach ($_GPC['attachment-new'] as $index => $row) {
				if (empty($row)) {
					continue;
				}
				$data = array(
					'weid' => $_W['weid'],
					'albumid' => intval($_GPC['albumid']),
					'title' => $_GPC['title-new'][$index],
					'description' => $_GPC['description-new'][$index],
					'attachment' => $_GPC['attachment-new'][$index],
					'displayorder' => $_GPC['displayorder-new'][$index],
				);
				pdo_insert('album_photo', $data);
			}
		}
		if (!empty($_GPC['attachment'])) {
			foreach ($_GPC['attachment'] as $index => $row) {
				if (empty($row)) {
					continue;
				}
				$data = array(
					'weid' => $_W['weid'],
					'albumid' => intval($_GPC['albumid']),
					'title' => $_GPC['title'][$index],
					'description' => $_GPC['description'][$index],
					'attachment' => $_GPC['attachment'][$index],
					'displayorder' => $_GPC['displayorder'][$index],
				);
				pdo_update('album_photo', $data, array('id' => $index));
			}
		}
		message('相册更新成功！', create_url('site/album/photo', array('albumid' => $album['id'])));
	}
	$photos = pdo_fetchall("SELECT * FROM ".tablename('album_photo')." WHERE albumid = :albumid ORDER BY displayorder DESC", array(':albumid' => $album['id']));
	template('site/album');
} elseif ($do == 'delete') {
	$type = $_GPC['type'];
	$id = intval($_GPC['id']);
	if ($type == 'photo') {
		if (!empty($id)) {
			$item = pdo_fetch("SELECT * FROM ".tablename('album_photo')." WHERE id = :id", array(':id' => $id));
			if (empty($item)) {
				message('图片不存在或是已经被删除！');
			}
			pdo_delete('album_photo', array('id' => $item['id']));
		} else {
			$item['attachment'] = $_GPC['attachment'];
		}
		file_delete($item['attachment']);
	} elseif ($type == 'album') {
		$album = pdo_fetch("SELECT id, thumb FROM ".tablename('album')." WHERE id = :id", array(':id' => $id));
		if (empty($album)) {
			message('相册不存在或是已经被删除！');
		}
		$photos = pdo_fetchall("SELECT id, attachment FROM ".tablename('album_photo')." WHERE albumid = :albumid", array(':albumid' => $id));
		if (!empty($photos)) {
			foreach ($photos as $row) {
				file_delete($row['attachment']);
			}
		}
		pdo_delete('album', array('id' => $id));
		pdo_delete('album_photo', array('albumid' => $id));
	}
	message('删除成功！', referer(), 'success');
} elseif ($do == 'cover') {
	$id = intval($_GPC['albumid']);
	$attachment = $_GPC['thumb'];
	if (empty($attachment)) {
		message('抱歉，参数错误，请重试！', '', 'error');
	}
	$item = pdo_fetch("SELECT * FROM ".tablename('album')." WHERE id = :id" , array(':id' => $id));
	if (empty($item)) {
		message('抱歉，相册不存在或是已经删除！', '', 'error');
	}
	pdo_update('album', array('thumb' => $attachment), array('id' => $id));
	message('设置封面成功！', '', 'success');
}
