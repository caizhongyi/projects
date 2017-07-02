;
(function ( $ ) {
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description iframe跨域通信
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} message 发送的信息
     * @param {string} domain 域
     * @return {object} jquery对象
     * @example
     *   $('iframe').postMessage('msg','*');
     *   $(window).postMessage('msg','*');
     *
     */
    $.fn.postMessage = function ( message , domain ) {
        domain = domain || '*';
        var that = this,
            ifr;
        if ( $( this )[0].tagName == 'IFRAME' ) {
            ifr = $( this )[0].contentWindow;
        }
        else {
            ifr = $( this )[0].parent;
        }
        if ( window.postMessage ) {
            ifr.postMessage( message , domain );
        }
        else {
            ifr.name = message;
        }
        return this;
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description iframe跨域监听
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} callback
     * @return {object} jquery对象
     * @example
     *   $('iframe').onmessage(function(data){ console.log(data); });
     *   $(window).onmessage(function(data){ console.log(data); });
     */
    $.fn.onMessage = function ( callback ) {
        var that = this;
        var cb = function ( json ) {
            //alert(location.host+" get msg:"+json);
            callback && callback.call( that , json );
        };
        if ( window.postMessage ) {
            if ( window.addEventListener ) {
                window.addEventListener( "message" , function ( e ) {
                    cb.call( window , e.data );
                } , false );
            }
            else if ( window.attachEvent ) {
                window.attachEvent( "onmessage" , function ( e ) {
                    cb.call( window , e.data );
                } );
            }
        }
        else {
            var hash = '';
            setInterval( function () {
                if ( window.name !== hash ) {
                    hash = window.name;
                    cb.call( window , hash );
                }
            } , 50 );
        }
        return this;
    }
})( jQuery );