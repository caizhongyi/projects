/**
 * @desc 自定义提示类封装
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-07-30
 */

var Class = window.Class || require('class') ;
var Overlay = window.Overlay || require('overlay');

// 自定义覆盖物
var InfoWindow = Class.create( Overlay ,{
    initialize : function( config ) {
        var point = config.point;

        if (!(point instanceof BMap.Point)) return;

        delete config.point;

        this.config = $.extend({
            offsetX : 0,
            offsetY : 0,
            title : '',
            enableMassClear : true,
            enableDragging : false,
            enableClicking : true,
            raiseOnDrag : false
        }, config);

        // 二维坐标系
        if ( this.config.offsetX > 0 ||  this.config.offsetY > 0) {
            this.config.offset = new BMap.Size( this.config.offsetX,  this.config.offsetY);
            delete  this.config.offsetX;
            delete  this.config.offsetY;
        }

        this.marker = new BMap.Marker(point, this.config);
    }
});


if(typeof module != 'undefined') module.exports = InfoWindow ;


