
;(function ($) {
	
	$.fn.imgload = function(options){
		var obj = $(this);
		var _options = {
            img  : 'img'
		}
		
		options = $.extend(true,{},_options, options);
        var _this = this;
        var $img = $(this).css({ position : 'relative'}).find(options.img),
            $wrap = $('<div/>').appendTo(this).append( $img).css('position', 'absolute').addClass('imgload-box')

        $img.off('load.imgload').on('load.imgload',function(){
            loadImage();
        })

        function loadImage(){
            var percent = parseFloat($img.outerWidth()/$img.outerHeight());
            $img.hide();
            var left =  ( $(_this).width() -  $img.outerWidth()) / 2 + $(_this).scrollLeft();
            var top =  ( $(_this).height() -  $img.outerHeight()) / 2 + $(_this).scrollTop();

            var size = {
                width : $img.outerWidth(),
                height : $img.outerHeight()
            };
            if($img.outerWidth()  > $img.outerHeight() && $img.outerWidth() > $(_this).width() ){
                size.width = $(_this).width() ;
                size.height = size.width / percent;
            }

            if($img.outerHeight()  > $img.outerWidth() && $img.outerHeight() > $(_this).height() ){
                size.height =  $(_this).height() ;
                size.width = size.height * percent;
            }

            $wrap.stop(true).animate({
                left : left ,
                top  : top,
                width :  size.width + 'px',
                height : size.height + 'px'
            },function(){
                $img.stop(true).fadeIn();
            });
        }
		return this;
    }
})(jQuery);