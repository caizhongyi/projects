<%@ Page Title="设定个人日记-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_Set.aspx.cs" Inherits="Personal_Personal_Blog_Set" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="设定个人日记-个人-玩儿道" />
<meta name="description" content="设定个人日记薄的薄名，签名等信息" />
<title>设定个人日记-个人-玩儿道</title>
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
          #blogname{ }
          .focus{  border: solid 1px #bbb; background-color:#fff;}
          #blogdesc{ min-width:100px; }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon pb50">
				<div class="subChaTab pt20">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" class="active" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
                </div>
				<div class="log_tab clearfix">
                     	<ul>
                        	<li><a href="blog.html">查看日志</a></li>
                            <li><a href="blog_compose.html">发表修改日志</a></li>
                            <li><a href="javascript:;" class="tagf">页面设置</a></li>
                            <li><a href="blog_manage.html">日志管理</a></li>
                        </ul>
                 </div>
                 <div class="log_add">
                     	<ul>
                        	<li><label>日志空间名：</label><input name="" type="text" class="inp01" id="txtBlogName" maxlength="50"></li>
                            <li><label class="v_top">个人签名：</label><textarea name="" class="inp02" id="txtBlogDesc" maxlength="300"></textarea></li>
                            <li><input name="" type="button" value="保存" id="btnSave" class="hobby_but"><input name="" type="button" value="取消" class="hobby_but01" id="btnCancel" ></li>
                        </ul>
                 </div>
        </div>

</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server" >
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_set.js" type="text/javascript"></script>
</asp:Content>