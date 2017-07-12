/**
* 活动关注页面的相关js，页面地址/relationship/follow/relationship_activity_follow.aspx
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：活动关注页面的相关js
*/
var pageSize = 5;//每页大小
var pageCurrent = 1;//当前页
var pageTotal = 0;//总页数
var activityTitle = "";//活动标题

$(function () {

    //获取个人活动关注
    function getPersonalActivityFollow(pageRefresh) {

        $("#report_list").html("<li><image src='/images/loading12.gif'/></li>"); //loading图片

        $.ajax({
            url: "/getpersonalactivity_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getpersonalactivityfollow',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",activityTitle:'" + activityTitle + "'}",
            error: function () {
                $("#report_list").html("");
            },
            success: function (data) {
                $("#report_list").html("");
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
                            getPersonalActivityFollow(false);
                            pageSelect();
                        });
                    }
                    var $reportList = $("#report_list");
                    $.each(data.rows, function (i, follow) {

                        var $li = $("<li class='report'/>");

                        var hideInput = "<input type='hidden' class='followId' value='" + follow.id + "'/>";

                        var h1 = "<h1>[" + follow.category_name + "]<a href='/activity/Activity_index.info?id=" + follow.attention_id + "'>" + follow.activity_name + "</a><font color='#cc0000'>（" + follow.join_member_nbr + "）</font></h1>";

                        var $followListCon = $("<div class='follow_list_con'/>");
                        var followListYj = "<div class='follow_list_yj'><input type='checkbox' class='isEmail' id='box18' /><label onclick='checkbox2('box18')'>邮件订阅</label><select class='duration'></select><label>更新</label><a href='#' class='cancelFollow'>取消关注</a></div>";
                        var followListJd = "<div class='follow_list_jd'><label class='ml12'>活动时间段：</label>" + follow.begin_datetime + "-" + follow.end_datetime + "<label>活动地点：</label>" + follow.address + "</div>";
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
                        cancelActivityFollow(followId, $liFollow);

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
                    alert(data.msg);
                }
            }
        });
    }

    //更新订阅邮件
    function updateDuration(id, isEmail, duration) {
        $.ajax({
            url: "/updatepersonalactivity_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'updatepersonalactivityfollowduration',id:'" + id + "',isEmail:" + isEmail + ",emailDuration:" + duration + "}",
            error: function () {
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }

    //取消关注
    function cancelActivityFollow(id, $cancelFollow) {
        $.ajax({
            url: "/cancelpersonalactivity_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cancelpersonalactivityfollow',id:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    $cancelFollow.remove();
                }
                alert(data.msg);
            }
        });
    }

    //选择页码下拉框
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

    getPersonalActivityFollow(true);

    $(".first").click(function () {
        pageCurrent = 1;
        pageSelect();
        getPersonalActivityFollow(false);
    });
    $(".last").click(function () {
        pageCurrent = pageTotal;
        pageSelect();
        getPersonalActivityFollow(false);
    })
    $(".prev").click(function () {
        if (pageCurrent <= 1) {
            alert("当前为第一页");
        } else {
            pageCurrent--;
            pageSelect();
            getPersonalActivityFollow(false);
        }
    });
    $(".next").click(function () {
        if (pageCurrent >= pageTotal) {
            alert("当前为最后一页");
        } else {
            pageCurrent++;
            pageSelect();
            getPersonalActivityFollow(false);
        }
    });

    //搜索
    $(".search").click(function () {
        pageCurrent = 1;
        activityTitle = $(".activityTitle").val();
        if (stringLimit(activityTitle, 100)) {
            getPersonalActivityFollow(true);
        }
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