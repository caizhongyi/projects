var Class = window.Class ||  require('class') ;
var $ = require('zepto');

/**
 * 倒计时
 * @module alienjs
 * @class Countdown
 * @param selector {string} 选择器
 * @param options
 * @param options.time {string} 倒计时时间格式为 00:00:20 , default : null
 * @param options.auto {boolean} 是否自动执行 , default: false
 * @param options.endDate {datetime} 开始时间，default:  (new Date().getTime() + 1000 * 60 * 60)
 * @param options.startDate {datetime} 结束时间，default: new Date()
 * @param options.format {string}  'dd hh mm ss', 格式
 * @param options.beforeCallback {function}  function(){}  开始回调
 * @param options.afterCallback {function}  function(){}  结束回调
 * @param options.callback {function}  function(){}  回调
 * @use jquery.js
 * @example
 * @website http://www.alienjs.net
 * @author caizhongyi
 * @constructor
 */
var Countdown = Class.create({
    initialize: function( selector , options ) {
        this.options = $.extend({}, {
            time            :   null,
            auto            :   false,
            endDate         :   (new Date().getTime() + 1000 * 60 * 60) ,
            startDate       :   new Date(),
            format          :    'dd hh:mm:ss',
            ajax            :   null,
            beforeCallback  :   function(){},
            afterCallback   :   function(){},
            callback        :   function(){}
        } , options);
        this.$ = $(selector);
        var self = this ;
        if(this.endTime <= new Date().getTime()) return this;
        //var d = $.deferred();
        if( this.isButton() ){
            this.$.off('click.countdown').on('click.countdown',function(){
                self.start( this );
            })
        }

        if( this.options.auto ){
            this.start( this.$ );
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
    init : function(){

    },
    isButton : function(){
        return this.$[0].tagName == 'BUTTON' || this.$[0].tagName == 'INPUT' || this.$[0].tagName == 'A'|| this.$[0].tagName == 'SPAN'
    },
    start    : function( btn ){
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
            if( $(btn).length ){
                $(btn).prop('disabled', true).addClass('btn-disabled').data('default-val' , self.val());
            }
            self.setOptions();
            self.populate();
            self.timer && clearInterval(this.timer);
            self.timer = setInterval(function(){
                self.populate();
            }, 1000);
        }
        return this;
    },
    stop : function(){
        clearInterval(this.timer);
        return this;
    },
    val : function( val ){
        var self = this.$ ;
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
    /*  disabled : function(){

     },*/
    populate : function(){
        var format = function( day, hour, minu, sec ){
            return day + ' ' +  hour + '：' +  minu + '：' + sec + '' ;
        }
        var self = this.$ ;
        var endDate = this.endTime, now = this.startTime;
        if (endDate < now) {
            if( this.isButton() ) {
                this.$.prop('disabled', false).removeClass('btn-disabled');
                this.val( this.$.data('default-val'));
            }
            clearInterval(this.timer);
            this.options.afterCallback && this.options.afterCallback.call( this );
            this.options.callback && this.options.callback.call( this );

            // d.resolveWith();
            // return d.promise();
            $(self).trigger('end', $.Event({}));
            return ;
        }

        var chaTime = new Date( endDate - now ) ;
        var res = {};
        var Day_Param = 1000 * 60 * 60 * 24;
        var Hour_Param = 1000 * 60 * 60;
        var Minu_Param = 1000 * 60;
        var Sec_Param = 1000;
        res.day = Math.floor( chaTime / Day_Param );
        chaTime = chaTime - res.day * Day_Param;
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
                var date = chaTime;
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

        this.startTime += 1000 ;

        return this;
    }
});

if( typeof  module == 'object') module.exports = Countdown;
