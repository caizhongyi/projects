<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_photo_edit_byMiniature.aspx.cs" Inherits="personal_personal_photo_edit_byMiniature" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>Edit photo-Personal-Savorboard</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="Edit photo, Personal, Savorboard, Life and social network" />
<meta name="description" content="Edit personal photo sequence" />
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
    
        <!-- myhistroyTitle -->
        <div class="myhistoryMenu">
          <ul>
            <li><a href="photo_album.html">View</a></li>
            <li><a href="photo_upload.html">Upload</a></li>
            <li><a href="photo_album_manage.html" class="current">Management</a></li>
          </ul>
        </div>
        <!-- myhistoryMenu -->
        <div class="AM_photoEditWarp">
        <h4 class="tBgb AM_photoAlbum"><b class="icon icon-photo1">Album settings</b><a href="javascript:;" class="icon icon-blist-on">Arranged by miniature</a><a href="javascript:;" class="icon icon-mlist" id="photo_list">Arranged by list</a></h4>
          <div class="f_left" >
          <div class="album-tabs"> <a title="Prev" class="album-prev" href="javascript:"></a>
            <div class="album-clip album-vertical" style="overflow: hidden;">
              <ul class="album-panel albums clearfix" style="height: 702px; position: relative; top: 0px;">
               
              </ul>
            </div>
            <a title="Next" class="album-next" href="javascript:"></a> </div>
        </div>
          <!--pohtoedit widget -->
          <div class="AM_photoEdit_Main f_left">
            <div class="photoAlbumName"><span class="alb_name"></span><i class="">(loading)</i> <span class="search-textbox">
              <%--  <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="txtsrh">--%>
               <%-- <input type="button" class="btnsrh">--%>
              </span> </div>
            <div class="photoList">
              <div class="clearfix pagewrap media-header">
              <div class="pList">
						
                        </div>
                <div class="f_left" id="photoItems" style=" position: relative;">

                 <%-- <div class="album-list clearfix">
                    <h3>第一页</h3>
                   <ul id="items">
                        </ul>
                  </div>--%>
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
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/openplugin/jquery.core.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/wanerdao.photodrafsort.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_edit.js"></script>
</asp:Content>

