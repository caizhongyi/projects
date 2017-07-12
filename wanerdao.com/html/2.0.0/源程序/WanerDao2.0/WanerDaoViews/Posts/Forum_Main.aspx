<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true"
    CodeFile="Forum_Main.aspx.cs" Inherits="Posts_forum_main" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <!--[if IE 6]><script>document.execCommand("BackgroundImageCache", false, true)</script><![endif]-->
    <link href="/style/layout.css" rel="stylesheet" type="text/css" />
    <link href="/style/nav_info.css" rel="stylesheet" type="text/css" />
    <%--    <style type="text/css">
        /* the overlayed element */
        .apple_overlay
        {
            background-image: url(/images/overlay/white.png);
            display: none;
            width: 590px; /* some padding to layout nested elements nicely  */
            height: 450px;
            padding: 35px; /* a little styling */
            font-size: 11px;
        }
        
        /* default close button positioned on upper right corner */
        .apple_overlay .close
        {
            background-image: url(/images/overlay/close.png);
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
            height: 35px;
            width: 35px;
        }
    </style>--%>
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="/Scripts/common/effect.js"></script>
    <%--<script type="text/javascript" src="/scripts/jquery.tools.min.js"></script>--%>
    <script type="text/javascript">
        var pageSize = 2;
        var pageCurrent = 1;
        var pageTotal = 0;
        var now;
        var content = "";
        var subject = "";
        var postListTypeEnum = { detail: 0, simple: 1 };
        var currListType = postListTypeEnum.detail;
        var listTypeName = [];
        listTypeName[postListTypeEnum.detail] = "详细多行模式";
        listTypeName[postListTypeEnum.simple] = "简洁单行模式";


        var category = { categoryName: "", categoryId: "" };
        var categories = [category];
        var categoryIds = "";
    </script>
    <script type="text/javascript">

        //获取字符串长度，中英文均为1
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

        function subPoints(str, sub_length) {
            var temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓
            var temp2 = temp1.substring(0, sub_length);
            //找出有多少个*
            var x_length = temp2.split("\*").length - 1;
            var hanzi_num = x_length / 2;
            sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度
            var res = str.substring(0, sub_length);
            if (sub_length < str.length) {
                var end = res + "……";
            } else {
                var end = res;
            }
            return end;
        }
    </script>
    <script type="text/javascript">
        $(function () {
            function checkbox2(id) {
                if ($('#' + id).attr('checked') == true) {
                    $('#' + id).attr('checked', false);
                } else {
                    $('#' + id).attr('checked', true);
                }
            }
        });

    </script>
    <script type="text/javascript">
        $(function () {
            function initPostCategory() {
                $.ajax({
                    url: "/getallpostcategory_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getalltopiccategory'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $("select.postCategory option").remove();

                            var $filterTbody = $("#filterDiv table tbody");
                            var tdCount = 5;
                            var totalCount = data.total;
                            var trCount = totalCount % tdCount == 0 ? parseInt(totalCount / tdCount) : parseInt(totalCount / tdCount) + 1;
                            var j = 1;
                            var $tr = $("<tr/>");
                            $(data.rows).each(function (i, data) {

                                //category = { categoryName: data.category_name, categoryId: data.id };
                                //categories.push(category);
                                var td = "<td>" + data.category_name + "<input type='checkbox' value='" + data.id + "'/></td>";
                                $tr.append(td);
                                if (j < trCount) {
                                    if (i == (j * tdCount - 1)) {
                                        $filterTbody.append($tr);
                                        $tr = $("<tr/>");
                                        j++;
                                    }
                                } else if (j == trCount) {
                                    if (i == totalCount - 1) {
                                        $filterTbody.append($tr);
                                    }
                                }


                                $("select.postCategory").append("<option value='" + data.id + "'>" + data.category_name + "</option>");
                            });
                            $("select.postCategory").prepend("<option value='0' selected='selected'>请选择</option>");

                            var $checkBoxes = $filterTbody.find(":checkbox");

                            $(".checkAll").click(function () {
                                $checkBoxes.attr("checked", $(this).attr("checked"));
                                $(".forumtab_listT span a").remove();
                                if ($(this).attr("checked")) {
                                    $checkBoxes.each(function () {
                                        $(".forumtab_listT span").append("<a href='javascript:void(0)'><input type='hidden' value='" + $(this).val() + "'/><img src='/images/list/groupbg34.jpg'/>" + $(this).parent().text() + "</a>");
                                        $(".forumtab_listT span a img").click(function () {
                                            $(this).parent().remove();
                                            var $spanA = $(this);
                                            $checkBoxes.each(function () {
                                                if ($(this).val() == $spanA.parent().find(":hidden").val()) {
                                                    $(this).attr("checked", false);
                                                }
                                            });
                                        });
                                    });
                                }
                            });

                            $checkBoxes.click(function () {
                                if ($(this).attr("checked")) {
                                    $(".forumtab_listT span").append("<a href='javascript:void(0)'><input type='hidden' value='" + $(this).val() + "'/><img src='/images/list/groupbg34.jpg'/>" + $(this).parent().text() + "</a>");
                                    $(".forumtab_listT span a img").click(function () {
                                        $(this).parent().remove();
                                        var $spanA = $(this);
                                        $checkBoxes.each(function () {
                                            if ($(this).val() == $spanA.parent().find(":hidden").val()) {
                                                $(this).attr("checked", false);
                                            }
                                        });
                                    });
                                } else {
                                    var $thisCheck = $(this);
                                    $(".forumtab_listT span a").each(function () {
                                        if ($thisCheck.val() == $(this).find(":hidden").val()) {
                                            $(this).remove();
                                        }
                                    });
                                }
                            });


                        }
                    }
                });
            }

            function selectTopicCategory(tcId) {
                $("select.postCategory option").removeAttr("selected");
                $("select.postCategory option").each(function () {
                    if ($(this).val() == tcId) {
                        $(this).attr("selected", "selected");
                    }
                });
            }

            function createPostDraft(isSystem) {
                var title = $(".subject").val();
                var content = $(".content").val();
                if (title == "") {
                    return false;
                }
                if (content == "") {
                    return false;
                }
                $.ajax({
                    url: "/createdraft_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'createpostdraft',title:'" + title + "',content:'" + content + "',isSystem:'" + isSystem + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result) {
                            $(".updateTime").text(data.updateTime);
                            $(".saveDraftTip").show();
                        }
                    }
                });
            }

            initPostCategory();
            //每5分钟更新一次杂烩草稿
            setInterval(function () {
                createPostDraft(true);
            }, 1000 * 60 * 5);


            $(".submit").click(function () {

                var subject = $(".subject").val();
                var content = $(".content").val();
                var tcId = $("select.postCategory").val();
                var postName = "";
                //var postId = userId;
                var IsAnonymity = false;

                if (tcId == "0") {
                    alert("请选择杂烩分类！");
                    return false;
                }

                if (subject == "") {
                    alert("杂烩标题不能为空！");
                    return false;
                }

                if (content == "") {
                    alert("杂烩内容不能为空！");
                    return false;
                }

                $.ajax({
                    url: "/create_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'createpost',category_id:'" + tcId + "',subject:'" + subject + "',content:'" + content + "',is_anonymity:" + IsAnonymity + ",post_name:'" + postName + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        alert(data.msg);
                    }
                });

            });

            $(".clean").click(function () {
                selectTopicCategory("0");
                $(".subject").val("");
                $(".content").val("");
            });

            $(".cancel").click(function () {
                $(".forumtab_ht").hide();
            });

            $(".submitPost").click(function () {
                $(".forumtab_ht").show();
            });
        });
    </script>
    <script type="text/javascript">
        $(function () {

            function getPostsSimpleList(pageRefresh, isAppend) {
                $.ajax({
                    url: "/getdetaillist_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getposts',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",content:'" + content + "',subject:'" + subject + "',categoryIds:'" + categoryIds + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            if (pageRefresh) {
                                if (data.total % pageSize == 0) {
                                    pageTotal = parseInt(data.total / pageSize);
                                } else {
                                    pageTotal = parseInt(data.total / pageSize) + 1;
                                }
                                $(".pageTotal").text(pageTotal);
                            }
                            $(".pageCurrent").text(pageCurrent);
                            var $ul;
                            if (isAppend) {
                                $ul = $("#report_list");
                            } else {
                                $ul = $("#report_list").html("");
                            }
                            $(".post_list").removeClass("listB_list").remove("listB_list01").addClass("listB_list01");
                            $(data.rows).each(function (i, post) {
                                var $li = $("<li class='report'/>");
                                var $span = $("<span><i class='inp_hf'><a href='javascript:void(0);' class='followPost'><img src='/images/list/groupbg41.jpg' /></a><a href='javascript:void(0);'><img src='/images/list/groupbg42.jpg' /></a></i><a href='javascript:void(0);'>回复(<c class='postCommentCount'></c>)</a><a href='javascript:void(0);'>回帖</a><a href='javascript:void(0);' class='viewPost'>阅读</a> <s>" + post.post_datetime + "</s></span>");

                                var main = "<i><a href='javascript:void(0);'>" + post.name + "</a></i><img class='isRead' src='/images/list/groupbg39.jpg' /> [<a href='javascript:void(0);'>" + post.category_name + "</a>] <a href='javascript:void(0);' class='viewPost'>" + post.subject + "</a><s>(" + post.counter + ")</s>";

                                $li.append($span).append(main);

                                if (post.is_read) {
                                    $li.find(".isRead").attr("src", "/images/list/groupbg40.jpg");
                                }

                                getPostCommentCount(post.id, $li.find(".postCommentCount"));

                                $li.find(".followPost").click(function () {
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
                                //查看全文
                                $li.find(".viewPost").click(function () {
                                    if (!post.is_read) {
                                        $.ajax({
                                            url: "/readpost_posts.axd",
                                            type: "POST",
                                            dataType: "json",
                                            cache: false,
                                            data: "{opertype:'readpost',postId:'" + post.id + "'}",
                                            error: function () {
                                            },
                                            success: function (data) {
                                                $li.find(".isRead").attr("src", "/images/list/groupbg40.jpg");
                                            }
                                        });
                                    }
                                    window.open("post_detail.html");
                                });

                                $ul.append($li);
                            });

                            $("#report_list .report").each(function (i) {
                                $(this).attr('order', i);
                                $(this).mouseout(function () {
                                    color = '#DFDFDF';
                                    order = $(this).attr('order');
                                    $("#report_list .report").each(
				                        function (j) {
				                            if (order - j == 1) {
				                                $(this).css('border-bottom', '1px dashed ' + color);
				                            }
				                        });
                                    $(this).css('border-bottom', '1px dashed ' + color);
                                    $(this).css('background', '');
                                    $(this).find('.inp_hf').hide();
                                });

                                $(this).mouseover(
		                        function () {
		                            color = '#5FB0D3';
		                            order = $(this).attr('order');
		                            $("#report_list .report").each(
				                        function (j) {
				                            if (order - j == 1) {
				                                $(this).css('border-bottom', '1px dashed ' + color);
				                            }
				                        });
		                            $(this).css('border-bottom', '1px dashed ' + color);
		                            $(this).css('background', '#EEF7FE');
		                            $(this).find('.inp_hf').show();
		                        });
                            });
                        }
                    }
                });
            }

            function getPostsDetailList(pageRefresh, isAppend) {
                $.ajax({
                    url: "/getdetaillist_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getposts',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",content:'" + content + "',subject:'" + subject + "',categoryIds:'" + categoryIds + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            if (pageRefresh) {
                                if (data.total % pageSize == 0) {
                                    pageTotal = parseInt(data.total / pageSize);
                                } else {
                                    pageTotal = parseInt(data.total / pageSize) + 1;
                                }
                                $(".pageTotal").text(pageTotal);
                            }
                            $(".pageCurrent").text(pageCurrent);
                            var $ul;
                            if (isAppend) {
                                $ul = $("#report_list");
                            } else {
                                $ul = $("#report_list").html("");
                            }
                            $(".post_list").removeClass("listB_list01").remove("listB_list").addClass("listB_list");
                            $(data.rows).each(function (i, post) {

                                var $li = $("<li class='report'/>");

                                var image = "<div class='handle_view_tx'><img src='" + post.logo_small_path + "'/><p><a href='#'>" + post.name + "</a></p></div>";

                                var $title = $("<div class='handle_view_pl'/>");
                                $title.append("<span>" + post.post_datetime + "</span><img class='isRead' src='/images/list/groupbg39.jpg' /> [<a href='#'>" + post.category_name + "</a>] <a href='javascript:void(0);' class='viewPost'>" + post.subject + "</a><font color='#959595' class='f12'>(" + post.counter + ")</font>");

                                if (post.is_read) {
                                    $title.find(".isRead").attr("src", "/images/list/groupbg40.jpg");
                                }

                                var con = "<div class='handle_view_con'>" + subPoints(post.content, 260) + "</div>";

                                var $viewData = $("<div class='handle_view_data'><span class='inp_hf'><a class='followPost' href='javascript:void(0);'><img src='/images/list/groupbg41.jpg' /></a><a href='#'><img src='/images/list/groupbg42.jpg' /></a></span><a href='javascript:void(0);' class='cli_on postComment'>显示(<i class='postCommentCount'>0</i>)回复</a><a href='javascript:void(0)' class='commentPost'>我要回帖</a><a href='javascript:void(0)' class='viewPost'>查看全文</a></div>");

                                //杂烩共享
                                var $tabT = $("<div class='log_view_box' style='display:none'/>");

                                $tabT.append("<div class='log_view_tabT'></div>");

                                var $tabC = $("<div class='log_view_tabC'/>");

                                $tabC.append("<div class='log_view_hf'><input name='' type='text' class='inp06 commentContent'><input name='' type='button' class='inp07 comment' value='回复'><input name='' type='button' class='inp08 commentCancel' value='取消'></div>");

                                $tabC.append("<div class='log_view_list clearfix'><ul/></div>");

                                $tabT.append($tabC).append("<div class='log_view_tabB'></div>");

                                //杂烩回复
                                $tabC.find("input.comment").click(function () {
                                    var content = $tabC.find(".commentContent").val();
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
                                            var $viewList = $tabC.find(".log_view_list");
                                            if ($viewList.css("display") != "none") {
                                                getPostComment(1, 5, post.id, $viewList.find("ul"), $viewData.find(".postCommentCount"));
                                            }
                                        }
                                    });

                                });

                                //回复取消
                                $tabC.find("input.commentCancel").click(function () {

                                });
                                $viewData.find("a.commentPost").click(function () {
                                    var $li = $(this).parent().parent();
                                    var $view = $li.find(".log_view_box");
                                    var $viewList = $view.find(".log_view_list");
                                    var $viewHF = $view.find(".log_view_hf");
                                    if ($view.css("display") == "none") {
                                        $view.show();
                                        $viewHF.show();
                                        $viewList.hide();
                                    } else {
                                        $view.hide();
                                    }

                                });
                                $viewData.find(".followPost").click(function () {
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
                                $viewData.find(".postComment").click(function () {
                                    var $view = $li.find(".log_view_box");
                                    var $viewList = $view.find(".log_view_list");
                                    var $viewHF = $view.find(".log_view_hf");
                                    $viewHF.hide();
                                    if ($view.css("display") == "none") {
                                        $view.show();

                                        var pageSize = 5;
                                        var pageCurrent = 1;

                                        getPostComment(pageCurrent, pageSize, post.id, $tabC.find("ul"), $viewData.find(".postCommentCount"));

                                        $view.show();
                                    } else {
                                        $view.hide();
                                    }

                                });
                                getPostCommentCount(post.id, $viewData.find(".postCommentCount"));
                                $li.append(image).append($title).append(con).append($viewData);
                                $li.append($tabT);

                                //阅读杂烩
                                $li.find(".viewPost").click(function () {
                                    if (!post.is_read) {
                                        $.ajax({
                                            url: "/readpost_posts.axd",
                                            type: "POST",
                                            dataType: "json",
                                            cache: false,
                                            data: "{opertype:'readpost',postId:'" + post.id + "'}",
                                            error: function () {
                                            },
                                            success: function (data) {
                                                $title.find(".isRead").attr("src", "/images/list/groupbg40.jpg");
                                            }
                                        });
                                    }
                                    window.open("post_detail.html?id=" + post.id);
                                });
                                $ul.append($li);

                            });

                            $("#report_list .report").each(function (i) {
                                $(this).attr('order', i);
                                $(this).mouseout(function () {
                                    color = '#DFDFDF';
                                    order = $(this).attr('order');
                                    $("#report_list .report").each(
				                        function (j) {
				                            if (order - j == 1) {
				                                $(this).css('border-bottom', '1px dashed ' + color);
				                            }
				                        });
                                    $(this).css('border-bottom', '1px dashed ' + color);
                                    $(this).css('background', '');
                                    $(this).find('.inp_hf').hide();
                                });

                                $(this).mouseover(
		                        function () {
		                            color = '#5FB0D3';
		                            order = $(this).attr('order');
		                            $("#report_list .report").each(
				                        function (j) {
				                            if (order - j == 1) {
				                                $(this).css('border-bottom', '1px dashed ' + color);
				                            }
				                        });
		                            $(this).css('border-bottom', '1px dashed ' + color);
		                            $(this).css('background', '#EEF7FE');
		                            $(this).find('.inp_hf').show();
		                        });
                            });
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
                                var opt = "<div class='log_view_data'><span><a href='#'>删除</a><a href='#'>回复</a></span>" + stringToDateTime(comment.comments_date) + "</div>";
                                $commentLi.append(image).append(content).append(opt);
                                $comment.append($commentLi);
                            });
                            getPostCommentCount(newsId, $count);
                        }
                    }
                });
            }

            function getPostAllCount() {
                $.ajax({
                    url: "/getpostallcount_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostallcount'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $(".postAllCount").text(data.rows[0].count);
                        }
                    }
                });
            }

            function getPostTodayCount() {
                $.ajax({
                    url: "/getposttodaycount_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getposttodaycount'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $(".postTodayCount").text(data.rows[0].count);
                        }
                    }
                });
            }

            function getServerTime(flag) {
                $.ajax({
                    url: "/getservertime_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getservertime'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            now = data.now;
                            if (flag) {
                                setInterval(function () {
                                    getPostCountSinceTime(now);
                                }, 1000 * 5);
                            }
                        }
                    }
                });
            }

            function getPostCountSinceTime(time) {
                $.ajax({
                    url: "/getpostcountsincetime_posts.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getpostcountsincetime',time:'" + time + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result == "True") {
                            $(".postNewCount").text(data.rows[0].count);
                        }
                    }
                });
            }

            function getPostList(refresh, isAppend) {
                switch (currListType) {
                    case postListTypeEnum.detail:
                        getPostsDetailList(refresh, isAppend);
                        break;
                    case postListTypeEnum.simple:
                        getPostsSimpleList(refresh, isAppend);
                        break;
                    default:
                        getPostsDetailList(refresh, isAppend);
                        break;
                }
            }

            $(".listType").click(function () {
                if (currListType == postListTypeEnum.simple) {
                    currListType = postListTypeEnum.detail;
                } else {
                    currListType = postListTypeEnum.simple;
                }
                $(".listType").text(listTypeName[currListType]);
                getPostList(true);
            });
            $(".viewMore").click(function () {
                if (pageCurrent < pageTotal) {
                    pageCurrent++;
                    getPostList(true, true);
                }
            });
            getServerTime(true);
            getPostAllCount();
            getPostTodayCount();
            getPostList(true);
            $(".first").click(function () {
                pageCurrent = 1;
                getPostList(false);
            });
            $(".last").click(function () {
                pageCurrent = pageTotal;
                getPostList(false);
            })
            $(".prev").click(function () {
                if (pageCurrent == 1) {
                    alert("当前为第一页");
                } else {
                    pageCurrent--;
                    getPostList(false);
                }
            });
            $(".next").click(function () {
                if (pageCurrent == pageTotal) {
                    alert("当前为最后一页");
                } else {
                    pageCurrent++;
                    getPostList(false);
                }
            });

            $(".refresh").click(function () {
                pageCurrent = 1;
                getPostList(true);
                $(".postNewCount").text(0);
                getServerTime(false);
            });

            $(".search").click(function () {
                var searchContent = $(".searchContent").val();
                subject = content = searchContent;
                pageCurrent = 1;
                categoryIds = "";
                $(".forumtab_listT span a :hidden").each(function () {
                    categoryIds += $(this).val() + ",";
                });
                categoryIds = categoryIds.substring(0, categoryIds.length - 1);
                getPostList(true);
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="mCon pr49 pb50">
        <div class="forumtab clearfix">
            <span>
                <input type="text" class="inp37 searchContent" />
                <input type="button" class="inp38 search" /></span>
            <input type="button" class="inp39 submitPost" />
        </div>
        <div class="forumtab_ht" style="display: none">
            <ul>
                <li>
                    <select name="select" class="postCategory">
                    </select>
                    <input type="text" class="inp37 w450 subject" /><span class="saveDraftTip" style="display: none"><a
                        href="javascript:void(0);" onclick="$(this).parent().hide();"></a>内容临时保存于：<i class="updateTime">2011/12/12
                            00:37:32</i></span></li>
                <li>
                    <textarea name="input" class="content"></textarea></li>
                <li class="log_gx clearfix"><a href="javascript:void(0);" class="gxbox m0">共享到其它地方</a>
                    <dl class="log_view_box" style="display: none">
                        <dt><a href="javascript:void(0);" class="shgx">收回共享</a></dt>
                        <dd>
                            <input name="" type="checkbox" value="" class="inp04" id="box7">
                            <label onclick="checkbox2('box7')">
                                共享到日志</label>
                            <select name="select">
                                <option value="1">话题分类</option>
                                <option value="2">帖子分类</option>
                                <option value="3">辩论分类</option>
                            </select>
                            <input name="" type="text" class="inp05" value="足球">
                        </dd>
                        <dd>
                            <input name="" type="checkbox" value="" class="inp04" id="box8">
                            <label onclick="checkbox2('box8')">
                                共享到日志</label>
                            <select name="select">
                                <option value="1">话题分类</option>
                                <option value="2">帖子分类</option>
                                <option value="3">辩论分类</option>
                            </select>
                            <input name="" type="text" class="inp05" value="洪兴俱乐部">
                        </dd>
                        <dd>
                            <input name="" type="checkbox" value="" class="inp04" id="box9">
                            <label onclick="checkbox2('box9')">
                                共享到日志</label>
                            <select name="select">
                                <option value="1">话题分类</option>
                                <option value="2">帖子分类</option>
                                <option value="3">辩论分类</option>
                            </select>
                            <input name="" type="text" class="inp05" value="足球">
                        </dd>
                    </dl>
                </li>
                <li><a href="#" class="inp40 submit">发 布</a><a href="#" class="inp41 clean">清 空</a><a
                    href="#" class="inp42 cancel">取 消</a> </li>
            </ul>
        </div>
        <div class="forumtab_listT">
            <input type="text" class="inp36 filter" rel="#filterDiv" value="过滤器" /><span></span>
            <div id="filterDiv" style="z-index: 999">
                <table>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <input type="checkbox" class="checkAll" />
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                                <input type="button" value="关闭" />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="forumtab_listB">
            <div class="listB_page">
                <div class="alb_nav">
                    <span class="first"><a href="javascript:void(0)">首页</a></span><span class="prev"><a
                        href="javascript:void(0)">上一页</a></span><span><i class="pageCurrent">01</i>/<i class="pageTotal">20</i></span><span
                            class="next"><a href="javascript:void(0)">下一页</a></span><span class="last"><a href="javascript:void(0)">末页</a></span>
                </div>
                <span class="jjlist"><a href="javascript:void(0)" class="listType">简洁单列模式</a></span>
                <div class="listB_fpage">
                    <img src="/images/list/groupbg35.jpg" /><a href="#">今日(<span class="postTodayCount">0</span>)</a><img
                        src="/images/list/groupbg36.jpg" /><a href="#">全部(<span class="postAllCount">0</span>)</a>
                    <label>
                        已有(<span class="postNewCount">0</span>)条新内容<a href="javascript:void(0);" class="refresh"><img
                            src="/images/list/groupbg37.jpg" /></a></label>
                </div>
            </div>
            <div class="listB_list post_list">
                <ul id="report_list">
                </ul>
            </div>
            <div class="clearfix">
                <div class="alb_nav mt10">
                    <span><a href="#" class="viewMore">显示更多</a></span><span class="first"><a href="#">首页</a></span><span
                        class="prev"><a href="#">上一页</a></span><span><i class="pageCurrent">01</i>/<i class="pageTotal">20</i></span><span
                            class="next"><a href="#">下一页</a></span><span class="last"><a href="#">末页</a></span></div>
            </div>
        </div>
    </div>
</asp:Content>
