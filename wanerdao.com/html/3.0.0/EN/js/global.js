;(function( $ ){
    jQuery.event.handle = jQuery.event.dispatch;
    $(function(){
        // 按钮载入状态
        $(document).on('click','[type=submit],.btn-loading',function(){
            var val = $(this).data('loading-value') || 'Loading...',
                name = $(this).data('loading-class') || 'disabled' ;

            $(this).prop('disabled',true).addClass(name);

            if( $(this)[0].tagName == 'INPUT' || $(this)[0].tagName == 'BUTTON')
                $(this).val( val )
            else
                $(this).html( val );
        })

        /* 元素移上去显示浮动框 */
        $(document).on('mouseenter','[data-floatbox]',function(){
            if(!$(this).data('floatbox')) {
                var $box =   $(this).find('.floatbox') ;
                $(this).data('floatbox', $box );
                $box.appendTo('body');
            }
            else{
                $box = $(this).data('floatbox');
            }
            var top = $box.hasClass('floatbox-top') ? ($(this).offset().top - $box.outerHeight() - 20) :($(this).offset().top + $(this).outerHeight()) ;
            $box.css({ left : $(this).offset().left - $box.outerWidth() / 2  , top : top}).stop(true,true).fadeIn();
        }).on('mouseleave','[data-floatbox]',function(){
            var that = this;
            var timer = setTimeout(function(){ $(that).data('floatbox').hide(); } , 200);
            $(that).data('floatbox').data('timer',timer);
            }).on('mouseenter','[data-floatbox] .floatbox',function(){
            clearTimeout($(this).data('timer'));
        }).on('mouseleave','[data-floatbox] .floatbox',function(){
                $(this).hide();
            }).on('click','[data-floatbox] .floatbox .icon-delete-gray',function(e){
            e.stopPropagation();
            $(this).closest('.floatbox').hide();
        }).on('click','[data-floatbox] .floatbox',function(e){
            e.stopPropagation();
        })

        $(window).resize(function(){
            $('[data-floatbox] .floatbox').hide();
        });

        /* 右侧浮动框 */
        var $floatbox = $('.float-search').show().css('right',function(){return -$(this).find('.search-panel').outerWidth();}).click(function(e){
            e.stopPropagation();
            if(parseFloat($(this).css('right')) != 0)
                 $(this).stop(true).animate({ right: '0'});
            else{
                var width = $(this).find('.search-panel').outerWidth();
                $(this).stop(true).animate({ right: -width});
            }
            return false;
        }) ;
        $floatbox.find('.search-panel').click(function(e){e.stopPropagation();})
        $(document).click(function(){
            var width = $floatbox.find('.search-panel').outerWidth();
            $floatbox.stop(true).animate({ right: -width});
        });
        /* end 右侧浮动框 */

        //修正下拉为hover效果
        $(document).on('mouseenter','.combo.hover',function(e){
           var $comboList = $(this).find('.combo-list').stop(true).fadeIn();
           if($comboList.offset().top + $comboList.height() > $(window).height() + $(window).scrollTop() - 50){
               $comboList.css('top', - ($comboList.height() + 3))
           }
        }).on('mouseleave','.combo.hover',function(){
             $(this).find('.combo-list').hide();
        }).on('click','.combo.hover',function(e){
            e.stopPropagation();
        })

        /**
         * 插件初始化
         * */
        $.fn.toTop && $('.gotop').toTop(); //顶置

        $.fn.initslimscroll = function(){
            $.fn.slimscroll && initScrollPanel.call( this );
            return this;
        };

        if($.fn.slimscroll){
            function initScrollPanel (){
                var maxHeight =  parseFloat($(this).css('max-height'));

                if( maxHeight && $(this).height() >=  maxHeight){
                    maxHeight = maxHeight + parseFloat($(this).css('padding-top')) * 2;
                    $( this ).slimscroll({ height: maxHeight  })
                }
            }
            var $scrollPanel = $('.scroll-panel,.combo-list ul');

            $scrollPanel.each(function(){
                initScrollPanel.call( this );
            })
        }

        $.fn.accordion && $('.accordion,.dockbar').accordion();
        $.fn.dropdown &&  $('.dropdown').dropdown();
       // $.fn.scrollFixed &&  $('.scrollfixed').scrollFixed();
        /**
         *  end 插件初始化
         * */

        /* 标签删除功能 */
        $('.list-label').on('click','[data-remove]',function(){
            $(this).closest('li').remove();
        })
        /* end 标签删除功能 */
    });

    //载入
    $.fn.loading = function( setting ){
        $(this).css('position','relative');
        if(setting != 'hide' || !setting ){
            if($(this).children('.loading-mask,.loading,.loading-info').length){
                $(this).children('.loading-mask,.loading,.loading-info').fadeIn();
            }
            else{
                $('<div class="loading-mask"></div>').appendTo(this).fadeIn();
                if(setting && setting != 'show'){
                    $('<div class="loading-info"><span>'+ setting  +'</span></div>').appendTo(this).fadeIn();
                }
                else{
                    $('<div class="loading"></div>').appendTo(this).fadeIn();
                }
            }
        }
        else if(setting == 'hide'){
            $('.loading-mask,.loading',this).remove();
        }
        if($(this)[0].tagName == 'BODY' || $(this)[0].tagName == 'DOCUMENT'){
            $('.loading-mask,.loading,.loading-info').css('position','fixed');
        }
        return this;
    }


})( jQuery );