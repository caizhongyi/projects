<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_group_create.aspx.cs" Inherits="relationship_relationship_group_create" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/groupCreate.js" type="text/javascript"></script>
<script src="../Scripts/common/objectToJson.js" type="text/javascript"></script>
  <script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
<script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>  
 <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
<script type="text/javascript" src="../Scripts/Plugin/Search/wanerdao2.compop.js"></script>
<script type="text/javascript" src="../Scripts/Plugin/Search/wanerdao2.groupinvite.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">
                
              </div>
              <div class="rgcTip">创建圈子</div>
              <div class="prTnvit_wrap">
              <div class="prT_name"><b></b>圈子信息<span>创建人、超级管理员、管理员、财务员： <i id="userName"></i></span></div>
              <div class="rgc_box">
                <table width="100%" border="0" cellspacing="0" cellpadding="5">
                  <tr>
                    <th class="rowNam" scope="row">加入方式：</th>
                    <td><input type="radio" name="radio" id="dicAdd" class="vInput" value="直接加入" checked="checked"/><label for="dicAdd" style="margin-right:20px;">直接加入</label>
                      <input type="radio" name="radio" id="aprAdd" class="vInput" value="批准加入" /><label for="aprAdd">批准加入</label></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row">图片上传：</th>
                    <td>
                    <div class="fileArea">
                     <span id="spanButtonPlaceholder"></span>
                    </div>

                    <input name="" type="checkbox" value="" class="vInput" id="cpRt" /><label for="cpRt">我知道上传的图片不侵犯第三方的版权</label>
                     <div id="divUploadMessage" class="floatL marginL10" style="width: 60%; display:none;">
                    <span style="width: 60%; display: block; line-height: 18px;">正在上传"<label id="labUploadFile" style="width:100%; text-align:left; left:0;"></label>"...</span>
                    <span class="bar_grey"><span class="bar_Yellow" id="spanProgress"></span></span>
                </div>
                    <div class="flie_pic"><span id="thumbnails"></span></div></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row"><i>*</i>圈子名字：</th>
                    <td><input name="" id="txt_groupname" value="请输入圈子名称" type="text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}"  class="prInpSty" /></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row"><i>*</i>圈子分类：</th>
                    <td>
                    <select id="groupCateList">
                    
                    </select>
                    </td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row"><i>*</i>圈子简介：</th>
                    <td><textarea name="" id="txt_summary" cols="" class="prTxaSty" rows="" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >请输入圈子简介</textarea></td>
                  </tr>
                  <tr>
                    <th valign="top" class="rowNam" scope="row"><i>*</i>圈子规章：</th>
                    <td><textarea name="" cols="" id="txt_description" class="prTxaSty" rows="" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >请输入圈子规章</textarea></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">圈子主页：</th>
                    <td><input name="" id="txt_website" type="text" value="请输入圈子主页地址" class="prInpSty" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" /></td>
                  </tr>
                
                  <tr>
                    <th valign="top" class="rowNam" scope="row">管理架构：</th>
                    <td><ul class="zzjg">
                        <li>
                          <div class="jg_hd">
                            <input name="manage" type="radio" value="" id="cjjg" checked=checked />
                             <label for="cjjg">层级结构</label></div>
                          <img src="../images/img/name_jg.jpg" width="225" height="155" />
                        </li>
                        <li>
                          <div class="jg_hd">
                            <input name="manage" type="radio" disabled value="" id="disab"/ >
                            <label for="disab">民主结构</label></div>
                          <img src="../images/img/name_jgr.jpg" width="225" height="155" />
                        </li>
                      </ul></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">缴纳费用：</th>
                    <td><ul class="Capt" id="unitUL">
                        
                        <li>
                          <input name="" type="text" id="txt_fee" value="请输入费用" class="prInpSty" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >
                        </li>
                        <li>
                          <select id="feeUnitList"></select>
                        </li>
                        <li  style ="display:none">
                          <input name="" type="text" id="txt_defind" value="请输入费用" class="prInpSty" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" >
                        </li>
                        <li   style ="display:none">
                           <select id="definedUnitList"></select>
                        </li>
                      </ul></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">汇款帐号：</th>
                    <td><input name="" type="text" id="txt_transfer" value="请输入汇款帐号" class="prInpSty" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" ></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">缴费说明：</th>
                    <td><input name="" type="text" id="txt_transfer_description" value="请输入说明内容" class="prInpSty" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" ></td>
                  </tr>
                  <tr>
                    <th class="rowNam" scope="row">踢人保护：</th>
                    <td><div class="prote">
                        <input name="" type="checkbox" id="prote" value=""/>
                        <label for="prote">启动踢人保护</label></div>
                    <select id="protecttimeList"></select></td>
                  </tr>
                </table>
              </div>
            </div>
              <div class="prTnvit_wrap" >
              	<div class="prT_name" id="inviterDIV"><b></b>邀请用户</div>
                
              
              </div> <div class="blank10px"></div>
                <div class="agrTerm"><input name="" type="checkbox" id="agree" class="vInput" value="" onclick="agreeSubmit(this)"/><label for="agree">同意条款并阅读说明</label></div>
                <div class="sA_btn clearfix" style="padding-left:14px;"><input name="" type="button"  id="btn_sub"  class="cancel" value="完成"  onclick="submitValidation()" disabled="disabled"><input name="" type="button" class="cancel" value="取消"></div>

                
                <div class="blank10px"></div>
             
              <div class="blank5px"></div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
</asp:Content>

