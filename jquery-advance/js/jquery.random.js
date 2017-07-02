;
(function ( $ ) {
    /**
     * @author caizhongyi
     * @website http://www.zerowfe.com
     * @description 标签数组中随机发回一个标签
     * @requires  jquery.1.7.2
     * @memberOf $.fn
     * @param {string} count 随机反回的个数
     * @return {object} jquery对象
     * @example
     *   <li class="item1"></li>
     <li class="item2"></li>
     <li class="item3"></li>
     <li class="item4"></li>
     <li class="item5"></li>
     *
     * $('li').random();
     */
    $.fn.random = function ( count ) {
        var m = 0, n = $( this ).length;
        count = count || 1;
        return $( this ).eq( Math.random() * (n - m) + m );
    };
})( jQuery );