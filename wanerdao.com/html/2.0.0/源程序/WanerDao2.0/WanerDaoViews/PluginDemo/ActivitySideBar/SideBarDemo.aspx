<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="SideBarDemo.aspx.cs" Inherits="PluginDemo_ActivitySideBar_SideBarDemo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  <link href="../../css/home.css" rel="stylesheet" type="text/css" />
 

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class='layout_body'>
  <div class="home_page">
    <div class="side">
      <div class="activity_event"><a href="#" class="Initiating_event_2"></a></div>
      <div class="friend bor ">
        <h2 class="friend_title"> <p>搜索活动</p> </h2>
        <div class="search_ac">
        <input type="text"  id="txt_activityNames" class="search_active secA"/>
        <input type="text"  id="txt_categoryNames" class="search_active secB" />
        <input type="text"  id="txt_friendsName" class="search_active secC" />
        <input type="text"  id="txt_groupNames" class="search_active secD" />
        <input type="text"  id="txt_sightNames" class="search_active secE" />
        <input type="text"  class="search_active secF" />
        <input type="text"  class="search_active secH" />
        <input type="submit" id="search_active" class="search_active secI" value="&nbsp;" />
        </div>
        
        
      </div>

      <div class="friend bor">
        <h2 class="friend_title">
          <p>好友参加的活动<span id="friendTotal">（157）</span></p>
          <a href="#" id="friendPageid"></a></h2>
        <ul class="activity_List" id="friendContent"></ul>

      </div>
      <div class="friend bor">
        <h2 class="friend_title">
          <p>可能感兴趣的活动<span id="interestTotal">（157）</span></p>
          <a href="#" id="interestPageid"></a></h2>
        <ul class="activity_List" id="interestContent"></ul>

      </div>
      <div class="friend bor">
        <h2 class="friend_title">
          <p>最新创建的活动<span id="newTotal">（157）</span></p>
          <a href="#" id="newactivityPageid"></a> </h2>
        <ul class="activity_List" id="newActivityContent">
             
        </ul>

      </div>

      <div class="friend">
        <h2 class="friend_title">
          <p>活动推荐<span>（157）</span></p>
        </h2>
        <div class="right_roll_friend">
            <div class="roll_con">
                <ul style="left:0px;">
                    <li>
                        <img src="images/activity.png"  />
                        <div><h3>听风歌唱巡演</h3>
                        245人参加<br />
                        904人关注
                        <a href="#">+关注</a></div>
                     </li>
                    <li>
                        <img src="images/activity.png"  />
                        <div><h3>听风歌唱巡演</h3>
                        245人参加<br />
                        904人关注
                        <a href="#">+关注</a></div>
                     </li>
                    <li>
                        <img src="images/activity.png"  />
                        <div><h3>听风歌唱巡演</h3>
                        245人参加<br />
                        904人关注
                        <a href="#">+关注</a></div>
                     </li>
                    <li>
                        <img src="images/activity.png"  />
                        <div><h3>听风歌唱巡演</h3>
                        245人参加<br />
                        904人关注
                        <a href="#">+关注</a></div>
                     </li>
                    <li>
                        <img src="images/activity.png"  />
                        <div><h3>听风歌唱巡演</h3>
                        245人参加<br />
                        904人关注
                        <a href="#">马上参与</a></div>
                     </li>
                </ul>
            </div>
            <div class="roll_dir">
            	<a  href="javascript:void(0);" class="left"></a>
            	<a href="javascript:void(0);" class="right"></a>
            </div>
        </div>
      </div>
      
    </div>
  </div>  
  
      <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
   <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/SideBar/wanerdao2.sidebar.js" type="text/javascript"></script>
   
   <script  type="text/javascript">
        $(function () {
            $("#search_active").click(search_active);
        });
         var reg = new RegExp(',', "g");
        function search_active() {
          activityNames=$("#txt_activityNames").val().replace(reg, ':'), //活动名字串，用“:”分隔 可以缺省默认为空
          catygoryNames=$("#txt_categoryNames").val().replace(reg, ':'), //分类名字串，用“:”分隔 可以缺省默认为空
          friendsName=$("#txt_friendsName").val().replace(reg, ':'), //朋友名字串，用“:”分隔 可以缺省默认为空
          groupNames=$("#txt_groupNames").val().replace(reg, ':'), //圈子名字串，用“:”分隔 可以缺省默认为空
          sightNames=$("#txt_sightNames").val().replace(reg, ':'), //景点名字串，用“:”分隔 可以缺省默认为空
           //注意，为什么要用“:” 分隔，是因为后台获取参数时的正则表达式只支持“:”分隔。
          countryId="", //国家 可以缺省默认为空
          provinceId="", //省份 可以缺省默认为空
          cityId=""//城市 可以缺省默认为空
          var varParameter="activityNames="+activityNames+"&catygoryNames="+catygoryNames+"&friendsName="+friendsName;
          varParameter+="&groupNames="+groupNames+"&sightNames="+sightNames+"&countryId="+countryId;
          varParameter += "&provinceId=" + provinceId + "&cityId=" + cityId;
          alert(varParameter);
         //window.location.href = "Activity_search.aspx?" + varParameter;
        }
    </script> 
</div>

</asp:Content>

