<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_group_create.aspx.cs" Inherits="relationship_relationship_group_create" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

<title>创建圈子-关系-玩儿道</title>
<meta name="keywords" content="创建圈子，圈子信息，邀请用户，关系，玩儿道，生活社交网络" />
<meta name="description" content="填写圈子信息，邀请用户完成圈子创建" />

<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
  <link rel="stylesheet" type="text/css" href="../css/base.css" media="all"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>
     
        
        <div class="rgcTip">创建圈子</div>
        
		<div class="prTnvit_wrap">
              <div class="prT_name"><b></b>圈子信息<span>创建人、超级管理员、管理员、财务员：  <i id="userName"></i></span></div>
              <div class="rgc_box">
                <table width="100%" border="0" cellspacing="0" cellpadding="5">
                  <tr>
                    <th class="rowNam" scope="row">加入方式：</th>
                    <td><input type="radio" name="radio" id="dicAdd" class="vInput" value="直接加入" checked="checked"><label for="dicAdd" style="margin-right:20px;">直接加入</label>
                      <input type="radio" name="radio" id="aprAdd" class="vInput" value="批准加入"><label for="aprAdd">批准加入</label></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row">图片上传：</th>
                    <td>
                     <div class="fileArea">
                     <span id="spanButtonPlaceholder"></span>
                    </div>
                    <input name="" type="checkbox" value="" class="vInput" id="cpRt" onclick="islogoagree()" /><label for="cpRt">我知道上传的图片不侵犯第三方的版权</label><label style="color:Red" id="msgcopyright" class="msgLabArr"></label>
                      <div id="divUploadMessage" class="floatL marginL10" style="width: 60%; display:none;">
                    <span style="width: 60%; display: block; line-height: 18px;">正在上传"<label id="labUploadFile" style="width:100%; text-align:left; left:0;"></label>"...</span>
                    <span class="bar_grey"><span class="bar_Yellow" id="spanProgress"></span></span>
                     </div>
                      <div class="progressbar" id="progressDIV" style="display:none">
                        <span class="progress" id="progressspan"></span>
                        <i class="percent" id="percenti">0%</i>
                    </div>

                    <div class="flie_pic"><span id="thumbnails"></span></div>
                    </td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row"><i>*</i>圈子名字：</th>
                    <td><input name=""  id="txt_groupname" maxlength="30" value="请输入圈子名称"  onblur="isinputName()" type="text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}"  class="prInpSty text"><label style="color:Red" id="msgName" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row"><i>*</i>圈子分类：</th>
                    <td><select id="groupCateList" name="select" style="width:140px">
                                </select><label style="color:Red" id="msgCate" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row"><i>*</i>圈子简介：</th>
                    <td><textarea name="" cols=""  maxlength="150" onkeyup="checklength(this)"  onfocus="disabledRightMouse()"   onblur="enabledRightMouse()" id="txt_summary" class="prTxaSty text" onblur="isinputsummary()"  rows="" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >请输入圈子简介</textarea><label style="color:Red" id="msgSummary" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row"><i>*</i>圈子规章：</th>
                    <td><textarea name="" cols="" id="txt_description"  maxlength="500" onkeyup="checklength(this)"  onfocus="disabledRightMouse()"   onblur="enabledRightMouse()" class="prTxaSty text" rows="" onblur="isinputdescription()"  onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >请输入圈子规章</textarea><label style="color:Red" id="msgdes" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">圈子主页：</th>
                    <td><input name="" type="text" maxlength="100" id="txt_website" value="请输入圈子主页地址" class="prInpSty text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" ></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row">管理架构：</th>
                    <td><ul class="zzjg">
                        <li>
                          <div class="jg_hd">
                            <input name="" type="radio" value="" id="cjjg" checked=checked >
                             <label for="cjjg">层级结构</label></div>
                          <img src="../images/demo/name_jg.jpg" width="225" height="155" />
                        </li>
                        <li>
                          <div class="jg_hd">
                            <input name="" type="radio" disabled value="" id="disab">
                            <label for="disab">民主结构</label></div>
                          <img src="../images/demo/name_jgr.jpg" width="225" height="155" />
                        </li>
                      </ul></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">缴纳费用：</th>
                    <td><ul class="Capt" id="unitUL">
                        <li>
                          <input name="" type="text" id="txt_fee" onblur="isinputfee()" value="请输入费用" class="prInpSty text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" style="height:16px;display:none" >
                        </li>
                        <li>
                          <select name="select" style="width:80px" id="feeUnitList">
                          </select>
                        </li>
                        <li style ="display:none">
                          <input name="" type="text"  id="txt_defind" onblur="isinputdefind()"  value="请输入费用" class="prInpSty text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" style="height:16px;" >
                        </li>
                        <li style ="display:none">
                          <select name="select" style="width:40px" id="definedUnitList">
                          </select>
                        </li>
                      </ul><label style="color:Red" id="msgUnit" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">汇款帐号：</th>
                    <td><input name="" type="text" id="txt_transfer" maxlength="20"  onblur="isinputtransfer()"  value="请输入汇款帐号" class="prInpSty text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" ><label style="color:Red" id="msgTrans" class="msgLabArr"></label></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">缴费说明：</th>
                    <td><input name="" type="text" id="txt_transfer_description" maxlength="200" value="请输入说明内容" class="prInpSty text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" ></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">踢人保护：</th>
                    <td><div class="prote">
                        <input name="" type="checkbox" id="prote" value=""/>
                        <label for="prote">启动踢人保护</label></div>
                    <select name="select" style="width:100px" id="protecttimeList">
                          </select></td>
                  </tr>
                </table>
              </div>
        </div>
        
        <div class="prTnvit_wrap"><div class="prT_name"><b></b>邀请用户</div>
        <div class="select_pep_bot">
        <div  id="inviterDIV"></div>
        <div class="blank10px"></div>
        <div class="agrTerm" ><input name="" type="checkbox" id="agree" class="vInput" value="" onclick="agreeSubmit(this)" /><label for="agree">同意条款</label></div>
        <div class="sA_btn clearfix" style="padding-left:14px;">
         <a  id="btn_sub" style="display:none" href="javascript:submitValidation()" class="button blue-radius-btn">完 成</a>
            <a href="javascript:cancel()" class="button gay-radius-btn">取 消</a>
            <label style=" color:red" id="msgSubmit" class="msgLabArr"></label>
                            </div>
            
            <div class="blank10"></div>
            </div>
            </div>
          </div>
              
        </div>
        
 
<div class="mes_main_bot"></div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/groupCreate.js" type="text/javascript"></script>
<script src="../Scripts/common/objectToJson.js" type="text/javascript"></script>
     <script type="text/javascript" src="../scripts/jquery.core.js"></script>
     <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
     <script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
   <script type="text/javascript" src="../scripts/plugin/search/wanerdao2.compop.js"></script>
<script type="text/javascript" src="../Scripts/plugin/invitation/wanerdao2.invitation.cookie.js"></script>
</asp:Content>

