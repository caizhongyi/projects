
var onCloseSave = true; //关闭时自动保存
var saveTimer = null;
$(function () {
    var hrefStr = location.href.toString();
    var msgId = getQueryString('id');

    if (msgId) {
        getDraft(msgId);
    } else {
        getAutoSaveMsg();
    }

    $('.revicer').fgAutoCompelte({
        nofind: wanerdaoLangTip('personal_00017'),
        fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
        displayValueField: 'user_id',
        displayTextField: 'name',
        displayCommentField: null,
        callback: addFriend,
        getData: getData,
        showTip: false
    }, $('#inputtxt'));

    $('#findfriend').click(function () {
        wanerdaoPop({
            comopts: { titleid: 'common_00011', typename: 'friends', elementid: 'findfriend', callback: function (data) {
                $.each(data.friends, function (i, v) {
                    addFriend({ value: v.id, text: v.name });
                });
            }
            }
        });
    });

    $('.sendmsg').click(function () { sendMessage(); });

    $('.savemsg').click(function () { saveDraft(); });

    $('.cancel').click(function () {
        $('#friendlist').empty();
        $('#friendlist').width(0);
        $('#revicerfriend').val('');
        $('.notice').remove();
        $('.wrong').remove();
        $('.sendcontent').val('');
        $('#cgxsave').attr('checked', false);
    });

    saveTimer = setInterval(autoSaveDraft, 300000); //300000
});

function getDraft(id) {
    $.ajax({
        url: '../draft_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getdetailmsgbyid',id:'" + id + "',from_where:3}",
        error: function () {
//            new pop({ typename: 'error',
//                msginfo: wanerdaoLangTip('message_00001')
//            });
        },
        success: function (data) {
            if (data.result && data.total > 0) {
                if (data.rows[0].from_id && data.rows[0].from_username) {
                    addFriend({ value: data.rows[0].from_id, text: data.rows[0].from_username });
                }
                $(".sendcontent").val(data.rows[0].content);
            } else {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('message_00005')
                });
            }
        }
    });
}

/**　Add Rriend **/
function addFriend(data) {
    $('#inputtxt').val('');
    if ($('#revicerfriend').val().indexOf(data.value) == -1) {
        var li = jQuery($wd.format('<li>{0}<span>×</span></li>', data.text)).appendTo($('#friendlist'));
        li.find('span').css('cursor', 'pointer');
        li.find('span').click(function () {
            $(this).parent().remove();
            delfriendid(data.value);
        });

        choseFriendResize();

        if ($('#revicerfriend').val()) {
            $('#revicerfriend').val($('#revicerfriend').val() + ',' + data.value);
        } else {
            $('#revicerfriend').val(data.value);
        }

    }
}

function choseFriendResize() {
    var liWidth = 0;
    $('#friendlist').find('li').each(function () {
        liWidth += $(this).width();
    });

    var ulMarginLeft = 0;
    if (liWidth >= 400) {
        ulMarginLeft = 400 - liWidth;
    }

    $('#friendlist').css({
//        'width': liWidth + 'px',
        'margin-left': ulMarginLeft + 'px'
    });

    $('#inputtxt').width((540 - (liWidth - ulMarginLeft)) + 'px');
    
}


function delfriendid(id) {
    $('#revicerfriend').val(function () { return $('#revicerfriend').val().replace(id + ',', '').replace(id, '') });

    choseFriendResize();
}

function validRevicer() {
    if (!$('#revicerfriend').val()) {
        $('#revicerfriend').error(wanerdaoLangTip('message_00001'));
        return false;
    }
    $('#revicerfriend').unerror();
    return true;
}

function validContent() {
    if (!$('.sendcontent').val()) {
        $('#cgxsave').notice(wanerdaoLangTip('message_00002'), 1);
        return false;
    }
    $('#cgxsave').unnotice(1);
    return true;
}

/*  Send Messsage */
function sendMessage() {
    if (validRevicer() & validContent()) {
        clearInterval(saveTimer);
        disableBtn();

        $.ajax({
            url: "../send_message.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'sendmessage',receivePerson:'" + $("#revicerfriend").val() + "',content:'" + $(".sendcontent").val() + "',isSava:" + ($('#cgxsave').attr('checked') ? "1" : "0") + "}",
            error: function (data) {
                $('#sendmsg').notice(wanerdaoLangTip('common_00001'), 1);
                enableBtn();
                saveTimer = setInterval(autoSaveDraft, 300000)
            },
            success: function (data) {
                if (data.result) {
                    location.href = 'inbox.html';

                    $('#sResult').notice(data.msg, 2);
                    $('#friendlist').empty();
                    $('#friendlist').width(0);
                    $("#revicerfriend").val('');
                    $(".sendcontent").val('');
                    $('#inputtxt').val('');
                } else {
                    $('#sResult').notice(data.msg, 1);
                    saveTimer = setInterval(autoSaveDraft, 300000);
                }

                setTimeout(function () {
                    $('#sResult').unnotice(1);
                    $('#sResult').unnotice(2);
                }, 3000);
                enableBtn();

            }
        });
    }
}


/* Save Message */
function saveDraft() {
    disableBtn();
    var d = new Date();
    if ($(".sendcontent").val()) {
        $.ajax({
            url: "../send_message.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'savedraft',receivePerson:'" + $("#revicerfriend").val() + "',content:'" + $(".sendcontent").val() + "'}",
            error: function (data) {
                $('#sendmsg').notice(wanerdaoLangTip('common_00001'), 1);
                enableBtn();
            },
            success: function (data) {
                if (data.result) {
                    $('#savetip').find('span').html($wd.format(wanerdaoLangTip('message_00004'), getLocationDateString(d, 'yyyy/MM/dd hh:mm:ss')));
                    $('#savetip').show();
                }
                enableBtn();
            }
        });
    }
}

var oldReceiver;
var oldContent;
/* Auto Save */
function autoSaveDraft() {
    if ($(".sendcontent").val()) {
        if ($("#revicerfriend").val() != oldReceiver || $(".sendcontent").val() != oldContent) {
            oldReceiver = $("#revicerfriend").val();
            oldContent = $(".sendcontent").val();
            var d = new Date();
            $.ajax({
                url: "../send_message.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'autosavedraft',receivePerson:'" + $("#revicerfriend").val() + "',content:'" + $(".sendcontent").val() + "'}",
                error: function (data) {
                    $('#sendmsg').notice(wanerdaoLangTip('common_00001'), 1);
                },
                success: function (data) {
                    if (data.result) {
                        $('#savetip').find('span').html($wd.format(wanerdaoLangTip('message_00003'), getLocationDateString(d, 'yyyy/MM/dd hh:mm:ss')));
                        $('#savetip').show();
                        setTimeout(function () {
                            $('#savetip').hide();
                        }, 5000);
                    }
                }
            });
        }
    }
}


if (window != top) {

} else {
    if (window.Event) {
        window.onunload = function (event) {
            if (onCloseSave)
                autoSaveDraft();
            return false;
        }
    } else {
        window.onunload = function () {
            if (onCloseSave)
                autoSaveDraft();
            return false;
        }
    }
}

function getData(str, callback) {
    $.ajax({
        url: '../searchfriend_common.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getfriendslist',titOrContent:'" + str + "',class_id:'',pyKey:'',pagecurrent:'1',pageSize:'6'}",
        error: function (data) {

        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

function enableBtn() {
    $('.sendmsg').removeAttr('disabled');
    $('.savemsg').removeAttr('disabled');
    $('.cancel').removeAttr('disabled');
}
function disableBtn() {
    $('.sendmsg').attr('disabled', true);
    $('.savemsg').attr('disabled', true);
    $('.cancel').attr('disabled', true);
}

function getAutoSaveMsg() {
    $.ajax({
        url: '../getautomsg_message.axd',
        type: 'POST',
        dataType: 'json',
        data: "{opertype:'getatuosavemsg'}",
        cache: false,
        error: function () {
        },
        success: function (data) {
            if (data.result && data.total > 0) {
                addFriend({ value: data.rows[0].send_id, text: data.rows[0].send_username });
                $(".sendcontent").val(data.rows[0].content);
            }
        }
    });
}

