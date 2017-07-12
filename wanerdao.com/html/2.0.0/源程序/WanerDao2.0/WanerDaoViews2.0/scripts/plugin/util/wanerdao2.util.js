/**
* 全局jquery工具函数
* 
* 作者：徐蓓
* 时间: 2012-10-30 21:40
* 描述：全局jquery工具函数，需要引用jquery-1.7.2.min.js和wanerdao2.date.region.js
*/
jQuery.util = {
    dateFormat: function (date, pattern) {
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
        return pattern.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
            switch ($0) {
                case 'd': return date.getDate();
                case 'dd': return zeroize(date.getDate());
                case 'ddd': return currFormat.dayNamesShort[date.getDay()];
                case 'dddd': return currFormat.dayNames[date.getDay()];
                case 'M': return date.getMonth() + 1;
                case 'MM': return zeroize(date.getMonth() + 1);
                case 'MMM': return currFormat.monthNamesShort[date.getMonth()];
                case 'MMMM': return currFormat.monthNames[date.getMonth()];
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
};