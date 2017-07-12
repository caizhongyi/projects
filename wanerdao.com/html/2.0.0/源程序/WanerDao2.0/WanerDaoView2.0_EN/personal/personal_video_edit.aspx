<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_edit.aspx.cs" Inherits="personal_personal_video_edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Edit video-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Edit video, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit personal video name, description, sequence,  front page and so on" />
    <link href="../css/activity.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/personal.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server"><div id="container" class="container activityMain">
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
            <li><a href="video_album_manage.html" class="current">Edit video</a></li>
          </ul>
        </div>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">Video Settings</b></h4>
  <div class="f_left" >
      <div class="album-tabs">
        <a href="javascript:" class="album-prev" title="Prev"></a>
        
        <div class="album-clip album-vertical">
           <ul class="album-panel videos clearfix">
            
        </ul>
        </div>
         <a href="javascript:" class="album-next" title="Next"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName"><span class="alb_name"></span>(<span class="video_count">loading</span>)
   		<span class="search-textbox">
         <input type="text" inputdefault="video name" value="video name" class="srcTxt">
         <input type="button"  class="srhVideo">
         </span> 
   </div>
   <div class="photoList">
     <div class="clearfix pagewrap media-header">
            <!-- 分页左边 -->
            <div class="f_left">
            
     		</div>
            <!-- 分页左边 -->
            <!-- 分页右边 -->
            <div class="pageList  f_right"></div>
            <!-- 分页右边 -->
            </div>
    <!-- photoList Head -->
    <ul class="photoListMain">
     
    </ul>
    <!-- photoList main -->
     <div class="clearfix media-footer">
              <div class="video-right f_left">
                <input type="checkbox" class="chkAll" />
                &nbsp;&nbsp;
                <select id="selectPer">
  <option value="">Edit permission</option>
                </select>
                &nbsp;&nbsp;
                <select name="selectFoder" id="selectFoder" ><option value="">Move to</option></select>
                &nbsp;&nbsp;<a href="javascript:;" id="photo_del">Delete</a>
              </div>
              <div class="pageList f_right"></div>
          </div>
    <!-- photoList Foot -->
    </div>
   </div>
  </div>
  <!--photoList main -->
  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
</div>
<!--Main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" ></script>
    <script src="../scripts/common/permission.js" ></script>
     <script  src="/scripts/jquery.core.js"></script>
     <script  src="/scripts/jquery.ui.tabs.js"></script>
    <script  src="/scripts/jquery.center.js"></script>
    <script  src="/scripts/jquery.ui.overlay.js"></script>
    <script  src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" ></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" ></script>
    <script src="../scripts/personal/common.js" ></script>
    <script src="../scripts/personal/video_common.js" ></script>
    <script src="../scripts/personal/video_edit.js" ></script>
</asp:Content>

