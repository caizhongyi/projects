<%@ Page Title="编写信息-站内信息-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Message_Compose.aspx.cs" Inherits="Message_Message_Compose" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="编写站内信息，邮件，玩儿道，生活社交网络" />
<meta name="description" content="编写站内信息，邮件" />

    <link href="../style/message.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 
    
    <script type="text/javascript">
    </script>
    <style type="text/css">
        /*自动完成控件 begin*/
             ul{ margin:0; padding:0; list-style:none;}
            .fmain{ border:solid 1px #33d; position:absolute; background-color:#fff; display:none; overflow:hidden; }
            
            li.over{background-color:#adf;}
        /*自动完成控件 end*/
        
            
            #friendlist{ list-style:none; float:left;}
            #friendlist li{ float:left; line-height:20px;}
            #inputtxt{ float:left;}
            .revicer{ height:25px; line-height:25px; overflow-x:hidden; position:relative; float:left; margin-left:2px;}
            .findfriend{ float:left;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div class="home_page clearfix">
            <div class="message_left"> 
                <h1>
                    <a href="javascript:;" class="active">写信息</a>
                    <a href="inbox.html">收件箱</a>
                    <a href="send.html">发件箱</a>
                    <a href="draft.html">草稿箱</a>
                    <a href="delete.html">垃圾信息</a>
                </h1>
            </div>
            <div class="message_right">
            <div class="message_Box" style="height:600px;">
                <div class="subChaTab">
                    <a class="active" href="javascript:;">站内信息</a>
                    <a href="compose_group.html">圈子邀请</a>
                    <a href="compose_activity.html">活动邀请</a>
                  </div>
                  <div class="blank10px"></div>
                  <div class="blank10px"></div>
                  <table width="740" border="0" cellspacing="1">
                  <tr>
                    <td width="11%" align="right" height="61" class="f14">发送给：</td>
                    <td width="89%"><div  class="revicer" style=" width:400px; height:25px; line-height:25px; border:solid 1px #ddd; "><ul id="friendlist" style=" margin:0; padding:0; border:solid 1px #fff; float:left;"></ul><input type="text" style=" width:40px;" id="inputtxt" /></div><input type="button" class="findfriend" id="findfriend" value="寻友" rel="#ff"/><input type="hidden" id="revicerfriend" /> 
                    </td>
                  </tr>
                  <tr>
                    <td height="211" align="right" valign="top" class="f14">内容：</td>
                    <td><div class="text_area"><textarea class="sendcontent"></textarea></div></td>
                  </tr>
                  <tr>
                    <td align="right" height="34">&nbsp;</td>
                    <td><div class="relate"><input type="checkbox" class="vInput  " id="cgxsave"  /><label for="cgxsave">保存一份到草稿箱</label>
                    	<div class="megtip" id="savetip" style="display:none;">
                        	<span></span>
                            <a href="javascript:void(0);" onclick="this.parentNode.style.display='none'" class="close"></a>
                        </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td height="70" align="right">&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="right">&nbsp;</td>
                    <td>
                    <input type="button" value="发送" class="sendmsg btn_127x36" style=" border-width:0;" /> 
                    <input type="button" value="保存" class="savemsg btn_127x36"  style=" border-width:0;" /> 
                    <input type="button" value="取消" class="cancel btn_127x36_gray"  style=" border-width:0;" />
                    </td>
                  </tr>
                </table>
                  <div class="blank10px"><span id="sResult"></span></div>
            </div>
            </div>
        </div>



















<%--



		<div class="home_page WhBg clearfix">
<div class="message_left"> 
        <h1>
            <a href="javascript:;" class="active">写信息</a>
            <a href="inbox.html">收件箱</a>
            <a href="send.html">发件箱</a>
            <a href="draft.html">草稿箱</a>
            <a href="delete.html">垃圾信息</a>
        </h1>
</div>
<div class="message_right message_con">
<div class="title">
            <h2 class="sub_nav"><a class="active" href="#">站内信息</a><a href="compose_group.html">圈子邀请</a><a href="compose_activity.html">活动邀请</a></h2>
        </div>
        <table width="740" height="358" border="0" cellspacing="1">
              <tr>
                <td width="14%" align="right">发送给：</td>
                <td width="86%"><div  class="revicer" style=" width:400px; height:25px; line-height:25px; border:solid 1px #ddd; "><ul id="friendlist" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul><input type="text" style=" width:40px;" id="inputtxt" /></div><input type="button" class="findfriend" value="寻友"/><input type="hidden" id="revicerfriend"/></td>
              </tr>
              <tr>
                <td height="211" align="right" valign="top">内容：</td>
                <td><div class="text_area"><textarea class="sendcontent"></textarea></div></td>
              </tr>
              <tr>
                <td align="right">&nbsp;</td>
                <td><input type="checkbox" class="issave" />  保存一份到草稿箱 <div id="savetip"></div></td>
              </tr>
              <tr>
                <td height="17" align="right">&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align="right">&nbsp;</td>
                <td>
                <a href="javascript:;" class="message_mail send_save sendmsg">发送</a>
                <a href="javascript:;" class="message_mail send_save savemsg">保存</a>
                <a href="javascript:;" class="message_mail cancel">取消</a>
                </td>
              </tr>
            </table>
    <%--发送給:<div  class="revicer" style=" width:400px; height:25px; line-height:25px; border:solid 1px #ddd; "><ul id="friendlist" style=" margin:0; padding:0; border:solid 1px #00f; float:left;"></ul><input type="text" style=" width:40px;" id="inputtxt" /></div><input type="button" class="findfriend" value="寻友"/>
<input type="hidden" id="revicerfriend" /><br />

内 容：<textarea style=" width: 400px; height:250px; border:solid 1px #ddd; " class="sendcontent"></textarea><br />
<input type="checkbox" class="issave" />发送时保存一份到草稿箱<div id="savetip"></div><br />
<input type="button" value="发送" class="sendmsg" /> <input type="button" value="保存" class="savemsg" /> <input type="button" value="取消" class="cancel" />

</div> <%--
<div class="cl"></div>
</div>--%>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">
    
         <script src="../Scripts/OpenProjectPlugin/jquery.overlay.js" type="text/javascript"></script>
    <script src="../Scripts/message/fgautocompelte.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Search/wanerdao2.compop.js" type="text/javascript"></script>
    <script src="../Scripts/message/compose.js" type="text/javascript"></script>

</asp:Content>

