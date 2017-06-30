<?php defined('IN_IA') or exit('Access Denied');?><!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>微擎 - 微信公众平台自助引擎 -  Powered by WE7.CC</title>
    <meta name="keywords" content="微擎,微信,微信公众平台" />
    <meta name="description" content="微信公众平台自助引擎，简称微擎，微擎是一款免费开源的微信公众平台管理系统。" />
    <link type="text/css" rel="stylesheet" href="./resource/style/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="./resource/style/index.css" media="all">

    <script type="text/javascript" src="./resource/script/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="./resource/script/bootstrap.js"></script>
    <script type="text/javascript" src="./resource/script/common.js?v=1382670391"></script>
    <script type="text/javascript" src="./resource/script/emotions.js"></script>
    <script type="text/javascript" src="./resource/script/jquery.placeholder.js"></script>

    <script type="text/javascript">
        cookie.prefix = '65d1_';
    </script>
    <script>
        $(document).ready(function(){
            $('#btn-login').click(function(){
                $('#error_box').hide();
                var userAgent = window.navigator.userAgent.toLowerCase();
                var ie6 = $.browser.msie && /msie 6\.0/i.test(userAgent);
                if (ie6)
                {
                    alert('请不要使用ie6及以下等低版本浏览器');
                    return false;
                }

                // 提交前检验
                if('' == $('#username').val()){
                    $('#username').focus();
                    $('#error_tips').text('请输入账号');
                    $('#error_box').slideDown(400);
                    setTimeout(function(){
                        $('#error_box').hide();
                    }, 1000);
                    return false;
                }
                if('' == $('#password').val()){
                    $('#username').focus();
                    $('#error_tips').text('请输入密码');
                    $('#error_box').slideDown(400);
                    setTimeout(function(){
                        $('#error_box').hide();
                    }, 1000);
                    return false;
                }

                $.post('<?php echo create_url('member/login');?>', {username: $('#username').val(), password: $('#password').val(), keepalive: $('#hold').val(),indexlogin:1,submit:$('#btn-login').val(),token:$('input[name=token]').val()}, function(rs){
                    $('#error_tips').text(rs.error);
                    $('#error_box').slideDown(400);
                    setTimeout(function(){
                        $('#error_box').hide();
                    }, 1000);
                    if(rs.errno == 200){
                        $('#error_tips').text('登录成功');
                        setTimeout(function(){
                            location.href = rs.url_route;
                        }, 600);
                    }
                }, 'json');
            });
            $("#password").keyup(function (e) {
                if (e.keyCode == 13) {
                    $("#login-btn").click();
                    return false;
                }
            });
        });

        function changeCheckbox(){
            var new_value = (parseInt($('#keepalive').attr('value')) + 1) % 2;
            $('#keepalive').attr('value', new_value);
            if(1 == new_value){
                $('#keepalive').addClass('checked');
            }else{
                $('#keepalive').removeClass('checked');
            }
        }

        function bindEnterKey(event){
            if(13 == event.keyCode){
                $('#btn-login').click();
            }
        }


    </script>
</head>
<body>
<div id="header" class="head head-nobg head-mini">
    <div class="top">
        <div class="topnav">
            <a href="<?php echo create_url('index');?>" target="_blank" title="微易首页" hidefocus="true" onfocus="this.blur();">微易首页</a>|
            <a href="<?php echo create_url('member/register');?>" class="registerNew" title="注册新帐号" hidefocus="true" onfocus="this.blur();">注册新帐号<i class="arrow"></i></a>
        </div>
    </div>
</div>

<div class="container">
    <div  class="form-horizontal form-box form-mini" id = "login_form" method="post"  >
        <div class="form-header">登  录</div>
        <div class="control-group">
            <div class="controls">
                <div class="input-prepend input-prepend-login">
                    <span class="add-on"><i class="icon icon-personal"></i></span>
                    <input id="username" type="text"  autocomplete="off" name="username">
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <div class="input-prepend input-prepend-login">
                    <span class="add-on"><i class="icon icon-password"></i></span>
                    <input id="password" type="password"  autocomplete="off" name="password">
                </div>
            </div>
        </div>

        <div class="control-group" id="error_box" style="margin:0 0 10px; color:#c35d00;">
            <div class="controls">
                    <span id="error_tips"></span>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="submit" name="button" id="btn-login" class="btn btn-submit" value="登录"/><input type="hidden" name="token" value="<?php echo $_W['token'];?>" />
            </div>
        </div>
        <div class="control-group">
            <div class="controls remember">
                <label for="remember" class="checkbox inline"><input type="checkbox" name="rember" value="1" id="remember">自动登录</label>
            </div>
        </div>
        <div class="form-footer"></div>
    </div>

</div>
</body>
</html>
