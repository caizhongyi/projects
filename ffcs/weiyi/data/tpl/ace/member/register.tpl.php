<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="Keywords" content="微易中心">
    <meta name="Description" content="微易中心">
    <!-- Mobile Devices Support @begin -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- apple devices fullscreen -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <!-- Mobile Devices Support @end -->
    <link rel="shortcut icon" href="http://stc.weimob.com/img/favicon.ico">

    <link rel="stylesheet" type="text/css" href="./resource/style/bootstrap.css" media="all">
    <link rel="stylesheet" type="text/css" href="./resource/style/index.css" media="all">
    <link rel="stylesheet" type="text/css" href="./resource/script/formvalidator/formvalidator.css" media="all">

    <script type="text/javascript" src="./resource/script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="./resource/script/bootstrap.js"></script>

    <script type="text/javascript" src="./resource/script/formvalidator/formvalidator.js"></script>
    <script type="text/javascript" src="./resource/script/formvalidator/formvalidatorregex.js"></script>
    <script type="text/javascript" src="./resource/script/placeholder.js"></script>
    <title>登录-微易中心</title>

</head>

<body>
<div id="header" class="head head-nobg">
    <div class="top">
        <div class="topnav">
            <a href="<?php echo create_url('index');?>" target="_blank" title="微易首页" hidefocus="true" onfocus="this.blur();">微易首页<i class="arrow"></i></a>
        </div>
    </div>
</div>

<div class="container">
    <form id="regform" class="form-horizontal form-box form-reg" action="<?php echo create_url('member/register');?>"   method="post">
        <span class="form-marking"></span>
        <div class="form-header">
            <span class="pull-left">注册新用户</span>
            <span class="pull-right">欢迎您注册网站会员，如果您已拥有账户，则可在此 <a href="<?php echo create_url('member/login');?>" title="登录" hidefocus="true" onfocus="this.blur();" class="btn btn-submit btn-mini">登录</a></span>
        </div>
        <div class="control-group">
            <label class="control-label" for="username">用户名</label>
            <div class="controls">
                <input name="username" id="username"
                       type="text">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="password">设置密码</label>
            <div class="controls">
                <input name="password" id="password"
                       type="password">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="repassword">确认密码</label>
            <div class="controls">
                <input name="repassword" id="repassword"
                       type="password">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="email">邮箱</label>

            <div class="controls">
                <input name="email" id="email"
                       type="text">
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <label class="agreement" for="email">
                     <input type="checkbox"/>我已阅读并接受 <a href="">《微易公众服务平台协议》</a>
                </label>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="hidden" name="submit" value="1"/>
                <input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
                <button type="submit"  class="btn btn-submit">马上注册</button>
            </div>
        </div>
        <div class="form-footer"></div>
    </form>

</div>

<script type="text/javascript">
    $(function () {
        $('#username').focus();
    });

    $(function(){
        $.formValidator.initConfig({wideword:true,autotip:true,formid:"regform",onerror:function(msg){},onsuccess:function(){ }});
        $("#username").formValidator({onshow:"长度为6~16位字符，可以为“数字/字母/中划线/下划线”组成！",onfocus:"长度为6~16位字符，可以为“数字/字母/中划线/下划线”组成！",onerror:"长度为6~16位字符，可以为“数字/字母/中划线/下划线”组成！"})
                .inputValidator({min:6,max:16,onerror:"长度为6~16位字符，可以为“数字/字母/中划线/下划线”组成！"}).ajaxValidator({
                    type : "post",
                    url : "<?php echo create_url('member/check');?>",
                    data :"",
                    datatype : "html",
                    async:'false',
                    success : function(data){
                        if( data == "1" ) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    buttons: $("#dosubmit"),
                    onerror : "禁止注册或者用户已存在",
                    onwait : "检测用户名是否已存在..."
                });
        $("#password").formValidator({onshow:"长度为8~16位字符！",onfocus:"长度为8~16位字符！",onerror:"长度为8~16位字符"})
                .inputValidator({min:8,max:16,onerror:"长度为8~16位字符"});
        $("#repassword").formValidator({onshow:"确认密码！",onfocus:"确认密码！",onerror:"确认密码"})
                .inputValidator({min:8,max:16,onerror:"密码不一致！"}).functionValidator({fun:function(){
                    console.log($(this));
                    if( $("#repassword").val() != $('#password').val()){
                        return false;
                    }
                    else{
                        return true;
                    }
                },onerror:"确认密码"});
        $("#email").formValidator({onshow:"邮箱将与支付及优惠相关，请填写正确的邮箱",onfocus:"邮箱将与支付及优惠相关，请填写正确的邮箱",oncorrect:"邮箱格式正确"}).regexValidator({regexp:"email",datatype:"enum",onerror:"邮箱将与支付及优惠相关，请填写正确的邮箱"}) .ajaxValidator({
            type : "post",
            url : "<?php echo create_url('member/check');?>",
            data :"",
            datatype : "html",
            async:'false',
            success : function(data){
                if( data == "1" ) {
                    return true;
                } else {
                    return false;
                }
            },
            buttons: $("#dosubmit"),
            onerror : "禁止注册或者邮箱已存在",
            onwait : "检测邮箱是否已存在..."
        });;
    })
</script>
</body>
</html>