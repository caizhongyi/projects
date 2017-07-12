<%@ Page Title="编辑个人相册-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Ablum_Edit.aspx.cs" Inherits="Personal_Personal_Photo_Ablum_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="修改相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人相册权限，共享活动范围，并可以选择需要进一步修改相册" />
<title>编辑个人相册-个人-玩儿道</title>
    <link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
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
					 <a href="javascript:;" id="tab_xc" class="active">相册</a>
					 <a href="javascript:;" id="tab_sp">视频</a>
        </div>
        <div class="clearfix">
        <div class="Fnavigation FnwhiteBg">
            <ul class="fix4w">
                    <li><a href="photo_album.html">浏览相册</a></li>
                    <li><a href="photo_upload.html">上传照片</a></li>
                    <li><a href="photo_album_manage.html"  class="cur">管理相册</a></li>
            </ul>
        </div>
        <div class="pa_tit clearfix">
			<div class="alb_set"><b class="ico_set"></b>相册设置</div>
			<ul class="oth_set clearfix">
                <li>
					<label>设置新相册默认权限</label><select name="setdefaultpermission" id="setdefaultpermission" class="sel_c3"></select>
				</li>
				<li><label>新建相册</label><input type="text" id="albumname" class="txt_c3" /><input type="button" class="btn" value="新建" id="newalbum"/></li>
			</ul>
		</div>
        <div class="alb_edit_wp">
			<div class="alb_tag clearfix">
				<div class="tag_lt">
					<div class="so_txt"><input type="text" class="txt" id="srhkey" /><input type="button" class="btn" id="srhAlbum"/></div>
					<div class="alb_sort"><b class="acti_bgc"></b><span>自己创建相册</span><b class="pers_bgc"></b><span>活动自建相册</span></div>
				</div>
				<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
			</div>
			<div class="alb_lt_wp">
				<ul class="alb_list alb_edit clearfix">
				</ul>
			</div>
			<div class="alb_tag clearfix">
				<div class="tag_lt">
					<div class="lim_set">
                        <input type="checkbox" class="ckbox chkAll"  />
						<select name="updatePer" id="updatePer" class="sel_c3"><option value="">更改权限</option></select>
						<a href="javascript:;" id="batchDelAlbums">删除</a>
					</div>
				</div>
				<div class="alb_nav"><span class="first">首页</span><span class="prev">上一页</span><span>01<i>/20</i></span><span class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
			</div>
		</div>
        <div class="blank10px"></div>
        </div>
    </div>
</div>
</asp:Content>

<asp:Content ContentPlaceHolderID="Script" runat="server">

    <script src="../Scripts/Plugin/Pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_album_manage.js" type="text/javascript"></script>
</asp:Content>