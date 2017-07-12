<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Edit_Pass_Step2.aspx.cs" Inherits="Account_Account_Edit_Pass_Step2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>修改密码-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="填写新密码，修改密码，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="修改密码第二步，输入新密码修改原密码" />
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
                <a href="#">安全密保</a>
                <a href="#" class="active">修改密码</a>
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                    <ul class="account_nav">
                        <li class="visited"><i>1</i><span>身份确认</span></li>
                        <li class="active"><i>2</i><span>填写新密码</span></li>
                    </ul>
                    <form class='accout_edit_form'  onsubmit="return false;">
                    <table width="100%" border="0" cellspacing="1">
                      <tr>
                        <td width="30%" height="50" align="right" class="f14">新密码：</td>
                        <td width="70%"><input type="password" class="input_a"  id="pwd" name="pwd"/></td>
                      </tr>
                      <tr>
                        <td height="50" align="right" class="f14">确认新密码：</td>
                        <td><input type="password" class="input_a" id="repwd" name="repwd" /></td>
                      </tr>
                      <tr>
                        <td colspan="3" height="90" align="center">
                        <div class="submit_form_input f14"><input type="submit" class="input_sub" value="修改" id="btnUpdate" /><input type="submit" class="input_sub" value="修改并回到首页" id="btnUpdateToHome" /></div>
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
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
    <script src="../Scripts/security/edit-pass.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            edit_pass_2_onload();
        });
    </script>
</body>
</html>