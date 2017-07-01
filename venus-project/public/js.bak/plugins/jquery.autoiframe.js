!(function ($) {

    /**
     * @description  iframe 自适应高度
     * */

    $.fn.autoiframe = function (options) {
        options = $.extend(true , {} ,{
            bindEvents : []  // { selector , event }  绑定iframe内的动态事件改变iframe高度
        } , options );

        return $(this).each(function () {
            $( this ).off('load.autoiframe').on('load.autoiframe',function(){
                var self = this ;

                function resize(){
                    $(this).height( $(this).contents().find('body').height() );
                }
                resize.call(this);

                for(var i = 0 ; i < options.bindEvents.length ; i ++ ){
                    var item =  options.bindEvents[i] ;
                    $(this).contents().on( item.event ,  item.selector ,function(){
                        resize.call(self);
                    })
                }
            })
        })
    }

})(window.jQuery || Zepto);