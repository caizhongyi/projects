<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hongmingjie
 * Date: 14-2-18
 * Time: 上午10:48
 * 帐号模版直接通过公众帐号，生成微翼帐号密码，添加规则，模版菜单等配置。
 */
defined('IN_IA') or exit('Access Denied');
$current['register'] = ' class="current"';
$setting = cache_load('setting');
if (empty($setting['register']['open'])) {
    message('本站暂未开启注册功能，请联系管理员！');
}
$extendfields = pdo_fetchall("SELECT field, title, description, required FROM ".tablename('profile_fields')." WHERE available = '1' AND showinregister = '1' ORDER BY displayorder DESC");
if(checksubmit()) {
    $wechat = array();
    if (! empty($_GPC['username']) && ! empty($_GPC['password'])) {
        if ($_GPC['type'] == 1) {
            $loginstatus = account_weixin_login($_GPC['username'], md5($_GPC['password']), $_GPC['verify']);
            $basicinfo = account_weixin_basic($_GPC['username']);
        } elseif ($_GPC['type'] == 2) {
            $loginstatus = account_yixin_login($_GPC['username'], md5($_GPC['password']), $_GPC['verify']);
            $basicinfo = account_yixin_basic(($_GPC['username']));
        }
        if($loginstatus){
            require_once IA_ROOT . '/source/model/member.mod.php';
            hooks('member:register:before');
            $member = array();
            $member['username'] = trim($_GPC['username']);
            $member['email'] = trim($_GPC['email']);
            if(!preg_match(REGULAR_USERNAME, $member['username'])&&!preg_match(REGULAR_EMAIL, $member['username'])) {
               message('必须输入用户名，格式为 3-15 位字符，可以包括汉字、字母（不区分大小写）、数字、下划线和句点。');
            }
            if(member_check(array('username' => $member['username']))) {
              message('非常抱歉，此用户名已经被注册，你需要更换注册名称！');
            }
            $member['password'] = trim($_GPC['password']);
            $profile = array();
            if (!empty($extendfields)) {
                foreach ($extendfields as $row) {
                    if (!empty($row['required']) && empty($_GPC[$row['field']])) {
                        message('“'.$row['title'].'”此项为必填项，请返回填写完整！');
                    }
                    $profile[$row['field']] = $_GPC[$row['field']];
                }
            }
            $member['status'] = !empty($setting['register']['verify']) ? -1 : 0;
            $member['remark'] = '';
            $member['groupid'] = intval($setting['register']['groupid']);


            $uid = member_register($member);
            if($uid > 0) {
                unset($member['password']);
                $member['uid'] = $uid;
                //处理用户资料
                if (!empty($profile)) {
                    $profile['uid'] = $uid;
                    $profile['createtime'] = TIMESTAMP;
                    pdo_insert('members_profile', $profile);
                }
                //有用户组则添加相关权限
                if (! empty($member['groupid'])) {
                    $group = pdo_fetch("SELECT modules FROM " . tablename('members_group') . " WHERE id = :id", array(
                        ':id' => $member['groupid']
                    ));
                    if (! empty($group['modules'])) {
                        $group['modules'] = iunserializer($group['modules']);
                        if (is_array($group['modules'])) {
                            $modules = pdo_fetchall("SELECT mid FROM " . tablename('modules') . " WHERE mid IN ('" . implode("','", $group['modules']) . "')");
                            if (! empty($modules)) {
                                foreach ( $modules as $row ) {
                                    pdo_insert('members_modules', array(
                                        'uid' => $uid,
                                        'mid' => $row['mid']
                                    ));
                                }
                            }
                        }
                    }
                }
                hooks('member:register:success', $member);
            }
        }
        if (! empty($basicinfo['username'])) {
            $update = array(
                'uid'=>$uid,
                'name' => $basicinfo['username'],
                'token'=> random(32),
                'hash'=>random(5),
                'type'=>2,
                'account' => $basicinfo['account'],
                'original' => $basicinfo['original'],
                'signature' => $basicinfo['signature'],
                'country' => $basicinfo['country'],
                'province' => $basicinfo['province'],
                'city' => $basicinfo['city'],
                'lastupdate' => TIMESTAMP
            );
            $update['default'] = "欢迎使用". $basicinfo['username'];//设置默认回复
            $update['welcome'] = "欢迎关注". $basicinfo['username'];//设置关注回复
            if (! empty($basicinfo['key'])) {
                $update['key'] = $basicinfo['key'];
                $update['secret'] = $basicinfo['secret'];
            }
           pdo_insert('wechats', $update);
           $weid =pdo_insertid();
           $update['weid'] = $weid;
           create_rule($weid);
           create_menu($update);
           message("注册成功!",create_url('member/login'),'success');
        }else{
            message("请输入正确的用户帐号密码");
        }
    }else{
        message("请输入正确的用户帐号密码");
    }
}

function create_menu($account){
    if($account['type'] == '1') {
        $atype = 'weixin';
        $gateway['get'] = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s";
        $gateway['create'] = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s";
        $gateway['delete'] = "https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s";
    }
    if($account['type'] == '2') {
        $atype = 'yixin';
        $gateway['get'] = "https://api.yixin.im/cgi-bin/menu/get?access_token=%s";
        $gateway['create'] = "https://api.yixin.im/cgi-bin/menu/create?access_token=%s";
        $gateway['delete'] = "https://api.yixin.im/cgi-bin/menu/delete?access_token=%s";
    }
    $account_token = "account_{$atype}_token";
    $account_code = "account_weixin_code";
    $menu_tpl = '
               [{
                "name": "业务模块",
                "sub_button": [{
                    "name": "营销推广1",
                    "type": "click",
                    "key": "营销推广1"
                },
                {
                    "name": "营销推广2",
                    "type": "click",
                    "key": "营销推广2"
                },
                {
                    "name": "营销推广3",
                    "type": "click",
                    "key": "营销推广3"
                }]
            },
            {
                "name": "产品模块",
                "sub_button": [{
                    "name": "产品模块1",
                    "type": "click",
                    "key": "产品模块1"
                },
                {
                    "name": "产品模块2",
                    "type": "click",
                    "key": "产品模块2"
                },
                {
                    "name": "产品模块3",
                    "type": "click",
                    "key": "产品模块3"
                }]
            },
            {
                "name": "联系我们",
                "sub_button": [{
                    "name": "业务合作",
                    "type": "click",
                    "key": "业务合作"
                },
                {
                    "name": "意见建议",
                    "type": "click",
                    "key": "意见建议"
                },
                {
                    "name": "个人资料",
                    "type": "click",
                    "key": "news%3A302"
                }]
            }]';
    $token = $account_token($account);

    $url = sprintf($gateway['create'], $token);

    $mDat = htmlspecialchars_decode($menu_tpl);
    $menus = json_decode($mDat, true);
    if(!is_array($menus)) {
        message('操作非法.');
    }
    foreach($menus as &$m) {
        $m['name'] = urlencode($m['name']);
        if(is_array($m['sub_button'])) {
            foreach($m['sub_button'] as &$s) {
                $s['name'] = urlencode($s['name']);
            }
        }
    }
    $ms = array();
    $ms['button'] = $menus;
    $dat = json_encode($ms);
    $dat = urldecode($dat);
    $content = ihttp_post($url, $dat);
    $dat = $content['content'];
    $result = @json_decode($dat, true);
    if($result['errcode'] == '0') {
        message('已经成功创建菜单. ', create_url('menu'));
    }
}
/*
 * 创建模版规则
 */
function create_rule($weid){
    //营销推广规则,产品模块规则
    for($i = 1;$i<3;$i++){
        for($n=1;$n<4;$n++){
            $name = ($i==1) ? "营销推广".$n : "产品模块".$n;
            create_new_rule($weid,$name);
        }
    }
    //联系我们
    create_new_rule($weid,"业务合作");
    create_new_rule($weid,"意见建议");

}
//插入图文回复模版
function create_new_rule($weid,$name){
    $rule = array (
        'weid' => $weid,
        'cid' => '',
        'name' => $name,
        'module' => 'news',
        'status' => 1,
        'displayorder' => 0,
    );
    pdo_insert('rule', $rule);
    $rid = pdo_insertid();
    $keyword = array(
        'rid' => $rid,
        'weid' => $weid,
        'module' => 'news',
        'status' => 1,
        'displayorder' => 0,
        'content' => $name,
        'type' => 1,
    );
    pdo_insert('rule_keyword', $keyword);
    $reply = array(
        'rid' => $rid,
        'parentid' => 0,
        'title' =>$name,
        'description' =>  $name,
        'thumb' => '',
        'content' =>$name,
        'url' => '',
        'createtime'=>time(),
    );
    pdo_insert('news_reply', $reply);
}

template('member/tpl');