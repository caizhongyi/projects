<?php 
/**
 * 文章管理
 * [WeEngine System] Copyright (c) 2013 WE7.CC
 */

defined('IN_IA') or exit('Access Denied');
checkaccount();
$do = !empty($_GPC['do']) ? $_GPC['do'] : 'display';

$category = cache_load('category:'.$_W['weid']);
if (!empty($category)) {
	$children = '';
	foreach ($category as $cid => $cate) {
		if (!empty($cate['parentid'])) {
			$children[$cate['parentid']][] = array($cate['id'], $cate['name']);
		}
	}
}

if ($do == 'display') {
	$pindex = max(1, intval($_GPC['page']));
	$psize = 20;
	$condition = '';
	if (!empty($_GPC['keyword'])) {
		$condition .= " AND title LIKE '%{$_GPC['keyword']}%'";
	} 
	
	if (!empty($_GPC['cate_2'])) {
		$cid = intval($_GPC['cate_2']);
		$condition .= " AND ccate = '{$cid}'";
	} elseif (!empty($_GPC['cate_1'])) {
		$cid = intval($_GPC['cate_1']);
		$condition .= " AND pcate = '{$cid}'";
	}
	
	$list = pdo_fetchall("SELECT * FROM ".tablename('article')." WHERE weid = '{$_W['weid']}' $condition ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize);
	$total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('article') . " WHERE weid = '{$_W['weid']}'");
	$pager = pagination($total, $pindex, $psize);
	
	template('site/article');
} elseif ($do == 'post') {
	$id = intval($_GPC['id']);
	if (!empty($id)) {
		$item = pdo_fetch("SELECT * FROM ".tablename('article')." WHERE id = :id" , array(':id' => $id));
		$item['type'] = explode(',', $item['type']);
		if (empty($item)) {
			message('抱歉，文章不存在或是已经删除！', '', 'error');
		}
	}
	if (checksubmit('fileupload-delete')) {
		file_delete($_GPC['fileupload-delete']);
		pdo_update('article', array('thumb' => ''), array('id' => $id));
		message('删除成功！', referer(), 'success');
	}
	if (checksubmit('submit')) {
		if (empty($_GPC['title'])) {
			message('标题不能为空，请输入标题！');
		}
		$data = array(
			'weid' => $_W['weid'],
			'type' => implode(',', $_GPC['option']).',',
			'pcate' => intval($_GPC['cate_1']),
			'ccate' => intval($_GPC['cate_2']),
			'title' => $_GPC['title'],
			'content' => $_GPC['content'],
			'source' => $_GPC['source'],
			'author' => $_GPC['author'],
			'createtime' => TIMESTAMP,
		);
		if (!empty($_FILES['thumb']['tmp_name'])) {
			file_delete($_GPC['thumb_old']);
			$upload = file_upload($_FILES['thumb']);
			if (is_error($upload)) {
				message($upload['message'], '', 'error');
			}
			$data['thumb'] = $upload['path'];
		} elseif (!empty($_GPC['autolitpic'])) {
			$match = array();
			preg_match('/attachment\/(.*?)"/', $_GPC['content'], $match);
			if (!empty($match[1])) {
				$data['thumb'] = $match[1];
			}
		}
		if (empty($id)) {
			pdo_insert('article', $data);
		} else {
			unset($data['createtime']);
			pdo_update('article', $data, array('id' => $id));
		}
		message('文章更新成功！', create_url('site/article/display'), 'success');
	} else {
		template('site/article');
	}
} elseif ($do == 'delete') {
	$id = intval($_GPC['id']);
	$row = pdo_fetch("SELECT id, thumb FROM ".tablename('article')." WHERE id = :id", array(':id' => $id));
	if (empty($row)) {
		message('抱歉，文章不存在或是已经被删除！');
	}
	if (!empty($row['thumb'])) {
		file_delete($row['thumb']);
	}
	pdo_delete('article', array('id' => $id));
	message('删除成功！', referer(), 'success');
}else if($do == 'import'){
    $newsid = intval($_GPC['newsid']);
    if (!empty($newsid)) {
        $news = pdo_fetch("SELECT * FROM ".tablename('news_reply')." WHERE id = :id" , array(':id' => $newsid));
    }
        $data = array(
            'weid' => $_W['weid'],
            'type' => implode(',', $_GPC['option']).',',
            'pcate' => intval($_GPC['cate_1']),
            'ccate' => intval($_GPC['cate_2']),
            'title' => $news['title'],
            'content' => $news['content'],
            'source' => $_GPC['source'],
            'author' => $_GPC['author'],
            'createtime' => TIMESTAMP,
            'thumb' => $news['thumb'],
            'nid' => $news['id'],
        );
            pdo_insert('article', $data);
        message('文章导入成功！', create_url('site/article/display'), 'success');
}elseif($do == 'allimport'){
    $checkbox = $_GPC['status'];
    if(!count($checkbox) == 0){
        foreach($checkbox as $id=>$value){
            $newsid = intval($value);
            if (!empty($newsid)) {
                $news = pdo_fetch("SELECT * FROM ".tablename('news_reply')." WHERE id = :id" , array(':id' => $newsid));
            }
            $data = array(
                'weid' => $_W['weid'],
                'type' => implode(',', $_GPC['option']).',',
                'pcate' => intval($_GPC['cate_1']),
                'ccate' => intval($_GPC['cate_2']),
                'title' => $news['title'],
                'content' => $news['content'],
                'source' => $_GPC['source'],
                'author' => $_GPC['author'],
                'createtime' => TIMESTAMP,
                'thumb' => $news['thumb'],
                'nid' => $news['id'],
            );
            pdo_insert('article', $data);
        }
    }
    message('文章导入成功！', create_url('site/article/display'), 'success');
}