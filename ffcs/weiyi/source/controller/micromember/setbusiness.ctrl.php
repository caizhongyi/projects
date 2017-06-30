<?php
/**
 * 设置商家信息
 */

defined('IN_IA') or exit('Access Denied');
$sql = 'SELECT * FROM ' . tablename('micromember_business') . " WHERE weid = '{$_W['weid']}'";
$business_setting = pdo_fetch($sql);
if (checksubmit('submit')) {
    if (empty($_GPC['name'])) {
        message('商家名称不能为空！', create_url('micromember/setbusiness'), 'error');
    }
    if (empty($_GPC['frontcover'])) {
        message('图文消息封面不能为空！', create_url('micromember/setbusiness'), 'error');
    }
    if (empty($_GPC['description'])) {
        message('商家描述信息不能为空！', create_url('micromember/setbusiness'), 'error');
    }
    if (empty($_GPC['address'])) {
        message('详细地址不能为空！', create_url('micromember/setbusiness'), 'error');
    }
    if (empty($_GPC['phonenum'])) {
        message('联系方式不能为空！', create_url('micromember/setbusiness'), 'error');
    }
    $business_setting_data = array(
        'name' => $_GPC['name'],
        'frontcover' => $_GPC['frontcover'],
        'description' => $_GPC['description'],
        'address' => $_GPC['address'],
        'phonenum' => $_GPC['phonenum'],
        'area_a'=>$_GPC['area_a'],
        'area_p'=>$_GPC['area_p'],
        'area_c'=>$_GPC['area_c'],
        'category'=>$_GPC['category_f'].'-'.$_GPC['category_s'],
        'place'=>$_GPC['place'],
        'lng'=>$_GPC['lng'],
        'lat'=>$_GPC['lat']
    );
    $business_setting_data = array(
        'name' => $_GPC['name'],
        'frontcover' => $_GPC['frontcover'],
        'description' => $_GPC['description'],
        'address' => $_GPC['address'],
        'phonenum' => $_GPC['phonenum'],
        'category'=>$_GPC['category_f'].'-'.$_GPC['category_s'],
        'place'=>$_GPC['place'],
        'lng'=>$_GPC['lng'],
        'lat'=>$_GPC['lat'],
        'area_p'=>$_GPC['area_p'],
        'area_c'=>$_GPC['area_c'],
        'area_a'=>$_GPC['area_a']
    );
    if (empty($business_setting)) { //没有商家则进行添加
        $business_setting_data['weid'] = $_W['weid'];
        if(pdo_insert('micromember_business', $business_setting_data)){
            message('商家添加成功', create_url('micromember/setbusiness'));
        }else{
            message('商家卡添加失败', create_url('micromember/setbusiness'));
        }
    } else {
        if(pdo_update('micromember_business', $business_setting_data, array( 'weid' => $_W['weid'])) === false){
            message('商家卡更新失败', create_url('micromember/setbusiness'));
        }else{
            message('商家卡更新成功', create_url('micromember/setbusiness'));
        }
    }
}else{
    $category = explode('-',$business_setting['category']);
    $category_f = $category['0'];
    $category_s = $category['1'];
    
    $pindex = isset($_GPC['page']) && !empty($_GPC['page']) ? intval($_GPC['page']) : 1 ; 
    $psize = 5; 
    $sql = 'SELECT * FROM ' . tablename('micromember_business_sub') . " WHERE weid = '{$_W['weid']}' order by id desc limit ".($pindex - 1) * $psize.','. $psize;
    $subbusiness_setting = pdo_fetchall($sql);
    $total = pdo_fetchcolumn('SELECT COUNT(*) FROM ' . tablename('micromember_business_sub') . " WHERE weid = '{$_W['weid']}' ");
    $pager = pagination($total, $pindex, $psize);
    
    template('micromember/business/business');
}

