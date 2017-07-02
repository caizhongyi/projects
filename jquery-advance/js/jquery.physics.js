/**
 *  cloneMoveTo ( elem ,callback )
 *  moveTo  ( elem ,callback )
 *  roundPostion ( radius , angle )
 *  istouch ( elem )
 *  inarea( elem )
 * */
;
(function ( $ ) {
    /**
     * 是否在区域内
     * */
    $.fn.inarea = function ( elem ) {
        var $container = $( elem ) ;
        return $(this).offset().left + $(this).width() > $container.offset().left &&
            $(this).offset().left /*+ $(this).outerWidth()*/ < $container.offset().left + $container.width() &&
            $(this).offset().top + $(this).height() > $container.offset().top &&
            $(this).offset().top /*+ $(this).outerHeight()*/ < $container.offset().top + $container.height() ;
    };

    /**
     * 内标签是否碰触
     * */
    $.fn.istouch = function ( elem ) {
    };

    /**
     * 内标签是否碰触
     * */
    $.fn.roundPostion = function ( radius , angle ) {
        var r;
        if ( typeof  radius == 'object' ) {
            r = radius;
        }
        else {
            r.y = r.x = radius;
        }
        if ( angle >= 360 ) {
            angle = angle - 360;
        }
        var pos = {
            left : r.x * Math.cos( angle * Math.PI / 180 ) ,
            top : r.y * Math.sin( angle * Math.PI / 180 )
        }
        return $( this ).css( pos );
    }


    /**
     *
     * */
    $.fn.moveTo = function ( elem ,callback ) {
        return  $(this).css($(this).offset()).css('position','absolute').stop(true,true).animate($(elem).offset() , callback);
    }

    $.fn.cloneMoveTo = function ( elem ,callback ) {
        return  $(this).clone().appendTo($(this).parent()).css('position','absolute').css($(this).offset()).moveTo(elem ,callback);
    }
})( jQuery );

