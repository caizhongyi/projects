/*
	depends : 
		jquery.core.js
		jquery.ui.widget.js
		jquery.ui.mouse.js
		jquery.ui.point.js
		jquery.ui.draggable.js
		jquery.ui.overlay.js
*/
;(function($) {
	var lib = $.lib;
	lib.tempoverlay = null ;
    lib.ui.dialog = $.lib.createClass( {
			options : {
					effect			: 	"enlarge", 		// 动画类型 fade | puff | enlarge
					className		:	null,  
					css			    :   {position: 'absolute',display:'none', 'z-index': 1000},
					resize			:   true,
					minSize			:   {},
					maxSize			:   {},
					show			:   function($obj){
						if(!$obj.data('dialog-width')){
							$obj.data('dialog-width',$obj.width());
						}
						
						if(!$obj.data('dialog-height')){
							$obj.data('dialog-height',$obj.height());
						}
						var closeAttr = {
								width  : 0,
								height : 0,
								left   : ( $(window).width()) / 2 + $(window).scrollLeft(),
								top	   : ( $(window).height()) / 2 + $(window).scrollTop()
							},
							openAttr = {
								width  : $obj.data('dialog-width'),
								height : $obj.data('dialog-height'),
								left   : ( $(window).width() - $obj.data('dialog-width')) / 2 + $(window).scrollLeft(),
								top	   : ( $(window).height() - $obj.data('dialog-height')) / 2 + $(window).scrollTop()
							};
						
						$obj.css(closeAttr);
						var animate = { attr : openAttr , duration : 'fast' , easing : 'easeOutExpo' };
						$obj.show().stop().animate(animate.attr , animate .duration , animate.esaing );
						return this;
					},
					hide			:   function($obj){
						
						if($obj.effect) {
							$obj.effect("puff", {}, 500 , callback ); //puff 效果
						}
						else{
							var closeAttr = {
								width  : 0,
								height : 0,
								left   : ( $(window).width()) / 2 + $(window).scrollLeft(),
								top	   : ( $(window).height()) / 2 + $(window).scrollTop()
							};

							var animate = { attr : closeAttr , duration : 'fast' , easing : 'easeOutExpo' }
							$obj.show().stop().animate(animate.attr , animate .duration , animate.esaing , function(){ $(this).hide()} );
						}
						return this;
					},
					size			:   { attr : {}, duration : 'slow' , easing : 'easeOutExpo' },	
					callback		:   { hide : null , show : null , init : null }
			},
			target: {
					overlay		:   function(){
						var overlay = $('[data-control=overlay]');
						if(overlay.length == 0){
							$.tempoverlay =  new lib.ui.overlay();
							return $.tempoverlay ;
						}
						else  {
						 	return $.tempoverlay ;
						}
					},          //new lib.ui.overlay()
					show 		:	'.dialog-show' ,
					hide 		:	'.dialog-hide',
					max 		:	'.dialog-max' ,
					normal 		: 	'.dialog-normal',
					min 		: 	'.dialog-min',
					header		:	'.dialog-header',
					ok			:	'.dialog-ok',
					cancle		:	'.dialog-cancle',
					header 		: 	'.dialog-header',
					footer 		: 	'.dialog-footer',
					ico	  		: 	'.dialog-ico',
					title   	:  	'.dialog-title',
					message   	:  	'.dialog-message'
			}
		
		} , {
		init : function(selector , options){
		  var _this = this;

		  if($.type(this.target.overlay) == 'function'){
		  	this.target.overlay = this.target.overlay();
		  }
		  
		  this.$.attr({ 'data-overlay' : this.target.overlay.$.attr('id')}).css(this.options.css);
		  this.$.draggable && this.$.draggable({handle: this.$header,containment: "document", scroll: false, opacity: 0.8, cursor: 'move'});
		
		  	this.target.hide.unbind("click.dialog").bind("click.dialog",function(){_this.hide()});
			this.target.show.unbind("click.dialog").bind("click.dialog",function(){_this.show()});
			this.target.max.unbind("click.dialog").bind("click.dialog",function(){_this.max()});
			this.target.min.unbind("click.dialog").bind("click.dialog",function(){_this.min()});
			this.target.normal.unbind("click.dialog").bind("click.dialog",function(){_this.normal()});

			/* resize */
			$(window).bind("resize",function(){			 
				!_this.$.is(':hidden') && _this.center();
			})
			.scroll( function() { 
				!_this.$.is(':hidden') && _this.center();
			});
			//重新计算大小
			/*this.$resizable && this.$.resizable({
					maxheight: this.maxheight,
					maxwidth: this.maxwidth,
					minheight: this.minheight,
					minwidth: this.minwidth
			});*/
			this.center();			
			
			return this;
		},
		center : function(){
			this.$.center && this.$.center();
			return this;
		},
	    update : function(){
	   	   
		   /*this.$.height('auto').attr('height',function(){
		   		return $(this).outerHeight();
		   });*/
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
			   
			   if(this.options.size){
			   	  this.options.size();
			   }
			   else{
			   	   if(this.options.animate){
						$o.stop(true).animate(p, this.duration, this.easing , callback);
				   }
				   else{
						$o.css(p);
				   }
			   }
		   }
		   return this;
	   },
	   
	   /* delay  : 多长时间后关闭 */
	   show  : function(callback)
	   {	
	   	   this.update();

		   var _this = this,
		   		$obj = this.$,
				callback = function(){
				   $(this).height('auto');
			    };
				
		   this.status('show');
		   this.target.overlay && this.target.overlay.show();

		   this.animate($obj,this.options.show , callback );
		   return this;
	   },
	   hide  : function(callback)
	   {		
			var _this = this;
			var $obj = this.$;
			var callback = function(){};
			this.status('hide');
			
			this.animate($obj,this.options.hide , callback );

			!this.hasOpen() && this.target.overlay && this.target.overlay.hide();
			return this;
	   },
	   hasOpen : function(){
		  var hasOpen = false;
	   	  $('[data-control=dialog]').each(function(i ,n ){
		  	 if($(n).attr('data-status') == 'show'){
			 	hasOpen = true;
				return false;
			 }
		  })
		  return hasOpen;
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
				_this.target[i].hide();
			 else
				_this.target[i].show();
		  }
		  
		 try{
			  for(var i in objects){ 
			  	 switch($.type(objects[i])){
				 	case 'boolean' :  
						eldisplay(objects[i], i);
						break;
					case 'array'   :	 
						this.target[i].val(objects[i][0]).text(objects[i][0]) ;
						eldisplay(objects[i][1] || true, i);
						break;
					case 'string' :	
						this.target[i].show(); 
						if(this.target[i][0] && this.target[i][0].tagName == 'IMG'){
						 	this.target[i].attr('src',objects[i]);
					    }
						else{
							
							this.target[i].val(objects[i]).text(objects[i])
					 	}
						break;
				 }
			  }
		  }
		  catch(e){
			 console && console.log(e);
		  }
		  
		  this.target.message && this.target.message.html(message);
		 
		  this.target.ok.unbind('click.callback').bind('click.callback',function(){
		  	 if(callback && callback.ok){ 
			 	if(callback.ok() != false) _this.hide();
			 }
			 else{
				 _this.hide();
			 }
		  });
		  this.target.cancle.unbind('click.callback').bind('click.callback',function(){
		  	 if(callback && callback.cancle){ 
			 	if(callback.cancle()!= false) _this.hide();
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
	}).extend(lib.ui.object);
	
	lib.ui.pop = {
		dialog  : null,
		html	: null,
		alert   : function(msg,title,options){
			return this.conform(msg , title , options);
		},
		conform : function(msg , title , options){
				
		}
	}
	
   /*
	lib.ui.dialogs = function(selector , options){
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
	}
	lib.ui.dialogs.extend({
		init	: function(){
			var _this = this;
			this.items = [];
			this.$.each(function(i,n){
				var dialog = new lib.ui.dialog(n , _this.options);
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
				lib.ui.dialog.overlay.lock(true);
			else
				lib.ui.dialog.overlay.lock(false);
			
			this.items[index].hide(false);
			return this;
		},
		show	: function(index){
			this.index(index)
			this.items[this.index()].show();
			return this;
		}
	}).extend(lib.ui.switchObject.prototype)*/
})(jQuery);