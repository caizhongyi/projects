<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_View.aspx.cs" Inherits="Personal_Personal_Photo_View" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>浏览个人相片-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="相片浏览，个人，玩儿道，生活社交网络" />
<meta name="description" content="单张浏览相册内的所有相片，并且可以进行评论" />
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
  <h4 class="tBgb AM_photoAlbum">
  	<b class="icon icon-photo">相册列表</b><span class="num album_count">(loading)</span>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>自建相册</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>活动共享相册</span>
  </h4>
  <div class="f_left">
      <div class="album-tabs">
        <a title="上一页" class="album-prev" href="javascript:"></a>
        
        <div class="album-clip album-vertical" style="overflow: hidden;">
            <ul class="album-panel albums clearfix" style="height: 702px; position: relative; top: 0px;">
                  
            </ul>
        </div>
         <a title="下一页" class="album-next" href="javascript:"></a>
        
    </div>

  </div>
  <!--pohtoedit widget -->
  <div class="AM_photoEdit_Main f_left">
   <div class="photoAlbumName" id="albumopt"></div>
   <br/>
   <div class="vedio-tabs vedio-tabs-blue horiz-ah-pager">
	<a title="上一页" class="vedio-prev pager-prev" href="javascript:"></a>
    <div class="vedio-clip vedio" style="overflow: hidden;">
        <ul class="vedio-panel  clearfix" style="width: 1095px; position: relative; left: 0px;">
                
        </ul>
    </div>
     <a title="下一页" class="vedio-next pager-next" href="javascript:"></a>
	</div>
   
   	<div class="yellow-pager photo-pager " id="photo" style=" width: 700px; height: 550px;" >
    	<a href="javascript:;" class="pager-prev"></a>
         <a href="javascript:;" class="pager-next"></a>
    	<img alt="" onload="autoSize(this, 700, 550, 1)"/>
       
    </div>
   
    <div class="vedio-info">
    	<h3 class="photo_detail"></h3>
        <p></p>
		<div class="info-opt"><a href="javascript:;" class="icon icon-talk">评论</a></div>
		
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
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/jquery.ui.dialog.js" type="text/javascript"></script>
    
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script> 
    <script src="../scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>
    <script src="../scripts/plugin/transmit/wanerdao2.transmit.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_view.js" type="text/javascript"></script>
</asp:Content>

