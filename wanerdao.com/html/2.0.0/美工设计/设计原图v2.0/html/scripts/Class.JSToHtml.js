/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-10-10
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 * author : czy
 * depends : jquery.1.7.2.js +
 *          jquery.class.js
 */

;(function ($) {
    Class.JSToHtml = Class.get({
        initialize : function(selector , options){
            this.options = $.extend(true,{},{
                namespace : 'Class'
            },options);

            this.$ = $(selector);
            this.convert();
        },
        convert : function(){
            var $ul = $('<ul></ul>');
            var arr = this.options.namespace.split('.'),
                namespace = window;
            for(var i = 0 ; i < arr.length ; i ++){
                namespace = namespace[arr[i]];
            }
            for(var i in namespace){
                $li = $('<li></li>').css({
                    'border' : '1px solid #ddd',
                    padding : '5px',
                    color : '#666',
                    'line-height': "22px",
                    'margin-bottom': "-1px"
                });

                var params = [];
                for(var j in namespace[i].params){
                    params.push(j);
                }

                var title = $('<h3 style="cursor: pointer; ">'+ this.options.namespace +'.'+ i +''+ (typeof namespace[i] == 'function' ? '('+ params +')': '' ) +'<span style="font-weight: normal; font-size: 12px;">['+ (namespace[i].descript || '')+']</span></h3>').click(function(){
                    $(this).next().stop(true).animate({'height' : 'toggle'});
                });
                var content = $('<div></div>').hide();
                $li.append(title);
                $li.append(content);
                function gettor(obj,$content){
                    for(var j in obj){
                        if(typeof obj[j] == 'object'){
                            var $o = $('<div style="padding-left: 20px;">'+ j + ' [object]:</div>').appendTo($content);
                            gettor(obj[j],$o);
                        }
                        else{
                            var p = $('<div style="padding-left:20px;">'+ j + ' : '+ obj[j].replace(':',' ,默认:') +'</div>');
                            $content.append(p);
                        }
                    }
                }

                gettor(namespace[i].params,content);

                $ul.append($li);
            }
            this.$.append($ul);
        }
    });
})(jQuery);