<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_group_search.aspx.cs" Inherits="relationship_relationship_group_search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/groupsSearch.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">
              </div>
              <div class="ColuTwo_wrap clearfix">
					<div class="leftside">
                        <h4><b></b>圈子搜索</h4>
                        <div style=" padding:10px 0px 0px 10px;">
                        <form name="" method="post" action="">
                            <table class="ltTabDate" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td><div class="ltSearch"><input type="text" id="txt_name" value="请输入关键字" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}" class="prInpSty" /></div></td>
                                    </tr>
                                    <tr>
                                        <td><select id="groupCateList"> </select></td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                            <div class="lt_Btn" style="padding-left:0;"><input type="button" onclick="sreachGroup()" class="prBtn" value="搜 索" /></div>
                        </form>
                        </div>
                        <div class="blank10px"></div>
                        <ul class="friSideNav f14">
                            <li><a href="javascript:sreachbyHobby();">可能感兴趣的圈子</a></li>
                            <li><a href="javascript:sreachbyfriend();">好友参加的圈子</a></li>
                        </ul>
					</div>
					<div class="rCon">
						<div class="pr_Tag">
							<div class="l">
								<i>搜索结果</i>
							</div>
							<div class="prPageNav">
								<div id="pager1"></div>
							</div>
						</div>
						<div class="search_result">
							<ul id= "fList">
								
							</ul>
						</div>
					
					</div>
				</div>
              <div class="blank5px"></div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>




</asp:Content>

