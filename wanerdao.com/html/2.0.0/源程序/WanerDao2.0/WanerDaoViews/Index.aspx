<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>欢迎来到玩儿道,最好玩最贴心的生活社交网络，发现活动，组织活动，简单开始</title>
    <link rel="icon" type="image/x-icon" href="savorboard.ico" />
<meta name="keywords" content="玩儿道，生活社交网络，寻找活动，组织活动，圈子，个人，关系，杂烩，资道，" />
<meta name="description" content="玩儿道（www.wanerdao.com，www.savorboard.com）是最温暖的生活社交网络。" />
<!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
<link href="style/layout.css" rel="stylesheet" type="text/css" />
<link href="style/index.css" rel="stylesheet" type="text/css" />
<link href="../css/QapTcha.jquery.css" rel="stylesheet" type="text/css" />

</head>
<script type="text/javascript">
    var winScreenWidth = window.screen.width;
    if (winScreenWidth > 1024) {
        document.writeln('<style>');
        document.writeln('.jz{padding:0px 2px;}');
        document.writeln('</style>');
    }
</script>

<body>
	<!--头部-->
	<div class="head">
    	<div class="jz">
        	<div class="logo left"><a href="javascript:;" title="玩儿道"><img src="images/layout_main/logo.png" alt="玩儿道" /></a></div>
        </div>
    </div>
    <!--头部end-->
    <!--主体-->
    <div class="indexWrap">
        <div class="layout_t jz"></div>
        <div class="main jz">
            <div class="layout_m">
                <div class="index_l">
                    <p class="site_describe"><a href="#"><img src="images/index/index.gif" width="357" height="45" /></a>生活社区网络新概念</p>
                    <ul class="site_info">
                    <li><a href="#"><img src="images/index/index_A.gif" width="337" height="192" /></a></li>
                    <li><a href="#"><img src="images/index/index_B.gif" width="337" height="192" /></a></li>
                    <li><a href="#"><img src="images/index/index_C.gif" width="337" height="192" /></a></li>
                    <li><a href="#"><img src="images/index/index_D.gif" width="337" height="192" /></a></li>
                    </ul>
                
                    <p class="site_search">
                    <input class="text" type="text" id='search_t' onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#006e8a'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#fff'}" style="color:#fff;"  value='寻找留学好友'  tabindex="9" />
                    <input class="submit" type="button" value="&nbsp;" id="srh_friend" />
                    </p>
                </div>
                <div class="index_r">
                <!--登录 -->
                <div class="sider">
                <h1>登录玩儿道</h1>
                <form id="login">
                    <p class="login_i"><i class="left f14">帐号：</i><input type="text" id="account" maxlength="60" tabindex="1"/></p>
                    <p class="login_i"><i class="left f14">密码：</i><input type="password" id="password" maxlength="60"  tabindex="2"/></p>
                    <table width="98%" border="0" cellspacing="1" class="setLogin yh">
                      <tr>
                        <td width="65%"><input type="checkbox" style="margin:0 3px 0px 0; vertical-align:middle;" id="autoLogin"  tabindex="3" /><label for="autoLogin">下次自动登录</label></td>
                        <td width="33%" class="tr"><a href="account/find_pass.html" tabindex="5">忘记密码</a></td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td class="tr"><a href="account/find_account.html"  tabindex="6">忘记账号</a></td>
                      </tr>
                    </table>
                    <input class="submit" type="button" value="&nbsp;" id="btnLogin"  tabindex="4" />
                </form>
                <p class="no_registe">还没有玩儿道账号？</p>
                <a href="javascript:;" class="registe" tabindex="7"></a>
                <div class="lan">
                    语言：<select class="setLang">
                        <option value="zh-cn">中文</option><option value="en-us">英文</option>
                    </select>
                </div>
                </div>
               <!--登录 end-->
        
                <!--注册-->
                <div class="sider reg" style="display:none;">
                <h1>注册玩儿道</h1>
                <form id="regiser">
                    <p class="login_i"><i class="left">电子邮箱：</i><input type="text" id="reg_email"/></p>
                    <p class="login_i"><i class="left">设置密码：</i><input type="password" id="reg_password" /></p>
                    <p class="login_i"><i class="left">确认密码：</i><input type="password" id="reg_re_password" /></p>
                    <p class="login_i"><i class="left">真实姓名：</i><input type="text" id="reg_truename" /></p>
                    <table width="100%" border="0" cellspacing="1" class="putDownInfo yh">
                      <tr>
                        <td width="18%" class="f14 fb">性别:</td>
                        <td width="76%">
                        <input type="radio" name="sex" id="male" checked="checked" style="margin:0 3px 0px 0; vertical-align:middle;" value="1" /><label for="male">男</label>&nbsp;
                        <input type="radio" name="sex" id="female" style="margin:0 3px 0px 0; vertical-align:middle;" value="0" /><label for="female">女</label>
                        </td>
                      </tr>
                      <tr>
                        <td class="f14 fb">生日:</td>
                        <td>
                        	<div class="relate" style="margin-right:-13px;"><select id="year"></select>年 <select id="month"></select>月 <select id="day"></select>日</div>
                        </td>
                      </tr>
                      <tr>
                      <td colspan="2">
                      <div class="QapTcha" title="请解锁滑动按钮启用“注册账号”按钮" style=" height:25px; border-width: 0;"></div>

                      </td>
                      </tr>
                    </table>
                    
                      
                    <input class="reg" type="submit" value="&nbsp;" id="btnReg" />
                </form>
                <p class="no_Login"  style=" padding-bottom:10px;">已有玩儿道账号？</p>
                <a href="javascript:;" class="login"  style=" margin-bottom:11px;"></a>
                <div class="lan">
                    语言：<select class="setLang">
                        <option value="zh-cn">中文</option><option value="en-us">英文</option>
                    </select>
                </div>
                </div>
               <!--注册 end-->
                </div>
            </div>
        </div>
        <div class="layout_b jz"></div>
    </div>
    <!--主体end-->
	 <!--底部-->
    <div class="foot jz">
    	<span class="left"><a href="#">特色</a> <a href="#">开发应用</a> <a href="#">法律声明</a> <a href="#">招聘团队</a> <a href="#">建议</a> <a href="#">帮助</a></span>
        <span class="right">版权所有 &copy;玩儿道</span>
    </div>
    <!--底部end-->
<!--页面脚本区-->
  <script src="Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
    <script src="Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="Scripts/common/wandao.js" type="text/javascript"></script>
    <script src="Scripts/OpenProjectPlugin/jquery.cookies.min.js" type="text/javascript"></script>
    <script src="Scripts/security/index.js" type="text/javascript"></script>
    
            <script src="../Scripts/OpenProjectPlugin/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.ui.touch.js" type="text/javascript"></script>
    <script src="../Scripts/scrollbutton/QapTcha.jquery.js" type="text/javascript"></script>
	<script type="text/javascrip>t"
	    $('.QapTcha').QapTcha({});
	</script>
</body>
</html>