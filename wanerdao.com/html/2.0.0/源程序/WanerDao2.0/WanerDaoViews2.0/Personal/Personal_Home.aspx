<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Personal_Home.aspx.cs" Inherits="Personal_Personal_Home" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>玩儿道,最好玩最贴心的生活社交网络，发现活动，组织活动，简单开始</title>
    <meta name="keywords" content="玩儿道，生活社交网络，寻找活动，组织活动，圈子，个人，关系，杂烩，资道，站内信息" />
    <meta name="description" content="玩儿道（www.wanerdao.com，www.savorboard.com）是最温暖的生活社交网络。" />
    <link href="../css/home.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/pager.css" media="all" />
    <link href="../css/pop.css" rel="stylesheet" type="text/css" />
    <link href="../css/message.css" rel="stylesheet" type="text/css" />
    <link href="../scripts/jquery.chosen/jquery.chosen.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/plugin/jquery.ui/theme/start/jquery-ui-1.8.23.custom.css"
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
                     <a href="/relationship/relationship_friends_invite.aspx"
                        class="button join-button">邀请好友加入玩儿道</a>
                </div>
                <div class="sidebox recentVisitor">
                    <div class="hd clearfix">
                        <h3>
                            最近来访<span>（<span class="total">0</span>）</span></h3>
                        <div class="sidebox-pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next-disable next">
                            </a>
                            <%--<a class="all">全部</a>--%>
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
                            您可能认识的朋友<span>（<span class="total">0</span>）</span></h3>
                        <div class="sidebox-pager">
                            <a href="javascript:;" class="prev-disable prev"></a><a href="javascript:;" class="next-disable next">
                            </a>
                            <%--<a class="all">全部</a>--%>
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
                            活动推荐<span>（<span class="rightRecommCount">0</span>）</span></h3>
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
                        <a class="active aroundAct" href="javascript:;">周边</a> <a href="javascript:;" class="interestingAct">
                            感兴趣</a> <a href="javascript:;" class="followAct">关注</a>
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
                                图片:</label><input type="text" class="text" id="uploadImgUrl" /><a href="javascript:;"
                                    id="aButtonPlaceholder" class="upload">上传</a>
                            <br />
                            <br />
                            <label>
                                描述:</label><textarea class="textarea" id="uploadImgDesc"></textarea>
                        </li>
                        <li class="link" style="display: none;">
                            <label>
                                链接:</label><input type="text" class="text" id="linkUrl" value="http://" />
                            <br />
                            <br />
                            <label>
                                描述:</label><textarea class="textarea" id="linkContent"></textarea>
                        </li>
                        <li class="vedio" style="display: none;">
                            <label>
                                视频源:</label><input type="text" class="text" id="videoCode"/><span
                                    class="red">url或者代码</span>
                            <br />
                            <br />
                            <label>
                                描述:</label><textarea class="textarea" id="vedioDesc"></textarea>
                        </li>
                    </ul>
                </div>
                <div class="clearfix isSelf" style="position: relative; z-index: 4;">
                    <div class="f_left">
                        <em>共享:</em>
                        <div class="tabs-nav">
                            <a class="status tabs-nav-cur" href="javascript:;">
                                <img alt="" src="../images/home/arrowhead_bottom.png" />状态</a><a href="javascript:;"
                                    class="pic"><img alt="" src="../images/home/arrowhead_bottom.png" />图片</a><a href="javascript:;"
                                        class="link"><img alt="" src="../images/home/arrowhead_bottom.png" />链接</a><a href="javascript:;"
                                            class="vedio"><img alt="" src="../images/home/arrowhead_bottom.png" />视频</a>
                        </div>
                    </div>
                    <div class="f_right">
                        <%--<a href="javascript:;" class="right">权限</a>--%><input type="submit" class="button button1 share"
                            value="发 布" /></div>
                </div>
                <div class="leave-message-box" style="display: none;">
                    <textarea class="textarea" id="commArea"></textarea>
                    <div class="clearfix" style="position: relative; z-index: 4">
                        <div class="f_left maxlength" id="inputWord">
                            还能输入<em>140</em>字</div>
                        <div class="f_right">
                            <input type="submit" class="button button1" value="留 言" id="comment" /></div>
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
                    <div class="moreStateBar" style="display: none; cursor: pointer; text-align: center;
                        color: #7F7F7F">
                        更多~</div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Script" runat="Server">
    <script type="text/javascript" src="../scripts/jquery.chosen/jquery.chosen.js"></script>
    <script type="text/javascript" src="../scripts/openplugin/jquery-ui-1.8.23.custom.min.js"></script>
    <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../scripts/openplugin/fancybox/jquery.mousewheel-3.0.6.pack.js"></script>
    <script type="text/javascript" src="../scripts/openplugin/fancybox/jquery.fancybox.js"></script>
    <script type="text/javascript" src="../scripts/plugin/personal/wanerdao2.personalInfo.js"></script>
    <script type="text/javascript" src="../scripts/plugin/pagination/wanerdao2.pager.js"></script>
    
    <script src="../scripts/plugin/notebook/wanerdao2.replycontent.js" type="text/javascript"></script>

    <script type="text/javascript" src="/scripts/plugin/util/wanerdao2.date.region.js"></script>
    <script type="text/javascript" src="/scripts/plugin/util/wanerdao2.util.js"></script>

    <script type="text/javascript" src="../scripts/personal/common.js"></script>
    <script type="text/javascript" src="../scripts/home/userstate.js"></script>
    <script type="text/javascript" src="/scripts/plugin/tinycalendar/wanerdao2.tinycalendar.js"></script>
    <script type="text/javascript" src="/scripts/plugin/ablum/swfupload.js"></script>
    <script type="text/javascript" src="/scripts/plugin/ablum/swfupload.queue.js"></script>
    <script type="text/javascript" src="/scripts/personal/photo_upload_handler.js"></script>
    <script type="text/javascript" src="/scripts/personal/personHome.js"></script>
    <script type="text/javascript" src="../scripts/plugin/shield/wanerdao2.personalshield.js"></script>
</asp:Content>
