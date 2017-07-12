<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivityPhotoView.aspx.cs" Inherits="PluginDemo_ActivityAlbum_ActivityPhotoView" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>相册插件演示--照片展示</title>
    <link href="../../css/PluginCss/Album/home.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Ablum/activityphotoview.js" type="text/javascript"></script>
</head>
<body>
 <form  runat="server" id="form1">
 <div id="main">
	<div id="container">
		<div class="tabsNav">
        	<ul>
            	<li class="active"><a href="ActivityAlbumPreview.aspx"><span>浏览相册</span></a></li>
				<li>|</li>
            	<li><a href="ActivityPhotoUpload.aspx"><span>上传照片</span></a></li>
				<li>|</li>
            	<li><a href="#"><span>管理相册</span></a></li>
            </ul>		
		</div>
        <div id="left">
        <div class="data_leftBox blog_box margin0">
             <div class="columnNews margin0">
            <div class="blog_leftTitle">
                <h4>
                    王渝友的相册<span class="font12 subLink gray9">(<span id="" class="orangecolor">15</span>)</span>
                    <span style="display:none;"> <input type="submit"   value="Button"  class="folderrefresh" /></span>
                </h4><span id="pgalbum"></span>
            </div>
            <div class="photo_leftBox">
                <center>
                    <div class="photo_stat">
                        共<span id="ctl00_ContentPlaceHolder1_photoFolder_Left1_labPhotoSum" class="orangecolor">5</span>张照片&nbsp;&nbsp;已用<span class="red">1%</span></div>
                </center>
                <div class="existTag_box columnNews">
                    <center id="upul">
                        <div class="photo_arrup" onclick="upul();"></div>
                    </center>
                    <div class="columnNews" style="zoom: 1; visibility: visible; overflow: hidden; position: relative;
                        z-index: 2; height: 530px;">
                        <ul  class="photo_album_left friendsBox floatLeft" id="ULphotoFolder" style="position: relative; list-style-type: none; z-index: 1; top:0">
                        </ul>
                    </div>
                    <center id="downul">
                        <div class="photo_arrdown" onclick="downul();">
                        </div>
                    </center>
                </div>
            </div>
        </div>
        </div>
    <img class="floatRight" alt="" title="" src="../../images/PluginImages/Album/person_box_rb.gif" />
</div>
        <div class="dataContent">
            <div class="blog_textWrap">
            	<div class="photo_pageView">
                	<div class="photo_arrleft" onclick="leftul();"></div>
                    <div class="photo_previews" style="zoom: 1; visibility: visible; overflow: hidden; position: relative;
                        z-index: 2; width: 740px;margin-right:10px;">
                      <ul id="ULphoto" style="position: relative; list-style-type: none; z-index: 1; left: 0px; width: 1968px; "></ul>
                    </div>
                	<div class="photo_arrright" onclick="rightul();"></div>
                </div>
                <div class="pageView_aphotoView">
                	<center id="imgPage"></center>
                         <map id="photoMap" name="photoMap">
                        <area shape="rect" id="arealeft" href="#" coords="0,0,0,0" onclick="showphoto(-1);" alt="上一张" title="上一张" onfocus="this.blur()">
                        <area shape="rect" href="#" id="arearight" coords="300,0,600,450" onclick="showphoto(1);" alt="下一张" title="下一张" onfocus="this.blur()">
                    </map>
                </div>
                <div class="pageViwe_aphotoNamed" id="pageViwe_aphotoNamed">
                
                </div>
            </div>
        </div><!--end content--><!--end content-->
	</div><!--end container-->
</div><!--end main-->
 
</form>
</body>
</html>
