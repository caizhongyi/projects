<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_index.aspx.cs" Inherits="Activity_Activity_index" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server"> 
  <link href="../style/activity.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
    	<div class="mCon">
            <div class="event_plan">
              <h2 class='activity_index yh' id="activity_name"></h2>
              <p class="event_plan_l" id="activityImg"></p>
              <div class="event_plan_r"  id="event_plan_r"></div>
              </div>
              <div class="actBrief">
            <h2 class="activity_t">活动描述</h2>   
            <p class="activity_C" id="activityDes"> </p>
            <h2 class="activity_t">活动计划</h2>     
            <p class="activity_C"  id="activityPlan"></p>
            <h2 class="activity_t">预算拟定</h2>     
            <p class="activity_C"  id="activityBudget"></p>
            </div>
              <div class="blank5px"></div>
        </div>
 </div>
 <div class="mBtm jz"></div>
 <script src="../Scripts/activity/activity_index.js" type="text/javascript"></script>
</asp:Content>

