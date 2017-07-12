<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="activity_album_upload.aspx.cs" Inherits="activity_activity_myhistory_album_upload" %>
     
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <title>上传历史活动相册-活动-玩儿道</title>
    <!--  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> -->
<meta name="keywords" content="上传照片，历史活动，玩儿道，生活社交网络" />
<meta name="description" content="上传多张相片到选择的活动中" />
    <link href="../css/activity_myhistory.css" rel="stylesheet" type="text/css" />
    <link href="../css/activity.css" rel="stylesheet" type="text/css" media="all" />
    <link href="../css/table.css" rel="stylesheet" type="text/css" />
    <link href="../css/icon.css" rel="stylesheet" type="text/css" />
    <link href="../css/media.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <script src="../scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../scripts/plugin/ablum/swfupload.js" type="text/javascript"></script>
    <script src="../scripts/plugin/ablum/swfupload.queue.js" type="text/javascript"></script>
    <script src="../scripts/activity/activity_myhistory_album_upload_handler.js" type="text/javascript"></script>
    <script src="../scripts/activity/activity_myhistory_album_upload.js" type="text/javascript"></script>  
    <style type="text/css">
        .progressWrapper
        {
            width: 357px;
            overflow: hidden;
        }
        
        .progressContainer
        {
            margin: 5px;
            padding: 4px;
            border: solid 1px #E8E8E8;
            background-color: #F7F7F7;
            overflow: hidden;
        }
        /* Message */
        .message
        {
            margin: 1em 0;
            padding: 10px 20px;
            border: solid 1px #FFDD99;
            background-color: #FFFFCC;
            overflow: hidden;
        }
        /* Error */
        .red
        {
            border: solid 1px #B50000;
            background-color: #FFEBEB;
        }
        
        /* Current */
        .green
        {
            border: solid 1px #DDF0DD;
            background-color: #EBFFEB;
        }
        
        /* Complete */
        .blue
        {
            border: solid 1px #CEE2F2;
            background-color: #F0F5FF;
        }
        
        .progressName
        {
            font-size: 8pt;
            font-weight: 700;
            color: #555;
            width: 323px;
            height: 14px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
        }
        
        .progressBarInProgress, .progressBarComplete, .progressBarError
        {
            font-size: 0;
            width: 0%;
            height: 2px;
            background-color: blue;
            margin-top: 2px;
        }
        
        .progressBarComplete
        {
            width: 100%;
            background-color: green;
            visibility: hidden;
        }
        
        .progressBarError
        {
            width: 100%;
            background-color: red;
            visibility: hidden;
        }
        
        .progressBarStatus
        {
            margin-top: 2px;
            width: 337px;
            font-size: 7pt;
            font-family: Arial;
            text-align: left;
            white-space: nowrap;
        }
        
        a.progressCancel
        {
            font-size: 0;
            display: block;
            height: 14px;
            width: 14px;
            background-image: url(../images/cancelbutton.gif);
            background-repeat: no-repeat;
            background-position: -14px 0px;
            float: right;
        }
        
        a.progressCancel:hover
        {
            background-position: 0px 0px;
        }
        
        
        /* -- SWFUpload Object Styles ------------------------------- */
        
        .swfupload
        {
            vertical-align: middle;
        }
    </style>  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="activityMain layout">
        <div id="container" class="activity_myhistory container pBgC">
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
                            <li><a id="viewalbum" href="activity_album_view.html?id={0}">浏览相册</a></li>
                            <li><a id="uploadalbum" class="current">上传相片</a></li>
                            <li><a id="editphoto" href="activity_photo_edit.html?id={0}">管理相册</a></li>
                            <li><a id="viewmanagerblog" href="activity_myhistory_blog.aspx?id={0}">浏览发表管理感想</a></li>
                </ul>
            </div>
            <div class="AM_albumUploadWarp">
                <h4 class="tBgb AM_photoAlbum">
                    <b class="icon32 fCblue">上传设置</b> <small class="fSize-12 fCred">（ 对于自己发布相册，可以共享到个人模块日志分页中进行相应的维护。上传步骤：1.选择上传相册；2.上传照片预览；3.确定提交照片）</small></h4>
                <div class="AM_albumUpload_Main">
                    <div class="albumUploadSetmod">
                        <dl>
                            <dd class="formTitle">
                                共享到活动：</dd>
                            <dd class="formMain fCblue" id="activityName">
                                loading...</dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                        <dl>
                            <dd class="formTitle">
                                &nbsp;<input type="radio" name="folder" value="1" id="chkNewFolder" checked="checked"/></dd>
                            <dd class="formMain">
                                上传到新文件夹，文件夹名&nbsp;<input type="text" class="text" id="newAlbum" /></dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                        <dl>
                            <dd class="formTitle">
                                &nbsp;<input type="radio" name="folder" value="0" id="chkChooseFolder" /></dd>
                            <dd class="formMain">
                                上传到已经存在的文件夹，<select id="albumlist" style="width: 200px;">
                                </select></dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                        <dl id="dlpermission">
                            <dd class="formTitle">
                                &nbsp;</dd>
                            <dd class="formMain">
                                权限&nbsp;&nbsp;<select id="selectChoosePermission">
                                </select></dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                        <dl>
                            <dd class="formTitle">
                                <div id="divFileProgressContainer">
                                </div>
                            </dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                        <dl class="stip">
                        </dl>
                        <dl>
                            <dd class="formTitle">
                                &nbsp;</dd>
                            <dd class="formMain">
                                <div id="spanButtonPlaceholder">
                                </div>
                                &nbsp;
                                <input type="button" id="submitPhoto" value="确定" class="button buttonB btn_w135 btn_h36 btnBlue_135 fSize-14"
                                    style="display: none;" /></dd>
                        </dl>
                        <dl class="clear">
                        </dl>
                    </div>
                    <div class="photoViewBox">
                        <h4>
                            <b class="icon32 fCblue">照片预览</b></h4>
                        <ul id="thumbnails" class="photos clearfix ">
                        </ul>
                    </div>
                    <div class="clear">
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js" type="text/javascript"></script>
    <script src="../scripts/common/permission.js" type="text/javascript"></script>
</asp:Content>
