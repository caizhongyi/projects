var $ = require('jquery');

var mobileReg = /^1[3-9]\d{9}$/,
    emailReg  = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

exports.init = function(urls) {
    $('.auto_login').find('b').click(function() {
        $(this).toggleClass('on');
        $(this).hasClass('on') ? $('input[name="auto_login"]').val(1) : $('input[name="auto_login"]').val(0);
    });

    inputError();
    loging(urls.login);
};

//错误提示
var inputError = function() {
    $('form.login').find('input').on({
        'focusin': function(e) {
            if ($(this).hasClass('input_error')) {
                var data = $(this).data('value');
                //防止清空正确格式的手机号
                if ($(this).attr('name') == 'username' && (mobileReg.test(data) || emailReg.test(data))) {
                    $(this).val(data);
                } else {
                    $(this).val('');
                }
                $(this).removeClass('input_error');
            }
        },
        'keydown': function(e) {
            //回车触发提交
            if (e.keyCode == 13) {
                $('form.login').find('[data-type="submit"]').click();
            }
        }
    });
};

//表单提交
var loging = function(loginUrl) {
    $('[data-type="submit"]').on('click', function() {
        var $username = $('form.login').find('input[name="username"]'),
            $password = $('form.login').find('input[name="password"]'),
            noLoging = false,
            _that = $(this),
            isSendding = false;

        if (!mobileReg.test($username.val()) && !emailReg.test($username.val())) {
            $username.val($username.data('error'));
            $username.addClass('input_error');
            noLoging = true;
        }

        if ($password.val() == $password.data('value') || !$password.val()) {
            $password.addClass('input_error');
            noLoging = true;
        }

        if(noLoging || isSendding) {
            return ;
        }
        isSendding = true;
        _that.text('登陆中……');
        $.ajax({
            url: loginUrl,
            type: 'POST',
            dataType: 'json',
            data: $('form.login').serialize(),
            success: function(response) {
                if(response.code == 0) {
                    var synLogins = '';
                    for(var i = 0; i < response.body.length; i++) {
                        synLogins += '<script src="'+response.body[i]+'" reload=1></script>';
                    }
                    $('body').append(synLogins);
                    setTimeout(function(){
                        location.href = $('form.login .login_form').data('tourl');
                    }, 3000);
                } else {
                    switch (parseInt(response.code)) {
                        case 10060005: //用户名或密码错误
                            $username.data('value', $username.val()).val(response.error).addClass('input_error');
                            $password.addClass('input_error');
                            break;
                        case 10060006: //账号审核中
                            $username.data('value', $username.val());
                            $username.val(response.error);
                            $username.addClass('input_error');
                            break;
                        default:
                            alert(response.error);
                            break;
                    }
                    isSendding = false;
                    _that.text('登陆');
                }
            }
        });
    });
};