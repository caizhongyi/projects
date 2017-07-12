<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Message_Inbox_Invite.aspx.cs" Inherits="Message_Message_Inbox_Invite" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>邀请收件箱-站内信息-玩儿道</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <meta name="keywords" content="接收邀请箱，站内信息，玩儿道，生活社交网络" />
    <meta name="description" content="存放接收邀请" />
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
                    <a href="compose_group.html.html">写信息</a>
                    <a href="inbox_invite.html" class="active">收件箱</a>
                    <a href="send_invite.html" >发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html">垃圾信息</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box"><span class="showTip"></span>
                    <div class="mes_com_box_Tab">
                        <a href="inbox.html">站内信息</a> <a href="javascript:;" class="active">邀请</a>
                    </div>
                    <div class="black10">
                    </div>
                    <div class="black10">
                    </div>
                    <div class="pubCon2">
                    <div class="topNav clearfix ">
                        	<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                               
                                 <select class="displayType" style=" width: 100px;">
                                    <option value="0">全部邀请</option>
                                    <option value="1">个人邀请</option>
                                    <option value="2">活动邀请</option>
                                    <option value="3">圈子邀请</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera opera_inbox_inv">
                                		<a href="javascript:void(0);" class="icon_1" style="width:2px;"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="删除"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="刷新"></a>
                                    </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right"></div>
                            <!-- 分页右边 -->
                            
            	        </div>
                        <div class="message_action">
                            <ul class="fList fList_inbox" id="fList">
                            </ul>
                        </div>
                        <div class="black10">
                        </div>
                        <div class="black10">
                        </div>
                        <div class="imporInfo">
                        </div>
                        <div class="black10">
                        </div>
                        <div class="topNav clearfix ">
                        	<div class="f_left">
                            	<input type="checkbox" class="chkAll" />
                                <div class="sift_option"></div>
                               
                               <select class="displayType" style=" width: 100px;">
                                    <option value="0">全部邀请</option>
                                    <option value="1">个人邀请</option>
                                    <option value="2">活动邀请</option>
                                    <option value="3">圈子邀请</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera opera_inbox_inv">
                                		<a href="javascript:void(0);" class="icon_1" style="width:2px;"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="删除"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="刷新"></a>
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
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script src="../scripts/plugin/friend/wanerdao2.friendgroupchosen.js" type="text/javascript"></script>
    <script src="/scripts/message/common.js" type="text/javascript"></script>
    <script src="/scripts/message/inbox_invite.js" type="text/javascript"></script>
</asp:Content>
