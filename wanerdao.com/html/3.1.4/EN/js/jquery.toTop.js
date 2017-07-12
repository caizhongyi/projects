
;(function($) {
    /**
     * @author caizhongyi    qq:274142680
     * @version 1.0
     * @description 到顶部
     * @constructor
     * @name
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} [options.showHeight = 150]  滚动条一定高度后显示
     * @param {string} [options.speed = 1000]  动画时间间隔
     * @param {string} [options.context =  $(window)]  相对的父级器
     * @return {object} jquery对象
     * @example $('.toTop).toTop({
     *     showHeight : 150 , //显示的高度
     *     speed  :  400  //动画间隔
     *     context  : $(window) //容器
     * });
     */
    $.fn.toTop = function(options) {
        var that = this, defaults = {
            showHeight : 150,
            speed : 400,
            context  : $(window)
        };
        var options = $.extend(defaults,options);

        $(options.context).scroll(function(){
			var $top = $(that),
				scrolltop = $(this).scrollTop();

            if(scrolltop >= options.showHeight){
                $top.show();
            }
            else{
                $top.hide();
            }
        });

        $(this).click(function(){
            $("html,body").animate({scrollTop: 0}, options.speed);
        });
        return this;
    }
})(jQuery);
