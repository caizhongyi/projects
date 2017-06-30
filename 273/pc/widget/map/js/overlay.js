/**
 * @desc 自定义提示类封装
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-07-30
 */

var Class = window.Class || require('class') ;

// 自定义覆盖物
var Overlay = function( options ){
    this.initialize( options );
}
Overlay.prototype = new BMap.Overlay();
Overlay.prototype.initialize  = function( options ) {
  /*  if (!(this.point instanceof BMap.Point)) {
        return null;
    }*/

    this.options = $.extend({
        letter : '',
        text : ''
    }, options );

    this.$ = $('<div class="BMap_Tip"><span class="letter">'+ this.options.letter +'</span><span class="text"><a href="'+ this.options.url +'" target="_blank">'+ this.options.text +'</a></span></div>')

    this.$.click(function () {
        var handler = options.onClick;
        if ($.isFunction(handler)) {
            handler(options);
        }
        $(this).addClass('BMap_Tip_On');
    }).mouseenter(function () {
        $(this).css('zIndex', 999);
    }).mouseleave(function () {
        $(this).css('zIndex', 0);
        $(this).removeClass('BMap_Tip_On');
    });
    return this;
};

Overlay.prototype.on = function (type, cb) {

    var me = this;
    if (type && $.isFunction(cb)) {
        this[this.type].addEventListener(type, function (e) {
            cb.apply(me, [e]);
        });
    }
    return this;
}
Overlay.prototype.isVisible = function () {
    return this[this.type].isVisible();
}
Overlay.prototype.show = function () {
    this[this.type].show();
    return this;
}
Overlay.prototype.hide = function () {
    this[this.type].hide();
    return this;
}


if(typeof module != 'undefined') module.exports = Overlay ;


