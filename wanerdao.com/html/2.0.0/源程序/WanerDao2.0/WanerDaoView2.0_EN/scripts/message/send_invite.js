
$(function () {

    pagination(0);

    $('.displayType').change(function () {
        $('.displayType').val($(this).val()).chosen();
        pagination($(this).val());
    });

    $('.opera').find('a:eq(0)').click(function () {
        //删除
        $('.chkAll').attr('checked', false);
        delMessage(getChkIds());
    });
    $('.opera').find('a:eq(1)').click(function () {
        //重新发送
        var idlist = '';
        $('.chkId').each(function () {
            if ($(this).attr('checked')) {
                if (idlist) idlist += ',';
                var v = $(this).val().split(',');
                idlist += '{\"messageid\":\"' + v[0] + '\",\"type\":' + v[1] + '}';
            }
        });
        if (idlist) idlist = '[' + idlist + ']';
        sendInviteAgain(idlist);
    });
    $('.opera').find('a:eq(2)').click(function () {
        //刷新
        $('.chkAll').attr('checked', false);
        pagination($('.displayType').val());
    });
});

var firstPage = true;
function pagination(type) {
    firstPage = true;
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: databind,
        ajax: {
            url: '../getmessagelist_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getsendinvitelist',
                optionid: type
            }
        }
    });
}

function databind(data) {
    var $box = $("#fList").empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            //1.圈子 2.活动，3好友
            var li = jQuery('<li></li>').appendTo($box);
            var jsonOBJ = jQuery.parseJSON(v.json);
            if (v.msg_type == "1") {//圈子
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '" /></i>');
                li.append($wd.format('<i class="iPic"><a href="/relationship/relationship_mygroup_info.html?id={0}" target="_blank" title="' + jsonOBJ.group_name + '"><img src="/{1}" alt="' + jsonOBJ.group_name + '" /></a></i>', jsonOBJ.id, jsonOBJ.logo_path));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i> I invitation <a href="' + (v.send_type == 1 ? '/relationship/relationship_mygroup_info.html?id=' : '/personal/index.html?id=') + v.send_id + '">' + v.send_username + '</a>' + (v.send_type == 1 ? '\\\ member ' : '') + ' join <a href="#" class="fb">' + jsonOBJ.group_name + '</a>  (<b class="red">' + jsonOBJ.member_nbr + ' people</b>)</i></dt>'
                            + '<dd><p>' + jsonOBJ.summary + '</p></dd>'
                            + '<dd class="ddBar">Subscribed score：<i class="iBar"><i style="width:' + jsonOBJ.followspend + '%;"></i><em>' + jsonOBJ.followspend + '%</em></i>&nbsp;&nbsp;Activity score：<i class="iBar"><i style="width:' + jsonOBJ.activity_score + '%;"></i><em>' + jsonOBJ.activity_score + '%</em></i> </dd>'
                            + '</dl>');
            }
            else if (v.msg_type == "2") {//活动
                // if (send_type == 1) {
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="/activity/activity_index.html?id={0}" target="_blank" title="' + jsonOBJ.active_name + '">' + jsonOBJ.active_name + '</a></i>', jsonOBJ.id));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i>I invitation<a href="' + (v.send_type == 1 ? '/relationship/relationship_mygroup_info.html?id=' : '/personal/index.html?id=') + v.send_id + '">' + v.send_username + '</a>' + (v.send_type == 1 ? '\\\'s member' : '') + ' join <a href="/activity/activity_index.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.active_name + '</a> ' + (jsonOBJ.address ? '[' + jsonOBJ.address + ']' : '') + ' (<b class="red">' + jsonOBJ.member_count + ' people</b>)</i></dt>'
                            + '<dd><p><span><em>Activity time：</em>' + jsonOBJ.begin_datetime + '</span><span><em>Registration deadline：</em>' + jsonOBJ.report_datetime + '</span> <span><em>Paying the fees：</em>' + jsonOBJ.prepay_nbr + '$</span> </p></dd>'
                            + '</dl>');
                //}
            } else {//好友
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append('<i class="iPic"><a href="" target="_blank" title="' + jsonOBJ.name + '"><img src="' + jsonOBJ.logo_path + '" alt="' + jsonOBJ.name + '" /></a></i>');
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i> I request with <a href="/personal/index.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.name + '</a> be a friend ' + (jsonOBJ.place ? '[' + jsonOBJ.place + ']' : '') + '</i></dt>'
                            + '<dd><p><span><em>Contellation：</em>' + jsonOBJ.contellation + '</span><span><em>School：</em>' + jsonOBJ.school + '</span> <span><em>Work place：</em>' + jsonOBJ.work_place + '</span> <span><em>Home：</em>' + jsonOBJ.home + '</span></p></dd>'
                        + '</dl>');
            }

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
            ids += $(this).val();
        }
    });
    return ids;
}


function delMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../inboxinvite_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delsendinvite',messageid:'" + ids + "'}",
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

function sendInviteAgain(idlist) {
    if (idlist) {
        $.ajax({
            url: '../inboxinvite_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'sendinviteagain',json:'" + idlist + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    new pop({ typename: 'success',
                        msginfo: data.msg
                    });
                }
            }
        });

    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00009')
//        });
    }
}

function delFromUI(ids) {
    //mark_on
    $('.chkId').each(function () {
        if (ids.indexOf($(this).val()) > -1) {
            $(this).parent().parent().fadeTo('slow', 0, function () {
                $(this).remove();
            });
        }
    });
}