<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_main.aspx.cs" Inherits="relationship_relationship_mygroup_main" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
<link href="../css/PluginCss/Share/Share.css" rel="stylesheet" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myGroupMain.js" type="text/javascript"></script>
<script src="../Scripts/common/effect.js" type="text/javascript"></script>
 <script src="../Scripts/Plugin/Share/wanerdao2.sharetools.js" type="text/javascript"></script> 

 <script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
<script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../Scripts/Plugin/SearhGroupMember/wanerdao2.groupmember.js"></script>

    <script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <!--主体-->
    <div class="main jz">
    	<div class="mCon p35 pb50">
				<div class="groupChaTab" id="TopMenu">
                    
                     
                </div>
                 <div class="clearfix"></div>
				<div class="Fnavigation" id="myGroupMenu">
                
                </div>
                 
                 <div class="follow_main clearfix no_bg pb50">
                 	<div class="handle_box">
                    	<div class="handle_top">
                        	<span>
                              <select name="select" id="sel_filterType">
                               </select>
                                <input type="text" class="inp25" id="txt_sreachKey"  />
                                <input name="" type="button" class="inp26" value="搜索" onclick="sreachpagination()" />
                                <label id="pager1"></label>
                            </span>
                        	<a href="#"><img src="../images/list/groupbg14.jpg" /></a>
                            <div class="handle_tab">
                            	<a href="javascript:waitpagination()" class="tagf" id="waiteventmenu">待处理事件</a><a href="javascript:recordeventrecord()" id="recordeventmenu">事件记录</a>
                            </div>
                        </div>
                    	<div class="handle_bottom">
                        	<ul id="events_List" class="report_list">
                            	                                                                                   
                            </ul>
                        </div>                        
                    </div>
                    
                    <div class="handle_box">
                    	<div class="handle_top">
                        	<span>
                            	<input type="text" class="inp25" id="txt_activity_name" />
                                <input name="" type="button" class="inp26" value="搜 索" />
                                <label id="pager2"></label>
                            </span>
                        	<a href="#"><img src="../images/list/groupbg14.jpg" /></a>
                            <div class="handle_tab w145">
                            	<a href="javascript:activitypagination('1','0')" class="tagf" id="activitymenu">当前活动</a><a href="javascript:activitypagination('1','1')" id="historyactivitymenu">历史活动</a>
                            </div>
                        </div>
                    	<div class="handle_bottom">
                        	<ul id="activity_list" class="report_list" >
                            	
                            	                                                                                         
                            </ul>
                        </div>                        
                    </div>
                    
                    <div class="handle_inp">
                    	<a href="javascript:showCmment();" class="inp27">发表评论</a>
                        <a href="javascript:showEvent()" class="inp28">发表事件</a>
                        <a href="javascript:createActivity()" class="inp29">发表活动</a>
                    </div>
                    
                    <div class="handle_pl" id="addcommentDIV" style="display:none;">
                    	<h1>
                        	发表评论
                        </h1>
                        <ul>
                        	<li class="log_Ptit"><label>标题：</label><input name="" type="text" id="txt_title" /><label style="color:Red; display:none"  id="lab_title">标题不能为空</label></li>
                        	<li class="log_Pcon">
                            	<label>内容：</label><textarea name="input" id="txt_comment"></textarea><label style="color:Red; display:none" id="lab_comment">内容不能为空</label>
                          	</li>
                            <li class="sharetools"></li>
                           
                            <li><input name="" type="button" value="发 帖" class="hobby_but" onclick="sub_comment();" />
                            <input name="" type="button" value="取 消" class="hobby_but01" onclick="cancel_cmment();" /></li>
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
                    	<div class="handle_npage">
                        	<div class="alb_nav" id="DiscussPageDiv">
                                   
                            </div>  
                        	<input type="text" class="inp30" id="txt_Discusskey" />
                            <input type="button" class="inp31" onclick="paginDiscuss('1')" />
                        	
                        </div>
                        <ul id="discuss_list">
                        	
							                                               
                        </ul>
                        <div class="handle_npage btop">
                        	<div class="alb_nav">
                                    
                            </div>  
                        </div>
                    </div>
                    
                 </div>
                
        </div>
    </div>
    <div class="mBtm jz"></div>
    
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>

