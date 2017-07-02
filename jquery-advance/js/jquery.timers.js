/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/10/16
 *
 * @author Blair Mitchelmore
 * @version 1.2
 * @example :
 * 1. everyTime(时间间隔, [计时器名称], 函式名称, [次数限制], [等待函式程序完成])
 2. oneTime(时间间隔, [计时器名称], 呼叫的函式)
 3. stopTime ([计时器名称], [函式名称])
 function test(){
   //do something...
}
 $('body').everyTime('1s',test);
 //倒数10秒后执行
 $('body').oneTime('1das',function(){
 //do something...
});

 //倒数100秒后执行，并命名计时器名称为D
 $('body').oneTime('1hs','D',function(){
 //do something...
});
 //停止所有的在$('body')上计时器
 $('body').stopTime ();

 //停止$('body')上名称为A的计时器
 $('body').stopTime ('A');

 //停止$('body')上所有呼叫test()的计时器
 $('body').stopTime (test);
 powers: {
   // Yeah this is major overkill...
   'ms': 1,
   'cs': 10,
   'ds': 100,
   's': 1000,
   'das': 10000,
   'hs': 100000,
   'ks': 1000000
  }
 *
 **/


jQuery.fn.extend( {
    everyTime : function ( interval , label , fn , times ) {
        return this.each( function () {
            jQuery.timer.add( this , interval , label , fn , times );
        } );
    } ,
    oneTime : function ( interval , label , fn ) {
        return this.each( function () {
            jQuery.timer.add( this , interval , label , fn , 1 );
        } );
    } ,
    stopTime : function ( label , fn ) {
        return this.each( function () {
            jQuery.timer.remove( this , label , fn );
        } );
    }
} );
jQuery.extend( {
    timer : {
        global : [] ,
        guid : 1 ,
        dataKey : "jQuery.timer" ,
        regex : /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/ ,
        powers : {
// Yeah this is major overkill...
            'ms' : 1 ,
            'cs' : 10 ,
            'ds' : 100 ,
            's' : 1000 ,
            'das' : 10000 ,
            'hs' : 100000 ,
            'ks' : 1000000
        } ,
        timeParse : function ( value ) {
            if ( value == undefined || value == null )
                return null;
            var result = this.regex.exec( jQuery.trim( value.toString() ) );
            if ( result[2] ) {
                var num = parseFloat( result[1] );
                var mult = this.powers[result[2]] || 1;
                return num * mult;
            }
            else {
                return value;
            }
        } ,
        add : function ( element , interval , label , fn , times ) {
            var counter = 0;
            if ( jQuery.isFunction( label ) ) {
                if ( ! times )
                    times = fn;
                fn = label;
                label = interval;
            }
            interval = jQuery.timer.timeParse( interval );
            if ( typeof interval != 'number' || isNaN( interval ) || interval < 0 )
                return;
            if ( typeof times != 'number' || isNaN( times ) || times < 0 )
                times = 0;
            times = times || 0;
            var timers = jQuery.data( element , this.dataKey ) || jQuery.data( element , this.dataKey , {} );
            if ( ! timers[label] )
                timers[label] = {};
            fn.timerID = fn.timerID || this.guid ++;
            var handler = function () {
                if ( (++ counter > times && times !== 0) || fn.call( element , counter ) === false )
                    jQuery.timer.remove( element , label , fn );
            };
            handler.timerID = fn.timerID;
            if ( ! timers[label][fn.timerID] )
                timers[label][fn.timerID] = window.setInterval( handler , interval );
            this.global.push( element );
        } ,
        remove : function ( element , label , fn ) {
            var timers = jQuery.data( element , this.dataKey ), ret;
            if ( timers ) {
                if ( ! label ) {
                    for ( label in timers )
                        this.remove( element , label , fn );
                }
                else if ( timers[label] ) {
                    if ( fn ) {
                        if ( fn.timerID ) {
                            window.clearInterval( timers[label][fn.timerID] );
                            delete timers[label][fn.timerID];
                        }
                    }
                    else {
                        for ( var fn in timers[label] ) {
                            window.clearInterval( timers[label][fn] );
                            delete timers[label][fn];
                        }
                    }
                    for ( ret in timers[label] ) break;
                    if ( ! ret ) {
                        ret = null;
                        delete timers[label];
                    }
                }
                for ( ret in timers ) break;
                if ( ! ret )
                    jQuery.removeData( element , this.dataKey );
            }
        }
    }
} );
jQuery( window ).bind( "unload" , function () {
    jQuery.each( jQuery.timer.global , function ( index , item ) {
        jQuery.timer.remove( item );
    } );
} );