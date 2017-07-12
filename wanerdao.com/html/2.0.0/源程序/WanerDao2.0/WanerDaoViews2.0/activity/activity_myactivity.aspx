<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_myactivity.aspx.cs" Inherits="activity_activity_myactivity" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>我的活动-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
    <meta name="keywords" content="历史活动，活动简介，活动计划，财务收支，成员列表，搭车信息，行车路线，天气预报，留言板，玩儿道，生活社交网络" />
    <meta name="description" content="用户从历史活动中选择以后，按模块活动简介，活动计划，财务收支，成员列表，搭车信息，行车路线，天气预报，留言板" />
    <link rel="stylesheet" type="text/css" href="../css/activity_myhistory.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/activity_create.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css"
        media="all" />
    <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.21/themes/ui-lightness/jquery-ui.css"
        media="all" />
    <link rel="stylesheet" type="text/css" href="/css/plugin/timepicker/jquery-ui-timepicker-addon.css"
        media="all" />
    <style type="text/css">
        .basicQuote dd.formTitle
        {
            width: 100px;
        }
    </style>
    <script type="text/javascript" src="../scripts/global.js"></script>
    <script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="activity_myhistory w_1004 pBgC">
            <div class="myhistroyTitle">
                <div class="black10">
                </div>
                <div class="black10">
                </div>
                <div class="mes_com_box_Tab">
                    <a href="/activity/activity_main.html">活动信息</a> <a class="active" href="/activity/activity_myactivity.html">
                        我的活动</a>
                </div>
            </div>
            <!-- myhistoryMenu -->
            <div class="AM_photoEditWarp">
                <div class="MyactivitySet_Widget f_left">
                    <h4>
                        <a href="javascript:;" class="fCblue" style="padding: 0 0 0 5px;" id="bnew" onclick="getactivitybyclick(this,'new')">
                        </a><a href="javascript:;" class="fCgray3" onclick="getactivitybyclick(this,'old')" id="bold">
                        </a>
                    </h4>
                    <h5 class="MyactivitySet_title">
                        <span id="currenttitle"></span>
                        <div class="sidebox-pager">
                            <a class="prev" href="javascript:;"></a><a class="next" href="javascript:;"></a>
                        </div>
                    </h5>
                    <ul class="activityList_Will">
                    </ul>
                </div>
                <!--pohtoedit widget -->
                <div id="myactivityBody" class="MyactivitySet_Main f_left" style="margin: 4px auto;">
                    <div class="myhistoryMenu">
                        <ul>
                            <li><a class="current" href="javascript:void(0);">活动信息及评论</a></li>
                            <li><a id="viewmanagerblog" href="activity_blog.html?id={0}">浏览发表管理感想</a></li>
                            <li><a id="viewalbum" href="activity_album_view.html?id={0}">浏览相册</a></li>
                            <li><a id="uploadalbum" href="activity_album_upload.html?id={0}">上传相片</a></li>
                            <li><a id="editphoto" href="activity_photo_edit.html?id={0}">管理相册</a></li>                            
                        </ul>
                    </div>
                    <div class="ACmod mb10">
                        <h4 class="tBgb" id="happraise" style="display:none; margin-bottom:15px;">
                            <b class="icon16 square fSize-12 fCgray3">评价该活动</b>&nbsp;
                            <label for="" class=" fSize-12">
                                <input type="radio" name="" id="" />
                                &nbsp;喜欢&nbsp;</label>
                            <label for="" class=" fSize-12">
                                <input type="radio" name="" id="" />
                                &nbsp;不喜欢&nbsp;</label>
                            <label for="" class=" fSize-12">
                                <input type="radio" name="" id="" />
                                &nbsp;一般般&nbsp;</label>
                            <a href="#" class=" fSize-12">查看结果</a></h4>
                        <div id="activityinfor" class="tBgb introduction fCblcak2" style="
                            border: 1px solid #cbdfeb; display: none;">
                        </div>
                    </div>
                    <div id="activitymanageinfo" style="display: none">
                        <div class="ACmod">
                            <h4 class="tBgb">
                                <span id="speditinfor" class="f_right">
                                    <input type="button" class="buttonB btn_w108 btn_h26 btnBlue_108 fSize-12" onclick="copyUrl()"
                                        value="复制活动连接" />
                                    &nbsp;&nbsp;
                                    <input type="button" id="btnmanagefllow" class="buttonB btn_w70 btn_h26 btnBlue_70 fSize-12"
                                        value="" />
                                    &nbsp;&nbsp;</span><b class="icon16 square fSize-14 fCgray3">活动简介</b></h4>
                            <div class="setMod" id="setactivitymanageinfo">
                                <div id='activity_t1' class="ACmodList">
                                </div>
                            <dl>
                                <dd class="formTitle">
                                    &nbsp;</dd>
                                <dd class="formMain">
                                    &nbsp;
                                    <input type="button" class="buttonB btn_w100 btn_h36 btnBlue_100 fSize-14"  id="btnmanagesave"  value="保存" />
                                    &nbsp;
                                    <input type="button" id="btnmanageicancle" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14"
                                        value="取消" />
                                </dd>
                            </dl>
                            <dl class="clear2" />
                          </div>
                        </div>
                    </div>
                    <%-- 活动简介 --%>
                    <div class="ACmod mb10" id="divactivitydes">
                        <h4 id="hactivitydes" class="tBgb myact-opera">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">活动简介</b><a
                                href="javascript:void(0);" id="iconctivitydes" name="activityindex" class="ico icon_3"
                                title="编辑"></a></h4>
                        <div class="setMod" style="display: none">
                            <p id="activitydes" class="activityIntroduction fCgray mod-inner" style="text-indent: 2em;">
                            </p>
                        </div>
                    </div>
                    <%--活动计划 --%>
                    <div class="ACmod mb10">
                        <a href="###" name="plan"></a>
                        <h4 id="hactivityplan" class="tBgb myact-opera">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">活动计划</b><a
                                href="javascript:void(0);" id="iconactivityplan" class="ico icon_3" title="编辑"></a></h4>
                        <div class="setMod" id="viewdivactivityplan" style="display: none">
                            <p id="pactivityplan" class="fCgray mod-inner">
                            </p>
                        </div>
                        <div class="setMod" id="setdivactivityplan" style="display: none">
                            <div class="timelineWarp" style="display: none">
                                <div class="timelineMain">
                                    <ul>
                                        <li>&nbsp;</li>
                                        <li class="current timelineBtm timelineTop">&nbsp;
                                            <p class="tips_B fCwhite fSize-12">
                                                2011/02/12</p>
                                            <div class="tipsWarp">
                                                <div class="tipsTop">
                                                </div>
                                                <div class="tipsMain fSize-12 fCgray3">
                                                    <p>
                                                        5：00-12：00 早市集DOTA</p>
                                                    <p>
                                                        16:00-20:00 南山集会品茶活动</p>
                                                </div>
                                                <div class="tipsBottom">
                                                    &nbsp;</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tabWarp_Gray">
                                <table id="tblactivityplan" cellpadding="0" cellspacing="0" border="0" background="#ededed"
                                    width="662" class="preparedList fSize-12 fCgray3">
                                </table>
                            </div>
                            <dl>
                                <dd class="formTitle">
                                    时间：</dd>
                                <dd class="formMain">
                                    &nbsp;从&nbsp;
                                    <input type="text" class="text" id="txtStartPlanDate" />
                                    &nbsp;到&nbsp;
                                    <input type="text" class="text" id="txtEndPlanDate" />
                                </dd>
                            </dl>
                            <dl class="clear2">
                            </dl>
                            <dl>
                                <dd class="formTitle">
                                    安排：</dd>
                                <dd class="formMain">
                                    <input type="text" class="text" id="txtPlanTitle" maxlength="50" />
                                </dd>
                            </dl>
                            <dl class="clear2">
                            </dl>
                            <dl>
                                <dd class="formTitle">
                                    备注：</dd>
                                <dd class="formMain">
                                    <textarea id="txtPlanDes" cols="69" rows="6"></textarea>
                                    &nbsp;</dd>
                            </dl>
                            <dl class="clear2">
                            </dl>
                            <dl>
                                <dd class="formTitle">
                                    &nbsp;</dd>
                                <dd class="formMain">
                                    <input type="button" id="btnplanadd" value="添加" onclick="updageactivityplanjson()" class="buttonG btn_w56 btn_h28 btnGary_56" />
                                    <input type="button" value="清空" onclick="setplannull()" class="buttonG btn_w56 btn_h28 btnGary_56" />
                                </dd>
                            </dl>
                            <dl class="clear2">
                            </dl>
                        </div>
                    </div>
                    <%-- 收支财务 --%>
                    <div class="ACmod mb10">
                        <a href="###" name="finance"></a>
                        <h4 id="hfinance" class="tBgb fSize-12">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">收支财务&nbsp;&nbsp;</b><small
                                class="fSize-12">预算金额</small><small class="fCblue fSize-12" id="sfinancebudget"></small><small
                                    class="fSize-12">现收支金额</small><small class="fCblue fSize-12" id="sfinanceflow"></small><small
                                        class="fSize-12">差额</small><small class="fCblue fSize-12" id="sfinancebalance"></small></h4>
                        <div class="setMod" style="margin-top:0; display: none">
                            <div class="myhistoryMenu">
                                <ul>
                                    <li><a id="afinancebudget" href="###" class="current">预算收支项目</a></li>
                                    <li><a id="afinancecurrent" href="###">实际收支项目</a></li>
                                </ul>
                            </div>
                            <div id="divbudget">                           
                            <div class="harvestPayWarp">
                                <table id="tbbudgetlist" width="100%" border="0" cellspacing="0" cellpadding="0"
                                    class="harvestPayTable table-fixed">
                                </table>
                            </div> 
                            <div id="activity_t6" class="setmodList preparedbudget">
                            </div>
                           
                            <dl class="clear2" />
                           
                            </div>
                        
                              <div id="divmoneyflow">                           
                            <div class="harvestPayWarp">
                                <table id="tbMoneyList" width="100%" border="0" cellspacing="0" cellpadding="0"
                                    class="harvestPayTable table-fixed">
                                </table>
                            </div> 
                            <div id="activity_t7" class="setmodList preparedbudget">
                            </div>
                          
                            </div>
                               <dl>
                                <dd class="formTitle fCblue">
                                    &nbsp;</dd>
                                <dd class="formMain fCblue" id="budgetgether">
                                    预算总金额：100$ 实际收总金额：120$ 实际支出总金额：90$ 结算金额：30$</dd>
                            </dl>
                            <dl class="clear2" />
                        <%--    <div id="divcurrentfinance" style="display:none;"></div>--%>

                            <dl style="display: none">
                                <dd class="formTitle">
                                    &nbsp;</dd>
                                <dd class="formMain">
                                    （已结算）结算时间：2011/12/12&nbsp;&nbsp;&nbsp;
                                    <select name="" id="">
                                        <option value="按人数结算">按人数结算</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl class="clear2">
                            </dl>
                            <div class="tabWarp_Gray" style="padding: 7px 7px; display: none;">
                                <table cellpadding="0" cellspacing="0" border="0" background="#ededed" width="100%"
                                    class="preparedList fSize-12 fCgray3">
                                    <tr>
                                        <th>
                                            序号
                                        </th>
                                        <th>
                                            属于创建圈子
                                        </th>
                                        <th>
                                            预算收支金额
                                        </th>
                                        <th>
                                            返还或者需缴纳金额
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            005
                                        </td>
                                        <td>
                                            是
                                        </td>
                                        <td>
                                            德州篮球俱乐部
                                        </td>
                                        <td>
                                            500$
                                        </td>
                                        <td>
                                            <a href="" class="dollar"></a><a href="" class="listDel"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            005
                                        </td>
                                        <td>
                                            是
                                        </td>
                                        <td>
                                            德州篮球俱乐部
                                        </td>
                                        <td>
                                            500$
                                        </td>
                                        <td>
                                            <a href="" class="dollar"></a><a href="" class="listDel"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            005
                                        </td>
                                        <td>
                                            是
                                        </td>
                                        <td>
                                            德州篮球俱乐部
                                        </td>
                                        <td>
                                            500$
                                        </td>
                                        <td>
                                            <a href="" class="dollar"></a><a href="" class="listDel"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            005
                                        </td>
                                        <td>
                                            是
                                        </td>
                                        <td>
                                            德州篮球俱乐部
                                        </td>
                                        <td>
                                            500$
                                        </td>
                                        <td>
                                            <a href="" class="dollar"></a><a href="" class="listDel"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            005
                                        </td>
                                        <td>
                                            是
                                        </td>
                                        <td>
                                            德州篮球俱乐部
                                        </td>
                                        <td>
                                            500$
                                        </td>
                                        <td>
                                            <a href="" class="dollar"></a><a href="" class="listDel"></a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <%-- 成员列表 --%>
                    <div class="ACmod mb10">
                        <a href="###" name="memberlist"></a>
                        <h4 id="hmemberlist" class="tBgb fSize-12">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">成员列表&nbsp;&nbsp;</b><small
                                class="fSize-12">现人员数</small><small class="fCblue fSize-12" id="sCurrentTotal"></small><small
                                    class="fSize-12" style="display: none;">总人员数</small><small class="fCblue fSize-12"
                                        style="display: none;">（24）</small></h4>
                        <div class="setMod memberList" style="display: none">
                            <table id="tbmember" border="0" cellspacing="0" cellpadding="0" width="100%" class="memberTable fCgray3">
                            </table>
                            <table border="0" cellspacing="0" cellpadding="0" width="100%" class="memberTable fCgray3">
                                <tr class="memberFoot" id="trmemberfoot">
                                    <td colspan="10">
                                        <div id="divmemberlist" class="pageList f_right">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <%-- 搭车信息 --%>
                    <div class="ACmod mb10">
                        <a href="###" name="bycarinfor"></a>
                        <h4 id="hbycarinfor" class="tBgb fSize-12">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">搭车信息&nbsp;&nbsp;</b><small
                                class="fSize-12">搭车人数</small><small class="fCblue fSize-12" id="sbycarCurrentTotal"></small>&nbsp;<small
                                    class="fSize-12">总人数</small><small class="fCblue fSize-12" id="sbycarTotal"></small></h4>
                        <div class="setMod" style="display: none;">
                            <div id='activity_t5' class="ACmodList" style="margin: 0 0 20px 0">
                            </div>
                            <div class="memberList">
                                <table id="tbbycar" border="0" cellspacing="0" cellpadding="0" width="100%" class="memberTable fCgray3">
                                </table>
                                <table border="0" cellspacing="0" cellpadding="0" width="100%" class="memberTable fCgray3">
                                    <tr class="memberFoot">
                                        <td colspan="10">
                                            <div id="divbycarlist" class="pageList f_right">
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <%-- 行车路线 --%>
                    <div class="ACmod mb10">
                        <a href="###" name="carline"></a>
                        <h4 class="tBgb fSize-12" id="routeMap">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">行车路线&nbsp;&nbsp;</b><small
                                class="fSize-12">距目的地距离</small><small class="fCblue fSize-12">（25）公里</small><small
                                    class="fSize-12">预计时间</small><small class="fCblue fSize-12">（1）小时</small></h4>
                        <div class="setMod" style="display: none">
                            <div class="roadLine">
                                <div class="rodalineTop">
                                    <span style="left: 94px;">何怡洁</span> <span style="left: 188px;">张孟春</span>
                                </div>
                                <div class="rodalineMiddle">
                                    <div class="roadlineRight">
                                    </div>
                                    <div class="roadlineLeft">
                                    </div>
                                    <div class="roadlineCenter">
                                        <ul>
                                            <li class="star"></li>
                                            <li></li>
                                            <li>
                                                <div class="selected">
                                                </div>
                                                <div class="tipsWarp">
                                                    <div class="tipsTop">
                                                    </div>
                                                    <div class="tipsMain fSize-12 fCgray3">
                                                        <p>
                                                            5：00-12：00 早市集DOTA</p>
                                                        <p>
                                                            16:00-20:00 南山集会品茶活动</p>
                                                    </div>
                                                    <div class="tipsBottom">
                                                        &nbsp;</div>
                                                </div>
                                            </li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li class="end"></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="rodalineBottom">
                                    <div class="starText">
                                        出发地</div>
                                    <div class="tipsWarp">
                                        <div class="tipsTop">
                                        </div>
                                        <div class="tipsMain fSize-12 fCgray3">
                                            <p>
                                                大同 距离：60公里 时间：2小时</p>
                                        </div>
                                        <div class="tipsBottom">
                                            &nbsp;</div>
                                    </div>
                                    <div class="endText">
                                        目的地</div>
                                </div>
                                <div class="clear2">
                                </div>
                            </div>
                            <div class="roadLineMap">
                                <div class="linemapL" id="mainMap">
                                </div>
                                <div class="linemapR">
                                    <ul class="memberlineList" id="memberlineList">
                                    </ul>
                                    <div class="clear2">
                                    </div>
                                    <div id="directionsPanel" style="overflow-y: scroll; overflow-x: hidden; height: 372px;">
                                    </div>
                                </div>
                                <div class="clear2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <%-- 天气预报  --%>
                    <div class="ACmod mb10" id="divweather">
                        <a href="###" name="weather"></a>
                        <h4 class="tBgb fSize-12" id="hweather">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">天气预报&nbsp;</b><b
                                class="weather">&nbsp;</b></h4>
                        <div class="setMod" style="display: none">
                            <ul id="ulweatherlist" class="weatherlist">
                            </ul>
                            <div class="clear2">
                            </div>
                        </div>
                    </div>
                    <%-- 留言板  --%>
                    <div id="divleavemessage" style="display: none" class="ACmod mb10">
                        <a href="###" name="leavemessage"></a>
                        <h4 id="hleavemessage" class="tBgb fSize-12">
                            <span class="f_right downarrow_B"></span><b class="icon16 square fSize-12 fCgray3">留言板&nbsp;&nbsp;</b></h4>
                        <div class="setMod" style="display: none">
                            <div class="pageListWarp" style="background: none; border: none; border-bottom: 1px dotted #bababa;
                                margin: 0;">
                                <ul class="pageList f_right fCgray3">
                                </ul>
                            </div>
                            <!-- pagelist -->
                            <div class="messageBoard">
                                <ul id="ulmessagebody">
                                </ul>
                                <div class="replayFrom" style="margin: 5px 0 5px 0; padding: 0 0 5px 0;">
                                    <img id="imgUserlogo" class="photo mbUseravatar" title="" alt="" src="../images/photos/img_51x51.png" />
                                    <div class="mbContent">
                                        <p>
                                            <textarea id="txtreplay" cols="96" class="" rows="5"></textarea>
                                        </p>
                                        <p>
                                            <input id="btnreplay" type="button" class="buttonB btn_w70 btn_h26 btnBlue_70 fSize-12"
                                                style="margin: 8px 0 8px 0;" value="回复" />
                                        </p>
                                    </div>
                                </div>
                                <div class="clear2">
                                </div>
                                <div class="pageListWarp">
                                    <ul class="pageList f_right fCgray3">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--photoList main -->
                    <div class="clear2">
                    </div>
                </div>
                <%-- 活动设置--%>
                <div class="MyactivitySet_Main f_left" id="divsetting" style="margin: 40px 0 0; display: none;">
                    <h5 class="MyactivitySet_title">
                        <b id="bsetactivityname" class="fCblue icon16">设置活动名称</b></h5>
                    <div class="setForm">
                        <dl style="display: none;">
                            <dd>
                                联系方式&nbsp;电话：&nbsp;&nbsp;
                                <input type="text" id="phone" class="text" />
                                邮箱：&nbsp;&nbsp;
                                <input type="text" name="" id="email" class="text" />
                            </dd>
                            <dd style="display: none;">
                                支持缴费方式以及账号或支付地址&nbsp;&nbsp;&nbsp;
                                <select>
                                    <option>缴费方式</option>
                                </select>&nbsp;&nbsp;
                                <input type="text" name="" id="Text34" class="text" />
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                设定接收邮箱&nbsp;&nbsp;&nbsp;
                                <input type="text" id="txtcontact_email" class="text" />
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                <label>
                                    重&nbsp;要&nbsp;活&nbsp;动&nbsp;通知</label>
                                <label for="is_email_event">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id="is_email_event" />
                                    &nbsp;邮件</label>
                                <label for="is_notice_event">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" name="" id="is_notice_event" />
                                    &nbsp;站内短信通知</label>
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                <label for="">
                                    订阅活动动态更新</label>
                                <label for="is_email_updates">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id="is_email_updates" />
                                    &nbsp;邮件</label>
                                <label for="is_notice_updates">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" id="is_notice_updates" />
                                    &nbsp;站内短信通知</label>
                            </dd>
                        </dl>
                        <dl style="display: none">
                            <dd>
                                <label for="">
                                    &nbsp;
                                    <input type="checkbox" name="" id="Checkbox12" />
                                    &nbsp;订阅信息摘要</label>
                                <select name="" id="Select8">
                                    <option value="设定时间范围">&nbsp;设定时间范围</option>
                                </select>
                                &nbsp;
                                <input type="text" class="text" name="" id="Text36" value="2011/12/12-2011/12/20" />
                                <label for="">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" name="" id="Checkbox13" />
                                    &nbsp;邮件</label>
                                <label for="">
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" name="" id="Checkbox14" />
                                    &nbsp;站内短信通知</label>
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                <label for="">
                                    &nbsp;
                                    <input type="checkbox" name="" id="Checkbox15" />
                                    &nbsp;接受圈内人的及时信息</label>
                            </dd>
                        </dl>
                        <dl>
                            <dd>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例外名单:
                                <select id="drpUserName">
                                    <option value=""></option>
                                </select>
                                &nbsp;&nbsp;&nbsp;
                                <input type="button" id="btnAdd" class=" buttonG btn_w56 btn_h28 btnGary_56" value="添加" />
                                <div class="tips_G tipW_435 pR" style="left: 42px;">
                                    <span class="upArrow_G" style="left: 180px;"></span>
                                    <div class="tips_G_main tipW_435">
                                        <ul>
                                            <li class="delBtn">姓名</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="btn-Warp" style="margin: 20px auto;">
                                    &nbsp;&nbsp;
                                    <input type="button" id="btnsetsave" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14"
                                        value="完成" />
                                    &nbsp;&nbsp;
                                    <input type="button" id="btbsetcancel" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14"
                                        value="取消" />
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
                <!-- AM_photoEditWarp -->
            </div>
        </div>
        <div style="position: absolute; display: none" id="showMessage">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="http://code.jquery.com/ui/1.8.21/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.switchover.js"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.accordion.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="../scripts/openplugin/gmap3.js"></script>
    <script type="text/javascript" src="../scripts/plugin/map/wanerdao2.mapview2.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_common.js"></script>
    <script type="text/javascript" src="../scripts/common/wanerdao2.date.js"></script>
    <script type="text/javascript" src="../scripts/jquery.json-2.3.min.js"></script>
    <script type="text/javascript" src="../../scripts/plugin/pagination/wanerdao2.pager.js"></script>
    <script type="text/javascript" src="/scripts/openplugin/jquery-ui-timepicker-addon.js"></script>
    <script src="../scripts/plugin/activityperson/wanerdao2.activityperson.js" type="text/javascript"></script>
    <script src="../scripts/plugin/activitycategory/wanerdao2.ac.js" type="text/javascript"></script>

   <script type="text/javascript" src="/scripts/gotop.js"></script> 
     <script type="text/javascript" src="../../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
     <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_myactivity.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_leavemessage.js"></script>
    <script type="text/javascript" src="/scripts/openplugin/jquery.cookies.source.js"></script>
    
    
    <script src="../scripts/activity/activitymanageinitrefparam.js" type="text/javascript"></script>
    <script src="../scripts/activity/activitymanageselfsignupparam.js" type="text/javascript"></script>
    <script src="../scripts/activity/activitymanagebudgetparaparam.js" type="text/javascript"></script>
    <script src="../scripts/activity/activitymanageincomeparaparam.js" type="text/javascript"></script>

   
   
   
   
   
</asp:Content>
