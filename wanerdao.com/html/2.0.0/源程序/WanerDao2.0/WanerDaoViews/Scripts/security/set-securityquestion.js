function set_security_1_onload() {
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
            set_security_1_valid_user();
        }
    });
}

function set_security_1_valid_user() {
    $('.input_sub').attr('disabled', 'disabled');
    $('.input_sub').unnotice(1);
    $.ajax({
        url: "../setsecurity_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setpwdprotectvaliduser',act:'" + $("#account").val() + "',pwd:'" + $("#password").val() + "'}",
        error: function (data) {
            $('.input_sub').notice(wanerdaoLangTip('common_00001'), 1);
            $('.input_sub').removeAttr('disabled');
        },
        success: function (data) {
            if (!data.result) {
                if (data.msg == "no") {
                    location.href = "login.html";
                } else {
                    $('.input_sub').notice(data.msg, 1);
                }
                $('.input_sub').removeAttr('disabled');
            } else {
                $('.input_sub').notice(wanerdaoLangTip('common_00010'), 2);
                location.href = "account_set_security_2.html";
            }
        }
    });
}

function set_security_2_onload() {
    $.ajax({
        url: "../setsecurity_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getallsecurityquestion'}",
        error: function (data) {
            $('.wait').htmlwanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (!data.result) {
                $('.wait').html(data.msg);
            } else {
                $.each(data.rows, function (index, obj) {
                    $('#sq1').append('<option value="' + obj.id + '">' + obj.question + '</option>');
                    $('#sq2').append('<option value="' + obj.id + '">' + obj.question + '</option>');
                    $('.wait').hide();
                    $('.accout_edit_form').show();
                });
            }
        }
    });

    $('#btnSave').click(function () {
        set_security_2_set_security(null);
    });
    $('#btnSaveAndBack').click(function () {
        set_security_2_set_security(function () {
            $('.tip').notice(wanerdaoLangTip('acc_00037'), 2);
            location.href = "/personal";
        });
    });
    $('#btnCancel').click(function () {
        $('#btnSave,#btnSaveAndBack,#btnCancel').attr('disabled', 'disabled');
        location.href = "/";
    });

    $('#an1').keyup(function () {
        set_security_2_check_an1();
    });

    $('#an2').keyup(function () {
        set_security_2_check_an2();
    });

    $('#sq2').change(function () {
        if ($('#sq1').val() != $('#sq2').val()) {
            $('#sq2').unerror();
        }
    });
}

function set_security_2_check_an1() {
    if (!$.trim($('#an1').val())) {
        $('#an1').error(wanerdaoLangTip('acc_00034'));
        $('#an1').focus();
        return false;
    }
    $('#an1').unerror();
    return true;
}

function set_security_2_check_an2() {
    if (!$.trim($('#an2').val())) {
        $('#an2').error(wanerdaoLangTip('acc_00035'));
        $('#an2').focus();
        return false;
    }
    $('#an2').unerror();
    return true;
}

function set_security_2_set_security(fun_success) {
    $('#sq2').unerror();
    $('.tip').unnotice(1);
    $('.tip').unnotice(2);
    if (!set_security_2_check_an1()) {
    } else if ($('#sq1').val() == $('#sq2').val()) {
        $('#sq2').error(wanerdaoLangTip('acc_00036'));
        $('#sq2').focus();
    } else if (!set_security_2_check_an2()) {
    } else {
        $('#btnSave,#btnSaveAndBack,#btnCancel').attr('disabled', 'disabled');
        $.ajax({
            url: "../setsecurity_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'setpwdprotectaddquestion',q1:'" + $("#sq1").val() + "',a1:'" + $("#an1").val() + "',q2:'" + $("#sq2").val() + "',a2:'" + $("#an2").val() + "'}",
            error: function (data) {
                $('.error').notice(wanerdaoLangTip('common_00001'), 1);
            },
            success: function (data) {
                if (!data.result) {
                    if (data.msg == 'no') {
                        location.href = 'login.html';
                    } else {
                        $('.error').notice(data.msg, 1);
                        $("#an1").val('');
                        $("#an2").val('');
                        $('#btnSave,#btnSaveAndBack,#btnCancel').removeAttr('disabled', 'disabled');
                    }
                } else {
                    if (fun_success) {
                        fun_success();
                    } else {
                        $('.tip').notice(wanerdaoLangTip('acc_00037'), 2);
                    }
                }
            }
        });
    }
}