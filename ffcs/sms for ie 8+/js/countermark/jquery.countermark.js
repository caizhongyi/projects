;(function( $ ){
    $.fn.countermark = function( setting ){
        var defaults = {
            container : '.countermark-container',
            item      : '.countermark-item'
        }
        setting = $.extend( true, {} , defaults , setting) ;

        var $container = $(setting.container);
        $container.off('click.countermark').on('click.countermark' , '.delete' , function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().stop(true).fadeOut(function(){ $(this).remove(); })
        })

        $(this).off('mousedown.countermark click.countermark').on('mousedown.countermark' , setting.item , function( e ){
            e.preventDefault();
            var $tag = $(this).clone().appendTo('body').css({
                position : 'absolute',
                left : $(this).offset().left,
                top : $(this).offset().top
            }).jdraggable({
                stop : function(){
                    if( $(this).offset().left > $container.offset().left &&
                        $(this).offset().left < $container.offset().left + $container.width() &&
                        $(this).offset().top > $container.offset().top &&
                        $(this).offset().top < $container.offset().top + $container.height()){
                        var $newTag = $tag.clone().removeAttr('style').appendTo($container),
                            offset = $newTag.offset();
                        $newTag.hide();
                        $tag.animate({ left : offset.left , top : offset.top },function(){
                            $newTag.show();
                            $(this).remove();
                        });
                        $tag.jundraggable();
                    }
                    else{
                        $tag.stop(true).fadeOut(function(){ $(this).remove(); })
                    }
                }
            }).mousedown();
        }).on('click.countermark' , '.delete' , function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().stop(true).fadeOut(function(){ $(this).remove(); })
        })
        return this;
    }
})(jQuery);