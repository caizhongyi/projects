/* JS Document 
User for:	js特效-弹出菜单
Version:	1.0
Date:		2011/04/12
Author:		Youyin Li
Update:
*/
;(function($){
	$.fn.bigMenu = function(setting){
		var defaults = {
			container : '.popmenu_hole',	//大容器
			list : '.popmenu_list',			//第一级菜单DIV
			box : '.popmenu_box',			//弹出菜单DIV
			cur : 'ph_select'				//当前选中的菜单class名
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(){
			var time = time_class = '';
			var $li = $(setting.list+" > li");
			var $box = $(setting.box);
			var $ul = $(setting.box+" > ul");
			//弹出整个菜单
			$li.each(function(i,j){
				$(j).hover(function(){
					clearTimeout(time);
					clearTimeout(time_class);
					$li.removeClass(setting.cur);
					$(j).addClass(setting.cur);
					$box.slideDown("normal");
				},function(){
					time = setTimeout(function(){$box.stop(true,true).slideUp("normal"); },100);
					time_class = setTimeout(function(){ $li.removeClass(setting.cur); },100);
				});
			});
			//鼠标在弹出菜单上的事件
			$box.hover(function(){
				clearTimeout(time);
				clearTimeout(time_class);
			},function(){
				time = setTimeout(function(){$box.stop(true,true).slideUp("normal"); },100);
				$li.removeClass(setting.cur);
			});
			//鼠标移动到子菜单，相应父菜单增加类；注释该段代码可取消该效果
			$ul.each(function(i,j){
				$(j).mouseover(function(){
					$li.removeClass(setting.cur);
					$li.eq(i).addClass(setting.cur);
				});
			});
		});
	}	
})(jQuery);