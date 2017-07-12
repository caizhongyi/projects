
$(function () {
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
            Login(Trim($("#account").val()), Trim($("#password").val()), $("#autoLogin").attr("checked"));
        }
    });
    $("#account").focus();
    $('.input_sub').click(function () {
        $(".accout_edit_form").submit();
    });

    $('#account,#password,#autoLogin').keydown(function (e) {
        if (e.keyCode == '13') {
            $(".accout_edit_form").submit();
        }
    });
});

function Login(account, pwd, issave) {
    $('.input_sub').attr('disabled', 'disabled');
    $('.input_sub').unnotice(1);
    var issl = 0;
    if (issave) {
        issl = 1;
    }
    $.ajax({
        url: "../wanerdao_login.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'login',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}",
        error: function (data) {
            alert(wanerdaoLangTip('common_00001'));
            $('.input_sub').removeAttr("disabled");
        },
        success: function (data) {
            if (data.result) {
                $('.input_sub').notice(wanerdaoLangTip('acc_00005'), 2);
                var url = getQueryString('url');
                if (url) {
                    window.location.href = unescape(url);
                } else {
                    window.location.href = "/personal";
                }
            }
            else {
                $('.input_sub').notice(data.msg, 1);
                $('.input_sub').removeAttr("disabled");
            }
        }
    });
}