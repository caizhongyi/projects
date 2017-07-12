<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Album_Preview.aspx.cs" Inherits="Personal_Personal_Video_Album_Preview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>预览个人视频册-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="预览个人视频册，玩儿道，生活社交网络" />
<meta name="description" content="预览个人视频册中的所有视频" />
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
		    <a href="javascript:;" id="tab_xc">相册</a>
		    <a href="javascript:;" id="tab_sp" class="active">视频</a>
      </div>
    <div class="tabs-panel">
        <!-- myhistroyTitle -->
         <%if (isCurUser)
           { %>
            <div class="myhistoryMenu">
              <ul>
                <li><a href="video_album.html" class="current">浏览视频</a></li>
                <li><a href="video_upload.html">上传视频</a></li>
                <li><a href="video_album_manage.html">管理视频</a></li>
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
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">视频列表</b><span class="num">（loading）</span></h4>
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
   <div class="photoAlbumName">
   		<div class="f_left pe_set">&nbsp;&nbsp;</div>
    	<div class="pageList  f_right"><span>第</span><input type="text" class="text" value="0"><span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a title="首页" href="javascript:;">首页</a><a title="上一页" href="javascript:;">上一页</a><a title="下一页" href="javascript:;">下一页</a><a title="尾页" href="javascript:;">尾页</a></div>
   </div>
   <br/>
   
   <ul class="videos right-videos clearfix">
       
   </ul>
   
   <div class="pageList  f_right"><a href="javascript:;">显示更多</a>&nbsp;&nbsp;<span>第</span><input type="text" class="text" value="0"><span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a title="首页" href="javascript:;">首页</a><a title="上一页" href="javascript:;">上一页</a><a title="下一页" href="javascript:;">下一页</a><a title="尾页" href="javascript:;">尾页</a></div>
   
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

