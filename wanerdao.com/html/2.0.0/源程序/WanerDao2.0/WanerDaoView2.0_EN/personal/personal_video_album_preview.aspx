<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_album_preview.aspx.cs" Inherits="personal_personal_video_album_preview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Preview video folder-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Perview video folder, Personal, Savorboard, Life and social network" />
<meta name="description" content="Perview video folder" />
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
         <%if (isCurUser)
           { %>
            <div class="myhistoryMenu">
              <ul>
                <li><a href="video_album.html" class="current">Watch video</a></li>
                <li><a href="video_upload.html">Upload video</a></li>
                <li><a href="video_album_manage.html">Edit video</a></li>
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
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">Video folder</b><span class="num">（loading）</span></h4>
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
   <div class="photoAlbumName">
   		<div class="f_left pe_set">&nbsp;&nbsp;</div>
    	<div class="pageList  f_right"></div>
   </div>
   <br/>
   
   <ul class="videos right-videos clearfix">
       
   </ul>
   
   <div class="pageList  f_right"></div>
   
   </div>
  </div>
  <!--photoList main -->
  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
</div>
<!--Main-->
    <div id="transmit" style="display: none"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_album_preview.js" type="text/javascript"></script>
</asp:Content>

