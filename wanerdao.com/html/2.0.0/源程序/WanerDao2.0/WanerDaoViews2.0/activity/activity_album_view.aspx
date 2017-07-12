<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_album_view.aspx.cs" Inherits="activity_activity_myhistory_album_view" %> 
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>浏览历史活动相册-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
    <meta name="keywords" content="浏览相册，历史活动，玩儿道，生活社交网络" />
    <meta name="description" content="浏览选择历史活动中的个人共享，他人共享，活动自建相册" />
    <link href="../css/activity_myhistory.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="activity_myhistory w_1004 pBgC">
            <div class="myhistroyTitle">
                <div class="black10">
                </div>
                <div class="black10">
                </div>
        	 <div class="mes_com_box_Tab"> <a href="/activity/activity_main.html">活动信息</a> <a href="/activity/activity_myactivity.html" class="active">我的活动</a> </div>
            </div>
            <div class="myhistoryMenu">
                <ul>
                            <li><a id="gobackindex" href="activity_myactivity.html?id={0}">活动信息及评论</a></li>
                            <li><a id="viewalbum" class="current">浏览相册</a></li>
                            <li><a id="uploadalbum" href="activity_album_upload.html?id={0}">上传相片</a></li>
                            <li><a id="editphoto" href="activity_photo_edit.html?id={0}">管理相册</a></li>
                            <li><a id="viewmanagerblog" href="activity_myhistory_blog.aspx?id={0}">浏览发表管理感想</a></li>
                </ul>
            </div>
            <div class="AM_albumUploadWarp">
                <h4 class="tBgb AM_photoAlbum">
                    <b class="icon32 fCblue">评价该活动</b> <small class="fSize-12 ">
                        <label for="">
                            <input type="radio" name="like" id="like" />
                            喜欢</label>
                        &nbsp;
                        <label for="">
                            <input type="radio" name="like" id="dontlike" />
                            不喜欢</label>
                        &nbsp;
                        <label for="">
                            <input type="radio" name="like" id="justsoso" />
                            一般</label>
                    </small><a href="javascript:;" id="viewresult">查看结果</a>
                </h4>
                <div class="AM_albumUpload_Main">
                    <h4 style="border-bottom: 1px dotted #e7e7e7; margin-bottom: 10px;" class="fCblue clearfix">
                        <div class="f_left">
                            <b class="icon32 fCgray3 fSize-14">相册列表(<small class="fCblue fSize-14" id="albumTotal"></small>)</b>
                            &nbsp;&nbsp;&nbsp;&nbsp; <span><i class="icon icon-red-block"></i>&nbsp;自己创建相册</span>
                            &nbsp;<span><i class="icon icon-yel-block"></i>&nbsp; 活动创建相册</span>&nbsp; <span><i  class="icon icon-blue-block"></i>&nbsp;他人共享相册</span>
                        </div>
                        <div class="pageid">
                        </div>
                    </h4>
                </div>
                <div id="list" class="albumViewBox">
                    <ul id="AlbumUl"  class="albums mutil-options-album clearfix">
                    </ul>
                </div>
                <div class="AlbumListFoot clearfix">
                    <div class="pageid">
                    </div>
                </div>
            </div>
            <div class="clear">
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/activity/activity_myhistory_album_view.js" type="text/javascript"></script>
    <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
         <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
        <script type="text/javascript" src="/Scripts/openplugin/jquery.flot.min.js"></script>
    <script type="text/javascript" src="/scripts/plugin/chart/wanerdao2.chart.js"></script>
</asp:Content>
