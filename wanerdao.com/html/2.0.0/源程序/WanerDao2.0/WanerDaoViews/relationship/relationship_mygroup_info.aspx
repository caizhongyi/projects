<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_info.aspx.cs" Inherits="relationship_relationship_mygroup_info" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupInfo.js" type="text/javascript"></script>
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
              <div class="clearfix">
                <div class="Fnavigation" id="myGroupMenu" style="margin-top:0px">
                
                </div>
                <div class="FtitleW clearfix" style="padding:0px 10px;">
                  <h2 class="yh" id="lab_groupName"></h2>
                  <div class="FareaW">
                    <div class="pm20"></div>
                    <ul class="Ful">
                      <li class="liwa"><strong>圈子类型：</strong><span id="lab_categoryName"></span></li>
                      <li class="liwa"><strong>人&nbsp;&nbsp;&nbsp;&nbsp;数：</strong><span id="lab_member"></span></li>
                      <li class="liwa"><strong>创&nbsp;建&nbsp;人：</strong><span id="lab_createName"></span></li>
                      <li class="liwa"><strong>创建时间：</strong><span id="lab_createDate"></span></li>
                      <li class="liwa"><strong>活&nbsp;跃&nbsp;度：</strong><span id="lab_activity"></span></li>
                      <li class="liwa"><strong>关&nbsp;注&nbsp;度：</strong><span id="lab_follow"></span></li>
                      <li class="libroad"><strong>超级管理员：</strong><span id="lab_super"></span></li>
                      <li class="libroad"><strong>执行管理员：</strong><span id="lab_manager"></span></li>
                      <li class="libroad"><strong>财&nbsp;务&nbsp;员：</strong><span id="lab_treasurer"></span></li>
                      <li class="libroad"><strong>圈子描述：</strong><span id="lab_summary"></span></li>
                      <li class="libroad"><strong>圈子规章：</strong><span id="lab_description"></span></li>
                      <li class="libroad"><strong>圈子会费：</strong><span id="lab_joinfee"></span></li>
                      <li class="libroad"><strong>汇款账号：</strong><span id="lab_transferaccount"></span></li>
                      <li class="libroad"><strong>缴费说明：</strong><span id="lab_transferdescription"></span></li>
                      <li class="libroad"><strong>加入方式：</strong><span id="lab_joinmethod"></span></li>
                      <li class="blank10px"></li>
                      <li class="libtn">
                       <a class="btn_127x36" href="javascript:addJoin();" style ="display:none;" id="btn_addGroup">加 入</a>
                       <a class="btn_127x36" href="javascript:toEdit();" style ="display:none;" id="btn_editGroup">编 辑</a>
                       <span id="waitmsg" style="display:none;"></span>
                      </li>
                    </ul>
                    <div class="Frpic" id="img_logo"></div>
                    <div class="pm50"></div>
                  </div>
                </div>
 
 
              </div>
            </div>
 
        </div>
    </div>
    <div class="mBtm jz"></div>


</asp:Content>

