//*******find_acc_1 begin
function find_acc_1_onload() {
    $('#email').bind('blur keyup', function () {
        next_1_checkemail();
    });
    $('#email').keydown(function (e) {
        if (e.keyCode == '13') {
            next_1_click();
        }
    });
    $('#next1').click(function () {
        next_1_click();
    });
}

//check security email 
function next_1_checkemail() {
    if (!$.trim($('#email').val())) {
        $('#email').error(wanerdaoLangTip('acc_00032'));
    } else if (!$('#email').exist_mail()) {
        $('#email').error(wanerdaoLangTip('acc_00033'));
    } else {
        $('#email').unerror();
        return true;
    }
    return false;
}

function next_1_click() {
    if (next_1_checkemail()) {
        $('#next1').attr('disabled', true);
        $('#next1').unnotice(1);
        //checkaccountexist
        $.ajax({
            url: "../wanerdao_personsecurity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'checksecurityemialisexist',semail:'" + $.trim($("#email").val()) + "'}",
            error: function (data) {
                $('#next1').notice(wanerdaoLangTip('common_00001'), 1);
                $('#next1').removeAttr('disabled');
            },
            success: function (data) {
                if (!data.result) {
                    if (data.msg == "3") {
                        location.href = "/";
                    } else {
                        $('#next1').notice(data.msg, 1);
                        $('#next1').removeAttr('disabled');
                    }
                } else {
                    $('#next1').notice(wanerdaoLangTip('acc_00041'), 2);
                    location.href = "find_account_2.html";
                }
            }
        });
    }
}


////*******find _acc_2 begin
function find_acc_2_onload() {
    $.ajax({
        url: "../wanerdao_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'findaccgetsecurityquestion'}",
        error: function (data) {
            $('wait').html(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (!data.result) {
                $('#wait').html(data.msg);
            } else {
                if (data.total == 0) {
                    $("#wait").html(wanerdaoLangTip('acc_00042'));
                } else {
                    $("#question1").html(data.rows[0].question);
                    $("#answer1").attr("qid", data.rows[0].id);
                    $("#question2").html(data.rows[1].question);
                    $("#answer2").attr("qid", data.rows[1].id);
                    $("#wait").hide();
                    $("#accout_edit_form").show();
                }
            }
        }
    });

    $("#answer1").bind("blur keyup", function () {
        find_acc_2_valid_an1()
    });

    $("#answer2").bind("blur keyup", function () {
        find_acc_2_valid_an2()
    });

    $("#nextstep").click(function () {
        if (find_acc_2_valid_an1() && find_acc_2_valid_an2()) {
            $(".input_sub").unnotice(1);
            $.ajax({
                url: "../wanerdao_personsecurity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'findaccvalidsecurityquesion',an1:'" + $("#answer1").val() + "',an2:'" + $("#answer2").val() + "'}",
                error: function (data) {
                    $(".input_sub").notice(wanerdaoLangTip('common_00001'), 1);
                    $(".input_sub").removeAttr('disabled');
                },
                success: function (data) {
                    if (!data.result) {
                        $(".input_sub").notice(data.msg, 1);
                    } else {
                        $(".input_sub").notice(wanerdaoLangTip('acc_00043'), 2);
                        window.location = "find_account_3.html";
                    }
                }
            });
        }
    });
}

function find_acc_2_valid_an1() {
    if (!$.trim($("#answer1").val())) {
        $("#answer1").error(wanerdaoLangTip('acc_00034'));
        $("#answer1").focus();
        return false;
    }
    $("#answer1").unerror();
    return true;
}

function find_acc_2_valid_an2() {
    if (!$.trim($("#answer2").val())) {
        $("#answer2").error(wanerdaoLangTip('acc_00035'));
        $("#answer2").focus();
        return false;
    }
    $("#answer2").unerror();
    return true;
}

var f_acc_3 = false;

////*******find_acc_3 begin
function find_acc_3_onload() {
    GetSecurityEmail();

    $("#btnSendAgain").click(function () {
        if (f_acc_3 == false) {
            $('.tip').unnotice(1);
            $.ajax({
                url: "../wanerdao_personsecurity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'findaccsendaccagain'}",
                error: function (data) {
                    $('.tip').notice(wanerdaoLangTip('common_00001'), 1);
                },
                success: function (data) {
                    if (!data.result) {
                        $('.tip').notice(data.msg, 1);
                    } else {
                        alert(wanerdaoLangTip('acc_00044'));
                    }
                }
            });
        }
    });
    $("#btnLogin").click(function () { window.location = '/'; });
}

//check if valid security email
function GetSecurityEmail() {
    //findaccgetsecurityemail
    $.ajax({
        url: "../wanerdao_personsecurity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'findaccgetsecurityemail'}",
        error: function (data) {
            $("#wait").html(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (!data.result) {
                $("#wait").html(data.msg);
            } else {
                var mail = data.msg;
                $(".displayemail").html(mail);
                mail = "http://mail." + mail.substring(mail.indexOf("@") + 1, mail.length);
                $(".tomail").attr("href", mail);
                $(".tomail").attr("target", "_blank");
                $("#wait").hide();
                $(".accout_edit_form").show();
            }
        }
    });
}