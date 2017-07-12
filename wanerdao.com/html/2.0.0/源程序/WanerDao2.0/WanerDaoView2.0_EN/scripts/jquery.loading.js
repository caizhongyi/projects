/**
 * Created with JetBrains WebStorm.
 * User: zhongyi
 * Date: 12-10-7
 * Time: 下午8:19
 * To change this template use File | Settings | File Templates.
 */
/*
 @name    		 			: 局中
 @animate  [bool] 			: true || false
 @position [string] 			: relative || absolute
 @duration [string || int]   :
 @parent   [selector]		: 所在的父级标签，无则为默认的上一级
 @axis 	  [string]			: x || y || auto
 @callback [function]		: 回调
 */

;(function ($) {
    $.fn.loading = function(){
        return $loading =$('<div class="loading-layer"></div>').appendTo($(this).addClass('pager-loading')).hide();
    }
})(jQuery);