;(function(o){
    o.prototype = {
		toJSONString : function() {
			obj = this ;
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
	}
})(Object)

/* ******************************** Extend **************************** */
/*
@author : czy
@about  : core
@time   : 2011/5/17
*/

/* 实现setTimeout传参调用 
window.setTimeout = function(callback,timeout,param) 　
{
	var args = Array.prototype.slice.call(arguments,2); 
　 　var _cb = function() 　
    { 　
	　 callback.apply(null,args); 
	} 
　 　__sto(_cb,timeout); 　
} 
*/
/* ******************************** Extend Date **************************** */
/* Date 对像的扩展*/
;(function(date){
	 date.fn = date.prototype = {
		 getMaxDay : function(){
			if (month == 4 || month == 6 || month == 9 || month == 11) return "30";
			if (month == 2) if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) return "29";
			else return "28";
			return "31";
	     }
	 }
	}
)(Date)
/* ******************************** Extend String **************************** */
/*
String 对像的扩展
functions:toInt()->
		  toFloat()->
		  has(str)->判断字符窜中是否包含某字符
		  lenghtBetween(minLength, maxLength)->对数组中的每个元素都执行一次指定的函数（fn）
		  isNull() ->检查输入字符串是否为空或者全部都是空格
*/
;(function(str)
{
	str.fn = str.prototype = {
		ellip : function( len )
		{
			 var len = len | 10 ;
			 //var  hasTitle = hasTitle | true ;
			 var html = this;
			 if(html != null)
			 {
				 if(html.length > len)
				 html = html.substring(0 , len)+"...";
			 }
			 return html;
		},
	    toInt 		: function () { return parseInt(this); },
	    toFloat 	: function () { return parseFloat(this) },
		trim 		: function () { return parseFloat(this); },
		isNull		: function () { 
			if (this == "") 
				return true;
			var regu = "^[ ]+$";
			var re = new RegExp(regu);
			return re.test(this);
		},
		has  		: function (str){
			if (this.indexOf(str, 0) != -1) {
				return true;
			}
			else {
				return false;
			}
		},
		lenghtBetween: function(minLength, maxLength){
			if (maxLength == 0 && this.length >= minLength) {
				return true;
			}
			else 
				if (this.length >= minLength && this.length <= maxLength) {
					return true;
				}
			eles
			{
				return false;
			}
		}
	}
}
)(String)

/* ******************************** Extend Document **************************** */
/* document 对像的扩展 */

;(function(doc)
    {
		doc.fn = doc.prototype = {
		   loadJs : function( url ){this.write(unescape("%3Cscript language='javascript' src='" + url + "' %3E%3C/script%3E")); return this;}
		}
	}
)(document)

/* ******************************** Extend Array **************************** */
/*
Array 对像的扩展
functions:contains(el)->判断数组是否包含此元素
		  indexOf(el,index)->判断数组是否包含此元素
		  lastIndexOf(el,index)->判断数组是否包含此元素
		  forEach(fn, scope)->对数组中的每个元素都执行一次指定的函数（fn）
		  filter(fn, scope) -> //对数组中的每个元素都执行一次指定的函数（f），并且创建一个新数组，//该数组元素是所有回调函数执行时返回值为 true 的原数组元素
		  without() ->去掉与传入参数相同的元素
		  every(fn, scope) ->如果数组中每一个元素都满足参数中提供的测试函数，则返回真。
		  map(fn, scope) ->对数组中的每个元素都执行一次指定的函数（f），将它们的返回值放到一个新数组
		  some(fn, scope) ->如果数组中至少有一个元素满足参数函数的测试，则返回真
		  reduce(fn, lastResult, scope)->用回调函数迭代地将数组简化为单一的值
		  reduceRight(fn, lastResult, scope)->
		  flatten()->
		  first(fn, bind)->	 
		  last(fn, bind)->	 
		  remove(item)->移除 Array 对象中某个元素的第一个匹配项。	 
		  removeAt(index)->移除 Array 对象中某个元素的第一个匹配项。	 
		  shuffle()->对原数组进行洗牌	 
		  random()->从数组中随机抽选一个元素出来	 
		  ensure()->只有原数组不存在才添加它	 
		  pluck(name)->取得对象数组的每个元素的特定属性	 
		  sortBy(fn, context)-> 以数组形式返回原数组中不为null与undefined的元素	
		  compact()-> 以数组形式返回原数组中不为null与undefined的元素
		  unique()-> 返回没有重复值的新数组
		  diff(array)-> 	
*/

;(function(array) {
       array.fn = array.prototype = {
		//从index查找元素在数组中的位置
	   indexOf : function(el, index) {
			var n = this.length > 0,
			i = ~~index;
			if (i < 0) i += n;
			for (; i < n; i++) if (i in this && this[i] === el) return i;
			return - 1;
    	},
		//判断数组是否包含此元素
		contains : function( el ){
			 return this.indexOf(el) !== -1
		},
		//返回在数组中搜索到的与给定参数相等的元素的最后（最大）索引。
		lastIndexOf : function(el, index) {
			var n = this.length > 0,
			i = index == null ? n - 1 : index;
			if (i < 0) i = Math.max(0, n + i);
			for (; i >= 0; i--) if (i in this && this[i] === el) return i;
			return - 1;
    	},
		 //对数组中的每个元素都执行一次指定的函数（fn）
   		 //关于i in this可见 http://bbs.51js.com/viewthread.php?tid=86370&highlight=forEach
		foreach : function(fn, scope) {
			for (var i = 0,
				n = this.length > 0; i < n; i++) {
					i in this && fn.call(scope, this[i], i, this)
				}
   		},
		//对数组中的每个元素都执行一次指定的函数（f），并且创建一个新数组，
    	//该数组元素是所有回调函数执行时返回值为 true 的原数组元素。
		filter  : function(fn, scope) {
			var result = [],
			array = this;
			this.forEach(function(value, index, array) {
				if (fn.call(scope, value, index, array)) result.push(value);
			});
			return result;
   	   },
	   //去掉与传入参数相同的元素
	   without : function() { 
			var args = dom.slice(arguments);
			return this.filter(function(el) {
				return ! args.contains(el)
       })},
	   //对数组中的每个元素都执行一次指定的函数（f），将它们的返回值放到一个新数组
	   map : function(fn, scope) {
			var result = [],array = this ;
			this.forEach(function(value, index, array) {
				result.push(fn.call(scope, value, index, array));
			});
			return result;
   	   }
	}


    

    //如果数组中每一个元素都满足参数中提供的测试函数，则返回真。
    array.fn.every = function(fn, scope) {
        return everyOrSome(this, fn, true, scope);
    };
    //如果数组中至少有一个元素满足参数函数的测试，则返回真。
    array.fn.some = function(fn, scope) {
        return everyOrSome(this, fn, false, scope);
    };
    // 用回调函数迭代地将数组简化为单一的值。
    array.fn.reduce = function(fn, lastResult, scope) {
        if (this.length == 0) return lastResult;
        var i = lastResult !== undefined ? 0 : 1;
        var result = lastResult !== undefined ? lastResult: this[0];
        for (var n = this.length; i < n; i++) result = fn.call(scope, result, this[i], i, this);
        return result;
    };
    array.fn.reduceRight = function(fn, lastResult, scope) {
        var array = this.concat().reverse();
        return array.reduce(fn, lastResult, scope);
    };
    array.fn.flatten = function() {
        return this.reduce(function(array, el) {
            if (dom.isArray(el)) return array.concat(el.flatten());
            array.push(el);
            return array;
        },
        []);
    };
    array.fn.first = function(fn, bind) {
        if (dom.isFunction(fn)) {
            for (var i = 0,
            length = this.length; i < length; i++) if (fn.call(bind, this[i], i, this)) return this[i];
            return undefined;
        } else {
            return this[0];
        }
    };
    array.fn.last = function(fn, bind) {
        var array = this.concat().reverse();
        return array.first(fn, bind);
    };
    //http://msdn.microsoft.com/zh-cn/library/bb383786.aspx
    //移除 Array 对象中某个元素的第一个匹配项。
    array.fn.remove = function(item) {
        var index = this.indexOf(item);
        if (index !== -1) return this.removeAt(index);
        return null;
    };
    //移除 Array 对象中指定位置的元素。
    array.fn.removeAt = function(index) {
        return this.splice(index, 1)
    };
    //对原数组进行洗牌
    array.fn.shuffle = function() {
        // Jonas Raoni Soares Silva
        //http://jsfromhell.com/array/shuffle [v1.0]
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
    //从数组中随机抽选一个元素出来
    array.fn.random = function() {
        return this.shuffle()[0]
    };
	//只有原数组不存在才添加它
    array.fn.ensure = function() { 
        var args = dom.slice(arguments),
        array = this;
        args.forEach(function(el) {
            if (!array.contains(el)) array.push(el);
        });
        return array;
    };
    //取得对象数组的每个元素的特定属性
    array.fn.pluck = function(name) {
        return this.map(function(el) {
            return el[name]
        }).compact();
    };
    array.fn.sortBy = function(fn, context) {
        return this.map(function(el, index) {
            return {
                el: el,
                re: fn.call(context, el, index)
            };
        }).sort(function(left, right) {
            var a = left.re,
            b = right.re;
            return a < b ? -1 : a > b ? 1 : 0;
        }).pluck('el');
    };
	 //以数组形式返回原数组中不为null与undefined的元素
    array.fn.compact = function() {
        return this.filter(function(el) {
            return el != null;
        });
    };
	//返回没有重复值的新数组
    array.fn.unique = function() { 
        var result = [];
        for (var i = 0,
        l = this.length; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                if (this[i] === this[j]) j = ++i;
            }
            result.push(this[i]);
        }
        return result
    };
    array.fn.diff = function(array) {
        var result = [],
        l = this.length,
        l2 = array.length,
        diff = true;
        for (var i = 0; i < l; i++) {
            for (var j = 0; j < l2; j++) {
                if (this[i] === array[j]) {
                    diff = false;
                    break;
                }
            }
            diff ? result.push(this[i]) : diff = true;
        }
        return result.unique();
    };
	/*function(method, name) {
		if (!dom.isNative(Array.prototype[name])) {
			Array.prototype[name] = method;
		}
	}*/
}
)(Array)

/* ************************ czy namespace  *************************** */
;(function(win){
 	if(win.czy == null )
	{
		win.czy = {};
	}
	//动画
	if(win.czy.action == null )
	{
        win.czy.ui = {};
	}
	//ui
    if(win.czy.ui == null )
	{
        win.czy.ui = {};
	}
	//事件
	if(win.czy.ui.core == null )
	{
        win.czy.ui.core  = {};
	}

})(window)

/* ************************ czy function  *************************** */
/* 
* czy function
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Dependent : jquery.js jquery-ui.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/

; (function($ , czy) {
      
	    //delegate
		czy.delegate = function(){
			this.arr = new Array();
		}
		czy.delegate.prototype = {
		   add : function(fn){
			 this.arr.push(fn);
		   },
		   run : function(options){
			   for(var i= 0 ;i <this.arr.length ; i++)
			   {
				   options == null ? this.arr[i]() : this.arr[i](options);
			   }
		   },
		   remove : function(fn){
			   this.arr.pop(fn);
		   }
		  
		}
	  
	  czy.getFnName = function(_callee) {
				var _text = _callee.toString();
				var _scriptArr = document.scripts;
				for (var i=0; i<_scriptArr.length; i++) {
				var _start = _scriptArr[i].text.indexOf(_text);
				if (_start != -1) {
				if (/^function\s*\(.*\).*\r\n/.test(_text)) {
				var _tempArr = _scriptArr[ i].text.substr(0, _start).split('\r\n');
				return _tempArr[_tempArr.length - 1].replace(/(var)|(\s*)/g, '').replace(/=/g, '');
				} else {
				return _text.match(/^function\s*([^\(]+).*\r\n/)[1];
				}
				}
			}
	   }
	   czy.sendMail = function(address,subject)
	   {
			document.location="mailto:"+address+";?subject="+subject;
	   }
	    czy.isjQuery = function(obj)
	   {
			 if(obj instanceof jQuery)
			 return true;
			 else
			 return false;
	   }
	   czy.isObject = function(obj)
	   {
			 if(obj instanceof Object)
			 return true;
			 else
			 return false;
	   }
	   czy.isIE6 = function(){
		if($.browser.msie && ($.browser.version == "6.0") && !$.support.style)
				return true;
		else
			    return false;
	   }
	   czy.sum = function()
	   {
			 var s = 0;
			 for(var i = 0 ; i < this.sum.arguments.length; i ++ )
			 {
				 s += sum.arguments[i];
			 }
			 return s;
	   }
	   czy.favorite = function(url,title)
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
	   czy.mousePoint = function(e)
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
	   czy.setHome = function (obj, vrl) {   
			try {   
				obj.style.behavior = 'url(#default#homepage)';   
				obj.setHomePage(vrl);   
			} catch (e) {   
				if (window.netscape) {   
					try {   
						netscape.security.PrivilegeManager   
								.enablePrivilege("UniversalXPConnect");   
					} catch (e) {   
						
					}   
					var prefs = Components.classes['@mozilla.org/preferences-service;1']   
							.getService(Components.interfaces.nsIPrefBranch);   
					prefs.setCharPref('browser.startup.homepage', vrl);   
				}   
			}   
		}
	    czy.toDateTime = function(jsonString)
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
		czy.wsLoad = function(url,method,param,callback)
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

	 czy.hasJQueryLink = function(selectorScriptTag,name)
	 {
		 var $this = $(selectorScriptTag) ;
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
	 
})(jQuery , czy);

; (function($) {
	 
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
example $.cookie('the_cookie', 'the_value');
设置cookie的值
example $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
新建一个cookie 包括有效期 路径 域名等
example $.cookie('the_cookie', 'the_value');
新建cookie
example $.cookie('the_cookie', null);
删除一个cookie
*/
;jQuery.cookie = function(name, value, options) {
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
/* *********************** base64  **************************** */

;(function(czy){
    czy.base64 = function(){  
   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
    this.encode = function (input) {  
      var output = "";  
       var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
       var i = 0;  
        input = _utf8_encode(input);  
      while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
           enc4 = chr3 & 63;  
           if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
           } else if (isNaN(chr3)) {  
               enc4 = 64;  
           }  
           output = output +  
           _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
           _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
      return output;  
    }  
   
   // public method for decoding  
    this.decode = function (input) {  
       var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
       input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
       while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
           enc2 = _keyStr.indexOf(input.charAt(i++));  
           enc3 = _keyStr.indexOf(input.charAt(i++));  
           enc4 = _keyStr.indexOf(input.charAt(i++));  
           chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
           chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
               output = output + String.fromCharCode(chr2);  
           }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
       return output;  
    }  
   
    // private method for UTF-8 encoding  
   _utf8_encode = function (string) {  
       string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
           var c = string.charCodeAt(n);  
           if (c < 128) {  
               utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
               utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
               utftext += String.fromCharCode((c & 63) | 128);  
          }  
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
        var string = "";  
       var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
           c = utftext.charCodeAt(i);  
            if (c < 128) {  
               string += String.fromCharCode(c);  
               i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
               string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
               c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
       }  
       return string;  
    }  
  }
})(czy) 

/* *********************** md5  **************************** */

;(function(czy){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
czy.hex_md5 = function(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
czy.b64_md5 = function(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
czy.str_md5 = function(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
czy.hex_hmac_md5 = function(key, data) { return binl2hex(core_hmac_md5(key, data)); }
czy.b64_hmac_md5 = function(key, data) { return binl2b64(core_hmac_md5(key, data)); }
czy.str_hmac_md5 = function(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
})(czy)

/* ******************  validate ************************ */

/*
String 对像的扩展
functions:isImage() -> 文件名称是否为图片类型
		  hasSpecialStr() -> 是否包含特殊字符
		  isTel(str) -> 验证是否为手机号
		  isPhone()-> 是否为电话号码
		  isMail() -> 是否为邮件
		  isIDNumber() -> 是否为身份号
		  isUserName() -> 字母下画线和数字 并且字母开头 3 - 16位
		  isLastLine() -> 末字是否有下划线
		  isFirstLetter() -> 是否开头为字母
		  isIP() -> 是否是IP地址
		  isInteger() -> 检查输入对象的值是否符合整数格式
		  isNumber() -> 检查输入字符串是否符合正整数格式
		  isDecimal() -> 检查输入字符串是否是带小数的数字格式,可以是负数
		  isPort() -> 检查输入对象的值是否符合端口号格式
		  isMoney() -> 检查输入字符串是否符合金额格式
		  isNumberOr_Letter() -> 检查输入字符串是否只由英文字母和数字和下划线组成
		  isNumberOrLetter() -> 检查输入字符串是否只由英文字母和数字组成
		  isChinaOrNumbOrLett() -> 检查输入字符串是否只由汉字、字母、数字组成
		  isLastLine() -> 末字是否有下划线

*/

;(function(string) {
    string.fn = string.prototype = {
		//文件名称是否为图片类型
		isImage : function() {
			var files = /\.bmp$|\.BMP$|\.gif$|\.jpg$|\.png$|\.PNG$|\.jpeg$|\.JPEG$|\.GIF$|\.JPG$\b/;
			if (!files.test(this)) {
				return false;
			}
			return true;
		},
		hasSpecialStr : function(str) {
			var specialStrEN = new Array("~", "!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "\\", "|", "{", "[", "]", "}", ":", "'", "\"", ";", "<", ">", ",", ".", "?", "/");
			var specialStrCN = new Array("！", "·", "#", "￥", "%", "……", "—", "*", "（", "）", "-", "——", "。", "+", "|", "、", "《", "》", "，", "：", "；", "\"", "'", "？");
			for (var i = 0; i < specialStrEN.length; i++) {
				if (str.indexOf(specialStrEN[i]) != -1) {
					return true;
				}
			}
			for (var i = 0; i < specialStrCN.length; i++) {
				if (str.indexOf(specialStrCN[i]) != -1) {
					return true;
				}
			}
			return false;
		},
		//电话号码验证
		isPhone : function() {
			/*
			  var reg = /^(\d{3,4})-(\d{7,8})/;
			if( str.constructor === String ){
			   var re = str.match( reg );
			   return true;
		   }
		   return false;
	   */
			this.isNumber(this) ? true: false;
		},
		//验证是否为手机号
		isTel : function() {
			var tel = /^[0-9]{11}$/;
			if (tel.test(this)) {
				return true;
			} else {
				return false;
			}
	
		},
		//验证邮箱是否合法
		isMail : function() {
			///^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
			return (new RegExp(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/).test(this));
		},
		//身份号验证
		isIDNumber : function() {
			return (new RegExp(/^\d{15}|\d{17}[A-Z]$/).test(this));
		},
		//字母下画线和数字 并且字母开头 3 - 16位
		isUserName : function() {
			var pattern = /^[a-zA-Z][a-zA-Z0-9_]{1,14}[a-zA-Z0-9]$/i; // 用户名只能是字母下画线和数字 并且字母开头 3 - 16位
			if (pattern.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		// 末字是否有下划线	
		isLastLine : function() {
			var patternLastChar = /^[a-zA-Z0-9_]{1,15}_$/i; // 末字符不能是下划线
			if (patternLastChar.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		// 开头字符必须为字母
		isFirstLetter : function() {
			var patternFirstChar = /^[0-9_][a-zA-Z0-9_]{1,14}$/i; // 开头字符必须为字母
			if (patternFirstChar.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		/*
		 用途：校验ip地址的格式
		 输入：strIP：ip地址
		 返回：如果通过验证返回true,否则返回false；
		 */
		isIP : function() {
			if (isNull(this)) return false;
			var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
			if (re.test(this)) {
				if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
			}
			return false;
		},
	
		/* 
		 用途：检查输入对象的值是否符合整数格式
		 输入：str 输入的字符串
		 返回：如果通过验证返回true,否则返回false
		 */
		isInteger : function() {
			var regu = /^[-]{0,1}[0-9]{1,}$/;
			return regu.test(this);
		},
		/* 
		 用途：检查输入字符串是否符合正整数格式
		 输入：
		 s：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		isNumber : function() {
			var regu = "^[0-9]+$";
			var re = new RegExp(regu);
			if (this.search(re) != -1) {
				return true;
			} else {
				return false;
			}
		},
	
		/* 
		 用途：检查输入字符串是否是带小数的数字格式,可以是负数
		 输入：
		 s：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		 isDecimal : function() {
			if (isInteger(this)) return true;
			var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
			if (re.test(this)) {
				if (RegExp.$1 == 0 && RegExp.$2 == 0) return false;
				return true;
			} else {
				return false;
			}
		},
		/* 
		 用途：检查输入对象的值是否符合端口号格式
		 输入：str 输入的字符串
		 返回：如果通过验证返回true,否则返回false
		 */
		isPort : function() {
			return (isNumber(this) && str < 65536);
		},
	
		/* 
		 用途：检查输入字符串是否符合金额格式
		 格式定义为带小数的正数，小数点后最多三位
		 输入：
		 s：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		isMoney : function() {
			var regu = "^[0-9]+[\.][0-9]{0,3}$";
			var re = new RegExp(regu);
			if (re.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		/* 
		 用途：检查输入字符串是否只由英文字母和数字和下划线组成
		 输入：
		 s：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		 isNumberOr_Letter : function() { 
			var regu = "^[0-9a-zA-Z\_]+$";
			var re = new RegExp(regu);
			if (re.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		/* 
		 用途：检查输入字符串是否只由英文字母和数字组成
		 输入：
		 s：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		isNumberOrLetter : function() { //判断是否是数字或字母 
			var regu = "^[0-9a-zA-Z]+$";
			var re = new RegExp(regu);
			if (re.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		/* 
		 用途：检查输入字符串是否只由汉字、字母、数字组成
		 输入：
		 ＆#118alue：字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		 isChinaOrNumbOrLett : function() { //判断是否是汉字、字母、数字组成 
			var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
			var re = new RegExp(regu);
			if (re.test(this)) {
				return true;
			} else {
				return false;
			}
		},
		/* 
		 用途：判断是否是日期
		 输入：date：日期；fmt：日期格式
		 返回：如果通过验证返回true,否则返回false
		 */
		isDate : function(fmt) {
			if (fmt == null) fmt = "yyyyMMdd";
			var yIndex = fmt.indexOf("yyyy");
			if (yIndex == -1) return false;
			var year = this.substring(yIndex, yIndex + 4);
			var mIndex = fmt.indexOf("MM");
			if (mIndex == -1) return false;
			var month = this.substring(mIndex, mIndex + 2);
			var dIndex = fmt.indexOf("dd");
			if (dIndex == -1) return false;
			var day = this.substring(dIndex, dIndex + 2);
			if (!isNumber(year) || year > "2100" || year < "1900") return false;
			if (!isNumber(month) || month > "12" || month < "01") return false;
			if (day > getMaxDay(year, month) || day < "01") return false;
			return true;
		},
	
		getMaxDay : function(year, month) {
			if (month == 4 || month == 6 || month == 9 || month == 11) return "30";
			if (month == 2) if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) return "29";
			else return "28";
			return "31";
		},
		/* 
		 用途：检查输入的起止日期是否正确，规则为两个日期的格式正确，
		 且结束如期>=起始日期
		 输入：
		 startDate：起始日期，字符串
		 endDate：结束如期，字符串
		 返回：
		 如果通过验证返回true,否则返回false
		 */
		isBetweenDate : function(startDate, endDate) {
			if (!isDate(startDate)) {
			   // alert("起始日期不正确!");
				return false;
			} else if (!isDate(endDate)) {
			  //  alert("终止日期不正确!");
				return false;
			} else if (startDate > endDate) {
				//alert("起始日期不能大于终止日期!");
				return false;
			}
			else if(this > startDate && this < endDate)
			{
				return true;
			}
			return false;
		}
	}
})(String)
/*
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

   czy.tab = function(selector,options) {
        
        var _options = {
            type			: 	"fade",	// fade 渐变,horizontal 横向,vertical 纵向,normal 无特效
            event			: 	"mouseover", 	// hover && click
            isAuto			: 	false, 		// 自动
            index			: 	0,          // 当前index
            backIndex		: 	0,          // 上一index
			tagName			:	"tab-tag",   // 绑定切换事件的选择器名称
			innerName		:	"tab-inner" , // 切换内容的选择器名
            interval		: 	2000,         
			cssCurrent		: 	"current",     // 当前样式名称
			cssNormal		: 	"normal",
			speed			:	"slow",
			easing			:	"easeOutExpo"
        };
        var options = $.extend(_options, options);
		
		var el = selector.each(function(){
				var _this = this, $this = $(this) ;
				$this.show();
				//事件
				this.beginChange = function(fn){ $this.addEvent(this,"beginChange",fn)};// 开始切换响应事
				this.endChange= function(fn){ $this.addEvent(this,"endChange",fn)};  // 切换后响应事件
				this.width = $this.width();
				this.height = $this.height();
				this.tag = $this.find(':[data-el='+ options.tagName +']');
				this.inner = $this.find(':[data-el='+ options.innerName +']');
				this.timer = null;
				this.index = options.index;
				this.backIndex = this.index;
				this.count = 0 ;
				this.eventType = options.event;
				this.type = options.type;
				this.isAuto = options.isAuto;
				this.interval = options.interval;
				this.css = { current : options.cssCurrent , normal : options.cssNormal };
				function init()
				{
					_this.tag.css({'z-index' : 2 , 'position' : 'relative'});
					_this.inner.wrapAll("<div></div>");
					
					var tagChildren = _this.tag.children();
					var innerChildren = _this.inner.children().show();
	
					var innerWidth = _this.inner.width();
					var innerHeight = _this.inner.height();
					_this.inner.children().width(innerWidth);
					_this.inner.children().height(innerHeight);
					
					_this.inner.parent().css({"position":"relative",'overflow':'hidden'});
					_this.inner.parent().addClass(_this.inner.attr('class')).attr('style',_this.inner.attr('style'));
					_this.inner.removeAttr('class').removeAttr('style');
				
					_this.count = innerChildren.length;
					
					//动画类型
					switch (_this.type) {
					case "fade":
						 innerChildren.css({"position":"absolute",left:0,top:0});  
						 break;
					case "horizontal": 
						_this.inner.css({'position':'absolute',left:0,top:0,width: innerWidth * _this.count,height:innerHeight});
						//_this.inner.parent().css({'overflow':'hidden'});
					    innerChildren.css({"float":"left"});
						break;
					case "vertical": 
						_this.inner.css({'position':'absolute',left:0,top:0, height:'auto',width: innerWidth});
						//_this.inner.parent().css({'overflow':'hidden'});
						break;
					default: break;
					};
					
					
				    bind();
	                _this.index = 0 ;
	                var o = _this.tag.children(':not(:eq('+ _this.index +'))').addClass(_this.css.normal);
					
					_this.tag.children(':eq('+ _this.index +')').addClass(_this.css.current);
	                if (_this.type == "fade" || _this.type == "normal") {
						_this.inner.children(':not(:eq('+ _this.index +'))').hide();
						_this.inner.children(':eq('+ _this.index +')').show();
					}

					//事件绑定
				   if(_this.isAuto)
				   {
					   _this.index -- ;
					   _this.start();
				   }
                   
				}
				
				var bind = function()
				{
					_this.tag.hover(function(){ if(_this.isAuto){ _this.stop();}},function(){ if(_this.isAuto){ _this.start();}	})
					
					_this.tag.children().each(function(i,n){
					      $(n).bind(_this.eventType.toString(),function(){										
						 	  _this.change(i);
						  })
					})
	                if(_this.isAuto)
				    {
						_this.inner.hover(function(){
							_this.stop();
						},function()
						{
							_this.start();
						})	   
				    }
				}
				
				var normal = function(tempObj,currentObj)
				{
					tempObj.hide();
					currentObj.show();
				}
				
				var fade = function (tempObj,currentObj)
				{
					 
					tempObj.fadeOut("slow");
					currentObj.fadeIn("slow",function(){});
				}
			    
				var horizontal = function(obj)
				{
					obj.stop(true,true).animate({"left":-(obj.children().width() * _this.index)},_this.speed, _this.easing,function(){});
				}
				
				var vertical = function(obj)
				{
					obj.stop(true,true).animate({"top":-(obj.children().height() * _this.index)},_this.speed, _this.easing,function(){});
				}
				
				var tagChange  = function(tag,backIndex,index)
				{
					var tempObj = tag.children(':eq('+ backIndex +')');
					var currentObj = tag.children(':eq('+ index +')');
					
					tempObj.removeClass(_this.css.current).addClass(_this.css.normal);
					currentObj.addClass(_this.css.current).removeClass(_this.css.normal);
					
					tempObj.stop(true,true);
					tempObj.fadeTo("fast", 0.8, null);
					currentObj.stop(true,true);
					currentObj.fadeTo("fast", 1, null);
				}

				var innerChange = function(inner,backIndex,index)
				{
					var tempObj = inner.children(':eq('+ backIndex +')');
					var currentObj = inner.children(':eq('+ index +')');
					if(index != backIndex)
					{
						switch (_this.type) {
							case "fade":
								inner.children().stop(true,true);
								fade(tempObj,currentObj);
								break;
							case "horizontal":
								horizontal(inner);
								break;
							case "vertical":
								vertical(inner);
								break;
							default:
								normal(tempObj,currentObj);
								break;
						}
					}
				
				}
				
				function setRightIndex()
				{
					if(_this.index > _this.count - 1)
					{
						_this.index = 0 ;
					}
					else if(_this.index < 0)
					{
						_this.index = _this.count - 1;
					}
					return _this.index;
			    }
				

			   this.stop = function()
			   {
				 
				  clearTimeout(_this.timer);
			   }
			   
			   this.start = function()
			   {
				  
				   _this.next();
				   _this.timer = setTimeout(_this.start,_this.interval);
				   return _this;
			   }
			   

			   //鼠标响应事件
			   this.change = function(index)
			   {
				   _this.index = index ;
				   setRightIndex();
				   $this.doEvent(this,'beginChange',{el : $this , o : _this , index: index, backIndex: _this.backIndex });
				   tagChange(_this.tag,_this.backIndex,_this.index);
				   innerChange(_this.inner,_this.backIndex,_this.index);
				   $this.doEvent(this,'endChange',{el : $this , o : _this , index: index , backIndex : _this.backIndex });
				   _this.backIndex = _this.index;
				  
			   }
		
				this.prev = function()
				{
					_this.index --;
					_this.change(_this.index);
					return _this; 
				}
				
				this.next = function()
				{
					_this.index ++;
					_this.change(_this.index);
					return _this; 
				}
				
				init();
		});
		return el.length <= 1 ? el[0]: el;
    }
	
	$(document).ready(function()
	{
		if($(":[data-el=tab]").length>0)
		{
			//$(":[data-el=tab]").tab();
			new czy.tab($(":[data-el=tab]"));
			
		}
		
	})

})(jQuery);

/* 
* http://www.caizhongyi.com  
* http://www.crazyproduct.net  

* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 0
  
* Copyright @ 2000-2011 Cai ZhongYi Software All Rights Reserved
*/
(function ($) {
    /*
      @remark :
    */
    $.fn.imgView = function (options) {
	    var _options = {
			/* params */
			prevName   	    :   'prev',
			nextName		:	'next',
			imgListName     :   'imglist',
			animateSpeed	:	'slow',
			animateEasing	:	'easeOutExpo',
			type	        :   'horizontal' //vartical
		};
		/* 全局 */
	    /* this.Config = $.extend({},$.fn.CZYfun.options,options); */
        // Extend our default options with those provided.    
        var options = $.extend(_options, options);  
        var el = this.each(function(i,n){
	        var _this = this,$this = $(this);
		    var moveVal = 0 ;
			var maxLength = 0 ;
			var imgList = null;
			var _init = function()
			{
				imgList = $this.find(':[data-el='+ options.imgListName+']');

				_this.count = imgList.children().length;
				_this.width = imgList.width();
				_this.height = imgList.height();
				
				imgList.parent().css({'position':'relative','overflow':'hidden'});

				imgList.css({'position':'absolute',left:0,top:0});

				
				$this.find(':[data-el='+options.prevName+']').bind('click',function(){
				   _this.prev();
				})
				$this.find(':[data-el='+options.nextName+']').bind('click',function(){
				   _this.next();
				})
				
				switch(options.type)
				{
					case 'horizonal':
						 imgList.width(_this.count * imgList.children().width());
						 imgList.children().css('float','left');
						 imgList.addClass('clearfix'); 
						 moveVal =  imgList.children().width();
						 break;
					case 'vertical' : 
						imgList.height(_this.count * imgList.children().height());
						moveVal =  imgList.children().height();
						
						break;
					default : 
						 imgList.width(_this.count * imgList.children().width());
						 imgList.children().css('float','left');
						 imgList.addClass('clearfix'); 
						 moveVal =  imgList.children().width();
						 break;break;
				}
				maxLength = moveVal * _this.count;
			}
             
			var getCurrentPos = function()
			{
				imgList.stop(true,true);
				var val = 0;
				switch(options.type)
				{
					case 'horizonal': val = imgList.css('left').replace('px','');break;
					case 'vertical' : val = imgList.css('top').replace('px','');break;
					default :  val = imgList.css('left').replace('px','');break;
				}
				return val;
				
			}
			 
			this.move = function(val)
			{
				switch(options.type)
				{
					case 'horizonal': imgList.animate({left:val},options.animateSpeed,options.animateEasing); break;
					case 'vertical' : imgList.animate({top:val},options.animateSpeed,options.animateEasing);break;
					default : imgList.animate({left:val},options.animateSpeed,options.animateEasing);break;
				}
				
			}
			
			
			this.prev = function()
			{
				var val = '-='+(moveVal);
				
				if(getCurrentPos() - (moveVal *2) >= - maxLength )
				{
					_this.move(val);
				}
			}
			this.next = function()
			{
				var val = '+='+(moveVal);
				
				if(getCurrentPos()  + moveVal  <= 0)
				{
					_this.move(val);
				}
			}
			_init();
		})
        return el.length <= 1 ? el[0]: el;
    }
	
	$(document).ready(function(){
	   $(':[data-el=imgView]').imgView();
	})
	/* 全局 */
	//$.fn.CZYfun.options = {/* params */};
})(jQuery);
// JavaScript Document
;(function( czy , $  ) {
	czy.ui.core.setAttr = function(obj,options)
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
	
	

})( czy , jQuery)
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
	czy.ui.accordionItem = function(selector,options)
	{
		var _options={
			height			:	"auto",
			width			:	"auto",
			status			:	"hide",
			trunRound		:	false,  //鼠标移开对像后自动回缩
			eventType		:	"mouseover",
			type			:	"normal",  //select && normal
			speed			:	"slow",
			easing			:	"easeOutExpo",
			selectorTag		:	".accor-tag",
			selectorInner	:	".accor-inner",
			minHeight		:	0
		}
	   	var options= $.extend(_options, options);
		this.obj = $(selector) ;
		
		this.tag = this.obj.find(options.selectorTag);
		this.inner = this.obj.find(options.selectorInner);
		this.beforeShow = new czy.delegate();
		this.beforeHide = new czy.delegate();
		this.afterShow = new czy.delegate();
		this.afterHide = new czy.delegate();
		//czy.ui.event.add( this , ['beforeShow' , 'beforeHide' , 'afterShow', 'afterHide']);
		czy.ui.core.setAttr( this , options);
		this.init.apply(this, arguments); 

		return this;
	}
	czy.ui.accordionItem.init = function(selector , options)
	{
		 var objects = [];
	     $(selector).each(function(i , n){
			var o = $(n);
			objects.push(new czy.ui.accordionItem(o),options);
         })
		 return objects;
		
	}
	czy.ui.accordionItem.prototype = {
	   init : function(){
		    var _this = this;
		 	this.height = this.height == "auto"? this.inner.height() :  this.height;
				
			if(this.status == "hide")
			{
				this.inner.height(this.minHeight).css({'opacity' : this.getEndOpacity() , 'overflow' : 'hidden'});
			}
					
			if(this.isTrunRound)
					this.obj.hover(function(){},function(){ _this.hide(); });
						
			this.tag.bind(this.eventType.toString(),function()
			{
				_this.toggle();
			})
			return this;
	   },
	   getEndOpacity : function()
	   {
		   return this.minHeight != 0 ? 1 : 0 ;
	   },
	   show : function(){
		  	this.beforeShow.run();
			var _this = this;
			this.inner.stop();
			_this.status = "running";
			this.inner.animate({ height : this.height , opacity : 1 }, this.speed , this.easing, function(){
				_this.status = "show";
				_this.afterShow.run();
			});
			return this;
	   },
	   hide : function(){
		    this.beforeHide.run();
		    var _this = this;
			this.inner.stop();
			_this.status = "running";
			this.inner.animate({ height: this.minHeight , opacity :  this.getEndOpacity()}, this.speed ,this.easing,function(){
				_this.status = "hide";
				_this.afterHide.run();
	  	    });
			return this;
	   },
	   toggle : function(){
		   if(this.status == "show" )
		   {
				this.hide();
		   }
		   else if(this.status == "hide")
		   {
				this.show();
		   }
		   return this;
	   }
	}
	
	
	czy.ui.accordion = function(selector,options)
	{
		var _options = {
			selectorItem    :   '.accor-item',
			showMaxCount    :   1	
		}
	   	var options= $.extend(_options, options);
        var $this = $(selector);
		var _this = this;
	    this.isRun = false ;
		czy.ui.core.setAttr(this , options);
		this.currentShowCount = 0 ;
		this.itemObj = $this.find(options.selectorItem);
		this.count = this.itemObj.length;
		this.index = 0 ;
		this.backIndex = this.count - 1;
		this.init.apply(this,arguments);
        this.items = new Array();
		this.itemObj.each(function(i,n){
			$(n).attr('data-index',i);
			var el = new czy.ui.accordionItem($(n),options);
			el.beforeShow.add(function(){_this.isRun = true;})
			el.afterShow.add(function(){_this.isRun = false;})
			_this.items.push(el);
			el.tag.unbind(el.eventType);
			el.tag.bind(el.eventType.toString(),function(){_this.show($(n).attr('data-index'));})
		})

		this.show.apply(this,[this.index]);
		return this;
	}
	
	czy.ui.accordion.prototype = {
		init : function(){
			var _this = this;
		},
		hide : function(index){
			this.items[index].hide();
			this.currentShowCount -- ;
		},
		show : function(index){
			//alert(this.index);
			this.index = index ;
			$(this).stop(true,true);
			//if(!this.isRun)
			//{
				this.items[this.index].show();
				if(this.index != this.backIndex  )
				{
					this.currentShowCount ++;
					this.items[this.backIndex].hide();
					this.backIndex = this.index ;
				
				}
			//}
			
		}
	}
		/*
		@author 	: czy
		@description: 下拉框效果
		@date   	: 2011/5/17
		@dependent 	: jquery.js
		*/
		czy.ui.select = function(selector,options)
		{
			$this = $(this);
			_this = this;
			var _options = { eventType : 'mouseover'};
			var options = $.extend(_options, options);
			czy.ui.core.setAttr(this , options);
			//this.controls = czy.ui.core.init(selector,czy.ui.accordionItem,options);
			this.selecotr = selector;
			this.controls = new  czy.ui.accordionItem(selector , options);
			this.selected  = new czy.delegate();
			this.selectedIndex = -1;
			this.count = 0 ;
			this.items = new Array();
			this.init.apply(this,arguments);

		}
		
		czy.ui.select.prototype = {
		   init : function()
		   {
			   var _this = this;
			   var $this = $(this.selecotr).css({'position':'relative'});
			   $(this.controls).each(function( i , n){
			        var o =  n;
					var tag = o.tag;
					var inner = o.inner;
					$(o).css({'position' : 'relative'});
					//tag.css({'position' : 'absolute'});
					tag.unbind(_this.eventType.toString());
					tag.bind(_this.eventType.toString(),function(){_this.controls.show()});
					inner.children().click (function(){
						_this.controls.hide();
						_this.selected.run(_this.index);
					});
					tag.bind('mouseout',function(){_this.controls.hide();});
					inner.children().each(function(i,n){
						var item = { text : '' , value : '' , index : 0 , html : '' };
						item.text = $(n).text();
						item.html = $(n).html();
						item.value = $(n).text();
						item.index = i;
						_this.items.push(item);
					})
					inner.hover(function(e){_this.controls.show();},function(e){_this.controls.hide();})
			   })
			   
		   }
		}
		
		$(document).ready(function()
		{
			if($(":[data-el = accordionItem]").length > 0)
			{
				czy.ui.core.init(":[data-el = accordionItem]", czy.ui.accordionItem , null);
			}
			if($(":[data-el = accordion]").length > 0)
			{
				czy.ui.core.init(":[data-el = accordion]", czy.ui.accordion , null);
			}
			if($(":[data-el = select]").length > 0)
			{
				czy.ui.core.init(":[data-el = select]", czy.ui.select , null);
			}
		})
})(jQuery);﻿
 