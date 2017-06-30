/**
 * @desc        详情页降价通知工具
 * @author      daiyuancheng<daiyc@273.cn>
 * @date        2014-4-3
 */
var $ = require('zepto');
var Widget = require('app/car/common/widget.js');
var Common = require('app/car/common/common.js');
var Log = require('widget/log/js/log.js');
require('widget/map/js/overlay.js');

var DEFAULT_TPL =
    '<div id="appointment-dialog" class="mod_pop_box1" style="z-index:99999; position: absolute; top: 25%;">' +
    '<div class="tit"><a href="#" class="i_close js_close"></a></div>' +
    '<div class="con">'+
    '<div class="pop_form">'+
    '<div class="popbox2_form">'+
    '<p class="tips" style="display: none;"></p>'+
    '<p class="pop_form_item"><span class="select-span2"><input placeholder="请输入手机号码" type="number" id="js_demobile" value="<%=mobileTip%>" class="input1"></span><span id="mobile_tip" class="error"></span></p>'+
    '<p class="pop_form_item"><span class="select-span2 short"><textarea maxlength="100" placeholder="请填写您的预约要求，如看车时间为11月5日下午3点" name="" id="js_demand" class="textarea1"></textarea></span><span id="demand_tip" class="error"></span></p>'+
    '<p class="com_btn">'+
    '<a class="orange full" id="Appointment_submit">提　交</a>'+
    '</p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';

var SUCCESS_CONTENT = '<div class="tips-success">\
    <i class="i-success"><img src="http://sta.273.com.cn/app/wap_v2/theme/success_tips_icon.png" class="i-img"></i>\
    <span class="txt">提交成功</span>\
    <div class="pop_form_item"><div class="com_btn"><a href="#" class="white short js_close">关闭</a></div></div>\
</div>';
var FAIL_CONTENT = '提交失败了，请返回重试。';
var BTN_YES = '确　定';
var BTN_SUBMIT = '提　交';
var BTN_RETRY = '返回重试';

var Appointment = function (options) {
    if (!(this instanceof Appointment)) return new Appointment(config);
    this.init(options);
};

Appointment.defaults = {};

var proto = Appointment.prototype = {};

proto.constructor = Appointment;

proto.init = function (options) {
    if (!options) {
        throw new Error('配置信息为空');
    }

    if (!options.$el) {
        throw new Error('$el为空');
    }

    this.config = $.extend({data : options.$el.data()}, Appointment.defaults, options);

    this.$content = $(Widget.template(DEFAULT_TPL, {demandTip: this.config.data.demand, mobileTip: this.config.data.mobile}));
    this.$demand = this.$content.find('#js_demand');
    this.$demandTip = this.$content.find('#demand_tip');
    this.$mobile = this.$content.find('#js_demobile');
    this.$mobileTip = this.$content.find('#mobile_tip');
    this.$demand = this.$content.find('#js_demand');
    options.$el.on('click', $.proxy(this._initBox, this)).click();

    return this;
};

proto._initBox = function() {
    this._createDialog(this.$content);
    var me = this;
    var $content = this.$content;
    this.$demand.on('focus', function(e) {
        me.clearTipInfo();
        focusFunction();
    }).on('blur', function(e) {
        blurFunction();
    });

    this.$mobile.on('focus', function(e) {
        me.clearTipInfo();
        focusFunction();
    }).on('blur', function(e) {
       // me._checkMobile();
        blurFunction();
    });

    //iphone 现输入键盘时的兼容性代码
    function focusFunction() {
        $(window).off('orientationchange.focus').on('orientationchange.focus', function() {
            setTimeout(function () {
                me.$mobile.blur();
                me.$demand.blur();
            }, 400);
        });
        $('.overlay').height($(document).height());
    }

    function blurFunction() {
        $(window).off('orientationchange.focus');
    }

    var $submit  = $content.find('#Appointment_submit'),
    isSended = false;

    $submit.on('click', function(e) {
        if ($submit.html() == BTN_SUBMIT) {
            //数据提交
            if (!isSended && me._checkForm()) {
                // 手动发送统计日志
                var eqslog = '/wap_detail@etype=click@name=submit_watching_reservation';
                Log.trackEventByEqslog(eqslog, $(this), 'click');
                isSended = true;
                $submit.addClass('btn-gray');
                $submit.html('正在提交');
                $.ajax({
                    url : 'http://m.273.cn/ajax.php?module=watching_reservation',
                    data : {
                        mobile : me.$mobile.val(),
                        demand  : me.$demand.val(),
                        car_id : me.config.data.carid,
                        car_url : me.config.data.carurl,
                        source : 3		//预约看车source为3，来源：0(主站)，1(m站)，2（主站app），3（m站预约看车），4（m站电话回拨）
                    },
                    dataType : 'jsonp',
                    jsonp : 'jsonp',
                    success:function(result){
                        $submit.removeClass('btn-gray');
                        isSended = false;
                        if (result.error == 0) {
                            $content.find('.popbox2_form .tips').siblings().hide();
                            $content.find('.popbox2_form .tips').html(SUCCESS_CONTENT).show();
                            $submit.parent().show();
                            $submit.html(BTN_YES).addClass('js_close').hide();
                        } else {
                            $content.find('.popbox2_form .tips').siblings().hide();
                            $content.find('.popbox2_form .tips').html(FAIL_CONTENT).show();
                            $submit.parent().show();
                            $submit.html(BTN_RETRY);
                        }
                    },
                    error:function(result){
                        $submit.removeClass('btn-gray');
                        isSended = false;
                        $content.find('.popbox2_form .tips').siblings().hide();
                        $content.find('.popbox2_form .tips').html(FAIL_CONTENT).show();
                        $submit.parent().show();
                        $submit.html(BTN_RETRY);
                    }
                });
            } else {
                return false;
            }
        } else if ($submit.html() == BTN_RETRY) {
            $content.find('.popbox2_form .tips').html('').hide();
            $content.find('.popbox2_form .tips').siblings().show();
            $submit.html(BTN_SUBMIT).show();
        }
    });
};

proto._createDialog = function($content) {
    this.config.$el.overlay({
        effect: 'none',
        opacity: 0.8,
        closeOnClick: true,
        glossy:true,
        closeBtn:'.js_close',
        onShow: function() {
            var $dialog = $('#appointment-dialog');
            if ($dialog.length) {
                $dialog.show();
            } else {
                $dialog = $content;
                $('body').append($content);
            }
            dialogPostion($dialog);
         },
        onHide: function() {
            $('#appointment-dialog').hide();
        },
    });
    $('.overlay,#appointment-dialog').on("touchmove", function(e) {
        e.preventDefault();
    });
};

function dialogPostion( $dialog ){
    $dialog.css('top', $(window).scrollTop() + 100 )
}
$(window).resize(function(){
    dialogPostion($('#telphone-dialog'));
})

//验证表单
proto._checkForm = function() {
    return this._checkMobile();
};

//手机号验证
proto._checkMobile = function() {
    var mobile = $.trim(this.$mobile.val());
    if (mobile) {
        if (Common.isPhone(mobile)) {
            return true;
        }else {
            this.$mobileTip.html('*请输入正确的手机号');
        }
    } else {
        this.$mobileTip.html('*手机号必填');
    }
    return false;
};

proto.clearTipInfo = function(){
    this.$mobileTip.html('');
    return this;
}

module.exports = Appointment;
