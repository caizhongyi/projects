!(function ($) {
    /**
     * 手风琴收缩效果
     * @param elem {selector} 选择器
     * @param options {object} 配置
     * @constructor
     */
    var Collapse  = function( elem ,options ){
        this.options = $.extend({} , Collapse.DEFAULTS , options );
        this.elem = elem ;
        this.$elem = $( elem ) ;
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init.call( this ) ;
    }

    Collapse.prototype = {
        init : function(){
            var self = this;

            this.$elem.off('click.collapse').on('click.collapse', '[data-collapse]' , function(e){
                e.preventDefault();
                if( eval(self.$elem.data('group')) || self.options.group )
                    self.showOnly( $(this).data('collapse') )
                else
                    self.toggle( $(this).data('collapse') )
            });
        },
        hideOther   : function( elem ){
            var $elems = $();
            elem.parent().siblings().find('[data-collapse]').each(function(){
                $elems = $elems.add( $( $(this).data('collapse') ) );
            });
            this.animate( $elems , 'hide' , function(elem){
                $(elem).parent().removeClass('active');
            });
            return this;
        },
        animate : function( elem  , status  , callback ){
            var self = this;
            var prop = self.$elem.data('prop') || self.options.prop ;
            //if( !prop ) { return $panel.toggleClass('active');}

            $(elem).stop(true).animate(
                self.prop( prop  ,status ),
                self.$elem.data('duration') || self.options.duration  ,
                self.$elem.data('easing') || self.options.easing ,
                function(){
                    self.$elem.trigger( $.Event('shown', {
                        relatedTarget: $(elem).parent()
                    }));
                    callback && callback( elem );
                }
            );
            return this;
        },
        prop : function( prop , status ){
           var res = {}, array  = prop.split(',');
           if( array.length == 1){
               res[ array ] = status ;
           }else{
               for(var i = 0 ; i < array.length ; i++){
                   res[ array[i] ] = status ;
               }
           }

           return res ;
        },
        get :  function( elem ){
            var $elem = $(elem);
            if( typeof  elem == 'number'){
                var container = $(elem).children('eq:('+ elem +')').find('[data-collapse]').data('collapse');
                $elem = $(container);
            }
            return $elem;
        },
        show :  function( elem ){
            if( $(elem).is(':animated') ) return this;
            this.animate( this.get( elem )  , 'show' , function(){
                $(elem).parent().addClass('active');
            });
            return this;
        },
        hide :  function( elem  ){
            if( $(elem).is(':animated') ) return this;
            this.animate( this.get( elem )  , 'hide' , function(){
                $(elem).parent().removeClass('active');
            });
            return this;
        },
        showOnly : function( elem ){
            if( $(elem).is(':animated') ) return this;

            this.animate( this.get( elem )  ,'show', function( elem ){
                $(elem).parent().addClass('active')
            });
            this.hideOther( this.get( elem )  ,'hide');
            return this;
        },
        toggle: function( elem ){
            if( $(elem).is(':animated') ) return this;
            this.animate( this.get( elem ) , 'toggle' , function(){
                $(elem).parent().toggleClass('active');
            });
            return this;
        }
    }

    /**
     * 配置
     * @type {{easing: string, duration: string, prop: string, group: boolean, view: string}}
     */
    Collapse.DEFAULTS = {
        easing   : 'linear',
        duration : 'fast',
        prop     : 'height',
        group     : false,
        view     : '.view'
    };

    /**
     * 初始化collapse
     * @param options {object} 配置
     * @returns {*|jQuery}
     */
    $.fn.collapse = function ( options) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('collapse');
            if(!data ){
                data = new Collapse( this , options );
                $(this).data('collapse' , data);
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

    $.fn.collapse.Constructor =  Collapse;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Collapse;
    }
})(window.jQuery || require('jquery'));

