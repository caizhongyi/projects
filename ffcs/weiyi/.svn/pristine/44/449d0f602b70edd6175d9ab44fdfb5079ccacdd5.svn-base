<?php
/**
 * Created by JetBrains PhpStorm.
 * User: linhj
 * Date: 13-12-16
 * Time: 上午10:39
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');
$type = $_GPC['type'];
$type = empty($type)?"list":$type;
if($type=="list"){
    $sql = 'SELECT * FROM ' . tablename('micromember_card_right') . " WHERE weid = '{$_W['weid']}'";
    $cardright_setting = pdo_fetchall($sql);
    template('micromember/cardright/cardrightlist');
}elseif($type=="post"){
    $resultUrl = create_url('micromember/cardright',array('type'=>'list'));
    if (checksubmit('submit')) {
        if (empty($_GPC['name'])) {
            message('权限名称不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['level'])) {
            message('权限等级不能为空！', $resultUrl, 'error');
        }
        $cardright_setting_data = array(
            'name' => $_GPC['name'],
            'level' => $_GPC['level'],
            'weid' => $_W['weid'],
            'description'=>$_GPC['description']
        );
        if (empty($_GPC['id'])) { //没有商家则进行添加
            if(pdo_insert('micromember_card_right', $cardright_setting_data)){
                message('会员卡权限添加成功',$resultUrl);
            }else{
                message('会员卡权限添加失败',$resultUrl);
            }
        } else {
            if(pdo_update('micromember_card_right', $cardright_setting_data, array( 'id' => $_GPC['id']))==false){
                message('会员卡权限更新失败',$resultUrl);
            }else{
                message('会员卡权限更新成功', $resultUrl);
            }
        }
    }
}elseif($type=="edit"){
    $sql = 'SELECT * FROM ' . tablename('micromember_card_right') . " WHERE id = '{$_GPC['id']}'";
    $cardright_setting = pdo_fetch($sql);
    template('micromember/cardright/cardright');
}elseif($type=="delete"){
    if(!empty($_GPC['id'])){
        $sub = array('id'=>$_GPC['id']);
        $del_res = pdo_delete('micromember_card_right',$sub);
    }
    if($del_res==1){
        message('删除成功', create_url('micromember/cardright',array('type'=>'list')));
    }else{
        message('删除失败', create_url('micromember/cardright',array('type'=>'list')));
    }
}
