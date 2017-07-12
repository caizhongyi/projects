<%@ Page Title="设置隐私-账号维护-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Private_Set.aspx.cs" Inherits="Personal_Private_Set" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="设置隐私，账号维护，玩儿道，生活社交网络" />
<meta name="description" content="对个人在日记，相册，视频，即时聊天等处的隐私权限进行统一设置，管理" />
<title>设置隐私-账号维护-玩儿道</title>
    <link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 
    <style type="text/css">
        /*自动完成控件 begin*/
             ul{ margin:0; padding:0; list-style:none;}
            .fmain{ border:solid 1px #00f; position:absolute; background-color:#fff; display:none; overflow:hidden; }
            
            li.over{background-color:#adf;}
        /*自动完成控件 end*/
        
            
            #friendlist{ list-style:none; float:left;}
            #friendlist li{ float:left; line-height:20px;}
            #inputtxt{ float:left;}
            .revicer{ height:25px; line-height:25px; overflow-x:hidden; position:relative; float:left;}
            .findfriend{ float:left;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon pb50">
				<div class="subChaTab pt20">
					 <a href="#" class="active">隐私设置</a>
                </div>
				<div class="Sfrist_box">
                    	<h1>个人主页</h1>
                        <div class="Sfrist_box_con">
                            <ul>
                            	<%--<li><label>谁都可以浏览我的个人主页</label><select name="select">
                                          <option value="1">话题分类</option>
                                          <option value="2">帖子分类</option>
                                          <option value="3">辩论分类</option>
                		  				</select></li>--%>
                                <li><label>基本信息</label><select id="baseinfoPer"></select></li>
                                <li><label>教育信息</label><select id="educationPer"></select></li>
                                <li><label>工作背景</label><select id="workPer"></select></li>
                                <li><label>兴趣爱好</label><select id="interestPer"></select></li>
                                <li><label>联系方式</label><select id="contactPer"></select></li>
                                <%--<li><label>状态更新</label><select name="select">
                                          <option value="1">话题分类</option>
                                          <option value="2">帖子分类</option>
                                          <option value="3">辩论分类</option>
                		  				</select></li>--%>
                            </ul>
                        </div>
                        
                        <div class="Sfrist_box_end clearfix">
                        	<ul>
                            	<li><a href="blog_manage.html">日志设置</a></li>
                                <li class="set_end_bg"><a href="photo_album_manage.html">相册设置</a></li>
                                <li class="set_end_bg01"><a href="video_album_manage.html">视频设置</a></li>
                            </ul>
                        </div>
                    </div>
            <div id="Sfrist_box" class="Sfrist_box" >
                <h1>自定义权限设置</h1>
                <div class="Ssecond_box_con">
                        	
                    <div class="custom_box clearfix">
                        <ul>
                            
                        </ul>
                    </div>
                    <div class="custom_box01 clearfix">
                        <span class="custom_tit" id="add_per" style=" cursor: pointer;" > 　自定义权限</span>
                        <input type="hidden" id="per_id" />
                        <ul id="per_box" style=" margin-top: 10px; display: none; ">
                            <li class="custom_qx"><label>权限名：</label><input name="per_name" id="per_name" type="text" maxlength="50"></li>
                            <li class="custom_ts">对他们可见 <font color="#E84C4F">(可多条件输入，结果为所有条件的并集)</font></li>
                            <li class="custom_friend clearfix" >
                                <label>1</label><select name="friendgroup" id="friendgroup"><option value="">好友分组</option></select>
                                <label>2</label><select name="group" id="group"><option value="">我的圈子</option></select>
                                <label>3</label><input name="" type="text" class="cus_inp" id="allowUser" maxlength="50"><input type="button" id="chooseAllowUser" rel="#ff" class="cus_choose_user" value=" 选择 "/>
                                <input name="" type="button" value="添加" class="cus_but" id="addAllow">
                            </li>
                            <li class="custom_tj" id="allowlist">
                            </li>
                            <li>对他们不可见<font color="#E84C4F">(可多条件输入，结果为所有条件的并集)</font></li>
                            <li class="custom_xz clearfix">
                                <input name="" type="text" class="cus_inp m0" id="refuseUser" maxlength="50"><input type="button" id="chooseRefuseUser" rel="#ff" class="cus_choose_user" value="选择 ">
                                <input name="" type="button" value="添加" class="cus_but" id="addRefuse">
                            </li>
                            <li class="custom_tj" id="refuselist">
                            </li>
                            <li><input name="" type="button" value="保存" class="hobby_but close submit"><input name="" type="button" value="取消" class="hobby_but01 close cancel"></li>
                        </ul>
                    </div>
                </div>
                </div>
                      
                      
            <div class="Sfrist_box">
                <h1>个人主页</h1>
                <div class="Sfrist_box_con">
                    <ul>
                        <li><label>谁可以跟我打招呼</label><select id="canMsgMe"></select></li>
                        <li><label>谁可以向我发送好友申请</label><select id="canFriendRequest"></select></li>
                    </ul>
                </div>
            </div>
            <div class="Sfrist_box">
                    	<h1>个人主页</h1>
                        <div class="Sfrist_box_con">
                        	<ul>
                            	<li><label class="w290">允许站外人在登陆页上或通过搜索引擎搜索到我的账号</label><select id="canFindMe">
                        <option value="1" selected="selected">允许</option>
                        <option value="0" >不允许</option>
                    </select></li>
                            </ul>
                        </div>
                    </div>
        </div>












        
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">
         <script src="../Scripts/OpenProjectPlugin/jquery.overlay.js" type="text/javascript"></script>
    <script src="../Scripts/message/fgautocompelte.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Search/wanerdao2.compop.js" type="text/javascript"></script>
    <script src="../Scripts/person/private_set.js" type="text/javascript"></script>
   

</asp:Content>

