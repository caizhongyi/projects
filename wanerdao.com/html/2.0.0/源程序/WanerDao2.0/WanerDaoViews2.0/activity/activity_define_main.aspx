<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_define_main.aspx.cs" Inherits="activity_activity_define_main" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
 <title id="litTitle"></title>
 <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
 <meta name="keywords" content="分类活动，橄榄球，棒球，冰球，足球，篮球，爬山，摄影，羽毛球，网球，露营，高尔夫球，兵乓球，垂钓，自行车，骑马，自助旅行，出海，棋牌，保龄球，玩儿道，生活社交网络" />
 <meta name="description" content="显示主页分类的活动，分类包括橄榄球，棒球，冰球，足球，篮球，爬山，摄影，羽毛球，网球，露营，高尔夫球，兵乓球，垂钓，自行车，骑马，自助旅行，出海，棋牌，保龄球等" />
 <link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../css/activity.css" media="all" />
 <link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
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
             <div class="activity_description"></div>
             <div class="pageList list-header"></div>
      		 <ul class="active-list"> </ul>
             <div class="pageList list-footer"></div>
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
<%--              <div class="friend">             
                <div class="clearfix friend_title">
                      <h2 class="f_left fb">相关圈子推荐<span  id="groupTotal"></span></h2>
                      <div class="sidebox-pager  f_right"  id="groupPageid"><a href="javascript:void(0);" class="prev-disable" ></a> <a href="javascript:void(0);" class="next-disable" ></a>
                      </div>
				 </div>
                <div class="relaCircle">
                	<ul  id="groupContent"></ul>
                </div>
              </div>--%>
            </div>
            <!-- side -->
    </div>
 </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script type="text/javascript" src="../scripts/activity/activity_common.js" ></script>
    <script type="text/javascript" src="../scripts/common/wanerdao2.date.js"></script>
    <script type="text/javascript" src="../../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
    <script type="text/javascript"> var section_type = '3', opertype = 'activitydefinepagesearchactivity';</script> 
    <script type="text/javascript" src="../scripts/activity/activity_category_main.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_sidebar.js"></script>
    <!-- 以下地区控件弹出框js -->
    <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="/scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
</asp:Content>

