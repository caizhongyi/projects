;(function ( $ ) {
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

    $.fn.outerHtml = function(){
        return $(this)[0].outerHTML;
    }
    $.fn.insertHtml = function( val ){
        var _ua = navigator.userAgent.toLowerCase(),
            _IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1;

        if(_IE){
            /* try{*/
            $(this).focus();
            var range = document.selection.createRange() ;
            range.pasteHTML( val );
            /* }
             catch(e){
             document.execCommand('insertHTML', false, val )
             }*/
        }
        else
            document.execCommand('insertHTML', false, val )
        return this;
    }

})( jQuery );