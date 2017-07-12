var is_self = false;  //是否访问自己
var uid = '';//被访问者id
$(function () {
    uid = getQueryString('uid');
    if (!uid) uid = '';
    if (uid == '' || uid == wd_B.uin.uid) { is_self = true; }
    $('#uname').html(wd_B.uin.name);

    $('#userInfo').find('img').attr('src', wd_B.uin.small_logo);

    //    //个人信息
    //    ajaxfunc('wanerdao_personal.axd', "{opertype:'getpersonalprofile',uid:'" + uid + "'}", function () {
    //    }, function (data) {
    //        if (data.result) {
    //            baseinfo = data.obj;
    //            if (callback) callback();
    //        } else {
    //            alert(data.msg);
    //        }
    //    });

    //站内信
    $('#z_msg').click(function () { window.location = '/message/inbox.html'; });
    getNoReadCount();

    //退出
    $('#logout').click(function () {
        ajaxfunc('exit_home.axd', "{opertype:'exit'}", function () {
        }, function (data) {
            if (data.result) {
                window.location.href = '/';
            }
        });
    });

    //搜索
    $('#srch_info').click(function () {
        //searchStr
        if ($('#srch_str').val() && $('#srch_str').val() != $('#srch_str').attr('inputdefault')) {
            location.href = '/search.html?q=' + escape($('#srch_str').val());
        } else {
            $('#srch_str').focus();
        }
    });


    if (clientLanguage == 'en-us') {
        $('#toggleLang').html('切换为中文').click(function () {
            setMultiplelangAndRedirect('zh-cn');
        });
    } else {
        $('#toggleLang').html('Switch To English').click(function () {
            setMultiplelangAndRedirect('en-us');
        });
    }
});

function getNoReadCount() {
    //站内信
    ajaxfunc('msg_home.axd', "{opertype:'getmessagenonreadcount'}", function () {
    }, function (data) {
        if (data.result && data.msg) {
            $('#z_msg').find('.tip-num').html(data.msg).show();
            $('#z_msg').attr('title', $wd.format(wanerdaoLangTip('personal_00015'), data.msg));
        }
        else {
            $('#z_msg').find('.tip-num').html('').hide();
            $('#z_msg').attr('title', '');
        }

        setTimeout('getNoReadCount()', 6000000);
    });
}