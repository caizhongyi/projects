!(function( $ ){
    var defaults = {
        $el   : '',
        type : 'mail',
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
        cache : true
        // 模版
        /* template : '' +
         '<div class="<%= classPrefix %>" >' +
         '<ul class="<%= classPrefix %>-items" data-role="items">' +
         '<% items.forEach (function (item) {%>' +
         '<li class="<%= classPrefix %>-item">' +
         '<a href="javascript:;" data-role="item" data-value="<%= item.value %>"><%= item.text || item.value %></a>' +
         '</li>' +
         '<% }); %>' +
         '</ul>' +
         '</div>'*/
    }

    /**
     * 文本框自动提示， 目前只支持邮箱提示
     * @el {string} 选择器
     * @$el {object} jquery对象
     * @source {array} 数据源
     * @cache {boolean} 缓存
     * */
    var AutoComplete = function( options ){
        this.options = $.extend({} , defaults  , options );
        this.cache = null;
        this.status = 'hidden';
        this.options.$el = this.options.$el.length ? this.options.$el : $( this.options.el );
        //this.template = Widget.template(options.template);
        this.init();
    };

    AutoComplete.prototype = {
        constructor : AutoComplete,
        init : function(){
            var self = this;
            this.options.$el.attr('autocomplete','off');
            if( !this.$autocomplate )
                this.$autocomplate = $('<div class="autocomplete"></div>').appendTo('body').off('click.autocomplete').on('click.autocomplete', 'li',function(){
                    self.val( $(this).text() )
                    self.hide();
                })

            this.pos();

            this.options.$el.off('keyup.autocomplete').on('keyup.autocomplete',function(e){
                var index = self.$autocomplate.find('.active').index();
                var $li = self.$autocomplate.find('li') ;

                if(  self.isKeyUp(e) || self.isKeyDown(e)  )
                    self.options.$el.closest('form').off('submit.autocomplete').on('submit.autocomplete',function(){
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

                if( e.key == 'Enter' && index !=-1 ){
                    self.val( $li.filter('.active').text() )
                }
                if( !self.isKeyDown(e) && !self.isKeyUp(e) && e.key != 'Enter'){
                    self.search($(this).val())
                }

            }).off('focus.autocomplete').on('focus.autocomplete',function(e){
                var $elem = $(this);
                self.getData(function( data ){
                    self.search($elem.val())
                });
            }).off('click.autocomplete').on('click.autocomplete',function(e){
                e.stopPropagation();
            })

            $(window).off('resize.autocomplete').on('resize.autocomplete',function(e){
                self.pos();
            })
        },
        isKeyUp : function(e){
            return e.key == 'Down' || e.key == 'ArrowDown'
        },
        isKeyDown : function(e){
            return e.key == 'Up' || e.key == 'ArrowUp'
        },
        resize: function(){
            this.$autocomplate.width(this.options.$el.outerWidth())
            return this;
        },
        pos :function(){
            var $el = this.options.$el, pos = {} ;
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
            if( typeof this.options.source == 'string'){
                if( this.options.cache && !self.cache ){
                    this.loading();
                    $.get( this.options.source , function( data ){
                        self.cache = data ;
                        self.render( data ).pos();
                        callback && callback( self  , data);
                    },'json');
                }
                else{
                    this.search( this.options.$el.val() );
                }
            }
            else{
                self.cache =  this.options.source;
                self.render(  self.cache ).pos();
                callback && callback( self  , self.cache);
            }
            return this;
        },
        val : function( val ){
            this.options.$el.val( val );
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
            return this.status == 'shown' && $('.active',this.$autocomplate).length ? true : false ;
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
            var $ul = $('<ul>'), val = this.options.$el.val();
            for( var i = 0 ; i < data.length ; i ++){
                $ul.append('<li><a href="javascript:;">'+ (val.substring(0 , val.indexOf('@')) + data[i]) +'</a></li>');
            }
            this.$autocomplate.empty().append($ul);
            return this;
        },

        search : function( val , data){
            if( this.options.type == 'mail'){

                if(!/^[a-zA-Z0-9_-]+@.*/.test( val )) return ;
                else{
                    val = val.substring( val.indexOf('@') );
                    val = '(.*)' + val;
                }
            }
            data = data || this.cache ;
            var res = [];
            for( var i = 0 ; i < data.length ; i ++){
                var item = data[i];
                if( new RegExp(val).test(item)){
                    res.push( item );
                }
            }
            this.render(res);
            this.show();
            return this;
        }
    }

    $.fn.autocomplete = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('autocomplete');
            if(!data ){
                data = new AutoComplete( this , options );
                $(this).data('autocomplete' , data);
            }
            var g = [];
            for( var i = 1 ; i < args.length ; i ++ ){
                g.push(args[i]);
            }
            // TODO 构造函数
            var fn = new Function( 'data' , 'options' ,'return data[ options ]('+ g.join(',') +')');
            options && data[ options ] && fn( data , options );
        })
    }

    $.fn.autocomplete.Constructor =  AutoComplete;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = AutoComplete;
    }

})( jQuery );