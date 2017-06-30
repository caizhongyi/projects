/*
  QQ     :  274142680
  author :  caizhongyi	
  date	 :  2012/08/09
*/

;(function(window , $){
	
	 $.author = {
	 	qq 		: '274142680',
		email 	: '274142680#qq.com',
		name	: 'caizhongyi',
		depend  : 'jquery.1.7.2.js',
		ver		: '1.0'
	 }
	
	//是否有jQuery类存在
	 !$ && document.write('<'+'script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></'+'script>'); 
	 
	/*
		timer 时间类
	*/
	$.timer = function(interval){
		this.lock = false;
		this.interval = interval;
		this.fun = null;
	}
	$.timer.prototype = {
		run  : function(){
			this.timer = setInterval(this.fun,this.interval);
			return this;
		}
	}
	

	$.pageSize = function(size , length){
		var val = parseInt(length / size);
		return length % size > 0 ? val + 1 : val;
	}
	
	/* 
		@function  : 获取URL后的参数
		@key	   : 参数名称
	*/
    $.getQueryString = function (key) {
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
	};
	

	$.debug = function(message){
		$.debug.open && console && console.log(message);
	}
	$.debug.open = true;
	
	$.ishtml = function(html){
		//如果不存在则以html型式加入文档
		if(/<(.*)>.*<\/.*>|<(.*)\/>/.test(html)){
			return true;
		}
		else{
			return false;
		}
	}
	
	Function.prototype.extend = function(object){
		this.prototype = $.extend(true,{},object.prototype,this.prototype);
		return this;
	}
	
	
	/*  
		创建对象
		className [string] : 对象名称
		params	  [array]  : 参数
		prop	  [object] : 成员
	*/
	
	$.createClass = function(namespace , className, params , prop){
		namespace[className] = function(){
			
			var fnp  = arguments[1] || { target : {} , options : {}};
			
			this.selector = arguments[0] || '.' + className ;
			
			//如果不存在则以html型式加入文档
			if(/<(.*)>.*<\/.*>|<(.*)\/>/.test(this.selector)){
				this.$ = $(this.selector).appendTo($('body'));
			}
			else{
				this.$ = $(this.selector);
			}
			this.$.attr({ 'data-control' : className });
			//参数初始化
			this.target = $.extend(true, {} , params.target , fnp.target);
			this.options = $.extend(true, {} ,params.options , fnp.options);
			
			//如果target内成员为选择器，那么有内部成员对象，否则为外部对象
			for(var i in this.target){
				if($.type(this.target[i]) == 'string'){
					this.target[i] = this.$.find(this.target[i]);
				}
			}

			this.options.className && this.$.addClass(this.options.className);
			this.options.css && this.$.css(this.options.css);	
			this.init && this.init.apply(this,arguments);
		};
		namespace[className].prototype = prop;
		return namespace[className];
	}
	
	$.createClass($ , 'object' , {} , {});

	// jquery.ui
	$.ui = $.ui || {};
	$.ui.setting = {
		textbox : true,
		hover	: true
		//select  : true
	};
	
	$.createClass($.ui , 'object' , {}, {
		status : function(status){
			if(status){
				this.options.status = status;
				this.$.attr('data-status',status);
				return this;
			}
			else
				return this.options.status;
		},
		animate : function($obj , event, callback){
			//不存在的动画类型以默认型式
			var attr = event.attr || {};
			if(!jQuery.easing[event.easing]){
				event.easing = 'linear';
				event.duration = 'fast';
			}
			
			if(event){
				if($.type(event) == 'function'){
					event($obj);
				}
				else{
					//if($obj.animates)
					//	$obj.stop().animates(attr , event.duration , event.easing, callback);
					//else
						$obj.stop().animate(attr , event.duration , event.easing, callback);
				}
			}
			else{
				$obj.css(attr);
			}
			return this;
		}
	}).extend($.object);
	
	//切换对象
	$.createClass($.ui , 'swobject' , {},{
		length  :   function(){
			return this.$.length;
		},
		load	:   function(){
			//重写
		},
		show	:   function(index){
			//重写
		},
		hide	:   function(index){
			//重写
		},
	 	
		index	:   function(val){
			if(val != null){
				val = $.type(val) == 'function' ? val(this.options.index.cur) : val;
				var last = this.length() - 1;
				
			    if(val >= 0 && val <= last){
			    	if($.type(this.options.reversion) == 'object'){    		
						if(val == last ){				
							this.target.next.addClass(this.options.reversion.disable);	
						}
						if(val == 0){	
							this.target.prev.addClass(this.options.reversion.disable);	
						}
						
						val != 0 && this.target.prev.removeClass(this.options.reversion.disable);
						val != last && this.target.next.removeClass(this.options.reversion.disable);
					}
					this.options.index.cur = val;
				}else if(val < 0 && $.type(this.options.reversion) === true){
					this.options.index.cur = this.options.reversion ? last :  0;
				}else if(val > last && $.type(this.options.reversion) === true){
					this.options.index.cur =  this.options.reversion ?  0 : last;
				}
				
				return this;
			}
			else{
				return this.options.index.cur ;
			}
			
			
		},
		tempIndex : function(val){
			if(val != null){
				this.options.index.temp =  $.type(val) == 'function' ? val(this.options.index.temp) : val;
				return this;
			}
			return this.options.index.temp;
		},
		to	:   function(index){
			//index = this.options.offset == null ? index : this.options.offset * index;
			if(index != this.tempIndex()){
				this.show(index).hide(this.tempIndex());	
				this.tempIndex(this.index());
			}
			return this;
		},
		prev	: function(){
			//var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
			this.to(this.index() - 1);
			return this;
		},
		next	: function(){
			//var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
			this.to(this.index() + 1);
			return this;
		}
	}).extend($.ui.object);
	//列表对象
	$.createClass($.ui , 'objectList' , {} , {
		items	: function(){ 
			// return new elements; 
		} ,
		length  : function(){
			return this.items().length;
		},
		add		: function(item){
			items.push(item);
			return this;
		},
		//移除 Array 对象中某个元素的第一个匹配项。
		remove  :  function(item) {
			var index = this.items.indexOf(item);
			if (index !== -1) return this.items.removeAt(index);
			return this;
		},
		//移除 Array 对象中指定位置的元素。
		removeAt : function(index) {
			return this.items.splice(index, 1)
		}
	}).extend($.ui.object);


	$(document).ready(function(){
		//hover效果
		$.ui.setting.hover && $('[hover-layer]').die('mouseenter.hover mouseleave.hover').live({
			'mouseenter.hover' : function(){
				$($(this).attr('hover-layer'),$(this)).stop(true,true).fadeIn();
			},
			'mouseleave.hover' : function(){
				$($(this).attr('hover-layer'),$(this)).stop(true,true).fadeOut();
			}
		})
		$.ui.setting.select && $.ui.selects && new $.ui.selects('select');
	})
})(window , jQuery);

