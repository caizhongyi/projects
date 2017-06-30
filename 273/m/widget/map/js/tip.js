/**
 * @desc 自定义提示类封装
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-07-30
 */

var $ = require('zepto');
var Class = require('class');

// 自定义覆盖物
var Tip = window.BMap.Tip = function (point, options) {
    this.point = point;
    this.options = options || {};
};

Tip.prototype = new BMap.Overlay();

Tip.prototype.initialize = function (map) {
    if (!(this.point instanceof BMap.Point)) {
        return null;
    }

    var options = $.extend({
        letter : '',
        text : ''
    }, this.options);

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

    map.getPanes().markerMouseTarget.appendChild(this.$[0]);

    this.map = map;
    return  this.$[0];
};

Tip.prototype.draw = function (map) {
    var $el = this.$;
    var map = this.map;
    var options = this.options

    var pos = map.pointToOverlayPixel(this.point);
    var width = options.width || $el.width() || 0;
    var height = options.height || $el.height() || 0;

    var offsetX = options.offsetX || 0;
    var offsetY = options.offsetY || 0;

    $el.css({
        left : pos.x - Math.round(width / 2) + offsetX,
        top : pos.y - height + offsetY
    });
};

module.exports = Tip ;


