<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_View.aspx.cs" Inherits="Message_Message_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>信息浏览-站内信息-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="信息浏览，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="浏览信息" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box clearfix">
            
            <div class="mes_box_left">
                <div class="mes_nav_box">
                    <a href="compose.html">写信息</a>
                    <a href="inbox.html">收件箱</a>
                    <a href="send.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete.html">垃圾信息</a>
                </div>
            </div>
		<div class="mes_box_right">
        	<div class="mes_com_box" style="margin-top:0px;">
                <div id="msglist">
           <div style="text-align:center; padding-top:60px;"><img src="../images/loading.gif" /></div>
           
           </div>
               
            </div>
        </div>
    </div>
</div>
<div class="mes_main_bot"></div>
<!--mes_main-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/openplugin/jquery.timers-1.1.2.js" type="text/javascript"></script>
    <script src="../scripts/plugin/personal/wanerdao2.personalInfo.js" type="text/javascript"></script>
    <script src="../scripts/message/view_msg.js" type="text/javascript"></script>
</asp:Content>

