<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_ablum_edit.aspx.cs" Inherits="personal_personal_photo_ablum_edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Edit album-Personal-Savorboard</title>
<meta name="keywords" content="Edit album, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit personal album permission, share area and edit photo detail" />
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
        <h4 class="tBgb AM_photoAlbum clearfix">
          <div class="f_left alb_set">
          <b class="icon icon-photo ">Album settings</b><a href="javascript:;">&nbsp;&nbsp;(loading)</a>&nbsp;&nbsp;&nbsp;&nbsp;Set default permissions&nbsp;&nbsp;
          <select  name="setdefaultpermission" id="setdefaultpermission">
          </select>
          &nbsp;&nbsp;New album&nbsp;&nbsp;
          <input type="text" inputdefault="New album" value="New album" class="text" id="albumname" maxlength="60">
          &nbsp;&nbsp;
          <input  type="button" class="button button-gay" value="Creates" id="newalbum"/>
        </h4>
      </div>
      </h4>
      <div class="clearfix pagewrap media-header">
        <div class="f_left"> <span class="search-textbox">
          <input type="text" class="" value="Album name" inputdefault="Album name" maxlength="60" id="srhkey">
          <input type="button" id="srhAlbum">
          </span> <span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>Own album</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>Share to activity</span> </div>
        <div class="pageList f_right ">

          </div>
      </div>
      <br/>
      <ul class="albums album-edit clearfix alb_list">
       
      </ul>
      <div class="clearfix media-footer">
        <div class="video-right f_left">
          <input type="checkbox" class="chkAll"/>
          &nbsp;&nbsp;
          <select name="updatePer" id="updatePer">
            <option value="">Edit permission</option>
          </select>
          &nbsp;&nbsp;<a href="javascript:;" id="batchDelAlbums">Delete</a> </div>
        <div class="pageList f_right ">

          </div>
      </div>
    </div>
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_album_manage.js" type="text/javascript"></script>
</asp:Content>

