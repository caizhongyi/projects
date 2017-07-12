/*
 *	回复插件
 *  作者：jgglg
 *  邮箱：jgglg@163.com
*   Date: 2012/10/6 01:33
* 用法描述： 
* 1.此插件应用于绑定元素外层
*   例如有层<div class="a"></div>或<div id="a"></div>绑定了此回复插件
*   后最终页面代码片段呈现如下：
*   <div class="a"></div><div class="replay-content" id="reply_replylistbyid">....</div>
*   <div id="a"></div><div class="replay-content" id="reply_replylistbyid">....</div>
* 2.当有回调时，执行回调函数不刷新当前页面
 */
(function ($) {
    $.fn.replycontent = function (options) {
        var _defaults = {
            disabled: false, //是否禁用回复功能，如果为true，addreplylistbyaxd此属性不可用并且不显示回复留言框
            replylistbyid: '', //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
            getreplylistbyaxd: '', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
            addreplylistbyaxd: '',//通过replylistbyid和axd处理添加回复信息，此属性不允许为空
            replyconfig: {
                ishidden: true,//是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        };
        var opts = $.extend({}, _defaults, options);
        return this.each(function () {
            var $this = $(this);
            $this.after(_getUI(opts));
        });
    };
    function _getUI(opts) {
        var _ui = '<div class="replay-content" id="reply_' + opts.replylistbyid+'">';
        if (opts.disabled) {
            _ui += '<div  style="display: none;">';
        }
        else {
            _ui += '<div>';
        }        
        _ui += '<img class="arrowhead" src="/images/home/ico_17x9.png"/>';
        _ui += '<textarea class="textarea"></textarea>';
        _ui += '<input  type="submit" class="button button2" value="回复"/>';
        _ui += '<input  type="submit" class="button button-gay" value="取消"/>';
        _ui += '</div>';
        _ui += '<div id="reply_' + opts.replylistbyid + '_list" class="pager-loading"></div>';//回复列表数据展示
        _ui += '';
        _ui += '</div>';
        return _ui;
    };

})(jQuery)