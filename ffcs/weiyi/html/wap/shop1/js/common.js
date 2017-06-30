new function (c) {
    var b = c.separator || "&", e = c.spaces === !1 ? !1 : !0, m = c.prefix !== !1 ? c.hash === !0 ? "#" : "?" : "", g = c.numbers === !1 ? !1 : !0;
    jQuery.query = new function () {
        var a = function (a, d) {
            return a != void 0 && a !== null && (d ? a.constructor == d : !0)
        }, d = function (a) {
            for (var d = /\[([^[]*)\]/g, c = /^([^[]+)(\[.*\])?$/.exec(a), b = c[1], e = []; a = d.exec(c[2]);)e.push(a[1]);
            return[b, e]
        }, c = function (d, b, e) {
            var g = b.shift();
            typeof d != "object" && (d = null);
            if (g === "")if (d || (d = []), a(d, Array))d.push(b.length == 0 ? e : c(null, b.slice(0), e)); else if (a(d, Object)) {
                for (g = 0; d[g++] != null;);
                d[--g] = b.length == 0 ? e : c(d[g], b.slice(0), e)
            } else d = [], d.push(b.length == 0 ? e : c(null, b.slice(0), e)); else if (g && g.match(/^\s*[0-9]+\s*$/)) {
                var m = parseInt(g, 10);
                d || (d = []);
                d[m] = b.length == 0 ? e : c(d[m], b.slice(0), e)
            } else if (g) {
                m = g.replace(/^\s*|\s*$/g, "");
                d || (d = {});
                if (a(d, Array)) {
                    for (var o = {}, g = 0; g < d.length; ++g)o[g] = d[g];
                    d = o
                }
                d[m] = b.length == 0 ? e : c(d[m], b.slice(0), e)
            } else return e;
            return d
        }, o = function (a) {
            var d = this;
            d.keys = {};
            a.queryObject ? jQuery.each(a.get(), function (a, c) {
                d.SET(a, c)
            }) : jQuery.each(arguments, function () {
                var a;
                a = ("" + this).replace(/^[?#]/, "");
                a = a.replace(/[;&]$/, "");
                e && (a = a.replace(/[+]/g, " "));
                jQuery.each(a.split(/[&;]/), function () {
                    var a = decodeURIComponent(this.split("=")[0] || ""), c = decodeURIComponent(this.split("=")[1] || "");
                    a && (g && (/^[+-]?[0-9]+\.[0-9]*$/.test(c) ? c = parseFloat(c) : /^[+-]?[0-9]+$/.test(c) && (c = parseInt(c, 10))), d.SET(a, !c && c !== 0 ? !0 : c))
                })
            });
            return d
        };
        o.prototype = {queryObject:!0, has:function (d, c) {
            var b = this.get(d);
            return a(b, c)
        }, GET:function (c) {
            if (!a(c))return this.keys;
            for (var b = d(c), c = b[1], b = this.keys[b[0]]; b != null && c.length != 0;)b = b[c.shift()];
            return typeof b == "number" ? b : b || ""
        }, get:function (d) {
            d = this.GET(d);
            if (a(d, Object))return jQuery.extend(!0, {}, d); else if (a(d, Array))return d.slice(0);
            return d
        }, SET:function (b, e) {
            var g = !a(e) ? null : e, m = d(b), o = m[0];
            this.keys[o] = c(this.keys[o], m[1].slice(0), g);
            return this
        }, set:function (a, d) {
            return this.copy().SET(a, d)
        }, REMOVE:function (a) {
            return this.SET(a, null).COMPACT()
        }, remove:function (a) {
            return this.copy().REMOVE(a)
        }, EMPTY:function () {
            var a = this;
            jQuery.each(a.keys, function (d) {
                delete a.keys[d]
            });
            return a
        }, load:function (a) {
            var d = a.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"), c = a.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
            return new o(a.length == c.length ? "" : c, a.length == d.length ? "" : d)
        }, empty:function () {
            return this.copy().EMPTY()
        }, copy:function () {
            return new o(this)
        }, COMPACT:function () {
            function d(c) {
                var b = typeof c == "object" ? a(c, Array) ? [] : {} : c;
                typeof c == "object" && jQuery.each(c, function (c, e) {
                    if (!a(e))return!0;
                    var h = d(e);
                    a(b, Array) ? b.push(h) : b[c] = h
                });
                return b
            }

            this.keys = d(this.keys);
            return this
        }, compact:function () {
            return this.copy().COMPACT()
        }, toString:function () {
            var d = [], c = [], h = function (a) {
                a += "";
                e && (a = a.replace(/ /g, "+"));
                return encodeURIComponent(a)
            }, g = function (d, b) {
                var e = function (a) {
                    return!b || b == "" ? "" + a : [b, "[", a, "]"].join("")
                };
                jQuery.each(d, function (d, b) {
                    if (typeof b == "object")g(b, e(d)); else {
                        var m = e(d);
                        a(b) && b !== !1 && (m = [h(m)], b !== !0 && (m.push("="), m.push(h(b))), c.push(m.join("")))
                    }
                })
            };
            g(this.keys);
            c.length > 0 && d.push(m);
            d.push(c.join(b));
            return d.join("")
        }};
        return new o(location.search, location.hash)
    }
}(jQuery.query || {});


(function ($) {
    $.fn.numberInput = function (len) {
        $(this).bind('propertychange input', function () {
            if (/\D/.test($(this).val())) {
                $(this).val($(this).val().replace(/\D/g, ""));
            }
            if ($(this).val().length > len && len != 0) {
                $(this).val($(this).val().substring(0, len));
            }
        });
    }
    $.fn.positiveIntegerInput = function (len) {
        $(this).bind('propertychange input', function () {
        	var value = this.value;
        	if(value.charAt(0) == "0"){
        		value = value.substring(1);
        	}
            if (/\D/.test(value)) {
                value = value.replace(/\D/g, "");
            }
            if (value.length > len && len != 0) {
                value = value.substring(0, len);
            }
            this.value = value;
        });
    }
})(jQuery);


$.fn.extend({
    setPosition:function(){
        if(this.height() < $(window).height()) {
            this.css({"top":($(window).height() - this.height())/2 + $(document).scrollTop()});
        }else{
            this.css({top:$(document).scrollTop()});
        }
        this.css({"left":($(window).width() - this.width())/2});
        //console.log(1);
        return this;
    },
    textClean:function(){
        this.live("focus",function(){
            if($(this).val() == this.defaultValue){
                $(this).val("");
                $(this).removeClass("gray");
                if($(this).hasClass("password")){
                    this.type = "password";
                }
            };
        });
        this.live("blur",function(){
            if($.trim($(this).val()) == ""){
                $(this).val(this.defaultValue);
                $(this).addClass("gray");
                if($(this).hasClass("password")){
                    this.type = "text";
                }
            };
        });
        return this;
    },btnGoBack:function(){
        this.live("click",function(){
            history.go(-1);
            return false;
        });

    }
});

(function($){
    $.error_pop = function(title,message,fn){
    	title = title || "温馨提示";
        wgt.sure_back = fn || function(){};
        var error_pop_html = $('<div class="popDiv popJubaoDiv" id="error_pop"><div class="popDivTitle" id="error_title">' + title + '<a class="closePopBtn close_error_pop" href="javascript:;" title="关闭"></a></div><div class="popDivMain popJubaoMain"><div id="xwb_msgdlg_icon" class="icon-alert all-bg"></div><p id="message">' + message +'</p><p class="error_btn"><a class="btn close_error_pop" btnType="yes" href="javascript:;">确定</a> &nbsp;  &nbsp;  <a class="btn cancelBtn close_error_pop none" id="popCancelBtn" href="javascript:;">取消</a></p></div></div>');
        $("body").append(error_pop_html)
        var error_mask = $('<div class="shade-div" id="shade-div-error"></div>');
        $("body").append(error_mask);
        $("#popCancelBtn").hide();
        var timer = setInterval(function(){
            if($("#error_pop").length > 0) {
                $("#error_pop").show().setPosition();
                clearInterval(timer);
            }
        },100)

    }
    
    
    $.zIndex = 1000000;
    
    $.slideDownMsg = function(msg){
   		var popDiv = $('<div class="top_pop"></div>');
   		popDiv.css("zIndex", $.zIndex++);
   		$(document.body).append(popDiv);
    	popDiv.html(msg).slideShow().delay(2500).slideHide();
    };
    
    $.comfirm = function(title, message, fn){
        $.error_pop(title, message, function(btnType){
        	if(btnType == "yes"){
        		fn(btnType);
        	}
       	});
        $("#popCancelBtn").css("display", "inline-block");
    }
    jQuery.extend({
    	/** 获取查询字符串 */
	    getQueryString : function(paramName) {
	        var queryString = window.location.search;
	        if (paramName) {
	            var group, regExp;
	            regExp = new RegExp("[?&]" + paramName + "=([^&]*)");
	            group = queryString.match(regExp);
	            if (group != null) {
	                return (decodeURIComponent(group[1]));
	            } else {
	            	return "";
	            }
	        } else {
				queryString = queryString.substring(1);
				var params = queryString.split("&");
				var paramObj = {};  	
				for(var i = 0; i < params.length; i++){
					var param = params[i].split("=");
					paramObj[param[0]] = param[1];
				}
	        	return paramObj;
	        }
	    }
	});
})(jQuery);

(function (wgt) {
    if (!wgt)wgt = window.wgt = {};
    $.extend(true, wgt, {
        init: function(){
            var self = this;
            self.bind();
            if ($.isFunction(this.onGetPrf)){
                this.onGetPrf();
            }
        },
        bind:function(){
            var self = this;
            $(".close_error_pop").live("click",function(){
                $("#error_pop").remove();
                $("#photo_pop").remove();
                $("#shade-div-error").remove();
                wgt.sure_back($(this).attr("btnType"));
                return false;
            });

        },
        getSearch:function(){
            var o = {};
            var search = location.search;
            if(/\?/.test(search)) {
                var str = search.split("?")[1];
                var arr = str.split("&");
                for(var i= 0, len = arr.length; i<len; i++) {
                    var arrL = arr[i].split("=");
                    o[arrL[0]] = arrL[1];
                }
            }
            return o;
        }
    })
})(window.wgt);

/** JS公用对象 */
var Common = function(){
	// 常量
	this.cost = {
		// 消息标识1
		msgId : ""
	};
};

var common = new Common();

/** 获取上下文 */
common.getWebRoot = function(){
	if($("#contextPathId").length != 0){
		return $("#contextPathId").val();
	}else{
		return window.contextPath;
	}
};
common.isChinese = function(str){  // 判断是不是中文
    var reCh=/[\x00-\xff]/g;
    return !reCh.test(str);
}

common.getStrLength = function(text){
    var strlen = 0;
    for (var i = 0; i < text.length; i++){
        if (common.isChinese(text.charAt(i)) == true){
        	// 中文为2个字符
            strlen = strlen + 2;
        }else{
        	// 英文一个字符
            strlen = strlen + 1;
        }
    };
    // 中英文相加除2取整数
    strlen = Math.ceil(strlen/2);
    return strlen;
}
/**
* 获取绝对路径名
*/
common.getAbsPath = function(url){
	if(url.indexOf("http://") == -1){
		var webRoot = common.getWebRoot();
		if(webRoot.charAt(webRoot.length - 1) != "/" && webRoot.charAt(webRoot.length - 1) != "\\" && url.charAt(0) != "/" && url.charAt(0) != "\\"){
			url = "/" + url;
		}
		url = common.getWebRoot() + url;
	}
	return  url;
}

/**
* 获取绝对路径名，并且避免缓存
*/
common.getAbsNoCachePath = function(url){
	url = common.getAbsPath(url);
	if(url.lastIndexOf("?") == -1){
		url +="?";
	}else{
		url +="&";
	}
	return  url + "number="+Math.random();
}

common.returnFalseFun = function(){
	return false;
}


common.gotoShopcart = function(){
	window.location.href = common.getWebRoot() + "/shopcart/shopcart.action";
}

common.adjustFilePath = function(filePath){
	if(filePath.substring(0, 2) == ".."){
		filePath = filePath.substring(2);
	}
	return filePath;
}

common.submitByCreateForm = function(url, params){
	var submitForm = formUtil.getNewSubmitForm(url);
	for(var key in params){
		formUtil.createNewFormElement(submitForm, key, params[key]);
	}
	submitForm.submit();
}

/**
*
*/
common.scrollTop = function(eventObj){
	if(!eventObj){
		return false;
	}
	setTimeout(function(){
		$(document).scrollTop($(eventObj).offset().top);
	},100);
}

/*
* 智能机浏览器版本信息:
*
*/
common.browser = function(){
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
common.namespace = function(fullNS)
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

/** 分页对象 */
var Page = function(){
	// 常量
	this.cost = {
		// 消息标识1
		msgId : ""
	};
};

var page = new Page();

/** 分页查询数据 */
page.search = function(prevPageId, nextPageId, url, params, fillDataName){
	common.ajaxPOST (url, params, function(json){
		page.searchData = json.data;
		page.fillDataName = fillDataName;
	    page.curPage = 1;
		page.pageSize = 16;
		page.fillDataName($(page.searchData).slice(((page.curPage - 1) * page.pageSize + 1) - 1, (page.curPage * page.pageSize)));
	    page.bindPaper(prevPageId, nextPageId);
	});
};

/** 绑定分页 */
page.bindPaper = function(prevPageId, nextPageId){
	var totalPage = page.searchData.length % page.pageSize == 0 ? page.searchData.length / page.pageSize : parseInt(page.searchData.length / page.pageSize + 1);
    if (totalPage <= 1) {
		$("#" + prevPageId).addClass("noLink");
		$("#" + nextPageId).addClass("noLink");
	} else {
		$("#" + prevPageId).addClass("noLink");
		$("#" + nextPageId).removeClass("noLink");
	}
    $("#" + prevPageId).live("click", function(i){
    	page.curPage--;
    	if (page.curPage > 0) {
			page.fillDataName($(page.searchData).slice(((page.curPage - 1) * page.pageSize + 1) - 1, (page.curPage * page.pageSize)));
    	} else {
    		page.curPage++;
    	}
    	if (totalPage == 1) {
    		$("#" + prevPageId).addClass("noLink");
    		$("#" + nextPageId).addClass("noLink");
    	} else if (page.curPage == 1) {
    		$("#" + prevPageId).addClass("noLink");
    		$("#" + nextPageId).removeClass("noLink");
    	} else if (page.curPage > 1 && page.curPage < totalPage) {
    		$("#" + prevPageId).removeClass("noLink");
    		$("#" + nextPageId).removeClass("noLink");
    	}
    });
    $("#" + nextPageId).live("click", function(i){
    	page.curPage++;
		if (page.curPage <= totalPage) {
			page.fillDataName($(page.searchData).slice(((page.curPage - 1) * page.pageSize + 1) - 1, (page.curPage * page.pageSize)));
		} else {
			page.curPage--;
		}
		if (totalPage == 1) {
    		$("#" + prevPageId).addClass("noLink");
    		$("#" + nextPageId).addClass("noLink");
    	} else if (page.curPage > 1 && page.curPage < totalPage) {
    		$("#" + prevPageId).removeClass("noLink");
    		$("#" + nextPageId).removeClass("noLink");
    	} else if (page.curPage == totalPage) {
    		$("#" + prevPageId).removeClass("noLink");
    		$("#" + nextPageId).addClass("noLink");
    	}
    });
};
