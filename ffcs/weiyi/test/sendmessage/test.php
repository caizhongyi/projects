<?php
    header("Content-type: text/html; charset=gbk");
    require './weixin.php';
        $arr = array(
                'account' => '493914307@qq.com',
                'password' => 'hmj19890618'
        );
        $w = new Weixin($arr);
        var_dump($w->getAllUserInfo());//测试群发
        $w->send_all("欢迎关注We助手！！！");

?>