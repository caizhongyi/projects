
$(function () {

    loginValid();

    $("#username").focus();
    $('form').submit(function () { return false; });

    $('#username,#password,#islogin').keyup(function (e) {
        if (e.keyCode == '13') {
            validateUser();
        }
    });

    $("#btnLogin").click(function () {
        validateUser();
    });

    $('#btnReg').click(function () {
        doReg();
    });

    $('.to_registe').click(function () {
        $('.side>div:eq(0)').hide();
        $('.side>div:eq(1)').show();
        return false;
    });

    $('.to_login').click(function () {
        $('.side>div:eq(0)').show();
        $('.side>div:eq(1)').hide();
        return false;
    });
    $('#reg_sex').change(function () {
        $('#reg_sex_chzn').attr('z-index', '100');
    });
    bindSelect();

    $('#search').click(function () {
        var q = $("#searchQ").val();
        if (q && q != $('#searchQ').attr('inputdefault')) {
            window.open("searchc.html?q=" + escape(q), "_self");
        }
    });

    $('.setLang').val(clientLanguage).chosen();
    $('.setLang').change(function () {
        setMultiplelangAndRedirect($(this).val());
    });


    //    //注册
    //    $('#reg_email').keyup(function () {
    //        if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val())) {
    //            $(this).error('');
    //        }
    //    });
});

/*验证是否登录*/
function loginValid() {
    //loginvalid
    $.ajax({
        url: "../index_login.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'loginvalid'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                window.location.href = "personal";
            }
        }
    });
}

/* login valid*/
function validateUser() {
    $('#btnLogin').unnotice(1);
    indexLogin($.trim($("#username").val()), $.trim($("#password").val()), $("#islogin").attr("checked"), $("#btnLogin"), function () {
        if (!$.trim($("#username").val())) {
            $('#btnLogin').notice(wanerdaoLangTip('acc_00001'), 1);
            $('#username').focus();
        } else if (!$.trim($('#password').val())) {
            $('#btnLogin').notice(wanerdaoLangTip('acc_00002'), 1);
            $('#password').focus();
        } else if ($.trim($('#password').val()).length < 8 || $.trim($('#password').val()).length > 20) {
            $('#btnLogin').notice(wanerdaoLangTip('acc_00003'), 1);
            $('#password').focus();
        } else {
            $('#btnLogin').attr('disabled', 'disabled');
            return true;
        }
        return false;
    });
}

/* bind selelct */
function bindSelect() {
    var date = new Date();
    for (i = date.getFullYear(); i >= date.getFullYear() - 99; i--) {
        $('#year').append($wd.format('<option value="{0}">{0}</option>', i));
    }
    $('#year').chosen();
    for (i = 1; i <= 12; i++) {
        $('#month').append($wd.format('<option value="{0}">{0}</option>', i));
    }
    $('#month').chosen();


    var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
    for (i = 1; i <= lastDay; i++) {
        $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
    }
    $('#day').chosen();

    $('#year').change(function () {
        $('#month').val('1');
    });

    $('#year, #month').change(function () {
        $('#day').empty();
        var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
        }
    
        $('#day').chosen();
    });
}

/*登录*/
function indexLogin(account, pwd, issave, btn, funcValdate) {
    if (funcValdate()) {
        var issl = 0;
        if (issave) {
            issl = 1;
        }
        $.ajax({
            url: "../index_login.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'indexlogin',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}",
            error: function (data) {
                $('#btnLogin').notice(wanerdaoLangTip('common_00003'), 1);
                window.location.href = 'account/login.html';
            },
            success: function (data) {
                if (data.result) {
                    //$('#btnLogin').notice(wanerdaoLangTip('acc_00005'), 2);
                    window.location.href = "personal";
                }
                else {
                    $('#btnLogin').notice(wanerdaoLangTip('acc_00004'), 1);
                    window.location.href = 'account/login.html';
                }
            }
        });
    }
}

/* 注册 */
function doReg() {
    $('#btnReg').unnotice(1);
    var reg_email = $('#reg_email').val();
    var reg_password = $('#reg_password').val();
    var reg_re_password = $('#reg_re_password').val();
    var reg_truename = $('#reg_truename').val();
    var reg_sex = $("#reg_sex").val();
    var birth_year = $('#year').val();
    var birth_month = $('#month').val();
    var birth_day = $('#day').val();
   
    if ((!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(reg_email)
     | !reg_password | !(reg_password.length >= 8 && reg_password.length <= 20) | !reg_sex | !(reg_password == reg_re_password) | !reg_truename)) {
        $('#btnReg').notice(wanerdaoLangTip('acc_00006'), 1);
        window.location = $wd.format('account/register.html?email={0}&truename={1}&sex={2}&b_y={3}&b_m={4}&b_d={5}'
        , reg_email, reg_truename, reg_sex, birth_year, birth_month, birth_day);

    }
    else {
        if ($("#iQapTcha").val()) {
            $('#btnReg').notice('请先启动滑动按钮，再提交注册申请！', 1);
            return false;
        }

        var btn = $('#btnReg').attr('disabled', true);
        $.ajax({
            url: "../wanerdao_registered.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'register',usermail:'" + reg_email + "',userpass:'" + reg_password + "',username:'" + reg_truename + "',usersex:'" + reg_sex + "',useryear:'" + birth_year + "',usermonth:'" + birth_month + "',userday:'" + birth_day + "',iQapTcha:'" + $("#iQapTcha").val() + "'}",
            error: function () {
                $('#btnReg').notice(wanerdaoLangTip('acc_00006'), 1);
                window.location = $wd.format('account/register.html?email={0}&truename={1}&sex={2}&b_y={3}&b_m={4}&b_d={5}', reg_email, reg_truename, reg_sex, birth_year, birth_month, birth_day);
            },
            success: function (data) {
                if (data.result) {
                    btn.notice(data.msg, 2);
                    window.location = '/personal';
                } else {
                    $('#btnReg').notice(data.msg, 1);
                    window.location = $wd.format('account/register.html?email={0}&truename={1}&sex={2}&b_y={3}&b_m={4}&b_d={5}', reg_email, reg_truename, reg_sex, birth_year, birth_month, birth_day);
                }
            }
        });
    }
}