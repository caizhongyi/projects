/**
 * 预约看车
 *
 * @version v4.0
 */
var $ = require('jquery');
var Luck = require('/widget/luck/luck.js');
var Base = require('./base.js');
var ContentTpl = require('./reservation.tpl');
var SuccessTpl = require('./success.tpl');
var ERROR_CLASS = 'mod-form-item-ex-error';
var FRIENDLY_TIP = '网站系统繁忙，请稍后再试';
var TIME = 5;

module.exports = function (carId) {
    var dialog = Luck.open({
        'title': '预约看车',
        'content': ContentTpl({random: Math.random()}),
        'width': '460px',
        'extra_class': 'mod-pop-ex-look'
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
        $('#js_code_change').trigger('click');
        var data = {};
        var $mobile = $('#js_mobile');
        var $content = $('#js_content');
        data.mobile = $mobile.val();
        data.content = $content.val();
        data.car_id = carId;

        if (!Base.isMobile(data.mobile)) {
            $mobile.parent('div').addClass(ERROR_CLASS);
            return false;
        }
        $.ajax({
            url: '/ajax/postreservation/index/',
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
                        $('#js_code_change').trigger('click');
                    } else {
                        TIME--;
                        $('#js_luck_time').text(TIME);
                    }
                }, 1000);
            } else {
                alert(FRIENDLY_TIP);
            }
        }).fail(function (ret) {
            alert(FRIENDLY_TIP);
        });
    });
};

