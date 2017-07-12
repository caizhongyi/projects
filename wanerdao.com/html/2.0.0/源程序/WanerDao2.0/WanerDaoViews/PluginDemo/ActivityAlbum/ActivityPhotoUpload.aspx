<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivityPhotoUpload.aspx.cs"
    Inherits="PluginDemo_ActivityAlbum_ActivityPhotoUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>相册插件演示--照片上传</title>
    <link href="../../css/PluginCss/Album/home.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Ablum/swfupload.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Ablum/handlers.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Ablum/activityphotoUpload.js" type="text/javascript"></script>
</head>
<body>
    <div id="main">
        <div id="container">
            <div class="tabsNav">
                <ul>
                    <li><a href="ActivityAlbumPreview.aspx"><span>浏览相册</span></a></li>
                    <li>|</li>
                    <li class="active"><a href="ActivityPhotoUpload.aspx"><span>上传照片</span></a></li>
                    <li>|</li>
                    <li><a href="#"><span>管理相册</span></a></li>
                </ul>
            </div>
            <div class="microBlog_forumWap">
                <div class="microBlog micBig">
                    <div class="stitle marginY15">
                        <h4 class="red time02">
                            上传设置</h4>
                    </div>
                    <div class="stitle marginY15">
                        <input type="checkbox" class="checkbox marginR5">共享到活动&nbsp;
                        <select>
                            <option selected>请选择要上传的活动名称</option>
                        </select>&nbsp;<span class="subLink"><a href="#">查找更多</a></span></div>
                    <div class="stitle marginY15">
                        <input name="" type="radio" value="" class="marginR5">上传到新文件夹，文件夹名&nbsp;
                        <input type="text" id="foldername" class="inputText10 marginR5" value="请输入关键字">&nbsp;</div>
                    <div class="stitle marginY15">
                        <input name="" type="radio" value="" class="marginR5">上传到已存在的文件夹&nbsp;
                        <select>
                            <option selected>选择文件夹</option>
                        </select>&nbsp;</div>
                    <!--end microBlog bd-->
                    <div class="stitle marginY15" style="margin-left: 20px;">
                        <span class="marginR20">权限&nbsp;<select>
                            <option selected>选择权限</option>
                        </select></span>
                    </div>
                    <div class="allclear">
                    </div>
                    <div class="stitle" style="margin: 20px;">
                        <div class="floatL">
                            <div id="spanButtonPlaceholder">
                            </div>
                        </div>
                        <div class="floatL marginL20">
                            <input type="submit" value="确 定" onclick="submitUploadImage();" class="input_submit"></div>
                        <div class="floatL marginL20" style="width: 60%; display: none;">
                            <span style="width: 60%; display: block; line-height: 18px;">正在上传"1234.jpg"</span>
                            <span class="bar_grey"><span class="bar_Yellow" style="width: 85%">85%</span></span>
                        </div>

                         <div class="floatL marginL20">
                            <input type="botton" value="确 定" id="buttontest" class="input_submit"></div>
                    </div>
                </div>
            </div>
            <!--end microBlog-->
            <div class="stitle marginY15 marginL15">
                <h4 class="red time02">
                    照片预览</h4>
            </div>
            <div class="allclear">
            </div>
            <div id="thumbnails">
                <%--<div class="upload_pic">
        <div class="upload_pic_close"><img src="../../images/PluginImages/Album/close.gif" width="18" height="18"></div>
        <div class="upload_pic_t"></div>
        <div class="upload_pic_m">
        <img src="../../UploadPhoto/美国-吉普1.jpg" width="164" height="116" class="marginB10">
        <h3>铃铛&夏日秋语</h3>
        </div>
        <div class="upload_pic_b"></div>
      </div>--%>
            </div>
        </div>
        <!--end main-->
</body>
</html>
