/*!
 * jQuery.class.js
 * Copyirght (c) 2010, matsukaze.
 * Lisenced under the MIT license.
 * 
 * @version 1.2.3
 * @author mach3
 * @requires jQuery
 */
/**
 * require jquery.1.7.2.js +
 * require jquery.plus.js
 * require jquery.class.js
 * */
;(function ($) {
    $.pagination = function(size,count){
        var pagiation = function(size,count){
            this.index = 0;
            this.temp = -1;
            this.size = size || 10;
            this.count = count || 0 ;
            this.pageIndex = 0 ;
        }
        pagiation.prototype = {
            page : function(index){
                if(index < this.count || index >= 0){
                    this.index = index;
                    return true;
                }
                return false;
            },
            pageCount : function(){
                var p = this.count / this.size;
                return this.count % this.size > 0 ? p + 1 : p ;
            },
            prev : function(){
                return this.page(this.index + 1);
            },
            next : function(){
                return this.page(this.index - 1);
            }
        }
        return new pagination(size,count);
    }
    /**
     * @description 获取data-options="region:'name'"的jquery对象
     * @require jquery.1.7.2.js +
     * @param {string} region 注册部件名称
     * @return {object | jquery}  如果不查找单个region,返回的是一个object { region : jquery } ,否则返回一个jquery对象
     * */
    $.fn.getRegion = function(region){
        var selector = $(this).find('[data-options]');
        if(region){
            var arr = $([]);
            selector.each(function(){
                var opts = $(this).parseOptions();
                if(opts.region == region){
                    arr = arr.add($(this));
                }
            });
            return arr.length ? arr : undefined ;
        }
        else{
            var arr = {};
            selector.each(function(){
                var opts = $(this).parseOptions();
                if(!arr[opts.region])
                    arr[opts.region] = $([]);
                arr[opts.region] = arr[opts.region].add($(this));
            });
            return arr;
        }
    };
    /**
     * @description 查找所有data-options的jquery对象
     * @require jquery.1.7.2.js +
     * @return {jquery}  返回所有data-options的jquery对象
     * */
    $.fn.getRegionArray = function(){
        return $('[data-options]',$(this));
    };
    /**
     * @description 转化data-options对象
     * @require jquery.1.7.2.js +
     * @return {jquery}  返回data-options对象
     * */
    $.fn.parseOptions = function(){
        return    $(this).parseAttr('data-options');
    };

    /**
     * @description 转化属性参数为对象
     * @require jquery.1.7.2.js +
     * @param {string} name 属性名称
     * @return {jquery}  返回对象
     * */
    $.fn.parseAttr = function(name){
        var t = $(this);
        var s= $.trim(t.attr(name));
        if(s){
            var _9=s.substring(0,1);
            var _a=s.substring(s.length-1,1);
            if(_9!="{"){
                s="{"+s;
            }
            if(_a!="}"){
                s=s+"}";
            }
        }
        else{
            s = '{}';
        }
        return  (new Function("return "+s))();
    };

    $.console = function(msg){
        if($.console.debug)
            console && console.log(msg);
    };
    $.console.debug = false;
})(jQuery);
;
(function ($) {
    /**
     * @description 转化data-options对象
     * @require jquery.1.7.2.js +
     * @require class.core.js
     * @return {jquery}  返回data-options对象
     * */
    var loader = {
        isloadscript:true,
        init:function (context) {
            var _this = this;
            /*if (this.isloadscript) {
             var root = document.location.href.substring(0, document.location.href.lastIndexOf('/')) + '/plugin/';
             this.load(root + 'class.core.js', function () {
             _this.cpulgins.each(function (i, n) {
             _this.isloadscript && _this.load(root + 'class.' + n + '.js');
             });
             _this.jpulgins.each(function (i, n) {
             _this.isloadscript && _this.load(root + 'jquery.' + n + '.js');
             });
             });
             }*/
            $('[data-loader]',context || 'body').each(function(){
                var attr = $.trim($(this).attr('data-loader')),
                    arr = attr.split('-'),
                    type = arr[0],
                    fnName = arr[1];
                switch(type){
                    case 'class' :
                        _this.loadClass(this, fnName);
                        break;
                    case 'jquery' :
                        _this.loadjQuery(this, fnName);
                        break;
                }
            })

        },
        load:function (url, callback) {
            /* var _7 = false;
             var _8 = document.createElement("script");
             _8.type = "text/javascript";
             _8.language = "javascript";
             _8.src = url;
             _8.onload = _8.onreadystatechange = function () {
             if (!_7 && (!_8.readyState || _8.readyState == "loaded" || _8.readyState == "complete")) {
             _7 = true;
             _8.onload = _8.onreadystatechange = null;
             if (callback) {
             callback.call(_8);
             }
             }
             }
             document.getElementsByTagName("head")[0].appendChild(_8);*/
            $('<script type="text/javascript" src="'+ url +'"></script>').appendTo('head').load(function(){
                callback && $.proxy(callback,this)(url);
            });
            return this;
        },
        loadClass:function (selector, className) {
            var $selector = $(selector);

            if($selector.length){
                if (!Class[className]){
                    console && console.log('place require class.' + className + '.js !');
                }
                else{
                    window[$selector.attr('id')] = new Class[className]($selector, $selector.parseOptions());
                }
            }
            return this;
        },
        loadjQuery:function (selector, className) {
            var $selector = $(selector);
            if($selector.length){
                if (!$selector[className]){
                    console && console.log('place require jquery.' + className + '.js !');
                }
                else{
                    $selector[className]($selector.parseOptions($selector));
                }
            }
            return this;
        }
    };

    /**
     * js控件初始加载类
     * @return {jquery}
     * @example  $('body').loader();
     * html ： <div data-loader="jquery-fnname" data-options="params"></div>
     * example : <div data-loader="jquery-tabs" data-options="auto:true"></div>
     * */
    $.fn.loader = function(){
        return loader.init($(this));
    };

})(jQuery);

var Classes = Classes || {};
$.extend( Classes, {
	/**
	 * Function to attach class feature to function, 
	 * just like prototype.js's "Class.create()" method.
	 * 
	 * @param Object superClass Super class object. (optional)
	 * @return Object Function which has class feature.
	 * @example
	 *   var MyClass = Class.create(); 
	 *   MyClass.prototype = { ... };
	 */
	create: function( superClass ){
		var s = superClass || {};
		return function(){
			var pt, f;
			pt = {
				superclass:s.prototype,
				rebase:function(name){
					this[name] = $.extend(true, {}, this[name]);
				}
			};
			f = [ "unbind", "bind", "trigger", "on", "off" ];
			$.each(f, function(i, name){
				if( $.isFunction($.fn[name])){
					pt[name] = function(){
                        $.fn[name].apply($(this), arguments);
                        return $(this);
                    };
				}
			});
			$.extend( true, pt, s.prototype, this );
			$.extend( true, this, pt );
			if( $.isFunction(this.initialize) ){
				this.initialize.apply(this, arguments);
			}
		};
	},
	/**
	 * Function to get class defenition directly, wrapper of create().
	 *
	 * @param Object def Definition of the class. (required)
	 * @param Object superClass Super class object. (optional)
	 * @return Object Class defenition
	 * @example 
	 *   var MyClass = Class.get( { ... }, MySuperClass );
	 */
	get: function( def, superClass ){
		var cls = this.create( superClass );
		cls.prototype = def;
		return cls;
	}
});
