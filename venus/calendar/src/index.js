!(function ($) {
    /**
     * 日历
     * @depends [ jquery.js , alienjs-date.js ]
     * @param elem {selector} 选择器
     * @param options 配置
     * @constructor
     */
     var Calendar  = function( elem ,options ){
        this.options = $.extend({} , Calendar.DEFAULTS , options );
        this.$elem = $( elem ) ;
        this.$title = $( this.options.calendarTitle, this.$elem );
        this.now = new Date();
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init.call( this ) ;
    }

    Calendar.prototype = {
        init : function(){
            var self = this;
            this.$elem.off('click.calendar').on('click.calendar','.month-prev',function(){
                self.prevMonth();
            }).on('click.calendar','.month-next',function(){
                self.nextMonth();
            })

            this.render( this.now );
        },
        render : function( date ){
            var $trs = this.$elem.find('tbody tr') ;
            $trs.find(this.options.calendarDay).html('');
            var date = new Date( date.getFullYear() , date.getMonth() , date.getDate() );
            this.$elem.trigger( $.Event('beforeChange', {
                eventType : this.eventType
            }));
            for(var i = 1 ; i < this.now.maxDay() + 1 ; i ++ ){
                date.setDate( i );
                var $td = $trs.eq(date.getMonthWeek() - 1).find( this.options.calendarDay ).eq(date.getDay()).html( i );
                this.$elem.trigger( $.Event('render', {
                    eventType : this.eventType,
                    relatedTarget: $td
                }));
            }
            this.$title.html( date.format( this.options.format ));
            this.$elem.trigger( $.Event('afterChange', {
                eventType : this.eventType
            }));
            return this;
        },
        prevMonth : function(){
            this.eventType = 'prevMonth';
            this.now.setMonth( this.now.getMonth() - 1 );
            return this.render(this.now);
        },
        nextMonth : function(){
            this.eventType = 'nextMonth';
            this.now.setMonth( this.now.getMonth() + 1 );
            return this.render(this.now);
        },
        date: function( date ){
            if( date ){
                this.now = date;
                this.render( this.now );
            }
            else{
                return this.now;
            }
            return this;
        }

    }

    /**
     * 配置
     * @type {{calendarTitle: string, calendarDay: string, format: string}}
     */
    Calendar.DEFAULTS = {
        calendarTitle : '.calendar-title',
        calendarDay : '.calendar-day',
        format : 'yyyy-MM'
    };


    $.fn.calendar = function ( options , param) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('calendar');
            if(!data ){
                data = new Calendar( this , options );
                $(this).data('calendar' , data);
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

    $.fn.calendar.Constructor =  Calendar;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Calendar;
    }
})(window.jQuery || require('jquery'));

