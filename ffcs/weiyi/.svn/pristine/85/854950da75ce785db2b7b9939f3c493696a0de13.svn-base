<?php
/**
 * Created by JetBrains PhpStorm.
 * User: linhj
 * Date: 13-12-18
 * Time: 下午7:17
 * To change this template use File | Settings | File Templates.
 */


defined('IN_IA') or exit('Access Denied');
$type = $_GPC['type'];
$type = empty($type)?"list":$type;
$t_news = "micromember_news";
$t_forward = "micromember_news_forward";

if($type=="list"){
    $sql = 'SELECT * FROM ' . tablename($t_news) . " WHERE weid = '{$_W['weid']}'";
    if(!empty($_GPC['title'])){
        $sql .= " and title like'%{$_GPC['title']}%'";
        $queryTitle = $_GPC['title'];
    }
    if(!empty($_GPC['content'])){
        $sql .= " and content like'%{$_GPC['content']}%'";
        $queryContent = $_GPC['content'];
    }
    $newsList = pdo_fetchall($sql);
    template('micromember/news/list');
}elseif($type=="post"){
    $resultUrl = create_url('micromember/notify',array('type'=>'list'));
    if (checksubmit('submit')) {
        if (empty($_GPC['title'])) {
            message('标题不能为空！', $resultUrl, 'error');
        }
        if (empty($_GPC['content'])) {
            message('内容不能为空！', $resultUrl, 'error');
        }
        $news_data = array(
            'title' => $_GPC['title'],
            'content' => $_GPC['content'],
            'addtime' => mktime(),
        'weid' => $_W['weid']
        );
        if(pdo_insert($t_news, $news_data)){
            $newsid = pdo_insertid();
            $insertForwardSql = "insert into ".tablename($t_forward)." (newsid,flag,from_user)  select ".$newsid.",0,from_user from ".tablename('micromember')." where weid={$_W['weid']} ";
            pdo_run($insertForwardSql);
            message('会员通知添加成功',$resultUrl);

        }else{
            message('会员通知添加失败',$resultUrl);
        }
    }
}elseif($type=="delete"){
    if(!empty($_GPC['id'])){
        $sub = array('id'=>$_GPC['id']);
        $del_res = pdo_delete($t_news,$sub);
        pdo_delete($t_forward,$sub);
    }
    if($del_res==1){
        message('删除成功', create_url('micromember/notify',array('type'=>'list')));
    }else{
        message('删除失败', create_url('micromember/notify',array('type'=>'list')));
    }
}elseif($type=="add"){
    template('micromember/news/add');
}
