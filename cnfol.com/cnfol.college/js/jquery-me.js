/*
常用类
need import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
;(function($){

  $.fn.extend({
		/*
        以父级对像为标准局中
        */
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
        /*
        设置Size大小
        val:jQuery对像
        */
        size:function(val)
        {
             var self=this;
             this.width(val.width()).height(val.height());
             return this; 
        },
        /*
        获取Size对像
        */
        size:function()
        {
           return {width:this.width(),height:this.height()};
        }
        });
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
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/

(function ($) {
    //var currentPage = 0, recordCount = 0, pageSize = 10, defaults.pager.pageCount = 0;
    $.fn.dataPager = function (options) {

        var self = this;
        var defaults = {
            command: "init",
            count: 9,  //显示的分页数 为奇数
            pager: { recordCount: 0, pageSize: 10, currentPage: -1, pageCount: 0 }, //分页参，[记录总数,页大小，当前页]
            css: { current: "current", normal: "normal", pre10: "pre10", nex10: "nex10", first: "first", last: "last" }, //[当前页CSS,正常CSS,前翻，后翻]
            lanuage: { first: "首页", pre: "上一页", nex: "下一页", last: "尾页" }, //上一页，下一页显式方式
            event: function () { } //改变当前面的事件
        }

        if (options) {
            $.extend(defaults, options);
        }

        var _addCurrent = function (count) {
            if (defaults.pager.currentPage >= 0 && defaults.pager.currentPage < defaults.pager.pageCount) {
                defaults.pager.currentPage += count;
                defaults.pager.currentPage = defaults.pager.currentPage < 0 ? 0 : defaults.pager.currentPage;
                defaults.pager.currentPage = defaults.pager.currentPage >= defaults.pager.pageCount ? defaults.pager.pageCount - 1 : defaults.pager.currentPage;
            };
        };

        var _init = function () {
            var cpage = 1;

            var count = (defaults.count - 1) / 2;
            var start = defaults.pager.currentPage - count;
            var diff = start < 0 ? -start : 0;
            start = start > 0 ? start : 0;
            count = count >= defaults.pager.pageCount ? defaults.pager.pageCount : count;
            var end = parseInt(defaults.pager.currentPage) + parseInt(count) + parseInt(diff) + 1;
            end = end < defaults.pager.pageCount ? end : defaults.pager.pageCount;

            //var pre=$("<a/>").appendTo($(this));
            var fir = $("<a/>").appendTo($(self)).addClass(defaults.css.first).text(defaults.lanuage.first);
            var pre10 = $("<a/>").appendTo($(self)).addClass(defaults.css.pre10).text(defaults.lanuage.pre);
            if (defaults.pager.currentPage > 0) {
                fir.attr("href", "javascript:void(0);");
                fir.click(
						        function () {
						            defaults.pager.currentPage = 0;
						            $(self).attr("data-cur", defaults.pager.currentPage);
						            $(self).empty();
						            $(self).dataPager(defaults);
						            defaults.event(defaults.pager);
						        }
						        );

                pre10.attr("href", "javascript:void(0);");
                pre10.click(
						        function () {
						            _addCurrent(-cpage);
						            $(self).attr("data-cur", defaults.pager.currentPage);
						            $(self).empty();
						            $(self).dataPager(defaults);
						            defaults.event(defaults.pager);
						        }
						        );
            }

            for (var i = start; i < end; i++) {
                var a = $("<a/>").appendTo($(self)).attr("href", "javascript:void(0);").text(i + 1).attr("data-index", i)
			         .bind("click",
						           function () {
						               defaults.pager.currentPage = $(this).attr("data-index");
						               $(self).attr("data-cur", defaults.pager.currentPage);
						               $(self).empty();
						               $(self).dataPager(defaults);
						               defaults.event(defaults.pager);
						           }
				             );
                if (i == defaults.pager.currentPage) {
                    a.addClass(defaults.css.current);
                }
                else {
                    a.addClass(defaults.css.normal);
                }
            }

            var nex10 = $("<a/>").appendTo($(self)).addClass(defaults.css.nex10).text(defaults.lanuage.nex);
            var last = $("<a/>").appendTo($(self)).addClass(defaults.css.last).text(defaults.lanuage.last);
            if (defaults.pager.currentPage < defaults.pager.pageCount - 1) {
                nex10.attr("href", "javascript:void(0);");
                nex10.click(
						        function () {
						            _addCurrent(cpage);
						            $(self).attr("data-cur", defaults.pager.currentPage);
						            $(self).empty();
						            $(self).dataPager(defaults);
						            defaults.event(defaults.pager);
						        }
						        );
                last.attr("href", "javascript:void(0);");
                last.click(
						            function () {
						                defaults.pager.currentPage = defaults.pager.pageCount - 1;
						                $(self).attr("data-cur", defaults.pager.currentPage);
						                $(self).empty();
						                $(self).dataPager(defaults);
						                defaults.event(defaults.pager);
						            }
						            );
            }
            $("<div/>").appendTo($(self)).css({ "clear": "both" });
        };
        switch (defaults.command) {
            case "init":
                defaults.pager.pageCount = defaults.pager.recordCount % defaults.pager.pageSize > 0 ? (defaults.pager.recordCount / defaults.pager.pageSize) + 1 : defaults.pager.recordCount / defaults.pager.pageSize;
                $(self).attr("data-cur", defaults.pager.currentPage);
                $(self).attr("data-recd", defaults.pager.recordCount);
                $(self).attr("data-size", defaults.pager.pageSize);
                $(self).attr("data-count", defaults.pager.pageCount);
                if (defaults.pager.currentPage < 0) {
                    defaults.pager.currentPage = 0;
                }
                if (defaults.pager.currentPage >= defaults.pager.pageCount) {
                    defaults.pager.currentPage = defaults.pager.pageCount - 1;
                }
                _init();
                return this;
            case "pager":
                    defaults.pager.recordCount = $(this).attr("data-recd");
                    defaults.pager.pageSize = $(this).attr("data-size");
                    defaults.pager.pageCount = $(this).attr("data-count");

                if (defaults.pager.currentPage != -1) {
                  
                    if (defaults.pager.currentPage < 0) {
                        defaults.pager.currentPage = defaults.pager.currentPage = 0;
                    }
                    if (defaults.pager.currentPage >= defaults.pager.pageCount) {
                        defaults.pager.currentPage = defaults.pager.currentPage = defaults.pager.pageCount - 1;
                    }
                    $(self).empty();
                    _init();
                    defaults.event(defaults.pager);
                }
                else {
                    defaults.pager.currentPage =$(this).attr("data-cur");
                    return defaults.pager ;
                }

        }
    };
    /*
    $.fn.dataCurrentPage = function ()
    { return currentPage; };
    $.fn.datadefaults.pager.pageCount = function ()
    { return defaults.pager.pageCount; };
    $.fn.dataRecordCount = function ()
    { return recordCount; };
    $.fn.dataPageSize = function ()
    { return pageSize; }
    */

})(jQuery);
/*
鼠标移入弹出的说明性窗口
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/myjquery/common.js"></script>
<script src="../myjquery/ui/jquery-ui.min.js"></script>
*/
;(function ($) {
    /*
    需放在最外层:body的子层
    */
    var dialog_bg;
    $.fn.dialog = function (options) {
	
        var self = this;
        var defaults =
        {
            command: "init", //命令 init,open,close
            autoOpen: false, //初始化是否打开
            overlayer: { background: "black", visiable: true, opacity: 0.5 , animate:true}, //背景层 background：颜色，visibale:是否显示,opacity:透明度,animate是否随dialog变化而变化
            animate: { type: "fade", speed: "slow", easing: "easeOutExpo"}  //动画类型 fade,puff
        };
        if (options) {
            $.extend(defaults, options);
        };	
		var ie6Animate=function(obj,status,fun)
	    {
			    if(status)
			    {
					if (!jQuery.support.opacity)
				    {	 
					     obj.outerCenter().show();
						 dialog_bg.hide();
				    }
					else
					{
			   			 fun();
					}
			    }
			    else
			    {
					if (!jQuery.support.opacity)
					{	 
					      obj.outerCenter().hide();
				    }
					else
					{
			  			  fun();
					}
			    }
	     };
		var _animate = function (self, open, animate) {
			
			if (open) {
				$("body").css({"overflow-x":"hidden"});
				switch (animate.type) {
					case "fade":
						ie6Animate(self,true,
							function()
							{
									self.outerCenter().fadeIn("slow",function(){self.show();});
									//self.animate({ opacity: 1 }, "fast", animate.easing);
								    if(defaults.overlayer.animate)
									{
										dialog_bg.css({
										width: $(document).scrollSize().width,
										height: $(document).scrollSize().height,
										left: 0,
										top: 0
									}).fadeIn("slow",null); 
								}
								
							}
						);
					   
						break;
				   case "puff":
						self.show();
						ie6Animate(self,true,
							function()
							{
								 self.animate({ opacity: 1 }, "fast", animate.easing);
							}
						);
						dialog_bg.fadeIn( "slow"); 
						break;
				}
			}
			else {
				
				switch (animate.type) {
					case "fade":
						ie6Animate(self,false,
							function()
							{
								/*
								self.animate({ opacity: 0 }, "slow", animate.easing,function(){
																							 $("body").css({"overflow-x":"auto"});
																							 self.hide();
																					 });	*/	
								 self.fadeOut("slow",function(){ $("body").css({"overflow-x":"auto"}); self.hide();}); 
							}
						);
						if(defaults.overlayer.animate)
						{
							dialog_bg.fadeOut(); 
						}
						break;
						case "puff":
						ie6Animate(self,bg,false,
							function()
							{
								self.effect("puff", {}, 500, null);
								dialog_bg.fadeOut(); 
								//self.animate({ opacity: 0 }, "slow", animate.easing,function(){$("body").css({"overflow-x":"auto"});});
							}
						);
						
						break;
				}
				
			};
	    };
        switch (defaults.command) {
            case "init":
                $(this).css({ "position": "absolute", "z-index": 9999 }).outerCenter();
                $(this).draggable({ containment: document, scroll: false });
				if($("body").children(":[data-type=bg/dialog]")!=null)
				{
                dialog_bg = $("<div/>").appendTo($("body"))
							.css({
								"position": "absolute",
								"background": defaults.overlayer.background,
								opacity: defaults.overlayer.opacity,
								width: $(document).scrollSize().width,
								height: $(document).scrollSize().height,
								left: 0,
								top: 0
							})
							.attr("data-type", "bg/dialog").hide();
				}
                if (!defaults.autoOpen) {
				    if (!$.support.opacity)
					{	
					    $(this).hide();  
			        }
					else
					{ $(this).hide(); 
                   	    //$(this).css({ opacity: 0 });
					}
                };
                _animate($(this), defaults.autoOpen, dialog_bg, defaults.animate);
                var close_btn = $(this).find(":[data-type=close/dialog]").css({ cursor: "pointer" });
                var title = $(this).find(":[data-type=title/dialog]");
				
				var bg_opacity=0.8;
                $(this).draggable({ handle: "div:[data-type=title/dialog]", containment: 'document', scroll: false, opacity: bg_opacity, cursor: 'move' }); 
                close_btn.click(
					   function () {
					       _animate($(self), false, defaults.animate);
					   }
					   ); break;
            case "open":  _animate($(this), true,  defaults.animate); break;
            case "close": _animate($(this), false, defaults.animate); break;
        }
        return this;

    };
    
	

})(jQuery);



/*
数据载入时画面
need import
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
(function ($) {
    /*
    */
    $.fn.initLoading = function (options) {
	    var self = this;
		var defaults = {
			 command:"init",  //命令init,loading,unloading;
			 css:{bg:"loading-bg",pic:"loading-pic"}   //css样式:bg为背景样式,pic载入的图片样式
		}
	    if (options) {
            $.extend(defaults, options);
        };
		var loading,pic;
		switch(defaults.command)
		{
			case "init":
			$(this).css({"position":"relative"});
			loading=$("<div/>").appendTo($(this))
			.attr("data-type","bg/loading")
			.addClass(defaults.css.bg)
			.css({"position":"absolute",top:0, left:0})
			.width($(this).width()).height($(this).height()).hide();
			
			pic=$("<div/>").appendTo($(this))
			.attr("data-type","pic/loading")
			.addClass(defaults.css.pic)
			.css({"background-position":"center", "background-repeat":"no-repeat"})
			.width($(this).width())
			.height($(this).height())
			.hide();break;
			case "loading":  
			loading.fadeTo("fast",0.5);
		    pic.fadeTo("fast",0.5);
			break;
			case "unloading":
		    loading.fadeOut();
		    pic.fadeOut();
			break;
		}
		return this;
    };

})(jQuery);

/*
tabView
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
*/
;(function ($) {
    
    $.fn.showTab = function (t_options, c_options,options) {
	
        var self=this;
        var tdefaults = {
            obj: ($(self).find(".tab_titles")),  //标题jquery对像 UL
            cur: "tab_titles_cur",    //当前样式名称
            nor: "tab_titles_nor"     //非当前样式名称
        };
        var cdefaults = {
            obj: ($(self).find(".tab_contents")),  //内容jquery对像 UL
            cur: "tab_contents_cur",    //当前样式对像
            nor: "tab_contents_nor"     //非当前样式对像
        };
        var defaults=
        {
            animate:false,             //是否启用动画
			animateType:"fade"		   //动画类型
        };
        if (t_options) {
            $.extend(tdefaults, t_options);
        };
        if (c_options) {
            $.extend(cdefaults, c_options);
        };
        if (options) {
            $.extend(defaults, options);
        };
        var oIndex=0;   //上一次index
        var contents=cdefaults.obj.children();  //内容对像集
        var titles= tdefaults.obj.children();  //标题对像集
        var count=titles.length;
        var width=contents.width();
     	var contentWidth=width*count;
        
        $.each(titles,function(i,n)
                   {    
                       if(i==0)
                       {
                           $(n).addClass(tdefaults.cur);                      
                       }
                       else
                       {
                           $(n).addClass(tdefaults.nor);  
                       }
                   });
        $.each(contents,function(i,n)
                   {
                       if(i==0)
                       {
                           $(n).addClass(tdefaults.cur);                      
                       }
                       else
                       {
                           $(n).addClass(tdefaults.nor); 
                       }
                   });
	
        if(defaults.animate)
        {
			switch(defaults.animateType)
			{
				case "fade":
				 $.each(contents,function(i,n)
				{
				    if(i==0)
				    {
							
				    }
				    else
				    {
					$(n).hide();   
				    }
				});
				break;
				case "move":
				cdefaults.obj.parent().css({"position":"relative"});
				cdefaults.obj.css({"position":"absolute",width:contentWidth,top:tdefaults.obj.height()})
				.parent().css({"overflow":"hidden"});
				contents.css({"float":"left"});break;
				default:	
				$.each(contents,function(i,n)
				{
				    if(i==0)
				    {
							
				    }
				    else
				    {
					$(n).hide();   
				    }
				});
			}
	}
        else
        {
              $.each(contents,function(i,n)
                   {
                       if(i==0)
                       {
                           $(n).css({"display":"block"});                     
                       }
                       else
                       {
                           $(n).css({"display":"none"});   
                       }
                   });
           
        }
        
        titles.bind("click", function () {
              
              var index=titles.index($(this));
              titles.eq(oIndex).removeClass(tdefaults.cur).addClass(tdefaults.nor);
              $(this).removeClass(tdefaults.nor).addClass(tdefaults.cur);
              
              if(defaults.animate)
              {
			     switch(defaults.animateType)
			     {
					case "fade":
	                                contents.eq(index).fadeIn().end().eq(oIndex).fadeOut();
					break;
					case "move":
					var sp=-index*width;
					cdefaults.obj.animate({left:sp});
					break;
					default:	

			     }
               
              }
              else
              {
                contents.eq(index).css({"display":"block"}).end()
                .eq(oIndex).css({"display":"none"});
              }
              oIndex=index;
        });
        return this;
    }


})(jQuery);
/*
随机在div内显示图片
依赖
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/jquery/jquery-ui-1.8.6/ui/jquery.effects.core.js"></script>
<script type="text/javascript" src="../js/jquery/jquery-ui-1.8.6/ui/jquery.effects.scale.js"></script>
<link  type="text/css" href="../js/jquery/jquery.ui.css/jquery.ui.css" rel="Stylesheet"/>
<script type="text/javascript" src="/jquery/jquery-rotate.js"></script>
<script type="text/javascript" src="/jquery/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="/jquery/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
<link rel="stylesheet" type="text/css" href="/jquery/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
*/

(function ($) {

    /*
    */
    $.fn.randpic = function (options) {
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
tab
依赖:
<script type="text/javascript" src="../js/jquery/jquery-1.5.js"></script>
<script type="text/javascript" src="../js/jquery/jquery-ui-1.8.6/ui/jquery.effects.core.js"></script>
<link  type="text/css" href="../js/jquery/jquery.ui.css/jquery.ui.css" rel="Stylesheet"/>
*/
(function ($) {

    /*
    obj:jquery类型的容器对像
    options:参数
    */
    $.fn.tab = function (options, toolsBar) {

        var self = this;
        var defaults = {
            size: { width: 700, height: 500 },
            animate: { type: "h-move", speed: "slow", easing: "easeOutExpo" },  //动画类型 fade// 动画类型fade,h-move,v-move,normal
            autoChange: false, //自动切换
            changeType: "click",
            interval: 2000//变换时间间隔
        }
        var defaultsToolsBar = {
            css: { current: "current", normal: "normal"}  //导航样式
        }
        if (options) {
            $.extend(defaults, options);
        }
        if (toolsBar) {
            $.extend(defaultsToolsBar, toolsBar);
        }

        //var items = items || [];
        $(this).css({ "position": "relative", "overflow": "hidden" });
        var stop = false;
        var current = 0, old = 0;
        var contents = $(self).find("ul[data-type=content/tab]").css({ "list-style": "none", "overflow": "hidden" }).children();
        var titles = $(self).find("ul[data-type=title/tab]").css({ "position": "absolute", "list-style": "none", "z-index": 9999, "overflow": "hidden" }).children();
        if (defaults.changeType == "click") {
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

        switch (defaults.animate.type) {
            case "fade": contents.css({ "position": "absolute" }); break;
            case "h-move": contents.css({ "float": "left" }).parent().css({ "position": "absolute", left: 0, top: 0,width:contents.width()*contents.length}); break;
            case "v-move": contents.parent().css({ "position": "absolute", left: 0, top: 0 }); break;
            case "normal": contents.css({ "position": "absolute" }); break;
        }

        var _init = function () {
            if (defaults.animate.type == "fade" || defaults.animate.type == "normal") {
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
                    $(n).addClass(defaultsToolsBar.css.current);
                }
                else {
                    $(n).addClass(defaultsToolsBar.css.normal);
                }
            });
        }

        //变换 
        var _change = function (cur, old) {

            switch (defaults.animate.type) {
                case "fade":
                    if (cur != old) {
                        contents.eq(old).fadeOut("slow");
                        contents.eq(cur).fadeIn("slow");
                    };
                    break;
                case "h-move":
                    contents.parent().animate({ "left": -(contents.width() * current)},defaults.animate.speed,defaults.animate.easing); break;
                case "v-move":
                    contents.parent().animate({ "top": -(contents.height() * current) }, defaults.animate.speed, defaults.animate.easing); break;
                case "normal":
                    if (cur != old) {
                        contents.eq(old).hide();
                        contents.eq(cur).show();
                    };
                    break;
            }
            titles.eq(old).removeClass(defaultsToolsBar.css.current).addClass(defaultsToolsBar.css.normal).fadeTo("slow", 0.5, null);
            titles.eq(cur).removeClass(defaultsToolsBar.css.normal).addClass(defaultsToolsBar.css.current).fadeTo("slow", 1, null);
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
        if (defaults.autoChange) {
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

