$(function () {
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
        if(confirm(wanerdaoLangTip('personal_00016'))){
            ajaxfunc('msg_home.axd', "{opertype:'exit'}", function () {
            }, function (data) {
                if (data.result) {
                    window.location.href = '/';
                }
            });
        }
    });

    //搜索
    $('#srch_info').click(function () {
        //searchStr
        if ($('#srch_str').val()) {
            location.href = '/search.html?q=' + escape($('#srch_str').val());
        } else {
            $('#srch_str').focus();
        }
    });


    //$('#toggleLang').
});

function getNoReadCount() {
    //站内信
    ajaxfunc('msg_home.axd', "{opertype:'getmessagenonreadcount'}", function () {
    }, function (data) {
        if (data.result && data.msg) {
            $('#z_msg').find('b').html('（' + data.msg + '）');
            $('#z_msg').attr('title', $wd.format(wanerdaoLangTip('personal_00015'), data.msg));
        }

        setTimeout('getNoReadCount()', 5000);
    });
}

//function getClientLang(){
//    var lang = $.cookie('userid');
//    if(lang)){
//        return lang;
//    }

//    lang = 
//}