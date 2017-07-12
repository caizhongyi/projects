
var msgId;
var msgfrom;
var isDel;
$(function () {
    msgfrom = getQueryString('from');
    isDel = getQueryString('isdel');
    msgId = getQueryString('msgid');

    //isDel = (isDel == 'true' ? tr);
    //    var p = hrefStr.match(/view_([a-zA-z0-9]{8}\-[a-zA-z0-9]{4}\-[a-zA-z0-9]{4}\-[a-zA-z0-9]{4}\-[a-zA-z0-9]{12})\.html/i);

    if (msgfrom == '1') {
        $('.mes_box_left').find('a:eq(1)').addClass('active');
    } else { $('.mes_box_left').find('a:eq(2)').addClass('active'); }
    getMsglistById();
});

/*get msg and reply*/
function getMsglistById() {
    $.ajax({
        url: '../getmsglist_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getmsglistbyid',id:'" + msgId + "',from_where:'" + msgfrom + "'}",
        error: function () {
            new pop({ typename: 'warning',
                msginfo: wanerdaoLangTip('common_00001')
            });
        },
        success: function (data) {
            if (data.result && data.rows.length > 0) {
                displayMsgList(data.rows);
            } else {
                $('#msglist').find('div').html(wanerdaoLangTip('common_00028')).css({ 'color': '#f00' });
            }
        }
    });
}

/*display msg and reply*/
function displayMsgList(list) {
    /*construct interface*/
    var box = $('#msglist').empty();

    var firstMsg = jQuery('<div id="firstmsg"></div>').appendTo(box);
    var toolBar = jQuery('<div class="toolBar"></div>').appendTo(firstMsg);
    var tbCon = jQuery('<div class="tbCon"></div>').appendTo(toolBar);
    tbCon.append($wd.format('<div class="userArea mBorImg"><a href="../personal/index.html?uid={0}" target="_blank"><img src="{1}" width="22" height="22" class="lImg" /></a> {2} {3}</div>'
        , list[0].user_id, list[0].slogo, list[0].name, list[0].email));
    var firstMsg_tools = jQuery('<div class="func"></div>').appendTo(tbCon);
    firstMsg_tools.append($wd.format('<span class="">{0}</span>', getLocationDateString(list[0].receive_date, 'yyyy/MM/dd')));  //dateStr
    var tools_del = jQuery('<a href="javascript:void(0);" class="icon_1" title="删除"></a>').appendTo(firstMsg_tools);
    var tools_mark = jQuery('<a href="javascript:void(0);" class="icon_2" title="标记"></a>').appendTo(firstMsg_tools);
    var tools_reply = jQuery('<a href="javascript:void(0);" class="icon_3" title="回复" style="margin-right:0px"></a>').appendTo(firstMsg_tools);
    var tools_back = jQuery('<a href="javascript:void(0);" class="icon_4" title="返回" style="margin-left:5px"></a>').appendTo(firstMsg_tools);
    var tools_pre = jQuery('<a href="javascript:void(0);" class="icon_5" title="上一封"></a>').appendTo(firstMsg_tools);
    var tools_next = jQuery('<a href="javascript:void(0);" class="icon_6" title="下一封"></a>').appendTo(firstMsg_tools);
    
    /*删除*/
    tools_del.click(function () {
        delMsg(list[0].id, function (data) {
            if (data.result) { window.location.href = 'inbox.html'; }
        });
    });
    /*标记*/
    tools_mark.click(function () {
        markMsg(list[0].id, function (data) { if (data.result) { } });
    });
    /*回复*/
    if (msgfrom == '1') {
        tools_reply.click(function () {
            openReply(firstMsg, list[0].user_id, list[0].id, $('.msgCon', firstMsg).html());
        });
    }
    else { tools_reply.hide(); }
    
    /*后退*/
    tools_back.click(function () {
        if (msgfrom == '1') { window.location.href = 'inbox.html'; }
        else if (msgfrom == '2') { window.location.href = 'send.html'; }
        else { window.location.href = 'draft.html'; }
    });

    firstMsg.append($wd.format('<div class="mInfo"><p class="p2em msgCon" style="word-break: break-all">{0}</p></div>', list[0].content));

    getDetailMsgById(list[0].id, function (data) {
        if (data.result) {
            $('.msgCon', firstMsg).html(data.rows[0].content.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'))
        }
    });

    if (list.length > 1) {
        var nInfoList = jQuery('<div class="mInfoList mBorImg">').appendTo(box);
        var replyList = jQuery('<ul></ul>').appendTo(nInfoList);

        $.each(list, function (i, v) {
            if (i == 0) return true;

            var msg_itm = jQuery('<li></li>').appendTo(replyList);
            if (i == list.length - 1) {
                msg_itm.addClass('last');
            }
            msg_itm.append($wd.format('<a href="../personal/index.html?uid={0}" target="_blank"><img src="{1}" width="43" height="43" class="lImg" /></a>'
                , v.user_id, v.slogo));
            msg_itm.append($wd.format('<dl><dt><i class="iFunc"><a href="javascript:void(0);" class="icon_7 replaythis"></a>'
            + ' <a href="javascript:void(0);" class="icon_8 delthis"></a></i><i class="iDate">{4}</i><a href="../personal/index.html?uid={0}" target="_blank">{1}</a>'
            + ' <a href="javascript:;" target="_blank" class="aEmail fn">{2}</a></dt>'
                + '<dd class="msgCon" sc="{3}">{3}</dd></dl>', v.user_id, v.name, v.email, v.content, getLocationDateString(v.receive_date, 'yyyy/MM/dd'))); //dateStr(
            msg_itm.find('dd').click(function () {
                if (!msg_itm.hasClass('mHover')) {
                    getDetailMsgById(v.id, function (data) {
                        if (data.result) {
                            msg_itm.addClass('mHover');
                            $('.msgCon', msg_itm).html(data.rows[0].content.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'));
                        }
                    });
                } else {
                    if (msg_itm.next('div.replymain').length > 0) {
                        msg_itm.next('div.replymain').remove();
                    }
                    msg_itm.removeClass('mHover');
                    $('.msgCon', msg_itm).html($('.msgCon', msg_itm).attr('sc'));
                }
            }).css('cursor', 'pointer');

            if (msgfrom == '1') {
                $('.replaythis', msg_itm).click(function () {
                    openReply(msg_itm, v.user_id, v.id, $('.msgCon', msg_itm).html().replace(/\<br\>/g, '\n').replace('&nbsp;', ' '));
                });
            } else {
                $('.replaythis', msg_itm).hide();
            }

            $('.delthis', msg_itm).click(function () {
                delMsg(v.id, function (data) {
                    if (data.result) {
                        if (msg_itm.next('div.replymain').length > 0) {
                            msg_itm.next('div.replymain').remove();
                        }
                        msg_itm.remove();
                    }
                });
            });
        });


    }
}


/* 打开回复 */
function openReply(container, uid, msgId, content) {
    if (container.next('div.replymain').length == 0) {
        var replyMain = jQuery('<div class="replymain"><div class="black10"></div></div>');
        container.after(replyMain);;
        replyMain.append('<h3 class="fb f14 gray">快速回复：</h3>');
        var reply_Box = jQuery('<div class="mes_com_box_form mes_view_form"><ul></ul></div>').appendTo(replyMain);
        reply_Box.find('ul').append('<li>'
//            +'<label class="label">发送给： </label>'
//                + '<input type="text" class="text mes_com_send"/>'
//                + '<a href="" class="mes_com_send_ico"></a>'
//                + '<div class="black10"></div>'
//                + '<div class="black10"></div>'
//            + '</li>'
//            + '<li>'
                + '<label class="label mes_com_send_txtcon">内&nbsp;&nbsp;容： </label>'
                + '<textarea name="" cols="" rows="" class="replayCon text mes_com_send_con">\n\n+--\n' + content + '</textarea>'
            + '</li>'
            + '<li>'
                + '<div class="save_draft">'
                + '<input type="checkbox" class="save_draft_check" id="cgxsave"/>'
                + '<label class="label">保存一份到草稿箱</label>'
                + '<div class="save_draft_alert savetip" style="display:none;"><span></span>'
                + '<a href="javascript:void(0);" onclick="this.parentNode.style.display=\'none\';" class="close"></a>'
                + '</div>'
                + '</div>'
            + '</li>'
            + '<li>'
                + '<div class="submit">'
                + '<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 sendmsg" value="发  送"/>'
                + '<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 savemsg" value="保  存"/>'
                + '</div>'
            + '</li>');
        container.next().find('.replayCon').focus();

        /* 发送信息 */
        container.next().find('.sendmsg').click(function () {
            var sendCon = container.next().find('.replayCon').val();
            replyMain.remove();
            sendReply(uid, sendCon, msgId, function (data) {
                if (data.result) {
                    window.location.reload();
                } else {
                    new pop({ typename: 'warning',
                        msginfo: data.msg
                    });
                }
            });
        });

        /* 保存草稿 */
        container.next().find('.savemsg').click(function () {
            var sendCon = container.next().find('.replayCon').val();
            saveDraft({ content: sendCon }, replyMain);
        });

        container.next().find('.cancel').click(function () {
            container.next().stopTime();    
            container.next().remove();
        });

        container.next().everyTime(300000, function () {
            var sendCon = container.next().find('.replayCon').val();
            autoSaveDraft({ content: sendCon }, replyMain);
        });
    } else {
        container.next().stopTime();    
        container.next().remove();
    }
}

/*send reply*/
function sendReply(receiverid, replycontent, pid,callback) {
    if (replycontent) {
        $.ajax({
            url: '../getmsgbyid_message.axd',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: "{opertype:'replymsg',receivePersonid:'" + receiverid + "',receiveCoutent:'" + replycontent + "',parentid:'" + pid + "',from_where:" + msgfrom + "}",
            error: function () {
            },
            success: function (data) {
                if (callback) callback(data);
            }
        });
    }
}

/* 
    根据编号获取详细信息 
 */
function getDetailMsgById(id,callback) {
    $.ajax({
        url: '../view_message.axd',
        type: 'POST',
        dataType: 'json',
        data: "{opertype:'getdetailmsgbyid',id:'" + id + "',from_where:" + msgfrom + "}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
    
}

/*
     删除消息
*/
function delMsg(id, callback) {
    if (msgfrom == '1') {
        //delmessage
        $.ajax({
            url: '../view_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delmessage',messageid:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (callback) callback(data);
            }
        });
    } else if (msgfrom == '2') {
        //delmessage
        $.ajax({
            url: '../view_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'delsendmessage',messageid:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (callback) callback(data);
            }
        });
    }
}

/*
    标记信息
*/
function markMsg(id, callback) {
    if (msgfrom == '1') {
        //delmessage
        $.ajax({
            url: '../view_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'markmessage',messageid:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (callback) callback(data);
            }
        });
    } else if (msgfrom == '2') {
        //delmessage
        $.ajax({
            url: '../view_message.axd',
            type: 'POST',
            dataType: 'json',
            data: "{opertype:'marksendmessage',messageid:'" + id + "'}",
            error: function () {
            },
            success: function (data) {
                if (callback) callback(data);
            }
        });
    }
}

/* 保存草稿 */
function saveDraft(obj,box) {
    var d = new Date();
    if (obj.content) {
        $.ajax({
            url: "../send_message.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'savedraft',receivePerson:'',content:'" + obj.content + "'}",
            error: function (data) {
                box.find('.sendmsg').notice(wanerdaoLangTip('common_00001'), 1);
            },
            success: function (data) {
                if (data.result) {
                  box.find('.savetip').find('span').html($wd.format(wanerdaoLangTip('message_00004'), DateFormat(d, 'yyyy-MM-dd hh:mm:ss')));
                  box.find('.savetip').show();
                }
            }
        });
    }
}

var oldContent = '';
/* 系统自动保存草稿 */
function autoSaveDraft(obj, box) {
    if (obj.content && obj.content != oldContent) {
        oldReceiver = $("#revicerfriend").val();
        oldContent = $(".sendcontent").val();
        var d = new Date();
        $.ajax({
            url: "../send_message.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'autosavedraft',receivePerson:'',content:'" + obj.content + "'}",
            error: function (data) {
            },
            success: function (data) {
                if (data.result) {
                    box.find('.savetip').find('span').html($wd.format(wanerdaoLangTip('message_00003'), DateFormat(d, 'yyyy-MM-dd hh:mm:ss')));
                    box.find('.savetip').show();
                }
            }
        });
    }
}