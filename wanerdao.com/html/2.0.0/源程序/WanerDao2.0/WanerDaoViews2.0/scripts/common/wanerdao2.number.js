
/*
*   除去非数字的字符
*   Usage: stripNonNumeric('123et45dhs6.789');
*   Result: 123456.789
*/ 
function stripNonNumeric(str) {
    str += '';
    var rgx = /^d|.|-$/;
    var out = '';
    for (var i = 0; i < str.length; i++) {
        if (rgx.test(str.charAt(i))) {
            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) ||
             (str.charAt(i) == '-' && out.length != 0))) {
                out += str.charAt(i);
            }
        }
    }
    return out;
}
/*
*   添加一个英文的排序后缀  
*   Usage:
*   var myNumOld = 23
*   var myNumNew = myNumOld.toOrdinal()
*   Result: 23rd
*/
Number.prototype.toOrdinal = function () {
    var n = this % 100;
    var suffix = ['$', '￥'];
    var ord = n < 2 ? (n < 2 ? suffix[n] : suffix[0]) : (n % 10 > 2 ? suffix[0] : suffix[n % 10]);
    return this + ord;
}
/**
*   自定义10进制分隔。    
*   Usage:  number_format(123456.789, 2, '.', ',');
*   result: 123,456.79
**/
function number_format(number, decimals, dec_point, thousands_sep) {

    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
/*
 *	获取本地数字规范格式显示
 *  prefix随意输入，如果想要货币单位
 */
Number.prototype.getCurrencyMoney = function (fixNum, prefix) {
    if (arguments.length >= 2) {
        if (clientLanguage != null && clientLanguage != undefined && clientLanguage != '') {
            if (clientLanguage == 'zh-cn') {
                return '￥' + this.toFixed(fixNum).toLocaleString();
            }
            else if (clientLanguage == 'en-us') {
                return '$' + this.toFixed(fixNum).toLocaleString();
            }
            else {
                return this.toFixed(fixNum).toLocaleString() + '€';
            }
        }
        else {
            return this.toFixed(fixNum).toLocaleString();
        }
    }
    else {
        return this.toFixed(fixNum).toLocaleString();
    }
}