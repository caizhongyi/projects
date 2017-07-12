<%@ Page Title="个人日记-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Blog.aspx.cs" Inherits="Personal_Personal_Blog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="个人日记，个人，玩儿道，生活社交网络" />
<meta name="description" content="按时间，按分类浏览个人日记" />
<title>个人日记-个人-玩儿道</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
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
                        	<li><a href="javascript:;" class="tagf">查看日志</a></li>
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
				<div class="log_manage clearfix">
                     	<div class="log_manage_le">
                        	<div class="log_manage_Lin">
                            	<input name="sText" type="text" class="inp09" id="sText"><input name="" type="button" class="inp10" id="srhcode"  value="查询">
                            </div>
                        	<dl>
                            	<dt class="mb5">文章分类</dt>
                                <dd class="m0">
                                <ul class="mt0" id="articlecat">
                            	
                                </ul>
                                </dd>
                            </dl>  
                                
                            <dl class="mt10">
                                <dt class="mb5">时间分类</dt>
                                <dd class="m0">
                                <ul class="mt0" id="datecat">
                            	
                                </ul>
                                </dd>
                            </dl>  
                        </div>
                        <div class="log_manage_ri">
                        		<div class="log_manage_Rtit">
                                </div>
                                <div class="log_manage_Rfrist">
                                	<div class="alb_nav">
                                	</div> 
                                </div>
                                <div id="content">
                                
                                </div>
                                <div class="page_end mr14">
                                	<div class="alb_nav">
                                	</div> 
                                    
                                </div>
                            
                            
                        </div>
                     </div>
                 <hr class="h40" />
        </div>
        <!--底部end-->
<ul id="test_xl">
<li><a href="#">保存</a></li>
<li><a href="#">打印</a></li>
<ul>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Weather/wanerdao2.weather.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/blog_list.js" type="text/javascript"></script>
</asp:Content>