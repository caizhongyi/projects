<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileUpload.aspx.cs"
    Inherits="PluginDemo_ActivityFileUpload_FileUpload" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>上传</title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <link href="../../css/PluginCss/Album/home.css" rel="stylesheet" type="text/css" />
    
</head>
<body>
    <div id="main">
        <div id="container">
            <div class="microBlog_forumWap">
                <div class="microBlog micBig">
                    <div class="stitle marginY15">
                        <h4 class="red time02">
                            上传设置</h4>
                    </div>
                    
                    <div class="allclear">
                    </div>
                    <div class="stitle" style="margin: 20px;">
                        <div class="floatL marginL20">
                            <div id="spanButtonPlaceholder">
                            </div>
                        </div>
                        <div class="floatL marginL20">
                            <input type="submit" value="确 定" onclick="submitUploadImage();" class="input_submit"/></div>
                            
                        <div class="floatL marginL20" style="width: 60%; display: none;">
                            <span style="width: 60%; display: block; line-height: 18px;">正在上传"1234.jpg"</span>
                            <span class="bar_grey"><span class="bar_Yellow" style="width: 85%">85%</span></span>
                        </div>
                        <div id='upload_target'></div>
                         <div class="floatL marginL20">
                            <input type="botton" value="确 定" id="buttontest" class="input_submit"/></div>
                    </div>
                </div>
            </div>
            <!--end microBlog-->
            <div id="message"></div>
            <div class="allclear">
            </div>
            <div id="UploadTempFileShow">
            </div>
        </div>
        </div>
        <!--end main-->
</body>
    <script src="swfupload.js" type="text/javascript"></script>
    <script src="handlers.js" type="text/javascript"></script>
    <script src="PageUpload.js" type="text/javascript"></script>
</html>
