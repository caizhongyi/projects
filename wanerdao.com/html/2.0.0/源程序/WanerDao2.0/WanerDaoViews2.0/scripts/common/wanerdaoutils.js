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

function LTrim(str) {
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(0)) != -1) {
        var j = 0, i = s.length;

        while (j < i && whitespace.indexOf(s.charAt(j)) != -1) {
            j++;
        }

        s = s.substring(j, i);
    }

    return s;
}



/*
　　２．RTrim(string):去除右边的空格
*/

function RTrim(str) {

    var whitespace = new String(" \t\n\r");

    var s = new String(str);



    if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {

        var i = s.length - 1;

        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1) {

            i--;

        }

        s = s.substring(0, i + 1);

    }

    return s;

}



/*
　　３．Trim(string):去除前后空格
*/

function Trim(str) {

    return RTrim(LTrim(str));

}

/*

　　XMLEncode(string):对字符串进行XML编码

*/

function XMLEncode(str) {

    str = Trim(str);

    str = str.replace("&", "&amp;");

    str = str.replace("<", "&lt;");

    str = str.replace(">", "&gt;");

    str = str.replace("'", "&apos;");

    str = str.replace("\"", "&quot;");

    return str;

}

/*
验证类函数
*/

function IsEmpty(obj) {

    obj = document.getElementsByName(obj).item(0);

    if (Trim(obj.value) == "") {

        alert("字段不能为空。");

        if (obj.disabled == false && obj.readOnly == false) {

            obj.focus();

        }

    }

}



/*
　　IsInt(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为整数、正整数、负整数、正整数+0、负整数+0
*/

function IsInt(objStr, sign, zero) {

    var reg;

    var bolzero;



    if (Trim(objStr) == "") {

        return false;

    }

    else {

        objStr = objStr.toString();

    }



    if ((sign == null) || (Trim(sign) == "")) {
        sign = "+-";
    }

    if ((zero == null) || (Trim(zero) == "")) {
        bolzero = false;
    }
    else {
        zero = zero.toString();
        if (zero == "0") {
            bolzero = true;
        }
        else {
            alert("检查是否包含0参数，只可为(空、0)");
        }
    }

    switch (sign) {

        case "+-":

            //整数

            reg = /(^-?|^\+?)\d+$/;

            break;

        case "+":

            if (!bolzero) {

                //正整数

                reg = /^\+?[0-9]*[1-9][0-9]*$/;

            }

            else {

                //正整数+0

                //reg=/^\+?\d+$/;

                reg = /^\+?[0-9]*[0-9][0-9]*$/;

            }

            break;

        case "-":

            if (!bolzero) {

                //负整数

                reg = /^-[0-9]*[1-9][0-9]*$/;

            }

            else {

                //负整数+0

                //reg=/^-\d+$/;

                reg = /^-[0-9]*[0-9][0-9]*$/;

            }

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }

    var r = objStr.match(reg);

    if (r == null) {

        return false;

    }

    else {

        return true;

    }

}

/*

　　IsFloat(string,string,int or string):(测试字符串,+ or - or empty,empty or 0)

　　功能：判断是否为浮点数、正浮点数、负浮点数、正浮点数+0、负浮点数+0

*/

function IsFloat(objStr, sign, zero) {

    var reg;

    var bolzero;



    if (Trim(objStr) == "") {

        return false;

    }

    else {

        objStr = objStr.toString();

    }



    if ((sign == null) || (Trim(sign) == "")) {

        sign = "+-";

    }



    if ((zero == null) || (Trim(zero) == "")) {

        bolzero = false;

    }
    else {

        zero = zero.toString();

        if (zero == "0") {

            bolzero = true;

        }
        else {

            alert("检查是否包含0参数，只可为(空、0)");

        }

    }

    switch (sign) {

        case "+-":

            //浮点数

            reg = /^((-?|\+?)\d+)(\.\d+)?$/;

            break;

        case "+":

            if (!bolzero) {

                //正浮点数

                reg = /^\+?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else {

                //正浮点数+0

                reg = /^\+?\d+(\.\d+)?$/;

            }

            break;

        case "-":

            if (!bolzero) {

                //负浮点数

                reg = /^-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;

            }

            else {

                //负浮点数+0

                reg = /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/;

            }

            break;

        default:

            alert("检查符号参数，只可为(空、+、-)");

            return false;

            break;

    }



    var r = objStr.match(reg);

    if (r == null) {
        return false;
    }
    else {
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
=======
转义 空格和换行
TEXT TO HTML
*/
String.prototype.textToHTML = function () {
    return this.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}


/*
转义 空格和换行
HTML TO TEXT
*/
String.prototype.htmlToTEXT = function () {
    return this.replace(/\<br\/\>/g, '\n').replace(/\&nbsp\;/g, ' ');
}

/*
解码特殊字符
*/
String.prototype.descapeSpecialchar = function () {
    return this.replace(/\:apos\:/g, '\'').replace(/\:quot\:/g, '\"').replace(/\:macr\:/g, '-').replace(/\:equal\:/g, '=').replace(/\:frasl\:/g, '/').replace(/\:piv\:/g, '?').replace(/\:under\:/g, '_').replace(/\:sdot\:/g, '.');
}

/*
     
根据 键名 获取 值
        
****/
function getValuByKey(list, keyValue, keyName, valueName) {
    var value = '';
    $.each(list, function (i, v) {
        if (v[keyName] == keyValue) {
            value = v[valueName];
            return false;
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
function bindDropDownList(ddlid, items, flg) {
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
    $('#' + ddlid).chosen();
    return $('#' + ddlid);
}
//绑定下拉列表,当flg为false的时候表示没有数据，为true的时候正常填充下拉列表
function bindDropDownListNoDefault(ddlid, items, flg) {
    //items = eval(items);
    $('#' + ddlid).empty();
    if (flg) {
        if (items != null) {
            $.each(items, function (i, n) {
                if (i == 0) {
                    $('#' + ddlid).append("<option value='" + items[i].id + "' selected='selected'>" + items[i].value + "</option>");
                }
                else {
                    $('#' + ddlid).append("<option value='" + items[i].id + "'>" + items[i].value + "</option>");
                }
            });
        }
    }
    else {
        $('#' + ddlid).append("<option value='-1' selected='selected'>" + wanerdaoLangTip('common_00005') + "</option>");
    }
    $('#' + ddlid).chosen();
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
    $('#' + ddlid).chosen();
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
    obj.chosen();
    return obj;
}
function getDropDownListSelectedValue(ddlid) {
    var selectedId = $("#" + ddlid).val();
    var selectedVal;
    $("#" + ddlid).find("option").each(function () {
        if ($(this).val() == selectedId) {
            selectedVal = $(this).text();
            return false;
        }
    });
    return selectedVal;
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
            $(parentid).prepend(loadmsg); //.empty()
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
//通过生成遮罩层来实现加载等待效果
function ajaxfuncbyloading(urlname, ajaxdata, parentid, errorfunc, successfunc) {
    var loadinglayer = $('<div class="loading-layer"></div>');
    $.ajax({
        url: urlname,
        type: "POST",
        dataType: "json",
        cache: false,
        data: ajaxdata,
        beforeSend: function () {
            $(parentid).append(loadinglayer).css('position', 'relative');
        },
        error: function (data) {
            var callback = errorfunc(data);
            eval(callback || function () { });
        },
        success: function (data) {
            loadinglayer.remove();
            $(parentid).css('position', '');
            var callback = successfunc(data);
            eval(callback || function () { });
        }
    });
}
//可以自定义发送请的状态
function ajaxfuncbybefore(urlname, ajaxdata, beforefunc, errorfunc, successfunc) {
    $.ajax({
        url: urlname,
        type: "POST",
        dataType: "json",
        cache: false,
        data: ajaxdata,
        beforeSend: function () {
            var callback = beforefunc();
            eval(callback || function () { });
        },
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
//复制Url链接
function copyUrl() {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        var clipBoardContent = window.location.href;
        window.clipboardData.setData("Text", clipBoardContent);
    }
    else {
        alert("目前只支持IE");
    }
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

//判断字符串长度是否合法
function validateStrLng(str, lng) {
    return getStringLength(str) < lng;
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

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

////获取url参数
function getQueryStringWithES(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function isURL(str_url) {
    var strRegex = "^((https|http)?://)"
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
	+ "|" // 允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
	+ "[a-z]{2,6})" // first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" // 端口- :80
	+ "((/?)|" // a slash isn't required if there is no file name
	+ "(/[0-9A-Za-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
        return true;
    } else {
        return false;
    }
}

//提示信息
function hint(str, $hint, span) {
    $hint.text(str);
    $hint.show();
    //默认延迟时间是1秒
    var d = 1;
    if (span)
        d = span;
    setTimeout(function () {
        $hint.hide();
    }, d * 1000);
}

//判断是否为一整天
function isAllDay(start, end) {
    var result = false;
    if (start.getHours() == 0 && start.getMinutes() == 0)
        if (end.getHours() == 23 && end.getMinutes() == 59)
            result = true;
    return result;
}
//判断是否为同一天
function isSameDay(start, end) {
    return Math.abs(end.getTime() - start.getTime()) <= 24 * 60 * 60 * 1000;
}
function isSameMonth(start, end) {
    return (start.getYear() == end.getYear() && start.getMonth() == end.getMonth());
}
//将日期转换成wcf标准格式的时间字符串，示例/Date(100000)/
function convertDateToWCFDate(date) {
    return "\/Date(" + date.getTime() + ")\/";
}
//将wcf时间标准格式转换成日期
function convertWCFDateToDate(dateStr) {
    return new Date(parseInt(dateStr.replace("/Date(", "").replace(")/", "").replace(/\+\d+/g), 10));
}
/**
* 添加结束
*/


function autoSize(obj, w, h, t) {
    var oIMG = new Image()
    oIMG.onload = function () {
        var oW = this.width;
        var oH = this.height;
        var tax = 1;
        if (oW > w || oH > h)
            tax = (oW / oH) > (w / h) ? (w / oW) : (h / oH);
        if (t == 3) {
            obj.style.marginLeft = (w - Math.floor(oW * tax)) / 2 + "px";
            obj.style.marginTop = h - Math.floor(oH * tax) + "px";
        }
        if (t == 1) {
            obj.style.marginLeft = (w - Math.floor(oW * tax)) / 2 + "px";
            obj.style.marginTop = (h - Math.floor(oH * tax)) / 2 + "px";
        }

        obj.width = oW * tax;
        obj.height = oH * tax;
    }
    oIMG.src = obj.src;
}

//只能输入数字
function clearNoNum(obj) {
    //先把非数字的都替换掉，除了数字
    obj.value = obj.value.replace(/[^\d]/g, "");
}