<%@ Page Title="上传个人相片-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Upload.aspx.cs" Inherits="Personal_Personal_Photo_Upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="上传照片，个人，玩儿道，生活社交网络" />
<meta name="description" content="上传多张相片到指定的个人相册" />
<title>上传个人相片-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    
    <style type="text/css" >
        .tabsNav, #main{ clear:left; width:1010px; margin:0 auto;}
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
            <div class="Fnavigation FnwhiteBg">
                <ul class="fix4w">
                    <li><a href="photo_album.html">浏览相册</a></li>
                    <li><a href="javascript:;" class="cur">上传照片</a></li>
                    <li><a href="photo_album_manage.html">管理相册</a></li>
                </ul>
            </div>
            <div class="pa_tit clearfix">
			    <div class="alb_set"><b class="ico_set"></b>上传设置<em>（上传步骤：1.选择上传相册；2.上传照片预览；3.确定提交照片）</em></div>
		    </div>
		    <div class="pu_wp">
			    <form action="">
				    <div class="bd">
					    <div class="spa_box"><input type="radio" name="folder" id="chkNewFolder" checked="checked" /><label for="chkNewFolder">上传到新文件夹，文件夹名</label><input type="text" class="txt_c3" id="newAlbum" /></div>
					    <div class="spa_box"><input type="radio" name="folder" id="chkChooseFolder" /><label for="chkChooseFolder">上传到已存在的文件夹</label><select name="albumList" id="albumList" class="sel_c3">
						    <option value="">-选择相册-</option></select></div>
					    <div class="spa_box pl">权限：<select id="selectChoosePermission"><option>选择权限</option></select></div>
					    <div class="spa_box" id="acti"><input type="checkbox" id="share" /><label for="share">共享到活动</label> <select id="selectChooseActivity"><option value="">选择活动</option></select> <input type="text" readonly="readonly" id="txtShareActivity" /></div>
					    <div class="spa_box pl"><div  id="spanButtonPlaceholder"></div><input type="button" class="submit" /></div>
				    </div>
			    </form>
		    </div>
		    <div class="pu_photo_wp">
			    <div class="hd">照片预览</div>
			    <div class="bd clearfix">
				    <ul id="photoList">
					</ul>
			    </div>
		    </div>
            <div class="blank10px"></div>
            </div>
        </div>
    </div>
</asp:Content>


<asp:Content runat="server"  ContentPlaceHolderID="Script">
    <script src="../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Ablum/swfupload.queue.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_upload_handler.js" type="text/javascript"></script>
    <script src="../Scripts/person/photo_upload.js" type="text/javascript"></script>
</asp:Content>