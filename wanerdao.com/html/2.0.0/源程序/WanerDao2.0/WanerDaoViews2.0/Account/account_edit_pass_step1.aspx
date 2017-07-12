<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="account_edit_pass_step1.aspx.cs" Inherits="Account_account_edit_pass_step1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>修改密码-账号维护-玩儿道</title>
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
    <meta name="keywords" content="身份确认，修改密码，账号维护，玩儿道，生活社交网络" />
    <meta name="description" content="修改密码第一步，通过账号和密码进行身份验证" /> 
    
    <link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
   
<div class="container">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li><a href="account_set_security.html">安全密保</a></li><li class="current"><a href="javascript:;">修改密码</a></li>
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
							<p class="setp_title">身份确认</p>
						</li><li class="stepbar_will">
							<div class="item_img item2_will"></div>
							<p class="setp_title">填写新密码</p>
						</li>		
					</ul>
				</div>
                <form id="accout_edit_form" onsubmit="return false;">
                <div class="form">
                    <ul>
                		<li><label class="label" for="account">账号:</label><input id="account" name="account"  type="text" class="text" maxlength="60"/></li>
                    	<li><label class="label" for="password">密码:</label><input id="password" name="password"  type="password" class="text" maxlength="60"/></li>
                    </ul>
                    <div class="submit"><input type="submit" value="下一步" id="nextstep" class="button button1"/></div>
                </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/openplugin/jquery.validate.min.js" type="text/javascript"></script>
    <script src="../scripts/account/edit-pass.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            edit_pass_1_onload();
        });
    </script>
</asp:Content>
