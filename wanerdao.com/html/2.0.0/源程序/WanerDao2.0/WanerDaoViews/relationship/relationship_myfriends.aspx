<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_myfriends.aspx.cs" Inherits="relationship_relationship_myfriends" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/myfriends.js" type="text/javascript"></script>

<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
<style type="text/css">
	.layer{ position:absolute; background:#fff; border:1px solid #ddd; padding:10px; box-shadow:1px 1px 5px #ddd; z-index:999;}
	.layer li{ padding:5px 0;}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">
              </div>
              <div class="ColuTwo_wrap clearfix">
					<div class="leftside">
						<ul class="friSideNav f14" id="ul_friendsgroup">
                          
                        </ul>
                        <div class="addGroup">
                            <h3 class="groupTit f14">添加分组</h3>
                            <p><input type="text" id="txt_addGroup" class="Stext he24" style="width:122px;  color:#CCC;" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" value="请输入分组名称" /> <input type="button" value="添 加" onclick="addGroup()" class="prBtn"/></p>
                        </div>
					</div>
                    <div ></div>
                    
					<div class="rCon">
						<div class="pageBar">
                        	<i class="cbtn"><input type="checkbox" onclick="changeCheck(this)"  class='checkFriend'  /></i>
                            <i class="opera">
                            	<a href="#" class="icon_2"  onmousedown="mousedowndeal(this);" onmouseup='mouseupdeal()' ></a>
                            	<a href="javascript:deleteAllFriend();" class="icon_3"></a>
                            </i>
                            <i class="page" id="pager1" style="padding-top:0; margin-top:0;">
                            	   </i>
                        </div>
                        <div class="layer" style="display:none;">
	                        <ul id="selectclassUL">
    	                        <li><a href="#">列表1</a></li>
                                <li><a href="#">列表1</a></li>
                                <li><a href="#">列表1</a></li>
                                <li><a href="#">列表1</a></li>
                            </ul>
                        </div>
               
                        <div class="letQuery yh fb">
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
              			<div class="pageBar">
                        	<i class="cbtn"><input type="checkbox" onclick="changeCheck(this)"  class='checkFriend'  /></i>
                            <i class="opera">
                            	<a href="#" class="icon_2"  onmousedown="mousedowndeal(this);" onmouseup='mouseupdeal()'></a>
                            	<a href="javascript:deleteAllFriend();" class="icon_3"></a>
                            </i>
                           
                        </div>
					</div>
				</div>
              <div class="blank5px"></div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>

</asp:Content>

