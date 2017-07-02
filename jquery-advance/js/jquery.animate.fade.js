;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @qq 274142680
     * @website http://www.zerowfe.com
     * @description 跟据 opacity 值 式反复渐变
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {number} speed 变化的速度
     * @param {string} easing
     * @param {callback} callback 变化后的回调
     * @return {object} jquery
     * @example
     * */
    $.fn.fadeToggleTo = function ( speed , easing , callback ) {
        var opacity = $( this ).show().data( 'opacity' ).stop( true );
        ! opacity && $( this ).data( 'opacity' , $( this ).css( 'opacity' ) || 1 );
        if ( opacity == $( this ).css( 'opacity' ) )
            $( this ).animate( { opacity : 'hide' } , speed , easing , callback );
        else
            $( this ).animate( { opacity : opacity } , speed , easing , callback );
        return this;
    };
})( jQuery );