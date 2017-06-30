/**
 * 举报车源
 *
 * @version v4.0
 */
var $ = require('jquery');
var Luck = require('/widget/luck/luck.js');
var Base = require('./base.js');
var ContentTpl = require('./complaint.tpl');
var ContentNextTpl = require('./complaint-next.tpl');
var SuccessTpl = require('./success.tpl');
var CountDown = require('/widget/countdown/js/countdown.js');
var ERROR_CLASS = 'mod-form-item-ex-error';
var FRIENDLY_TIP = '网站系统繁忙，请稍后再试';
var TIME = 5;

module.exports = function (carId) {
    var dialog = Luck.open({
        'title': '举报',
        'content': ContentTpl({random: Math.random()}),
        'width': '460px',
        'extra_class': 'mod-pop-ex-report'
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
        var $code  = $('#js_code');
        var $note  = $('#js_note');

        data.code = $code.val();
        data.note = $note.val();
        data.car_id = carId;

        var $items = $('#js_items').find('li');
        var items = [];
        $items.each(function() {
            var $checkbox = $(this).find('input');
            if ($checkbox.is(':checked')) {
                items.push($checkbox.val());
            }
        });
        data.items = items;

        $.ajax({
            url: '/ajax/captcha/check/',
            type: 'get',
            dataType: 'json',
            data: data
        }).done(function (ret) {
            if (ret.code == 0) {
                $dialog.find('.bd').html(ContentNextTpl([]));
                var $mobile = $('#js_mobile');
                new CountDown('#js_sms_code_send', {
                    auto    : false,
                    time    : '0:00:10' ,
                    format  : '重新发送（ss秒）',
                    beforeCallback: function() {
                        data.mobile = $mobile.val();
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
                    var $mobile = $('#js_mobile');
                    var $smsCode = $('#js_sms_code');

                    data.mobile = $mobile.val();
                    data.sms_code = $smsCode.val();
                    if (!Base.isMobile(data.mobile)) {
                        $mobile.parent('div').addClass(ERROR_CLASS);
                        return false;
                    }
                    if (!Base.isNum(data.sms_code)) {
                        $smsCode.parent('div').addClass(ERROR_CLASS);
                        return;
                    }
                    $.ajax({
                        url: '/ajax/postcomplaint/index/',
                        type: 'post',
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

