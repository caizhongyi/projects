/* JS Document 
Usefor:		图片幻灯片效果-淡入淡出
Version:	1.0
Date:		2011/12/26
Author:		Youyin Li
Update:		2012/2/7
*/
;(function($){
$.fn.alFadeslider = function(setting){
	//参数设置
	defaults = {
		//box:'#alFade',			//容器DIV
		pic:'.alFade-pic',		//图片DIV
		title:'.alFade-flag',	//标题DIV
		mouseType:'click',		//鼠标控制方式
		on:'alFade-on',			//选中标签的类
		flag:0,					//默认第一个显示的内容，一般不做修改
		isAuto:true,			//是否自动播放
		timeScroll:3000			//轮播时间 - 秒
	};
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		//变量初始化
		var $box = $(this);
		var $pic = $box.children(setting.pic);
		var $title = $box.children(setting.title);
		var $picLi = $pic.children('li');
		var $titleLi = $title.children('li');
		var length = ($picLi.length > $titleLi.length) ? $titleLi.length : $picLi.length;
		var current = setting.on || 'alFade-on';
		var time = index = '';
		var flag = setting.flag;
		//基本动画
		var ani = function(x){
			$picLi.stop(true,true).eq(x).fadeIn(1000).siblings().fadeOut(1000);
			$titleLi.eq(x).addClass(current).siblings().removeClass(current);
		}
		//鼠标事件绑定
		$titleLi.each(function(i,j){
			$(j).bind(setting.mouseType,function(){
				ani(i);
				flag = i;
			});
		});	
		//自动播放
		var play = function(){
			ani(flag);
			flag++;
			if(flag == length){ flag = 0; }
			time = setTimeout(function(){
				play();
			}, setting.timeScroll);
		}
		//是否执行自动播放
		if(setting.isAuto){
			play();
			//鼠标悬停
			$box.hover(function(){
				clearTimeout(time);
			},function(){
				play();
			});
		}else{
			ani(setting.flag);
		}
	});
};
})(jQuery);