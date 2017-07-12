function set_security_1_onload() {
    $("#accout_edit_form").validate({
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
    $('.nextstep').attr('disabled', 'disabled');
    $('.nextstep').unnotice(1);
    $.ajax({
        url: "../setsecurity_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setpwdprotectvaliduser',act:'" + $("#account").val() + "',pwd:'" + $("#password").val() + "'}",
        error: function (data) {
            $('.nextstep').notice(wanerdaoLangTip('common_00001'), 1);
            $('.nextstep').removeAttr('disabled');
        },
        success: function (data) {
            if (!data.result) {
                if (data.msg == "no") {
                    location.href = "login.html";
                } else {
                    $('.nextstep').notice(data.msg, 1);
                }
                $('.nextstep').removeAttr('disabled');
            } else {
                $('.nextstep').notice(wanerdaoLangTip('common_00010'), 2);
                location.href = "account_set_security_2.html";
            }
        }
    });
}

/*step 2*/
function set_security_2_onload() {
    $.ajax({
        url: "../setsecurity_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getallsecurityquestion'}",
        error: function (data) {
            $('.wait').html(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (!data.result) {
                $('.wait').html(data.msg);
            } else {
                $('#sq1').append('<option value="">' + wanerdaoLangTip('common_00006') + '</option>');
                $('#sq2').append('<option value="">' + wanerdaoLangTip('common_00006') + '</option>');
                $.each(data.rows, function (index, obj) {
                    $('#sq1').append('<option value="' + obj.id + '">' + obj.question + '</option>');
                    $('#sq2').append('<option value="' + obj.id + '">' + obj.question + '</option>');
                    $('.wait').hide();
                    $('.accout_edit_form').show();
                });
                $('select').chosen();
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

function set_security_2_check_sq() {
    var result = true;
    $('#vsql1').unerror();
    $('#vsql2').unerror();
    if (!$('#sq1').val()) {
        $('#vsql1').error(wanerdaoLangTip('acc_00047'));
        result = false;
    }

    if (!$('#sq2').val()) {
        $('#vsql2').error(wanerdaoLangTip('acc_00047'));
        result = false;
    }

    return result;
}

function set_security_2_set_security(fun_success) {
    $('#vsql2').unerror();
    $('#btnSave').unnotice(1);
    $('#btnSave').unnotice(2);
    if (!set_security_2_check_sq()) {

    }
    else if (!set_security_2_check_an1()) {
    } else if ($('#sq1').val() == $('#sq2').val()) {
        $('#vsql2').error(wanerdaoLangTip('acc_00036'));
        return false;
    } else if (!set_security_2_check_an2()) {
    } else {
        $('#btnSave,#btnSaveAndBack').attr('disabled', 'disabled');
        $.ajax({
            url: "../setsecurity_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'setpwdprotectaddquestion',q1:'" + $("#sq1").val() + "',a1:'" + $("#an1").val() + "',q2:'" + $("#sq2").val() + "',a2:'" + $("#an2").val() + "'}",
            error: function (data) {
                $('#btnSave').notice(wanerdaoLangTip('common_00001'), 1);
            },
            success: function (data) {
                if (!data.result) {
                    if (data.msg == 'no') {
                        location.href = 'login.html';
                    } else {
                        $('#btnSave').notice(data.msg, 1);
                        $("#an1").val('');
                        $("#an2").val('');
                        $('#btnSave,#btnSaveAndBack').removeAttr('disabled', 'disabled');
                    }
                } else {
                    if (fun_success) {
                        fun_success();
                    } else {
                        $('#btnCancel').notice(wanerdaoLangTip('acc_00037'), 2);
                    }
                }
            }
        });
    }
}