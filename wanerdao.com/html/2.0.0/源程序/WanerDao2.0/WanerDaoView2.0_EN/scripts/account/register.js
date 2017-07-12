$.metadata.setType("attr", "validate");

$(document).ready(function () {
    var email = getQueryString('email');
    var tname = getQueryString('truename');
    var sex = getQueryString('sex');
    var b_y = getQueryString('b_y');
    var b_m = getQueryString('b_m');
    var b_d = getQueryString('b_d');

    if (email)
        $('#email').val(email);

    if (tname)
        $('#truename').val(tname);

    if (sex) {
        $('#reg_sex').val(sex).chosen();
    }

    bindSelect();
    if (b_y) {
        $('#year').val(b_y);
        var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
        $('#day').empty();
        for (i = 1; i <= lastDay; i++) {
            $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
        }

        if (b_m) {
            $('#month').val(b_m);
            var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
            $('#day').empty();
            for (i = 1; i <= lastDay; i++) {
                $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
            }

            if (b_d) {
                $('#day').val(b_d);
            }
        }
        $('select').chosen();
    }

    $("#pwd").pstrength({
        'displayMinChar': true,
        'minChar': 8,
        'minCharText': '',
        'colors': ["#f00", "#c06", "#f60", "#3c0", "#3f0"],
        'scores': [20, 40, 50, 65],
        'verdicts': ['很不安全', '不安全', '一般', '安全', '非常安全'],
        'raisePower': 1.4
    });

    $("#accout_edit_form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            pwd: {
                required: true,
                rangelength: [8, 20]
            },
            repwd: {
                required: true,
                equalTo: "#pwd"
            },
            truename: "required",
            reg_sex:"required"

        }, messages: {
            email: {
                required: wanerdaoLangTip('acc_00009'),
                email: wanerdaoLangTip('acc_00010')
            },
            pwd: {
                required: wanerdaoLangTip('acc_00002'),
                rangelength: jQuery.format(wanerdaoLangTip('acc_00008'))
            },
            repwd: {
                required: wanerdaoLangTip('acc_00011'),
                equalTo: wanerdaoLangTip('acc_00012')
            },
            truename: wanerdaoLangTip('acc_00017'),
            reg_sex: wanerdaoLangTip('acc_00046')

        }, submitHandler: function (form) {
            if ($("#iQapTcha").val()) {
                alert(wanerdaoLangTip('acc_00031'));
            }
            else {
                PersonRegister($("#email").val(), $("#pwd").val(), $("#truename").val(), $("#reg_sex").val(), $("#year").val(),
            $("#month").val(), $("#day").val(), $("#iQapTcha").val(), $("#btnRegister"));
            }
        }
    });

    $("#btnRegister").click(function () {
        $("#accout_edit_form").submit();
        return false;
    });

    $("#email, #pwd, #repwd,#truename").bind("keydown", function (event) {
        if (event.keyCode == "13") {
            $("#accout_edit_form").valid();
        }
    });
    $("#email").focus(function () {
        $(this).parent().find(".validemail").css("display", "none");
    });
    $("#email").blur(function () {
        if ($(this).valid()) {
            if ($(this).parent().find(".validemail").length == 0) {
                $(this).parent().append('<label class="validemail" style="display:inline;"></label>');
            }
            $(this).parent().find(".validemail").css("display", "inline").html(wanerdaoLangTip('acc_00016'));

            $.ajax({
                url: "../wanerdao_personsecurity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'checkaccountexist',account:'" + $("#email").val() + "'}",
                error: function () {
                    $("#email").parent().find(".validemail").css("color", "#f00").html(wanerdaoLangTip('common_00001'));
                },
                success: function (data) {
                    if (data.result) {
                        $("#email").parent().find(".validemail").css("color", "#f00").html(data.msg);
                    } else {
                        $("#email").parent().find(".validemail").css("color", "#000").html(data.msg);
                    }
                }
            });
        }
    });
    $("#email").focus();
});

///注册///
function PersonRegister(usermail, userpass, username, usersex, useryear, usermonth, userday, iQapTcha, btn) {
    btn.unnotice(1);
    btn.attr('disabled', true);
    $.ajax({
        url: "../wanerdao_registered.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'register',usermail:'" + usermail + "',userpass:'" + userpass + "',username:'" + username + "',usersex:'" + usersex + "',useryear:'" + useryear + "',usermonth:'" + usermonth + "',userday:'" + userday + "',iQapTcha:'" + iQapTcha + "'}",
        error: function () {
            btn.removeAttr("disabled");
            alert(wanerdaoLangTip('common_00001'));
        },
        success: function (data) {
            if (data.result) {
                btn.notice(data.msg, 2);
                location.href = '/personal';
            } else {
                btn.notice(data.msg, 1);
                btn.removeAttr("disabled");
            }
        }
    });
}



/* bind selelct */
function bindSelect() {
    var date = new Date();
    for (i = date.getFullYear(); i >= date.getFullYear() - 99; i--) {
        $('#year').append($wd.format('<option value="{0}">{0}</option>', i));
    }
    for (i = 1; i <= 12; i++) {
        $('#month').append($wd.format('<option value="{0}">{0}</option>', i));
    }

    var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
    for (i = 1; i <= lastDay; i++) {
        $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
    }
    $('select').chosen();
    $('#year').change(function () { $('#month').val('1'); $('#month').chosen(); });

    $('#year, #month').change(function () {
        $('#day').empty();
        var lastDay = new Date($('#year').val(), $('#month').val(), 0).getDate();
        for (i = 1; i <= lastDay; i++) {
            $('#day').append($wd.format('<option value="{0}">{0}</option>', i));
        }
        $('#day').chosen();
    });
}