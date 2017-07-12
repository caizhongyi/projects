<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_info.aspx.cs" Inherits="relationship_relationship_mygroup_info" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>圈子信息-关系-玩儿道</title>
<meta name="keywords" content="圈子信息，关系，玩儿道，生活社交网络" />
<meta name="description" content="圈子的详细信息" />

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
        
        <div class="log_tab clearfix mb12"  id="myGroupMenu">
           
        </div>
        
        
        <div class="FtitleW clearfix" style="padding:0px 10px;">
          <h2 class="yh" id="lab_groupName"></h2>
          <div class="FareaW">
            <div class="black10"></div>
            <div class="black10"></div>
            <ul class="Ful">
              <li class="liwa"><strong>圈子类型：</strong><span id="lab_categoryName"></span></li>
              <li class="liwa"><strong>人&nbsp;&nbsp;&nbsp;&nbsp;数：</strong><span id="lab_member"></span></li>
              <li class="liwa"><strong>创&nbsp;建&nbsp;人：</strong><span id="lab_createName"></span></li>
              <li class="liwa"><strong>创建时间：</strong><span id="lab_createDate"></span></li>
              <li class="liwa"><strong>活&nbsp;跃&nbsp;度：</strong><span id="lab_activity"></span></li>
              <li class="liwa"><strong>关&nbsp;注&nbsp;度：</strong><span id="lab_follow"></span></li>
              <li class="liwa"><strong>超级管理员：</strong><span id="lab_super"></span></li>
              
              <li class="liwa"><strong>执行管理员：</strong><span id="lab_manager"></span></li>
              
              <li class="liwa"><strong>财&nbsp;务&nbsp;员：</strong><span id="lab_treasurer"></span></li>
               
              <li class="liwa"><strong>汇款账号：</strong><span id="lab_transferaccount"></span></li>
             
              <li class="liwa"><strong>加入方式：</strong><span id="lab_joinmethod"></span></li>
            
              <li class="liwa"><strong>圈子会费：</strong><span id="lab_joinfee"></span></li>
             
              <li class="libroad"><strong>圈子描述：</strong><span id="lab_summary" ></span></li>
             
              <li class="libroad"><strong>圈子规章：</strong><span id="lab_description" ></span></li>
               
              <li class="libroad"><strong>缴费说明：</strong><span id="lab_transferdescription"></span></li>
              <li class="liwa" style="display:none"><strong>选举民主比率：</strong><span id="txt_democracy_rate"></span></li>
               <li class="liwa" style="display:none"><strong>执行投票周期：</strong><span id="txt_vote_life"></span></li>
               <li class="liwa" style="display:none"><strong>执行公示周期：</strong><span id="txt_public_life"></span></li>
              <li class="liwa" style="display:none"><strong>投票通过率：</strong><span id="txt_vote_pass_rate"></span></li>
              <li class="liwa" style="display:none"><strong>管理员周期：</strong><span id="sel_managercycle"></span></li>
              <li class="liwa" style="display:none"><strong>薪酬：</strong><span id="txt_managersalary"></span></li>
              <li class="liwa" style="display:none"><strong>财务员周期：</strong><span id="sel_financialcycle"></span></li>
              <li class="liwa" style="display:none"><strong>薪酬：</strong><span id="txt_financialsalary"></span></li>
              <li class="blank10px"></li>
              <li class="libtn">
                <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" style ="display:none;" onclick="addJoin();" value="加 入" id="btn_addGroup" />
                <input type="button" class="buttonB btn_w97 btn_h36 btnBlue_135 fSize-14" style ="display:none;" onclick="toEdit();"  value="编 辑" id="btn_editGroup" />
              </li>
            </ul>
            <div class="Frpic" id="img_logo"></div>
            <div class="pm50"></div>
          </div>
        </div>

    </div>
</div>
<div class="mes_main_bot"></div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
  <script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupInfo.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
   <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>

<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>

