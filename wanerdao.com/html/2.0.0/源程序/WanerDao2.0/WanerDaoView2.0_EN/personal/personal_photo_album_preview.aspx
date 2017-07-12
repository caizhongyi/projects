<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_album_preview.aspx.cs" Inherits="personal_personal_photo_album_preview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Preview album-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Perview album, Personal, Savorboard, Life and social network" />
<meta name="description" content="View album by small image, print and rename" />
    <link href="../css/activity.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/icon.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" media="all"/>
    <link href="../css/personal.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" Runat="Server">
<div id="container" class="activityMain container">
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
          	<div class="f_left">
         		 <b class="icon icon-photo">Album list</b>&nbsp;&nbsp;<a href="javascript:;"><span class="album_count">(loading)</span></a>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>Own Album</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>Activity share album</span>
           </div>
          </h4>
   <div class="f_left" >
      <div class="album-tabs">
        <a href="javascript:" class="album-prev" title="prev"></a>
        
        <div class="album-clip album-vertical">
            <ul class="album-panel albums clearfix">

            </ul>
        </div>
         <a href="javascript:" class="album-next" title="next"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName clearfix"><span class="f_left  fb " id="albumopt"></span>
    	<div class="pageList f_right ">
        
        </div>
   </div>
    <br/>
   		<ul class="albums right-albums pictures clearfix preview_pic">
           
            </ul>	  
        <div class="clearfix pagewrap media-footer">
            <!-- 分页左边 -->
            <div class="f_left"></div>
            <!-- 分页左边 -->
            <!-- 分页右边 -->
            <div class="pageList  f_right " >
            
            </div>
            <!-- 分页右边 -->
        </div>
   </div>
  </div>
  <!--photoList main -->
  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
 </div>
    <div id="transmit" style="display: none"></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_album_preview.js" type="text/javascript"></script>
</asp:Content>

