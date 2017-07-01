!(function( $ ){

    $.fn.notice = function( options ){
        options = $.extend(true, {}, {
            interval : 5000,
            duration : 'normal',
            easing : 'linear',
            index : 0
        }, options);
        var index = 0 ;
        return $(this).each(function () {
            var self = this, timer ;
            var $items =  $(self).find('.notice-list').children();

            if($items.length <= 1) return ;

            $items.eq( options.index).addClass('in')
                .end().eq( options.index + 1).addClass('ready');

            function next(){
                var $items =  $(self).find('.notice-list').children() ,len = $items.length , $current = $items.eq( options.index );

                if($current.is(':animated')){ return ;}

                $current.animate({ 'left' : - $current.width() }, options.duration , options.easing, function(){
                    $(this).removeClass('in').css('left',0);
                    var index = options.index + 1 ;
                    options.index = index >= len ? 0 : index;
                    $items.eq( options.index ).addClass('in');
                } )

                index = options.index + 1 ;
                index = index >= len ? 0 : index;

                $items.eq( index ).addClass('ready').siblings().removeClass('ready');
            }

            function prev(){
                var $items =  $(self).find('.notice-list').children() ,len = $items.length , $current = $items.eq( options.index );

                if($current.is(':animated')){ return ;}

                $current.animate({ 'left' :  $current.width() }, options.duration , options.easing, function(){
                    $(this).removeClass('in').css('left',0);
                    var index = options.index - 1 ;
                    options.index = index < 0 ? len - 1 : index;
                    $items.eq( options.index ).addClass('in');
                });

                index = options.index - 1 ;
                index = index < 0 ? len - 1 : index;

                $items.eq( index ).addClass('ready').siblings().removeClass('ready');
            }

            timer = setInterval(next, options.interval );

            $(this).off('mouseenter.zero.notice mouseleave.zero.notice click.notice').on('mouseenter.notice',function(){
                clearInterval(timer);
            }).on('mouseleave.notice',function(){
                timer = setInterval(next, options.interval );
            }).on('click.notice','.prev,[data-prev]',function(){
                next.call( this );
            }).on('click.notice','.next,[data-next]',function(){
                prev.call( this );
            })
        })
    }

})( window.jQuery );