/* JS Document
Userfor:	jQuery plugin for 766 common work
Version:	1.0
Date:		2012/02/28
Author:		Youyin Li
Update:
Content:	1.淡入淡出幻灯/2.返回顶部/3.单元内容滚动/4.走马灯/5.文本滚动/6.标签切换+图片后载/7.菜单、大菜单/8.ie6fixed
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
//2.返回顶部
$(function(){
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
});
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
			//timer : '3000',	//自动轮播间隔
			//isAuto : false	//是否自动轮播，默认关闭
			blank : 'http://img.olcdn.com/common/blank.gif', //默认空白图片地址
			mouseType : 'click' //默认鼠标控制标签方式有'click'和'mouseover'
		}
		setting = $.extend({},defaults,setting);
		return this.each(function(k){
			var $box = $(this);
			var $menu = $box.find(setting.menu+':first');
			var $con = $box.children(setting.con);
			var $li = $menu.children(setting.menuList);
			$li.removeClass(setting.current).eq(0).addClass(setting.current);
			$con.hide().eq(0).show();
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
//8.ie6png
/**
* DD_belatedPNG: Adds IE6 support: PNG images for CSS background-image and HTML <IMG/>.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_belatedPNG/
* Version: 0.0.8a
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_belatedPNG/#license
*
* Example usage:
* DD_belatedPNG.fix('.png_bg'); // argument is a CSS selector
* DD_belatedPNG.fixPng( someNode ); // argument is an HTMLDomElement
**/
var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
//9.ie6fixed
(function($){
$.fn.alIE6Fixed = function(setting){
	var defaults = {
		flag:true	//是否窗口垂直居中
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(obj){
		var b_v = navigator.appVersion;
		var IE6 = b_v.search(/MSIE 6/i) != -1;
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