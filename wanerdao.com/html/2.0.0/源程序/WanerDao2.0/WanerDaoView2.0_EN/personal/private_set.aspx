<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="private_set.aspx.cs" Inherits="personal_private_set" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Set privacy-Account-Savorboard</title>
<meta name="keywords" content="Set privacy, Account, Savorboard, Life and social network" />
<meta name="description" content="Set privacy for diary, album, video, chart and others" />
    <link href="../css/layout.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/form.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/private.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
 <link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
    <link href="../scripts/plugin/autocomplete/fgautocompelte.css" rel="stylesheet" type="text/css" />
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
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">

<div class="container layout clearfix">
	 <div class="tabs">
    	 <div class="mes_com_box_Tab">
        	<a class="active" href="javascript:;">隐私设置</a>
         </div>
         
         <div class="tabs-panel">
             <div class="private-box">
                <h3><span></span>个人主页</h3>
                <div class="box-panel">
                    <ul class="private-form">
                        <li><label>基本信息</label><select id="baseinfoPer"></select></li>
                        <li><label>教育背景</label><select id="educationPer"></select></li>
                        <li><label>工作背景</label><select id="workPer"></select></li>
                        <li><label>兴趣爱好</label><select id="interestPer"></select></li>
                        <li><label>联系方式</label><select id="contactPer"></select></li>
                    </ul>
                </div>
                
                <div class="box-panel">
                    <ul class="settings">
                        <li class="settings-item1"><a href="blog_manage.html">日志设置</a></li>
                        <li class="settings-item2"><a href="photo_album_manage.html">相册设置</a></li>
                        <li class="settings-item3"><a href="video_album_manage.html">视频设置</a></li>
                    </ul>
                </div>
             </div>
             
             <div class="private-box">
                <h3><span></span>自定义权限设置</h3>
                <div class="box-panel right-setting">
                    <ul class="rights custom_box">
                    	
                    </ul>  
                    <h3 id="add_per" style=" cursor: pointer;"><span>-</span>自定义新权限</h3>
                    <div id="per_box" style=" display: none;">
                        <input type="hidden" id="per_id" />
                        <div><label>权限名：</label><input class="text" name="per_name" id="per_name" maxlength="50"/></div>
                        <p>对他们可见<em>(可多条件输入，结果为所有条件的并集)</em></p>
                            <ul class="steps">
                    	<li class="steps-item1"><select name="friendgroup" id="friendgroup" style=" width: 110px"><option value="">好友分组</option></select></li>
                        <li class="steps-item2"><select name="group" id="group" style=" width: 110px"><option value="">我的圈子</option></select></li>
                        <li class="steps-item3"><div class="labeltext"><input type="text" id="allowUser" maxlength="50"/><img alt="" src="../images/personal.png" id="chooseAllowUser" /></div><input type="button" class="button" value="添加" class="cus_but" id="addAllow"/></li>
                    </ul>
                            <div class="tips-1">
                    	<div class="arrowhead" style="left:80%;"></div>
                        <ul class="conditions" id="allowlist">

                        </ul>
                    </div>
                        <p>对他们不可见<em>(不可见优先级大于可见)</em></p>
                        <div class="labeltext"><input  type="text" id="refuseUser" maxlength="50"/><img alt="" src="../images/personal.png" id="chooseRefuseUser" /></div><input type="button" class="button" value="添加" id="addRefuse"/>
                    
                        <div class="tips-1">
                    	<div class="arrowhead"></div>
                        <ul class="conditions" id="refuselist">
                        	
                        </ul>
                    </div>
                        <input name="" type="button" value="保存" class="buttonB btn_w100 btn_h36 btnBlue_135 fSize-14 submit">
                        <input name="" type="button" value="取消" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14 cancel">
                      
                    </div>
                </div>
             </div>
             
              <div class="private-box">
                <h3><span></span>打招呼/好友申请</h3>
                <div class="box-panel">
                    <ul class="private-form">
                        <li><label>谁可以跟我打招呼</label><select id="canMsgMe"></select></li>
                        <li><label>谁可以向我发送好友申请</label><select id="canFriendRequest"></select></li>
                    </ul>
                </div>
             </div>
             
              <div class="private-box">
                <h3><span></span>站外搜索</h3>
                <div class="box-panel">
                    <ul class="private-form">
                        <li><label style="width:322px">允许站外人在登陆页上或通过搜索引擎搜索到我的账号</label>
                        <select id="canFindMe">
                        <option value="1" selected="selected">允许</option>
                        <option value="0" >不允许</option>
                        </select></li>
                    </ul>
                </div>
             </div>
             
         </div>
     </div>
     
</div><!--loginMain-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/plugin/autocomplete/fgautocompelte.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/search/wanerdao2.compop.js"></script>
    <script src="../scripts/personal/private_set.js" type="text/javascript"></script>
</asp:Content>

