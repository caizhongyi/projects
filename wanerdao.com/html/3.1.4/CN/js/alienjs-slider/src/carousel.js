!(function ($) {
    var Carousel  = function( elem ,options ){
        this.options = $.extend({} , Carousel.DEFAULTS , options );
        this.$elem = $(elem) ;
        for( var i in this.options){
            this.options[i] = this.$elem.data(i) ||  this.options[i];
        }
        this.page = this.options.page;
        this.index = this.options.index;
        this.$target == $();
        this.init.call( this );
    }

    Carousel.prototype = {
        init : function(){
            var self = this;
            this.$list = this.$elem.find( this.options.list ) ;

            /**
             *  @depend  jquery.slider.js
             *  */
            if( this.$elem.data('view') && $.fn.slider ){
                this.$slider = $( this.$elem.data('view')).slider({
                    list : this.$list
                }).off('click.slider').on('click.slider' , this.options.prev , function(){
                    self.viewPrev();
                }).on('click.slider' , this.options.next , function(){
                    self.viewNext();
                })

                this.slider = this.$slider.data('slider') ;
            }


            if( !this.$list.length ){
                var $elem = $("<div>",{ class : 'carousel'});
                $elem.insertBefore(this.$elem.removeClass('carousel').addClass('list')).append( this.$elem );
                this.$list = this.$elem.wrap('<div class="clip"></div>');
                this.$elem = $elem;
            }
            !this.$elem.find( this.options.prev ).length && this.$elem.prepend('<a class="prev" href="#" data-prev><i class="icon icon-chevron-left"></i></a>');
            !this.$elem.find( this.options.next ).length && this.$elem.prepend('<a class="next" href="#" data-next><i class="icon icon-chevron-right"></i></a>');

            this.$elem.off('click.carousel').on('click.carousel', this.options.prev , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.prev();
            }).on('click.carousel', this.options.next  , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.next();
            }).on('click.carousel',' li' , function(e){
                e.preventDefault();
                self.index = $(this).index();
                self.$slider && self.$slider.change( self.index );
            });


            /*this.$view.off('click.slider').on('click.slider',' [data-prev]' , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.prev();
            }).on('click.slider',' [data-next]' , function(e){
                e.preventDefault();
                self.$target = $(this);
                self.next();
            })*/

            this.resize();
        },
        addElements : function( index ){
            var $items = this.$list.children();
            var left = '<img src="'+ $items.eq(index).find('a').attr('href'); +'">';
            var current = '<img src="'+ $items.eq(index).find('a').attr('href'); +'">';
            var right = '<img src="'+ $items.eq(index).find('a').attr('href'); +'">';

            this.$slider.data('slider').addElements( index , [ '' , '' , '']);
            return this;
        },
        resize : function(){
            var $item = this.$list.children();
            this.$list.width($item.length * $item.width());
            return this;
        },
        len : function(){
            var count = parseInt(this.$list.width() / this.$elem.width());
            return  this.$list.width() % this.$elem.width() > 0 ? count + 1:count;
        },
        move : function( direction , index){
            var self = this;
            this.resize();
            var $elem = this.$elem;
            var prop = { } , $panel = this.$list;
            if( direction == 'top' ){
                prop[direction] =  -index * $elem.outerHeight();
            }
            else{
                prop[direction] = -index * $elem.outerWidth();
            }

            if($panel.is(':animated')) return  this ;
            $panel.animate(prop, $elem.data('duration') || this.options.duration , $elem.data('easing') || this.options.easing , function(){
                $elem.trigger($.Event('changed') , {  });
                self.page = index ;
            }) ;

            return this;
        },
        disabled: function(){

        },
        view : function( index ){
            var $item = this.$list.children(':eq('+ index +')') ;
            $item.addClass('active').siblings().removeClass('active');
            this.index = index ;
            return this;
        },
        viewPrev : function(){
            var index = this.index - 1 < 0 ?  this.$list.children().length - 1: this.index - 1  ;
            return this.view(index);
        },
        viewNext : function(){
            var index = this.index + 1 >= this.$list.children().length   ?  0 : this.index + 1 ;
            return this.view(index);
        },
       /* view : function(){
            var $item = this.$list.children(':eq('+ this.index +')') ;
            this.$view.attr('src' ,$item .find('a').attr('href')).hide().off('load.view').on('load.view',function(){
                $(this).fadeIn().parent().stop(true,true).animate({ 'margin-top': -$(this).height() /2, height: $(this).height() , width: $(this).width() })
            })
            $item.addClass('active').siblings().removeClass('active');
            this.$elem.trigger($.Event('viewed') , {  });
            return this;
        },*/
        change : function( index ){
            return this.move( this.$elem.data('prop') || this.options.prop , index  );
        },
        prev :  function(){
            var len = this.len();
            var index = this.page - 1 < 0 ?  len - 1: this.page - 1  ;
            return this.change(index);
        },
        next :  function(){
            var len = this.len();
            var index = this.page + 1 >= len  ?  0 : this.page + 1 ;
            return  this.change(index);
        }
    }

    Carousel.DEFAULTS = {
        easing   : 'linear',
        duration : 'normal',
        prop     : 'left',
        list     : '[data-list]',
        prev     : '[data-prev]',
        next     : '[data-next]',
        page    : 0,
        index    : 0
    };


    $.fn.carousel = function ( options , param ) {
        return $( this ).each(function(){
            var data = $(this).data('carousel');
            if(!data ){
                data = new Carousel( this , options );
                $(this).data('carousel' , data);
            }
            options && data[ options ] && data[ options ]( param );
        })
    }

    $.fn.carousel.Constructor =  Carousel;

})(window.jQuery || require('jquery'));

