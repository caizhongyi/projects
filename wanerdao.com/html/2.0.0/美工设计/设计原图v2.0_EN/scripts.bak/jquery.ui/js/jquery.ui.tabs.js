/*
	depends : 
		jquery.core.js
		jquery.ui.core.js
		jquery.ui.widget.js
		jquery.ui.mouse.js
		jquery.ui.draggable.js
		jquery.ui.scrollbar.js
*/
;(function($ ) {
  $.ui.tabs = function(selector,options) {
       var _options = {
            effect			: 	"fade",		// x or y
            event			: 	"click", 	// mouseover or click or hover
            auto			: 	false, 		// 自动
            index			: 	0,         	// 当前index
			tempIndex		:   0,
			easing			:	"linear",  	//linear" 和 "swing  || easeOutExpo
			duration		:   'normal',
			offset			:   1,
			cssSelected		:   'selected', //当前选种样式
			reversion		:	true,		 //是否回滚
            interval		: 	3000,
			loadCallback	:   null,       //用于动态载入
			changedCallback	:   null,
			//scrollbar		:   $("#scrollbar").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10),
			widget	 		:	{
				view		:	 '.tabs-view',   //大图片显示区域
				nav			:	 '.tabs-nav',
				panel 		: 	 '.tabs-panel',	 //图片滚动区域
				prev    	:    '.tabs-prev',
				next		:    '.tabs-next',
				clip		:	 '.tabs-clip'
			}
        }
		this.extend(selector , _options , options);
        return this;
    }
	$.ui.tabs.extend({
		init	: 	function(){
			var _this = this;
			// ui
			this.$clip.css({ overflow : 'hidden'});
			// load 
			this.update();
			// event 
			this.$next.unbind('click.tabs').bind('click.tabs',function(){ _this.next();});
			this.$prev.unbind('click.tabs').bind('click.tabs',function(){ _this.prev();});
			this.$nav.undelegate('click.tabs').delegate('li',this.options.event + '.tabs',function(){
				_this.goto($(this).index());
			});
			this.$panel.undelegate('click.tabs').delegate('li',this.options.event + '.tabs',function(){_this.view($(this))})
						.unbind('mouseenter.tabs mouseleave.tabs').bind({
							'mouseenter.tabs' : function(){_this.options.auto && _this.start()},
							'mouseleave.tabs' : function(){_this.stop()}
						})
			
			//初始化
			this.show(this.index());
			if(this.options.auto){
				this.start();
			}
			return this;
		  
		},
		update	  : function(){
			var attr = {};
			switch(this.options.effect){
				case 'x' : attr = { width : this.$panel.children().css({ 'float' : 'left'}).outerWidth() * this.length() } ;  break;
				case 'y' : attr = { height : this.$panel.children().outerHeight() * this.length()} ; break;
				default : break;
			}
			attr.position = 'relative';
			this.$panel.css(attr);
			return this;
		},
		//获取大图片的地址
		bigImage : function(){
			return $('img',this.$nav).eq(this.index());
		},
		length  : function(){
			return this.options.effect == 'fade' ? this.$nav.children().length : this.$panel.children().length;
		},
		offset : function(){
			var offset = 0;
			switch(this.options.effect){
				case 'x' : offset = this.$panel.children().outerWidth() ; break;
				case 'y' : offset = this.$panel.children().outerHeight() ; break;
				default  : break;
			}
			return offset;
		},
		load  : function(index , callback){
			var _this = this;
			if((this.options.effect != 'x' && this.options.effect != 'y') || ((this.options.effect == 'x' || this.options.effect == 'y') && index >= this.length())){
				if(this.options.loadCallback){
					this.options.loadCallback({
						target			: this,
						index 			: this.index() ,
						$currentTarget	: this.$nav.children(':eq('+ index +')'),
						count			: this.length()
					},this.$panel , callback);
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
		start : function()
		{
			var _this = this;
			!this.timer && function(){
				_this.timer = setInterval(function(){_this.next()},_this.options.interval);
			}
			return this;
		},
		stop : function()
		{
			clearInterval(this.timer);
			this.timer = null;
		},
		view	: function($elem){
			var image = $elem;
			$('img',this.$view).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop(true,true).hide().fadeIn();
			return this;
		},
		show	: function(index){
			var _this = this;
			this.load(index , function(){
				_this.index(index);
				var $navItems = _this.$nav.children();
				$navItems.eq(_this.index()).addClass(_this.options.cssSelected);
				$navItems.eq(_this.tempIndex()).removeClass(_this.options.cssSelected);
				
				_this.$panel.stop();
				switch(_this.options.effect){
					case 'x' : _this.animate(_this.$panel , { left : -_this.offset() * _this.index()}); break;
					case 'y' : _this.animate(_this.$panel , { top : -_this.offset() * _this.index()}); break;
					default  : 
						var image = _this.bigImage();
						$('img',_this.$panel).attr({'src' : image.attr('data-url') ,'title' : image.attr('title')}).stop(true,true).hide().fadeIn();
						break;
				}
				_this.options.changedCallback && _this.options.changedCallback({
					target  : _this, 
					$target : _this.$,
					$panel	: _this.$panel,
					index	: _this.index(),
					offset  : _this.offset(),
					
				})
				_this.view(_this.$panel.children().eq(_this.index()));
			});
			return this;
		},
		hide	: function(index){
			switch(this.options.effect){
				//case 'x' : this.animate(this.$panel , { left : this.offset() * index}); break;
				//case 'y' : this.animate(this.$panel , { top : this.offset() * index}); break;
				default  :  break;
			}
			return this;
		}
		
	}).extend($.ui.switchObject.prototype);
	
})(jQuery); 