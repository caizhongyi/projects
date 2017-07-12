<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Find_Account_Step2.aspx.cs" Inherits="Account_Account_Find_Account_Step2" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回账号-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="回答安全问题，找回账号，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="找回账号第二步，回答密码保护的安全问题" />

<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link href="../style/account.css" rel="stylesheet" type="text/css" />
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
                <a href="login.html" >用户登录</a>
                <a href="register.html">新用户注册</a>
                <a href="find_account.html" class="active">找回帐号</a>
                <a href="find_pass.html">找回密码</a>
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                <ul class="account_nav">
                    <li class="visited"><i>1</i><span>输入注册邮箱</span></li>
                    <li class="active"><i>2</i><span>回答安全问题</span></li>
                    <li class="link"><i>3</i><span>重新登录</span></li>
                </ul>
        <div class="wait"><img src="../images/loading.gif" /></div>
                <form  class="accout_edit_form" style="display:none;"  onsubmit="return false;">
                <table width="100%" class="f14" border="0" cellspacing="1">
                  <tr>
                    <td width="26%" height="30" align="right">问题一：</td>
                    <td width="74%"><span id="question1"></span></td>
                  </tr>
                  <tr>
                    <td width="26%" height="40" align="right">回答：</td>
                    <td width="74%"><input type="text" class="input_a"  id="answer1"/></td>
                  </tr>
                  <tr>
                    <td width="26%" height="30" align="right">问题二：</td>
                    <td width="74%"><span id="question2"></span></td>
                  </tr>
                  <tr>
                    <td width="26%" height="40" align="right">回答：</td>
                    <td width="74%"><input type="text" class="input_a" id="answer2" /></td>
                  </tr>
                  <tr>
                    <td height="100" align="right">&nbsp;</td>
                    <td><a href="javascript:void(0);" class="btn_137x32" id="nextstep">下一步</a></td>
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
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
    <script src="../Scripts/security/find-account.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_acc_2_onload();
    });
</script>
</body>
</html>