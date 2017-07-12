<%@ Page Title="编辑个人视频-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Edit.aspx.cs" Inherits="Personal_Personal_Video_Edit" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="编辑个人视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人视频的名字，描述，顺序，设置首页等信息" />
<title>编辑个人视频-个人-玩儿道</title>
<meta name="author" content="zhengshaofan" />
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
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="video_album.html">浏览视频</a></li>
                    <li><a href="video_upload.html">上传视频</a></li>
                    <li><a href="video_album_manage.html" class="cur">管理视频</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="icon_video"></b>视频设置</div>
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
								<div class="pe_set"><b class="ico_alb_nm"></b><span class="alb_name"></span><i>(loading)</i></div>
								<div class="so_txt"><input type="text" class="txt" maxlength="60" /><input type="button" class="btn srhVideo" /></div>
							</div>
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
						<div class="pe_list clearfix lh20 pe_list_Ext">
							<ul>
								
							</ul>
						</div>
						<div class="alb_tag clearfix">
							<div class="tag_lt">
								<div class="lim_set">
									<input type="checkbox" class="ckbox chkAll" />
									<select name="selectPer" id="selectPer" class="sel_c3" style="margin:0 0 0 12px;"><option value="">更改权限</option></select>
									<select name="selectFoder" id="selectFoder" class="sel_c3"><option value="">移动到</option></select>
									<a href="javascript:void(0);" class="photo_del">删除</a>
								</div>
							</div>
							<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
						</div>
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Script">
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_edit.js" type="text/javascript"></script>
</asp:Content>