<?php
/**
 * Created by QuePQ.
 * Name: 帮助管理
 * Date: 14-3-3
 * Time: 上午11:35
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');
checkaccount();

function site_systemcategory_name_search($id) {
    $category = pdo_fetch("SELECT name FROM ".tablename('systemhelp_category')." WHERE id = '$id'");
    return $category['name'];
}

global $_W, $_GPC;
$foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
$category = pdo_fetchall("SELECT * FROM ".tablename('systemhelp_category')." ORDER BY parentid ASC, displayorder DESC", array(), 'id');
//var_dump($category);
if (!empty($category)) {
    $children = '';
    foreach ($category as $cid => $cate) {
        if (!empty($cate['parentid'])) {
            $children[$cate['parentid']][$cate['id']] = array($cate['id'], $cate['name']);
        }
    }
}

if ($foo == 'display') {
    $pindex = max(1, intval($_GPC['page']));
    $psize = 20;
    $condition = '';
    $params = array();
    if (!empty($_GPC['keyword'])) {
        $condition .= " title LIKE :keyword";
        $params[':keyword'] = "%{$_GPC['keyword']}%";
    }

    if (!empty($_GPC['cate_2'])) {
        $cid = intval($_GPC['cate_2']);
        if (!empty($condition)){
            $condition .= " AND ccate = '{$cid}'";
        }
        else{
            $condition.= " ccate = '{$cid}'";
        }
    } elseif (!empty($_GPC['cate_1'])) {
        $cid = intval($_GPC['cate_1']);
        if (!empty($condition)){
            $condition .= " AND pcate = '{$cid}'";
        }
        else{
            $condition.=  " pcate = '{$cid}'";
        }
    }
    //create_url();
    if (empty($condition)){
        $list = pdo_fetchall("SELECT * FROM ".tablename('systemhelp')." ORDER BY id ASC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
    }
    else{
        $list = pdo_fetchall("SELECT * FROM ".tablename('systemhelp')." WHERE $condition ORDER BY id ASC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
    }
    $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('systemhelp'));
    $pager = pagination($total, $pindex, $psize);

    template('setting/systemhelp');
} elseif ($foo == 'post') {
    $id = intval($_GPC['id']);
    if (!empty($id)) {
        $item = pdo_fetch("SELECT * FROM ".tablename('systemhelp')." WHERE id = :id" , array(':id' => $id));
        $item['type'] = explode(',', $item['type']);
        if (empty($item)) {
            message('抱歉，文章不存在或是已经删除！', '', 'error');
        }
    }
    if (checksubmit('fileupload-delete')) {
        file_delete($_GPC['fileupload-delete']);
        pdo_update('systemhelp', array('thumb' => ''), array('id' => $id));
        message('删除成功！', referer(), 'success');
    }
    if (checksubmit('submit')) {
        if (empty($_GPC['title'])) {
            message('标题不能为空，请输入标题！');
        }
        $data = array(
            'type' => @implode(',', $_GPC['option']).',',
            'pcate' => intval($_GPC['cate_1']),
            'ccate' => intval($_GPC['cate_2']),
            'title' => $_GPC['title'],
            'content' => htmlspecialchars_decode($_GPC['content']),
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
            pdo_insert('systemhelp', $data);
        } else {
            unset($data['createtime']);
            pdo_update('systemhelp', $data, array('id' => $id));
        }
        message('文章更新成功！', create_url('setting/help', array('foo' => 'display')), 'success');
    } else {
        template('setting/systemhelp');
    }
} elseif ($foo == 'delete') {
    $id = intval($_GPC['id']);
    $row = pdo_fetch("SELECT id, thumb FROM ".tablename('systemhelp')." WHERE id = :id", array(':id' => $id));
    if (empty($row)) {
        message('抱歉，文章不存在或是已经被删除！');
    }
    if (!empty($row['thumb'])) {
        file_delete($row['thumb']);
    }
    pdo_delete('systemhelp', array('id' => $id));
    message('删除成功！', referer(), 'success');
} elseif ($foo == 'displayone'){
    $id = intval($_GPC['id']);
    $row = pdo_fetch("SELECT * FROM ".tablename('systemhelp')." WHERE id = :id", array(':id' => $id));
    if (empty($row)){
        message('抱歉，文章不存在或是已经被删除!');
    }
    $aboverow = pdo_fetch("SELECT * FROM ".tablename('systemhelp'). " WHERE id< '$id' order by id desc limit 1");
    if (empty($aboverow))
    {
        $aboverow='没了';
    }
    $belowrow = pdo_fetch("SELECT * FROM ".tablename('systemhelp'). " WHERE id> '$id' order by id asc limit 1");
    if (empty($belowrow))
    {
        $belowrow='没了';
    }

    //$list = pdo_fetchall("SELECT * FROM ".tablename('systemhelp')." WHERE weid = '{$_W['weid']}' $condition ORDER BY id DESC LIMIT ".($pindex - 1) * $psize.','.$psize, $params);
    template('setting/systemhelp');
}
