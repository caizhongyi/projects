<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Ablum_Edit.aspx.cs" Inherits="Personal_Personal_Photo_Ablum_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>编辑个人相册-个人-玩儿道</title>
<meta name="keywords" content="修改相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人相册权限，共享活动范围，并可以选择需要进一步修改相册" />
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
            <li><a href="photo_upload.html">上传照片</a></li>
            <li><a href="photo_album_manage.html" class="current">管理相册</a></li></p>
        </ul>
      </div>
      <!-- myhistoryMenu -->
      <div class="AM_photoEditWarp">
        <h4 class="tBgb AM_photoAlbum clearfix">
          <div class="f_left alb_set">
          <b class="icon icon-photo ">相册设置</b><a href="javascript:;">&nbsp;&nbsp;(loading)</a>&nbsp;&nbsp;&nbsp;&nbsp;设置新照片默认权限&nbsp;&nbsp;
          <select  name="setdefaultpermission" id="setdefaultpermission">
          </select>
          &nbsp;&nbsp;新建相册&nbsp;&nbsp;
          <input type="text" inputdefault="新建相册" value="新建相册" class="text" id="albumname" maxlength="60">
          &nbsp;&nbsp;
          <input  type="button" class="button button-gay" value="新建" id="newalbum"/>
        </h4>
      </div>
      </h4>
      <div class="clearfix pagewrap media-header">
        <div class="f_left"> <span class="search-textbox">
          <input type="text" class="" value="相册名称" inputdefault="相册名称" maxlength="60" id="srhkey">
          <input type="button" id="srhAlbum">
          </span> <span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>自建相册</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>活动共享相册</span> </div>
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
            <option value="">更改权限</option>
          </select>
          &nbsp;&nbsp;<a href="javascript:;" id="batchDelAlbums">删除</a> </div>
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

