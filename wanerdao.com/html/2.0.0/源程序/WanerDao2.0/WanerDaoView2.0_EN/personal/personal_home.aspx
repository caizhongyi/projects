<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="personal_home.aspx.cs" Inherits="personal_personal_home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Savorboard, Life and social network, find activity, organize activity, start simply </title>

<meta name="keywords" content="Savorboard, Life and social network, Search activity, Organise activity, Group, Personal, Relationship, Forum, Information, Message" />
<meta name="description" content="Savorboard (www.savorboard,com) is the most warm life and social network. User can find kinds of amazon activites by their needs and savorboard can plan and organise everything smoothly like a professional chamberlain. Through these activites, you can get together with your old friends or know some new friends around. Talk each other, play each other, share every happy. Let's start simply from here." />

    <link href="../css/home.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
    <link href="../css/pop.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <%--<link rel="stylesheet" type="text/css" href="../css/plugin/jquery.ui/themes/base/jquery.ui.all.css"
        media="all" />--%>
    <link rel="stylesheet" type="text/css" href="/css/plugin/jquery.ui/theme/start/jquery-ui-1.8.23.custom.css"
        media="all" />
    <link href="../scripts/openplugin/fancybox/jquery.fancybox.css" rel="stylesheet"
        type="text/css" />
    <style type="text/css">
        .swfupload
        {
            vertical-align: middle;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Content" runat="Server">
    <div class="container layout">
      <div class="side">
        <div class="equal">
           <div id="tcalendar">
                </div>
            <div class="join">
            	
                <a href="/relationship/relationship_friends_invite.aspx" class="button join-button">Invite my friends</a>
            </div>
            
            <div class="sidebox recentVisitor">
            	<div class="hd clearfix">
                	<h3>Recent visitors<span>（<span class="total">0</span>）</span></h3>
                    <div class="sidebox-pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next-disable next">
                            </a>
                            <%--<a class="all">All</a>--%>
                        </div>
               </div>
               <div class="bd">
                        <ul class="clearfix">
                        </ul>
                    </div>
            </div>
            <div class="sidebox possibleFriends">
                    <div class="hd clearfix">
                        <h3>
                            Recent visitors<span>（<span class="total">0</span>）</span></h3>
                        <div class="sidebox-pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next-disable next">
                            </a>
                            <%--<a class="all">All</a>--%>
                        </div>
                    </div>
                    <div class="bd">
                        <ul class="clearfix">
                        </ul>
                    </div>
                </div>
                <div class="sidebox rRecomm">
                    <div class="hd clearfix">
                        <h3>
                            Recommended activity<span>（<span class="rightRecommCount">0</span>）</span></h3>
                    </div>
                    <div class="bd">
                        <div class="boxpager clearfix">
                            <!-- prev next -->
                            <a href="javascript:;" class="prev-disable tabs-prev"></a><a href="javascript:;"
                                class="next-disable tabs-next"></a>
                            <div class="tabs-clip" style="overflow: hidden">
                                <ul class="tabs-panel rightRecomm">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="sidebox areabox">
                    <div class="mes_com_box_Tab mes_small_box_tab clearfix">
                        <a class="active aroundAct" href="javascript:;">Around</a> <a href="javascript:;" class="interestingAct">
                            Interesting</a> <a href="javascript:;" class="followAct">Subscribed</a>
                    </div>
                    <div class="bd">
                        <div id="rhint">
                        </div>
                        <div class="areabox-content">
                            <%--<div class="selects">
                                <select>
                                </select>
                                <select>
                                </select>
                                <select>
                                </select>
                            </div>--%>
                            <ul class="arealist">
                            </ul>
                            <div class="sidepage">
                                <a class="prev-disabled prev" href="javascript:void(0);"></a><span class="currPage">
                                    0</span>/<span class="totalPage">0</span><a href="javascript:void(0);" class="next-disabled  next"></a>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
      <div class="main">
            <div class="switch box clearfix">
                <ul class="switch-nav">
                </ul>
                <ul class="switch-panel">
                </ul>
            </div>
            <div class="commentbox box">
                <div id="hint">
                </div>
                <div class="panel-box isSelf">
                    <ul class="tabs-panel">
                        <li class="status">
                            <div id="spetit_word">
                            </div>
                            <textarea class="textarea" id="p_qa_content"></textarea></li>
                        <li class="pic" style="display: none;">
                            <label>
                                Image:</label><input type="text" class="text" id="uploadImgUrl" /><a href="javascript:;"
                                    id="aButtonPlaceholder" class="upload">上传</a>
                            <br />
                            <br />
                            <label>
                                Description:</label><textarea class="textarea" id="uploadImgDesc"></textarea>
                        </li>
                        <li class="link" style="display: none;">
                            <label>
                                Link:</label><input type="text" class="text" id="linkUrl" value="http://" />
                            <br />
                            <br />
                            <label>
                                Description:</label><textarea class="textarea" id="linkContent"></textarea>
                        </li>
                        <li class="vedio" style="display: none;">
                            <label>
                                Video Link:</label><input type="text" class="text" id="vedioUrl" value="http://" /><span
                                    class="red">支持优酷,土豆</span>
                            <br />
                            <br />
                            <label>
                                Description:</label><textarea class="textarea" id="vedioDesc"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="clearfix isSelf" style="position: relative; z-index: 4;">
                    <div class="f_left">
                        <em>Share:</em>
                        <div class="tabs-nav">
                            <a class="status tabs-nav-cur" href="javascript:;">
                                <img alt="" src="../images/home/arrowhead_bottom.png" />New feeds</a><a href="javascript:;"
                                    class="pic"><img alt="" src="../images/home/arrowhead_bottom.png" />Image</a><a href="javascript:;"
                                        class="link"><img alt="" src="../images/home/arrowhead_bottom.png" />Link</a><a href="javascript:;"
                                            class="vedio"><img alt="" src="../images/home/arrowhead_bottom.png" />Video</a>
                        </div>
                    </div>
                    <div class="f_right">
                        <%--<a href="javascript:;" class="right">Permission</a>--%><input type="submit" class="button button1 share"
                            value="Publish" /></div>
                </div>
                <div class="leave-message-box" style="display:none;">
                    <textarea class="textarea" id="commArea"></textarea>
                    <div class="clearfix" style="position: relative; z-index: 4">
                        <div class="f_left maxlength" id="inputWord">
                            Can enter<em>140</em>word</div>
                        <div class="f_right">
                            <input type="submit" class="button button1" value="leave comments" id="comment"/></div>
                    </div>
                </div>
            </div>
            <div class="tabs">
                <div class="mes_com_box_Tab clearfix">
                    <div class="f_left" id="stateTab">
                        <!--<li><a href="javascript:;">资道</a></li> -->
                    </div>
                    <div class="options">
                        <a href="javascript:;" class="ref"></a>
                    </div>
                </div>
                <div class="tabs-panel">
                    <ul class="comments" id="statelist">
                    </ul>
                    <div class="loading">
                    </div>
                    <div class="moreStateBar" style="display: none; cursor: pointer; text-align: center; color:#7F7F7F">
                        More~</div>
                </div>
            </div>
        </div>
      
    </div>
   
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script src="../scripts/jquery.chosen/jquery.chosen.js"></script>
    <script src="../scripts/openplugin/jquery-ui-1.8.23.custom.min.js"></script>
     <script type="text/javascript" src="/scripts/jquery.core.js"></script>
     <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>

    <script src="../scripts/openplugin/fancybox/jquery.mousewheel-3.0.6.pack.js" type="text/javascript"></script>
    <script src="../scripts/openplugin/fancybox/jquery.fancybox.js" type="text/javascript"></script>

    <script src="../scripts/plugin/personal/wanerdao2.personalInfo.js"></script>
    <script src="../scripts/plugin/pagination/wanerdao2.pager.js"></script>
    <script src="../scripts/personal/common.js"></script>
    <script src="../scripts/home/userstate.js"></script>
    <script src="/scripts/plugin/tinycalendar/wanerdao2.tinycalendar.js"></script>
    <script src="/scripts/plugin/ablum/swfupload.js"></script>
    <script src="/scripts/plugin/ablum/swfupload.queue.js"></script>
    <script src="/scripts/personal/photo_upload_handler.js"></script>
    <script src="/scripts/personal/personHome.js"></script>
    <script src="../scripts/plugin/shield/wanerdao2.personalshield.js" ></script>
    
  
</asp:Content>

