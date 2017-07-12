/*
日期扩展方法 -- 将日期转化为字符串（传递给后台使用，暂时使用此方法）
*/
Date.prototype.toBString = function () {
    return "/Date(" + this.getTime() + "%2b0800)/";
}
/*
日期扩展方法 -- 格式化
*/
Date.prototype.format = function (formatStr) {
    var date = this;
    /*  
    函数：填充0字符  
    参数：value-需要填充的字符串, length-总长度  
    返回：填充后的字符串  
    */
    var zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd': return date.getDate();
            case 'dd': return zeroize(date.getDate());
            case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M': return date.getMonth() + 1;
            case 'MM': return zeroize(date.getMonth() + 1);
            case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy': return new String(date.getFullYear()).substr(2);
            case 'yyyy': return date.getFullYear();
            case 'h': return date.getHours() % 12 || 12;
            case 'hh': return zeroize(date.getHours() % 12 || 12);
            case 'H': return date.getHours();
            case 'HH': return zeroize(date.getHours());
            case 'm': return date.getMinutes();
            case 'mm': return zeroize(date.getMinutes());
            case 's': return date.getSeconds();
            case 'ss': return zeroize(date.getSeconds());
            case 'l': return date.getMilliseconds();
            case 'll': return zeroize(date.getMilliseconds());
            case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
        }
    });
}

/*
*
日期格式化
*
*/
function dateStr(date) {
    if (typeof date == String) {
        date = date.replace(/[\u4E00-\u9FA5]/g, ''); 
    }
    var obj = (typeof date == 'string' ? eval('new Date("' + date + '")') : date);
    if (obj == 'Invalid Date') {
        if (date.indexOf('-') > 0) {
            var t = date.substr(date.indexOf(' '), date.length);
            var darr = date.substr(0, date.indexOf(' ')).split('-');
            obj = eval('new Date("' + darr[1] + '/' + darr[2] + '/' + darr[0] + t+'")');
        }
        else {
            obj = eval('new ' + date.substr(1, date.length - 2));
        }
    }
    var now = new Date();
    var dateStr = '';
    if (obj.getFullYear() != now.getFullYear()) {
        dateStr = obj.format("yyyy/MM/dd");
    } else if (now.getMonth() != obj.getMonth()) {
        dateStr = obj.format("MM/dd");
    } else if (now.getDate() != obj.getDate()) {
        if (now.getDate() > obj.getDate()) {
            dateStr = (now.getDate() - obj.getDate()) + '天以前';
        } else {
            dateStr = (obj.getDate() - now.getDate()) + '天以后';
        }
    } else if (now.getHours() != obj.getHours()) {
        if (now.getHours() > obj.getHours()) {
            dateStr = (now.getHours() - obj.getHours()) + '小时前';
        } else {
            dateStr = (obj.getHours() - now.getHours()) + '小时后';
        }
    } else if (now.getMinutes() != obj.getMinutes()) {
        if (now.getMinutes() > obj.getMinutes()) {
            dateStr = (now.getMinutes() - obj.getMinutes()) + '分钟前';
        } else {
            dateStr = (obj.getMinutes() - now.getMinutes()) + '分钟后';
        }
    } else {
        dateStr = "刚才";
    }
    return dateStr;
}

/* 
格式化  日期字符串或日期对象
如果date是yyyy-mm-dd形式的，必须填充满例如2012-09-09时间转换才不会出错   
*/
function DateFormat(date, dateFormat) {
    var obj = (typeof date == 'string' ? eval('new Date("' + date + '")') : date);

    if (obj == 'Invalid Date') {
        if (date.indexOf('-') > 0) {
            var t = date.substr(date.indexOf(' '), date.length);
            var darr = date.substr(0, date.indexOf(' ')).split('-');
            obj = eval('new Date("' + darr[1] + '/' + darr[2] + '/' + darr[0] + t + '")');
        }
        else {
            obj = eval('new ' + date.substr(1, date.length - 2));
        }
    }
    return obj.format(dateFormat);
}
//获取当前时间
function wanerdaoclienttimer(formatStr) {
    var date = new Date();
    return date.format(formatStr);
}
/*
 *获取本地时区	
 *例如中国获取的时区是东8区就是为-8
 */
function getLocationTimeArea() {
    var d = new Date();
    return d.getTimezoneOffset() / 60;
}
/*
 *	从本地时间转换为UTC标准时间参数允许为空
 */
function getUTCDateString(locdate) {
    var d ;
    if (arguments.length === 1) {
        if (typeof locdate === String) {
            d = new Date(locdate);
        }
        else {
            d = (typeof locdate == 'string' ? eval('new Date("' + locdate + '")') : locdate);
        }
    }
    else {
        d = new Date();
    }    
    return d.toUTCString();
}
/*
*	从UTC标准时间转换为本地时间
*/
function getLocationDateString(utcdate, formatString) {
    var d;
    var r;
    if (typeof utcdate === String) {
        d = new Date(utcdate);
    }
    else {
        d = (typeof utcdate == 'string' ? eval('new Date("' + utcdate + '")') : utcdate);
    }
    r = d;
    if (arguments.length >= 2) {
        return r.format(formatString);
    }
    else {
        if (clientLanguage === 'zh-cn') {
            return r.format('yyyy-MM-dd HH:mm:ss');
        }
        else {
            return r.format('MM/dd/yyyy HH:mm:ss TT');
        }        
    }    
}