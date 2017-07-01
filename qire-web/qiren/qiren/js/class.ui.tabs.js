;(function ($) {
    /**
     * @author caizhongyi
     * @qq 274142680
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
     * @example new Class.ui.tabs ('.tabs');
     * */
    Class.ui.tabs = Class.get(
        /**
         * @lands Class.ui.tabs 
         * */
        {
            /**
             * @type event
             * @description 切换事件
             * */
            EVENT_CHANGE : 'onchange',
            EVENT_VIEW : 'onview',
            initialize : function(selector , options){
                var _options = {
                        effect  : 'horizontal',     //切换效果   { type :  'horizontal' , duration : 'normal' , easing : 'easeInOutExpo'  }
                      //  easing : 'easeInOutExpo',
                     //   duration : 'normal',
                        offset : 1,                  //offset 一次切换的个数
                        interval   : 3000,
                        auto    : false,
                        //   disabled : 'disabled',       //不可切换时候prev or next 样式
                        index  : 0,                   //当前第几项
                        event : 'mouseenter',
                        initCallbak : null
                    },
                    that = this;
                this.opts = $.extend(true,{},_options,options);
                this.timer ;
                this.index = -1 ;
                this.tempIndex = -1;
                this.effects = Class.ui.tabs .effects;
                this.$ = $(selector);

                this.$clip = this.$.getRegion('clip');
                this.$panel = this.$.getRegion('panel');
                this.$nav = this.$.getRegion('nav');
                this.$carousel = this.$.getRegion('carousel');
                this.$carouselClip = this.$.getRegion('carousel-clip');
                this.$view = this.$.getRegion('view');
                this.$prev = this.$.getRegion('prev');
                this.$next = this.$.getRegion('next');

                this.itemSelector = {
                    panel :  this.$panel.parseOptions().item || 'li',
                    nav   :  this.$nav.parseOptions().item || 'a',
                    carousel   :  this.$carousel.parseOptions().item || 'a'
                }

                if(this.opts.auto){
                    this.$.off('mouseenter.tabs mouseleave.tabs').on('mouseenter.tabs',function(e){
                        //e.stopPropagation();
                        that.stop();
                    }).on('mouseleave.tabs',function(e){
                        that.auto();
                    });
                }

                var clickEvt = 'click.tabs';
                this.$prev.off(clickEvt).on(clickEvt,function(e){
                    e.preventDefault();
                    that.prev();
                });
                this.$next.off(clickEvt).on(clickEvt,function(e){
                    e.preventDefault();
                    that.next();
                });

                var event = this.opts.event + '.tabs';

                this.$nav.off(event).on(event, this.itemSelector.nav,function(e){
                    e.preventDefault();

                    that.page(this);
                })

                if(this.$carousel.length){
                    this.$carousel.off(event).on(event, this.itemSelector.carousel,function(e){
                        e.preventDefault();
                        that.page(this);
                    })
                }
                else{
                   delete this.navPage;
                }

                !this.$view.length && ( delete this.view);

                this.clip();
                Class.ui.tabs .init[this.opts.effect || this.opts.effect].call(this);
                this.page(this.opts.index);

                this.opts.initCallback && this.opts.initCallback.call(this);
            },
            append : function(elem){
                var $elem = $(elem);
                this.$panel.append($elem);
                this.reset();
                return this;
            },
            remove : function(index){
                if(typeof index == 'object')
                    index.remove();
                else
                    this.$panel.children('eq('+ index +')').remove();
                this.reset();
                return this;
            },
            clip : function(){
                if(!this.$clip.length){
                    this.$clip = $('<div></div>')
                        .addClass('tabs-clip')
                        .css({
                            overflow : 'hidden',
                            width : this.$panel.width()|| 'auto',
                            height : this.$panel.height()|| 'auto',
                            position: 'relative'
                        })
                    this.$panel.wrap(this.$clip);
                }
                if(this.$carousel.length){
                    this.$carousel.css('position','relative');
                    if(!this.$carouselClip.length){
                        this.$carouselClip = $('<div></div>').addClass('carousel-clip').css({
                            overflow : 'hidden',
                            width : this.$carousel.width() || 'auto',
                            height : this.$carousel.height() || 'auto',
                            position: 'relative'
                        });
                        this.$carousel.wrap(this.$carouselClip);
                    }
                }
                return this;
            },
            reset : function(){
                Class.ui.tabs .init[this.opts.effect].call(this);
                this.$carousel.length && this.opts.effect != 'vertical' && this.$carousel.width(this.$carousel.children().sumOuterWidth());
                return this;
            },
            auto : function(){
                var that = this;
                this.timer = setInterval(function(){ that.next() } , this.opts.interval);
                return this;
            },
            stop : function(){
                clearInterval(this.timer);
                return this;
            },
            page : function(index){
                if(typeof index == 'object' || typeof index == 'string'){
                    index = $(index).index();
                }

                if(this.index == index){
                    return ;
                }

                var pageCount =  this.pageCount();
                var prevDisabled = this.$prev.parseOptions().disabled,
                    nextDisabled = this.$next.parseOptions().disabled;
                if(prevDisabled || prevDisabled){
                    this.$prev.removeClass(prevDisabled);
                    this.$next.removeClass(nextDisabled);
                    if(index <= 1){
                        this.$prev.addClass(prevDisabled);
                    }
                    else if(index >= pageCount - 1){
                        this.$next.addClass(nextDisabled);
                    }
                }

                if(index < 0 || index >= pageCount){
                    if(prevDisabled || prevDisabled){
                        return this;
                    }
                    else{
                        if(index < 0 ){
                            index = pageCount - 1;
                        }
                        else if(index >= pageCount){
                            index = 0 ;
                        }
                    }
                }
                this.$nav.children(':eq(' + index +')').selected(this.$nav.parseOptions().selected || 'selected');
                this.$carousel.children(':eq(' + index +')').selected(this.$carousel.parseOptions().selected || 'selected');
                this.reset();
                $.proxy(this.effects[this.opts.effect],this)(index,this.index);

                this.navPage && this.navPage(index);
                this.view && this.view(index);
                this.tempIndex = this.index;
                this.index = index;
                return this;
            },
            size : function(val){
                this.opts.offset =  val;
                return this;
            },
            count : function(){
                return this.$panel.children().length;
            },
            pageCount : function(){
                var len = this.count(),
                    val = parseInt(len / this.opts.offset);
                return len % this.opts.offset > 0 ? val + 1 : val;
            },
            next : function(){
                var index = this.index + 1;
                return this.page(index);
            },
            prev : function(){
                var index = this.index - 1;
                return this.page(index);
            },
            navPage : function(index){
                if(!this.$carousel.length)
                    return this;
                var offset = 1 * index * this.$carousel.childrenOuterWidth() ;
                if(this.opts.effect == 'vertical'){
                    if(offset > this.$carouselClip.height() - this.$carousel.childrenOuterHeight())
                        this.$carousel.stop(true).animate({ top : - offset +  this.$carouselClip.height() - this.$carousel.childrenOuterHeight()  },this.opts.duration,this.opts.easing);
                }
                else{
                    if(offset > this.$carouselClip.width() - this.$carousel.childrenOuterWidth())
                        this.$carousel.stop(true).animate({ left : - offset +  this.$carouselClip.width() - this.$carousel.childrenOuterWidth() },this.opts.duration,this.opts.easing);
                    else  if( offset == 0)
                        this.$carousel.stop(true).animate({ left : - offset  },this.opts.duration,this.opts.easing);

                }
                return this;
            },
            view : function(index){
                var $target ,$view = this.$view ;
                if(typeof index == 'object' || typeof index == 'string'){
                    index = $(index).index();
                    $target =  $(index);
                }
                else{
                    $target =  this.$nav.children(':eq('+ index +')');
                }
                var title = $target.attr('title'),  //标题
                    rel = $target.attr('rel'),      //地址
                    href = $target.attr('href'),    //跳转地址
                    that = this;

                if(!rel){
                    return this;
                }

                switch($.url.type(rel)){
                    case 'img' :
                        var $img = $view.find('img');
                        if(!$img.length){
                            $img = $('<img/>').appendTo($view);
                        }
                        $view.attr({
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
                        break;
                    case 'html' :
                        if($target.data('dataCache')){
                            $view.html($target.data('dataCache')).children().hide().stop(true).fadeIn();
                        }
                        else{
                            this.$loading.stop(true).fadeIn();
                            $view.load(rel , function(e){
                                $target.data('dataCache',e);
                                $(this).children().hide().stop(true).fadeIn();
                                that.$loading.stop(true).fadeOut();
                            });
                        }

                        break;
                    case 'dynamic' :
                        that.trigger(that.EVENT_VIEW,{
                            url : rel
                        });
                        break;
                    default :
                        that.trigger(that.EVENT_VIEW,{
                            url : rel
                        });
                        break;
                }
                return this;
            }
        } , Class.ui);

    Class.ui.tabs.init = {
        horizontal : function(){
            // effect is vertical init
            this.$panel.css('position','relative')
                .children().css({
                    'float' : 'left',
                    margin  : 0
                }).show();
            this.$panel.width(this.$panel.children().sumOuterWidth());
            return this;
        },
        accordion : function(){
            var that = this,
                $items = this.$panel.children().show().css('float','left');

            $items.width(function(){
                var width = that.$panel.width() / $items.length;
                return (width - parseFloat($(this).css('border-left') || 0) - parseFloat($(this).css('border-right') || 0));
            });

            this.$panel.css({
                overflow : 'hidden',
                'background-position' : '0 0',
                'background-repeat' : 'no-repeat'
            });
            return this;
        },
        vertical : function(){
            this.$panel.css({
                height: 'auto',
                'position' : 'relative'
            }).children().css('margin',0).show();
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
     * @memberOf  Class.ui.tabs 
     * @description 切换效果
     * */
    Class.ui.tabs.effects = {
        /**
         * @description 横向切换
         * */
        horizontal : function(index){
            var offset = (index * this.$panel.childrenOuterWidth());
            if(offset != null)
                this.$panel.stop(true).animate({ left : - offset });

            return this;
        },
        /**
         * @description 横向手风琴
         * */
        accordion : function(index){
            var url =  'url('+  this.$nav.children(':eq('+ index +')').attr('rel'); +')',
                that = this,
                initPos = '0 0 ';

            if(index < this.index){
                initPos =  -this.$panel.width() + 'px 0';
            }

            this.$panel.css({
                'background-image' : url
            }).children().css({
                    'background-image' : url ,
                    'background-position' : initPos
                }).stop(true).each(function(i){
                    var pos = -(i * $(this).outerWidth()) +' 0 ';
                    $(this).animate({
                        'background-position' : pos
                    });
                }) ;
            return this;
        },
        /**
         * @description 纵向+vertical
         * */
        vertical : function(index){
            var offset = (index * this.$panel.childrenOuterHeight());
            if(offset != null)
                this.$panel.stop(true).animate({ top : - offset });
            return this;
        },
        /**
         * @description default，无动画
         * */
        'default' : function(index){
            var $items = this.$panel.children();
            $items.hide().eq(index).show();
            return this;
        },
        /**
         * @description fade
         * */
        fade : function(index , tempIndex){
            var $items = this.$panel.children().css('position','absolute');
            $items.stop(true,true).filter(':eq('+ tempIndex +')').css('z-index',1).fadeOut(function(){
                $(this).css('z-index','');
            }).find('img').stop(true).animate({
                width: '200%',
                height: '200%'
            },function(){
                $(this).css({
                    width : 'auto',
                    height : 'auto'
                })
            })
            $items.eq(index).stop(true).show();
            return this;
        },
        /**
         * @description 交换
         * */
        swap : function(index){
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