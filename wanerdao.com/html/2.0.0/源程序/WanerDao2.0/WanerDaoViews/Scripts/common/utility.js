/**
* @author 徐蓓
*/
//格式化日期为字符串
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//获得字符串长度
function getStringLength(str) {
    var totalLength = 0;
    var list = str.split("");
    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        if (s.match(/[\u0000-\u00ff]/g)) { //半角
            totalLength += 1;
        } else if (s.match(/[\u4e00-\u9fa5]/g)) { //中文  
            totalLength += 3;
        } else if (s.match(/[\uff00-\uffff]/g)) { //全角 
            totalLength += 3;
        }
    }
    return totalLength;
}

//字符串超出部分弹出提示
function stringLimit(str, limit) {
    var totalLength = getStringLength(str);
    if (totalLength > limit) {
        alert("输入超出最大限制！");
        return false;
    } else {
        return true;
    }
}

//截取字符串，超出部分用...代替，中文算两个字符
function subPoints(str, sub_length) {
    var temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓
    var temp2 = temp1.substring(0, sub_length);
    //找出有多少个*
    var x_length = temp2.split("\*").length - 1;
    var hanzi_num = x_length / 2;
    sub_length = sub_length - hanzi_num; //实际需要sub的长度是总长度-汉字长度
    var res = str.substring(0, sub_length);
    if (sub_length < str.length) {
        var end = res + "...";
    } else {
        var end = res;
    }
    return end;
}

//获取url参数（问号后的值）
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//正则判断是否为url地址
function isURL(str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
        return true;
    } else {
        return false;
    }
}