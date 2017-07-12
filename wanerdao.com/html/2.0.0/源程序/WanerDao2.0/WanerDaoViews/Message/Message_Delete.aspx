<%@ Page Title="垃圾箱-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Delete.aspx.cs" Inherits="Message_Message_Delete" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="垃圾信箱，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="存放删除信息" />
    <link href="../style/message.css" rel="stylesheet" type="text/css" />
    <link href="../style/right_con.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/wanerdao2.pagination.css" />
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="home_page clearfix">
            <div class="message_left"> 
                <h1>
                    <a href="compose.html">写信息</a>
                    <a href="inbox.html">收件箱</a>
                    <a href="send.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete.html" class="active">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
                <div class="message_Box" style="height:680px;">
                    <div class="subChaTab">
                        <a class="active" href="#">消息</a>
                        <a href="delete_invite.html">邀请</a>
                    </div>
                    <div class="blank10px"></div>
                    <div class="blank10px"></div>
                    <div class="mesBar pager">
                         <i class="cbtn"><input type="checkbox" /></i>
                        <i class="showType">显示 <select class="displayType">
                            <option value="0">全部信息</option>
                            <option value="1">标记信息</option>
                            <option value="2">未标记信息</option>
                            <option value="3">来自发件箱</option>
                            <option value="4">来自已读收件箱</option>
                            <option value="5">来自未读收件箱</option>
                            <option value="6">来自草稿箱</option>
                        </select></i>
                        <i class="opera">
                            <a href="javascript:void(0);" class="icon_1 batchdel"></a>
                            <a href="javascript:void(0);" class="icon_2 batchrevert "></a>
                            <a href="javascript:void(0);" class="icon_3 batchmark"></a>
                            <a href="javascript:void(0);" class="icon_4 reflesh"></a>
                            <a href="javascript:void(0);" class="icon_5 clearrubbish"></a>
                        </i>
                        <i class="page">
                            <span class="">首页 上页 <select><option>1/25</option><option>2/25</option></select> <a href="#">下页</a> <a href="#">末页</a></span>
                        </i>
                    </div>
                    <table class="message_table megTable" id="content" width="100%" border="0" cellspacing="1">

                   </table>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                   <a href="javascript:;" class="downLoadMore" id="showmore"><i>加载更多</i></a>  
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                   <div class="mesBar pager">
                        <i class="cbtn"><input type="checkbox" /></i>
                        <i class="showType">显示 <select class="displayType">
                            <option value="0">全部信息</option>
                            <option value="1">标记信息</option>
                            <option value="2">未标记信息</option>
                            <option value="3">来自发件箱</option>
                            <option value="4">来自已读收件箱</option>
                            <option value="5">来自未读收件箱</option>
                            <option value="6">来自草稿箱</option>
                        </select></i>
                        <i class="opera">
                            <a href="javascript:void(0);" class="icon_1 batchdel" title="delete"></a>
                            <a href="javascript:void(0);" class="icon_2 batchrevert " title="revert"></a>
                            <a href="javascript:void(0);" class="icon_3 batchmark" title="mark"></a>
                            <a href="javascript:void(0);" class="icon_4 reflesh" title="reflesh"></a>
                            <a href="javascript:void(0);" class="icon_5 clearrubbish" title="clear up"></a>
                        </i>
                        <i class="page">
                            <span class="">首页 上页 <select><option>1/25</option><option>2/25</option></select> <a href="#">下页</a> <a href="#">末页</a></span>
                        </i>
                    </div>
                   <div class="blank10px"></div>
                   <div class="blank10px"></div>
                </div>
        	</div>
        </div>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">

    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/message/common.js" type="text/javascript"></script>
    <script src="../Scripts/message/delete.js" type="text/javascript"></script>
</asp:Content>