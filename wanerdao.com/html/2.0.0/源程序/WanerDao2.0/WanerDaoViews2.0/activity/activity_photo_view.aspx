<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_photo_view.aspx.cs" Inherits="activity_activity_myhistory_photo_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>浏览历史活动相片-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
    <meta name="keywords" content="浏览照片，历史活动，玩儿道，生活社交网络" />
    <meta name="description" content="单张浏览选定历史活动中的选择相册内的所有照片，并且可以进行评论" />
    <link href="../css/activity_myhistory.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" />
    <link href="../css/personal.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/jquery.ui.tabs.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div id="container" class="container activityMain">
  <div class="tabs">
    <div class="mes_com_box_Tab"> <a href="/activity/activity_main.html">活动信息</a> <a href="/activity/activity_myactivity.html" class="active">我的活动</a> </div>
    <div class="tabs-panel"> 
      <!-- myhistroyTitle -->
      <div class="myhistoryMenu">
        <ul>
            <li><a id="gobackindex" href="activity_myactivity.html?id={0}">活动信息及评论</a></li>
            <li><a id="viewalbum" class="current">浏览相册</a></li>
            <li><a id="uploadalbum" href="activity_album_upload.html?id={0}">上传相片</a></li>
            <li><a id="editphoto" href="activity_photo_edit.html?id={0}">管理相册</a></li>
            <li><a id="viewmanagerblog" href="activity_myhistory_blog.aspx?id={0}">浏览发表管理感想</a></li>
        </ul>
      </div>
      <!-- myhistoryMenu -->
      <div class="pageid">
                    </div>
      <div class="AM_albumUploadWarp">
        <h4 class="tBgb AM_photoAlbum"><b class="icon32 fCblue">相册浏览</b></h4>
        <div class="album-title">loading...</div>
         <div class="vedio-tabs vedio-tabs-blue horiz-ah-pager" style="width:auto; margin:10px 0;"> <a title="上一页" class="vedio-prev pager-prev" href="javascript:"></a>
          <div class="vedio-clip vedio" >
            <ul class="vedio-panel  clearfix" >
            </ul>
          </div>
          <a title="下一页" class="vedio-next pager-next" href="javascript:"></a> </div>
        <%--<div class="vedio-tabs vedio-tabs-blue horiz-ah-pager" style="width:auto; margin:10px 0;"> 
        <a title="上一页" class="vedio-prev pager-prev" href="javascript:"></a>
          <div class="vedio-clip vedio" style="overflow: hidden;width:875px;">
            <ul class="vedio-panel  clearfix" >
              
            </ul>
          </div>info-opt
          <a title="下一页" class="vedio-next pager-next" href="javascript:"></a> 
          </div>--%>
        <div class="yellow-pager photo-pager"> 
        <a href="javascript:;" class="pager-prev" style="display:none" ></a> 
        <a href="javascript:;" class="pager-next" style="display:none"></a>
        <img height="500px"/>
        </div>
        <div class="vedio-info">
          <h3></h3>
          <p id="picinfo"></p>  
         <div class="overflow" id="activityreplay"><a class="info-opt f_right" href="javascript:;">回复</a></div>          
        </div>
        <br/>
      </div>
      <!-- AM_photoEditWarp --> 
    </div>
  </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="/scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="/scripts/activity/activity_myhistory_photo_view.js" type="text/javascript"></script>
            <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script>
    <script src="/scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>

</asp:Content>
