<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup.aspx.cs" Inherits="relationship_relationship_mygroup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>我的圈子-关系-玩儿道</title>
<meta name="keywords" content="我的圈子，关系，玩儿道，生活社交网络" />
<meta name="description" content="维护管理所有已经参加的圈子，并可以向圈子发帖，进入圈子主页，离开圈子等操作" />

<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">

        <div id="TopMenu"></div>

        <div id="msgDIV" style="color:Red"></div>
        <div class="ColuTwo_wrap clearfix">
					<div class="leftside">
                        <div class="black10"></div>
                        <div class="addGroup">
                            <h3 class="groupTit f14 follow_tit">搜索圈子</h3>
                            <p><input type="text" id="groupKey"  class="text" style="width:122px; color:#CCC;" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" value="请输入圈子名" /> <input type="button" value="搜 索" class="prBtn" onclick="sreachgroup();" /></p>
                        </div>
					</div>
					<div class="rCon" >
						<div class="topNav">
                            <div class="clearfix pagewrap">
                        <!-- 分页右边 -->
                        <div class="pageList  f_right"></div>
                        <!-- 分页右边 -->
                    </div>
            	        </div>
                        
            	        <div class="groupList" style="min-height:300px;">
							<ul id="fList">
								
							</ul>
						</div>
                        
              			<div class="topNav bmNav">
                            <div class="clearfix pagewrap">
                        <!-- 分页右边 -->
                        <div class="pageList  f_right"></div>
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
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>

<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
  <script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/mygrouplist.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
   <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>
</asp:Content>

