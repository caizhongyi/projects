/*
 * @name jquery.floatbox
 * param {object} options
 * */

;(function ($) {
    /**
     * @name floatbox
     * @memberOf $
     **/
    $.floatbox  = $.floatbox || {};

    /**
     * @name effects
     * @memberOf $.floatbox
     **/
    $.floatbox.effects = {
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
     * @memberOf $.floatbox
     **/
    $.floatbox.$items = $([]);


     /**
     * @author caizhongyi
     * @version 1.0
     * @description 浮动层
     * @constructor
     * @name floatbox
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
     * @param {object} [options.axis=xy] 绑定事件
     * @return {object} jquery对象
     * @example
      $('#list2').floatbox('click', 'li', { effect : 'enlarge_easeOutElastic', position: 't'});
      $('#list1').floatbox('click', 'li', { effect : 'easeOutElastic', position: '',offset : { x : -$('#list1').children().outerWidth()}});
      $('#list').floatbox('mouseenter', 'li', { effect : 'move_default', position: 'l'});
      $('.select').each(function(){
        $(this).floatbox('click',  { position: 'b'});
      })
     */
     $.fn.floatbox = function(event , target , options){
        var _options = {
                effect     : 'default',
                selected   : 'selected',
                move		: false ,           //{ duration : 'normal' , easing : 'linear'},
                context	: $(window),
                box         : null,
                offset	    : { x : 0,  y : 0},
                axis        : 'xy'
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

        $(this).data('floatbox',$box.css('position','absolute'));
        if(!$.floatbox.$items.has($(this).data('floatbox')).length){
            $.floatbox.$items = $.floatbox.$items.add($(this).data('floatbox').attr('data-effect',options.effect).off('click.floatbox').on('click.floatbox',function(e){
                e.stopPropagation();
            }));
        }

        function show ($target){
            $.proxy( $.floatbox.effects[options.effect].show, $(_this).data('floatbox'))(getPos($target));
        };
        function hide (){
            $.proxy($.floatbox.effects[options.effect].hide,$(_this).data('floatbox'))();
        };

        function hideAll ($obj){
            $.floatbox.$items.each(function(){
//                if($obj && $obj.data('floatbox')[0] != this)
                $.proxy($.floatbox.effects[$(this).attr('data-effect')].hide,this)();
            })

        };

        var rsEvent = 'resize.floatbox',
            clickEvent= 'click.floatbox';
        $(window).off(rsEvent).on(rsEvent,function(){ show( $.floatbox.$target);});

        if(!event){
            show($(this));
        }
        else if(target){
            $(this).off(event).on(event,target,function(e){
                $.floatbox.$target = $(this);
                e.stopPropagation();
                hideAll(_this);
                show($(this));
            })
        }
        else{
            $(this).off(event).on(event,function(e){
                $.floatbox.$target = $(this);
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
        }

        function getPos($target,position){
            var  offset = $target.offset(),
                $box = $(_this).data('floatbox'),
                position = options.axis || position;
            switch(position){
                case 'y'  :
                    pos = {
                        left : offset.left ,
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
                        top   : offset.top
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
        }


        return this;
    };
})(jQuery);
;(function ($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 图片载入显示，有局中效果
     * @constructor
     * @name imgload
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {object} options 参数
     * @param {string} [options.img=img] 图片选择器
     * @return {object} jquery对象
     * @example $.fn.imgload({ img : 'img'});
     */
	$.fn.imgload = function(options){
		var obj = $(this);
		var _options = {
            img  : 'img'
		};
		
		options = $.extend(true,{},_options, options);
        var _this = this;
        var $img = $(this).css({ position : 'relative'}).find(options.img),
            $wrap = $('<div/>').appendTo(this).append( $img).css('position', 'absolute').addClass('imgload-box');

        $img.off('load.imgload').on('load.imgload',function(){
            loadImage();
        });

        function loadImage(){
            var percent = parseFloat($img.outerWidth()/$img.outerHeight());
            $img.hide();
            var left =  ( $(_this).width() -  $img.outerWidth()) / 2 + $(_this).scrollLeft();
            var top =  ( $(_this).height() -  $img.outerHeight()) / 2 + $(_this).scrollTop();

            var size = {
                width : $img.outerWidth(),
                height : $img.outerHeight()
            };
            if($img.outerWidth()  > $img.outerHeight() && $img.outerWidth() > $(_this).width() ){
                size.width = $(_this).width() ;
                size.height = size.width / percent;
            };

            if($img.outerHeight()  > $img.outerWidth() && $img.outerHeight() > $(_this).height() ){
                size.height =  $(_this).height() ;
                size.width = size.height * percent;
            };

            $wrap.stop(true).animate({
                left : left ,
                top  : top,
                width :  size.width + 'px',
                height : size.height + 'px'
            },function(){
                $img.stop(true).fadeIn();
            });
        };
		return this;
    }
})(jQuery);/**
 * Created with JetBrains WebStorm.
 * User: zhongyi
 * Date: 12-10-7
 * Time: 下午8:19
 * To change this template use File | Settings | File Templates.
 */
/*
 @name    		 			: 局中
 @animate  [bool] 			: true || false
 @position [string] 			: relative || absolute
 @duration [string || int]   :
 @parent   [selector]		: 所在的父级标签，无则为默认的上一级
 @axis 	  [string]			: x || y || auto
 @callback [function]		: 回调
 */

;(function ($) {
    $.fn.loading = function(){
        return $loading =$('<div class="loading-layer"></div>').appendTo($(this).addClass('pager-loading')).hide();
    }

    $.fn.loading = '载入效果，外层样式pager-loading,浮层样式loading-layer'
})(jQuery);;(function ($) {
        /**
         * @author caizhongyi
         * @version 1.0
         * @description 局中
         * @constructor
         * @name center
         * @requires  jquery.1.7.2
         * @memberOf $.fn
         * @param {string} options 绑定事件
         * @param {string} [options.animate = true]  动画
         * @param {string} [options.duration = slow]  动画时间间隔
         * @param {string} [options.easing = linear]  线性
         * @param {string} [options.context =  $(window)]  相对的父级器
         * @param {string} [options.axis = 'auto'] 有效果的方身 x|y|auto
         * @param {callback} [options.callback = null] 回调
         * @return {object} jquery对象
         * @example $('.fixed).fixed();
         */
	$.fn.center = function(options){
		var obj = $(this);
		var _options = {
		    animate 	: true,
			duration	: 'slow',
            easing     : 'linear',
			context  	:  $(window),     
			axis   		: 'auto',          
			callback	:  null           
		};
		
		options = $.extend(true,{},_options, options);
		var context = options.context ? $(options.context) : $(this).context();
		
		var left =  ( context.width() - obj.outerWidth()) / 2 + context.scrollLeft();
		var top =  ( context.height() - obj.outerHeight()) / 2 + context.scrollTop();

        var postion = { },params = {};
        if($(this).css('position') == 'fixed' || $(this).css('position') == 'absolute'){
            postion.x = 'left';
            postion.y = 'top';
        }
        else{
            postion.x = 'margin-left';
            postion.y = 'margin-top';
        };

		if(options.axis == 'x'){
			params[postion.x] = left ;
		}
		else if(options.axis == 'y'){
			params[postion.y] = top ;
		}
		else{
			params[postion.x] = left ;
			params[postion.y] = top ;
		};

		if(options.animate){
			obj.stop().animate( params , options.duration,options.easing, options.callback );
		}
		else{
			obj.css(params);
            options.callback && $.proxy(options.callback,this);
		};
		return this;
    }
})(jQuery);;(function($){

    /**
     * @author caizhongyi
     * @version 1.0
     * @description 样式切换效果
     * @constructor
     * @name switchover
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} event 绑定事件
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchover).switchover('click','selected','li',null);
     */
	$.fn.switchover = function(event,className,selector, callback){
		var temp = null;
		event = event + '.switchover';
		var _this = this;
		if(selector){
			$(this).off(event).on(event,selector,function(){
				//if(temp) temp.removeClass(className);
				$(_this).find(selector).removeClass(className);
				temp = $(this).addClass(className);
				callback && $.proxy(callback,this)($(this).index());
			})
		}
		else
		{
			$(this).off(event).on(event,function(){
				//if(temp) temp.removeClass(className);
				$(_this).removeClass(className);
				temp = $(this).addClass(className);
                selector && $.proxy(selector,this)($(this).index());
			});
		};
		return this;
	};

    /**
     * @author caizhongyi
     * @version 1.0
     * @description 样式切换效果,事件为Hover
     * @constructor
     * @name switchHover
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchHover).switchHover('selected','li',null);
     */
	$.fn.switchHover= function(className,selector , callback){
		$(this).switchover('mouseenter',className , selector, callback);
		return this;
	};


    /**
     * @author caizhongyi
     * @version 1.0
     * @description 样式切换效果,事件为click
     * @constructor
     * @name switchClick
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} className 选种后的样式
     * @param {string} selector 选择器
     * @param {function} callback 回调
     * @return {object} jquery对象
     * @example $('.switchClick).switchClick('selected','li',null);
     */
	$.fn.switchClick = function(className,selector, callback){
		$(this).switchover('click',className,selector, callback);
		return this;
	};

})(jQuery);