var Carousel = (function($,window,undefined){
	"use strict";

	var timer,
		setTimeout = window.setTimeout;

	var cssTransform = function (x, y) {
			var translation = 'translate(' + x + 'px,' + y + 'px)';
			return {
				'-webkit-transform': translation,
				'-moz-transform': translation,
				'-ms-transform': translation,
				'-o-transform': translation,
				'transform': translation
			};
		};

	var Carousel = function(container,config){
		this.animating = false;
		this.index = 0;
		this.initDis = 0;
		this.container = $('#'+container);
		this.liWidth = this.container.width();
		this.items = this.container.find('ul > li.pic');
		this.itemslength = this.items.length;
		this.delayed = (config && config.delayed) || 5000;
		// 如果元素大于1初始化
		if(this.itemslength > 1){
			this.init();
		}
	};
	Carousel.prototype.init = function(){
		
		this.setStatu();
		this.bindEvent();
		this.autoPlay();
	}
	Carousel.prototype.setStatu = function(){
		// 对两张图做兼容处理
		// if(this.itemslength == 2 ){
		// 	this.items.clone().appendTo(this.items.parent());
		// 	this.items = this.container.find('ul > li');
		// 	this.itemslength = 4;
		// 	this.isTwo = true;
		// }
		// this.items.width(this.liWidth);

		var showWidth = 30
		var __liMargin = ((this.liWidth - 219)/2 - showWidth)/2

		this.moveDis = this.liWidth - (__liMargin*2+showWidth*2);

		var ul = this.items.parent();

		ul.width(this.liWidth*this.itemslength).css({'padding-left':__liMargin+showWidth,});
		ul.css(cssTransform(0,0));
		this.items.css({'margin-left':__liMargin,'margin-right':__liMargin});

		var _indicator = $('.indicator');
		console.log(_indicator.length)
		if(_indicator.length === 0){
			_indicator = $('<div class="indicator"><ul></ul></div>').appendTo(this.container);
		}
		var __li = ''
		for (var i = 0, l = this.isTwo ? 2 : this.itemslength; i < l; i++){
			__li += '<li></li>';
		}
		
		_indicator.find('ul').html(__li);

		this.indicator = _indicator.find('li');
		this.setIndicator(this.index);
		// this.setElemPos();

		// 初始化完成，隐藏loading元素
		setTimeout(function(){
			$('#loading').hide();
			$('body').removeClass('loading');
		},300);
	}
	Carousel.prototype.autoPlay = function(){
		return
		var self = this,
			ul = this.items.parent();
		timer = setTimeout(function(){
			if(!self.animating){
				self.next(ul);
				self.autoPlay();
			}
		},self.delayed);
		
	}
	Carousel.prototype.setElemPos = function(){
		var index = this.index;
		var prevIndex = index == 0 ? this.itemslength-1 : index-1;
		var nextIndex = index == this.itemslength-1 ? 0 : index+1;

		var margin = (this.liWidth - 219)/2+20

		this.items.eq(index).css(cssTransform(-index*this.liWidth,0)).addClass('show');

		var prevDis = -(prevIndex+1)*this.liWidth
		var nextDis = -(nextIndex-1)*this.liWidth
		var prevEl = this.items.eq(prevIndex).css(cssTransform(prevDis,0)).addClass('show');
		var nextEl = this.items.eq(nextIndex).css(cssTransform(nextDis,0)).addClass('show');


		// nextEl.find('img').css(cssTransform(-300,0))

		// setTimeout(function(){
		// 	prevEl.find('img').addClass('animating').css(cssTransform(margin,0))
		// 	nextEl.find('img').addClass('animating').css(cssTransform(-margin,0))
			// setTimeout(function(){
			// 	prevEl.removeClass('animating')
			// 	nextEl.removeClass('animating')
			// },350)
		// },350)

	}
	Carousel.prototype.setIndicator = function(index){
		var index = this.isTwo ? (index > 1 ? index - 2 : index) : index ;
		this.indicator.removeClass('current');
		this.indicator.eq(index).addClass('current');
	}
	Carousel.prototype.bindEvent = function() {
		var touch = {},
			ul = this.items.parent(),
			self = this;
		this.container.bind('touchstart mousedown',function(event){
			if(!this.animating && (!event.originalEvent.touches || event.originalEvent.touches.length === 1)){
				clearTimeout(timer);
				touch.drag = true;
				touch.initX = event.pageX || event.originalEvent.touches[0].pageX;
				touch.initY = event.pageY || event.originalEvent.touches[0].pageY;
			}
			//event.preventDefault();
		});
		this.container.bind('touchmove mousemove',function(event){
			if(touch.drag && !touch.scrollY){
				var currentX = event.pageX || event.originalEvent.touches[0].pageX,
					currentY = event.pageY || event.originalEvent.touches[0].pageY;
				var dis = touch.dis = currentX - touch.initX;
				if(Math.abs(dis) < Math.abs(currentY - touch.initY)){
					touch.scrollY = true;
					//console.log(1);
					//alert(1);
					//return;
				}else{
					// right:true / left: false
					touch.dic = dis < 0 ? true : false;
					ul.css(cssTransform(self.initDis+dis,0));
					event.preventDefault();
				}
				
			}
		});
		this.container.bind('touchend mouseup',function(event){
			if(touch.drag && !touch.scrollY){
				// ul.removeClass('draging');
				if(Math.abs(touch.dis) > 60){
					touch.dic ? self.next(ul) : self.prev(ul);
				}else{
					// touch.dic ? self.updatePos(ul,0) : self.updatePos(ul,self.liWidth);
					self.updatePos(ul,self.initDis)
				}
			}
			self.autoPlay();
			touch = {};
		});
	}
	Carousel.prototype.next = function(elem){
		if(this.index >= this.itemslength -1){
			// this.index =0
			this.index =this.itemslength -1
		}else{
			this.index++;
		}
		this.updatePos(elem,-this.moveDis*this.index);
	}
	Carousel.prototype.prev = function(elem){
		if(this.index <= 0){
			// this.index = this.itemslength-1;
			this.index = 0;
		}else{
			this.index --;
		}
		this.updatePos(elem,-this.moveDis*this.index)
	}
	Carousel.prototype.updatePos = function(elem,x){
		var self = this;
		elem.addClass('animating');
		this.animating = true;
		elem.css(cssTransform(x,0));
		this.setIndicator(this.index);



		setTimeout(function(){
			self.animating = false;
			self.initDis = x;
			elem.removeClass('animating');
			// elem.css(cssTransform(0,0));
			self.items.removeClass('show');
			// self.setElemPos();
		},300);
	}

	return Carousel;
})(jQuery,window);

window.onload = function(){
	var carousel = new Carousel('carouselWrap');
}