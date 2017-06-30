/*
 @author 	  : czy
 @message      : 验证表单[自身必需为表单对像]
 @date         : 2011/5/17
 @dependent    : jquery.js
 */
;
(function ($) {

    $.lib.ui.validator = $.lib.createClass({
        target:{},
        options:{
            ajax:true,
            inputClass:{ focus:'tfocus', success:'tsuccess', show:'tshow', error:'terror'},
            tipsClass:{ focus:'focus', success:'success', show:'show', error:'error' },
            hide:{ attr:{ opacity:'hide' }, duration:'slow', easing:'easeOutExpo'  },
            show:{ attr:{ opacity:'show' }, duration:'slow', easing:'easeOutExpo'  }
        }
    }, {
        result:{},
        init:function (selector, options) {
            var _this = this;
            var evtFocus = 'focus.validator',
                evtBlur = 'blur.validator',
                evtClick = 'click.validator',
                evtSubmit = 'submit.validator';
            var elements = 'input,select,textarea';
            this.$.find(elements).each(function (i, n) {
                var id = $(n).attr('id');
                if (!_this.hasRule(id)) return;
                _this.initTips(id);
                var $tips = _this.getTips(id);
                //是否存在规则角色
                $(n).off(evtFocus).on(evtFocus, function () {
                    $tips.addClass(_this.options.tipsClass.focus);
                    $(n).addClass(_this.options.inputClass.focus);
                })
                $(n).off(evtBlur).on(evtBlur, function () {
                    _this.validate($(n), id, $(n).val());
                    $tips.removeClass(_this.options.tipsClass.focus);
                    $(n).removeClass(_this.options.inputClass.focus);
                })
            });

            this.$.unbind(evtSubmit).bind(evtSubmit, function () {
                _this.$.find(elements).each(function (i, n) {
                    var id = $(n).attr('id');
                    _this.result[id] = _this.validate($(n), id, $(n).val());
                });

                for (var i in _this.result) {
                    if (!_this.result[i]) {
                        return false;
                    }
                }
                if(_this.options.ajax){
                    return false;
                }
                else{
                    return true;
                }

            });
        },
        hasRule:function (name) {
            if ($.lib.ui.validator.rule[name])
                return true;
            else
                return false;
        },
        getTips:function (name) {
            return this.$.find('[' + name + ']');
        },
        initTips:function (name) {
            try {
                var $tips = this.getTips(name);
                $tips.length && $tips.text($.lib.ui.validator.rule[name].message);
            }
            catch (e) {
                console && console.log(e);
            }
            return this;
        },
        validate:function (input, name, val) {
            try {
                var $tips = this.getTips(name),
                    item = $.lib.ui.validator.rule[name]
                _this = this;

                if (typeof input.attr('require') != 'undefined') {
                    if (input.val() == '') {
                        this.error(input, $tips, item.require);
                        return false;
                    }
                    else {
                        $tips.removeClass(this.options.tipsClass.error)
                            .removeClass(this.options.tipsClass.success)
                            .addClass(this.options.tipsClass.show);
                        input.removeClass(this.options.inputClass.error)
                            .removeClass(this.options.inputClass.success)
                            .addClass(this.options.inputClass.show);
                    }
                }

                if (typeof input.attr('equal') != 'undefined') {
                    var $target = this.$.find(input.attr('equal')),
                        evt = 'blur.equal' + input.attr('id');
                    $target.off(evt).on(evt, function () {
                        if (input.val() == $target.val()) {
                            _this.success(input, $tips, item.success);
                        }
                    });

                    if (input.val() != $target.val() && $target.val() != '') {
                        this.error(input, $tips, item.equal);
                        return false;
                    }
                }

                if ($.lib.ui.validator.rule[name]) {
                    if ($.lib.ui.validator.rule[name].fn(val)) {
                        this.success(input, $tips, item.success);
                        return true;
                    }
                    else {
                        this.error(input, $tips, item.error);
                        return false;
                    }
                }
            }
            catch (e) {
                console && console.log(e);
            }
            return true;
        },
        success:function (input, $obj, message) {
            $obj.text(message).stop().hide()
                .fadeIn()
                .removeClass(this.options.tipsClass.show)
                .removeClass(this.options.tipsClass.error)
                .addClass(this.options.tipsClass.success);
            input.removeClass(this.options.inputClass.show)
                .removeClass(this.options.inputClass.error)
                .addClass(this.options.inputClass.success);
            return this;
        },
        error:function (input, $obj, message) {
            var duration = 150;
            if (!$obj.is(':animated'))
                $obj.text(message)
                    .animate({'margin-left':'-=10' }, duration)
                    .animate({'margin-left':'+=20' }, duration)
                    .animate({'margin-left':'-=10' }, duration)
                    .removeClass(this.options.tipsClass.show)
                    .removeClass(this.options.tipsClass.success)
                    .addClass(this.options.tipsClass.error);
            input.removeClass(this.options.inputClass.show)
                .removeClass(this.options.inputClass.success)
                .addClass(this.options.inputClass.error);
            return this;
        }
    })

    /* 基本信息 */
    $.lib.ui.validator.fns = {
        isNumber:function (val) {
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(val)
        },
        isStrOrNum:function (val) {
            return /^[0-9a-zA-Z\_]+$/.test(val)
        },
        isChinOrStrOrInt:function (val) {
            return /^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test(val)
        },
        isInt:function (val) {
            return /^[-]{0,1}[0-9]{1,}$/.test(val)
        },
        isDecimal:function (val) {
            return /^[-]{0,1}(\d+)[\.]+(\d+)$/.test(val)
        },
        isTel:function (val) {
            return /^[0-9]{11}$/.test(val)
        },
        isEmail:function (val) {
            return (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(val)
        },
        isUrl:function (val) {
            return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val)
        },
        isImage:function (val) {
            return /\.bmp$|\.BMP$|\.gif$|\.jpg$|\.png$|\.PNG$|\.jpeg$|\.JPEG$|\.GIF$|\.JPG$\b/.test(val)
        },
        isDate:function (val) {
            return !/Invalid|NaN/.test(val)
        },
        isCardId:function (val) {
            return /^\d{15}|\d{17}[A-Z]$/.test(val)
        },
        isCardId18:function (val) {
            return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val)
        },
        isCardIdx:function (val) {
            return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(val)
        }
    }

    /* Validate */

    $.lib.ui.validator.rule = {
        user:{
            fn:function (val) {
                return /^[a-z\d_\u4e00-\u9fa5]{3,16}/i.test(val)
            },
            message:'6~20位字符，由字母与数字组成，只能以字母开头',
            error:'输入用户名格式不正确!',
            success:'正确!',
            require:'请输入用户名!'
        },

        tel:{
            fn:function (val) {
                return /^[0-9]{11}$/.test(val)
            },
            message:'请输入您的手机号码!',
            error:'输入手机号码不正确!',
            success:'正确!',
            require:'请输入您的手机号码!'
        },
        email:{
            fn:function (val) {
                return (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(val)
            },
            message:'请输入Email地址,示例:czy0816@gmail.com!',
            error:'输入的Email地址格式不正确!',
            success:'正确!',
            require:'请输入输入的Email地址!'
        },
        cardId:{
            fn:function (val) {
                return /^\d{15}|\d{17}[A-Z]$/.test(val)
            },
            message:'请输入身份证号码,示例:35072119860316355!',
            error:'输入身份证号码格式不正确!',
            success:'正确!',
            require:'请输入身份证号码!'
        },
        money:{
            fn:function (val) {
                return /^[0-9]+[\.][0-9]{0,3}$/.test(val)
            },
            message:'请输入RMB!',
            error:'输入RMB格式不正确!',
            success:'正确!',
            require:'请输入RMB!'
        },
        url:{
            fn:function (val) {
                return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val)
            },
            message:'请输入网址,例如:http://www.test.com',
            error:'输入网址格式不正确!',
            success:'正确!',
            require:'请输入网址!'
        },
        ip:{
            fn:function (val) {
                return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g.test(val)
            },
            message:'请输入ip,例如:192.168.1.1!',
            error:'输入ip格式不正确!',
            success:'正确!',
            require:'请输入ip!'
        },
        date:{
            fn:function (val) {
                return !/Invalid|NaN/.test(val)
            },
            message:'请输入时间,示例:2012-12-12!',
            error:'输入的时间格式不正确!',
            success:'正确!',
            require:'请输入时间,示例:2012-12-12!'
        },
        moblie:{
            fn:function (val) {
                return "/^[1][3][0-9]{9}$/".test(val)
            },
            message:'请输入您的手机号码!',
            error:'输入手机号码不正确!',
            success:'正确!',
            require:'请输入您的手机号码!'
        },
        password:{
            fn:function (val) {
                return true;
            },
            message:'6~16位字符，字母区分大小写!',
            error:'密码格式不正!',
            success:'正确!',
            require:'请输入密码!',
            equal:'两次输入的密码不一致!'
        },
        passwordconform:{
            fn:function (val) {
                return true;
            },
            message:'请再次输入密码！',
            error:'密码格式不正！',
            success:'正确!',
            require:'请再次输入密码!',
            equal:'两次输入的密码不一致!'
        },
        identify:{
            fn:function (val) {
                return true;
            },
            message:'',
            error:'验证码格式不正！',
            success:'正确!',
            require:'请输入验证码!'
        },
        image:{
            fn:function (val) {
                return /\.bmp$|\.BMP$|\.gif$|\.jpg$|\.png$|\.PNG$|\.jpeg$|\.JPEG$|\.GIF$|\.JPG$\b/.test(val)
            },
            message:'请输入图片格式,支持.bmp,.gif,.png,.jpeg!',
            error:'输入图片格式不正确!',
            success:'正确!',
            require:'请输入图片格式!'
        }
    }

})(jQuery);


//isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
//身份证正则表达式(18位)
//isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 