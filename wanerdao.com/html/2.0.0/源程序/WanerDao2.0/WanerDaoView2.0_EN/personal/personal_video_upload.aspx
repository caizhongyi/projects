<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_upload.aspx.cs" Inherits="personal_personal_video_upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Share video-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Share video, Personal, Savorboard, Life and social network" />
<meta name="description" content="Copy share link from Youtube, Youku, Tudou" />
    <link href="../css/activity.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/personal.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div id="container" class="container activityMain">
 <div class="tabs">
      <div class="mes_com_box_Tab">
        <a href="javascript:;" id="tab_zl">Profile</a>
		<a href="javascript:;" id="tab_rz">Diary</a>
		<a href="javascript:;" id="tab_xc">Album</a>
		<a href="javascript:;" id="tab_sp" class="active">Video</a>
      </div>
    <div class="tabs-panel">
        <!-- myhistroyTitle -->
        <div class="myhistoryMenu">
          <ul>
            <li><a href="video_album.html">Watch video</a></li>
            <li><a href="javascript:void(0);" class="current">Upload video</a></li>
            <li><a href="video_album_manage.html">Edit video</a></li>
          </ul>
        </div>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">Upload settings</b><em>（Upload wizard steps：1.Select folder, 2.Preview, 3.Submit）</em></h4>
	
    
    <div class="form video-upload-form">
    	<ul>
        	<li><input  type="radio" name="folder" id="chkNewFolder" checked="checked"/><label for="chkNewFolder">Upload to a new folder, folder name</label><input  type="text" class="text" id="txtNewAlbum"/></li>
            <li><input  type="radio" name="folder" id="chkChooseFolder" /><label for="chkChooseFolder">Upload to an existing folder</label><select id="albums"></select></li>
            <li><label>Permission：</label><select id="permissionlist"></select></li>
            <li><label style="vertical-align:top;">Video code：</label><textarea class="textarea" style="height:75px; width:475px;" id="txtVideoCode"></textarea></li>
            
        </ul>
    	
        <div><input type="button" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="Add" id="txtAdd"/><input type="button" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="Submti" id="txtSubmit" style=" display: none;"/></div>
        supports from <a href="http://www.youku.com/" target="_blank">youku</a>,<a href="http://www.tudou.com/" target="_blank">tudou</a>,<a href="http://www.youtube.com" target="_blank">youtube</a>
    </div>
    
    <h3 class="media-header fb">Video folder<em>（After preview, click Submit to really upload.）</em></h3>
    <ul class="videos clearfix ">
      
    </ul>
  </div>

  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
</div>
<!--Main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_upload.js" type="text/javascript"></script>
</asp:Content>

