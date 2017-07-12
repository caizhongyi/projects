
$(function () {
    var hrefStr = location.href.toString();
    var msgId = GetQueryString('id');

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
        displayCommentField: 'relation_name',
        callback: addFriend,
        getData: getData
    }, $('#inputtxt'));


    $('#findfriend').click(function () {
        wanerdaoPop({
            comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'findfriend', callback: function (data) {
                $.each(data.friend, function (i, v) {
                    addPerItem('friend', v.id, v.name, $('#allowlist'));
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

    setInterval(autoSaveDraft, 300000);
});

function getDraft(id) {
    $.ajax({
        url: '../draft_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getdetailmsgbyid',id:'" + id + "',from_where:3}",
        error: function () {
            alert(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (data.result && data.total > 0) {
                if (data.rows[0].from_id && data.rows[0].from_username) {
                    addFriend({ value: data.rows[0].from_id, text: data.rows[0].from_username });
                }
                $(".sendcontent").val(data.rows[0].content);
            } else {
                alert(wanerdaoLangTip('message_00005'));
            }
        }
    });
}

/**　Add Rriend **/
function addFriend(data) {
    if ($('#revicerfriend').val().indexOf(data.value) == -1) {
        var li = jQuery($wd.format('<li>{0}<span>×</span></li>', data.text)).appendTo($('#friendlist'));
        li.find('span').css('cursor', 'pointer');
        li.find('span').click(function () {
            $(this).parent().remove();
            delfriendid(data.value);
        });
        var liWidth = 0;
        $('#friendlist').find('li').each(function () {
            liWidth += $(this).width();
        });
        $('#friendlist').css('width', liWidth + 'px');

        if ($('#revicerfriend').val()) {
            $('#revicerfriend').val($('#revicerfriend').val() + ',' + data.value);
        } else {
            $('#revicerfriend').val(data.value);
        }
    }
}


function delfriendid(id) {
    $('#revicerfriend').val(function () { return $('#revicerfriend').val().replace(id + ',', '').replace(id, '') });
    var liWidth = 0;
    $('#friendlist').find('li').each(function () {
        liWidth += $(this).width();
    });
    $('#friendlist').css('width', liWidth + 'px');
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
            },
            success: function (data) {
                if (data.result) {
                    alert(data.msg);
                    $('#friendlist').empty();
                    $('#friendlist').width(0);
                    $("#revicerfriend").val('');
                    $(".sendcontent").val('');
                } else {
                    $('.sResult').notice(wanerdaoLangTip('common_00001'), 1);
                }
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
                    $('#savetip').find('span').html($wd.format(wanerdaoLangTip('message_00004'), DateFormat(d, 'yyyy-MM-dd hh:mm:ss')));
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
                        $('#savetip').find('span').html($wd.format(wanerdaoLangTip('message_00003'), DateFormat(d, 'yyyy-MM-dd hh:mm:ss')));
                        $('#savetip').show();
                    }
                }
            });
        }
    }
}

/* get friend by name*/
function getFriendByName() {
   // $.ajax({
        //            url: "../send_message.axd",
        //            type: "POST",
        //            dataType: "json",
        //            cache: false,
        //            data: "{opertype:'sendmessage',receivePerson:'" + $("#revicerfriend").val() + "',content:'" + $("#password").val() + "'}",
        //            error: function (data) {
    //                $('#sendmsg').notice(wanerdaoLangTip('common_00001'), 1);
        //            },
    //success:function(data){
    //if (data.result && data.count > 0) {
        //autocompelete(data.rows);
    //}
      //  }
    //});
}


if (window != top) {

   

} else {

    if (window.Event) {

     
        window.onunload = function (event) {
            autoSaveDraft();
            return false;
        }
    } else {

        window.onunload = function () {
            autoSaveDraft();
            return false;
        }

    }
}

function getData(str, callback) {
    $.ajax({
        url: '../searchfriend_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'searchfriendsbyname',fname:'" + str + "'}",
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

