
(function($){  
     $.ui.fixed = function(selector , options){ 
         var _options = { 
		   x 			 : 'right 0',			// [left 500] | [right 500] fixed位置
		   y 			 : 'bottom 0',			// [bottom 500] | [top 500] fixed位置
		   axis 		 : 'y',					// x | y 横向域纵向运动
		   minWidth		 :  0,				    //限制在某元素外
		  // innerContainer:  null,				//限制在某元素内
		   status		 :	"show",
		   duration		 :	"fast", 
		   easing		 :  'linear',
		   minVal		 :	200,
		   widget		 :	{
		      fixbar 	 :	".fixbar"
		   }
         }
		 
		 this.extend( selector , _options, options );
		 return this; 
	}
	$.ui.fixed.extend({
	  init : function()
	  {
		 var _this = this;
		 this.$fixbar.css("cursor","pointer");
		 this.size = {w : this.$.outerWidth() , h : this.$.outerHeight()};
		
		 this.winSize = { width : $(window).width(), height : $(window).height()};
		
		 var positionX = this.options.x.split(' ');
		 var positionY = this.options.y.split(' ');
		 
		 this.posX = { pos  : positionX[0] ,  val : positionX[1] || 0};
		 this.posY= { pos  : positionY[0] ,  val : positionY[1] || 0};

		 this.normalPos = { x : this.posX , y : this.posY }; 
		 
		 this.setPosition(this.posX , this.posY , this.options.axis);
		 this.$fixbar.click(function(){ _this.toggle();});
		
		 $(window).resize(function(){
			_this.posX.val = _this.getPositionX(_this.posX, {width : $(this).width(), height: $(this).height()});
		 	_this.setPosition(_this.posX, _this.posY, _this.options.axis );
		 });
		
		 if(this.options.status == "hide")
		 {
			this.hide();
		 }
	  },
	  show : function()
	  {
		  var prop = {};
		  switch(this.options.axis)
		  {
			    case 'y' : prop.height = this.size.h ;break;
				case 'x' : prop.width = this.size.w; break;
		  }
		  this.animate(this.$ , prop);
		  this.options.status="show";
	  },
	  hide : function()
	  {
		  var prop = {};
		  switch(this.options.axis)
		  {
			   case 'y' : prop.height = this.options.minVal;break;
			   case 'x' : prop.width = this.options.minVal; break;
		  }
		  this.animate(this.$ , prop);
		  this.options.status="hide";
	  },
	  toggle : function()
	  {
		  if(this.options.status=="hide")
			 this.show();
		  else
			 this.hide();
	  },
	  getPositionX : function(x , winSize){
		     var posX = parseFloat(x.val);
		  
		  		/*var w = $(this.outerContainer).outerWidth() ;
				if(x.pos == 'right'){
					w = w + this.$.outerWidth();
				}
				//else if(x.pos == 'left'){	
				//}
			    if($(window).width() < w){
						posX = 0;
				}
			 // $('#pos').html($(this.outerContainer)[0].x);*/
			   
			  if(winSize)
			  { 
			  	  var diff = (this.winSize.width - winSize.width) /2 ;
				 
				  if(winSize.width > this.this.options.minWidth && this.winSize.width > this.this.options.minWidth){
						  posX -= diff ;
				  }
				  else if(winSize.width > this.this.options.minWidth)
				  {
						posX = (winSize.width - this.this.options.minWidth)/2 ;
						if(x.pos == 'right'){
						  posX -= this.$.outerWidth();
					   }
				  }
				  else{
					  posX = 0 ;
				  }
				  this.winSize = winSize;
			  }
			  return posX;
	  },
	  /*
	  	 positionX  : 'left 100'
		 positionY  : 'top 100'
		 axis 	    : 运动方向
	  */
	  setPosition	: function(positionX,  positionY , axis ){
		
		 var _this = this;
		 var x = positionX;
		 var y = positionY;
		
		 function fixedIE6Browse()
	     {
			 $("body class="pBgB"").css({"background-image":"url(about:blank)","background-attachment":"fixed"});
			 _this.$.css({"position":"absolute"});
			 if(x.pos == 'left' && y.pos == 'top')
			 {
				 _this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+'+x.val+')');
				 _this.$[0].style.setExpression("top",'eval(document.documentElement.scrollTop+'+y.val+')');
			 }
			  if(x.pos == 'right' && y.pos == 'top')
			 {
				_this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ x.val +')');
				_this.$[0].style.setExpression("top",'eval(document.documentElement.scrollTop+'+y.val+')');
				
			 }
			  if(x.pos == 'left' && y.pos == 'bottom')
			 {
				  _this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+'+x.val+')');
				  _this.$[0].style.setExpression("top",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ y.val +')');
			 }
			  if(x.pos == 'right' && y.pos == 'bottom')
			 {
				_this.$[0].style.setExpression("left",'eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0 + '+ x.val +')');
			    _this.$[0].style.setExpression("top",'eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0+ '+ y.val +'))');
			 }
	     }
		 
		 function fixedBrowse()
		 {
			 _this.$.css({"position":"fixed"});
			
			 if(x.pos == 'left')
			 {
				 _this.$.css('left',x.val+"px");
		     }
			 else if(x.pos == 'right')
			 {
				
				 _this.$.css('right',x.val+"px");
		     }
			 if(y.pos == 'top')
			 {
				 _this.$.css('top',y.val+"px");
		     }
			 else  if(y.pos == 'bottom')
			 {
				 _this.$.css('bottom',y.val+"px");
		     }
	     }

		 switch (this.options.axis)
		 {
			 case 'x' : this.options.minVal = this.$fixbar.length > 0 ? this.$fixbar.width() : this.options.minVal ; break;
			 case 'y' : this.options.minVal = this.$fixbar.length > 0 ? this.$fixbar.height() : this.options.minVal ; break;
			 default  : this.options.minVal = this.$fixbar.length > 0 ? this.$fixbar.width() : this.options.minVal ; break;
	     }
		 
		  
		//如果是IE6
		if($.browser.msie&&$.browser.version=='6.0')
			fixedIE6Browse();
		else
			fixedBrowse();
	  }
	}).extend($.ui.object.prototype);

})(jQuery); 
