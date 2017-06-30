/*
 @author 	  : czy
 @message     : 验证表单[自身必需为表单对像]
 @date        : 2011/5/17
 @depends     : jquery.1.7.2.js +
                jquery.class.js
 */
;
(function ($) {

    var formElements = 'input,select,textarea';
    Class.validate = Class.get({
        results   : {},
        EVENT_ERROR : 'error',
        EVENT_SUCCESS : 'success',
        EVENT_REQUIRE : 'require',
        EVENT_EQUAL : 'equal',
        EVENT_SUBMIT : 'submit',
	EVENT_ITEMFOCUS : 'itemfocus',
        initialize : function(selector,options){
            var _options = {
                ajax    : false,
                effect : 'default',
                tipsCss : {
                    error : 'tips-error',
                    success: 'tips-success',
                    defaults : ''
                },
                inputCss : {
                    error : 'input-error',
                    success: 'input-success',
                    defaults : ''
                }
            },
            _this = this;

            this.effects = Class.validate.effects;
            this.rules = Class.validate.rule;

            this.$ = $(selector);
            this.options = $.extend(true,{},_options,options);

            var evtFocus = 'focus.validator',
                evtBlur = 'blur.validator',
                evtClick = 'click.validator',
                evtSubmit = 'submit.validator';
            this.$.find(formElements).each(function (i, n) {
                var id = $(n).attr('id'),
                    $input = $(n);
                if (!_this._hasRule(id)) return;

                var $tips = _this._getTips($input);
                $tips.length && $tips.text(_this.rules[id].message);

                $input.off(evtFocus).on(evtFocus, function () {
                    _this._default($input, $tips);
                })

                $input.off(evtBlur).on(evtBlur, function () {
                    var res = _this._validateItem($input,$tips);
                    if(res){
                        _this.trigger(_this.EVENT_ITEMFOCUS,$input,$tips);
                    }
                })
                /*
              *  对比是否相等
              * */
                var evt = 'blur.equal' + $input.attr('id');
                if (typeof $input.attr('equal') != 'undefined') {
                    var $target = _this.$.find($input.attr('equal'));
                    $target.off(evt).on(evt, function () {
                        if (typeof $input.attr('require') != 'undefined' && $input.val() == ''){
                            return ;
                        }
                        if ($input.val() == $target.val()) {
                            _this._success($input, $tips);
                        }
                        else{
                            _this._equal($input, $tips);
                        }
                    });
                }
                _this.results[id] = false;
            });

            this.$.unbind(evtSubmit).bind(evtSubmit, function () {
                var res = _this.submit();
                if(res){
                    _this.trigger(_this.EVENT_SUBMIT);
                }
                return false;
            });
        },
        _getTips   : function($input){
             return this.$.find('['+$input.attr('id')+']');
        },
        _hasRule   :function (name) {
            if (this.rules[name])
                return true;
            else
                return false;
        },
        _isRequire : function($input , $tips){
            if (typeof $input.attr('require') != 'undefined') {
                if ($input.val() == '') {
                    this._require($input , $tips);
                    return false;
                }
                else {
                    $tips.removeClass(this.options.tipsCss.error)
                        .removeClass(this.options.tipsCss.success)
                        .addClass(this.options.tipsCss.defaults);
                    $input.removeClass(this.options.inputCss.error)
                        .removeClass(this.options.inputCss.success)
                        .addClass(this.options.inputCss.defaults);
                    return true;
                }
            }

            return true;
        },
        _isEqual : function($input , $tips){
            var _this = this;
            if (typeof $input.attr('equal') != 'undefined') {
                var $target = this.$.find($input.attr('equal'));
                if ($input.val() != $target.val() && $target.val() != '') {
                    this._equal($input, $tips);
                    return false;
                }
            }

            return true;
        },
        _errorCss : function($input , $tips){
            $input.removeClass(this.options.inputCss.success).addClass(this.options.inputCss.error);
            $tips.removeClass(this.options.tipsCss.success).addClass(this.options.tipsCss.error);
            return this;
        },
        _error   : function($input , $tips){
            var id = $input.attr('id');
            this._errorCss($input , $tips);
            $tips.text(this.rules[id].error);
            this.effects[this.options.effect].error($input ,$tips);
            this.trigger(this.EVENT_ERROR);
            return this;
        },
        _success   : function($input , $tips){
            var id = $input.attr('id');
            $input.removeClass(this.options.inputCss.error).addClass(this.options.inputCss.success);
            $tips.removeClass(this.options.tipsCss.error).addClass(this.options.tipsCss.success).text(this.rules[id].success);
            this.effects[this.options.effect].success($input ,$tips);
            this.trigger(this.EVENT_SUCCESS);
            return this;
        },
        _default   : function($input , $tips ){
            var id = $input.attr('id');
            $input.removeClass(this.options.inputCss.success).removeClass(this.options.inputCss.error).addClass(this.options.inputCss.defaults);
            $tips.removeClass(this.options.tipsCss.success).removeClass(this.options.tipsCss.error).addClass(this.options.tipsCss.defaults).text(this.rules[id].message);
            this.effects[this.options.effect].show($input ,$tips);
            return this;
        },
        _equal : function($input , $tips ){
            var id = $input.attr('id');
            this._errorCss($input , $tips);

            $tips.text(this.rules[id].equal);
            this.effects[this.options.effect].error($input ,$tips);
            this.trigger(this.EVENT_EQUAL);
            return this;
        },
        _require : function($input , $tips ){
            var id = $input.attr('id');
            this._errorCss($input , $tips);
            $tips.text(this.rules[id].require);
            this.effects[this.options.effect].error($input ,$tips);
            this.trigger(this.EVENT_REQUIRE);
            return this;
        },
        _validateItem : function($input,$tips){
            var _this = this;
            var $tips = this._getTips($input),
                 id = $input.attr('id');
           if(!$tips.length){
               return true ;
           }
            if(!_this._isRequire($input,$tips)){
                ///$input.focus();
                return false;
            }
            else if(!_this._isEqual($input,$tips)){
              ///  $input.focus();
                return false;
            }
            else if(_this.rules[id] && !_this.rules[id].fn($input.val()) && $input.val() != ''){
               // $input.focus();
                this._error($input ,$tips );
                return false;
            }
            else{
                if(id != 'user')
                    this._success($input ,$tips );
                this.results[id] = true;
                return true;
            }
        },
        _validate  : function(){
            var _this = this;
            this.$.find(formElements).each(function(i,n){
                return _this._validateItem($(n));
            })
        },
        submit     : function(){
        //    if(this.options.ajax){
//                this._validate();
//                var action = this.$.attr('action'),
//                    type = this.$.attr('method') || 'post';
//                $.ajax(action ,{
//                    type : type,
//                    success : function(data){
//
//                    }
//                })
         //  }
           // else{
            this._validate();
          //  }

            for(var i in this.results){
                if(!this.results[i])
                    return false;
            }
            return true;
        }
    });
    /* 效果 */
    Class.validate.effects = {
        'default' : {
            error  : function($input, $tips){
                var duration = 150;
                if (!$tips.is(':animated'))
                    $tips.animate({'margin-left':'-=10' }, duration)
                        .animate({'margin-left':'+=20' }, duration)
                        .animate({'margin-left':'-=10' }, duration)
                return this;
            },
            success : function($input, $tips){
                var _this = this;
//                $tips.stop(true).animate({'margin-left':'200' ,opacity :'hide' },function(){
//                    _this.error($input, $tips);
//                    $tips.show();
//                })
                return this;
            },
            require : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            show : function($input, $tips){
                return this;
            }
        },
        easeOutBounce  : {
            error  : function($input, $tips){
                $tips.stop(true).animate({'margin-left':'200' ,opacity :'hide' }, 'fast',function(){
                    $tips.css({'margin-left':200}).stop(true).animate({'margin-left':'0' ,opacity :'show' }, 'slow','easeOutBounce')
                })
                return this;
            },
            success : function($input, $tips){
                var _this = this;
               // this.error($input, $tips);
                return this;
            },
            require : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            show : function($input, $tips){
                return this;
            }
        }
        ,
        easeOutBack  : {
            error  : function($input, $tips){
                $tips.css({'margin-left':200}).hide().stop(true).animate({'margin-left':'0' ,opacity :'show' },'slow','easeOutBack')
                return this;
            },
            success : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            require : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            show : function($input, $tips){
                return this;
            }
        },
        fade : {
            error  : function($input, $tips){
                $tips.stop(true).fadeIn();
                return this;
            },
            success : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            require : function($input, $tips){
                this.error($input, $tips);
                return this;
            },
            show : function($input, $tips){
                return this;
            }
        }

    }

    /* 基本信息 */
    Class.validate.fns = {
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
    Class.validate.rule = {
        user:{
            fn:function (val) {
                return /^[a-z\d_\u4e00-\u9fa5]{6,20}/i.test(val);
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
        cardid:{
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
                return /^[a-z\d_]{6,16}/i.test(val);
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