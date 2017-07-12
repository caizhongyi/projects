<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_editByList.aspx.cs" Inherits="personal_personal_photo_editByList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Edit photo-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Edit photo, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit personal photo name, description, sequenece,  front page and so on" />
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
      <div class="myhistoryMenu">
        <ul>
            <li><a href="photo_album.html">View</a></li>
            <li><a href="photo_upload.html">Upload</a></li>
            <li><a href="photo_album_manage.html" class="current">Management</a></li>
        </ul>
      </div>
      <!-- myhistoryMenu -->
      <div class="AM_photoEditWarp">
      <h4 class="tBgb AM_photoAlbum"><b class="icon icon-photo1">Album settings</b><a href="javascript:;" class="icon icon-blist" id="photo_th">Arranged by miniature</a><a href="javascript:;" class="icon icon-mlist-on">Arranged by list</a></h4>
        <div class="f_left" >
          <div class="album-tabs"> <a title="Prev" class="album-prev" href="javascript:"></a>
            <div class="album-clip album-vertical" style="overflow: hidden;">
              <ul class="album-panel albums clearfix" style="height: 702px; position: relative; top: 0px;">
               
              </ul>
            </div>
            <a title="Next" class="album-next" href="javascript:"></a> </div>
        </div>
        <!--pohtoedit widget -->
        <div class="AM_photoEdit_Main f_left">
          <div class="photoAlbumName"><span class="alb_name"></span><i class="">(loading)</i> <span class="search-textbox">
            <input type="text" inputdefault="Album name" value="Album name" class="txtsrh">
            <input type="button" class="btnsrh">
            </span> </div>
          <div class="photoList">
            <div class="clearfix pagewrap media-header"> 
              <!-- 分页左边 -->
              <div class="f_left"> </div>
              <!-- 分页左边 --> 
              <!-- 分页右边 -->
              <div class="pageList  f_right "></div>
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
                <select name="selectPer" id="selectPer" style=" width: 100px;"><option value="">Edit permission</option></select>
				<select name="selectFoder" id="selectFoder" style=" width: 100px;"><option value="">Move to</option></select>
                &nbsp;&nbsp;<a href="javascript:;" class="photo_del">Delete</a> </div>
              <div class="pageList f_right "></div>
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
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.ui.tabs.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_edit_by_list.js" type="text/javascript"></script>
</asp:Content>

