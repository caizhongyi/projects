/**
 * Created by Administrator on 2015/7/27.
 */

var Class = window.Class ||  require('class') ;
var $ = window.jQuery ||  require('jquery');
var Dropdown = window.Dropdown ||  require('/widget/dropdown/js/dropdown');


/**
 * 下拉框
 * @params selector {string|object} 选择器
 * @params options.source {array} 数据源
 * @params options.dataType {string} ajax 数据格式
 * @params options.jsonp {string} jsonp 名称
 * @params options.jsonpCallback {string} jsonp 回调函数名称
 * @params options.format {function} 显示格式化
 * @return object
 * */
var DropdownGroup = Class.create({
    initialize: function( selector , options ) {
        var  _this = this;
        this.$ = $(selector);

        this.options = $.extend({} , {
            source : [],
            dataType : 'jsonp',
            jsonp : 'callbackp',
            jsonpCallback : 'abc',
            format : function( row ){
                return '<li><a href="javascript:;" data-value="'+ row.id +'">'+ row.name +'</a></li>';
            }
        } , options );

        this.items = [];

        this.$.find('[data-dropdown]').each(function( i , n ){
            var defaultLoad = false, dropdown ;
            if( i == 0 || $(this).find(':hidden').val() != '' ){
                defaultLoad = true;
            }
            dropdown =  new Dropdown( this ,{
                 params :  { id : _this.items[i - 1]&& _this.items[i - 1].val() },
                 source :  _this.options.source[ i ],
                 format : _this.options.format,
                 dataType : _this.options.dataType,
                 jsonp : _this.options.jsonp,
                 jsonpCallback : _this.options.jsonpCallback,
                 defaultLoad : defaultLoad
            })
            _this.items.push(dropdown);
        })

        for(var i = 0 ; i <  _this.items.length; i++ ){
            (function( i ){
                _this.items[i].on('change' , function( e , args ){
                    for( var j = i + 1; j <  _this.items.length ; j ++ ){
                        (function( j ){
                            _this.items[ j ] &&  _this.items[ j ].empty();
                        })(j)
                    }
                    _this.items[i + 1] &&  _this.items[i + 1].load( { id : args.value } )
                })
            })( i )
        }
    }
});

if(typeof module != 'undefined') module.exports = DropdownGroup ;
