/**
 * @name combo
 * @depends  jquery
 * @author   caizhongyi
 * @website  http://www.alienjs.net
 * @version  1.0.0
 */

!(function ($) {

    var Combo = function( selector , options ){
        this.options = $.extend(true, {}, Combo.DEFAULTS , options);
        this.$elem = $(selector);
        for( var i in this.options){
            var p = this.$elem.data(i.replace(/[A-Z]+/g,'-$&').toLowerCase());
            this.options[i] = p == null ? this.options[i] : eval(p) ;
        }
        this.init();
    }

    Combo.prototype = {
        init : function(){
            this.create();
            var self = this ;
            this.$elem.off('click.combo').on('click.combo', function(e){
                var self = this;
                e.stopPropagation();
                $(document).off('click.combo').on('click.combo',function(){
                    $(self).removeClass('active');
                })
                $(this).toggleClass('active');
            }).on('click.combo','li', function(){
                self.set(  $(this).attr('value') ,$(this).html() , $(this).index() );
            })

        },
        create : function(){
            if( this.$elem[0].tagName == 'SELECT' ){
                var $combo = $('<span class="combo"></span>'),
                    $icon = $('<a href="javascript:;" class="combo-icon"></a>');
                this.$val = $('<span class="combo-val"></span>').appendTo( $combo );
                $icon.appendTo($combo);
                this.$panel = $('<div class="combo-panel"></div>').appendTo( $combo );

                this.$ori = this.$elem ;
                this.$elem = $combo.insertAfter( this.$ori.hide() );

                var $items = $('<ul>'), text = '',  index = -1 ;
                this.$ori.find('option').each(function(){
                    var $li = $('<li>').html( $(this).html()).attr('value' , $(this).attr('value'))
                    if($(this).prop('selected')){
                        text = $(this).html();
                        index = $(this).index();
                    }
                    $items.append($li);
                })
                this.$panel.append($items);
                this.set( this.$ori.val() , text , index );
            }
            else{
                this.$val = this.$elem.find('.combo-val');
                this.$panel = this.$elem.find('.combo-panel');
                var $ori = this.$elem.find('[name='+ $(this).attr('name') +']');
                this.$ori = $ori.length ? $ori : $('<input type="hidden" name="'+ this.$elem.attr('name') +'">').appendTo( this.$elem );
                this.$elem.removeAttr('name');
            }

        },
        set : function( val , text , index ){
            this.$val.html( text );
            this.$ori.val( val );
            this.$panel.find('li').removeAttr('selected').eq(index).attr('selected','selected');
            this.$elem.trigger( $.Event('change', {
                value : val,
                index : index,
                text : text
            }));
            this.$ori.trigger('change');
            return this;
        },
        get : function(){
            return { val :  this.$ori.val() , text : this.$val.html() } ;
        },
        index : function( index ){
            if( typeof index == 'number'){
                var $item = this.$panel.find('li').eq(index);
                this.set( $item.attr('value') , $item.html() ,$item.index() );
                return this;
            }
            else{
                return this.$panel.find('li[selected]').index();
            }
        },
        panelPos : function(){
            this.$panel.appendTo('body');
        }
    }

    Combo.DEFAULTS = {
        index     : -1
    };


    $.fn.combo = function ( options ) {
        var args = arguments;
        return $( this ).each(function(){
            var data = $(this).data('collapse');
            if( !data ){
                data = new Combo( this , options );
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

    $.fn.combo.Constructor =  Combo;

    if( typeof module === "object" && typeof module.exports === "object"  ){
        module.exports = Combo;
    }

})(window.jQuery || require('jquery'));

