<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_create.aspx.cs" Inherits="activity_activity_create" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>发起活动-活动-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="发起活动，初始参数引用，基本参数设定，报名参数设定，邀请发送，个人报名，参数保存，玩儿道，生活社交网络" />
<meta name="description" content="选择列表式或者导向式完成填写初始参数引用，基本参数设定，报名参数设定，邀请发送，个人报名和参数保存后发起活动" />
<link rel="stylesheet" type="text/css" href="/css/activity_create.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
 <link rel="stylesheet" type="text/css" href="/scripts/jquery.chosen/jquery.chosen.css" media="all" />
 <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.21/themes/ui-lightness/jquery-ui.css"  media="all" />
 <link rel="stylesheet" type="text/css" href="/css/plugin/timepicker/jquery-ui-timepicker-addon.css" media="all" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="activity_create layout">
      <div id="container" class="activity_create w_1004 pBgC2">
          <div class="activity_createMainList">
                <div class="mainTitile">
                    <div class="mes_com_box_Tab"><a href="javascript:;" class="active">创建活动</a></div>
               </div>
                <div class="modSwitch">
                    <label for="listStyle">
                          <input type="radio" class="radio" name="info_type" id="listStyle" checked="checked" />
                          列表模式填写</label>
                    <label for="guiteStyle">
                          <input type="radio" class="radio" name="info_type" id="guiteStyle" />
                          向导模式填写</label>
               </div>
                <h2><b>发起活动</b></h2>
                <div id='activity_t1' class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="basicQuote" id="basicQuote"></a>初始参数引用</b></h3>
                    
               </div>
                <!-- 初始参数引用 -->
                <div id='activity_t2' class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="basicSet" id="basicSet"></a>基本参数设定</b></h3>
               </div>
                <!-- 基本参数设定 -->
                <div id="activity_t3" class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="applySet" id="applySet"></a>报名参数设定</b></h3>                    
                    <!-- 拟定预算 --> 
               </div>
                <!-- 报名参数设定 -->
                <div id="activity_t4" class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="sendInvite" id="sendInvite"></a>发送邀请</b></h3>
                    
               </div>
                <!-- 发送邀请 -->
                <div id="activity_t5" class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="applyPerson" id="applyPerson"></a>个人报名</b></h3>
                    
               </div>
                <!-- 个人报名 -->
                <div id="activity_t6" class="ACmodList">
                    <h3><b class="square ACmodListTitle"><a name="saveParameter" id="saveParameter"></a>参数保存</b></h3>
                    
               </div>
                <!-- 参数保存 -->
                <div class="btn-warp">
               </div>
           </div>
          <div class="activity_createWidget pR">
                <div class="verifyWarp pA" id="verifyWarp">
                    <ul class="fSize-14 fCwhite">
                          <li class="array1"><span class="f_right">&nbsp;</span><a id="basicQuoteSwitch" href="#basicQuote">初始参数应用</a></li>
                          <li class="array2"><span class="f_right">&nbsp;</span><a href="#basicSet">基本参数设置</a></li>
                          <li class="array3"><span class="f_right">&nbsp;</span><a href="#applySet">报名参数设定</a></li>
                          <li class="array4"><span class="f_right">&nbsp;</span><a id="sendInviteSwitch" href="#sendInvite">邀请发送</a></li>
                          <li class="array5"><span class="f_right">&nbsp;</span><a id="applyPersonSwitch" href="#applyPerson">个人报名</a></li>
                          <li class="array6"><span class="f_right">&nbsp;</span><a id="saveParameterSwitch" href="#saveParameter">参数保存</a></li>
                     </ul>
               </div>
           </div>
          <div class="clear2"></div>
     </div>
 </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script type="text/javascript" src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/gotop.js"></script>
    <script type="text/javascript" src="/scripts/activity/activity_infotype.js"></script>
    <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.utility.js"></script>
    <script type="text/javascript" src="/scripts/activity/activity_common.js"></script>
    <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.optionpanel.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery.cookies.source.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery.defaultvalue.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery.json-2.3.min.js"></script>
     <script type="text/javascript" src="/scripts/jquery.chosen/jquery.chosen.js"></script>
     <script type="text/javascript" src="/scripts/openplugin/jquery-ui-timepicker-addon.js"></script>
     <script type="text/javascript" src="/scripts/plugin/invitation/wanerdao2.invitation.cookie.js"></script>
     <script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
     <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
     <script type="text/javascript" src="../../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
     <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.initrefparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.baseparam.js"></script>
     <script type="text/javascript" src="../../scripts/plugin/activitycategory/wanerdao2.ac.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.basesignupparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.selfsignupparam.js"></script>
     <script type="text/javascript" src="/scripts/plugin/activity/wanerdao2.saveparam.js"></script>
     <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/openplugin/gmap3.js"></script>
      <script type="text/javascript">
     $(function () {
         $(window).scroll(function () {
             if ($(document).scrollTop() > 0) { $('#verifyWarp').css('top', $(document).scrollTop() - 69); }
             else { $('#verifyWarp').css('top', 0) }
         });
         $("#activity_t1").initrefparam();
         $("#activity_t2").baseparam();
         $("#activity_t3").basesignupparam();
         $("#activity_t4").inviter();
         //个人报名
         $("#activity_t5").selfsignupparam();
         $("#activity_t6").saveparam();
         $(".btn-warp").optionpanel({ showstep: false });
     });
      </script>
</asp:Content>

