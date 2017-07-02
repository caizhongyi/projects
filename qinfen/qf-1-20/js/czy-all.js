/* 
* czy plug
* http://www.czyweb.com  
* http://www.crazyproduct.net  

* Dependent : jquery.js jquery-ui.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
/* ************************  namespace  *************************** */

;
(function (window, $) {
    if (window.czy == null) {
        window.czy = {
            ui: {
                core: {}
            },
            document: {},
            date: {
                month: {}
            },
            data: {},
            debug: {},
            parse: {},
            action: {},
            url: {}
        }
    }

})(window, jQuery);

/* Object类 */
;
(function ($, czy) {

    /* timer */
    czy.timer = function (interval) {
        this.interval = interval;
        this.timer = null;
        this.array = new Array();
    }
    czy.timer.prototype = {
        add: function (fn, args) {
            this.array.push({
                fn: fn,
                args: args
            });
        },
        start: function (fn, args) {
            var _this = this;
            this.timer = setTimeout(function () {
                for (var i = 0; i < _this.array.length; i++) {
                    _this.array[i].args == null ? _this.array[i].fn() : _this.array[i].fn(_this.array[i].args);
                }
                if (fn != null) {

                    args == null ? fn() : fn(args);
                }
                _this.start(fn, args);
            }, this.interval);
        },
        stop: function () {
            clearTimeout(this.timer);
        },
        remove: function (fn) {
            this.array.pop(fn)
        }
    }

    /* delegate */
    czy.delegate = function () {
        this.arr = new Array();
    }
    czy.delegate.prototype = {
        add: function (fn) {
            this.arr.push(fn);
        },
        run: function (sender, args) {
            for (var i = 0; i < this.arr.length; i++) {
                this.arr[i](sender, args);
            }
        },
        remove: function (fn) {
            this.arr.pop(fn);
        }

    } 
	
	/* dataTable */
    czy.data.dataTable = function (options) {
        var _options = {
            columns: [

            ],
            pageInfo: {
                currentPageIndex: 0,
                recordCount: 0,
                totalPageCount: 0,
                pageSize: 0
            }
        }
        options = czy.extend(_options, options);
        czy.setAttr(this, options);
    }
    czy.data.dataTable.prototype = {
        add: function (dataColumn) {
            this.columns.push(dataColumn);
        },
        remove: function (dataColumn) {
            this.columns.pop(dataColumn);
        }
    }

    /* dataColumn */
    czy.data.dataColumn = function (options) {
        var _options = {
            name: '',
            values: []
        }
        options = czy.extend(_options, options);
        czy.setAttr(this, options);
    }
    czy.data.dataColumn.prototype = {
        add: function (value) {
            this.values.push(value);
        },
        remove: function (value) {
            this.values.pop(value);
        }
    }
})(jQuery, czy);

/* ************************ czy extend  *************************** */
/* 静态方法 */
;
(function ($, czy) {
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
    czy.cookie = function (name, value, options) {
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
    }

    czy.setAttr = function (obj, options) {
        for (var i in options) {
            obj[i] = options[i];
        }
        return obj;
    }

    czy.isIE6 = function () {
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) return true;
        else return false;
    }
    czy.sum = function () {
        var s = 0;
        for (var i = 0; i < this.sum.arguments.length; i++) {
            s += sum.arguments[i];
        }
        return s;
    }
    czy.favorite = function (url, title) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }

    /**   
     *    
     * @param {} obj 当前对象，一般是使用this引用。   
     * @param {} vrl 主页URL   
     */
    czy.setHome = function (obj, vrl) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(vrl);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', vrl);
            }
        }
    }
    /*
		  url : 地址
		  method :方法
		  param : 参数
		  type : 访问类型 post/get
		  callback : 回调 
		*/
    czy.wsLoad = function (url, method, param, callback) {
        type = "post";
        param = param || "";
        $.ajax({
            type: type,
            //注明 返回Json
            contentType: "application/json;utf-8",
            //CollegeDepartWebServices.asmx web服务名 /GetCollegeDepart 方法名
            url: url + "/" + method,
            //strDepartId 参数名称 collegeId 参数值"{strDepartId:"+collegeId+"}"
            data: param,
            dataType: "json",
            success: function (result) {
                var json = null
                try {
                    if (result) {
                        //因为返回的是ArrayList 所以循环取出其中的值
                        // $.each(result, function(i, n){
                        //ddlDepart 为下来菜单。循环的向下拉菜单中添加新的选项
                        // ddlDepart.options[ddlDepart.length]=new Option(n.CollegeDepartTitle,n.CollegeDepartId);
                        // });
                        if (callback) {
                            callback(result);
                        }
                    }


                } catch (e) {
                    alert("错误>>" + e.message);
                    return;

                }

            },
            error: function (data) {
                alert(data.status + ">>> " + data.statusText);
            }
        });
    }

    czy.hasJQueryLink = function (selectorScriptTag, name) {
        var $this = $(selectorScriptTag);
        var s = $this.find("script");
        $.each(s, function (i, n) {
            if ($(n).attr("src").indexOf(name) == -1) {
                return false;
            } else {
                return true;
            }
        })
    }

    czy.extend = function (param, options) {
    /*function extend( param , options )
				{
					if( options != null )
					{
						for( var i in param )
						{
							if( options[i] != null )
							{
								if(!param[i] instanceof Object)
								{		
									param[i] = options[i];
								}
							}
						}
					}
					
					return param;
				}
				
				for ()
				extend(param , options );
				*/
        return $.extend(param, options);
    }
    czy.sendMail = function (address, subject) {
        document.location = "mailto:" + address + ";?subject=" + subject;
    }
    czy.isjQuery = function (obj) {
        if (obj instanceof jQuery) return true;
        else return false;
    }
    czy.isObject = function (obj) {
        if (obj instanceof Object) return true;
        else return false;
    }
    czy.isArray = function (obj) {
        if (obj && typeof obj == 'object' && typeof obj.length == 'number' && !obj.propertyIsEnumerable('length')) {
            return true;
        }
        return false;
    }

    /* debug */
    czy.debug.write = function (obj) {
        for (var i in obj) {
            document.writeln(i + ':' + obj[i] + '<br/>');
        }
    }

    /* document */
    czy.document.size = function () {
        return {
            width: $(document).width(),
            height: $(document).height()
        }
    }
    czy.document.load = function (url) {
        this.write(unescape("%3Cscript language='javascript' src='" + url + "' %3E%3C/script%3E"));
        return this;
    }

    
    /* parse */
	czy.parse.toDate = function(DateStr)
	{
		var converted = Date.parse(DateStr);  
		var myDate = new Date(converted);  
		if (isNaN(myDate))  
		{   
			//var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
			var arys= DateStr.split('-');  
			myDate = new Date(arys[0],--arys[1],arys[2]);  
		}  
		return myDate;  
	}
	
    czy.parse.toString = function (obj) {
        switch (typeof (obj)) {
        case 'object':
            var ret = [];
            if (obj instanceof Array) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ret.push(czy.parseString(obj[i]));
                }
                return '[' + ret.join(',') + ']';
            } else if (obj instanceof RegExp) {
                return obj.toString();
            } else {
                for (var a in obj) {
                    ret.push(a + ':' + czy.parseString(obj[a]));
                }
                return '{' + ret.join(',') + '}';
            }
        case 'function':
            return 'function() {}';
        case 'number':
            return obj.toString();
        case 'string':
            return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function (a) {
                return ("\n" == a) ? "\\n" : ("\r" == a) ? "\\r" : ("\t" == a) ? "\\t" : "";
            }) + "\"";
        case 'boolean':
            return obj.toString();
        default:
            return obj.toString();
        }
    }

    /* url */
    czy.url.getQueryString = function (key) {
        var searchString = document.location.search.toString();
        var returnValue = '';
        if (searchString.substr(0, 1) == '?' && searchString.length > 1) {
            var queryString = searchString.substring(1, searchString.length)
            var queryList = queryString.split('&');
            for (var i = 0; i < queryList.length; i++) {
                var oneQuery = queryList[i].split('=');
                if (oneQuery[0] == key && oneQuery.length == 2) {
                    returnValue = oneQuery[1];
                }
            }
        }
        return returnValue;
    }

})(jQuery, czy);

/* ui 基类 */
;(function( czy  ,$ ){
	czy.ui.baseui = function(selector , options ,defaults)
	{
		options = czy.extend(defaults, options);
		czy.ui.core.setAttr(this , options);
		this.$ =  $(selector).show();
		for(var i in  options.Objects)
		{
		   this['$'+ i +''] = this.$.find(options.Objects[i]);
		}
		
	}	
})( czy , jQuery );

/* ui 类 */
;(function( czy , $  ) {
	
	czy.ui.core.setAttr = function( obj, options)
	{
		for(var i in options)
		{
			obj[i] = options[i];
		}
		return obj;
	}
	
	czy.ui.core.init = function(selector , obj , options )
	{
		 var objects = [];
	     $(selector).each(function(i , n){
			var o = $(n);
			objects.push(new obj(o , options));
         })
		 return objects;
	}
	

	czy.ui.core.bind = function(htmlELement , eventName , fn)
	{
		if(window.attachEvent){
			htmlELement.attachEvent( eventName ,fn);
		}else{
			htmlELement.oninput = fn;
		}
	}
	

	czy.ui.core.center = function(selector , type , hasAnimate , options)
	{
		var obj = $(selector);
		var t = type || 'absolute' ;
		var animate = hasAnimate || true ;
		var left =  ( $(window).width() - $(selector).outerWidth()) / 2 + $(window).scrollLeft();
		var top =  ( $(window).height() - $(selector).outerHeight()) / 2 + $(window).scrollTop();
		var defaults = {
				easing  	 :  'easeOutExpo',
				speed 		 :  "slow",
				callback     :  function(){}
        };
        var options = $.extend(defaults, options);
		
        switch (t) {
        case "margin":
			    if(animate)
				{
					obj.stop(true,true);
					obj.animate({"margin-top" : top ,  "margin-left"	: left}, options.speed,options.callback);
				}
				else
				{
					obj.css({"margin-top"	:  top , "margin-left"	:  left});
					if(options.callback) options.callback();
				}
                
                break;
            case "absolute":
			 	if(animate)
				{
					obj.stop(true,true);
					obj.animate({top: top , left: left}, options.speed,options.callback );
				}
				else
				{
					obj.css({ top: top , left	: left});
					if(options.callback)options.callback();
				}
            break;
        }
    }
	czy.ui.event = function(event)
	{
		this.event = null ;
		if(!event)
		{
			if (document.all) { 
				this.event =  window.event;//如果是ie 
			} 
			func = czy.ui.event.caller;//如果是ff 
			while (func != null) { 
				var arg0 = func.arguments[0]; 
					if (arg0) { 
					if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
						this.event =  arg0; 
					} 
				} 
				func = func.caller; 
			} 
		}
		else
		{
			this.event = event;
		}
		return this; 
	}
	
	
	
	czy.ui.event.prototype = {
		   offset : function(){
		     return document.all ? { x : this.event.offsetX , y : this.event.offsetY } : { x : this.event.layerX , y : this.event.layerY }; 
		   },
		   client : function(){
		     return { x : this.event.clientX , y : this.event.clientY } ; 
		   },
		   screen : function(){
		     return { x : this.event.screenX  , y : this.event.screenY } ; 
		   },
		   getTaget : function()
		   {
			    var target=e?e.target:(window.event?window.event.srcElement:null);
				if(!target){return null;}
				while(target.nodeType!=1&&target.nodeName.toLowerCase()!="body"){target=target.parentNode;}
				return target;
		   },
		   /* 0 没按键
			1 按左键
			2 按右键
			3 按左右键
			4 按中间键
			5 按左键和中间键
			6 按右键和中间键
			7 按所有的键
			这个属性仅用于onmousedown, onmouseup, 和 onmousemove 事件。对其他事件，不管鼠标状态如何，都返回 0（比如onclick）。
			*/
		   button : function(){
		    return this.event.button;
		   },
		   //检测 onmouseover 和 onmouseout 事件发生时，鼠标所离开的元素
		   fromElement : function(){
			   return this.event.fromElement;
		   },
		   toElement : function() {
			   return this.event.toElement;
		   },
		   type : function(){
			   return this.event.type ;//返回没有“on”作为前缀的事件名，比如，onclick事件返回的type是click 
		   },
		   position : function(){
			   return { x : this.event.x  , y : this.event.y } ; 
		   }
	}
		
    $.fn.lazyload = function(options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (options) {
            $.extend(settings, options)
        }
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll",
            function(event) {
                var counter = 0;
                elements.each(function() {
                    if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $(this).trigger("appear")
                    } else {
                        if (counter++>settings.failurelimit) {
                            return false
                        }
                    }
                });
                var temp = $.grep(elements,
                function(element) {
                    return ! element.loaded
                });
                elements = $(temp)
            })
        }
        return this.each(function() {
            var self = this;
            $(self).attr("original", $(self).attr("src"));
            if ("scroll" != settings.event || $.belowthefold(self, settings) || $.rightoffold(self, settings)) {
                if (settings.placeholder) {
                    $(self).attr("src", settings.placeholder)
                } else {
                    $(self).removeAttr("src")
                }
                self.loaded = false
            } else {
                self.loaded = true
            }
            $(self).one("appear",
            function() {
                if (!this.loaded) {
                    $("<img />").bind("load",
                    function() {
                        $(self).hide().attr("src", $(self).attr("original"))[settings.effect](settings.effectspeed);
                        self.loaded = true
                    }).attr("src", $(self).attr("original"))
                }
            });
            if ("scroll" != settings.event) {
                $(self).bind(settings.event,
                function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear")
                    }
                })
            }
        })
    };
    $.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).height() + $(window).scrollTop()
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height()
        }
        return fold <= $(element).offset().top - settings.threshold
    };
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft()
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width()
        }
        return fold <= $(element).offset().left - settings.threshold
    };
    $.extend($.expr[':'], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    })
	
	czy.ui.jsonToTable = function(json , htmlType , className)
	{
		var $container ;
		if(className)
		{
			$container.addClass(className);
		}
		
		if(czy.isArray(json))
		{
			for(var i = 0 ;i < json.length ; i++)
			{
				$container.append(getJQueryItem( type , className ))
			}
		}
		else
		{
			for(var i in json)
			{
				
			}
		}
		
		function getJQueryItem( type )
		{
			var $item ;
			switch(type)
			{
				case 'ul' : $item = $('<li/>'); break;
				case 'table' : $item = $('<tr/>');break;
				default : $item = $('<li/>'); break;
			}
			return $item;
		}
	}
	
	czy.ui.lazyload = {
	   active  : false ,
	   loadUrl : 'http://www.shtion.com/wp-content/themes/Apple/images/load.gif',
	   effect  : "fadeIn" 
	}
	
	$(document).ready(function(){
			if(czy.ui.lazyload.active)				   
       	     $("img").lazyload({
        		 placeholder: czy.ui.lazyload.loadUrl ,
            	 effect: czy.ui.lazyload.effect 
          }) }
     )
	

})( czy , jQuery);
(function(czy ,$) {

  czy.ui.tabs = function(selector,options) {
       var _options = {
            type			: 	"",								 // fade 渐变,horizontal 横向,vertical 纵向,normal 无特效 h|n|v
            eventType		: 	"mouseover", 						 // hover && click
            isAuto			: 	false, 								 // 自动
            index			: 	0,         						     // 当前index
            backIndex		: 	0,          						 // 上一index
			Objects 		:	{
				tabsNav 	:	 '.tabs-nav',
				tabsPanel 	: 	 '.tabs-panel',
				tabsPrev    :    '.tabs-prev',
				tabsNext	:    '.tabs-next'
			},
			changeVal		:   'auto',
            interval		: 	3000,         
			duration		:	1000,
			easing			:	"easeOutExpo"
        }
		
		czy.ui.baseui.call(this , selector , options , _options);
		this.init.apply(this, arguments);
        return this;
    }
	
	czy.ui.tabs.prototype = {
	    init : function(){
		   var _this = this;
		   
		   this.panelSize = {
		       width  :  _this.$tabsPanel.children().outerWidth(),
			   height :	 _this.$tabsPanel.children().outerHeight()
		   }
		   function panelHide()
		   {
			   _this.$tabsPanel.children(':eq('+ _this.index +')').show();
			   _this.$tabsPanel.children(':not(:eq('+ _this.index +'))').hide();
			   
		   }
		   function panelOverflow()
		   {
			   _this.$tabsPanel.css({'overflow':'hidden'  }); 
		   }
		   
		   this.$tabsNav.children(':eq('+ this.index +')').addClass('tabs-nav-cur');
		   this.$tabsPanel.css('position','relative').hover(function(){ _this.timer.stop();},function(){_this.timer.start(function(){_this.next()});});
		   this.count = this.$tabsPanel.children().length;
		   
		   switch(this.type)
		   {
			   case 'n' : panelHide();break;
			   case 'v' : panelOverflow();this.$tabsPanel.children().css({'position':'absolute' }).css('top', function(i){ return  $(this).outerHeight() * i}); ;this.$tabsPanel.children().css({'float':'none'});break;
			   case 'h' : panelOverflow();this.$tabsPanel.children().css({'position':'absolute' , top : 0 }).css('left', function(i){ return  $(this).outerWidth() * i}); break;
			   default  : this.$tabsPanel.children().css('position','absolute');panelHide(); break;
		   }
 
		   this.$.find(this.Objects.tabsNav).css({'cursor' : 'pointer'}).children().each(function(i , n){
			  $(n).attr('data-index', i);
		      $(n).bind(_this.eventType,function(){
				 _this.index = $(this).attr('data-index');
			     _this.exchange(_this.index);
				  
			  })
			  
			  $(this).hover(function(){$(this).addClass('tab-nav-hover');},function(){$(this).removeClass('tab-nav-hover');})
		   })
		   this.$tabsPrev.bind(_this.eventType,function(){_this.prev()});
		   this.$tabsNext.bind(_this.eventType,function(){_this.next()});
		   if(this.isAuto)
		   {
			  this.timer = new czy.timer(this.interval);
			  this.timer.start(function(){_this.next()});
		   }
		   
		},
		exchange : function(index){
		   this.index = index;
		   var _this = this;
		   function fade()
		   {
				_this.$tabsPanel.children(':eq('+ _this.index +')').stop(true,true).fadeIn('slow');
				_this.$tabsPanel.children(':eq('+ _this.backIndex +')').stop(true,true).fadeOut('slow');
		   }
		   function normal()
		   {
			   _this.$tabsPanel.children(':eq('+ _this.index +')').show();
			   _this.$tabsPanel.children(':eq('+ _this.backIndex +')').hide();
		   }
		   function horizontal()
		   { 
		  	   var w =  _this.changeVal == 'auto' ? _this.panelSize.width  : _this.changeVal ;
			   _this.moveVal =  (_this.index - _this.backIndex) * w;
			   _this.$tabsPanel.children().stop(true,true).animate({'left': '-=' + _this.moveVal} ,  _this.duration , _this.easing);
		   }
		   function vertical()
		   {
			   var h =  _this.changeVal == 'auto' ? _this.panelSize.height  : _this.changeVal ;
			   _this.moveVal = (_this.index - _this.backIndex) * h;
			   _this.$tabsPanel.children().stop(true,true).animate({'top': '-=' + _this.moveVal} ,  _this.duration , _this.easing);
		   }
		   
		   if(this.index != this.backIndex )
		   {
		    	this.$tabsNav.children(':eq('+ this.index +')').addClass('tabs-nav-cur');
		  	    this.$tabsNav.children(':eq('+ this.backIndex +')').removeClass('tabs-nav-cur');
				switch(this.type)
			    {
				   case 'n' : normal();break;
				   case 'v' : vertical();break;
				   case 'h' : horizontal();break;
				   default  : fade();break;
			    }
				this.backIndex = this.index;
		   }
		   
		},
		prev : function()
		{
			
			this.index -- ;
			this.index = this.index >= 0 ? this.index : this.count - 1;
			this.exchange(this.index);
	    },
		next : function()
		{
			this.index ++ ;
			this.index = this.index < this.count ? this.index  : 0 ;
			this.exchange(this.index);
		}
	}
	
})(czy , jQuery); 

/*
@author : czy
@about  : Fixed
@date   : 2011/5/17
@import : jquery.js
*/
/* Fixed */
(function($){  
     czy.ui.fixed = function(selector , options){ 
         var _options = { 
		   x 			 : 'left 0',		// [left 500] | [right 500] fixed位置
		   y 			 : 'top 0',			// [bottom 500] | [top 500] fixed位置
		   d 			 : 'v',				// h| v 横向域纵向
		   status		 :	"show",
		   duration		 :	"fast", 
		   minVal		 :	200,
		   Objects		 :	{
		      fixbar 	 :	".fixbar"
		   }
         }
		 
		 czy.ui.baseui.call(this , selector , options , _options);
		 this.init.apply(this, arguments);
		 return this; 
	}
	
	czy.ui.fixed.prototype = {
	  init : function()
	  {
		 var _this = this;
		 this.$fixbar.css("cursor","pointer");
		 
		 var x = _this.x.split(' ');
		 var y = _this.y.split(' ');
		 x = x.length > 1 ? x : [ x , 0 ];
		 y = y.length > 1 ? y : [ y , 0 ];
		
		 this.size = {
	       w : this.$.outerWidth(),
		   h : this.$.outerHeight()
		 }
		 function fixedIE6Browse()
	     {
			 $("body").css({"background-image":"url(about:blank)","background-attachment":"fixed"});
			 _this.$.css({"position":"absolute"});
			 $(window).scroll(function()
			 {	 
				  $("body").height($(document).height());
			 });
 			 
			 if(x[0] == 'left' && y[0] == 'top')
			 {
				 _this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+'+x[1]+')');
				 _this.$[0].style.setExpression("top",'eval(document.documentElement.scrollTop+'+y[1]+')');
			 }
			  if(x[0] == 'right' && y[0] == 'top')
			 {
				_this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ x[1] +')');
				_this.$[0].style.setExpression("top",'eval(document.documentElement.scrollTop+'+y[1]+')');
				
			 }
			  if(x[0] == 'left' && y[0] == 'bottom')
			 {
				  _this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+'+x[1]+')');
				  _this.$[0].style.setExpression("top",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ y[1] +')');
			 }
			  if(x[0] == 'right' && y[0] == 'bottom')
			 {
				 _this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ x[1] +')');
				_this.$[0].style.setExpression("top",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0  + '+ y[1] +')');
			 }

	     }
		 
		 function fixedBrowse()
		 {
			 _this.$.css({"position":"fixed"});
			
			 if(x[0] == 'left')
			 {
				 _this.$.css('left',x[1]+"px");
		     }
			 else if(x[0] == 'right')
			 {
				 _this.$.css('right',x[1]+"px");
		     }
			 if(y[0] == 'top')
			 {
				 _this.$.css('top',y[1]+"px");
		     }
			 else  if(y[0] == 'bottom')
			 {
				 _this.$.css('bottom',y[1]+"px");
		     }
	     }

		 switch (this.d)
		 {
			 case 'h': this.minVal = this.$fixbar.length > 0 ? this.$fixbar.width() : this.minVal ; break;
			 case 'v' : this.minVal = this.$fixbar.length > 0 ? this.$fixbar.height() : this.minVal ; break;
	     }
         
		//如果是IE6
		if($.browser.msie&&$.browser.version=='6.0')
			fixedIE6Browse();
		else
			fixedBrowse();
			
		this.$fixbar.click(function(){ _this.toggle();});
		
		if(this.status == "hide")
		{
			this.hide();
		}
	  },
	  show : function()
	  {
		  var prop = {};
		  switch(this.d)
		  {
			    case 'v' : prop.height = this.size.h ;break;
				case 'h' : prop.width = this.size.w; break;
		  }
		  this.$.animate(prop , this.durtion);
		  this.status="show";
	  },
	  hide : function()
	  {
		  var prop = {};
		  switch(this.d)
		  {
			   case 'v' : prop.height = this.minVal;break;
			   case 'h' : prop.width = this.minVal; break;
		  }
		  this.$.animate(prop, this.durtion);
		  this.status="hide";
	  },
	  toggle : function()
	  {
		  if(this.status=="hide")
			 this.show();
		  else
			 this.hide();
	  }
	}
	
})(jQuery); 