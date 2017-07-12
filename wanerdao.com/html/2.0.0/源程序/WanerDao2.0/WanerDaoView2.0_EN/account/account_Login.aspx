<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_Login.aspx.cs" Inherits="en_us_account_account_Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login-Account-Savorboard</title>

<meta name="keywords" content="Welcome to Savorboard, login, Savorboard, Life and social network" />
<meta name="description" content="Fill correct account and password and login Savorboard" />

<link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />

 <style>
  .fail{ color: Red;}
  </style>
</head>
<body class="pBgB">
<div class="header_wrapper pBgH">
	<div class="header layout">
        <a href="../" class="logo"></a>
</div>

<div class="container layout">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li  class="current"><a href="javascript:;">Log in</a></li>
            <li><a href="register.html">Sign up</a></li>
            <li><a href="find_account.html">Find Username</a></li>
            <li><a href="find_pass.html">Find Password</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
                <div class="form">
                    <form class="accout_edit_form">
                    <ul>
                        <li><label class="label">&nbsp;</label>Please enter account and password</li>
                		<li><label class="label">Username： </label><input  type="text" class="text" maxlength="60" id="account" name="account"/></li>
                        <li><label class="label">Password： </label><input  type="password" class="text" maxlength="60" id="password" name="password"/></li>
                        <li><label class="label"></label><input  type="checkbox" id="autoLogin"/>&nbsp;<label for="autoLogin">Keep me logged in</label></li>
                    </ul>
                    <div class="submit"><a  href="javascript:;" class="button button1" id="btnLogin">Login</a></div>
                    </form>
                </div>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright &copy; 2012 Savorboard Corporation, All right reserved.</span>
    <p class="footer_link"><a href="javascript:;">Feature</a><a href="javascript:;">Application</a><a href="javascript:;">Term</a><a href="javascript:;">Career</a><a href="javascript:;">Suggest</a><a href="javascript:;">Help</a></p>
</div>


<script src="/scripts/jquery-1.4.2.min.js"></script>
    <script src="/scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script src="/scripts/multiplelanguage/loader.js"></script>
<script src="/scripts/global.js"></script>
    <script src="/scripts/openplugin/jquery.validate.min.js"></script>
    <script src="/Scripts/common/wandao.js" ></script>
    <script src="/Scripts/common/wanerdaoutils.js" ></script>
    <script src="/scripts/account/login.js" type="text/javascript"></script>
</body>
</html>
