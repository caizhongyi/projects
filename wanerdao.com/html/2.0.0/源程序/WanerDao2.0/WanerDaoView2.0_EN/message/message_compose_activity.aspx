<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="message_compose_activity.aspx.cs" Inherits="message_message_compose_activity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
<title>Compose activity invitation-Message-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Compose activity invitation, Message, Savorboard, Life and social network" />
<meta name="description" content="Compose activity invitation" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="mes_main layout">
        <div class="mes_box clearfix">
            
            <div class="mes_box_left">
                <div class="mes_nav_box">
                    <a href="compose.html"  class="active">Compose</a>
                    <a href="inbox_invite.html">Inbox</a>
                    <a href="send_invite.html" >Send</a>
                    <a href="draft.html">Draft</a>
                    <a href="delete_invite.html">Deleted</a>
                </div>
            </div>
          <div class="mes_box_right">
                  <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a href="compose.html">Message</a> 
                        <a href="compose_group.html">Group Invitation</a> 
                        <a href="javascritp:;" class="active">Activity Invitation</a>
                    </div>
                    <div id="cgfc">
                    </div>
                   
                    <div class="prPubW">
          <div class="pubTit">
            <div class="tarAct">Select target activity</div>
          </div>
        
        <div class="topNav clearfix">
          <div class="f_left">
            <input type="checkbox" class="chkAll"/>
          </div>
          <!-- 分页右边 -->
          <div class="pageList  f_right"></div>
          <!-- 分页右边 --> 
          
        </div>
        <div class="imporInfo">
        <div id="actlist">
          
          </div>
          <%--<div class="loading"><a href="javascript:;">加载更多</a></div>--%>
        </div>
        <div class="topNav clearfix bmNav">
          <div class="f_left">
            <input type="checkbox" class="chkAll"/>
          </div>
          <!-- 分页右边 -->
          <div class="pageList  f_right"></div>
          <!-- 分页右边 --> 
          
        </div>
        </div>
                    <div class="mes_submit">
                        <div class="submit">
                            <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" id="sendInvite"
                                value="Send">
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
    <script src="/scripts/message/common.js" type="text/javascript"></script>
    <script src="/scripts/message/compose_activity.js" type="text/javascript"></script>
</asp:Content>
