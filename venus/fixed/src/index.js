/**
 * @author caizhongyi    qq:274142680
 * @website http://www.zerowfe.com
 * @description ie6 fixed定位,不支持百分比定位
 * @constructor
 * @name fixed
 * @requires  jquery.1.7.2
 * @memberOf $.fn
 * @param {string} options 绑定事件
 * @param {string} [options.defaults = isAll] 是否最大化  我后加的
 * @return {object} jquery对象
 * @example $('.fixed).fixed();
 */
;
(function ( $ ) {
    var isIE = ! ! window.ActiveXObject;
    var isIE6 = isIE && ! window.XMLHttpRequest;
    var isIE8 = isIE && ! ! document.documentMode && (document.documentMode == 8);
    var isIE7 = isIE && ! isIE6 && ! isIE8;
    if ( isIE6 || isIE7 ) {
        $().ready( function () {
            var body = document.body;
            var BLANK_GIF;
            if ( body.currentStyle.backgroundAttachment != "fixed" ) {
                if ( body.currentStyle.backgroundImage == "none" ) {
                    body.runtimeStyle.backgroundImage = "url(" + BLANK_GIF + ")";
                    body.runtimeStyle.backgroundAttachment = "fixed";
                }
            }
        } );
    }
    ;
    $.fn.extend( {fixed : function ( position ) {
        if ( ! isIE6 ) {
            return this;
        }
        return this.each( function () {
            var $that = $( this ).css( 'position' , 'absolute' ),
                mypos = {
                    left : $that.css( 'left' ) ,
                    top : $that.css( 'top' ) ,
                    bottom : $that.css( 'bottom' ) ,
                    right : $that.css( 'right' )
                };
            $( this ).data( 'windowSize' , {
                width : $( window ).width ,
                height : $( window ).height
            } )
            function getResizePos() {
                var pos = getPos();
                pos.left += $that.data( 'windowSize' ).width - $( window ).width();
                pos.top += $that.data( 'windowSize' ).height - $( window ).height();
                return pos;
            }

            function getPos() {
                var cssPos = {
                    left : 0 ,
                    top : 0
                };
                if ( mypos.right == 'auto' ) {
                    /* if(mypos.left > $(window).width()){
                     cssPos.left = $(window).width()
                     }*/
                    cssPos.left = $( window ).scrollLeft();
                }
                else if ( mypos.left != 'auto' && mypos.right != 'auto' ) {
                    cssPos.left = parseFloat( mypos.left ) + $( window ).scrollLeft();
                }
                else if ( mypos.right != 'auto' ) {
                    cssPos.left = $( window ).width() - parseFloat( mypos.right ) + $( window ).scrollLeft() - $that.outerWidth();
                }
                if ( mypos.bottom == 'auto' ) {
                    /*   if(cssPos.top > $(window).height()){
                     cssPos.top = $(window).height()
                     }*/
                    cssPos.top = $( window ).scrollTop();
                }
                else if ( mypos.top != 'auto' && mypos.bottom != 'auto' ) {
                    cssPos.top = parseFloat( mypos.top ) + $( window ).scrollTop();
                }
                else if ( mypos.bottom != 'auto' ) {
                    cssPos.top = $( window ).height() - parseFloat( mypos.bottom ) + $( window ).scrollTop() - $that.outerHeight();
                }
                if ( cssPos.left == $( window ).width() ) {
                    cssPos.left -= 1;
                }
                if ( cssPos.top == $( window ).height() ) {
                    cssPos.top -= 1;
                }
                return cssPos;
            }

            $( window ).on( 'scroll.fixed' ,function () {
                $that.css( getPos() );
            } ).on( 'resize.fixed' , function () {
                $that.css( getResizePos() );
            });
        } )
    }} );
})( window.jQuery || require("jquery") );