<?php
/**
 * Created by JetBrains PhpStorm.
 * User: linhj
 * Date: 13-12-16
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */


defined('IN_IA') or exit('Access Denied');
$type = $_GPC['type'];
$type = empty($type)?"list":$type;
$tablename = "fans";

if($type=="list"){
    $sql = 'SELECT a.*,b.* FROM ' . tablename($tablename) . " a,".tablename('micromember')." b WHERE a.from_user=b.from_user and  a.weid = '{$_W['weid']}'";
    if(!empty($_GPC['realname'])){
        $sql.=" and a.realname like '%{$_GPC['realname']}%'";
        $queryRealname = $_GPC['realname'];
    }
    if(!empty($_GPC['mobile'])){
        $sql.=" and a.mobile like '%{$_GPC['mobile']}%'";
        $queryMobile = $_GPC['mobile'];
    }
    if(!empty($_GPC['number'])){
        $sql.=" and b.number like '%{$_GPC['number']}%'";
        $queryNumber = $_GPC['number'];
    }
    $member = pdo_fetchall($sql);
    template('micromember/member/member');
}elseif($type=="detail"){
    $sql = "select * from ".tablename($tablename)." where from_user='{$_GPC['from_user']}' and weid='{$_W['weid']}'";
    $fans = pdo_fetch($sql);
    if(empty($fans)){
        $resultUrl = create_url('micromember/member',array('type'=>'list'));
        message('粉丝信息异常！', $resultUrl, 'error');
    }
    $sql2 = "select * from ".tablename('micromember')." where from_user='{$_GPC['from_user']}' and weid='{$_W['weid']}'";
    $member = pdo_fetch($sql2,array('from_user'=>$_GPC['from_user'],'weid'=>$_W['weid']));
    if(empty($member)){
        $resultUrl = create_url('micromember/member',array('type'=>'list'));
        message('会员信息异常！', $resultUrl, 'error');
    }

    $sqlcard = 'SELECT * FROM ' . tablename('micromember_card') . " WHERE weid = '{$_W['weid']}'";
    $cardInfo = pdo_fetchall($sqlcard);

    template('micromember/member/memberdetail');
}elseif($type=="carttype"){
    pdo_update('micromember',array('cardid'=>$_GPC['cardid']),array('id'=>$_GPC['id']));
    $resultUrl = create_url('micromember/member',array('type'=>'list'));
    message('修改会员卡成功！', $resultUrl);
}