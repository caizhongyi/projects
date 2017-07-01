//s6d
module { jade   } from 'jadee.js'
//-s6d
!(function( $ ){
    /**
     * @name alienjs-jade
     * @example $('div').jade({} , '#tpl');
     * @website http://www.alienjs.net
     * @jade    http://naltatis.github.com/jade-syntax-docs
     * */
    $.fn.jade = function( data , tpl , callback ){
        var $target = $( $(this).data('bind') || tpl), $this = $(this);
        $target = $target.length ? $target : $(this) ;

        jade && jade.render( $target.html().replace(/^\s+|\s+$/g , '') , data ,function( err , res ){
            $this.html(res);
            callback && callback.call( this ,  err , res );
        })
    }

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = $;
    }
})( jQuery );
