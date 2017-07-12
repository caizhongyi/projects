!(function ($) {
    var Tabs  = function( elem ,options ){
        this.options = $.extend({} , Tabs.DEFAULTS , options );
        this.$elem = $(elem) ;
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init.call( this );
    }

    Tabs.prototype = {
        init : function(){
            var self = this;
            this.$list = this.$elem.find( this.options.list ) ;

            var event = this.options.event;

            this.$elem.off( event + '.tabs').on( event + '.tabs', this.options.target , function(e){
                e.preventDefault();
                self.change( $(this).parent().index() );
            })
        },
        len : function(){
            var count = parseInt(this.$list.width() / this.$elem.width());
            return  this.$list.width() % this.$elem.width() > 0 ? count + 1:count;
        },
        change : function( index ){
            var $targets  = this.$elem.find( this.options.target ) ,
                $panels   = this.$elem.find( this.options.list ).children(),
                $target   = $targets.eq( index ),
                attr  = this.options.target.replace('[','').replace(']',''),
                $panel  = $target.attr( attr ) ? $( $target.attr( attr ) ) : $panels.eq( index ) ;

            $targets.parent().removeClass('active');
            $target.parent().addClass('active');

            $panels.removeClass('in');
            $panel.addClass('in');

            this.$elem.trigger( $.Event('change',{
                target : $panel,
                relatedTarget : $target
            }));

            return this ;
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

    /**
     * 配置
     * @type {{list: string, target: string, event: string}}
     */
    Tabs.DEFAULTS = {
        list : '.tabs-list',
        target : '[data-target]',
        event : 'click'
    };


    /**
     * 初始化
     * @param options
     * @returns {*|jQuery}
     */
    $.fn.tabs = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('tabs');
            if(!data ){
                data = new Tabs( this , options );
                $(this).data('tabs' , data);
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

    $.fn.tabs.Constructor =  Tabs;

})(window.jQuery || Zepto);

