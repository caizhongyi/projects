<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_settings.aspx.cs" Inherits="relationship_relationship_mygroup_settings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/mygroupSettings.js" type="text/javascript"></script>
<script src="../Scripts/common/objectToJson.js" type="text/javascript"></script>

<script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
<script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../Scripts/Plugin/SearhGroupMember/wanerdao2.groupmember.js"></script>
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
               <div class="subChaTab"  id="TopMenu">
               
              </div>
               <div class="Fnavigation" id="myGroupMenu" style="margin-top:0px;">
                
                </div>
                <div class="clearfix">
                  <table width="93%" class="f12" border="0" cellspacing="0" cellpadding="0" align="center" >
                    <tr>
                      <td width="100%" height="30">&nbsp;</td>
                    </tr>
                    <tr>
                      <td width="100%" height="40">设定接收邮箱：&nbsp;
                      
                        <input name="g" type="text" value="" id="txt_mail" class="Stext he24" style=" width:278px"></td>
                    </tr>
                    <tr>
                      <td width="100%" height="40"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td width="20%" height="40"><input name="g" type="checkbox" value="" class="vInput" id="chk_event" checked="checked"/><label for="chk_event">重要圈子通知</label></td>
                            <td width="15%"><input name="g" type="checkbox" value="" class="vInput" checked="checked" id="chk_mailevent" /><label for="chk_mailevent">邮件</label></td>
                            <td width="20%"><input name="g" type="checkbox" value="" class="vInput" id="chk_msgevent" /><label for="chk_msgevent">站内信息</label></td>
                            <td width="50%">&nbsp;</td>
                          </tr>
                          <tr>
                            <td width="20%"  height="40"><input name="g" type="checkbox" value="公开圈子" class="vInput" id="chk_updates" /><label for="chk_updates">订阅圈子动态更新</label></td>
                            <td width="15%"><input name="g" type="checkbox" value="" class="vInput" id="chk_mailupdates" /><label for="chk_mailupdates">邮件</label></td>
                            <td width="20%"><input name="g" type="checkbox" value="" class="vInput" id="chk_msgupdates" /><label for="chk_msgupdates">站内信息</label></td>
                            <td width="50%">&nbsp;</td>
                          </tr>
                        </table></td>
                    </tr>
                    <tr>
                      <td width="100%" height="50"><input name="g" type="checkbox" value="" class="vInput" id="chk_digest" /><label for="chk_digest">订阅信息摘要</label>
                        <select name="select" class="Stext he24" style=" width:144px" id="slt_digest">
                          <option value="24">按天</option>
                          <option value="168">按周</option>
                          <option value="720" selected="selected">按月</option>
                          <option value="2160">按季度</option>
                          <option value="8640">按年</option>
                        </select>
                        <input name="g" type="text" value="" id="txt_digest" class="Stext he24" style=" width:163px" />
                        &nbsp;&nbsp;
                        <input name="g" type="checkbox" value="" class="vInput" id="chk_maildigest" /><label for="chk_maildigest">邮件</label>&nbsp;&nbsp;&nbsp;
                        <input name="g" type="checkbox" value="" class="vInput" id="chk_msgdigest" /><label for="chk_msgdigest">站内信息</label></td>
                    </tr>
                    <tr>
                      <td width="100%" height="40"><input name="g" type="checkbox" value="公开圈子" class="vInput" id="chk_msg" /><label for="chk_msg" />接受圈内人的即时信息</label></td>
                    </tr>
                    <tr>
                      <td width="100%" >&nbsp;&nbsp;&nbsp;例外名单： &nbsp;
                        <input name="f" type="button" value="添加" id="btngroup"  class="btnA"  rel="#gmember" />
                        <br />
                        <div class="U_name">
                          <div class="U_nmetop"></div>
                          <div class="U_nmecenter" id="userDIV"> </div>
                        </div></td>
                    </tr>
                    <tr>
                      <td width="100%" height="20">&nbsp;
                    </tr>
                  </table>
                  <div class="pm20" style="border-top:1px dashed #dfdfdf"></div>
                  <table width="80%" border="0" cellspacing="0" cellpadding="0" align="center" >
                    <tr>
                      <td width="100%" height="50"><a href="javascript:submitValidation();" class="btn_127x36">保 存</a>
                       <a href="javascript:dataBind();" class="btn_127x36_gray">恢 复</a></td>
                    </tr>
                  </table>
                  <div class="pm50"></div>
                </div>
              </div>
            
 
        </div>
    </div>
    <div class="mBtm jz"></div>

</asp:Content>

