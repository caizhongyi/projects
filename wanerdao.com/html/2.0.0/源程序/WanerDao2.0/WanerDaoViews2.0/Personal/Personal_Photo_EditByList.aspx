<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_EditByList.aspx.cs" Inherits="Personal_Personal_Photo_EditByList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>编辑个人相片-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="编辑个人相片，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人相片的名字，描述，顺序，设置首页等信息" />
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
			<li><a href="photo_album_manage.html" class="current">管理相册</a></li>
        </ul>
      </div>
      <!-- myhistoryMenu -->
      <div class="AM_photoEditWarp">
      <h4 class="tBgb AM_photoAlbum"><b class="icon icon-photo1">相册设置</b><a href="javascript:;" class="icon icon-blist" id="photo_th">缩略图</a><a href="javascript:;" class="icon icon-mlist-on">列表</a></h4>
        <div class="f_left" >
          <div class="album-tabs"> <a title="上一页" class="album-prev" href="javascript:"></a>
            <div class="album-clip album-vertical" style="overflow: hidden;">
              <ul class="album-panel albums clearfix" style="height: 702px; position: relative; top: 0px;">
               
              </ul>
            </div>
            <a title="下一页" class="album-next" href="javascript:"></a> </div>
        </div>
        <!--pohtoedit widget -->
        <div class="AM_photoEdit_Main f_left">
          <div class="photoAlbumName"><span class="alb_name"></span><i class="">(loading)</i> <span class="search-textbox">
            <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="txtsrh">
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
                <select name="selectPer" id="selectPer" style=" width: 100px;"><option value="">更改权限</option></select>
				<select name="selectFoder" id="selectFoder" style=" width: 100px;"><option value="">移动到</option></select>
                &nbsp;&nbsp;<a href="javascript:;" class="photo_del">删除</a> </div>
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

