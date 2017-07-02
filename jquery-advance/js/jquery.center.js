;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description 块局中
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} [axis='xy'] 有效果的方身 x|y|auto
     * @param {string} [context= $(window)]  相对的父级器
     * @param {string} [animate={duration	: 'normal',easing : 'linear' ，callback : null}]  是否有动画效果
     * @return {object} jquery对象
     * @example $('.center).center();
     */
    $.fn.center = function ( axis , context , animate ) {
        var obj = $( this );
        context = context || $( window );
        axis = axis || 'xy';
        animate = animate || {  duration : 'normal' , easing : 'linear' , callback : null } ;

        var cssPosition = $( this ).css( 'position' );
        var left = (context.width() - obj.outerWidth()) / 2;
        var top = (context.height() - obj.outerHeight()) / 2;
        if ( $( this ).css( 'position' ) != 'fixed' ) {
            left += context.scrollLeft();
            top += context.scrollTop();
        }
        var pos = { }, params = {};
        if ( cssPosition == 'fixed' || cssPosition == 'absolute' ) {
            pos.x = 'left';
            pos.y = 'top';
        }
        else {
            pos.x = 'margin-left';
            pos.y = 'margin-top';
        }
        ;
        if ( axis == 'x' ) {
            params[pos.x] = left;
        }
        else if ( axis == 'y' ) {
            params[pos.y] = top;
        }
        else {
            params[pos.x] = left;
            params[pos.y] = top;
        }
        ;
        if ( animate ) {
            obj.stop( true ).animate( params , animate.duration , animate.easing , animate.callback );
        }
        else {
            obj.css( params );
        }
        ;
        return this;
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 局中位置
     * @constructor
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object} context 相对于父级的局中
     * @return {object} 局中的位置 position
     * @example $('.centerPos).centerPos();
     */
    $.fn.centerPos = function ( context ) {
        var context = context ? $( context ) : $( window );
        var left = ( context.width() - $( this ).outerWidth()) / 2;
        var top = ( context.height() - $( this ).outerHeight()) / 2;
        if ( $( this ).css( 'position' ) != 'fixed' ) {
            left += context.scrollLeft();
            top += context.scrollTop();
        }
        ;
        var pos = {
            left : left ,
            top : top
        };
        return pos;
    }
})( jQuery );