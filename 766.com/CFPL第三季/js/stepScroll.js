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
            index   : 1,
			btn_left:'.rightscroll',	//左滚动按钮
			btn_right:'.leftscroll'		//右滚动按钮
		}
		setting = $.extend({},defaults,setting);
		//功能描述：实现X轴轮播，宽度为单位个内容
		return this.each(function(k){
			//初始化
			var $scroll = $(this);
			var flag = 0;
			var $ul = $(this).find('ul').eq(0);
			var length = $ul.find('li').length;
			var $liFirst = $(this).find('li').eq(0);
			var $left = $(setting.btn_left);
			var $right = $(setting.btn_right);
			var $all = $(setting.btn_left+","+setting.btn_right);
			//动画宽度
			$step = $liFirst.outerWidth(true);		//outerWidth(),加参数true的时候才会计算边距在内。默认参数为false,默认包括补白和边框
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css("width",length*$step+"px");
			//$ul.css('margin-left','-'+$margin+'px');	//左缩进最后一个li的宽度，让滚动连贯
			//$ul.find('li:last').prependTo('.container ul:first');	//将最后一个li加到前面来，使得内容能正确从第一个开始
			//X轴左轮播

            flag = setting.index;
            $ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
                if(flag!=(length-1)){$left.removeClass("scrollStop");}
                if(flag!=0){$right.removeClass("scrollStop");}
            });

            xScroll = function(){
				if(flag==(length-1)){
					return;			
				} else {
					flag++;
					$all.removeClass("scrollStop")
					$ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
						if(flag==(length-1)){$left.addClass("scrollStop");}
					});				
				}
				//alert("L:"+flag);
			}
			//X轴右轮播
			xRScroll = function(){
				if(flag==0){
					return;
				} else {
					flag--;
					$all.removeClass("scrollStop")
					$ul.stop().animate({left:"-"+$step*flag+"px"},setting.aniTime,function(){
						if(flag==0){$right.addClass("scrollStop");}
					});				
				}	
				//alert("R:"+flag);
			}
			//左进
			$left.click(function(){
				xScroll();
				return false;
			});
			//右进
			$right.click(function(){
				xRScroll();
				return false;
			});
		});
	};
})(jQuery);