;(function($) {

    $.lib.ui.overlay = $.lib.createClass( {
			target : { hide	: '.hide' },
			options: {
					className		:	null,  
					css				:   { display : 'none', opacity : 0.2 , background : 'black' , 'z-index' : 999 , left : 0 , top : 0 , position  : 'absolute'},
					hide			:   { attr : { opacity : 'hide' }, duration : 'fast' , easing : 'easeOutExpo'  },
					show			: 	{ attr : { opacity : 'show' }, duration : 'fast' , easing : 'easeOutExpo'  },
					callback		:   { hide : null , init : null },
					lock     		: 	false,
					click			:   false,
					fixed			:   false,
					scroll			:   false        //{ x : false , y : true}
			}
		} , {
		init : function(selector , options){
		  var _this = this;

		  if(!this.$.length){
			  this.$ = $('<div/>').appendTo($('body'));
		  }

		  !this.$.attr('id') && this.$.attr( 'id' , 'overlay'+ parseInt(Math.random()*1000000));

		  this.resize();
		  this.$.hide().css(this.options.css);

		  $(window).bind("resize",function(){
			  _this.resize();
		  })
		  
		  this.target.hide.unbind('click.overlay').bind('click.overlay',function(){
			 _this.hide(); 
		  });
		  
		  this.options.click && this.$.click(function(){ _this.hide();})
		  
		  this.options.callback.init && this.options.callback.init();
		  return this;

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
	  scroll	   : function(status){
		  /*
		this.options.scrollbar = status == null ? this.options.scrollbar :  status;
		var attr = {};
		var html = $.browser.msie ?  'html' : 'body';
	  	if($.type(status) == 'object'){
			 if(!status.x){
				 attr['overflow-x'] = 'hidden';
			 }
			 else if(status.x == true || $.type(status.x) == 'number'){
				 attr['overflow-x'] = 'scroll';
			 }

			 if(!status.y){
				 attr['overflow-y'] = 'hidden';
			 }
			 else if(status.y == true || $.type(status.y) == 'number'){
				 attr['overflow-y'] = 'scroll';
			 }
			 $(html).css(attr);
		 }
		 else if(status == true){
			$(html).css({'overflow' : '' , 'margin-right' :  ''});
		 }
		 else{
			$(html).css('overflow','hidden');
		 	if($(document.body).height() > $(window).height()){
				$(html).css('margin-right', 17);
			}	
		 }	*/
		 this.resize();
	  },
	
	  height: function() {
		  
		  	if(this.options.scroll && this.options.scroll.y){
				if($.type(this.options.scroll.y) == 'number'){
					return this.options.scroll.y;
				}
			}
			
			function fullHeight(){
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
			}
			
			return fullHeight();
		},
	
		width: function() {
			
			if(this.options.scroll && this.options.scroll.x){
				if($.type(this.options.scroll.x) == 'number'){
					return this.options.scroll.x;
				}
			}

			function fullWidth(){
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
			}
			return fullWidth();
		},
	
		resize: function() {
			var _this = this;
			this.$.css({
				width: 0,
				height: 0
			}).css({
				width: this.width(),
				height: this.height()
			});
			return this;
	  },
	  show : function(){
		  var _this = this;
		 
		  if(this.fixed){
		  	 new $.lib.ui.fixed(this.$);
			 $('body').height($(window).height()).css('overflow','scroll')
		  }
		  this.scroll();
		  
		  if(!this.lock())
		  {  
			var $obj = this.$.show();
			var callback = function(){}
			
			if(!$obj.data('opacity')){
				$obj.data('opacity' , $obj.css('opacity'))
			}
			
			if(this.animate){
				this.options.show.attr = { opacity : $obj.data('opacity')} ;
				this.animate($obj, this.options.show , callback);
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
			 var callback = function(){_this.options.hideCallback && _this.options.hideCallback({ target : _this.$});  _this.scroll();}
			 if(this.animate){
				this.options.hide.attr = { opacity : 'hide' } ;
				this.animate(this.$, this.options.hide, callback);
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
	}).extend($.lib.ui.object);


})(jQuery);