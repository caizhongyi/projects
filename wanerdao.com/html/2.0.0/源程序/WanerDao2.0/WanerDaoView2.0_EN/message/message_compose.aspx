<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="message_compose.aspx.cs" Inherits="message_message_compose" %>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="head">
<title>Compose-Message-Savorboard</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="Compose, Message, Savorboard, Life and social network" />
<meta name="description" content="Compose message or email" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/pop.css" rel="stylesheet" type="text/css" />
    <link href="../css/popTmp.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/plugin/autocomplete/fgautocompelte.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        /*自动完成控件 begin*/
        .revicer{ padding: 3px 0px 0px 3px; width: 570px;
            margin-left: 4px;
            line-height: 25px;
            overflow-x: hidden;
            position: relative;
            float: left;}
      
        .revicer ul
        {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .revicer li.over
        {
            background-color: #adf;
        }
        /*自动完成控件 end*/
        
        
        #friendlist
        {
            list-style: none;
            float: left;
        }
        #friendlist li
        {
            float: left;
            line-height: 20px;
        }
        #inputtxt
        {
            float: left;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="mes_main layout">
        <div class="mes_box clearfix">
            
            <div class="mes_box_left">
                <div class="mes_nav_box">
                    <a href="javascript:;" class="active">Compose</a>
                    <a href="inbox.html">Inbox</a>
                    <a href="send.html">Send</a>
                    <a href="draft.html">Draft</a>
                    <a href="delete.html">Deleted</a>
                </div>
            </div>

            <div class="mes_box_right">
                <div class="mes_com_box">
                    <div class="mes_com_box_Tab">
                        <a href="javascritp:;" class="active">Message</a> 
                        <a href="compose_group.html">Group Invitation</a> 
                        <a href="compose_activity.html">Activity Invitation</a>
                    </div>
                    <div class="mes_com_box_form">
                        <ul>
                            <li>
                                <label class="label" style="float: left;">
                                    To：
                                </label>
                                <div class="revicer text">
                                    <ul id="friendlist" style="margin: 0; padding: 0; border: solid 1px #fff; float: left;">
                                    </ul>
                                    <input type="text" class=" " id="inputtxt" style=" border-width: 0px; padding:0; width: 540px; float:left;" maxlength="50"></div>
                                <input type="hidden" id="revicerfriend" />
                                <a href="javascript:;" class="mes_com_send_ico findfriend" id="findfriend" rel="#ff" style="left: 610px"></a>
                                <div class="black10">
                                </div>
                                <div class="black10">
                                </div>
                            </li>
                            <!--为了完全显示自动匹配显示框，这里需要美工将li的间距拉大-->
                            <li style="margin-top: 10px">
                                <label class="label mes_com_send_txtcon">
                                    Content：
                                </label>
                                <textarea class="text mes_com_send_con sendcontent"></textarea>
                            </li>
                            <li>
                                <div class="save_draft">
                                    <input type="checkbox" class="save_draft_check" id="cgxsave" />
                                    <label class="label">
                                         Save to draft box</label>
                                    <div class="save_draft_alert" id="savetip" style=" display: none;" >
                                        <span></span>
                                        <a href="javascript:void(0);" onclick="this.parentNode.style.display='none'" class="close">
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <div class="submit">
                                <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 sendmsg"
                                    value="Send">
                                <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 savemsg"
                                    value="Save">
                                <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14 cancel" value="Cancel">
                            </div>
                        </ul>
                        <div class="blank10px">
                            <span id="sResult">&nbsp;</span>
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
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script src="../scripts/plugin/autocomplete/fgautocompelte.js" type="text/javascript"></script>
    <script src="/scripts/message/compose.js" type="text/javascript"></script>
</asp:Content>
