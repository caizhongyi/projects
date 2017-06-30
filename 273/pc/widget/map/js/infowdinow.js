/**
 * @desc 自定义提示类封装
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-07-30
 */

var Class = window.Class || require('class') ;
var Overlay = window.Overlay || require('overlay');

/**
 * 自定义覆盖物
 * */
var InfoWindow = Class.create( Overlay ,{
    initialize : function( config ) {
        this.config = $.extend({
            width : 0,
            height : 0,
            offsetX : 0,
            offsetY : 0,
            maxWidth : 730,
            title : '',
            content : '',
            enableAutoPan : true,
            enableCloseOnClick : false,
            enableMessage : false
        }, config );

        if ( this.config.offsetX > 0 ||  this.config.offsetY > 0) {
            this.config.offset = new BMap.Size( this.config.offsetX,  this.config.offsetY);
            delete  this.config.offsetX;
            delete  this.config.offsetY;
        }

        var content =  this.config.content || '';
        delete  this.config.content;

        this.infowindow = new BMap.InfoWindow(content,  this.config);
    }
});


if(typeof module != 'undefined') module.exports = InfoWindow ;


