
/**
 * @name  $
 * @class
 * */

/**
 * @name  fn
 * @prototype
 * @memberOf $
 * */

 /**
 * @name  ui
 * @namespace
 * @memberOf $
    * */


/**
 * @name  lib
 * @namespace
 * @memberOf $
 * */ /* ************************ 类的继承  ****************************/
;
Function.prototype.extend = function (superClass) {
    if (typeof superClass === 'function') {//类式继承
        var F = function () {
        }; //创建一个中间函数对象以获取父类的原型对象
        F.prototype = superClass.prototype; //设置原型对象
        this.prototype = new F(); //实例化F, 继承父类的原型中的属性和方法，而无需调用父类的构造函数实例化无关的父类成员
        this.prototype.constructor = this; //设置构造函数指向自己
        this.superClass = superClass; //同时，添加一个指向父类构造函数的引用，方便调用父类方法或者调用父类构造函数
    } else if (typeof superClass === 'object') { //方法的扩充
        var pro = this.prototype;
        for (var k in superClass) {
            if (!pro[k]) { //如果原型对象不存在这个属性，则复制
                pro[k] = superClass[k];
            }
        }
    } else {
        throw new Error('fatal error:"Function.prototype.extend" expects a function or object');
    }

    return this;

};
/* ************************ $类的继承  *************************** */
Function.prototype.libExtend = function (object) {
    var prop = this.prototype;
    this.prototype = new object();
    this.prototype = $.extend(true, {}, this.prototype, prop);
    return this;
}

;
(function (window, $) {
    /*
     创建对象
     className [string] : 对象名称
     params	  [array]  : 参数
     prop	  [object] : 成员
     */
    $.lib = $.lib || {};
    $.lib.createClass = function (params, prop) {
        var fn = function () {
            var fnp = arguments[1] || { target:{}, options:{}};
            this.selector = arguments[0];

            //如果不存在则以html型式加入文档
            if (/<(.*)>.*<\/.*>|<(.*)\/>/.test(this.selector)) {
                this.$ = $(this.selector).appendTo($('body'));
            }
            else {
                this.$ = $(this.selector);
            }

            //参数初始化
            this.target = $.extend(true, {}, params.target, fnp.target);
            this.options = $.extend(true, {}, params.options, fnp.options);

            //如果target内成员为选择器，那么有内部成员对象，否则为外部对象
            for (var i in this.target) {
                if ($.type(this.target[i]) == 'string') {
                    this.target[i] = this.$.find(this.target[i]);
                }
            }

            this.options.className && this.$.addClass(this.options.className);
            this.options.css && this.$.css(this.options.css);
            this.init && this.init.apply(this, arguments);
        };
        fn.prototype = prop;
        return fn;
    }
    //基类
    $.object = function () {
    }
    $.object.prototype = {
        extend:function (defaults, options) {
            this.options = $.extend(defaults, options);
            this.init.call(this);
            return this;
        }
    }

    //是否有jQuery类存在
    !$ && new $.loader().loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");

    //ui基类
    window.$.ui = window.$.ui || {};
    $.ui.setting = {
        textbox:true,
        hover:true
        //select  : true
    };
    $.ui.object = function () {
    }
    $.ui.object.extend({
        extend:function (selector, defaults, options) {
            var _options = {};
            for (var i in defaults) {
                _options[i] = defaults[i];
            }
            this.options = $.extend(_options, options);

            this.$ = $(selector).show();
            this.selector = selector;
            if (!$('body').has(this.$).length) {
                $('body').append(this.$);
            }

            if (!jQuery.easing[this.options.easing]) {
                this.options.easing = 'linear';
                this.options.duration = 'fast';
            }

            if (defaults.widget) {
                for (var i in defaults.widget) {
                    var sel = this.options.widget[i] ? this.options.widget[i] : defaults.widget[i];
                    this['$' + i] = $(sel, this.$);
                }
            }
            this.init.call(this);
            return this;
        },
        animate:function ($obj, attr, callback) {
            $obj.animate(attr, this.duration, this.easing, callback);
            return this;
        }
    }).extend($.object.prototype)

    //切换对象
    $.ui.switchObject = function () {
    }
    $.ui.switchObject.extend({
        length:function () {
            return this.$.length;
        },
        load:function () {
            //重写
        },
        show:function (index) {
            //重写
        },
        hide:function (index) {
            //重写
        },
        index:function (val) {
            if (val != null) {
                val = $.type(val) == 'function' ? val(this.options.index) : val;
                var len = this.length();

                if (val >= 0 && val < len) {
                    this.options.index = val;
                } else if (val < 0) {
                    this.options.index = this.options.reversion ? (len - 1) : 0;
                } else {
                    this.options.index = this.options.reversion ? 0 : (len - 1);
                }
                return this;
            }

            return this.options.index;
        },
        tempIndex:function (val) {
            if (val != null) {
                this.options.tempIndex = $.type(val) == 'function' ? val(this.options.tempIndex) : val;
                return this;
            }
            return this.options.tempIndex;
        },
        goto:function (index) {
            //index = this.options.offset == null ? index : this.options.offset * index;
            if (index == this.index()) {
                if (this.options.collapsible)
                    this.hide(this.tempIndex());
            } else {
                this.show(index).hide(this.tempIndex());
            }
            this.tempIndex(this.index());

            return this;
        },
        prev:function () {
            //var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
            var index = this.index();
            this.goto(index - 1);
            return this;
        },
        next:function () {
            //var index = this.options.offset == null ? this.index() : (this.index()/this.options.offset) ;
            var index = this.index();
            this.goto(index + 1);
            return this;
        }
    }).extend($.ui.object.prototype)

    $(document).ready(function () {
        //hover
        $.ui.setting.hover && $('[data-hover]').hover(function () {
            $($(this).attr('data-hover'), $(this)).stop(true, true).animate({ opacity:'show', height:'show'});
        }, function () {
            $($(this).attr('data-hover'), $(this)).stop(true, true).animate({ opacity:'hide', height:'hide'});
        })
        //textbox
        $.ui.setting.textbox && $.ui.textbox && new $.ui.textbox('input[type=text]');
    })
})(window, jQuery);


;(function($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 手风琴
     * @requires  jquery.1.7.2
     * @class  accordion
     * @param {string} selector 选择器
     * @param {number} [options.index = 0] 当前索引
     * @param {boolean} [options.collapsible = 0] 是否可全部申缩
     * @param {event} [options.index = 'click'] 事件，click
     * @param {string} [options.duration = 'slow'] 动画速度
     * @param {string} [options.duration = 'easeOutExpo'] 动画效果，easing
     * @param {object} [options.widget = { 'header' : 'h3' , panel : 'div' }] 选择器
     * @param {string} [options.cssSelected = 'selected'] 动画效果，easing选种的样式
     * @example new $.ui.accordion('.accordion');
     * html : <div class="accordion">
             <h3>header</h3>
             <div>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </div>
             <h3>header</h3>
             <div><br/><br/><br/></div>
             <h3>header</h3>
             <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
             </div>
     * */

	$.ui.accordion = function(selector,options){
		var _options={
			index   		:   0,
			tempIndex		: 	0,
			//maxCount		:	2,
			animate			:   true,   
			collapsible     : true  	,	  //鼠标移开对像后自动回缩
			event			:	"click",
			duration		:	"slow",
			easing			:	"easeOutExpo",
			cssSelected		:   'selected',
			minheight		:	0,
			maxheight		:   'auto',           // auto | int
			widget			: 	{
			    header 		: 	"h3",
				panel		:	"div"
			}
		}
	   	this.extend(selector , _options , options);
        return this;
	}
	$.ui.accordion.extend({
		init : function(){
		   var _this = this;

		   this.$panel.attr({
			 'data-maxheight' : function(){ return $(this).outerHeight()},
			 'data-minheight' : this.minheight()
		   })

		   if(this.minheight() == 0){
			   this.$panel.hide();
		   }
		   else{
		   	   this.$panel.css({overflow : 'hidden' , height : this.minheight() })
		   }

		   // 事件绑定
		
		   this.$.undelegate(this.options.event + '.accordion').delegate(this.options.widget.header, this.options.event + '.accordion' , function(){
               _this.goto(_this.$header.index(this));
		   })
		 
		   //默认值
		   
		   this.show(this.index());
		   return this;
	   },
	   minheight : function(index){
		   return this.minheight == 'auto' ? this.$panel.eq(index).attr('data-minheight') : this.options.minheight;
	   },
	   maxheight : function(index){
		   return this.maxheight == 'auto' ? this.$panel.eq(index).attr('data-maxheight') : this.options.maxheight;
	   },
	   updatePanel : function(){
			$obj.css({ 'height' : 'auto' }).attr({'data-maxheight' :$obj.outerHeight()});
			return this;
	   },
        length : function(){
            return this.$panel.length;
        },
	   show    : function(index , callback){
		   var _this = this;
		   this.index(index);
		   var $obj = this.$panel.eq(this.index())

		   this.$header.eq(this.index()).addClass(this.options.cssSelected);
           if($obj.is(':hidden') && this.options.collapsible){
               if(this.options.animate){
                   this.animate($obj , { height : 'show' , opacity : 1 }, function(){})
               }
               else{
                   $obj.show();
               }

           }
           else{
               this.hide(this.index());
           }

		   return this;
	   },
	   hide    : function(index , callback){
		   var _this = this;
		   var $obj = this.$panel.eq(index);
		   var opacity = this.minheight() == 0 ? 'hide' : 1 ;
		   this.$header.eq(index).removeClass(this.options.cssSelected);
		   if(this.options.animate){
			   this.animate($obj , { height : 'hide' , opacity : opacity } , function(){});
		   }
		   else{
		   	   $obj.hide();
		   }
		   return this;
	   },
	   toggle : function(){
	   	
	   }
	}).extend($.ui.switchObject.prototype);


})(jQuery);﻿;(function($) {
	$.ui.overlay = function(selector,options)
	{
		var _options = {
			status			:	"hide",
			opacity			:	 0.2, 	       // opacity:透明度[0 - 1]
			color			:	"black",
			animate			:   true,
			duration		:	"slow",
            easing			:	"easeOutExpo", // 运动类型
			lock     		: 	false,
			click			:   false,
			hideCallback	:   null,
			zIndex			:   999,
			fixed			:   false,
			initCallback	:	null,
			scrollbar		:   { x : true , y : true},
			widget			:	{
				hide		:	'.hide'
			}
        }
		this.extend(selector, _options , options);
        return this;
	}
	$.ui.overlay.extend({
		init : function(){
		  var _this = this;
		  this.$.attr('control','overlay');
		  this.$.hide().css({ 
		  		"position" 	 : "absolute",
				"background" : this.options.color,
				left 		 : 0,
				opacity 	 : 0,
				top 		 : 0,
				'z-index' 	 : this.options.zIndex 
		  })

		  $(window).bind("resize",function(){
			  _this.resize();
		  })
		  
		  this.$hide.unbind('click.overlay').bind('click.overlay',function(){
			 _this.hide(); 
		  });
		  
		  this.options.click && this.$.click(function(){ _this.hide();})
		  
		  this.options.initCallback && this.options.initCallback();
		  return this;
	  },
	  zIndex : function(zIndex)
	  {
		 if(zIndex == null ){
			 return this.$.css('zIndex');
		 }
		 else{
			 this.$.css('zIndex', zIndex);
			 return this;
		 }
	  },
	  lock	: function(lock){
		  if(lock == null){
		  	return this.options.lock;
		  }
		  else{
		  	this.options.lock = lock;
		  }
		  return this;
	  },
	  size : function(size){
		 if(size != null){
			 this.$.css({ width : size.width, height : size.width });
		 	 return this;
		 }
		 else{
		 	 return {width : this.$.width(), height : this.$.height()};
		 }
      },
	  setScrollbar : function(visable){
		 var attr = {};
		 
		 if(visable){
			attr['overflow'] = 'auto';
		 }
		 else{
			 if($.type(this.options.scrollbar) == 'object'){
				 if(!this.options.scrollbar.x){
					 attr['overflow-x'] = 'hidden';
				 }

				 if(!this.options.scrollbar.y){
					 attr['overflow-y'] = 'hidden';
				 }

			 }
			 else{
			 	if(!this.options.scrollbar){
					attr['overflow'] = 'hidden';
				}
			 }
		 }
		 $('body').css(attr);
		 this.resize();
		 return this;
	  },
	  
	  height: function() {
			var scrollHeight,
				offsetHeight;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollHeight = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);
				offsetHeight = Math.max(
					document.documentElement.offsetHeight,
					document.body.offsetHeight
				);
	
				if (scrollHeight < offsetHeight) {
					return $(window).height() + 'px';
				} else {
					return scrollHeight + 'px';
				}
			// handle "good" browsers
			} else {
				return $(document).height() + 'px';
			}
		},
	
		width: function() {
			var scrollWidth,
				offsetWidth;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);
	
				if (scrollWidth < offsetWidth) {
					return $(window).width() + 'px';
				} else {
					return scrollWidth + 'px';
				}
			// handle "good" browsers
			} else {
				return $(document).width() + 'px';
			}
		},
	
		resize: function() {
			/* If the dialog is draggable and the user drags it past the
			 * right edge of the window, the document becomes wider so we
			 * need to stretch the overlay. If the user then drags the
			 * dialog back to the left, the document will become narrower,
			 * so we need to shrink the overlay to the appropriate size.
			 * This is handled by shrinking the overlay before setting it
			 * to the full document size.
			
			var $overlays = $([]);
			$.each($.ui.dialog.overlay.instances, function() {
				$overlays = $overlays.add(this);

			}); */
			var _this = this;
			this.$.css({
				width: 0,
				height: 0
			}).css({
				width: function(){
					if($.type(_this.options.scrollbar.x) == 'number'){
				 	   return Math.max(_this.scrollbar.x , parseFloat(_this.width()));
				 	}
					else{
						return _this.width();
					}
				},
				height: function(){
					if($.type(_this.options.scrollbar.y) == 'number'){
						return Math.max(_this.scrollbar.y , parseFloat(_this.height()));
				 	}
					else{
						return _this.height();
					}
				}
			});
			return this;
	  },
	  show : function(){
		  var _this = this;
		 
		  if(this.fixed){
		  	 new $.ui.fixed(this.$);
			 $('body').height($(window).height()).css('overflow','scroll')
		  }
		  else{
		  	 this.resize();
		  }
		  this.setScrollbar(false);
		  
		  if(!this.lock())
		  {  
			var $obj = this.$.show();
			var callback = function(){}
			if(this.animate){
				this.animate($obj, { opacity : this.options.opacity }, callback);
			}
			else{
				$obj.css(prop);
			}
		 }
		 return this;
	  },
	  hide : function()
	  {	
		   var _this = this;
		   if(!this.lock())
		   {	
			 var callback = function(){_this.options.hideCallback && _this.options.hideCallback({ target : _this.$});  _this.setScrollbar(true);}
			 if(this.animate){
				this.animate(this.$,{ opacity : 'hide' }, callback);
			 }
			 else{
			 	this.$.hide();
				_this.options.hideCallback && _this.options.hideCallback({ target : _this.$}); 
			 }
		   }
		   return this;
	  },
	  toggle : function()
	  {
		  if(this.$.is(':hidden'))
		    this.show();
		  else
		    this.hide();
	  }
	}).extend($.ui.object.prototype);
})(jQuery);﻿;(function($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 弹出窗口效果，如果需要加入拖动效果请引用jquery-ui-1.8.11.custom.min.js或者引用jquery.ui.core.min.js[比较小]
     * @requires  jquery.1.7.2
     * @requires  jquery.core
     * @requires  jquery.ui.overlay
     * @requires  jquery.ui.core.min
     * @class  dialog
     * @param {string} selector
     * @param {object} options
     * @return {object} dialog
     * @example
     * var dialog = new $.ui.dialog('.dilaog');
     * dialog.show();
     * html :<div class="dialog">
             <div class="dialog-header clearfix">
             <h3>dialog</h3>
             <a href="javascript:;" class="dialog-hide">close</a>
             </div>
             <div class="dialog-container">

             </div>
             <div class="dialog-footer"></div>
             </div>
     * */

    $.ui.dialog = function(selector,options) {
        var _options = {
            status			: 	"hide",		    // 初化是否打开
            effect			: 	"fade", 		// 动画类型 fade | puff | zoom
			animate			:   true,
            duration		: 	"normal",
            easing			:	"easeOutExpo",		//linear" 和 "swing  || easeOutExpo
			zIndex			:   1000,
			resize			:   false,
			layerClick		:   true,
			overlay			:   true,
			minwidth		:   'auto',
			minheight		:	'auto',
			maxwidth		:	'auto',
			maxheight		:	'auto',
			callback		:    { show : null , hide : null},
			widget	 		: 	{ 
				show 		:	 ".dialog-show",
				hide 		:	 ".dialog-hide",
				max 		:	 ".dialog-max",
				normal 		: 	 ".dialog-normal",
				min 		: 	 ".dialog-min",
				header		:	 ".dialog-header",
				ok			:	 ".dialog-ok",
				cancle		:	 ".dialog-cancle",
				header 		: 	 ".dialog-header",
				footer 		: 	 ".dialog-footer",
				ico	  		: 	 ".dialog-ico",
				title   	:  	 ".dialog-title"
			}     
        }
		this.extend(selector, _options , options);	
		return this;
    }
    $.ui.dialog.items = [];
	$.ui.dialog.overlay = null;
	$.ui.dialog.extend(
     /**
      * @lands $.ui.dialog
      * */{
	   init : function(){
		    var _this = this;
            if(this.options.overlay)
                $.ui.dialog.items.push(this);
			this.addBackground()
				.setUI()
				.bindEvent()
				.resized()
				.center()
			//重新计算大小
			/*this.$resizable && this.$.resizable({
					maxheight: this.maxheight,
					maxwidth: this.maxwidth,
					minheight: this.minheight,
					minwidth: this.minwidth
			});*/
			
			return this;

	   },
	   maxSize  : function(){
		   return {
		   		width  : this.options.minwidth == 'auto' ? $(window).width() - 100 : this.options.minwidth ,
				height : this.options.minheight == 'auto' ? $(window).height() - 100 : this.options.minheight 
		   }
	   },
	   minSize	: function(){
		    return {
		   		width : 0,
				height: 0
		   }
	   },
	   normalSize : function(){
		   return {
		   		width : parseFloat(this.$.data('width')),
				height: parseFloat(this.$.data('height'))
		   }
	   },
	   resized : function(){
		    var _this = this;
	   		/* resize */
			$(window).bind("resize",function(){			 
				!_this.$.is(':hidden') && _this.center();
			})
			.scroll( function() { 
				!_this.$.is(':hidden') && _this.center();
			}); 
			return this;
	   },
	   
	   addBackground : function(){
		    var _this = this;
	   		/* overlay */
			if($.ui.dialog.overlay == null && this.options.overlay)
			{
				var overlay = $('<div/>').hide().appendTo($(document.body));
				this.options.layerClick && overlay.click(function(){
                    for(var i = 0 ; i <  $.ui.dialog.items.length;  i++){
                        $.ui.dialog.items[i].hide();
                    }
                })
				
				$.ui.dialog.overlay = new $.ui.overlay(overlay,{
					animate    : this.options.animate,
					easing	   : this.options.easing,
					duration   : this.options.duration
				});
			}
			return this;
	   },
	   setUI  : function(){
	   	    this.$.css({"position": "absolute",display:"none", "z-index": this.options.zIndex})
		  		.each(function(i, n ){
					if($(n).draggable){
						$(n).draggable({handle: this.$header,containment: "document", scroll: false, opacity: 0.8, cursor: 'move'});
					}
				})
			if(this.options.effect  == 'zoom'){
				this.$.attr({
					'data-width' : this.$.outerWidth(),
					'data-height': this.$.outerHeight()
				})
			}
			
			return this;
	   },
	   bindEvent : function(){
		    var _this = this;
			this.$hide.unbind("click.dialog").bind("click.dialog",function(){_this.hide()});
			this.$show.unbind("click.dialog").bind("click.dialog",function(){_this.show()});
			this.$max.unbind("click.dialog").bind("click.dialog",function(){_this.max()});
			this.$min.unbind("click.dialog").bind("click.dialog",function(){_this.min()});
			this.$normal.unbind("click.dialog").bind("click.dialog",function(){_this.normal()});
		    return this;
	   },
	   point : function(point){
		   var p = point || {left :this.$.css('left') , top : this.$.css('top')} ;
		   if(point == null ){
			   this.$.css({ left : p.left , top : p.top });
			   return this;
		   }
		   else{
			   return p ;
		   }
		   return this;
	   },
	   zIndex : function(zIndex)
	   {
		   this.zindex = zIndex || this.zindex;
		   if(zIndex){
			   this.$.css('zIndex', zIndex);
			   return this;
		   }
		   else{
			  return this.$.css('zIndex');
		   }
		  
	   },
       /**
        * @description 局中
        * @param {function} callback 局中后的回调
        * */
	   center : function(callback)
	   {
		   this.$.center && this.$.center({ callback : callback });
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
			   if(this.options.animate){
				   	$o.stop(true).animate(p, this.duration, this.easing , callback);
			   }
			   else{
			   		$o.css(p);
			   }
		   }
		   return this;
	   },
	   /**
        * @description 层的显示
        * */
	   show  : function(hideOptions)
	   {	
		   var _options = {
		   		delay 		:  0 , 
				hideOverlay :  true
		   }
		   var options = $.extend(_options,hideOptions);
		   
		   var _this = this;
		   this.options.overlay && $.ui.dialog.overlay.show();
		   
		   var $obj = this.$;
		   var callback = function(){
			   
		   };
		   if(jQuery.support.opacity && this.options.animate){
				switch(this.options.effect)
				{
					case 'zoom'	:
						var left =  ( $(window).width() - parseFloat( this.$.attr('data-width'))) / 2 + $(window).scrollLeft();
						var top =  ( $(window).height() - parseFloat(this.$.attr('data-height'))) / 2 + $(window).scrollTop();

						$obj.css({
							width  : 0 , 
							height : 0 ,
							left   : $(window).width()/ 2 + $(window).scrollTop(),
							top	   : $(window).height() / 2 + $(window).scrollTop()
						})
						
						this.animate($obj.stop(true,true),{
							width 	: this.$.attr('data-width'),
							height	: this.$.attr('data-height'),
							left	: left,
							top		: top,
							opacity : 'show'
						},callback);
						break;
					default 	: 	
						this.center();
						this.animate($obj.stop(true,true),{ opacity : 'show'},callback);
					break;
				}
			}
			else{
				$obj.show();
				callback && callback();
			}
			
			if(options.delay){
				this.delayHide(options.delay ,options.hideOverlay);
			}
			return this;
	   },
	   hide  : function( hideCallback)
	   {		
		    var _this = this;
			var $obj = this.$;
			var callback = function(){hideCallback && hideCallback(); _this.options.callback.hide && _this.options.callback.hide()};
		    if(jQuery.support.opacity && this.options.animate){
		
				switch(this.options.effect){
					case 'zoom'	:	
						var left =   $(window).width()/ 2 + $(window).scrollLeft();
						var top =    $(window).height() / 2 + $(window).scrollTop();
						this.animate($obj.stop(true,true),{
							width  : 0,
							height : 0,
							left   : left,
							top	   : top,
							opacity: 'hide'
						}); 
					break;
					case "puff" :	$obj.effect("puff", {}, 500 , callback );break;
					default 	:	this.animate($obj.stop(true,true),{ opacity: 'hide' },callback);break;
				}
			}
			else{
				$obj.hide();
				callback && callback();
			}
			var hideOverlay ;
			if(hideOverlay == null){
				hideOverlay = true;
			}
			this.options.overlay && hideOverlay && $.ui.dialog.overlay.hide();
			return this;
	   },
	   normal : function(){
		    var _this = this;
		   
			this.size(this.normalSize(),function(){
				_this.resizeStatus = "normal";
				//_this.afterNormal.run();
			});
			return this;
	   },
	   min  : function(){
		   var _this = this;
		  
		   this.size(this.minSize(),function(){
					_this.resizeStatus = "min";
					
			});
		   return this;
	   },
	   max  : function(){
		    var _this = this;
			this.size(this.maxSize(),function(){
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
	   },	   
	   delayHide : function(delay , hideOverlay){
		  var _this = this;
		  delay && delay != -1 && setTimeout(function(){_this.hide(hideOverlay)}, delay);
	   	  return this;
	   },
	   /* 
	   		@message  [string]  : 信息
			@callback [object]  :  { ok : [function] , cancle : [function]} 回调关闭
			@objects  [object]  : {
				header 	  : [bool || string] , 为false不显示 或 头部按扭
				footer 	  : [bool || string] , 为false不显示 或 底部按扭
				ok	 	  : [bool || string] , 为false不显示 或 确定按扭
				cancle 	  : [bool || string] , 为false不显示 或 取消按扭
				hide	  : [bool || string] , 为false不显示 或 关闭按扭
				message   : [bool || string] , 为false不显示 或 信息内容
				ico		  : [bool || string] , 为false不显示 或 内容图标地址
				title	  : [bool || string]   为false不显示 或 标题名称
			}
	   */
	   conform : function(message,callback,objects){
		  var _this = this;
		  var _objects = {
		  		ok  	:  true,
				cancle 	:  true,
				header 	:  true,
				footer 	:  true,
				hide  	:  true,
				ico	  	:  true,
				title   :  true
		  } 
		  objects = $.extend(_objects , objects);
		 
		  function eldisplay(object , i){
		  	 if(!object)
				_this['$'+ i].hide();
			 else
				_this['$'+ i].show();
		  }
		  
		  for(var i in objects){
			 if($.type(objects[i]) == 'boolean'){
			 	 eldisplay(objects[i], i);
			 }
			 else if($.type(objects[i]) == 'array'){
				this['$'+ i].val(objects[i][0]).text(objects[i][0])
			 	eldisplay(objects[i][1] || true, i);
			 }
			 else{
			 	this['$'+ i].val(objects[i]).text(objects[i])
			 }
		  }

		  this.$message && this.$message.html(message);
		  
		  this.$ok.unbind('click.callback').bind('click.callback',function(){
		  	 if(callback && callback.ok){ 
			 	callback.ok() && _this.hide();
			 }
			 else{
				 _this.hide();
			 }
		  });
		  this.$cancle.unbind('click.callback').bind('click.callback',function(){
		  	 if(callback && callback.cancle){ 
			 	callback.cancle() && _this.hide();
			 }
			 else{
				 _this.hide();
			 }
		  });
		  
		  this.show();
		  return this;
	   },
	   alert : function(message,callback,objects){
		  objects = objects || {};
		  objects.footer = false;
		  this.conform(message,callback,objects);
		  return this;
	   }

	}).extend($.ui.object.prototype);
	
	$.ui.dialogs = function(selector , options){
		var _options = {
			reversion	:  true,
			index  		:  0,
			tempIndex	:  0,
			widget 		:  {
				next 	: '.dialog-next',
				prev 	: '.dialog-prev'
			}	
		}
		this.extend(selector, _options , options);
		return this;
	};

	$.ui.dialogs.extend({
		init	: function(){
			var _this = this;
			this.items = [];
			this.$.each(function(i,n){
				var dialog = new $.ui.dialog(n , _this.options);
				_this.$next.eq(i).unbind('click.dialogs').bind('click.dialogs',function(){
					_this.next();
				});
				_this.$prev.eq(i).unbind('click.dialogs').bind('click.dialogs',function(){
					_this.prev();
				});
				_this.items.push(dialog);
			})
		},
		hide	: function(index){
			if(index == null){
				index = this.tempIndex();
			}
			/*if(!this.items[index].$.is(':hidden'))
				$.ui.dialog.overlay.lock(true);
			else
				$.ui.dialog.overlay.lock(false);
			*/
			this.items[index].hide(false);
			return this;
		},
		show	: function(index){
			this.index(index)
			this.items[this.index()].show();
			return this;
		}
	}).extend($.ui.switchObject.prototype)


})(jQuery);﻿

;(function($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 切换卡效果
     * @requires  jquery.1.7.2
     * @requires  jquery.core
     * @class  tabs
     * @param {string} selector 选择器
     * @param {number} [options.index = 0] 当前索引
     * @param {boolean} [options.auto = 0] 当前索引
     * @param {event} [options.index = 'click'] 事件，click
     * @param {string} [options.duration = 'normal'] 动画速度
     * @param {string} [options.duration = 'linear'] 动画效果，easing
     * @param {string} [options.cssSelected = 'selected'] 动画效果，easing选种的样式
     * @return {object} tabs
     * @example new $.ui.tabs('.tabs');
     * */
  $.ui.tabs = function(selector,options) {
       var _options = {
            effect			: 	"fade",		// x || y || fade || img || normal
            event			: 	"click", 	// mouseover or click or hover
            auto			: 	false, 		// 自动
            index			: 	0,         	// 当前index
			tempIndex		:   0,
			easing			:	"linear",  	//linear" 和 "swing  || easeOutExpo
			duration		:   'normal',
			offset			:   1,
			cssSelected		:   'selected', //当前选种样式
			reversion		:	true,		 //是否回滚
            interval		: 	3000,
			loadCallback	:   null,       //用于动态载入
			changedCallback	:   null,
			//scrollbar		:   $("#scrollbar").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10),
			widget	 		:	{
				view		:	 '.tabs-view',   //大图片显示区域
				nav			:	 '.tabs-nav',
				panel 		: 	 '.tabs-panel',	 //图片滚动区域
				prev    	:    '.tabs-prev',
				next		:    '.tabs-next',
				clip		:	 '.tabs-clip'
			}
        }
		this.extend(selector , _options , options);
        return this;
    }
	$.ui.tabs.extend({
		init	: 	function(){
			var _this = this;
			// ui
			this.$clip.css({ overflow : 'hidden'});
			// load 
			this.update();
			// event 
			this.$next.unbind('click.tabs').bind('click.tabs',function(){ _this.next();});
			this.$prev.unbind('click.tabs').bind('click.tabs',function(){ _this.prev();});
			this.$nav.undelegate('click.tabs').delegate(this.$nav.children('li').length ? 'li' : 'a' ,this.options.event + '.tabs',function(){
				_this.goto($(this).index());
			});
			this.$panel.undelegate('click.tabs').delegate(this.$panel.children('li').length ? 'li' : 'a'  ,this.options.event + '.tabs',function(){_this.view($(this))})
						.unbind('mouseenter.tabs mouseleave.tabs').bind({
							'mouseenter.tabs' : function(){_this.stop()},
							'mouseleave.tabs' : function(){_this.options.auto && _this.start()}
						})
			
			//初始化
			this.show(this.index());
			if(this.options.auto){
				
				this.start();
			}
			return this;
		  
		},
		update	  : function(){
			var attr = {};
			var items = this.$panel.children(),
                count = items.length;
			switch(this.options.effect){
				case 'x' : attr = { width : (items.css({ 'float' : 'left'}).outerWidth() + parseFloat(items.css('margin-left'))   + parseFloat(items.css('margin-right')) ) * count } ;  break;
				case 'y' : attr = { height : (items.outerHeight() + parseFloat(items.css('margin-top'))  + parseFloat(items.css('margin-bottom')) ) * count} ; break;
				default : break;
			}
			attr.position = 'relative';
			this.$panel.css(attr);
			return this;
		},
		//获取大图片的地址
		bigImage : function(){
			return $('img',this.$nav).eq(this.index());
		},
		length  : function(){
			return this.pageCount();
		},
        pageCount : function(){
            var length = this.options.effect == 'fade' ? this.$nav.children().length : this.$panel.children().length;
            var val = parseInt( length / this.options.offset);
            return length % this.options.offset > 0 ? val + 1 : val;
        },
		offset : function(){
			var offset = 0;
			var items = this.$panel.children();
			switch(this.options.effect){
				case 'x' : offset = items.outerWidth() + parseFloat(items.css('margin-left'))  + parseFloat(items.css('margin-right')) ; offset = offset * this.options.offset; break;
				case 'y' : offset = items.outerHeight() + parseFloat(items.css('margin-top'))  + parseFloat(items.css('margin-bottom')) ; offset = offset * this.options.offset; break;
				default  : break;
			}
			return offset;
		},
		load  : function(index , callback){
			var _this = this;
			if((this.options.effect != 'x' && this.options.effect != 'y') || ((this.options.effect == 'x' || this.options.effect == 'y') && index >= this.length())){
				if(this.options.loadCallback){
					this.options.loadCallback({
						target			: this,
						index 			: this.index() ,
						$currentTarget	: this.$nav.children(':eq('+ index +')'),
						count			: this.length()
					},this.$panel , callback);
				}
				else{
					callback && callback();
				}
			}
			else{
				callback && callback();
			}
			return this;
		},
		start : function()
		{
			var _this = this;
			if(!this.timer){
				this.timer = setInterval(function(){_this.next()},_this.options.interval);
			}
			return this;
		},
		stop : function()
		{
			clearInterval(this.timer);
			this.timer = null;
		},
		view	: function($elem){
			var image = $elem;
			$('img',this.$view).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop(true,true).hide().fadeIn();
			return this;
		},
		show	: function(index){
			var _this = this;

			this.load(index , function(){
				_this.index(index);
				var $navItems = _this.$nav.children();
				$navItems.eq(_this.index()).addClass(_this.options.cssSelected);
				if(_this.index() != _this.tempIndex())
					$navItems.eq(_this.tempIndex()).removeClass(_this.options.cssSelected);

				switch(_this.options.effect){
					case 'normal': _this.$panel.children(':eq('+_this.index()+')').show();break;
					case 'fade' : _this.animate(_this.$panel.children(':eq('+_this.index()+')').stop(true,true) , { opacity : 'show'}); break;
					case 'x' 	: _this.animate(_this.$panel.stop() , { left : -_this.offset() * _this.index()}); break;
					case 'y' 	: _this.animate(_this.$panel.stop() , { top : -_this.offset() * _this.index()}); break;
					default  	: 
						var image = _this.bigImage();
						$('img',_this.$panel).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop(true,true).hide().fadeIn();
						break;
				}
				_this.options.changedCallback && _this.options.changedCallback({
					target  : _this, 
					$target : _this.$,
					$panel	: _this.$panel,
					index	: _this.index(),
					offset  : _this.offset()
					
				})
				_this.view(_this.$panel.children().eq(_this.index()));
			});
			return this;
		},
		hide	: function(index){
			switch(this.options.effect){
				case 'normal': this.$panel.children(':eq('+this.tempIndex()+')').hide();break;
				case 'fade' : this.animate(this.$panel.children(':eq('+this.tempIndex()+')').stop(true,true) , { opacity : 'hide'}); break;
				//case 'x' : this.animate(this.$panel , { left : this.offset() * index}); break;
				//case 'y' : this.animate(this.$panel , { top : this.offset() * index}); break;
				default  :  break;
			}
			return this;
		}
		
	}).extend($.ui.switchObject.prototype);

}(jQuery)); 