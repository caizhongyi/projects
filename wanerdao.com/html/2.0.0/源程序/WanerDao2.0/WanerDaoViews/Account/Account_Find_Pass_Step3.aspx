<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Find_Pass_Step3.aspx.cs" Inherits="Account_Account_Find_Pass_Step3" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回密码-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="重设密码，找回密码，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="找回密码第三步，填写新密码修改原密码" />

<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link href="../style/account.css" rel="stylesheet" type="text/css" />
<style type="text/css">
    #password-strength{width:220px;line-height:8px; margin-left:10px; margin-top:5px;}
    span.password-min-char{ line-height:8px; height:8px;width:90px; font-size:8px;}
    span.password-strength-bar{ height:8px; line-height:8px; }
    span.password-strength-bar-conatiner{ width:150px; height:8px; border:solid 1px #eee; display:block; float:left;}
</style>
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
                <a href="login.html">用户登录</a>
                <a href="register.html">新用户注册</a>
                <a href="find_account.html">找回帐号</a>
    	        <a href="javascript:;" class="active">找回密码</a>  
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                <ul class="account_nav">
                    <li class="visited"><i>1</i><span>填写帐号</span></li>
                    <li class="visited"><i>2</i><span>身份验证</span></li>
                    <li class="active"><i>3</i><span>重新密码</span></li>
                </ul>
                <form class='accout_edit_form'>
                <table width="100%" class="f14" height="170" border="0" cellspacing="1">
                  <tr>
                    <td width="30%" height="44" align="right">新密码：</td>
                    <td width="70%"><input type="password" class="input_a" id="pwd" name="pwd" /></td>
                  </tr>
                  <tr>
                    <td height="41" align="right">确认新密码：</td>
                    <td><input type="password" class="input_a" id="repwd" name="repwd" /></td>
                  </tr>
                  <tr>
                    <td colspan="3" align="center">
                    <div class="submit_form_input"><a href="javascript:void(0);" class="btn_137x32" id="btnResetPwd">重设</a> <a href="javascript:void(0);" class="btn_137x32" id="btnResetAndLogin">登录并重设</a></div>
                    </td>
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

<!--页面脚本区-->
<script src="../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
<script src="../Scripts/OpenProjectPlugin/jquery.validate.min.js" type="text/javascript"></script>
<script src="../Scripts/OpenProjectPlugin/digitalspaghetti.password.js" type="text/javascript"></script>
<script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
<script src="../Scripts/security/find-pwd.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_pass_3_onload();
    });
</script>
</body>
</html>