<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_main.aspx.cs" Inherits="Activity_Activity_main" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">   
    <link href="../style/home.css" rel="stylesheet" type="text/css" />
    <link href="../style/activity_main.css" rel="stylesheet" type="text/css" />
    <link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="home_page ofh">
        	
        	<div class="home_con version1" id="main_1">
               <div class="actMain">
               	   <div class="subChaTab">
                    <a href="#" class="active">按分类寻找</a>
                    <a href="#">按位置查找</a>
                   </div>	
                   <ul class="actList" id="actList"></ul>
                   <div class="blank10px"></div>
                   <p class="pageLink tr lh24" id="pageid">
                    <i>首页</i>
                    <i>上页</i> 
                    <i>01<font class="sum">/23</font></i> 
                    <i><a href="#">下页</a></i> 
                    <i><a href="#">未页</a></i> 
                    </p> 
                   <div style="height:160px;"></div>
               </div>
            </div>

            <div class="home_con version1" id="main_2" style="display:none">
              <div class="actMain">
              <div class="subChaTab">
                <a type="nav" href="#">按分类寻找</a>
                <a type="nav" href="#" class="active">按位置查找</a>
               </div>	
              <div class="blank10px"></div>
               <div class="searBar">
               	<span class="left">
                我的位置：<input type="text" class="txtInput" style="width:204px;" />&nbsp;
                邮编：<input type="text" class="txtInput" style="width:88px;" />
                <select><option>州省</option></select>
                <select><option>城市</option></select>
                <select><option>国家</option></select>
                <!--<a href="javascript:void(0);" class="btn_search">查找</a>-->
                </span>
               </div>
              <div class="mapSearch">
              	<div class="map left"><img src="../images/activity/map.jpg" width="447" height="462" /></div>
                <div class="mapCondition right">
               	  <p class="item lh24"><input type="checkbox" class="vInput" id="setHomeAddress" /><label for="setHomeAddress">同步该地址为家庭地址</label></p>
                  <p class="item icon">离家距离：<select style="width:116px;"><option>10公里</option></select></p>
                    <p class="item icon">分类：<select style="width:68px;"><option>农场</option></select> <select style="width:68px;"><option>选项目</option></select></p>
                    <div class="tipShow">
                    	<ins style="left:140px;"></ins>
                        <p class="tCon">
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        </p>
                    </div>
                    <p class="item icon"><input type="checkbox" class="vInput" id="allFriend" /><label for="allFriend">所有好友参加的活动</label></p>
                    <p class="item icon"><input type="checkbox" class="vInput" id="allGroup" /><label for="allGroup">所有圈子参加的活动</label></p>
                    <p class="item"><input type="text" class="txtInput txt_cusFriend" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#909090'}"  value="自定义好友" /> <input type="button" class="btn_add" value="添加" /></p>
                    <div class="tipShow">
                    	<ins style="left:90px;"></ins>
                        <p class="tCon">
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        </p>
                    </div>
                  <p class="item"><input type="text" class="txtInput txt_cusGroup" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#909090'}" value="自定义圈子" /> <input type="button" class="btn_add" value="添加" /></p>
                    <div class="tipShow">
                    	<ins style="left:90px;"></ins>
                        <p class="tCon">
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        	<i>摘苹果<a href="javascript:void(0);"></a></i>
                        </p>
                    </div>
                    <p class="item icon"><input type="checkbox" class="vInput" id="filter" /><label for="filter">过滤掉去过的地方</label></p>
                </div>
                <div class="explain">
                	<b class="lblue">注释：</b><i class="iLocat">活动地址</i>
                </div>
              </div>
              <div class="blank10px"></div>
                
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
                    <input   id="txt_sightNames" style="display:none;"      type="text" value="景点" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secD" />
                  <%--  <input   id="txt_countryId"  type="text" value="美国" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#79A8B0'}" class="search_active secE" />
                    <select id="drp_Provice" style="width:108px; margin-top:3px;"><option>所有州省</option></select>&nbsp;
                    <select id="drp_City" style="width:111px; margin-top:3px;"><option>所有城市</option></select>--%>

                <input id="txtactivitycountryName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                <input id="txtactivitystateName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                <input id="txtactivitycityName" type="text" class="txtInt" disabled="disabled" style="width:43px;" /> 
                <input id="selectArea" value="选择地区"   type="button"  rel="#tt"   style="background: url('../images/create_step2_2.png') repeat-x scroll 0 0 #E3E3E3; border: 1px solid #BABABA;cursor: pointer; height: 26px; padding: 0 10px" />
                <input type="submit"  id="search_active" class="secI" value="&nbsp;" />
                </div>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>好友参加的活动<span  id="friendTotal">（）</span></p>
                  <span id="friendPageid">&nbsp;</span></h2>
                <ul class="activity_List" id="friendContent">
                
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>可能感兴趣的活动<span  id="interestTotal">（）</span></p>
                  <span  id="interestPageid" >&nbsp;</span></h2>
                <ul class="activity_List"  id="interestContent" >
                </ul>
              </div>
              <div class="friend bor">
                <h2 class="friend_title">
                  <p>最新创建的活动<span  id="newTotal">（）</span></p>
                  <span id="newactivityPageid">&nbsp;</span></h2>
                <ul class="activity_List"  id="newActivityContent">
                </ul>
              </div>
              <div class="friend">
                <h2 class="friend_title">
                  <p>相关圈子推荐<span id="groupTotal">（）</span></p>
                  <span id="groupPageid">&nbsp;</span>
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
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
     <script src="../Scripts/common/utility.js" type="text/javascript"></script>
    <%--<script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script> --%>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_common.js" type="text/javascript"></script>
    <script src="../Scripts/activity/activity_main.js" type="text/javascript"></script>

  <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/Search/wanerdao2.compop.js"></script> 
    <script type="text/javascript" src="../../Scripts/multipleLanguage/loader.js"></script>  
    <script type="text/javascript" src="../../Scripts/Plugin/Area/wanerdao2.area.js"></script>     
    <script src="../Scripts/Plugin/SideBar/wanerdao2.sidebar.js" type="text/javascript"></script>

    
  
    
</asp:Content>

