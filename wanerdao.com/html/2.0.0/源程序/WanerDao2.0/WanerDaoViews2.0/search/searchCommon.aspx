<%@ Page Title="" Language="C#" AutoEventWireup="true" CodeFile="searchCommon.aspx.cs"
    Inherits="search_searchCommon" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="icon" type="image/x-icon" href="/savorboard.ico" />
    <title>搜索结果-玩儿道</title>
    <meta content="搜索结果，用户，玩儿道，生活社交网络" name="keywords" />
    <meta content="全站搜索结果分类显示用户" name="description" />
    <link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/search.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/style.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/form.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/icon.css" media="all" />
    <link rel="stylesheet" type="text/css" href="/css/appTool.css" media="all" />
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-31932768-1']);
        _gaq.push(['_trackPageview']);
    </script>
    <script type="text/javascript">

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>
    <script type="text/javascript" src="/scripts/jquery-1.7.2.min.js"></script>
</head>
<body class="pBgB">
    <div class="header_wrapper pBgH">
        <div class="header layout">
            <a href="/personal" class="logo"></a>
            <div class="home" hoverable="true">
                <a href="javascript:;" class="go_home" title="回到首页"></a>
                <div class="home_pop">
                    <ul>
                        <li><a href="/activity/activity_main.html" class="hp_title">活动</a>
                            <p>
                                <a href="/activity/activity_search.html?activityNames=&catygoryNames=&friendsName=&groupNames=&sightNames=&countryId=&provinceId=&cityId=&address=">
                                    寻找活动</a><a href="/activity/activity_create.html">创建活动</a><a href="/activity/activity_item_main.html?categoryid=76d23440-c429-11e1-a032-000c29821f28">分类活动</a><a
                                        href="/activity/activity_define_main.html?categoryid=76d234ee-c429-11e1-a032-000c29821f28">自定义活动</a><a
                                            href="/activity/activity_season_main.html?categoryid=76d23b58-c429-11e1-a032-000c29821f28">时令活动</a><a
                                                href="/activity/activity_myactivity.html">我的活动</a><a href="/activity/activity_myactivity.html?type=history">历史活动</a></p>
                        </li>
                        <li><a href="/personal/index.html" class="hp_title">个人</a>
                            <p>
                                <a href="/personal/personal_info.html">资料</a><a href="/personal/blog.html">日志</a><a
                                    href="/personal/photo_album.html">相册</a><a href="/personal/video_album.html">视频</a></p>
                        </li>
                        <li><a href="/relationship/relationship_myfriends.aspx" class="hp_title">关系</a>
                            <p>
                                <a href="/relationship/relationship_myfriends.aspx">我的好友</a><a href="/relationship/relationship_friends_search.aspx">寻找好友</a><a
                                    href="/relationship/relationship_friends_invite.aspx">邀请好友</a><a href="/relationship/follow/follow_friends.html">关注设置</a><a
                                        href="/relationship/relationship_mygroup.aspx">我的圈子</a><a href="/relationship/relationship_group_search.aspx">寻找圈子</a><a
                                            href="/relationship/relationship_group_create.aspx">创建圈子</a><%--<a href="/relationship/relationship_gift_info.aspx">我的礼物</a><a
                                                href="/relationship/relationship_gift_market.aspx">礼物市场</a>--%></p>
                        </li>
                    </ul>
                    <div class="home_pop_bottom">
                        <p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="search">
                <div class="search_bg vm">
                    <input type="text" class="search_txt" value="寻找好友" inputdefault="寻找好友"
                        id="srch_str" maxlength="50" /><input value="" type="submit" class="search_btn" id="srch_info" />
                </div>
            </div>
        </div>
    </div>
    <div class="container layout">
        <div class="tabs">
            <div id="hint">
            </div>
            <div class="mes_com_box_Tab">
                <a class="active" href="javascript:;">搜索</a>
            </div>
            <div class="tabs-panel clearfix">
                <div class="searchbar clearfix">
                    <span class="search-textbox">
                        <input type="text" id="searchKey" /><input type="button" id="search" />显示<span class="allCount">0</span>个搜索结果</span>
                    <div class="pageList">
                        <a title="首页" href="javascript:;" class="first">首页</a><a title="上一页" href="javascript:;"
                            class="prev">上一页</a><input type="text" class="text currentPage" value="0">/<span
                                class="totalPage">0</span><a title="下一页" href="javascript:;" class="next">下一页</a><a
                                    title="尾页" href="javascript:;" class="last">尾页</a></div>
                </div>
                <ul class="sidenav">
                    <li class="cur" id="person"><a href="javascript:;">用户&nbsp;&nbsp;(<span class="searchCount">0</span>)</a></li>
                </ul>
                <div class="main">
                    <ul class="results">
                        <img class='loading' src='/images/loading.gif'/>
                    </ul>
                    <div class="pageList">
                        <a title="首页" href="javascript:;" class="first">首页</a><a title="上一页" href="javascript:;"
                            class="prev">上一页</a><input type="text" class="text currentPage" value="0">/<span
                                class="totalPage">0</span><a title="下一页" href="javascript:;" class="next">下一页</a><a
                                    title="尾页" href="javascript:;" class="last">尾页</a></div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer layout mes_footer">
        <span class="f_right">Copyright @ 2012 Savorboard Corporation, All right reserved</span>
        <p class="footer_link">
            <a href="javascript:;">特色</a><a href="javascript:;">开发应用</a><a href="javascript:;">法律声明</a><a
                href="javascript:;">招聘团队</a><a href="javascript:;">建议</a><a href="javascript:;">帮助</a></p>
    </div>
    <!--js脚步-->
    <script src="/scripts/plugin/cookie/wanerdao2.cookies.js" type="text/javascript"></script>
    <script src="/Scripts/multipleLanguage/loader.js" type="text/javascript"></script>
    <script src="/Scripts/common/wandao.js" type="text/javascript"></script>
    <script src="/Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="/scripts/common/wanerdao2.date.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/global.js"></script>
    <script src="/scripts/pop.js" type="text/javascript"></script>
    <script type="text/javascript" src="../scripts/search/search.js"></script>
    <script type="text/javascript">
        $(function () {
            //搜索
            $('#srch_info').click(function () {
                //searchStr
                if ($('#srch_str').val() && $('#srch_str').val() != $('#srch_str').attr('inputdefault')) {
                    window.open('/searchc.html?q=' + escape($('#srch_str').val()), "_self");
                } else {
                    $('#srch_str').focus();
                }
            });
        });
    </script>
</body>
</html>
