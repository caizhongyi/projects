(function ($) {
    /*
    使用说明            
    get：$.cookie(name);
    set: $.cookie(name,value[,options]);
    delete: $.cookie(name,'');
    author:wxj
    */
    $.cookie = function (name, value, options) {
        var cValue = '';
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (typeof value == 'object') {
                for (var prop in value) {
                    if (cValue) cValue += '&';
                    cValue += prop + '=' + escape(value[prop]);
                }
            } else {
                if (value === null) {
                    cValue = '';
                    options.expires = -1;
                } else {
                    cValue = escape(value);
                }
            }

            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            //var domain = options.domain ? '; domain=' + (options.domain) : '; domain=wanerdao2.com';
            var path = options.path ? '; path=' + (options.path) : '; path=/';
            var secure = options.secure ? '; secure' : '';
            document.cookie = name + "=" + cValue + expires + domain + path + secure;
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.indexOf(name) != -1) {
                        if (cookie.indexOf('&') == -1 && tCount(cookie) == 1) {
                            cookieValue = unescape(cookie.split('=')[1]);
                        } else {
                            cookieArr = cookie.replace(name + '=', '').split('&');
                            cookieValue = {};
                            for (var j = 0; j < cookieArr.length; j++) {
                                if (cookieArr[j]) {
                                    var c = cookieArr[j].split('=');
                                    cookieValue[c[0]] = c[1];
                                }
                            }
                        }
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    function tCount(value) {
        var count = 0;
        var sIndex = 0;
        var index = 0;
        do {
            index = value.indexOf('=', sIndex);
            if (index = -1) {
                sIndex = index + 1;
                break;
            }
            count++;

        } while (index > 0);

        return count;
    }
})(jQuery);