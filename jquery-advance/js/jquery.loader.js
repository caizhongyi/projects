
;(function ( $ ) {
    /**
     * @website http://www.zerowfe.com
     * */

    $.console = function ( msg ) {
        if ( $.console.debug )
            window.console && console.log( msg );
    };
    $.console.debug = true;

    $.fn.parseOptions && $.console('$.fn.parseOptions overwrite!');
    /**
     * @description 转化data-options对象
     * @require jquery.1.7.2.js +
     * @return {jquery}  返回data-options对象
     * */
    $.fn.parseOptions = function () {
        return $( this ).parseAttr( 'data-options' );
    };

    $.fn.parseAttr && $.console('$.fn.parseAttr overwrite!');
    /**
     * @description 转化属性参数为对象
     * @require jquery.1.7.2.js +
     * @param {string} name 属性名称
     * @return {jquery}  返回对象
     * */
    $.fn.parseAttr = function ( name ) {
        var t = $( this );
        var s = $.trim( t.attr( name ) );
        if ( s ) {
            var _9 = s.substring( 0 , 1 );
            var _a = s.substring( s.length - 1 , 1 );
            if ( _9 != "{" ) {
                s = "{" + s;
            }
            if ( _a != "}" ) {
                s = s + "}";
            }
        }
        else {
            s = '{}';
        }
        return  (new Function( "return " + s ))();
    };


    $.fn.loader && $.console('$.fn.parseAttr overwrite!');
    $.fn.loader = function( loadName ){
       function getOptions(opts){
           for(var i in opts){
               if($(this).attr(i)){
                   opts[i] = $(this).attr(i);
               }
           }
           return opts;
       }

       function load( loadName ){
            var namespace = loadName.replace('-','.');
            if(namespace.indexOf('jQuery') == -1 || namespace.indexOf('$') == -1){
                var id = $(this).attr('id'),
                    fn = (new Function('if(typeof '+ namespace +' != "undefined") {return '+ namespace +'; } else { $.console("place require '+ namespace +'.js !");}')());

                if(!fn){
                    $.console('place require '+ namespace +'.js !');
                    return this;
                }
                else if(typeof fn != 'function'){
                    $.console( namespace +' is '+ typeof fn +', is not a function !');
                }
                var obj = new fn( this , $(this).parseOptions() );
                if(id) window[id] = obj ;
            }
            else {
                var arr =  namespace.split('.'),
                    fnName = arr[1];
                if(!$(this)[fnName]){
                    $.console('place require '+ namespace +'.js !');
                    return this;
                }
                $(this)[fnName]( $(this).parseOptions() );
            }
            return this;
        }

       if( loadName ) return  load.call( this ,loadName);
       $('[data-loader]').each(function(){
           load.call( this , $(this).attr('data-loader') );
       })
       return this;
    }

})( jQuery );