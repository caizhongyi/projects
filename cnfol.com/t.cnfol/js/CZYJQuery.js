/*
@author 	  : czy
@description  : jquery 基类
@date  		  : 2011/5/17
@dependent    : jquery.js
*/
; (function($) {
    $.fn.extend({
        /* 以父级对像为标准局中 */
        CZYCenter: function(options) {
            var self = this;
            var defaults = {
                type: "absolute" //类型有margin,absolute
            };
            if (options) {
                $.extend(defaults, options);
            };
            switch (defaults.type) {
            case "margin":
                $(this).css({
                    "margin-top":
                    ($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop(),
                    "margin-left": ($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft()

                });
                break;
            case "absolute":
                $(this).css({
                    top:
                    ($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop(),
                    left: ($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft()

                });
                break;
            }
            return this;
        },
        /*设置Size大小 val:jQuery对像  */
        CZYSize: function(val) {

            return this;
        },
        /* 获取Size对像 */
        CZYSize: function() {
            var _this = this;
            var $this = $(this);
            switch (_this.CZYSize.arguments.length) {
            case 0:
                return {
                    width:
                    $this.width(),
                    height: $this.height()
                };
            case 1:
                $this.width(_this.CZYSize.arguments[0].width()).height(_this.CZYSize.arguments[1].height());
                return this;
            }
        }
    });
    /* 不包括滚动条的文档宽和高 */
    $.fn.CZYScrollSize = function() {
        var size = {
            width: 0,
            height: 0
        };
		    var _this = this;
            var $this = $(this);
            switch (_this.CZYScrollSize.arguments.length) {
            case 0:
               if (document.compatMode == "BackCompat") {
					//cWidth = document.body.clientWidth;
					//cHeight = document.body.clientHeight;
					size.width = document.body.scrollWidth;
					size.height = document.body.scrollHeight;
					//sLeft = document.body.scrollLeft;
					//sTop = document.body.scrollTop;
				} else { //document.compatMode == "CSS1Compat"
					//cWidth = document.documentElement.clientWidth;
					//cHeight = document.documentElement.clientHeight;
					size.width = document.documentElement.scrollWidth;
					size.height = document.documentElement.scrollHeight;
					//sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
					//sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
				}
            return size;
            case 1:
				 size=_this.CZYScrollSize.arguments[0];
                 if (document.compatMode == "BackCompat") {
					document.body.scrollWidth=size.width ;
					document.body.scrollHeight=size.height;
				} else { 
				    document.documentElement.scrollWidth=size.width;
					document.documentElement.scrollHeight=size.height;
				}
                return this;
            }
       
    };
    $.CZYCore = {};
    /* 基本信息 */
    $.CZYCore.Info = {
        name: "CZYCore",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
        
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
        var path = options.path ? '; path=' + options.path: '';
        var domain = options.domain ? '; domain=' + options.domain: '';
        var secure = options.secure ? '; secure': '';
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
@author 	: czy
@description: 文本框效果[为空时显示的内容]
@date   	: 2011/5/17
@dependent 	: jquery.js
*/
;(function($) {

    $.fn.CZYAccordionGroup = function(options) {
        var _this = this;
        var $this = $(this);
		var defaults={
			current:0,
			back:1,
			autoHeight:true,
			event:"mouseover",  // click && mouverover
			elements:{item:".item",tag:".tag",inner:".inner"}, 
			showOne:true
		};
	    this.opts = $.extend(defaults, options);
		var item=$this.children(this.opts.elements.item)
		this.items=[];
		var tempHeight= 0;
		$.each(item,function(i,n){
				if(!_this.opts.autoHeight)
				{
					if(i<item.length-1)
					{
						tempHeight=$(item[i+1]).height()>$(item[i]).height()?$(item[i+1]).height():$(item[i]).height();
					}
				}
				else
				{
					tempHeight="auto";
				}
		});
		
		$.each(item,function(i,n){
				var CZYAccordion= $(item[i]).CZYAccordion({
					 status:"hide",
					 height:tempHeight,
					 event:_this.opts.event,
					 elements:{
					 tag:_this.opts.elements.tag,
					 inner:_this.opts.elements.inner
					 }});
				CZYAccordion.index=i;
				CZYAccordion.tag.unbind(_this.opts.event);
				CZYAccordion.tag.bind(_this.opts.event,function(){_this.toggle(i);});
				_this.items.push(CZYAccordion);
				
			
		});
		var _init =function()
		{	
		    $.each(_this.items,function(i,n)
			{
				//$(n).attr("data-index",i);
				if(i==_this.opts.current)
				{
					_this.show(i);
				}
				
			});
		
		};

		this.show=function(index)
		{	
		    if(_this.items[_this.opts.back]!="running")
			{
				if(_this.opts.back!=index)
				{
					_this.opts.current=index;
					_this.items[index].show();
					if(_this.opts.showOne)
					{
						_this.items[_this.opts.back].hide();
					}
					_this.opts.back=_this.opts.current;
				}	
			}
		};
		this.hide=function(index)
		{
			if(_this.items[index]!="running")
			{
				if(_this.opts.back!=index)
				{
					_this.items[index].hide();
				}
			}
		};
		this.toggle=function(index)
		{
			if(_this.items[index].opts.status=="show")
			{
				_this.hide(index);
			}
			else if(_this.items[index].opts.status=="hide")
			{
				_this.show(index);
			}
		};
		_init();
        return this;
    };
	$.fn.CZYAccordion=function(options)
		{
			var _this = this;
            var $this = $(this);
			var defaults={
				height:"auto",
				width:"auto",
				status:"hide",
				autoHide:true,
				event:"mouseover",
				type:"normal",  //select && normal
				speed:500,
				elements:{tag:".tag",inner:".inner"},
				callback:{
					shown:function(){},
					beginShow:function(){},
					hidden:function(){},
					beginHide:function(){},
					toggled:function(){}
				}
			};
	        this.opts = $.extend(defaults, options);
			this.index=0;
			this.inner=$this.children(_this.opts.elements.inner);
			this.tag=$this.children(_this.opts.elements.tag)
			.bind(String(_this.opts.event), function(){ _this.toggle(); });
			if(_this.opts.autoHide)
			$this.hover(function(){},function(){_this.hide();});
			var tempHeight=0;
			var _init=function()
			{
				_this.inner.css("overflow","hidden");
				if(_this.opts.type=="select")
				{
					_this.inner.css({"position":"absolute",width:_this.opts.width,left:0,top:_this.tag.height()});
					$this.css("position","relative");
				}
				tempHeight=_this.opts.height=="auto"?_this.inner.height():_this.opts.height;
				if(_this.opts.status=="hide")
				{
					_this.inner.height(0);
				}
			};
			this.show=function(){
				_this.inner.show();
				_this.opts.status="running";
				if(_this.opts.callback.beginShow)_this.opts.callback.beginShow({index:_this.index,jqueryObj:$this});
				if(_this.show.arguments.length==1)
				{
				   callback=_this.show.arguments[0];
				}
				_this.inner.animate({height: tempHeight}, _this.opts.speed , function(){if(_this.opts.callback.shown)_this.opts.callback.shown({index:_this.index,jqueryObj:$this});_this.opts.status="show";} );
				};
			this.hide=function(){
				_this.opts.status="running";
				if(_this.opts.callback.beginHide)_this.opts.callback.beginHide({index:_this.index,jqueryObj:$this});
				if(_this.hide.arguments.length==1)
				{
				   callback=_this.hide.arguments[0];
				}
				_this.inner.animate({height: 0}, _this.opts.speed , function(){if(_this.opts.callback.hidden)_this.opts.callback.hidden({index:_this.index,jqueryObj:$this});_this.opts.status="hide";_this.inner.hide();});
				};
		    this.toggle=function()
			{
				if(_this.toggle.arguments.length==1)
				{
				   callback=_this.toggle.arguments[0];
				}
				if(_this.opts.status=="show" && _this.opts.status !="running")
				{
					_this.hide(function(){if(_this.opts.callback.toggle)_this.opts.callback.toggle({index:_this.index,jqueryObj:$this});});
				}
				else if(_this.opts.status=="hide" && _this.opts.status !="running")
				{
					_this.show(function(){if(_this.opts.callback.toggle)_this.opts.callback.toggle({index:_this.index,jqueryObj:$this});});
				}
			};
			_init();
			return this;
		};
		$.fn.CZYSelect=function(options)
		{
			var _this = this;
            var $this = $(this);
			var defaults={
				height:"auto",
				width:"auto",
				status:"hide",
				autoHide:true,
				event:"click",
				speed:"fast",
				elements:{tag:".tag",inner:".inner"},
				callback:{
					shown:function(){},
					beginShow:function(){},
					hidden:function(){},
					beginHide:function(){},
					toggled:function(){}
				}
			};
	        this.opts = $.extend(defaults, options);
			this.elements=[];
			var _init=function()
			{
				 _this.opts.type="select";
				 $.each($this,
					 function(i,n){
						 var select=$(n).CZYAccordion(_this.opts);
						 _this.elements.push(select);
					 }
				   );
			};
			_init();
			return this;
		};
    /* 基本信息 */
    $.fn.CZYAccordion.Info = {
        name: "CZYAccordion",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author      : czy
@description : DataPager - - 数据分页
@date  		 : 2011/5/17
@dependent   : jquery.js
*/
;(function($) {
    $.fn.CZYDataPager = function(options) {
        var _this = this;
        var $this = $(this);
        var defaults = {
            count: 9, // 显示的分页数 为奇数
			style:"complex",   // normal
            callback: {change:function(){}}, // 改变当前面的事件
            recordCount: 0,
            pageSize: 10,
            currentPage: -1,
            pageCount: 0,
			css:{
				    current: "current",
					normal: "normal",
					prev: "prev",
					next: "next",
					first: "first",
					last: "last",
					disable:"disable"
			},
			lang:{
				first: "首页",
				prev: "上一页",
				next: "下一页",
				last: "尾页"
			}
        };
        this.opts = $.extend(defaults, options);
        var _addCurrent = function(count) {
            _this.opts.currentPage = parseInt(_this.opts.currentPage);
            if (_this.opts.currentPage >= 0 && _this.opts.currentPage < _this.opts.pageCount) {
                _this.opts.currentPage += count;
                _this.opts.currentPage = _this.opts.currentPage < 0 ? 0 : _this.opts.currentPage;
                _this.opts.currentPage = _this.opts.currentPage >= _this.opts.pageCount ? _this.opts.pageCount - 1 : _this.opts.currentPage;
            };
        };
        var create = function() {
            $this.empty();
            _init();
            if(_this.opts.callback.change)_this.opts.callback.change(_this.opts);
        };
        var _init = function() {
            var cpage = 1;

            var count = (_this.opts.count - 1) / 2;
            var start = parseInt(_this.opts.currentPage) - count;
            var diff = start < 0 ? -start: 0;
            start = start > 0 ? start: 0;
            count = count >= _this.opts.pageCount ? _this.opts.pageCount: count;
            var end = parseInt(_this.opts.currentPage) + parseInt(count) + parseInt(diff) + 1;
            end = end < _this.opts.pageCount ? end: _this.opts.pageCount;
            var fir;
			if(_this.opts.style=="normal")
			{ fir= $("<a/>").appendTo($this).addClass(_this.opts.css.first).text(_this.opts.lang.first);}
            var prev = $("<a/>").appendTo($this).addClass(_this.opts.css.prev).text(_this.opts.lang.prev);
			if(_this.opts.style=="complex")
			{
				if(start > 1)
				{
					fir= $("<a/>").appendTo($this).addClass(_this.opts.css.normal).text("1");
					$("<span/>").appendTo($this).text("...");
				}
			}
            if (_this.opts.currentPage > 0) {
				if(fir!=null)
				{
					fir.attr("href", "javascript:void(0);");
					fir.click(function() {
						_this.opts.currentPage = 0;
						create(_this.opts);
					});
				}

                prev.attr("href", "javascript:void(0);");
                prev.click(function() {
                    _addCurrent( - cpage);
                    create(_this.opts);
                });
            }
			else
			{
				if(fir!=null)fir.addClass(_this.opts.css.disable);
				prev.addClass(_this.opts.css.disable);
			}
			

            for (var i = start; i < end; i++) {
                var a = $("<a/>").appendTo($this).attr("href", "javascript:void(0);").text(i + 1).attr("data-index", i).bind("click",
                function() {
                    _this.opts.currentPage = $(this).attr("data-index");
                    create(_this.opts);
                });
                if (i == _this.opts.currentPage) {
                    a.addClass(_this.opts.css.current);
                } else {
                    a.addClass(_this.opts.css.normal);
                }
            }
			var last;
			if(_this.opts.style=="complex")
			{
				if(end < _this.opts.pageCount -1)
				{
					$("<span/>").appendTo($this).text("...");
		    		last = $("<a/>").appendTo($this).addClass(_this.opts.css.normal).text(_this.opts.pageCount);
				}
			}
            var next = $("<a/>").appendTo($this).addClass(_this.opts.css.next).text(_this.opts.lang.next);
			if(_this.opts.style=="normal")
            last = $("<a/>").appendTo($this).addClass(_this.opts.css.last).text(_this.opts.lang.last);
			
            if (_this.opts.currentPage < _this.opts.pageCount - 1) {
				
					next.attr("href", "javascript:void(0);");
					next.click(function() {
						_addCurrent(cpage);
						create(_this.opts);
					});
				if(last!=null)
				{
					last.attr("href", "javascript:void(0);");
					last.click(function() {
						_this.opts.currentPage = _this.opts.pageCount - 1;
						create(_this.opts);
					});
				}
            }
			else
			{
				next.addClass(_this.opts.css.disable);
				if(last!=null)last.addClass(_this.opts.css.disable);
			}
            $("<div/>").appendTo($this).css({
                "clear": "both"
            });
        };
        // currentPage值是否正确
        var checkCur = function() {
            _this.opts.pageCount = _this.opts.recordCount % _this.opts.pageSize > 0 ? (_this.opts.recordCount / _this.opts.pageSize) + 1 : _this.opts.recordCount / _this.opts.pageSize;
            if (_this.opts.currentPage < 0) {
                _this.opts.currentPage = 0;
            }
            if (_this.opts.currentPage >= _this.opts.pageCount) {
                _this.opts.currentPage = _this.opts.pageCount - 1;
            }
        };
        this.currentPage = function() {
            switch (_this.currentPage.arguments.length) {
            case 0:
                return _this.opts.currentPage;
            case 1:
                _this.opts.currentPage = _this.currentPage.arguments[0] || 0;
                checkCur();
                create(_this.opts);
                return _this;
            }
        };
        checkCur();
        _init();
        return this;
    };
    /* 基本信息 */
    $.fn.CZYDataPager.Info = {
        name: "CZYDataPager",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author 	: czy
@description: 弹出的说明性窗口
@date 		: 2011/5/17
@dependent  : jquery.js  
        	  jquery-ui.min.js  
			  core.js
*/
;(function($) {
       /*
		@remark :	 需放在最外层:body的子层
       */
	$.fn.CZYBackground=function(options)
	{
		var _this = this;
        var $this = $(this);
		var defaults = {
			status:"hide",
			maxOpacity: 0.5, // opacity:透明度[0 - 1]
			color:"black",
			animateSpeed: "slow",
            animateEasing: "easeOutExpo", // 运动类型
			css:"dialog-background"
        };
		this.opts = $.extend(defaults, options);
		this.lock=false; // 是否锁定
		var _init=function()
		{   
				$this.css({
					"position": "absolute",
					"display":"none",
					opacity: 0,
					"background":_this.opts.color,
					width: $(document).CZYScrollSize().width,
					height: $(document).CZYScrollSize().height,
					left: 0,
					top: 0
				});
				$this.addClass(_this.opts.css);
				
				if(_this.opts.status=="show")
				{
					$this.css({display:"block",opacity:_this.opts.maxOpacity});
				}
			
		};
		this.show=function()
		{
			 if(!_this.lock)
			 {
				 if (jQuery.support.opacity) {
					  $this.show();
					  $this.animate({opacity:_this.opts.maxOpacity},_this.opts.animateSpeed,_this.opts.animateEasing,function(){_this.opts.status="show";});
				 }
			 }
			 
		};
		this.hide=function()
		{
			 if(!_this.lock)
			 {
				$this.animate({opacity:0},_this.opts.animateSpeed,_this.opts.animateEasing,function(){$(this).hide();_this.opts.status="hide";});
			 }
		};
		_init();
		return this;
	};
    $.fn.CZYDialog = function(options) {
        var _this = this;
        var $this = $(this);
        var defaults = {
            status: "hide",// 初化是否打开
			elements:{bar:".header",showBtn:".show",hideBtn:".hide",nextBtn:".next"}, 
            animateType: "fade", // 动画类型 fade,puff
            animateSpeed: "slow",
            animateEasing: "easeOutExpo" // 运动类型
        };
        this.opts = $.extend(defaults, options);
		var addbackground = function() {
            if ($("body>.dialog-background").length <= 0) {
                var el=$("<div/>").appendTo($("body"));
				$.CZYDialog.Background=$(el).CZYBackground();
            }
        };
        var _init=function()
		{
		    addbackground();
			$this.css({"position": "absolute",display:"none", "z-index": 9999 }).CZYCenter();
			$this.draggable({handle: $this.find(_this.opts.elements.bar),containment: "document", scroll: false,opacity: 0.8, cursor: 'move'});
			var hideBtn = $this.find(_this.opts.elements.hideBtn).css({cursor: "pointer" });
            var nextBtn = $this.find(_this.opts.elements.nextBtn).css({cursor: "pointer" });
			var bar = $this.find(_this.opts.elements.bar);
			
		    hideBtn.bind("click", function() {_this.hide();});
			nextBtn.bind("click",function() { 
				$.CZYDialog.Background.lock=true;
                _this.hide();
				$.CZYDialog.Background.lock=false;
            });
			if(_this.opts.status=='show')
			{
				$this.show();
			}
			else
			{
				$this.hide();
			}
		};
        this.show = function() {
		    $("body").css({ "overflow-x": "auto" });
			$.CZYDialog.Background.show();
            $this.CZYCenter().show();
			_this.opts.status="running";
			$this.animate({opacity:1},_this.opts.animateSpeed,_this.opts.animateEasing,function(){_this.opts.status="show";});
        };
		this.next = function(dialog) {
			$.CZYDialog.Background.lock=true;
            _this.hide();
			dialog.show();
		   $.CZYDialog.Background.lock=false;
        };
        this.hide = function() {
			$.CZYDialog.Background.hide();
			_this.opts.status="running";
			if(jQuery.support.opacity)
			{
				switch(_this.opts.animateType)
				{
					case "fade" :
					$this.animate({opacity:0},_this.opts.animateSpeed,_this.opts.animateEasing,function(){if($(this)[0]!=null)$(this).hide();_this.opts.status="hide";});
					break;
					case "puff" :
					$this.effect("puff", {}, 500, function(){_this.opts.status="hide";});
					break;
				}
			
			}
			else
			{
				$this.hide();
				_this.opts.status="hide";
			}
        };
        _init();
	    return this;
    };
    //该插件的基本信息
    $.fn.CZYDialog.Info = {
        name: "CZYDialog",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
	$.CZYDialog={Background:null};
	$.fn.CZYDialogGroup=function(options)
	{
		var _this = this;
        var $this = $(this);
		var defaults = {
            status: "hide",
			current:0,
			back:0,
			elements:{bar:".header",showBtn:".show",hideBtn:".hide",nextBtn:".next"}, 
            animateType: "fade", // 动画类型 fade,puff
            animateSpeed: "slow",
            animateEasing: "easeOutExpo" // 运动类型
        };
		this.opts = $.extend(defaults, options);
		this.dialogs=[];
		var _init=function()
		{
			for(var i=0;i< $this.length;i++)
			{
				_this.dialogs.push($($this[i]).CZYDialog(_this.opts));
			}
			if(_this.opts.status=="show")
			{
				_this.dialogs[_this.opts.current].show();
			}
		};
		this.show=function(index)
		{
			if(_this.current.arguments.length==1)
			{
				_this.opts.current=_this.current.arguments[0];
				_this.dialogs[_this.opts.current].show();
			}
			else
			{
				if(_this.dialogs[_this.opts.current].opts.status!="running")
				{ 
					_this.dialogs[_this.opts.current].show();
				}
			}
			_this.opts.back=_this.opts.current;
		};
		this.hide=function()
		{
			if(_this.current.arguments.length==1)
			{
				_this.dialogs[_this.current.arguments[0]].hide();
			}
			else
			{
				if(_this.dialogs[_this.opts.current].opts.status!="running")
				{   
					_this.dialogs[_this.opts.current].hide();
				}
			}
		};
		this.next=function()
		{
			var tempIndex=_this.opts.current;
			if((_this.opts.current+1)< $this.length)
			{
				if(_this.dialogs[_this.opts.current].opts.status!="running")
				{   
				    ++_this.opts.current;
					_this.dialogs[tempIndex].next(_this.dialogs[_this.opts.current]);
					_this.opts.back=_this.opts.current;
				}
			}
		};
		this.prev=function()
		{
			var tempIndex=_this.opts.current;
			if((_this.opts.current-1)>=0)
			{   
				if(_this.dialogs[_this.opts.current].opts.status!="running")
				{
					--_this.opts.current;
					_this.dialogs[tempIndex].next(_this.dialogs[_this.opts.current]);
					_this.opts.back=_this.opts.current;
				}
			}
		};
		this.back=function()
		{
			var temp=_this.opts.current;
			if(_this.dialogs[_this.opts.back].opts.status!="running")
			{
				_this.dialogs[_this.opts.current].next(_this.dialogs[_this.opts.back]);
				_this.opts.current=_this.opts.back;
				_this.opts.back=temp;
			}
		};
		_init();
		return this;
	};
	
})(jQuery);/*
@author : czy
@about  : Fixed
@date   : 2011/5/17
@import : jquery.js
*/
/* Fixed */
(function($){  
        $.fn.CZYFixed = function(options){ 
		 var _this=this;
		 var $this=$(this);
         var defaults={  
		   left:"auto",
		   right:"auto",
		   bottom:"auto",
		   top:"auto",
		   direction:"left", //auto 
		   status:"show",
		   speed:"fast", 
		   minVal:0,
		   elements:{fixedbar:".fixbar"}
           };  
		 this.opts=$.extend(defaults,options);  
		 $this.show();
		 var fixbar=$(this).children(_this.opts.elements.fixedbar).css("cursor","pointer");
		 var tempHeight=$this.height();
		 var tempWidth=$this.width();

         switch(_this.opts.direction)
		 {
				 case "top":_this.opts.top=0;break;
				 case "left":_this.opts.left=0;break;
				 case "bottom":_this.opts.bottom=0;break;
				 case "right":_this.opts.right=0;break;
				 case "auto":break;
		 }
		 if(_this.opts.top =="auto" && _this.opts.bottom =="auto")
		 _this.opts.bottom=0;
		 if(_this.opts.left=="auto" && _this.opts.right=="auto")
		 _this.opts.right=0;
		 var _runInIE6=function()
		 {
			 $("body").css({"background-image":"url(about:blank)","background-attachment":"fixed"});
		     var docHeight=$(document).height();
			 $(window).scroll(function()
			 {	 
				  $("body").height(docHeight);
			 });
			 $this.css({"position":"absolute"});
			if(_this.opts.top!="auto" )$this[0].style.setExpression("bottom","eval(document.documentElement.scrollTop"+(_this.opts.top)+")");
			if(_this.opts.left!="auto") $this[0].style.setExpression("right","eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0"+(_this.opts.left)+")");
			if(_this.opts.right!="auto")$this[0].style.setExpression("left","eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0"+(_this.opts.right)+")");
			if(_this.opts.bottom!="auto"  ) $this[0].style.setExpression("top","eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0"+(_this.opts.bottom)+"))");
		 };    
		 var _fixedBrowse=function()
		 {
			 $this.css({"position":"fixed"});
			 $this.css({"top":_this.opts.top});
			 $this.css({"left":_this.opts.left});
			 $this.css({"right":_this.opts.right});
			 $this.css({"bottom":_this.opts.bottom});
	 
		 };
        
		 var _init=function()
		 {
			 if(_this.opts.direction=="left" || _this.opts.direction=="right")
			 {_this.opts.minVal=fixbar[0]==null?_this.opts.minVal:fixbar.width();}
			 else if(_this.opts.direction=="bottom" || _this.opts.direction=="top")
			 {_this.opts.minVal=fixbar[0]==null?_this.opts.minVal:fixbar.height();}
			 //如果是IE6
			if($.browser.msie&&$.browser.version=='6.0')
			    _runInIE6();
			else
				_fixedBrowse();
			 fixbar.click(function()  { _this.toggle();  });
			 if( _this.opts.status=="hide")
			 {
			     switch(_this.opts.direction)
				 {
					 case "top":$this.animate({height:_this.opts.minVal});break;
					 case "left":$this.animate({width:_this.opts.minVal});break;
					 case "right":$this.animate({width:_this.opts.minVal});break;
					 case "bottom":	$this.animate({height:_this.opts.minVal});break;
				 }
			 }
         };

         this.show=function()
		 {
				 switch(_this.opts.direction)
				 {
					 case "top":$this.animate({height:tempHeight});break;
					 case "left":$this.animate({width:tempWidth});break;
					 case "right":$this.animate({width:tempWidth});break;
					 case "bottom":	$this.animate({height:tempHeight});break;
				 }
			 _this.opts.status="show";
		 };
		 this.hide=function()
		 { 
				 switch(_this.opts.direction)
				 {
					 case "top":$this.animate({height:_this.opts.minVal});break;
					 case "left":$this.animate({width:_this.opts.minVal});break;
					 case "right":$this.animate({width:_this.opts.minVal});break;
					 case "bottom":$this.animate({height:_this.opts.minVal});break;
				 }
			
			  _this.opts.status="hide";
		 };
		 this.toggle = function()
		 {
			
			   if(_this.opts.status=="hide")
				 _this.show();
			   else
			     _this.hide();
		 }
		 _init();
	}
	/* 基本信息 */
	$.fn.CZYFixed.Info={
		     name   	: "CZYFixed",
		     author 	: "caizhongyi",
			 ver    	: "1.0.0.0",
			 date   	: "2011-05-17",
		     email		: "274142680@qq.com",
			 copyright  : "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery); 


;(function($){
    $.fn.capacityFixed = function(options) {
        var opts = $.extend({},$.fn.capacityFixed.deflunt,options);
        var FixedFun = function(element) {
            var top = opts.top;
            var right = ($(window).width()-opts.pageWidth)/2+opts.right;
            element.css({
                "right":right,
                "top":top
            });
            $(window).resize(function(){
                var right = ($(window).width()-opts.pageWidth)/2+opts.right;
                    element.css({
                    "right":right
                });
            });
            $(window).scroll(function() {
                var scrolls = $(this).scrollTop();
                if (scrolls > top) {
                    if (window.XMLHttpRequest) {
                        element.css({
                            position: "fixed",
                            top: 0
                        });
                    } else {
                        element.css({
                            top: scrolls
                        });
                    }
                }else {
                    element.css({
                        position: "absolute",
                        top: top
                    });

                }
            });
            element.find(".close-ico").click(function(event){
                element.remove();
                event.preventDefault();
            })
        };
        return $(this).each(function() {
            FixedFun($(this));
        });
    };
    $.fn.capacityFixed.deflunt={
        right : 100,//相对于页面宽度的右边定位
        top:100,
        pageWidth : 960
    };
})(jQuery);
/*
@author		  : czy
@description  : loading
@time   	  : 2011/5/17
@dependent    : jquery.js
          CZYCore.js
*/
;(function($) {
    /*
    */
    $.fn.CZYLoading = function() {
        var $this = $(this);
        var _this = this;
        var load = $this.css({
            "position": "relative"
        });
		this.status="hide";
        var loadBackground = $("<div/>").appendTo($this).addClass("load-background").css({
            "position": "absolute",
            top: 0,
            left: 0
        }).width($this.width()).height($this.height()).hide();

        var ico = $("<div/>").appendTo(loadBackground).addClass("load-ico").css({
            "background-position": "center",
            "background-repeat": "no-repeat"
        }).width($this.width()).height($this.height()).hide();
		//ico.CZYCenter({type:"margin"});
        this.show = function() {
            loadBackground.show().fadeTo("fast", 0.5);
            ico.show().fadeTo("fast", 0.5);
			_this.status="show";
        };
        this.hide = function() {
            loadBackground.fadeTo("fast", 0).hide();
            ico.fadeTo("fast", 0).hide();
			_this.status="hide";
        };
		this.toggle =function()
		{
			if(_this.status=="show")
			_this.hide();
			else
		    _this.show();
			
		};
        return this;
    };
    /* 基本信息 */
    $.fn.CZYLoading.Info = {
        name: "CZYLoading",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author 	: czy
@description: 图片浏览器
@date  		: 2011/5/17
@dependent  : jquery.js
*/
;(function ($) {
    /*
    需要有唯一父级层
    */
    $.fn.CZYPicsView = function (options) {
        var _this = this;
		var $this=$(this);
        var defaults = { }
        this.opts=  $.extend(defaults, options);
        var list =$this.find(":imgs").css({"position":"relative",overflow:"hidden"}).children().css({"position":"absolute"});
		this.prev=function()
		{
			list.animate({left:"-="+list.width()});
		};
		this.next=function()
		{	
		    list.animate({left:"+="+list.width()});
		};
        return this;
    };
    /* 基本信息 */
    $.fn.CZYPicsView.Info = {
        name: "CZYPicsView",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);


/*
@author : czy
@about  : 随机在div内显示图片
@time   : 2011/5/17
@import : jquery.js
		  jquery-ui.min.js
		  jquery-rotate.js
		  jquery.fancybox-1.3.4.js
		  jquery.fancybox-1.3.4.css
*/
(function($) {

    /*
    */
    $.fn.CZYRanPic = function(options) {
        var $this = this;
        var _this = this;
        var defaults = {
            maxZIndex: 9999 //zindex最大值
        }
        if (options) {
            $.extend(defaults, options);
        }
        $(this).css({
            "position": "relative"
        });

        var pics = $(this).find("a");
        $.each(pics,
        function(i, n) {
            var left = $(self).width() * Math.random();
            var top = $(self).height() * Math.random();
            var space = $(n).width() > $(n).height() ? $(n).width() : $(n).height();
            left = (left + space) > $(self).width() ? left - space: left;
            top = (top + space) > $(self).height() ? top - space: top;
            $(n).css({
                display: "block",
                "position": "absolute",
                "border": "none",
                left: left,
                top: top,
                "z-index": i
            });
            $(n).children("img").css("border", "none")
            .rotate(Math.random() * 180);
            $(n).hover(function() {
                $(this).css({
                    "z-index": defaults.maxZIndex
                });
            },
            function() {
                $(this).css({
                    "z-index": i
                });
            });
            $(n).fancybox({
                'overlayShow': false,
                'transitionIn': 'elastic',
                'transitionOut': 'elastic'
            });
        });
        return this;
    };
    /* 基本信息 */
    $.fn.CZYRanPic.Info = {
        name: "CZYRanPic",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author 	  : czy
@description  : DataPager - - 数据分页
@date         : 2011/5/17
@dependent    : jquery.js
                jquery-ui.min.js 
*/
;(function($) {

    $.fn.CZYTabs = function(options) {
        var _this = this;
        var $this = $(this);
        var defaults = {
            animateType: "nor",// fade 渐变,ori 横向,por 纵向,nor 无特效,fade
            event: "mouseover", // mouverover && click
            autoTab: false, // 自动
            current: 0,
            back: 0,
			elements:{
				tags:"ul.tags",
				inners:"ul.inners"
			},
            interval: 2000,
			callback:{tabChange:function(){}},
			css:{
				  cur: "current",
                  nor: "normal"
			}
          
        };
        this.opts = $.extend(defaults, options);
        // 变换 
        var _change = function(defaults, inners, tags) {
            if (defaults.current < inners.length && defaults.current > -inners.length) {
                switch (defaults.animateType) {
                case "fade":
                    if (defaults.current != defaults.back) {
                        inners.eq(defaults.back).fadeOut("slow");
                        inners.eq(defaults.current).fadeIn("slow");
                    };
                    break;
                case "hor":
                    inners.parent().animate({
                        "left":
                        -(inners.width() * defaults.current)
                    },
                    defaults.animateSpeed, defaults.animateEasing);
                    break;
                case "ver":
                    inners.parent().animate({
                        "top":
                        -(inners.height() * defaults.current)
                    },
                    defaults.animateSpeed, defaults.animateEasing);
                    break;
                case "nor":
                    if (defaults.current != defaults.back) {
                        inners.eq(defaults.back).hide();
                        inners.eq(defaults.current).show();
                    };
                    break;
                }
                var norElment=tags.eq(defaults.back);
				norElment.removeClass(defaults.css.cur).addClass(defaults.css.nor);
				var curElemnt=tags.eq(defaults.current);
				curElemnt.removeClass(defaults.css.nor).addClass(defaults.css.cur);
				if(defaults.animateType != "nor" )
				{
					norElment.fadeTo("slow", 0.5, null);
					curElemnt.fadeTo("slow", 1, null);
				}
                defaults.back = defaults.current;
            }
			if(_this.opts.callback.tabChange!=null)_this.opts.callback.tabChange();
            return defaults.back;

        }

        $this.css({
            "position": "relative"
        });
        var stop = false;
		var timeChange;
        var inners = $this.find(_this.opts.elements.inners).css({
            "list-style": "none"
        }).children().show();
		inners.parent().parent().css({"position":"relative"}); //inners父级样式
        var tags = $this.find(_this.opts.elements.tags).css({
           // "position": "absolute",
            "list-style": "none",
            "z-index": 9999
        }).children();

        tags.bind(_this.opts.event,
            function() {
                _this.opts.current = tags.index($(this));
                _this.opts.back = _change(_this.opts, inners, tags);
				clearTimeout(timeChange);
       });
        switch (defaults.animateType) {
        case "fade":
           // inners.css({"position":"absolute"});
            break;
        case "hor":
            inners.css({
                "float":
                "left"
            }).parent().css({
                "position":
                "absolute",
                left: 0,
                top: 0,
                width: inners.width() * inners.length,
				height:_this.inners.height()
            });
            break;
        case "ver":
            inners.parent().css({
                "position":
                "absolute",
                left: 0,
                top: 0,
				height:_this.inners.height()
            });
            break;
        case "nor":
            break;
        }

        var _init = function() {
            if (_this.opts.animateType == "fade" || _this.opts.animateType == "nor") {
                $.each(inners,
                function(i, n) {
                    if (i == 0) {
                        $(n).show();
                    } else {
                        $(n).hide();
                    }

                });
            }
            $.each(tags,
            function(i, n) {
                if (i == 0) {
                    $(n).addClass(_this.opts.css.cur);
                } else {
                    $(n).addClass(_this.opts.css.nor);
                }
            });
        }
        // 时间变换
        var _timeChange = function() {
		
            if (_this.opts.current >= tags.length) {
                _this.opts.current = 0;
            }
            _this.opts.back = _change(_this.opts, inners, tags);
            _this.opts.current++;
            if (!stop) {timeChange=setTimeout(_timeChange, _this.opts.interval);}
        }
        this.current = function() {
            switch (_this.current.arguments.length) {
            case 0:
                return _this.opts.current;
            case 1:
                _this.opts.current = _this.current.arguments[0];
                _this.opts.back = _change(_this.opts, inners, tags);
                return _this;
            }
        }
        _init();
        if (_this.opts.autoTab) {
            _timeChange();
        }
        return this;
    };

    /* 基本信息 */
    $.fn.CZYTabs.Info = {
        name: "CZYTabs",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author : czy
@about  : 随机在div内显示图片
@time   : 2011/5/17
@import : jquery.js
*/
(function($) {

    /*
    */
    $.fn.CZYTextArea = function(options) {
        var $this = this;
        var _this = this;
        var defaults = {
			max:140,
			callback:function(){}
			};
        this.opts=$.extend(defaults, options);
		this.resoult=_this.opts.max;
		var _compare=function()
		{
			var len=$this.val().length;
			if(len>_this.opts.max)
			{
				$this.val($this.val().substring(0, _this.opts.max));
				_this.resoult=_this.opts.max-$this.val().length;
			    if(_this.opts.callback)_this.opts.callback(_this.resoult);
				return false;
			}
			else
			{	
				_this.resoult=_this.opts.max-len;
				if(_this.opts.callback)_this.opts.callback(_this.resoult);
				return true;
			}	    
			
		}
		
		$this.bind("keypress",
				   function()
					{
						_compare(); 
					});
		$this.bind("keyup",
				   function()
					{
					   _compare(); 
					});
        return this;
    };
    /* 基本信息 */
    $.fn.CZYTextArea.Info = {
        name: "CZYTextArea",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author		  : czy
@description  : 文本框效果[为空时显示的内容]
@date  		  : 2011/5/17
@dependent    : jquery.js
*/
;(function($) {

    $.fn.CZYTextBox = function() {
        var _this = this;
        var $this = $(this);
		var _bind=function(obj)
		{
			var value = obj.val();
			obj.css("color","#999");
			obj.focus(function() {
				if ($(this).val() == value) {
					$(this).val("");
					obj.css("color","black");
				}
			});
			obj.blur(function() {
				if ($(this).val() == "") {
					$(this).val(value);
					$(this).css("color","#999");
				}
			});
		};
		if($this.length>1)
		{
			$.each($this,function(i,n)
			{
				_bind($(n));
			});
		}
		else
		{
			_bind($this);
		}
        return this;
    };
    /* 基本信息 */
    $.fn.CZYTextBox.Info = {
        name: "CZYTextBox",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author		  : czy
@description  : 鼠标移入弹出的说明性窗口
@date  		  : 2011/5/17
@dependent 	  : jquery.js
*/
;(function($) {
    /*
 
    */
    $.fn.CZYTips = function(options) {
        var $this = $(this); //对像必须有唯一父级层
        var _this = this;
        var defaults = {
			elements:{tips:".tips-box"},
            autoPosition: true,//是否第一个tips定位
            animateType: "fade" //动画类型
        };
        this.opts = $.extend(defaults, options);
        var tips = $this.find(_this.opts.elements.tips).hide();
        $this.css({
            "position": "relative"
        });
        var _show = function() {
            switch (_this.opts.animateType) {
            case "fade":
                tips.fadeIn();
                break;
            case "normal":
                tips.show();
                break;
            default:
                tips.show();
            }
        };
        var _close = function() {
            switch (_this.opts.animateType) {
            case "fade":
                tips.fadeOut();
                break;
            case "normal":
                tips.hide();
                break;
            default:
                tips.hide();
            }
        };
        tips.css({
            "position":
            "absolute"
        });
        $this.hover(function(e) {
            // for (var i in e) {
            //    document.write(i+"=="+e[i]+"<br/>");
            // }
            var left = $.browser.msie ? e["offsetX"] : e["layerX"];
            var top = $.browser.msie ? e["offsetY"] : e["layerY"];
            tips.eq(0).css({
                "left": left,
                "top": top
            });
            _show();
        },
        function(e) {
            _close();
        });
        return this;

    };
    /* 基本信息 */
    $.fn.CZYTips.Info = {
        name: "CZYTips",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);/*
@author : czy
@about  : 随机在div内显示图片
@time   : 2011/5/17
@import : jquery.js
		  jquery-ui.min.js
		  jquery-rotate.js
		  jquery.fancybox-1.3.4.js
		  jquery.fancybox-1.3.4.css
*/
(function($) {

    /*
    */
    $.fn.CZYSameHeight = function(options) {
        var $this = this;
        var _this = this;
        var defaults = {}
        this.opts=$.extend(defaults, options);
        this.maxHeight=0;
		var _init=function()
		{
			$.each($this,function(i,n){
		       if(i<$this.length-1)
			   {
				   if($($this[i]).height()>$($this[i+1]).height())
				   {
					   alert($($this[1]).css("height"));
					   _this.maxHeight=$($this[i]).height();
				   }
			   }
			});
			alert( _this.maxHeight);
			$.each($this,function(i,n){
			    $(n).height(_this.maxHeight);
			});
		};
		_init();
        return this;
    };
    /* 基本信息 */
    $.fn.CZYSameHeight.Info = {
        name: "CZYSameHeight",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
		email:"274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery);