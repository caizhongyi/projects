<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_member.aspx.cs" Inherits="relationship_relationship_mygroup_member" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>圈子成员-关系-玩儿道</title>
<meta name="keywords" content="圈子成员，关系，玩儿道，生活社交网络" />
<meta name="description" content="圈子的成员列表，管理员可以在这里批准新成员" />

<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>

        <div class="black10"></div>
        
        <div class="log_tab clearfix mb12" id="myGroupMenu">
           
        </div>
        
        <div class="ColuTwo_wrap clearfix">
					<div class="leftside">
                        <div class="black10"></div>
                        <div class="addGroup">
                            <h3 class="groupTit f14 follow_tit">搜索成员</h3>
                            <p><input type="text" id="txt_key" class="text" style="width:122px; color:#CCC;" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" value="请输入关键字" /> <input type="button" value="搜 索" class="prBtn"   onclick="sreachMember()"/></p>
                        </div>
					</div>
					<div class="rCon" style="width:713px;">
						<div class="topNav">
                            <div class="clearfix pagewrap">
                        <!-- 分页右边 -->
                        <div class="pageList  f_right"></div>
                        <!-- 分页右边 -->
                    </div>
            	        </div>
                        
                        <div class="list_member">
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
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
<script src="../scripts/jquery.chosen/jquery.chosen.js"  type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
<script src="../Scripts/relationship/mygroupmember.js" type="text/javascript"></script>
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
</asp:Content>

