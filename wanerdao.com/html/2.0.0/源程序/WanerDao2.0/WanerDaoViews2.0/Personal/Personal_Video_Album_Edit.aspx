<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Album_Edit.aspx.cs" Inherits="Personal_Personal_Video_Album_Edit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>编辑个人视频册-个人-玩儿道</title>
<meta name="keywords" content="编辑个人视频册，个人，玩儿道，生活社交网络" />
<meta name="description" content="修改个人视频册权限，并可以选择需要进一步修改相册" />
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
        <div class="myhistoryMenu">
          <ul>
            <li><a href="video_album.html">浏览视频</a></li>
            <li><a href="video_upload.html">上传视频</a></li>
            <li><a href="javascript:void(0);" class="current">管理视频</a></li>
          </ul>
        </div>
        <!-- myhistoryMenu -->
        <div class="AM_photoEditWarp">
          <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">视频设置</b>&nbsp;&nbsp;设置新视频册默认权限&nbsp;&nbsp;<select id="setdefaultpermission"></select>&nbsp;&nbsp;新建视频册&nbsp;&nbsp;<input type="text" inputdefault="新建视频册" value="新建视频册" class="text" id="albumname">&nbsp;&nbsp;<input  type="button" class="button button-gay" value="新建" id="newalbum"/></h4>
          <div class="clearfix pagewrap media-header">
            <!-- 分页左边 -->
            <div class="f_left">
            	<span class="search-textbox">
                 <input type="text" inputdefault="相片编号/相片序号" value="相片编号/相片序号" class="" id="srhkey">
                 <input type="button" id="srhAlbum">
                 </span>
     		</div>
            <!-- 分页左边 -->
            <!-- 分页右边 -->
            <div class="pageList  f_right"></div>
            <!-- 分页右边 -->
            </div>
          
          <ul class="videos videos-edit clearfix">
            
          </ul>
          <div class="clearfix media-footer">
              <div class="video-right f_left">
                <input type="checkbox" class="chkAll" />
                &nbsp;&nbsp;
                <select  id="updatePer" >
                  <option>更改权限</option>
                </select>
                &nbsp;&nbsp;<a href="javascript:;" id="batchDelAlbums">删除</a>
              </div>
              <div class="pageList f_right"><a  href="javascript:;">显示更多</a>&nbsp;&nbsp;<span>第</span><input type="text" class="text" value="0"><span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>页</span>&nbsp;&nbsp;<span>共</span>&nbsp;<span>0</span>&nbsp;<span>条</span>&nbsp;&nbsp;<a title="首页" href="javascript:;">首页</a><a title="上一页" href="javascript:;">上一页</a><a title="下一页" href="javascript:;">下一页</a><a title="尾页" href="javascript:;">尾页</a></div>
          </div>
        </div>
      </div>
    </div>
    <!-- AM_photoEditWarp --> 
  </div>

<!--Main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js" type="text/javascript"></script>
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_album_edit.js" type="text/javascript"></script>
</asp:Content>

