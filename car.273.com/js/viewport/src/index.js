!(function(){
    $.viewport = function( width ){
        width = width || 640 ;
        var $meta  = $('meta[name=viewport]') ;
        if( !$meta.length )
             $meta = $('<meta/>',{ name : 'viewport' }).appendTo('head')

        var defaultContent = "width=" + width +", target-densitydpi=device-dpi";
        var defaultscale = "init-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no";

        var ua = navigator.userAgent.toLowerCase(), // 根据 user agent 的信息获取浏览器信息
            deviceWidth = window.screen.width, // 设备的宽度
            devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素的比例，默认为1
            targetDensitydpi;

        function resize(){
            // Android4.0以下手机不支持viewport的width，需要设置target-densitydpi
            if (ua.indexOf("android") !== -1 && parseFloat(ua.slice(ua.indexOf("android")+8)) < 4) {
                targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
                $('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi +
                ', width=device-width, user-scalable=no');
            }

            var phoneScale = parseInt(window.screen.width) / width;
            var content = defaultContent + ','+ "initial-scale="+ phoneScale +",minimum-scale="+ phoneScale +",maximum-scale="+ phoneScale +"";
            $meta.attr("content" ,content );
        }
        resize() ;
        $(window).off('resize.viewport').on('resize.viewport', function(){
            resize() ;
        })
        return this;
    }
    //微信去掉下方刷新栏
   /* if (navigator.userAgent.indexOf('MicroMessenger') >= 0) {
        document.addEventListener('WeixinJSBridgeReady', function () {
            //WeixinJSBridge.call('hideToolbar');
        });
    }*/
})();