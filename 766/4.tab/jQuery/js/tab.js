/* JS Document 
Version:	1.0
Date:		2012/02/08
Author:		Youyin Li
Update:
*/
;(function($){
	//图片切换后载
	$.fn.lazyLoadImg = function(setting){
		var defaults = {
			lazySrc:'imgsrc',	//存放实际图片的地址，用法：<img src="空白小图片的地址" imgsrc="实际图片地址" />
			blank:'http://img.ue.766.com/common/blank.gif'	//透明小图片的默认地址
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(i){
			if(!$(this).attr(setting.lazySrc)){
				return;
			}
			if($(this).attr("src")=='' || $(this).attr("src")==setting.blank){
				$(this).attr("src",$(this).attr(setting.lazySrc));
			}
		});
	}
	$.fn.tab = function(setting){
		var defaults = {
			menu : '.tab_menu',	//标签菜单
			cmenu:	'tab_menu',	//标签菜单类名
			menuList : 'li',	//菜单单元块
			current : 'select',//被选中的标签菜单块的样式名
			con : '.tab_main',	//被切换的容器名
			ccon: 'tab_main',	//被切换的容器类名
			//timer : '3000',	//自动轮播间隔
			//isAuto : false	//是否自动轮播，默认关闭
			blank : 'http://img.olcdn.com/common/blank.gif', //默认空白图片地址
			mouseType : 'click' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu).eq(0);
			var $con = $box.find(setting.con);
			var $li = $menu.find(setting.menuList);
			
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.eq(0).show().siblings(setting.ccon).hide();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.eq(i).addClass(setting.current).siblings(setting.menuList).removeClass(setting.current);
					$con.eq(i).show().siblings(setting.ccon).hide();
					$con.eq(i).find("img").lazyLoadImg({blank:setting.blank});
				});
			});
			//自动轮播功能add code here
		});
	}
})(jQuery);