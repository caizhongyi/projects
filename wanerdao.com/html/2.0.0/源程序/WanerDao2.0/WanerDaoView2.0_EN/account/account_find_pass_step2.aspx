<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_find_pass_step2.aspx.cs" Inherits="account_account_find_pass_step2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Find password-Account-Savorboard</title>

<meta name="keywords" content="Verify, Find password, Account, Savorboard, Life and social network" />
<meta name="description" content="Find password 2st step, get temporary password from security email and go next step" />

<link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />

</head>
<body class="pBgB">
<div class="header_wrapper pBgH">
	<div class="header layout">
            <a href="/" class="logo"></a>
     
    </div>
</div>

<div class="container layout">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li><a href="login.html">Log in</a></li><li><a href="register.html">Sign up</a></li><li><a href="find_account.html">Find Username </a></li><li class="current"><a href="find_pass.html">Find Password</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
            	<div class="setbar setbar-3 clearfix">
					<div class="setbar-l"></div>
                    <div class="setbar-r"></div>
					<ul>
						<li class="stepbar_end">
							<div class="item_img item1_end"></div>
							<p class="setp_title">Fill in the account</p>
						</li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">Identity authentication</p>
						</li><li class="stepbar_will">
							<div class="item_img item3_will"></div>
							<p class="setp_title">Reset the password</p>
						</li>			
					</ul>
				</div>
                <div id="wait">
                        <img src="../images/loading.gif" /></div>
                        <form id='accout_edit_form' style="display: none;"  onsubmit="return false;">
                <div class="form">
                    <p class="result">Verification code has been sent to ”<span id="displayemail"></span>”, please enter your password. <a href="javascript:;" id="tomail">Check email here.</a></p>
                    <ul>
                		<li><label class="label" for="input_a">Verification code:</label><input id="input_a" name="input_a" type="text" class="text"  maxlength="60"/></li>
                    </ul>
                   <div class="submit"><a  href="javascript:;" class="button button1" id="btnSendAgain">Send verification code again</a><a  href="javascript:;" class="button button1" id="nextstep">Next</a></div>
                </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright &copy; 2012 Savorboard Corporation, All right reserved.</span>
    <p class="footer_link"><a href="javascript:;">Feature</a><a href="javascript:;">Application</a><a href="javascript:;">Term</a><a href="javascript:;">Career</a><a href="javascript:;">Suggest</a><a href="javascript:;">Help</a></p>
</div>
<script src="../scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="../scripts/plugin/cookie/wanerdao2.cookies.js" type="text/javascript"></script>
<script src="../scripts/multiplelanguage/loader.js" type="text/javascript"></script>
<script src="../scripts/global.js" type="text/javascript"></script>
<script src="../scripts/common/wanerdaoutils.js" type="text/javascript"></script>
<script src="../scripts/common/wandao.js" type="text/javascript"></script>
<script src="../scripts/account/find-pwd.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_pass_2_onload();
    });
</script>
</body>
</html>

