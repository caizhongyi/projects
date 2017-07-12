<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_View.aspx.cs" Inherits="Personal_Personal_Video_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>观看视频-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="观看视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="单个浏览视频册内的所有视频，并且可以进行评论" />
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
                    var self = true;
                </script>
                <%}%>
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
   <div class="photoAlbumName"><span class="alb_name"></span>&nbsp;&nbsp;<span class="fCgray"><span class="cc">loading</span>/<span class="tc">loading</span></span></div>
   <br/>
   <div class="vedio-tabs horiz-ah-pager">
	<a title="上一页" class="vedio-prev pager-prev" href="javascript:"></a>
    <div class="vedio-clip vedio" style="overflow: hidden;">
        <ul class="vedio-panel  clearfix" style="width: 1095px; position: relative; left: 0px;">
           	   
        </ul>
    </div>
     <a title="下一页" class="vedio-next pager-next" href="javascript:"></a>
	</div>
   
   	<div class="flashplayer">
    </div>
   
    <div class="vedio-info">
    	
    </div>
   <div class="info-opt" style="text-align: right;"><a href="javascript:;" class="icon icon-talk">评论</a></div>
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
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script> 
    <script src="../scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>

    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_view.js" type="text/javascript"></script>
</asp:Content>

