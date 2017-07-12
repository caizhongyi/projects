!(function ($) {
    $.fn.accordion = function (options) {
        options = $.extend(true, {}, {
            heading: '.accordion-heading',
            panel: '.accordion-panel',
            item: '.accordion-item',
            easing : 'linear',
            duration : 'fast',
            collapse: true,
            delegateTarget: ''  // .accordion
        }, options);

        var clickEvent = document.hasOwnProperty("ontouchstart") ? 'tap' : 'click';

        return $(this).each(function () {

            var self = this//, temp = $( this ).find(options.panel + ':visible').closest( options.item );
            options.heading = $(this).data('heading') || options.heading;
            options.panel = $(this).data('panel') || options.panel;
            options.item = $(this).data('item') || options.item;

            $(this).off(clickEvent + '.accordion').on(clickEvent + '.accordion', options.heading + ',[data-target]', function () {

                var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);

                var $item = $(this).closest(options.item) ,
                    $panel = $item.find(options.panel),
                    ishorizontal = me.hasClass('horizontal');

                options.collapse = me.data('collapse') == undefined ? options.collapse : me.data('collapse');

                if (!me.children(options.item).length) {

                    $panel = $(this).data('target') ? $($(this).data('target')) : $(this).next( options.panel );

                    if (!$panel.is(':animated')) {
                        if (me.hasClass('horizontal') || me.hasClass('accordion-horizontal')) {
                            if (me.hasClass('dockbar')) {
                                /*  if( me.hasClass('in'))
                                 me.removeClass('in');
                                 else
                                 me.addClass('in');*/
                                me.toggleClass('active');
                            }
                            else
                                $panel.stop(true,true).animate(
                                    { width: 'toggle' } ,
                                    options.duration ,
                                    options.easing ,
                                    function(){ me.toggleClass('active');}
                                );
                        }
                        else {
                            $panel.stop(true,true).slideToggle(
                                options.duration ,
                                options.easing ,
                                function(){  me.toggleClass('active');  }
                            );
                        }
                        me.trigger('change', { item: $item });
                    }
                }

                if (!$panel.is(':animated')) {

                    !me.data('temp') && me.data('temp', me.find(options.panel + ':visible').closest(options.item));
                    if (options.collapse) {

                      //  $panel.stop(true).slideToggle(options.duration , options.easing ,function(){ $(this).closest( options.item ).removeClass( 'active' );});

                        var $siblings =  $item.siblings();

                        function removeActive(){
                            var $item = $(this).closest( options.item );
                            $item.length ? $item.removeClass('active') : me.removeClass('active');
                        }
                        var $sp =  $siblings.find(options.panel).stop(true,true);
                        if (ishorizontal) {
                            $sp.animate({ width: 'hide'} ,options.duration , options.easing ,function(){ removeActive.call( this );});
                        }
                        else {
                            $sp.slideUp(options.duration , options.easing ,function(){  removeActive.call( this ); });
                        }
                    }


                    var $ip =  $item.find(options.panel).stop(true,true);
                    if (ishorizontal) {
                       /* options.collapse ?
                            $ip.animate({ width: 'show'},options.duration , options.easing ,function(){$item.addClass('active')})
                            :*/
                            $ip.animate({ width: 'toggle'},options.duration , options.easing ,function(){$item.toggleClass('active')});
                    }
                    else {

                        /*options.collapse ?
                            $ip.slideUp(options.duration , options.easing ,function(){ $item.addClass('active')})
                            :*/
                            $ip.slideToggle(options.duration , options.easing ,function(){ $item.toggleClass('active')});
                    }
                    console.log(222)
                    me.trigger('change', { item: $item });
                    me.data('temp', $item);
                }
            })

        })
    }
})(window.jQuery || Zepto);

