/* JS Document
Userfor:	jQuery plugin for 766 common work
Version:	1.0
Date:		2012/02/28
Author:		Youyin Li
Update:
Content:	1.���뵭���õ�/2.���ض���/3.��Ԫ���ݹ���/4.�����/5.�ı�����/6.��ǩ�л�+ͼƬ����/7.�˵�����˵�/8.ie6fixed
*/
//1.���뵭���õ�
;(function($){
$.fn.alFadeslider = function(setting){
	//��������
	defaults = {
		//box:'#alFade',			//����DIV
		pic:'.alFade-pic',		//ͼƬDIV
		title:'.alFade-flag',	//����DIV
		mouseType:'click',		//�����Ʒ�ʽ
		on:'alFade-on',			//ѡ�б�ǩ����
		flag:0,					//Ĭ�ϵ�һ����ʾ�����ݣ�һ�㲻���޸�
		isAuto:true,			//�Ƿ��Զ�����
		timeScroll:3000			//�ֲ�ʱ�� - ��
	};
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		//������ʼ��
		var $box = $(this);
		var $pic = $box.children(setting.pic);
		var $title = $box.children(setting.title);
		var $picLi = $pic.children('li');
		var $titleLi = $title.children('li');
		var length = ($picLi.length > $titleLi.length) ? $titleLi.length : $picLi.length;
		var current = setting.on || 'alFade-on';
		var time = index = '';
		var flag = setting.flag;
		//��������
		var ani = function(x){
			$picLi.stop(true,true).eq(x).fadeIn(1000).siblings().fadeOut(1000);
			$titleLi.eq(x).addClass(current).siblings().removeClass(current);
		}
		//����¼���
		$titleLi.each(function(i,j){
			$(j).bind(setting.mouseType,function(){
				ani(i);
				flag = i;
			});
		});	
		//�Զ�����
		var play = function(){
			ani(flag);
			flag++;
			if(flag == length){ flag = 0; }
			time = setTimeout(function(){
				play();
			}, setting.timeScroll);
		}
		//�Ƿ�ִ���Զ�����
		if(setting.isAuto){
			play();
			//�����ͣ
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
//2.���ض���
$(function(){
	//��ʾ������
	var $al766_BackText = "���ض���";	
	var $al766_BackBox = $('<div class="al_backTop"></div>').appendTo($("body"))
		//title�������óɸ�����
		.text($al766_BackText).attr("title", $al766_BackText).click(function() {
			$("html, body").animate({ scrollTop: 0 }, 120);
	});
	var $al766_BackFunc = function() {
		//��ȡ�������߶Ⱥ���������
		var st = $(document).scrollTop(), winh = $(window).height();
		(st > 0)? $al766_BackBox.show(): $al766_BackBox.hide();	
		//IE6�µĶ�λ
		if (!window.XMLHttpRequest) {
			$al766_BackBox.css("top", st + winh - 166);	
		}
	};
	//Ϊ�����¼��󶨺���
	$(window).bind("scroll", $al766_BackFunc);
	$al766_BackFunc();
});
//3.��Ԫ���ݹ���
(function($){
	$.fn.stepScroll = function(setting){
		//��������
		var defaults = {
			aniTime:500,				//����ʱ�䣬��λ������
			autoPlay:true,				//�Ƿ��Զ��ֲ�
			btn_left:'.rightscroll',	//�������ť
			btn_right:'.leftscroll',	//�ҹ�����ť
			//easingType:'easeOutExpo',	//����Ч��,�Ƽ�easeInOutExpo,easeOutBounce,easeInOutBack
			scrollTime:3000				//�ֲ�ʱ�䣬��λ������
		}
		setting = $.extend({},defaults,setting);
		//����������ʵ��X���ֲ������Ϊ��λ������
		return this.each(function(k){
			//��ʼ��
			var $scroll = $(this);
			var flag = 'close';
			var $ul = $(this).find('ul').eq(0);
			var $liFirst = $(this).find('li').eq(0);
			//�������
			$step = $liFirst.outerWidth(true);		//outerWidth(),�Ӳ���true��ʱ��Ż����߾����ڡ�Ĭ�ϲ���Ϊfalse,Ĭ�ϰ������׺ͱ߿�
			$margin = $ul.find('li:last').outerWidth(true);
			$ul.css('margin-left','-'+$margin+'px');	//���������һ��li�Ŀ�ȣ��ù�������
			$ul.find('li:last').prependTo('.container ul:first');	//�����һ��li�ӵ�ǰ������ʹ����������ȷ�ӵ�һ����ʼ
			//X�����ֲ�
			xScroll = function(){
				$ul.stop().animate(
					{left:"-"+$step+"px"},setting.aniTime,function(){
						$(this).css({left:"0px"}).find('li:first').appendTo(this);
					}
				);
			}
			//X�����ֲ�
			xRScroll = function(){
				$ul.stop().animate(
					//{left:$step+"px"},setting.aniTime,setting.easingType,function(){
					{left:$step+"px"},setting.aniTime,function(){
						$(this).css({left:'0px'}).find('li:last').prependTo(this);
					}
				);
			}
			var time;
			//�Զ��ֲ�
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
				//��껬��ֹͣ�ֲ��������ָ��ֲ�
				$scroll.hover(function(){
					clearTimeout(time);
				},function(){
					flag='close';
					autoScroll();
				});
				//ִ��һ���ֲ�����
				autoScroll();
			}
			//���
			$scroll.find(setting.btn_left).click(function(){
				xScroll();
				return false;
			});
			//�ҽ�
			$scroll.find(setting.btn_right).click(function(){
				xRScroll();
				return false;
			});
		});
	};
})(jQuery);
//4.��ͼƬ���ݹ���
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
         isEqual:true,//���й�����Ԫ�س����Ƿ����,true,false
         loop: 0,//ѭ������������0ʱ����
         direction: 'left',//��������'left','right','up','down'
         scrollAmount:1,//����
         scrollDelay:60,//ʱ��
		 num:4
     };
     $.fn.scrollerimg.setDefaults = function(settings) {
         $.extend( $.fn.scrollerimg.defaults, settings );
     };
})(jQuery);
//5.�ı�����
(function($){
     $.fn.kxbdMarquee = function(options){
         var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
         return this.each(function(){
             var $marquee = $(this);//����Ԫ������
             var _scrollObj = $marquee.get(0);//����Ԫ������DOM
             var scrollW = $marquee.width();//����Ԫ�������Ŀ��
             var scrollH = $marquee.height();//����Ԫ�������ĸ߶�
             var $element = $marquee.children(); //����Ԫ��
             var $kids = $element.children();//������Ԫ��
             var scrollSize=0;//����Ԫ�سߴ�
             var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//�������ͣ�1���ң�0����
             //��ֹ������Ԫ�رȹ���Ԫ�ؿ��ȡ����ʵ�ʹ�����Ԫ�ؿ��
             $element.css(_type?'width':'height',10000);
             //��ȡ����Ԫ�صĳߴ�
             if (opts.isEqual) {
                 scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
             }else{
                 $kids.each(function(){
                     scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                 });
             }
             //����Ԫ���ܳߴ�С�������ߴ磬������
             if (scrollSize<(_type?scrollW:scrollH)) return; 
             //��¡������Ԫ�ؽ�����뵽����Ԫ�غ󣬲��趨����Ԫ�ؿ��
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
             //������ʼ
             var moveId = setInterval(scrollFunc, opts.scrollDelay);
             //��껮��ֹͣ����
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
         isEqual:true,//���й�����Ԫ�س����Ƿ����,true,false
         loop: 0,//ѭ������������0ʱ����
         direction: 'left',//��������'left','right','up','down'
         scrollAmount:1,//����
         scrollDelay:20//ʱ��
     };
     $.fn.kxbdMarquee.setDefaults = function(settings) {
         $.extend( $.fn.kxbdMarquee.defaults, settings );
     };
})(jQuery);

//6.��ǩ�л�+ͼƬ����
(function($){
	//ͼƬ�л�����
	$.fn.lazyLoadImg = function(setting){
		var defaults = {
			lazySrc:'imgsrc',	//���ʵ��ͼƬ�ĵ�ַ���÷���<img src="�հ�СͼƬ�ĵ�ַ" imgsrc="ʵ��ͼƬ��ַ" />
			blank:'http://img.olcdn.766.com/common/blank.gif'	//͸��СͼƬ��Ĭ�ϵ�ַ
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
			menu : '.tab_menu',	//��ǩ�˵�
			menuList : 'li',	//�˵���Ԫ��
			current : 'select',//��ѡ�еı�ǩ�˵������ʽ��
			con : '.tab_main',	//���л���������
			//timer : '3000',	//�Զ��ֲ����
			//isAuto : false	//�Ƿ��Զ��ֲ���Ĭ�Ϲر�
			blank : 'http://img.olcdn.com/common/blank.gif', //Ĭ�Ͽհ�ͼƬ��ַ
			mouseType : 'click' //Ĭ�������Ʊ�ǩ��ʽ��'click'��'mouseover'
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
			//�Զ��ֲ�����add code here
		});
	}
})(jQuery);
//7.�����˵�+��˵�+hoverInter���
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
//bigMenu��˵�
(function($){
$.fn.bigMenu = function(setting){
	var defaults = {
		list : '.popmenu_list',			//��һ���˵�DIV
		box : '.popmenu_box',			//�����˵�DIV
		cur : 'ph_select'				//��ǰѡ�еĲ˵�class��
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(){
		var $this = $(this)
		var time = time_class = '';
		var $box = $this.children(setting.box);
		var $li = $this.children(setting.list).children("li");
		var $ul = $box.children("ul");
		//���������˵�
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
		//����ڵ����˵��ϵ��¼�
		$box.hover(function(){
			clearTimeout(time);
			clearTimeout(time_class);
		},function(){
			time = setTimeout(function(){$box.stop(true,true).slideUp("normal"); },100);
			$li.removeClass(setting.cur);
		});
		//����ƶ����Ӳ˵�����Ӧ���˵������ࣻע�͸öδ����ȡ����Ч��
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
		flag:true	//�Ƿ񴰿ڴ�ֱ����
	}
	setting = $.extend({},defaults,setting);
	return this.each(function(obj){
		var b_v = navigator.appVersion;
		var IE6 = b_v.search(/MSIE 6/i) != -1;
		if (IE6){//�����IE6����ִ����������������
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