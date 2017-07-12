<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Set_Security_Step1.aspx.cs" Inherits="Account_Account_Set_Security_Step1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>密码保护-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="身份确认，密码保护，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="设置密码保护第一步，填写账号和密码确认身份" />

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
                <a href="edit_pass.html" class="active">安全密保</a>
                <a href="javascript:;">修改密码</a>
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                <ul class="account_nav">
                    <li class="active"><i>1</i><span>身份确认</span></li>
                    <li class="link"><i>2</i><span>填写密码保护资料</span></li>
                </ul>
                <form  class='accout_edit_form'  onsubmit="return false;">
                <table width="100%" class="f14" height="170" border="0" cellspacing="1">
                  <tr>
                    <td width="26%" height="44" align="right">帐号：</td>
                    <td width="74%"><input type="text" class="input_a" id="account" name="account"/></td>
                  </tr>
                  <tr>
                    <td height="41" align="right">密码：</td>
                    <td><input type="password" class="input_a" id="password" name="password"/></td>
                  </tr>
                  <tr>
                    <td align="right" height="80">&nbsp;</td>
                    <td height="80"><input type="submit" class="input_sub" value="下一步" /></td>
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
<script src="../Scripts/OpenProjectPlugin/jquery.validate.min.js" type="text/javascript"></script>
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
<script src="../Scripts/security/set-securityquestion.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        set_security_1_onload();
    });
</script>
</body>
</html>