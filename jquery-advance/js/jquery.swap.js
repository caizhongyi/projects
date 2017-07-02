;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description 标签交换
     * @requires  jquery.1.7.2
     * @param {string | jQuery} target  效换对象
     * @param {object} animate
     * @example
     * */
    $.fn.swap = function ( target , animate ) {
        var $next = $(this).next(),
            $prev = $(this).prev(),
            that = this;
            $target = $(target);
            animate = animate || true;

        function animateFun ( elem1 , elem2){
            elem1.css('visibility','hidden').clone().css({
                'position' : 'absolute',
                'visibility' : ''
            }).appendTo(elem1.parent()).css(elem1.offset()).stop(true,true).animate(elem2.offset(),function(){
                $(this).remove();
                elem1.css('visibility','');
            });
        }

        if(animate){
            animateFun ( $(this) , $target);
            animateFun ( $target , $(this));
        }

        $(this).insertAfter($target);
        if($next.length){$target.insertBefore($next);}
        else{$target.insertAfter($prev);}

        return this;
    }
})( jQuery );