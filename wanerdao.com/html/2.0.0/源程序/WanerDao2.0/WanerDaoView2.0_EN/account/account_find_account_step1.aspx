<%@ Page Language="C#" AutoEventWireup="true" CodeFile="account_find_account_step1.aspx.cs" Inherits="en_us_account_account_find_account_step1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Find account-Account-Savorboard</title>

<meta name="keywords" content="Fill registeration email, Find account, Account, Savorboard, Life and social network" />
<meta name="description" content="Find account 1st step, fill security email" />

<link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />

</head>
<body class="pBgB">
<div class="header_wrapper pBgH">
	<div class="header layout">
            <a href="../" class="logo"></a>
    </div>
</div>

<div class="container layout">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li><a href="login.html">Log in</a></li><li><a href="register.html">Sign up</a></li><li class="current"><a href="javascript:;">Find Username </a></li><li><a href="find_pass.html">Find Password</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
               <div class="setbar setbar-3 clearfix">
					<div class="setbar-l"></div>
                    <div class="setbar-r"></div>
					<ul>
						<li class="stepbar_star">
							<div class="item_img item1_star"></div>
							<p class="setp_title">Enter email address</p>
						</li><li class="stepbar_will">
							<div class="item_img item2_will"></div>
							<p class="setp_title">Answer security question</p>
						</li><li class="stepbar_will">
							<div class="item_img item3_will"></div>
							<p class="setp_title">Re-log in</p>
						</li>			
					</ul>
				</div>
                <div class="form">
                    <ul>
                		<li>
                        	<label class="label" for="username">Re-enter email address:</label><input id="email" name="email" type="text" class="text"  maxlength="60"/>
                        	
                        </li>
                    </ul>
                   <div class="submit"><a href="javascript:;"  id="next1" class="button button1">Next</a></div>
                </div>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

<div class="footer layout">
	<span class="f_right">Copyright &copy; 2012 Savorboard Corporation, All right reserved.</span>
    <p class="footer_link"><a href="javascript:;">Feature</a><a href="javascript:;">Application</a><a href="javascript:;">Term</a><a href="javascript:;">Career</a><a href="javascript:;">Suggest</a><a href="javascript:;">Help</a></p>
</div>

<script src="/scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/scripts/plugin/cookie/wanerdao2.cookies.js" type="text/javascript"></script>
<script src="/scripts/multiplelanguage/loader.js" type="text/javascript"></script>
<script src="/scripts/global.js" type="text/javascript"></script>
<script src="/scripts/common/wandao.js" type="text/javascript"></script>
<script src="/scripts/account/find-account.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        find_acc_1_onload();
    });
</script>
</body>
</html>

