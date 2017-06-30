/**
 * 分页类
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-10-10
 * Time: 下午4:46
 * To change this template use File | Settings | File Templates.
 * depends : jquery.1.7.2.js +
 *          jquery.class.js
 */

;(function ($) {
    var size ={
        height : function(){
            var scrollHeight,
                offsetHeight;
            // handle IE 6
            if ($.browser.msie && $.browser.version < 7) {
                scrollHeight = Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                );
                offsetHeight = Math.max(
                    document.documentElement.offsetHeight,
                    document.body.offsetHeight
                );

                if (scrollHeight < offsetHeight) {
                    return $(window).height() + 'px';
                } else {
                    return scrollHeight + 'px';
                };
                // handle "good" browsers
            } else {
                return $(document).height() + 'px';
            }
        },
        width : function(){
            var scrollWidth,
                offsetWidth;
            // handle IE 6
            if ($.browser.msie && $.browser.version < 7) {
                scrollWidth = Math.max(
                    document.documentElement.scrollWidth,
                    document.body.scrollWidth
                );
                offsetWidth = Math.max(
                    document.documentElement.offsetWidth,
                    document.body.offsetWidth
                );

                if (scrollWidth < offsetWidth) {
                    return $(window).width() + 'px';
                } else {
                    return scrollWidth + 'px';
                };
                // handle "good" browsers
            } else {
                return $(document).width() + 'px';
            };
        }
    }

    Class.dialog = Class.get({
            $overlay : null,
            initialize : function(selector , options){
                this.options = $.extend(true,{},{
                    effect : 'enlarge',
                    event  : 'click',
                    context : $(window),
                    dragHandle : '.dialog-header',
                    close    : '.close',
                    layclick : false,
                    hasIframe : true,
                    overlay : '<div class="overlay" style="opacity: 0.5;filter:aplha(opacity = 50);"></div>'
                },options);

                var _this = this;
                this.$ = $(selector);
                this.effects = Class.dialog.effects;
                this.$dialogbox = this.$.attr('rel') ? $(this.$.attr('rel')) :  $(this.$);
                this.$dialogbox.data('size',{ width : this.$dialogbox.width(), height : this.$dialogbox.height()});
                if(this.$dialogbox.css('z-index') == 'auto' || !this.$dialogbox.css('z-index') ){
                    this.$dialogbox.css('z-index',10)
                };
                this.$overlay = this._getOverLay();
                if(this.options.hasIframe)
                    this.$iframe = $('<iframe scrolling="no" frameborder="0"></iframe>').appendTo('body').css({
                        width : this.$overlay.outerWidth(),
                        height : this.$overlay.outerHeight(),
                        left : 0,
                        top : 0,
                        'z-index' : parseInt(this.$overlay.css('z-index')) - 1
                    }).hide();

                this.$dialogbox.fixed && this.$dialogbox.fixed();
                this.$overlay.fixed && this.$overlay.fixed();

                this.$iframe && this.$iframe.fixed && this.$iframe.fixed();
                var $dragHandle =  this.$dialogbox.find(this.options.dragHandle);
                this.$dialogbox.draggable && this.$dialogbox.draggable({handle: $dragHandle.length ? $dragHandle : this.$dialogbox,containment: "document", scroll: false, opacity: 0.8, cursor: 'move' ,drag : function(event,ui){
                    //console.log(ui.position)
                }});
                this.$dialogbox.resizable && this.$dialogbox.resizable();

                var event = this.options.event + '.dialog';

                if(this.$.attr('rel')){
                    this.$.off(event).on(event,function(){
                       _this.show();
                    })
                };

                this.$dialogbox.off('click.dilaog').on('click.dilaog', this.options.close,function(){
                    _this.hide();
                });

                this.center();
                this._setOverlay();
                $(window).resize(function(){
                    _this.center();
                    _this._setOverlay();
                });
                if(this.options.layclick){
                    this.$overlay.off('click.dilaog').on('click.dilaog',function(){
                        _this.hide();
                    });
                };
            },
            _getOverLay : function(){
                this.$overlay = $('[dialog-overlay]');
                if(!this.$overlay.length){
                    this.$overlay = $(this.options.overlay).attr('dialog-overlay','true').appendTo($('body')).css({
                        top : 0 ,
                        left : 0,
                        'z-index' : parseInt(this.$dialogbox.css('z-index')) - 1
                    }).hide();
                };
                return this.$overlay;
            },
            _setOverlay : function(){
                if(this.$overlay.fixed){
                    this.$overlay.css({
                        width : $(window).width(),
                        height : $(window).height()
                    });
                }
                else{
                    this.$overlay.css({
                        width : size.width(),
                        height : size.height()
                    });
                }
            },
            centerPos : function(context){
                    var offset = context.offset() || {} ;
                    var size = this.$dialogbox.data('size');
                    var left =  (context.width() - size.width) / 2 + context.scrollLeft();
                    var top =  ( context.height() - size.height) / 2 + context.scrollTop();

                    var params = {};
                    params['left'] = left + (offset.left || 0)  ;
                    params['top'] = top  +(offset.top || 0);
                    return params;
            },
            center : function(){
                this.$dialogbox.css(this.centerPos($(this.options.context)));
                return this;
            },
            show : function(){

                $.proxy(this.effects[this.options.effect].show,this.$dialogbox)(this.centerPos($(this.options.context)));
              //  this.effects[this.options.effect].show(this.$dialogbox);
                this.$overlay.stop(true).show().animate({ opacity : 0.5});
                this.$iframe && this.$iframe.stop(true).fadeIn();
                return this;
            },
            hide : function(){
                $.proxy(this.effects[this.options.effect].hide,this.$dialogbox)();
               // this.effects[this.options.effect].hide(this.$dialogbox);
                this.$overlay.stop(true).fadeOut();
                this.$iframe && this.$iframe.stop(true).fadeOut();
                return this;
            },
            html : function(html){
                this.$.html(html);
            }

    });

    Class.dialog.effects = {
        enlarge : {
            show : function(pos,duraion , easing){
                var $obj = $(this);

                var hidePos = {
                    left : $(window).scrollLeft() + $(window).width() /2 ,
                    top : $(window).scrollTop() + $(window).height() /2
                };
                var size = {
                    width : $obj.width(),
                    height : $obj.height()
                };
                $obj.css(hidePos).css({ width : 0 , height : 0}).hide().stop(true)
                    .animate({ opacity : 'show' , left : pos.left , top : pos.top ,width : size.width, height: size.height},duraion,easing,function(){ $(this).height('auto')});

                return this;
            },
            hide : function(duraion,easing){
                var $obj = $(this);
                var pos = {
                    left : $(window).scrollLeft() + $obj.width() /2 + $obj.position().left ,
                    top : $(window).scrollTop() + $obj.height() /2 +  $obj.position().top
                };
                $obj.stop(true).animate({ opacity : 'hide' , left : pos.left , top : pos.top ,width : 'hide', height:'hide'},duraion,easing);
                return this;
            }
        },
        fade : {
            show : function(pos){
                $(this).stop(true,true).fadeIn();
                return this;
            },
            hide : function(){
                $(this).stop(true,true).fadeOut();
                return this;
            }
        }
    };

    Class.dialog.effects.enlarge_easeOutElastic = {
        show : function(pos){
            $.proxy(Class.dialog.effects.enlarge.show,this)(pos,700,'easeOutElastic');
            return this;
        },
        hide : function(){
            $.proxy(Class.dialog.effects.enlarge.hide,this)(700,'easeOutExpo');
            return this;
        }
    };

})(jQuery);