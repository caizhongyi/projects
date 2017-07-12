<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Photo_album_Preview.aspx.cs" Inherits="Personal_Personal_Photo_album_Preview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>预览个人相册-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="预览相册，个人，玩儿道，生活社交网络" />
<meta name="description" content="对相册中的相片进行缩略图的浏览，并可以进行打印和重命名" />
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
          	<div class="f_left">
         		 <b class="icon icon-photo">相册设置</b>&nbsp;&nbsp;<a href="javascript:;"><span class="album_count">(loading)</span></a>&nbsp;&nbsp;<span class="icon icon-red-block"></span>&nbsp;&nbsp;<span>自建相册</span>&nbsp;&nbsp;<span class="icon icon-blue-block"></span>&nbsp;&nbsp;<span>活动共享相册</span>
           </div>
          </h4>
   <div class="f_left" >
      <div class="album-tabs">
        <a href="javascript:" class="album-prev" title="上一页"></a>
        
        <div class="album-clip album-vertical">
            <ul class="album-panel albums clearfix">

            </ul>
        </div>
         <a href="javascript:" class="album-next" title="下一页"></a>
        
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

