<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_find_pass_step2.aspx.cs"
    Inherits="Account_account_find_pass_step2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>找回密码-账号维护-玩儿道</title>
    <meta name="keywords" content="身份验证，找回密码，账号维护，玩儿道，生活社交网络" />
    <meta name="description" content="找回密码第二步，从安全邮箱的邮件中获得临时密码，然后可以选择下一步" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
</head>
<body class="pBgB">
    <div class="header_wrapper pBgH">
        <div class="header layout">
            <a href="/" class="logo"></a>
        </div>
    </div>
    <div class="container layout">
        <div class="tabs">
    	<ul class="tabs-nav">
        	<li><a href="login.html">用户登录</a></li><li><a  href="register.html">新用户注册</a></li><li><a href="find_account.html">找回账号 </a></li><li  class="current"><a href="find_pass.html" >找回密码</a></li>
        </ul>
            <div class="bigbox">
                <div class="box_hd"></div>
                <div class="box_bd">
                    <div class="setbar setbar-3 clearfix">
					<div class="setbar-l"></div>
                    <div class="setbar-r"></div>
					<ul>
						<li class="stepbar_end">
							<div class="item_img item1_end"></div>
							<p class="setp_title">填写账号</p>
						</li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">身份验证</p>
						</li><li class="stepbar_will">
							<div class="item_img item2_will"></div>
							<p class="setp_title">重设密码</p>
						</li>			
					</ul>
				</div>
                    <div id="wait">
                        <img src="../images/loading.gif" /></div>
                    <form id='accout_edit_form' style="display: none;"  onsubmit="return false;">
                    <div class="form">
                        <p class="result">验证码已经发送到你的安全邮箱 "<span id="displayemail"></span>"，请填写重设密码，<a href="javascript:;" id="tomail">进入邮件地址。</a></p>
                        <ul>
                            <li>
                                <label class="label" for="input_a">
                                    身份验证码:</label><input id="input_a" name="input_a" type="text" class="text"  maxlength="60"/></li>
                        </ul>
                        <div class="submit"><a  href="javascript:;" class="button button1" id="btnSendAgain">再发一次到安全邮箱</a><a  href="javascript:;" class="button button1" id="nextstep">下一步</a></div>
                    </div>
                    </form>
                </div>
                <div class="box_ft"></div>
            </div>
        </div>
    </div>
    <!--loginMain-->
    <div class="footer layout">
        <span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved</span>
        <p class="footer_link">
            <a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a
                href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
    </div>
</body>
<script src="../scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="../scripts/plugin/cookie/wanerdao2.cookies.js" type="text/javascript"></script>
<script src="../scripts/multiplelanguage/loader.js" type="text/javascript"></script>
<script src="../scripts/global.js" type="text/javascript"></script>
<script src="../scripts/common/wanerdaoutils.js" type="text/javascript"></script>
<script src="../scripts/common/wandao.js" type="text/javascript"></script>
<script src="../scripts/account/find-pwd.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_pass_2_onload();
    });
</script>
</html>
