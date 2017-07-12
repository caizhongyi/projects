<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_info_manage.aspx.cs" Inherits="relationship_relationship_mygroup_info_manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
  <link rel="stylesheet" type="text/css" href="../css/base.css" media="all"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>

        <div class="black10"></div>
        
        <div class="log_tab clearfix mb12" id="myGroupMenu">
          
        </div>
        
        <div class="FtitleW clearfix">
          <div class="FareaW">
            <div class="black10"></div>
            <div class="black10"></div>
            <ul class="Rul">
              <li> <strong><b>*</b> 圈子名字：</strong> <span>
                <input name="g" type="text"  maxlength="30" value="请输入圈子名称" onblur="isinputName()" id="txt_groupName" onblur="isinputName()"  class="Stext he24 text" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc';}" style=" width:358px; ">
                </span> <label style="color:Red" id="msgName" class="msgLabArr"></label></li>
              <li><strong><b>*</b> 圈子分类：</strong> <span style=" position:relative">
              <div  onmouseover="showhlep()">
                <select name="select" class="Stext he24" style=" width:144px" id="groupCateList">
                 
                </select>
                </div>
                <label style="color:Red" id="msgCate" class="msgLabArr"></label>
                <div class="Uorientation" id="helpgroupCate" style="display:none">
                  <p>帮助信息：<br />
                    请选择您的圈子分类。</p>
                  <b onclick="this.parentNode.style.display='none'">x</b></div>
                </span></li>
              <li><strong>是否公开：</strong> <span>
                <input name="g" id="chk_publie" type="checkbox" value="公开圈子" class="vInput" />
                <label for="input_1">公开圈子</label>
                </span></li>
              <li> <strong>加入方式：</strong> <span>
                <input type="radio" name="sex"class="vInput"  id="dicAdd" value="直接加入" />
                <label for="input_2">直接加入</label>
                &nbsp;&nbsp;
                <input type="radio" name="sex" id="aprAdd" value="批准加入" class="vInput" />
                <label for="input_3">批准加入</label>
                </span> </li>
              <li><strong>执行管理员：</strong> <span>
                
                <input type="button" class="btnA" value="添加" name="f" id="btnaddmanager" />
                <br />
                 <div class="U_name">
                          <div class="U_nmetop"></div>
                          <div class="U_nmecenter" id="managerDIV"></div>
                        </div>
                </span></li>
              <li><strong>财务员：</strong> <span>
                <input type="button" class="btnA" value="添加" name="f" id="btnaddfinance" />
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
                <input name="g" type="checkbox" value="公开圈子" class="vInput" id="cpRt"  onclick="islogoagree()">
                <label for="input_4">我知道上传的图片不侵犯第三方的版权</label><label style="color:Red" id="msgcopyright" class="msgLabArr"></label>
                <br />
                  <div class="progressbar" id="progressDIV" style="display:none">
                        <span class="progress" id="progressspan"></span>
                        <i class="percent" id="percenti">0%</i>
                    </div>
                <div class="Frpic" style="float:none; margin-top:8px;"> <span id="thumbnails"></span></div>
                </span></li>
              <li><strong><b>*</b> 圈子介绍：</strong> <span>
                <textarea name="intro"  maxlength="150" onkeyup="checklength(this)"  onfocus="disabledRightMouse()"   onblur="enabledRightMouse()"  id="txt_summary"  class="txtArea text"  onblur="isinputsummary()"   style=" width:486px; height:90px; ">输入圈子介绍</textarea>
                </span><label style="color:Red" id="msgSummary" class="msgLabArr"></label></li>
              <li><strong><b>*</b> 圈子规章：</strong> <span>
                <textarea name="rule"  id="txt_description"  maxlength="500" onkeyup="checklength(this)"  onfocus="disabledRightMouse()"   onblur="enabledRightMouse()" class="txtArea text"  onblur="isinputdescription()"  style=" width:486px; height:90px; ">输入圈子规章</textarea>
                </span><label style="color:Red" id="msgdes" class="msgLabArr"></label></li>
              <li><strong>圈子主页：</strong> <span>
                <input name="g" type="text" maxlength="100" id="txt_website"  class="Stext he24 text" style="  width:357px" />
                </span></li>
              <li><strong>管理架构：</strong> <span style="float:left">
                <input type="radio" name="manage"  class="vInput"  id="input_5" onclick="hideDemoSetting()" checked="checked"/>
                <label for="input_5">层级结构</label>
                <br />
                <img src="../images/demo/name_jg.jpg" width="225" height="155" /> </span> <span style="float:left">
                <input type="radio" name="manage" disabled ="disabled"  class="vInput" id="input_6" onclick="showDemoSetting()"/>
                <label for="input_6">民主结构</label>
                <br />
                <img src="../images/demo/name_jgr.jpg" width="225" height="155" /> </span>
                
              </li>
              

                <li id="democracySetting" style="display:none">
                 <div class="structset clearfix">
                     <h3>民主结构设置</h3>
                     <div class="item clearfix">
                            <p>
                                选举民主比率（选举执行管理员暂圈子总人数的比率）<br />
                                <em>注意：比例越高需要选举出的执行管理员越多，虽然越能体现圈子民意，但是这样行效率也会降低</em>
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_rate" class="Stext he24 text" value="10"/>&nbsp;&nbsp;%<br/>
                                <span class="tip" style="margin-top:10px; width:104px;">+/- 1个单位浮动</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                执行投票周期（管理委员会的民主相关决议需要经过投票周期投票，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_vote_life" value="5" class="Stext he24 text" style="width:70px;"/>&nbsp;
                                <span class="tip">天</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                执行公示周期（管理委员会的决议需要经过周期公示方能生效，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_public_life" value="5" class="Stext he24 text" style="width:70px;"/>&nbsp;
                                <span class="tip">天</span>
                            </div>
                     </div>
                     
                      <div class="item clearfix">
                            <p>
                                投票通过率（赞成票超过这个比例即为通过，所有事件通用）
                            </p>
                            <div class="inputs">
                                <input type="text" id="txt_vote_pass_rate" value="50" class="Stext he24 text"/>&nbsp;&nbsp;%
                               
                            </div>
                     </div>
                     
                     <h3>执行管理员</h3>
                     <div class="item">
                        <label>换届周期：</label>
                        <select name="select" id="sel_manager" style=" width:95px; height:24px">
                        </select>
                        
                        <label>薪酬：</label>
                        <select name="select" id="sel_managersalary" style=" width:71px; height:24px">
                        </select>
                        <input class="Stext he24 text" value="0" id="txt_managersalary"/>
                     </div>
                     
                      <h3>财务员</h3>
                     <div class="item">
                        <label>换届周期：</label>
                        <select name="select" id="sel_finance" style=" width:95px; height:24px">
                        </select>
                        
                        
                        <label>薪酬：</label>
                        <select name="select" id="sel_financesalary" style=" width:71px; height:24px">
                        </select>
                        <input class="Stext he24 text" value="0" id="txt_financesalary"/>
                     </div>
                 </div>
              </li>


              <li><strong> 缴纳费用：</strong> <span>
                          <input name="" type="text"  id="txt_fee" onblur="isinputfee()" value="" class="Stext he24 text"  style="display:none; " />
                          <select name="select" style="width:80px" id="feeUnitList">
                             
                          </select>
                          <input name="" type="text" style=" display:none;" value="" class="Stext he24 text"  id="txt_defind" onblur="isinputdefind()"/>
                          <select name="select" style="width:80px;display:none;" id="definedUnitList">
                          </select>
                </span><label style="color:Red" id="msgUnit" class="msgLabArr"></label></li>
              <li><strong> 汇款账号：</strong> <span>
                <input name="g" type="text" maxlength="20" id="txt_transfer" class="Stext he24 text" style=" width:357px; " onblur="isinputtransfer()" >
                </span><label style="color:Red" id="msgTrans" class="msgLabArr"></label></li>
              <li><strong>缴费说明：</strong> <span>
                <textarea name="" cols="5" id="txt_transfer_description" maxlength="200"  rows="5" class="txtArea text" style=" width:497px; height:99px; "></textarea>
                </span></li>
              <li><strong>踢人保护：</strong> <span>
                <input name="g" id="prote"  type="checkbox" value="公开圈子" class="vInput" />
                <label for="input_7">启动踢人保护</label>
                <select name="select"  id="protecttimeList">
                
                </select>
                </span></li>
              <li>&nbsp;</li>
              <li class="btnn">
                        	<div class="black10"></div>
                            <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" onclick="editGroup();" value="保 存" />
                        	<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="取 消" onclick="cancelEdit()" />
                              <label style=" color:red" id="msgSubmit" class="msgLabArr"></label>
                            </li>
            </ul>
            <div class="pm50"></div>
          </div>
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
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
  <script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupInfoManage.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
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

