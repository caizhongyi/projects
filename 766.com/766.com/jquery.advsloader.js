/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 13-1-9
 * Time: 下午4:20
 * To change this template use File | Settings | File Templates.
 */
;(function ($) {
    /**
     * @author caizhongyi
     * @version 1.0
     * @description 骞垮憡鍔犺浇鍣�
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @return {object} jquery瀵硅薄
     * @example $('.advsloader').advsloader();
     */
    $.fn.advsloader = function(url){
        $(this).each(function(){
            var uri = url + '/' + $(this).attr('data-adv-name') + '.js';
            var script = document.createElement('script');
            script.src = 'test.js';
            script.type = "text/javascript";
            this.appendChild(script);

        })
        return this;
    };

    $(function(){
        $('[data-adv-id]').advsloader('http://manads.static.olcdn.com/js');
    })

})(jQuery);