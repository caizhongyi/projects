<%@ Page Title="编写圈子邀请-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Compose_Group.aspx.cs" Inherits="Message_Message_Compose_Group" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="编写圈子邀请，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="向其他人发送已经参加的某一个圈子的邀请信息" />
<link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/wanerdao2.pagination.css" />
    <link href="../style/message.css" rel="stylesheet" type="text/css" />
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="home_page clearfix">
            <div class="message_left"> 
                <h1>
                    <a href="javascript:;" class="active">写信息</a>
                    <a href="inbox_invite.html">收件箱</a>
                    <a href="send_invite.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
            <div class="message_Box">
                <div class="subChaTab">
                    <a href="compose.html">站内信息</a>
                    <a href="javascritp:;" class="active">圈子邀请</a>
                    <a href="compose_activity.html">活动邀请</a>
                  </div>
                  <div class="prPubW" id="cgfc">
				  </div>
                  <div class="prPubW">
                    <div class="pubTit"><div class="tarAct">选择目标圈子</div></div>
                    <div class="pubCon2">
                        <div class="topNav pager">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="28"><input type="checkbox" /></td>
                                    <td width="32">显示</td>
                                    <td width="405"><div class="prSelSty"><span>全部信息</span><b></b></div></td>
                                    <td width="32"><a href="#" class="first">首页</a></td>
                                    <td width="32"><a href="#" class="prev">上页</a></td>
                                    <td width="60"><div class="prSelSty"><span>1/25</span><b></b></div></td>
                                    <td width="32"><a href="#" class="next">下页</a></td>
                                    <td width="32"><a href="#" class="last">末页</a></td>
                                </tr>
                            </table>
                        </div>
                        <div class="imporInfo">
                            <table width="100%" id="content" class="mcg" border="0" cellspacing="0" cellpadding="0">
									
								</table>
                            <div class="loading" id="showmore"></div>
                        </div>
                        <div class="bmNav pager">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="28"><input type="checkbox" /></td>
                                    <td width="32">显示</td>
                                    <td width="405"><div class="prSelSty"><span>全部信息</span><b></b></div></td>
                                    <td width="32"><a href="#" class="first">首页</a></td>
                                    <td width="32"><a href="#" class="prev">上页</a></td>
                                    <td width="60"><div class="prSelSty"><span>1/25</span><b></b></div></td>
                                    <td width="32"><a href="#" class="next">下页</a></td>
                                    <td width="32"><a href="#" class="last">末页</a></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bmBtn">
                  <a href="javascript:void(0);" class="btn_127x36" id="sendInvite" id="sendInvite">发 送</a>
                  <a href="javascript:void(0);" class="btn_127x36_gray" id="resetAll">取 消</a>
                </div>
            </div>
        	</div>
        </div>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">  
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.groupinvite.js"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/message/common.js" type="text/javascript"></script>
    <script src="../Scripts/message/compose_group.js" type="text/javascript"></script>


    <script type="text/javascript">
        $(".imporInfo tr").hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        })
</script>
</asp:Content>