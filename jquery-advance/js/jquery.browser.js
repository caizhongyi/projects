;
(function ( $ ) {
    /**
     * @description : 浏览器判断jquery 1.8以上不支持时补加
     * */
    if( $.browser )
        return ;
    else
        $.browser = {} ;
    $.browser.mozilla = /firefox/.test( navigator.userAgent.toLowerCase() );
    $.browser.webkit = /webkit/.test( navigator.userAgent.toLowerCase() );
    $.browser.opera = /opera/.test( navigator.userAgent.toLowerCase() );
    $.browser.msie = /msie/.test( navigator.userAgent.toLowerCase() );
    $.browser.msie && (function () {
        if ( !$.browser.objectAll &&  !$.support.boxModel )
            $.browser.msie.version = '6.0';
        else if ( ! $.support.boxModel )
            $.browser.msie.version = '7.0';
        else if ( ! $.support.leadingWhitespace )
            $.browser.msie.version = '8.0';
        else
            $.browser.msie.version = '9.0+';
    })();
})( jQuery );