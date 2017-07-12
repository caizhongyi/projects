<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Account_Register.aspx.cs" Inherits="Account_Account_Register" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>注册-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
<meta name="keywords" content="欢迎来到玩儿道，新用户注册，玩儿道，生活社交网络" />
<meta name="description" content="新用户正确填写必要信息以后注册玩儿道" />

<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link href="../style/account.css" rel="stylesheet" type="text/css" />
<link href="../css/QapTcha.jquery.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
<style type="text/css">
    .QapTcha{ margin-left: 240px;}
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
                <a href="javascript:;" class="active">新用户注册</a>
                <a href="find_account.html">找回帐号</a>
                <a href="find_pass.html"">找回密码</a>
            </div>
            <div class="layout_t"></div>
            <div class="layout_m">
                    <br />
            
                    <form class='accout_edit_form'>
            <table width="100%" class="f14" height="340" border="0" cellspacing="1">
              <tr>
                <td width="18%" align="right">电子邮件：</td>
                <td width="82%"><div class="relate"><input type="text" id="email" name="email"  class="input_a" />
                    
                    </div></td>
              </tr>
              <tr>
                <td align="right">设置密码：</td>
                <td><div class="relate"><input type="password"  id="pwd" name="pwd" class="input_a" />
                    <%--<div id="" class="pwdTip" style="left:260px; top:-11px;">
                        <div class="pwdTop"></div>
                        <div class="pwdCon">
                            <p class="bar"><b class="weak">差</b></p><!--weak:差;common:中;strong:强-->
                        </div>
                        <div class="pwdBtm"></div>
                    	<ins></ins>
                    </div>--%>
                    </div>
                </td>
              </tr>
              <tr>
                <td align="right">再次确认密码：</td>
                <td><div class="relate"><input type="password"  id="repwd" name="repwd" class="input_a" />
                    
                    </div></td>
              </tr>
              <tr>
                <td align="right">真实姓名：</td>
                <td><div class="relate"><input type="text" class="input_a" id="truename" name="truename" />
                    
                    </div></td>
              </tr>
              <tr>
                <td align="right">性别：</td>
                <td> <div class="relate">&nbsp; <input type="radio" id="sex_m" name='sex' checked="checked" value="1" validate="required:true" class="" /><label for="sex_m">男</label>&nbsp;&nbsp;&nbsp;<input type="radio" id="sex_f"  name='sex' class="" /><label for="sex_f">女</label><label for="sex" class="error">                                                
                </div>
                </td>
              </tr>
              <tr>
                <td align="right">生日：</td>
                <td> <div class="relate"><select name="year" id="year"></select>年 &nbsp;<select name="month" id="month"></select>月 &nbsp;<select name="day" id="day"></select>日</div>
                </td>
              </tr>
              <tr>
                <td align="right"></td>
                <td>
                <div class="QapTcha" title="请解锁滑动按钮启用“注册账号”按钮"></div>
                <script src="../Scripts/OpenProjectPlugin/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.ui.touch.js" type="text/javascript"></script>
    <script src="../Scripts/scrollbutton/QapTcha.jquery.js" type="text/javascript"></script>
	<script type="text/javascript">
	    $('.QapTcha').QapTcha({});
	</script>
                </td>
              </tr>
              <tr>
                <td align="right" height="80">&nbsp;</td>
                <td height="80"><a href="javascript:void(0);" class="btn_137x32" id="btnRegister">注册账号</a></td>
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
<script src="../Scripts/OpenProjectPlugin/jquery.metadata.js" type="text/javascript"></script>
<script src="../Scripts/OpenProjectPlugin/jquery.validate.min.js" type="text/javascript"></script>
<script src="../Scripts/OpenProjectPlugin/digitalspaghetti.password.js" type="text/javascript"></script>
<script src="../Scripts/common/wandao.js" type="text/javascript"></script>
<script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
<script src="../Scripts/security/register.js" type="text/javascript"></script>
<%--<script type="text/javascript" src="../Scripts/security/select_upload.js"></script><!-- 表单select  Js -->--%>
<script type="text/javascript">
    var mail = document.getElementById("mail");
    var wrongMailTip = document.getElementById("wrongMailTip");
    function checkform() {
        if (mail.value != '') {
            if (!Isyx(mail.value)) {
                wrongMailTip.style.display = "block";
                mail.focus();
                return false;
            } else {
                alert("成功")
            }
        } else {
            wrongMailTip.style.display = "block";
            mail.focus();
            return false;
        }
    }
    function Isyx(yx) {
        var reyx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return (reyx.test(yx));
    }
</script>
</body>
</html>