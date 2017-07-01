;(function( $ ){
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
     *  $callback = $_GET["callback"];
     *  echo "{$callback}([ { name:\"John\",password:'xuxiangpan'},{ name:'111',password:'111'},{ name:'222',password:'222'},{ name:'333',password:'333'} ] )";
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

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = $;
    }

})( jQuery );