<%@ Page Title="个人相册-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Ablum.aspx.cs" Inherits="Personal_Personal_Photo_Ablum" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="个人相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="浏览所有个人相册" />
<title>个人相册-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
    <style type="text/css" >
        .tabsNav, #main{ width:1010px; margin:0 auto;}
        .tabsNav ul{ list-style:none; margin:0; padding:0;}
        .tabsNav li{ float:left;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    	<div class="mCon" style="padding:0;">
            <div class="prPdBox">
              <div class="subChaTab">
                     <a href="javascript:;" id="tab_zl">资料</a>
					 <a href="javascript:;" id="tab_rz">日志</a>
					 <a href="javascript:;" id="tab_xc" class="active">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
              </div>
              <div class="clearfix">
              


    <%if (isCurUser)
      { %>
      <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="photo_album.html" class="cur">浏览相册</a></li>
                    <li><a href="photo_upload.html">上传照片</a></li>
                    <li><a href="photo_album_manage.html">管理相册</a></li>
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
                
                <div class="pa_tit clearfix">
                	<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
					<div class="alb_set alb_setExt"><b class="ico_myalb"></b>我的相册<strong></strong></div>
					<div class="alb_sort"><b class="acti_bgc"></b><span>自己创建相册</span><b class="pers_bgc"></b><span>活动自建相册</span></div>
				</div>
                <div class="blank10px"></div>
				<div class="alb_edit_wp clearfix">
						<div class="alb_pre_wp01">
							<ul class="alb_list clearfix">
							
							</ul>
						</div>
						<div class="alb_tag clearfix">
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
					
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>

</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server" >

    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_album.js" type="text/javascript"></script>
</asp:Content>