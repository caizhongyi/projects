<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="account_edit_pass_step2.aspx.cs" Inherits="account_account_edit_pass_step2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Edit password-Account-Savorboard</title>

<meta name="keywords" content="Fill new password, Edit password, Account, Savorboard, Life and social network" />
<meta name="description" content="Edit password 2st step, fill new password and edit" />
 <link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
<style type="text/css">
    #password-strength{width:220px;line-height:8px; margin-left:170px; margin-top:5px; height:8px;}
    span.password-min-char{ line-height:8px; height:8px;width:90px; font-size:8px;}
    span.password-strength-bar{ height:8px; line-height:8px; }
    span.password-strength-bar-conatiner{ width:150px; height:8px; border:solid 1px #eee; display:block; float:left;}
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
        	<li><a href="account_set_security.html">Protect password</a></li><li class="current"><a href="edit_pass.html">Edit Password</a></li>
        </ul>
        <div class="bigbox">
            <div class="box_hd"></div>
            <div class="box_bd">
                <div class="setbar setbar-2 clearfix">
					<div class="setbar-l"></div>
                    <div class="setbar-r"></div>
					<ul>
						<li class="stepbar_end">
							<div class="item_img item1_end"></div>
							<p class="setp_title">Verify ID</p>
						</li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">Edit password</p>
						</li>		
					</ul>
				</div>
                <form id="accout_edit_form"  onsubmit="return false;">
                    <div class="form">
                        <ul>
                		    <li><label class="label" for="username">New password:</label><input id="pwd" name="pwd" type="password" class="text" maxlength="60"/></li>
                    	    <li><label class="label" for="password">Re-enter Password:</label><input id="repwd" name="repwd" type="password" class="text" maxlength="60"/></li>
                        </ul>
                        <div class="submit"><input type="submit" value="Edit"  class="button button1" id="btnUpdate" /><input type="submit" value="Edit and Log in"  class="button button1" id="btnUpdateToHome"/></div>
                    </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script src="../scripts/openplugin/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/digitalspaghetti.password.js" type="text/javascript"></script>
    <script src="../scripts/account/edit-pass.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            edit_pass_2_onload();
        });
    </script>
</asp:Content>

