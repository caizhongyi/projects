
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
        //还原
        $('.chkAll').attr('checked', false);
        revertMessage(getChkIds());
    });
    $('.opera').find('a:eq(2)').click(function () {
        //标记
        markMessage(getChkIds());
    });
    $('.opera').find('a:eq(3)').click(function () {
        //刷新
        $('.chkAll').attr('checked', false);
        pagination($('.displayType').val());
    });
    $('.opera').find('a:eq(4)').click(function () {
        //标记
        $('.chkAll').attr('checked', false);
        clearRubbish();
    });
});

var firstPage = true;
function pagination(type) {
    firstPage = true;
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: pager_callback,
        ajax: {
            url: '../rubbish_message.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getrubbishmessagelist',
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
            data: "{opertype:'delrubbishmessage',json:'" + ids + "'}",
            cache: false,
            error: function () {
            },
            success: function (data) {
                if (data.result) {
                    delFromUI(ids);
                    pagination($('.displayType').val());
                }
            }
        });
    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00009')
//        });
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
       // alert(wanerdaoLangTip('message_00009'));
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
                    pagination($('.displayType').val());
                }
            }
        });
    } else {
//        new pop({ typename: 'warning',
//            msginfo: wanerdaoLangTip('message_00009')
//        });
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
                pagination(0);
            }
        }
    });
}

/* 绑定信息 */
function pager_callback(data) {
    var $box = $("#content").empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, msg) {
            //from_where 2收件箱 1发件箱 3草稿箱
            var msg_item = jQuery('<tr>'
                        + '<td width="30" align="center"><input type="checkbox" class="chkId" value="' + msg.id + ',' + msg.from_where + '"/></td>'
                        + '<td width="30" align="center"><span class="' + (msg.from_where == 1 ? (msg.mailstate == 1 ? 'read_yes' : 'read_no') : (msg.from_where == 2 ? 'send_sucess' : 'draft')) + '">&nbsp;</span></td>'
                        + '<td width="30" align="center"><span class="mark ' + (msg.is_mark == 1 ? 'mark_on' : '') + '" onclick="singleMark(\'' + msg.id + '\',' + msg.from_where + ')">&nbsp;</span></td>'
                        + '<td><p class="gray">&nbsp;' + msg.send_username + '</p></td>'
                        + '<td><p class="lgray">' + msg.content + '</p></td>'
                        + '<td width="70" align="center" class="lgray">' + dateStr(msg.delete_date) + '</td>'
                      + '</tr>').css('cursor','pointer').appendTo($box);

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

        if (data.rows.length == 1) {
            $box.find('td').css('border-bottom', '0');
        }
        if (firstPage) firstPage = false;
        chkIdClick();
    } else {    
        firstPage = false;
        $box.append('<tr><td style="text-align: center; border-width: 0; line-height: 62px; height: 62px; color: #666;">' + wanerdaoLangTip('message_00015') + '</td></tr>');
    }
}

/*添加标记*/
function singleMark() {
    var id = '[{\"messageid\":\"' + arguments[0] + '\",\"type\":' + arguments[1] + '}]';
    markMessage(id);
}

/******** 获取选中的id集合 *********/
function getChkIds() {
    var ids = '';
    $('.chkId').each(function () {
        if ($(this).attr('checked')) {
            if (ids) ids += ',';
            var v = $(this).val().split(',');
            ids += '{\"messageid\":\"' + v[0] + '\",\"type\":\"' + v[1] + '\"}';
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