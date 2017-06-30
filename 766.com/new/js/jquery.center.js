	/*
    @name    		 			: 局中
	@animate  [bool] 			: true || false
	@position [string] 			: relative || absolute
	@duration [string || int]   : 
	@context   [selector]		: 所在的父级标签，无则为默认的上一级
	@axis 	  [string]			: x || y || auto
	@callback [function]		: 回调
	*/

;(function ($) {
	
	$.fn.center = function(options){
		var obj = $(this);
		var _options = {
		    animate 	: true,
			duration	: 'slow',
			context  	:  $(window),     
			axis   		: 'auto',          
			callback	:  null           
		}
		
		options = $.extend(true,{},_options, options);
		var context = options.context ? $(options.context) : $(this).context();
		
		var left =  ( context.width() - obj.outerWidth()) / 2 + context.scrollLeft();
		var top =  ( context.height() - obj.outerHeight()) / 2 + context.scrollTop();

        var postion = { },params = {};
        if($(this).css('position') == 'fixed' || $(this).css('position') == 'absolute'){
            postion.x = 'left';
            postion.y = 'top';
        }
        else{
            postion.x = 'margin-left';
            postion.y = 'margin-top';
        }


		if(options.axis == 'x'){
			params[postion.x] = left ;
		}
		else if(options.axis == 'y'){
			params[postion.y] = top ;
		}
		else{
			params[postion.x] = left ;
			params[postion.y] = top ;
		}
		if(options.animate){
			obj.stop().animate( params , options.speed, options.callback );
		}
		else{
			obj.css(params);
			if(options.callback)options.callback();
		}
		return this;
    }
})(jQuery);