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
    '<div id="telphone-dialog" class="mod_pop_box1" style="z-index:99999; position: absolute; transition: all 0.2s ease; ">' +
    '<div class="tit"><a href="#" class="i_close js_close"></a></div>' +
    '<div class="con">'+
    '<div class="pop_form">'+
    '<p class="tips" style="display: none; text-align: center;"></p>'+
    '<p class="pop_form_item"><span class="select-span2"><input placeholder="请输入手机号码" type="number" id="js_demobile" value="<%=mobileTip%>" class="input1"></span><span id="mobile_tip" class="error"></span></p>'+
    '<div class="com_btn">'+
    '<a class="orange full" id="telphone_submit">30秒回拨给您</a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';

var SUCCESS_CONTENT = '已经发送请求，请注意接听来电！';
var FAIL_CONTENT = '提交失败了，请返回重试。';
var BTN_YES = '确　定';
var BTN_SUBMIT = '提　交';
var BTN_RETRY = '返回重试';
var BTN_DIAL_BACK = '30秒回拨给您';

var telphone = function (options) {
    if (!(this instanceof telphone)) return new telphone(config);
    this.init(options);
};

telphone.defaults = {};

var proto = telphone.prototype = {};

proto.constructor = telphone;

proto.init = function (options) {
    if (!options) {
        throw new Error('配置信息为空');
    }

    if (!options.$el) {
        throw new Error('$el为空');
    }

    this.config = $.extend({data : options.$el.data()}, telphone.defaults, options);

    this.$content = $(Widget.template(DEFAULT_TPL, {mobileTip: this.config.data.mobile}));

    this.$mobile = this.$content.find('#js_demobile');
    this.$mobileTip = this.$content.find('#mobile_tip');

    options.$el.on('click', $.proxy(this._initBox, this)).click();

    return this;
};

proto._initBox = function() {
    this._createDialog(this.$content);
    var me = this;
    var $content = this.$content;

    this.$mobile.on('focus', function(e) {
        me.$mobileTip.html('');
        focusFunction();
    }).on('blur', function(e) {
        me._checkMobile();
        blurFunction();
    });

    //iphone 现输入键盘时的兼容性代码
    function focusFunction() {
        $(window).off('orientationchange.focus').on('orientationchange.focus', function() {
            setTimeout(function () {
                me.$mobile.blur();
            }, 400);
        });
        $('.overlay').height($(document).height());
    }

    function blurFunction() {
        $(window).off('orientationchange.focus');
    }

    var $submit  = $content.find('#telphone_submit'),
    isSended = false;

    $submit.on('click', function(e) {
        var interval ;
    	if ($submit.html() == BTN_DIAL_BACK) {
	        $submit.prop('disabled' , true );
	        
	        //数据提交
	        if (!isSended && me._checkForm() && !$submit.hasClass('btn-disabled')) {
	            // 手动发送统计日志
	            var eqslog = '/wap_detail@etype=click@name=submit_dial_back';
	            Log.trackEventByEqslog(eqslog, $(this), 'click');
	            if( !isSended ) {
                    isSended = true;
                    $submit.addClass('btn-disabled');
                    $.ajax({
                        url: 'http://m.273.cn/ajax.php?module=dial_back',
                        data: {
                            mobile: me.$mobile.val(),
                            car_id: me.config.data.carid,
                            car_url: me.config.data.carurl,
                            source: 4		//预约看车source为3，来源：0(主站)，1(m站)，2（主站app），3（m站预约看车），4（m站电话回拨）
                        },
                        dataType: 'jsonp',
                        jsonp: 'jsonp',
                        success: function (result) {
                            $submit.removeClass('btn-gray');
                            isSended = false;
                            if (result.error == 0) {
                                $content.find('.pop_form .tips').siblings().hide();
                                $content.find('.pop_form .tips').html(SUCCESS_CONTENT).show();
                                $submit.parent().show();
                                $submit.html(BTN_DIAL_BACK)
                                interval = '';
                                function clear() {
                                    clearInterval(interval);
                                    interval = null;
                                }

                                if (interval) return;
                                var now, end = new Date().getTime() + 30 * 1000;

                                interval = setInterval(function () {
                                    now = new Date().getTime();
                                    var last = Math.round((end - now) / 1000);
                                    $submit.html(last + '秒回拨给您')
                                    if (last <= 0) {
                                        clear();
                                        $submit.parent().show();
                                        $submit.html(BTN_YES).addClass('js_close').removeClass('btn-disabled');
                                    }
                                }, 1000);

                            } else {
                                $content.find('.pop_form .tips').siblings().hide();
                                $content.find('.pop_form .tips').html(FAIL_CONTENT).show();
                                $submit.parent().show();
                                $submit.html(BTN_RETRY);
                            }
                        },
                        error: function (result) {
                            $submit.removeClass('btn-gray');
                            isSended = false;
                            $content.find('.pop_form .tips').siblings().hide();
                            $content.find('.pop_form .tips').html(FAIL_CONTENT).show();
                            $submit.parent().show();
                            $submit.html(BTN_RETRY);
                        }
                    });
                }
	        } else {
	            return false;
	        }
        } else if ($submit.html() == BTN_RETRY) {
			$content.find('.pop_form .tips').html('').hide();
			$content.find('.pop_form .tips').siblings().show();
			$submit.html(BTN_DIAL_BACK).removeClass('btn-disabled');
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
            var $dialog = $('#telphone-dialog');
            if ( $dialog.length ) {
                $dialog.show();
            } else {
                $dialog = $content ;
                $('body').append($content);
            }
            dialogPostion($dialog);
        },
        onHide: function() {
            $('#telphone-dialog,#telphone-tip-dialog').hide();
        },
    });
    $('.overlay,#telphone-dialog').on("touchmove", function(e) {
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

module.exports = telphone;
