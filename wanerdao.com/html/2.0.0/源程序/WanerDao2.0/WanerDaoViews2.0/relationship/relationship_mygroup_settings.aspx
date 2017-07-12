<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_settings.aspx.cs" Inherits="relationship_relationship_mygroup_settings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

<title>圈子参数设定-关系-玩儿道</title>
<meta name="keywords" content="圈子参数设定，关系，玩儿道，生活社交网络" />
<meta name="description" content="设定圈子不同级别信息更新的提示周期及方式" />


<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">

        <div id="TopMenu"></div>
       

        <div class="black10"></div>
        
        <div class="log_tab clearfix mb12" id="myGroupMenu" >
            
        </div>
        <div class="clear"></div>
        <div class="clearfix rel_my_set">
            <table class="my_set_inner">
                <tr>
                  <td width="100%" height="30">&nbsp;</td>
                </tr>
                <tr>
                  <td width="100%" height="40">设定接收邮箱：&nbsp;
                    <input name="g" type="text" value=""  id="txt_mail"  class="Stext he24 text" style=" width:278px"></td>
                </tr>
                <tr>
                  <td width="100%" height="40"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="25%" height="40"><input name="g" type="checkbox" value="" class="vInput" id="chk_event">&nbsp;&nbsp;<label for="check_1">重要圈子通知</label></td>
                        <td width="15%"><input name="g" type="checkbox" value="" class="vInput" id="chk_mailevent">&nbsp;&nbsp;<label for="check_2">邮件</label></td>
                        <td width="20%"><input name="g" type="checkbox" value="" class="vInput" id="chk_msgevent">&nbsp;&nbsp;<label for="check_3">站内信息</label></td>
                        <td width="45%"><label style="color:Red" id="msgevent" class="msgLabArr"></label></td>
                      </tr>
                      <tr>
                        <td width="25%"  height="40"><input name="g" type="checkbox" value="公开圈子" class="vInput" id="chk_updates" >&nbsp;&nbsp;<label for="check_4">订阅圈子动态更新</label></td>
                        <td width="15%"><input name="g" type="checkbox" value="" class="vInput" id="chk_mailupdates" >&nbsp;&nbsp;<label for="check_5">邮件</label></td>
                        <td width="20%"><input name="g" type="checkbox" value="" class="vInput" id="chk_msgupdates" >&nbsp;&nbsp;<label for="check_6">站内信息</label></td>
                        <td width="45%"><label style="color:Red" id="msgupdates" class="msgLabArr"></label></td>
                      </tr>
                    </table></td>
                </tr>
                <tr>
                  <td width="100%" height="50"><input name="g" type="checkbox" value="" class="vInput" id="chk_digest">&nbsp;&nbsp;<label for="check_7">订阅信息摘要</label>
                    <select name="select" class="Stext he24" style=" width:144px"  id="slt_digest">
                      <option value="24">按天</option>
                          <option value="168">按周</option>
                          <option value="720" selected="selected">按月</option>
                          <option value="2160">按季度</option>
                          <option value="8640">按年</option>
                    </select>
                    <input name="g" type="text" class="Stext he24 text" maxlength="3" onblur="validationdigest()" style=" width:163px" id="txt_digest" >
                    &nbsp;&nbsp;
                    <input name="g" type="checkbox" value="" class="vInput" id="chk_maildigest">&nbsp;&nbsp;<label for="check_8">邮件</label>&nbsp;&nbsp;&nbsp;
                    <input name="g" type="checkbox" value="" class="vInput" id="chk_msgdigest" >&nbsp;&nbsp;<label for="check_9">站内信息</label></td>
                </tr>
                <tr style=" display:none">
                  <td width="100%" height="40"><input name="g" type="checkbox" value="公开圈子" class="vInput" id="chk_msg" >&nbsp;&nbsp;<label for="check_10">接受圈内人的即时信息</label></td>
                </tr>
                <tr style=" display:none">
                  <td width="100%" >&nbsp;&nbsp;&nbsp;&nbsp;例外名单： &nbsp;
                    
                    <input name="f" type="button" value="添加" class="btnA" id="btngroup">
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
              <table width="92%" border="0" cellspacing="0" cellpadding="0" align="center" >
                <tr>
                  <td width="100%" height="100"><input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="保 存" onclick="submitValidation();" />
                            <input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="恢 复" onclick="setblank();" />
                            <label style="color:Red" id="msgsubmit" class="msgLabArr"></label></td>
                </tr>
            </table>
            <div class="pm50"></div>
        </div>
 
    </div>
</div>
<div class="mes_main_bot"></div>



</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/mygroupSettings.js" type="text/javascript"></script>
<script src="../Scripts/common/objectToJson.js" type="text/javascript"></script>
<script type="text/javascript" src="../scripts/plugin/search/wanerdao2.compop.js"></script>
     <script type="text/javascript" src="../scripts/jquery.core.js"></script>
     <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
      <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
       <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
</asp:Content>

