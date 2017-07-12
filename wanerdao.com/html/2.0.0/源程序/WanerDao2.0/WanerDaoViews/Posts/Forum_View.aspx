<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Forum_View.aspx.cs" Inherits="Posts_forum_view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
    <link href="/style/layout.css" rel="stylesheet" type="text/css" />
    <link href="/style/nav_info.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="/Scripts/common/effect.js"></script>
    <script type="text/javascript">
        function getParam(paramName) {
            var paramValue = "";
            var isFound = false;
            if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
                var arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
                var i = 0;
                while (i < arrSource.length && !isFound) {
                    if (arrSource[i].indexOf("=") > 0) {
                        if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                            paramValue = arrSource[i].split("=")[1];
                            isFound = true;
                        }
                    }
                    i++;
                }
            }
            return paramValue;
        }
        
        function getBytesLength(str) {
            return str.replace(/[^\u0000-\u007f]/g, '1').length;
        }
        function stringToDateTime(postdate) {
            var second = 1000;
            var minutes = second * 60;
            var hours = minutes * 60;
            var days = hours * 24;
            var months = days * 30;
            var twomonths = days * 365;
            var myDate = new Date(Date.parse(postdate));
            if (isNaN(myDate)) {
                myDate = new Date(postdate.replace(/-/g, "/"));
            }
            var nowtime = new Date();
            var longtime = nowtime.getTime() - myDate.getTime();
            var showtime = 0;
            if (longtime > months * 2) {
                return postdate;
            }
            else if (longtime > months) {
                return "1个月前";
            }
            else if (longtime > days * 7) {
                return ("1周前");
            }
            else if (longtime > days) {
                return (Math.floor(longtime / days) + "天前");
            }
            else if (longtime > hours) {
                return (Math.floor(longtime / hours) + "小时前");
            }
            else if (longtime > minutes) {
                return (Math.floor(longtime / minutes) + "分钟前");
            }
            else if (longtime > second) {
                return (Math.floor(longtime / second) + "秒前");
            } else {
                return (longtime + " error ");
            }
        }
    </script>
    <script type="text/javascript">
        var winScreenWidth = window.screen.width;
        if (winScreenWidth > 1024) {
            document.writeln('<style>');
            document.writeln('.jz{padding:0px 2px;}');
            document.writeln('</style>');
        }
    </script>
    <script type="text/javascript">

        var postId = getParam("id");

        $(function () {
            function getPostNextAndPrev(postDateTime) {
                $.ajax({
                    url: "/getpostprev_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostprev',postDateTime:'" + postDateTime + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        var $prevPost = $(".prevPost");
                        var $prevPostImg = $(".prevPostImg");
                        if (data.rows.length > 0) {
                            var post = data.rows[0];
                            var url = "forum_view.aspx?id=" + post.id;
                            $prevPost.attr("href", url);
                            $prevPost.text(post.subject);
                            $prevPostImg.attr("href", url);
                        } else {
                            $prevPost.removeAttr("href");
                            $prevPost.text("无");
                            $prevPostImg.removeAttr("href");
                        }
                    }
                });
                $.ajax({
                    url: "/getpostnext_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostnext',postDateTime:'" + postDateTime + "'}",
                    error: function () {
                    },
                    success: function (data) {

                        var $nextPost = $(".nextPost");
                        var $nextPostImg = $(".nextPostImg");
                        if (data.rows.length > 0) {
                            var post = data.rows[0];
                            var url = "forum_view.aspx?id=" + post.id;
                            $nextPost.attr("href", "forum_view.aspx?id=" + post.id);
                            $nextPost.text(post.subject);
                            $nextPostImg.attr("href", url);
                        } else {
                            $nextPost.removeAttr("href");
                            $nextPost.text("无");
                            $nextPostImg.removeAttr("href");
                        }
                    }
                });
            }

            function getPostView(id) {
                $.ajax({
                    url: "/getpostsbyid_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostsbyid',id:'" + postId + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            var post = data.rows[0];
                            $(".subject").text(post.subject);
                            $(".categoryName").text(post.category_name);
                            $(".poster").text(post.name);
                            $(".postTime").text(post.post_datetime);
                            $(".content").text(post.content);
                            $(".counter").text(post.counter);
                            getPostCommentCount(postId, $(".postCommentCount"));
                            $(".postComment").click(function () {
                                if ($(".log_view_box").css("display") == "none") {
                                    $(".log_view_box").show();
                                    getPostComment(1, 5, postId, $(".log_view_list ul"), $(".postCommentCount"));
                                } else {
                                    $(".log_view_box").hide();
                                }
                            });

                            //杂烩回复
                            $("input.comment").click(function () {
                                var content = $(".commentContent").val();
                                var lenLimit = 45;
                                if (getBytesLength(content) > lenLimit) {
                                    alert("回复内容不能大于45个字");
                                    return false;
                                }
                                $.ajax({
                                    url: "/commentpost_posts.axd",
                                    type: "POST",
                                    dataType: "json",
                                    cache: false,
                                    data: "{opertype:'commentpost',content:'" + content + "',newsId:'" + post.id + "',followId:'0'}",
                                    error: function () {
                                    },
                                    success: function (data) {
                                        alert(data.msg);
                                        getPostComment(1, 5, post.id, $(".log_view_list ul"), $(".postCommentCount"));
                                    }
                                });

                            });

                            $(".followPost").click(function () {
                                $.ajax({
                                    url: "/createpersonalposts_follow.axd",
                                    type: "POST",
                                    dataType: "json",
                                    cache: false,
                                    data: "{opertype:'createpersonalpostsfollow',attentionId:'" + post.id + "'}",
                                    error: function () {
                                    },
                                    success: function (data) {
                                        alert(data.msg);
                                    }
                                });
                            });
                            getPostNextAndPrev(post.post_datetime);

                        }
                    }
                });
            }

            function getPostComment(pageCurrent, pageSize, newsId, $comment, $count) {
                $.ajax({
                    url: "/getpostcommentsbynewsid_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostcommentsbynewsid',newsId:'" + newsId + "',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + "}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $comment.html("");
                            $(data.rows).each(function (i, comment) {
                                var $commentLi = $("<li/>");
                                var image = "<img src='" + comment.logo_small_path + "'/>";
                                var content = "<div class='log_view_pl'>" + comment.content + "</div>";
                                var opt = "<div class='log_view_data'>" + stringToDateTime(comment.comments_date) + "</div>";
                                $commentLi.append(image).append(content).append(opt);
                                $comment.append($commentLi);
                            });
                            getPostCommentCount(newsId, $count);
                        }
                    }
                });
            }

            function getPostCommentCount(postId, $count) {
                $.ajax({
                    url: "/getpostcommentcountbynewsid_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostcommentcountbynewsid',newsId:'" + postId + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $count.text(data.rows[0].count);
                        }
                    }
                });
            }

            getPostView(postId);

            $(".viewMore").click(function () {
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="mCon pb50">
        <div class="log_viewinfo pt12">
            <div class="log_view_top tent15 clearfix">
                <span class="mr14"><a href="#" class="nextPost">一次为说走就走的旅行</a><a href="#" class="nextPostImg"><img src="/images/list/groupbg_ri.jpg"
                    class="ml12" /></a></span> <a href="#" class="prevPostImg">
                        <img src="/images/list/groupbg_le.jpg" class="mr14" /></a><a href="#" class="prevPost">一次说走就走的旅行</a>
            </div>
            <div class="log_view_con01">
                <h1>
                    <span class="postTime"></span>[<a href="javascript:void(0);" class='categoryName'></a>]
                    <a href="javascript:void(0);" class="subject"></a><i>(<i class="counter"></i>)</i></h1>
                <div class="log_view_con_tb">
                    <span><a href="javascript:void(0);" class="followPost">
                        <img src="/images/list/groupbg41.jpg" /></a><a href="#"><img src="/images/list/groupbg42.jpg" /></a></span>作者：<a class="poster"></a>
                </div>
            </div>
            <div class="log_view_page">
                <div class="content">
                </div>
                <span><a href="javascript:void(0);" class="postComment">评论（<i class="postCommentCount">0</i>）</a></span>
            </div>
            <div class="log_view_box" style="display: none;">
                <div class="log_view_tabT">
                </div>
                <div class="log_view_tabC">
                    <div class="log_view_hf">
                        <input name="" type="text" class="inp06 commentContent"><input name="" type="button"
                            class="inp07 comment" value="回复"><input name="" type="button" class="inp08" value="取消">
                    </div>
                    <div class="log_view_list clearfix">
                        <ul></ul>
                    </div>
                    <div class="log_view_bin clearfix">
                        <a href="javascript:void(0);" class="log_viewbg09">收起</a> <a href="#" class="log_viewbg08 viewMore">
                            更多回复</a>
                    </div>
                </div>
                <div class="log_view_tabB">
                </div>
            </div>
            <div class="log_view_top mt30 te1nt15 clearfix">
                <span class="mr14"><a href="#" class="nextPost">一次为说走就走的旅行</a><a href="#" class="nextPostImg"><img src="/images/list/groupbg_ri.jpg"
                    class="ml12" /></a></span> <a href="#" class="prevPostImg">
                        <img src="/images/list/groupbg_le.jpg" class="mr14" /></a><a href="#" class="prevPost">一次说走就走的旅行</a>
            </div>
        </div>
    </div>
</asp:Content>
