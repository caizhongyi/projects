<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Login.aspx.cs" Inherits="Account_Account_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登陆-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="欢迎来到玩儿道，用户登陆，玩儿道，生活社交网络" />
<meta name="description" content="正确填写账号和密码以后登陆玩儿道" />

<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
    <link href="../style/account.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
<script src="../Scripts/OpenProjectPlugin/jquery.validate.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../Scripts/common/wandao.js"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
<script src="../Scripts/security/login.js" type="text/javascript"></script>

</head>
<body>
	<!--头部-->
	<div class="head">
    	<div class="jz">
        	<div class="logo left"><a href="/" title="玩儿道"><img src="../images/layout_main/logo.png" alt="玩儿道" /></a></div>
        </div>
    </div>
    <!--头部end-->
    <!--主体-->
    <div class="jz yh">
    	<div class="account">
        	<div class="sub_nav">
                <a href="javascript:;" class="active">用户登录</a>
                <a href="register.html">新用户注册</a>
                <a href="find_account.html">找回帐号</a>
                <a href="find_pass.html">找回密码</a>
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                <br />
        
                <form class='accout_edit_form'>
        <table width="100%" class="f14" border="0" cellspacing="1">
          <tr>
            <td width="6%" height="50">&nbsp;</td>
            <td width="94%" height="50" class="f16">请输入帐号名和密码</td>
          </tr>
          <tr>
            <td height="40">&nbsp;</td>
            <td height="40"><div class="txtLogin acc_name"><input type="text" maxlength="60" id="account" name="account"/></div></td>
          </tr>
          <tr>
            <td height="40">&nbsp;</td>
            <td height="40"><div class="txtLogin acc_pwd"><input type="password" maxlength="60" id="password" name="password"/></div></td>
          </tr>
          <tr>
            <td height="40">&nbsp;</td>
            <td class="f12" height="40"><input type="checkbox" id="autoLogin" /> <label for="autoLogin">下次自动登录</label></td>
          </tr>
          <tr>
            <td height="100">&nbsp;</td>
            <td height="100"><a href="javascript:void(0);" class="btn_137x32 input_sub">登 录</a></td>
          </tr>
        </table>
                </form>
        
            <br/>
            <br/>
            <br/>
            </div>
            <div class="layout_b"></div>
    		<!--底部-->
            <div class="foot">
                <span class="left"><a href="#">特色</a> <a href="#">开发应用</a> <a href="#">法律声明</a> <a href="#">招聘团队</a> <a href="#">建议</a> <a href="#">帮助</a></span>
                <span class="right">版权所有 &copy;玩儿道</span>
            </div>
    		<!--底部end-->
        </div>
    </div>
    <!--主体end-->

</body>
</html>