<%@ Page Title="邀请发送箱-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Send_Invite.aspx.cs" Inherits="Message_Message_Send_Invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="发送邀请箱，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="存放发送信息" />
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
                    <a href="send_invite.html" class="active">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
                <div class="message_Box">
                    <div class="subChaTab">
                        <a href="compose_group.html">站内信息</a>
                        <a href="javascript:;" class="active">邀请</a>
                    </div>
                    <div class="blank10px"></div>
                     <div class="mesBar pager"> 

                    </div>
                    <div class="message_action">
                        <ul class="fList" id="fList">
                                                      
                        </ul>
                   </div>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                   <a href="javascript:;" class="downLoadMore"  id="showmore"><i>加载更多</i></a>  
                   <div class="blank10px"></div>
                 <div class="mesBar pager"> 

                    </div>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                </div>
        	</div>
        </div>

















<%--
		<div class="home_page WhBg clearfix">
<div class="message_left"> 
        <h1>
            <a href="compose.html">写信息</a>
            <a href="inbox_invite.html">收件箱</a>
            <a href="send_invite.html" class="active">发件箱</a>
            <a href="draft.html">草稿箱</a>
            <a href="delete_invite.html">垃圾信息</a>
        </h1>
    </div>
  	<div class="message_right message_con">
      <div class="title">
            <h2 class="sub_nav"><a href="send.html">消息</a><a href="javascript:;" class="active">邀请</a></h2>
        </div>
        <div class="message_action">
            <span>
                <input type="checkbox" class="chkall" />&nbsp;|&nbsp;
                显示<select id="displayType">
                        <option value="0">全部信息</option>
                        <option value="1">个人邀请</option>
                        <option value="2">活动邀请</option>
                        <option value="3">圈子邀请</option>
                    </select>&nbsp;|&nbsp;
                <a href="javascript:;" class="batchRefuse">删除</a>
                <a href="javascript:;" class="batchSend">重新发送</a>
                <a href="javascript:;">刷新</a>
            </span>
            <span id="pager1"></span>
        </div>
	 
<table class="message_table message_invite" id="content" width="740" border="0" cellspacing="0">
  
</table>

           <p class="downLoadMore"><a href="#">加载更多&nbsp;<img src="../../images/more_down.gif" /></a></p>  
          
          
          
          
          
          
          
        <div class="message_action">
            <span>
                <input type="checkbox" class="chkall"/>&nbsp;|&nbsp;
                显示<input type="text" />&nbsp;|&nbsp;
                <a href="#">删除</a>
                <a href="#">标记</a>
                <a href="#">刷新</a>
                <a href="#">重新发送</a>
            </span>
            <a href="#">首页</a> <a href="#">上页</a><input type="text" /><a href="#">下页</a><a href="#">未页</a>
        </div>
        
        
        
        
        </div>
    </div>--%>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/message/common.js" type="text/javascript"></script>
    <script src="../Scripts/message/send_invite.js" type="text/javascript"></script>
</asp:Content>

