

!(function( $ ){
    $.fn.grade = function(){

        function setVal( index ){
            $(this).find('.icon:lt('+ (index + 1) +')').addClass('active')
            $(this).find('.icon:gt('+ index +')').removeClass('active')
        }
        return $(this).each(function(){
            $(this).off('click.grade mouseenter.grade mouseleave.grade').on('mouseenter.grade','.icon',function(){
                setVal.call( $(this).parent() , $(this).index() );
            }).on('click.grade','.icon',function(){
                var $elem = $(this).parent();
                setVal.call(  $(this).parent() ,$(this).index() );
                $elem.find(':hidden').val( $(this).index() + 1 );
            }).on('mouseleave.grade',function(){
                var index = parseInt($(this).find(':hidden').val()) - 1;
                setVal.call( this ,  index );
            })
        })
    }
})( jQuery );