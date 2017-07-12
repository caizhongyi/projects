<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="message_inbox.aspx.cs" Inherits="message_message_inbox" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<title>Inbox-Message-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Inbox, Message, Savorboard, Life and social network" />
<meta name="description" content="Inbox" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="mes_main layout">
        <div class="mes_box clearfix">
            <div class="mes_box_left">
                <div class="mes_nav_box">
                    <a href="compose.html">Compose</a>
                    <a href="inbox.html" class="active">Inbox</a>
                    <a href="send.html">Send</a>
                    <a href="draft.html">Draft</a>
                    <a href="delete.html">Deleted</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a class="active" href="javascript:;">Message</a> <a href="inbox_invite.html">Invitation</a>
                    </div>
                    <div class="black10">
                    </div>
                    <div class="black10">
                    </div>
                    <div class="pubCon2">
                    <div class="topNav  clearfix">
                        	<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                               
                                <select class="displayType" style=" width: 100px;">
                                    <option value="0">All</option>
                                    <option value="1">Read</option>
                                    <option value="2">Unread</option>
                                    <option value="3">Marked</option>
                                    <option value="4">Unmarked</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera mes_draft">
                                		<a href="javascript:void(0);" class="icon_1" title="Delete"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="Mark"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="Refresh"></a>
                                    </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right">

                            </div>
                            <!-- 分页右边 -->
                            
            	        </div>
                     </div>
                    <div class="imporInfo">
                        <table class="message_table megTable" width="100%" border="0" cellspacing="1" id="content">
                        
                        </table>
                        <div class="black10">
                        </div>
                        <div class="black10">
                        </div>
                        <div class="black10">
                        </div>
                    </div>
                    <div class="topNav  clearfix">
                        	<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                              
                                <select class="displayType" style=" width: 100px;">
                                    <option value="0">All</option>
                                    <option value="1">Read</option>
                                    <option value="2">Unread</option>
                                    <option value="3">Marked</option>
                                    <option value="4">Unmarked</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera mes_draft">
                                		<a href="javascript:void(0);" class="icon_1" title="Delete"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="Mark"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="Refresh"></a>
                                    </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right">

                            </div>
                            <!-- 分页右边 -->
                            
            	        </div>
                </div>
            </div>
            <div class="black10">
            </div>
            <div class="black10">
            </div>
            <div class="black10">
            </div>
        </div>
    </div>
    <div class="mes_main_bot">
    </div>
    <!--mes_main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="/scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="/scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="/scripts/message/common.js" type="text/javascript"></script>
    <script src="/scripts/message/inbox.js" type="text/javascript"></script>
</asp:Content>
