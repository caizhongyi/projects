<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Personal_Video_Upload.aspx.cs" Inherits="Personal_Personal_Video_Upload" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title>共享个人视频-个人-玩儿道</title>
<!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="共享视频，个人，玩儿道，生活社交网络" />
<meta name="description" content="从视频网站Youtube,Youku,Tudou复制共享连接" />
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
            <li><a href="javascript:void(0);" class="current">上传视频</a></li>
            <li><a href="video_album_manage.html">管理视频</a></li>
          </ul>
        </div>
 <!-- myhistoryMenu -->
 <div class="AM_photoEditWarp">
  <h4 class="tBgb AM_photoAlbum"><b class="icon icon-video">上传设置</b><em>（上传步骤：1.选择上传视频册；2.复制视频连接；3.确定提交视频）</em></h4>
	
    
    <div class="form video-upload-form">
    	<ul>
        	<li><input  type="radio" name="folder" id="chkNewFolder" checked="checked"/><label for="chkNewFolder">上传到新文件夹，文件夹名</label><input  type="text" class="text" id="txtNewAlbum"/></li>
            <li><input  type="radio" name="folder" id="chkChooseFolder" /><label for="chkChooseFolder">上传到已存在的文件夹</label><select id="albums"></select></li>
            <li><label>权&nbsp;&nbsp;&nbsp;限：</label><select id="permissionlist"></select></li>
            <li><label style="vertical-align:top;">视频代码：</label><textarea class="textarea" style="height:75px; width:475px;" id="txtVideoCode"></textarea></li>
            
        </ul>
    	
        <div><input type="button" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="添加" id="txtAdd"/><input type="button" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14" value="确定" id="txtSubmit" style=" display: none;"/></div>
        本站支持 <a href="http://www.youku.com/" target="_blank">youku</a>,<a href="http://www.tudou.com/" target="_blank">tudou</a>,<a href="http://www.youtube.com" target="_blank">youtube</a>
    </div>
    
    <h3 class="media-header fb">视频列表<em>（预览无误以后，点击确定按钮才能最后正式上传）</em></h3>
    <ul class="videos clearfix ">
      
    </ul>
  </div>

  <div class="clear"></div>
 </div>
 <!-- AM_photoEditWarp -->
 </div>
</div>
<!--Main-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" Runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
    <script src="../scripts/personal/common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_common.js" type="text/javascript"></script>
    <script src="../scripts/personal/video_upload.js" type="text/javascript"></script>
</asp:Content>

