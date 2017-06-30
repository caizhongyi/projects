/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-10-10
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 * author : czy
 * depends : jquery.1.7.2.js +
 *          jquery.class.js
 */

;(function ($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 选项卡切换
     * @requires  jquery.1.7.2
     * @requires  jquery.push
     * @class  tabs
     * @param {string} selector
     * @param {string} [options.effect=horizontal] 特效，横向
     * @param {number} [options.offset=1] 一次切换的个数
     * @param {string} [options.selected=selected] 选择样式
     * @param {string} [options.navItem=a,li] 选择器，导航子
     * @param {string} [options.panelItem=li] 选择器，切换内容容器子集选择器
     * @param {number} [options.interval=3000] 时间间隔
     * @param {boolean} [options.auto=false] 是否自动
     * @param {string} [options.disable=disable] 不可切换时候prev or next 样式
     * @param {number} [options.index=0] 初始显示
     * @param {string} [options.event=click] 绑定事件，click
     * @return {object} tabs对象
     * @example new Class.tabs('.tabs');
     * */
    Class.tabs = Class.get(
        /**
         * @lands Class.tabs
         * */
        {
            /**
             * @type event
             * @description 切换事件
             * */
            EVENT_CHANGE : 'change',

            initialize : function(selector , options){
                var _options = {
                        effect  : 'horizontal',    //切换效果
                        easing : 'easeInOutExpo',
                        duration : 'normal',
                        offset : 1,                  //offset 一次切换的个数
                        interval   : 3000,
                        auto    : false,
                        disable : 'disable',       //不可切换时候prev or next 样式
                        index  : 0,                   //当前第几项
                        event : 'click'
                    },
                    _this = this;
                this.options = $.extend(true,{},_options,options);

                this.$ = $(selector);
                this.effects = Class.tabs.effects;


                this.$nav =  $([]);
                this.$panel =  $([]);
                this.$clip = $([]);
                this.$view = $([]);
                this.$prev =  $([]);
                this.$next = $([]);

                $('[data-options]', this.$).each(function(){
                    var opts = $(this).parseOptions();
                    switch (opts.region){
                        case  'nav' : _this.$nav = _this.$nav.add($(this)) ; break;
                        case  'list' : _this.$panel = _this.$panel.add($(this)) ;break;
                        case  'view' : _this.$view =  _this.$view.add($(this)) ; break;
                        case  'clip' : _this.$clip = _this.$clip.add($(this)) ; break;
                        case  'prev' : _this.$prev = _this.$prev.add($(this)) ; break;
                        case  'next' : _this.$next =  _this.$next.add($(this)) ; break;
                    }
                });



                /**
                 * @type number
                 * @description 当前索引
                 * */
                this.index  = 0;
                /**
                 * @type number
                 * @description 上一次索引
                 * */
                this.tempIndex = -1 ;

                var evt = (this.options.event == 'hover' ? 'mouseenter' :  this.options.event) + '.tabs',
                    panelEvt = { mouseenter : 'mouseenter.tabs' , mouseleave :'mouseleave.tabs'},
                    _this = this;

                this.$nav.off(evt).on(evt,this.$nav.parseOptions().item || "a",function(e){
                    e.preventDefault();
                    _this.page($(this).index());
                });

                var panelItemSelector = this.$panel.parseOptions().item || 'li';
                if(this.options.auto){
                    this.$panel.off(panelEvt.mouseenter).on(panelEvt.mouseenter,panelItemSelector,function(e){
                        _this.stop();
                    }).off(panelEvt.mouseleave).on(panelEvt.mouseleave,panelItemSelector,function(e){
                            _this.start();
                        });

                    this.$view.off(panelEvt.mouseenter).on(panelEvt.mouseenter,function(e){
                        _this.stop();
                    }).off(panelEvt.mouseleave).on(panelEvt.mouseleave,function(e){
                            _this.start();
                        });
                }

                var clickEvt = 'click.tabs';
                this.$prev.off(clickEvt).on(clickEvt,function(e){
                    _this.prev();
                });
                this.$next.off(clickEvt).on(clickEvt,function(e){
                    _this.next();
                });

                $.proxy(Class.tabs.init[this.options.effect],this)();

                this.page(this.index = this.options.index);
                this.$panel.stop(true).fadeIn();
                this.start();
            },
            setClip : function(){
                if(!this.$clip.length)
                    this.$clip = $('<div></div>').wrapAll(this.$panel).addClass('tabs-clip');
                return this;
            },

            length : function(){
                return this.$panels.length ||  this.$navs.length;
            },
            getNavs : function(){
                return this.$nav.children(this.$nav.parseOptions().item || 'a');
            },
            getPanels : function(){
                return this.$panel.children(this.$panel.parseOptions().item || 'li');
            },
            /**
             * @description 显示某页
             * @param {number} index 页数
             * @return this
             * */
            page : function(index){
                if(index < 0 && this.tempIndex == index)
                    return this;

                this.btnStyle(index);

                this.index = index ;
                this.$navs = this.getNavs();
                this.$panels = this.getPanels()

                var navselected = this.$nav.parseOptions().selected || 'selected';

                if(this.tempIndex >= 0)
                    this.$navs.eq(this.tempIndex).removeClass(navselected);
                this.$navs.eq(this.index).addClass(navselected);


                $.proxy(this.effects[this.options.effect],this)({
                    current : this.index,
                    temp :this.tempIndex
                },this.options.offset);

                this.view(this.index);
                this.tempIndex = this.index;
                this.trigger(this.EVENT_CHANGE,[ this.index , this.count()]);
                return this;
            },
            btnStyle : function(index){
                var prevDisable = this.$prev.parseOptions().disable;
                var nextDisable = this.$next.parseOptions().disable;
                if(index >= this.count() - 1){
                    nextDisable && this.$next.addClass(nextDisable);
                    prevDisable && this.$prev.removeClass(prevDisable);
                }
                else if(index <= 0 ){
                    prevDisable && this.$prev.addClass(prevDisable);
                    nextDisable && this.$next.removeClass(nextDisable);
                }
                else{
                    prevDisable && this.$prev.removeClass(prevDisable);
                    nextDisable && this.$next.removeClass(nextDisable);
                }
                return this;
            },
            /**
             * @description 显示某页
             * @return {number} 页数
             * */
            count: function(){
                var len = this.length();
                var val = parseInt(len / this.options.offset);
                return len % this.options.offset > 0 ? val + 1 : val;
            },
            /**
             * @description 下一页
             * @return this
             * */
            next : function(){
                var index = this.index + 1;
                if(index < this.count()){
                    this.page(index);
                }
                else{
                    if(this.$prev.parseOptions().disable){
                        return this;
                    }
                    this.page(0);
                }
                return this;
            },
            /**
             * @description 上一页
             * @return this
             * */
            prev : function(){
                var index = this.index - 1;
                if(index >= 0){
                    this.page(index);
                }
                else{
                    if(this.$next.parseOptions().disable){
                        return this;
                    }
                    this.page(this.count()-1);
                }
                return this;
            },
            /**
             * @description 图片显示
             * @param {number} index 索引
             * @return this
             * */
            view : function(index){
                var $item = this.$navs.eq(index),
                    title = $item.attr('title'),
                    rel = $item.attr('rel'),
                    href = $item.attr('href');
                this.$view.attr({
                    'src' : href,
                    'title': title,
                    'alt': title
                }).hide().stop(true,false).fadeIn().parent('a').attr('href',rel);
                return this;
            },
            /**
             * @description 开始自动切换
             * @return this
             * */
            start : function(){
                var _this = this;
                if(this.options.auto)
                    this.autoPlay = setTimeout(function(){
                        _this.next();
                        // if(index < this.count() && !_this.options.disable ){
                        _this.start();
                        //  }
                    },this.options.interval );
                return this;
            },
            /**
             * @description 停止自动切换
             * @return this
             * */
            stop : function(){
                clearTimeout(this.autoPlay);
                return this;
            }
        });

    Class.tabs.init = {
        horizontal : function(){
            // effect is vertical init

            this.$panel.css({
                'position':'absolute'
            }).parent().css('position','relative');

            this.$panels = this.getPanels().css({
                'float' :'left',
                width : this.$panel.parent().width()
            }).show();

            this.$navs = this.getNavs();

            var pm = parseFloat( this.$navs.css('margin-left')|| 0)  + parseFloat( this.$navs.css('margin-right')|| 0) ;
            this.$panel.width(this.$panels.outerWidth() * 2 * this.$panels.length + pm);
            return this;
        },
        horizontal_accordion : function(){
            var _this = this;
            this.$panels = this.getPanels();
            var  width = this.$panel.width(),
                len = this.$panels.length;

            this.$panels.width(function(){
                return parseFloat(width/len) - parseFloat(_this.$panels.css('border-left-width')) - parseFloat(_this.$panels.css('border-right-width'));
            });

            this.$panel.css({
                'background-position' : '0 0',
                'background-repeat' : 'no-repeat'
            }).off('mouseover.tabs').on('mouseover.tabs',(this.$panel.parseOptions().item || 'li'),function(e){
                    _this.page($(this).index());
                });
            return this;
        },
        vertical : function(){
            this.$panel.css('position','absolute').parent().css('position','relative');
            this.getPanels().show();
            return this;
        },
        'default' : function(){
            return this;
        },
        fade : function(){
            return this;
        },
        swap : function(){
            //  this.$nav.css();
        }
    };

    /**
     * @memberOf  Class.tabs
     * @description 切换效果
     * */
    Class.tabs.effects = {
        /**
         * @description 横向切换
         * */
        horizontal : function( index, offset){
            var width = this.$panels.outerWidth();
            this.$panel.stop(true).animate({ left :- (index.current * width) * offset},this.options.duration,this.options.easing);
            return this;
        },
        /**
         * @description 横向手风琴
         * */
        horizontal_accordion : function(index, offset){
            var _this = this;
            var $regions = this.getPanels().eq(index.current);
            var summary = $regions.summary || $('');
            if(this.$panel.data('summary'))this.$panel.data('summary').stop(true).fadeOut();
            this.$panel.data('summary',summary.stop(true).fadeIn());

            var uri =  'url('+ this.$navs.eq(index.current).attr('href') + ')';

            var  width = this.$panel.width(),
                len = this.$panels.length

            var itemWidth =  this.$panels.width();

            _this.$panels.css({
                'background-image' : uri,
                'background-repeat' : 'no-repeat'
            });

            if(!this.$panels.is(':animated')){
                _this.$panels.css({
                    'background-position' : '0 0'
                });
            }

            this.$panels.stop(true).each(function(i){
                if(index.current > index.temp){
                    $(this).css({
                        'background-position' : width + 'px 0px'
                    }).animate({
                            backgroundPosition:'(-'+(i * itemWidth)+' 0px)'
                        },  i * 100 + 300 ,_this.options.easing,function(){
                            _this.$panel.css({
                                'background-image' : uri
                            });
                        });
                }
                else{
                    $(this).css({
                        'background-position' : -width+'px 0px'
                    }).animate({
                            backgroundPosition:'(-'+(i * itemWidth)+' 0px)'
                        },(100 * len -  i * 100 ) + 300  ,_this.options.easing,function(){
                            _this.$panel.css({
                                'background-image' : uri
                            });
                        });
                }

            });

            return this;
        },
        /**
         * @description 纵向+vertical
         * */
        vertical : function(index, offset){
            var height = this.$panels.outerHeight();
            this.$panel.stop(true).animate({ top :- (index.current * height) * offset},this.options.duration,this.options.easing);
            return this;
        },
        /**
         * @description default，无动画
         * */
        'default' : function(index, offset){
            this.$panels.eq(index.current).show();
            this.$panels.eq(index.temp).hide();
            return this;
        },
        /**
         * @description fade
         * */
        fade : function( index, offset){
            this.$panels.eq(index.current).stop(true).fadeIn(this.options.duration,this.options.easing);
            this.$panels.not(':eq('+ index.current +')').stop(true).hide();
            return this;
        },
        /**
         * @description 交换
         * */
        swap : function( index, offset){
            var $navItem =  this.$navs.eq(index.current);
            var pos = this.$.offset(),
                mypos = $navItem.offset() || {};
            diff = {
                left : pos.left - mypos.left,
                top  : pos.top - mypos.top
            }
            //$navItem.clone().appendTo()
            $navItem.stop(true).css('position','relative').find('img').stop(true).css('position','absolute').animate({
                width : this.$.width(),
                height : this.$.height(),
                left : diff.left,
                top  : diff.top
            },this.options.duration,this.options.easing);
        }
    };
})(jQuery);