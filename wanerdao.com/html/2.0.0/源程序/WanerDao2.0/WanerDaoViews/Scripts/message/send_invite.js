
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
                opertype: 'getsendinvitelist',
                optionid: type
            }
        },
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [
            { type: 'checkbox', text: '全选', cls: 'chkall', handler: function () { } },

            { type: 'select', cls: 'displayType', localdata: [{ "id": "0", "value": "全部信息" }, { "id": "1", "value": "个人信息" }, { "id": "2", "value": "活动信息" }, { "id": "3", "value": "圈子信息" }], handler: function ($this) {
                //$('.displayType').val($(this).val());
                pagination($('.displayType').val());
            }
            }, { title: '&nbsp;删除', cls: 'batchAgree', type: 'a', handler: function ($this) {
                delMessage(getChkIds());
            }
            }, { title: '&nbsp;重新发送', cls: 'batchRefuse', type: 'a', handler: function ($this) {
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
            var li = jQuery('<li></li>').appendTo(box);
            var jsonOBJ = jQuery.parseJSON(v.json);
            if (v.msg_type == 1) {//圈子
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '" /></i>');
                li.append($wd.format('<i class="iPic"><a href="{0}" target="_blank" title="' + jsonOBJ.group_name + '"><img src="{1}" alt="' + jsonOBJ.group_name + '" /></a></i>', v.id, jsonOBJ.logo_path));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i>我邀请<a href="#">' + v.send_username + '</a> 加入 <a href="#" class="fb">' + jsonOBJ.group_name + '</a> [纽约市/纽约州/美国] (<b class="red">' + jsonOBJ.member_nbr + '人</b>)</i></dt>'
                            + '<dd><p>温家宝：金融机构不能把企业当成唐僧肉 华西村转型发展</p></dd>'
                            + '<dd class="ddBar">关注度：<i class="iBar"><i style="width:' + jsonOBJ.activity_score + '%;"></i><em>' + jsonOBJ.activity_score + '%</em></i>&nbsp;&nbsp;活跃度：<i class="iBar"><i style="width:' + jsonOBJ.followspend + '%;"></i><em>' + jsonOBJ.followspend + '%</em></i> </dd>'
                            + '</dl>');

            }
            else if (v.msg_type == 2) {//活动
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append($wd.format('<i class="iPic"><a href="{0}" target="_blank" title="烧饭"><img src="images/activity/img_43x43.png" alt="烧饭" /></a></i>', v.id));
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i>我邀请<a href="#">' + v.send_username + '</a> 加入 <a href="#" class="fb">' + jsonOBJ.active_name + '</a> [纽约市/纽约州/美国] (<b class="red">' + jsonOBJ.member_count + '人</b>)</i></dt>'
                            + '<dd><p><span><em>活动时间：</em>' + jsonOBJ.begin_datetime + '</span><span><em>报名截止时间：</em>' + jsonOBJ.report_datetime + '</span> <span><em>预交费用：</em>' + jsonOBJ.prepay_nbr + '$</span> </p></dd>'
                            + '</dl>');


            } else {//好友
                li.append('<i class="cbtn"><input type="checkbox" class="chkId" value="' + v.id + ',' + v.msg_type + '"/></i>');
                li.append('<i class="iPic"><a href="" target="_blank" title="' + jsonOBJ.name + '"><img src="images/activity/img_43x43.png" alt="' + jsonOBJ.name + '" /></a></i>');
                li.append('<dl class="fInfo">'
                            + '<dt><i class="date">' + dateStr(v.send_date) + '</i><i>我请求与<a href="#" class="fb">' + jsonOBJ.name + '</a>成为好友' + jsonOBJ.place + ']</i></dt>'
                            + '<dd><p><span><em>星座：</em>' + jsonOBJ.contellation + '</span><span><em>毕业院校：</em>' + jsonOBJ.school + '</span> <span><em>工作单位：</em>' + jsonOBJ.work_place + '</span> <span><em>家乡：</em>' + jsonOBJ.home + '</span></p></dd>'
                        + '</dl>');
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
        alert(wanerdaoLangTip('message_00009'));
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
                    alert(data.msg);
                }
            }
        });
        
    } else {
        alert(wanerdaoLangTip('message_00009'));
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