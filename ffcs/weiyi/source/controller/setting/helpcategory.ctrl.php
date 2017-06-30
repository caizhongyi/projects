<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 14-3-6
 * Time: 上午9:46
 * To change this template use File | Settings | File Templates.
 */

    global $_W, $_GPC;
    $foo = !empty($_GPC['foo']) ? $_GPC['foo'] : 'display';
    if ($foo == 'display') {
        if (!empty($_GPC['displayorder'])) {
            foreach ($_GPC['displayorder'] as $id => $displayorder) {
                pdo_update('systemhelp_category', array('displayorder' => $displayorder), array('id' => $id));
            }
            message('分类排序更新成功！', 'refresh', 'success');
        }
        $children = array();
        $category = pdo_fetchall("SELECT * FROM ".tablename('systemhelp_category')." ORDER BY parentid ASC");
        foreach ($category as $index => $row) {
            if (!empty($row['parentid'])){
                $children[$row['parentid']][] = $row;
                unset($category[$index]);
            }
        }
        template('setting/systemhelpcategory');
    } elseif ($foo == 'post') {
        $parentid = intval($_GPC['parentid']);
        $id = intval($_GPC['id']);
        if(!empty($id)) {
            $category = pdo_fetch("SELECT * FROM ".tablename('systemhelp_category')." WHERE id = '$id'");
        } else {
            $category = array(
                'displayorder' => 0,
            );
        }
        if (!empty($parentid)) {
            $parent = pdo_fetch("SELECT id, name FROM ".tablename('systemhelp_category')." WHERE id = '$parentid'");
            if (empty($parent)) {
                message('抱歉，上级分类不存在或是已经被删除！', create_url('setting/helpcategory', array('foo' => 'display')), 'error');
            }
        }
        if (checksubmit('fileupload-delete')) {
            file_delete($_GPC['fileupload-delete']);
            message('删除成功！', referer(), 'success');
        }
        if (checksubmit('submit')) {
            if (empty($_GPC['catename'])) {
                message('抱歉，请输入分类名称！');
            }
            $data = array(
                'name' => $_GPC['catename'],
                'displayorder' => intval($_GPC['displayorder']),
                'parentid' => intval($parentid),
                'description' => $_GPC['description'],
            );
            if (!empty($id)) {
                unset($data['parentid']);
                pdo_update('systemhelp_category', $data, array('id' => $id));
            } else {
                pdo_insert('systemhelp_category', $data);
                $id = pdo_insertid();
            }
            message('更新分类成功！', create_url('setting/helpcategory'), 'success');
        }
        template('setting/systemhelpcategory');
    } elseif ($foo == 'fetch') {
        $category = pdo_fetchall("SELECT id, name FROM ".tablename('systemhelp_category')." WHERE parentid = '".intval($_GPC['parentid'])."' ORDER BY id ASC");
        message($category, '', 'ajax');
    } elseif ($foo == 'delete') {
        $id = intval($_GPC['id']);
        $category = pdo_fetch("SELECT id, parentid FROM ".tablename('systemhelp_category')." WHERE id = '$id'");
        if (empty($category)) {
            message('抱歉，分类不存在或是已经被删除！', create_url('setting/helpcategory'), 'error');
        }
        pdo_delete('systemhelp_category', array('id' => $id, 'parentid' => $id), 'OR');
        message('分类删除成功！', create_url('setting/helpcategory'), 'success');
    }