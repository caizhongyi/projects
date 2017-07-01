!(function( $ ){

    $.fn.hideWeixinMenu = function(){
        WeixinJSBridge.call('hideOptionMenu');
        return this;
    }

    $.fn.shareWeiXin = function( options , callback ){
        options = $.extend( {},{
            "appid": null,
            "img_url": '',
            "img_width": "640",
            "img_height": "640",
            "link": '',
            "desc": '',
            "title": ''
        } , options );
        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage',options, callback );
        });

        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', options, callback );

        });

        var weiboContent = '';
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content": options.title + options.link,
                "url": options.link
            }, callback );
        });

        WeixinJSBridge.on('menu:share:facebook', function (argv) {
            WeixinJSBridge.invoke('shareFB',options, callback );
        });

        return this;
    }

})( window.jQuery || require('jquery'));