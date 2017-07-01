!(function ($) {
    /***
     * 初始化验证
     * @param options
     * @returns {*|jQuery}
     */
    var Validator = function( selector , options ){
        this.options = $.extend(true, {}, Validator.DEFAULTS , options);
        this.$elem = $(selector);
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init();
    }

    Validator.prototype = {
        init : function(){
             this.deferred = $.Deferred();
             this.fields = {};
             this.rules = Validator.rules;

            this.$elem.attr('novalidate',true);
            this.registerEvent()
                .addAttrParams()
                .bindEvent()
                .getFields()

            return this;
        },
        error   : function( field ){
            return this.tip( field , 'error' )
        },
        required   : function( field ){
            return this.tip( field , 'required' )
        },
        compared   : function( field ){
            return this.tip( field , 'compared' )
        },
        correct : function( field ){
            return this.tip( field , 'correct' )
        },
        message : function( field ){
            return this.tip( field , 'message' )
        },
        tip : function( field , status ){
            var name = field ;
            var $elem = $('[name='+ name +']' , this.$elem ) ;
            var $tip = $($elem.data('tip') || ( name + '-tip'));
            var errorClass = 'text-' + this.options.errorClass;
            var correctClass = 'text-' + this.options.correctClass;
            var correctInputClass = 'input-' + this.options.correctClass;
            var errorInputClass  = 'input-' + this.options.correctClass;
            $tip.html( this.rules[ name ][ status ] ).removeClass( errorClass).removeClass( correctClass );
            $elem.removeClass( correctInputClass ).removeClass( errorInputClass );
            switch (status){
                    case 'correct': $tip.addClass( correctClass ) ; $elem.addClass( correctInputClass ) ;break;
                case 'error':case 'required':case 'compared': $tip.addClass( errorClass ) ; $elem.addClass( errorInputClass ) ;break;
                default :  break;
            }
            return this;
        },
        validateField : function( field ){

            var $elem = $('[name='+ field +']' , this.$elem ) ;
            if( $elem.attr('novalidate') ) return true;

            if( !this.rules[ field ]){
                this.rules[field] = { }
            }

            if( $elem.attr('required') && $elem.val() == '' ){
                this.required( field );
                this.fields[ field].deferred.rejectWith();
                return false;
            }

            if( $elem.attr('compared') && $.trim($($elem.attr('compared')).val()) != $.trim($elem.val())){
                this.compared( field );
                this.fields[ field].deferred.rejectWith();
                return false;
            }

            var valid = this.rules[ field ].valid, validRes = false;
            if( typeof  valid == 'function'){
                validRes = valid(  $elem.val() );
            }
            else{
                validRes = new RegExp(valid).test(  $elem.val() );
            }

            if( !validRes ){
                this.error( field );
                this.fields[ field].deferred.rejectWith();
                return false;
            }

            this.correct( field );
            this.fields[ field].deferred.resolveWith();
            return true;
        },
        validate : function(){
            for(var i in this.fields){
                if( this.validateField(i) ){
                    this.deferred.resolveWith();
                }
                else{
                    this.deferred.rejectWith();
                    return this.deferred.promise();
                }
            }
            return this.deferred.promise();
        },
        getFields : function(){
            var self = this;
            this.$elem.find('[name]').each(function(){
                var name = $(this).attr('name') ;
                self.fields[ name ] = {
                    name : name,
                    deferred : $.Deferred()
                }
                $(this).off('blur.validator').on('blur.validator',function(){
                    self.validateField( name );
                }).off('focus.validator').on('focus.validator',function(){
                    self.message( name );
                })
                self.addFieldAttr( this , name )
            })
            return this;
        },
        bindEvent : function(){
            var self = this;
            this.$elem.off('submit.validator').on('submit.validator',function(){
                var res = false;
                self.validate()
                    .done(function(){
                        res = true;
                    })
                    .fail(function(){
                        res = false;
                    })
                console.log(self.deferred.state());
                return false;
            })
            return this;
        },
        addFieldAttr : function( selector , field ){
            var datas = $(selector).data();

            if( !this.rules[field] )  this.rules[field] = {};

            for(var i in datas ){
                this.rules[field][i] = datas[i.toLowerCase()] || this.rules[field] [i];
            }

            this.rules[ field ]['valid'] = $(selector).attr('pattern') || this.rules[ field ]['valid'];
            return this;
        },
        addAttrParams : function(){
            for(var i in this.options){
                this.options[i] = this.$elem.data( i.toLowerCase() ) || this.options[i];
            }
            return this;
        },
        registerEvent : function(){
            // TODO 注册事件
            var events = [ 'on' , 'off' , 'trigger' ];
            for(var i = 0 ; i < events.length; i ++){
                var e = events[i];
                this[e] = (function(e){
                    return function(){
                        // arguments 为传入参数
                        self.$elem[e].apply(  self.$elem , arguments );
                        return self;
                    }
                })( e );
            }
            return this;
        }
    }

    Validator.DEFAULTS = {
        showDefault : true,
        correctClass: 'success',
        errorClass  : 'danger'
    }
    Validator.rules = {
        /**
         * @description  用户
         * */
        user: {
            ajax :{
                url : 'server.json',
                data : {},
                success : function( res ){
                    return res ;
                }
            },
            valid: "^[a-z\d_\u4e00-\u9fa5]{6,20}",
            // ajax    :   function( callback ){ $.get('',{} , function(data){ callback && callback.call(this , true) }); }
            message: '6~20位字符，由字母与数字组成，只能以字母开头',
            error: '输入用户名格式不正确!',
            correct: '正确!',
            required: '请输入用户名!'
        },
        /**
         * @description  手机
         * */
        tel: {
            valid: function (val) {
                return $.valid.isTel(val);
            },
            message: '请输入您的手机号码!',
            error: '输入手机号码不正确!',
            correct: '正确!',
            required: '请输入您的手机号码!'
        },
        /**
         * @description  电子邮件
         * */
        email: {
            valid: function (val) {
                return $.valid.isEmail(val);
            },
            message: '请输入Email地址,示例:czy0816@gmail.com!',
            error: '输入的Email地址格式不正确!',
            correct: '正确!',
            required: '请输入输入的Email地址!'
        },
        /**
         * @description  身份证
         * */
        cardId: {
            valid: function (val) {
                return $.valid.isCardIdx(val);
            },
            message: '请输入身份证号码,示例:35072119860316355!',
            error: '输入身份证号码格式不正确!',
            correct: '正确!',
            required: '请输入身份证号码!'
        },
        /**
         * @description  RMB
         * */
        money: {
            valid: function (val) {
                return $.valid.isMoney(val);
            },
            message: '请输入RMB!',
            error: '输入RMB格式不正确!',
            correct: '正确!',
            required: '请输入RMB!'
        },
        /**
         * @description  地址
         * */
        url: {
            valid: function (val) {
                return $.valid.isURL(val);
            },
            message: '请输入网址,例如:http://www.test.com',
            error: '输入网址格式不正确!',
            correct: '正确!',
            required: '请输入网址!'
        },
        /**
         * @description  ip
         * */
        ip: {
            valid: function (val) {
                return $.valid.isIP(val);
            },
            message: '请输入ip,例如:192.168.1.1!',
            error: '输入ip格式不正确!',
            correct: '正确!',
            required: '请输入ip!'
        },
        /**
         * @description  时间
         * */
        date: {
            valid: function (val) {
                return $.valid.isDate(val);
            },
            message: '请输入时间,示例:2012-12-12!',
            error: '输入的时间格式不正确!',
            correct: '正确!',
            required: '请输入时间,示例:2012-12-12!'
        },
        /**
         * @description  手机
         * */
        mobile: {
            valid: function (val) {
                return $.valid.isMoblie(val);
            },
            message: '请输入您的手机号码!',
            error: '输入手机号码不正确!',
            correct: '正确!',
            required: '请输入您的手机号码!'
        },
        /**
         * @description  密码
         * */
        password: {
            valid: function (val) {
                return /^[a-z\d_]{6,16}/i.test(val);
            },
            message: '6~16位字符，字母区分大小写!',
            error: '密码格式不正!',
            correct: '正确!',
            required: '请输入密码!',
            compare: '两次输入的密码不一致!'
        },
        /**
         * @description  对比密码
         * */
        conform: {
            valid: function (val) {
                return true;
            },
            message: '请再次输入密码！',
            error: '密码格式不正!',
            correct: '正确!',
            required: '请再次输入密码!',
            compare: '两次输入的密码不一致!'
        },
        /**
         * @description  验证码
         * */
        identify: {
            valid: function (val) {
                return true;
            },
            message: '',
            error: '验证码格式不正！',
            correct: '正确!',
            required: '请输入验证码!'
        },
        /**
         * @description  图片
         * */
        image: {
            valid: function (val) {
                return $.valid.isImage(val);
            },
            message: '请输入图片格式,支持.bmp,.gif,.png,.jpeg!',
            error: '输入图片格式不正确!',
            correct: '正确!',
            required: '请输入图片格式!'
        },
        phone: {
            valid: function (val) {
                return $.valid.isMobileOrTel(val);
            },
            message: '请输入您的手机号码!',
            error: '输入手机号码不正确!',
            correct: '正确!',
            required: '请输入您的手机号码!'
        }
    };

    $.fn.validator = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('validator');
            if(!data ){
                data = new Validator( this , options );
                $(this).data('validator' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' , 'args' ,'return data[ options ](args)');

            options && data[ options ] && fn( data , options , g.join(','));
        })
    }

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Validator;
    }


})(window.jQuery || Zepto);

