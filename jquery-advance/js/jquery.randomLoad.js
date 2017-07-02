;
(function ( $ ) {
    /**
     * @description 随机载入文件
     * @param {object|number} urls 数组或最大个数
     * @param {function} callback
     * */
    $.fn.randomLoad = function ( urls , callback ) {
        var length = urls.length ;
        var index =  parseInt( Math.random() * length );
        $( this ).load( urls[index] , callback );
        return this;
    }
})( jQuery );