<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_friends_search.aspx.cs" Inherits="relationship_relationship_friends_search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/layout.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<link rel="stylesheet" type="text/css" href="../style/relationship.css" media="all" />
 <link rel='stylesheet' href="../css/PluginCss/pop.css" type="text/css" />
<link href="../style/select_upload.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/common/wanerdaoutils.js"></script>
    <script type="text/javascript" src="../Scripts/multipleLanguage/loader.js"></script>    
    <script type="text/javascript" src="../Scripts/Plugin/Area/wanerdao2.area.js"></script>
    <script type="text/javascript" src="../Scripts/OpenProjectPlugin/jquery.overlay.js"></script>
 <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
<script src="../Scripts/relationship/friendsSearch.js" type="text/javascript"></script>

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
                    <h4>搜索好友</h4>
                    <div style=" padding:10px 0px 0px 10px;">
                    <form name="" method="post" action="">
                        <div class="ltSearch"><input type="text" id="txtname" value="请输入关键字" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  class="prInpSty" /></div>
                        <table class="ltTabDate" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr class="first">
                                    <td class="name">性&emsp;&emsp;别：</td>
                                    <td><label for="unlim"><input type="radio" name="sex" id="unlim" class="vInput" />不限</label><label for="male"><input type="radio" name="sex" id="male" class="vInput" />男</label><label for="female"><input type="radio" name="sex" id="female" class="vInput" />女</label></td>
                                </tr>
                                <tr>
                                    <td class="name">年&emsp;&emsp;龄：</td>
                                    <td> 
                                        <select id="lsbAge">
                                            <option value="">请选择</option>
                                            <option value="1">20以下</option>
                                            <option value="2">20-25</option>
                                            <option value="3">25-30</option>
                                            <option value="4">30-35</option>
                                            <option value="5">35-40</option>
                                            <option value="6">40以上</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <td class="name">星&emsp;&emsp;座：</td>
                                    <td> <select id="ConstellationList">
                                            <option value="">请选择</option>
                                              <option value="白羊座">白羊座</option>
                                              <option value="金牛座">金牛座</option>
                                              <option value="双子座">双子座</option>
                                              <option value="巨蟹座">巨蟹座</option>
                                              <option value="狮子座">狮子座</option>
                                              <option value="处女座">处女座</option>
                                              <option value="天枰座">天枰座</option>
                                              <option value="天蝎座">天蝎座</option>
                                              <option value="射手座">射手座</option>
                                              <option value="魔蝎座">魔蝎座</option>
                                              <option value="水瓶座">水瓶座</option>
                                              <option value="双鱼座">双鱼座</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <td class="name">所&ensp;在&ensp;地：</td>
                                    <td><input  type="button"  class="prBtn" value="查询" id="currentbtn" rel="#tt" /><label id="currentlab"></label></td>
                                </tr>
                                <tr>
                                    <td class="name">家&emsp;&emsp;乡：</td>
                                    <td><input  type="button"  class="prBtn" value="查询" id="birthbtn" rel="#tt" /><label id="birthlab"></label></td>
                                </tr>
                                <tr class="fav">
                                    <td class="name">兴趣爱好：</td>
                                    <td><input type="text" id="txthobby" value="请输入兴趣爱好" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  class="prInpSty" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="lt_Btn"><input type="button" class="prBtn" value="清 空" onclick="clearAll()" /><input type="button" class="prBtn" value="搜 索" onclick ="searchFriends()"/></div>
                    </form>
                    </div>
                  </div>

                  


                  <div class="rCon">
                    <div class="list_member">
                      <ul id= "fList">
                      
                      </ul>
                    </div>
                    <div class="pr_Tag" id="pager1">
                       </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>

</asp:Content>

