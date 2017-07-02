/**
 * Created with JetBrains WebStorm.
 * User: caizhongyi
 * Date: 14-1-15
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */

;(function ( $ ) {
    /**
     * $('selector').once( 'click' , function( e , callback ){
     *     $(this).animate({} , callback )
     * } , function(){
      *     console.log($(this).data('once.isdoing'));
      * })
     * */
    $.fn.once = function ( event , target , fn , callback ) {
        if(typeof event == 'function'){
            fn = event ;
            callback =  target  ;
            if(!$(this).data('once.isdoing')){
                fn.call( this , function(){
                    $(this).data('once.isdoing' , false );
                    callback && callback.call( this );
                });
                $(this).data('once.isdoing' , true);
            }
            return this;
        }

        if(typeof  target == 'function'){
            callback  = fn ;
            fn = target ;
            target = '' ;
        }

        $(this).on( event , target , function( e ){
            if(!$(this).data('once.isdoing')){
                fn.call( this , e  , function(){
                    $(this).data('once.isdoing' , false );
                    callback.call( this );
                });
                $(this).data('once.isdoing' , true);
            }
        })

        return this;
    }

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
            data = undefined;
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

    $.fn.onceAjax = function( setting ){
        return $(this).once(function( callback ){
          //  var $that = $(this)//.attr('disabled' ,'disabled');
            $.ajax( {
                url : setting.url || '',
                type : setting.type || 'get',
                dataType : setting.dataType || 'json',
                success  :  function( data, textStatus, jqXHR ){
                   // $that.removeAttr('disabled');
                    callback.success.call( this , data, textStatus, jqXHR );
                },
                complete : function( jqXHR, textStatus ){
                    callback.complete.call( this , jqXHR, textStatus );
                },
                error : function( jqXHR, textStatus, errorThrown ){
                    callback.error.call( this , jqXHR, textStatus, errorThrown );
                },
                beforeSend : function( jqXHR, settings ){
                    callback.beforeSend.call( this , jqXHR, settings );
                }
            })
        } , {
           success : setting.success,
           complete : setting.complete,
           error  : setting.error ,
           beforeSend : setting.beforeSend
        }) ;
    }

    $.fn.onceGet = function( url , data , callback , dataType ){
        if(typeof data == 'function'){
            callback = dataType;
            data =  callback ;
        }

       return $(this).onceAjax({
           url : url ,
           data : data,
           dataType : dataType ,
           success : callback
       } );
    }

    $.fn.oncePost = function( url , data , callback , dataType ){
        if(typeof data == 'function'){
            callback = dataType;
            data =  callback ;
        }

        return $(this).onceAjax({
            url : url ,
            data : data,
            type : 'post',
            dataType : dataType  ,
            success : callback
        });
    }

    $.fn.onceLoad = function( url , data , callback ){
        if(typeof data == 'function'){
            data =  callback ;
        }
        return $(this).once(function( callback ){
           // var $that = $(this)//.attr('disabled' ,'disabled');
            $(this).load( url , data , callback );
        } , callback ) ;
    }

    /**
     * $('selector').onceAnimate({} , function(){} );
     * */
    $.fn.onceAnimate = function( attr ,duration , easing , callback ){
        if(typeof duration == 'function'){
            callback = duration  ;
            duration = undefined ;
            easing = undefined ;
        }

        if(typeof duration == 'string' &&   duration != 'fast' &&  duration != 'normal' &&  duration != 'slow'){
            callback = easing  ;
            easing = duration  ;
            duration = undefined ;
        }

        if(typeof easing == 'function' ){
            callback = easing  ;
            easing = undefined  ;
        }

        return $(this).once(function( callback ){
            $(this).animate( attr , duration ,easing ,callback );
        } , callback ) ;
    }

})( jQuery );