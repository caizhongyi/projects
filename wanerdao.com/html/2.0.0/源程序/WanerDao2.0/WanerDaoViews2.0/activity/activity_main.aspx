<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_main.aspx.cs" Inherits="activity_activity_main" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>活动分类-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
    <meta name="keywords" content="活动分类，自定义活动，时令活动，橄榄球，棒球，冰球，足球，篮球，爬山，摄影，羽毛球，网球，露营，高尔夫球，兵乓球，垂钓，自行车，骑马，自助旅行，出海，棋牌，保龄球，玩儿道，生活社交网络" />
    <meta name="description" content="显示分类，分类包括自定义活动，时令活动，橄榄球，棒球，冰球，足球，篮球，爬山，摄影，羽毛球，网球，露营，高尔夫球，兵乓球，垂钓，自行车，骑马，自助旅行，出海，棋牌，保龄球等" />
    <link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/activity.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css"
        media="all" />
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="container pBgC2-1 clearfix">
            <div class="active-main f_left">
                <div class="black10">
                </div>
                <div class="mes_com_box_Tab" id="boxTab">
                    <a href="javascript:;" class="active cateSearch">按分类寻找</a>
                    <a href="javascript:;"  class="mapSearch">按位置查找</a>
                </div>
                <div id="cateSearch" class="content">
                    <ul class="actList  pager-loading" id="actList">
                    </ul>
                    <div class="black10">
                    </div>
                    <div id="pageid">
                    </div>
                </div>
                <div class="black10">
                </div>
                <div class="black10">
                </div>
                <div id="mapSearch" class="content" style="display: none">
                    <div class="searBar">
                        <span class="left">我的位置： <span id="area" style="cursor: pointer;"></span>
                            <input type="text" class="text" id="address" />
                            邮编：<input id="zip" type="text" class="text" onkeyup="clearNoNum(this)" />
                            <input id="locationId" type="hidden" />
                            <input id="latLng" type="hidden" />
                            <%--邮编：<input type="text" class="text" style="width: 88px;" id="postcode" />--%>
                            <%--<select style="width: 70px;">
                            <option>州省</option>
                        </select>
                        <select style="width: 70px;">
                            <option>城市</option>
                        </select>
                        <select style="width: 70px;">
                            <option>国家</option>
                        </select>--%>
                            <a href="javascript:void(0);" class="btn_search" id="search">查找</a> </span>
                    </div>
                    <div class="mapSearch">
                        <div class="map f_left" id="map">
                        </div>
                        <div class="mapCondition f_right">
                            <div id="distHint">
                            </div>
                            <p class="item lh24">
                                <input type="checkbox" class="vInput" id="setHomeAddress" /><label for="setHomeAddress">同步该地址为家庭地址</label></p>
                            <p class="item icon">
                                离家距离：<select style="width: 116px;" id="disToHome">
                                </select></p>
                            <p class="item icon">
                                分类：<input type="button" class="btn_add" value="添加" id="addCategory" /></p>
                            <div class="tipShow">
                                <%--<ins style="left: 140px;"></ins>--%>
                                <p class="tCon" id="categoryArea">
                                </p>
                            </div>
                            <p class="item icon">
                                <input type="checkbox" class="vInput" id="allFriend" /><label for="allFriend">所有好友参加的活动</label></p>
                            <p class="item icon">
                                <input type="checkbox" class="vInput" id="allGroup" /><label for="allGroup">所有圈子参加的活动</label></p>
                        </div>
                        <div class="explain">
                            <b class="lblue">注释：</b><i class="iLocat">活动地址</i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- side -->
            <div class="overflow active-side">
                <div class="activity_event">
                    <a class="Initiating_event_2" href="/activity/activity_create.html">立即发起活动</a></div>
                <div class="active-friend">
                    <h2 class="friend_title">
                        搜索活动</h2>
                    <div class="search_ac">
                        <ul>
                            <li>
                                <input id="txt_activityNames" type="text" inputdefault="关键词请用英文状态的冒号来分隔" value="关键词请用英文状态的冒号来分隔" class="text " data-left="10">
                               <a class="icon act-keyword" href=""></a>
                            </li>
                            <li>
                                <input id="txt_categoryNames" type="text" inputdefault="请选择活动分类" value="请选择活动分类" class="text " data-left="10"><a class="icon act-type" href=""></a>
                            </li>
                            <li>
                                <input id="txt_friendsName" type="text" inputdefault="好友参加的活动" value="好友参加的活动" class="text " data-left="10">
                                <a class="icon act-join" href=""></a>
                            </li>
                            <li>
                                <input id="txt_groupNames" type="text" inputdefault="圈子参加的活动" value="圈子参加的活动" class="text " data-left="10">
                                <a class="icon act-group" href=""></a>
                            </li>
                            <li style="display: none">
                                <input id="txt_sightNames" type="text" inputdefault="景点" value="景点" class="text " data-left="10">
                                <a class="icon act-area" href=""></a>
                            </li>
                            <li>
                                <input id="txtactivitycountryName" type="text" inputdefault="请选择地区" value="请选择地区" class="text " data-left="10">
                                <a class="icon act-country" href=""></a>
                            </li>
                            <li style="display: none">
                                <select id="txtactivitystateName">
                                    <option>所有州省</option>
                                </select>&nbsp;&nbsp;<select><option id="txtactivitycityName">所有城市</option>
                                </select></li>
                        </ul>
                        <input id="search_active" type="submit" class="submit" value="&nbsp;搜&nbsp;索" />
                    </div>
                </div>
                <div class="friend bor">
                    <div class="clearfix friend_title">
                        <h2 class="f_left fb">
                            好友参加的活动<span id="friendTotal"></span></h2>
                        <div id="friendPageid" class="sidebox-pager  f_right">
                            <a href="javascript:void(0);" class="prev"></a><a href="javascript:void(0);" class="next">
                            </a>
                        </div>
                    </div>
                    <ul class="activity_List" id="friendContent">
                    </ul>
                </div>
                <div class="friend bor">
                    <div class="clearfix friend_title">
                        <h2 class="f_left fb">
                            可能感兴趣的活动<span id="interestTotal"></span></h2>
                        <div id="interestPageid" class="sidebox-pager  f_right">
                            <a href="javascript:void(0);" class="prev-disable"></a><a href="javascript:void(0);"
                                class="next"></a>
                        </div>
                    </div>
                    <ul class="activity_List" id="interestContent">
                    </ul>
                </div>
                <div class="friend bor">
                    <div class="clearfix friend_title">
                        <h2 class="f_left fb">
                            最新创建的活动<span id="newTotal"></span></h2>
                        <div id="newactivityPageid" class="sidebox-pager  f_right">
                            <a href="javascript:void(0);" class="prev-disable"></a><a href="javascript:void(0);"
                                class="next-disable"></a>
                        </div>
                    </div>
                    <ul class="activity_List" id="newActivityContent">
                    </ul>
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
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="../scripts/activity/activity_common.js"></script>
    <script src="../scripts/common/wanerdao2.date.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../scripts/plugin/pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_main.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_sidebar.js"></script>
    <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="/scripts/plugin/activitycategory/wanerdao2.ac.js"></script>
    <script type="text/javascript" src="/scripts/gotop.js"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/openplugin/gmap3.js"></script>
    <script src="/scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
</asp:Content>
