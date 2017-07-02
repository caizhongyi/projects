;
(function ( $ ) {
    /**
     * @author caizhongyi    qq:274142680
     * @website http://www.zerowfe.com
     * @description 增加放缩动画
     * @constructor
     * @name scale
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object | numbaer } size 变化的大小
     * @param {object} [animate = { duration : 'normal' , jquery-easing : 'linear' , callback : null } ]  动画
     * @return {object} jquery
     * @example
     * */
    $.fn.scale = function ( size , animate ) {
        animate = $.extend({},{ duration : 'fast' , easing : 'linear' , callback : null } , animate) ;
        size = size || 2 ;

        var mysize = { width : $(this).width() , height : $(this).height()};

        if ( typeof size == 'number' ) {
            size = { width: mysize.width * size , height : mysize.height * size } ;
        }

        var attr = size ;
        attr['margin-left']  = parseFloat($( this ).css('margin-left'))  + mysize.width / 2 - size.width / 2;
        attr['margin-top']  =  parseFloat($( this ).css('margin-top')) + mysize.height / 2 - size.height / 2;

        $( this ).animate( attr ,animate.duration , animate.easing , animate.callback );
        return this;
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 绝对定位，弹出效果，变化
     * @constructor
     * @name scaleIn
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object | numbaer } size 变化的大小
     * @param {object} [animate = { duration : 'normal' , jquery-easing : 'linear' , callback : null } ]  动画
     * @return {object} jquery
     * @example
     * */
    $.fn.scaleIn = function ( size , animate ) {
        var mysize = { width : $(this).width() , height : $(this).height()};
        if ( ! $( this ).data( 'size' ) )
            $( this ).data( 'size' , mysize );
        return  $( this ).attr( 'data-status' , 'scale-in' ).scale( size , animate );
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 绝对定位，弹出效果，还原
     * @constructor
     * @name scaleOut
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object} [animate = { duration : 'normal' , jquery-easing : 'linear' , callback : null } ]  动画
     * @return {object} jquery
     * @example
     * */
    $.fn.scaleOut = function ( animate ) {
        $( this ).attr( 'data-status' , 'scale-out' ).scale( $( this ).data( 'size' ) , animate );
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 绝对定位，弹出效果，toggle
     * @constructor
     * @name scaleToggle
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object | numbaer } size 变化的大小
     * @param {object} [animate = { duration : 'normal' , jquery-easing : 'linear' , callback : null } ]  动画
     * @return {object} jquery
     * @example
     * */
    $.fn.scaleToggle = function ( size , animate ) {
        var status = $( this ).attr( 'data-status' );
        if ( status && status == 'scale-in' ) {
            $( this ).scaleOut( animate );
        }
        else {
            $( this ).scaleIn( size , animate );
        }
    };
})( jQuery );