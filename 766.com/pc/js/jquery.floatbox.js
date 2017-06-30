;(function ($) {
	
	var debug = true;
	if(!$.ishtml){
		$.ishtml = function(html){
			//如果不存在则以html型式加入文档
			if(/<(.*)>.*<\/.*>|<(.*)\/>/.test(html)){
				return true;
			}
			else{
				return false;
			}
		}
	}
	
	$.fn.floatbox = function(event , target , options){
		var $obj = $(this);
		var _options = {
			show		: { attr : { opacity : 1 }, duration : 'normal' , easing : 'linear'},  //{ duration : 'normal' , easing : 'linear'} or function($obj){};
			hide		: { attr : { opacity : 0 }, duration : 'normal' , easing : 'linear'},
			move		: { duration : 'normal' , easing : 'linear'},
			box			: '<div id="floatbox" style="background:red;position:absolute; width:100px; height:100px;"></div>',     			 //string || jquery  || selector
			context	    : $(window),
			offset	    : { x : 0,  y : 0},
			position    : 'r'    			 // [t] 上 & [tl | lt ]  左上 & [tr | rt ]  右上  & [l]  左 & [r]  右 &[br | rb ]  右下  & [bl | lb ]  左下  & [b]  下  && { x : 0 , y : 0}         
		}
		
		$(window).live('reisze.flaotbox').live('reisze.flaotbox',function(){
			show($obj);
		})
		
		if($.type(target) == 'object' ){
			options = target ;
			target = null;
		}
		
		options = $.extend(true , {} , _options , options);
		
		var $context = $(options.context),
			maxSize = { width : $context.width() , height : $context.height() };

		

		var show  = function($obj){
					$box.stop().show();
					moveTo($obj);
			},
			hide  = function(){
					$box.stop();
					animate($box,options.hide,function(){$(this).hide();})
			},
			$box = $(options.box);
		
		
		
		if($.ishtml(options.box)){
			$(document.body).append($box);
		}

		
		if(event == 'click'){
			//点击
			var evt = event + '.floatbox';
			if(target){
				$(this).die(evt).live(evt,target,function(event){
					show($(this));
					event.stopPropagation() 
				})
			}
			else{
				$(this).unbind(evt).bind(evt,function(event){
					show($(this));
					event.stopPropagation() 
				})
			}
			$box.die(evt).live(evt,function(event){
				event.stopPropagation() 
			})
			
			$(document).die(evt).live(evt,function(){
				hide();
			})
		}
		else{
			//hover
			var mouseenter = 'mouseenter.floatbox',
				mouseleave = 'mouseleave.floatbox',
				timeout = null;
				
			if(target){
				$(this).die(mouseenter).live(mouseenter, target ,function(){
					clearTimeout(timeout);
					show($(this));
				}).die(mouseleave).live(mouseleave,target,function(){
					timeout = setTimeout(hide,400);
				})
				
				$box.die(mouseenter).live(mouseenter,target,function(){
					clearTimeout(timeout);
					show($(this));
				}).die(mouseleave).live(mouseleave,target,function(){
					timeout = setTimeout(hide,400);
				})
			}
			else{
				$box.die(mouseenter).live(mouseenter,function(){
					clearTimeout(timeout);
					show($(this));
				}).die(mouseleave).live(mouseleave,function(){
					timeout = setTimeout(hide,400);
				})
				
				$(this).die(mouseenter).live(mouseenter,function(){
					clearTimeout(timeout);
					show($(this));
				}).die(mouseleave).live(mouseleave,function(){
					timeout = setTimeout(hide,400);
				})
			}
		}

		//设置位置
		function position ($target , $obj , position, offset){
			var pos = { left : 0 , top : 0 } ;
			offset = offset  || { x : 0 , y : 0};
		
			switch(position){
					case 't'  : pos.top = top($target , $obj);pos.left = $target.offset().left; break;
					case 'tl' : case 'lt' : pos.top = top($target , $obj); pos.left = left($target , $obj);break;
					case 'tr' : case 'rt' : pos.top = top($target , $obj); pos.left = right($target , $obj);break;
					case 'l'  : pos.left = left($target , $obj) ;pos.top = $target.offset().top;break;
					case 'r'  : pos.left = right($target , $obj) ;pos.top = $target.offset().top; break;
					case 'bl' : case 'lb' : pos.top = bottom($target , $obj) ; pos.left = left($target , $obj);break;
					case 'br' : case 'rb' : pos.top = bottom($target , $obj) ; pos.left = right($target , $obj) ;break;
					case 'b'  : pos.top = bottom($target , $obj);pos.left = $target.offset().left; break;
					default   : break;
			}
			
			var attr = { left : pos.left + (offset.x || 0) , top : pos.top  + (offset.y || 0)};
			if(options.move){
				options.show.attr.left = attr.left ;
				options.show.attr.top = attr.top ;
			}
			else{
				$obj.css(attr);
			}
			animate($obj.stop().css('opacity', 0),options.show);
	     }
		 
		 function isOuterLeft(tempLeft , $target, maxWidth){
			 return tempLeft < 0 ? true : false; 
		 }
		 
		 function isOuterRight(tempLeft ,$target, maxWidth){
			 return tempLeft + $target.outerWidth() > maxWidth ? true : false; 
		 }
		 
		 function isOuterTop(tempTop ,$target, maxHeight){
			 return tempTop < 0 ? true : false; 
		 }
		 
		 function isOuterBottom(tempTop ,$target, maxHeight){
			
			 return tempTop + $target.outerHeight() > maxHeight ? true : false; 
		 }
		
		 function animate($obj , event , callback ){
			if($.type(event) == 'function'){
				event($obj);
			}
			else{
				$obj.animate(event.attr , event.duration , event.easing, callback);
			}
		 }
		 
		 function top($target , $obj){
			var temp = $target.offset().top - $obj.outerHeight();
		
			if(isOuterTop(temp , $obj , maxSize.height))
				return bottom($target , $obj);
			else
			    return  temp;	 

		 }
		 
		 function left($target , $obj){
			var temp =  $target.offset().left  - $obj.outerWidth()  ;
			
			if(isOuterLeft(temp ,$obj , maxSize.width))
				return right($target , $obj);
			else
			    return temp;
		 }
		 
		 function right($target , $obj){
			var temp = $target.offset().left + $target.outerWidth(); 
			
			if(isOuterRight(temp ,$obj , maxSize.width))
				return left($target , $obj);
			else
			    return  temp ;
		 }

		 function bottom($target , $obj){
			var temp = $target.offset().top +  $target.outerHeight(); 
			
			if(isOuterBottom(temp ,$obj , maxSize.height))
				return top($target , $obj);
			else
			    return temp;
		 }
		 
		 function moveTo($obj){
	  	 	 position($obj,$box,options.position,options.offset);
		 }
		
	   
	  	 return this;
    }
})(jQuery);