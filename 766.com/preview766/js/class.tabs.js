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
    Class.tabs = Classes.get(
        /**
         * @lands Class.tabs
         * */
        {
            /**
             * @type event
             * @description 切换事件
             * */
            EVENT_CHANGE : 'onchange',

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

                this.$regions = this.$.getRegion();
                this.$nav = $(this.$regions.nav);
                this.$panel = $(this.$regions.panel);
                this.$clip =  $(this.$regions.clip);
                this.$view = $(this.$regions.view);
                this.$prev = $(this.$regions.prev);
                this.$next = $(this.$regions.next);
                this.$navPrev = $(this.$regions.carouselPrev);
                this.$navNext = $(this.$regions.carouselNext);
                this.$navClip = $(this.$regions.carouselClip);

                if(!this.$nav.length){
                    this.$nav = $(this.$regions.carousel);
                    this.$navClip = $('<div></div>').css({
                        overflow:'hidden',
                        position:'relative'
                    }).addClass('carousel-clip');
                    this.$nav.wrap(this.$navClip);
                    this.$nav.data('isCarousel',true);
                }

                if(!this.$view.find('img').length){
                    this.$view.append('<img/>');
                }

                this.navChildrenSelector = this.$nav.parseOptions().item || "a";
                this.panelChildrenSelector = this.$panel.parseOptions().item || "li";
                this.$panels = this.getPanelChildren();
                this.$navs = this.getNavChildren();
                this.pIndex = 0;
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


                this.$nav.off(evt).on(evt, this.navChildrenSelector,function(e){
                    $.console('tabs nav click!');
                    e.preventDefault();
                    _this.page($(this).index());

                })
                    .css('position','relative')
                    .parent()
                    .css('position','relative');

                if(this.options.auto){
                    this.$panel.off(panelEvt.mouseenter).on(panelEvt.mouseenter,this.panelChildrenSelector,function(e){
                        _this.stop();
                    }).off(panelEvt.mouseleave).on(panelEvt.mouseleave,this.panelChildrenSelector,function(e){
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
                    $.console('tabs click prev!');
                    _this.prev();
                });
                this.$next.off(clickEvt).on(clickEvt,function(e){
                    $.console('tabs click next!');
                    _this.next();
                });
                this.$navPrev.off(clickEvt).on(clickEvt,function(e){
                    $.console('tabs click carousel prev!');
                    _this.navPrev();
                });
                this.$navNext.off(clickEvt).on(clickEvt,function(e){
                    $.console('tabs click carousel next!');
                    _this.navNext();
                });
                $.proxy(Class.tabs.init[this.options.effect],this)();

                this.page(this.index = this.options.index);
                this.$panel.stop(true).fadeIn();
                this.start();
                $.console('tabs init!');
            },
            childrenWidth: function(items){
                return this.itemWidth(items) * (items.length) ;
            },
            childrenHeight: function(items){
                return this.itemHeight(items) * items.length ;
            },
            setClip : function(){
                if(!this.$clip.length)
                    this.$clip = $('<div></div>').wrapAll(this.$panel).addClass('tabs-clip');
                return this;
            },
            length : function(){
                return this.$panels.length ||  this.$navs.length;
            },
            getNavChildren : function(){
                var items = this.$nav.children(this.navChildrenSelector);
                var axis = this.$nav.parseOptions().axis || 'x';
                if(axis == 'x' && this.$nav.data('isCarousel'))
                    this.$nav.width(this.childrenWidth(items));
                return items;
            },
            getPanelChildren : function(){
                var items =  this.$panel.children(this.panelChildrenSelector);
                return items;
            },
            itemWidth : function(item){
                var mg = parseFloat(item.css('margin-left')) + parseFloat(item.css('margin-right'));
                return (item.outerWidth()  + mg );
            },
            itemHeight : function(item){
                var mg = parseFloat(item.css('margin-top')) + parseFloat(item.css('margin-bottom'));
                return (item.outerHeight()  + mg);
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
                this.$navs = this.getNavChildren();
                this.$panels = this.getPanelChildren();

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
                this.trigger(this.EVENT_CHANGE,[ this.index , this.length()]);
                return this;
            },
            btnStyle : function(index){
                var prevDisable = this.$prev.parseOptions().disable;
                var nextDisable = this.$next.parseOptions().disable;
                if(index >= this.length() - 1){
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
                var len = this.$navs.length;
                var val = parseInt(len / this.options.offset);
                return len % this.options.offset > 0 ? val + 1 : val;
            },
            /**
             * @description 下一页
             * @return this
             * */
            next : function(){
                var index = this.index + 1;
                if(index < this.length()){
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
                    this.page(this.length()-1);
                }
                return this;
            },
            navPrev : function(){
                this.prev()
                return  this.navPage(this.pIndex - 1);
            },
            navNext : function(){
                this.next()
                return  this.navPage(this.pIndex + 1);
            },
            navPage : function(index){
                $.console('tabs navPage index:'+ index +'!');
                var navs = this.getNavChildren(),
                    navOpts = this.$nav.parseOptions();
                    axis = navOpts.axis,
                    offset = navOpts.offset || 1;
                var size = 0;

                if(axis == 'y'){
                    size = Math.round(this.$nav.parent().height() / this.itemHeight(navs));
                }
                else{
                    size = Math.round(this.$nav.parent().width() / this.itemWidth(navs));
                }

                var length =  size  ;

                length = navs.length - length;
                if(length < 0 ) return ;
                /*if(index == 1 ){
                    this.$navPrev.addClass('prev-disable');
                    this.$navNext.removeClass('next-disable');
                }
                else if(index == length - 1){
                    this.$navNext.addClass('next-disable');
                    this.$navPrev.removeClass('prev-disable');
                }
                else{
                    this.$navPrev.removeClass('prev-disable');
                    this.$navNext.removeClass('next-disable');
                }*/

                if(index < 0){
                    index = length;
                }
                else if(index > length){
                   index = length ;
                }
                //tabs index page;
                if(this.index == 0 ){
                    index = 0
                }

                if(axis == 'y'){
                    this.vertical({current : index},this.$nav,navs,offset)
                }
                else{
                    this.horizontal({current : index},this.$nav,navs,offset)
                }
                this.pIndex = index ;
                return this;
            },
            /**
             * @description 图片显示
             * @param {number} index 索引
             * @return this
             * */
            view : function(index){
                var $item = this.$navs.eq(index).length ? this.$navs.eq(index) : this.$panels.eq(index),
                    title = $item.attr('title'),
                    rel = $item.attr('rel'),
                    href = $item.attr('href');
                this.$view.attr({
                    'href' : href,
                    'title': title
                }).find('img')
                  .hide()
                  .attr({
                    src : rel,
                    alt : title
                  })
                  .stop(true,false)
                  .fadeIn();
                return this;
            },
            /**
             * @description 开始自动切换
             * @return this
             * */
            start : function(){
                var that = this;
                if(this.options.auto)
                    this.autoPlay = setTimeout(function(){
                       // that.next();
                        that.navNext();
                        // if(index < this.length() && !_this.options.disable ){
                        that.start();
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
            },
            horizontal : function(index,obj,items,offset){
                obj.stop(true).animate({ left :- (index.current * this.itemWidth(items)) },this.options.duration,this.options.easing);
                return this;
            },
            vertical : function(index,obj,items,offset){
                var height = items.outerHeight();
                obj.stop(true).animate({ top :- (index.current * this.itemHeight(items)) },this.options.duration,this.options.easing);
                return this;
            }
        });

    Class.tabs.init = {
        horizontal : function(){
            // effect is vertical init
            this.$panel.css({
                'position':'absolute'
            }).parent().css('position','relative');

            this.$panels .css({
                'float' :'left',
                width : this.$panel.parent().width()
            }).show();

            this.$panel.width(this.childrenWidth(this.$panels));
            return this;
        },
        horizontal_accordion : function(){
            var _this = this;
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
            this.getPanelChildren().show();
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
            var items = this.getPanelChildren();
            this.$panel.width(this.childrenWidth(items));
            return this.horizontal(index,this.$panel,items,offset);
        },
        /**
         * @description 横向手风琴
         * */
        horizontal_accordion : function(index, offset){
            var _this = this;
            var $regions = this.getPanelChildren().eq(index.current);
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
            var items = this.getPanelChildren();
            return this.vertical(index,this.$panel,items,offset);
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
           /* var $navItem =  this.$navs.eq(index.current);
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
            },this.options.duration,this.options.easing);*/
        }
    };
})(jQuery);