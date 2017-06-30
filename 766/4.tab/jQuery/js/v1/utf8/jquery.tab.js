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
			box : '#tab',		//大容器
			menu : '.tab_menu',	//标签菜单
			menuList : 'li',	//菜单单元块
			current : 'select',//被选中的标签菜单块的样式名
			con : '.tab_main',	//被切换的容器名
			//timer : '3000',	//自动轮播间隔
			//isAuto : false	//是否自动轮播，默认关闭
			blank : 'http://img.ue.766.com/common/blank.gif', //默认空白图片地址
			mouseType : 'click' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(setting.box);
			var $menu = $(setting.box + ' > ' + setting.menu);
			var $con = $(setting.box + ' > ' + setting.con);
			var $li = $(setting.box + ' > ' + setting.menu + ' > ' + setting.menuList);
			$box.find("img").each(function(i,j){
				if($(j).attr("src")==""){
					$(j).attr("src",setting.blank);
				}
			});
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.hide().eq(0).show();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.removeClass(setting.current).eq(i).addClass(setting.current);
					$con.hide().eq(i).show();
					$con.eq(i).find("img").lazyLoadImg();
				});
			});
			//自动轮播功能add code here
		});
	}
})(jQuery);