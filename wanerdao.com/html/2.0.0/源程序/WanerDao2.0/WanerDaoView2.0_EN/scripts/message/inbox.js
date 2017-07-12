
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
        //标记
        markMessage(getChkIds());
    });
    $('.opera').find('a:eq(2)').click(function () {
        //刷新
        $('.chkAll').attr('checked', false);
        pagination($('.displayType').val());
    });
});

var firstPage = true;
/* 分页 */
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
                opertype: 'getmessagelist',
                optionid: type
            }
        }
    });
}

/*  分页回调函数 */
function databind(data) {
    //debugger;
    var $box = $("#content").empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, msg) {
            var msg_item = jQuery('<tr>'
                    + '<td width="30" align="center"><input type="checkbox" class="chkId" value="' + msg.id + '"/></td>'
                    + '<td width="30" align="center"><span class="read ' + (msg.is_read == 'True' ? 'read_no' : 'read_yes') + '">&nbsp;</span></td>'
                    + '<td width="30" align="center"><span class="mark ' + (msg.is_mark == 'True' ? 'mark_on' : '') + '" onclick="markMessage(\'' + msg.id + '\')">&nbsp;</span></td>'
                    + '<td><p class="gray fb">' + msg.from_username + '</p></td>'
                    + '<td><p class="lgray fb">' + msg.content + '</p></td>'
                    + '<td width="70" align="center" class="lgray">' + dateStr(new Date(msg.receive_date + " GMT")) + '</td>'
                + '</tr>').appendTo($box);

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
            msg_item.children('td:eq(2)').nextAll('td').css('cursor', 'pointer').click(function () {
                location.href = 'view.html?msgid=' + msg.id + '&from=1';
            });
        });

        if (data.rows.length == 1) {
            $box.find('td').css('border-bottom', '0');
        }

        if (firstPage) firstPage = false;
        chkIdClick();
    } else {
        firstPage = false;
        $box.append('<tr><td style="text-align: center; border-width: 0; line-height: 62px; height: 62px; color: #666;">' + wanerdaoLangTip('message_00010') + '</td></tr>');
    }
}

function delMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../inbox_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delmessage',messageid:'" + ids + "'}",
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

function markMessage(ids) {
    if (ids) {
        $.ajax({
            url: '../inbox_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'markmessage',messageid:'" + ids + "'}",
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
        //        new pop({ typename: 'warning',
        //            msginfo: wanerdaoLangTip('message_00009')
        //        });
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