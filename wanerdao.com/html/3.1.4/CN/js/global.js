;(function( $ ){
    jQuery.event.handle = jQuery.event.dispatch;
    $(function(){
        // 按钮载入状态
        $(document).on('click','[type=submit],.btn-loading',function(){
            if( $(this).val() == '') return ;

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
        });


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
            return $(this).each(function(){
                $.fn.slimscroll && initScrollPanel.call( this );
            })
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
        $.fn.scrollFixed &&  $('.scrollfixed').scrollFixed();
        /**
         *  end 插件初始化
         * */

        /* 标签删除功能 */
        $('.list-label').on('click','[data-remove]',function(){
            $(this).closest('li').remove();
        })
        /* end 标签删除功能 */

        /* tabs 切换 */
        $('.tabs').on('click', '.nav-tabs li',function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            $(this).closest('.tabs').find('.tabs-panel').children().eq($(this).index()).fadeIn().siblings().hide();
        })
        /* end tabs 切换 */

        /* - popup - */
        $(document).on('click','[data-popup]',function(){
            $( $( this ).attr('href')).dialog('show');
        })
        
        /* - popup - */

        // TODO 列表点击展开
        $('.group-list').on('click','li',function(){
            $(this).find('.detail .scroll-panel').css('overflow','hidden');
            $(this).find('.detail').stop(true,true).slideToggle(function(){
                if($.fn.slimscroll) $(this).find('.scroll-panel').initslimscroll();
            })
                .off('click.group-list-li').on('click.group-list-li',function(e){
                    e.stopPropagation();
                })
                .end().find('.detail-short').stop(true,true).slideToggle()
        })

        $('.ct-tag').click(function(e){
            var $ct = $(this).closest('.ct');
            $ct.find('.ct-panel').stop(true,true).slideToggle();
            $ct.siblings().find('.ct-panel').stop(true,true).slideUp();
        })

        var Tree = function(  ){
            this.$ = $('.module-store');
            var _this = this;
            this.$.on('mouseenter','li' , function(e){
                _this.show( $(this) , $(this).closest('li'))

            }).on('mouseleave','li',function(e){
                _this.hide( $(this), $(this).closest('li') );
            })
        }

        Tree.prototype = {
            show : function( node  , parentNode ){
                var $panel = node.addClass('active').find('>.item-panel'),$sideList =  this.$ ;

                if( !node.data('children') ) {
                    $panel.data('parent', node.closest('.item-panel'));
                    node.data('children', $panel);
                    $panel.appendTo( $sideList.css('position','relative') )
                }
                else{
                    $panel =  node.data('children');
                }

                var left = node.offset().left - $sideList.offset().left + node.outerWidth(),
                    top = node.offset().top  - $sideList.offset().top;

                top = node.offset().top > $(window).height()/ 2 ? top - $panel.height() + node.outerHeight() : top ;

                $panel.css({
                        position: 'absolute',
                        left : left,
                        top : top
                    }).show()
                    .off('mouseenter mouseleave').on('mouseenter',function(){
                        $(this).addClass('active').data('parent').addClass('active');
                    }).on('mouseleave',function(){
                        var _this = this;
                        $(this).removeClass('active').data('parent').removeClass('active');
                        setTimeout(function(){
                            if( !$(_this).hasClass('active')){
                                $(_this).hide()
                                node.removeClass('active')
                            }
                        } , 10 )

                    })

                return this;
            },
            hide : function( node , parentNode ){
                setTimeout(function(){
                    if( !$(node).data('children').hasClass('active' )){
                        $(node).data('children').hide();
                        node.removeClass('active')
                    }
                },10)
                return this;
            }
        }

        new Tree();

        if( $.fn.chosen ){
            var $chosen = $('.chosen').chosen().next();
            $chosen.find('.chzn-single').on('click',function(){
              /*  var $this = $chosen.not($(this).closest('.chosen'))
                var chzncontainer = $this.css('z-index','').removeClass('chzn-container-active');
                $('.chzn-drop',chzncontainer).css({left:' -9000px'});
                $('.chzn-single',chzncontainer).removeClass('chzn-single-with-drop');*/
                $.tempChosen && $.tempChosen.results_hide();
                $.tempChosen &&  $($.tempChosen.form_field).next().css('z-index','');

                //- $(window).scrollTop()
                if( $(this).offset().top + $(this).next('.chzn-drop').height() >=  $('.footer').offset().top ){
                    var  _this = this;
                    var  $drop = $(_this).next('.chzn-drop') ;
                    $drop.hide();
                    setTimeout(function(){
                        $drop.css('top' , -$drop.height()).show();
                    },1)
                }
            })
        }

        $('.contentdropdownval').on('click','li',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
            }
            else{
                $(this).addClass('active').siblings().removeClass('active');
            }
        })
    });

    $.fn.dialog = function ( options ) {
        return $( this ).each(function(){
            var data = $(this).data('dialog') , cmd  ;

            if( typeof options == 'string' ){
                cmd = options ;
                options = null ;
            }

            if(!data ){
                data = new Class.dialog( this , options );
                $(this).data('dialog' , data);
            }
            options && data[ options ] && data[ options ]();

            if( cmd == 'show'){
                data.show();
            }else if( cmd == 'hide'){
                data.hide();
            }
        })
    }

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