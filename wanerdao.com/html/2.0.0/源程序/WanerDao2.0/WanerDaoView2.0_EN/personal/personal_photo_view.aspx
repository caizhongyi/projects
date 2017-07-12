<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_view.aspx.cs" Inherits="personal_personal_photo_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>View Photo-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="View photo, Personal, Savorboard, Life and social network" />
<meta name="description" content="View photos and publish comments" />
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
  <h4 class="tBgb AM_photoAlbum">
  	<b class="icon icon-photo">Album list</b><span class="num album_count">(loading)</span>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>Own album</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>Activity share album</span>
  </h4>
  <div class="f_left">
      <div class="album-tabs">
        <a title="prev" class="album-prev" href="javascript:"></a>
        
        <div class="album-clip album-vertical" style="overflow: hidden;">
            <ul class="album-panel albums clearfix" style="height: 702px; position: relative; top: 0px;">
                  
            </ul>
        </div>
         <a title="next" class="album-next" href="javascript:"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName" id="albumopt"></div>
   <br/>
   <div class="vedio-tabs vedio-tabs-blue horiz-ah-pager">
	<a title="prev" class="vedio-prev pager-prev" href="javascript:"></a>
    <div class="vedio-clip vedio" style="overflow: hidden;">
        <ul class="vedio-panel  clearfix" style="width: 1095px; position: relative; left: 0px;">
                
        </ul>
    </div>
     <a title="next" class="vedio-next pager-next" href="javascript:"></a>
	</div>
   
   	<div class="yellow-pager photo-pager " id="photo" style=" width: 700px; height: 550px;" >
    	<a href="javascript:;" class="pager-prev"></a>
         <a href="javascript:;" class="pager-next"></a>
    	<img alt="" onload="autoSize(this, 700, 550, 1)"/>
       
    </div>
   
    <div class="vedio-info">
    	<h3 class="photo_detail"></h3>
        <p></p>
		<div class="info-opt"><a href="javascript:;" class="icon icon-talk">Comment</a></div>
		<div class="replay-content" style=" display: none">
           <img src="../images/home/ico_17x9.png" class="arrowhead">
           <input type="text" class="text"><input type="submit" value="回复" class="button button2">
            <ul>
                <li class="clearfix">
                    <img src="../images/photos/img_51x51.png" alt="" class="photo" >
                    <div class="overflow">
                        <p></p>
                        <div class="time"></div>
                        <div class="replay"><a  href="javascript:;">删除</a><a  href="javascript:;">回复</a></div>
                    </div>
                </li>
           </ul>
           <div class="showall"><a href="javascript:;">展开全部回复(4)</a></div>
        </div>
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
    <script type="text/javascript" src="../scripts/jquery.core.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="../scripts/jquery.center.js"></script>
    <script type="text/javascript" src="../scripts/jquery.ui.overlay.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_view.js" type="text/javascript"></script>
</asp:Content>

