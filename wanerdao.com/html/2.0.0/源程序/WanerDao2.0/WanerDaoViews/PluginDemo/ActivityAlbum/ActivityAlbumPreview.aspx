<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivityAlbumPreview.aspx.cs" Inherits="PluginDemo_ActivityAlbum_ActivityAlbumPreview" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>相册插件演示--相册列表</title>
    <link href="../../css/PluginCss/Album/home.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Ablum/activityalbumpreview.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    
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
        <div class="marginB10">
        	<div class="blog_pageBg subLink">
				<div class="floatLeft"><span class="font14">相册列表</span></div>
                <div class="blog_page" id="pageid"></div>
            </div>
            <div class="blog_textWrap borderNone">
				<ul class="photo_albumUl"  id="photo_albumUl">
				</ul>
            </div>
        	<div class="blog_pageBg">
        		<div class="blog_page subLink" id="pageidBt"></div>
            </div>
        </div><!--end content-->
	</div><!--end container-->
</div><!--end main-->
 

    </form>
</body>
</html>
  