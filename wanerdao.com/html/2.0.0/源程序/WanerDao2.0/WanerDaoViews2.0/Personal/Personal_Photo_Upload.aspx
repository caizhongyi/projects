<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Upload.aspx.cs" Inherits="Personal_Personal_Photo_Upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>上传个人相片-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="上传照片，个人，玩儿道，生活社交网络" />
<meta name="description" content="上传多张相片到指定的个人相册" />
    <link href="../css/activity.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/personal.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <style>
        .progressWrapper {
	width: 357px;
	overflow: hidden;
}

.progressContainer {
	margin: 5px;
	padding: 4px;
	border: solid 1px #E8E8E8;
	background-color: #F7F7F7;
	overflow: hidden;
}
/* Message */
.message {
	margin: 1em 0;
	padding: 10px 20px;
	border: solid 1px #FFDD99;
	background-color: #FFFFCC;
	overflow: hidden;
}
/* Error */
.red {
	border: solid 1px #B50000;
	background-color: #FFEBEB;
}

/* Current */
.green {
	border: solid 1px #DDF0DD;
	background-color: #EBFFEB;
}

/* Complete */
.blue {
	border: solid 1px #CEE2F2;
	background-color: #F0F5FF;
}

.progressName {
	font-size: 8pt;
	font-weight: 700;
	color: #555;
	width: 323px;
	height: 14px;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
}

.progressBarInProgress,
.progressBarComplete,
.progressBarError {
	font-size: 0;
	width: 0%;
	height: 2px;
	background-color: blue;
	margin-top: 2px;
}

.progressBarComplete {
	width: 100%;
	background-color: green;
	visibility: hidden;
}

.progressBarError {
	width: 100%;
	background-color: red;
	visibility: hidden;
}

.progressBarStatus {
	margin-top: 2px;
	width: 337px;
	font-size: 7pt;
	font-family: Arial;
	text-align: left;
	white-space: nowrap;
}

a.progressCancel {
	font-size: 0;
	display: block;
	height: 14px;
	width: 14px;
	background-image: url(../images/cancelbutton.gif);
	background-repeat: no-repeat;
	background-position: -14px 0px;
	float: right;
}

a.progressCancel:hover {
	background-position: 0px 0px;
}


/* -- SWFUpload Object Styles ------------------------------- */

        .swfupload{ vertical-align: middle;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div id="container" class="container activityMain">
 <div class="tabs ">
    <div class="mes_com_box_Tab">
        <a href="javascript:;" id="tab_zl">资料</a>
		<a href="javascript:;" id="tab_rz">日志</a>
		<a href="javascript:;" id="tab_xc" class="active">相册</a>
		<a href="javascript:;" id="tab_sp">视频</a>
      </div>
    <div class="tabs-panel">
        <!-- myhistroyTitle -->
        <div class="myhistoryMenu">
          <ul>
            <li><a href="photo_album.html">浏览相册</a></li>
            <li><a href="javascript:;" class="current">上传照片</a></li>
            <li><a href="photo_album_manage.html">管理相册</a></li>
          </ul>
        </div>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-photo">上传设置</b><em>（上传步骤：1.选择上传相册；2.上传照片预览；3.确定提交照片）</em></h4>
	
    
    <div class="form video-upload-form">
    	<ul>
        	<li><input  type="radio" name="folder" id="chkNewFolder" checked="checked"/><label for="chkNewFolder">上传到新文件夹，文件夹名</label><input  type="text" class="text" id="newAlbum" maxlength="50"/></li>
            <li><input  type="radio" name="folder" id="chkChooseFolder"/><label for="chkChooseFolder">上传到已存在的文件夹</label><select id="albumList"><option value="">选择相册</option></select></li>
            <li><label>权&nbsp;&nbsp;&nbsp;限：</label><select id="selectChoosePermission"></select></li>
            <li><input  type="checkbox" id="share"/><label for="share">共享到活动：</label><select id="selectChooseActivity"><option value="">选择活动</option></select>&nbsp;&nbsp;<input  type="text" class="text" value="" readonly="readonly" id="txtShareActivity"/></li>
        </ul>
    <span class="stip"></span>	
        <div><div  id="spanButtonPlaceholder" style="vertical-align:middle;"></div><input type="button" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="确定" id="submitPhoto" style=" display: none;"  /></div>
            <div id="divFileProgressContainer"></div>
    </div>
    
    <h3 class="media-header fb">照片预览</h3>
    
    <ul class="photos clearfix " id="photoList">
       
    </ul>
  </div>

  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/openplugin/swfupload/swfupload.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/swfupload/swfupload.queue.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_upload_handler.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_upload.js" type="text/javascript"></script>
</asp:Content>

