<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_search.aspx.cs" Inherits="Activity_Activity_search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/home.css" rel="stylesheet" type="text/css" />
<link href="../style/activity_main.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="home_page ofh">        	
        	<div class="home_con version1">
              <div class="actMain">
              <div class="subChaTab">
             <a href="/activity/Activity_main.html" class="active">活动信息</a>
                <a href="/activity/Activity_myactivity.html">我的活动</a>
              </div>
                <div class="activity_sub">
            <p class="pageLink" id="pageid"  type="pageid">
            <i>首页</i>
            <i>上页</i> 
            <i>01<font class="sum">/23</font></i> 
            <i><a href="#">下页</a></i> 
            <i><a href="#">未页</a></i> 
            </p> 
        </div>
        		<div class="ofh" id="searchList"></div>
                <div class="blank10px"></div>
                <p class="pageLink tr lh24" id="pageid2"  type="pageid" >
                <i><a href="#" target="_blank">显示更多</a></i>
                <i>首页</i>
                <i>上页</i> 
                <i>01<font class="sum">/23</font></i> 
                <i><a href="#">下页</a></i> 
                <i><a href="#">未页</a></i> 
                </p> 
            </div>
            </div>
              <div class="side">
              <div class="activity_event"><a href="Activity_create.aspx" class="Initiating_event_2"></a></div>
              <div class="friend bor ">
                <h2 class="friend_title">
                  <p>搜索活动</p>
                </h2>
                <div class="search_ac">
                    <input   id="txt_activityNames"  type="text" value="关键词" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active nobg"/>
                    <input   id="txt_categoryNames"  type="text" value="请选择活动分类" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}"  class="search_active secA"/>
                    <input   id="txt_friendsName"    type="text" value="好友参加的活动" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secB" />
                    <input   id="txt_groupNames"      type="text" value="圈子参加的活动" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secC" />
                    <input   id="txt_sightNames"  style="display:none;"     type="text" value="景点" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secD" />
                    <%--  <input   id="txt_countryId"  type="text" value="美国" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secE" />
                    <select id="drp_Provice" style="width:108px; margin-top:3px;"><option>所有州省</option></select>&nbsp;
                    <select id="drp_City" style="width:111px; margin-top:3px;"><option>所有城市</option></select>
                    --%>          
                    <input id="txtactivitycountryName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="txtactivitystateName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="txtactivitycityName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                    <input id="selectArea" value="选择地区"   type="button"  rel="#tt"   style="background: url('../images/create_step2_2.png') repeat-x scroll 0 0 #E3E3E3; border: 1px solid #BABABA;cursor: pointer; height: 26px; padding: 0 10px" />
                    <input type="submit"  id="search_active" class="secI" value="&nbsp;" />
                
                </div>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>好友参加的活动<span  id="friendTotal">（157）</span></p>
                  <span id="friendPageid"> </span></h2>
                <ul class="activity_List" id="friendContent">
                
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>可能感兴趣的活动<span  id="interestTotal">（157）</span></p>
                  <span  id="interestPageid" > </span></h2>
                <ul class="activity_List"  id="interestContent" >
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>最新创建的活动<span  id="newTotal">（157）</span></p>
                  <span id="newactivityPageid"> </span></h2>
                <ul class="activity_List"  id="newActivityContent">
                </ul>
              </div>            
              <div class="friend">
                <h2 class="friend_title">
                  <p>相关圈子推荐<span id="groupTotal">（34）</span></p>
                  <span id="groupPageid"></span>
                </h2>
                <div class="relaCircle">
                	<ul id="groupContent">
                    </ul>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
    <%--<script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>--%>    
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_common.js" type="text/javascript"></script>
     <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script> 
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>  
    <script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script src="../Scripts/Plugin/SideBar/wanerdao2.sidebar.js" type="text/javascript"></script>  
    <script src="../Scripts/activity/activity_search.js" type="text/javascript"></script> 
</asp:Content>

