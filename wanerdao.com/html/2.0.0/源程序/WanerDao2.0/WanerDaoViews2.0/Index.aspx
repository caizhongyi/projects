<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>欢迎来到玩儿道,最好玩最贴心的生活社交网络，发现活动，组织活动，简单开始</title>
    
    <meta name="keywords" content="玩儿道，生活社交网络，寻找活动，组织活动，圈子，个人，关系，杂烩，资道，站内信息"/>
    <meta name="description"
          content="玩儿道（www.wanerdao.com，www.savorboard.com）是最温暖的生活社交网络。用户在这里可以随心所欲的寻找适合自己的各种各样的活动，并且可以像拥有了一位职业管家一样，全智能化将你的活动安排井井有条。通过活动去重逢老朋友，认识周围的新朋友，玩在一起，了解彼此，分享快乐，让这一切从玩儿道简单开始吧。"/>
  
    <link rel="icon" type="image/x-icon" href="savorboard.ico" />

    <link rel="stylesheet" type="text/css" href="css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/index.css" media="all" />
    <link href="css/icon.css" rel="stylesheet" type="text/css" media="all" />
<link rel="stylesheet" type="text/css" href="scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="scripts/openplugin/qapTcha/QapTcha.jquery.css" />


<script src="scripts/jquery-1.7.2.min.js"></script>
    <script src="scripts/plugin/cookie/wanerdao2.cookies.js" ></script>
    <script src="scripts/multiplelanguage/loader.js"></script>
<script >
    if ($.cookie('wanerdao_uid')) {
        window.location.href = "/personal";
    }
    </script>

</head>
<body class="pBgB">
<div class="header_wrapper pBgH">
    <div class="header layout">
        <a href="javascript:;" class="logo"></a>
    </div>
</div>

<div class="container layout clearfix">
    <div class="side">
        <div class="sidetabs">
            <div class="login">
                <h3>登录玩儿道</h3>
            <div class="labeltext"><label for="username">账号：</label><input id="username" name="username"  type="text" tabindex="1"/></div>
            <div class="labeltext"><label for="password">密码：</label><input id="password" name="password"  type="password" tabindex="2"/></div>
            <div class="clearfix">
            	<div class="f_left"> <input id="islogin" type="checkbox" class="checkbox" tabindex="3"/> <label for="islogin">下次自动登录</label></div>
                <div class="f_right">
                	<a href="account/find_pass.html">忘记密码 </a><br/>
                    <a href="account/find_account.html">忘记账号 </a>
                </div>
              <div class="clear2"></div>
                <input  class="button button1" type="button" value="登  录" id="btnLogin" tabindex="4" />
            </div>
            </div>

            <div class="regist">
                <h3>还没有玩儿道账号？</h3>
                <a href="javascript:;" class="button">立即注册玩儿道账号</a>
            </div>
        </div>

        <div class="regist-side" style="display: none;">
            <div class="regist-from" >
        	    <h3>注册玩儿道</h3>
                <div class="labeltext"><label for="reg_email">电子邮件：</label><input id="reg_email" name="reg_email"  type="text" tabindex="5" /></div>
                <div class="labeltext"><label for="reg_password">设置密码：</label><input id="reg_password" name="reg_password"  type="password" tabindex="6"/></div>
                <div class="labeltext"><label for="reg_re_password">确认密码：</label><input id="reg_re_password" name="reg_re_password"  type="password" tabindex="7"/></div>
                <div class="labeltext"><label for="reg_truename">真实姓名：</label><input id="reg_truename" name="reg_truename"  type="text" tabindex="8"/></div>
                <div class="sex">性别:<select id="reg_sex" tabindex="9" style=" width: 80px;"><option value="">选择性别</option><option value="1" >男</option><option value="0" >女</option></select>
                </div>
                <div class="birthday">生日:<select id="year" tabindex="10"></select>-<select id="month" tabindex="11"></select>-<select id="day" tabindex="12"></select></div>
                 <div class="QapTcha" title="请解锁滑动按钮启用“注册账号”按钮" style=" height:25px; border-width: 0;"></div>
                <input  class="button button1" type="button" value="注册帐号" id="btnReg" tabindex="13" />
            </div>

            <div class="regist">
                <h3>已有玩儿道账号？</h3>
                <a href="javascript:;" class="button">立即登陆玩儿道账号</a>
            </div>
        </div>

        <div class="lan">语言：<select class="setLang" style=" width: 132px;">
                        <option value="zh-cn">中文简体(中国)</option><option value="en-us">English(US)</option>
                    </select></div>
    </div>



    <div class="main">
       <div class="title">
            <a href="javascript:;" class="button custom-login-btn">
                <span>体验不一样的社交</span>

            </a>活动组织的生活社交网络新概念
        </div>
        <ul class="images clearfix">
            <li><a href="javascript:;"><img alt="" src="images/index/p1.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p2.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p3.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p4.png"/></a></li>
        </ul>
        <div class="main-search"><input type="text" value="寻找好友" inputdefault="寻找好友" class="search_t" id="searchQ"/><a href="javascript:;"
                    class="search-button srh_friend" id="search"></a></div>
    </div>
</div>
<!--loginMain-->

<div class="footer layout">
    <span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved.</span>

    <p class="footer_link"><a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a
            href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
</div>

<!--js-->
<script src="scripts/global.js"></script>
    <script src="scripts/common/wanerdaoutils.js"></script>
    <script src="scripts/common/wandao.js" ></script>
<script src="scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="scripts/account/index.js" ></script>
    <script src="scripts/openplugin/jquery-ui.js" ></script>
    <script src="scripts/jquery.ui.touch.js"></script>
    <script src="scripts/openplugin/QapTcha.jquery.js" ></script>
	<script type="text/javascript">

	    $(function () {
	        $('.QapTcha').QapTcha({});
	        $('select').chosen();
	        $('.regist-side .regist .button').click(function () {
	            $('.sidetabs').show();
	            $('.regist-side').hide();
	        })
	        $('.sidetabs .regist .button').click(function () {
	            $('.regist-side').show();
	            $('.sidetabs').hide();
	        })
	    });
	</script>

</body>
</html>