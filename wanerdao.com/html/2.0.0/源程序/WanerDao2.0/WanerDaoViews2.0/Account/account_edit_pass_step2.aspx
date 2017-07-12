<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="account_edit_pass_step2.aspx.cs" Inherits="Account_account_edit_pass_step2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<title>修改密码-账号维护-玩儿道</title>

<meta name="keywords" content="填写新密码，修改密码，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="修改密码第二步，输入新密码修改原密码" />
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
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
<div class="container layout">
    <div class="tabs">
    	<ul class="tabs-nav">
        	<li><a href="account_set_security.html">安全密保</a></li><li class="current"><a href="edit_pass.html">修改密码</a></li>
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
							<p class="setp_title">身份确认</p>
						</li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">填写新密码</p>
						</li>		
					</ul>
				</div>
                <form id="accout_edit_form"  onsubmit="return false;">
                    <div class="form">
                        <ul>
                		    <li><label class="label" for="username">新密码:</label><input id="pwd" name="pwd" type="password" class="text" maxlength="60"/></li>
                    	    <li><label class="label" for="password">确认新密码:</label><input id="repwd" name="repwd" type="password" class="text" maxlength="60"/></li>
                        </ul>
                        <div class="submit"><input type="submit" value="修改"  class="button button1" id="btnUpdate" /><input type="submit" value="修改并返回首页"  class="button button1" id="btnUpdateToHome"/></div>
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
    <script src="../scripts/openplugin/digitalspaghetti.password.js" type="text/javascript"></script>
    <script src="../scripts/account/edit-pass.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            edit_pass_2_onload();
        });
    </script>
</asp:Content>
