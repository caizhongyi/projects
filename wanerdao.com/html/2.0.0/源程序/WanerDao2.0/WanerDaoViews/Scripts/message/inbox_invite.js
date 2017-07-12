
$(function () {

    pagination(0);

});

function pagination(type) {
    $(".pager").myPagination({
        showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: databind,
        ajax: {
            url: '../getmessagelist_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'getinvitelist',
                optionid: type
            }
        },
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [
            { type: 'checkbox', text: '全选', cls: 'chkall', handler: function () { } },

            { type: 'select', cls: 'displayType', localdata: [{ "id": "0", "value": "全部信息" }, { "id": "1", "value": "个人邀请" }, { "id": "2", "value": "活动邀请" }, { "id": "3", "value": "圈子邀请" }], handler: function ($this) {
                pagination($('.displayType').val());
            }
            }, { title: '&nbsp;拒绝', cls: 'batchRefuse', type: 'a', handler: function ($this) {
                delMessage(getChkIds());
            }
            }, { title: '&nbsp;刷新', cls: 'refresh', type: 'a', handler: function ($this) {
                pagination($('.displayType').val());
            }
            }
        ]
    });

}

function databind(data) {
    //debugger;
    var box = $("#fList").empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            //1.圈子 2.活动，3好友
            var li = jQuery('<li id="itm_' + i + '"></li>').appendTo(box);
            var jsonOBJ = jQuery.parseJSON(v.json);
            if (v.msg_type == 1) {//圈子
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '" /></i>');
                li.append($wd.format('<i class="iPic"><a href="{0}" target="_blank" title="' + jsonOBJ.group_name + '"><img src="{1}" alt="' + jsonOBJ.group_name + '" /></a></i>', v.id, jsonOBJ.logo_path));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_2"><a href="#" target="_blank" title="烧饭">烧饭</a> 邀请您加入 <a href="#" class="fb">烧饭烧饭烧饭烧饭烧饭</a> (<b class="red">256人</b>)</i></dt>'
                            + '<dd><p></p></dd>'
                            + '<dd class="ddBar">关注度：<i class="iBar"><i style="width:' + jsonOBJ.activity_score + '%;"></i><em>' + jsonOBJ.activity_score + '%</em></i>&nbsp;&nbsp;活跃度：<i class="iBar"><i style="width:' + jsonOBJ.followspend + '%;"></i><em>' + jsonOBJ.followspend + '%</em></i> </dd>'
                            + '</dl>');
                li.append('<p class="ifAgree"><a href="javascript:;">同意</a>|<a href="javascript:;" onclick="delMessage([{\"messageid\":\"' + v[0] + '\",\"type\":' + v[1] + '}])">忽略</a></p>');
            }
            else if (v.msg_type == 2) {//活动
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="{0}" target="_blank" title="烧饭"><img src="images/activity/img_43x43.png" alt="烧饭" /></a></i>', v.id));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_3"><a href="#">XXX</a> 邀请您加入 <a href="#" class="fb">烧饭烧饭烧饭烧饭烧饭</a> [纽约市/纽约州/美国] (<b class="red">256人</b>)</i></dt>'
                            + '<dd><p><span><em>活动时间：</em>' + jsonOBJ.begin_datetime + '</span><span><em>报名截止时间：</em>' + jsonOBJ.report_datetime + '</span> <span><em>预交费用：</em>' + jsonOBJ.prepay_nbr + '$</span> </p></dd>'
                            + '</dl>');
                li.append('<p class="ifAgree"><a href="javascript:;">同意</a>|<a href="javascript:;" onclick="delMessage([{\"messageid\":\"' + v[0] + '\",\"type\":' + v[1] + '}])">忽略</a></p>');
            } else {//好友
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append('<i class="iPic"><a href="personal_info.html?uid=" target="_blank" title="' + jsonOBJ.name + '"><img src="' + jsonOBJ.logo_path + '" alt="' + jsonOBJ.name + '" /></a></i>');
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i class="icon i_1 fb"><a href="#" class="fb">' + jsonOBJ.name + '</a>请求与您成为好友[纽约市/纽约州/美国]</i></dt>'
                            + '<dd><p><span><em>星座：</em>' + jsonOBJ.contellation + '</span><span><em>毕业院校：</em>' + jsonOBJ.school + '</span> <span><em>工作单位：</em>' + jsonOBJ.work_place + '</span> <span><em>家乡：</em>' + jsonOBJ.home + '</span></p></dd>'
                        + '</dl>');
                li.append('<p class="ifAgree"><a href="javascript:;" onclick="agreeFriendInvite(' + v.id + ');return false;">同意</a>|<a href="javascript:;" onclick="delMessage([{\"messageid\":\"' + v[0] + '\",\"type\":' + v[1] + '}])">忽略</a></p>');
            }

            li.hover(function () {
                $(this).addClass("mHover");
            }, function () {
                $(this).removeClass("mHover");
            });
        });
        chkIdClick();
    }
}

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
        alert(wanerdaoLangTip('message_00009'));
    }
}

function agreeInvite(ids) {
    if (ids) {
        $.ajax({
            url: '../inboxinvite_message.axd',
            type: 'post',
            datatype: 'json',
            data: "{opertype:'acceptinvite',id:'" + ids + "'}",
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
        alert(wanerdaoLangTip('message_00009'));
    }
}

function agreeFriendInvite(id) {
    var class_id;
//    $.ajax({
//        url: '../inboxinvite_message.axd',
//        type: 'post',
//        datatype: 'json',
//        data: "{opertype:'acceptfriendinvite',id:'" + id + "',class_id:'" + class_id + "'}",
//        cache: false,
//        error: function () {
//        },
//        success: function (data) {
//            if (data.result) {
//                delFromUI(ids);
//            }
//        }
//    });
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