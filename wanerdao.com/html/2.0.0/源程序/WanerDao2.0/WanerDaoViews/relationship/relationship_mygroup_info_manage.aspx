<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_info_manage.aspx.cs" Inherits="relationship_relationship_mygroup_info_manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
    <link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupInfoManage.js" type="text/javascript"></script>
<script src="../Scripts/common/objectToJson.js" type="text/javascript"></script>
<script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
 <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>  

<script type="text/javascript" src="../Scripts/Plugin/SearhGroupMember/wanerdao2.groupmember.js"></script>
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
  <div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">
              </div>
              <div class="clearfix">
                <div class="Fnavigation" id="myGroupMenu">
                </div>
                <div class="FtitleW clearfix">
                  <div class="FareaW">
                    <div class="pm20"></div>
                    <ul class="Rul">
                      <li>
                      	<strong><b>*</b> 圈子名字：</strong>
                        <span><input name="g" type="text" value="" id="txt_groupName" class="Stext he24" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" style=" width:358px; "></span>
                      </li>
                      <li><strong><b>*</b> 圈子分类：</strong> <span style=" position:relative">
                        <select name="select" id="groupCateList" class="Stext he24" style=" width:144px">
                        </select>
                    
                        </span></li>
                      <li><strong>是否公开：</strong> <span>
                        <input name="g" id="chk_publie" type="checkbox" value="公开圈子" class="vInput"  /><label for="chk_publie">公开圈子</label></span></li>
                      <li>
                      	<strong>加入方式：</strong>
                      	<span>
                        <input type="radio" name="sex" class="vInput" id="dicAdd" value="直接加入" /><label for="dicAdd">直接加入</label>&nbsp;&nbsp;
                        <input type="radio" name="sex"  class="vInput" id="aprAdd" value="批准加入" /><label for="aprAdd">批准加入</label>
                        </span>
                      </li>
                      <li><strong>执行管理员：</strong> <span>
                        <input name="g" type="text" value="" class="Stext he24" style=" width:190px;" /> 
                        <input type="button" id="btnaddmanager"  class="btnA" value="添加"  rel="#gmember" />
                        <br />
                        <div class="U_name">
                          <div class="U_nmetop"></div>
                          <div class="U_nmecenter" id="managerDIV"></div>
                        </div>
                        </span></li>
                      <li><strong>财务员：</strong> <span>
                        <input name="g" type="text" value="" class="Stext he24" style=" width:190px;"> 
                        <input type="button" id="btnaddfinance" class="btnA" value="添加"  rel="#gmember" />
                        <br />
                        <div class="U_name">
                          <div class="U_nmetop"></div>
                          <div class="U_nmecenter" id="treasurerDIV"></div>
                        </div>
                        </span></li>
                      <li><strong>图片上传：</strong> <span>
                        <span id="spanButtonPlaceholder"></span>
                        <br />
                        <div id="divUploadMessage" class="floatL marginL10" style="width: 60%; display:none;">
                            <span style="width: 60%; display: block; line-height: 18px;">正在上传"<label id="labUploadFile" style="width:100%; text-align:left; left:0;"></label>"...</span>
                            <span class="bar_grey"><span class="bar_Yellow" id="spanProgress"></span></span>
                        </div>
                        <input name="g" type="checkbox" checked="checked" value="公开圈子" class="vInput" id="cpRt" /><label for="cpRt">我知道上传的图片不侵犯第三方的版权</label><br />
                        <div class="Frpic" style="float:none; margin-top:8px;">
                        <span id="thumbnails"></span></div>
                        </span></li>
                      <li><strong><b>*</b> 圈子介绍：</strong> <span>
                        <textarea name="intro" id="txt_summary" class="txtArea" style=" width:486px; height:90px; "></textarea>
                        </span></li>
                      <li><strong><b>*</b> 圈子规章：</strong> <span>
                        <textarea name="rule" id="txt_description" class="txtArea" style=" width:486px; height:90px; "></textarea>
                        </span></li>
                      <li><strong><b>*</b> 圈子主页：</strong> <span>
                        <input name="g" type="text" id="txt_website" value="" class="Stext he24" style="  width:357px">
                        </span></li>
                      <li><strong>管理架构：</strong> <span style="float:left">
                        <input type="radio" name="manage" checked="checked" class="vInput" id="input_5" onclick="hideDemoSetting()"/><label for="input_5">层级结构</label>
                        <br />
                        <img src="../images/img/name_jg.jpg" width="225" height="155" /> </span> <span style="float:left">
                        <input type="radio" name="manage" disabled="disabled"  class="vInput" id="input_6" onclick="showDemoSetting()"/><label for="input_6">民主结构</label>
                        <br />
                        <img src="../images/img/name_jgr.jpg" width="225" height="155" /> </span></li>
                     
                      <li id="democracySetting" style="display:none">
                 <div class="structset clearfix">
                     <h3>民主结构设置</h3>
                     <div class="item clearfix">
                            <p>
                                选举民主比率（选举执行管理员暂圈子总人数的比率）<br />
                                <em>注意：比例越高需要选举出的执行管理员越多，虽然越能体现圈子民意，但是这样行效率也会降低</em>
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_rate" class="Stext he24"/>&nbsp;&nbsp;%<br/>
                                <span class="tip" style="margin-top:10px; width:104px;">+/- 1个单位浮动</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                执行投票周期（管理委员会的民主相关决议需要经过投票周期投票，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_vote_life" class="Stext he24" style="width:70px;"/>&nbsp;
                                <span class="tip">天</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                执行公示周期（管理委员会的决议需要经过周期公示方能生效，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_public_life" class="Stext he24" style="width:70px;"/>&nbsp;
                                <span class="tip">天</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                投票通过率（赞成票超过这个比例即为通过，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_vote_pass_rate" class="Stext he24"/>&nbsp;&nbsp;%
                               
                            </div>
                     </div>
                     
                     <h3>执行管理员</h3>
                     <div class="item">
                        <label>换届周期：</label>
                        <select name="select" id="sel_manager" style=" width:71px; height:24px">
                        </select>
                        
                        <label>薪酬：</label>
                        <select name="select" id="sel_managersalary" style=" width:71px; height:24px">
                        </select>
                        <input class="Stext he24" id="txt_managersalary"/>
                     </div>
                     
                      <h3>财务员</h3>
                     <div class="item">
                        <label>换届周期：</label>
                        <select name="select" id="sel_finance" style=" width:71px; height:24px">
                        </select>
                        
                        
                        <label>薪酬：</label>
                        <select name="select" id="sel_financesalary" style=" width:71px; height:24px">
                        </select>
                        <input class="Stext he24" id="txt_financesalary"/>
                     </div>
                 </div>
              </li>

                      <li><strong> 缴纳费用：</strong> <span>
                        <input name="g" type="text" id="txt_fee" value=""   class="Stext he24" style=" width:112px; display:none; ">
                        &nbsp;
                        <select id="feeUnitList" name="select" style=" width:71px; height:24px"></select>
                        
                        &nbsp;
                        <input name="g" type="text" id="txt_defind" value=""   class="Stext he24" style=" width:112px; display:none;"/>
                        &nbsp;
                         <select id="definedUnitList" name="select"  style="width:71px; height:24px; display:none;"></select>                     
                        </span></li>
                      <li><strong><b>*</b> 汇款账号：</strong> <span>
                        <input name="g" type="text" id="txt_transfer" value=""  class="Stext he24" style=" width:357px; ">
                        </span></li>
                      <li><strong> 缴费说明：</strong> <span>
                        <textarea name="b" id="txt_transfer_description" cols="5" rows="5" class="txtArea" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" style=" width:497px; height:99px; ">请输入圈子规章</textarea>
                        </span></li>
                      <li><strong>踢人保护：</strong> <span>
                        <input name="g" type="checkbox" id="prote" value="公开圈子" class="vInput"><label for="prote">启动踢保护</label>&nbsp;
                        <select name="select" id="protecttimeList">
                        </select>
                        </span></li>
                        <li>&nbsp;</li>
                      <li class="btnn">
                        <a class="btn_127x36" href="javascript:editGroup();">保 存</a>
                       <a class="btn_127x36" href="javascript:cancelEdit();">取 消</a>
                      </li>
                    </ul>
                    <div class="pm50"></div>
                  </div>
                </div>
 
              </div>
            </div>
 
        </div>
    </div>
    <div class="mBtm jz"></div>
</asp:Content>

