/*
	depends : 
		jquery.core.js
		jquery.ui.widget.js
		jquery.ui.mouse.js
		jquery.ui.point.js
		jquery.ui.draggable.js
		jquery.ui.scrollbar.js
*/

;(function($) {

	$.createClass($.ui,'slider', {
			target : {
					carousel	:   '.slider-carousel',
					carouselPrev:   '.carousel-prev',
					carouselNext:   '.carousel-next',
					carouselList:   '.carousel-list',
					view 		:	'.slider-view',
					nav 		:	'.slider-nav',
					panel 		:	'.slider-panel',
					prev 		: 	'.slider-prev',
					next 		: 	'.slider-next',
					clip		:	'.slider-clip'
			} , 
			options: {
					effect			: 	'fade', 	  // x || y || fade || img || normal
					event			:   'click',
					auto		    :   false,
					interval		: 	3000,
					reversion		:	true,		 //是否回滚 {disable : 'disable'}
					index			:   { cur : 0 , temp : 0},
					offset			:	1,			 // 偏移的个数
					className		:	null,  
					//itemSelector	:   { nav : 'li' , panel : 'li'}, //绑定事件的选择器
					css			    :   {},
					animate			:   { duration : 'slow' , easing : 'easeOutExpo' },  // false || null || true
					selected		:   'selected',
					carousel		:   { duration : 'slow' , easing : 'easeOutExpo' }, 
					callback		:   { hide : null , show : null , change : null , load : null}
			}
		} , {
		init : function(selector , options){
			var _this = this;
		    this.options.index.temp = this.options.index.cur;
		    this.target.clip.css({ overflow : 'hidden' ,  position : 'relative'});
			// load 
			this.update();
			// event
			var evtClick = 'click.slider';
			
			this.target.next.unbind(evtClick).bind(evtClick,function(){ _this.next();});
			this.target.prev.unbind(evtClick).bind(evtClick,function(){ _this.prev();});
			

			var event = this.options.event + '.slider',
				navSelector = 'a',
				panelSelector  = 'div';
				
				if(this.target.nav.length){
					if(this.target.nav[0].tagName == 'UL' || this.target.nav[0].tagName == 'OL'){
						navSelector = 'li';
					}
				}
				
				if(this.target.panel.length){
					if(this.target.panel[0].tagName == 'UL' || this.target.panel[0].tagName == 'OL'){
						panelSelector = 'li';
					}				
				}
				
			
			this.target.nav.undelegate(event).delegate(navSelector , event ,function(){
				_this.target.nav.children().removeClass(_this.options.selected)
				$(this).addClass(_this.options.selected);
				_this.to($(this).index());
			});
			this.target.panel
						.undelegate(evtClick).
						delegate(panelSelector , event ,function(){_this.view($(this))})
						.unbind('mouseenter.slider mouseleave.slider').bind({
							'mouseenter.tabs' : function(){_this.stop()},
							'mouseleave.tabs' : function(){_this.options.auto && _this.start()}
						})
			if(this.options.effect != 'x' && this.options.effect != 'y' ){
				this.target.panel.children(panelSelector).hide();
			}
			
			//初始化
			this.show(this.index());
			if(this.options.auto){
				this.start();
			}
			
			/* carousel */
			this.carouselInit();
			
			return this;
		},
		carouselInit   : function(){
			var _this = this;
			this.carouselIndex = 0;
			this.target.carousel.css('overflow','hidden');
			this.target.carouselList.css({
				width : function(){
					return _this.carouselItemWidth();
				}
			})
			var evt = 'click.carousel';
			this.target.carouselPrev.off(evt).on(evt,function(){
				if(this.carouselIndex < this.carouselPageCount() - 1)
					this.carouselMove(this.carouselIndex + 1);
			})
			
			this.target.carouselNext.off(evt).on(evt,function(){
				if(this.carouselIndex > 0)
					this.carouselMove(this.carouselIndex - 1);
			})
		},
		carouselItemWidth : function(){
			var items = this.target.carouselList.children();
			return items.length * items.outerWidth() + parseFloat(items.css('margin-left')) + parseFloat(items.css('margin-right'));
		},
		carouselMove  : function(index){
			this.options.animate.attr = { left : - this.carouselPageSize() * this.carouselItemWidth()  * index};
			this.animate(this.target.carousel , this.options.carousel);
		},
		carouselPageSize : function(){
			var width = this.carouselItemWidth(),
				count = parseInt(this.target.carousel.width() / width);
			return this.target.carousel.width() % width > width ? count + 1 : count;
		},
		carouselPageCount : function(){
			var width = this.carouselPageSize(),
				page = parseInt(this.target.carouselList.width() / width);
			return this.target.carouselList.width() % width > width ? page + 1 : page;
		},
		update	  : function(){
			var attr = {};
			var items = this.target.panel.children(),
				maxlength = this.target.panel.children().length;
			switch(this.options.effect){
				case 'x' : attr = { width : (items.css({ 'float' : 'left'}).outerWidth() + parseFloat(items.css('margin-left'))   + parseFloat(items.css('margin-right')) ) * maxlength } ;  break;
				case 'y' : attr = { height : (items.outerHeight() + parseFloat(items.css('margin-top'))  + parseFloat(items.css('margin-bottom')) ) * maxlength} ; break;
				case 'fade' : items.css({'position' : 'absolute', left : 0 , top : 0});
				default : break;
			}
			attr.position = 'relative';
			this.target.panel.css(attr);
			return this;
		},
		//获取大图片的地址
		bigImage : function(){
			return $('img',this.target.nav).eq(this.index());
		},
		length  : function(){
			return $.pageSize(this.options.offset,this.target.panel.children().length);
		},
		offset : function(){
			var offset = 0;
			var items = this.target.panel.children();
			switch(this.options.effect){
				case 'x' : offset = (items.outerWidth() + parseFloat(items.css('margin-left'))  + parseFloat(items.css('margin-right'))) * this.options.offset; break;
				case 'y' : offset = (items.outerHeight() + parseFloat(items.css('margin-top'))  + parseFloat(items.css('margin-bottom'))) * this.options.offset ; break;
				default  : break;
			}
			return offset;
		},
		//载入数据
		load  : function(index , callback){
			var _this = this;
			if((this.options.effect != 'x' && this.options.effect != 'y') || ((this.options.effect == 'x' || this.options.effect == 'y') && index >= this.length())){
				if(this.options.loadCallback){
					this.options.loadCallback({
						target			: this,
						index 			: this.index() ,
						$currentTarget	: this.target.nav.children(':eq('+ index +')'),
						count			: this.length()
					},this.target.panel , callback);
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
		//开始自动切换
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
		//大图显示
		view	: function($elem){
			var image = $elem;
			$('img',this.target.view).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop(true,true).hide().fadeIn();
			return this;
		},
		show	: function(index){
			var _this = this;
			this.load(index , function(){
				_this.index(index);
				var $navItems = _this.target.nav.children();
				$navItems.eq(_this.index()).addClass(_this.options.selected);
				if(_this.index() != _this.tempIndex())
					$navItems.eq(_this.tempIndex()).removeClass(_this.options.selected);

				switch(_this.options.effect){
					case 'normal': _this.target.panel.children(':eq('+_this.index()+')').show();break;
					case 'fade' :
						 _this.options.animate.attr = { opacity : 'show'};
						 _this.animate(_this.target.panel.children(':eq('+_this.index()+')'), _this.options.animate );
						 break;
					case 'x' 	: 
						_this.options.animate.attr = { left : -_this.offset() * _this.index()};
						_this.animate(_this.target.panel , _this.options.animate);
						break;
					case 'y' 	: 
						_this.options.animate.attr = { top : -_this.offset() * _this.index()};
						_this.animate(_this.target.panel , _this.options.animate); 
						break;
					default  	: 
						var image = _this.bigImage();
						$('img',_this.target.panel).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop().hide().fadeIn();
						break;
				}
				_this.options.callback.change && _this.options.callback.change({
					target  : _this, 
					$target : _this.$,
					$panel	: _this.target.panel,
					index	: _this.index(),
					offset  : _this.offset()
					
				})
				_this.view(_this.target.nav.children().eq(_this.index()));
			});
			return this;
		},
		hide	: function(index){
			switch(this.options.effect){
				case 'normal': this.target.panel.children(':eq('+this.tempIndex()+')').hide();break;
				case 'fade' : 
					this.options.animate.attr = { opacity : 'hide'};
					this.animate(this.target.panel.children(':eq('+this.tempIndex()+')'), this.options.animate); 
					break;
				//case 'x' : this.animate(this.target.panel , { left : this.offset() * index}); break;
				//case 'y' : this.animate(this.target.panel , { top : this.offset() * index}); break;
				default  :  break;
			}
			return this;
		}
	}).extend($.ui.swobject);
	
}(jQuery)); 