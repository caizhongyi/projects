!(function ($) {
    /**
     * 倒计时
     * @module alienjs
     * @class Countdown
     * @param selector {string} 选择器
     * @param options
     * @param options.time {string} 倒计时时间格式为 00:00:20 , default : null
     * @param options.auto {boolean} 是否自动执行 , defaut: false
     * @param options.endDate {datetime} 开始时间，default:  (new Date().getTime() + 1000 * 60 * 60)
     * @param options.startDate {datetime} 结束时间，default: new Date()
     * @param options.format {string}  'dd hh mm ss', 格式
     * @param options.callback {function}  function(){}  回调
     * @use jquery.js
     * @example
     * @website http://www.alienjs.net
     * @author caizhongyi
     * @constructor
     */
    var Countdown = function( selector , options ){
        this.$elem = $( selector );
        this.options = $.extend({},  Countdown.defaults , options);
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }

        this.init();
    }
    Countdown.prototype = {
        init : function(){
            var self = this ;
            this.setOptions();
            if(this.options.endDate <= new Date().getTime()) return this;
            //var d = $.deferred();

            if( this.isButton() ){
                this.$elem.off('click.countdown').on('click.countdown',function(){
                    $(this).prop('disabled', true).addClass('btn-disabled').data('default-val' , self.val());
                    self.setOptions();
                    self.populate();
                    self.start();
                })
            }
            else{
                this.populate();
            }

            if( this.options.auto ){
                this.start();
            }
        },
        setOptions : function(){
            if( this.options.time ){
                var times = this.options.time.split(':');
                this.options.endDate = new Date() ;
                this.options.startDate = new Date().getTime() ;
                this.options.endDate.setHours( this.options.endDate.getHours() + ( parseInt(times[0]) || 0 ) );
                this.options.endDate.setMinutes( this.options.endDate.getMinutes() + ( parseInt(times[1]) || 0 ) )
                this.options.endDate.setSeconds( this.options.endDate.getSeconds() + ( parseInt(times[2]) || 0 ) );
                this.options.endDate = this.options.endDate.getTime();
            }
            else{
                this.options.endDate = typeof  this.options.endDate == 'object' ? this.options.endDate.getTime() : this.options.endDate ;
                this.options.startDate = typeof  this.options.startDate == 'object' ? this.options.startDate.getTime() : this.options.startDate ;
            }
            this.startTime = this.options.startDate;
            this.endTime = this.options.endDate;
            return this;
        },
        isButton : function(){
            return this.$elem[0].tagName == 'BUTTON' || this.$elem[0].tagName == 'INPUT' || this.$elem[0].tagName == 'A'
        },
        start    : function(){
            var self  = this;

            if($(btn).hasClass('btn-disabled')) return ;

            if ( this.options.beforeCallback &&  this.options.beforeCallback.call( this ) == false ) {
                return this;
            }


            if( this.options.ajax ){
                this.options.ajax( done );
            }
            else{
                done();
            }

            function done (){
                var $btn = $(btn);
                if( $btn.length ){
                    $btn.prop('disabled', true).addClass('btn-disabled').data('default-val' , self.val());
                }
                self.setOptions();
                self.populate();
                self.timer && clearInterval(self.timer);
                self.timer = setInterval(function(){
                    self.populate();
                }, 1000);
            }


            return this;
        },
        val : function( val ){
            var self = this.$elem ;
            if( self[0].tagName == 'INPUT'){
                if( val )
                    $(self).val(val)
                else
                    return self.val();
            }
            else{
                if( val )
                    $(self).html(val)
                else
                    return self.html();
            }
            return this;
        },
        stop : function(){
            clearInterval(this.timer);
            return this;
        },
      /*  disabled : function(){

        },*/
        populate : function(){
            var format = function( day, hour, minu, sec ){
                return day + '天 ' +  hour + '时 ' +  minu + '分 ' + sec + '秒 ' ;
            }
            var self = this.$elem ;
            var endDate = this.options.endDate , now = this.options.startDate;
            if (endDate < now) {
                if( this.isButton() ) {
                    this.$elem.prop('disabled', false).removeClass('btn-disabled');
                    this.val( this.$elem.data('default-val'));
                }
                clearInterval(this.timer);
                this.options.callback && this.options.callback.call( this );
                // d.resolveWith();
                // return d.promise();
                $(self).trigger('end', $.Event({}));
                return ;
            }
            var chaTime = new Date( endDate - now ) ;
            var res = {};
            var Day_Param = 1000 * 60 * 60 * 24;//一天等于毫秒数
            var Hour_Param = 1000 * 60 * 60;//一小时等于毫秒数
            var Minu_Param = 1000 * 60;//一小时等于毫秒数
            var Sec_Param = 1000;//一小时等于毫秒数
            res.day = Math.floor( chaTime / Day_Param );//
            chaTime = chaTime - res.day * Day_Param;//减去天的毫秒数。再求小时个数
            res.hour = Math.floor( chaTime / (Hour_Param) );
            chaTime = chaTime - res.hour * Hour_Param;
            res.minu = Math.floor( chaTime / (Minu_Param) );
            chaTime = chaTime - res.minu * Minu_Param;
            res.sec = Math.floor( chaTime / (Sec_Param) );
            //chaTime = chaTime - res.sec * Sec_Param;

            var day = res.day ,
                hour = res.hour,
                minu =  res.minu,
                sec = res.sec;

            if(this.options.format ){
                if(typeof this.options.format == 'string'){
                    var str = this.options.format;
                    //str = str.replace( /yyyy|YYYY/ , date.getFullYear() );
                    //str = str.replace( /yy|YY/ , (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100) );
                    // var month = date.getMonth() + 1;
                    //str = str.replace( /MM/ , month > 9 ? month.toString() : '0' + month );
                    //str = str.replace( /M/g , month );
                    //str = str.replace( /w|W/g , Week[date.getDay()] );
                    str = str.replace( /dd|DD/ , day > 9 ? day.toString() : '0' + day );
                    str = str.replace( /d|D/g , day );
                    str = str.replace( /hh|HH/ , hour > 9 ? hour.toString() : '0' + hour );
                    str = str.replace( /h|H/g , hour );
                    str = str.replace( /mm/ , minu > 9 ? minu.toString() : '0' + minu );
                    str = str.replace( /m/g , minu );
                    str = str.replace( /ss|SS/ , sec > 9 ? sec.toString() : '0' + sec );
                    str = str.replace( /s|S/g , sec );
                    res = str;
                }
                else{
                    res = this.options.format.call( self , day, hour, minu, sec);
                }
            }
            else{
                res = format( day, hour, minu, sec );
            }
            this.val(res);

            this.options.startDate += 1000 ;
            return this;
        }
    }
    Countdown.defaults = {
        time      : null,
        auto      :  false,
        endDate   :  (new Date().getTime() + 1000 * 60 * 60) ,
        startDate :  new Date(),
        format    : 'dd天 hh时 mm分 ss秒',
        callback  : function(){}
    }

    /**
     * 初始化collapse
     * @param options {object} 配置
     * @returns {*|jQuery}
     */
    $.fn.countdown = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('countdown');
            if(!data ){
                data = new Countdown( this , options );
                $(this).data('countdown' , data);
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

    $.fn.countdown.Constructor =  Countdown;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Countdown;
    }
})(window.jQuery || Zepto);
