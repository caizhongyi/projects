/*
**	create	:	2012-03-30
**	useFor	:	scrollUp plugin
** update	:	2012/04/06 - add scrollDown event
*/
(function($){
$.fn.scrollUp = function(setting){
	var defaults = {
		photo			:	'.scrollUp_photo',	//大图容器
		thumb			:	'.scrollUp_thumb',	//缩略图容器
		btnUp			:	'.scrollUp_btn',		//上滚按钮
		btnDown		:	'.scrollDown_btn',		//上滚按钮
		scrollTime	:	3000,	//滚动间隔时间
		aniTime		:	500	//滚动时间
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		//init
		var $box = $(this);
		var $photo = $box.find(setting.photo);
		var $thumb = $box.find(setting.thumb);
		var $btn = $box.find(setting.btnUp) || '';
		var $btnDown = $box.find(setting.btnDown) || '';
		var thumb = $thumb.clone();
		var step = $thumb.find('li').outerHeight(true);
		var length = $thumb.find("li").length;
		var flag = flag2 = 0;
		var timer = '';
		var door = 'close';
		var con = $thumb.find("ul").eq(0);
		$thumb.append(thumb.html());
		//isAutoStop
		if(step*length <= $thumb.height()) return;
		//play
		var play = function(){
			$btn.unbind('click');
			flag++;
			con.animate({marginTop:'-'+step*flag+'px'},setting.aniTime,function(){
				if(flag == length){
					//init again
					flag = 0;
					con.css({marginTop:0});
				}
				$photo.find('li').eq(flag).stop(true,true).show().siblings().hide();
				flag2 = flag;
				$btn.bind('click',function(){
					play();
				});
			});
		}
		//backScroll
		var backScroll = function(){
			$btnDown.unbind('click');
			if(flag2 == 0){
				//init again
				flag2 = length;
				con.css({marginTop:'-'+step*flag2+'px'});
			}
			flag2--;
			$thumb.find("ul").eq(0).animate({marginTop:'-'+step*flag2+'px'},setting.aniTime
			,function(){
				$photo.find('li').eq(flag2).stop(true,true).show().siblings().hide();				
				flag = flag2;
				$btnDown.bind('click',function(){
					backScroll();
				});
			});
		}
		//autoPlay
		var autoPlay = function(){
			if(door == 'open'){			
				play();
			}else{
				door = 'open';
			}
			timer = setTimeout(autoPlay,setting.scrollTime);
		}
		autoPlay();
		//click up
		if($btn && typeof($btn)!=undefined)
		{
			$btn.bind('click',function(){
				play();
			});
		}
		//click down
		if($btnDown && typeof($btnDown)!=undefined)
		{
			$btnDown.bind('click',function(){
				backScroll();
			});
		}
		//stop
		$box.hover(function(){
			clearTimeout(timer);
			door = 'close';
		},function(){
			autoPlay();
		});
	});
}	
})(jQuery);