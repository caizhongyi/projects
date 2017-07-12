$(function () {

    pagination(0);

    $('.displayType').change(function () {
        $('.displayType').val($(this).val()).chosen();
        $('.chkAll').attr('checked', false);
        pagination($(this).val());
    });

    $('.opera').find('a:eq(0)').click(function () {
        //删除
        $('.chkAll').attr('checked', false);
        delMessage(getChkIds());
    });
    $('.opera').find('a:eq(1)').click(function () {
        //还原
        $('.chkAll').attr('checked', false);
        revertMessage(getChkIds());
    });
    $('.opera').find('a:eq(2)').click(function () {
        //刷新
        $('.chkAll').attr('checked', false);
        pagination($('.displayType').val());
    });
    $('.opera').find('a:eq(3)').click(function () {
        //清空垃圾箱
        $('.chkAll').attr('checked', false);
        clearRubbish()
    });
});

var firstPage = true;
function pagination(type) {
    firstPage = true;
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: databind,
        ajax: {
            url: '../rubbish_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getrubbishinveitelist',
                optionid: type
            }
        }
    });
}

/* 删除  */
function delMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../rubbish_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delrubbishinvite',json:'" + ids + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    delFromUI(ids);
                }
            }
        });
    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00004')
//        });
    }
}

/*revert msg*/
function revertMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../rubbish_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'revertrubbishinvite',json:'" + ids + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    delFromUI(ids);
                }
            }
        });
    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00004')
//        });
    }
}

function clearRubbish() {
    //clearrubbish
    $.ajax({
        url: '../rubbishinvite_message.axd',
        type: 'POST',
        dataType: 'json',
        data: "{opertype:'clearrubbishinvite'}",
        cache: false,
        error: function () {
        },
        success: function (data) {
            if (data.result) {
                pagination(0);
            }
        }
    });
}

function databind(data) {
    //debugger;
    var $box = $("#fList").empty();

    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            //1.圈子 2.活动，3好友  from_where: 1 发件箱 2 收件箱
            var li = jQuery('<li></li>').appendTo($box);
            var jsonOBJ = jQuery.parseJSON(v.json);

            if (v.msg_type == 1) {//圈子
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.from_where + '" /></i>');
                li.append($wd.format('<i class="iPic"><a href="/relationship/relationship_mygroup_info.html?id={0}" target="_blank" title="' + jsonOBJ.group_name + '"><img src="/{1}" alt="' + jsonOBJ.group_name + '" /></a></i>', jsonOBJ.id, jsonOBJ.logo_path));
                li.append('<dl class="fInfo">'
                            + (v.from_where == 1 ? '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i>我邀请<a href="' + (v.send_type == 1 ? '/relationship/relationship_mygroup_info.html?id=' : '/personal/index.html?id=') + v.send_id + '">' + v.send_username + '</a>' + (v.send_type == 1 ? '的所有成员' : '') + ' 加入 <a href="/relationship/relationship_mygroup_info.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.group_name + '</a> (<b class="red">' + jsonOBJ.member_nbr + '人</b>)</i></dt>' :
                                '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i class=""><a href="/personal/index.html' + v.send_id + '" target="_blank" title="' + v.send_username + '">' + v.send_username + '</a> 邀请您加入 <a href="#" class="fb">' + jsonOBJ.group_name + '</a> (<b class="red">' + jsonOBJ.member_nbr + '人</b>)</i></dt>')
                            + '<dd><p>' + jsonOBJ.summary + '</p></dd>'
                            + '<dd class="ddBar">关注度：<i class="iBar"><i style="width:' + jsonOBJ.followspend + '%;"></i><em>' + jsonOBJ.followspend + '%</em></i>&nbsp;&nbsp;活跃度：<i class="iBar"><i style="width:' + jsonOBJ.activity_score + '%;"></i><em>' + jsonOBJ.activity_score + '%</em></i> </dd>'
                            + '</dl>');
                //                if (v.from_where == 2) {
                //                    li.append('<p class="ifAgree"><a href="/relationship/relationship_mygroup_info.html?id=' + jsonOBJ.id + '&messageid=' + v.id + '">同意</a>|<a href="javascript:;"  class="refuseInvite">忽略</a></p>');
                //                }

            }
            else if (v.msg_type == 2) {//活动
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.from_where + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="/activity/activity_index.html?id={0}" target="_blank" title="' + jsonOBJ.active_name + '">' + jsonOBJ.active_name + '</a></i>', jsonOBJ.id));
                li.append('<dl class="fInfo">'
                            + (v.from_where == 1 ? '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i>我邀请<a href="' + (v.send_type == 1 ? '/relationship/relationship_mygroup_info.html?id=' : '/personal/index.html?id=') + v.send_id + '">' + v.send_username + '</a>' + (v.send_type == 1 ? '的所有成员' : '') + ' 加入 <a href="/activity/activity_index.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.active_name + '</a> ' + (jsonOBJ.address ? '[' + jsonOBJ.address + ']' : '') + ' (<b class="red">' + jsonOBJ.member_count + '人</b>)</i></dt>' :
                                '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i class=""><a href="/personal/index.html?uid=' + v.send_id + '">' + v.send_username + '</a> 邀请您加入 <a href="/activity/activity_index.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.active_name + '</a> ' + (jsonOBJ.address ? '[' + jsonOBJ.address + ']' : '') + ' (<b class="red">' + jsonOBJ.member_count + '人</b>)</i></dt>')
                            + '<dd><p><span><em>活动时间：</em>' + jsonOBJ.begin_datetime + '</span><span><em>报名截止时间：</em>' + jsonOBJ.report_datetime + '</span> <span><em>预交费用：</em>' + jsonOBJ.prepay_nbr + '$</span> </p></dd>'
                            + '</dl>');
                //                if (v.from_where == 2) {
                //                    li.append('<p class="ifAgree"><a href="/activity/activity_index.html?id=' + jsonOBJ.id + '&messageid=' + v.id + '">同意</a>|<a href="javascript:;"  class="refuseInvite">忽略</a></p>');
                //                }
            } else {//好友
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.from_where + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="{0}" target="_blank" title="{2}"><img src="{1}" alt="{2}" /></a></i>', v.id, jsonOBJ.logo_path, jsonOBJ.name));
                li.append('<dl class="fInfo">'
                    + (v.from_where == 1 ? '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i>我请求与<a href="/personal/index.html?uid=' + jsonOBJ.send_id + '" class="fb">' + jsonOBJ.name + '</a>成为好友' + (jsonOBJ.place ? '[' + jsonOBJ.place + ']' : '') + '</i></dt>' :
                    '<dt><i class="date">' + dateStr(v.delete_date) + '</i><i class="fb"><a href="/personal/index.html?uid=' + jsonOBJ.send_id + '" class="fb">' + jsonOBJ.name + '</a>请求与您成为好友' + (jsonOBJ.place ? '[' + jsonOBJ.place + ']' : '') + '</i></dt>')
                    + '<dd><p><span><em>星座：</em>' + jsonOBJ.contellation + '</span><span><em>毕业院校：</em>' + jsonOBJ.school + '</span> <span><em>工作单位：</em>' + jsonOBJ.work_place + '</span> <span><em>家乡：</em>' + jsonOBJ.home + '</span></p></dd>'
                    + '</dl>');
                //                if (v.from_where == 2) {
                //                    li.append('<p class="ifAgree"><a href="javascript:;" onclick="agreeFriendInvite(\'' + v.id + '\');return false;">同意</a>|<a href="javascript:;" class="refuseInvite">忽略</a></p>');
                //                }
            }

            //            if (v.from_where == 2) {
            //                li.find('.refuseInvite').click(function () {
            //                    delInboxMessage(v.id);
            //                    return false;
            //                });
            //            }

            li.hover(function () {
                $(this).addClass("mHover");
            }, function () {
                $(this).removeClass("mHover");
            });
            if (data.rows.length == 1) {
                li.css('border-bottom', '0');
            }
        });
        if (firstPage) firstPage = false;
        chkIdClick();
    } else {
        firstPage = false;
        $box.append('<li style="text-align: center; border-width: 0; line-height: 82px; height: 82px; color: #666;">' + wanerdaoLangTip('message_00013') + '</li>');
    }
}
/******** 获取选中的id集合 *********/
function getChkIds() {
    var ids = '';
    $('.chkId').each(function () {
        if ($(this).attr('checked')) {
            if (ids) ids += ',';
            var v = $(this).val().split(',');
            ids += '{\"messageid\":\"' + v[0] + '\",\"type\":' + v[1] + '}';
        }
    });
    if (ids) ids = '[' + ids + ']';
    return ids;
}

function delFromUI(ids) {
    var obj = jQuery.parseJSON(ids);
    //mark_on
    $('.chkId').each(function () {
        for (var i in obj) {
            if ($(this).val().split(',')[0] == obj[i].messageid) {
                $(this).parent().parent().fadeTo('slow', 0, function () {
                    $(this).remove();
                });
            }
        }
    });
}


///*同意好友邀请*/
//function agreeFriendInvite(id) {
//    FriendGroupChosen({
//        _callback: function (fg) {
//            ajaxfunc('inboxinvite_message.axd', "{opertype:'acceptfriendinvite',id:'" + id + "',class_id:'" + fg.id + "'}", function () {
//                new pop({ typename: 'error', msginfo: wanerdaoLangTip('common_00001') });
//            }, function (data) {
//                if (data.result) {
//                    new pop({ typename: 'success', msginfo: data.msg });
//                    delFromUI(id);
//                } else {
//                    new pop({ typename: 'error', msginfo: data.msg });
//                }
//            });
//        }
//    });
//}


/*删除邀请*/
function delInboxMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../inboxinvite_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'refuseinvite',messageid:'" + ids + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    delFromUI(ids);
                }
            }
        });
    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00009')
//        });
    }
}