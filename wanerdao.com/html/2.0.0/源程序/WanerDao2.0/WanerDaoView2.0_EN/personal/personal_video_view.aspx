<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_video_view.aspx.cs" Inherits="personal_personal_video_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>View video-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="View video, Personal, Savorboard, Life and social network" />
<meta name="description" content="View video and publish comments" />
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
            <li><a href="video_album.html" class="current">Watch video</a></li>
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
                    var self = true;
                </script>
                <%}%>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">Upload settings </b><span class="num">（loading）</span></h4>
  <div class="f_left" >
      <div class="album-tabs">
        <a href="javascript:" class="album-prev" title="Prev"></a>
        
        <div class="album-clip album-vertical">
             <ul class="album-panel videos clearfix">
           	  	
        	 </ul>
        </div>
         <a href="javascript:" class="album-next" title="Next"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName"><span class="alb_name"></span>&nbsp;&nbsp;<span class="fCgray"><span class="cc">loading</span>/<span class="tc">loading</span></span></div>
   <br/>
   <div class="vedio-tabs horiz-ah-pager">
	<a title="Prev" class="vedio-prev pager-prev" href="javascript:"></a>
    <div class="vedio-clip vedio" style="overflow: hidden;">
        <ul class="vedio-panel  clearfix" style="width: 1095px; position: relative; left: 0px;">
           	   
        </ul>
    </div>
     <a title="Next" class="vedio-next pager-next" href="javascript:"></a>
	</div>
   
   	<div class="flashplayer">
    </div>
   
    <div class="vedio-info">
    	
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
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_view.js" type="text/javascript"></script>
</asp:Content>

