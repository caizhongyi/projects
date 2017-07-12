/**
* 圈子关注页面的相关js，页面地址/relationship/follow/relationship_group_follow.aspx
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：圈子关注页面的相关js
*/
var pageSize = 5; //每页大小
var pageCurrent = 1; //当前页
var pageTotal = 0; //总页数
var groupName = ""; //圈子名称

$(function () {
    //获取个人圈子关注
    function getPersonalGroupFollow(pageRefresh) {
        $("#report_list").html("<li><image src='/images/loading12.gif'/></li>"); //loading图片
        $.ajax({
            url: "/getpersonalgroup_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getpersonalgroupfollow',pageSize:" + pageSize + ",pageCurrent:" + pageCurrent + ",groupName:'" + groupName + "'}",
            error: function () {
                $("#report_list").html("");
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
                            getPersonalGroupFollow(false);
                            pageSelect();
                        });
                    }
                    var $reportList = $("#report_list").html("");
                    $.each(data.rows, function (i, follow) {

                        var $li = $("<li class='report'/>");

                        var hideInput = "<input type='hidden' class='followId' value='" + follow.id + "'/>";

                        var image = "<img src='" + follow.logo_path + "'></img>";

                        var h1 = "<h1>[" + follow.category_name + "]<a href='/relationship/relationship_mygroup_info.aspx?id=" + follow.id + "'>" + follow.group_name + "</a><font color='#cc0000'>（" + follow.member_nbr + "）</font></h1>";

                        var $followListCon = $("<div class='follow_list_con'/>");
                        var followListYj = "<div class='follow_list_yj'><input class='isEmail' type='checkbox' id='box18' /><label onclick='checkbox2('box18')'>邮件订阅</label><select class='duration'></select><label>更新</label><a href='#' class='cancelFollow'>取消关注</a></div>";
                        var followListJd = "<div class='follow_list_jd'><label>关注度：</label><span><i style='width:" + (follow.follow_score * 100) + "%;'>" + (follow.follow_score * 100) + "%</i></span></div>";
                        followListJd += "<div class='follow_list_jd'><label>活跃度：</label><span><i style='width:" + (follow.activity_score * 100) + "%;'>" + (follow.activity_score * 100) + "%</i></span></div>";
                        $(followListYj + followListJd).appendTo($followListCon);

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

                        //取消关注
                        $li.find(".cancelFollow").click(function () {
                            cancelFollow(msg.attention_id, function (data) {
                                if (data.result) {
                                    $li.remove();
                                }
                                hint(data.msg, $("#hint"));
                            });
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

    //更新订阅邮件
    function updateDuration(id, isEmail, duration) {
        $.ajax({
            url: "/updatepersonalgroup_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'updatepersonalgroupfollowduration',id:'" + id + "',isEmail:" + isEmail + ",emailDuration:" + duration + "}",
            error: function () {
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }

    //取消关注
    function cancelFollow(groupId, callBack) {
        $.ajax({
            url: "/cancelpersonalmyself_follow.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cancelpersonalgroupfollow',groupId:'" + groupId + "'}",
            error: function () {
            },
            success: function (data) {
                callBack(data);
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

    getPersonalGroupFollow(true);

    $(".first").click(function () {
        pageCurrent = 1;
        pageSelect();
        getPersonalGroupFollow(false);
    });
    $(".last").click(function () {
        pageCurrent = pageTotal;
        pageSelect();
        getPersonalGroupFollow(false);
    })
    $(".prev").click(function () {
        if (pageCurrent <= 1) {
            alert("当前为第一页");
        } else {
            pageCurrent--;
            pageSelect();
            getPersonalGroupFollow(false);
        }
    });
    $(".next").click(function () {
        if (pageCurrent >= pageTotal) {
            alert("当前为最后一页");
        } else {
            pageCurrent++;
            pageSelect();
            getPersonalGroupFollow(false);
        }
    });

    $(".search").click(function () {
        pageCurrent = 1;
        groupName = $(".groupName").val();
        if (stringLimit(groupName, 100)) {
            getPersonalGroupFollow(true);
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