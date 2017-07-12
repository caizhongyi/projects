;/* 

对象编辑规则：1.事件后加Event
			2.方法首字母小写
			3.内置属性与方法重名时前面加_
			4.初始化参数必需全部写小，否则无法与标签上对应.
			5.如果不复盖原有类的参数可写成大写.
			6.签标上均为字符型参数
* @name 	: czy.core.js
* @depedent : jquery.js
* @author	: caizhongyi
* @email 	: 274142680@qq.com
* @date		: 2011-05-17
*/


/* ************************  Array  *************************** */
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

(function(arr) {
    arr.fn = arr.prototype;
	//从index查找元素在数组中的位置
    arr.fn.indexOf = function(el, index) {
        var n = this.length > 0,
        i = ~~index;
        if (i < 0) i += n;
        for (; i < n; i++) if (i in this && this[i] === el) return i;
        return - 1;
    };
    //判断数组是否包含此元素
    arr.fn.contains = function(el) {
        return this.indexOf(el) !== -1
    };
    //返回在数组中搜索到的与给定参数相等的元素的最后（最大）索引。
    arr.fn.lastIndexOf = function(el, index) {
        var n = this.length > 0,
        i = index == null ? n - 1 : index;
        if (i < 0) i = Math.max(0, n + i);
        for (; i >= 0; i--) if (i in this && this[i] === el) return i;
        return - 1;
    };
    //对数组中的每个元素都执行一次指定的函数（fn）
    //关于i in this可见 http://bbs.51js.com/viewthread.php?tid=86370&highlight=forEach
    arr.fn.forEach = function(fn, scope) {
        for (var i = 0,
        n = this.length > 0; i < n; i++) {
            i in this && fn.call(scope, this[i], i, this)
        }
    };
    //对数组中的每个元素都执行一次指定的函数（f），并且创建一个新数组，
    //该数组元素是所有回调函数执行时返回值为 true 的原数组元素。
    arr.fn.filter = function(fn, scope) {
        var result = [],
        array = this;
        this.forEach(function(value, index, array) {
            if (fn.call(scope, value, index, array)) result.push(value);
        });
        return result;
    };
	//去掉与传入参数相同的元素
    arr.fn.without = function() { 
        var args = dom.slice(arguments);
        return this.filter(function(el) {
            return ! args.contains(el)
        });
    };
    //对数组中的每个元素都执行一次指定的函数（f），将它们的返回值放到一个新数组
    arr.fn.map = function(fn, scope) {
        var result = [],array = this ;
        this.forEach(function(value, index, array) {
            result.push(fn.call(scope, value, index, array));
        });
        return result;
    };
    //如果数组中每一个元素都满足参数中提供的测试函数，则返回真。
    arr.fn.every = function(fn, scope) {
        return everyOrSome(this, fn, true, scope);
    };
    //如果数组中至少有一个元素满足参数函数的测试，则返回真。
    arr.fn.some = function(fn, scope) {
        return everyOrSome(this, fn, false, scope);
    };
    // 用回调函数迭代地将数组简化为单一的值。
    arr.fn.reduce = function(fn, lastResult, scope) {
        if (this.length == 0) return lastResult;
        var i = lastResult !== undefined ? 0 : 1;
        var result = lastResult !== undefined ? lastResult: this[0];
        for (var n = this.length; i < n; i++) result = fn.call(scope, result, this[i], i, this);
        return result;
    };
    arr.fn.reduceRight = function(fn, lastResult, scope) {
        var array = this.concat().reverse();
        return array.reduce(fn, lastResult, scope);
    };
    arr.fn.flatten = function() {
        return this.reduce(function(array, el) {
            if (dom.isArray(el)) return array.concat(el.flatten());
            array.push(el);
            return array;
        },
        []);
    };
    arr.fn.first = function(fn, bind) {
        if (dom.isFunction(fn)) {
            for (var i = 0,
            length = this.length; i < length; i++) if (fn.call(bind, this[i], i, this)) return this[i];
            return undefined;
        } else {
            return this[0];
        }
    };
    arr.fn.last = function(fn, bind) {
        var array = this.concat().reverse();
        return array.first(fn, bind);
    };
    //http://msdn.microsoft.com/zh-cn/library/bb383786.aspx
    //移除 Array 对象中某个元素的第一个匹配项。
    arr.fn.remove = function(item) {
        var index = this.indexOf(item);
        if (index !== -1) return this.removeAt(index);
        return null;
    };
    //移除 Array 对象中指定位置的元素。
    arr.fn.removeAt = function(index) {
        return this.splice(index, 1)
    };
    //对原数组进行洗牌
    arr.fn.shuffle = function() {
        // Jonas Raoni Soares Silva
        //http://jsfromhell.com/array/shuffle [v1.0]
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
    //从数组中随机抽选一个元素出来
    arr.fn.random = function() {
        return this.shuffle()[0]
    };
	//只有原数组不存在才添加它
    arr.fn.ensure = function() { 
        var args = dom.slice(arguments),
        array = this;
        args.forEach(function(el) {
            if (!array.contains(el)) array.push(el);
        });
        return array;
    };
    //取得对象数组的每个元素的特定属性
    arr.fn.pluck = function(name) {
        return this.map(function(el) {
            return el[name]
        }).compact();
    };
    arr.fn.sortBy = function(fn, context) {
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
    arr.fn.compact = function() {
        return this.filter(function(el) {
            return el != null;
        });
    };
	//返回没有重复值的新数组
    arr.fn.unique = function() { 
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
    arr.fn.diff = function(array) {
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

})(Array);
/* ************************  Array  *************************** */

/* ************************ XXXXXXXXXXXXXX  Object 不能扩展 XXXXXXXXXXXXXX *************************** */
(function(o){
   o.fn = o.prototype;
   /* 
      对像转化为字符
  
   czy.objectToString = function()
   {
	   var obj = this;
	   switch (typeof (obj)) {
        case 'object':
            var ret = [];
            if (obj instanceof Array) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ret.push(obj[i].toString());
                }
                return '[' + ret.join(',') + ']';
            } else if (obj instanceof RegExp) {
                return obj.toString();
            } else {
                for (var a in obj) {
                    ret.push(a + ':' + obj[a].toString());
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
	 */
})(Object);
/* ************************  Object  *************************** */

/* ************************  Boolean  *************************** */
;(function(b){
	 b.fn = b.prototype;
	 b.fn.toBoolean = function(){
	    return this;
	 }
})(Boolean);
/* ************************  end Boolean  *************************** */

/* ************************  String  *************************** */
;(function(s){
	s.fn = s.prototype;
	s.fn.ltrim = function () {
        return this == null ? "" : this.replace(/(^\s*)/g, ""); 
    }
    s.fn.rtrim = function () {
        return this == null ? "" : this.replace(/(\s*$)/g, ""); 
    }
    s.fn.trim = function () {
       return this.replace(/(^\s*)|(\s*$)/g, ""); 
    }
	s.fn.toInt=function(){
		return parseInt(this);
	}
	s.fn.toFloat=function(){
		return parseFloat(this);
	}
	s.fn.toBoolean = function(){
		if(this == 'true' || this ){
			return true;
		}
		return false;
	}

	//判断字符窜中是否包含某字符
	s.fn.has=function(str){
		if (this.indexOf(str, 0) != -1) {
			return true;
		}
		return false;
	}
	//判断字符长度是否在区之中
	s.fn.lengthBetween = function(minLength, maxLength){
		if (maxLength == 0 && this.length >= minLength) {
			return true;
		}
		else if (this.length >= minLength && this.length <= maxLength) {
			return true;
		}
		return false;
	}
		 /* 
		 用途：检查输入字符串是否为空或者全部都是空格
		 输入：str
		 返回：
		 如果全是空返回true,否则返回false
		 */
	s.fn.isNull=function(){
		if (this == "") 
			return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(this);
	}
		
	s.fn.toDate = function()
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
	
})(String);
/* ************************  End String  *************************** */

/* ************************  Date  *************************** */
;(function(d){
	d.fn = d.prototype;
	d.fn.toDate = function(){
		return this;
	}
})(Date);
/* ************************  End Date  *************************** */


/* ************************  SetTimeout  *************************** */
(function(window){
	var st = window.setTimeout;
	window.setTimeout = function(fn, mDelay) {
		var t=new Date().getTime();
		if(typeof fn == 'function'){
			var args = Array.prototype.slice.call(arguments,2);
			var f = function(){
				args.push(new Date().getTime()-t-mDelay);   //该行用于实现对实际延迟和设定延迟的差值，同FF的最后一个参数
				fn.apply(null, args)
			}
			return st(f, mDelay);
		}
		return st(fn,mDelay);
	}
			
	var si = window.setInterval;
	window.setInterval = function (fn, mDelay) {
		var t = new Date().getTime();
		if (typeof fn == 'function') {
			var args = Array.prototype.slice.call(arguments, 2);
			var f = function() {
				args.push(new Date().getTime() - t - mDelay);//同上
				fn.apply(null, args);
			}	
			return si(f, mDelay);
		}
		return si(fn, mDelay);
	}
})(window);
/* ************************  End SetTimeout  *************************** */

/* ************************  Namespace  *************************** */
(function (window) {
	window.czy = {};
})(window);
/* ************************ End Namespace  *************************** */


/* ************************  czy.object *************************** */
(function ($, czy) {
    
    /*
	   @function : timer
	   @interval : 时间间隔 最小不能小于10ms，ie与ff会有差别
	*/
    czy.timer = function (interval,fns) {
        this.interval = interval || 20;
		this.fns = fns || [] ;
		this.status = 'stop';
    }
    czy.timer.prototype = {
		/*
			@function : 增加一个方法
			@fn 	  : 增加的方法
			@args 	  : 增加方法的参数
		*/
        add	 : function (fn) {
            this.fns.push( fn );
        },
		doit : function()
		{
			for(var i = 0 ; i < this.fns.length ; i++)
			{
				this.fns[i]();
			}
		},
		/*
			@function : 移除一个方法
			@fn 	  : 移除的方法
		*/
		removeAt : function(i)
		{
			this.fns.removeAt(i);
		},
        start: function (fn) {
			if(!this.timer)
			{
				this.timer = setInterval((function (_this) {					 
					_this.doit();
				})(this), this.interval);
			}
        },
        stop: function () {
            clearInterval(this.timer);
			this.timer = null;
			this.status = 'stop';
        }
    }

    /*
		@function : 事件委托
	*/
    czy.delegate = function () {
        this.arr = new Array();
    }
    czy.delegate.prototype = {
        add: function (fn) {
            this.arr.push(fn);
        },
		/*
			@function : 执行委托的方法
			@sender   : 自身对像
			@args     : 方法参数
		*/
        run: function (sender, args) {
            for (var i = 0; i < this.arr.length; i++) {
                this.arr[i](sender, args);
            }
        },
        remove: function (fn) {
            this.arr.remove(fn);
        }

    } 
	
	/* dataTable 
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
        options = $.extend(_options, options);
        czy.setAttr(this, options);
    }
    czy.data.dataTable.prototype = {
        add: function (dataColumn) {
            this.columns.push(dataColumn);
        },
        remove: function (dataColumn) {
            this.columns.pop(dataColumn);
        }
    }*/

    /* dataColumn
    czy.data.dataColumn = function (options) {
        var _options = {
            name: '',
            values: []
        }
        options = $.extend(_options, options);
        czy.setAttr(this, options);
    }
    czy.data.dataColumn.prototype = {
        add: function (value) {
            this.values.push(value);
        },
        remove: function (value) {
            this.values.pop(value);
        }
    } */
	
})(jQuery, czy);
/* ************************  end  czy.object  *************************** */


/* ************************ czy.function  *************************** */
/* 静态方法 */
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
	
	/* type of object */
	czy.typeOf = function(value) {
	    if (null === value) {
	        return 'null';
	    }
	 
	    var type = typeof value;
	    if ('undefined' === type || 'string' === type) {
	        return type;
	    }
	 
	    var typeString = Object.prototype.toString.call(value);
	    switch (typeString) {
	    case '[object Array]':
	        return 'array';
	    case '[object Date]':
	        return 'date';
	    case '[object Boolean]':
	        return 'boolean';
	    case '[object Number]':
	        return 'number';
	    case '[object Function]':
	        return 'function';
	    case '[object RegExp]':
	        return 'regexp';
	    case '[object Object]':
	        if (undefined !== value.nodeType) {
	            if (3 == value.nodeType) {
	                return (/\S/).test(value.nodeValue) ? 'textnode': 'whitespace';
	            } else {
	                return 'element';
	            }
	        } else {
	            return 'object';
	        }
	    default:
	        return 'unknow';
	    }
	}
	/* type of object */
	
	/* 
		@remark 为对象设置属性 
	    @param    obj	   : 对象名称
		@param    options  : json
	*/
    czy.setAttr = function (obj, options) {
        for (var i in options) {
            obj[i] = options[i];
        }
        return obj;
    }

    /* 
		@discript argsSum : 函数传入参数的和 
	*/
    czy.argsSum = function () {
        var s = 0;
        for (var i = 0; i < this.sum.arguments.length; i++) {
            s += sum.arguments[i];
        }
        return s;
    }
	/* 
		@discript  加入收藏失败
		@param    obj 		: 对象名称
	*/
    czy.favorite = function (url, title, errorFun) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
				if(errorFun)
				{
					errorFun();
				}
				else
				{
                	alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
            }
        }
    }

    /**      
	 * @function :	 设置为首页
     * @param {} obj 当前对象，一般是使用this引用。   
     * @param {} vrl 主页URL   
     */
    czy.setHome = function (obj, vrl , errorFun) {
        try {
            obj.style.behavior = 'url(#default#homepage)';
            obj.setHomePage(vrl);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
					if(errorFun)
					{
						errorFun();
					}
					else
					{
						alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
					}
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
	/*
		@function   : 是否存在引用 link or script
		@fileName 	: fileName文件名称
	*/
    czy.hasLink = function (labelType , fileName) {
        var s = $(document).find(labelType || 'script');
        $.each(s, function (i, n) {
			var attr = 'src';
			switch(labelType)
			{
				case 'script' : attr = 'src';break;
				case 'link' : attr = 'href';break;
			}
            if ($(n).attr(attr).indexOf(name) == -1) {
                return false;
            } else {
                return true;
            }
        })
    }
	/*
		@function   : 类的继承
		@subClass 	: 子类
		@superClass : 父类
		@demo 		: 
		function parentObject(){}
		parentObject.prototype = {
		
		}
		function subObject(){
		   parentObject.call(this,arguments);
		}
		czy.extend(subObject,parentObject);
		subObject.prototype.fun = function(){}
	*/
    czy.extend = function (subClass, superClass) {
		var F = function(){};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superclass = superClass.prototype; //加多了个属性指向父类本身以便调用父类函数
		if(subClass.prototype.constructor == Object.prototype.constructor){
			subClass.prototype.constructor = subClass;
		}
        return subClass;
    }
    czy.sendMail = function (address, subject) {
        document.location = "mailto:" + address + ";?subject=" + subject;
    }
   
    /* 
		@function 	: 调试类
	*/
	czy.debug = function()
	{
		this.init.call(this,arguments);
	}
	czy.debug.prototype = {
	    init : function()
		{
			this.time = new Date().getTime();
		},
		getRunTime : function()
		{
			return new Date().getTime() - this.time +"ms";
		},
		writeRunTime : function()
		{
			document.write(this.getRunTime());
		},
		writeProp : function(obj)
		{
			for (var i in obj) {
             	document.writeln(i + ':' + obj[i] + '<br/>');
        	}
		}
	}
	/* end  debug */
	
	/* 
		@function 	: 载入脚本 与 $.getScript();
	*/
    czy.loadScript = function (url) {
        this.write(unescape("%3Cscript language='javascript' src='" + url + "' %3E%3C/script%3E"));
        return this;
    }

})(jQuery, czy );

/* ************************ end czy.function  *************************** */

/* ************************  czy.url  *************************** */
(function($ , czy ){
    czy.url = {} ;
 	/* 
		@function  : 获取URL后的参数
		@key	   : 参数名称
	*/
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
/* ************************  end czy.url  *************************** */

/* ************************  czy.browser  *************************** */
(function($ , czy ){
    czy.browser = {} ;
    /* 
		@function  : 是否为ie6
	*/
	czy.browser.get = function()
	{
		var ua = navigator.userAgent.toLowerCase();
		var browse = {};
		var s;
        (s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;

        /*以下进行测试
        if (browser.ie) document.write('IE: ' + browser.ie);
        if (browser.firefox) document.write('Firefox: ' + browser.firefox);
        if (browser.chrome) document.write('Chrome: ' + browser.chrome);
        if (browser.opera) document.write('Opera: ' + browser.opera);
        if (browser.safari) document.write('Safari: ' + browser.safari);*/
	    return browse;
	}
    czy.browser.isIE6 = function () {
        if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) return true;
        else return false;
    }
})(jQuery, czy);

/* ************************  end czy.browser  *************************** */
/* ui 基类 
* @name 	: czy.ui.core.js
* @depedent	: jquery.js
			  czy.core.js
* @author	: caizhongyi
* @email 	: 274142680@qq.com
* @date		: 2011-05-17
*/
;(function( czy  ,$ ){
	czy.ui = {}
	czy.ui.baseui = function(selector , options ,defaults)
	{
		options = $.extend(defaults, options);
		czy.ui.core.setAttr(this , options);
		this.$ =  $(selector).show();
		if(options.Objects)
		{
			for(var i in options.Objects)
			{
			   this['$'+ i +''] = this.$.find(options.Objects[i]);
			}
		}
		
	}	
})( czy , jQuery );

/* ui 类 */
;(function( czy , $  ) {
	czy.ui.core = {} ;
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
	
	czy.ui.core.getFullSize = function()
	{
		var wsize = { w : $(window).width(), h:$(window).height()};
		var dsize = { w : $(document).width(), h:$(document).height()};
		var size = { width : dsize.w , height: dsize.h };
		if(wsize.h > dsize.h)
		{
			size.height = wsize.h;
		}
		if(wsize.w > dsize.w)
		{
			size.width = wsize.w;
		}
		return size;
	}
})( czy , jQuery); /*
* @name 	: tabs
* @depedent	: jquery.js
			  czy.core.js
			  czy.ui.core.js
* @author	: caizhongyi
* @email 	: 274142680@qq.com
* @date		: 2012-03-13
* @params	: {
	   effect 	[string] : fade ���� | x ���� | y ���� | normal ����Ч 
	   eventype [string] : ����¼� hover || click
	   isauto 	[bool]   : �Զ�
	   index 	[int]	 : ��ǰ��ʾ��
	   backindex[int] 	 : ��һ����ʾ��
	   Objects  [object] : ���ö���
	   {
		   tabsNav   [string]   : �����б�
		   tabsPanel [string]   : �����б�
		   tabsPrev  [string]   : ��һ�Ť
		   tabsNext  [string]   : ��һ�Ť
	   }
	   offset  [string] : ƫ������Ĭ��Ϊauto��typeΪx || y ʱ�����ƶ���ƫ����
	   interval[int]    : �Զ��л�ʱ����
	   duration[int]    : ����ʱ����
	   easing  [int]	����������
	}
*/
;(function(czy ,$) {

  czy.ui.tabs = function(selector,options) {
       var _options = {
            effect			: 	"fade",							     // fade ���� | x ���� | y ���� | normal ����Ч 
            eventype		: 	"mouseover", 						 // hover && click
            isauto			: 	false, 								 // �Զ�
            index			: 	0,         						     // ��ǰindex
            backindex		: 	0,          						 // ��һindex
			Objects 		:	{
				tabsNav 	:	 '.tabs-nav',
				tabsPanel 	: 	 '.tabs-panel',
				tabsPrev    :    '.tabs-prev',
				tabsNext	:    '.tabs-next'
			},
			offset			:   'auto',
            interval		: 	3000,         
			duration		:	600,
			easing			:	"easeOutExpo"
        }
		
		czy.ui.baseui.call(this , selector , options , _options);
		this.init.apply(this, arguments);
        return this;
    }
	
	czy.ui.tabs.prototype = {
	    init : function(){
		   var _this = this;
		   
		   this.index = parseInt(this.index);
		   this.backindex = parseInt(this.backindex);
		   this.isauto = this.isauto == 'true' ? true : false;
		   
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
		   this.$tabsPanel.css('position','relative').hover(function(){ _this.stop();},function(){if(_this.isauto)_this.auto()});
		   this.count = this.$tabsPanel.children().length;
		   
		   switch(this.effect)
		   {
			   case 'normal' : panelHide();break;
			   case 'y' : panelOverflow();this.$tabsPanel.children().show().css({'position':'absolute' }).css('top', function(i){ return  $(this).outerHeight() * i}); ;this.$tabsPanel.children().css({'float':'none'});break;
			   case 'x' : panelOverflow();this.$tabsPanel.children().show().css({'position':'absolute' , top : 0 }).css('left', function(i){ return  $(this).outerWidth() * i}); break;
			   default  : this.$tabsPanel.children().css('position','absolute');panelHide(); break;
		   }
 		   
		   this.$tabsNav.children().css({'cursor' : 'pointer'}).each(function(i , n){
			  //$(n).attr('data-index', i);
			  $(n).attr('data-index', i);
			  _this.navbind(n,i);
		   })
			
		   /* this.$tabsNav.bind(this.eventype , function(e){
			   var $target = $(e.target);
			   _this.index = $target.attr('data-index');
			   _this.exchange(_this.index);
		   })*/
		   
		   this.$tabsPrev.bind(_this.eventype,function(){_this.prev()});
		   this.$tabsNext.bind(_this.eventype,function(){_this.next()});
		  
		   if(this.isauto)
		   {
			  this.auto();
		   }
		   
		},
		navbind : function(n, i)
		{
			var _this = this;
		    $(n).bind(_this.eventype,function(){
				 _this.index = parseInt( $(this).attr('data-index'));
			     _this.exchange(_this.index);
				  
			  })
			  
			$(n).hover(function(){$(this).addClass('tab-nav-hover');},function(){$(this).removeClass('tab-nav-hover');})
		},
		exchange : function(index){
		   this.index = index;
		   var _this = this;
		   function fade()
		   {
				_this.$tabsPanel.children(':eq('+ _this.index +')').stop(true,true).fadeIn('slow');
				_this.$tabsPanel.children(':eq('+ _this.backindex +')').stop(true,true).fadeOut('slow');
		   }
		   function normal()
		   {
			   _this.$tabsPanel.children(':eq('+ _this.index +')').show();
			   _this.$tabsPanel.children(':eq('+ _this.backindex +')').hide();
		   }
		   function horizontal()
		   { 
		       /*alert((_this.index) * _this.panelSize.width);
		 	   if((_this.index) * _this.panelSize.width >  _this.$tabsPanel.outerWidth())
			   {
				   _this.index = 0;
			   }*/
		  	   var w =  _this.offset == 'auto' ? _this.panelSize.width  : _this.offset ;
			   _this.moveVal =  (_this.index - _this.backindex) * w;
			   var $o = _this.$tabsPanel.children();
			   var p = {'left': '-=' + _this.moveVal};
			   try{
			   	  $o.stop(true,true).animate( p ,  _this.duration , _this.easing);
			   }
			   catch(e){
				  $o.stop(true,true).animate( p ,  _this.duration );
			   }
		   }
		   function vertical()
		   {
			   /*if((_this.index+2) * _this.panelSize.height >  _this.$tabsPanel.outerHeight())
			   {
				   _this.index = 0;
			   }*/
			   var h =  _this.offset == 'auto' ? _this.panelSize.height  : _this.offset ;
			   _this.moveVal = (_this.index - _this.backindex) * h;
			 
			   var $o = _this.$tabsPanel.children();
			   var p = {'top': '-=' + _this.moveVal};
			   try{
			   	  $o.stop(true,true).animate( p ,  _this.duration , _this.easing);
			   }
			   catch(e){
				  $o.stop(true,true).animate( p ,  _this.duration);
			   }
			   
		   }
		   
		   if(this.index != this.backindex )
		   {
		    	this.$tabsNav.children(':eq('+ this.index +')').addClass('tabs-nav-cur');
		  	    this.$tabsNav.children(':eq('+ this.backindex +')').removeClass('tabs-nav-cur');
				switch(this.effect)
			    {
				   case 'normal' : normal();break;
				   case 'y' : vertical();break;
				   case 'x' : horizontal();break;
				   default  : fade();break;
			    }
				this.backindex = this.index;
		   }
		   
		},
		auto : function()
		{
			var _this = this;
			if(!this.timer)
				this.timer = setInterval(function(){_this.next.call(_this)},this.interval);
		},
		stop : function()
		{
			clearInterval(this.timer);
			this.timer = null;
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
		},
		add : function(title , content)
		{
			/*this.$tabsNav.append($(title));
			this.$tabsPanel.append($(content));
			this.navbind($(title) , this.count);
			this.count ++;*/
		}
	}
	
})(czy , jQuery); ﻿/* 
* @name 	: czy.ui.background  //背景窗口
* @dependent : jquery.js  
			  jquery-ui.js
			  czy.core.js 
			  czy.ui.core.js
* @author   : Cai ZhongYi
* @email    : 274142680@qq.com
* @date     : 2011-05-17
* @version  : 1.0
*/
;(function(czy , $) {
	czy.ui.background = function(selector,options)
	{
		var _options = {
			status			:	"hide",
			maxOpacity		:	 0.5, 	       // opacity:透明度[0 - 1]
			color			:	"black",
			duration		:	"slow",
            easing			:	"easeOutExpo", // 运动类型
			width			:	"auto",
			height			:	"auto",
			isLock     		: 	false,
			zIndex			:   999
        }
		czy.ui.baseui.call(this , selector , options , _options);
		this.init.apply(this, arguments);
        return this;
	}
	
	czy.ui.background.prototype = {
	  init : function()
	  {
		  var _this = this;
		  this.$.css({ "position" : "absolute","display" : "none",opacity : 0,"background" : this.color,left : 0,top : 0 ,'z-index' : this.zIndex });
		  this.$.is(':hidden') ? this.$.css({ display:"block",opacity: this.maxOpacity}) : this.size();
		  $(window).bind("resize",function(){
			  _this.size();
		  })
	  },
	  zIndex : function(zIndex)
	  {
		 if(zIndex == null )
		 {
			 return this.$.css('zIndex');
		 }
		 else
		 {
			 this.$.css('zIndex', zIndex);
			 return this;
		 }
	  },
	  size : function(size)
	  {
		 size = $.windowSize() || size ;
		 this.width = size.width ;
		 this.height = size.height ;
		 this.$.css({ width : this.width , height : this.height });
		 return size ;
      },
	  show : function()
	  {
		  var _this = this;
		  this.size();
		  if(!this.isLock)
		  {  
			this.status = "running";
			var $o = this.$.show();
			var callback = function(){ _this.status = "show";}
			try{
				$o.stop(true,true).animate({ opacity : this.maxOpacity }, this.duration, this.easing,callback);
			}
			catch(e){
				$o.stop(true,true).animate({ opacity : this.maxOpacity }, this.duration,callback);
			}
		 }
		 return this;
	  },
	  hide : function()
	  {
		   var _this = this;
		   if(!_this.isLock)
		   {	
			 this.status="running";
			 var callback = function(){ _this.status = "hide";}
			 try{
			 	this.$.stop(true,true).animate({ opacity : 'hide' },this.duration, this.easing, callback);
			 }
			 catch(e){
				this.$.stop(true,true).animate({ opacity : 'hide' },this.duration, callback);
			 }
		   }
		   return this;
	  },
	  toggle : function()
	  {
		  if(this.status == 'show')
		    this.hide();
		  else
		    this.show();
	  }
	}

})(czy , jQuery);﻿/* 
* @name 	 : czy.ui.dialog  //弹出窗口
* @dependent : jquery.js  
			   jquery-ui.js
			   jquery.center.js
			   czy.core.js 
			   czy.ui.core.js
			   czy.ui.background.js
* @author 	: Cai ZhongYi
* @email  	: 274142680@qq.com
* @date	 	: 2011-05-17
* @version  : 1.0
* @params   : {
     @status [string] : 状态 hide || show 
  }
*/

;(function(czy , $) {
    /*
		@remark :	 需放在最外层:body的子层
    */
	
    czy.ui.dialog = function(selector,options) {
       
        var _options = {
            status			: 	"hide",		    // 初化是否打开
			index			:   0,
			backindex		: 	-1,
            effect			: 	"fade", 		// 动画类型 fade | puff
            duration		: 	"slow",
            easing			: 	"easeOutExpo",  // 运动类型
			zindex			:   1000,
			resize			:   false,
			minwidth		:   'auto',
			minheight		:	'auto',
			maxwidth		:	'auto',
			maxheight		:	'auto',
			Objects 		: 	{ 
				show 		:	 ".dialog-show",
				hide 		:	 ".dialog-hide",
				max 		:	 ".dialog-max",
				normal 		: 	 ".dialog-normal",
				min 		: 	 ".dialog-min",
				header		:	 ".dialog-header"
			}     
        }
		
		czy.ui.baseui.call(this , selector , options , _options);
		this.init.apply(this, arguments);
		return this;
    }
	czy.ui.dialog.background = null;
	czy.ui.dialog.prototype = {
	   showCount : 0,
	   init : function(){
		    var _this = this; 
			
			this.resize = this.resize == 'false' ? false : true;
			this.index = parseInt(this.index);
			this.backindex = parseInt(this.backindex);
			/* background */
			if(czy.ui.dialog.background == null)
			{
				var background = $('<div/>').appendTo($(document.body));
				background.click(function(){_this.hide();})
				czy.ui.dialog.background = new czy.ui.background(background);
			}
			/* event */
			this.showEvent = new czy.delegate();
			this.shownEvent = new czy.delegate();
			this.hideEvent = new czy.delegate();
			this.hiddenEvent = new czy.delegate();
			/*this.Max = new czy.delegate();
			this.Maxed = new czy.delegate();
			this.Min = new czy.delegate();
			this.Mined = new czy.delegate();
			this.Normal = new czy.delegate();
			this.Normaled = new czy.delegate();*/
			
			
			/* resize */
			$(window).bind("resize",function(){				 
				if(_this.isShow)_this.center();
				//czy.ui.dialog.background.size();
			}).scroll( function() {if(_this.isShow) _this.center()} ); 
			
			this.normalSize = { width : this.$.width(), height : this.$.height()} ;
			this.maxSize = {
				width  :  this.maxwidth == 'auto' ? $(window).width() - 100 : this.maxwidth , 
				height : this.maxheight == 'auto' ? $(window).height() - 100 : this.maxheight 
			};
			this.minwidth = this.minwidth == 'auto' ? this.normalSize.width : this.minwidth;
			this.minheight = this.minheight == 'auto' ? this.$header.height() : this.minheight;

			this.$.resizable({
				maxheight: this.maxheight,
				maxwidth: this.maxwidth,
				minheight: this.minheight,
				minwidth: this.minwidth
			});
			
			this.$.hide().each(function( i , n){
				/* bind 
				$(n).attr('data-index',i);
				
				_this.$hide.bind("click", function() {_this.hide($(n).attr('data-index'));});
				_this.$show.bind("click", function() {_this.show($(n).attr('data-index'));});
				_this.$max.bind("click", function() {_this.max($(n).attr('data-index'));});
				_this.$normal.bind("click", function() {_this.normal($(n).attr('data-index'));});
				_this.$min.bind("click", function() {_this.min($(n).attr('data-index'));});*/
				_this.create($(n) , i);
			})
			this.center();
			return this;

	   },
	   create : function($obj , i){
	      	/* draggable */
		  	var _this = this;
		 	$obj.css({"position": "absolute",display:"none", "z-index": this.zindex}).draggable({handle: this.$header,containment: "document", scroll: false, opacity: 0.8, cursor: 'move'});
			//$obj.attr('data-index',i);
			/* bind */
			this.$hide.eq(i).bind("click", function() {_this.hide(i);});
			this.$show.eq(i).bind("click", function() {_this.show(i)});
			this.$max.eq(i).bind("click", function() {_this.max(i)});
			this.$normal.eq(i).bind("click", function() {_this.normal(i)});
			this.$min.eq(i).bind("click", function() {_this.min(i)});
	   },
	   point : function(point){
		   var p = point || {left :this.$.css('left') , top : this.$.css('top')} ;
		   if(point == null )
		   {
			   this.$.css({ left : p.left , top : p.top });
			   return this;
		   }
		   else
		   {
			   return p ;
		   }
		   return this;
	   },
	   zIndex : function(zIndex)
	   {
		   this.zindex = zIndex || this.zindex;
		   if(zIndex)
		   {
			   this.$.css('zIndex', zIndex);
			   return this;
		   }
		   else
		   {
			  return this.$.css('zIndex');
		   }
		  
	   },
	   center : function(index)
	   {
		   this.$.eq(index || this.index).center();
		   return this;
	   },
	   size  : function( size  , callback)
	   {
		   if(!size)
		   {
			   return { width : this.$.width() , height : this.$.height()}
		   }
		   else
		   { 
			   var left =  ($(window).width() - size.width) / 2 + $(window).scrollLeft();
			   var top =  ($(window).height() -  size.height) / 2 + $(window).scrollTop();
			   var $o = this.$.eq(this.index);
			   var p = {left : left , top : top , width : size.width ,height : size.height };
			   try{
			     $o.stop(true).animate(p, this.duration, this.easing , callback);
			   }
			   catch(e){
			     $o.stop(true).animate(p, this.duration, this.easing , callback);
			   }
		   }
		   return this;
	   },
	   _show  : function(i)
	   {
		   if(this.showCount <= 0)
		   		czy.ui.dialog.background.show();
		   this.center(i);
		   var _this = this;
		   var $ = this.$.eq(i);
		   if(jQuery.support.opacity){
				switch(this.effect)
				{
					case "fade" : case "puff" : 
					    var p = { opacity : 'show'};
						var callback  = function(){_this.shownEvent.run(_this,{});$.attr('data-status','show')};
						try{
							$.show().stop(true,true).animate(p,this.duration,this.easing,callback);
						}
						catch(e){
							$.show().stop(true,true).animate(p,this.duration,callback);
						}
					break;
				}
			}
			else{
				$.show();
				this.shownEvent.run(this,{});
			}
			return this;
	   },
	   _hide  : function(i)
	   {
		    var _this = this;
			var $ = this.$.eq(i).attr('data-status','hide');
			var callback = function(){_this.hiddenEvent.run(_this,{});};
		    if(jQuery.support.opacity){
				switch(this.effect){
					case "fade" :
					    var prop = { opacity: 'hide' };
						try{
							$.stop(true,true).animate(prop,this.duration,this.easing,callback);
						}
						catch(e){
							$.stop(true,true).animate(prop,this.duration,callback);
						}
					break;
					case "puff" :
						try{
							$.stop(true,true).effect("puff", {}, 500 , callback );
						}
						catch(e){
							$.stop(true,true).animate({ opacity: 'hide' },this.duration, callback);
						}
						
					break;
				}
			}
			else{
				$.hide();
				this.hiddenEvent.run(this,{});
				
			}
		
			if(this.showCount <= 0)
		   	  czy.ui.dialog.background.hide();
			return this;
	   },
	   exchange : function(index ,nextIndex)
	   {
		    if(index != nextIndex)
			{
				this._hide(index);
			    this._show(nextIndex);
				this.index = nextIndex ;
				this.backindex = index;
			}
			return this;
	   },
	   show : function(index){
		   index = index || this.index;
		   var status = this.$.eq(index).attr('data-status') || 'hide';
		   if(status == 'hide'){
			   this.showEvent.run(this,{});
			   this._show(this.index = index);
			   this.showCount ++;
		   }
		   return this;
	   },
	   hide : function(index){
		    index = index || this.index;
		    if(this.$.eq(index).attr('data-status') == 'show'){
				this.hideEvent.run(this,{});
				this.showCount --;
				this._hide(this.backindex = index);
	 	    }
			return this;
	   },
	   prev : function()
	   {
		   var index = this.index - 1;
		   index = index >= 0 ?  index : this.$.length - 1 ;
		   this.exchange(this.index ,index);
		   return this;
	   },
	   next : function()
	   {
		   var index = this.index + 1;
		   index = index < this.$.length ? index : 0 ;
		   this.exchange(this.index , index);
	   	   return this;
	   },
	   normal : function(){
		    var _this = this;
		   
			this.size(this.normalSize,function(){
					_this.resizeStatus = "normal";
					//_this.afterNormal.run();
			});
			return this;
	   },
	   min  : function(){
		   var _this = this;
		  
		   this.size(this.minSize,function(){
					_this.resizeStatus = "min";
					
			});
		   return this;
	   },
	   max  : function(){
		    var _this = this;
			this.size(this.maxSize,function(){
					_this.resizeStatus = "max";
					
			});
		    return this;
	   },
	   remove : function(){
		   return this;
	   },
	   add : function(dialog)
	   {
		   //this.$.append($(dialog));
		   return this;
	   }
	   
	}
})(czy , jQuery);/* 
* czy.ui.select   //textarea 限制最大输入值
* Dependent 	: 	jquery.js 
			  		czy.core.js 
			  		czy.ui.core.js
* Author 		: 	Cai ZhongYi
* Email 		: 	274142680@qq.com
* Date 			: 	2011-05-17
* Version		: 	1.0.0.0
*/

;(function(czy , $) {
	czy.ui.select = function(selector, options ) {
		var defaults = {
			   animate 	: true,
			   eventype	: 'mouseover',  //click | mouseover
			   Objects	:	{
			   		list	: 	'.select-list'
			   }
		}
        czy.ui.baseui.call(this , selector , options , defaults);
		this.init.apply(this, arguments);
		return this;
	}
	
	czy.ui.select.prototype = {
	   selectedItem	 : null,
	   selectedIndex : 0,
	   selectedValue : '',
	   init : function(){
		    var _this = this;
		    this.$.css({'position':'relative',cursor:'pointer'});
			
			this.$list.css({'position':'absolute'}).hide();
			this.$list.children().each(function(i ,n){
				$(n).click(function(){
					_this.selectedIndex = i;
					_this.selectedValue = $(this).text();
					_this.selectedItem = $(this);
					_this.hide();
				})
			})
			var showfn = function(){
				_this.show();
			}
			this.$.click(this.eventype == 'mouseover' ? function(){} : showfn);
			this.$.hover(this.eventype == 'click' ? function(){} : showfn,function(){_this.hide()});
			
			return this;
	   },
	   show : function(){
		  this.$.addClass('select-hover');
		  this.$list.stop(true,true).animate({height:'show',opacity:'show'});
		  return this;
	   },
	   hide	: function(){
		   this.$.removeClass('select-hover');
		  this.$list.stop(true,true).animate({height:'hide',opacity:'hide'});
		  return this;
	   }
	}
})(czy , jQuery);

﻿/* 
* czy.ui.textarea   //textarea 限制最大输入值

* Dependent : jquery.js 
			  czy.core.js 
			  czy.ui.core.js
* Author : Cai ZhongYi
* Email : 274142680@qq.com
* Date : 2011-05-17
* Version: 1.0.0.0
*/

(function(czy , $) {
	/*  textArea */
    czy.ui.textarea = function( selector , options ) {
        var defaults = {
			maxlength		:	140 , 		//最大字数
			islock  		: 	true,    	//超过后是否继可输入
			bind			:   {
			   length		:   '.length',
			   less			:   '.less-length',
			   over			:   '.over-length'
			}
		}
        czy.ui.baseui.call(this , selector , options , defaults);
		this.init.apply(this, arguments);
		return this;
    }
	
	czy.ui.textarea.prototype = {
		init : function()
		{
			var _this	 = this;
		    this.$length = $(this.bind.length);         
			this.$less 	 = $(this.bind.less);
			this.$over   = $(this.bind.over);

			this.islock =  this.islock == 'false' ? false : true;
			this.maxlength = parseInt(this.maxlength);
			
			this.changedEvent = new czy.delegate();
			
			function doit()
			{
				_this.limit();
				_this.calculate();
				_this.view();
			}

			if(window.attachEvent){
				this.$[0].attachEvent('onpropertychange' ,doit);
			}else{
				this.$[0].oninput = doit;
			}
			
			/*
			czy.ui.core.bind(this.$[0], 'onpropertychange' , function(){
				_this.limit();
				_this.calculate();
				_this.view();
				
			});*/
			return this;
		},
		view  : function()
		{
			this.$length.html(this.length);       //当前长度
			this.$less.html(this.lessLength);	//还剩下长度 
			this.$over.html(this.overLength);	//超出的长度
		},
		reset : function()
		{
			this.$.val('');
			this.length = 0 ;
			this.calculate();
			this.view();
		},
		calculate : function()
		{
			this.length = this.$.val().length;
			this.overLength = this.length - this.maxlength < 0 ? 0 : this.length - this.maxlength ;
			this.lessLength = this.maxlength - this.length < 0 ? 0 : this.maxlength - this.length;
			
			var p = { length : this.length , overLength : this.overLength , lessLength : this.lessLength };
			this.changedEvent.run(this , p);
			
			return p;
		},
		isOver : function()
		{
			return this.length > this.maxlength  ? false : true;
		},
		//限制长度
		limit : function()
		{
			var _this = this;
			if(this.isOver())
			{
				if(this.islock)
				{
					this.$.val(function(){return $(this).val().substring(0 , _this.maxlength )});
				}
			}
			return this;
		}
	}
	
	/* 
	* czy.ui.textbox   //textbox默认显示效果
	
	* Dependent : jquery.js 
				  czy.core.js 
				  czy.ui.core.js
	* Author : Cai ZhongYi
	* Email : 274142680@qq.com
	* Date : 2011-05-17
	* Version: 1.0.0.0
	*/

	czy.ui.textbox = function(selector, options ) {
		var defaults = {
			   animate : true,
			   tipcss	 : 'textbox-tip'
		}
        czy.ui.baseui.call(this , selector , options , defaults);
		this.init.apply(this, arguments);
		return this;
	}
	
	czy.ui.textbox.prototype = {
	   init : function(){
		      var _this = this;
			  if(this.animate){
				  this.$.val('');
				  var overlay = $("<span/>").html(this.$[0].defaultValue)
				  .css({
						"display"		:	"inline-block",
						"*display"		:	"inline",
						"zoom"			:	1,
						"margin-left"	:	-this.$.width(),
						width			:	this.$.outerWidth(),
						height			:	this.$.outerHeight(),
						'font'			:   this.$.css('font'),
						'line-height'	:   _this.$.outerHeight() +'px'
						
				  })
				  .bind({
					 click : function(){
						overlay.stop(true,true).fadeOut();
						_this.$.val("").focus();
					 }
				   })
				  .addClass(this.tipcss)
				  .insertAfter(this.$);
				  this.$.bind({
					 focus : function(){
						 
					 },
					 blur : function(){
						 if($(this).val() == "")
						 {
							 overlay.stop(true,true).fadeIn();
						 }
					 }
				  })
	          }
			  else{
				  this.$.val(this.$[0].defaultValue);
				  this.$.addClass(this.tipcss).bind({
					  focus : function(){
						$(this).val('').removeClass(_this.tipcss);
					  },
					  blur : function(){
						$(this).val(this.defaultValue).addClass(_this.tipcss);
					  }
				  })
			  }
			  return this;
	   }
	}

	/* 
	* czy.ui.checkbox   //可自定义样的的checkbox
	
	* Dependent : jquery.js 
				  czy.core.js 
				  czy.ui.core.js
	* Author : Cai ZhongYi
	* Email : 274142680@qq.com
	* Date : 2011-05-17
	* Version: 1.0.0.0
	*/
	czy.ui.checkbox = function(selector, options ) {
		var defaults = {
			checkedurl		 : '',
			uncheckedurl	 : '',
			discheckedurl	 : '',
			disuncheckedurl	 : '',
			eventtype		 : 'click',
			maxcheck	 	 : -1
		}
        czy.ui.baseui.call(this , selector , options , defaults);
		this.init.apply(this, arguments);
		return this;
	}
	
	czy.ui.checkbox.prototype = {
	   init : function(){
		    var _this = this;
			this.$.hide();
			this.index = -1 ;
			this.count = 0;
			this.checkedVal= [];
			this.$.each(function(i , n){
			   var checkbox = $('<span/>'); 
			   var background = _this.uncheckedurl ;
			   if($(n).attr('checked'))
			   {
				   background = $(n).attr('disabled') || $(n).attr('readonly') ? _this.discheckedurl :  _this.checkedurl ;
				   _this.count ++ ;
				   _this.checkedVal.push({key : _this.key(i) , val : _this.val(i)});
			   }
			   else
			   {
				   background = $(n).attr('disabled') || $(n).attr('readonly') ? _this.disuncheckedurl :  _this.uncheckedurl ;
			   }
			   
			
			   checkbox.css({'display':'inline-block' , '*display':'inline' ,'zoom': 1,'background-repeat':'no-repeat',cursor : 'default','background-image' : 'url('+ background +')'}).html($(n).val()).addClass($(n).attr('class'));

		     
			   //var _disabled = $(n).attr('disabled') ? true : false ;
			   //var _readonly = $(n).attr('readonly') ? true : false ;
			   
			   checkbox.bind(_this.eventtype,function(){
				   _this.check(i , !$(n).attr('checked')); 
				})
			   $(n).after(checkbox);
			})
			var name = this.$.length > 1 ? this.$.attr('data-groupname') : this.$.name;
			this.$val = $('<input/>').attr({'type':'hidden' , name : name });
			this.$val.insertBefore(this.$.last());
			return this;
	   },
	   check  : function(index , val)
	   {
		   if(val == null){return this.$.eq(index).attr('checked')}
		   if(!this.$.eq(index).attr('disabled') && !this.$.eq(index).attr('readonly'))
		   { 
			   if(val){
				   if(this.maxcheck == -1 | this.count <= this.maxcheck )
				   {
					  var o = this.$.eq(index).attr('checked',true) ; 
					  o.next().css({'background-image' : 'url('+ this.checkedurl+')'});
					  this.count ++ ;
					  //this.checkedVal.push({key : this.key(index) , val : this.val(index)});
				   }
			   }
			   else{
				   if(this.count > 0)
				   {
				  	 var o = this.$.eq(index).attr('checked',false) ;
				  	 o.next().css({'background-image' : 'url('+ this.uncheckedurl+')'});
					 //var value = {key : this.key(index) , val : this.val(index)};
					 //if(this.checkedVal.contains(value))
					 // {
				    	this.count -- ;
					 	// this.checkedVal.remove(value);
					 // }
				   }
			   }
		   }
		   else
		   {
			   this.disable(index,true);
		   }
		   return this ;
	   },
	   disable : function(index , val)
	   {
		    if(val != null)
			{
		   		 this.read(index, val);
	  			 this.$.eq(index).attr('disabled',val).next().css({'background-image' : 'url('+ this.disableurl +')'});
				 return this;
			}
			return this.$.eq(index).attr('disabled');
	   },
	   key	  : function(index , key)
	   {
		    if(key != null)
			{
	  			 this.$.eq(index).attr('data-key',key);
				 return this;
			}
			return this.$.eq(index).attr('data-key');
	   },
	   val    : function(index ,val)
	   {
		   if(val != null)
		   {
			   this.$.eq(index).val(val);
			   return this;
		   }
		   return this.$.eq(index).val();
	   },
	   read : function(index , val)
	   {
		   if(val != null)
		   {
			   this.$.eq(index).attr('readonly', val);
			   return this;
		   }
		   return this.$.eq(index).attr('readonly');
	   }
	}
})(czy , jQuery);

﻿/* 
* czy.ui.accordion
* Dependent : jquery.js  
			  jquery-ui.js  
			  czy.core.js 
			  czy.ui.core.js
* Author    : Cai ZhongYi
* Email     : 274142680@qq.com
* Date      : 2011-05-17
* Version   : 1.0
*/
;(function($) {
	czy.ui.accordion = function(selector,options){
		var _options={
			index   		:   0,
			//maxCount		:	2,
			trunround		:	true,  		  //鼠标移开对像后自动回缩
			eventype		:	"mouseover",
			type			:	"normal",		  //select && normal
			duration		:	"slow",
			easing			:	"easeOutExpo",
			minheight		:	0,
			maxheight		:   'auto',           // auto | int
			Objects			: 	{
			    header 		: 	".acc-header",
				content		:	".acc-content"
			}
		}
		
	   	czy.ui.baseui.call(this , selector , options , _options);
		this.init.apply(this, arguments);
        return this;
	}
	
	czy.ui.accordion.prototype = {
	   init : function(){
		   var _this = this;
		   this.trunround = this.trunround.toBoolean();
		   this.index = parseInt(this.index);
		   this.minheight = parseInt(this.minheight);

		   this.backIndex = 0 ;
		   this.showCount = 0 ;

		   this.$content.css('overflow','hidden').hide().each(function( i , n){
				$(n).attr('data-height',$(n).outerHeight());
				if(_this.index == i)
				{
				   _this._show($(n));
				}
		   })
           
		   this.$header.each(function(i , n){
		       $(n).attr('data-index', i );
		   })
		  
		   this.$header.bind(this.eventype , function(){
			  var index = $(this).attr('data-index');
			  if(_this.trunround){
		      	_this.show(index);
			  }
			  else{
			    _this.toggle(index);
			  }
		   })
	   },
	   show : function(index ,isAnimate){
		  this.index = index;
		  if(this.trunround){
		 	 this.exchange(this.index , this.backIndex , isAnimate);
		  }
		  else{
			  this._show(this.$content.eq(index), isAnimate);
		  }
		  this.backIndex = this.index;
		  //this.showCount ++ ;
	   },
	   hide : function(index , isAnimate){
		  this.backIndex = index;
		  if(this.trunround){
		 	 this.exchange(this.backIndex ,this.index ,isAnimate);
		  }
		  else{
			 this._hide(this.$content.eq(index), isAnimate);
		  }
		  this.index = this.backIndex;
		  //this.showCount -- ;
	   },
	   toggle    : function( index ,isAnimate)
	   {
		   var $obj = this.$content.eq(index);
		   if($obj.is(':hidden')){
			   this._show($obj,isAnimate);
		   }
		   else{
			   this._hide($obj,isAnimate);
		   }
		   
	   },
	   maxHeight : function($obj){
		   return this.maxheight == 'auto' ? $obj.attr('data-height') : parseInt(this.maxheight);
	   },
	   _show    : function($obj ,isAnimate){
		   isAnimate = isAnimate || true;
		   var prop = { height: this.maxHeight($obj) , opacity : 'show'};
		   if(isAnimate){
			    try{
		   			$obj.stop(true,true).animate(prop , this.durtion, this.easing);
				}
				catch(e){
				    $obj.stop(true,true).animate(prop , this.durtion);
			    }
		   }
		   else{
		   		$obj.show();
		   }
		   return this;
	   },
	   _hide    : function($obj ,isAnimate){
		   isAnimate = isAnimate || true;
		   var prop = { height: this.minheight , opacity : 'hide'};
		   if(isAnimate){
		   		try{
		   			$obj.stop(true,true).animate(prop , this.durtion, this.easing);
				}
				catch(e){
				    $obj.stop(true,true).animate(prop , this.durtion);
			    }
		   }
		   else{
		   		$obj.hide();
		   }
		   return this;
	   },
	   exchange : function(index , backIndex , isAnimate){
		   if(backIndex != index)
		   {
			   this._show(this.$content.eq(index),isAnimate);
			   this._hide(this.$content.eq(backIndex),isAnimate);
		   }
	   }
	  
	}

})(jQuery);﻿/*
	��ʼ������ data-el���� ��ǩ�Ŀؼ�, ���ɵĶ�����Ϊ�ñ�ǩ��id
*/
;(function($ ,czy , window){ 
     var debug = true;
	 var namespace = 'czy.ui.';
     function getParams(selector)
	 {
		 var params = {} ;
		 $(selector).each(function(i, n){
		   var attrs = $(n).get(0).attributes;
		   for(var i = 0 ; i < attrs.length ; i++)
		   {
			  params[attrs[i].name.replace('data-','')] =  attrs[i].value ;
		   }
		 })
		 return params;
	 }
	 function create()
	 {
		 var names = [
					  namespace + 'background',
					  namespace + 'dialog',
					  namespace + 'accordion',
					  namespace + 'dataPager',
					  namespace + 'fiexed',
					  namespace + 'tabs',
					  namespace + 'nav',
					  namespace + 'scroll',
					  namespace + 'textbox',
					  namespace + 'select',
					  namespace + 'textarea',
					  namespace + 'checkbox',
					  namespace + 'loading',
					  namespace + 'validator',
					  namespace + 'progressbar',
					  namespace + 'roundTracks'
					  ];
		 var groupname = 'data-groupname';
		 for(var i = 0 ; i< names.length ; i++ )
		 {
			 var name = names[i].replace(namespace,'');	
			 $(':[data-el='+ name +']').each(function(i,n)
			 {
				 if(!$(n).attr(groupname))
				{window[$(n).attr('id')] = new czy.ui[name](n , getParams(n));}
				
		     })
			 
			 /* �� */
			 var $gobj = $(':[data-el='+ name +']['+groupname+']');
			 if($gobj.length > 0)
			 	window[$gobj.attr(groupname)] = new czy.ui[name]($gobj, getParams($gobj));
		 }
	 }
	 
	 /* lazyload ���� */
	 czy.ui.lazyload = {
		 active : false,
	     img 	: 'http://www.shtion.com/wp-content/themes/Apple/images/load.gif',
	   	 effect : 'fadeIn'
	 }
	 /* lazyload ���� */

	 var loaded = false;
	 $(document).ready(function(){
		
		if(!loaded)
		{
			loaded = true;
			if(debug){var d = new  czy.debug();}
			create();
			
			for(var i = 0 ; i< 100 ; i++){
			  $('text').append($('<div/>').html('my  '))
			}
			
			if(debug){$('#debug').html(d.getRunTime());}
			
			/* ����lazyload */
			if(czy.ui.lazyload.active || $(document.body).attr('lazyload'))				   
       	    $("img").lazyload({
        		 placeholder: czy.ui.lazyload.img ,
            	 effect: czy.ui.lazyload.effect
            }) 
			/* ����lazyload */
		}
	 })
})(jQuery , czy , window);