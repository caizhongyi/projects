<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_index.aspx.cs" Inherits="activity_activity_index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>活动信息-活动-玩儿道</title>
<!--<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />-->
<meta name="keywords" content="活动信息，玩儿道，生活社交网络" />
<meta name="description" content="显示活动的基本信息，包括活动名，活动地点，活动时间，人数，报名截止日期，报名条件，初始费用，报名方式，活动描述，活动计划，预算拟定等" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/activity_i.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<script type="text/javascript" src="../scripts/gotop.js"></script>
<script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="activityMain layout">
	<div id="container" class="activity_create w_1004 pBgC">
		<div class="AC_Guide">
            <div class="event_plan"> </div>
              <div class="actBrief">
            <h2 class="activity_t">活动描述</h2>   
            <p class="activity_C" id="activityDes"></p>
            <h2 class="activity_t">活动计划</h2>     
            <ul class="activity_C" id="ulactivityPlan" > </ul>
            <h2 class="activity_t">预算拟定</h2>     
            <ul class="activity_C" id="ulactivityYusuan"> </ul>
            </div>
            
		</div>
	</div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script src="../scripts/activity/activity_index.js" type="text/javascript"></script>
<script type="text/javascript" src="/scripts/common/wanerdaoutils.js"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/authorization/wanerdao2.authorization.js"></script>
</asp:Content>

