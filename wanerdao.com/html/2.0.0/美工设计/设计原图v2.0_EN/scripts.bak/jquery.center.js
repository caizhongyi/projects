	/*
    @name    		 			: 局中
	@animate  [bool] 			: true || false
	@position [string] 			: relative || absolute
	@duration [string || int]   : 
	@parent   [selector]		: 所在的父级标签，无则为默认的上一级
	@axis 	  [string]			: x || y || auto
	@callback [function]		: 回调
	*/

;(function ($) {
	
	$.fn.center = function(options){
		var obj = $(this);
		var _options = {
		    animate 	: true,		 
			position 	: 'absolute',      
			duration	: 'slow',
			parent  	:  $(window),     
			axis   		: 'auto',          
			callback	:  null           
		}
		
		options = $.extend(_options, options);
		var parent = options.parent ? $(options.parent) : $(this).parent();
		
		var left =  ( parent.width() - obj.outerWidth()) / 2 + parent.scrollLeft();
		var top =  ( parent.height() - obj.outerHeight()) / 2 + parent.scrollTop();
		
		var params = {};
        switch (options.position) {
        case "relative":
				 $(this).css('position','relative');
                break;
            case "absolute":
			    $(this).css('position','absolute');
            break;
			default:break;
        }
		if(options.axis == 'x'){
			params['left'] = left ;
		}
		else if(options.axis == 'y'){
			params['top'] = top ;
		}
		else{
			params['left'] = left ;
			params['top'] = top ;
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