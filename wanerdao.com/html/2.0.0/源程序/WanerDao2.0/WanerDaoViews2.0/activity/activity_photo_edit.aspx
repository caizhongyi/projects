<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_photo_edit.aspx.cs" Inherits="activity_activity_myhistory_photo_edit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>编辑历史活动相片-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
    <meta name="keywords" content="编辑相片，历史活动，玩儿道，生活社交网络" />
    <meta name="description" content="对选择历史活动中的选择相册内的相片进行排序，设置是否显示等操作" />
    <link href="../css/activity_myhistory.css" rel="stylesheet" type="text/css" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/pager.css" rel="stylesheet" type="text/css" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="activity_myhistory w_1004 pBgC">
            <div class="myhistroyTitle">
                <div class="black10">
                </div>
                <div class="black10">
                </div>
        	 <div class="mes_com_box_Tab"> <a href="/activity/activity_main.html" class="active">活动信息</a> <a href="/activity/activity_myactivity.html">我的活动</a> </div>
            </div>
            <div class="myhistoryMenu">
                <ul>
                    <li><a id="gobackindex" href="activity_myactivity.html?id={0}">活动信息及评论</a></li>
                    <li><a id="viewalbum" href="activity_album_view.html?id={0}">浏览相册</a></li>
                    <li><a id="uploadalbum" href="activity_album_upload.html?id={0}">上传相片</a></li>
                    <li><a class="current">管理相册</a></li>
                    <li><a id="viewmanagerblog" href="activity_myhistory_blog.aspx?id={0}">浏览发表管理感想</a></li>
                </ul>
            </div>
            <div class="AM_photoEditWarp">
                <h4 class="tBgb AM_photoAlbum">
                    <b class="icon32 fCblue">历史活动相册</b>&nbsp;&nbsp;管理相册数(<small class="fSize-12 fCblue" id="albumtotal">loading</small>)&nbsp;&nbsp;
                    管理图片数(<small class="fSize-12 fCblue" id="photototal">loading</small>)</h4>
                <div class="f_left" style="margin-top: 20px;">
                    <div class="album-tabs">
                        <a href="javascript:" class="album-prev" title="上一页"></a>
                        <div class="album-clip album-vertical" style="overflow: hidden;">
                            <ul class="album-panel albums clearfix" style="height: 702px; position: relative;top: 0px;">
                            </ul>
                        </div>
                        <a href="javascript:" class="album-next" title="下一页"></a>
                    </div>
                </div>
                <div class="AM_photoEdit_Main f_left">
                    <div class="photoAlbumName">
                        <span class="f_right" style="margin: 0 36px 0 0;"><a href="javascript:;" class="delAlbum" id="delAlbumAction" style="display:none">删除相册链接 &nbsp;</a>
                        <a href="javascript:;" class="disableAlbum" id="disableAlbumAction" style="display:none">取消共享链接&nbsp;</a></span><span id="spanalbumname">loading...</span>&nbsp;&nbsp;相片总数(<span id="span1">loading...</span>)&nbsp;&nbsp;可编辑数(<span id="span2">loading...</span>)
                    </div>
                    <div class="photoList">
                        <div class="photoListHead clearfix">
                            <!-- 分页左边 -->
                            <div class="f_left">
                                <span class="search-textbox">
                                    <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="txtsrh"/>
                                    <input type="button"  class="btnsrh"/>
                                </span>
                            </div>
                            <div class="pageList f_right" id="AlbumUl">
                            </div>
                        </div>
                        <ul class="photoListMain">
                        </ul>
                        <div class="photoListFoot">    
                            <table width="708" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="40" align="center"><input type="checkbox" id="chkAllSelect"/></td>
                                    <td colspan="2"><a href="javascript:;" id="delphotos"> 删除 </a><a href="javascript:;" id="blkphotos">屏蔽</a></td>
                                    <td>
                                        <div class="pageList  f_right"></div>
                                        </td>
                                </tr>
                        </table>
                                        <!-- 分页右边 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="/scripts/common/wanerdaoutils.js"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
        <script src="../scripts/plugin/TipPop/wanerdao2.pop.js" type="text/javascript"></script>
         <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/photo_common.js" type="text/javascript"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/activity/activity_myhistory_photo_edit.js" type="text/javascript"></script>
</asp:Content>
