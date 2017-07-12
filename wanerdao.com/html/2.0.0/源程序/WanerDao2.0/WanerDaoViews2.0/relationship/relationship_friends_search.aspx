<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="relationship_friends_search.aspx.cs" Inherits="relationship_relationship_friends_search" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>寻找朋友-关系-玩儿道</title>
<meta name="keywords" content="寻找朋友，关系，玩儿道，生活社交网络" />
<meta name="description" content="根据用户性别，性别，大致区域等综合条件在玩儿道中寻找符合的潜在好友" />

<link rel="stylesheet" type="text/css" href="../css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="../scripts/jquery.chosen/jquery.chosen.css" media="all" />
<link rel="stylesheet" type="text/css" href="../css/relationship.css" media="all" />
 <link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div class="mes_main layout">
	<div class="mes_box per_blog clearfix">
        

        <div  id="TopMenu"></div>
        
        
        <div class="clearfix">
                <div class="ColuTwo_wrap clearfix Lw290_Rw655">
                  <div class="leftside">
                    <h4>搜索好友</h4>
                    <div style=" padding:10px 0px 0px 10px;">
                    
                        <div class="ltSearch"><input type="text" id="txtname" value="请输入关键字" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  class="text" style="width:270px; color:#CCC" /></div>
                        <table class="ltTabDate" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr class="first">
                                    <td class="name">性&emsp;&emsp;别：</td>
                                    <td><label for="unlim"><input type="radio" name="sex" id="unlim" class="vInput" />不限</label><label for="male"><input type="radio" name="sex" id="male" class="vInput" />男</label><label for="female"><input type="radio" name="sex" id="female" class="vInput" />女</label></td>
                                </tr>
                                <tr>
                                    <td class="name">年&emsp;&emsp;龄：</td>
                                    <td><select name="select" style="width:215px" id="lsbAge">
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
                                    <td><select name="select" style="width:215px" id="ConstellationList">
                                   <option value="">请选择</option>
                                              <option value="白羊座">白羊座</option>
                                              <option value="金牛座">金牛座</option>
                                              <option value="双子座">双子座</option>
                                              <option value="巨蟹座">巨蟹座</option>
                                              <option value="狮子座">狮子座</option>
                                              <option value="处女座">处女座</option>
                                              <option value="天枰座">天秤座</option>
                                              <option value="天蝎座">天蝎座</option>
                                              <option value="射手座">射手座</option>
                                              <option value="摩羯座">摩羯座</option>
                                              <option value="水瓶座">水瓶座</option>
                                              <option value="双鱼座">双鱼座</option>
                                </select></td>
                                </tr>
                                <tr>
                                    <td class="name">所&ensp;在&ensp;地：</td>
                                    <td>
                                    <input type="text" class="text" name="txtAcArea" value="点击选择城市" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  id="currentbtn" style="width:205px;color:#CCC"/>
                                  </td>
                                </tr>
                                <tr>
                                    <td class="name">家&emsp;&emsp;乡：</td>
                                    <td>
                                   <input type="text" class="text" name="txtAcArea" value="点击选择城市" onclick="if(this.value==this.defaultValue){this.value=''; this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  id="birthbtn" style="width:205px;color:#CCC"/>
                                </td>
                                </tr>
                                <tr class="fav">
                                    <td class="name">兴趣爱好：</td>
                                    <td><input type="text" value="请输入兴趣爱好" id="txthobby" onclick="if(this.value==this.defaultValue){this.value='';this.style.color='#333';}" onblur="if(this.value==''){this.value=this.defaultValue;this.style.color='#ccc'}"  class="text" style="width:205px;color:#CCC" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="lt_Btn"><input type="button" class="prBtn" value="清 空" onclick="clearAll()"/><input type="button" class="prBtn" value="搜 索" onclick ="searchFriends()" /></div>
                        
                    </div>
                  </div>
                  <div class="rCon">
						
                        <div class="topNav clearfix">
                        
                        	<!-- 分页左边 -->
                            <div class="f_left rel_sear_tit">
                                搜索结果
                            </div>
                            <!-- 分页左边 -->
                            <!-- 分页右边 -->
                            <div class="pageList  f_right"></div>
                            <!-- 分页右边 -->
                            
            	        </div>
                        
                        <div class="list_member data-contianer">
                          <ul id="fList">
                           
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
<script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
<script src="../Scripts/relationship/friendsSearch.js" type="text/javascript"></script>
<script src="../Scripts/relationship/relation_common.js" type="text/javascript"></script>
 <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script> 

     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
     <script type="text/javascript" src="/scripts/plugin/area/wanerdao2.area.js"></script>
</asp:Content>

