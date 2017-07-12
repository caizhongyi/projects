<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_group_search.aspx.cs" Inherits="relationship_relationship_group_search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>寻找圈子-关系-玩儿道</title>
<meta name="keywords" content="寻找圈子，关系，玩儿道，生活社交网络" />
<meta name="description" content="寻找玩儿道中开放的圈子" />

<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        
        <div id="TopMenu"></div>
        
        
        <div class="clearfix">
                <div class="ColuTwo_wrap clearfix">
                  <div class="leftside">
                    <h4>圈子搜索</h4>
                    <div style=" padding:10px 0px 0px 10px;">
                    
                        <table class="ltTabDate" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td><div class="ltSearch rel_lh"><input type="text" id="txt_name" value="请输入关键字" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" class="prInpSty text" /></div><div class="black5"></div></td>
                                </tr>
                                <tr>
                                    <td><div class="rel_lh"><select name="select" style="width:203px" id="groupCateList">
                                 
                                </select></div></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="lt_Btn" style="padding-left:0;"><input type="button" onclick="sreachGroup()"  class="prBtn" value="搜 索" /></div>
                        
                        <div class="black10"></div>
                        <div class="black10"></div>
                        <div class="blank10"></div>
                          
                        <div class="black10"></div>
                        <div class="black10"></div>
                        <div class="blank10"></div>
                          
                        <div class="black10"></div>
                        <div class="black10"></div>
                        <div class="blank10"></div>
                      <%--  <ul class="friSideNav f14">
                            
                            <li><a href="javascript:sreachbyHobby();">可能感兴趣的圈子 </a></li>
                            <li><a href="javascript:sreachbyfriend();">好友参加的圈子 </a></li>
                        </ul>--%>
                        
                        
                    </div>
                  </div>
                  <div class="rCon" >
						
                        <div class="topNav clearfix">
                        	<div class="f_left rel_sear_tit">搜索结果</div>
                        	<!-- 分页右边 -->
                            <div class="pageList  f_right"></div>
                            <!-- 分页右边 -->
                            
            	        </div>
                        
<div class="search_result" style="min-height:300px;">
							<ul  id= "fList" >
								
							</ul>
						</div>
                        
              			<div class="topNav bmNav clearfix">
                        	
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
<script src="../scripts/jquery.chosen/jquery.chosen.js"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 
 <script src="../Scripts/relationship/groupsSearch.js" type="text/javascript"></script>
</asp:Content>

