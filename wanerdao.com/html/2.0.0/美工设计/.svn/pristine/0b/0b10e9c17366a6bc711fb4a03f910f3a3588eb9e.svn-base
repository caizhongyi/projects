;(function($){
	// 样式切换效果
	/*
		event [string] 	  : 事件
		className  [string] : 样式名称
	*/
	$.fn.switchover = function(event,className,selector, callback){
		var temp = null;
		event = event + '.switchover';
		var _this = this;
		if(selector){
			$(this).off(event).on(event,selector,function(){
				//if(temp) temp.removeClass(className);
				$(_this).find(selector).removeClass(className);
				temp = $(this).addClass(className);
				callback && callback($(this),$(this).index())
			})
		}
		else
		{
			$(this).off(event).on(event,function(){
				//if(temp) temp.removeClass(className);
				$(_this).removeClass(className);
				temp = $(this).addClass(className);
				selector && selector($(this),$(this).index())
			});
		}
		return this;
	}
	
	// 样式切换效果
	$.fn.switchHover= function(className,selector , callback){
		$(this).switchover('mouseenter',className , selector, callback);
		return this;
	}


	// 样式切换效果
	$.fn.switchClick = function(className,selector, callback){
		$(this).switchover('click',className,selector, callback);
		return this;
	}

})(jQuery)