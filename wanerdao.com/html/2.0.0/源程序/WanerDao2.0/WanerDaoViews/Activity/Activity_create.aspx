<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_create.aspx.cs" Inherits="Activity_Activity_create" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="/css/activity.css" rel="stylesheet" type="text/css" />
    <link href="/css/PluginCss/pop.css" rel="stylesheet" type="text/css" />
    <link href="/css/PluginCss/Pagination/wanerdao2.pagination.css" rel="stylesheet" type="text/css" />
    <link href="/css/jquery/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
    <link href="/css/jquery/jquery.timepicker.css" rel="stylesheet" type="text/css" />  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="actMain jz">
  <div class="mCon relate" style="padding:0px 15px;">
    <div class="activity main_share" style="padding:25px 0;">
      <div class="subChaTab"> <a href="#" class="active">创建活动</a> </div>
      <p class="info_type">
        <input type="radio" name="info_type" id="listStyle" checked="checked"/>
        <label for="listStyle">列表式填写</label>
        <input type="radio" name="info_type" id="guiteStyle"/>
        <label for="guiteStyle">导向式填写</label>
      </p>
      <h3 class="event_h3 yh" style="border-bottom:0;">发起活动</h3>
      <h2 class="activity_t" id='activity_t1'>初始参数引用</h2>
      <div class="blank10px" "></div>
      
      <h2 class="activity_t" id='activity_t2'>基本参数设定</h2>

      <div class="blank10px"></div>
      <h2 class="activity_t" id='activity_t3'>报名参数设定</h2>
      
      <div class="blank10px"></div>
      <h2 class="activity_t" id='activity_t4'>发送邀请</h2>
      
      
      <div class="blank10px"></div>
      <h2 class="activity_t" id='activity_t5'>个人报名</h2>
      
      <div class="blank10px"></div>
      <h2 class="activity_t" id='activity_t6'>参数保存</h2>

      <div class="next_pre"></div>
    </div>
    <div class="Suspension yh" id="Suspension"> 
        <a href="#activity_t1"><i>1</i>初始参数引用</a> 
        <a href="#activity_t2"><i>2</i>基本参数设定</a> 
        <a href="#activity_t3"><i>3</i>报名参数设定</a> 
        <a href="#activity_t4"><i>4</i>发送邀请</a> 
        <a href="#activity_t5"><i>5</i>个人报名</a> 
        <a href="#activity_t6"><i>6</i>参数保存</a> 
    </div>
  </div>
</div>
    <!--页面脚本区-->
    <script type="text/javascript" src="/Scripts/common/wanroad.js"></script>    
    <script src="/Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/Scripts/Plugin/Pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-1.8.18.custom.min.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.cookies.source.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jcarousellite.js"></script>
    <script type="text/javascript" src="/Scripts/Plugin/activitycategory/wanerdao2.ac.js"></script>
    <script type="text/javascript" src="/Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
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
    //$("#activity_t2").baseparam();
    $(function () {
        $("#activity_t1").initrefparam();
        $("#activity_t2").baseparam();
        $("#activity_t3").basesignupparam();
        //邀请
        $("#activity_t4").inviter();
        //个人报名
        $("#activity_t5").selfsignupparam();
        //参数保存
        $("#activity_t6").saveparam();
        $(".next_pre").optionpanel({ showstep: false });
    })
</script>
</asp:Content>

