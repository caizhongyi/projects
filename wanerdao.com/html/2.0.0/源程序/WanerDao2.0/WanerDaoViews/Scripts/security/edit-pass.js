/***********edit pass 1 begin*************/
function edit_pass_1_onload() {
    $(".accout_edit_form").validate({
        rules: {
            account: "required",
            password: {
                required: true,
                rangelength: [8, 20]
            }
        },
        messages: {
            account: wanerdaoLangTip('acc_00001'),
            password: {
                required: wanerdaoLangTip('acc_00002'),
                rangelength: wanerdaoLangTip('acc_00008')
            }
        },
        submitHandler: function (form) {
            edit_pass_1_valid_user();
        }
    });
    $("#account").focus();
}

function edit_pass_1_valid_user() {
    $('#nextstep').unnotice(1);
    $.ajax({
        url: "../editpass_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'editpassvaliduser',act:'" + $("#account").val() + "',pwd:'" + $("#password").val() + "'}",
        error: function (data) {
            $('#nextstep').notice(wanerdaoLangTip('common_00001'), 1);
        },
        success: function (data) {
            if (!data.result) {
                if (data.msg == "no") {
                   $('#nextstep').notice(wanerdaoLangTip('acc_00039'), 1);
                    location.href = "login.html";
                } else {
                    $('#nextstep').notice(data.msg, 1);
                }
            } else {
                $('.input_sub').notice(wanerdaoLangTip('acc_00040'), 2);
                location.href = "edit_pass_2.html";
            }
        }
    });
}

/************edit pass 2 begin****************/
function edit_pass_2_onload() {
    $("#pwd").focus();
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
                required: wanerdaoLangTip('acc_00002'),
                rangelength: jQuery.format(wanerdaoLangTip('acc_00008'))
            },
            repwd: {
                required: wanerdaoLangTip('acc_00011'),
                equalTo: wanerdaoLangTip('acc_00012')
            }
        }, submitHandler: function (form) {
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

    $("#btnUpdate").click(function () {
        if ($('.accout_edit_form').valid()) {
            edit_pass_2_modify(function () { });
        }
    });

    $("#btnUpdateToHome").click(function () {
        if ($('.accout_edit_form').valid()) {
            edit_pass_2_modify(function () {
                location.href = '/personal';
            });
        }
    });
}

function edit_pass_2_modify(fun) {
    $("#btnUpdate,#btnUpdateToHome").attr("disabled", true);
    $('#btnUpdate').unnotice(1);
    $.ajax({
        url: "../editpass_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'editpassmodifypass',password:'" + $("#pwd").val() + "'}",
        error: function (data) {
            $('#btnUpdate').notice(wanerdaoLangTip('common_00001'), 1);
            $('#btnUpdate,#btnUpdateToHome').removeAttr('disabled');
        },
        success: function (data) {
            if (!data.result) {
                $('#btnUpdate').notice(data.msg, 1);
                $("#btnUpdate,#btnUpdateToHome").removeAttr("disabled");
            } else {
                $('#btnUpdateToHome').notice(wanerdaoLangTip('acc_00038'), 2);
                fun();
            }
        }
    });
}