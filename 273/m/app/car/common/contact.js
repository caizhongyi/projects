/**
 * m站询盘相关工具集合
 *
 * 依赖样式
 * -widget/luck/luck.css
 */
var $ = require('zepto');
var Luck = require('/widget/luck/luck.js');
var Toast = require('/app/car/toast.js');
var Plg  = require('/widget/plugin/plugin.js');

var Contact = {};

// 约定
// 手机input加上id="js_mobile"
// 弹窗关闭加上class="js_luck_close"
// 弹窗确认加上class="js_luck_ok"

var SuccessTpl = Plg.template('<div class="mod_pop_box1"><div class="tit"><a href="javascript:" class="i_close js_luck_close"></a></div><div class="con"><div class="pop_form"> <div class="tips-success"> <i class="i-success"><img src="data:image/png;base64,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" class="i-img"></i> <span class="txt">提交成功</span> <div class="pop_form_item"><div class="com_btn js_luck_close"><a href="javascript:" class="white short">关闭</a></div></div> </div> </div> </div> </div>', {});

var CallbackTpl = Plg.template('<div class="mod_pop_box1 mod_pop_box1_ex1"><div class="tit"><a href="javascript:" class="i_close js_luck_close"></a></div> <div class="con"> <div class="pop_form"> <div class="pop_form_item"><input class="input1" placeholder="请输入您的手机号" id="js_mobile"></div> <div class="pop_form_item"><div class="com_btn"><a href="javascript:" class="orange full js_luck_ok">30秒回拨给您</a></div></div> </div> </div> </div>', {});

var ReservationTpl = Plg.template('<div class="tit"><a href="javascript:" class="i_close js_luck_close"></a></div> <div class="con"> <div class="pop_form"> <div class="pop_form_item"><input class="input1" placeholder="请输入您的手机号" id="js_mobile"></div> <div class="pop_form_item"><textarea class="textarea1" id="js_content"></textarea></div> <div class="pop_form_item"><div class="com_btn"><a href="#" class="orange full js_luck_ok">提 交</a></div></div></div> </div>', {});

var DepreciateTpl = Plg.template('<div class="inner"><div class="popbox2_title"><a href="javascript:;" class="close2 js_luck_close"></a><i></i><span>我要砍价</span></div><div class="popbox2_content"><div class="popbox2_form"><p class="tips" style="display: none;"></p><p class="cor-888">请填写手机号，车辆降价我们会及时通知您。</p><p class="p_input"><span class="label">车价降到</span><span class="select-span2 short"><input type="text" id="js_price" class="pub-tel"></span><span class="other">万元，通知我。</span><span id="price_tip" class="error"></span></p><p class="p_input"><span class="label">手机号码</span><span class="select-span2"><input type="text" id="js_mobile" value="" class="pub-tel"></span><span id="mobile_tip" class="error"></span></p><p class="btn_box"><button class="btn btn-green js_luck_ok">提　交</button></p></div></div></div>', {});

// 关闭
$(document).on('click', '.js_luck_close', function() {
    Luck.close();
});

function isMobile(mobile) {
    return /^1[3-9]\d{9}$/.test(mobile);
}

var SUCCESS_TIP = '操作成功';
var FAIL_TIP    = '网络异常';

// 降价通知
Contact.depreciate = function(config) {
    var $el = config.$el;
    var data = {};
    $el.on('click', function() {
        Luck.open({
            type: 1,
            content: DepreciateTpl,
            extra_class: 'popbox2'
        });
        var $mobile  = $('#js_mobile');
        var $price   = $('#js_price');
        var carId    = $el.data('id');

        var defaultPrice = $el.data('price');
        var defaultMobile = $el.data('last-mobile');
        if (defaultPrice) {
            $price.val(defaultPrice);
        }
        if (defaultMobile) {
            $mobile.val(defaultMobile);
        }

        $('.js_luck_ok').on('click', function() {
            data.mobile  = $mobile.val();
            data.price   = $price.val();
            data.car_id  = carId;
            if (!isMobile(data.mobile)) {
                Toast('手机格式错误');
                return false;
            }

            // remember mobile
            $el.data('last-mobile', data.mobile);

            $.ajax({
                url: '/ajax/postdepreciate/index/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(ret) {
                    if (ret.code == 0) {
                        Toast(SUCCESS_TIP);
                        Luck.close();
                    } else{
                        Toast(FAIL_TIP);
                    }
                },
                error: function(ret) {
                    Toast(FAIL_TIP);
                }
            });
        });
    });
};

// 预约看车
Contact.reservation = function(config) {
    var $el = config.$el;
    var data = {};
    $el.on('click', function() {
        Luck.open({
            type: 1,
            content: ReservationTpl,
            extra_class: 'mod_pop_box1'
        });
        var $mobile  = $('#js_mobile');
        var $content = $('#js_content');
        var carId    = $el.data('id');
        $('.js_luck_ok').on('click', function() {
            data.mobile  = $mobile.val();
            data.content = $content.val();
            data.car_id  = carId;
            if (!isMobile($mobile.val())) {
                Toast('手机格式错误');
                return false;
            }
            $.ajax({
                url: '/ajax/postreservation/index/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(ret) {
                    if (ret.code == 0) {
                        Toast(SUCCESS_TIP);
                        Luck.close();
                    }
                },
                error: function(ret) {
                    Toast(FAIL_TIP);
                }
            });
        });
    });
};

// 回拨电话 @TODO 倒计时完善
Contact.callback = function(config) {
    var $el = config.$el;
    var data = {};
    $el.on('click', function() {
        Luck.open({
            type: 1,
            content: CallbackTpl
        });
        var $mobile  = $('#js_mobile');
        var carId    = $el.data('id');
        $('.js_luck_ok').on('click', function() {
            data.mobile  = $mobile.val();
            data.car_id  = carId;
            if (!isMobile($mobile.val())) {
                Toast('手机格式错误');
                return false;
            }
            $.ajax({
                url: '/ajax/postcallback/index/',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(ret) {
                    if (ret.code != 0) {
                        Toast('网络异常');
                    }
                },
                error: function(ret) {
                    Toast('网络异常');
                }
            });
        });
    });
};


module.exports = Contact;

