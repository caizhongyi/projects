window.wanerdaologin = window.wanerdaologin || {};

wanerdaologin.Tip = {
    'defaluts': {
        title: '玩儿道登录',
        forgetpwd: '忘记密码'
    }
}

wanerdaologin.login = function () {
    if ($('body').find('#loginBox').length == 0) {
        $('body').append('<div id="loginBg" style="position: absolute; left: 0; top: 0; z-index:9999; display: none;background-color: #999;">'
        + '</div>'
        + '<div id="loginBox" style="text-align:center; width: 300px; height:200px;border:solid 1px #ddd; background-color:#fff;display: none; position: absolute;  z-index:99999;">'
        + '<div style="background-color:#adf; height:20px; line-height:20px;"><span onclick="wanerdaologin.close()" style="cursor:pointer;float:right">&nbsp;×&nbsp;</span></div>'
        + '<div style=" line-height:25px; ">'
        + '<h2 style="line-height:30px; font-size:16px; font-weight:bold;">' + wanerdaologin.Tip.defaluts.title + '</h2>'
        + '<span style="display:block;height:20px; line-height:20px; border:1px solid #fff;" class="wanerdaologinmsg"></span>'
        + '账号：<input type="text" id="txtWanerDaoAcc" /> 　　　　<br/>'
        + '密码：<input type="password"  id="txtWanerDaoPwd"/> <a href="#">' + wanerdaologin.Tip.defaluts.forgetpwd + '</a><br/>'
        + '</div>'
        + '<div style="text-align:left; line-height:25px; "><input type="checkbox"  id="chkWanerDaoIssl" style="margin-left:70px;"/> 记住下次登录<br/>'
        + '</div>'
        + '<input type="button" value="登录" id="btnWanerDaoLogin"/>'
        + '<div class="wanerdaologinwait" style="display:none;"><img src="../images/write.gif" /> 正在请求...</div>'
        + '</div>'
        );

        $('#btnWanerDaoLogin').click(function () {
            wanerdaologin.doLogin();
        });
    }

    $('#loginBg').css({ 'width': $(document).width(), 'height': $(document).height() }).fadeTo('slow', 0.5);
    $('#loginBox').css({ position: 'absolute', 'top': (($(window).height() - $('#loginBox').height()) / 2) + $(document).scrollTop(), 'left': (($(window).width() - $('#loginBox').width()) / 2) }).fadeIn('slow');

    if (parseInt($('#loginBox').css('top')) < 0) {
        $('#loginBox').css('top', 0);
    }


    $(window).resize(function () {
        $('#loginBg').css({ 'width': $(document).width(), 'height': $(document).height() });
        $('#loginBox').css({ 'top': (($(window).height() - $('#loginBox').height()) / 2), 'left': (($(window).width() - $('#loginBox').width()) / 2) });
        if (parseInt($('#loginBox').css('top')) < 0) {
            $('#loginBox').css('top', 0);
        }
    });
}

wanerdaologin.close = function () {
    $('#loginBox').fadeOut('slow');
    $('#loginBg').fadeOut('slow');
}


wanerdaologin.valid = function () {
    if (!$.trim($('#txtWanerDaoAcc').val())) {
        $('.wanerdaologinmsg').html('×请输入账号！');
        return false;
    } if (!$.trim($('#txtWanerDaoPwd').val())) {
        $('.wanerdaologinmsg').html('×请输入密码！');
        return false;
    } else if ($.trim($('#txtWanerDaoPwd').val()).length < 6 || $.trim($('#txtWanerDaoPwd').val()).length > 16) {
        $('.wanerdaologinmsg').html('×密码长度6-16位！');
        return false;
    } else {
        $('.wanerdaologinmsg').html('');
        return true;
    }
}

wanerdaologin.doLogin = function () {
    ///登录方法///
    if (wanerdaologin.valid()) {
        $('.wanerdaologinwait').css('display', 'block');
        var issl = 0;
        if ($('#chkWanerDaoIssl').attr('checked')) {
            issl = 1;
        }
        $.ajax({
            url: "../wanerdao_login.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'login',account:'" + $("#txtWanerDaoAcc").val() + "',password:'" + $("#txtWanerDaoPwd").val() + "',isSaveLogin:'" + issl + "'}",
            error: function (data) {
                $('#btnWanerDaoLogin').removeAttr("disabled");
                $('.wanerdaologinwait').css('display', 'none');
                alert("请求失败！");
            },
            success: function (data) {
                $('#btnWanerDaoLogin').removeAttr("disabled");
                $('.wanerdaologinwait').css('display', 'none');
                if (data.result) {
                    wanerdaologin.close();
                }
                else {
                    $('.wanerdaologinmsg').html(data.msg);
                }
            }
        });
    }
}