<?php
/**
 * Created by JetBrains PhpStorm.
 * User: linhj
 * Date: 13-12-17
 * Time: 下午4:36
 * To change this template use File | Settings | File Templates.
 */

defined('IN_IA') or exit('Access Denied');
$type = $_GPC['type'];
$type = empty($type)?"pointset":$type;
$t_set = "micromember_point_set";
$t_level = "micromember_point_level";

if($type=="pointset"){
    $pointSetData = array(
        'weid'=>$_W['weid'],
        'userdesc'=>$_GPC['userdesc'],
        'pointdesc'=>$_GPC['pointdesc'],
        'point1'=>$_GPC['point1'],
        'point6'=>$_GPC['point6'],
        'point'=>$_GPC['point']
    );
    if (checksubmit('submit')) {
        $resultUrl = create_url('micromember/pointset',array('type'=>'pointset'));
        if (empty($_GPC['userdesc'])) {
            message('会员卡使用说明不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['pointdesc'])) {
            message('积分规则说明不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['point1'])) {
            message('每天签到奖励不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['point6'])) {
            message('连续6天签到奖励不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['point'])) {
            message('消费1元奖励不能为空！', $resultUrl, 'error');
        }
        $regex = "^[0-9]+$";
        if(!eregi($regex, $_GPC['point1'])){
            message('每天签到奖励必须为正整数！', $resultUrl, 'error');
        }
        if(!eregi($regex, $_GPC['point6'])){
            message('连续6天签到奖励必须为正整数！', $resultUrl, 'error');
        }
        if(!eregi($regex, $_GPC['point'])){
            message('消费1元奖励必须为正整数！', $resultUrl, 'error');
        }

        if (empty($_GPC['id'])) { //没有商家则进行添加
            if(pdo_insert($t_set, $pointSetData)){
                message('积分设置添加成功',$resultUrl);
            }else{
                message('积分设置添加失败',$resultUrl);
            }
        } else {
            if(pdo_update($t_set, $pointSetData, array( 'id' => $_GPC['id']))==false){
                message('积分设置更新失败',$resultUrl);
            }else{
                message('积分设置更新成功', $resultUrl);
            }
        }
    }
    $pointsetInfo = pdo_fetch("select * from ".tablename($t_set)." where weid='{$_W['weid']}'");
    template('micromember/point/pointset');
}elseif($type=="pointlevel"){
    $pointLevelData = array(
        'weid' => $_W['weid'],
        'name' => $_GPC['name'],
        'startpoint' => $_GPC['startpoint'],
        'endpoint' => $_GPC['endpoint']
    );
    if (checksubmit('submit')) {
        $resultUrl = create_url('micromember/pointset',array('type'=>'pointlevel'));
        if (empty($_GPC['name'])) {
            message('等级名称不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['startpoint'])) {
            message('开始积分不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['endpoint'])) {
            message('结束积分不能为空！', $resultUrl, 'error');
        }

        $regex = "^[0-9]+$";
        if(!eregi($regex, $_GPC['startpoint'])){
            message('开始积分必须为正整数！', $resultUrl, 'error');
        }
        if(!eregi($regex, $_GPC['endpoint'])){
            message('结束积分必须为正整数！', $resultUrl, 'error');
        }
        if (empty($_GPC['id'])) { //没有商家则进行添加
            if(pdo_insert($t_level, $pointLevelData)){
                message('等级添加成功',$resultUrl);
            }else{
                message('等级添加失败',$resultUrl);
            }
        } else {
            if(pdo_update($t_level, $pointLevelData, array( 'id' => $_GPC['id']))==false){
                message('等级更新失败',$resultUrl);
            }else{
                message('等级更新成功', $resultUrl);
            }
        }
    }
    $pointlevelInfo = pdo_fetchall("select * from ".tablename($t_level)." where weid='{$_W['weid']}'");
    template('micromember/point/pointlevel');
}else{
    if(!empty($_GPC['id'])){
        $sub = array('id'=>$_GPC['id']);
        $del_res = pdo_delete($t_level,$sub);
    }
    if($del_res==1){
        message('删除成功', create_url('micromember/pointset',array('type'=>'pointlevel')));
    }else{
        message('删除失败', create_url('micromember/pointset',array('type'=>'pointlevel')));
    }
}