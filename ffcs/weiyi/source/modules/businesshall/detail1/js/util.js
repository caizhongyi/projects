/** 通用工具类 */
Util = function() {
	this.cost = {
		// 消息标示ID
		msgId : "",
		// 系统提示信息
		sysErrMsg : "系统忙,请稍后再试!",
		// 开始数字
		start : 100001,
		// 结束数字
		end : 999999,
		// JSON数据类型
		jsonType : "JSON",
		// HTML数据类型
		htmlType : "HTML",
		// TEXT数据类型
		textType : "TEXT",
		// 微博类型 1：新浪微博
		weiboTypeSina : "1",
		// 微博类型 2：腾讯微博
		weiboTypeTencent : "2",
		// 最近访问菜单URL
		lastAccMenuURL : "lastAccMenuURL",
		// 加载图片
		image : "<img src='../images/loading.gif' />"
	};
};

//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
 
    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
    newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
     
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
    if((j+1)%2==1){//奇数位
        if(parseInt(newArr[j])*2<9)
        arrJiShu.push(parseInt(newArr[j])*2);
        else
        arrJiShu2.push(parseInt(newArr[j])*2);
    }
    else //偶数位
    arrOuShu.push(newArr[j]);
    }
     
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
    jishu_child1.push(parseInt(arrJiShu2[h])%10);
    jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }       
     
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
    sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
     
    for(var n=0;n<arrOuShu.length;n++){
    sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
     
    for(var p=0;p<jishu_child1.length;p++){
    sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
    sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }     
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
     
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;       
    var luhm= 10-k;
     
    if(lastNum==luhm){
    $("#banknoInfo").html("Luhm验证通过");
    return true;
    }
    else{
    $("#banknoInfo").html("银行卡号必须符合Luhm校验");
    return false;
    }       
}

/**
 * 去掉字符串的空格，
 * 即str.trim(),即可以去
 * 掉字符串前后的空格
 * return String
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};

/**
 * 判断是否是数字
 * return boolean
 */
String.prototype.isNumber = function() {
	if (this == "") {
		return false;
	}
	var r = /^[0-9]*$/;
	return r.test(this);
};

String.prototype.nonSpecialChar = function() {
	if (this == "") {
		return false;
	}
	var r = /^[\w|\u4e00-\u9fa5]*$/;
	return r.test(this);
};

String.prototype.isGeneralName = function() {
	if (this.nonSpecialChar()) {
		if(this.isNumber()){
			return false;	
		}
		return true;
	}else {
		return false;
	}
};

String.prototype.isName = function() {
	if (this == "") {
		return false;
	}
	if(/^[a-zA-Z ]{4,20}$/.test(this) || /^[\u4e00-\u9fa5]{2,10}$/.test(this)){
		return true;
	}else{
		return false;
	}
};

/**
 * 判断是否是字母
 * return boolean
 */
String.prototype.isLetter = function() {
	if (this == "") {
		return false;
	}
	var r = /^[a-zA-Z]*$/;
	
	return r.test(this);
};

/**
 * 判断是否是浮点数
 * return boolean
 */
String.prototype.isFloatNum = function() {
	if (this == "") {
		return false;
	}
	var r = /^(-?\d+)(\.\d+)?$/;
	
	return r.test(this);
};

/**
 * 判断是否是正整数
 * return boolean
 */
String.prototype.isPosInteger = function() {
	if (this == "") {
		return false;
	}
	var r = /^[0-9]*[1-9][0-9]*$/;
	
	return r.test(this);
};

/**
 * 判断是否有效的手机号码
 * return boolean
 */
String.prototype.isValidMobNum = function() {
	if (this == "") {
		return false;
	}
	var r = /^1\d{10,10}$/; 
	
	return r.test(this);
};

/**
 * 判断是否有效的座机号码
 * return boolean
 */
String.prototype.isValidLandNum = function() {
	if (this == "") {
		return false;
	}
	var r = /^\d{3,4}-\d{7,8}$/;
	
	return r.test(this);
};

/**
 * 判断是否有效的邮箱
 * return boolean
 */
String.prototype.isValidEmail = function() {
	if (this == "") {
		return false;
	}
	var r = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
	return r.test(this);
};

/**
 * 判断是否有效的密码
 * return boolean
 */
String.prototype.isValidPwd = function() {
	if (this == "") {
		return false;
	}
	var r = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$/;
	
	return r.test(this);
};

String.prototype.isBankCartNo = function() {
	if (this == "") {
		return false;
	}
    if (luhmCheck(this)) {
        return true;
    }
    return false;
}

/**
 * 判断是否有效的URL
 * return boolean
 */
String.prototype.isValidURL = function() {
	if (this == "") {
		return false;
	}
	
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
     +
    "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
     +
    "|" // 允许IP和DOMAIN（域名）
     +
    "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
     +
    "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
     +
    "[a-z]{2,6})" // first level domain- .com or .museum 
     +
    "(:[0-9]{1,4})?" // 端口- :80 
     +
    "((/?)|" // a slash isn't required if there is no file name 
     +
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var r = new RegExp(strRegex);
	
	return r.test(this);
};

/**
 * 判断是否有效的图片
 * return boolean
 */
String.prototype.isValidImage = function() {
	if (this == "") {
		return false;
	}
    
    var r1 = /^[^\.]*(\.(jpg|png|gif))$/;
	var r2 = /^(jpg|png|gif)$/;
	
	return r1.test(this) || r2.test(this);
};

var util = new Util();

/**
 * 判断是否为空
 * param obj
 * return boolean
 */
util.isNull = function (obj) {
	if (typeof (obj) == "undefined") {
		return true;
	} else if (obj == null) {
		return true;
	} else if (typeof(obj) == "string" && obj.trim() == "") {
		return true;
	} else if (obj instanceof Array && obj.length == 0) {
		return true;
	}
	
	return false;
};

/**
 * 取字符串长度|中文2|其他1
 * param str
 * return int
 */
util.leng = function(str) {
	return str.replace(/[^x00-xff]/g, "**").length;
};

/**
 * 替换字符串
 * param src 原字符串
 * param str1 需要替换字符串
 * param str2 替换字符串
 * return str
 */
util.replaceAll = function(src, str1, str2) {
	return src.replace(new RegExp(str1, "gm"), str2);
};

/**
 * 设置提示消息
 * param id
 * param msg
 */
util.setMessage = function (id, msg) {
	$("#" + id).html(msg);
};

/**
 * 设置值
 * param id
 * param value
 */
util.setValue = function(id, value) {
	$("#" + id).val(value);
};

/**
 * 是否未定义
 * param obj
 * return boolean
 */
util.isUndefined = function(obj) {
	return typeof (obj) == "undefined";
};

/**
 * 去除空格(页面中所有输入框)
 */
util.trimAll = function() {
	$("input[type=text]").each(function(i){
		$(this).val($(this).val().trim());
	});
};

/**
 * 是否为数组
 * param obj
 * return boolean
 */
util.isArray = function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';    
};

/**
 * 数据是否为空
 * param obj
 * return boolean
 */
util.isNullArray = function(obj) {
	if (util.isArray(obj)) {
		if (obj.length > 0) {
			return false;
		}
	}
	
	return true;
};

/**
 * 获取当天日期
 * param format(该参数可传可不传)
 * return str
 */
util.getTheDate = function(format) {
	var date = "";
	var theDate = new Date();
	var year = theDate.getFullYear();
	var month = theDate.getMonth() + 1;
	var day = theDate.getDate();
	var hour = theDate.getHours();
	var minute = theDate.getMinutes();
	var second = theDate.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	if (util.isNull(format) || format == "yyyy-MM-dd") {
		date = year + "-" + month + "-" + day;
	} else if (format == "yyyy-MM-dd HH:mm") {
		date = year + "-" + month + "-" + day + " " + hour + ":" + minute;
	} else if (format == "yyyy-MM-dd HH:mm:ss") {
		date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	} else {
		date = year + "-" + month + "-" + day;
	}
	
	return date;
};

/**
 * 保留小数位数
 * param nbr, len
 * return int
 */
util.toFixed = function(nbr, len) { 
	if (isNaN(len) || len == null) { 
		len = 0; 
	} else { 
		if (len <0) { 
			len = 0; 
		} 
	}
	
	return Math.round(nbr * Math.pow(10, len)) / Math.pow(10, len); 
};

/**
 * 生成指定范围随机数
 * param start
 * param end
 * return int
 */
util.getRandom = function(start, end) {
	return parseInt(Math.floor(Math.random() * (end - start + 1) + start));
};

/**
 * 生6位数字随机数
 * return int
 */
util.sixRandom = function() {
	return util.getRandom(util.cost.start, util.cost.end);
};

/**
 * 是否是数字
 * param str 字符串
 * return boolean
 */
util.isDigit = function(str) { 
	var patrn = /^[0-9]{1,20}$/; 
	if (!patrn.exec(str)) {
		return false;
	} else {
		return true;
	}
};

/**
 * 超出字符串长度的位数则隐藏
 * param string 字符串
 * param length 长度
 * return string
 */
util.subStr = function(string, length){
	var str = "";
	if (util.isNull(string)) {
		return str;
	}
	
	var a = 0;
	var temp = "";
	for (var i = 0; i < string.length; i++) {
		if (string.charCodeAt(i) > 255) {
			a = a + 2;
		} else {
			a++;
		}
		if (a >= length) {
			return temp + "...";
		}
		temp = temp + string.charAt(i);
	}
	
	if (a < length) {
		str = string;
	}
	
	return str;
};

/**
 * 判断该字符串是否超出长度
 * param string 字符串
 * param length 长度
 * return boolean
 */
util.isExcLth = function(string, length) {
	if (util.isNull(string)) {
		return false;
	}
	
	var a = 0;
	for (var i = 0; i < string.length; i++) {
		if (string.charCodeAt(i) > 255) {
			a = a + 2;
		} else {
			a++;
		}
	}
	
	if (a > length) {
		return true;
	} else {
		return false;
	}
};

/**
 * 判断该字符串是否小于长度
 * param string 字符串
 * param length 长度
 * return boolean
 */
util.isLess = function(string, length) {
	if (util.isNull(string)) {
		return false;
	}
	
	var a = 0;
	for (var i = 0; i < string.length; i++) {
		if (string.charCodeAt(i) > 255) {
			a = a + 2;
		} else {
			a++;
		}
	}
	if (a < length) {
		return true;
	} else {
		return false;
	}
};

/**
 * 回调方法
 * param name 方法名
 * param obj 返回对象
 */
util.callBack = function(name, obj) {
	if (typeof(name) == "string") {
		eval(name + "(" + obj + ")");
	} else {
		name(obj);
	}
};

/**
 * 返回上一个页面
 */
util.back = function() {
	history.go(-1);
};

/**
 * 截取最后一个传入的字符串
 * param str 字符串
 * param separator 分隔符 
 * return string
 */
util.subLastStr = function(str, separator) {
	if (!util.isNull(str)) {
		return str.substring(0, str.lastIndexOf(separator));
	} else {
		return str;
	}
};

/**
 * 展示加载中
 */
util.showLoading = function() {
	$("#loading").show();
};

/**
 * 隐藏加载中
 */
util.hideLoading = function() {
	$("#loading").hide();
};

/**
 * 失去焦点
 * param obj 当前对象
 * param msg 提示信息
 */
util.lostFocus = function(obj, msg) {
	if ($(obj).val().trim() == "") {
		$(obj).val(msg);
	}
};

/**
 * 获取焦点
 * param obj 当前对象
 * param msg 提示信息
 */
util.getFocus = function(obj, msg) {
	if ($(obj).val().trim() == msg) {
		$(obj).val("");
	}
};

/**
 * 校验经度
 * param str 字符串
 * return boolean
 */
util.isLongitude = function(str) {
	var flag = false;
	if (!util.isNull(str)
			&& str.isFloatNum()
			&& (parseFloat(str) >= -180 && parseFloat(str) <= 180)) {
		flag = true;
	} else {
		flag = false;
	}
	
	return flag;
};

/**
 * 校验维度
 * param str 字符串
 * return boolean
 */
util.isDimension = function(str) {
	var flag = false;
	if (!util.isNull(str)
			&& str.isFloatNum()
			&& (parseFloat(str) >= -90 && parseFloat(str) <= 90)) {
		flag = true;
	} else {
		flag = false;
	}
	
	return flag;
};

/**
 * 特殊字符验证
 * param str 字符串
 * return boolean
 */
util.charFilter = function(str){
	var reg = /[\(\)\{\}\[\]\?\<>~!#$%^&*'"\;|\\]/;
	if (str != "") {
		if (reg.test(str)) {
			return false;
		}
	}
	return true;
};

// 检查表单
util.checkForm = function(formId) {
	var flag = true;
	// 校验区域元素
	var msg = util.valAreaEle(formId);
	if (!util.isNull(msg)) {
		$.error_pop("温馨提示", msg);
		flag = false;
	}
	
	return flag;
};

/**
 * 校验区域元素
 * param areaId 区域ID
 * param string 返回对象
 * return string
 */
util.valAreaEle = function(areaId) {
	var msg = null;
	$("#" + areaId + " [domName]").each(function(i){
		var valIsNull = util.isNull($(this).val());
		if (!util.isNull($(this).attr("reqired"))) {
			if (valIsNull) {
				if ($(this).attr("nodeName") == "SELECT") {
					msg = "请选择" + $(this).attr("domName") + "";
				} else {
					msg = $(this).attr("domName") + "不能为空";
				}
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("personID")) && !valIsNull) {
			var checkFlag = new clsIDCard($(this).val());
			if (!checkFlag.IsValid()) {
				msg = "输入的身份证号无效,请输入真实的身份证号！";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("nonSpecialChar")) && !valIsNull) {
			if (!$(this).val().nonSpecialChar()) {
				msg = $(this).attr("domName") + "不能包含特殊字符";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("isName")) && !valIsNull) {
			if (!$(this).val().isName()) {
				msg = $(this).attr("domName") + "不符合常规";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("isGeneralName")) && !valIsNull) {
			if (!$(this).val().isGeneralName()) {
				msg = $(this).attr("domName") + "不符合常规";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("numerical")) && !valIsNull) {
			if (!$(this).val().isNumber()) {
				msg = $(this).attr("domName") + "只能是数字";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("nonNumeric")) && !valIsNull) {
			if ($(this).val().isNumber()) {
				msg = $(this).attr("domName") + "不能全是数字";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("letter")) && !valIsNull) {
			if (!$(this).val().isLetter()) {
				msg = $(this).attr("domName") + "只能是字母";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("isMobileOrPhone")) && !valIsNull) {
			if (!($(this).val().isValidMobNum() 
					|| $(this).val().isValidLandNum())) {
				msg = $(this).attr("domName") + "格式错误";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("isMobile")) && !valIsNull) {
			if (!$(this).val().isValidMobNum()) {
				msg = $(this).attr("domName") + "格式错误";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("isPhone")) && !valIsNull) {
			if (!$(this).val().isValidLandNum()) {
				msg = $(this).attr("domName") + "格式错误";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("posInteger")) && !valIsNull) {
			if (!$(this).val().isPosInteger()) {
				msg = $(this).attr("domName") + "只能是正整数";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("floatNum")) && !valIsNull) {
			if (!$(this).val().isFloatNum()) {
				msg = $(this).attr("domName") + "只能是浮点数";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("maxLth")) && !valIsNull) {
			if (util.isExcLth($(this).val(), parseInt($(this).attr("maxLth")))) {
				msg = $(this).attr("domName") + "的长度不能超出" + $(this).attr("maxLth")+"字节";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("isName")) && !valIsNull) {
			if (util.isExcLth($(this).val(), 16)) {
				msg = $(this).attr("domName") + "的长度不能超出16字节";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("minLth")) && !valIsNull) {
			if (util.isLess($(this).val(), parseInt($(this).attr("minLth")))) {
				msg = $(this).attr("domName") + "的长度不能小于" + $(this).attr("minLth");
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("verifyLatLong")) && !valIsNull) {
			if ($(this).val().split(",").length == 2) {
				if (!util.isLongitude($(this).val().split(",")[0])) {
					msg = "请输入正确的" + $(this).attr("domName");
					//$(this).focus();
					return false;
				} 
				if (!util.isDimension($(this).val().split(",")[1])) {
					msg = "请输入正确的" + $(this).attr("domName");
					//$(this).focus();
					return false;
				} 
			} else {
				msg = "请输入正确的" + $(this).attr("domName");
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("verifyLongitude")) && !valIsNull) {
			if (!util.isLongitude($(this).val())) {
				msg = "请输入正确的" + $(this).attr("domName");
				$(this).focus();
				return false;
			} 
		}
		if (!util.isNull($(this).attr("verifyDimension")) && !valIsNull) {
			if (!util.isDimension($(this).val())) {
				msg = "请输入正确的" + $(this).attr("domName");
				//$(this).focus();
				return false;
			} 
		}
		if (!util.isNull($(this).attr("charFilter")) && !valIsNull) {
			if (!util.charFilter($(this).val())) {
				msg = $(this).attr("domName") + "不能包含特殊字符";
				//$(this).focus();
				return false;
			} 
		}
		if (!util.isNull($(this).attr("validEmail")) && !valIsNull) {
			if (!$(this).val().isValidEmail()) {
				msg = $(this).attr("domName") + "格式不正确";
				//$(this).focus();
				return false;
			}
		}
		if (!util.isNull($(this).attr("validPwd")) && !valIsNull) {
			if (!$(this).val().isValidPwd()) {
				msg = $(this).attr("domName") + "密码只能由6至20位字母、数字组成";
				//$(this).focus();
				return false;
			}
		}
		
		if (!util.isNull($(this).attr("isBankCartNo")) && !valIsNull) {
			if (!$(this).val().isBankCartNo()) {
				msg = $(this).attr("domName") + "不是有效的银行卡号.";
				return false;
			}
		}
		
	});
	
	return msg;
};

/**
 * 绑定监控回车
 */
util.bindMonitorEnter = function() {
	$("input[type='text'],[type='password'],[type='checkbox']").unbind("keydown").bind("keydown", function(event) {
	    if (event.keyCode == 13 
	    		&& $(this).is(":focus")) {
	    	if ($(this).attr("blur") != null) {
		    	// 失去焦点
		    	$(this).blur();
	    	}
	    	// 触发的点击事件
	    	var touchId = $(this).attr("touchId");
	    	if (!util.isNull(touchId) 
	    			&& !util.isNull($("#" + touchId))) {
	    		$("#" + touchId).click();
	    	}
	    }
	});
};

/**
 * 绑定
 */
util.bind = function(){
	// 
};

/**
 * 初始化
 */
util.init = function(){
	// 绑定
	util.bind();
};

/**
* 对象工具类
*/
var objUtil = {};
/**
* 显示对象所有属性，用于调试用
*/
objUtil.showAttributes = function(obj){
	if(!obj){
		alert(obj);
	}
	var attrs = "";
	for(var key in obj){
		attrs += key +" : "+obj[key] + ", ";
	}
	alert(attrs);
}


/** 获取上下文 */
util.getWebRoot = function(){
	if($("#contextPathId").length != 0){
		return $("#contextPathId").val();
	}else{
		return window.contextPath;
	}
};

/**
* 获取绝对路径名
*/
util.getAbsPath = function(url){
	if(url.indexOf("http://") == -1){
		var webRoot = util.getWebRoot();
		if(webRoot.charAt(webRoot.length - 1) != "/" && webRoot.charAt(webRoot.length - 1) != "\\" && url.charAt(0) != "/" && url.charAt(0) != "\\"){
			url = "/" + url;
		}
		url = util.getWebRoot() + url;
	}
	return  url;
}

/**
* 获取绝对路径名，并且避免缓存
*/
util.getAbsNoCachePath = function(url){
	url = util.getAbsPath(url);
	if(url.lastIndexOf("?") == -1){
		url +="?";
	}else{
		url +="&";
	}
	return  url + "number="+Math.random();
}

util.returnFalseFun = function(){
	return false;
}
/**
*
*/
util.scrollTop = function(eventObj){
	if(!eventObj){
		return false;
	}
	setTimeout(function(){
		$(document).scrollTop($(eventObj).offset().top);
	},100);
}

util.scrollToHere = function($obj){
    var self = this;
    $("html,body").animate({"scrollTop":$obj.offset().top - 45},"fast");
}

/*
* 智能机浏览器版本信息:
*
*/
util.browser = function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var iosRegExp = /(i[^;])+;(U;)? CPU.+Mac OS X/;
	return {//移动终端浏览器版本信息
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
		ios: (u.match(/iphone/i) || u.match(/ipod/i) || u.match(/ipad/i)), //ios终端
		android: u.indexOf('Android') > -1, //android终端或者uc浏览器
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	};
}();

/**
* 注册命名空间
*/
util.namespace = function(fullNS)
{
    // 将命名空间切成N部分, 比如Grandsoft、GEA等
    var nsArray = fullNS.split('.');
    var sEval = "";
    var sNS = "";
    for (var i = 0; i < nsArray.length; i++)
    {
        if (i != 0) sNS += ".";
        sNS += nsArray[i];
        // 依次创建构造命名空间对象（假如不存在的话）的语句
        // 比如先创建Grandsoft，然后创建Grandsoft.GEA，依次下去
        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
    }
    if (sEval != "") eval(sEval);
}

/**
 * 页面加载完所执行
 */
$(document).ready(function(){
	// 初始化
	util.init();
});
