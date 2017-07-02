/**
 * jQuery.class.js
 * Copyirght (c) 2010, matsukaze.
 * Lisenced under the MIT license.
 *
 * @version 1.2.3
 * @author mach3
 * @requires jQuery
 */
var Class = Class || {};
$.extend( Class , {create : function ( superClass ) {
    var s = superClass || {};
    return function () {
        var pt, f;
        pt = {superclass : s.prototype , rebase : function ( name ) {
            this[name] = $.extend( true , {} , this[name] );
        }};
        f = ["unbind", "bind", "trigger", "on", "off"];
        $.each( f , function ( i , name ) {
            if ( $.isFunction( $.fn[name] ) ) {
                pt[name] = function () {
                    $.fn[name].apply( $( this ) , arguments );
                    return $( this );
                };
            }
        } );
        $.extend( true , pt , s.prototype , this );
        $.extend( true , this , pt );
        if ( $.isFunction( this.initialize ) ) {
            this.initialize.apply( this , arguments );
        }
    };
} , get : function ( def , superClass ) {
    var cls = this.create( superClass );
    cls.prototype = def;
    return cls;
}} );
