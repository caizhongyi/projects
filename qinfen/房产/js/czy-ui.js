/* 
* jquery.core
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
; (function($) {
     $.isjQuery = function(obj)
	 {
		 if(obj instanceof jQuery)
		 return true;
		 else
		 return false;
	 }
	 $.isObject = function(obj)
	 {
		 if(obj instanceof Object)
		 return true;
		 else
		 return false;
	 }
	 $.ie6=function()
	 {
		if($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
				return true;
		else
			    return false;
	 }
	 $.sum = function()
	 {
		 var s = 0;
		 for(var i = 0 ; i < this.sum.arguments.length; i ++ )
		 {
			 s += sum.arguments[i];
		 }
		 return s;
	 }
	 $.favorite = function(url,title)
	 {
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
	 $.mousePoint = function(e)
	 {
		 var left = $.browser.msie ? e["offsetX"] : e["layerX"];
         var top = $.browser.msie ? e["offsetY"] : e["layerY"];
		 return {left : left ,top : top};
	 }

	 /**   
	 *    
	 * @param {} obj 当前对象，一般是使用this引用。   
	 * @param {} vrl 主页URL   
	 */   
	$.setHome = function (obj, vrl) {   
		try {   
			obj.style.behavior = 'url(#default#homepage)';   
			obj.setHomePage(vrl);   
		} catch (e) {   
			if (window.netscape) {   
				try {   
					netscape.security.PrivilegeManager   
							.enablePrivilege("UniversalXPConnect");   
				} catch (e) {   
					alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");   
				}   
				var prefs = Components.classes['@mozilla.org/preferences-service;1']   
						.getService(Components.interfaces.nsIPrefBranch);   
				prefs.setCharPref('browser.startup.homepage', vrl);   
			}   
		}   
	}   
	$.getEvent = function(name,fn)
	{
		return { name : name , fn : fn };
	}
	$.doEvent = function(name,event,sender,args)
	{	
	
		for(var i in event)
		{
			if(event[i].name == name)
		    {	
				event[i].fn(sender,args);
			}
		}
	}
	$.ellipses= function(options)
	{
		 var defaults = {
				len 		 :  10,
				hasTitle	 :  true,
				string       :  ""
         };
         var options = $.extend(defaults, options);
		 var html =options.string;
		 if(html != null)
		 {
		     if(html.length > options.len)
			 html = html.substring(0,options.len)+"...";
		 }
		 return html;
	}
    $.toDateTime =function(jsonString)
    {
       var obj = jsonString;
       var date = eval(obj.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"));
       return date;
    } 
	/*
	  url : 地址
	  method :方法
	  param : 参数
	  type : 访问类型 post/get
	  callback : 回调 
	*/
	 $.wsLoad = function(url,method,param,callback)
     {
		 type =  "post";
         param = param  || "";
         $.ajax({
	       type: type,
	       //注明 返回Json
	       contentType:"application/json;utf-8",
	       //CollegeDepartWebServices.asmx web服务名 /GetCollegeDepart 方法名
	       url:url+"/"+method,
	       //strDepartId 参数名称 collegeId 参数值"{strDepartId:"+collegeId+"}"
	       data:param,
	       dataType:"json",
	       success:function(result){                   
	        var json=null
	         try
	           {
	            if(result)
	            {
	                //因为返回的是ArrayList 所以循环取出其中的值
	               // $.each(result, function(i, n){
	               //ddlDepart 为下来菜单。循环的向下拉菜单中添加新的选项
	              // ddlDepart.options[ddlDepart.length]=new Option(n.CollegeDepartTitle,n.CollegeDepartId);
	              
	              // });
                  if(callback){callback(result);}
	            }
	        
	 
	           }
	           catch(e)
	           {
	              alert("错误>>"+e.message);
	              return;
	           
	           }
	       
	         },
	         error:function(data)
	         {
	            alert(data.status+">>> "+data.statusText);
	         }
	    }); 
     }
     $.toJSONString = function(obj) {
        switch(typeof(obj)) 
        {
            case 'object':
                var ret = [];
                if (obj instanceof Array) 
                {
                    for (var i = 0, len = obj.length; i < len; i++) 
                    {
                        ret.push($.toJSONString(obj[i]));
                    }
                    return '[' + ret.join(',') + ']';
                } 
                else if (obj instanceof RegExp) 
                {
                    return obj.toString();
                } 
                else 
                {
                    for (var a in obj) 
                    {
                        ret.push(a + ':' + $.toJSONString(obj[a]));
                    }
                    return '{' + ret.join(',') + '}';
                }
            case 'function':
                return 'function() {}';
            case 'number':
                return obj.toString();
            case 'string':
                return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) {return ("\n"==a)?"\\n":("\r"==a)?"\\r":("\t"==a)?"\\t":"";}) + "\"";
            case 'boolean':
                return obj.toString();
            default:
                return obj.toString();
            
        }
    }
})(jQuery);

; (function($) {
	 $.fn.wsLoad = function(url,method,param,callback)
     {
         var $this=$(this);
         $.wsLoad(url,method,param,function(data)
         {
             if(!$.isObject(data))
                $this.append(data);

             if(callback)callback(data);
         });
     }
     	
	 $.fn.hasJQueryLink = function(name)
	 {
		 var $this = $(this);
		 var s = $this.find("script");
		 $.each(s,function(i,n){
		     if($(n).attr("src").indexOf(name) == -1)
			 {
				 return false;
			 }
			 else
			 {
				 return true;
			 }
		 })
	 }
	 $.fn.ellipses= function(options)
	 {
		 var $this = $(this);
		 var defaults = {
				len 		 :  10,
				hasTitle	 :  true
         };
         var options = $.extend(defaults, options);
		 var html = $this.html();
		 if(options.hasTitle){$this.attr("title",html)};
		 if(html != null)
		 { 
		 	 if(html.length > options.len)
			 html = html.substring(0,options.len)+"...";
		 }
		 $this.html(html);
	 }
	 $.fn.point = function(left,top)
	 {
		 var $this = $(this);
		 if( ! left && ! top )
		 {
			return {
                left: $this.css("left"),
                top: $this.css("top")
            };
		 }
		 else
		 {
			 var l = left ? left : $this.css("left") ;
			 var t = top ? top : $this.css("top") ;
			 $this.css({left : l , top : t });
 			 return this;
		 }
	 }
	 $.fn.size = function(width,height)
	 {
		 var $this = $(this);
		 if( ! width && ! height )
		 {
			return {
                width: $this.width(),
                height: $this.height()
            };
		 }
		 else
		 {
			 var w = width ? width : $this.width() ;
			 var h = height ? height : $this.height() ;
			 $this.width(w).height(h);
 			 return this;
		 }
	 }
  	 $.fn.center = function(options)
	 {
            var _this = this,
			$this = $(this),
            defaults = {
				animate 	 :  false,
				ainmateSpeed :  "fast",
                type		 :  "absolute",   //类型有margin,absolute
				callback     :  function(){}
            };
            var options = $.extend(defaults, options);
			var left =  ($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft();
			var top =  ($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop();
            switch (options .type) {
            case "margin":
			    if(options.animate)
				{
					$this.animate({
					  "margin-top" : top ,  
					  "margin-left"	: left
					},options.ainmateSpeed,options.callback);
				}
				else
				{
					$this.css({
                    "margin-top"	:  top,
                    "margin-left"	:  left
                });
					if(options.callback)options.callback();
				}
                
                break;
            case "absolute":
			 	if(options.animate)
				{
					$this.animate({
						top		: top,
						left	: left
                    },options.ainmateSpeed,options.callback);
				}
				else
				{
					$this.css({
						top		: top,
						left	: left
					});
					if(options.callback)options.callback();
				}
                break;
            }
            return this;
	 }

    /* 文档宽和高 */
    $.fn.docSize = function() {
       		 var size = {
           		 width: 0,
           		 height: 0
       		 };
		     var _this = this;
             var $this = $(this);
             switch (_this.docSize.arguments.length) {
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
				 size=_this.docSize.arguments[0];
                 if (document.compatMode == "BackCompat") {
					document.body.scrollWidth=size.width ;
					document.body.scrollHeight=size.height;
				 } else { 
				    document.documentElement.scrollWidth=size.width;
					document.documentElement.scrollHeight=size.height;
				 }
                 return this;
            }	
     }
	 
	 /* event */
	$.fn.addEvent = function(obj,eventName,fn)
	{
		var name = eventName.substring(0,eventName.indexOf('.')==-1? eventName.length :eventName.indexOf('.') );
		name += "_Event";
		if(obj[name] == null)
		{
			obj[name] = new Array();
		}
		obj[name].push({name:eventName,fn:fn});
		return obj;
	}
	$.fn.doEvent = function(obj,eventName,params)
	{
		var name = eventName.substring(0,eventName.indexOf('.')==-1? eventName.length :eventName.indexOf('.') );
		name += "_Event";
		if(obj[name] != null)
		{
			   $(obj[name]).each(function(i,n){
					 if(eventName.indexOf('.') == -1 || eventName == obj[name].name)
		  			 {		
					     if(params != null)
					     	n.fn(params);
						 else
						    n.fn();
					 }
			   })
		}
		return obj;
	}
	$.fn.removeEvent = function(obj,eventName)
	{
		var name = eventName.substring(0,eventName.indexOf('.')== -1 ? eventName.length :eventName.indexOf('.') );
		name += "_Event";
		if(obj[name] != null)
		{
		   if(eventName.indexOf('.') == -1)
		   {
			   obj[name] == null;
		   }
		   else
		   {
			   $(obj[name]).each(function(i,n){
				   if(eventName == n.name)
				   {
					   obj[name].pop(i);
				   }
			   })
		   }
		}
		return obj;
	}
	/* end event */
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
};
;(function($) {
	$.fn.background=function(options)
	{
		var defaults = {
			status			:	"hide",
			maxOpacity		:	 0.5, // opacity:透明度[0 - 1]
			color			:	"black",
			animateSpeed	:	"slow",
            animateEasing	:	"easeOutExpo", // 运动类型
			css				:	"dialog-background",
			width			:	"auto",
			height			:	"auto"
        };
		
		var config = $.extend(defaults, options);
		
		var elements =  this.each(function(){
			var _this = this,$this = $(this);
            this.lock = false; // 是否锁定
			this.size = {};
			var iframe = $("<iframe/>");
			var size=function()
			{
				var w=$(document).docSize().width;
				var h=$(document).docSize().height;
				w = config.width != "auto" ? config.width: w;
				h = config.height != "auto" ? config.height: h;
				$this.size(w,h);
				return $this.size();
			}
			
			_this.size=size();
			
			var _init=function()
			{  
				iframe.css({width:"100%",height:"100%",opacity:0});
				if($this.css("z-index"))
				{
					iframe.css("z-index",$this.css("z-index"));
				}
				$this.parent().append(iframe);
				$this.css({ "position" : "absolute","display" : "none",opacity : 0,"background" : config.color,left : 0,top : 0})
				.addClass(config.css);
				if( config.status == "show" )
				{
					$this.css( { display:"block",opacity:config.maxOpacity } );
				}
				$(window).bind("resize",function()
				{
					_this.size = size();
				});
				
			};
			
			this.zIndex = function(zIndex)
			{
				if(index)
				{
					return $this.css("z-index");
				}
				else
				{
					$this.css("z-index",zIndex);
					iframe.css("z-index",zIndex-1);
					return _this;
				}
			}
	
			this.show=function()
			{
				 _this.size = size();
				 if(!_this.lock)
				 {  
					  // $("html").css({"overflow-x":"hidden"});
					  if (!($.ie6())) {
						 $this.show();
						 config.status="running";
						 $this.stop();
						 $this.animate(
							 { opacity : config.maxOpacity }, 
							 config.animateSpeed,
							 config.animateEasing,
							 function(){
								 config.status="show";
							 }
						);
					 }
				 }
				 return _this;
			};
			this.hide=function()
			{
				 if(!_this.lock)
				 {
					   config.status="running";
					   $this.stop();
					   $this.animate(
							 { opacity : 0 },
							 config.animateSpeed,
							 config.animateEasing,
							 function()
							 {
								 $(this).hide();config.status="hide";
							 }
					  );
					 
				 }
				 return _this;
			};
			_init();
		})
       return elements.length <= 1 ? elements[0]: elements;
	}
})(jQuery);﻿/* 
* jquery.easyBox
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function ($) {

    $.fn.easyBox = function (options) {

        var defaults=
        {
			status : "hide" ,
			property : "width,height,opacity,display,left,top",  //display,visibility
			startValue :{},  //初始值
			endValue   :{},  //结束值
			animateSpeed	:  "slow",
			animateEasing	:  "easeOutExpo" // 运动类型
        };
        var options=$.extend(defaults, options);
		
		var elements =  $.each($(this),function(){
			var _this =this;
            var $this=$(this);  			   
	        this.status = options.status;
			this.propertys = options.property.split(',');
			
			for(var i in options.startValue)
			{
				$this.css(i,options.startValue[i]);
			}
			
			for(var i in _this.propertys)
			{
				_this[_this.propertys[i]] = $this.css(_this.propertys[i]);
			}
	
			//事件
			this.beginShow = function(fn){$this.addEvent(this,'beginShow',fn)};
			this.beginHide = function(fn){$this.addEvent(this,'beginHide',fn)};
			this.endShow = function(fn){$this.addEvent(this,'endShow',fn)};
			this.endHide = function(fn){$this.addEvent(this,'endHide',fn)};
			
			var setProperty = function()
			{
				if($.inArray("visibility",_this.propertys)!=-1) $this.css("visibility","hidden");
				if($.inArray("display",_this.propertys)!=-1) $this.css("display","none");
				//if($.inArray("background",_this.propertys)!=-1) $this.css("background","transparent");
				if($.inArray("background-color",_this.propertys)!=-1) $this.css("background-color","transparent");
				if($.inArray("border-color",_this.propertys)!=-1) $this.css("background-color","transparent");
			}
			
			var _init = function()
			{
				if(_this.status == "hide")
				{
					var p = {};
					for(var i in _this.propertys)
					{
						p[_this.propertys[i]] = options.endValue[_this.propertys[i]] == null ? 0 : options.endValue[_this.propertys[i]];
					}
					$this.css(p);
					setProperty();
				}
			}
		
			
			this.show = function(point)
			{
				if($.inArray("visibility",_this.propertys)!=-1) $this.css("visibility","visible");
				if($.inArray("display",_this.propertys)!=-1) $this.css("display","block");
			   
				$this.doEvent(this,'beginShow',{el :$this,o:_this});
				$this.stop();
				var p = {};
				for(var i=0 ;i<_this.propertys.length;i++ )
				{
					if( _this.propertys[i] !="visibility" && _this.propertys[i]!="display")
					{
					   p[_this.propertys[i]]=_this[_this.propertys[i]]=="auto"?0:_this[_this.propertys[i]];
					}
				}
				if(point)
				{
					p.left = point.x;
					p.top = point.y;
				}
				$this.animate(p,options.animateSpeed,options.animateEasing,function(){
					$.doEvent(this,'endShow',{el :$this,o:_this});
					
				});
				_this.status = "show";
			}
			
			this.hide = function()
			{
				$.doEvent(this,'beginHide',{el :$this,o:_this});
				$this.stop();
				var p = {};
				for(var i in _this.propertys)
				{
					if( _this.propertys[i] !="visibility" && _this.propertys[i]!="display")
					{
						var value = 0 ;
						switch(_this.propertys[i])
						{
							case "background-color" : value = "transparent" ;  break;
							case "border-color": value = "transparent" ;  break;
							default : value = 0 ; break;
						}
						p[_this.propertys[i]] = options.endValue[_this.propertys[i]] == null ? value : options.endValue[_this.propertys[i]];
					}
				}
					
				$this.animate(p,options.animateSpeed,options.animateEasing,function(){
					$.doEvent(this,'endHide',{el :$this,o:_this});
					setProperty();
				
				});
				_this.status = "hide";
			}
			
			this.toggle = function()
			{
				if(_this.status == "show")
				{
					_this.hide();
				}
				else
				{
					_this.show();
				}
			}
			_init();
		})
		
		return elements.length <= 1 ? elements[0]: elements;

    }

})(jQuery);
/*
@author 	: czy
@description: 
@date   	: 2011/5/17
@dependent 	: jquery.js
*/
(function ($) {
    /*
      @remark :
    */
    $.fn.hoverEffect= function (options) {
	    var _this = this,$this = $(this);
	    var _options = {
			font			: 	"auto",
			width			:	"auto",
			height			:	"auto",
			color 		    :   "auto",
			background		:   "auto",
			animateSpeed	:	"slow",
			animateEasing	:	"easeOutElastic"
		};
        // Extend our default options with those provided.    
        var options = $.extend(_options, options);  
        var font = $this.css("font-size");
		var size = $this.size();
		var color = $this.css("color");
		var background = $this.css("background-color");
		var TempMarLeft = $this.css("margin-left");
		var TempMarRight = $this.css("margin-right");
		var marLeft = TempMarLeft - (options.width - size.width)/2;
		var marRight = TempMarRight - (options.height - size.height)/2;
	
		options.background = options.background == "auto" ? background : options.background ;
		options.color = options.color == "auto" ? color : options.color ;
	    var _init = function()
		{
			/* ��ʼ�� */
			$.each($this,function(i,n){
				 $(n).hover(
					  function(){
						  $(n).stop();	
						  $(n).animate({"font-size": options.font,width:options.width,height:options.height,"background":options.background,"color":options.color}, options.animateSpeed,options.animateEasing);
					  },
					  function(){
						  $(n).stop();
						  $(n).animate({"font-size": font ,width:size.width,height:size.height,"background":background,"color":color}, options.animateSpeed,options.animateEasing);
					  }
				 );
		   });
		}
        _init();
		/* code */
		return this;
    }; 
	/* ������Ϣ */
	$.fn.hoverEffect.Info = {
		     name   	: "CZYA",
		     author 	: "caizhongyi",
			 ver    	: "1.0.0.0",
			 date   	: "2011-05-17",
		     email		: "274142680@qq.com",
			 copyright  : "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };

})(jQuery);

﻿/* 
* jquery.accordion
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {
	$.fn.accordion = function(options)
	{
		var _options={
			height			:	"auto",
			width			:	"auto",
			status			:	"hide",
			trunRound		:	false,  //鼠标移开对像后自动回缩
			event			:	"hover",
			type			:	"normal",  //select && normal
			animateSpeed	:	"slow",
			animateEasing	:	"easeOutElastic",
			tagName			:	"tag",
			innerName		:	"inner",
			minHeight		:	0
				
		}
	   	var options= $.extend(_options, options);
		var elements = this.each(function(){
			var _this = this;
            var $this = $(this);
	        this.el = $this;
		    this.status=options.status;
			this.tag=$this.find(":[data-el="+options.tagName+"]");
			this.inner=$this.find(":[data-el="+options.innerName+"]");
			
			this.beginShow = function(fn){ $this.addEvent(this,"beginShow",fn);};
			this.beginHide = function(fn){ $this.addEvent(this,"beginHide",fn);};
			this.endShow = function(fn){$this.addEvent(this,"endShow",fn);};
			this.endHide = function(fn){$this.addEvent(this,"endHide",fn);};
			
			var tempHeight=0;
			var _init=function()
			{
				//_this.inner.css("display","none");
				if(options.type=="select")
				{
					_this.inner.css({"position":"absolute",left:0,top:_this.tag.height()});
					if(options.width!="auto")
					_this.inner.css({width:options.width});
					$this.css("position","relative");
					options.trunRound = true;
				}
				tempHeight=options.height=="auto"?_this.inner.height():options.height;
				if(_this.status=="hide")
				{
					_this.inner.height(options.minHeight);
				}
				if(options.event=="hover")
				{_this.tag.hover(function(){_this.show()},function(){_this.hide()});}
				else
				{_this.tag.click(function(){ _this.toggle();});}
				
				if(options.trunRound)
					$this.hover(function(){},function(){_this.hide();});
			};
			this.show=function(){
				
				//_this.status="running";
				$this.doEvent(this,'beginShow',{el :$this,o:_this});
				_this.inner.show();
				_this.inner.stop();
				_this.inner.animate(
					{ height : tempHeight },
					options.animateSpeed ,
					options.animateEasing, 
					function(){
						_this.status="show";
						$this.doEvent(this,'endShow',{el :$this,o:_this});	
				});
				return _this;
			};
			this.hide=function(){
				//_this.status="running";
				$this.doEvent(this,'beginHide',{el :$this,o:_this});
				_this.inner.stop();
				_this.inner.animate(
					{ height:options.minHeight},
					options.animateSpeed ,
					options.animateEasing,
					function(){
						_this.status="hide";
						//_this.inner.hide();
						$this.doEvent(this,'endHide',{el :$this,o:_this});
				});
				return _this;
			};
		    this.toggle=function()
			{
				if(_this.status=="show" )
				{
					_this.hide();
				}
				else if(_this.status=="hide")
				{
					_this.show();
				}
				return _this;
			};
			_init();
		})
		return elements.length <= 1 ? elements[0]: elements;
	};
		/*
		@author 	: czy
		@description: 下拉框效果
		@date   	: 2011/5/17
		@dependent 	: jquery.js
		*/
		$.fn.select=function(options)
		{
			var _this = this;
            var $this = $(this);
			var _options = {
			};
			var options= $.extend(_options, options);
			
			this.selectIndex=-1;
			this.items=[];   //czyAccor集合
			var event = [];
			this.selected = function(fn){ $this.addEvent(this,"selected",fn)};
			options.type="select";
			var select = $this.accordion(options);
			select.each(function(){
			var list = select.inner.children();
				list.each(function(j,k){
					$(k).click(function(){
					if(_this.selected)
					{
						_this.selectIndex = j;
						$this.doEvent(this,'selected',{el:$(k),index:j}),function()
						{
							select[i].hide();
						}
					}
				 })
		       })
			})
			return select;
		}
		
		$(document).ready(function()
		{
			if($(":[data-el=accordion]").length > 0)
			{
				$(":[data-el=accordion]").accordion();
			}
		})
})(jQuery);﻿/* 
* jquery.dataPager
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {
    $.fn.dataPager = function(options) {
		
        var _this = this;
        var $this = $(this);
        var _options = {
            count		: 	4, // 显示的分页数 *2 +1 
			//style		:	"complex",   // normal
            recordCount : 	100,
            pageSize	: 	10,
            currentPage	: 	0,
            pageCount	: 	0,
			fillTo		:	null,   // 填充对像 Jquery对像
			method		:	"get",
			url			:	"",
			params		:	"",
			fun       	:   "",
			callback	:	function(){},
			cssCurrent	: 	"current",
			cssNormal	:	"normal",
			cssPrev		: 	"prev",
			cssNext		:	"next",
			cssDisable	:	"disable",
			langPrev    : 	 "上一页",
			langNext	:	"下一页"
		};

        var options = $.extend(_options, options);
		
		var elements = this.each(function(){
				this.pageParams = {  //页参数
					pageSize 	: options.pageSize,
					recordCount : options.recordCount,
					pageCount 	: options.pageCount,
					currentPage : options.currentPage
				};
			
				this.el = $this;
				this.changeIndex = function(fn){$this.addEvent(this,"changeIndex",fn);};
				// 改变当前面的事件
				//获取页数
				var getPageCount =  function()
				{		
					_this.pageParams.pageCount = _this.pageParams.recordCount % _this.pageParams.pageSize > 0 ?
					parseInt((_this.pageParams.recordCount / _this.pageParams.pageSize) + 1 ): _this.pageParams.recordCount / _this.pageParams.pageSize;						     
				}
				//增加页
				var addPage = function(count) {
					_this.pageParams.currentPage=parseInt(_this.pageParams.currentPage);
					if (_this.pageParams.currentPage >= 0 && _this.pageParams.currentPage < _this.pageParams.pageCount) {
						_this.pageParams.currentPage += count;
						_this.pageParams.currentPage = _this.pageParams.currentPage < 0 ? 0 : _this.pageParams.currentPage;
						_this.pageParams.currentPage = _this.pageParams.currentPage >= _this.pageParams.pageCount ? _this.pageParams.pageCount - 1 : _this.pageParams.currentPage;
					};
				};
				var getDataCallBack=function(data)
				{
					 var json=options.fun == "" ? eval("(" + data + ")"):data.d;
					_this.pageParams.pageSize=json.pager.pageSize;
					_this.pageParams.recordCount=json.pager.recordCount;
					if(json.pager.currentPage != null)
					_this.pageParams.currentPage=json.pager.currentPage;
					if(options.callback)options.callback(json);
					$this.doEvent(this,'changeIndex',{el :$this,o:_this,pager:_this.pageParams});
					_init();
				}
				var getData=function()
				{ 
					if(options.url != "")
					{ 
						 var param;
						//if(_this.loading)_this.loading.show();
						if(options.fun =="")
						{
						  param = options.params == "" ? "currentPage=" + 
						  _this.pageParams.currentPage : options.params+"&currentPage="+_this.pageParams.currentPage;
						}
						else
						{
							param = options.params;
							param.currentPage = _this.pageParams.currentPage ;
						}
						
						if(options.method=="post")
						{
							if(options.fun =="")
							{
								$.post(options.url,param,
								function(data){
									getDataCallBack(data);	
								//	_this.loading.hide();
								});
							}
							else
							{
								$.wsLoad(options.url,options.fun,param,"post",
								function(data){
									getDataCallBack(data);	
									//_this.loading.hide();
								});
							}
						}
						else
						{
							if(options.fun == "")
							{
								$.get(options.url,param,
								function(data){
									getDataCallBack(data);	
									//if(_this.loading)_this.loading.hide();
								});
							}
							else
							{
								$.wsLoad(options.url,options.fun,param,"get",
								function(data){
									getDataCallBack(data);	
									//_this.loading.hide();
								});
							}
						}
					}
					else
					{
						_init();
						$this.doEvent(this,'changeIndex',{el:_this,o:$this,pager:_this.pageParams});
					}
				
				};
				var numberButton = function(number,css)
				{
					var self = this;
					this.element = $("<a/>");
					if(_this.pageParams.currentPage == number - 1 )
					   self.element.html(number).addClass(options.cssCurrent);
					else
					   self.element.html(number).addClass(options.cssNormal);
					self.element.click(
					  function()
					  {
						   _this.pageParams.currentPage = number - 1;
						   getData();
						 
					  }
					);
					
					return this;
				}
				
				var moreButton = function()
				{
				   var self = this;
				   this.element = $("<span/>").html("...");
				   return this;
				}
				
				var firstButton = function()
				{
					 var self = this;
					 this.element = $("<a/>").html(1).addClass(options.cssNormal).attr("href","javascript:;");
					 self.element.click(
					  function()
					  {
						   _this.pageParams.currentPage = 0;
							   getData();
					  }
					 );
					 return this;
				}
				
				var lastButton = function()
				{
					 var self = this;
					 this.element = $("<a/>").html(_this.pageParams.pageCount).addClass(options.cssNormal).attr("href","javascript:;");
					 self.element.click(
					  function()
					  {
						  _this.pageParams.currentPage = _this.pageParams.pageCount -1;
						 getData();
					  }
					 );
					 return this;
				}
				
				var pageDownButton = function(count,text,css)
				{
					var self = this;
						this.element = $("<a/>");
					if(_this.pageParams.currentPage >= _this.pageParams.pageCount -1)
					{
						
						self.element.addClass(options.cssDisable);
					}
					else
					{
						self.element.addClass(options.cssPrev).attr("href","javascript:;");;
					}
					
					self.element.html(text);
					self.element.click(
					  function()
					  {
						  addPage(count);
						   getData();
					  }
					);
					return this;
				}
				
				var pageUpButton = function(count,text,css)
				{
					var self = this;
					this.element = $("<a/>");
					if(_this.pageParams.currentPage <= 0)
					{
						
						self.element.addClass(options.cssDisable);
					}
					else
					{
					
						self.element.addClass(options.cssNext).attr("href","javascript:;");
					}
					self.element.html(text);
					self.element.click(
					  function()
					  {
						  addPage(count);
						   getData();
					  }
					);
					return this;
				}
				
				var getStartNumber = function()
				{
					var start = 0;
					if(_this.pageParams.currentPage < options.count )
					{
						start = 0;
					}
					else if(_this.pageParams.currentPage >_this.pageParams.pageCount - options.count *2 +1)
					{
						start = _this.pageParams.pageCount - options.count *2 ;
					}
					else
					{
						start = _this.pageParams.currentPage - options.count  ;
					}
					return  start ;
					
				}
				
				var getEndNumber = function()
				{
				
					var end = _this.pageParams.pageCount - 1 ;
					if(_this.pageParams.currentPage < options.count && options.count *2 + 1 < _this.pageParams.pageCount)
					{
						end =  options.count *2 + 1 ;		
					}
					else if(_this.pageParams.currentPage >_this.pageParams.pageCount - options.count *2 +1)
					{
						end = _this.pageParams.pageCount;
					}
					else
					{
						end = _this.pageParams.currentPage + options.count +1 ;
					}
					return  end ;
				}
				
				var getMidNumber = function()
				{
					return  parseInt(options.count / 2) + 1 ;
				}
				
				var create = function()
				{
					$this.empty();
					getPageCount();
					setCurrentPage(_this.pageParams.currentPage);
					var mNumber = getMidNumber(); 
					var start = getStartNumber();
					var end = getEndNumber();
					$this.append(new pageUpButton( -1,options.langPrev,options).element);
					if( start > 0 )
					{
							$this.append(new firstButton().element);
							$this.append(new moreButton().element);
					}
					for(var i = start ; i < end ; i++)
					{
						$this.append(new numberButton(i + 1,options).element);	
					}
					if( _this.pageParams.pageCount - end > 0 )
					{
						$this.append(new moreButton().element);
						$this.append(new lastButton().element);
					}	
					$this.append(new pageDownButton(1,options.langNext,options).element);
		
				}
				
				var _init = function() { 
					create();
				};
				// currentPage值是否正确
				var setCurrentPage = function(currentPage) {
					if (currentPage < 0) {
						currentPage = 0;
					}
					if (currentPage >= _this.pageParams.pageCount) {
						currentPage = _this.pageParams.pageCount - 1;
					}
					_this.pageParams.currentPage = currentPage;
					return currentPage;
				};
				this.currentPage = function() {
					switch (_this.currentPage.arguments.length) {
					case 0:
						return _this.pageParams.currentPage;
					case 1:
						setCurrentPage ( _this.currentPage.arguments[0] || 0);
						create();
						return _this;
					}
				};
		
				getData();
			
		})
		
		return elements.length <= 1 ? elements[0]: elements;
    }
 
})(jQuery);﻿/* 
* jquery.dialog
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {
    /*
		@remark :	 需放在最外层:body的子层
    */
    $.fn.dialog = function(options) {
       
        var _options = {
            status			: 	"hide",// 初化是否打开
            animateType		: 	"fade", // 动画类型 fade,puff
            animateSpeed	: 	"slow",
            animateEasing	: 	"easeOutExpo", // 运动类型
			resize			:   false,
			eDialogBar		:	".dialog-header",
			eDialogShow		:	".dialog-show",
			eDialogHide		:	".dialog-hide",
			eDialogFull		:	".dialog-full",
			eDialogNormal	:	".dialog-normal",
			eDialogNext		:	".dialog-next"  
        };
		
		var options= $.extend(_options, options);
		var elements = this.each(function(){
			var _this = this,$this = $(this);
		    this.el = $this;
			this.status = "hide" ;
			this.minSize ={width:$this.width(),height:$this.height()};  //
			this.maxSize = {width:$(window).width()-100,height:$(window).height()-100};
			this.point = {}; //当前所在位置
			this.resizeStatus = "normal";  //放缩状态
			this.resize = options.resize;  //是否充许放缩
			
			
			this.beginShow = function(fn){ $this.addEvent(this,"beginShow",fn)};
			this.beginHide = function(fn){ $this.addEvent(this,"beginHide",fn)};
			this.beginFull = function(fn){  $this.addEvent(this,"beginFull",fn)};
			this.endFull = function(fn){  $this.addEvent(this,"endFull",fn)};
			this.beginNormal = function(fn){  $this.addEvent(this,"beginNormal",fn)};
			this.endNormal = function(fn){  $this.addEvent(this,"endNormal",fn)};
			this.endShow = function(fn){  $this.addEvent(this,"endShow",fn)};
			this.endHide = function(fn){ $this.addEvent(this,"endHide",fn)};
			
			var setPoint =function()
			{
				var left =  ($(window).width() - _this.minSize.width) / 2 + $(window).scrollLeft();
				var top =  ($(window).height() -  _this.minSize.height) / 2 + $(window).scrollTop();
				_this.point = {left:left,top:top};
			}
			
			var background = function() {
				if ($.dialog.background == null) {
					var el=$("<div/>").appendTo($(document.body));
					$.dialog.background = $(el).background();
				}
				return $.dialog.background;
			};
			var draggable=function()
			{
				$this.css({"position": "absolute",display:"none", "z-index": 999 }).center();
				$this.draggable({handle: $this.find(options.eDialogBar),containment: "document", scroll: false,opacity: 0.8, cursor: 'move'});
			};
			
			var center = function()
			{
				$this.stop();
				$this.center({animate : true ,callback:function(){ setPoint(); }});
				if(_this.point == null )setPoint();
			}
			
			var createUI=function()
			{
				//var iframe = $("<iframe/>");
				//iframe.css({"position":"absolute","z-index":-1,width:$this.width(),height:$this.height(),top:0,left:0,opacity:0});
				//var overlay = $("<div/>");
				//overlay.css({"position":"absolute","z-index":0,width:$this.width(),height:$this.height(),top:0,left:0,opacity:0,"background":"#fff"});
				//$this.append(overlay);
				//$this.append(iframe);
				
				var dialogHide = $this.find(options.eDialogHide).css({cursor: "pointer" });
				var dialogNext = $this.find(options.eDialogNext).css({cursor: "pointer" });
				var dialogFull = $this.find(options.eDialogFull).css({cursor: "pointer" });
				var dialogNormal = $this.find(options.eDialogNormal).css({cursor: "pointer" });
				var dialogBar = $this.find(options.eDialogBar);
				
				dialogHide.bind("click", function() {_this.hide();});
				dialogFull.bind("click", function() {_this.full();});
				dialogNormal.bind("click", function() {_this.normal();});
				dialogNext.bind("click",function() { 
					$.dialog.background.lock=true;
					_this.hide();
					$.dialog.background.lock=false;
				});
			};
			var _init=function()
			{
				new background();
				draggable();
				createUI();	
				setPoint();
				$(window).bind("resize",function(){ center(); });
				$(window).scroll( function() {   center(); } ); 
				if(_this.status=='show')
				{
					_this.show();
				}
				else
				{
					$this.hide();
				}
				if(_this.resize)
				{
					$this.resizable({
						maxHeight: _this.maxSize.height,
						maxWidth: _this.maxSize.width,
						minHeight: _this.minSize.height,
						minWidth: _this.minSize.width
					});
	
				}
				$this.blur(function(){$this.css("z-index",1000);});
				$this.focus(function(){$this.css("z-index",999);});
			};
			this.show = function() {
			  //  $("body").css({ "overflow-x": "auto" });
			   
				$.dialog.background.show();
				center();
				$this.show();
				_this.status="running";
				$this.stop();
			
				$this.doEvent(this,'beginShow',{el :$this,o:_this});
				
				$this.animate({
					opacity:1
					},
					options.animateSpeed,
					options.animateEasing,
					function()
					{
						options.status="show";
						$this.doEvent(this,'endShow',{el :$this,o:_this});
					}
				);
				return _this;
				
			};
			this.next = function(dialog) {
			   $.dialog.background.lock=true;
				_this.hide();
				dialog.show();
			   $.dialog.background.lock=false;
			   return _this;
			};
			this.hide = function() {
				$.dialog.background.hide();
				options.status = "running";
				$this.doEvent(this,'beginHide',{el :$this,o:_this});
				if(jQuery.support.opacity)
				{
					$this.stop();
					switch(options.animateType)
					{
						case "fade" :
						$this.animate({
							 opacity:0},
							 options.animateSpeed,
							 options.animateEasing,
							 function(){
								if($(this)[0]!=null)$(this).hide();
									$this.doEvent(this,'endHide',{el :$this,o:_this});
								_this.status="hide";
						});
						break;
						case "puff" :
						$this.effect("puff", {}, 500, 
							function(){_this.status="hide";$this.doEvent(this,'endHide',{el :$this,o:_this});}
						);
						break;
					}
				}
				else
				{
					$this.hide();
					_this.status="hide";
					$this.doEvent(this,'endHide',{el :$this,o:_this});
				}
				return _this;
			};
			this.remove=function()
			{
				$this.remove();
			}
			this.full=function(args)
			{
				var _args={
				   width:$(window).width()-100,
				   height:$(window).height()-100
				};
				var args= $.extend(_args, args);
				var left =  _this.point.left-(args.width-_this.minSize.width)/2;
				var top =  _this.point.top-(args.height-_this.minSize.height)/2;
				$this.doEvent(this,'beginFull',{el :$this,o:_this,point:_this.point,size:_this.minSize});
				$this.animate({
					left:left,
					top:top,
					width:args.width,height:args.height},
					options.animateSpeed,
					options.animateEasing,function(){
						_this.resizeStatus = "max";
						$this.doEvent(this,'endFull',event,{el :$this,o:_this,point:{left:left,top:top},size:_this.maxSize});
				});
				return _this;
				
			}
			this.normal=function()
			{
				var left=_this.point.left;
				var top=_this.point.top;
				
				$this.doEvent(this,'beginNormal',event,{el :$this,o:_this,point:{left:left,top:top},size:_this.minSize});
				$this.animate({
					 left:left,
					 top:top,
					 width:_this.minSize.width,
					 height:_this.minSize.height},
					 options.animateSpeed,
					 options.animateEasing,
					 function(){
						_this.resizeStatus = "normal";
						$this.doEvent(this,'endNormal',{el :$this,o:_this,point:{left:left,top:top},size:_this.minSize});
				 });
				return _this;
			}
			this.min = function(minHeight)
			{
				var doc  = $.docSize();
				var left= doc.width - $this.width();
				var top= doc.height - minHeight;
				$this.doEvent(this,'beginMin',{el :$this,o:_this,point:{left:left,top:top},size:_this.minSize});
				$this.animate({
					 left:left,
					 top:top,
					 width:_this.minSize.width,
					 height:_this.minSize.height},
					 options.animateSpeed,
					 options.animateEasing,
					 function(){
						_this.resizeStatus = "min";
						$this.doEvent(this,'endMin',{el :$this,o:_this,point:{left:left,top:top},size:_this.minSize});
				});
				return _this;
			}
			_init();
		})
		this.index = 0 ;
		this.backIndex = 0 ;
		this.next = function()
		{
			elements[this.index].hide();
			elements[++this.index].show();
			this.backIndex = this.index;
		}
		this.prev = function()
		{
			elements[this.index].hide();
			elements[--this.index].show();
			this.backIndex = this.index;
		}
		this.show = function(index)
		{
			elements[this.index].hide();
			elements[this.backIndex].show();
			this.backIndex = this.index;
		}
		this.hide = function(index)
		{
			elements[this.backIndex].hide();
			elements[this.index].show();
			this.backIndex = this.index;
		}
		return elements.length <= 1 ? elements[0]: elements;
    }
	
    $.dialog = {
		background : null ,
		create : function(options)
		{
			var _options = {
			innerHTML 		:	"",
			cssDialog       :   "dialog"
			};
			var options= $.extend(_options, options);
			var dialogHtml=$("<div/>").appendTo($(document.body));
			dialogHtml.append(options.innerHTML).addClass(options.cssDialog);
			return dialogHtml.dialog(options).show();
		}
	}
})(jQuery);﻿/*
@author : czy
@about  : Fixed
@date   : 2011/5/17
@import : jquery.js
*/
/* Fixed */
(function($){  
        $.fn.fixed = function(options){ 
		 var _this=this;
		 var $this=$(this);
         var defaults={  
		   left			:	"auto",
		   right		:	"auto",
		   bottom		:	"auto",
		   top			:	"auto",
		   direction	:	"left", //auto 
		   status		:	"show",
		   animateSpeed :	"fast", 
		   minVal		:	200,
		   eFixedBar	:	".fixbar"
         };  
		 this.config=$.extend(defaults,options);  
		 $this.show();
		 var fixbar=$(this).children(options.eFixedBar).css("cursor","pointer");
		 var tempHeight=$this.height();
		 var tempWidth=$this.width();

         switch(_this.config.direction)
		 {
				 case "top":_this.config.top=0;break;
				 case "left":_this.config.left=0;break;
				 case "bottom":_this.config.bottom=0;break;
				 case "right":_this.config.right=0;break;
				 case "auto":break;
		 }
		 if(_this.config.top =="auto" && _this.config.bottom =="auto")
		 _this.config.bottom=0;
		 if(_this.config.left=="auto" && _this.config.right=="auto")
		 _this.config.right=0;
		 var _runInIE6=function()
		 {
			 $("body").css({"background-image":"url(about:blank)","background-attachment":"fixed"});
		     var docHeight=$(document).height();
			 $(window).scroll(function()
			 {	 
				  $("body").height(docHeight);
			 });
			 $this.css({"position":"absolute"});
			if(_this.config.top!="auto" )$this[0].style.setExpression("bottom","eval(document.documentElement.scrollTop"+(_this.config.top)+")");
			if(_this.config.left!="auto") $this[0].style.setExpression("right","eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0"+(_this.config.left)+")");
			if(_this.config.right!="auto")$this[0].style.setExpression("left","eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0"+(_this.config.right)+")");
			if(_this.config.bottom!="auto"  ) $this[0].style.setExpression("top","eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0"+(_this.config.bottom)+"))");
		 };    
		 var _fixedBrowse=function()
		 {
			 $this.css({"position":"fixed"});
			 $this.css({"top":_this.config.top});
			 $this.css({"left":_this.config.left});
			 $this.css({"right":_this.config.right});
			 $this.css({"bottom":_this.config.bottom});
	 
		 };
        
		 var _init=function()
		 {
			 if(_this.config.direction=="left" || _this.config.direction=="right")
			 {_this.config.minVal=fixbar[0]==null?_this.config.minVal:fixbar.width();}
			 else if(_this.config.direction=="bottom" || _this.config.direction=="top")
			 {_this.config.minVal=fixbar[0]==null?_this.config.minVal:fixbar.height();}
			 //如果是IE6
			if($.browser.msie&&$.browser.version=='6.0')
			    _runInIE6();
			else
				_fixedBrowse();
			 fixbar.click(function()  { _this.toggle();  });
			 if( _this.config.status=="hide")
			 {
			     switch(_this.config.direction)
				 {
					 case "top":$this.animate({height:_this.config.minVal});break;
					 case "left":$this.animate({width:_this.config.minVal});break;
					 case "right":$this.animate({width:_this.config.minVal});break;
					 case "bottom":	$this.animate({height:_this.config.minVal});break;
				 }
			 }
         };

         this.show=function()
		 {
			  switch(_this.config.direction)
			  {
					 case "top":$this.animate({height:tempHeight});break;
					 case "left":$this.animate({width:tempWidth});break;
					 case "right":$this.animate({width:tempWidth});break;
					 case "bottom":	$this.animate({height:tempHeight});break;
			  }
			 _this.config.status="show";
		 };
		 this.hide=function()
		 { 
				 switch(_this.config.direction)
				 {
					 case "top":$this.animate({height:_this.config.minVal});break;
					 case "left":$this.animate({width:_this.config.minVal});break;
					 case "right":$this.animate({width:_this.config.minVal});break;
					 case "bottom":$this.animate({height:_this.config.minVal});break;
				 }
			
			  _this.config.status="hide";
		 };
		 this.toggle = function()
		 {
			
			   if(_this.config.status=="hide")
				 _this.show();
			   else
			     _this.hide();
		 }
		 _init();
	}
	/* 基本信息 */
	$.fn.fixed.Info={
		     name   	: "fixed",
		     author 	: "caizhongyi",
			 ver    	: "1.0.0.0",
			 date   	: "2011-05-17",
		     email		: "274142680@qq.com",
			 copyright  : "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
})(jQuery); 


;(function($){
    $.fn.capacityFixed = function(options) {
        var config = $.extend({},$.fn.capacityFixed.deflunt,options);
        var FixedFun = function(element) {
            var top = config.top;
            var right = ($(window).width()-config.pageWidth)/2+config.right;
            element.css({
                "right":right,
                "top":top
            });
            $(window).resize(function(){
                var right = ($(window).width()-config.pageWidth)/2+config.right;
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
﻿/* 
* jquery.loading
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {
    /*
    */
    $.fn.loading = function(options) {
        var $this = $(this);
        var _this = this;
		var defaults = {
			maxOpacity		: 	0.7, 			 	 // opacity:透明度[0 - 1]
			color			:	"#fff",
			animateSpeed	:	"slow",
            animateEasing	: 	"easeOutExpo", 		 // 运动类型
			css				:	"load-background",
			full			:	false  				 //全屏
        };
		var config = $.extend(defaults, options);
		
		var elements = this.each(function(){
			  this.status = "hide";
			var getSize = function()
			{
				return {width:$this.width(),height:$this.height()};
			};
			this.size=getSize();
			
			var el =$("<div/>").appendTo($this);
			(function(){
				if(config.full)
				{
					_this.size.width="auto";
					_this.size.height="auto";
					$this.css({left:0,top:0, "z-index":999,"position": "absolute"});
				}
				else
				{
					$this.css({"position": "relative"});
				}
			})();
			this.background=$(el).background(
			{
				maxOpacity : config.maxOpacity,
				color : config.color,
				animateSpeed : config.animateSpeed,
				animateEasing : config.animateEasing,
				css : config.css,
				width : _this.size.width,
				height : _this.size.height
			});
			var _init=function()
			{
					
				$("<div/>").appendTo(el).addClass("load-ico").css({
				"background-position": "center",
				"background-repeat": "no-repeat"
				}).width("100%").height("100%");
			};
		  
			this.show = function() {
				_this.background.size=getSize();
				_this.background.show();
				_this.status="show";
				return _this;
			};
			this.hide = function() {
				_this.background.hide();
				_this.status="hide";
				return _this;
			};
			this.toggle =function()
			{
				if(_this.status=="show")
				_this.hide();
				else
				_this.show();
				return _this;
			};
			_init();
		})
		return elements.length <= 1 ? elements[0]: elements;
    }

})(jQuery);﻿/* 
* jquery.tab
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {

    $.fn.tab = function(options) {
        
        var _options = {
            animateType		: 	"fade",	// fade 渐变,horizontal 横向,vertical 纵向,normal 无特效
            event			: 	"hover", 	// hover && click
            auto			: 	false, 		// 自动
            index			: 	0,          // 当前index
            backIndex		: 	0,          // 上一index
			tagName			:	"tag",   // 绑定切换事件的选择器名称
			innerName		:	"inner" , // 切换内容的选择器名
            interval		: 	2000,         
			cssCurrent		: 	"current",     // 当前样式名称
			cssNormal		: 	"normal"
        };
        var options = $.extend(_options, options);
		
		var elements = $(this).each(function(){
				var _this = this, $this = $(this);
		        this.el = $this;
				this.index = options.index;   //当前index
				this.backIndex = options.backIndex;  //上一index
				//this.tempIndex = -1;    //上二次的index
				this.status = "stop";
				//this.isHover = "false"
				this.tag = $this.find(":[data-el="+options.tagName+"]").css({"z-index": 9999});
				this.inner = $this.find(":[data-el="+options.innerName+"]");
				this.tags = _this.tag.children();  //tag列表
				this.inners = _this.inner.children().show();  //内容列表
						
				//事件
				var event = [];
				this.beginChange = function(fn){ $this.addEvent(this,"beginChange",fn)};// 开始切换响应事
				this.endChange= function(fn){ $this.addEvent(this,"endChange",fn)};  // 切换后响应事件
				
				var timer=null;
				// 切换 
				var _change = function(inners, tags) {
					_this.index = _this.index >=_this.inners.length ?_this.inners.length -1:_this.index;
					_this.index = _this.index < 0 ? 0 : _this.index;
					if (_this.index < _this.inners.length && _this.index > -_this.inners.length) {
						this.status="running";
						$this.doEvent(this,'beginChange',{el :$this,o:_this,index:_this.index,backIndex:_this.backIndex});
						switch (options.animateType) {
						case "fade":
							if (_this.index != _this.backIndex) {
								_this.inners.stop(true,true);
								_this.inners.eq(_this.backIndex).fadeOut("slow");
								_this.inners.eq(_this.index).fadeIn("slow");
							};
							break;
						case "horizontal":
							_this.inners.parent().stop().animate({
								"left":
								-(_this.inners.width() * _this.index)
							},
							options.animateSpeed, options.animateEasing);
							break;
						case "vertical":
							_this.inners.parent().stop().animate({
								"top":
								-(_this.inners.height() * _this.index)
							},
							options.animateSpeed, options.animateEasing);
							break;
						default:
							if (_this.index != _this.backIndex) {
								_this.inners.eq(_this.backIndex).hide();
								_this.inners.eq(_this.index).show();
							};
							break;
						}
						var norElment=tags.eq(_this.backIndex);
						norElment.removeClass(options.cssCurrent).addClass(options.cssNormal);
						var curElemnt=tags.eq(_this.index);
						curElemnt.addClass(options.cssCurrent).removeClass(options.cssNormal);
						//if(options.animateType != "normal" )
						//{
							norElment.stop();
							norElment.fadeTo("fast", 0.7, null);
							curElemnt.stop();
							curElemnt.fadeTo("fast", 1, null);
						//}
						$this.doEvent(this,'endChange',{el :$this,o:_this,index:_this.index,backIndex:_this.backIndex});
						//_this.tempIndex = _this.backIndex;
						_this.backIndex = _this.index;
					}
					return _this.backIndex;
		
			   }
			   var clearTimeOut=function()
			   {
				   if(timer != null)
				   {
					   clearTimeout(timer);
					   this.status="stop";
					   timer = null;
				   }
			   };
			   var createTimeOut=function()
			   {
				   if( timer == null)
				   timer = setTimeout(_auto, options.interval);
			   };
			   //鼠标响应事件
			   var changeEvent=function()
			   {
				   _this.index = _this.tags.index($(this));
				   _this.backIndex = _change(_this.inners, _this.tags);
				   clearTimeOut();
			   };
		
			   var _init=function()
			   {
				   //事件绑定
				   if(options.event=="hover")
				   {
					   _this.tags.bind("mouseover",changeEvent);
				   }
				   else
				   {
						_this.tags.bind("click",changeEvent);
				   }
					if(options.auto)
					{
					   _this.tags.bind("mouseout",function(){createTimeOut();});
					   _this.inners.hover(function(){clearTimeOut();},function(){createTimeOut();});
					}
					
					//动画类型
					switch (options.animateType) {
					case "fade":
					_this.inners.parent().css({"position":"relative",height:_this.inners.height()});
					_this.inners.css({"position":"absolute",left:0,top:0}); 
					break;
					case "horizontal":
							_this.inners.parent()
							.wrapAll("<div></div>").parent()
							.css({"position":"relative",overflow:"hidden",height:_this.inners.height(),width:_this.inners.width()});
							_this.inners.css({"float":"left"}).parent().css({
								"position":
								"absolute",
								left: 0,
								top: 0,
								width: _this.inners.width() * _this.inners.length,
								height:_this.inners.height()
							});
						break;
					case "vertical": 
							_this.inners.parent()
							.wrapAll("<div></div>")
							.parent()
							.css({"position":"relative",overflow:"hidden",height:_this.inners.height(),width:_this.inners.width()});
							_this.inners.parent().css({
								"position":
								"absolute",
								left: 0,
								top: 0,
								height:_this.inners.height()
							});
						break;
					default: break;
					};
					 if (options.animateType == "fade" || options.animateType == "normal") {
							$.each(_this.inners,
							function(i, n) {
								if (i == 0) {
									$(n).show();
								} else {
									$(n).hide();
								}
							});
						}
						$.each(_this.tags,
						function(i, n) {
							if (i == 0) {
								$(n).addClass(options.cssCurrent);
							} else {
								$(n).addClass(options.cssNormal);
							}
						});
				
			   };
			   
			   this.add = function(el)
			   {
				   var newTag = $("<"+_this.tags.attr("tagName")+"/>").html(_this.tags.length++);
				   newTag.appendTo( _this.tag);
				   var newInner = el;
				   newInner.appendTo(_this.inner);
			   }
			   
				/*this.destroy = function()
				{
						_this.tags.unbind("click");	
						_this.tags.unbind("mouseover");	
						_this.tags.unbind("mouseout");	
						_this.tags.removeClass(options.cssCurrent);
						_this.inners.unbind("mouseover");	
						_this.inners.unbind("mouseout");	
						_this.inners.parent()
						.parent()
						.css({"position":"relative",overflow:"visiable",height:_this.inners.height(),width:_this.inners.width()});
						_this.inners.css({"float":"none","position":"static"}).parent().css({
							"position":
							"relative",
							width: _this.inners.width() * _this.inners.length,
							height:_this.inners.height()
						});
						_this.index=0;
						_this.backIndex=0;
						_this.current(0);
						clearTimeOut();
				};*/
				// 时间变换
				var _auto = function() {
				
					if (_this.index >= _this.tags.length) {
						_this.index = 0;
					}
					_this.backIndex = _change(_this.inners, _this.tags);
					_this.index++;
					clearTimeOut();
					timer = setTimeout(_auto, options.interval);
				}
				this.current = function() {
					switch (_this.current.arguments.length) {
					case 0:
						return _this.index;
					case 1:
						_this.index = _this.current.arguments[0];
						  _this.backIndex = _change(_this.inners, _this.tags);
						return _this;
					}
				}
				this.prev = function()
				{
					_this.index--;
					_this.backIndex = _change(_this.inners, _this.tags);
					return _this; 
				}
				this.next = function()
				{
					_this.index++;
					_this.backIndex = _change(_this.inners, _this.tags);
					return _this; 
				}
				_init();
				
				//自动播放
				if (options.auto) {
					createTimeOut();
				}
		});
		return elements.length <= 1 ? elements[0]: elements;
    }
	
	$(document).ready(function()
	{
		if($(":[data-el=tab]").length>0)
		{
			$(":[data-el=tab]").tab();
		}
		
	})

})(jQuery);﻿/* 
* jquery.textArea
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
(function($) {
    $.fn.textArea = function(options) {
        var defaults = {
			max		:	140,
			callback:	function(){}
		};
        var options=$.extend(defaults, options);
		var elements = $(this).each(function()
		{
				var $this = $(this),_this = this;
				this.resoult=options.max;
				var _compare=function()
				{
					var len=$this.val().length;
					if(len>options.max)
					{
						$this.val($this.val().substring(0, options.max));
						_this.resoult=options.max-$this.val().length;
						if(options.callback)options.callback(_this.resoult);
						return false;
					}
					else
					{	
						_this.resoult=options.max-len;
						if(options.callback)options.callback(_this.resoult);
						return true;
					}	    
					
				}
				$this.bind("keypress", function(){_compare(); });
				$this.bind("keyup",function() { _compare();  });
		 }
		)
  	   return elements.length <= 1 ? elements[0]: elements;
    }
})(jQuery);﻿/* 
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {

    $.fn.textBox = function(options) {
		var defaults = {
            textBoxClass	:	"textbox",
            tipClass		:	"textbox-tip"
        };
		var options=$.extend(defaults, options);
		var elements = $.each($(this),function(i,n){
			  var _this = this;
              var $this = $(n);
			  var overlay = $("<span/>").html($this.val());
			  overlay.addClass(options.tipClass);
			  $this.val("").addClass(options.textBoxClass);
			  overlay.css({
					"display"		:	"inline-block",
					"*display"		:	"inline",
				    "zoom"			:	1,
					"margin-left"	:	-$this.width(),
					width			:	$this.width(),
					height			:	$this.height()
			  });
			  $this.after(overlay);
		
			  overlay.stop(true,true);
			  overlay.click(function(){overlay.fadeOut();$this.focus()},function(){});
			  $this.focus(function(){overlay.fadeOut();});
			  $this.blur(function(){
				  if($(this).val()=="")
				  {
						   overlay.fadeIn();
				  }
			  });
		});
		return elements.length <= 1 ? elements[0]: elements;
	}
	
	$(document).ready(function(){
		if($(":[data-el=textBox]").length>0)
		{
	   	  $(":[data-el=textBox]").textBox();
		}
	})

})(jQuery);﻿/* 
* jquery.tipBox
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : core.js , easyBox.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
;(function($) {
    $.fn.tipBox = function(options) {
        var defaults = {
            status : "hide" ,
			property : "width,height,opacity,visibility,left,top",  //display
			startValue :{},  //初始值
			endValue   :{},  //结束值
			animateSpeed	:  "slow",
			animateEasing	:  "easeOutExpo", // 运动类型
			zIndex  : 1,
			mainBox :".mainbox",
			subBox:".subbox"
        }
        var options = $.extend(defaults, options);
		var elements =  this.each(function(i,n){
	        var $this = $(n); //对像必须有唯一父级层
            var _this = this;
			this.mainBox = $this.find(options.mainBox);
			this.subBox = $this.find(options.subBox);
			this.status = "hide";
			var thisEasyBox = $this.easyBox({property:"background-color,border-color"});
			var easyBox = _this.mainBox.easyBox(options); 
			var subEasyBox = _this.subBox.easyBox({property:"height,opacity,display"});
             
			$this.css({ "position": "relative"});
			_this.mainBox.css({"position":"absolute","z-index":options.zIndex});
			_this.subBox.css({"position":"absolute","z-index":options.zIndex - 1});
			if(easyBox)
			{
				easyBox.endShow(function(){if(subEasyBox)subEasyBox.show();});
				easyBox.beginHide(function(){if(subEasyBox)subEasyBox.hide();});
			}
			$this.hover(
				function(e) {easyBox.show({x:e.layerX,y:e.layerY});},
				function(e) {easyBox.hide();}
			)
			
			this.show = function(point)
			{
				//_this.mainBox.stop(true,true);
				//_this.mainBox.fadeIn();
				//_this.mainBox.animate({opacity:1,left:point.x,top:e.point.y});
			}
			this.hide = function()
			{
				//_this.mainBox.stop(true,true);
				//_this.mainBox.fadeOut();
			}
     	})
		return elements.length <= 1 ? elements[0]: elements;
    }

})(jQuery);﻿/*
@author 	: czy
@description: 导航
@date   	: 2011/5/17
@dependent 	: jquery.js
			  CZYAccordion.js
*/
(function ($) {
    /*
      @remark :
    */
    $.fn.navgation= function (options) {
	    var _this = this,$this = $(this),
		defaults = 
		{
			/* params */
			direction	:	"horizontal",  // vertical 
			elements	:
			{
				/* elements */
				
			}
		};    
        // Extend our default options with those provided.    
        this.config = $.extend(defaults, options);  
        this.items=$this.children();
	    var _init=function()
		{
			/* 初始化 */
			$this.show();
			$.each(_this.items,
				function(i,n)
				{
						  $(n).children("ul").children("li")
						  .css({opacity:0.7}).hover(function(){$(this).css({opacity:1})},function(){$(this).css({opacity:0.7})});
						  $(n).children("a").css("display","block").addClass("tabelement-item");
						  var tabEl= $(n).CZYTabElement();
						  if(_this.config.direction == "horizontal")
						  {
							  $(n).CZYSelect(
							  {
								  event:"hover",
								  callback:
								  {
									  beginShow:function(){if($(n).find(".accor-inner").length>0){tabEl.lock=true;}},
									  hidden:function(){tabEl.lock=false;tabEl.start();}
							      }
							  });
						  }
						  else
						  {
							  $(n).CZYAccordion(
								{ 
									event : "click",
									type : "normal",
									callback :
									{
									   beginShow : function(){
										   if($(n).find(".accor-inner").length > 0)
										   {tabEl.lock=true;}
									   },
									   hidden : function(){
										   tabEl.lock = false;
										   tabEl.start();
									   }
							        }
								}				
							  );
					     }
				 
			    });
		};
	
	
		this.show=function()
	    {
			switch(_this.show.arguments.length)
			{	
					case 0: return _this;
					case 1: return _this;
			}	 
		}
		this.hide=function()
		{
			switch(_this.show.arguments.length)
			{	
					case 0: return _this;
					case 1: return _this;
			}	
		};
		_init();
		/* code */
		return this;
    }; 
	/* 基本信息 */
	$.fn.navgation.Info={
		     name   	: "navgation",
		     author 	: "caizhongyi",
			 ver    	: "1.0.0.0",
			 date   	: "2011-05-17",
		     email		: "274142680@qq.com",
			 copyright  : "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };
	/*
	@author 	: czy
	@description: 元素切换效果
	@date   	: 2011/5/17
	@dependent 	: jquery.js

	*/
	$.fn.CZYTabElement= function (options) {
	    var _this = this;
		var $this = $(this);
	
		/* 私有 */
	    var defaults = {
			/* params */
			auto		:	true,
			event		:	"hover",
			animateSpeed:	"fast",
			elements	:	
			{
				/* elements */
				item	:	".tabelement-item"
			}
		};    
        // Extend our default options with those provided.    
        this.config = $.extend(defaults, options);  
        this.items=$this.children(_this.config.elements.item);
		this.length=_this.items.length;
	    this.lock=false;
	    var _init=function()
		{
		  $this.css({}).show();
		  _this.items.css({display:"block"});
		  if(_this.config.auto)
		  {
			  if(_this.config.event=="hover")
			  {
				  $(_this.items[_this.length-1]).bind("mouseout",function(){if(!_this.lock)_this.start();});
				  $(_this.items[_this.length-1]).bind("mouseover",function(){if(!_this.lock)_this.rebound();});
			  }
			  else 
			  {
				  $(_this.items[_this.length-1]).bind("mousedown",function(){if(!_this.lock)_this.rebound();});
				  $(_this.items[_this.length-1]).bind("mouseup",function(){if(!_this.lock)_this.start();});
			  }
		  }
		  $.each(_this.items,function(i,n){
				 if(i!=_this.length-1){
						 if(!($.browser.msie && ($.browser.version == "6.0") && !$.support.style))
					     {
						 	$(n).css({opacity:0});
					
						 }
						 else
						 {
							 //$(n).css({"display":"none"});
						 }
						
					}
				 $(n).css({"margin-top":-$(n).height()*i,position:"relative","z-index":i});
			});
		};
		this.index=_this.items.length-1;
		this.start=function()
		{
			 if(_this.index<_this.length-1)
			 {
				  $(_this.items[_this.index]).stop();
            	 $(_this.items[_this.index]).animate({opacity:0},_this.config.animateSpeed);
				 // $(_this.items[++_this.index]).stop();
			 	 $(_this.items[++_this.index]).animate({opacity:1},_this.config.animateSpeed);
				 _this.start();
			  
			 }
		};
		this.rebound=function()
		{
		  
			 if(_this.index>0)
			 { 
			     $(_this.items[_this.index]).stop();
				 $(_this.items[_this.index]).animate({opacity:0},_this.config.animateSpeed);
				 //$(_this.items[--_this.index]).stop();
				 $(_this.items[--_this.index]).animate({opacity:1},_this.config.animateSpeed);
				 _this.rebound();
			 }
		};
		_init();
		/* code */
		return this;
    }; 

})(jQuery);
﻿/* 
* jquery.listView
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
(function ($) {
    /*
      @remark :
    */
    $.fn.listView= function (options) {
	    var _this = this;
		var $this = $(this);
		/* 私有 */
	    var _options = {
			/* params */
			animateType    	:   "fade",  //fade || normal || absolute
			aniamteSpeed	:	"fast",
			animateEasing	: 	"easeOutExpo", 		 // 运动类型
			isImage         :   false,
			columnCount     :   5,
			space 			:   10,
			autoLoad		:	true,
			data			:	{},
			groupName		:   "g"
		}  
        // Extend our default options with those provided.    
        var options = $.extend(_options, options);   
		
		var elements  = this.each(function(){
		  		this.el = $this;
				//this.loading = $this.loading();
				
				this.items = [];
				this.data = {};
				this.point = {left:0,top:0};
				
				this.index = -1 ;
				this.rowIndex = 0;
				
				this.currentLeft = 0 ;
				this.currentTop = 0 ;
				/* 初始化 */
				var _init = function()
				{
					 var  elements= $this.children(); 
					 /* 加载原始标签内数据 */
					 for(var i=0;i<elements.length;i++)
					 {	
						_this.add($(elements[i]));
					 }
					/* 加载数据 */
					if(options.data!=null)
					{
						var data = options.data;
						for(var i = 0;i<data.length;i++)
						{
							_this.add(data[i]);
						}	
					}
				
				};
				
				var bindStyle = function(el)
				{
					switch(options.animateType)
					{
						case "fade":
							   el.css({opacity:0});
						break;
						case "absolute":
							   el.parent().css({"position":"relative"});
							   el.css({"position":"absolute",right:0,top:0,opacity:1});
						break;
						default:break;
					}
					//国片类型
					 var images =$this.find('a[rel='+options.groupName+']');
					 if(options.isImage)
					 {
							images.fancybox({
									'transitionIn'		: 'none',
									'transitionOut'		: 'none',
									'titlePosition' 	: 'over',
									'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
										return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
									}
							}); 
					  }
				}
				
				
				var item = function(el,left,toLeft,top,toTop,height)
				{
					var self = this;
					this.element = el;
					this.left = left ;
					this.top = top ;
					this.toLeft = toLeft;
					this.toTop = toTop;
					this.height = height;
					
					this.move = function(left,top)
					{
						left = left | self.toLeft;
						top = top | self.toTop;
						
						self.element.stop();
						self.element.animate({left:left,top:top},options.animateSpeed,options.animateEasing);
						self.left = left;
						self.top = top;
					}
					this.fade = function(val,callback)
					{
						self.element.stop();
						self.element.animate({opacity:val,height:height},options.animateSpeed,options.animateEasing,callback);
					}
				}
				
				var itemsStop = function()
				{
					for(var i=0;i<_this.items.length;i++)
					{
					   _this.items[i].element.stop();
					}
				}
		
				var createItems = function(i,n)
				{
						bindStyle(n);
						var el = new item(n,null,_this.currentLeft,null,_this.currentTop,n.height());
						switch(options.animateType)
						{
							case "fade" : n.height(0);el.fade(1,null); break;
							case "absolute" : el.move(); break;
						}
						 _this.index = i;
						
						 _this.currentLeft += n.width()+ options.space; 
						 if((i+1) % options.columnCount == 0 )
						 {
							 _this.rowIndex ++;
							 _this.currentTop += n.height()+ options.space;
							 _this.currentLeft  = 0;
						
						 }
						
						_this.items.push(el);
						return el;
				}
				
				this.clear = function()
				{
					_this.items = null;
					_this.index = 0;
					_this.rowIndex = 0 ;
					$this.empty();
					return _this;
				};
				
				this.reshow = function()
				{
					_this.index = 0;
					switch(options.animateType){
					   case "fade": _this.rowList.children().css({opacity:0});break;
					}
					_this.show();
					return _this;
				}
				
				
				//直接加载
				this.add=function(html)
				{
					if(!_this.items){_this.items=[];}
					_this.index ++;
					//_this.loading.show();
					var el= null ;
					
					if($.isjQuery(html))
					{
						el = html;
						$this.append(el);
					}
					//else if(!$.isObject(html))
					//{
						
					//}
					else
					{
						el = $("<div/>").appendTo( $this );
						try{
							el.append(html);
						}
						catch(e)
						{}
					}
					createItems(_this.index,$(el));
					//_this.loading.hide();
					return _this;
				}
				_init();	
		})
		return elements.length <= 1 ? elements[0]: elements;
    }
})(jQuery);

﻿/*
@author 	: czy
@description: 
@date   	: 2011/5/17
@dependent 	: jquery.js
*/
(function ($) {
    /*
    @remark :
    */
    $.fn.dataGrid = function (options) {

        $.fn.listView.call(this, { isImage: false, animateType: "normal" });
        var _this = this;
        var $this = $(this);

        /* 私有 */
        var _options = {
            /* params */
            data: {},         // data.head & data.body
            cssCells: "datacells",
            del: "删除"
        };

        // Extend our default options with those provided.    
        var options = $.extend(_options, options);
        var gridHead = null;
       // var load = $("<div/>").appendTo($this).loading();
        this.el = $this;
        var event = [];
        /* 事件 */
        this.beginUpdate = function (fn) {
            event.push($.getEvent("beginUpdate", fn)); return _this;
        };
        this.beginDel = function (fn) {
            event.push($.getEvent("beginDel", fn)); return _this;
        };
        this.endUpdate = function (fn) {
            event.push($.getEvent("endUpdate", fn)); return _this;
        };
        this.endDel = function (fn) {
            event.push($.getEvent("endDel", fn)); return _this;
        };

        var head = function (data) {
            var self = this;
            self.element = $("<ul/>").addClass("clearfix").addClass(options.cssCells).css("display", "table-row");
            for (var j in data) {
                var l = $("<li/>").appendTo(self.element).css("display", "table-cell");
                l.html("<span>" + data[j].name + "</span>");
            }
            createOption(self.element);
            return this;
        }
        //行
        var row = function (headData, bodyData, index) {
            var self = this;
            this.element = $("<ul/>").attr("data-index", index).addClass("clearfix").addClass(options.cssCells).css("display", "table-row");
            this.index = index;
            for (var j in bodyData) {
                var c = new cell(headData[j], bodyData[j], self.index, j);
                c.element.appendTo(self.element);
            }
            createOption(self.element, index, bodyData);
            return this;
        }
        //单元格
        var cell = function (head, body, rowIndex, columnName) {
            var self = this;
            this.element = $("<li/>").css("display", "table-cell");
            this.label = $("<span/>").appendTo(self.element).css({ display: "block", width: "100%", height: "100%" }).html(body);
            this.input = null;
            this.value = null;
            this.type = head.type;
            this.rowIndex = rowIndex;
            this.editor = null;

            var selectBind = function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        self.input.append('<option value="' + data[i].value + '">' + data[i].text + '</option>');
                    }
                }
            }
            var selected = function () {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (self.label.html() == data[i].text) {
                            self.input.find("option").eq(i).attr("selected", "true");
                        }
                    }
                }
            }

            var create = function () {

                self.label.dblclick(function (e) {
                    self.edit(true, e);
                });
                switch (self.type) {
                    case "text": self.input = $("<input/>").attr("type", "text"); break;
                    case "combox": self.input = $("<select/>"); selectBind(head.data); break;
                    case "datetime": self.input = $("<input/>").attr("type", "datetime"); break;
                    case "check": self.input = $("<input/>").attr("type", "checkbox"); break;
                    case "editor":
                        //.data('ckeditorInstance')
                        var el = $('<div/>').appendTo($(document.body)).css("position", "absolute");
                        el.parent().css("position", "relative");
                        var editor = $('<textarea/>').appendTo(el).ckeditor({ width: 600, height: 100 });
                        self.input = el;
                        var ckInstansce = editor.data('ckeditorInstance');
                        ckInstansce.on("blur", function () {
                            el.hide();
                            self.label.show();
                            $.doEvent("beginUpdate", event, { el: $this, o: _this, trigger: self.label }, { index: self.rowIndex, columnName: columnName, value: ckInstansce.getData() });
                            self.label.html(ckInstansce.getData());
                            $.doEvent("endUpdate", event, { el: $this, o: _this, trigger: ckInstansce }, { index: self.rowIndex, columnName: columnName, value: self.label.html() });
                        }
					 );
                        break;
                    default: self.input = $("<input/>").attr("type", "text"); break;
                }
                if (self.type != editor || self.type ==null) {
                    self.input.width("90%").appendTo(self.element);
                    self.input.hide();
                    self.input.bind("blur", function (e) {
                        self.edit(false, e);
                    });
                }

            }

            this.edit = function (bool, e) {
                if (bool) {
                    switch (self.type) {
                        case "text": self.input.val(self.label.html()); break;
                        case "combox": selected(); break;
                        case "datetime": self.input.val(self.label.html()); break;
                        case "check": self.input.val(self.label.html()); break;
                        case "editor":
                            var oeditor = self.input.find("textarea").data('ckeditorInstance');
                            oeditor.setData(self.label.html());
                            oeditor.focus();
                            break;
                        default: self.input.val(self.label.html()); break;
                    }
                    self.label.hide();
                    self.input.show().focus();

                }
                else {
                    $.doEvent("beginUpdate", event, { el: $this, o: _this, trigger: self.label }, { index: self.rowIndex, columnName: columnName, value: self.input.val() });
                    switch (self.type) {
                        case "text": self.label.html(self.input.val()); break;
                        case "combox": self.label.html(self.input.find('option:selected').text()); break;
                        case "datetime": self.label.html(self.input.val()); break;
                        case "check": self.label.html(self.input.val()); break;
                        case "editor":
                            //var oeditor = self.input.find("textarea").data('ckeditorInstance');

                            break;
                        default: self.label.html(self.input.val()); break;
                    }
                    self.label.show();
                    self.input.hide();
                    $.doEvent("endUpdate", event, { el: $this, o: _this, trigger: self.input }, { index: self.rowIndex, columnName: columnName, value: self.label.html() });
                }
            }
            create();
        }


        //创建操作列
        var createOption = function (parent, i, data) {
            if (i != null) {
                var l = $("<li/>").appendTo(parent).css("display", "table-cell");
                //var update = $("<a/>").attr("href","javascript:;").html(options.update.text).appendTo(l).css("margin-right","5px");
                //update.click(function(){});
                var delbutton = $("<a/>");

                delbutton.attr("href", "javascript:;").html(options.del);
                delbutton.appendTo(l);
                delbutton.click(
					function () {
					    $.doEvent("beginDel", event, { el: $this, o: _this, trigger: delbutton }, { index: i, record: data });
					    $.doEvent("endDel", event, { el: $this, o: _this, trigger: delbutton }, { index: i, record: data });
					});
            }
            else {
                var l = $("<li/>").appendTo(parent).css("display", "table-cell").appendTo(l);
            }

        }

        var grid = function (headData, bodyData) {
            if (gridHead == null) {
                gridHead = new head(headData);
                _this.add(gridHead.element);

            }

            for (var i = 0; i < bodyData.length; i++) {
                var r = new row(headData, bodyData[i], i);
                _this.add(r.element);
            }
            return _this;
        }

        var _init = function () {
            /* 初始化 */
            $this.css({ display: "table", width: "100%", "border-collapse": "collapse" });
            if (options.data != null) {
                $this.css({ "margin-top": 1, "margin-left": 1 });
                grid(options.data.head, options.data.body);
            }

        };

        this.clear = function () {
            gridHead = null;
            _this.items = null;
            _this.index = 0;
            if (_this.rowList) _this.rowList.empty();
            return _this;
        };

        this.load = function (data) {
            /* 初始化 */
            grid(data.head, data.body);
        }

        this.reLoad = function (data) {
            _this.clear();
            _this.load(data);
        }


        /// _init();
        /*this.fun=function()
        {

        switch(_this.fun.arguments.length)
        {	
        case 0: return _this;
        case 1: return _this.fun.arguments[0] ;
        }
        };*/


        /* code */
        return this;
    };
    /* 基本信息 */
    $.fn.dataGrid.Info = {
        name: "dataGrid",
        author: "caizhongyi",
        ver: "1.0.0.0",
        date: "2011-05-17",
        email: "274142680@qq.com",
        copyright: "Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved"
    };

})(jQuery);

(function($) {
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
})(jQuery);/* stickySidebar */
(function($) {
	var settings = {
		speed: 350 //animation duration      
		,
		easing: "linear" //use easing plugin for more options      
		,
		padding: 10,
		constrain: false
	},
	$window = $(window),
	stickyboxes = [],
	methods = {
		init: function(config) {
			settings = $.extend(settings, config);
			return this.each(function() {
				var $this = $(this);
				setPosition($this);
				stickyboxes[stickyboxes.length] = $this;
				moveIntoView();
			});
		},
		remove: function() {
			return this.each(function() {
				var sticky = this;
				$.each(stickyboxes,
				function(i, $sb) {
					if ($sb.get(0) === sticky) {
						reset(null, $sb);
						stickyboxes.splice(i, 1);
						return false;
					}
				});
			});
		},
		destroy: function() {
			$.each(stickyboxes,
			function(i, $sb) {
				reset(null, $sb);
			});
			stickyboxes = [];
			$window.unbind("scroll", moveIntoView);
			$window.unbind("resize", reset);
			return this;
		}
	};
	var moveIntoView = function() {
		$.each(stickyboxes,
		function(i, $sb) {
			var $this = $sb,
			data = $this.data("stickySB");
			if (data) {
				var sTop = $window.scrollTop() - data.offs.top,
				currOffs = $this.offset(),
				origTop = data.orig.offset.top - data.offs.top,
				animTo = origTop; //scrolled down out of view       
				if (origTop < sTop) {
					if (sTop > data.offs.bottom) //stop inside parent            
					animTo = data.offs.bottom;
					else animTo = sTop + settings.padding;
				}
				$this.stop().animate({
					top: animTo
				},
				settings.speed, settings.easing);
			}
		});
	}
	var setPosition = function($sb) {
		if ($sb) {
			var $this = $sb,
			$parent = $this.parent(),
			parentOffs = $parent.offset(),
			currOff = $this.offset(),
			data = $this.data("stickySB");
			if (!data) {
				data = {
					offs: {} // our parents offset  
					,
					orig: { // cache for original css              
						top: $this.css("top"),
						left: $this.css("left"),
						position: $this.css("position"),
						marginTop: $this.css("marginTop"),
						marginLeft: $this.css("marginLeft"),
						offset: $this.offset()
					}
				}
			} //go up the tree until we find an elem to position from     
			while (parentOffs && "top" in parentOffs && $parent.css("position") == "static") {
				$parent = $parent.parent();
				parentOffs = $parent.offset();
			}
			if (parentOffs) { // found a postioned ancestor       
				var padBtm = parseInt($parent.css("paddingBottom"));
				padBtm = isNaN(padBtm) ? 0 : padBtm;
				data.offs = parentOffs;
				data.offs.bottom = settings.constrain ? Math.abs(($parent.innerHeight() - padBtm) - $this.outerHeight()) : $(document).height();
			} else data.offs = { // went to far set to doc         
				top: 0,
				left: 0,
				bottom: $(document).height()
			};
			$this.css({
				position: "absolute",
				top: Math.floor(currOff.top - data.offs.top) + "px",
				left: Math.floor(currOff.left - data.offs.left) + "px",
				margin: 0,
				width: $this.width()
			}).data("stickySB", data);
		}
	}
	var reset = function(ev, $toReset) {
		var stickies = stickyboxes;
		if ($toReset) { // just resetting selected items   
			stickies = [$toReset];
		}
		$.each(stickies,
		function(i, $sb) {
			var data = $sb.data("stickySB");
			if (data) {
				$sb.css({
					position: data.orig.position,
					marginTop: data.orig.marginTop,
					marginLeft: data.orig.marginLeft,
					left: data.orig.left,
					top: data.orig.top
				});
				if (!$toReset) {
					// just resetting			
					setPosition($sb);
					moveIntoView();
				}
			}
		});
	}
	$window.bind("scroll", moveIntoView);
	$window.bind("resize", reset);
	$.fn.stickySidebar = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (!method || typeof method == "object") {
			return methods.init.apply(this, arguments);
		}
	}
})(jQuery); /* 
* jquery.form
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery-ui.js core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
(function ($) {
    $.fn.form = function (options) {
        var _options = {
            /* params */
            jsonParam: true,
            dataType: "json"
        };
        /* 全局 */
        /* this.Config = $.extend({},$.fn.CZYfun.options,options); */
        // Extend our default options with those provided.    
        var options = $.extend(_options, options); 
        var elements = this.each(function (i, n) {
            
            var _this = this, $this = $(this);
            this.param = {};
            this.action = $this.attr("action");
            this.method = $this.attr("method");

            var submitButton = $this.find("input[type=submit]");
            
			this.beginSubmit = function(fn){$this.addEvent(this,"beginSubmit",fn);}
			this.endSubmit = function(fn){$this.addEvent(this,"endSubmit",fn);}
				$this.removeEvent(this,"beginSubmit");
				
            this.submitForm = function () {
                var inputs = $this.find("input[type=text],textarea,checkbox,select");
                inputs.each(function () {
                    if ($this.attr("id") != null) {
                        _this.param[$(this).attr("id")] = $(this).val();
                    }
                })

                $this.doEvent(this,"beginSubmit");
                $.ajax({
                    type: _this.method, //注明 返回Json
                    contentType: options.jsonParam != true ? "application/x-www-form-urlencoded" : "application/json;utf-8",
                    url: _this.action, //CollegeDepartWebServices.asmx web服务名 /GetCollegeDepart 方法名
                    data: options.jsonParam == true ? $.toJSONString(_this.param) : _this.param,  //strDepartId 参数名称 collegeId 参数值"{strDepartId:"+collegeId+"}"
                    dataType: options.dataType,
                    success: function (result) {
                        try {
                            if (result) {
								 $this.doEvent(this,"endSubmit",result);
                            }
                        }
                        catch (e) {
                            alert("错误>>" + e.message);
                            return;
                        }
                    },
                    error: function (data) {
                        alert(data.status + ">>> " + data.statusText);
                    }
                });
            }
            $this.submit(function () {
                _this.submitForm();
                return false;
            });
        })
  		return elements.length <= 1 ? elements[0]: elements;
    };

})(jQuery);

