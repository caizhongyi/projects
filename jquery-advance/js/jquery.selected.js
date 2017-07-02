;
(function ( $ ) {
    $.fn.selected && $.console('$.fn.selected overwrite!');
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description selected
     * @requires  jquery.1.7.2
     * @param {string} className
     * @param {boolean} mutil
     * @example
     * html <ul><li><li></ul>
     * $.fn.selected();
     * */
    $.fn.selected = function ( className , mutil ) {
        mutil ? (function () {
            $( this ).hasClass( className ) ? ($( this ).removeClass( className )) : ($( this ).addClass( className ));
        }).call( this ) : (function () {
            $( this ).addClass( className ).siblings().removeClass( className );
        }).call( this );
        return this;
    }
})( jQuery );