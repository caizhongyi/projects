/* JS Document 
Usefor:		����IE6 position:fixed bug
Version:	1.0
Date:		2012/02/10
Author:		Youyin Li
Update:		
*/
;(function($){
	$.fn.alIE6Fixed = function(setting){
		var defaults = {
			box:'.fixed',	//Ҫʹ��position:fixed����ʽ��
			flag:true	//�Ƿ񴰿ڴ�ֱ����
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(obj){
			var b_v = navigator.appVersion;
			var IE6 = b_v.search(/MSIE 6/i) != -1;
			if (IE6){//�����IE6����ִ����������������
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