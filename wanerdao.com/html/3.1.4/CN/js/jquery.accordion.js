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

                if (!me.find(options.item).length) {

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
                                $panel.stop(true).animate(
                                    { width: 'toggle' } ,
                                    options.duration ,
                                    options.easing ,
                                    function(){ me.toggleClass('active');}
                                );
                        }
                        else {
                            $panel.stop(true).slideToggle(
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

                        if (ishorizontal) {
                            $siblings.find(options.panel).animate({ width: 'hide'} ,options.duration , options.easing ,function(){ removeActive.call( this );});
                        }
                        else {

                            $siblings.find(options.panel).slideUp(options.duration , options.easing ,function(){  removeActive.call( this ); });
                        }
                    }

                    if (ishorizontal) {
                        options.collapse ? $item.find(options.panel).animate({ width: 'show'},options.duration , options.easing ,function(){$item.addClass('active')}) : $item.find(options.panel).animate({ width: 'toggle'},options.duration , options.easing ,function(){$item.toggleClass('active')});
                    }
                    else {
                        options.collapse ? $item.find(options.panel).slideToggle(options.duration , options.easing ,function(){ $item.addClass('active')}) : $item.find(options.panel).slideToggle(options.duration , options.easing ,function(){ $item.toggleClass('active')});
                    }
                    me.trigger('change', { item: $item });
                    me.data('temp', $item);
                }
            })

        })
    }
})(window.jQuery || Zepto);
