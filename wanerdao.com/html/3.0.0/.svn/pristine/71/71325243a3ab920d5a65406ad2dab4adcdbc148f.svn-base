;
(function ( $ ) {
    $.fn.undraggable = function( setting ){
         $(document).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag');
         return $(this).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag');
    }

    $.fn.draggable = function(opts){
        var that = this;
        opts = $.extend(true,{}, {
            handler : null,
            opacity : 0.5,
            axis: '',
            containment: window, //'parent',
            start : function(e){},
            drag : function(e){},
            stop : function(e){}
        } ,opts)

        return $(this).each( function (){
            var mousedown = false;
            var pos ,
                $context = ($(this).data('containment') || opts.containment ) == 'parent' ? $(this).parent() : $( $(this).data('containment') || opts.containment ),
                $handler = $(this).find( $(this).data('handler') ||  opts.handler ),
                contextOffset =  $context.offset() || { left: 0 , top : 0 } ;

                opts.axis = $(this).data('axis') || opts.axis ,
                opts.start =  window[$(this).data('start')] || opts.start ,
                opts.drag =  window[$(this).data('drag')] || opts.drag ,
                opts.stop =  window[$(this).data('stop')]  || opts.stop ,

            $handler = $handler.length == 0 ?  $(this) : $handler;
            $context.css('position','relative');
            function mouseup (e){
                if(mousedown){
                    $handler.removeClass('draggable');
                    opts.stop && opts.stop.call(that, e);
                    mousedown = false;
                    $(that).css({'transition' : '', 'animation' : ''});
                    (opts.opacity != 1 ||  opts.opacity != "") &&  $(that).css({'opacity' : ''});
                }
            }

            $handler.css({
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                'user-select': 'none'
            }).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag')
                .on('mousedown.jdrag',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $handler.addClass('draggable');
                    mousedown = true;
                    $(that).css({
                        'transition' : 'none',
                        'animation' : 'none',
                        opacity : opts.opacity
                    });
                    if($(that).css('position') == 'static' || $(that).css('position') == 'relative'){
                        $(that).css({
                            position : 'absolute',
                            left     : $(that).offset().left - contextOffset.left,
                            top      : $(that).offset().top  - contextOffset.top
                        })
                    }

                    opts.start && opts.start.call(that, e);
                    pos = { x : e.pageX , y : e.pageY};

                    $(document).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag').on('mousemove.jdrag',function(e){
                        e.preventDefault();
                        if(mousedown){
                            var diffX = e.pageX - pos.x ,
                                diffY = e.pageY - pos.y;

                            function getLeft (){
                                var left =  $(this).position().left  + diffX ,
                                    width = $(this).outerWidth() //+ parseFloat($(this).css('padding-left')) + parseFloat($(this).css('padding-right'));
                                var fixeScrollLeft = 0;
                                if( $(this).css('position') == 'fixed'){
                                    fixeScrollLeft = $context.scrollLeft();
                                };
                                if(width + left > $context.width() + $context.scrollLeft() - fixeScrollLeft  ){
                                    left = $context.width() + $context.scrollLeft() - width  - fixeScrollLeft ;
                                }
                                else if(left < $context.scrollLeft()  - fixeScrollLeft ){
                                    left =  $context.scrollLeft()  - fixeScrollLeft   ;
                                }
                                return left ;
                            }

                            function getTop(){
                                var top =  $(this).position().top  + diffY,
                                    height = $(this).outerHeight()// + parseFloat($(this).css('padding-top')) + parseFloat($(this).css('padding-bottom'));
                                var fixeScrollTop = 0;
                                if( $(this).css('position') == 'fixed') {
                                    fixeScrollTop =  $context.scrollTop();
                                }

                                if(height + top  > $context.height() + $context.scrollTop() - fixeScrollTop) {
                                    top = $context.height()+ $context.scrollTop() - height - fixeScrollTop;
                                }
                                else if(top  < $context.scrollTop() - fixeScrollTop){
                                    top =  $context.scrollTop() - fixeScrollTop ;
                                }
                                return top ;
                            }

                            if( opts.axis == 'x' || opts.axis == 'X' ){
                                $( that).css('left', getLeft ) ;
                            }
                            else if( opts.axis == 'y' || opts.axis == 'Y' ){
                                $( that).css('top', getTop ) ;
                            }
                            else{
                                $(that).css({ left : getLeft ,top : getTop }) ;
                            }
                            pos = { x : e.pageX , y : e.pageY } ;
                            opts.drag && opts.drag.call( that ,e);
                        }
                    }).on('mouseup.jdrag',mouseup)
                }) ;
        })

    };
})( jQuery );