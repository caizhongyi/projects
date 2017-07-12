<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_myfriends.aspx.cs" Inherits="relationship_relationship_myfriends" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>我的好友-关系-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="我的好友，关系，玩儿道，生活社交网络" />
<meta name="description" content="管理所有的好友，可以进行分组，解除关系等操作" />
 
     <link rel="stylesheet" type="text/css" href="../css/pager.css" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
<style type="text/css">
	.layer{ position:absolute; background:#fff; border:1px solid #ddd; padding:10px; box-shadow:1px 1px 5px #ddd; z-index:999; left:47px;}
	.layer li{ padding:5px 0;}
</style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
 <div class="layer" style="display:none;">
	                                <ul id="selectclassUL">
    	                               
                                    </ul>
                                </div>
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div id="TopMenu"></div>
        
        <div class="ColuTwo_wrap clearfix">
					<div class="leftside" style="width:260px;">
						<ul class="friSideNav f14"  id="ul_friendsgroup">
                           
                        </ul>
                        <div class="addGroup">
                            <h3 class="groupTit f14">添加分组</h3>
                            <p><input type="text" id="txt_addGroup" class="text" style="width:122px; color:#CCC;" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" value="请输入分组名称" /> <input type="button" value="添 加" onclick="addGroup()"  class="prBtn"></p>
                        </div>
					</div>
                    
					<div class="rCon">
						<div class="topNav clearfix">
                        	<div class="f_left">
                            	<input type="checkbox" onclick="changeCheck(this)"  class='checkFriend' />
                               
                                 <div class="sift_option inline"></div>
                                 <div class="opera inline">
                                    <a href="javascript:void(0);" class="icon_1" style="width:2px;"></a>
                                    <a href="javascript:void(0);" class="icon_2 layer_btn"   onmouseup='mouseupdeal()' ></a>
                                    <a href="javascript:deleteAllFriend();"  class="icon_3"></a>
                                </div>
                                 
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right">
                             </div>
                            <!-- 分页右边 -->
                          
            	        </div>
                        <div class="letQuery f-YH fBold">
                        	<a href="javascript:searchByPY('');">全部</a>
                            <a href="javascript:searchByPY('A');">A</a>
                            <a href="javascript:searchByPY('B');">B</a>
                            <a href="javascript:searchByPY('C');">C</a>
                            <a href="javascript:searchByPY('D');">D</a>
                            <a href="javascript:searchByPY('E');">E</a>
                            <a href="javascript:searchByPY('F');">F</a>
                            <a href="javascript:searchByPY('G');">G</a>
                            <a href="javascript:searchByPY('H');">H</a>
                            <a href="javascript:searchByPY('I');">I</a>
                            <a href="javascript:searchByPY('J');">J</a>
                            <a href="javascript:searchByPY('K');">K</a>
                            <a href="javascript:searchByPY('L');">L</a>
                            <a href="javascript:searchByPY('M');">M</a>
                            <a href="javascript:searchByPY('N');">N</a>
                            <a href="javascript:searchByPY('O');">O</a>
                            <a href="javascript:searchByPY('P');">P</a>
                            <a href="javascript:searchByPY('Q');">Q</a>
                            <a href="javascript:searchByPY('R');">R</a>
                            <a href="javascript:searchByPY('S');">S</a>
                            <a href="javascript:searchByPY('T');">T</a>
                            <a href="javascript:searchByPY('U');">U</a>
                            <a href="javascript:searchByPY('V');">V</a>
                            <a href="javascript:searchByPY('W');">W</a>
                            <a href="javascript:searchByPY('X');">X</a>
                            <a href="javascript:searchByPY('Y');">Y</a>
                            <a href="javascript:searchByPY('Z');">Z</a>
                        </div>
                        <ul class="fList" id="fList">
                        	
                        </ul>
              			<div class="topNav bmNav clearfix">
                            <div class="f_left">
                            	<input type="checkbox"  onclick="changeCheck(this)"  class='checkFriend'/>
                                <div class="sift_option inline"></div>
                                 <div class="opera inline">
                                    <a href="javascript:void(0);" class="icon_1" style="width:2px;"></a>
                                    <a class="icon_2 layer_btn " href="javascript:void(0);" onmousedown="mousedowndeal(this);"
                                                  onmouseup='mouseupdeal()'></a>
                                    <a href="javascript:deleteAllFriend();"  class="icon_3"></a>
                                </div>
                            </div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right">
                            </div>
                            <!-- 分页右边 -->
            	        </div>
					</div>
        </div>     
    </div>
</div>
<div class="mes_main_bot"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">

<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myfriends.js" type="text/javascript"></script>
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
 <script type="text/javascript" src="../scripts/jquery.plus.js" ></script>
 <script type="text/javascript" src="../scripts/plugin/cookie/wanerdao2.cookies.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>
    <script type="text/javascript" src="../scripts/global.js"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.dialog.js"></script>
   <script type="text/javascript" src="../scripts/plugin/TipPop/wanerdao2.pop.js"></script>

 <script type="text/javascript">
     $(function () {

         $(".layer_btn").floatbox('click', { move: false, box: '.layer', axis: 'y' });
     });
 </script>
</asp:Content>

