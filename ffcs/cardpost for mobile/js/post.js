(function(){
    var onBridgeReady = function () {
        var params = {
            img_url : 'img/thumbnail.jpg',
            link : location.href,
            title : $(document).find('title').text(),
            desc : $(document).find('meta[name=description]').text(),
            img_width : 640,
            img_height : 640
        }

        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage', params , function(res) {});
        });
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            WeixinJSBridge.invoke('shareTimeline', params, function(res) { });
        });
    };

    if(document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if(document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
})();