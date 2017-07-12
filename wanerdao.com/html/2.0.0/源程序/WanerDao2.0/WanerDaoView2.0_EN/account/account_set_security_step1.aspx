<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="account_set_security_step1.aspx.cs" Inherits="account_account_set_security_step1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Set security-Account-Savorboard</title>

<meta name="keywords" content="Verify, Security protection, Account, Savorboard, Life and social network" />
<meta name="description" content="Set security protection 1st step, verify through account and password" />

<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
<style type="text/css">
     .error {
        background:url(_blank);
        height:25px;
      }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="container layout">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li  class="current"><a href="javascript:;">Protect password</a></li><li><a href="edit_pass.html">Edit password</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
                <div class="setbar setbar-2 clearfix">
					<div class="setbar-l"></div>
                    <div class="setbar-r"></div>
					<ul>
						<li class="stepbar_star">
							<div class="item_img item1_star"></div>
							<p class="setp_title">Verify ID</p>
						</li><li class="stepbar_will">
							<div class="item_img item2_will"></div>
							<p class="setp_title">Enter Protection Information</p>
						</li>		
					</ul>
				</div>
                <div class="form">
                    <ul>
                		<li><label class="label" for="username">Username:</label><input id="account" name="account" type="text" class="text" maxlength="60"/></li>
                    	<li><label class="label" for="password">Password:</label><input id="password" name="password" type="password" class="text" maxlength="60"/></li>
                    </ul>
                    <div class="submit"><input type="submit" value="Next"  class="button button1" id="nextstep"/></div>
                </div>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<!--页面脚本区-->
    <script src="../scripts/openplugin/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../scripts/account/set-securityquestion.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        set_security_1_onload();
    });
</script>
</asp:Content>

