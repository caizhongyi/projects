<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="account_set_security_step2.aspx.cs" Inherits="Account_account_set_security_step2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>密码保护-账号维护-玩儿道</title>
    <meta name="keywords" content="填写密码保护资料，密码保护，账号管理，玩儿道，生活社交网" />
    <meta name="description" content="设置密码保护第二步，选择安全问题，并填写答案" />
<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
<style type="text/css">
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
        	<li  class="current"><a href="javascript:;">安全密保</a></li><li><a href="edit_pass.html">修改密码</a></li>
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
							<p class="setp_title">填写密码保护资料</p>
						</li>		
					</ul>
				</div>
            <div class="wait"><img src="../images/loading.gif" /></div>
                <form class="accout_edit_form" style=" display:none;" onsubmit="return false;">
                <div class="form">
                    <ul>
                		<li><label class="label" for="sq1">安全问题一:</label><select style="width:285px;" id="sq1"></select><span id="vsql1"></span></li>
                    	<li><label class="label" for="an1">回答一:</label><input type="text" class="text" id="an1" maxlength="60"/></li>
                        <li><label class="label" for="sq2">安全问题二:</label><select  style="width:285px;" id="sq2"></select><span id="vsql2"></span></li>
                        <li><label class="label" for="an2">回答二:</label><input type="text" class="text" maxlength="60" id="an2"/></li>
                    </ul>
                    <div class="submit"><input type="submit" value="保存"  class="button button1" id="btnSave" /><input type="submit" value="保存并返回"  class="button button1" id="btnSaveAndBack"/><input type="submit" value="取消"  class="button button1" id="btnCancel"/></div>
                </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="../scripts/account/set-securityquestion.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            set_security_2_onload();
        });
    </script>
</asp:Content>
