/**
 * 免费发送车源信息到手机
 *
 * @version v4.0
 */
var $ = require('jquery');
var Luck = require('/widget/luck/luck.js');
var Base = require('./base.js');
var ContentTpl = require('./send.tpl');
var SuccessTpl = require('./send-success.tpl');
var ERROR_CLASS = 'mod-form-item-ex-error';
var FRIENDLY_TIP = '网站系统繁忙，请稍后再试';
var TIME = 5;
// car property
var carId = $('input[name="js_car_id"]').val();
var price = $('input[name="js_price"]').val();
var title = $('input[name="js_title"]').val();
var kilometer = $('input[name="js_kilometer"]').val();
var cardTime = $('input[name="js_card_time"]').val();
var telephone = $('input[name="js_telephone"]').val();

module.exports = function () {
    var dialog = Luck.open({
        'title': '免费发送到手机',
        'content': ContentTpl({
            title: title,
            kilometer: kilometer,
            price: price,
            card_time: cardTime,
            car_id: carId,
            telephone: telephone,
            random: Math.random()
        }),
        'width': '676px',
        'extra_class': 'mod-pop-ex-send'
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
        var $mobile = $('#js_mobile');
        var $code = $('#js_code');
        data.mobile = $mobile.val();
        data.code = $code.val();
        data.car_id = carId;
        data.telephone = telephone;
        if (!Base.isMobile(data.mobile)) {
            $mobile.parent('div').addClass(ERROR_CLASS);
            return false;
        }
        $.ajax({
            url: '/ajax/postsendcarinfo/index/',
            type: 'post',
            dataType: 'json',
            data: data
        }).done(function (ret) {
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
            } else if (ret.code == 2) {
                alert('验证错误');
            } else {
                alert(FRIENDLY_TIP);
            }
        }).fail(function (ret) {
            alert(FRIENDLY_TIP);
        });
    });
};

