/*!
 * jQuery.class.js
 * Copyirght (c) 2010, matsukaze.
 * Lisenced under the MIT license.
 *
 * @version 1.2.3
 * @author mach3
 * @requires jQuery
 */
var Class=Class||{};$.extend(Class,{create:function(b){var a=b||{};return function(){var d,c;d={superclass:a.prototype,rebase:function(e){this[e]=$.extend(true,{},this[e])}};c=["unbind","bind","trigger","on","off"];$.each(c,function(f,e){if($.isFunction($.fn[e])){d[e]=function(){$.fn[e].apply($(this),arguments)}}});$.extend(true,d,a.prototype,this);$.extend(true,this,d);if($.isFunction(this.initialize)){this.initialize.apply(this,arguments)}}},get:function(c,b){var a=this.create(b);a.prototype=c;return a}});
;(function ($) {

    /**
     * @author caizhongyi
     * @version 1.0
     * @description 手风琴
     * @requires  jquery.1.7.2
     * @class  floatbox
     * @param {string} selector 选择器
     * @param {string} [options.effect=horizontal] 特效，横向
     * @param {string} [options.header=h3] 选择器,头部
     * @param {string} [options.panel=div] 选择器,内容
     * @param {string} [options.event=click] 事件,click
     * @param {string} [options.selected=selected] 选择后的样式
     * @param {string} [options.index=0] 当前的索引
     * @param {string} [options.collapsible=true] 当只有一个时是否可以点击收缩
     * @return {object} floatbox
     * @example new Class.floatbox('.floatbox');
     * */
    Class.floatbox = Class.get(
        /**
         * @lends Class.accordion
         * */
        {
            /**
             * @type event
             * @description 显示事件
             * */
            EVENT_SHOW:'show',
            /**
             * @type event
             * @description 关闭事件
             * */
            EVENT_HIDE:'hide',
            initialize : function(selector , options){
                var _this = this;
                var _options = {
                    effect     : 'default',
                    easing     : 'linear',
                    duration   : 'normal',
                    context	: $(window),
                    target     : null,
                    event      : 'click',
                    position  : 'bl',
                    offset	    : { left : 0, top : 0}
                };
                this.effects = Class.floatbox.effects;
                this.options = $.extend(true,{},_options, options);
                this.$ = $(selector).css('position','absolute');
                this.$context = $(this.options.context).css({
                    position : 'relative'
                });
                this.$target  = $(this.options.target);
                if(!this.$.attr('id')){
                    this.$.attr('id', 'floatbox_'+parseInt( Math.random() * 10000));
                }
                this.id = this.$.attr('id');

                Class.floatbox.$items = Class.floatbox.$items.add(this.$);

                this.$.off('click.flaotbox').on('click.flaotbox',function(e){e.stopPropagation();});

                $(window).off('resize.flaotbox').on('resize.flaotbox',function(){ _this.show(Class.floatbox.$target);});

                $(document).off('click.floatboxshow'+this.id).on('click.floatboxshow'+ this.id,this.options.target,function(e){
                    e.stopPropagation();
                    _this.hideAll();
                    _this.show($(this));
                });

                $(document).off('click.floatbox'+this.id).on('click.floatbox'+ this.id,function(e){
                    _this.hideAll();
                });
                return this;
            },

            getPos  : function($target){
                // 中间位置
                var contextOffset = this.$context.offset() || { left : 0 , top : 0},
                    posX = {},
                    posY = {},
                    pos = $target.offset(),
                    aligns = this.options.position.split('');

                aligns[0] = aligns[0] || 'b';
                aligns[1] = aligns[1] || 'l';

                var centerPos = {
                    left : this.$context.width()/2  + this.$context.scrollLeft(),
                    top : this.$context.height()/2  + this.$context.scrollTop()
                };

                if(pos.left > centerPos.left){
                    if(aligns[0] == 'b' || aligns[0] == 't'){
                        posX = this.targetPos(aligns[0] + 'r',$target);
                    }
                    else{
                        posX = this.targetPos('l' + aligns[1],$target);
                    }
                }
                else{
                    if(aligns[0] == 'b' || aligns[0] == 't'){
                        posX = this.targetPos(aligns[0] + 'l',$target);
                    }
                    else{
                        posX =  this.targetPos('r' + aligns[1],$target);
                    }
                }

                if(pos.top > centerPos.top){
                    if(aligns[0] == 'b' || aligns[0] == 't'){
                        posY =  this.targetPos('t' + aligns[1],$target);
                    }
                    else{
                        posY =  this.targetPos(aligns[0] + 'b',$target);
                    }

                }
                else{
                    if(aligns[0] == 'b' || aligns[0] == 't'){
                        posY =  this.targetPos('b' + aligns[1],$target);
                    }
                    else{
                        posY =  this.targetPos(aligns[0] + 't',$target);
                    }
                }
                pos = { left : posX.left , top : posY.top};

                return pos;
            },
            /**
             * @param {string} [pos = bl] lt|lt,tr|rt,br|rb,lb|bl,
             * @param {jquery} $target floatbox显示到的该层
             * @description 获取位置
             * */
            targetPos : function(pos , $target){
                var $target = $target || this.$target,
                    targetOffset = $target.offset() || { left : 0 , top : 0},
                    contextOffset = this.$context.offset() || { left : 0 , top : 0},
                    resPos = { left : 0 , top : 0 };

                targetOffset.left = targetOffset.left  ;
                targetOffset.top = targetOffset.top;

                switch (pos){
                    case  'lt' :
                        resPos = {
                            left : targetOffset.left - this.options.offset.left - this.$.outerWidth(),
                            top : targetOffset.top + this.options.offset.top
                        };
                        break;
                    case  'tr' :
                        resPos = {
                            left : targetOffset.left - this.options.offset.left + $target.outerWidth() - this.$.outerWidth(),
                            top : targetOffset.top - this.options.offset.top - this.$.outerHeight()
                        };
                        break;
                    case  'br' :
                        resPos = {
                            left : targetOffset.left - this.options.offset.left + $target.outerWidth() - this.$.outerWidth(),
                            top : targetOffset.top + this.options.offset.top + $target.outerHeight()
                        };

                        break;
                    case  'lb' :
                        resPos = {
                            left : targetOffset.left - this.options.offset.left - this.$.outerWidth(),
                            top : targetOffset.top - this.options.offset.top - this.$.outerHeight() + $target.outerHeight()
                        };
                        break;
                    case  'tl' :
                        resPos = {
                            left : targetOffset.left + this.options.offset.left ,
                            top : targetOffset.top - this.options.offset.top - this.$.outerHeight()
                        };
                        break;
                    case  'rt' :
                        resPos = {
                            left : targetOffset.left + this.options.offset.left + $target.outerWidth() ,
                            top : targetOffset.top + this.options.offset.top
                        };
                        break;
                    case  'rb' :
                        resPos = {
                            left : targetOffset.left + this.options.offset.left + $target.outerWidth() ,
                            top : targetOffset.top - this.options.offset.top - this.$.outerHeight() + $target.outerHeight()
                        };
                        break;
                    case  'bl' :
                        resPos = {
                            left : targetOffset.left + this.options.offset.left ,
                            top : targetOffset.top + this.options.offset.top + $target.outerHeight()
                        };
                        break;
                }

                return resPos;
            },
            show : function($target){
                $target = $target || this.$target;
                $.proxy(Class.floatbox.effects[this.options.effect].show, this)($target);
                Class.floatbox.$target = $target;
                // this.trigger(this.EVENT_SHOW,{});
                return this;
            },
            hide : function(){
                $.proxy(Class.floatbox.effects[this.options.effect].hide, this)();
                //   this.trigger(this.EVENT_HIDE,{});
                return this;
            },
            hideAll : function(){
                $.proxy(Class.floatbox.effects[this.options.effect].hide, this)(Class.floatbox.$items);
                //  this.trigger(this.EVENT_HIDE,{});
                return this;
            },
            toggle : function(index)
            {
                if(this.$panels.eq(index).is(':hidden')){
                    $.proxy(this.effects[this.options.effect].show,this)(index);
                }
                else{
                    this.hide(index)
                };
                return this;
            }
        });
    Class.floatbox.$items = $([]);
    Class.floatbox.$target = $('');
    /**
     * @name effects
     * @memberOf Class.accordion
     * */
    Class.floatbox.effects = {
        /**
         * @description default
         **/
        'default' : {
            show : function($target){
                var pos = this.getPos($target);
                this.$.css(pos);

                this.$.stop(true,true).fadeIn(this.options.duration,this.options.easing);

                return this;
            },
            hide : function($items){
                $items = $items.length  ? $items :  this.$;
                $($items).stop(true,true).fadeOut(this.options.duration,this.options.easing);
                return this;
            }
        },
        /**
         * @description default
         **/
        'slider' : {
            show : function($target){
                var offset = this.options.offset;
                if(this.options.position.indexOf('b') != -1 || this.options.position.indexOf('t') != -1){
                    this.options.offset.top += 100;
                }
                else{
                    this.options.offset.left += 100;
                }
                var pos = this.getPos($target);
                this.$.css(pos);
                this.options.offset = offset;
                var poslast =  this.getPos($target);
                poslast.opacity = 'show';

                this.$.stop(true,true).animate(poslast,this.options.duration,this.options.easing);

                return this;
            },
            hide : function($items){
                $items = $items.length  ? $items :  this.$;
                $($items).stop(true,true).fadeOut(this.options.duration,this.options.easing);
                return this;
            }
        }
    };

})(jQuery);

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