<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_create_step.aspx.cs" Inherits="Activity_Activity_create_step" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="/css/activity.css" rel="stylesheet" type="text/css" />
    <link href="/css/PluginCss/pop.css" rel="stylesheet" type="text/css" />
    <link href="/css/PluginCss/Pagination/wanerdao2.pagination.css" rel="stylesheet" type="text/css" />
    <link href="/css/jquery/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
    <link href="/css/jquery/jquery.timepicker.css" rel="stylesheet" type="text/css" />  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
  <div class="mCon">
    <div class="layout_m ">
      <div class="main_share">
        <div class="blank10px"></div>
        <div class="subChaTab"> <a href="#" class="active">创建活动</a> </div>
        <p class="info_type">
          <input type="radio" name="info_type" id="listStyle"/>
          <label for="listStyle">列表式填写</label>
          <input type="radio" name="info_type" id="guiteStyle" checked="checked"/>
          <label for="guiteStyle">导向式填写</label>
        </p>
        <h3 class="event_h3 yh">发起活动</h3>

        <div class="next_pre"></div>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<!--页面脚本区-->
    <script type="text/javascript" src="/Scripts/common/wanroad.js"></script>    
    <script type="text/javascript" src="/Scripts/Plugin/Pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.cookies.source.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jcarousellite.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activitycategory/wanerdao2.ac.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.stepslink.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.initrefparam.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.baseparam.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/Search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.basesignupparam.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/Search/wanerdao2.activityinvite.cookie.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.selfsignupparam.cookie.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.saveparam.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.utility.js"></script>
    <script type="text/javascript" src="/Scripts/activity/activity_infotype.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activity/wanerdao2.optionpanel.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/TipPop/wanerdao2.pop.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/Area/wanerdao2.area.js"></script>
        <script type="text/javascript">
            $(function () {
                $(".event_h3").stepslink();
                $(".next_pre").optionpanel();
            })
    </script>
</asp:Content>

