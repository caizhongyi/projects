var Class = window.Class ||  require('class') ;
var $ = require('jquery');

/**
 * 文本框自动提示， 目前只支持邮箱提示
 * @param selector {string | object }  选择器
 * @param options.source {array} 数据源
 * @param options.cache {boolean} 缓存
 * @param options.type {boolean} 缓存
 * @param options.paramName {boolean} 缓存
 * @param options.format {boolean} 缓存
 * @param options.valueFormat {boolean} 返回值格式化
 *   */
var AutoComplete = Class.create({
    initialize: function( selector , options ) {
        this.options = $.extend({} ,  {
            type : 'mail',
            paramName : 'p',
            /**
             * 数组或URL地址
             */
            source : [
                "@qq.com",
                "@sina.com",
                "@sina.cn",
                "@163.com",
                "@sohu.com",
                "@vip.sina.com",
                "@126.com",
                "@hotmail.com",
                "@gmail.com",
                "@139.com",
                "@21cn.com",
                "@189.com",
                "@wo.com.cn",
                "@273.cn"
            ],
            format : function( row ){
              //  return '<li><a href="###" data-value="'+ row.value +'">'+ row.name +'</a></li>';
                return '<li><a href="###" >'+ row +'</a></li>';
            },
            valueFormat : function( $item ){
                return $item.text() ;
            },
            cache : true,
            // 回车是否触发链接跳转
            enterLocation: true
        }  , options );

        this.cache = typeof  this.options.source == 'object' ? this.options.source : null;
        this.status = 'hidden';
        this.$ = $(selector);
        //this.template = Widget.template(options.template);
        var self = this;
        this.$.attr('autocomplete','off');
        if( !this.$autocomplate )
            this.$autocomplate = $('<div class="autocomplete"></div>').appendTo('body').off('click.autocomplete').on('click.autocomplete', 'li',function(){
                self.val( self.options.valueFormat( $(this) ) )
                self.hide();
            })

        this.pos();

        this.$.off('keyup.autocomplete').on('keyup.autocomplete',function(e){
            var index = self.$autocomplate.find('.active').index();
            var $li = self.$autocomplate.find('li') ;
            self.$ = $(this);
            if(  self.isKeyUp(e) || self.isKeyDown(e)  )
                $(this).closest('form').off('submit.autocomplete').on('submit.autocomplete',function(){
                    return false;
                })

            if( self.isKeyUp(e) ){
                if( index == -1){
                    $li.first().addClass('active');
                }
                else{
                    $li.removeClass('active').eq( index + 1).addClass('active');
                }
            }
            if( self.isKeyDown(e) ){
                if( index == -1){
                    $li.last().addClass('active');
                }
                else{
                    $li.removeClass('active').eq( index - 1).addClass('active');
                }
            }

            if( e.keyCode == 13 && index !=-1 ){
                var $target = $li.filter('.active');
                $(this).closest('form').off('submit.autocomplete')
                self.val( self.options.valueFormat( $target ) )
                self.hide().trigger('enter', { target : $target })
                if (self.options.enterLocation) {
                    var href = $target.find('a').attr('href');
                    if (href) {
                        window.location.href = href;
                    }
                }
            }

            if( !self.isKeyDown(e) && !self.isKeyUp(e) && e.keyCode != 13 ){
                self.getData(function( data ){
                    self.search( self.$.val())
                }).pos();
            }

        }).off('focus.autocomplete').on('focus.autocomplete',function(e){
            var $elem = self.$ =  $(this);
            if( $elem.val() == '') return ;
            self.$autocomplate.removeClass('autocomplete-in');
            self.getData(function( data ){
                self.search($elem.val())
            }).pos();
        }).off('click.autocomplete').on('click.autocomplete',function(e){
            e.stopPropagation();
        })

        $(window).off('resize.autocomplete').on('resize.autocomplete',function(e){
            self.pos();
        })
    },
    isKeyDown : function(e){
        return  e.keyCode == 38
    },
    isKeyUp : function(e){
        return  e.keyCode == 40
    },
    resize: function(){
        var width = $( this.options.attachment , this.$).outerWidth() || this.$.outerWidth();
        this.$autocomplate.width( width );
        return this;
    },
    pos :function(){
        var $attachment = $( this.options.attachment , this.$ )
        var $el = $attachment.length ? $attachment : this.$, pos = {} ;
        if( $el.offset().top /2 + $el.outerHeight() > $(window).height() / 2 ){
            pos = {
                left : $el.offset().left,
                top : $el.offset().top - this.$autocomplate.outerHeight()
            }
        }
        else{
            pos = {
                left : $el.offset().left,
                top : $el.offset().top + $el.outerHeight()
            }
        }
        this.$autocomplate.css(pos)
        return this;
    },
    getData : function( callback ){
        var self = this;

        if($.trim(self.$.val()) == '') {
            this.hide();
            return this;
        } ;

        function get(){
            var param  = {};
            param[ self.options.paramName ] = self.$.val();
            $.get( self.options.source , param  , function( data ){
                self.$.data('cache' , data)
                // self.render( data ).pos();
                callback && callback( self  , data);
            }, 'jsonp');
        }

        if( typeof this.options.source == 'string'){
            if( !this.options.cache ){
                this.loading();
                get();
            }
            else{
                if( !self.$.data('cache') ){
                    get();
                }
                else{
                    this.search( this.$.val() );
                }
            }
        }
        else{
            self.$.data('cache' , this.options.source );
            var cache = self.$.data('cache');
           // self.render( cache ).pos();
            callback && callback( self  , cache );
        }
        return this;
    },
    val : function( val ){
        this.$.val( val );
        this.hide();
        return this;
    },
    show : function(){
        var self = this;
        this.$autocomplate.addClass('autocomplete-in');
        this.pos().resize();

        $(document).off('click.autocomplete').on('click.autocomplete',function(e){
            self.hide();
        })
        this.status = 'shown';
        return this;
    },
    isActive : function(){
        return this.status == 'shown' ? true : false ;
    },
    hide: function(){
        this.$autocomplate.removeClass('autocomplete-in');
        this.status = 'hidden';
        return this;
    },
    loading : function(){
        this.$autocomplate.empty().append('<div class="autocomplete-loading">loading...</div>');
        return this;
    },
    render : function( data ){

        var $ul = $('<ul>'), val = this.$.val();
        for( var i = 0 ; i < data.length ; i ++){
            var str = data[i];
            if( this.options.type == 'mail' ){
                str = (val.substring(0 , val.indexOf('@')) + data[i])
            }
            $ul.append(this.options.format(str));
        }

        this.$autocomplate.html($ul);
        return this;
    },
    search : function( val , data){
        if( val == '') return this;
        data = data || this.$.data('cache') ;
        var res = [];
        if( this.options.type == 'mail'){

            if(!/^[a-zA-Z0-9_-]+@.*/.test( val )) return ;
            else{
                val = val.substring( val.indexOf('@') );
                val = '(.*)' + val;
            }
            for( var i = 0 ; i < data.length ; i ++){
                var item = data[i];
                if( new RegExp(val).test(item)){
                    res.push( item );
                }
            }
        }
        else{
            res = data;
        }
        this.render(res);
        this.show();
        return this;
    }
})

if( typeof  module == 'object') module.exports = AutoComplete;
