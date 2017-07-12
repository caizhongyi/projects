<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myactivity.aspx.cs" Inherits="Activity_Activity_myactivity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

<link href="../style/activity.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="../style/party.css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<link href="/css/jquery/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
<link href="/css/jquery/jquery.timepicker.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="mCon relate" style="padding:0px 15px;">
        	<div class="main_share myactivity">
            	<div class="blank10px"></div>
                <div class="subChaTab">
                  <a href="/activity/activity_main.html">活动信息</a>
                  <a href="###" class="active">我的活动</a>
                </div>
                <div class="blank10px"></div>
                 

             
                  <div class="actTotal" id="actTotal">
                	<a href="#" class="fuNow" onclick="getActivitybyClick(this,1)"><span>未来及现在活动</span><span id="newTotal">（）</span></a> <a href="#" class="before" onclick="getActivitybyClick(this,2)"><span>历史活动</span><span id="oldTotal">（）</span></a>
                </div>

                 <div class="box221 left">
                	<div class="">
                    	<div class="lsDtit lrArrow">
                        	<p id="searchTitle">未来及现在活动</p>
                  			<span id="pageid"><a href="javascript:void(0);"><img src="../images/none.gif" class='pre'/></a> <a href="javascript:void(0);"><img src="../images/none.gif" class='next hasMore'/></a></span>
                        </div>
                        <div class="actBox">
                        <ul class="actList" id="actList"> </ul>
                        </div>
                    </div>
                </div>
                  
                   

                  
                   <div id="divInfor">
                 <div class="box736 right">    
                    	 
                    <table id="evaluate" border="0" cellspacing="0" cellpadding="0" class="evaluate" width="100%">
                      <tr>
                        <td width="80" class="evaluate_title">评价该活动</td>
                        <td width="20" align="center"><input type="radio" name="like" id="like"/></td>
                        <td width="40"><label for="like">喜欢</label></td>
                        <td width="20" align="center"><input type="radio" name="like" id="dontlike"/></td>
                        <td width="45"><label for="dontlike">不喜欢</label></td>
                        <td width="20" align="center"><input type="radio" name="like" id="justsoso"/></td>
                        <td width="45"><label for="justsoso">一般般</label></td>
                        <td><a href="" class="lblue">查看结果</a></td>
                      </tr>
                    </table>
                    
                       <div class="blank10px"></div>         
                	<div class="myactBrief lh24" id="divActivityInfor"></div>
                    <div class="myactItem" id="divActivityDes" >
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>活动简介</em>
                                <a id="aclickEdit" href="javascript:void(0);" class="aEdit"></a>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="" name="activityIndex"></a>
                            </i>
                        </div>
                        <div class="dCon" id="activityDes"></div> 

                        <div class="dCon" id="activityIndexEdit" style="display:none">
                        	<table width="100%" border="0" cellspacing="1">
                              <tr style="display:none">
                                <td width="14%" align="right">活动发起者：</td>
                                <td width="86%">
                                <select name="vehicle" class="w91" >
                                  <option value="AL">圈子名义发起</option>
                                  <option value="AK">圈子名义发起</option>
                                </select>&nbsp;&nbsp;&nbsp;
                                <select name="ifVehicle" class="w91" >
                                  <option value="AL">圈子名称</option>
                                  <option value="AK">圈子名称</option>
                                </select></td>
                              </tr>
                              <tr>
                                <td align="right">活动名：</td>
                                <td>
                                <input type="text" id="txtActivityName" class="txtInt" style="width:253px;" />&nbsp;&nbsp;&nbsp;
                                <input type="checkbox" class="vInput" id="ifOpen" /><label for="ifOpen">是否公开</label>
                                </td>
                              </tr>
                              <tr>
                                <td align="right">分类标记：</td>
                                <td>
                               <input id="btnactivityac" class="button"  type="button"  value="选择" rel="#ac" />
                                </td>
                              </tr>
                              <tr>
                                <td align="right">&nbsp;</td>
                                <td><div class="select_pep_name" >
                                        <div class="select_name_list clearfix"   id="divActivityTag"" style="width:auto;"> </div>
                                    </div>
                                </td>
                              </tr>
                            </table>
                            
                                <div class="activity_map">
                                    <div class="show_map">
                                        列表查询 &nbsp; &nbsp; <span>地图查找</span> &nbsp; &nbsp; <a href="#"><img src="../images/map_l.png" /></a>
                                    </div>
                                    <div class="addressSet">
 
                                    </div>

                                    <div class="address_info" style="background-color:#fff;">
	<div class="blank10px"></div>
	<table width="100%" border="0" style="border:0; margin:0px;" cellspacing="1" cellpadding="0">
    <tr>
        <td width="14%" align="right">活动地点：</td>
        <td width="86%"><input type="text" class="txtInt" id="txtArea" style="width:340px;" /></td>
    </tr>
         <tr>
          <td  align="right" valign="top">  邮编：</td>
          <td> <input id="txtZip" type="text" class="txtInt" value="邮编" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#B6B6B6'}" style="width:120px; color:#B6B6B6;" /></td> 
       </tr>  
          <tr> 
            <td  align="right" valign="top">地区：</td>
            <td> 
                <input id="txtactivitycountryName" type="text" class="txtInt" disabled="disabled" style="width:120px;" /> 
              
                <input id="txtactivitystateName" type="text" class="txtInt" disabled="disabled" style="width:120px;" /> 
                    
                <input id="txtactivitycityName" type="text" class="txtInt" disabled="disabled" style="width:100px;" /> 
                 
                <input id="selectArea" style="height:29px;" value="选择地区" class="button" type="button" rel="#tt"/></td> 
          </tr>  

         

    <tr>
        <td align="right" valign="top">报名时间：</td>
        <td valign="top">
        	<input type="text" id="txtBmCreate" class="txtInt" value="" style="width:193px;" />&nbsp;&nbsp;
            活动时间 从<input type="text" id="txtStartTime" class="txtInt" value="" style="width:122px;" />&nbsp;&nbsp;到<input id="txtEndTime" type="text" class="txtInt" value="" style="width:122px;" />
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">执行管理员：</td>
        <td valign="top">
        	<input type="text" class="txtInt" value="" style="width:280px;" />&nbsp;&nbsp;
            <%--<select><option>分类名</option></select>--%>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">&nbsp;</td>
        <td valign="top">
        	<div class="select_pep_name">
                  <div class="select_name_list clearfix" style="width:430px;"> <img src="../images/this_pep.png" class="this_pep2">  </div>
                </div>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">财务员：</td>
        <td valign="top">
        	<input type="text" class="txtInt" value="" style="width:280px;" />&nbsp;&nbsp;
            <%--<select><option>分类名</option></select>--%>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">&nbsp;</td>
        <td valign="top">
        	<div class="select_pep_name">
                  <div class="select_name_list clearfix" style="width:430px;"> <img src="../images/this_pep.png" class="this_pep2">  </div>
                </div>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">活动简介：</td>
        <td valign="top">
        	<textarea id="txtActivityIndex" class="txtInt" style="width:580px; height:140px;"></textarea>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top" style="height:40px;">报名费用：</td>
        <td valign="top">
        	<input type="text" id="txtCost" class="txtInt" value="" style="width:124px;" />&nbsp;&nbsp;
            <select><option>缴费方式</option></select>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">预交费用说明：</td>
        <td valign="top">
        	<textarea class="txtInt" style="width:450px; height:58px;"></textarea>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top" style="height:40px;">缴费方式说明：</td>
        <td valign="">
            <select><option>方式选择</option></select>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">&nbsp;</td>
        <td valign="top">
        	<textarea class="txtInt" style="width:450px; height:58px;"></textarea>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top">&nbsp;</td>
        <td valign="top">
        	<input type="checkbox" class="vInput" id="kick" /><label for="kick">启动踢人保护</label> <select><option>保护时限</option></select>
        </td>
    </tr>
    <tr>
        <td align="right" valign="top" style="height:40px;">修改理由：</td>
        <td valign="">
            <textarea class="txtInt" style="width:580px; height:140px;"></textarea>
        </td>
    </tr>
    <tr>
        <td align="right" style="height:80px;">&nbsp;</td> 
        <td valign="">
            <a href="javascript:void(0);" onclick="btnEditSave()" class="btn_127x36">保存</a>
            <a href="javascript:void(0);" onclick="btnEditCancel()" class="btn_127x36_gray">取消</a>
        </td>
    </tr>
    </table>
</div>
                            </div>
                        </div>
                         
                    </div>
                    <div class="myactItem" id="activityPlanView"  >
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>活动计划</em>
                                <a href="javascript:void(0);" onclick="editActivityplan()" class="aEdit"  rel="activityplan" ></a>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="down" name="plan"></a>
                            </i>
                        </div>
                     
                        <div class="dCon dConExt hidden">
                        
                            <div class="activity_mark">
                                
                             <div class="tim_mark_tale">
                                <table width="100%"   height="auto" border="0" cellpadding="0" cellspacing="0"  id="activityPlan" ></table>
                        
                             </div>
                        </div>
                        </div>


                    </div>

                    <div class="myactItem"  id="activityPlanEdit" style="display:none">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>活动计划</em>
                                <a href="javascript:void(0);" ></a>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class=""></a>
                            </i>
                        </div>
                        <div class="dCon dConExt">
                            <div class="activity_mark">
                             <div class="tim_mark_tale">
                                <table width="100%" border="0" cellpadding="0" cellspacing="0"  id="activityEditPlan"></table>
                        
                             </div>
                        </div>
                            <table width="80%" border="0" cellspacing="1">
                          <tr>
                            <td width="25%" align="right">时间：</td> 
                            <td width="75%"> 
                              从
                                <input type="text" id="txtStartPlanDate" class="txtInt" />
                                到
                                <input type="text" id="txtEndPlanDate"  class="txtInt" /></td>
                          </tr>
                          <tr>
                            <td align="right">安排：</td>
                            <td><input type="text" class="txtInt" id="txtPlanTitle" /></td>
                          </tr>
                          <tr>
                            <td align="right" valign="top">备注：</td>
                            <td><textarea name="textarea" class="txtInt" id="txtPlanDes" style="height:88px; width:452px;"></textarea></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td><input type="submit" class="button" value="添加" onclick="updageactivityplanjson()" />&nbsp;&nbsp;<input type="submit" id="btnNull" onclick="setPlanNull()" class="button" value="清空"  /></td>
                          </tr>
                        </table>
                        </div>
                    </div>


                    <div class="myactItem" style="display:none">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>收支财务</em>&nbsp;
                                <span class="simInfo">预算金额<span class="lblue">(1000$)</span> 现收支金额<span class="lblue">(600$)</span> 差额<span class="lblue">(400$)</span></span>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="down" name="finance"></a>
                            </i>
                        </div>
                        <div class="dCon dConExt hidden">
                        	<div class="Fnavigation FnwhiteBg">
                            	<ul class="fix4w">
                            		<li><a href="" class="cur">预算收支项</a></li>
                                	<li><a href="">实际收支项</a></li>
                                </ul>
                            </div>
                            <div class="" style="padding-left:20px; margin:20px 0px;">
                            	<table width="88%"   height="170" border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td>序号：<input type="text"  class="txtInt" style="width:60px;"/>&nbsp;&nbsp;收支名目：<input type="text"  class="txtInt" style="width:150px;"/>&nbsp;&nbsp;预算金额：<select><option>收</option></select>&nbsp;&nbsp;<input type="text"  class="txtInt" style="width:150px;"/></td>
                                  </tr>
                                  <tr>
                                    <td>补充描述：<input type="text"  class="txtInt" style="width:538px;"/></td>
                                  </tr>
                                  <tr>
                                    <td>执行人名：<input type="text" class="txtInt"/>
                                      <select name="select21" class="" >
                                        <option value="AL">活动人员</option>
                                        <option value="AK">活动人员</option>
                                      </select>    <input type="submit" class="button" value="添加"/></td>
                                  </tr>
                                  <tr>
                                    <td>
                                    	<div class="select_pep_name">
                  <div class="select_name_list clearfix" style="width:430px;"> <img src="images/this_pep.png" class="this_pep2"> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> <span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> </div>
                </div>
                                    </td>
                                    </tr>
                                  <tr>
                                    <td align="right">
                                    	<span class="left">操作时间：2011-11-15 23:32 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;财务人员：AAA  </span>
                                        <input type="submit" class="button" value="添加预算名目"/></td>
                                  </tr>
                                  <tr>
                                    <td>
                                    	<input type="checkbox" id="showys" /><label for="showys">显示预算</label>&nbsp;&nbsp;
                                        <input type="checkbox" id="showsz" /><label for="showsz">显示实际收支</label>	
                                    </td>
                                  </tr>
                                </table>
                                <div class="szList">
                                	<table width="100%" class="szTable tc" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <th width="27">&nbsp;</th>
                                        <th width="32">序号</th>
                                        <th width="32">附件</th>
                                        <th width="90">收支名目</th>
                                        <th width="180">描述</th>
                                        <th width="70">收支金额</th>
                                        <th width="90">计划执行人名</th>
                                        <th width="60">财务人名</th>
                                        <th width="80">修改时间</th>
                                        <th class="lrArrow"><a href="javascript:void(0);"><img src="images/none.gif" class='pre'/></a> <a href="javascript:void(0);"><img src="images/none.gif" class='next hasMore'/></a></th>
                                      </tr>
                                      <tr class="nCol">
                                      	<td colspan="10">
                                        	<div class="relate" style="zoom:1;">
                                        	<ins></ins>
                                        	<table width="100%" class="suTable" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                <td width="27"><img src="images/activity/icon_paper.png" /></td>
                                                <td width="32">007</td>
                                                <td width="32"><img src="images/activity/icon_shuqian.png" /></td>
                                                <td width="90">篮球场地费</td>
                                                <td width="180">室内篮球馆20$/小时… </td>
                                                <td width="70">100$/70$</td>
                                                <td width="90">侯建刚</td>
                                                <td width="60">侯建刚</td>
                                                <td width="80">2011/12/23</td>
                                                <td class="opera"><a href="javascript:void(0);" class="icon_Edit"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                              </tr>
                                            </table>
											<table width="100%" class="suTable" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                <td width="27"><img src="images/activity/icon_door.png" /></td>
                                                <td width="32">007</td>
                                                <td width="32"><img src="images/activity/icon_shuqian.png" /></td>
                                                <td width="90">篮球场地费</td>
                                                <td width="180">室内篮球馆20$/小时… </td>
                                                <td width="70">100$/70$</td>
                                                <td width="90">侯建刚</td>
                                                <td width="60">侯建刚</td>
                                                <td width="80">2011/12/23</td>
                                                <td class="opera"><a href="javascript:void(0);" class="icon_Del"></a></td>
                                              </tr>
                                            </table>
                                            </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td><img src="images/activity/icon_paper.png" /></td>
                                        <td>007</td>
                                        <td><img src="images/activity/icon_shuqian.png" /></td>
                                        <td>篮球场地费</td>
                                        <td>室内篮球馆20$/小时… </td>
                                        <td>100$/70$</td>
                                        <td>侯建刚</td>
                                        <td>侯建刚</td>
                                        <td>2011/12/23</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_Edit"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td><img src="images/activity/icon_paper.png" /></td>
                                        <td>008</td>
                                        <td><img src="images/activity/icon_shuqian.png" /></td>
                                        <td>篮球场地费</td>
                                        <td>室内篮球馆20$/小时… </td>
                                        <td>100$/70$</td>
                                        <td>侯建刚</td>
                                        <td>侯建刚</td>
                                        <td>  2011/12/23</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_Edit"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td><img src="images/activity/icon_door.png" /></td>
                                        <td>009</td>
                                        <td>&nbsp;</td>
                                        <td>篮球场地费</td>
                                        <td>室内篮球馆20$/小时… </td>
                                        <td>100$/70$</td>
                                        <td>侯建刚</td>
                                        <td>侯建刚</td>
                                        <td>  2011/12/23</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_Edit"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td><img src="images/activity/icon_door.png" /></td>
                                        <td>010</td>
                                        <td>&nbsp;</td>
                                        <td>篮球场地费</td>
                                        <td>室内篮球馆20$/小时… </td>
                                        <td>100$/70$</td>
                                        <td>侯建刚</td>
                                        <td>侯建刚</td>
                                        <td>  2011/12/23</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_Edit"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                    </table>
                                </div>
								<div class="sum p2em">预算总金额：100$   实际收总金额：120$   实际支出总金额：90$   结算金额：30$</div>
                                <div class="blank10px"></div>
                                <div class="lh24 p2em">（已结算）时间：201/12/12   <select><option>按人数结算</option></select></div>
                                <div class="blank10px"></div>
                                <div class="szList">
                                	<table width="100%" class="jsTable tc" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <th scope="col" width="48">序号</th>
                                        <th scope="col" width="82">属于创建圈子</th>
                                        <th scope="col" width="140">对象名</th>
                                        <th scope="col" width="300">返还或者需缴纳金额</th>
                                        <th scope="col" width="">&nbsp;</th>
                                      </tr>
                                      <tr>
                                        <td>005</td>
                                        <td>是</td>
                                        <td>德州篮球俱乐部</td>
                                        <td>500$</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_my"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td>005</td>
                                        <td>是</td>
                                        <td>德州篮球俱乐部</td>
                                        <td>500$</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_my"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td>005</td>
                                        <td>是</td>
                                        <td>德州篮球俱乐部</td>
                                        <td>500$</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_my"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td>005</td>
                                        <td>是</td>
                                        <td>德州篮球俱乐部</td>
                                        <td>500$</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_my"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                      <tr>
                                        <td>005</td>
                                        <td>是</td>
                                        <td>德州篮球俱乐部</td>
                                        <td>500$</td>
                                        <td class="opera"><a href="javascript:void(0);" class="icon_my"></a> <a href="javascript:void(0);" class="icon_Del"></a></td>
                                      </tr>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="myactItem">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>成员列表</em>&nbsp;&nbsp;
                                <span class="simInfo">现人员数<span class="lblue">(12)</span> 总人员数<span class="lblue">(24)</span></span>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="down" name="memberlist"></a>
                            </i>
                        </div>
                        <div class="dCon dConExt hidden">
                        	<div class="memberList">
                            	<div class="blank10px"></div>
                            	<table width="100%" class="tTable" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="32">&nbsp;</td>
                                    <td width="54">头像</td>
                                    <td width="68">姓名</td>
                                    <td width="68">角色图标</td>
                                    <td width="54">费用</td>
                                    <td width="110">交通</td>
                                    <td width="68">距离</td>
                                    <td width="110">出发地</td>
                                    <td width="68">加入时间</td>
                                    <td width="60">操作</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </table>
                                <table id="tblMember"  width="100%" class="tBody tc" border="0" cellspacing="0" cellpadding="0">
                              
                                </table>
                                <div id="pageMemberid"></div>
                            </div>
                        </div>
                    	<div class="blank10px"></div>
                    </div>
                    <div class="myactItem">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>搭车信息</em>&nbsp;&nbsp;
                                <span class="simInfo">搭车人数<span class="lblue">(4)</span> 总可搭车人数<span class="lblue">(7)</span></span>      
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="" name="bycarinfor"></a>
                            </i>
                        </div>
                        <div class="dCon dConExt">
                        	<div class="blank10px"></div>
                        	 <div id="signup">
                             
                             </div>

                            <div class="blank10px"></div>
                            <div class="memberList" id="memberList" style="display:none">
                            	<div class="blank10px"></div>
                            	<table width="100%" class="tTable" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="32">&nbsp;</td>
                                    <td width="54">头像</td>
                                    <td width="68">姓名</td>
                                    <td width="270">位置</td>
                                    <td width="94">联系方式</td>
                                    <td width="84">费用方式</td>
                                    <td width="84">操作</td>
                                    <td>&nbsp;</td>
                                  </tr>
                                </table>
                                <table width="100%" class="tBody tc" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="32"></td>
                                    <td width="54"><img src="images/activity/a1.gif" width="38" height="38" /></td>
                                    <td width="68"><span class="orange">我自己</span></td>
                                    <td width="270">深圳市南山区凯丽花园<span class="lblue">[<a href="#" target="_blank">地图</a>]</span></td>
                                    <td width="94">13811201120</td>
                                    <td width="84">现金支付</td>
                                    <td width="84">
                                    	<img src="images/activity/icon_stopNotice.png" />
                                    </td>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="32"><img src="images/activity/icon_car.png" /></td>
                                    <td width="54"><img src="images/activity/a1.gif" width="38" height="38" /></td>
                                    <td width="68"><span class="orange">周星驰</span></td>
                                    <td width="270">深圳市南山区凯丽花园<span class="lblue">[<a href="#" target="_blank">地图</a>]</span></td>
                                    <td width="94">13811201120</td>
                                    <td width="84">现金支付</td>
                                    <td width="84">
                                    	<i class="iOpera" onmouseout="this.className='iOpera'" onmouseover="this.className +=' oCur';">
                                        	<i class="selName" onclick="this.parentNode.className += ' oCur'"></i>
                                        	<p class="vMenu">
                                            	<a href="javascript:void(0);" class="fb">接受</a>
                                                <a href="javascript:void(0);" class="">拒绝</a>
                                            </p>
                                        </i>
                                    </td>
                                    <td><a href="javascript:void(0);" class=""><img src="images/activity/icon_close.png"  /></a></td>
                                  </tr>
                                  <tr>
                                    <td width="32"><img src="images/activity/icon_car.png" /></td>
                                    <td width="54"><img src="images/activity/a1.gif" width="38" height="38" /></td>
                                    <td width="68"><span class="orange">周星驰</span></td>
                                    <td width="270">深圳市南山区凯丽花园<span class="lblue">[<a href="#" target="_blank">地图</a>]</span></td>
                                    <td width="94">13811201120</td>
                                    <td width="84">现金支付</td>
                                    <td width="84">
                                    	<i class="iOpera" onmouseout="this.className='iOpera'" onmouseover="this.className +=' oCur';">
                                        	<i class="selName" onclick="this.parentNode.className += ' oCur'"></i>
                                        	<p class="vMenu">
                                            	<a href="javascript:void(0);" class="fb">接受</a>
                                                <a href="javascript:void(0);" class="">拒绝</a>
                                            </p>
                                        </i>
                                    </td>
                                    <td><a href="javascript:void(0);" class=""><img src="images/activity/icon_close.png"  /></a></td>
                                  </tr>
                                  <tr>
                                    <td width="32"><img src="images/activity/icon_car.png" /></td>
                                    <td width="54"><img src="images/activity/a1.gif" width="38" height="38" /></td>
                                    <td width="68"><span class="orange">周星驰</span></td>
                                    <td width="270">深圳市南山区凯丽花园<span class="lblue">[<a href="#" target="_blank">地图</a>]</span></td>
                                    <td width="94">13811201120</td>
                                    <td width="84">现金支付</td>
                                    <td width="84">
                                    	<i class="iOpera" onmouseout="this.className='iOpera'" onmouseover="this.className +=' oCur';">
                                        	<i class="selName" onclick="this.parentNode.className += ' oCur'"></i>
                                        	<p class="vMenu">
                                            	<a href="javascript:void(0);" class="fb">接受</a>
                                                <a href="javascript:void(0);" class="">拒绝</a>
                                            </p>
                                        </i>
                                    </td>
                                    <td><a href="javascript:void(0);" class=""><img src="images/activity/icon_close.png"  /></a></td>
                                  </tr>
                                  <tr>
                                    <td width="32"></td>
                                    <td width="54"><img src="images/activity/a1.gif" width="38" height="38" /></td>
                                    <td width="68"><span class="orange">周星驰</span></td>
                                    <td width="270">深圳市南山区凯丽花园<span class="lblue">[<a href="#" target="_blank">地图</a>]</span></td>
                                    <td width="94">13811201120</td>
                                    <td width="84">现金支付</td>
                                    <td width="84">
                                    	<i class="iOpera" onmouseout="this.className='iOpera'" onmouseover="this.className +=' oCur';">
                                        	<i class="selName" onclick="this.parentNode.className += ' oCur'"></i>
                                        	<p class="vMenu">
                                            	<a href="javascript:void(0);" class="fb">接受</a>
                                                <a href="javascript:void(0);" class="">拒绝</a>
                                            </p>
                                        </i>
                                    </td>
                                    <td><a href="javascript:void(0);" class=""><img src="images/activity/icon_close.png"  /></a></td>
                                  </tr>
                                  <tr class="last">
                                    <td colspan="8" class="tr">
                                    	<a href="javascript:void(0);" class="fb">+加位</a>&nbsp;&nbsp;<a href="javascript:void(0);" class="fb">-减位</a>&nbsp;&nbsp;
                                    </td>
                                  </tr>
                                </table>
                                
                            	<table width="100%" class="tFoot" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td width="32" class="tc"><input type="checkbox" /></td>
                                    <td width="78"><a href="#">全选</a>  <a href="#">反选</a> </td>
                                    <td width="123"><a href="#">提醒缴费</a>  <a href="#">已缴费</a> </td>
                                    <td class="tr"><a href="#">显示更多</a>  首页  上页  1/5  <a href="#">下页</a>  <a href="#">末页</a></td>
                                  </tr>
                                </table>
                            </div>
                        </div>
                        <div class="blank10px"></div>
                    </div>
                    <div class="myactItem" style="display:none">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>行车路线</em>&nbsp;&nbsp;
                                <span class="simInfo">具目的地距离<span class="lblue">(25公里)</span> 预计时间<span class="lblue">(1小时)</span></span>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" class="down" name="carline"></a>
                            </i>
                        </div>
                        <div class="dCon dConExtn hidden">
                        	<div class="liftMap">
                            	<ul>
                                	<li>
                                    	<i class="lName">正烧饭</i>
                                    	<p class="lInfo">大同 距离：60公里 时间：2小时</p>    
                                    </li>
                                	<li>
                                    	<i class="lName">正烧饭</i>
                                    	<p class="lInfo">大同 距离：60公里 时间：2小时</p>    
                                    </li>
                                	<li>
                                    	<i class="lName">正烧饭</i>
                                    	<p class="lInfo">大同 距离：60公里 时间：2小时</p>    
                                    </li>
                                	<li>
                                    	<i class="lName">正烧饭</i>
                                    	<p class="lInfo">大同 距离：60公里 时间：2小时</p>    
                                    </li>
                                	<li>
                                    	<i class="lName">正烧饭</i>
                                    	<p class="lInfo">大同 距离：60公里 时间：2小时</p>    
                                    </li>
                                </ul>
                            </div>
                            <div class="blank10px"></div>
                            <div class="detLiftInfo">
                            	<div class="map"><img src="images/activity/map_1.jpg" width="460" height="402" /></div>
                                <div class=" rBox">
                                	<div class="tNames">
                                    	<a href="javascript:void(0);" class="sLeft pos"></a>
                                        <div class="sBox">
                                        	<ul>
                                            	<li class="cur"><a href="javascript:void(0);">郑少凡</a></li>
                                            	<li><a href="javascript:void(0);">郑少凡</a></li>
                                            	<li><a href="javascript:void(0);">郑少凡</a></li>
                                            	<li><a href="javascript:void(0);">郑少凡</a></li>
                                            </ul>
                                        </div>
                                    	<a href="javascript:void(0);" class="sRight pos"></a>
                                    </div>
                                    <div class="locat locatA">美国某某XXXXOOOOA</div>
                                    <div class="wayMsg">
                                    	<dl>
                                        	<dt>299 英里 - 大约 5 小时 17 分钟</dt>
                                            <dd>1. 从S Federal St向南方向，前往W Van Buren St	<i class="dist">1.7公里</i></dd>
											<dd>2. 向右转，进入W Congress Pkwy	<i class="dist">1.7公里</i></dd>
                                            <dd>3. 下出口后走I-90 E/I-94 E，前往Indiana<i class="dist">1.7公里</i></dd>	
                                            <dd>4 .下 53 出口走I-55 S，前往St Louis	<i class="dist">1.7公里</i></dd>
                                            <dd>5 .下 53 出口走I-55 S，前往St Louis	<i class="dist">1.7公里</i></dd>
                                            <dd>6 .下 53 出口走I-55 S，前往St Louis	<i class="dist">1.7公里</i></dd>
                                        </dl>
                                    </div>
                                    <div class="locat locatB">美国某某XXXXOOOOB</div>
                                </div>
                            </div>
                            <div class="blank10px"></div>
                        </div>
                    </div>
                    <div class="myactItem">
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>天气预报</em>&nbsp;&nbsp;
                                <span><img src="../images/activity/icon_sunny.png" /></span>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" name="weather" class="down"></a>
                            </i>
                        </div>
                        <div class="dCon hidden">
                        	<ul class="myactWeather" id="myactWeather">
                            	
                            </ul>
                        </div>
                        <div class="blank10px"></div>
                    </div>
                    <div class="myactItem" >
                    	<div class="dTit">
                        	<i class="iMark">
                            	<em>留言板</em>
                                <span class="lblue">(23)</span>
                            </i>
                            <i class="iSmark">
                            	<a href="javascript:void(0);" id="ileavemessage" class="down" name="leavemessage"></a>
                            </i>
                        </div>

                        <div class="hd_picpl_box_con" style="width:700px; margin-top:18px;display:none;">
                                <div class="hd_picpl_box">
                                <ins style="left:50px;"></ins>
                                <div class="hd_picpl_mid" style="width:675px;">
                                    <div class="picpl_form_box">
                                    <div>
                                    <input type="text" name="textfield" id="textfield" class="picpl_hf_kuang" hidefocus="ture" style="outline:none;"/> 
                                    <input type="button" name="button"  id="btnhf" onclick="oneLeavalHuifu()" value="回复" class="picpl_hf_an01" tyle="background-color: Transparent;" onmouseover="this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'" onmouseout="this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'"  onfocus="this.blur()"/> 
                                    <input type="button" name="button2" id="btnCancel" value="取消" class="picpl_hf_an02" tyle="background-color: Transparent;" onmouseover="this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'" onmouseout="this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'"  onfocus="this.blur()"/> 
                                    </div>
                                    </div>
                                    <div id="messageContent"> </div>
                                <div id="huifuid" class="huif_more">
                                    <div class="huif_colse_an"><a href="javascript:void(0);" onclick="hideDetReply(this);">收起</a></div>
                                    <div class="huif_open_an"><a href="javascript:void(0);">更多回复</a></div>
                                    </div>
                                </div>
                                </div>
                          </div>   
                 </div>
                	<div class="blank10px"></div>
                	<div class="blank10px"></div>
                </div>
               </div>    
                 <div id="myactSet" class="box736 right myactSet" style="height:580px; display:none;">
                    <div class="myactSet">
                    	<div class="actTit icon_edit " id="activityname">活动名设置</div>
                        <div class="setCon">
                        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td>设定接收邮箱：<input type="text" id="txtcontact_email" class="txtInt" style="width:280px;"/></td>
                              </tr>
                              <tr>
                                <td>
                                <label for="check_1" class="labMarR">重要活动通知</label>
                                <input type="checkbox" class="vInput" id="is_email_event"  /><label for="check_2" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_event" /><label for="check_3">站内信息</label></td>
                              </tr>
                              <tr>
                                <td>
                               <label for="check_4" class="labMarR">订阅活动动态更新</label>
                                <input type="checkbox" class="vInput" id="is_email_updates" /><label for="check_5" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_updates" /><label for="check_6">站内信息</label>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                <label for="check_7" class="labMarR">订阅信息摘要</label>                                
                                <input type="checkbox" class="vInput" id="is_email_digest" /><label for="check_8" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_digest" /><label for="check_9">站内信息</label>
                               时间间隔： <input type="text" id="timeSpan"  class="txtInt tc labMarR" value="2011/12/12 - 2011/12/20" style="width:155px; color:#7F7F7F;"/>  

                                </td>
                              </tr>
                              <tr>
                                <td><label for="check_10">接受圈内人的即时信息</label></td>
                              </tr>
                              <tr>
                                <td>
                                	<div style="padding-left:16px" id="divNameList">
                                	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>例外名单：
                                    <select id="drpUserName"><option value=""></option></select> <input type="button" id="btnAdd" value="添加" class="button" /></td>
                                      </tr>
                                      <tr>
                                        <td><div class="select_pep_name">
                  <div id="selectNamelist" class="select_name_list clearfix" style="width:430px; display:none;" >
                   <img src="../images/this_pep.png" class="this_pep1">
                     </div>
                </div></td>
                                      </tr>
                                      <tr>
                                        <td id="tdBtn"><a href="#" class="btn_127x36">完成</a> <a href="#" class="btn_127x36_gray">取消</a>&nbsp;&nbsp;</td>
                                      </tr>
                                    </table>

                                	</div>
                                </td>
                              </tr>
                            </table>

                        </div>
                    </div>
                </div>
                <!--main end-->
                <div class="blank10px"></div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
    <script src="../Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_common.js" type="text/javascript"></script>

  <%-- <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>  --%>
     <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>


    <script src="../Scripts/activity/activity_leftsidebar.js" type="text/javascript"></script> 
        <script type="text/javascript" src="/Scripts/Plugin/activitycategory/wanerdao2.ac.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script> 
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>  
    <script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script> 
    
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-timepicker-addon.js"></script>
     
      <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script> 
          <script type="text/javascript" src="/Scripts/Plugin/activitycategory/wanerdao2.ac.js"></script>
          <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.overlay.js"></script> 
              <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.cookies.source.js"></script>
       
 <script type="text/javascript" src="/Scripts/activity/activity_settings.js"></script>
    <%--<script src="../Scripts/Plugin/activity/wanerdao2.selfsignupparam.js" type="text/javascript"></script>--%>
     <script src="../Scripts/activity/activity_myactivity.js" type="text/javascript"></script> 
    

    
    
     <script type="text/javascript">
         $(function () {
             $("#txtStartTime").datetimepicker();
             $("#txtEndTime").datetimepicker();
             $("#txtBmCreate").datetimepicker();

             $("#txtStartPlanDate").datetimepicker();
             $("#txtEndPlanDate").datetimepicker();

             $("#btnactivityac").overlay();
             if ($.cookies.get("activitycategorylist") != null) {//分类标记
                 $('#divActivityTag').empty().append($.cookies.get("activitycategorylist"));
             }
         });
         $("#btnactivityac").click(function () {
             wanerdaoac({
                 alphopts: { title: '活动分类', id: 'ac', elementid: 'btnactivityac', callback: function (data) {
                     if (data.result) {
                         //$('#divActivityTag span').remove();
                         //此处填充<span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> 
                         $.each(data.acs, function (i, n) {
                             var temp = '<span style="width:auto;" id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                             temp = temp.replace("{0}", data.acs[i].id);
                             temp = temp.replace("{1}", data.acs[i].id);
                             temp = temp.replace("{2}", data.acs[i].name);
                             if (!($('#divActivityTag span[id="' + data.acs[i].id + '"]') != null
                            && $('#divActivityTag span[id="' + data.acs[i].id + '"]').length >= 1)) {
                                 $('#divActivityTag').append(temp);
                             }

                         });
                         $('#divActivityTag span').click(function () {
                             $(this).remove();
                             //savefrienddata();
                             saveactivitycategorylist();
                         });
                         saveactivitycategorylist();
                     }
                 }
                 }
             });
     });

     function saveactivitycategorylist() {
         $.cookies.set("activitycategorylist", $('#divActivityTag').html());
     };

       
     </script>
</asp:Content>

