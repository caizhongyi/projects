/* JS Document
Userfor:	jQuery plugin for 766 common work
Version:	1.0
Date:		2012/02/28
Author:		Youyin Li
Update:
Content:	1.淡入淡出幻灯/2.返回顶部/3.单元内容滚动/4.走马灯/5.文本滚动/6.标签切换+图片后载/7.菜单、大菜单/8.ie6fixed/9.向上滚动
*/
//1.淡入淡出幻灯
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
		var door = 'open';
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
			if(door == 'open'){
				ani(flag);
				flag++;
				if(flag == length){ flag = 0; }
			}else{
				door = 'open';
			}
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
				door = 'close';
			},function(){
				play();
			});
		}else{
			ani(setting.flag);
		}
	});
};
})(jQuery);
//2.返回顶部
function alBackToTop(){
	//显示的文字
	var $al766_BackText = "返回顶部";	
	var $al766_BackBox = $('<div class="al_backTop"></div>').appendTo($("body"))
		//title属性设置成该文字
		.text($al766_BackText).attr("title", $al766_BackText).click(function() {
			$("html, body").animate({ scrollTop: 0 }, 120);
	});
	var $al766_BackFunc = function() {
		//获取滚动条高度和浏览器宽度
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $al766_BackBox.show(): $al766_BackBox.hide();	
		//IE6下的定位
		if (!window.XMLHttpRequest) {
			$al766_BackBox.css("top", st + winh - 166);	
		}
	};
	//为滚动事件绑定函数
	$(window).bind("scroll", $al766_BackFunc);
	$al766_BackFunc();
}
//3.单元内容滚动
(function($){
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
			var length = $ul.find('li').length;
			//动画宽度
			$step = $liFirst.outerWidth(true);		//outerWidth(),加参数true的时候才会计算边距在内。默认参数为false,默认包括补白和边框
			if(length*$step < $scroll.width()) return;
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
//4.带图片内容滚动
(function($){
     $.fn.scrollerimg = function(options){
         var opts = $.extend({},$.fn.scrollerimg.defaults, options);
         return this.each(function(){
             var $marquee = $(this);
             var _scrollObj = $marquee.get(0);
             var scrollW = $marquee.width();
             var scrollH = $marquee.height();
             var $element = $marquee.children();
             var $kids = $element.children();
             var scrollSize=0;
             var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;
             $element.css(_type?'width':'height',10000);
             if (opts.isEqual) {
                 scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
             }else{
                 $kids.each(function(){
                     scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                 });
             }
             $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
             var numMoved = 0;
             function scrollFunc(){
                 var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
                 if (opts.loop > 0) {
                     numMoved+=opts.scrollAmount;
                     if(numMoved>scrollSize*opts.loop){
                         _scrollObj[_dir] = 0;
                         return clearInterval(moveId);
                     } 
                 }
                 if(opts.direction == 'left' || opts.direction == 'up'){
                     _scrollObj[_dir] +=opts.scrollAmount;
                     if(_scrollObj[_dir]>=scrollSize){
                         _scrollObj[_dir] = 0;
                     }
                 }else{
                     _scrollObj[_dir] -=opts.scrollAmount;
                     if(_scrollObj[_dir]<=0){
                         _scrollObj[_dir] = scrollSize;
                     }
                 }
             }
             var moveId = setInterval(scrollFunc, opts.scrollDelay);
             $marquee.hover(
                 function(){
                     clearInterval(moveId);
                 },
                 function(){
                     clearInterval(moveId);
                     moveId = setInterval(scrollFunc, opts.scrollDelay);
                 }
             );
			 if(opts.direction == 'left'|| opts.direction == 'right')
			 {
				$marquee.parent().find('.imgright').mouseover(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'left',scrollAmount:2});
					moveId = setInterval(scrollFunc,1);
				});
				$marquee.parent().find('.imgright').mouseout(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'left',scrollAmount:1});
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				});
				$marquee.parent().find('.imgleft').mouseover(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'right',scrollAmount:2});
					moveId = setInterval(scrollFunc,1);
				});
				$marquee.parent().find('.imgleft').mouseout(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'right',scrollAmount:1});
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				});
			 }
			 else
			 {
				 $marquee.parent().find('.imgdown').mouseover(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'up',scrollAmount:2});
					moveId = setInterval(scrollFunc,1);
				});
				$marquee.parent().find('.imgdown').mouseout(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'up',scrollAmount:1});
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				});
				$marquee.parent().find('.imgup').mouseover(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'down',scrollAmount:2});
					moveId = setInterval(scrollFunc,1);
				});
				$marquee.parent().find('.imgup').mouseout(function(){
					clearInterval(moveId);
					opts = $.extend({},$.fn.scrollerimg.defaults, {direction:'down',scrollAmount:1});
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				});
			 }
         });
     };
     $.fn.scrollerimg.defaults = {
         isEqual:true,//所有滚动的元素长宽是否相等,true,false
         loop: 0,//循环滚动次数，0时无限
         direction: 'left',//滚动方向，'left','right','up','down'
         scrollAmount:1,//步长
         scrollDelay:60,//时长
		 num:4
     };
     $.fn.scrollerimg.setDefaults = function(settings) {
         $.extend( $.fn.scrollerimg.defaults, settings );
     };
})(jQuery);
//5.文本滚动
(function($){
     $.fn.kxbdMarquee = function(options){
         var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
         return this.each(function(){
             var $marquee = $(this);//滚动元素容器
             var _scrollObj = $marquee.get(0);//滚动元素容器DOM
             var scrollW = $marquee.width();//滚动元素容器的宽度
             var scrollH = $marquee.height();//滚动元素容器的高度
             var $element = $marquee.children(); //滚动元素
             var $kids = $element.children();//滚动子元素
             var scrollSize=0;//滚动元素尺寸
             var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下
             //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
             $element.css(_type?'width':'height',10000);
             //获取滚动元素的尺寸
             if (opts.isEqual) {
                 scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
             }else{
                 $kids.each(function(){
                     scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                 });
             }
             //滚动元素总尺寸小于容器尺寸，不滚动
             if (scrollSize<(_type?scrollW:scrollH)) return; 
             //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
             $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
             var numMoved = 0;
             function scrollFunc(){
                 var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
                 if (opts.loop > 0) {
                     numMoved+=opts.scrollAmount;
                     if(numMoved>scrollSize*opts.loop){
                         _scrollObj[_dir] = 0;
                         return clearInterval(moveId);
                     } 
                 }
                 if(opts.direction == 'left' || opts.direction == 'up'){
                     _scrollObj[_dir] +=opts.scrollAmount;
                     if(_scrollObj[_dir]>=scrollSize){
                         _scrollObj[_dir] = 0;
                     }
                 }else{
                     _scrollObj[_dir] -=opts.scrollAmount;
                     if(_scrollObj[_dir]<=0){
                         _scrollObj[_dir] = scrollSize;
                     }
                 }
             }
             //滚动开始
             var moveId = setInterval(scrollFunc, opts.scrollDelay);
             //鼠标划过停止滚动
             $marquee.hover(
                 function(){
                     clearInterval(moveId);
                 },
                 function(){
                     clearInterval(moveId);
                     moveId = setInterval(scrollFunc, opts.scrollDelay);
                 }
             );
         });
     };
     $.fn.kxbdMarquee.defaults = {
         isEqual:true,//所有滚动的元素长宽是否相等,true,false
         loop: 0,//循环滚动次数，0时无限
         direction: 'left',//滚动方向，'left','right','up','down'
         scrollAmount:1,//步长
         scrollDelay:20//时长
     };
     $.fn.kxbdMarquee.setDefaults = function(settings) {
         $.extend( $.fn.kxbdMarquee.defaults, settings );
     };
})(jQuery);

//6.标签切换+图片后载
(function($){
	//图片切换后载
	$.fn.lazyLoadImg = function(setting){
		var defaults = {
			lazySrc:'imgsrc',	//存放实际图片的地址，用法：<img src="空白小图片的地址" imgsrc="实际图片地址" />
			blank:'http://img.olcdn.766.com/common/blank.gif'	//透明小图片的默认地址
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
			menuList : 'li',	//菜单单元块
			current : 'select',//被选中的标签菜单块的样式名
			con : '.tab_main',	//被切换的容器名
			eq : 1,				//默认显示第几个标签页内容
			//timer : '3000',	//自动轮播间隔
			//isAuto : false	//是否自动轮播，默认关闭
			blank : 'http://img.olcdn.com/common/blank.gif', //默认空白图片地址
			mouseType : 'click' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu+':first');
			var $con = $box.find(setting.con);
			var $li = $menu.find(setting.menuList);
			var index = setting.eq-1;
			$li.removeClass(setting.current).eq(index).addClass(setting.current);
			$con.hide().eq(index).show();
			$li.each(function(i,j){
				$(j).bind(setting.mouseType,function(){
					$li.removeClass(setting.current).eq(i).addClass(setting.current);
					$con.hide().eq(i).show();
					$con.eq(i).find("img").lazyLoadImg({blank:setting.blank});
				});
			});
			//自动轮播功能add code here
		});
	}
})(jQuery);
//7.级联菜单+大菜单+hoverInter插件
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
(function($){
	$.fn.menusdl=function(){
		jQuery($).hoverIntent( 
			function(){ jQuery(this).children("dd").show();jQuery(this).children("dt").attr("class","cur");},
			function(){ jQuery(this).children("dd").hide();jQuery(this).children("dt").attr("class","");} 
		);
		return this;
	};
	$.fn.menu=function(style){	
		$(this).hoverIntent( 
			function(){jQuery(this).children("ul").show();jQuery(this).children("a").attr("class","select"+style);},
			function(){jQuery(this).children("ul").hide();jQuery(this).children("a").attr("class",""+style);} 
		);
		return this;
	};
})(jQuery);
//bigMenu大菜单
(function($){
$.fn.bigMenu = function(setting){
	var defaults = {
		list : '.popmenu_list',			//第一级菜单DIV
		box : '.popmenu_box',			//弹出菜单DIV
		cur : 'ph_select'				//当前选中的菜单class名
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		var $this = $(this)
		var time = time_class = '';
		var $box = $this.children(setting.box);
		var $li = $this.children(setting.list).children("li");
		var $ul = $box.children("ul");
		//弹出整个菜单
		$li.each(function(i,j){
			$(j).hover(function(){
				clearTimeout(time);
				clearTimeout(time_class);
				$li.removeClass(setting.cur);
				$(j).addClass(setting.cur);
				$box.stop(true,true).slideDown("normal");
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
//9.ie6fixed
(function($){
$.fn.alIE6Fixed = function(setting){
	var defaults = {
		flag:true	//是否窗口垂直居中
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(obj){
		var b_v = navigator.appVersion;
		var IE9 = b_v.search(/MSIE 9/i) != -1;
		var IE8 = b_v.search(/MSIE 8/i) != -1;
		var IE7 = b_v.search(/MSIE 7/i) != -1;
		var IE6 = b_v.search(/MSIE 6/i) != -1;
		if(IE9 || IE8 || IE7){
			IE6 = false;	
		}
		if (IE6){//如果是IE6，则执行修正；否则不修正
			var $box = $(this);
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
/*10.scrollUp
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