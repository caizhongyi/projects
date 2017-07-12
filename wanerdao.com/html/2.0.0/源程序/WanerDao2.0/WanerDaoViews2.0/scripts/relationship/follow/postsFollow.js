/**
 * 杂烩关注页面的相关js，页面地址/relationship/follow/relationship_posts_follow.aspx
 * 
 * 作者：徐蓓
 * 时间: 2012/5/11 15:00
 * 描述：杂烩关注页面的相关js
 */
var pageSize = 5;
var pageCurrent = 1;
var pageTotal = 0;
var subject = "";
var userId = 0;

$(function () {
    getMenu(3);
    function getPersonalPostsFollow(pageRefresh) {
        subject = $(".subject").val();
        $.ajax({
            url: "/getpersonalposts_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getPersonalPostsFollow',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",subject:'" + subject + "'}",
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
                        $(".pageTop option,.pageButtom option").remove();
                        for (var i = 1; i <= pageTotal; i++) {
                            $(".pageTop,.pageButtom").append("<option value='" + i + "'>" + i + "</option>");
                        }

                        $(".pageTop,.pageButtom").change(function () {
                            pageCurrent = $(this).val();
                            getPersonalPostsFollow(false);
                            pageSelect();
                        });
                    }
                    var $reportList = $("#report_list").html("");
                    $.each(data.rows, function (i, follow) {
                        var $li = $("<li class='report'/>");

                        var hideInput = "<input type='hidden' class='followId' value='" + follow.id + "'/>";

                        var h1 = "<h1>[" + follow.category_name + "]<a href='#'>" + follow.subject + "</a></h1>";

                        var $followListCon = $("<div class='follow_list_con'/>");
                        var followListYj = "<div class='follow_list_yj'><input type='checkbox' class='isEmail' id='box18' /><label onclick='checkbox2('box18')'>邮件订阅</label><select class='duration'></select><label>更新</label><a href='#' class='cancelFollow'>取消关注</a></div>";
                        var followListJd = "<div class='follow_list_jd'><label class='ml12'>作者：</label>" + follow.name + "<label>发表时间：</label>" + follow.post_datetime + "</div>";
                        $(followListYj + followListJd).appendTo($followListCon);

                        $li.append(hideInput).append(h1).append($followListCon);

                        var durationModels = [{ key: "每天", value: 1 }, { key: "每月", value: 2}];
                        var $select = $li.find(".duration");
                        $.each(durationModels, function () {
                            $select.append("<option value='" + this.value + "'>" + this.key + "</option>");
                        });

                        if (follow.is_email) {
                            $select.find("option").each(function () {
                                if ($(this).val() == follow.email_duration) {
                                    $(this).attr("selected", true);
                                }
                            });
                        }

                        $li.find(".isEmail").attr("checked", follow.is_email.toLowerCase() == "true" ? true : false).click(function () {
                            var duration = $select.val();
                            var isEmail = $(this).attr("checked");
                            updateDuration(follow.id, isEmail, duration);
                        });

                        $reportList.append($li);
                    });

                    $(".cancelFollow").click(function () {
                        var $liFollow = $(this).parent().parent().parent();
                        var followId = $liFollow.find(".followId").val();
                        cancelPostsFollow(followId, $liFollow);

                    });

                    $("#report_list .report").each(function (i) {
                        $(this).attr('order', i);
                        $(this).mouseout(function () {
                            color = '#DFDFDF';
                            order = $(this).attr('order');
                            $("#report_list .report").each(function (j) {
                                if (order - j == 1) {
                                    $(this).css('border-bottom', '1px dashed ' + color);
                                }
                            });
                            $(this).css('border-bottom', '1px dashed ' + color);
                            $(this).css('background', '');
                            $(this).find('.follow_list_yj').hide();
                        });
                        $(this).mouseover(function () {
                            color = '#5FB0D3';
                            order = $(this).attr('order');
                            $("#report_list .report").each(function (j) {
                                if (order - j == 1) {
                                    $(this).css('border-bottom', '1px dashed ' + color);
                                }
                            });
                            $(this).css('border-bottom', '1px dashed ' + color);
                            $(this).css('background', '#EEF7FE');
                            $(this).find('.follow_list_yj').show();
                        });
                    });
                } else {
                    hint(data.msg, $("#hint"));
                }
            }
        });
    }

    function updateDuration(id, isEmail, duration) {
        $.ajax({
            url: "/updatepersonalactivity_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'updatepersonalpostfollowduration',id:'" + id + "',isEmail:" + isEmail + ",emailDuration:" + duration + "}",
            error: function () {
            },
            success: function (data) {
                hint(data.msg, $("#hint"));
            }
        });
    }

    function cancelPostsFollow(id, $cancelFollow) {
        $.ajax({
            url: "/cancelpersonalposts_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cancelpersonalpostsfollow',id:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    $cancelFollow.remove();
                }
                hint(data.msg, $("#hint"));
            }
        });
    }

    function pageSelect() {
        $(".pageTop option,.pageButtom option").removeAttr("selected");
        $(".pageTop option").each(function () {
            if (pageCurrent == parseInt($(this).val())) {
                $(this).attr("selected", "selected");
                return false;
            }
        });
        $(".pageButtom option").each(function () {
            if (pageCurrent == parseInt($(this).val())) {
                $(this).attr("selected", "selected");
                return false;
            }
        });
    }

    getPersonalPostsFollow(true);

    $(".first").click(function () {
        pageCurrent = 1;
        pageSelect();
        getPersonalPostsFollow(false);
    });
    $(".last").click(function () {
        pageCurrent = pageTotal;
        pageSelect();
        getPersonalPostsFollow(false);
    })
    $(".prev").click(function () {
        if (pageCurrent == 1) {
            alert("当前为第一页");
        } else {
            pageCurrent--;
            pageSelect();
            getPersonalPostsFollow(false);
        }
    });
    $(".next").click(function () {
        if (pageCurrent == pageTotal) {
            alert("当前为最后一页");
        } else {
            pageCurrent++;
            pageSelect();
            getPersonalPostsFollow(false);
        }
    });

    $(".search").click(function () {
        pageCurrent = 1;
        getPersonalPostsFollow(true);
    });
});
$(function () {
    function checkbox2(id) {
        if ($('#' + id).attr('checked') == true) {
            $('#' + id).attr('checked', false);
        } else {
            $('#' + id).attr('checked', true);
        }
    }

});