;(function( $ ){
// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================

    function transitionEnd() {
        var el = document.createElement('div')

        var transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd'
            , 'MozTransition'    : 'transitionend'
            , 'OTransition'      : 'oTransitionEnd otransitionend'
            , 'transition'       : 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
    }

// http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false, $el = this
        $(this).one($.support.transition.end, function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $.fn.transitionEnd = function(callback){
        if( $.support.transition && $.support.transition.end){
            $(this).one($.support.transition.end, function () { callback && callback.call(this)})
        }
        else{
            callback.call(this);
        }
        return this;
    }

    $.support.transition = transitionEnd();

})(window.jQuery);