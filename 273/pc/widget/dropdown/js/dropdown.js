/**
 * Created by Administrator on 2015/7/27.
 */

var Class = window.Class ||  require('class') ;
var $ = window.jQuery ||  require('jquery');

/**
 * 下拉框
 * @params selector {string|object} 选择器
 * @params options.source {array} 数据源
 * @params options.params {object} ajax 参数
 * @params options.defaultLoad {boolean} 是否初始化就载入数据
 * @params options.dataType {string} ajax 数据格式
 * @params options.jsonp {string} jsonp 名称
 * @params options.jsonpCallback {string} jsonp 回调函数名称
 * @params options.format {function} 显示格式化
 * @return object
 * */
var Dropdown = Class.create({
    initialize: function( selector , options ) {
        this.$ = $(selector);

        this.options = $.extend({} , {
            source  : [],
            params  : {},
            defaultLoad : true,
            dataType : 'jsonp',
            jsonp : 'callbackp',
            jsonpCallback : 'abc',
            format : function( row ){
                return '<li><a href="###" data-value="'+ row.id +'">'+ row.name +'</a></li>';
            }
        } , options );

        var _this = this;

        this.$.each(function(){
            var eventType  = $(this).find('[data-dropdown-pattern]').data('dropdown-pattern') || 'click';
            if( eventType == 'hover'){
                $(this).off('mouseenter.drop mouseleave.drop').on('mouseenter.drop',function(){
                    _this.$ = $(this);
                    _this.show();
                }).on('mouseleave.drop',function(){
                    _this.$ = $(this);
                    _this.hide();
                })
            }
            else{
                $(this).off('click.drop').on('click.drop','[data-dropdown-pattern]',function(){
                    $('[data-dropdown-panel]').hide();
                    $(document).off('click.drop').on('click.drop',function(){
                        $('[data-dropdown-panel]').hide();
                    })
                    _this.$ =  $(this).closest( selector );
                    _this.show();
                }).on('click.drop',function(e){
                    e.stopPropagation();
                })
            }

            var $input = $(this).find(':hidden');
            if( $input.length ){
                $(this).off('click.drop.value').on('click.drop.value','[data-value]',function(){
                    var value = $(this).data('value'), text = $(this).text();
                    _this.$ =  $(this).closest( selector );
                    _this.val( value ).hide();
                    _this.trigger('change' , {  value : value , text : text } );
                })
            }

            _this.val( $input.val() )

            if(_this.options.defaultLoad )
                _this.load( _this.options.params );

        })
        return ;
    },
    empty : function(){
        this.val('').$.find('[data-dropdown-panel] ').empty();
        return this;
    },
    load : function( params ){
        var _this    = this;
        if( typeof  _this.options.source == 'string'){
            $.ajax( _this.options.source ,{
                data : params,
                dataType : this.options.dataType,
                async : this.options.async,
                jsonp : this.options.jsonp,
                jsonpCallback : this.options.jsonpCallback,
                success : function( data ){
                    var d ;
                    if( typeof  data == 'object' && data.length ){
                        d = data ;
                    }
                    else{
                        d = data.data;
                    }
                    if( typeof  d == 'object'  && d.length )_this.render( d );

                    var $input = _this.$.find(':hidden');
                    if( $input.val() != '' ||  $input.val() != undefined ){
                        _this.val( $input.val() );
                    }

                    _this.options.success && _this.options.success( data )
                },
                error : this.options.error
            })
        }
        else{
            // TODO 跟据参数查找
            _this.render( _this.options.source );
        }
    },
    show : function(){
        this.$.find('[data-dropdown-panel]').stop(true,true).fadeIn('fast');
        return this;
    },
    hide : function(){
        this.$.find('[data-dropdown-panel]').stop(true,true).fadeOut('fast');
        return this;
    },
    val : function( val ){
        var $elem = this.$.find(':hidden');
        if( val == null ){
            return $elem.val();
        }
        else{
            var $item = this.item( val ) ;
            $elem.val( val );
            this.text( $item.length ? $item.text() : this.$.find('[data-text]').attr('data-text')  );
        }
        return this;
    },
    text : function( val ){
        var $elem = this.$.find('[data-text]');
        if( val == null ){
            return $elem.text();
        }
        else{
            $elem.text( val );
        }
        return this;

    },
    item : function( val ){
       return val == null || val == '' ? [] : this.$.find('[data-dropdown-panel] ul [data-value='+ val +']')  ;
    },
    render : function( data ){
        var $panel =  this.$.find('[data-dropdown-panel] '), $ul = $panel.children('ul');
        if(!$ul.length){
            $ul = $('<ul>').appendTo($panel);
        }
        var html = ''
        for( var i = 0 ; i < data.length ; i ++) {
            html +=  this.options.format ? this.options.format(data[i]) : data[i];
        }
        $ul.html(html);
        return this;
    }
});

if(typeof module != 'undefined') module.exports = Dropdown ;
