<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_album.aspx.cs" Inherits="personal_personal_video_album" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>View video folder-Personal-Savorboard</title>
<meta name="keywords" content="View video folder, Personal, Savorboard, Life and social network" />
<meta name="description" content="View personal video folder" />
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
            <li><a href="javascript:void(0);" class="current">Watch video</a></li>
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
          <h4 class="tBgb AM_photoAlbum">
          	<div class="f_left"><b class="icon icon-video">Video folder</b><span class="num">（<span class="alb_count">loading</span>）</span></div>
          	<div class="pageList  f_right"></div>
          </h4>

          <ul class="videos clearfix">
           
        </ul>
          <div class="clearfix media-footer">
              <div class="pageList f_right"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- AM_photoEditWarp --> 
  </div>
  
    <div id="transmit" style="display: none"></div>
<!--Main-->
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
    <script src="../scripts/personal/video_album.js" type="text/javascript"></script>
</asp:Content>

