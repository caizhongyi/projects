/**
 * Helper object to determine support for various CSS3 functions
 * @author Joe Lambert
 */

(function($) {

    $.browser = {
        init: function() {
            // Have we already been initialised?
            if($.browser.supportsTransitions !== undefined)
                return;

            var div = document.createElement('div'),
                prefixes = ['-webkit', '-moz', '-o', '-ms'],
                domPrefixes = ['Webkit', 'Moz', 'O', 'Ms'];

            // Does the current browser support CSS Transitions?
            if(window.Modernizr && Modernizr.csstransitions !== undefined)
                $.browser.supportsTransitions = Modernizr.csstransitions;
            else
            {
                $.browser.supportsTransitions = this.supportsCSSProperty('Transition');
            }

            // Does the current browser support 3D CSS Transforms?
            if(window.Modernizr && Modernizr.csstransforms3d !== undefined)
                $.browser.supports3d = Modernizr.csstransforms3d;
            else
            {
                // Custom detection when Modernizr isn't available
                $.browser.supports3d = this.supportsCSSProperty("Perspective");
                $(function(){
                    if ( $.browser.supports3d && 'webkitPerspective' in $('body')[0].style ) {
                        // Double check with a media query (similar to how Modernizr does this)
                        var div3D = $('<div id="csstransform3d"></div>');
                        var mq = $('<style media="(transform-3d), ('+prefixes.join('-transform-3d),(')+'-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');

                        $('body').append(div3D);
                        $('head').append(mq);

                        $.browser.supports3d = div3D.get(0).offsetLeft == 9;

                        div3D.remove();
                        mq.remove();
                    }
                })
            }

        },
        supportsCSSProperty: function(prop) {
            var div = document.createElement('div'),
                prefixes = ['-webkit', '-moz', '-o', '-ms'],
                domPrefixes = ['Webkit', 'Moz', 'O', 'Ms'];

            var support = false;
            for(var i=0; i<domPrefixes.length; i++)
            {
                if(domPrefixes[i]+prop in div.style)
                    support = support || true;
            }

            return support;
        },
        translate: function(x, y, z) {
            x = (x != undefined) ? x : 0;
            y = (y != undefined) ? y : 0;
            z = (z != undefined) ? z : 0;

            return 'translate' + ($.browser.supports3d ? '3d(' : '(') + x + 'px,' + y + ($.browser.supports3d ? 'px,' + z + 'px)' : 'px)');
        },

        rotateX: function(deg) {
            return $.browser.rotate('x', deg);
        },

        rotateY: function(deg) {
            return $.browser.rotate('y', deg);
        },

        rotateZ: function(deg) {
            return $.browser.rotate('z', deg);
        },

        rotate: function(axis, deg) {
            if(!axis in {'x':'', 'y':'', 'z':''})
                axis = 'z';

            deg = (deg != undefined) ? deg : 0;

            if($.browser.supports3d)
                return 'rotate3d('+(axis == 'x' ? '1' : '0')+', '+(axis == 'y' ? '1' : '0')+', '+(axis == 'z' ? '1' : '0')+', '+deg+'deg)';
            else
            {
                if(axis == 'z')
                    return 'rotate('+deg+'deg)';
                else
                    return '';
            }
        }
    };

    // To continue to work with legacy code, ensure that $.browser is initialised on document ready at the latest
    $.browser.init();

    /**
     * @description : 浏览器判断jquery 1.8以上不支持时补加
     * */
    var ua = navigator.userAgent.toLowerCase() ;
    $.browser.mozilla = /firefox/.test(ua) || ua.match(/gecko|khtml/i);//火狐内核
    $.browser.webkit = /webkit/.test(ua) || ua.match(/applewebkit/i);//苹果、谷歌内核
    $.browser.opera = /opera/.test(ua) || ua.match(/repsto/i);//opera内核
    $.browser.msie = /msie/.test(ua) || ua.match(/trident/i);//IE内核
    $.browser.mobile =  !!ua.match(/applewebkit.*mobile.*/) || !!ua.match(/applewebkit/) || ua.match(/iphone|ipod|ipad|android|symbianos|ios|windows phone|windows ce|ucweb|rv:1.2.3.4|midp/i); //是否为移动终端
    $.browser.ios =  !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);//ios终端
    $.browser.android =  ua.match(/android|linux/i);//android终端或者uc浏览器
    $.browser.iPhone =  ua.match(/iphone/i);
    $.browser.iPad =  ua.match(/ipad/i);
    $.browser.uc =  ua.match(/ucweb|rv:1.2.3.4/i);
    $.browser.midp =  ua.match(/midp/i);
    $.browser.safari =  ua.match(/safari/i);//是否web应该程序，没有头部与底部
    $.browser.language =  (navigator.browserLanguage || navigator.language).toLowerCase()

    $.browser.msie && (function () {
        switch(navigator.appVersion .split(";")[1].replace(/[ ]/g,"")){
            case "MSIE6.0" :   $.browser.version = 6; break;
            case "MSIE7.0" :   $.browser.version = 7; break;
            case "MSIE8.0" :   $.browser.version = 8; break;
            case "MSIE9.0" :   $.browser.version = 9; break;
            case "MSIE10.0" :   $.browser.version = 10; break;
            case "MSIE11.0" :   $.browser.version = 11; break;
            default : $.browser.version = 99; break;
        }
    })();

})(window.jQuery || require('jquery'));