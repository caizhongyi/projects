<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Message_Inbox.aspx.cs" Inherits="Message_Message_Inbox" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>收件箱-站内信息-玩儿道</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <meta name="keywords" content="收件箱，站内信息，玩儿道，生活社交网络" />
    <meta name="description" content="存放收件信息" />
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
                    <a href="compose.html">写信息</a>
                    <a href="inbox.html" class="active">收件箱</a>
                    <a href="send.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete.html">垃圾信息</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a class="active" href="javascript:;">消息</a> <a href="inbox_invite.html">邀请</a>
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
                                    <option value="0">全部信息</option>
                                    <option value="1">已读信息</option>
                                    <option value="2">未读信息</option>
                                    <option value="3">标记信息</option>
                                    <option value="4">未标记信息</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera mes_draft">
                                		<a href="javascript:void(0);" class="icon_1" title="删除"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="标记"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="刷新"></a>
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
                                    <option value="0">全部信息</option>
                                    <option value="1">已读信息</option>
                                    <option value="2">未读信息</option>
                                    <option value="3">标记信息</option>
                                    <option value="4">未标记信息</option>
                                </select>
                                <div class="sift_option"></div>
                                <div class="opera mes_draft">
                                		<a href="javascript:void(0);" class="icon_1" title="删除"></a>
                                		<a href="javascript:void(0);" class="icon_2" title="标记"></a>
                                		<a href="javascript:void(0);" class="icon_3" title="刷新"></a>
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
