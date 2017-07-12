<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Message_Compose_Group.aspx.cs" Inherits="Message_Message_Compose_Group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>编写圈子邀请-站内信息-玩儿道</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <meta name="keywords" content="编写圈子邀请，站内信息，玩儿道，生活社交网络" />
    <meta name="description" content="向其他人发送已经参加的某一个圈子的邀请信息" />
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
                    <a href="javascript:;" class="active">写信息</a>
                    <a href="inbox_invite.html">收件箱</a>
                    <a href="send_invite.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html">垃圾信息</a>
                </div>
            </div>
            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a href="compose.html">站内信息</a> 
                        <a href="javascript:;" class="active">圈子邀请</a> 
                        <a href="compose_activity.html">活动邀请</a>
                    </div>
                    <div id="cgfc">
                    </div>
                    <div class="prPubW">
                        <div class="pubTit">
                            <div class="tarAct">
                                选择目标圈子</div>
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
                            <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="发  送"
                                id="sendInvite">
                            <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="取 消"
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
