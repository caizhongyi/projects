

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
            url: '../draft_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getdraftmessagelist',
                optionid: type
            }
        },
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [
            { type: 'checkbox', text: '全选', cls: 'chkall', handler: function () { } },

            { type: 'select', cls: 'displayType', localdata: [{ "id": "0", "value": "全部信息" }, { "id": "1", "value": "标记信息" }, { "id": "2", "value": "未标记信息" }], handler: function ($this) {
                //$('.displayType').val($(this).val());
                pagination($('.displayType').val());
            }
            }, { title: '&nbsp;删除', cls: 'batchdel', type: 'a', handler: function ($this) {
                delMessage(getChkIds());
            }
            }, { title: '&nbsp;标记', cls: 'batchmark', type: 'a', handler: function ($this) {
                markMessage(getChkIds());
            }
            }, { title: '&nbsp;刷新', cls: 'reflesh', type: 'a', handler: function ($this) {
                pagination($('.displayType').val());
            }
            }
        ]
    });

}


function delMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../draft_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'deldraftmesssage',messageid:'" + ids + "'}",
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

function markMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../draft_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'markdraftmessage',messageid:'" + ids + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    changeMarkState(ids);
                }
            }
        });
    } else {
        alert(wanerdaoLangTip('message_00009'));
    }
}

function databind(data) {
    //debugger;
    $('#content').empty();
    var box = $("#content");
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, msg) {
            var msg_item = jQuery('<tr>'
                                    + '<td width="30" align="center"><input type="checkbox" class="chkId" value="' + msg.id + '"/></td>'
                                    + '<td width="30" align="center"><span class="draft">&nbsp;</span></td>'
                                    + '<td width="30" align="center"><span class="mark ' + (msg.is_mark == 'True' ? 'mark_on' : '') + '" onclick="markMessage(\'' + msg.id + '\')">&nbsp;</span></td>'
                                    + '<td><p class="gray">&nbsp;' + (msg.send_username == '' ? '无联系人' : msg.send_username) + '</p></td>'
                                    + '<td><p class="lgray">' + msg.content + '</p></td>'
                                    + '<td width="60" align="center" class="lgray">' + dateStr(msg.draft_date) + '</td>'
                                + '</tr>').appendTo(box);

            msg_item.hover(function () {
                $(this).addClass("mHover");
                $(this).find('p').addClass('dred');
                if (!$(this).find('span.mark').hasClass('mark_on')) {
                    $(this).find('span.mark').addClass('mark_off');
                }
            }, function () {
                $(this).removeClass("mHover");
                $(this).find('p').removeClass('dred');
                if ($(this).find('span.mark').hasClass('mark_off')) {
                    $(this).find('span.mark').removeClass('mark_off');
                }
            });
            msg_item.children('td:eq(2)').nextAll('td').click(function () {
                location.href = 'compose.html?id=' + msg.id;
            }).css('cursor', 'pointer');

         
        });
        chkIdClick();
    }
}

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

function changeMarkState(ids) {
    //mark_on
    $('.chkId').each(function () {
        if (ids.indexOf($(this).val()) > -1) {
            if ($(this).parent().parent().find('span.mark').hasClass('mark_on')) {
                $(this).parent().parent().find('span.mark').removeClass('mark_on');
                $(this).parent().parent().find('span.mark').addClass('mark_off');
            } else {
                $(this).parent().parent().find('span.mark').addClass('mark_on');
            }
        }
    });
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