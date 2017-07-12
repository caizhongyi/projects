<%@ Page Title="浏览个人视频册-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Album.aspx.cs" Inherits="Personal_Personal_Video_Album" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="浏览个人视频册，个人，玩儿道，生活社交网络" />
<meta name="description" content="浏览个人视频册" />
<title>浏览个人视频册-个人-玩儿道</title>
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
					 <a href="javascript:;" id="tab_xc">相册</a>
					 <a href="javascript:;" id="tab_sp" class="active">视频</a>
              </div>
              <div class="clearfix">
    <%if (isCurUser)
      { %>
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="javascript:void(0);" class="cur">浏览视频</a></li>
                    <li><a href="video_upload.html">上传视频</a></li>
                    <li><a href="video_album_manage.html">管理视频</a></li>
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
					<div class="alb_set"><b class="icon_video"></b><span class="gray">视频列表</span>(<span class="alb_count"></span>)</div>
					<div class="alb_nav" style="padding:5px 10px 0px 0px;"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
				</div>
                <div class="alb_edit_wp">
					<div class="alb_lt_wp">
						<ul class="alb_list_sVideo alb_edit clearfix v_folderExt">

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
<!--[if IE 6]>
<script type="text/javascript" src="js/pngFix.js"></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_album.js" type="text/javascript"></script>
</asp:Content>