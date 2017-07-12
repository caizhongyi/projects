!(function($){
    $.fn.accordion = function( options ){
        options = $.extend( true, {} , {
            heading     : '.accordion-heading' ,
            panel       : '.accordion-panel' ,
            item        : '.accordion-item' ,
            collapse : true,
            delegateTarget: ''  // .accordion
        } ,options );

        return $(this).each(function(){
            var self = this//, temp = $( this ).find(options.panel + ':visible').closest( options.item );
            options.heading = $(this).data('heading') || options.heading ;
            options.panel = $(this).data('panel') || options.panel ;
            options.item = $(this).data('item') || options.item ;

            $( this ).off('click.accordion').on('click.accordion', options.heading + ',[data-target]' ,function(){
                var me = options.delegateTarget ? $(this).closest( options.delegateTarget ) : $(self) ;
                var $item = $(this).closest(options.item) ,  $panel = $item.find(options.panel), ishorizontal = me.hasClass('horizontal');
                options.collapse = me.data('collapse') == undefined ? options.collapse : me.data('collapse');
                if( !me.find( options.item ).length ){
                    $panel = $(this).data('target') ? $( $(this).data('target')) : me.find(options.panel);
                    if( !$panel.is(':animated') ){
                        if( me.hasClass('horizontal') || me.hasClass('accordion-horizontal')){
                            if( me.hasClass('dockbar')){
                              /*  if( me.hasClass('in'))
                                    me.removeClass('in');
                                else
                                    me.addClass('in');*/
                            }
                            else
                                $panel.stop(true).animate({ width : 'toggle' });
                            me.toggleClass('active');
                        }
                        else{
                            $panel.stop(true).slideToggle();
                            me.toggleClass('active');
                        }
                        me.trigger('change', { item : $item } );
                    }
                }

                if( !$panel.is(':animated') ){
                    !me.data('temp') && me.data('temp' , me.find(options.panel + ':visible').closest( options.item ) );

                    if( options.collapse ){
                        if( me.data('temp').is( $item ))  return ;
                        $item.siblings().removeClass('active');
                        if( ishorizontal ){
                            $item.siblings().find(options.panel).animate({ width : 'hide'});
                        }
                        else{
                            $item.siblings().find(options.panel).slideUp();
                        }
                    }
                    if( ishorizontal ){
                        options.collapse ? $item.addClass('active').find(options.panel).animate({ width : 'show'}): $item.toggleClass('active').find(options.panel).animate({ width : 'toggle'});
                    }
                    else{
                        options.collapse ? $item.addClass('active').find(options.panel).slideDown() : $item.toggleClass('active').find(options.panel).slideToggle();
                    }
                    me.trigger('change', { item : $item } );
                    me.data('temp' , $item );
                }
            })

        })
    }
})( window.jQuery || Zepto );

