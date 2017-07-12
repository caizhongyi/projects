<%@ Page Title="管理个人日记-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Manage.aspx.cs" Inherits="Personal_Personal_Blog_Manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="管理个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="对个人日记进行修改，删除，重分类等管理操作，并能对分类进行重命名，删除，设定权限等操作" />
<title>管理个人日记-个人-玩儿道</title>
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
    <link href="../style/plugin/fgautocompelte.css" rel="stylesheet" type="text/css" />
    <link href="../style/pop.css" rel="stylesheet" type="text/css" /> 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon pb50">
				<div class="subChaTab pt20">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" class="active" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
                </div>
                <div class="log_tab clearfix mb12">
                     	<ul>
                        	<li><a href="blog.html">查看日志</a></li>
                            <li><a href="blog_compose.html">发表修改日志</a></li>
                            <li><a href="blog_set.html">页面设置</a></li>
                            <li><a href="javascript:;" class="tagf">日志管理</a></li>
                        </ul>
                </div>
                <div class="log_manage clearfix">
                     	<div class="log_manage_le">
                        	<dl>
                            	<dt>分类设置</dt>
                                <dd><label>默认分类</label><select id="selectCat"></select></dd>
                                <dd><label>默认权限</label><select id="selectPermission"></select></dd>
                                <dd class="mt15"><input name="" type="text" class="inp09" id="newcat" ><input name="createCat" type="button" class="inp10" id="createCat" value="新建"></dd>
                            </dl> 
                            <ul id="blogcat">
                            </ul> 
                        </div>
                        <div class="log_manage_ri">
                        	<div class="log_manage_Rxl">
                            	<div class="Rxl_le">
                            	<label>时间</label>
                                    <input name="" type="text" class="inp11" id="time1">
                                    -
                                    <input name="" type="text" class="inp12" id="time2">
                                    <label>分类</label>
                                    <select id="sCat"><option value="">分类</option></select>
                                    <input name="" type="text" class="inp13" id="key" >
                                    <input name="" type="button" class="inp14" value="搜索" id="srhButton">
                                </div>
                                <div class="alb_nav">
                                </div>  
                            </div>
                            <div class="log_manage_Rlist" style=" clear:both;">
                            	<ul id="content">
                                </ul>
                                <div class="page_end">
                                	<div class="alb_nav">
                                        <span class="first"><a href="#">首页</a></span>
                                        <span class="prev"><a href="#">上一页</a></span>
                                        <span><i>01</i>/<i>20</i></span>
                                        <span class="next"><a href="#">下一页</a></span>
                                        <span class="last"><a href="#">末页</a></span>
                                	</div> 
                                    <div class="page_end_le" id="tools">
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                <hr class="h40" />
        </div>

</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server" >

    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/CustomPermission/wanerdao2.custompermission.js" type="text/javascript"></script>
    <script src="../Scripts/OpenProjectPlugin/jquery.overlay.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/message/fgautocompelte.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_manage.js" type="text/javascript"></script>
</asp:Content>

