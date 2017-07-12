/**
* 朋友关注页面的相关js，页面地址/relationship/follow/relationship_friends_follow.aspx
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：朋友关注页面的相关js
*/


var pageSize = 5;
var pageCurrent = 1;
var pageTotal = 0;
var friendName = "";
var userId = 0;

$(function () {
    function getPersonalFriendsFollow(pageRefresh) {
        friendName = $(".friendName").val();
        $(".search_result ul").html("<li><image src='/images/loading12.gif'/></li>"); //loading图片
        $.ajax({
            url: "/getpersonalfriends_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getpersonalfriendsfollow',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",friendName:'" + friendName + "'}",
            error: function () {
                $(".search_result ul").html("");
            },
            success: function (data) {
                $(".search_result ul").html("");
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
                            getPersonalFriendsFollow(false);
                            pageSelect();
                        });
                    }
                    var $searchResult = $(".search_result ul");
                    $.each(data.rows, function (i, follow) {

                        var $li = $("<li/>");
                        var $dtbc = $("<div class='dTbc'/>");
                        var hideInput = "<input type='hidden' class='followId' value='" + follow.id + "'/>";

                        var image = "<div class='lMr3'><a href='/personal/personal_info.html?uid=" + follow.attention_id + "'><img src='" + follow.logo_small_path + "' alt='' /></a></div>";
                        var level = "<div class='fd_b_name'><a href='/personal/personal_info.html?uid=" + follow.attention_id + "'>" + follow.name + "</a> <i class='level'>等级 <b>" + follow.experience + "</b> 级</i></div>";

                        var $heat = $("<div class='heat'/>");
                        var followScore = "<div class='tit'>关注度：</div><div class='score'><i class='iBar'><i style='width:" + (follow.follow_score * 100) + "%;'></i><em>" + (follow.follow_score * 100) + "%</em></i></div>";
                        var activityScore = "<div class='tit'>活跃度：</div><div class='score'><i class='iBar'><i style='width:" + (follow.activity_score * 100) + "%;'></i><em>" + (follow.activity_score * 100) + "%</em></i></div>";
                        var $meta = $("<div class='rm_Meta'/>").append($heat.append(followScore).append(activityScore));

                        var cancelFollow = "<div class='flBtnDiv flBtnDivExt'>";
                        cancelFollow += "<input type='checkbox' class='vInput isEmail' id='b_5' /><label for='b_5'>邮件订阅</label> ";
                        cancelFollow += "<select class='duration'></select>更新";
                        cancelFollow += "<a href='#' class='canc_atten'>取消关注</a>";

                        var durationModels = [{ key: "每天", value: 1 }, { key: "每月", value: 2}];

                        $dtbc.append(level).append($meta);

                        $li.append(hideInput).append(image).append($dtbc).append(cancelFollow);

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

                        $searchResult.append($li);
                    });

                    $(".canc_atten").click(function () {
                        var $liFollow = $(this).parent().parent();
                        var followId = $liFollow.find(".followId").val();
                        cancelFriendsFollow(followId, $liFollow);

                    });

                    $(".search_result li").hover(function () {
                        $(this).addClass("active");
                    }, function () {
                        $(this).removeClass("active");
                    });
                } else {
                    alert(data.msg);
                }
            }
        });
    }

    function updateDuration(id, isEmail, duration) {
        $.ajax({
            url: "/cancelpersonalfriends_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'updatepersonalfriendsfollowduration',id:'" + id + "',isEmail:" + isEmail + ",emailDuration:" + duration + "}",
            error: function () {
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }

    function cancelFriendsFollow(id, $cancelFollow) {
        $.ajax({
            url: "/cancelpersonalfriends_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cancelpersonalfriendsfollow',id:'" + id + "'}",
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

    getPersonalFriendsFollow(true);

    $(".first").click(function () {
        pageCurrent = 1;
        pageSelect();
        getPersonalFriendsFollow(false);
    });
    $(".last").click(function () {
        pageCurrent = pageTotal;
        pageSelect();
        getPersonalFriendsFollow(false);
    })
    $(".prev").click(function () {
        if (pageCurrent == 1) {
            alert("当前为第一页");
        } else {
            pageCurrent--;
            pageSelect();
            getPersonalFriendsFollow(false);
        }
    });
    $(".next").click(function () {
        if (pageCurrent == pageTotal) {
            alert("当前为最后一页");
        } else {
            pageCurrent++;
            pageSelect();
            getPersonalFriendsFollow(false);
        }
    });

    $(".search").click(function () {
        pageCurrent = 1;
        getPersonalFriendsFollow(true);
    });
});

$(function () {

    var strUrl = window.location.href;
    var arrUrl = strUrl.split("/");
    var strPage = arrUrl[arrUrl.length - 1];
    $(".Fnavigation ul li a").each(function () {
        if (strPage == $(this).attr("href")) {
            $(this).addClass("cur");
            return false;
        }
    });
});