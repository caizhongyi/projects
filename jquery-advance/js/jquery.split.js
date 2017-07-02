;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description 分隔标签
     * @requires  jquery.1.7.2
     * @param {string}  selector 选择器
     * @example
     * <ul>
     *     <li></li>
     *     <li class="split"></li>
     *     <li></li>
     *     <li></li>
     *     <li class="split"></li>
     * </ul>
     * $('ul li').split('.split');
     * */
    $.fn.split = function ( selector ) {
        var arr = $( [] ),
            $split = $( this ).filter( selector );
        if ( ! $split.length ) {
            return arr = arr.add( $( this ) );
        }
        $split.each( function ( i ) {
            var item = $( this ).prevAll( ':not([page],' + selector + ')' ).attr( 'page' , i );
            arr = arr.add( item );
            if ( i == $split.length - 1 ) {
                arr = arr.add( $( this ).nextAll() )
            }
        } );
        return arr;
    };
})( jQuery );