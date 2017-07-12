;(function($) {
	$.ui.nav = function(selector,options)
	{
		var _options={
			effect			:	'normal',		  // normal | fixfade
			event			:	'mouseover',
			duration		:	"slow",
			easing			:	"easeOutExpo"
		}
	   	this.extend( selector , _options , options);
        return this;
	}
	$.ui.nav.extend({
	   init : function()
	   {
		   var _this = this;
		   var item = this.$.css('position','relative')
		   		 .find('li')
				 .css('position','relative')
				 
		  item.bind(this.event,function(){
		  	_this.show($(this).children('ul'));
		  })
		  
		  item.hover(function(){
			  if(this.event == 'hover' || this.event == 'moveover'){
		  		_this.show($(this).children('ul'));
		  	  } 
		  },function(){
			  _this.hide($(this).children('ul'));
		  })
		  
		  item.end()
			  .find('ul')
			  .css({ 
					left : 100,
					top : 0,
					'position':'absolute'
			  })
			  .hide()
			  .end()
			  .children('li')
			  .children('ul')
			  .css({ 
					top: function(){ 
						return $(this).parent().outerHeight()
						} ,
					left : 0
			  });
		  
	   },
	   show	 : function(o){
		    var prop = { 
				opacity: 'show' , 
				height : 'show' , 
				width : 'show'
			}
			this.animate(o, prop);
			 
			return this;
	   },
	   hide	 : function(o){
		    var prop = { 
				opacity: 'hide', 
				height : 'hide' , 
				width : 'hide'
			}
			this.animate(o, prop);
			return this;
	   }
	}).extend($.ui.object.prototype);
})(jQuery);﻿