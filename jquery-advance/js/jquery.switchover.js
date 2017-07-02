;
(function ( $ ) {
    /**
     * @author caizhongyi    qq:274142680
     * @website http://www.zerowfe.com
     * @description 样式切换效果
     * @constructor
     * @name switchover
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} event 绑定事件
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchover).switchover('click','selected','li',null);
     */
    $.fn.switchover = function ( event , className , selector , callback ) {
        var temp = null;
        event = event + '.switchover';
        var _this = this;
        if ( selector ) {
            $( this ).off( event ).on( event , selector , function () {
                //if(temp) temp.removeClass(className);
                $( _this ).find( selector ).removeClass( className );
                temp = $( this ).addClass( className );
                callback && $.proxy( callback , this )( $( this ).index() );
            } )
        }
        else {
            $( this ).off( event ).on( event , function () {
                //if(temp) temp.removeClass(className);
                $( _this ).removeClass( className );
                temp = $( this ).addClass( className );
                selector && $.proxy( selector , this )( $( this ).index() );
            } );
        }
        ;
        return this;
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 样式切换效果,事件为Hover
     * @constructor
     * @name switchHover
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchHover).switchHover('selected','li',null);
     */
    $.fn.switchHover = function ( className , selector , callback ) {
        $( this ).switchover( 'mouseenter' , className , selector , callback );
        return this;
    };
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 样式切换效果,事件为click
     * @constructor
     * @name switchClick
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchClick).switchClick('selected','li',null);
     */
    $.fn.switchClick = function ( className , selector , callback ) {
        $( this ).switchover( 'click' , className , selector , callback );
        return this;
    };
})( jQuery );