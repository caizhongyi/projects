<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_main.aspx.cs" Inherits="relationship_relationship_mygroup_main" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

<title>圈子主页-关系-玩儿道</title>
<meta name="keywords" content="圈子主页，事务处理，发起事务，圈子活动，讨论，关系，玩儿道，生活社交网络" />
<meta name="description" content="圈子的成员主页面，提供处理事务，发起事务，圈子活动，讨论等功能" />

<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
 <link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
 <link href="../scripts/plugin/Share/Share.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>
        <div class="black10"></div>
        
        <div class="log_tab clearfix mb12" id="myGroupMenu">
          
        </div>
        
        <div class="follow_main clearfix no_bg pb50">
            <div class="handle_box" id="paginationhearDIV">
                <div class="handle_top">
                    <span >
                        <div class=" f_left" style="height:25px; line-height:25px;">
                           <select id="sel_filterType" name="select" style="width:140px">
                                </select>
                        </div>
                        <div class="f_left"><input type="text" class="inp25" id="txt_sreachKey" /></div>
                        <div class="f_left"><input name="" type="button" class="inp26" value="搜 索" onclick="sreachpagination()"/></div>
                        <div id="eventpager" class="pager f_right"> </div>
                    </span>
                    <a href="javascript:;"><img src="/images/groupbg14.jpg" /></a>
                    <div class="handle_tab" >
                        <a href="javascript:waitpagination()" class="tagf" id="waiteventmenu">待处理事件</a><a  href="javascript:recordeventrecord()" id="recordeventmenu">事件记录</a>
                    </div>
                </div>
                <div class="handle_bottom">
                    <ul id="events_List" class="report_list">
                                                                                      
                    </ul>
                </div>                        
            </div>
            
            <div class="handle_box" id="activityhearDIV">
                <div class="handle_top">
                    <span>
                        
                        <div class="f_left"><input type="text" class="inp25" id="txt_activity_name"/></div>
                        <div class="f_left"><input name="" type="button" class="inp26" value="搜 索" onclick="activitySreach()" /></div>
                        <div class="pager f_right" id="pageractivity"></div>
                    </span>
                    <a href="javascript:;"><img src="../images/groupbg14.jpg" /></a>
                    <div class="handle_tab w145">
                        <a href="javascript:activitypagination('1','0')" class="tagf" id="activitymenu">当前活动</a><a href="javascript:activitypagination('1','1')" id="historyactivitymenu">历史活动</a>
                    </div>
                </div>
                <div class="handle_bottom">
                    <ul id="activity_list" class="report_list">
                                                                                                               
                    </ul>
                </div>                        
            </div>
            
            <div class="handle_inp" style="display:none;" id="mainoperateDIV">
                <a href="javascript:showCmment();" class="inp27">发表评论</a>
                <a href="javascript:showEvent();" class="inp28" id="eventopen">发表事件</a>
                <a href="javascript:createActivity();" class="inp29">发表活动</a>
            </div>
            
            <div class="handle_pl" id="addcommentDIV" style="display:none;">
                <h1>
                    发表评论
                </h1>
                <ul>
                    <li class="log_Ptit"><label>标题：</label><input name="" type="text" style="color:#000" class="text" id="txt_title" />
                    <label style="color:Red" id="msgtitle" class="msgLabArr"></label></li>
                    <li class="log_Pcon">
                        <label>内容：</label><textarea name="input" class="text" style="color:#000" id="txt_comment"></textarea>
                        <label style="color:Red" id="msgcomment" class="msgLabArr"></label>
                    </li>
                     <li class="sharetools"></li>
                    <li>
                            <input type="button"  onclick="sub_comment();" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="发 帖" style="margin-left:45px;" />
                        	<input type="button" onclick="cancel_cmment();" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14" value="取 消" />
                             <label style="color:Red" id="msgcomment" class="msgLabArr"></label>
                            </li>
                </ul>
                
            </div>


             <div class="fb_events mt30" id="eventsDIV" style=" display:none;">
                    	<h1>发表事件</h1>
                        <div class="events_con">
                        	<div class="events_top">
                            	<ul>
                                	<li class="xz_events"><label>选择事件：</label>
                                    <select name="select" id="sel_event" onchange="changeEvent()">
                                         <option value="">选择事件</option>
                		  				</select></li>
                                    <li id="li_eventdescription" ><label>事件描述：</label></li>
                                </ul>
                            </div>
                            <div class="events_bot" id="events_bot">
                            	
                            </div>
                        </div>
                    </div>


            <div class="handle_list clearfix">
                
                <div class="topNav clearfix">
                			<div class="f_left lsz_frist_tit">
                            	<input type="text" class="inp30"  id="txt_Discusskey" /><input type="button" class="inp31" onclick="paginDiscuss('1')" />
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right discussPage"></div>
                            <!-- 分页右边 -->
                   
                </div>
                 <div class="groupList">
                <ul id="discuss_list" class="report_list">                                                                
                </ul>
                </div>

                <div class="topNav bmNav">
                            <div class="clearfix pagewrap">
                        <!-- 分页右边 -->
                        <div class="pageList  f_right discussPage" ></div>
                        <!-- 分页右边 -->
                    </div>
            	        </div>
                
            </div>
            
        </div>
        
        
        
        
    </div>
</div>
<div class="mes_main_bot"></div>



</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
<script type="text/javascript" src="../scripts/common/wanerdao2.date.js"></script>
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
 <script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupMain.js" type="text/javascript"></script>
<script src="../Scripts/trunk8.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
 <script src="../Scripts/Plugin/Share/wanerdao2.sharetools.js" type="text/javascript"></script> 
 <script type="text/javascript" src="../scripts/plugin/search/wanerdao2.compop.js"></script>

     <script type="text/javascript" src="../scripts/jquery.core.js"></script>
     <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>

     <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
    
   <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
       <script src="../scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>
</asp:Content>

