!(function( $ ){
    /**
     * @example $('div').jade({} , '#tpl');
     * @website http://www.alenjs.net
     * @jade    http://naltatis.github.com/jade-syntax-docs
     * */
    $.fn.jade = function( data , tpl , callback ){
        var $target = $( $(this).data('bind') || tpl), $this = $(this);
        $target = $target.length ? $target : $(this) ;

        window.jade && jade.render( $target.html().replace(/^\s+|\s+$/g , '') , data ,function( err , res ){
            $this.html(res);
            callback && callback.call( this ,  err , res );
        })
    }
})( jQuery );