<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="account_set_security_step2.aspx.cs" Inherits="account_account_set_security_step2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Set security-Account-Savorboard</title>

<meta name="keywords" content="Fill security information, Security protection, Account, Savorboard, Life and social network" />
<meta name="description" content="Set security protection 2st step, select security protection question and answer" />

<link rel="stylesheet" type="text/css" href="../css/account.css" media="all" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
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
						<li class="stepbar_end">
							<div class="item_img item1_end"></div>
							<p class="setp_title">Verify ID</p>
                        </li><li class="stepbar_star">
							<div class="item_img item2_star"></div>
							<p class="setp_title">Enter Protection Information</p>
						</li>		
					</ul>
				</div>
            <div class="wait"><img src="../images/loading.gif" /></div>
                <form class="accout_edit_form" style=" display:none;" onsubmit="return false;">
                <div class="form">
                    <ul>
                		<li><label class="label" for="sq1">Question 1:</label><select style="width:285px;" id="sq1"></select><span id="vsql1"></span></li>
                    	<li><label class="label" for="an1">Answer 1:</label><input type="text" class="text" id="an1" maxlength="60"/></li>
                        <li><label class="label" for="sq2">Question 2:</label><select  style="width:285px;" id="sq2"></select><span id="vsql2"></span></li>
                        <li><label class="label" for="an2">Answer 2:</label><input type="text" class="text" maxlength="60" id="an2"/></li>
                    </ul>
                    <div class="submit"><input type="submit" value="Save"  class="button button1" id="btnSave" /><input type="submit" value="Save and Back"  class="button button1" id="btnSaveAndBack"/><input type="submit" value="Cancel"  class="button button1" id="btnCancel"/></div>
                </div>
                </form>
            </div>
            <div class="box_ft"></div>
        </div>
    </div>
</div><!--loginMain-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
 <script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="../scripts/account/set-securityquestion.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            set_security_2_onload();
        });
    </script>
</asp:Content>

