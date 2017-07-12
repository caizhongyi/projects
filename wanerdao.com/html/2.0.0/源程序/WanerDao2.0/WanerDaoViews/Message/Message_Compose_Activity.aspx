<%@ Page Title="编写活动邀请-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Compose_Activity.aspx.cs" Inherits="Message_Message_Compose_Activity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="编写活动邀请，站内信息，玩儿道，生活社交网络" />
<meta name="description" content="向其他人发送已经参加的某一个活动的邀请信息" />
<link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/wanerdao2.pagination.css" />
    <link href="../style/message.css" rel="stylesheet" type="text/css" />
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="home_page clearfix">
            <div class="message_left"> 
                <h1>
                    <a href="compose.html"  class="active">写信息</a>
                    <a href="inbox_invite.html">收件箱</a>
                    <a href="send_invite.html" >发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete_invite.html">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
            <div class="message_Box">
                <div class="subChaTab">
                    <a href="compose.html">站内信息</a>
                    <a href="compose_group.html">圈子邀请</a>
                    <a href="javascritp:;" class="active">活动邀请</a>
                  </div>
                   <div class="prPubW" id="cgfc">
				  </div>
                  <div class="prPubW">
                    <div class="pubTit"><div class="tarAct">选择目标活动</div></div>
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
        
        
        
        
        
        
        <%--
<div>
<input type="checkbox" id="chkallfriend" />发送給所有好友 <input type="checkbox"  id="chkallgroup"/>发送給所有圈子<span class="tip"></span><br />
选择好友：<div  class="revicerfriend" style=" width:400px; height:25px; line-height:25px; border:solid 1px #ddd; "><ul id="friendlist" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul><input type="text" style=" width:40px;" id="txtfriend" /></div><a href="javascript:;" id="choosefriend">:-D</a><input type="button" value="添加" id="addfriend" /><br />
已选好友：<div style=" width:400px; height:100px;border:solid 1px #ddd"><ul id="lastfriend" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul></div><input type="hidden" id="revicefriend" />
选择圈子：<div  class="revicergroup" style=" width:400px; height:25px; line-height:25px; border:solid 1px #ddd; "><ul id="grouplist" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul><input type="text" style=" width:40px;" id="txtgroup" /></div><a href="javascript:;" id="choosegroup">:-D</a><input type="button" value="添加" id="addgroup" /><br />
已选圈子：<div style=" width:400px; height:100px;border:solid 1px #ddd"><ul id="lastgroup" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul></div><input type="hidden" id="revicegroup" />
<div id="pager1"></div>
选择目标活动<span id="noactivity"></span>
<div id="content"></div>
<div id="pager2"></div></div>
<input type="button" value="发 送" id="sendInvite"/>
<input type="button" value="取 消" id="resetAll" />--%>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.groupinvite.js"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/message/common.js" type="text/javascript"></script>
    <script src="../Scripts/message/compose_activity.js" type="text/javascript"></script>

</asp:Content>