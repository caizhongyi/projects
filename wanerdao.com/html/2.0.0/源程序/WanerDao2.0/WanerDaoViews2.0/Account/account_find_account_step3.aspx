<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_find_account_step3.aspx.cs"
    Inherits="Account_account_find_account_step3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回账号-账号维护-玩儿道</title>

<meta name="keywords" content="重新登陆，找回账号，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="找回账号第三步，从安全邮箱的邮件中获得登陆账号，然后可以选择重新登陆" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
<link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" 
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
        	<li><a href="login.html">用户登录</a></li><li><a  href="register.html">新用户注册</a></li><li class="current"><a href="find_account.html">找回账号 </a></li><li ><a href="find_pass.html" >找回密码</a></li>
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
							<p class="setp_title">输入注册邮箱</p>
						</li><li class="stepbar_end">
							<div class="item_img item2_end"></div>
							<p class="setp_title">回答安全问题</p>
						</li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">重新登陆</p>
						</li>			
					</ul>
				</div>
        <div id="wait"><img src="../images/loading.gif" /></div>
                <form  class="accout_edit_form" style="display:none;"  onsubmit="return false;">
                <div class="form">
                    <p class="result">账号已经发送至安全邮箱"<span class="displayemail"></span>"，请查收<a href="javascript:;" class="tomail">进入邮件地址</a></p>
                    <div class="submit"><a  href="javascript:;" class="button button1" id="btnSendAgain">再一次重新发送</a><a  href="javascript:;" class="button button1" id="btnLogin">重新登录</a></div>
                </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved.</span>
    <p class="footer_link"><a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
</div>
</body>
<script src="../scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="../scripts/plugin/cookie/wanerdao2.cookies.js" type="text/javascript"></script>
<script src="../scripts/multiplelanguage/loader.js" type="text/javascript"></script>
<script src="../scripts/global.js" type="text/javascript"></script>
<script src="../scripts/common/wandao.js" type="text/javascript"></script>
<script src="../scripts/account/find-account.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_acc_3_onload();
    });
</script>
</html>
