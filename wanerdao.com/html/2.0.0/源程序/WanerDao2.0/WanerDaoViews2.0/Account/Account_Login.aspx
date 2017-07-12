<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Login.aspx.cs" Inherits="Account_Account_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登陆-账号维护-玩儿道</title>
<meta name="keywords" content="欢迎来到玩儿道，用户登陆，玩儿道，生活社交网络" />
<meta name="description" content="正确填写账号和密码以后登陆玩儿道" />
    <link href="../css/style.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/layout.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/form.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/account.css" rel="stylesheet" type="text/css" media="all"/>
    
    <style>
  .fail{ color: Red;}
  </style>
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
        	<li  class="current"><a href="javascript:;">用户登录</a></li>
            <li><a href="register.html">新用户注册</a></li>
            <li><a href="find_account.html">找回账号 </a></li>
            <li><a href="find_pass.html">找回密码</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
                <div class="form">
                    <form class="accout_edit_form">
                    <ul>
                        <li><label class="label">&nbsp;</label>请输入账号名和密码</li>
                		<li><label class="label">账号： </label><input type="text" class="text" maxlength="60" id="account" name="account"/></li>
                        <li><label class="label">密码： </label><input type="password" class="text" maxlength="60" id="password" name="password"/></li>
                        <li><label class="label"></label><input  type="checkbox" id="autoLogin"/>&nbsp;<label for="autoLogin">下次自动登录</label></li>
                    </ul>
                    <div class="submit"><a  href="javascript:;" class="button button1" id="btnLogin">登 录</a></div>
                    </form>
                </div>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved</span>
    <p class="footer_link"><a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
</div>

<script src="../scripts/jquery-1.4.2.min.js"></script>
    <script src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script src="../scripts/multiplelanguage/loader.js"></script>
<script src="../scripts/global.js"></script>
    <script src="../scripts/openplugin/jquery.validate.min.js"></script>
    <script src="/Scripts/common/wandao.js" ></script>
    <script src="/Scripts/common/wanerdaoutils.js" ></script>
    <script src="../scripts/account/login.js" type="text/javascript"></script>

</body>
</html>
