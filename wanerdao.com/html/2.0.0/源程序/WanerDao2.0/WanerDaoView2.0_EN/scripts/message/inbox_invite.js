
$(function () {

    pagination(0);

    $('.displayType').change(function () {
        $('.displayType').val($(this).val()).chosen();
        pagination($(this).val());
    });

    $('.opera').find('a:eq(1)').click(function () {
        //删除
        $('.chkAll').attr('checked', false);
        delMessage(getChkIds());
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
                opertype: 'getinvitelist',
                optionid: type
            }
        }
    });

}

function databind(data) {
    //debugger;
    var $box = $("#fList").empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            //1.圈子 2.活动，3好友
            var li = jQuery('<li id="itm_' + i + '"></li>').appendTo($box);
            var jsonOBJ = jQuery.parseJSON(v.json);
            if (v.msg_type == "1") {//圈子
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '" /></i>');
                li.append($wd.format('<i class="iPic"><a href="/relationship/relationship_mygroup_info.html?id={0}" target="_blank" title="' + jsonOBJ.group_name + '"><img src="/{1}" alt="' + jsonOBJ.group_name + '" /></a></i>', jsonOBJ.id, jsonOBJ.logo_path));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_2"><a href="/personal/index.html?id=' + v.send_id + '" target="_blank" title="' + v.send_username + '">' + v.send_username + '</a> invitation you jion <a href="/relationship/relationship_mygroup_info.html?id=' + jsonOBJ.id + '" class="fb">' + jsonOBJ.group_name + '</a> (<b class="red">' + jsonOBJ.member_nbr + 'people</b>)</i></dt>'
                            + '<dd><p></p></dd>'
                            + '<dd class="ddBar">Subscribed score：<i class="iBar"><i style="width:' + jsonOBJ.followspend + '%;"></i><em>' + jsonOBJ.followspend + '%</em></i>&nbsp;&nbsp;Activity score：<i class="iBar"><i style="width:' + jsonOBJ.activity_score + '%;"></i><em>' + jsonOBJ.activity_score + '%</em></i> </dd>'
                            + '</dl>');
                li.append('<p class="ifAgree"><a href="/relationship/relationship_mygroup_info.html?id=' + jsonOBJ.id + '&messageid=' + v.id + '">Agree</a>|<a href="javascript:;"  class="refuseInvite">Refuse</a></p>');

            }
            else if (v.msg_type == "2") {//活动
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="/activity/activity_index.html?id={0}" target="_blank" title="' + jsonOBJ.active_name + '">' + jsonOBJ.active_name + '</a></i>', jsonOBJ.id));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_3"><a href="/personal/index.html?id=' + v.send_id + '">' + v.send_username + '</a> invitation you join <a href="#" class="fb">' + jsonOBJ.active_name + '</a> ' + (jsonOBJ.address ? '[' + jsonOBJ.address + ']' : '') + '(<b class="red">' + jsonOBJ.member_count + 'peole</b>)</i></dt>'
                            + '<dd><p><span><em>Activity time：</em>' + jsonOBJ.begin_datetime + '</span><span><em>Registration deadline：</em>' + jsonOBJ.report_datetime + '</span> <span><em>Paying the fees：</em>' + jsonOBJ.prepay_nbr + '$</span> </p></dd>'
                            + '</dl>');
                li.append('<p class="ifAgree"><a href="/activity/activity_index.html?id=' + jsonOBJ.id + '&messageid=' + v.id + '">Agree</a>|<a href="javascript:;"  class="refuseInvite">Refuse</a></p>');
            } else {//好友
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append('<i class="iPic"><a href="index.html?uid=" target="_blank" title="' + jsonOBJ.name + '"><img src="' + jsonOBJ.logo_path + '" alt="' + jsonOBJ.name + '" /></a></i>');
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_1 fb"><a href="/personal/index.html?id=' + v.send_id + '" class="fb">' + jsonOBJ.name + '</a> request be your friend ' + (jsonOBJ.place ? '[' + jsonOBJ.place + ']' : '') + '</i></dt>'
                            + '<dd><p><span><em>Contellation：</em>' + jsonOBJ.contellation + '</span><span><em>School：</em>' + jsonOBJ.school + '</span> <span><em>Work place：</em>' + jsonOBJ.work_place + '</span> <span><em>Home：</em>' + jsonOBJ.home + '</span></p></dd>'
                        + '</dl>');
                li.append('<p class="ifAgree"><a href="javascript:;" onclick="agreeFriendInvite(\'' + v.id + '\');return false;">Agree</a>|<a href="javascript:;" class="refuseInvite">Refuse</a></p>');
            }
            li.find('.refuseInvite').click(function () {
                delMessage(v.id);
                return false;
            });
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
        $box.append('<li style="text-align: center; border-width: 0; line-height: 82px; height: 82px; color: #666;">' + wanerdaoLangTip('message_00011') + '</li>');
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


/*同意好友邀请*/
function agreeFriendInvite(id) {
    FriendGroupChosen({
        _callback: function (fg) {
            ajaxfunc('inboxinvite_message.axd', "{opertype:'acceptfriendinvite',id:'" + id + "',class_id:'" + fg.id + "'}", function () {
                new pop({ typename: 'error', msginfo: wanerdaoLangTip('common_00001') });
            }, function (data) {
                if (data.result) {
                    new pop({ typename: 'success', msginfo: data.msg });
                    delFromUI(id);
                } else {
                    new pop({ typename: 'error', msginfo: data.msg });
                }
            });
        }
    });
}

/*删除邀请*/
function delMessage(ids) {
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

/*从界面移除已删除的*/
function delFromUI(ids) {
    $('.chkId').each(function () {
        if (ids.indexOf($(this).val().split(',')[0]) > -1) {
            $(this).parent().parent().fadeTo('slow', 0, function () {
                $(this).remove();
            });
        }
    });
}