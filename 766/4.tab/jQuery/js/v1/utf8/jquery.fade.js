/* JS Document 
Usefor:		图片幻灯片效果-淡入淡出
Version:	1.0
Date:		2011/12/26
Author:		Youyin Li
Update:		2012/2/7
*/
(function($){
$.fn.alFadeslider = function(setting){
	//参数设置
	defaults = {
		box:'#alFade',			//容器DIV
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
		var $box = $(setting.box);
		var $pic = $(setting.box + ' ' + setting.pic);
		var $title = $(setting.box + ' ' + setting.title);
		var $picLi = $(setting.box + ' ' + setting.pic + '> li');
		var $titleLi = $(setting.box + ' ' + setting.title + '> li');
		var length = ($picLi.length > $titleLi.length) ? $titleLi.length : $picLi.length;
		var current = setting.on || 'alFade-on';
		var time = '';
		//基本动画
		var ani = function(x){
			$picLi.stop(true,true).eq(x).fadeIn(800).siblings().fadeOut(800);
			$titleLi.eq(x).addClass(current).siblings().removeClass(current);
			setting.flag = x+1;
			if(setting.flag == length){ setting.flag = 0; }
		}
		//鼠标点击
		$titleLi.each(function(i,j){
			$(j).bind(setting.mouseType,function(){
				ani(i);
			});
		});	
		//播放
		var play = function(){
			ani(setting.flag);
			if(!setting.isAuto){
				clearTimeout(time);
				return false;
			}
			time = setTimeout(play,setting.timeScroll);
		}
		play();
		//鼠标悬停
		$box.hover(function(){
			clearTimeout(time);
		},function(){
			//鼠标移开后，重新执行动画
			/*if(setting.isAuto){
				setTimeout(play,setting.timeScroll);
			}else{
				//to do here
			}*/
			setTimeout(play,1000);
		});
	});
};
})(jQuery);