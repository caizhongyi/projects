/*
常用类
import：
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
;(function($){

  $.fn.extend({
		/* 以父级对像为标准局中 */
	    outerCenter:function(options)
        {
            var self=this;
		    var defaults =
			{
                type:"absolute"  //类型有margin,absolute
			};
	
			if (options) {
				$.extend(defaults, options);
			};
			switch(defaults.type)
			{  
				case "margin":$(this).css(
				{
					 "margin-top":($(window).height() - $(this).outerHeight())/2+$(window).scrollTop(),
					 "margin-left":($(window).width() - $(this).outerWidth())/2+$(window).scrollLeft()
				});break;
				 case "absolute":$(this).css(
				 {
					 top:($(window).height() - $(this).outerHeight())/2+$(window).scrollTop(),
					 left:($(window).width() - $(this).outerWidth())/2+$(window).scrollLeft()
				 });break;
			}
		    return this;   
        },
        /*设置Size大小 val:jQuery对像  */
        size:function(val)
        {
             var self=this;
             this.width(val.width()).height(val.height());
             return this; 
        },
        /* 获取Size对像 */
        size:function()
        {
           return {width:this.width(),height:this.height()};
        }
        });
        /* 不包括滚动条的文档宽和高 */
        $.fn.scrollSize=function()
        {
            var size={width:0,height:0};
		 	 if (document.compatMode == "BackCompat") {
			//cWidth = document.body.clientWidth;
			//cHeight = document.body.clientHeight;
			size.width = document.body.scrollWidth;
			size.height = document.body.scrollHeight;
			//sLeft = document.body.scrollLeft;
			//sTop = document.body.scrollTop;
			}
			else { //document.compatMode == "CSS1Compat"
			//cWidth = document.documentElement.clientWidth;
			//cHeight = document.documentElement.clientHeight;
			size.width  = document.documentElement.scrollWidth;
			size.height = document.documentElement.scrollHeight;
			//sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
			//sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
			}
		
			return size;
        };
})(jQuery);
/* 
jQuery操作cookie的插件,大概的使用方法如下
example $.cookie(’the_cookie’, ‘the_value’);
设置cookie的值
example $.cookie(’the_cookie’, ‘the_value’, {expires: 7, path: ‘/’, domain: ‘jquery.com’, secure: true});
新建一个cookie 包括有效期 路径 域名等
example $.cookie(’the_cookie’, ‘the_value’);
新建cookie
example $.cookie(’the_cookie’, null);
删除一个cookie
*/

jQuery.cookie = function(name, value, options) { 
    if (typeof value != 'undefined') { // name and value given, set cookie 
        options = options || {}; 
        if (value === null) { 
            value = ''; 
            options.expires = -1; 
        } 
        var expires = ''; 
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
            var date; 
            if (typeof options.expires == 'number') { 
                date = new Date(); 
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 
            } else { 
                date = options.expires; 
            } 
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE 
        } 
        var path = options.path ? '; path=' + options.path : ''; 
        var domain = options.domain ? '; domain=' + options.domain : ''; 
        var secure = options.secure ? '; secure' : ''; 
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
    } else { // only name given, get cookie 
        var cookieValue = null; 
        if (document.cookie && document.cookie != '') { 
            var cookies = document.cookie.split(';'); 
            for (var i = 0; i < cookies.length; i++) { 
                var cookie = jQuery.trim(cookies[i]); 
                // Does this cookie string begin with the name we want? 
                if (cookie.substring(0, name.length + 1) == (name + '=')) { 
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
                    break; 
                } 
            } 
        } 
        return cookieValue; 
    } 
};/*
数据分页DataPager
import:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/

(function($) {
        
		/*
		  Params:
		  defaults = {
                        count: 9, // 显示的分页数 为奇数
                        event: function() {}, //改变当前面的事件
                        recordCount: 0,
                        pageSize: 10,
                        currentPage: -1,
                        pageCount: 0,
                        cssCurrent: "current",
                        cssNormal: "normal",
                        cssPrev: "prev",
                        cssNext: "next",
                        cssFirst: "first",
                        cssLast: "last",
						langFirst: "首页",
						langPrev: "上一页",
						langNext: "下一页",
						langLast: "尾页"
                    };
		
		*/
		$.fn.dataPager = function(options) {

                var self = this;
                var defaults = {
							count: 9, // 显示的分页数 为奇数
							event: function() {}, //改变当前面的事件
							recordCount: 0,
							pageSize: 10,
							currentPage: -1,
							pageCount: 0,
							cssCurrent: "current",
							cssNormal: "normal",
							cssPrev: "prev",
							cssNext: "next",
							cssFirst: "first",
							cssLast: "last",
							langFirst: "首页",
							langPrev: "上一页",
							langNext: "下一页",
							langLast: "尾页"
                };
                if (options) {
                        $.extend(defaults, options);
                }
                $(this).data("dataPager", defaults);
				
                var _addCurrent = function(count) {
                        defaults.currentPage = parseInt(defaults.currentPage);
                        if (defaults.currentPage >= 0 && defaults.currentPage < defaults.pageCount) {
                                defaults.currentPage += count;
                                defaults.currentPage = defaults.currentPage < 0 ? 0 : defaults.currentPage;
                                defaults.currentPage = defaults.currentPage >= defaults.pageCount ? defaults.pageCount - 1 : defaults.currentPage;
                        };
                };
                var _init = function() {
                        var cpage = 1;

                        var count = (defaults.count - 1) / 2;
                        var start = parseInt(defaults.currentPage) - count;
                        var diff = start < 0 ? -start: 0;
                        start = start > 0 ? start: 0;
                        count = count >= defaults.pageCount ? defaults.pageCount: count;
                        var end = parseInt(defaults.currentPage) + parseInt(count) + parseInt(diff) + 1;
                        end = end < defaults.pageCount ? end: defaults.pageCount;

                        var fir = $("<a/>").appendTo($(self)).addClass(defaults.cssFirst).text(defaults.langFirst);
                        var prev = $("<a/>").appendTo($(self)).addClass(defaults.cssPrev).text(defaults.langPrev);
                        if (defaults.currentPage > 0) {
                                fir.attr("href", "javascript:void(0);");
                                fir.click(
                                function() {
                                        defaults.currentPage = 0;
                                        $(this).data("dataPager", defaults);
                                        $(self).empty();
                                        $(self).dataPager(defaults);
                                        defaults.event(defaults);
                                });

                                prev.attr("href", "javascript:void(0);");
                                prev.click(
                                function() {
                                        _addCurrent( - cpage);
                                        $(this).data("dataPager", defaults);
                                        $(self).empty();
                                        $(self).dataPager(defaults);
                                        defaults.event(defaults);
                                });
                        }

                        for (var i = start; i < end; i++) {
                                var a = $("<a/>").appendTo($(self)).attr("href", "javascript:void(0);").text(i + 1).attr("data-index", i).bind("click",
                                function() {
                                        defaults.command = "init";
                                        defaults.currentPage = $(this).attr("data-index");
                                        $(this).data("dataPager", defaults);
                                        $(self).empty();
                                        $(self).dataPager(defaults);
                                        defaults.event(defaults);
                                });
                                if (i == defaults.currentPage) {
                                        a.addClass(defaults.cssCurrent);
                                }
                                else {
                                        a.addClass(defaults.cssNormal);
                                }
                        }

                        var next = $("<a/>").appendTo($(self)).addClass(defaults.cssNext).text(defaults.langNext);
                        var last = $("<a/>").appendTo($(self)).addClass(defaults.cssLast).text(defaults.langLast);
                        if (defaults.currentPage < defaults.pageCount - 1) {
                                next.attr("href", "javascript:void(0);");
                                next.click(
                                function() {
                                        _addCurrent(cpage);
                                        $(this).data("dataPager", defaults);
                                        $(self).empty();
                                        $(self).dataPager(defaults);
                                        defaults.event(defaults);
                                });
                                last.attr("href", "javascript:void(0);");
                                last.click(
                                function() {
                                        defaults.currentPage = defaults.pageCount - 1;
                                        $(this).data("dataPager", defaults);
                                        $(self).empty();
                                        $(self).dataPager(defaults);
                                        defaults.event(defaults);
                                });
                        }
                        $("<div/>").appendTo($(self)).css({
                                "clear": "both"
                        });
                };

                defaults.pageCount = defaults.recordCount % defaults.pageSize > 0 ? (defaults.recordCount / defaults.pageSize) + 1 : defaults.recordCount / defaults.pageSize;
                if (defaults.currentPage < 0) {
                        defaults.currentPage = 0;
                }
                if (defaults.currentPage >= defaults.pageCount) {
                        defaults.currentPage = defaults.pageCount - 1;
                }
                _init();
                return this;
        };
        $.fn.setDataPager = function(cur) {
                cur = cur || 0;
                var defaults = $(this).data("dataPager");
                defaults.currentPage = cur;
                $(this).empty();
                $(this).dataPager(defaults);
        };
        $.fn.getDataPager = function() {
                return $(this).data("dataPager");
        };
})(jQuery);/*
鼠标移入弹出的说明性窗口
import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/myjquery/common.js"></script>
<script src="../myjquery/ui/jquery-ui.min.js"></script>
*/
;
(function($) {
       /*
          需放在最外层:body的子层
		  params: 
		  		//无需重设参数
		  		options = { 
		  					    autoOpen:false,      //初化是否打开
								layerBackground:"black", //背景层 background：颜色
                                layerOpacity: 0.5,  //背景透明度[0 - 1]
								animateType:"fade", //弹出框动画类型 fade,puff
                                animateSpeed: "slow", 
                                animateEasing: "easeOutExpo" //弹出框运动类型
				 };
				 //需重设参数
				 reOptions ={
					 layerVis: true, //是否显示背景层
					 layerIsAnimate: true, //背景是否随dialog变化而变化
				 }
      */
        //背景对像
        var dialog_bg;
        //IE6
        var ie6Animate = function(obj, status, fun) {
                if (status) {
                        if (!jQuery.support.opacity) {
                                obj.outerCenter().show();
                                dialog_bg.hide();
                        }
                        else {
                                fun();
                        }
                }
                else {
                        if (!jQuery.support.opacity) {
                                obj.outerCenter().hide();
                        }
                        else {
                                fun();
                        }
                }
        };
        //动画
        var run = function(self, isOpen, options,reOptions) {
		dialog_bg=dialog_bg || $(window.parent.document).find(":[data-type=bg/dialog]");
                if (isOpen) {
                        $("body").css({
                                "overflow-x": "hidden"
                        });
                        switch (options.animateType) {
                        case "fade":
                                ie6Animate(self, true,
                                function() {
                                        self.outerCenter().fadeIn("slow",
                                        function() {
                                                self.show();
                                        });
									    
                                        if (reOptions.layerIsAnimate) {
                                                dialog_bg.css({
														"background": options.layerBackground,
                                       				    opacity: options.layerOpacity,
                                                        width: $(document).scrollSize().width,
                                                        height: $(document).scrollSize().height,
                                                        left: 0,
                                                        top: 0
                                                }).fadeIn("slow", null);
                                        }

                                });

                                break;
                        case "puff":
                                self.show();
                                ie6Animate(self, true,
                                function() {
                                        self.animate({
                                                opacity: 1
                                        },
                                        "fast", options.animate.easing);
                                });
                                dialog_bg.fadeIn("slow");
                                break;
                        }
                }
                else {

                        switch (options.animateType) {
                        case "fade":
                                ie6Animate(self, false,
                                function() {
                                        self.fadeOut("slow",
                                        function() {
                                                $("body").css({
                                                        "overflow-x": "auto"
                                                });
                                                self.hide();
                                        });
                                });
                                if (reOptions.layerIsAnimate) {
                                        dialog_bg.fadeOut();
                                }
                                break;
                        case "puff":
                                ie6Animate(self, bg, false,
                                function() {
                                        self.effect("puff", {},
                                        500, null);
                                        dialog_bg.fadeOut();
                                });
                                break;
                        }

                };
        };

        $.fn.dialog = function(options,reOptions) {
               var self = this;
               var defaults = { 
		  					    autoOpen:false,      //初化是否打开
								layerBackground:"black", //背景层 background：颜色
                                layerOpacity: 0.5,  //opacity:透明度[0 - 1]
								animateType:"fade", //动画类型 fade,puff
                                animateSpeed: "slow", 
                                animateEasing: "easeOutExpo" //运动类型
				};
				var reDefaults ={
					 layerVis: true, //visibale:是否显示
					 layerIsAnimate: true //animate是否随dialog变化而变化
				}
                if (options) {$.extend(defaults, options);  };
          		if (reOptions) {$.extend(reDefaults, reOptions);  };

				$(this).data("options",defaults);
				$(this).css({"position":"absolute", "z-index": 9999}).outerCenter();
                        $(this).draggable({containment: document, scroll: false});
                        if ($("body").children(":[data-type=bg/dialog]") != null) {
                                dialog_bg = $("<div/>").appendTo($("body")).css({
                                        "position": "absolute",
                                        "background": defaults.layerBackground,
                                        opacity: defaults.layeroOpacity,
                                        width: $(document).scrollSize().width,
                                        height: $(document).scrollSize().height,
                                        left: 0,
                                        top: 0
                                }).attr("data-type", "bg/dialog").hide();
                        }
                        if (!defaults.autoOpen) {
                                if (!$.support.opacity) {
                                        $(this).hide();
                                }
                                else {
                                        $(this).hide();
                                }
                        };
                        run($(this), defaults.autoOpen, defaults,reDefaults);
                        var close_btn = $(this).find(":[data-type=close/dialog]").css({cursor: "pointer"});
                        var title = $(this).find(":[data-type=title/dialog]");
                        var bg_opacity = 0.8;
                        $(this).draggable({
                                handle: "div:[data-type=title/dialog]",
                                containment: 'document',
                                scroll: false,
                                opacity: bg_opacity,
                                cursor: 'move'
                        });
                        close_btn.click(
                        function() {
                               run($(self), false, defaults,reDefaults);
                        });
                       
                return this;

        };
 
        $.fn.dialogOpen = function(options,reOptions) {
                var self = this;
				var defaults=$(this).data("options");	
				var reDefaults ={
					 layerVis: true, //visibale:是否显示
					 layerIsAnimate: true //animate是否随dialog变化而变化
				}
			    if (options) {$.extend(defaults, options);  };
          		if (reOptions) {$.extend(reDefaults, reOptions);  };
                run($(this), true, defaults,reDefaults);
                return this;
        };
        $.fn.dialogClose = function(options,reOptions) {
                var self = this;
                var defaults=$(this).data("options");
				var reDefaults ={
					 layerVis: true, //visibale:是否显示
					 layerIsAnimate: true //animate是否随dialog变化而变化
				}
			    if (options) {$.extend(defaults, options);  };
          		if (reOptions) {$.extend(reDefaults, reOptions);  };
                run($(this), false, defaults,reDefaults);
                return this;
        };

})(jQuery);/*
数据载入时画面
need import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
(function ($) {
    /*
    */
    $.fn.loading = function (options) {
	    var self = this;
		var defaults = {
			 command:"init",  //命令init,loading,unloading;
			 css:{bg:"loading-bg",pic:"loading-pic"}   //css样式:bg为背景样式,pic载入的图片样式
		}
	    if (options) {
            $.extend(defaults, options);
        };
		var loading=$(this).css({"position":"relative"});
			loading=$("<div/>").appendTo($(this))
			.attr("data-type","bg/loading")
			.addClass(defaults.css.bg)
			.css({"position":"absolute",top:0, left:0})
			.width($(this).width()).height($(this).height()).hide();
			
		var	pic=$("<div/>").appendTo($(this))
			.attr("data-type","pic/loading")
			.addClass(defaults.css.pic)
			.css({"background-position":"center", "background-repeat":"no-repeat"})
			.width($(this).width())
			.height($(this).height())
			.hide();
		return this;
    };
    $.fn.loadingShow=function()
	{
		$(this).children(":[data-type=bg/loading]").fadeTo("fast",0.5);
		$(this).children(":[data-type=pic/loading]").fadeTo("fast",0.5);
	};
	$.fn.loadingHide=function()
	{
		$(this).children(":[data-type=bg/loading]").fadeOut();
		$(this).children(":[data-type=pic/loading]").fadeOut();
	};
})(jQuery);

/*
随机在div内显示图片
improt:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/jquery/jquery-rotate.js"></script>
<script type="text/javascript" src="/jquery/fancybox/jquery.fancybox-1.3.4.js"></script>
<link rel="stylesheet" type="text/css" href="/jquery/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
*/

(function ($) {

    /*
    */
    $.fn.picPreview = function (options) {
        var self = this;
        var defaults = {
			maxZIndex:9999 //zindex最大值
        }
        if (options) {
            $.extend(defaults, options);
        }
		$(this).css({ "position": "relative" });
		
		var pics=$(this).find("a");
        $.each(pics, function (i, n) {
            var left = $(self).width() * Math.random();
            var top =  $(self).height() * Math.random();
			var space=$(n).width()>$(n).height()?$(n).width():$(n).height();
			left=(left+space)>$(self).width()?left-space:left;
			top=(top+space)>$(self).height()?top-space:top;
            $(n).css({ display: "block", "position": "absolute", "border": "none",left:left, top: top, "z-index": i}); 
			$(n).children("img").rotate(Math.random() * 180);
			$(n).hover(
					   function () { 
					      $(this).css({ "z-index": defaults.maxZIndex });
					   }, 
						function () { 
						  $(this).css({ "z-index": i});
					   });
			$(n).fancybox({ 'overlayShow': false,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic'
            });
		 });
        return this;
     }
})(jQuery);
/*
TabView
import:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/jquery-ui.min.js"></script>
*/
(function ($) {

    /*  
		params:
        options = {
            width:500,
			height:300,
			animateType:"ori",   //动画类型 [ori -> 横向 ],[por -> 纵向 ],[fade -> 淡化 ],[nor -> 正常 ]
            animateSpeed: "slow",
			animateEasing: "easeOutExpo", //变换曲线
            autoTab: false, //自动切换
            tabType: "click",   //触发切换事件 [click -> 点击 ],[hover -> 移入 ]
            interval: 2000,  //变换时间间隔
			toolbar : {
			cssCur:"current",
			cssNor:"normal"
        	}
        }
        
    */
    $.fn.tab = function (options) {

        var self = this;
        var defaults = {
            width:500,
			height:300,
			animateType:"ori",   //动画类型 [ori -> 横向 ],[por -> 纵向 ],[fade -> 淡化 ],[nor -> 正常 ]
            animateSpeed: "slow",
			animateEasing: "easeOutExpo", //变换曲线
            autoTab: false, //自动切换
            tabType: "click",   //触发切换事件 [click -> 点击 ],[hover -> 移入 ]
            interval: 2000,  //变换时间间隔
			toolbar : {
			cssCur:"tab-title-current",
			cssNor:"tab-title-normal"
        	}
		}

        if (options) {
            $.extend(defaults, options);
			 if (options.toolbar) {
           		 $.extend(defaults.toolbar, options.toolbar);
        	}
        }
        $(this).css({ "position": "relative", "overflow": "hidden" });
        var stop = false;
        var current = 0, old = 0;
        var contents = $(self).find("ul[data-type=content/tab]").css({ "list-style": "none", "overflow": "hidden" }).children();
        var titles = $(self).find("ul[data-type=title/tab]").css({ "position": "absolute", "list-style": "none", "z-index": 9999, "overflow": "hidden" }).children();
        if (defaults.tabType == "click") {
            titles.bind("click", function () {
                current = titles.index($(this));
                old = _change(current, old);
            });
        }
        else {
            titles.bind("mouseover", function () {
                current = titles.index($(this));
                old = _change(current, old);
            });
        }

        switch (defaults.animateType) {
            case "fade": contents.css({ "position": "absolute" }); break;
            case "ori": contents.css({ "float": "left" }).parent().css({ "position": "absolute", left: 0, top: 0,width:contents.width()*contents.length}); break;
            case "por": contents.parent().css({ "position": "absolute", left: 0, top: 0 }); break;
            case "nor": contents.css({ "position": "absolute" }); break;
        }

        var _init = function () {
            if (defaults.animateType == "fade" || defaults.animateType == "nor") {
                $.each(contents, function (i, n) {
                    if (i == 0) {
                        $(n).show();
                    }
                    else {
                        $(n).hide();
                    }

                });
            }
            $.each(titles, function (i, n) {
                if (i == 0) {
                    $(n).addClass(defaults.toolbar.cssCur);
                }
                else {
                    $(n).addClass(defaults.toolbar.cssNor);
                }
            });
        }

        //变换 
        var _change = function (cur, old) {

            switch (defaults.animateType) {
                case "fade":
                    if (cur != old) {
                        contents.eq(old).fadeOut("slow");
                        contents.eq(cur).fadeIn("slow");
                    };
                    break;
                case "ori":
                    contents.parent().animate({ "left": -(contents.width() * current)},defaults.animateSpeed,defaults.animateEasing); break;
                case "por":
                    contents.parent().animate({ "top": -(contents.height() * current) }, defaults.animateSpeed, defaults.animateEasing); break;
                case "nor":
                    if (cur != old) {
                        contents.eq(old).hide();
                        contents.eq(cur).show();
                    };
                    break;
            }
            titles.eq(old).removeClass(defaults.toolbar.cssCur).addClass(defaults.toolbar.cssNor).fadeTo("slow", 0.5, null);
            titles.eq(cur).removeClass(defaults.toolbar.cssNor).addClass(defaults.toolbar.cssCur).fadeTo("slow", 1, null);
            old = current;
            return old;

        },

        //时间变换
        _timeChange = function () {
            if (current >= titles.length) {
                current = 0;
            }
            old = _change(current, old);
            current++;
            if (!stop)
                setTimeout(_timeChange, defaults.interval);
        }
        _init();
        if (defaults.autoTab) {
            _timeChange();
        }
        return this;
    }

})(jQuery);
/*
文本框
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
(function ($) {
    /*
    文本框为空时显示的内容
    */
    $.fn.textbox = function (options) {
        var self = this;
        var defaults =
        {

        };

        if (options) {
            $.extend(defaults, options);
        };
         var value=$(this).val();
		 $(this).focus(
					   function(){
						   if($(this).val()==value){
						   $(this).val("");
						   }
					   }
					   );
		 $(this).blur(
					   function(){
						   if($(this).val()==""){
						   $(this).val(value);
						   }
					   }
					   );
        return this;

    };

})(jQuery);

/*
鼠标移入弹出的说明性窗口
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
(function ($) {
    /*
 
    */
    $.fn.tips = function (options) {
        var self = this;   //对像必须有唯一父级层
        var defaults =
        {
            autoPosition: true,  //是否第一个tips定位
            animateType: "fade"   //动画类型
        };

        if (options) {
            $.extend(defaults, options);
        };
        var tips = $(this).find("div:[data-type=box/tips]").hide();
        $(this).css({ "position": "relative" });
        var _show = function () {
            switch (defaults.animateType) {
                case "fade": tips.fadeIn(); break;
                case "normal": tips.show(); break;
                default: tips.show();
            }
        };
        var _close = function () {
            switch (defaults.animateType) {
                case "fade": tips.fadeOut(); break;
                case "normal": tips.hide(); break;
                default: tips.hide();
            }
        };
        tips.css({ "position": "absolute" });
        $(this).hover(
        function (e) {
            // for (var i in e) {
            //    document.write(i+"=="+e[i]+"<br/>");
            // }
            var left = $.browser.msie ? e["offsetX"] : e["layerX"];
            var top = $.browser.msie ? e["offsetY"] : e["layerY"];
            tips.eq(0).css({ "left": left, "top": top });
            _show();
        },
        function (e) {
            _close();
        }
        );
        return this;

    };

})(jQuery);

/*
带有历史输入记录的文本框
need import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/jquery/common.js"></script>
*/
(function ($) {
    /*
    需要有唯一父级层
    */
    $.fn.tipsText = function (options) {
        var self = this;
        var defaults = {
            cookis: { name: "tips", save: function () { } }
        }
        if (options) {
            $.extend(defaults, options);
        };
        var list = $("<ul/>").css({ "position": "absolute", left: 0, top: $(this).height() }).append($(this).parent());
        list.parent().css({ "position": "relative" });


        return this;
    };

})(jQuery);


/*
鼠标移入显示工具栏
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
;(function ($) {

    $.fn.toolbar = function (options) {
	    
        var self=this;   //对像必须有唯一父级层
        var defaults=
        {
			position:"bottom"  //所在位置 bottom,right,left,top
        };

        if (options) {
            $.extend(defaults, options);
        };
       
		$(this).css({"position":"relative"});
        var toolBar=$("div:[data-type=toolbar]").css({"position":"absolute",opacity:0});
		
        switch(defaults.position)
		{
			case "bottom": 
			toolBar.css({left:0,top:$(self).height(),width:$(self).width()});
			break;
			case "left":
			toolBar.css({left:0,top:0,height:$(self).height()});
			break;
			case "right":
			toolBar.css({left:$(self).width(),top:0,height:$(self).height()});
			break;
			case "top": 
			toolBar.css({left:0,top:0,width:$(self).width()});
			break;
		};
        $(this).hover(
					  function(){
						    switch(defaults.position)
							{
								case "bottom":
								toolBar.animate({opacity:"0.5",top:"-="+toolBar.height()});
								break;
								case "left":
								 toolBar.animate({"opacity":"0.5",left:"-="+toolBar.width()});
								break;
								case "right":
								 toolBar.animate({"opacity":"0.5",left:"-="+toolBar.width()});
								break;
								case "top": 
								 toolBar.animate({"opacity":"0.5",top:"-="+toolBar.height()});
								break;
							}
					  },
					  function(){
						    switch(defaults.position)
							{
								case "bottom": 
								 toolBar.animate({"opacity":"0",top:$(self).height()});
								break;
								case "left":
								 toolBar.animate({"opacity":"0",left:0});
								break;
								case "right":
								 toolBar.animate({"opacity":"0",left:$(self).width()});
								break;
								case "top": 
								 toolBar.animate({"opacity":"0",top:0});
								break;
							}
						  
						  }
					  );
        return this;
    }


})(jQuery);
/*
验证表单[自身必需为表单对像]

need import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>

表单输入框应外部加一个块级标签如:div
<div><input   type="text" regExp="[a-z]" tip="tip!" name="user" /></div>
*/
;(function ($) {
    $.fn.validate = function (options) {
        var self = this;
        var defaults = {
			 animate:{type:"fm",speed:"slow"}
        };
        if (options) {
            $.extend(defaults, options);
        };
  
        var data="";
        var cts=[];
        var controls=$(this).find("input[type=text],input[type=password],select");//所有输入框的类型
        var submit=$(this).find("input[type=submit],button[type=submit]"); //提交按扭
		controls.eq(0).focus();
		 var _tip = function (control, options) {
            var defaults = {
                regExp: "",
                content: ""
            };
            if (options) {
                $.extend(defaults, options);
            };
            //alert($.event.pageX );
          
            control.addClass("txt-normal");
            var p = control.parent().css({ "position": "relative" });
            var tip = $("<div/>").appendTo(p).css({"position": "absolute", "left": (control.width()), "top": 0 }).hide().html(defaults.content); 
            tip.addClass("tip");
            cts.push({control:control,tip:tip});
            control.bind("focus",
			function () {
		   
			
			}
			).bind("blur", function () {
					check(control,tip);
					serverCheck(control,tip);
			});
        }
		 $.each(controls,function(i,n)
	    {
             var regExp=$(n).attr("regExp");
             var tip=$(n).attr("tip");
             new _tip($(n), {regExp:regExp,content:tip});
	    });
    	var check=function(control,tip) 
	    {
	   		 if (!new RegExp(control.attr("regExp")).test(control.val())) {
                tip.animate({ left: control.width()+10, opacity: "show" },defaults.animate.speed);
                control.removeClass("txt-normal").addClass("txt-error");
				return false;
             }
             else {
                tip.animate({ left: control.width()-10, opacity: "hide" },defaults.animate.speed);
                control.removeClass("txt-error").addClass("txt-normal");
				return true;
            }
     	};
  	      var serverCheck=function(control,tip)
	    {
			$.get(control.attr("url"),control.attr("param"),function(data)
			{
				if(data!="sucess")
				{
					tip.content=data;
					check(control,tip);
				}
			}
		);
	   
	    var _submit=function()
		{
							   var canSubmit=true;
							   $.each(cts,function(i,n)
							   {
										if(!check($(n.control),n.tip))
										{
											$(n.control).blur();
											canSubmit=false;
										}
							
							   });
							   if(canSubmit)
							   {        
									  data="";
									  data+="({";
									  $.each(controls,function(i,n)
									  {
										 if(i!=0){data+=",";};
										 data+=$(n).attr("name")+":\""+$(n).val()+"\"";
									  })
									  data+="})";
									  defaults.submit(eval(data));
									  return true;
							   }
							   else
							   {
								   	  return false;
							   }
		};
		$(this).bind("submit",function(){	
			   				return _submit();  
		 });
		/*
		submit.one("click",function(){
							return _submit(); 
							  });*/
        
 
        return this;
	};
   }
})(jQuery);


var RegExps={
    tel:/^[0-9]{11}$/,
    mail:/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    idNumber:/^\d{15}|\d{17}[A-Z]$/, //身份证号
    userName:/^[a-zA-Z][a-zA-Z0-9_]{1,14}[a-zA-Z0-9]$/i,// 用户名只能是字母下画线和数字 并且字母开头 3 - 16位
    ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g,//匹配IP地址的正则表达式 
    int:/^[-]{0,1}[0-9]{1,}$/,
    moblie:/^[1][3][0-9]{9}$/,
    number:/^[0-9]+$/,
    decimal:/^[-]{0,1}(\d+)[\.]+(\d+)$/,
    money:/^[0-9]+[\.][0-9]{0,3}$/,
    strOrInt:/^[0-9a-zA-Z\_]+$/, ////判断是否是数字或字母 
    chinOrStrOrInt:/^[0-9a-zA-Z\u4e00-\u9fa5]+$/,  //判断是否是汉字、字母、数字组成 
    picture: /\.bmp$|\.BMP$|\.gif$|\.jpg$|\.png$|\.PNG$|\.jpeg$|\.JPEG$|\.GIF$|\.JPG$\b/  //图片格式
};

