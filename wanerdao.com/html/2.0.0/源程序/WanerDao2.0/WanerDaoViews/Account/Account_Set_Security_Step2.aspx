<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Set_Security_Step2.aspx.cs" Inherits="Account_Account_Set_Security_Step2" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>密码保护-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="填写密码保护资料，密码保护，账号管理，玩儿道，生活社交网络" />
<meta name="description" content="设置密码保护第二步，选择安全问题，并填写答案" />

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
                    <li class="visited"><i>1</i><span>身份确认</span></li>
                    <li class="active"><i>2</i><span>填写密码保护资料</span></li>
                </ul>
            <div class="wait"><img src="../images/loading.gif" /></div>
                <form class='accout_edit_form' style=" display:none;" onsubmit="return false;">
                <table width="100%" class="f14" border="0" cellspacing="1">
                  <tr>
                    <td width="26%" height="30" align="right">问题一：</td>
                    <td width="74%"><select id="sq1"></select></td>
                  </tr>
                  <tr>
                    <td width="26%" height="44" align="right">回答：</td>
                    <td width="74%"><input type="text" class="input_a" id="an1" maxlength="60" /></td>
                  </tr>
                  <tr>
                    <td width="26%" height="30" align="right">问题二：</td>
                    <td width="74%"><select id="sq2"></select></td>
                  </tr>
                  <tr>
                    <td width="26%" height="44" align="right">回答：</td>
                    <td width="74%"><input type="text" class="input_a" maxlength="60" id="an2" /></td>
                  </tr>
                  <tr>
                    <td height="81" colspan="3" class="tc"><input type="submit" class="input_sub" value="保存" id="btnSave" /> <input type="submit" class="input_sub" value="保存并返回" id="btnSaveAndBack" /> <input type="submit" class="input_sub" value="取消" id="btnCancel" /></td>
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
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
<script src="../Scripts/security/set-securityquestion.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        set_security_2_onload();
    });
</script>
</body>
</html>