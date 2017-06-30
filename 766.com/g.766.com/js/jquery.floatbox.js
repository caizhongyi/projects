/*
 * @name jquery.boxFloat
 * param {object} options
 * */

;(function ($) {
	/**
	 * @name boxFloat
	 * @memberOf $
	 **/
	$.boxFloat  = $.boxFloat || {};

	/**
	 * @name effects
	 * @memberOf $.boxFloat
	 **/
	$.boxFloat.effects = {
		/**
		 * @description move_default
		 **/
		move_default : {
			show : function(pos){
				pos.opacity = 'show';
				$(this).stop(true,true).animate(pos,'fast');
				return this;
			},
			hide : function(){
				$(this).stop(true).fadeOut('fast');
				return this;
			}
		},
		/**
		 * @description default
		 **/
		'default' : {
			show : function(pos){
				$(this).css(pos).stop(true).fadeIn('fast');
				return this;
			},
			hide : function(){
				$(this).stop(true).fadeOut('fast');
				return this;
			}
		},
		/**
		 * @description easeOutElastic
		 **/
		easeOutElastic : {
			show : function(pos){
				$(this).css(pos).stop(true,true).fadeIn('fast');
				return this;
			},
			hide : function(){
				$(this).stop(true).fadeOut('fast');
				return this;
			}
		},
		/**
		 * @description move_easeOutElastic
		 **/
		move_easeOutElastic : {
			show : function(pos){
				pos.opacity = 'show';
				$(this).stop(true,true).animate(pos,'slow','easeOutElastic');
				return this;
			},
			hide : function(){
				$(this).stop(true).stop(true,true).enlargeOut('slow','easeOutElastic');
				return this;
			}
		},
		/**
		 * @description enlarge_easeOutElastic
		 **/
		enlarge_easeOutElastic : {
			show : function(pos){
				var $obj = $(this);
				if(!$obj.data('enlarge_easeOutElastic_size')){
					var size = {
						width : $obj.width(),
						height : $obj.height()
					};
					$obj.data('enlarge_easeOutElastic_size',size);
				};

				var p = {
					left : pos.left + $obj.width()/2,
					top : pos.top + $obj.height()/2,
					width : 0,
					height : 0
				};

				$obj.css(p).stop().show().enlargeIn($obj.data('enlarge_easeOutElastic_size'),'slow','easeOutElastic');
				return this;
			},
			hide : function(){
				$(this).stop(true,true).enlargeOut('slow','easeInElastic',function(){
					$(this).css({
						width : $(this).data('enlarge_easeOutElastic_size').width,
						height  : $(this).data('enlarge_easeOutElastic_size').height
					}).hide();
				});
				return this;
			}
		}
	};
	/**
	 * @name $items
	 * @type {jQuery[Array]}
	 * @memberOf $.boxFloat
	 **/
	$.boxFloat.$items = $([]);


	/**
	 * @author caizhongyi
	 * @version 1.0
	 * @description 浮动层
	 * @constructor
	 * @name boxFloat
	 * @requires  jquery.1.7.2
	 * @memberOf $.fn
	 * @param {string} event 绑定事件
	 * @param {string} target 绑定对象
	 * @param {object} options 配置
	 * @param {string} [options.effect=default] 特效
	 * @param {string} [options.selected=selected]绑定事件
	 * @param {boolean} [options.move=false] 绑定事件
	 * @param {object} [options.context=$(window)] 绑定事件
	 * @param {object} [options.box=null] 显示的浮动层,也可以在点击标签上加rel=".layer"
	 * @param {object} [options.offset={ x : 0,  y : 0}] 偏移量
	 * @param {object} [options.axis=xy] 是否只限置哪个方面可以左右或上下动态显示
	 * @return {object} jquery对象
	 * @example
	 $('#list2').boxFloat('click', 'li', { effect : 'enlarge_easeOutElastic', position: 't'});
	 $('#list1').boxFloat('click', 'li', { effect : 'easeOutElastic', position: '',offset : { x : -$('#list1').children().outerWidth()}});
	 $('#list').boxFloat('mouseenter', 'li', { effect : 'move_default', position: 'l'});
	 $('.select').each(function(){
        $(this).boxFloat('click',  { position: 'b'});
      })
	 */
	$.fn.boxFloat = function(event , target , options){
		var _options = {
				effect     : 'default',
				selected   : 'selected',
				move		: false ,           //{ duration : 'normal' , easing : 'linear'},
				context	: $(window),
				box         : null,
				offset	    : { x : 0,  y : 0},
				axis        : 'xy',
				onShow      : null,
				onHide      : null
			},
			_this = this;

		if($.type(target) == 'object' ){
			options = target ;
			target = null;
		}

		var options = $.extend(true , {} , _options , options);
		/* 设置元素位置 */
		var $context = $(options.context);

		var $box =  $(options.box).hide();
		if(!$box.length){
			$box = $($(this).attr('rel'))
		}

		$(this).data('boxFloat',$box.css('position','absolute'));
		if(!$.boxFloat.$items.has($(this).data('boxFloat')).length){
			$.boxFloat.$items = $.boxFloat.$items.add($(this).data('boxFloat').attr('data-effect',options.effect).off('click.boxFloat').on('click.boxFloat',function(e){
				e.stopPropagation();
			}));
		}

		function show ($target){
			if(!$target || !$target.length){
				$(_this).data('boxFloat').hide();
				return ;
			}

			$.proxy( $.boxFloat.effects[options.effect].show, $(_this).data('boxFloat'))(getPos($target));
			options.onShow && $.proxy(options.onShow,$target)($(_this).data('boxFloat'));
		};
		function hide (){
			$.proxy($.boxFloat.effects[options.effect].hide,$(_this).data('boxFloat'))();
			options.onHide && $.proxy(options.onHide, $.boxFloat.$target)($(_this).data('boxFloat'));
		};

		function hideAll ($obj){
			$.boxFloat.$items.each(function(){
//                if($obj && $obj.data('boxFloat')[0] != this)
				if(!$(this).is(':hidden')){
					$.proxy($.boxFloat.effects[$(this).attr('data-effect')].hide,this)();
					options.onHide && $.proxy(options.onHide, $.boxFloat.$target)(this);
				}
			})

		};

		var rsEvent = 'resize.boxFloat',
			clickEvent= 'click.boxFloat';
		$(window).off(rsEvent).on(rsEvent,function(){ show( $.boxFloat.$target);});

		if(!event){
			show($(this));
		}
		else if(target){
			$(this).off(event).on(event,target,function(e){
				$.boxFloat.$target = $(this);
				e.stopPropagation();
				hideAll(_this);
				show($(this));
			})
		}
		else{
			$(this).off(event).on(event,function(e){
				$.boxFloat.$target = $(this);
				e.stopPropagation();
				hideAll(this);
				show($(this));
			})
		};

		$(document).off(clickEvent).on(clickEvent,function(e){
			hideAll();
		});

		function getTop(offset,$target,$box){
			var opOffset = options.offset;

			var halfSize = {
				width : $context.width()/2,
				height : $context.height()/2
			};

			var ctop = 0;
			if($context.offset()){
				ctop = $context.offset().top;
			}

			if((offset.top - ctop) < halfSize.height + $(window).scrollTop()){
				return offset.top + $target.outerHeight() + opOffset.y;
			}
			else{
				return offset.top - $box.outerHeight() - opOffset.y;
			}
		}

		function getLeft(offset,$target,$box){
			var opOffset = options.offset;
			var halfSize = {
				width : $context.width()/2,
				height : $context.height()/2
			};
			var cleft  = 0;
			if($context.offset()){
				cleft = $context.offset().left;
			}
			if((offset.left - cleft) < halfSize.width +  $(window).scrollLeft()){
				return offset.left +  $target.outerWidth() + opOffset.x;
			}
			else{
				return offset.left - $box.outerWidth() - opOffset.x;
			}
		};

		function getPos($target,position){
			try{
				$target = $target || $('');
				var  offset = $target.offset() || {left : 0 , top : 0},
					$box = $(_this).data('boxFloat'),
					position = options.axis || position;
				switch(position){
					case 'y'  :
						pos = {
							left : offset.left  + options.offset.x,
							top   : getTop(offset,$target,$box)
						};
						break;
					case 'xy' : case 'yx' :
					pos = {
						left : getLeft(offset,$target,$box) ,
						top   : getTop(offset,$target,$box)
					};
					break;

					case 'x'  :
						pos = {
							left : getLeft(offset,$target,$box) ,
							top   : offset.top + options.offset.y
						};
						break;
					default   :
						pos = {
							left : getLeft(offset,$target,$box) ,
							top   : getTop(offset,$target,$box)
						};
						break;
				};

				return pos;
			}catch(e){
				return {};
			}
		}

		return this;
	};

	$.fn.floatbox = function(options){
		var opts = $.extend(true,{},{
			event : 'click',
			effect : 'default',
			move : false,
			context	: $(window),
			box         : null,
			offset	    : { x : 0,  y : 0},
			axis        : 'xy'
		},options);
		return $(this).boxFloat(opts.event,{
			effect      : opts.effect,
			move        :  opts.move,
			context	:  opts.context,
			box         :  opts.box,
			offset	    :  opts.offset,
			axis        :  opts.axis
		});
	}

	$.fn.combo = function(options){
		var opts = $.extend(true,{},{
			event  : 'click',
			effect : 'default'
		},options);
		var _this = this;
		var $list = $('<div class="jquery-combo-list"><ul></ul></div>');

		var $options = $(this).hide().children().each(function(){
			var $item = $('<li></li>').text($(this).text()).attr('val',$(this).val());
			$list.children('ul').append($item);
		});
		var $input =$('<span class="jquery-combo"></span>').append('<input type="text"/>').append('<a href="javascript:void(0)"></a>');

		$input.insertAfter($(this));
		$list.appendTo('body');
		$list.off('click.combo').on('click.combo','li',function(){
			var $text = $input.find('input[type=text]').val($(this).text());
			$(_this).val($text.val()).attr('value',$(this).attr('val'));
			$list.stop(true,true).fadeOut();
		});

		return $input.boxFloat(opts.event,{
			effect      : opts.effect,
			move        :  false,
			context	:  $(window),
			box         :  $list,
			offset	    :  { x : - $(this).outerWidth()},
			axis        :  'y'
		});
	}
})(jQuery);