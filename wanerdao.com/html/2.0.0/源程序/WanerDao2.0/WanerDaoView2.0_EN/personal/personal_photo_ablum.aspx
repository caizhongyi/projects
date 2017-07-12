<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_ablum.aspx.cs" Inherits="personal_personal_photo_ablum" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Album-Personal-Savorboard</title>
<meta name="keywords" content="Album, Personal, Savorboard, Life and social network" />
<meta name="description" content="View all personal album" />
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
		    <a href="javascript:;" id="tab_xc" class="active">Album</a>
		    <a href="javascript:;" id="tab_sp">Video</a>
        </div>
    <div class="tabs-panel"> 
      <!-- myhistroyTitle -->
       <%if (isCurUser)
      { %>
      <div class="myhistoryMenu">
        <ul>
            <li><a href="photo_album.html" class="current">View</a></li>
            <li><a href="photo_upload.html">Upload</a></li>
            <li><a href="photo_album_manage.html">Management</a></li>
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
        <h4 class="tBgb AM_photoAlbum clearfix">
          <div class="f_left alb_set"> <b class="icon icon-photo">Album list</b><a href="javascript:;">&nbsp;&nbsp;(loading)</a>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>Own album</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>Activity share album</span> </div>
          <div class="pageList f_right ">

            </div>
        </h4>
        <ul class="albums clearfix alb_list">
          
        </ul>
        <div class="media-footer clearfix">
          <div class="pageList f_right ">
          
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- AM_photoEditWarp --> 
</div>
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
    <script src="../scripts/personal/photo_album.js" type="text/javascript"></script>
</asp:Content>

