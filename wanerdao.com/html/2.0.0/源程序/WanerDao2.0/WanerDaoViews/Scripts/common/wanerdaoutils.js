var $wd = {};
/*

       名字：Common.js

       功能：通用javascript脚本函数库

       包括：

            1.Trim(str)－－去除字符串两边的空格

            2.XMLEncode(str)－－对字符串进行XML编码

            3.ShowLabel(str,str)－－鼠标提示功能（显示字符，提示字符）

            4.IsEmpty(obj)－－验证输入框是否为空

            5.getStringLength(str)－－获取字符段长度（半角算一个字符，中文算两个字符，全角算三个字符）

            6.subPoints(str, sub_length) - - 截取字符串，超出部分用...代替，中文算两个字符

            7.getQueryString(name)－－获取url参数（问号后的值）

            8.isURL(str_url)－－判断是否为url地址

*/

/*字符串操作

Trim(string):去除字符串两边的空格

*/

/*
　　１．LTrim(string):去除左边的空格
*/

function LTrim(str)

{
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(0)) != -1)
    {
        var j=0, i = s.length;

        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
        {
            j++;
        }

        s = s.substring(j, i);
    }

    return s;
}

 

/*
　　２．RTrim(string):去除右边的空格
*/

function RTrim(str)

{

    var whitespace = new String(" \t\n\r");

    var s = new String(str);

 

    if (whitespace.indexOf(s.charAt(s.length-1)) != -1)

    {

        var i = s.length - 1;

        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)

        {

            i--;

        }

        s = s.substring(0, i+1);

    }

    return s;

}

 

/*
　　３．Trim(string):去除前后空格
*/

function Trim(str)

{

    return RTrim(LTrim(str));

}

/*

　　XMLEncode(string):对字符串进行XML编码

*/

function XMLEncode(str)

{

       str=Trim(str);

       str=str.replace("&","&amp;");

       str=str.replace("<","&lt;");

       str=str.replace(">","&gt;");

       str=str.replace("'","&apos;");

       str=str.replace("\"","&quot;");

       return str;

}

/*
验证类函数
*/

function IsEmpty(obj)

{

    obj=document.getElementsByName(obj).item(0);

    if(Trim(obj.value)=="")

    {

        alert("字段不能为空。");        

        if(obj.disabled==false && obj.readOnly==false)

        {

            obj.focus();

        }

    }

}

 

/*
　　IsInt(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为整数、正整数、负整数、正整数+0、负整数+0
*/

function IsInt(objStr,sign,zero)

{

    var reg;    

    var bolzero;    

    

    if(Trim(objStr)=="")

    {

        return false;

    }

    else

    {

        objStr=objStr.toString();

    }    

    

    if((sign==null)||(Trim(sign)==""))
    {
        sign="+-";
    }

    if((zero==null)||(Trim(zero)==""))
    {
        bolzero=false;
    }
    else
    {
        zero=zero.toString();
        if(zero=="0")
        {
            bolzero=true;
        }
        else
        {
            alert("检查是否包含0参数，只可为(空、0)");
        }
    }

    switch(sign)

    {

        case "+-":

            //整数

            reg=/(^-?|^\+?)\d+$/;            

            break;

        case "+": 

            if(!bolzero)           

            {

                //正整数

                reg=/^\+?[0-9]*[1-9][0-9]*$/;

            }

            else

            {

                //正整数+0

                //reg=/^\+?\d+$/;

                reg=/^\+?[0-9]*[0-9][0-9]*$/;

            }

            break;

        case "-":

            if(!bolzero)

            {

                //负整数

                reg=/^-[0-9]*[1-9][0-9]*$/;

            }

            else

            {

                //负整数+0

                //reg=/^-\d+$/;

                reg=/^-[0-9]*[0-9][0-9]*$/;

            }            

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }

    var r=objStr.match(reg);

    if(r==null)

    {

        return false;

    }

    else

    {        

        return true;     

    }

}

/*

　　IsFloat(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为浮点数、正浮点数、负浮点数、正浮点数+0、负浮点数+0

*/

function IsFloat(objStr,sign,zero)

{

    var reg;    

    var bolzero;    

    

    if(Trim(objStr)=="")

    {

        return false;

    }

    else

    {

        objStr=objStr.toString();

    }    

    

    if((sign==null)||(Trim(sign)==""))

    {

        sign="+-";

    }

    

    if((zero==null)||(Trim(zero)==""))

    {

        bolzero=false;

    }
    else
    {

        zero=zero.toString();

        if(zero=="0")
        {

            bolzero=true;

        }
        else
        {

            alert("检查是否包含0参数，只可为(空、0)");

        }

    }

    switch(sign)

    {

        case "+-":

            //浮点数

            reg=/^((-?|\+?)\d+)(\.\d+)?$/;

            break;

        case "+": 

            if(!bolzero)           

            {

                //正浮点数

                reg=/^\+?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else

            {

                //正浮点数+0

                reg=/^\+?\d+(\.\d+)?$/;

            }

            break;

        case "-":

            if(!bolzero)

            {

                //负浮点数

                reg=/^-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else

            {

                //负浮点数+0

                reg=/^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

            }            

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }

    

    var r=objStr.match(reg);

    if(r==null)
    {
        return false;
    }
    else
    {
        return true;
    }
}


/*
    equals(obj,,equalsOjb)比较两个对象的值是否完全相等
*/
function equalsObj(obj, equalsObj) {
    for (var prop in obj) {
        if (!(equalsObj[prop] == obj[prop])) return false;
    }
    return true;
}



/*
    jquery 格式化字符串
*/
$wd.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $wd.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
}

/*
        编码特殊字符
*/
String.prototype.escapeSpecialchar = function () {
    return this.replace(/\'/g, ':apos:').replace(/\"/g, ':quot:').replace(/\-/g, ':macr:').replace(/\=/g, ':equal:').replace(/\//g, ':frasl:').replace(/\?/g, ':piv:').replace(/\_/g, ':under:').replace(/\./g, ':sdot:');
}

/*
    解码特殊字符
*/
String.prototype.descapeSpecialchar = function () {
    return this.replace(/\:apos\:/g, '\'').replace(/\:quot\:/g, '\"').replace(/\:macr\:/g, '-').replace(/\:equal\:/g, '=').replace(/\:frasl\:/g, '/').replace(/\:piv\:/g, '?').replace(/\:under\:/g, '_').replace(/\:sdot\:/g, '.');
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
    if (typeof date == String) {date = date.replace(/[\u4E00-\u9FA5]/g, '');}
    var obj = (typeof date == 'string' ? eval('new Date("' + date + '")') : date);
    if (obj == 'Invalid Date') {
        obj = eval('new ' + date.substr(1, date.length - 2))
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
            dateStr = (now.getHours() - obj.getHours()) + '小时以前';
        } else {
            dateStr = (obj.getHours() - now.getHours()) + '小时以后';
        }
    } else if (now.getMinutes() != obj.getMinutes()) {
        if (now.getMinutes() > obj.getMinutes()) {
            dateStr = (now.getMinutes() - obj.getMinutes()) + '分钟以前';
        } else {
            dateStr = (obj.getMinutes() - now.getMinutes()) + '分钟以后';
        }
    } else {
        dateStr = "刚才";
    }
    return dateStr;
}

/* 
   格式化  日期字符串或日期对象   
*/
function DateFormat(date, dateFormat) {
    var obj = (typeof date == 'string' ? eval('new Date("' + date + '")') : date);

    if (obj == 'Invalid Date') {
        obj = eval('new ' + date.substr(1, date.length - 2));
    }
    return obj.format(dateFormat);
}
//获取当前时间
function wanerdaoclienttimer(formatStr) {
    var date = new Date();
    return date.format(formatStr);
}
/*
    getQueryString(name)
    获取url参数 name 参数名
*/
function getQueryString(name) {
    var hrefStr = location.search; ; //获取url中"?"符后的字串    
    var params = hrefStr.substr(hrefStr.indexOf('?') + 1).toLowerCase().split('&');
    var value;
    for (var i in params) {
        if (/^\w+\=[^&]*$/.test(params[i])) {
            var arr = params[i].split('=');
            if (arr[0].toLowerCase() == name.toLowerCase()) {
                value = arr[1];
                break;
            }
        }
    }
    return value;
}

/*
getQueryString(name)
获取url参数 name 参数名
*/
function GetQueryString(querystring) {
    var url = location.search; //获取url中"?"符后的字串       
    var getQuerystring = "";
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    if (theRequest != null && theRequest != "") {
        if (theRequest[querystring] != "underfine") {
            getQuerystring = theRequest[querystring];
        }
    }
    return getQuerystring;
} 
/*******
     
     根据 键名 获取 值
        
****/
function getValuByKey(list, keyValue, keyName, valueName) {
    var value;
    $.each(list, function (i, v) {
        if (v[keyName] == keyValue) {
            value = v[valueName];
        }
    });
    return value;
}

/*

    获取 当前页面 的 完整 URL 路径

*/
function getUrlPath() {
    return location.href.substring(0, location.href.lastIndexOf('.html')) + '.html';
}

/*
    GUID
*/
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
    }
    return guid;
}
//绑定下拉列表,当flg为false的时候表示没有数据，为true的时候正常填充下拉列表
function bindDropDownList(ddlid, items,flg) {
    //items = eval(items);
    $('#' + ddlid).empty();
    if (flg) {
        $('#' + ddlid).append("<option value='-2' selected='selected'>" + wanerdaoLangTip('common_00006') + "</option>");
        if (items != null) {
            $.each(items, function (i, n) {
                $('#' + ddlid).append("<option value='" + items[i].id + "'>" + items[i].value + "</option>");
            });
        }
    }
    else {
        $('#' + ddlid).append("<option value='-1' selected='selected'>" + wanerdaoLangTip('common_00005') + "</option>");
    }
    return $('#' + ddlid);
}
function bindDropDownListbyname(ddlid, items, flg) {
    //items = eval(items);
    $('#' + ddlid).empty();
    if (flg) {
        $('#' + ddlid).append("<option value='-2' selected='selected'>" + wanerdaoLangTip('common_00006') + "</option>");
        if (items != null) {
            $.each(items, function (i, n) {
                $('#' + ddlid).append("<option value='" + items[i].id + "'>" + items[i].name + "</option>");
            });
        }
    }
    else {
        $('#' + ddlid).append("<option value='-1' selected='selected'>" + wanerdaoLangTip('common_00005') + "</option>");
    }
    return $('#' + ddlid);
}
//通过对象调用
function bindDropDownListbyobject(obj, items, flg) {
    //items = eval(items);
    obj.empty();
    if (flg) {
        obj.append("<option value='-2' selected='selected'>" + wanerdaoLangTip('common_00006') + "</option>");
        if (items != null) {
            $.each(items, function (i, n) {
                obj.append("<option value='" + items[i].id + "'>" + items[i].value + "</option>");
            });
        }
    }
    else {
        obj.append("<option value='-1' selected='selected'>" + wanerdaoLangTip('common_00005') + "</option>");
    }
    
    return obj;
}
//整合ajax调用
function ajaxfunc(urlname, ajaxdata, errorfunc, successfunc) {
    $.ajax({
        url: urlname,
        type: "POST",
        dataType: "json",
        cache: false,
        data: ajaxdata,
        error: function (data) {
            var callback = errorfunc(data);
            eval(callback || function () { });
        },
        success: function (data) {
            var callback = successfunc(data);
            eval(callback || function () { });
        }
    });
}
//整合ajax调用
function ajaxfuncbyloadmsg(urlname, ajaxdata, parentid, errorfunc, successfunc) {
    var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
    $.ajax({
        url: urlname,
        type: "POST",
        dataType: "json",
        cache: false,
        data: ajaxdata,
        beforeSend: function () {
            $(parentid).prepend(loadmsg);//.empty()
        },
        error: function (data) {
            var callback = errorfunc(data);
            eval(callback || function () { });
        },
        success: function (data) {
            $(loadmsg).remove();
            var callback = successfunc(data);
            eval(callback || function () { });
        }
    });
}

//复制Url链接
function copyUrl() {
    var clipBoardContent = window.location.href;
    window.clipboardData.setData("Text", clipBoardContent);
    alert("复制成功!");
}

/**
 * @author 徐蓓
 * 添加开始
 */

//获得字符串长度
function getStringLength(str) {
    var totalLength = 0;
    var list = str.split("");
    for (var i = 0; i < list.length; i++) {
        var s = list[i];
        if (s.match(/[\u0000-\u00ff]/g)) { //半角
            totalLength += 1;
        } else if (s.match(/[\u4e00-\u9fa5]/g)) { //中文  
            totalLength += 2;
        } else if (s.match(/[\uff00-\uffff]/g)) { //全角 
            totalLength += 3;
        }
    }
    return totalLength;
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

/**
 * 添加结束
 */