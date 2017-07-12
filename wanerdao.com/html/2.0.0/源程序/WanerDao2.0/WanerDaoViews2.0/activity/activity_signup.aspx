<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_signup.aspx.cs" Inherits="activity_activity_signup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>报名活动-活动-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="报名活动，交通方式，确定起始信息，确定联系方式，费用缴纳，发送邀请，玩儿道，生活社交网络" />
<meta name="description" content="填写交通方式，确定起始信息，确定联系方式，费用缴纳，发送邀请后完成报名活动" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/activity.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/activity_create.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
<script type="text/javascript" src="../scripts/global.js"></script>
<script type="text/javascript" src="../scripts/gotop.js"></script>
<script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="activityMain layout">
  <div id="container" class="container pBgC2-1 clearfix">
    <div class="active-main f_left">
      <div class="black10"></div>
      <div class="black10"></div>
      <div class="mes_com_box_Tab"> <a href="/activity/activity_main.html" class="active">活动信息</a> <a href="/activity/activity_myactivity.html">我的活动</a> </div>
      <div class="black10"></div>
      <div id="activityInfor"></div>
      <div id="activityPlanInfor" style="display:none">
      <div class="stepTip">填写下面五步信息，完成申请加入</div>
      <div class="light-blue-box">
        <h2 class="box-hd" >交通方式</h2>
        <div id="activity_t5"></div>
    
      </div>
      <div class="light-blue-box">
        <h2 class="box-hd" >确定起始地址</h2>

        <div style="margin-top:10px;margin-left:64px;">
         <label><span class="label"><input id="chkStartAddressdd" type="checkbox"/> </span>该地址为家庭地址，同步到个人信息 </label>
         
         <input type="text" class="text" name="txtAcArea" id="txtAcArea" style="width:200px;"/>
        </div>

      </div>
      <div class="light-blue-box">
        <h2 class="box-hd" >确定联系方式</h2>
        <ul class="form  active-form box-bd">
          <li>
            <label><span class="label">
              <input  type="checkbox" id="chkLink" />
              </span>该联系方式为个人联系方式，同步到个人信息</label>
          </li>
          <li>
            <label><span class="label">电话：</span>
              <input id="txtPhone" type="text" class="text"/>
            </label>
            <label>邮箱：
              <input id="txtEmail" type="text" class="text"/>
            </label>
          </li>
        </ul>
      </div>
      <div class="light-blue-box">
        <h2 class="box-hd" >费用交纳</h2>
        <div class="payment">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody id="tb_payment"></tbody>
          </table>
        </div>
        <div class="payment-condition">
          <p class="totalMoney" id="totalMoney"></p>
          <p style="display:none" >请交纳（<em>360$</em>）给（<em>侯小刚</em>），缴费原因及用途，缴费性质，缴费方式说明：</p>
          <textarea  style="display:none" class="textarea"></textarea>
          <p style="display:none">
            <label>
              <input type="radio" id="taxed"  name="tax">
              已缴费，通知财务</label>
            &nbsp;&nbsp;
            <label for="wtax">
              <input type="radio" id="wtax"  name="tax">
              稍后缴税</label>
          </p>
        </div>
      </div>
      <div class="light-blue-box">
        <h2 class="box-hd" id="activity_t4">发送邀请</h2>
      </div>
      <div class="btn-warp">
        <input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14"  onclick="activitysignup()" value="提交申请" id="btnactivitysignup"/>
      </div>
      </div>
    </div>
    <!-- side -->
      <div class="overflow active-side">
              <div class="activity_event"><a class="Initiating_event_2" href="/activity/activity_create.html" ">立即发起活动</a></div>
              <div class="active-friend">
                <h2 class="friend_title">搜索活动</h2>
                <div class="search_ac">
                     <ul>
                     	<li><input   id="txt_activityNames" type="text" inputdefault="关键词请用英文状态的冒号来分隔" value="关键词请用英文状态的冒号来分隔"  class="text "/><a class="icon  act-keyword" href="###"></a></li>
                        <li><input   id="txt_categoryNames" type="text" inputdefault="请选择活动分类" value="请选择活动分类"  class="text"/><a class="icon  act-type" href="###"></a></li>
                        <li><input   id="txt_friendsName"   type="text" inputdefault="好友参加的活动" value="好友参加的活动"  class="text"/><a class="icon act-join" href="###"></a></li>
                        <li><input   id="txt_groupNames"    type="text" inputdefault="圈子参加的活动" value="圈子参加的活动" class="text"/><a class="icon act-group" href="###"></a></li>
                        <li style="display:none"><input id="txt_sightNames"  type="text" inputdefault="景点" value="景点"  class="text"/><a class="icon act-area" href="###"></a></li>
                        <li><input id="txtactivitycountryName" type="text" inputdefault="请选择地区" value="请选择地区"  class="text"/><a class="icon act-country" href="###"></a></li>
                        <li style="display:none"><select  id="txtactivitystateName"><option>所有州省</option></select>&nbsp;&nbsp;<select><option id="txtactivitycityName">所有城市</option></select></li>
                     </ul>
                     <input id="search_active"  type="submit" class="submit" value="&nbsp;搜&nbsp;索"/>
                 </div>
              </div>
              <div class="friend bor">
              	 <div class="clearfix friend_title">
                      <h2 class="f_left fb">好友参加的活动<span id="friendTotal"></span></h2>
                      <div  id="friendPageid" class="sidebox-pager  f_right"><a href="javascript:void(0);" class="prev" ></a> <a href="javascript:void(0);" class="next" ></a>
                      </div>
				 </div>
                <ul class="activity_List" id="friendContent">
                </ul>
              </div>
              <div class="friend bor">
                 <div class="clearfix friend_title">
                      <h2 class="f_left fb">可能感兴趣的活动<span  id="interestTotal"></span></h2>
                      <div  id="interestPageid" class="sidebox-pager  f_right"><a href="javascript:void(0);" class="prev-disable" ></a> <a href="javascript:void(0);" class="next" ></a>
                      </div>
				 </div>
                <ul class="activity_List"   id="interestContent" ></ul>
              </div>
              <div class="friend bor"> 
                 <div class="clearfix friend_title">
                      <h2 class="f_left fb">最新创建的活动<span  id="newTotal"></span></h2>
                      <div  id="newactivityPageid" class="sidebox-pager  f_right"><a href="javascript:void(0);" class="prev-disable" ></a> <a href="javascript:void(0);" class="next-disable" ></a>
                      </div>
				 </div>
                <ul class="activity_List"   id="newActivityContent"> </ul>
              </div>
              <div class="friend">             
                <div class="clearfix friend_title">
                      <h2 class="f_left fb">相关圈子推荐<span  id="groupTotal"></span></h2>
                      <div class="sidebox-pager  f_right"  id="groupPageid"><a href="javascript:void(0);" class="prev-disable" ></a> <a href="javascript:void(0);" class="next-disable" ></a>
                      </div>
				 </div>
                <div class="relaCircle">
                	<ul  id="groupContent"></ul>
                </div>
              </div>
            </div>
    <!-- side --> 
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script type="text/javascript" src="../scripts/activity/activity_common.js" ></script>
    <script type="text/javascript" src="../scripts/common/wanerdao2.date.js"></script>
    <script type="text/javascript" src="../../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
    <script type="text/javascript">var vcategory_name = "";</script>
    <script type="text/javascript" src="../scripts/activity/activity_sidebar.js"></script>
    <script type="text/javascript" src="../scripts/jquery.json-2.3.min.js" ></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/authorization/wanerdao2.authorization.js"></script>
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script>
    <script type="text/javascript" src="../scripts/plugin/activity/wanerdao2.selfsignupparam.js"></script>
    <script type="text/javascript" src="/scripts/plugin/invitation/wanerdao2.invitation.js"></script>
    <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_signup.js" ></script>
</asp:Content>

