/* JS Document 
Usefor:		图片幻灯片效果-单块内容滚动
Version:	1.0
Date:		2011/05/09
Author:		Youyin Li
Update:		
*/
;(function($){
	$.fn.stepScroll = function(setting){
		//参数设置
		var defaults = {
			aniTime:500,				//动画时间，单位：毫秒
			autoPlay:true,				//是否自动轮播
			btn_left:'.rightscroll',	//左滚动按钮
			btn_right:'.leftscroll',	//右滚动按钮
			//easingType:'easeOutExpo',	//动画效果,推荐easeInOutExpo,easeOutBounce,easeInOutBack
			scrollTime:3000				//轮播时间，单位：毫秒
		}
		setting = $.extend({},defaults,setting);
		//功能描述：实现X轴轮播，宽度为单位个内容
		return this.each(function(k){
			//初始化
			var $scroll = $(this);
			var flag = 'close';
			var $ul = $(this).find('ul').eq(0);
			var $liFirst = $(this).find('li').eq(0);
			//动画宽度
			$step = $liFirst.outerWidth(true);		//outerWidth(),加参数true的时候才会计算边距在内。默认参数为false,默认包括补白和边框
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css('margin-left','-'+$margin+'px');	//左缩进最后一个li的宽度，让滚动连贯
			$ul.find('li:last').prependTo('.container ul:first');	//将最后一个li加到前面来，使得内容能正确从第一个开始
			//X轴左轮播
			xScroll = function(){
				$ul.stop().animate(
					{left:"-"+$step+"px"},setting.aniTime,function(){
						$(this).css({left:"0px"}).find('li:first').appendTo(this);
					}
				);
			}
			//X轴右轮播
			xRScroll = function(){
				$ul.stop().animate(
					//{left:$step+"px"},setting.aniTime,setting.easingType,function(){
					{left:$step+"px"},setting.aniTime,function(){
						$(this).css({left:'0px'}).find('li:last').prependTo(this);
					}
				);
			}
			var time;
			//自动轮播
			autoScroll = function(){
				if(flag == 'open'){
					xScroll();
				}
				else{
					flag = 'open';
				}
				time = setTimeout(autoScroll,setting.scrollTime);
			}
			if(setting.autoPlay){
				//鼠标滑入停止轮播，滑出恢复轮播
				$scroll.hover(function(){
					clearTimeout(time);
				},function(){
					flag='close';
					autoScroll();
				});
				//执行一次轮播函数
				autoScroll();
			}
			//左进
			$scroll.find(setting.btn_left).click(function(){
				xScroll();
				return false;
			});
			//右进
			$scroll.find(setting.btn_right).click(function(){
				xRScroll();
				return false;
			});
		});
	};
})(jQuery);