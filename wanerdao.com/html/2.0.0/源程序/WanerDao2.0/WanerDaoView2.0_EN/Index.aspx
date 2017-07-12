<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="en_us_Index" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome to Savorboard, Life and social network, find activity, organize activity, start simply </title>

<meta name="keywords" content="Savorboard, Life and social network, Search activity, Organise activity, Group, Personal, Relationship, Forum, Information, Message" />
<meta name="description" content="Savorboard (www.savorboard,com) is the most warm life and social network. User can find kinds of amazon activites by their needs and savorboard can plan and organise everything smoothly like a professional chamberlain. Through these activites, you can get together with your old friends or know some new friends around. Talk each other, play each other, share every happy. Let's start simply from here." />
   
    <link rel="icon" type="image/x-icon" href="savorboard.ico" />
    <link rel="stylesheet" type="text/css" href="css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="css/index.css" media="all" />
    <link href="css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="css/en.css" rel="Stylesheet" type="text/css" media="all" />
<link rel="stylesheet" type="text/css" href="scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="scripts/openplugin/qapTcha/QapTcha.jquery.css" />


<script src="scripts/jquery-1.7.2.min.js"></script>
    <script src="scripts/plugin/cookie/wanerdao2.cookies.js" ></script>
    <script >
    if ($.cookie('wanerdao_uid')) {
        window.location.href = "/personal";
    }
    </script>

</head>
<body class="pBgB lan-en">
<div class="header_wrapper pBgH">
	<div class="header layout">
        <a href="javascript:;" class="logo"></a>
    </div>
</div>

<div class="container layout clearfix">
	<div class="side">
        <div class="sidetabs">
            <div class="login">
               <h3>Log in</h3>
                <div class="labeltext"><label for="username">Username：</label><input id="username" name="username"  type="text" class="username" tabindex="1"/></div>
                <div class="labeltext"><label for="password">Password：</label><input id="password" name="password"  type="password" class="password" tabindex="2"/></div>
                <div class="clearfix">
                  <div class="f_left"><input id="islogin" type="checkbox" class="checkbox"/><label for="islogin">Remember me</label></div>
                    <div class="f_right">
                      <a href="account/find_pass.html">Forgot account? </a><br/>
                        <a href="account/find_account.html">Forgot password? </a>
                    </div>
              <div class="clear2"></div>
                    <input  class="button button1" type="button" value="Log In"  id="btnLogin" tabindex="4" />
                </div>
            </div>
            <div class="regist">
                <h3>New to Savorboard? Join today!</h3>
                <a href="javascript:;" class="button">Sign Up</a>
            </div>
        </div>
        <div class="regist-side" style="display: none;">
            <div class="regist-from">
                <h3>Sign up Savorboard</h3>
                <div class="labeltext"><label for="username">Email：</label><input id="reg_email" name="reg_email"  type="text" class="email" type="text" tabindex="5"/></div>
                <div class="labeltext"><label for="password">Password：</label><input id="reg_password" name="reg_password"  type="password" tabindex="6" class="reg_pwd"/></div>
                <div class="labeltext"><label for="password">Confrim pass：</label><input id="reg_re_password" name="reg_re_password"  type="password" tabindex="7" class="reg_enpwd"/></div>
                <div class="labeltext"><label for="password">Name：</label><input id="reg_truename" name="reg_truename"  type="text" tabindex="8"/></div>
                <div class="sex">Gender:<select id="reg_sex" tabindex="9" style=" width: 120px;"><option value="">Choose Gender</option><option value="1" >Male</option><option value="0" >Female</option></select></div>
                <div class="birthday">Birthday:<select id="year" tabindex="10"></select>-<select id="month" tabindex="11"></select>-<select id="day" tabindex="12"></select></div>
                 <div class="QapTcha" title="Please unlock the sliding button to enable \"registered account\" button " style=" height:25px; border-width: 0;"></div>
                <input  class="button button1" type="button" value="Sign up" id="btnReg" tabindex="13"/>
            </div>

            <div class="regist-side">
                <div class="regist">
                    <h3>I already have the account</h3>
                    <a href="javascript:;" class="button">Log in</a>
                </div>
            </div>
        </div>



        
        <div class="lan">Languages：<select class="setLang" style=" width: 132px;">
                        <option value="en-us">English(US)</option>
                        <option value="zh-cn">中文简体(中国)</option>
                    </select></div>
    </div>
	<div class="main">
		<div class="title">
            <a href="javascript:;" class="button custom-login-btn">
                <span>View as a guest</span>
                Login
            </a>
            <span>It’s the most amazing activity arrangement living social network</span></div>
        <ul class="images clearfix">
        	<li><a href="javascript:;"><img alt="" src="images/index/p1.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p2.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p3.png"/></a></li>
            <li><a href="javascript:;"><img alt="" src="images/index/p4.png"/></a></li>
        </ul>
        <div class="main-search"><input  type="text" value="Search friends" inputdefault='Search friends' class="search_t" id="searchQ"/><a href="javascript:;" class="search-button" id="search"></a></div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright &copy; 2012 Savorboard Corporation, All right reserved.</span>
    <p class="footer_link"><a href="javascript:;">Feature</a><a href="javascript:;">Application</a><a href="javascript:;">Term</a><a href="javascript:;">Career</a><a href="javascript:;">Suggest</a><a href="javascript:;">Help</a></p>
</div>

<!--js-->
    <script src="scripts/multiplelanguage/loader.js"></script>
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
