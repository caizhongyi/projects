<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Edit.aspx.cs" Inherits="Personal_Personal_Video_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>编辑个人视频-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="编辑个人视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人视频的名字，描述，顺序，设置首页等信息" />
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
            <a href="javascript:;" id="tab_zl">资料</a>
			<a href="javascript:;" id="tab_rz">日志</a>
			<a href="javascript:;" id="tab_xc">相册</a>
			<a href="javascript:;" id="tab_sp" class="active">视频</a>
      </div>

    <div class="tabs-panel">
        <!-- myhistroyTitle -->
        <div class="myhistoryMenu">
          <ul>
            <li><a href="video_album.html">浏览视频</a></li>
            <li><a href="video_upload.html">上传视频</a></li>
            <li><a href="video_album_manage.html" class="current">管理视频</a></li>
          </ul>
        </div>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">视频设置</b></h4>
  <div class="f_left" >
      <div class="album-tabs">
        <a href="javascript:" class="album-prev" title="上一页"></a>
        
        <div class="album-clip album-vertical">
           <ul class="album-panel videos clearfix">
            
        </ul>
        </div>
         <a href="javascript:" class="album-next" title="下一页"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName"><span class="alb_name"></span>(<span class="video_count">loading</span>)
   		<span class="search-textbox">
         <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="srcTxt">
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
            <div class="pageList  f_right"><span>第</span><input type="text" class="text" value="0"><span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a title="首页" href="javascript:;">首页</a><a title="上一页" href="javascript:;">上一页</a><a title="下一页" href="javascript:;">下一页</a><a title="尾页" href="javascript:;">尾页</a></div>
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
  <option value="">修改权限</option>
                </select>
                &nbsp;&nbsp;
                <select name="selectFoder" id="selectFoder" ><option value="">移动到</option></select>
                &nbsp;&nbsp;<a href="javascript:;" id="photo_del">删除</a>
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

