;
(function ( $ ) {
    /**
     * @author caizhongyi    qq:274142680
     * @website http://www.zerowfe.com
     * @description 是否为html
     * @requires  jquery.1.7.2
     * @param {string} html
     * @example $.ishtml('<div/>');
     * */
    $.ishtml = function ( html ) {
        //如果不存在则以html型式加入文档
       return  /<(.*)>.*<\/.*>|<(.*)\/>/.test( html );
    }
})( jQuery );