;(function ($) {
        /**
         * @author caizhongyi
         * @version 1.0
         * @description 局中
         * @constructor
         * @name center
         * @requires  jquery.1.7.2
         * @memberOf $.fn
         * @param {string} options 绑定事件
         * @param {string} [options.animate = true]  动画
         * @param {string} [options.duration = slow]  动画时间间隔
         * @param {string} [options.easing = linear]  线性
         * @param {string} [options.context =  $(window)]  相对的父级器
         * @param {string} [options.axis = 'auto'] 有效果的方身 x|y|auto
         * @param {callback} [options.callback = null] 回调
         * @return {object} jquery对象
         * @example $('.fixed).fixed();
         */
	$.fn.center = function(options){
		var obj = $(this);
		var _options = {
		    animate 	: false,
			duration	: 'slow',
            easing     : 'linear',
			context  	:  $(window),     
			axis   		: 'auto',          
			callback	:  null           
		};
		
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
        };

		if(options.axis == 'x'){
			params[postion.x] = left ;
		}
		else if(options.axis == 'y'){
			params[postion.y] = top ;
		}
		else{
			params[postion.x] = left ;
			params[postion.y] = top ;
		};

		if(options.animate){
			obj.stop(true,true).animate( params , options.duration,options.easing, options.callback );
		}
		else{
			obj.css(params);
            options.callback && $.proxy(options.callback,this);
		};
		return this;
    }
})(jQuery);