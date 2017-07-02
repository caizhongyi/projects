/**
 * @website http://www.zerowfe.com
 * */
;(function ( $ ) {
    $.validate = $.validate || {};
    /**
     * @description  是否为数字类型
     * */
    $.validate.isNumber = function ( val ) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test( val );
    }
    /**
     * @description  是否为数字和字符类型
     * */
    $.validate.isStringOrNumber = function ( val ) {
        return /^[0-9a-zA-Z]+$/.test( val );
    }
    /**
     * @description  是否为数字，中文和字符类型
     * */
    $.validate.isCNOrNumber = function ( val ) {
        return /^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test( val );
    }
    /**
     * @description  中文
     * */
    $.validate.isCN = function ( val ) {
        return /^[\u4e00-\u9fa5]+$/.test( val );
    }
    /**
     * @description  英文
     * */
    $.validate.isEN = function ( val ) {
        return /^[a-zA-Z]+$/.test( val );
    }
    /**
     * @description  是否为Decimal
     * */
    $.validate.isDecimal = function ( val ) {
        return /^[-]{0,1}(\d+)[\.]+(\d+)$"/.test( val );
    }
    /**
     * @description  是否为电话
     * */
    $.validate.isTel = function ( val ) {
        return new RegExp( '^[0-9]{11}$' ).test( val );
    }
    /**
     * @description  是否为手机号
     * */
    $.validate.isMobile = function ( val ) {
        return new RegExp( '/^0{0,1}(13[0-9]?|15[0-9])[0-9]{8}$/' ).test( val );
    }
    $.validate.isMobileOrTel = function ( val ) {
        return /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test( val );
    }
    $.validate.isIP = function ( val ) {
        return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g.test( val );
    }
    $.validate.isMoney = function () {
        return /^[0-9]+[\.][0-9]{0,3}$/g.test( val );
    }
    /**
     * @description  是否为邮件
     * */
    $.validate.isEmail = function ( val ) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test( val );
    }
    $.validate.isImage = function ( val ) {
        return /\.bmp$|\.BMP$|\.gif$|\.jpg$|\.png$|\.PNG$|\.jpeg$|\.JPEG$|\.GIF$|\.JPG$\b/.test( val )
    }
    $.validate.isDate = function ( val ) {
        return /Invalid|NaN/.test( val )
    }
    $.validate.isCardId15 = function ( val ) {
        return /^\d{15}|\d{17}[A-Z]$/.test( val )
    }
    $.validate.isCardId18 = function ( val ) {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test( val )
    }
    /**
     * @description  是否身份证
     * */
    $.validate.isCardIdx = function ( val ) {
        return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test( val )
    }
    $.validate.isURL = function ( val ) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( val )
    }
})( jQuery );