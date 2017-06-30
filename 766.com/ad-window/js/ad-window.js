$(function(){
    var script = document.createElement('script'),
        src = "http://manads.static.766app.com/js/get_ad_66_561_s.js",
        type = "javascript/text";
    script.src = src;
    script.type = type;
    var $window = $('<div class="ad-window"></div>');
    var $windowInner = $('<div class="ad-window-inner"></div>').append($('<a href="javascript:;" class="ad-window-close">关闭</a>').click(function(){
        $window.stop(true).animate({ height : 'hide' });
    }));

    $('body').append($window.append($windowInner));
    $window.fixed().stop(true).animate({ height : 'show' });
});