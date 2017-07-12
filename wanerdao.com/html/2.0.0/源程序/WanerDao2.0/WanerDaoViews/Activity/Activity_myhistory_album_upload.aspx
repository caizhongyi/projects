<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myhistory_album_upload.aspx.cs" Inherits="Activity_Activity_myhistory_album_upload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link rel="stylesheet" type="text/css" href="../style/pers_rel.css" media="all" />
<script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
<script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
<script src="../Scripts/activity/activity_myhistory_album_upload.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="mCon" style="padding:0;">
            <div class="prPdBox">
              <div class="subChaTab">
                <a href="#">活动信息</a>
                <a href="#" class="active">我的活动</a>
              </div>
              <div class="clearfix">
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                  	<li><a href="#">活动信息及评论</a></li>
                    <li><a href="Activity_myhistory_album_view.aspx?activity_id=1111" >浏览相册</a></li>
                    <li><a class="cur">上传照片</a></li>
                    <li><a href="Activity_myhistory_photo_edit.aspx?activity_id=1111"">管理相册</a></li>
                    <li><a href="#">浏览发表管理感想</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="ico_set"></b>上传设置<em>对于自己发布相册，可以到个人模块日志分页中进行相应的维护</em></div>
				</div>
				<div class="pu_wp">
					<form action="">
						<div class="hd">共享到活动：<a href="#">雷克萨斯行动</a></div>
						<div class="bd">
							<div class="spa_box"><input type="radio" name="radAlbum" value="1" id="create_new" checked="true" /><label for="create_new">上传到相册，新相册名</label><input type="text" class="txt_c3" id="newAlbumName" /></div>
							<div class="spa_box"><input type="radio" name="radAlbum" value="0" id="upload" /><label for="upload">上传到已存在的相册</label><select  id="albumlist" class="sel_c3"></select></div>
							<div class="spa_box pl" style="display:none;">权限：<select id="11" class="sel_c3">
								<option value="">选择权限</option></select></div>
							<div class="spa_box pl" style="margin-top:22px;"><span id="spanButtonPlaceholder"  ></span> <input type="button" class="submit" onclick="submitUploadImage();" style="margin-top:-22px;"  /></div>
						</div>
					</form>
				</div>
				<div class="pu_photo_wp">
					<div class="hd">照片预览</div>
					<div class="bd clearfix">
						<ul id="thumbnails">
						</ul>
					</div>
				</div>
                <div class="blank10px"></div>
              </div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
    <script type="text/javascript">
    </script>
</asp:Content>

