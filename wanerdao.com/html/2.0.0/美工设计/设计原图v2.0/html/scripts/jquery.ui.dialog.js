;(function($) {
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

//			.scroll( function() {
//				!_this.$.is(':hidden') && _this.center();
//			});
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
	   	    this.$.css({"position": "fixed",display:"none", "z-index": this.options.zIndex})
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
		   this.$.css(this.getpos());
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
				   	$o.stop(true,true).animate(p, this.duration, this.easing , callback);
			   }
			   else{
			   		$o.css(p);
			   }
		   }
		   return this;
	   },
       getpos : function(){
           var context = $(window);
           var left =  ( context.width() - this.$.outerWidth()) / 2;
           var top =  ( context.height() - this.$.outerHeight()) / 2;
           return {
               left : left,
               top  : top
           }
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


})(jQuery);