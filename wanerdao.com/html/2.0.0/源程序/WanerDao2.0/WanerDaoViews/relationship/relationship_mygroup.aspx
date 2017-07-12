<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup.aspx.cs" Inherits="relationship_relationship_mygroup" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/mygrouplist.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
              <div class="subChaTab" id="TopMenu">

              </div>
              <div class="clearfix">
                <div class="ColuTwo_wrap clearfix">
                  <div class="leftside">
                    <h4>搜索圈子</h4>
                    <form name="" method="post" action="">
                      <div class="Serh_Div">
                        <input type="text" id="groupKey" value="请输入关键字" class="Stext he24" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#ccc'}" style=" width:123px; color:#CCC;" />
                        <input type="button" class="prBtn" value="搜 索" onclick="sreachgroup();" />
                      </div>
                    </form>
                  </div>
                  <div class="rCon">
                    <div class="pr_Tag">
                      <div class="prPageNav">
                    <div id="pager1"></div>
                      </div>
                    </div>
                    <div class="groupList">
							<ul id="fList">
								
							</ul>
						</div>
           
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>


</asp:Content>

