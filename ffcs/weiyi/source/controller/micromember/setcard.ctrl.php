<?php
/**
 * 设置商家信息
 */
defined('IN_IA') or exit('Access Denied');
$type = $_GPC['type'];
$type = empty($type)?"list":$type;

/* $cardrighsql = "select * from ".tablename('micromember_card_right')." where weid=".$_W['weid'];
$cardrightlist = pdo_fetchall($cardrighsql);
if(empty($cardrightlist)){
    message('请先添加会员卡权限！', create_url('micromember/cardright',array('type'=>'list'), 'error'));
} */


if($type=="list"){
    $sql = 'SELECT * FROM ' . tablename('micromember_card') . " WHERE weid = '{$_W['weid']}'";
    $card_setting = pdo_fetchall($sql);
    template('micromember/card/cardlist');
}elseif($type=="post"){
    $resultUrl = create_url('micromember/setcard',array('type'=>'list'));
    if (checksubmit('submit')) {
        if (empty($_GPC['name'])) {
            message('卡片名称不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['namecolor'])) {
            message('会员卡颜色不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['background'])&&empty($_GPC['sysbackground'])) {
            message('会员背景不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['icon'])) {
            message('会员卡图标不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['pwd'])) {
            message('商家兑换密码不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['description'])) {
            message('会员卡描述不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['rightid'])) {
            message('会员卡权限不能为空！', $resultUrl, 'error');
        }
        $sqldefault = 'SELECT * FROM ' . tablename('micromember_card') . " WHERE weid = '{$_W['weid']}' and isdefault =1";
        $card_default = pdo_fetchall($sqldefault);
        if(empty($card_default)){
            $_GPC['isdefault'] = 1;
        }
        $card_setting_data = array(
            'name' => $_GPC['name'],
            'rightid' => $_GPC['rightid'],
            'namecolor' => $_GPC['namecolor'],
            'numcolor' => $_GPC['numcolor'],
            'background' => $_GPC['background'],
            'sysbackground' => $_GPC['sysbackground'],
            'icon' => $_GPC['icon'],
            'pwd' => $_GPC['pwd'],
            'bgtype' => $_GPC['bgtype'],
            'isdefault' => $_GPC['isdefault'],
            'weid' => $_W['weid'],
            'description'=>$_GPC['description']
        );
        if (empty($_GPC['id'])) { //没有商家则进行添加
            if(pdo_insert('micromember_card', $card_setting_data)){
                message('会员卡添加成功',$resultUrl);
            }else{
                message('会员卡添加失败',$resultUrl);
            }
        } else {
            if(pdo_update('micromember_card', $card_setting_data, array( 'id' => $_GPC['id']))==false){
                message('会员卡更新失败',$resultUrl);
            }else{
                message('会员卡更新成功', $resultUrl);
            }
        }
    }
}elseif($type=="edit"){
    $sql = 'SELECT * FROM ' . tablename('micromember_card') . " WHERE id = '{$_GPC['id']}'";
    $card_setting = pdo_fetch($sql);

    template('micromember/card/card');
}elseif($type=="delete"){
    if(!empty($_GPC['id'])){
        $sub = array('id'=>$_GPC['id']);
        $del_res = pdo_delete('micromember_card',$sub);
    }
    if($del_res==1){
        message('删除成功', create_url('micromember/setcard',array('type'=>'list')));
    }else{
        message('删除失败', create_url('micromember/setcard',array('type'=>'list')));
    }
}elseif($type=="setdefault"){
    $resultUrl = create_url('micromember/setcard',array('type'=>'list'));
    $sql = "update ".tablename('micromember_card')." set isdefault=0 where id!=".$_GPC['id'];
    $sql2 =  "update ".tablename('micromember_card')." set isdefault=1 where id=".$_GPC['id'];
    pdo_query($sql);
    pdo_query($sql2);
    message('设置为默认会员卡成功', $resultUrl);
}
