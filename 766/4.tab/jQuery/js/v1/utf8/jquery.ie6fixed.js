/* JS Document 
Usefor:		修正IE6 position:fixed bug
Version:	1.0
Date:		2012/02/10
Author:		Youyin Li
Update:		
*/
;(function($){
$.fn.alIE6Fixed = function(setting){
	var defaults = {
		box:'.fixed',	//要使用position:fixed的样式名
		flag:true	//是否窗口垂直居中
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(obj){
		var b_v = navigator.appVersion;
		var IE6 = b_v.search(/MSIE 6/i) != -1;
		if (IE6){//如果是IE6，则执行修正；否则不修正
			var $box = $(setting.box);
			var $top = parseInt($box.css("top"));
			if(setting.flag){
				$boxPosy = $(document).scrollTop() + ($(window).height() - $box.height())/2 + "px";
				$box.css("top",$boxPosy);
			}
			$(window).scroll(function(){
				if(setting.flag){
					$boxPosy = $(document).scrollTop() + ($(window).height() - $box.height())/2 + "px";
				}else{
					$boxPosy = $(document).scrollTop() + $top + "px";
				}
				$box.css("top",$boxPosy);
			});
		}
	});
}
})(jQuery);