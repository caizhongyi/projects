!(function ($) {
    /**
     * 图片轮播
     * @param elem 选择器
     * @param options
     * @param options.auto {boolean} 是否自动播放 default:true
     * @param options.easing {string} 动画效果 default:linear
     * @param options.duration {string} 动画时间 default:normal
     * @param options.index {number} 第几页 default:0
     * @param options.autoHeight {boolean} 高度是否自适应 default:false
     * @param options.list {string} 列表选择器 default:[data-list]
     * @param options.nav {string} 导航选择器 default:[data-nav]
     * @param options.prev {string} 上一页按钮选择器 default:[data-prev]
     * @param options.next {string} 下一页按钮选择器 default:[data-next]
     * @user jquery.transitionEnd
     * @user jquery.browser
     * @constructor
     */
     var Slider  = function( elem ,options ){
        this.options = $.extend({} , Slider.DEFAULTS , options );
        this.$elem = $( elem ) ;
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.index = this.options.index;
        this.init.call( this );
    }

    Slider.prototype = {
        init : function(){
            var self = this;
            this.$list = this.$elem.find( this.options.list ) ;
            this.$nav = this.$elem.find( this.options.nav ) ;
            if( !this.$list.length ){
                var $elem = $("<div>",{ 'class' : this.$elem.attr('class')});
                $elem.insertBefore(this.$elem.removeAttr('class').addClass('list')).append( this.$elem );
                this.$list = this.$elem;
                this.$elem = $elem;
            }
            this.$loading = $('<div class="slider-loading">loading...</div>').appendTo( $elem );

            if( this.$elem.hasClass('slider-responsive') ){
                this.$elem.find('img').each(function(){
                    if( $(this).outerHeight() > self.$elem.height() ){
                        $(this).css('height','100%')
                    }
                    else{
                        $(this).css('margin-top', (self.$elem.height() - $(this).outerHeight()) /2 )
                    }
                })
            }

            this.$list.hide();
            this.$canvas = $('<div class="clip"/>').appendTo( this.$elem);

            this.prop  = 'left';
            this.supportCSS3 = false;
            var iconClass = { prev :'icon-chevron-left' , next :'icon-chevron-right' };
            if( self.$elem.hasClass('vertical') ){
                this.prop = 'top' ;
                iconClass = { prev :'icon-chevron-up' , next :'icon-chevron-down' };
            }

            if( $.browser && $.browser.supportsTransitions ){
                this.supportCSS3 = true;
            }

            this.addElements();

            this.createNavigation();

            !this.$elem.find( this.options.prev ).length && this.$elem.prepend('<a class="prev" href="#" data-prev><i class="icon '+ iconClass.prev +'"></i></a>');
            !this.$elem.find( this.options.next ).length && this.$elem.prepend('<a class="next" href="#" data-next><i class="icon '+ iconClass.next +'"></i></a>');

            if( this.options.autoHeight != false ){
                this.$elem.height('auto');
            }



            this.$elem.off('click.slider').on('click.slider', this.options.prev , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.prev();
            }).on('click.slider', this.options.next  , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.next();
            })

            /*this.$list.find('img').off('load.slider').on('load.slider',function(){

            })*/
            this.touch();

            this.options.auto  && this.autoplay();
            self.$loading.fadeOut();
            return this;
        },
        autoplay: function(){
            var self = this ;
            this.$elem.off('mouseenter.slider mouseleave.slider').on('mouseenter.slider',function(){
                self.stop();
            }).on('mouseleave.slider',function(){
                self.autoplay();
            })
            this.timer = setInterval( function(){ self.next() } , this.options.interval );
            return this;
        },
        stop : function(){
           this.timer && clearInterval( this.timer );
            return this;
        },
        touch : function(){
            var startPos = {} , endPos = {} , movePercent = {} ,
                list = this.$canvas ,
                self = this;

            list.off('touchstart.touch touchmove.touch touchend.touch').on('touchstart.touch', function (e) {
                var event = e.originalEvent;
                if (event.targetTouches.length >= 1) {
                    var touch = event.targetTouches[0];
                    startPos = { left : touch.pageX , top : touch.pageY };
                }
                self.supportCSS3 &&  $(this).children().removeClass('slider-item-transition');
            });

            list.on('touchmove.touch', function (e) {
                var event = e.originalEvent;
                //targetTouches
                if (event.changedTouches.length >= 1) {
                    var touch = event.changedTouches[0];

                    endPos =  { left : touch.pageX , top : touch.pageY };
                    movePercent.left =  (startPos.left - endPos.left) / self.$canvas.width() ;
                    movePercent.top =  (startPos.top - endPos.top) / self.$canvas.height() ;

                    function setPos ( prop ){
                        self.$items.each(function(i){
                            var p = -( movePercent[ prop ] )* 100;
                            if( i == 0 ){
                                p -=100;
                            }
                            else if( i == 2 ){
                                p +=100;
                            }
                            $(this).css( prop , p + '%') ;
                        })
                    }

                    setPos( self.prop );
                }
            });

            list.on('touchend.touch', function (e) {
                var event = e.originalEvent;
                if (event.changedTouches.length >= 1) {
                    var touch = event.changedTouches[0];

                    self.supportCSS3 && $(this).children().addClass('slider-item-transition').removeAttr('style');

                    if( Math.abs(movePercent[self.prop]) >= 0.5 ){
                        movePercent[self.prop] > 0 ? self.next() : self.prev();
                    }
                    else{
                        self.change( self.index );
                    }
                }
            });
        },
        len : function(){
            return  this.$list.children().length ;
        },
        createNavigation : function(){
            var self = this;
            if( !this.$nav.length ){
                this.$nav = $('<ul class="slider-nav" data-nav></ul>');
                var html = '';
                for(var i= 0 ; i < this.len() ; i ++ ){
                    if( i == this.index )
                        html += '<li class="'+ self.options.activeClass +'"></li>';
                    else
                        html += '<li></li>';
                }
                this.$nav.append(html).appendTo( this.$elem );
            }
            this.$nav.off('click.slider').on('click.slider','li',function(){
                var type =  self.index > $(this).index() ? 'prev' : 'next';
                self.change( $(this).index() , type );
            });
            return this;
        },
        addElements : function ( index , contents ){
            index = index == null ?  this.index  : index ;
            var len = this.len(), classNames =  ['slider-left' ,'' , 'slider-right']
            this.$items = $() ;
            for(var i = 0; i < 3 ; i ++ ){
                var tempIndex = index, currentClass = '';

                if( i == 2 ){
                    tempIndex = tempIndex + 1 < len ?  tempIndex + 1 : 0 ;
                }
                else if( i == 0 ){
                    tempIndex = (tempIndex - 1 < 0) ? len - 1 : tempIndex - 1;
                }
                else
                    currentClass = 'slider-current'
                var $item = $('<div class="slider-item '+ currentClass +'"/>').html( contents ? contents[ tempIndex ] : this.$list.children().eq( tempIndex ).html() ) ;

                if( this.supportCSS3 ) $item.addClass('slider-item-transition').addClass(classNames[i]) ;
                else $item.css('left' , ((i - 1) * 100) + '%');
                this.$items = this.$items.add( $item );
            }
            this.$items.appendTo(this.$canvas.empty() );
            return this;
        },
        change : function( index , type ){
            var self = this;
            if( self.supportCSS3 )
                if( this.$items.is(':animated') ) return this;
            else
                if( this.$items.data('animated') ) return this;

            this.$nav.children().eq( index ).addClass( self.options.activeClass ).siblings().removeClass( self.options.activeClass );
            this.$items.each(function( i ){
                if( self.supportCSS3 ){
                    $(this).addClass( self.options.activeClass );
                    if( type == 'prev' ){
                        $(this).addClass('slider-prev');
                    } else if( type == 'next' ){
                        $(this).addClass('slider-next');
                    };
                    self.$items.data('animated' , true );
                    (i == 0) &&  $(this).transitionEnd(function(){
                        self.$items.data('animated' , false );
                        self.addElements( index );
                    })
                }
                else{
                    var prop = ((i  - 1) * 100)+'%';
                    if( type == 'prev' ){
                        prop = (i * 100)+'%' ;
                    } else if( type == 'next' ){
                        prop = ((i  - 2) * 100)+'%';
                    }
                    var aprop = {} ;
                    aprop[self.prop] = prop;

                    $(this).animate( aprop , function(){
                        self.addElements( index );
                    })
                }

            });

            this.index = index ;
            return this;
        },
        add : function( elem ){
            this.$list.append(elem);
            this.$nav.append('<li></li>');
            return this;
        },
        remove: function( index ){
            this.$list.children(':eq('+ index +')').remove();
            this.$nav.children(':eq('+ index +')').remove();
            return this;
        },
        disabled: function(){

        },
        prev :  function(){
            var len = this.len();
            var index = this.index - 1 < 0 ?  len - 1: this.index - 1  ;
            return this.change( index , 'prev' );
        },
        next :  function(){
            var len = this.len();
            var index = this.index + 1 >= len  ?  0 : this.index + 1 ;
            return  this.change( index , 'next' );
        }
    }

    Slider.DEFAULTS = {
        interval : 5000 ,
        auto     : true ,
        easing   : 'linear',
        duration : 'normal',
        index    : 0,
        autoHeight : false,
        list : '[data-list]',
        nav : '[data-nav]',
        prev : '[data-prev]',
        next : '[data-next]',
        activeClass : 'active'
    };


    $.fn.slider = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('slider');
            if(!data ){
                data = new Slider( this , options );
                $(this).data('slider' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' , 'args' ,'return data[ options ](args)');

            options && data[ options ] && fn( data , options , g.join(','));
        })
    }

    $.fn.slider.Constructor =  Slider;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Slider;
    }
})(window.jQuery || require('jquery'));

