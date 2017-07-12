<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="message_delete_invite.aspx.cs" Inherits="message_message_delete_invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<title>Delete invitation box-Message-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Delete invitation box, Message, Savorboard, Life and social network" />
<meta name="description" content="Delete invitation box" />
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
                    <a href="compose_group.html">Compose</a>
                    <a href="inbox_invite.html">Inbox</a>
                    <a href="send_invite.html">Send</a>
                    <a href="draft.html">Draft</a>
                    <a href="delete_invite.html" class="active">Deleted</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a href="delete.html">Message</a> <a href="javascript:;" class="active">Invitation</a>
                    </div>
                    <div class="black10">
                    </div>
                    <div class="black10">
                    </div>
                    <div class="pubCon2">
                       <div class="topNav clearfix">
                        	<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                              
                                <select class="displayType" style=" width: 100px;">
                                    <option value="0">All</option>
                                    <option value="1">Personal</option>
                                    <option value="2">Activity</option>
                                    <option value="3">Group</option>
                                </select>
                                <div class="sift_option opera_del_inv"></div>
                                <div class="opera">
                                		<a href="javascript:void(0);" class="icon_1" title="Delete"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="Revert"></a>
                                		<a href="javascript:void(0);" class="icon_4" title="Refresh"></a>
                                		<a href="javascript:void(0);" class="icon_5" title="Clear"></a>
                                    </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right"></div>
                            <!-- 分页右边 -->
                            
            	        </div>
                        <div class="message_action">
                            <ul class="fList" id="fList">
                            </ul>
                        </div>
                        <div class="black10">
                        </div>
                        <div class="black10">
                        </div>
                        <div class="black10">
                        </div>
                        <div class="topNav bmNav clearfix">
                        		<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                               
                                <select class="displayType" style=" width: 100px;">
                                    <option value="0">All</option>
                                    <option value="1">Personal</option>
                                    <option value="2">Activity</option>
                                    <option value="3">Group</option>
                                </select>
                                <div class="sift_option opera_del_inv"></div>
                                <div class="opera">
                                		<a href="javascript:void(0);" class="icon_1" title="Delete"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="Revert"></a>
                                		<a href="javascript:void(0);" class="icon_4" title="Refresh"></a>
                                		<a href="javascript:void(0);" class="icon_5" title="Clear"></a>
                                    </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right"></div>
                            <!-- 分页右边 -->
                            
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
    <script src="../Scripts/message/delete_invite.js" type="text/javascript"></script>
</asp:Content>
