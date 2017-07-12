<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_Ablum.aspx.cs" Inherits="Personal_Personal_Photo_Ablum" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>个人相册-个人-玩儿道</title>
<meta name="keywords" content="个人相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="浏览所有个人相册" />
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
       <%if (isCurUser)
      { %>
      <div class="myhistoryMenu">
        <ul>
            <li><a href="photo_album.html" class="current">浏览相册</a></li>
            <li><a href="photo_upload.html">上传照片</a></li>
            <li><a href="photo_album_manage.html">管理相册</a></li>
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
          <div class="f_left alb_set"> <b class="icon icon-photo">相册设置</b><a href="javascript:;">&nbsp;&nbsp;(loading)</a>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>自建相册</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>活动共享相册</span> </div>
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

