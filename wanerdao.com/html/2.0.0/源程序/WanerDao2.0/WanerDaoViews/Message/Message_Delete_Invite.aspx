<%@ Page Title="邀请垃圾箱-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Delete_Invite.aspx.cs" Inherits="Message_Message_Delete_Invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="垃圾邀请信箱，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="存放删除邀请信息" />
    <link href="../style/message.css" rel="stylesheet" type="text/css" />
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    
<link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/wanerdao2.pagination.css" />
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="home_page clearfix">
            <div class="message_left"> 
                <h1>
                    <a href="compose.html">写信息</a>
                    <a href="inbox_invite.html">收件箱</a>
                    <a href="send_invite.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html" class="active">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
                <div class="message_Box">
                    <div class="subChaTab">
                        <a href="#">站内信息</a>
                        <a href="#" class="active">邀请</a>
                    </div>
                    <div class="blank10px"></div>
                    <div class="blank10px"></div>
                    <div class="pageBar pager"> 

                    </div>
                    <div class="message_action">
                        <ul class="fList" id="fList">
                        </ul>
                   </div>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                   <a href="javascript:;" class="downLoadMore" id="showmore"><i>加载更多</i></a>  
                   <div class="blank10px"></div>
                   <div class="pageBar pager"> 
      
                    </div>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                </div>
        	</div>
        </div>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">

    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/message/common.js" type="text/javascript"></script>
    <script src="../Scripts/message/delete_invite.js" type="text/javascript"></script>
</asp:Content>