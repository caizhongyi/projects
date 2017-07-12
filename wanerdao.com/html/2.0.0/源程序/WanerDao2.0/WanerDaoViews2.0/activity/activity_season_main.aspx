<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="activity_season_main.aspx.cs" Inherits="activity_activity_season_main" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>时令活动分类-活动-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="时令活动，橄榄球赛，棒球赛，冰球赛，篮球赛，汽车展，花展，演唱会，音乐会，表演，玩儿道，生活社交网络" />
<meta name="description" content="提供各种时令事件信息，并显示跟时令分类相关的活动，包括橄榄球赛，冰球赛，棒球赛，篮球赛，汽车展，花展，演唱会，音乐会，表演等" />
<link rel="stylesheet" type="text/css" href="../css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/activity.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<script type="text/javascript"  src="../scripts/global.js"></script>
<script type="text/javascript"  src="../scripts/gotop.js"></script>
<script type="text/javascript"  src="../scripts/jquery.chosen/jquery.chosen.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="activityMain layout">
  <div id="container" class="container pBgC2-1 clearfix">
    <div class="active-main f_left">
      <div class="black10"></div>
      <div class="black10"></div>
      <div class="mes_com_box_Tab"> <a href="/activity/activity_main.html" class="active">活动信息</a> <a href="/activity/activity_myactivity.html">我的活动</a> </div>
      <div class="black10"></div>
      <div class="activity_description" > </div>
      <div class="myhistoryMenu"  style="display:none">
        <ul>
          <li><a href="javascript:;" class="current">列表查找</a></li>
          <li><a href="javascript:;">地图查找</a></li>
        </ul>
      </div>
      <!-- 列表查找 -->
      <div id="myhistorycontent"  style="display:none">
        <div>
          <div class="searBar clearfix"> <span class="f_left">&nbsp;&nbsp;
            <select>
              <option>州省</option>
            </select>
            &nbsp;&nbsp;
            <select>
              <option>分类</option>
            </select>
            &nbsp;&nbsp;
            <input type="text" class="text">
            &nbsp;&nbsp; <a class="button button-gay" href="javascript:void(0);">查找</a> </span> <span class="sidebox-pager  f_right"> <a href="javascript:void(0);" class="prev" ></a>&nbsp;&nbsp;<a href="javascript:void(0);" class="next"></a> </span> </div>
          <ul>
            <li class="active_con">
              <p class="active_Img"><img src="../images/photos/active_main.png"> 2011/11/30 </p>
              <div class="activity_main">
                <div class="activit_title clearfix"><span class="f_left"><a class="fb" href="javascript:;">白宫胁迫奥巴马打篮球</a>&nbsp;&nbsp;[篮球]</span> <span class="f_right"><a href="javascript:;" class="color_de">创建活动</a><em>/</em><a href="javascript:;" class="color_de">寻找相关活动</a></span></div>
                <p class="brief">在这么一个天气晴朗的日子里，你的好心情是否无处发泄，那么来吧，我们有一个绝好的计划，那就是围攻奥巴马同学，还等什么，等奥巴下班后在白宫门口堵他……的好心情是否无处发泄吧，我们有一个绝好的计划，那就是围攻奥巴马同学，还等什么……</p>
                <p class="activit_plice"><span>活动地点:<i>美国纽约白宫大门口</i></span><a class="detail" href="javascript:;">查看详细</a></p>
              </div>
            </li>
            <li class="active_con">
              <p class="active_Img"><img src="../images/photos/active_main.png"> 2011/11/30 </p>
              <div class="activity_main">
                <div class="activit_title clearfix"><span class="f_left"><a class="fb" href="javascript:;">白宫胁迫奥巴马打篮球</a>&nbsp;&nbsp;[篮球]</span> <span class="f_right"><a href="javascript:;" class="color_de">创建活动</a><em>/</em><a href="javascript:;" class="color_de">寻找相关活动</a></span></div>
                <p class="brief">在这么一个天气晴朗的日子里，你的好心情是否无处发泄，那么来吧，我们有一个绝好的计划，那就是围攻奥巴马同学，还等什么，等奥巴下班后在白宫门口堵他……的好心情是否无处发泄吧，我们有一个绝好的计划，那就是围攻奥巴马同学，还等什么……</p>
                <p class="activit_plice"><span>活动地点:<i>美国纽约白宫大门口</i></span><a class="detail" href="javascript:;">查看详细</a></p>
              </div>
            </li>
          </ul>
          <div class="clearfix"> <span class="sidebox-pager  f_right"> <a href="javascript:void(0);" class="prev" ></a>&nbsp;&nbsp;<a href="javascript:void(0);" class="next"></a> </span> </div>
        </div>
        <!-- 列表查找 --> 
        
        <!-- 地图查找 -->
        <div class="addreesSchWarp" id="addreesSchWarp" style="display: none;">
          <div class="mapschWarp" style="display: block;">
            <div class="mapSch_bar fSize-12 fCgray3 f_left">
              <label for="">我的位置：
                <input type="text" id="" name="" class="text">
              </label>
              <label for="">邮编：
                <input type="text" id="" name="" class="text">
              </label>
              <input type="text" style="width:40px;" inputdefault="国家" value="国家" id="" name="" class="text">
              <input type="text" style="width:40px;" inputdefault="州省" value="州省" id="" name="" class="text">
              <input type="text" style="width:40px;" inputdefault="城市" value="城市" id="" name="" class="text tW_60">
              <input type="button" value="选择地区" class="buttonG btn_w56 btn_h28 gay-button">
            </div>
            <div class="mapWarp f_left" style="width:374px"><img width="374" height="462" alt="" src="../images/defucult/map.jpg"></div>
            <div class="mapSchWidget f_right">
              <ul class="fSize-12 fCblcak2">
                <li>
                  <input type="checkbox" id="" name="">
                  同步该地址为家庭地址</li>
                <li><small class="icon16 square fSize-12">离家距离:</small>
                  <select style="width: 110px; display: none;" id="sel75S" name="" class="chzn-done">
                    <option value="10公里">10公里</option>
                  </select>
                  <div id="sel75S_chzn" class="chzn-container  chzn-container-single" style="width: 110px;"><a class="chzn-single" href="javascript:void(0)"><span>10公里</span>
                    <div><b></b></div>
                    </a>
                    <div style="left: -9000px; width: 108px; top: 25px;" class="chzn-drop">
                      <div class="chzn-search" style="">
                        <input type="text" autocomplete="off" style="width: 73px;">
                      </div>
                      <ul class="chzn-results">
                        <li class="active-result result-selected" id="sel75S_chzn_o_0">10公里</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li><small class="icon16 square fSize-12">分类:</small>
                  <select style="width: 65px; display: none;" id="sel659" name="" class="chzn-done">
                    <option value="农场">农场</option>
                  </select>
                  <div id="sel659_chzn" class="chzn-container  chzn-container-single" style="width: 65px;"><a class="chzn-single" href="javascript:void(0)"><span>农场</span>
                    <div><b></b></div>
                    </a>
                    <div style="left: -9000px; width: 63px; top: 25px;" class="chzn-drop">
                      <div class="chzn-search" style="">
                        <input type="text" autocomplete="off" style="width: 28px;">
                      </div>
                      <ul class="chzn-results">
                        <li class="active-result result-selected" id="sel659_chzn_o_0">农场</li>
                      </ul>
                    </div>
                  </div>
                  <select style="width: 65px; display: none;" id="sel20U" name="" class="chzn-done">
                    <option value="选项目">选项目</option>
                  </select>
                  <div id="sel20U_chzn" class="chzn-container  chzn-container-single" style="width: 65px;"><a class="chzn-single" href="javascript:void(0)"><span>选项目</span>
                    <div><b></b></div>
                    </a>
                    <div style="left: -9000px; width: 63px; top: 25px;" class="chzn-drop">
                      <div class="chzn-search" style="">
                        <input type="text" autocomplete="off" style="width: 28px;">
                      </div>
                      <ul class="chzn-results">
                        <li class="active-result result-selected" id="sel20U_chzn_o_0">选项目</li>
                      </ul>
                    </div>
                  </div>
                  <div class="tips_G tipW_190"><span style="left:90px;" class="upArrow_G"></span>
                    <div class="tips_G_main tipW_190">
                      <ul>
                        <li class="delBtn">摘南瓜</li>
                        <li class="delBtn">摘苹果</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li><small class="icon16 square fSize-12">
                  <input type="checkbox" id="" name="">
                  所有好友参加的活动</small><br>
                  <input type="text" style="width:110px;" id="" name="" class="text">
                  <input type="button" class="buttonG btn_w56 btn_h28 gay-button" value="添加">
                  <div class="tips_G tipW_190"><span style="left:90px;" class="upArrow_G"></span>
                    <div class="tips_G_main tipW_190">
                      <ul>
                        <li class="delBtn">好友名称</li>
                        <li class="delBtn">好友名称</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li><small class="icon16 square fSize-12">
                  <input type="checkbox" id="" name="">
                  所有圈子参加的活动</small> <br>
                  <input type="text" style="width:110px;" id="" name="" class="text">
                  <input type="button" class="buttonG btn_w56 btn_h28 gay-button" value="添加">
                  <div class="tips_G tipW_190"><span style="left:90px;" class="upArrow_G"></span>
                    <div class="tips_G_main tipW_190">
                      <ul>
                        <li></li>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li><small class="icon16 square fSize-12">
                  <input type="checkbox" id="" name="">
                  过滤掉去过的地方</small></li>
              </ul>
            </div>
            <div class="clear"></div>
            <div class="mapNote fSize-12">
              <p class="mapNote"> <b>注释:</b><img alt="" src="../images/icons/mapschNote.png"><font class="fCgray3">活动地点</font></p>
            </div>
          </div>
          <div class="listschWarp fSize-12" style="display: none;">
            <div class="listschBar">
              <dl style="width:693px;">
                <dd class="activityCat">
                  <ul>
                    <li>
                      <input type="button" style="margin:0;" class="prevBtn" value="">
                    </li>
                    <li>
                      <ul class="AC_catList">
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                        <li>
                          <input type="button" value="运动" class="cat_btn">
                        </li>
                      </ul>
                    </li>
                    <li>
                      <input type="button" style="margin:0;" class="nextBtn" value="">
                    </li>
                    <li>
                      <input type="button" style="margin:0;" class="backBtn" value="">
                    </li>
                  </ul>
                </dd>
                <dd class="clear"></dd>
              </dl>
            </div>
            <div class="addressbody">
              <div class="addressbar clearfix">
                <div class="pageList f_right"><span>第</span>
                  <input type="text" value="0" class="text">
                  <span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a href="javascript:;" title="首页">首页</a><a href="javascript:;" title="上一页">上一页</a><a href="javascript:;" title="下一页">下一页</a><a href="javascript:;" title="尾页">尾页</a></div>
              </div>
              <div class="listschMain">
                <ul>
                  <li class="fCgray3">
                    <table width="600" cellspacing="0" cellpadding="0" border="0" class="table-fixed">
                      <tbody>
                        <tr>
                          <td width="64" align="right" class="fCblue square_small">地点名：</td>
                          <td width="120">周末ktv</td>
                          <td width="48" align="right" class="fCblue">地址：</td>
                          <td>平阳路美特好</td>
                        </tr>
                        <tr>
                          <td align="right" class="fCblue">时间段：</td>
                          <td colspan="3">2011-11-14&mdash; &mdash;2011-11-30</td>
                        </tr>
                        <tr style="">
                          <td valign="top" align="right" class="fCblue">描述：</td>
                          <td colspan="3"><p>我比谁都清楚东东拼拼凑凑爱的故事简简短短你的心事我不在你身边的日子是什么让你改变坚持让人心疼你的样子吞吞吐吐欲言又止如果有那么难以启齿我不问你又何必掩饰你过的好辛苦我比谁都清楚感情路没有勉强的幸福一开始就给的糊里糊涂想回头却又不知如何结束你装作很满足我比谁都清楚你的笑隐约透露着孤独快乐背后深深藏着痛楚坚强的面对然后偷偷的哭 </p></td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li class="fCgray3">
                    <table width="600" cellspacing="0" cellpadding="0" border="0" class="table-fixed">
                      <tbody>
                        <tr>
                          <td width="64" align="right" class="fCblue square_small">地点名：</td>
                          <td width="120">周末ktv</td>
                          <td width="48" align="right" class="fCblue">地址：</td>
                          <td>平阳路美特好</td>
                        </tr>
                        <tr>
                          <td align="right" class="fCblue">时间段：</td>
                          <td colspan="3">2011-11-14&mdash; &mdash;2011-11-30</td>
                        </tr>
                        <tr style="">
                          <td valign="top" align="right" class="fCblue">描述：</td>
                          <td colspan="3"><p>我比谁都清楚东东拼拼凑凑爱的故事简简短短你的心事我不在你身边的日子是什么让你改变坚持让人心疼你的样子吞吞吐吐欲言又止如果有那么难以启齿我不问你又何必掩饰你过的好辛苦我比谁都清楚感情路没有勉强的幸福一开始就给的糊里糊涂想回头却又不知如何结束你装作很满足我比谁都清楚你的笑隐约透露着孤独快乐背后深深藏着痛楚坚强的面对然后偷偷的哭 </p></td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  <li class="fCgray3">
                    <table width="600" cellspacing="0" cellpadding="0" border="0" class="table-fixed">
                      <tbody>
                        <tr>
                          <td width="64" align="right" class="fCblue square_small">地点名：</td>
                          <td width="120">周末ktv</td>
                          <td width="48" align="right" class="fCblue">地址：</td>
                          <td>平阳路美特好</td>
                        </tr>
                        <tr>
                          <td align="right" class="fCblue">时间段：</td>
                          <td colspan="3">2011-11-14&mdash; &mdash;2011-11-30</td>
                        </tr>
                        <tr style="">
                          <td valign="top" align="right" class="fCblue">描述：</td>
                          <td colspan="3"><p>我比谁都清楚东东拼拼凑凑爱的故事简简短短你的心事我不在你身边的日子是什么让你改变坚持让人心疼你的样子吞吞吐吐欲言又止如果有那么难以启齿我不问你又何必掩饰你过的好辛苦我比谁都清楚感情路没有勉强的幸福一开始就给的糊里糊涂想回头却又不知如何结束你装作很满足我比谁都清楚你的笑隐约透露着孤独快乐背后深深藏着痛楚坚强的面对然后偷偷的哭 </p></td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                </ul>
              </div>
              <div class="addressbar clearfix">
                <div class="pageList f_right"><span>第</span>
                  <input type="text" value="0" class="text">
                  <span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a href="javascript:;" title="首页">首页</a><a href="javascript:;" title="上一页">上一页</a><a href="javascript:;" title="下一页">下一页</a><a href="javascript:;" title="尾页">尾页</a></div>
              </div>
            </div>
             <dl>
            <dd class="formTitle">位置：</dd>
            <dd class="formMain">
              <input type="text" id="" name="" class="text">
            </dd>
          </dl>
          <dl class="clear">
          </dl>
          <dl>
            <dd class="formTitle">地区：</dd>
            <dd class="formMain">
              <input type="text" style="width:100px;" id="" inputdefault="国家" value="国家" name="" class="text">
              <input type="text" style="width:100px;" id="" inputdefault="州省" value="州省" name="" class="text">
              <input type="text" style="width:100px;" id="" value="城市" name="" inputdefault="城市" class="text">
              <input type="button" value="选择地区" class="buttonG btn_w56 btn_h28 btnGary_56">
            </dd>
          </dl>
          <dl class="clear">
          </dl>
          </div>
         
        </div>
        <!-- 地图查找 --> 
      </div>
      <div class="pageList list-header"></div>
      <ul class="active-list"></ul>
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
    <script type="text/javascript">        var categoryid = '', section_type = '1', opertype = 'activityseasonpagesearchactivity';</script>
    <script type="text/javascript" src="../scripts/activity/activity_category_main.js"></script>
    <script type="text/javascript" src="../scripts/activity/activity_sidebar.js"></script>
     <!-- 以下地区控件弹出框js -->
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
     <script type="text/javascript" src="/scripts/jquery.center.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
     <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>

</asp:Content>

