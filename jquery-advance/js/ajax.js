/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-9-13
 * Time: 上午9:24
 * To change this template use File | Settings | File Templates.
 * @website http://www.zerowfe.com
 */


/**
 * See (<a href="http://jquery.com/">http://jquery.com/</a>).
 * @name $
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See (<a href="http://jquery.com/">http://jquery.com/</a>).
 * @name jQuery
 * @class
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * @name fn
 * @prototype
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */
;
(function ( $ ) {
    /**
     * @description 跨域访问
     * @website http://www.zerowfe.com
     * @example
     *  client page
     *  $.jsonp('http:www.abc.php',{},function(data){
	 *      console.log(data);
	 *  })
     *
     *  server page
     $callback = $_GET["callback"];
     echo "{$callback}([ { name:\"John\",password:'xuxiangpan'},{ name:'111',password:'111'},{ name:'222',password:'222'},{ name:'333',password:'333'} ] )";
     */
    $.jsonp = function ( url , data , callback ) {
        if ( $.type( data ) == 'function' ) {
            callback = data;
            data = null;
        }
        $.ajax( {
            // async:false,
            url : url ,
            type : 'get' ,
            dataType : 'jsonp' ,
            //   jsonp: 'jsoncallback',
            data : data ,
            //  timeout: 5000,
            success : callback
            /* success: function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
             callback && $.proxy(callback,json)
             // genDynamicContent(qsData,type,json);
             }*/
        } )
    }

    /**
     * @depend jquery.event.js
     *
     * */
    $.fn.uajax = function ( url , setting ) {
        var that = this,
            $loading = $( $( this ).attr( 'data-loading' ) ),//loading selector
            ajax,
            success = setting.success,
            complete = setting.complete;
        if ( $( this ).attr( 'disabled' ) ) {
            return ajax;
        }
        $loading.stop( true ).show().animate( {
            opacity : 0.8
        } );
        $( this ).attr( 'disabled' , true );
        setting.success = function ( data ) {
            success && success.call( that , data );
            $loading.stop( true ).fadeOut();
            $( that ).removeAttr( 'disabled' )
                .val( $( this ).attr( 'data-loading-val' ) || 'loading...' );
        };
        setting.complete = function ( XMLHttpRequest , textStatus ) {
            complete && complete.call( that , XMLHttpRequest , textStatus );
            $loading.stop( true ).fadeOut();
            $( that ).removeAttr( 'disabled' );
        };
        ajax = $.ajax( url , setting );
        return ajax;
    };
    $.fn.upost = function ( url , data , callback ) {
        if ( $.type( data ) == 'function' ) {
            callback = data;
            data = {};
        }
        return $( this ).uiajax( url , {
            type : 'post' ,
            data : data ,
            success : callback
        } );
    }
    $.fn.uget = function ( url , data , callback ) {
        if ( $.type( data ) == 'function' ) {
            callback = data;
            data = {};
        }
        return $( this ).uiajax( url , {
            type : 'get' ,
            data : data ,
            success : callback
        } );
    }
    $.fn.uload = function ( url , data , callback ) {
        $( this ).load( url , data , callback );
    }
    $.fn.ujsonp = function ( url , data , callback ) {
        if ( $.type( data ) == 'function' ) {
            callback = data;
            data = {};
        }
        return $( this ).uiajax( url , {
            data : data ,
            success : callback ,
            type : 'get' ,
            dataType : 'jsonp' ,
            jsonp : 'callback'
            //timeout: 5000
        } );
    }
})( jQuery );