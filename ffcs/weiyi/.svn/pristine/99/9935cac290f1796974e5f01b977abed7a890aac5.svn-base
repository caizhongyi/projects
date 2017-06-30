<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 13-12-30
 * Time: 下午1:47
 * 绑定公众帐号引导
 */
defined('IN_IA') or exit('Access Denied');
$id = intval($_GPC['id']);

if (!checkpermission('wechats', $id)) {
    message('公众号不存在或是您没有权限操作！');
}

if (checksubmit('submit')) {
    if(!empty($_GPC['weid']) && $_GPC['step']==3){
        $settings=array();
        isset($_GPC['default']) && $settings['default'] = $_GPC['default'];
        isset($_GPC['welcome']) && $settings['welcome'] = $_GPC['welcome'];
        if(!empty($settings)){
            pdo_update('wechats', $settings, array('weid' => $_GPC['weid']));
            pdo_insert('rule',array('name'=>'绑定测试','module'=>'basic','status'=>1,'weid'=>$_GPC['weid']));
            $ruleid =  pdo_insertid();
            pdo_insert('rule_keyword',array('rid'=>$ruleid,'module'=>'basic','status'=>1,'type'=>1,'content'=>'T'));
            pdo_insert('basic_reply',array('rid'=>$ruleid,'content'=>'欢迎使用微翼公众帐号平台！'));
            cache_write('weid:' . $_W['uid'], $_GPC['weid']);
            isetcookie('__weid', $_GPC['weid'], 7 * 46800);
            message('绑定成功',create_url('index/frame'),'success');
        }

    }
    if (empty($_GPC['name'])) {
        message('抱歉，请填写公众号名称！');
    }
    $data = array(
        'type' => intval($_GPC['type']),
        'uid' => $_W['uid'],
        'name' => $_GPC['name'],
        'account' => $_GPC['account'],
        'original' => $_GPC['original'],
        'token' => $_GPC['wetoken'],
        'key' => $_GPC['key'],
        'secret' => $_GPC['secret'],
        'signature' => '',
        'country' => '',
        'province' => '',
        'city' => '',
        'username' => '',
        'password' => '',
        'welcome' => '',
        'default' => '',
        'lastupdate' => '0',
        'default_period' => '0',
    );

    if (!empty($_GPC['islogin']) && !empty($_GPC['wxusername']) && !empty($_GPC['wxpassword'])) {
        if ($_GPC['type'] == 1) {
            $loginstatus = account_weixin_login($_GPC['wxusername'], md5($_GPC['wxpassword']), $_GPC['verify']);
        } elseif ($_GPC['type'] == 2) {
            $loginstatus = account_yixin_login($_GPC['wxusername'], md5($_GPC['wxpassword']), $_GPC['verify']);
        }
        if ($loginstatus) {
            $data['username'] = $_GPC['wxusername'];
            $data['password'] = md5($_GPC['wxpassword']);
            $data['lastupdate'] = 0;
        }
    }

    if (!empty($id)) {
        $update = array(
            'uid' => $data['uid'],
            'name' => $data['name'],
            'account' => $data['account'],
            'original' => $data['original'],
            'key' => $data['key'],
            'secret' => $data['secret'],
            'type'=>$data['type'],//修复选择类型
        );
        if (!empty($data['password'])) {
            $update['username'] = $data['username'];
            $update['password'] = $data['password'];
            $update['lastupdate'] = $data['lastupdate'];
        }

        pdo_update('wechats', $update, array('weid' => $id));
    } else {
        $data['hash'] = random(5);
        $data['token'] = random(32);
        if (pdo_insert('wechats', $data)) {
            $newid = $id = pdo_insertid();
        }
    }
    header('location:'.create_url('account/blind',array('id'=>$id,'step'=>2)));
    //message('更新公众号成功！',create_url('index/frame'));
} else {
    $wechat = array();
    if (!empty($id)) {
        $wechat = pdo_fetch("SELECT * FROM ".tablename('wechats')." WHERE weid = '$id'");
    }
    if(!empty($wechat['username']) && (empty($wechat['lastupdate']) || TIMESTAMP - $wechat['lastupdate'] > 86400 * 7)) {
        if ($wechat['type'] == 1) {
            $loginstatus = account_weixin_login($wechat['username'], $wechat['password']);
            $basicinfo = account_weixin_basic();
        } elseif ($wechat['type'] == 2) {
            $loginstatus = account_yixin_login($wechat['username'], $wechat['password']);
            $basicinfo = account_yixin_basic($wechat['username']);
        }

        if (!empty($basicinfo['name'])) {
            $update = array(
                'name' => $basicinfo['name'],
                'account' => $basicinfo['account'],
                'original' => $basicinfo['original'],
                'signature' => $basicinfo['signature'],
                'country' => $basicinfo['country'],
                'province' => $basicinfo['province'],
                'city' => $basicinfo['city'],
                'lastupdate' => TIMESTAMP,
            );
            if (!empty($basicinfo['key'])) {
                $update['key'] = $basicinfo['key'];
                $update['secret'] = $basicinfo['secret'];
            }
            pdo_update('wechats', $update, array('weid' => $id));
            $wechat['name'] = $basicinfo['name'];
            $wechat['account'] = $basicinfo['username'];
            $wechat['original'] = $basicinfo['original'];
            $wechat['signature'] = $basicinfo['signature'];
            $wechat['country'] = $basicinfo['country'];
            $wechat['province'] = $basicinfo['province'];
            $wechat['city'] = $basicinfo['city'];
            $wechat['key'] = $basicinfo['key'];
            $wechat['secret'] = $basicinfo['secret'];
        }
    }
    if(!empty($wechat['type'])&&$wechat['type']==2){
        $accoutn_type_name ='易信';
    }else{
        $accoutn_type_name ='微信';
    }
    if(!empty($id) && ($_GPC['step'])==2){
        $url = $_W['siteroot'].'api.php?hash='.$wechat['hash'];
        $token = $wechat['token'];
        $pre_url = create_url('account/blind',array('id'=>$id,'step'=>1));
        $next_url = create_url('account/blind',array('id'=>$id,'step'=>3));
        template('account/step2');
    }elseif(!empty($id) && ($_GPC['step'])==3){
        $url = $_W['siteroot'].'api.php?hash='.$wechat['hash'];
        $token = $wechat['token'];
        $pre_url = create_url('account/blind',array('id'=>$id,'step'=>2));
//        $next_url = create_url('blind/account',array('id'=>$id,'step'=>2));
        template('account/step3');
    }
    else{
        template('account/step1');
    }
}