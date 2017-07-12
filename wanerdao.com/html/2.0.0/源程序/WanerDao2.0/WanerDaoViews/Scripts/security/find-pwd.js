

/*********find pass step 1  begin***********/
function find_pass_1_onload() {
    $('.input_a').bind('blur', function () {
        check_acc()
    });

    $('.input_a').keyup(function (e) {
        if (e.keyCode == '13') {
            valid_acc();
        } else {
            check_acc();
        }
    });

    $('#nextstep').click(function () {
            valid_acc();
    });
}

function check_acc() {
    if (!$.trim($('.input_a').val())) {
        $('.input_a').error(wanerdaoLangTip('acc_00018'));
        return false;
    }
    $('.input_a').unerror();
    return true;
}

function valid_acc() {
    //checkaccountexist
    if (check_acc()) {
        $('#nextstep').attr('disabled', true);
        $('#nextstep').unnotice(1);
        $.ajax({
            url: "../wanerdao_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'validateaccountexist',account:'" + $.trim($('.input_a').val()) + "'}",
            error: function (data) {
                $('#nextstep').notice(wanerdaoLangTip('common_00001'), 1);
                $('#nextstep').removeAttr('disabled');
            },
            success: function (data) {
                if (!data.result) {
                    if (data.msg == "3") {
                        $('.input_sub').notice(wanerdaoLangTip('acc_00019'), 1);
                        location.href = "account_login.html";
                    } else {
                        $('#nextstep').notice(wanerdaoLangTip('acc_00020'), 1);
                        $('#nextstep').removeAttr('disabled');
                    }
                } else {
                    $('#nextstep').notice(wanerdaoLangTip('acc_00021'), 2);
                    location.href = "find_pass_2.html";
                }
            }
        });
    }
}

/*********find pass step 2  begin***********/
function find_pass_2_onload() {
    GetSecurityEmail();

    $('.input_a').bind('blur', function () {
        check_scode();
    });
    $('.input_a').keyup(function (e) {
        if (e.keyCode == '13') {
            valid_scode();
        } else {
            check_scode();
        }
    });

    $("#nextstep").click(function () {
            valid_scode();
    });

    $("#btnSendAgain").click(function () {
        $('.tip').unnotice(1);
        //send email again
        if (!send_state) {
            $.ajax({
                url: "../wanerdao_personsecurity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'findpwdsendemail'}",
                error: function (data) {
                    $('.tip').notice(wanerdaoLangTip('common_00001'), 1);
                },
                success: function (data) {
                    if (!data.result) {
                        $('.tip').notice(data.msg, 1);
                    } else {
                        alert(wanerdaoLangTip('acc_00028'));
                        SetTimer();
                    }
                }
            });
        }
    });

    SetTimer();
}

var timer;
var t;
var send_state = true;
//创建 计时器
function SetTimer() {
    t = 300;
    send_state = true;
    timer = setInterval(function () {
        t--;
        if (t <= 0) {
            clearInterval(timer); 
            send_state = false;
            $("#btnSendAgain").css('font-size', '14px');
            $("#btnSendAgain").html(wanerdaoLangTip('acc_00029'));
        } else {
            var s = (parseInt((t / 60)) == 0 ? '' : parseInt((t / 60)) + '分') + (t % 60) + '秒';
            $("#btnSendAgain").css('font-size', '8px');
            $("#btnSendAgain").html($wd.format(wanerdaoLangTip('acc_00030'), s));
        }
    }, 1000);
}

function check_scode() {
    if (!$.trim($('.input_a').val())) {
        $('.input_a').error(wanerdaoLangTip('acc_00022'));
        return false;
    } else {
        $('.input_a').unerror();
        return true;
    }
}

function GetSecurityEmail() {
    //findpwdgetsecurityemail
    $.ajax({
        url: "../wanerdao_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'findpwdgetsecurityemail'}",
        error: function (data) {
            $('.wait').html(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (!data.result) {
                //$('.wait').html(data.msg);
                location.href = 'find_pass.html';
            } else {
                var mail = data.msg;
                $('.displayemail').text(mail);
                mail = 'http://mail.' + mail.substring(mail.indexOf('@') + 1, mail.length);
                $('.tomail').attr('href', mail);
                $('.tomail').attr('target', '_blank');
                $('.wait').hide();
                $('.accout_edit_form').show();
            }
        }
    });
}

function valid_scode() {
    if (check_scode()) {
        $('.tip').unnotice(1);
        //checkaccountexist
        $.ajax({
            url: "../wanerdao_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'findpwdvalidemailcode',code:'" + $('.input_a').val() + "'}",
            error: function (data) {
                $('.tip').notice(wanerdaoLangTip('common_00001'), 1);
                $('#btnValidCode').removeAttr('disabled');
            },
            success: function (data) {
                if (!data.result) {
                    $('.tip').notice(data.msg, 1);
                } else {
                    $('#btnValidCode').notice(wanerdaoLangTip('acc_00023'), 2);
                    location.href = "find_pass_3.html";
                }
            }
        });
    }
}



var reset_state = false;
/*********find pass step 3  begin***********/
function find_pass_3_onload() {
    $('#pwd').focus();
    $('.accout_edit_form').validate({
        rules: {
            pwd: {
                required: true,
                rangelength: [8, 20]
            },
            repwd: {
                required: true,
                equalTo: "#pwd"
            }
        }, messages: {
            pwd: {
                required: wanerdaoLangTip('acc_00024'),
                rangelength: jQuery.format(wanerdaoLangTip('acc_00027'))
            },
            repwd: {
                required: wanerdaoLangTip('acc_00025'),
                equalTo: wanerdaoLangTip('acc_00026')
            }
        }, submitHandler: function (form) {
            alert('a');
        }
    });

    $("#pwd").pstrength({
        'displayminchar': true,
        'minchar': 8,
        'minchartext': '',
        'colors': ["#f00", "#c06", "#f60", "#3c0", "#3f0"],
        'scores': [20, 30, 43, 50],
        'verdicts': ['很不安全', '不安全', '一般', '安全', '非常安全'],
        'raisepower': 1.4
    });

    $("#btnResetPwd").click(function () {
        if ($('.accout_edit_form').valid()) {
            modifyPwd();
        }
    });

    $("#btnResetAndLogin").click(function () {
        if ($('.accout_edit_form').valid()) {
            modifyPwdAndLogin();
        }
    });

}

//findpwdmodifypwd
function modifyPwd() {
    if (!reset_state) {
        reset_state = true;
        $('.tip').unnotice(1);
        $.ajax({
            url: "../wanerdao_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'findpwdmodifypwd',password:'" + $("#pwd").val() + "'}",
            error: function (data) {
                $('.tip').notice(wanerdaoLangTip('common_00001'), 1);
                reset_state = false;
            },
            success: function (data) {
                if (!data.result) {
                    $('.tip').notice(data.msg, 1);
                    reset_state = false;
                } else {
                    alert(data.msg);
                }
            }
        });
    }
}

//findpwdmodifypwdandlogin
function modifyPwdAndLogin() {
    if (!reset_state) {
        reset_state = true;
        $('.tip').unnotice(1);
        $.ajax({
            url: "../wanerdao_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'findpwdmodifypwdandlogin',password:'" + $("#pwd").val() + "'}",
            error: function (data) {
                $('.tip').notice(wanerdaoLangTip('common_00001'), 1);
                reset_state = false;
            },
            success: function (data) {
                if (!data.result) {
                    $('.tip').notice(data.msg, 1);
                    reset_state = false;
                } else {
                    $('#btnResetAndLogin').notice(data.msg, 2);
                    location.href = "/";
                }
            }
        });
    }
}