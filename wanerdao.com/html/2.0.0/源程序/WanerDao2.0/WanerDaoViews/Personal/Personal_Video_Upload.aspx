<%@ Page Title="共享个人视频-个人-玩儿道" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Upload.aspx.cs" Inherits="Personal_Personal_Video_Upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta name="keywords" content="共享视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="从视频网站Youtube,Youku,Tudou复制共享连接" />
<title>共享个人视频-个人-玩儿道</title>
    <link href="../style/pers_rel.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
            .list li{ float: left; margin-left: 10px;  border: solid 1px #000; width: 160px; height:120px;}
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
                <div class="Fnavigation FnwhiteBg">
                  <ul class="fix4w">
                    <li><a href="video_album.html">浏览视频</a></li>
                    <li><a href="javascript:void(0);" class="cur">上传视频</a></li>
                    <li><a href="video_album_manage.html">管理视频</a></li>
                  </ul>
                </div>
                <div class="pa_tit clearfix">
					<div class="alb_set"><b class="icon_video"></b>视频设置<em>（上传步骤：1.选择视频；2.复制视频链接；3.确定提交视频）</em></div>
				</div>
				<div class="pu_wp">
					<form action="">
						<div class="bd">
							<div class="spa_box"><input type="radio" name="folder" id="chkNewFolder" checked="checked" /><label for="chkNewFolder">上传到新文件夹，文件名</label><input type="text" id="txtNewAlbum" class="txt_c3" /></div>
							<div class="spa_box"><input type="radio" name="folder" id="chkChooseFolder"  /><label for="chkChooseFolder">上传到现有文件夹</label><select id="alubms"></select></div>
							<div class="spa_box pl">权限 <select id="permissionlist" class="sel_c3"><option value="">选择权限</option></select></div>
							<div class="spa_box pl">
                            	<textarea class="txa_c3" style="height:75px; width:475px;" id="txtVideoCode"></textarea>
                            </div>
							<div class="spa_box pl">
                            	<a href="javascript:void(0);" class="btn_120x31" id="txtAdd">添加</a>
                            	<a href="javascript:void(0);" class="btn_120x31" id="txtSubmit">确定</a>
                            </div>
						</div>
					</form>
				</div>
				<div class="pu_video_wp">
					<div class="hd">视频列表  <span class="fn" style="color:#F56868;">（预览无误以后，点击确定按钮才能最后正式上传）</span></div>
					<div class="bd clearfix vlist">
						<ul>
							
						</ul>
                        <div class="blank10px"></div>
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

<asp:Content ContentPlaceHolderID="Script" runat="server">
    <script src="../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../Scripts/common/permission.js" type="text/javascript"></script>
    <script src="../Scripts/person/common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_common.js" type="text/javascript"></script>
    <script src="../Scripts/person/video_upload.js" type="text/javascript"></script>
</asp:Content>