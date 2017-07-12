<%@ Page Title="预览个人视频册-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Album_Preview.aspx.cs" Inherits="Personal_Personal_Video_Album_Preview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="预览个人视频册，玩儿道，生活社交网络" />
<meta name="description" content="预览个人视频册中的所有视频" />
<title>预览个人视频册-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <link href="../css/PluginCss/Pagination/Pagination.css" rel="stylesheet" type="text/css" />
	<!--[if IE 6]>
    <script type="text/javascript" src="../Scripts/person/pngFix.js"></script>
	<script>DD_belatedPNG.fix('*');</script>
    <![endif]-->
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
                        <li><a href="video_album.html" class="cur">浏览视频</a></li>
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
					<div class="alb_set"><b class="icon_video"></b><span class="gray">视频列表</span>(<span class="album_count"></span>)</div>
				</div>
                <div class="blank10px"></div>
				<div class="alb_edit_wp clearfix">
					<div class="alb_lt">
						<div class="scroll_pic_wp">
							<div class="arr_top"></div>
							<div class="scrTop_pic">
								<ul class="alb_list_sVideo scrTop clearfix">
								
								</ul>
							</div>
							<div class="arr_bm"></div>
						</div>
					</div>
					<div class="alb_rt">
						<div class="alb_tag other_sty clearfix">
							<div class="tag_lt">
								<div class="pe_set fb"> </div>
							</div>
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
						<div class="clearfix pu_video_wp">
                        	<div class="bd lView_bd">
                                <ul class="listView">
                                  
                                </ul>
                        	</div>
                        </div>
						<div class="alb_tag clearfix">
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>



</asp:Content>


<asp:Content ContentPlaceHolderID="Script" runat="server" >
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_album_preview.js" type="text/javascript"></script>
</asp:Content>