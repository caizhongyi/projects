<?php
/**
 * 设置分店信息
 */

$type = $_GPC['type'];
$type = empty($type)?"list":$type;
defined('IN_IA') or exit('Access Denied');
if($type=="post"){
    if (checksubmit('submit')) {
        $sql = 'SELECT * FROM ' . tablename('micromember_business') . " WHERE weid = '{$_W['weid']}'";
        $business_setting = pdo_fetch($sql);
        if(empty($business_setting)){
            message('请先添加商家信息！', $resultUrl, 'error');
        }
        $businessid =  $business_setting['id'];
        $where = array('type'=>'edit');
        if(!empty($_GPC['id'])){
        	$where['id'] = $_GPC['id'];
        }
        $resultUrl = create_url('micromember/setsubbusiness', $where);
        if (empty($_GPC['name'])) {
            message('分店名称不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['address'])) {
            message('详细地址不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['phonenum'])) {
            message('联系方式不能为空！', $resultUrl, 'error');
        }
        $subbusiness_setting_data = array(
            'businessId' => $businessid,
            'name' => $_GPC['name'],
            'address' => $_GPC['address'],
            'phonenum' => $_GPC['phonenum'],
            'place'=>$_GPC['place'],
            'lng'=>$_GPC['lng'],
            'lat'=>$_GPC['lat'],
            'area_p'=>$_GPC['area_p'],
            'area_c'=>$_GPC['area_c'],
            'area_a'=>$_GPC['area_a'],
            'weid'=>$_W['weid']
        );
        if(empty($_GPC['id'])){
            if(pdo_insert('micromember_business_sub', $subbusiness_setting_data) === false){
                message('分店卡新增失败', $resultUrl);
            }else{
                message('分店卡新增成功', $resultUrl);
            }
        }else{
            if(pdo_update('micromember_business_sub', $subbusiness_setting_data, array( 'id' => $_GPC['id'])) === false){
                message('分店卡更新失败', $resultUrl);
            }else{
                message('分店卡更新成功', $resultUrl);
            }
        }
    }
}elseif ($type=="list"){
    $sql = 'SELECT * FROM ' . tablename('micromember_business_sub') . " WHERE weid = '{$_W['weid']}'";
    $subbusiness_setting = pdo_fetchall($sql);
    template('micromember/subbusiness/getsubbusinesslist');
}elseif($type=="edit"){
    if(!empty($_GPC['id'])){
        $sql = 'SELECT * FROM ' . tablename('micromember_business_sub') . " WHERE weid = '{$_W['weid']}' and id=".$_GPC['id'];
        $subbusiness_setting = pdo_fetch($sql);
    }
    template('micromember/subbusiness/setsubbusiness');
}elseif($type=="delete"){
    if(!empty($_GPC['id'])){
        $sub = array('id'=>$_GPC['id']);
        $del_res = pdo_delete('micromember_business_sub',$sub);
    }
    if($del_res==1){
        message('删除成功', create_url('micromember/setbusiness'));
    }else{
        message('删除失败', create_url('micromember/setbusiness'));
    }
}