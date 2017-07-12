
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
            url: '../rubbish_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getrubbishmessagelist',
                optionid: type
            }
        },
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [
            { type: 'checkbox', text: '全选', cls: 'chkall', handler: function () { } },

            { type: 'select', cls: 'displayType', localdata: [{ "id": "0", "value": "全部信息" }, { "id": "1", "value": "已读信息" }, { "id": "2", "value": "未读信息" }, { "id": "3", "value": "标记信息" }, { "id": "4", "value": "未标记信息"}], handler: function ($this) {
                //$('.displayType').val($(this).val());
                pagination($('.displayType').val());
            }
            }, { title: '&nbsp;删除', cls: 'batchdel', type: 'a', handler: function ($this) {
                delMessage(getChkIds());
            }
            }, { title: '&nbsp;标记', cls: 'batchmark', type: 'a', handler: function ($this) {
                markMessage(getChkIds());
            }
            }, { title: '&nbsp;还原', cls: 'reflesh', type: 'a', handler: function ($this) {
                revertMessage(getChkIds());
            }
            }, { title: '&nbsp;清空', cls: 'reflesh', type: 'a', handler: function ($this) {
                clearRubbish();
            }
            }, { title: '&nbsp;刷新', cls: 'reflesh', type: 'a', handler: function ($this) {
                pagination($('.displayType').val());
            }
            }
        ]
    });
}

/* 删除  */
function delMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../rubbish_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delrubbishmessage',json:'" + ids + "'}",
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

/*  标记 */
function markMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../rubbish_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'markrubbishmessage',json:'" + ids + "'}",
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

/* 还原 */
function revertMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../rubbish_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'revertrubbishmessage',json:'" + ids + "'}",
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

/* 清空垃圾箱 */
function clearRubbish() {
    //clearrubbish
    $.ajax({
        url: '../rubbish_message.axd',
        type: 'POST',
        dataType: 'json',
        data: "{opertype:'clearrubbishmessage'}",
        cache: false,
        error: function () {
        },
        success: function (data) {
            if (data.result) {
                $('##content').find('ul').fadeTo('slow', 0, function () {
                    $(this).empty();
                });
            }
        }
    });
}

/* 绑定信息 */
function databind(data) {
    //debugger;
    var box = $("#content").empty();

    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, msg) {
            //from_where 1收件箱 2发件箱 3草稿箱
            //$('<li><input type="checkbox" class="chkId" value="' + msg.id + ',' + msg.from_where + '"/><span class="' + (msg.is_mark == 1 ? 'mark_on' : 'mark_off') + '" onclick="singleMark(\'' + msg.id + '\',' + msg.from_where + ')">&nbsp;</span><a href="view.html?msdid=' + msg.id + '&from=' + msg.from_where + '">' + ' - ' + msg.content + '</a></li>').appendTo(pagecontent);
            var msg_item = jQuery('<tr>'
                        + '<td width="30" align="center"><input type="checkbox" class="chkId" value="' + msg.id + ',' + msg.from_where + '"/></td>'
                        + '<td width="30" align="center"><span class="' + (msg.from_where == 1 ? (msg.mailstate == 1 ? 'read_yes' : 'read_no') : (msg.from_where == 2 ? 'send_sucess' : 'draft')) + '">&nbsp;</span></td>'
                        + '<td width="30" align="center"><span class="mark ' + (msg.is_mark == 'True' ? 'mark_on' : '') + '" onclick="singleMark(\'' + msg.id + '\',' + msg.from_where + ')">&nbsp;</span></td>'
                        + '<td><p class="gray">&nbsp;' + msg.send_username + '</p></td>'
                        + '<td><p class="lgray">' + msg.content + '</p></td>'
                        + '<td width="60" align="center" class="lgray">' + dateStr(msg.delete_date) + '</td>'
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

            if (msg.from_where == 1 || msg.from_where == 2) {
                msg_item.children('td:eq(2)').nextAll('td').click(function () {
                    location.href = 'view.html?msgid=' + msg.id + '&from=' + msg.from_where;
                });

            } else {
                msg_item.children('td:eq(2)').nextAll('td').click(function () {
                    location.href = 'compose.html#id=' + msg.id;
                });
            }
        });
        chkIdClick();
    }
}

/*添加标记*/
function singleMark() {
    var id = '[{\"messageid\":\"' + arguments[0] + '\",\"type\":' + arguments[1] + '}]';
    markMessage(id);
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

/*更新标记状态*/
function changeMarkState(ids) {
    var obj = jQuery.parseJSON(ids);

    //mark_on
    $('.chkId').each(function () {
        for (var i in obj) {
            if ($(this).val().split(',')[0] == obj[i].messageid) {
                if ($(this).parent().parent().find('span.mark').hasClass('mark_on')) {
                    $(this).parent().parent().find('span.mark').removeClass('mark_on');
                    $(this).parent().parent().find('span.mark').addClass('mark_off');
                } else {
                    $(this).parent().parent().find('span.mark').addClass('mark_on');
                }
            }
        }
    });
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