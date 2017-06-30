/**
 * 我要出价（降价通知）
 *
 * @version v4.0
 */
var $ = require('jquery');
var Luck = require('/widget/luck/luck.js');
var Base = require('./base.js');
var ContentTpl = require('./depreciate.tpl');
var ContentNextTpl = require('./depreciate-next.tpl');
var SuccessTpl = require('./success.tpl');
var CountDown = require('/widget/countdown/js/countdown.js');
var ERROR_CLASS = 'mod-form-item-ex-error';
var FRIENDLY_TIP = '网站系统繁忙，请稍后再试';
var TIME = 5;

module.exports = function (carId, btnColor) {
    if (btnColor == undefined) {
        btnColor = 'red';
    }
    var dialog = Luck.open({
        'title': '我要砍价',
        'content': ContentTpl({random: Math.random(), btn_color: btnColor}),
        'width': '460px',
        'extra_class': 'mod-pop-ex-price'
    });

    var $dialog = $(dialog);
    $dialog.find('input').on('focus', function () {
        $(this).parent('div').removeClass(ERROR_CLASS);
    });
    $('#js_code_change').on('click', function() {
        var src ='/ajax/captcha/get';
        $(this).attr('src', src + '?' + Math.random());
    });

    $('#js_luck_ok').on('click', function () {
        var data = {};
        var $price = $('#js_price');
        var $mobile = $('#js_mobile');
        var $code  = $('#js_code');

        data.price = $price.val();
        data.mobile = $mobile.val();
        data.code = $code.val();
        data.car_id = carId;

        if (!Base.isNum(data.price)) {
            $price.parent('div').addClass(ERROR_CLASS);
            return false;
        }

        if (!Base.isMobile(data.mobile)) {
            $mobile.parent('div').addClass(ERROR_CLASS);
            return false;
        }

        $.ajax({
            url: '/ajax/captcha/check/',
            type: 'get',
            dataType: 'json',
            data: data
        }).done(function (ret) {
            if (ret.code == 0) {
                $dialog.find('.bd').html(ContentNextTpl({btn_color: btnColor}));
                new CountDown('#js_sms_code_send', {
                    auto    : true,
                    time    : '0:00:60' ,
                    format  : '重新发送（ss秒）',
                    beforeCallback: function() {
                        $.ajax({
                            url: '/ajax/smscode/get/',
                            type: 'get',
                            dataType: 'json',
                            data: data
                        }).done(function(ret) {

                        }).fail(function(ret) {

                        });
                    },
                    afterCallback: function() {
                        $('#js_sms_code_send').html('重新发送');
                    }
                });
                $('#js_luck_ok_2').on('click', function() {
                    var $smsCode = $('#js_sms_code');
                    data.sms_code = $smsCode.val();
                    if (!Base.isNum(data.sms_code)) {
                        $smsCode.parent('div').addClass(ERROR_CLASS);
                        return;
                    }
                    $.ajax({
                        url: '/ajax/postdepreciate/index/',
                        type: 'get',
                        dataType: 'json',
                        data: data
                    }).done(function(ret) {
                        if (ret.code == 0) {
                            $dialog.find('.bd').html(SuccessTpl({time: TIME}));
                            // 定时关闭
                            var timer = setInterval(function () {
                                if (TIME == 0) {
                                    clearInterval(timer);
                                    Luck.close();
                                } else {
                                    TIME--;
                                    $('#js_luck_time').text(TIME);
                                }
                            }, 1000);
                        } else {
                            console && console.log(ret);
                            $smsCode.parent('div').addClass(ERROR_CLASS);
                        }
                    }).fail(function(ret) {

                    });
                });
            } else {
                $code.parent('div').addClass(ERROR_CLASS);
            }
        }).fail(function (ret) {
            alert(FRIENDLY_TIP);
        });
    });
};

