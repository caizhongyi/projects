;(function($) {
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
		  		"position" 	 : "fixed",
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
})(jQuery);