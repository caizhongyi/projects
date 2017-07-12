/**
* 关注本人页面的相关js，页面地址/relationship/follow/relationship_myself_follow.aspx
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：关注本人页面的相关js
*/
var pageSize = 5;
var pageCurrent = 1;
var pageTotal = 0;
var followName = "";

$(function () {
    function getPersonalMyselfFollow(pageRefresh) {
        followName = $(".followName").val();
        $("#report_list").html("<li><image src='/images/loading12.gif'/></li>"); //loading图片
        $.ajax({
            url: "/getpersonalmyself_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getPersonalmyselffollow',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",followName:'" + followName + "'}",
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
                            getPersonalMyselfFollow(false);
                            pageSelect();
                        });
                    }
                    var $reportList = $("#report_list");
                    $.each(data.rows, function (i, follow) {

                        var $li = $("<li class='report'/>");

                        var hideInput = "<input type='hidden' class='followId' value='" + follow.id + "'/>";

                        var image = "<a href='/personal/personal_info.html?uid=" + follow.user_id + "'><img src='" + follow.logo_small_path + "'></img></a>";

                        var h1 = "<h1><a href='/personal/personal_info.html?uid=" + follow.user_id + "' class='mr25'> " + follow.name + "</a>等级 <font color='#CC0000'><strong>" + follow.experience + "</strong></font> 级</h1>";

                        var $followListCon = $("<div class='follow_list_con'/>");

                        var $followListYj = $("<div class='follow_list_yj'></div>");
                        var $followFriend = $("<a href='javascript:void(0);' class='bg03 followFriend'></a>").click(function () {
                            createFollow(follow.user_id);
                        });
                        var $refuseFollow = $("<a href='javascript:void(0);' class='bg02 refuseFollow'></a>").click(function () {
                            cancelMyselfFollow(follow.id, $(this).parent().parent().parent());
                        });
                        $followListYj.append($followFriend).append($refuseFollow);
                        var followListJd = "<div class='follow_list_jd'><label>关注度：</label><span><i style='width:" + (follow.follow_score * 100) + "%;'>" + (follow.follow_score * 100) + "%</i></span></div>";
                        followListJd += "<div class='follow_list_jd'><label>活跃度：</label><span><i style='width:" + (follow.activity_score * 100) + "%;'>" + (follow.activity_score * 100) + "%</i></span></div>";
                        $followListCon.append($followListYj).append(followListJd);

                        $li.append(hideInput).append(image).append(h1).append($followListCon);
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
    function createFollow(attentionId) {
        $.ajax({
            url: "/cancelpersonalmyself_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'createpersonalmyselffollow',attentionId:'" + attentionId + "'}",
            error: function () {
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }
    function cancelMyselfFollow(id, $cancelFollow) {
        $.ajax({
            url: "/cancelpersonalmyself_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cancelpersonalmyselffollow',id:'" + id + "'}",
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

    getPersonalMyselfFollow(true);

    $(".first").click(function () {
        pageCurrent = 1;
        pageSelect();
        getPersonalMyselfFollow(false);
    });
    $(".last").click(function () {
        pageCurrent = pageTotal;
        pageSelect();
        getPersonalMyselfFollow(false);
    })
    $(".prev").click(function () {
        if (pageCurrent == 1) {
            alert("当前为第一页");
        } else {
            pageCurrent--;
            pageSelect();
            getPersonalMyselfFollow(false);
        }
    });
    $(".next").click(function () {
        if (pageCurrent == pageTotal) {
            alert("当前为最后一页");
        } else {
            pageCurrent++;
            pageSelect();
            getPersonalMyselfFollow(false);
        }
    });

    $(".search").click(function () {
        pageCurrent = 1;
        getPersonalMyselfFollow(true);
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