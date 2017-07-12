<%@ Page Title="信息浏览-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_View.aspx.cs" Inherits="Message_Message_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="信息浏览，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="浏览信息" />
<link href="../style/message.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="home_page clearfix">
    <div class="message_left"> 
        <h1>
            <a href="compose.html">写信息</a>
            <a href="inbox.html">收件箱</a>
            <a href="send.html">发件箱</a>
            <a href="draft.html">草稿箱</a>
            <a href="delete.html">垃圾信息</a>
        </h1>
    </div>
    <div class="message_right">
    <div class="message_Box" >
        <div class="subChaTab">
            <a href="#" class="active">消息</a>
            <a href="#">邀请</a>
            </div>
           <div id="msglist">
           <div style="text-align:center; padding-top:60px;"><img src="../images/loading.gif" /></div>
           
           </div>
            <div class="blank10px"></div>
            <div class="blank10px"></div>
            <div class="blank10px"></div>
    </div>
    </div>
</div>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">

    <script src="../Scripts/message/view_msg.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(".mInfoList li").hover(function () {
            $(this).addClass("mHover")
        }, function () {
            $(this).removeClass("mHover")
        })
</script>
</asp:Content>