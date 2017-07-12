/*
	depends : 
		jquery.core.js
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.mouse.js
		jquery.ui.draggable.js
*/
;(function($) {
  $.ui.scrollbar = function(selector,options) {
       var _options = {
		    axis			:   'x',   //x or y or xy
			widget	 		:	{
				panel 		: 	 '.scroll-panel',	 
				bar	    	:    '.scroll-bar',
				track		:    '.scroll-track',
				thumb		:    '.scroll-thumb',
				next		:	 '.scroll-next',
				prev		:	 '.scroll-prev'
			}
        }
		this.extend(selector , _options , options);
        return this;
    }
	$.ui.scrollbar.extend({
		init	: 	function(){
			var _this = this;
			this.$panel.css({position : 'relative'});
			//track
			this.$trackX = this.$track.css({ position : 'relative' , left : 0 , top : 0});
			this.$trackY = this.$track.clone(true);

			// bar
			this.$barX = this.$bar.css({ position : 'absolute' , bottom : 0 , left : 0 });
			this.$barY && this.$barY.remove()
			this.$barY = this.$bar.clone(true).css({ right : 0 , top : 0 , bottom : 'auto' , left : 'auto' });
			this.$barY.css({
				width : this.$barX.height(),
				height : this.$barX.width()
			})
			this.$.append(this.$barY);
			
			//thumb
			this.$thumbX = this.$thumb;
			this.$thumbX.draggable && this.$thumbX.draggable({ 
					//handle		: this.$block,
					containment : this.$trackX, 
					scroll		: false,  
					cursor		: 'move',
					axis  		: 'x',
					callback	: function(position){
						//$('#debug').text(_this.percent(position.left,_this.$trackX.width()) * _this.$panel.outerWidth());
						var pos = {left : _this.percent(position.left ,_this.$trackX.width()) * _this.$panel.outerWidth()};
						_this.movePanel('x',pos,false);
					}
				}
			)
			
			this.thumbOffsetX = this.$thumbX.offset(); // 当前鼠标点bar事件时,相对于页面的位置
			this.$thumbY = $(this.options.widget.thumb, this.$barY);
			this.$trackY = $(this.options.widget.track, this.$barY);
			this.$thumbY.draggable && this.$thumbY.draggable({ 
					//handle		: this.$block,
					containment : this.$trackY, 
					scroll		: false,  
					cursor		: 'move',
					axis  		: 'y',
					callback	: function(position){
						var pos = {top : _this.percent(position.top ,_this.$trackY.height()) * _this.$panel.outerHeight() };
						_this.movePanel('y',pos,false);
					}
				}
			)
			this.thumbOffsetY = this.$thumbY.offset();
			
			this.$trackX.unbind('click.scrollbar').bind('click',function(e){
				var thumbX = parseFloat(e.pageX - _this.thumbOffsetX .left),
					thumbPositionX = _this.thumbMovePosition(thumbX ,_this.$thumbX.position().left, _this.$thumbX.outerWidth()),
					panelX = _this.percent(thumbPositionX, $(this).width()) * _this.$panel.outerWidth();
					
				_this.moveThumb('x', thumbPositionX );
				_this.movePanel('x',{ left : panelX });	
			})
			
			
			this.$trackY.unbind('click.scrollbar').bind('click',function(e){
				var thumbY = parseFloat(e.pageY - _this.thumbOffsetY.top),
					thumbPositionY = _this.thumbMovePosition(thumbY ,_this.$thumbY.position().top, _this.$thumbY.outerHeight()),
					panelY = _this.percent(thumbPositionY, $(this).height()) * _this.$panel.outerHeight();
				
				_this.moveThumb('y',  thumbPositionY);
				_this.movePanel('y',{ top :  panelY } );
			})
			this.update();
			// event 
			//this.$next.unbind('click.tabs').bind('click.tabs',function(){ _this.next();});
			//this.$prev.unbind('click.tabs').bind('click.tabs',function(){ _this.prev();});
			//this.$panel.undelegate('click.tabs').delegate('li',this.options.event + '.tabs',function(){_this.view($(this).index())})
			
			return this;
		  
		},
		percent : function(cur , total){
			return   cur / total ;
		},
		/* 
			axis     : x or y  
			position : 位置
			animate	 : 是否动画
		*/
		
		movePanel	: function(axis , position ,animate){
			animate = animate == null ? true : animate;
			var attr = {};
			switch(axis){
				case 'x' : attr.left =  -position.left; break;
				case 'y' : attr.top =  -position.top; break;
				case 'xy' : case 'yx' :  attr.left =  -position.left;attr.top =  -position.top; break;
				default : break;
			}
			
			if(animate)
				this.$panel.stop(true,true).animate(attr);
			else
				this.$panel.css(attr);
			return this;
		},
		thumbMovePosition : function(currentPos ,barPos, barlength ){
			if(currentPos < barPos){
				return  currentPos;
			}
			else if(currentPos > parseFloat(barPos) + barlength){
				return currentPos - barlength;
			}
		},
		moveThumb : function(axis , currentPos){
			var attr = {}, max ;
			switch(axis){
				case 'x' : 
					max = this.$trackX.width() - this.$thumbX.outerWidth();
					if(currentPos < 0){
						attr.left = 0 ;
					}
					else if(currentPos > max){
						attr.left = max;
					}
					else{
						attr.left = currentPos ;
					}
					this.$thumbX.stop(true,true).animate(attr);
				break;
				case 'y' : 
					max = this.$trackY.height() - this.$thumbY.outerHeight();
					if(currentPos < 0){
						attr.top = 0 ;
					}
					else if(currentPos > max){
						attr.top = max;
					}
					else{
						attr.top = currentPos ;
					}
					this.$thumbY.stop(true,true).animate(attr);
				break;
				default  : break;
			}
			return this;
		},
		update	  : function(){
			var _this = this;
			
			// set width
			var width = this.$.width();
			this.$trackX.outerWidth(width); 
			this.$barX.outerWidth(width);
			var percent = parseFloat(this.$.width()) / parseFloat(this.$panel.outerWidth());
			if(percent < 1){
				this.$thumbX.outerWidth(this.$barX.width() * percent);
				this.$panel.height(function(){return $(this).height() + _this.$barX.outerHeight() * 2})
					//.css('padding-bottom' , this.$barX.outerHeight());
				this.$barX.stop(true,true).fadeIn();
			}
			else{
				this.$barX.stop(true,true).fadeOut();
			}
			//set height
			var height = this.$.height(); 
			this.$trackY.outerHeight(height);
			this.$barY.outerHeight(height);		
			percent = parseFloat(this.$.height()) / parseFloat(this.$panel.outerHeight());
			if(percent < 1){
				this.$thumbY.outerHeight(this.$barY.height() * percent);
				this.$panel.width(function(){return $(this).width() - _this.$barY.outerWidth()});
				this.$barX.outerWidth(width - this.$barY.outerWidth())
				//this.$barX.width(function(){return $(this).width() - _this.barY.outerWidth()})
				this.$barY.stop(true,true).fadeIn();
			}
			else{
				this.$barY.stop(true,true).fadeOut();
			}
			
			switch(this.options.axis){
				case 'x' : 
					this.$.css({'overflow-x' : 'hidden'})
						//.outerHeight(function(){return $(this).outerHeight() - _this.$barY.outerHeight()})
						.height('auto')
						this.$barY.hide();
					break;
				case 'y' : 
					this.$.css('overflow-y' , 'hidden')
						.width('auto')
						this.$barX.hide();
					break;
				case 'xy'  : case  'yx' :
					this.$.css({'overflow' : 'hidden'});
					break;
				default  :
					this.$barX.hide();
					this.$barY.hide();
					break;
			}
			
			return this;
		}
		
	}).extend($.ui.object.prototype);
	
})(jQuery); 