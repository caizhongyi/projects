/**
 * require jquery.1.7.2.js +
 * require jquery.plus.js
 * require jquery.class.js
 * */
;(function ($) {
    /**
     * @description 获取data-options="region:'name'"的jquery对象
     * @require jquery.1.7.2.js +
     * @require jquery.plus.js
     * @require jquery.class.js
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
            return arr ;
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
     * @require jquery.plus.js
     * @require jquery.class.js
     * @return {jquery}  返回所有data-options的jquery对象
     * */
    $.fn.getRegionArray = function(){
        return $('[data-options]',$(this));
    };
    /**
     * @description 转化data-options对象
     * @require jquery.1.7.2.js +
     * @require jquery.plus.js
     * @require jquery.class.js
     * @param {string} selector
     * @return {jquery}  返回data-options对象
     * */
    $.fn.parseOptions = function(){
        var t = $(this);
        var s= $.trim(t.attr("data-options"));
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
        console && console.log(msg);
    };
})(jQuery);
;
(function ($) {
    /**
     * @description 转化data-options对象
     * @require jquery.1.7.2.js +
     * @require jquery.plus.js
     * @require jquery.class.js
     * @require class.core.js
     * @return {jquery}  返回data-options对象
     * */
    var loader = {
        isloadscript:true,
        jpulgins:['lazyload','jcarousel'],
        cpulgins:['accordion', 'tabs', 'floatbox', 'dialog'],
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

            this.cpulgins.each(function (i, n) {
                var selector = context ? $(context).find('.class-' + n) : '.class-' + n;
                $(selector).each(function(){
                    _this.loadClass(this, n);
                });
            });

            this.jpulgins.each(function (i, n) {
                var selector = context ? $(context).find('.jquery-' + n) : '.jquery-' + n;
                $(selector).each(function(){
                    _this.loadjQuery(this, n);
                });
            });

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

    $(function () {
        loader.init();
    });
})(jQuery);