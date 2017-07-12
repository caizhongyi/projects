!(function ($) {
    $.fn.scrollFixed = function (options) {
        options = $.extend(true, {}, {}, options);

        return $(this).each(function () {
            var self = this ;
            $(window).off('scroll.scrollFixed').on('scroll.scrollFixed',function(){
                    var offset = $(self).data( 'offset') || $(self).offset()  ;

                    if( $(window).scrollTop() >= offset.top){
                        $(self).data( 'offset', offset );
                        $(self).addClass('fixed');
                    }
                    else{
                        $(self).removeClass('fixed');
                    }
            })
        })
    }
})(window.jQuery || Zepto);

