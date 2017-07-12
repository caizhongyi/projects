
/* ************************ 类的继承  *************************** */
;Function.prototype.extend = function(superClass){
        if(typeof superClass === 'function'){//类式继承
            var F = function(){}; //创建一个中间函数对象以获取父类的原型对象
            F.prototype = superClass.prototype; //设置原型对象
            this.prototype = new F(); //实例化F, 继承父类的原型中的属性和方法，而无需调用父类的构造函数实例化无关的父类成员
            this.prototype.constructor = this; //设置构造函数指向自己
            this.superClass = superClass; //同时，添加一个指向父类构造函数的引用，方便调用父类方法或者调用父类构造函数
        } else if(typeof superClass === 'object'){ //方法的扩充
            var pro = this.prototype;
            for(var k in superClass){
                if(!pro[k]){ //如果原型对象不存在这个属性，则复制
                    pro[k] = superClass[k];
                }
            }
        } else {
            throw new Error('fatal error:"Function.prototype.extend" expects a function or object');
        }
          
        return this;
		
};
/* ************************ $类的继承  *************************** */


;(function(window , $){

	//基类
	$.object = function(){}
	$.object.prototype = {
		extend    : function(defaults , options ){
			this.options = $.extend(defaults  , options);
			this.init.call(this);
			return this;
		}
	}
	
	$.loader = function(){}
	$.loader.prototype = {
		load : function(url , type){
			switch(type){
				case 'script' :  document.write('<script src="../../$/js/'+ url +'" type="text/javascript"><\/script>'); break;
				default : document.write('<script src="'+ url +'" type="text/javascript"><\/script>'); break;
			}
		   return this;
		},
		loadScript : function(url){
			this.load(url, 'script');
			return this;
		}
	}
	//是否有jQuery类存在
	 !$ && new $.loader().loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");

	//ui基类
	window.$.ui = {};
	$.ui.setting = {
		textbox : true,
		hover	: true
		//select  : true
	};
	$.ui.object = function(){}
	$.ui.object.extend({
		extend : function(selector,defaults , options){
			var _options = {};
			for(var i in defaults){
				_options[i] = defaults[i];	
			}
			this.options = $.extend(_options  , options);
			
			this.$ = $(selector).show();
			this.selector = selector;
			if(!$('body class="pBgB"').has(this.$).length){
				$('body class="pBgB"').append(this.$);
			}
			
			if(!jQuery.easing[this.options.easing]){
				this.options.easing = 'linear';
				this.options.duration = 'fast';
			}
			
			if(defaults.widget)
			{
				for(var i in defaults.widget){
					var sel = this.options.widget[i] ? this.options.widget[i] : defaults.widget[i];
					this['$' + i] = $(sel, this.$);
				}
			}
			this.init.call(this);
			return this;
		},
		animate : function($obj,attr , callback){
			$obj.animate(attr,this.duration ,this.easing , callback);
			return this;
		}
	}).extend($.object.prototype)
	
	
	//切换对象
	
	$.ui.switchObject = function(){}
	$.ui.switchObject.extend({
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
				val = $.type(val) == 'function' ? val(this.options.index) : val;
				if(val >= 0 && val < this.length()){
					this.options.index = val;
				}else if(val < 0 ){
					this.options.index = this.options.reversion ? (this.length() - 1) :  0;
				}else{
					this.options.index =  this.options.reversion ?  0 : (this.length() - 1);
				}
				return this;
			}
			
			return this.options.index;
		},
		tempIndex : function(val){
			if(val != null){
				this.options.tempIndex =  $.type(val) == 'function' ? val(this.options.tempIndex) : val;
				return this;
			}
			return this.options.tempIndex;
		},
		goto	:   function(index){
			index = this.options.offset == null ? index : this.options.offset * index;
			if(index != this.tempIndex()){
				this.show(index).hide(this.tempIndex());	
				this.tempIndex(this.index());
			}
			return this;
		},
		prev	: function(){
			var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
			this.goto(index - 1);
			return this;
		},
		next	: function(){
			var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
			this.goto(index + 1);
			return this;
		}
	}).extend($.ui.object.prototype)
	
	$(document).ready(function(){
		//hover
		$.ui.setting.hover && $('[data-hover]').hover(function(){
			$($(this).attr('data-hover'),$(this)).stop(true,true).animate({ opacity : 'show' , height : 'show'});
		},function(){
			$($(this).attr('data-hover'),$(this)).stop(true,true).animate({ opacity : 'hide' , height : 'hide'});
		})
		//textbox
		$.ui.setting.textbox && $.ui.textbox && new $.ui.textbox('input[type=text]');
	})
})(window , jQuery);

