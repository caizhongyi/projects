/**
 *
 * .tap( selector , data, fn , space);
 * .ontap( event , selector , data, fn );
 * .offtap( event ,selector ,data, fn );
 * .onswipe( event ,selector , data, fn );
 * .offswipe( event ,selector , data, fn );
 * .swipeUp( selector , data, fn , space);
 * .swipeDown( selector , data, fn , space);
 * .swipeLeft( selector , data, fn , space);
 * .swipeRight( selector , data, fn , space);
 * .swipeRight( selector , data, fn , space);
 * .swipeUpRight( selector , data, fn , space);
 * .swipeUpLeft( selector , data, fn , space);
 * .swipeDownRight( selector , data, fn , space);
 * .swipeDownLeft( selector , data, fn , space);
 *
 * */

!(function( $ ){

    $.fn.tap =  function( selector , data, fn , space  ) {

        if( typeof selector == 'function'){
            fn = selector;
            selector = null;
        }

        if( typeof selector == 'object'){
            data = selector;
            selector = null;
        }

        if( typeof data == 'function'){
            fn = data;
            data = null;
        }

        var isclick = false ;
        space = space || "";

        return $(this).on('touchstart'  +  space , data, function (e) {
            isclick = true ;
        }).on('touchstart' + space , selector, data, function (e) {
            isclick && fn && fn.call(this, e.originalEvent );
            isclick = false ;
        });
    }

    $.fn.untap =  function( space ) {
        space = space || "";
        return $(this).off('touchstart' + space + ' ' +  'touchend' + space );
    }


    $.fn.onswipe = function( event , selector , data, fn  ){

        if( typeof selector == 'function'){
            fn = selector;
            selector = null;
        }

        if( typeof selector == 'object'){
            data = selector;
            selector = null;
        }

        if( typeof data == 'function'){
            fn = data;
            data = null;
        }

        var temp = {}, myEvent, resEvent = "", resmEvent = "", eventArgs = event.split('.'), eventSpace = "" ;

        if( eventArgs.length > 1 ){
            eventSpace = '.' + eventArgs[1];
        }
        myEvent = eventArgs[0];

        return $(this).on('touchstart' + eventSpace, selector , data ,  function (e) {
            var event = e.originalEvent;
            if (event.targetTouches.length >= 1) {
                var touch = event.targetTouches[0];
                temp.left = touch.pageX ;
                temp.top  =  touch.pageY;
                //pos = { x: touch.pageX, y: touch.pageY };
            }

        }).on('touchmove' + eventSpace, selector , data ,  function (e) {
            //var event = e.originalEvent;
            //if (event.targetTouches.length >= 1) {
            //    var touch = event.targetTouches[0];
            //    temp.left = parseFloat($panel.css('left') || 0);
            //    temp.top  = parseFloat($panel.css('top') || 0);
            //}

        }).on('touchend' + eventSpace, selector , data ,  function (e) {
            var event = e.originalEvent;
            if (event.targetTouches.length >= 1) {
                var touch = event.targetTouches[0];

                if( touch.pageX > temp.left ){
                    resEvent = 'swipeRight'
                }
                else if( touch.pageX < temp.left  ){
                    resEvent = 'swipeLeft'
                }

                if( touch.pageY > temp.top ){
                    resEvent = 'swipeDown'
                }
                else if( touch.pageY < temp.top  ){
                    resEvent = 'swipeUp'
                }

                if( touch.pageX > temp.left && touch.pageY > temp.top ){
                    resmEvent = 'swipeDownRight'
                }
                else if( touch.pageX < temp.left  && touch.pageY > temp.top  ){
                    resmEvent = 'swipeDownLeft'
                }
                else if( touch.pageX < temp.left  && touch.pageY < temp.top  ){
                    resmEvent = 'swipeUpLeft'
                }
                else if( touch.pageX > temp.left  && touch.pageY < temp.top  ){
                    resmEvent = 'swipeUpRight'
                }
                temp.left = touch.pageX ;
                temp.top  =  touch.pageY;
            }

            myEvent =  $.trim(myEvent.toLowerCase());

            (myEvent === resEvent.toLowerCase() || myEvent == resmEvent.toLowerCase()) &&  fn && fn.call( this , event ) ;
            resEvent = "";
            resmEvent = "";

        });

    }

    $.fn.offswipe = function( event ){
        var eventArgs = event.split('.'), eventSpace ;

        if( eventArgs.length > 1 ){
            eventSpace = '.' + eventArgs[1];
        }

        return $(this).off('touchstart' + eventSpace + ' ' + 'touchmove' + eventSpace + ' ' + 'touchend' + eventSpace );
    }

    $.fn.swipeUp =  function( selector , data, fn , space ) {
        space = space || "";
       return  $(this).onswipe( 'swipeUp' + space, selector , data, fn );
    }

    $.fn.swipeDown =  function( selector , data, fn, space ) {
        space = space || "";
        return  $(this).onswipe( 'swipeDown'+ space, selector , data, fn );
    }

    $.fn.swipeLeft =  function( selector , data, fn , space) {
        space = space || "";
        return  $(this).onswipe( 'swipeLeft'+ space, selector , data, fn );
    }

    $.fn.swipeRight =  function( selector , data, fn, space ) {
        space = space || "";
        return  $(this).onswipe( 'swipeRight'+ space, selector , data, fn );
    }

    $.fn.swipeUpRight =  function( selector , data, fn, space ) {
        space = space || "";
        return  $(this).onswipe( 'swipeUpRight'+ space, selector , data, fn );
    }

    $.fn.swipeUpLeft =  function( selector , data, fn , space) {
        space = space || "";
        return  $(this).onswipe( 'swipeUpLeft'+ space, selector , data, fn );
    }

    $.fn.swipeDownRight =  function( selector , data, fn , space) {
        space = space || "";
        return  $(this).onswipe( 'swipeDownRight', selector , data, fn );
    }

    $.fn.swipeDownLeft =  function( selector , data, fn , space) {
        space = space || "";
        return  $(this).onswipe( 'swipeDownLeft', selector , data, fn );
    }

})( window.jQuery || require('jquery') );