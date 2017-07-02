/**
 * Created with JetBrains WebStorm.
 * User: cai
 * Date: 12-11-28
 * Time: 下午6:36
 * To change this template use File | Settings | File Templates.
 * http://www.alienjs.net
 */
;(function ( String ) {
    /**
     * @description 逆序
     * @example
     * */
    String.prototype.reverse = function() {
        return this.split("").reverse().join("");
    }

    /**
     * @description 补位
     * @param {number} n 补位的长度
     * @param {string} str 补位的字符
     * @return {string} 补位后的字符
     * @example
     * */
    String.prototype.pad = function ( n , str ) {
        var that = this;
        str = str || '0';
        while ( that.length < n )
            that = str + that;
        return that + '';
    }
    Number.prototype.pad = function( n ,str ){
        return this.toString().pad( n , str );
    }

    /**
     * @description 去左空格
     * @return {string} 去空格后的字符
     * @example
     * */
    String.prototype.ltrim = function () {
        return this == null ? "" : this.replace(/(^\s*)/g , "");
    };
    /**
     * @description 去右空格
     * @return {string} 去空格后的字符
     * @example
     * */
    String.prototype.rtrim = function () {
        return this == null ? "" : this.replace(/(\s*$)/g , "");
    };
    /**
     * @description 去空格
     * @return {string} 去空格后的字符
     * @example
     * */
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g , '');
    };

    /**
     * @description 小写
     * @return {string} 小写后的字符
     * @example
     * */
    String.prototype.toLower = function () {
        return this.toLowerCase();
    };
    /**
     * @description 大写
     * @return 大写后的字符
     * @example
     * */
    String.prototype.toUpper = function () {
        return this.toUpperCase();
    };
    /**
     * @description 转换为数组
     * @param {number} str 分隔符
     * @return {array} this
     * @example
     * */
    String.prototype.toArray = function ( str ) {
        return this.split(str || '')
    };
    /**
     * @description 转换为boolean类型
     * @return {boolean} this
     * @example
     * */
    String.prototype.toBoolean = function () {
        return this.trim() == 'true' ? true : false;
    };
    /**
     * @description 获取字符数组
     * @example
     * */
    String.prototype.toCharArray = function() {
        return this.split("");
    }
    String.prototype.toInt = function () {
        return parseInt(this);
    };
    /**
     * @description 转换为时间 以标准时候格式 yyyy-MM-dd hh:mm:ss
     * @return {date}
     * @example
     * */
    String.prototype.toDate = function () {
        var nowDate = this;
        var arr = nowDate.split(" "),
            arr1,
            date,
            arr2;
        if ( arr[0].indexOf('-') != - 1 ) {
            arr1 = arr[0].split("-");
        }
        else {
            arr1 = arr[0].split("/");
        }
        arr2 = arr[1] ? arr[1].split(":") : [];
        if ( arr1.length <= 1 ) {
            date = Date.parse(this);
        }
        else {
            date = new Date(arr1[0] , arr1[1] || '' , arr1[2] || '' , arr2[0] || '' , arr2[1] || '' , arr2[2] || '');
        }
        ;
        return date;
    };
    /**
     * @description 转换为浮点
     * @return {float}
     * @example
     * */
    String.prototype.toFloat = function () {
        return parseFloat(this);
    };

    /**
     * @description 取左边多少字符，汉字占两个字符
     * @param {number} count 截取的个数
     * @return {string}
     * @example
     * */
    String.prototype.left = function ( count ) {
        var s = this.replace(/\*/g , " ").replace(/[^\x00-\xff]/g , "**");
        s = s.slice(0 , count).replace(/\*\*/g , " ").replace(/\*/g , "").length;
        return this.slice(0 , s)
    };
    /**
     * @description 取右边多少字符，汉字占两个字符
     *  @param {number} count 截取的个数
     * @return {string}
     * @example
     * */
    String.prototype.right = function ( count ) {
        var b = this.length;
        var s = this.replace(/\*/g , " ").replace(/[^\x00-\xff]/g , "**");
        s = s.slice(s.length - count , s.length).replace(/\*\*/g , " ").replace(/\*/g , "").length;
        return this.slice(b - s , b)
    };

    /**
     * @description 字符长度是否在之间
     * @return {boolean}
     * @example
     * */
    String.prototype.inRange = function ( min , max ) {
        return this.length >= min && this.length <= max ? true : false;
    };

    /**
     * @description 转16进制
     * @return {string}
     * @example
     * */
    String.prototype.onhex = function () {
        var a = [],
            i = 0;
        for ( ; i < this.length ; ) a[i] = ("00" + this.charCodeAt(i ++).toString(16)).slice(- 4);
        return "\\u" + a.join("\\u")
    };
    /**
     * @description 16进制转字符
     * @return {string}
     * @example
     * */
    String.prototype.unhex = function () {
        return unescape(this.replace(/\\/g , "%"))
    };
    /**
     * @description 特殊字符escape编码
     * @return {string}
     * @example
     * */
    String.prototype.escape = function () {
        return escape(this);
    };
    /**
     * @description 特殊字符escape解码
     * @return {string}
     * @example
     * */
    String.prototype.unescape = function () {
        return unescape(this);
    };
    /**
     * @description 转义了任何 HTML 字符的
     * @return {string}
     * @example
     * */
    String.prototype.escapeHTML = function () {
        return this.replace(/&/g , '&amp;').replace(/</g , '&lt;').replace(/>/g , '&gt;')
    };
    /**
     * @description 与 escapeHTML() 相反
     * @return {string}
     * @example
     * */
    String.prototype.unescapeHTML = function () {
        return this.replace(/&lt;/g , '<').replace(/&gt;/g , '>').replace(/&amp;/g , '&')
    };

    /**
     * @description 返回移去HTML标签后的字符
     * @return {string}
     * @example
     * */
    String.prototype.removeHTML = function () {
        return this.replace(/&lt;/g , '<').replace(/&gt;/g , '>').replace(/&amp;/g , '&')
    };

    /**
     * @description 计算字符长度，中文为两个长度
     * @return {number}
     * @example
     * */
    String.prototype.byteLength = function () {
        return this.replace(/&lt;/g , '<').replace(/&gt;/g , '>').replace(/&amp;/g , '&')
    };
    /**
     * @description 除去最后一个字符
     * @return {string}
     * @example
     * */

     String.prototype.delLast = function () {
        return this.substring(0 , this.length - 1)
    };
    /**
     * @description 获取最后一个字符
     * @return {string}
     * @example
     * */

     String.prototype.last = function () {
        return this.substring(this.length - 1 , this.length)
    };
    /**
     * @description 转换为整型
     * @return {int}
     * @example
     * */


    /**
     * @description 是否存在字符
     * @param {string} str 检测的字符
     * @return {boolean} 是否存在字符
     * @example
     * */
    String.prototype.has = function ( str ) {
        return this.indexOf(str) == - 1 ? false : true;
    };
    /**
     * 在拼接正则表达式字符串时，消除原字符串中特殊字符对正则表达式的干扰
     * @param {string} str 需要被替换的字符
     * @param {string} newstr 新的字符
     * @return  {string} this
     */
    String.prototype.replaceAll = function ( str , newstr ) {
        return this.replace(new RegExp(str , "gm") , newstr);
    };
    /**
     * 在拼接正则表达式字符串时，消除原字符串中特殊字符对正则表达式的干扰
     * @return  {string}  被保护处理过后的字符串
     */
    String.prototype.escapereg = function () {
        return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])" , "g") , "\\\x241");
    };

    /**
     * @description 删除url字符串中指定的,query
     * @param {string} key 被删除的query名
     * @return  {string} 被删除指定 query 后的url字符串
     */
    String.prototype.delquery = function ( key ) {
        key = key.escapereg();
        var reg = new RegExp("((\\?)(" + key + "=[^&]*&)+(?!" + key +
            "=))|(((\\?|&)" + key + "=[^&]*)+$)|(&" + key + "=[^&]*)" , "g");
        return this.replace(reg , "\x241")
    };
    /**
     * @description 删除url字符串中指定的,query
     * @param {string} key 参数
     * @param {string} val 值
     * @return {string} 被删除指定query后的url字符串
     */
    String.prototype.addquery = function ( key , val ) {
        var _this = this;
        ! _this.has('?') && (_this += '?');
        if ( _this.last() != '?' )
            _this += '&';
        return  _this += key + '=' + val;
    };

    /**
    * @description 测试是否是数字
     */
    String.prototype.isNumeric = function() {
        var tmpFloat = parseFloat(this);
        if (isNaN(tmpFloat))
            return false;
        var tmpLen = this.length - tmpFloat.toString().length;
        return tmpFloat + "0".Repeat(tmpLen) == this;
    }
    /**
     * @description 测试是否是整数
     */
    String.prototype.isInt  = function() {
        var tmpFloat = parseFloat(this);
        if (isNaN(tmpFloat))
            return false;
        var tmpLen = this.length - tmpFloat.toString().length;
        return tmpFloat + "0".Repeat(tmpLen) == this;
    }

    /**
     * @description 合并多个空白为一个空白
     */
    String.prototype.resetBlank = function() {
        return this.replace(/s+/g, " ");
    }

    /**
     * @description 保留数字
     */
    String.prototype.getNum = function() {
        return this.replace(/[^d]/g, "");
    }
    /**
     * @description 保留字母
     */
    String.prototype.getEn = function() {
        return this.replace(/[^A-Za-z]/g, "");
    }
    /**
     * @description 保留中文
     */
    String.prototype.getCn = function() {
        return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
    }

    /**
     * @description HTML编码
     */
    String.prototype.HTMLEncode = function() {
        var re = this;
        var q1 = [ /x26/g, /x3C/g, /x3E/g, /x20/g ];
        var q2 = [ "&", "<", ">", " " ];
        for ( var i = 0; i < q1.length; i++)
            re = re.replace(q1[i], q2[i]);
        return re;
    }

})(String);
;(function ( s ) {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // private method for UTF-8 encoding
    _utf8_encode = function ( string ) {
        string = string.replace( /\r\n/g , "\n" );
        var utftext = "";
        for ( var n = 0 ; n < string.length ; n ++ ) {
            var c = string.charCodeAt( n );
            if ( c < 128 ) {
                utftext += String.fromCharCode( c );
            }
            else if ( (c > 127) && (c < 2048) ) {
                utftext += String.fromCharCode( (c >> 6) | 192 );
                utftext += String.fromCharCode( (c & 63) | 128 );
            }
            else {
                utftext += String.fromCharCode( (c >> 12) | 224 );
                utftext += String.fromCharCode( ((c >> 6) & 63) | 128 );
                utftext += String.fromCharCode( (c & 63) | 128 );
            }
        }
        return utftext;
    }
    // private method for UTF-8 decoding
    _utf8_decode = function ( utftext ) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt( i );
            if ( c < 128 ) {
                string += String.fromCharCode( c );
                i ++;
            }
            else if ( (c > 191) && (c < 224) ) {
                c2 = utftext.charCodeAt( i + 1 );
                string += String.fromCharCode( ((c & 31) << 6) | (c2 & 63) );
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt( i + 1 );
                c3 = utftext.charCodeAt( i + 2 );
                string += String.fromCharCode( ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63) );
                i += 3;
            }
        }
        return string;
    }
    s.prototype.encodeBase64 = function () {
        var input = this;
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode( input );
        while ( i < input.length ) {
            chr1 = input.charCodeAt( i ++ );
            chr2 = input.charCodeAt( i ++ );
            chr3 = input.charCodeAt( i ++ );
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if ( isNaN( chr2 ) ) {
                enc3 = enc4 = 64;
            }
            else if ( isNaN( chr3 ) ) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt( enc1 ) + _keyStr.charAt( enc2 ) +
                _keyStr.charAt( enc3 ) + _keyStr.charAt( enc4 );
        }
        return output;
    };
    s.prototype.decodeBase64 = function () {
        var input = this;
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace( /[^A-Za-z0-9\+\/\=]/g , "" );
        while ( i < input.length ) {
            enc1 = _keyStr.indexOf( input.charAt( i ++ ) );
            enc2 = _keyStr.indexOf( input.charAt( i ++ ) );
            enc3 = _keyStr.indexOf( input.charAt( i ++ ) );
            enc4 = _keyStr.indexOf( input.charAt( i ++ ) );
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode( chr1 );
            if ( enc3 != 64 ) {
                output = output + String.fromCharCode( chr2 );
            }
            if ( enc4 != 64 ) {
                output = output + String.fromCharCode( chr3 );
            }
        }
        output = _utf8_decode( output );
        return output;
    }
})( String );

