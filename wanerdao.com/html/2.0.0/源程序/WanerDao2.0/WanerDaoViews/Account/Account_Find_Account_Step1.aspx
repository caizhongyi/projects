<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Find_Account_Step1.aspx.cs" Inherits="Account_Account_Find_Account_Step1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>找回账号-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="输入注册邮箱，找回账号，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="找回账号第一步，输入安全邮箱" />

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
                    <li class="active"><i>1</i><span>输入注册邮箱</span></li>
                    <li class="link"><i>2</i><span>回答安全问题</span></li>
                    <li class="link"><i>3</i><span>重新登录</span></li>
                </ul>
                <form  class='accout_edit_form' name="myForm" onsubmit="return false;">
                <table width="100%" height="170" border="0" cellspacing="1">
                  <tr>
                    <td width="26%" height="44" align="right" class="f14">请输入安全邮箱：</td>
                    <td width="74%"><div class="relate"><input type="text" id="email" class="input_a" />
                    </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">&nbsp;</td>
                    <td><a href="javascript:void(0);" class="btn_137x32" id="next1">下一步</a></td>
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
    
<script src="../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
    <script src="../Scripts/security/find-account.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_acc_1_onload();
    });
</script>
<!--页面脚本区-->
</body>
</html>