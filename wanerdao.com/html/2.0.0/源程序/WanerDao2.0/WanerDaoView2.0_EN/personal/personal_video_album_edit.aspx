<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_album_edit.aspx.cs" Inherits="personal_personal_video_album_edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Edit video folder-Personal-Savorboard</title>
<meta name="keywords" content="Edit video folder, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit video folder permission and  photo details" />
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
            <li><a href="video_upload.html">Upload video</a></li>
            <li><a href="javascript:void(0);" class="current">Edit video</a></li>
          </ul>
        </div>
        <!-- myhistoryMenu -->
        <div class="AM_photoEditWarp">
          <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">Video Settings</b>&nbsp;&nbsp;Set default permission&nbsp;&nbsp;<select id="setdefaultpermission"></select>&nbsp;&nbsp;Create a new folder&nbsp;&nbsp;<input type="text" inputdefault="Create new album" value="Create new album" class="text" id="albumname">&nbsp;&nbsp;<input  type="button" class="button button-gay" value="Create" id="newalbum"/></h4>
          <div class="clearfix pagewrap media-header">
            <!-- 分页左边 -->
            <div class="f_left">
            	<span class="search-textbox">
                 <input type="text" inputdefault="Album name" value="Album name" class="" id="srhkey">
                 <input type="button" id="srhAlbum">
                 </span>
     		</div>
            <!-- 分页左边 -->
            <!-- 分页右边 -->
            <div class="pageList  f_right"></div>
            <!-- 分页右边 -->
            </div>
          
          <ul class="videos videos-edit clearfix">
            
          </ul>
          <div class="clearfix media-footer">
              <div class="video-right f_left">
                <input type="checkbox" class="chkAll" />
                &nbsp;&nbsp;
                <select  id="updatePer" >
                  <option>Edit permission</option>
                </select>
                &nbsp;&nbsp;<a href="javascript:;" id="batchDelAlbums">Delete</a>
              </div>
              <div class="pageList f_right"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- AM_photoEditWarp --> 
  </div>

<!--Main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_album_edit.js" type="text/javascript"></script>
</asp:Content>

