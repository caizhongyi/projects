<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_mygroup_member.aspx.cs" Inherits="relationship_relationship_mygroup_member" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/group_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/mygroupmember.js" type="text/javascript"></script>
<script type="text/javascript">
    var groupid = $.cookie("wanerdaomygroupID").mygroupID; 
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <div class="main jz">
    	<div class="mCon">
            <div class="prPdBox">
             <div class="subChaTab" id="TopMenu">
              </div>
              
               <div class="Fnavigation" id="myGroupMenu" style="margin-top:0px;">
                </div>
                <div class="ColuTwo_wrap clearfix">
                  <div class="leftside">
                    <h4>搜索</h4>
                    <form name="" method="post" action="">
                      <div class="Serh_Div">
                        <input type="text" id="txt_key" value="请输入关键字" class="Stext he24" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#000'}" onblur="if(this.value==''){this.value=this.defaultValue; this.style.color='#ccc'}" style=" width:123px; color:#CCC;" />
                        <input type="button" class="prBtn" value="搜 索"  onclick="sreachMember()"/>
                      </div>
                    </form>
                  </div>
                  <div class="rCon">
                    <div class="pr_Tag">
                      <div class="prPageNav">
                      <div id="pager1"></div>
                      </div>
                    </div>
                    <div class="list_member">
                    <ul id="fList">
								
							</ul>
                      
                    </div>
                    <div class="pr_Tag">
                  
                  </div>
                </div>
              </div>
          
        </div>
    </div>
    <div class="mBtm jz"></div>



</asp:Content>

