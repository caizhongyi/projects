<%@ Page Title="浏览个人日记-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog_View.aspx.cs" Inherits="Personal_Personal_Blog_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="日记浏览，个人，玩儿道，生活社交网络" />
<meta name="description" content="日记浏览及评论" />
<title>浏览个人日记-个人-玩儿道</title>
<link href="../style/nav_info.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    	<div class="mCon pb50">
				<div class="subChaTab pt20">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" class="active" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
                </div>
                <%if (isCurUser)
                  { %>
				<div class="log_tab clearfix mb12">
                     	<ul>
                        	<li><a href="javascript:void(0);" class="tagf">查看日志</a></li>
                            <li><a href="blog_compose.html">发表修改日志</a></li>
                            <li><a href="blog_set.html">页面设置</a></li>
                            <li><a href="blog_manage.html">日志管理</a></li>
                        </ul>
                </div>
                <script type="text/javascript">
                    var self = true;
                </script>
                <%} 
else
{ %>
<script type="text/javascript">
    var self = false;
</script>
<%} %>
                <div class="log_viewinfo">

                </div>
                <hr class="h40" />
        </div>
    <div class="blog_content">
        
    </div>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server" >
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_view.js" type="text/javascript"></script>
</asp:Content>