<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="message_compose_group.aspx.cs" Inherits="message_message_compose_group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<title>Compose group invitation-Message-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Compose group invitation, Message, Savorboard, Life and social network" />
<meta name="description" content="Compose group invitation" />
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
                    <a href="javascript:;" class="active">Compose</a>
                    <a href="inbox_invite.html">Inbox</a>
                    <a href="send_invite.html">Send</a>
                    <a href="draft.html">Draft</a>
                    <a href="delete_invite.html">Deleted</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a href="compose.html">Message</a> 
                        <a href="javascript:;" class="active">Group Invitaion</a> 
                        <a href="compose_activity.html">Activity Invitation</a>
                    </div>
                    <div id="cgfc">
                    </div>
                    <div class="prPubW">
                        <div class="pubTit">
                            <div class="tarAct">
                                Select target groups</div>
                        </div>
                        <div class="pubCon2">
                             <div class="topNav clearfix">
                              <div class="f_left">
                                <input type="checkbox" class="chkAll"/>
                              </div>
                              <!-- 分页右边 -->
                              <div class="pageList  f_right"></div>
                              <!-- 分页右边 --> 
          
                            </div>
                            <div class="imporInfo">
                                <table width="100%" class="mcg" border="0" cellspacing="0" cellpadding="0" id="content">
                                </table>
                            </div>
                             <div class="topNav bmNav clearfix">
                              <div class="f_left">
                                <input type="checkbox" class="chkAll"/>
                              </div>
                              <!-- 分页右边 -->
                              <div class="pageList  f_right"></div>
                              <!-- 分页右边 --> 
          
                            </div>
                        </div>
                    </div>
                    <div class="mes_submit">
                        <div class="submit">
                            <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="Send"
                                id="sendInvite">
                            <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="Cancel"
                                id="resetAll">
                        </div>
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
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/plugin/invitation/wanerdao2.invitation.cookie.js" type="text/javascript"></script>
     <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script src="/scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script src="/scripts/message/common.js" type="text/javascript"></script>
    <script src="../scripts/message/compose_group.js" type="text/javascript"></script>
</asp:Content>
