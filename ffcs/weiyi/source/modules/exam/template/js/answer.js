var Q = function (a) {
    if (!a) {
        return null
    }
    if (a.constructor == String) {
        a = document.getElementById(a)
    }
    return a
};
Q.trim = function (b) {
    var a = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
    return String(b).replace(a, "")
};
Q.addClass = function (f, g) {
    f = Q(f);
    var b = g.split(/\s+/), a = f.className, d = " " + a + " ", e = 0, c = b.length;
    for (; e < c; e++) {
        if (d.indexOf(" " + b[e] + " ") < 0) {
            a += (a ? " " : "") + b[e]
        }
    }
    f.className = Q.trim(a);
    return f
};
Q.hasClass = function (c, d) {
    c = Q(c);
    if (!c.nodeType === 1) {
        return false
    }
    var b = Q.trim(d).split(/\s+/), a = b.length;
    className = c.className.split(/\s+/).join(" ");
    while (a--) {
        if (!(new RegExp("(^| )" + b[a] + "( |$)")).test(className)) {
            return false
        }
    }
    return true
};
Q.removeClass = function (d, f) {
    d = Q(d);
    var b = d.className.split(/\s+/);
    var e = f.split(/\s+/);
    var a = b.length;
    var g = e.length;
    for (var c = 0; c < g; c++) {
        while (a--) {
            if (b[a] == e[c]) {
                b.splice(a, 1);
                break
            }
        }
    }
    d.className = b.join(" ");
    return d
};
Q.jsonDecode = function (a) {
    return(new Function("return (" + a + ")"))()
};
Q.css = function (a, e, d) {
    a = Q(a);
    var f = Q.toCamelCase;
    var b = d ? true : false;
    e = f(e);
    if (b) {
        if (e == "float") {
            e = "cssFloat"
        }
        a.style[e] = d
    } else {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            var d = null;
            if (e == "float") {
                e = "cssFloat"
            }
            var c = a.ownerDocument.defaultView.getComputedStyle(a, "");
            if (c) {
                d = c[e]
            }
            return a.style[e] || d
        } else {
            return a.style[e]
        }
    }
};
Q.toCamelCase = function (a) {
    if (a.indexOf("-") < 0) {
        return a
    }
    return a.replace(/[-][^-]/g, function (b) {
        return b.charAt(1).toUpperCase()
    })
};
Q.loadJs = function (c) {
    c.id = c.id || "LoadedJs" + new Date().getTime();
    c.isRemove = c.isRemove || true;
    var b = document.createElement("script");
    b.id = c.id;
    b.type = "text/javascript";
    b.charset = c.charset || "gb2312";
    var d = function () {
        c.callback && c.callback();
        if (c.isRemove) {
            Q.remove(c.id)
        }
    };
    if (b.readyState) {
        b.onreadystatechange = function () {
            if (b.readyState == "loaded" || b.readyState == "complete") {
                b.onreadystatechange = null;
                d()
            }
        }
    } else {
        b.onload = function () {
            d()
        }
    }
    b.src = c.src;
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a)
};
Q.remove = function () {
    var d;
    for (var a = 0, c = arguments.length; a < c; a++) {
        d = Q(arguments[a]);
        try {
            d.parentNode.removeChild(d)
        } catch (b) {
        }
    }
};
Q.setCookie = function (c, e, b) {
    b = b || {};
    var a = b.expires || null;
    var g = b.path || "/";
    var d = b.domain || document.domain;
    var f = b.secure || null;
    document.cookie = c + "=" + escape(e) + ((a) ? "; expires=" + a.toGMTString() : "") + "; path=" + g + "; domain=" + d + ((f) ? "; secure" : "")
};
Q.getCookie = function (b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return unescape(a[2])
    }
    return null
};
Q.delCookie = function (a) {
    var c = new Date();
    c.setTime(c.getTime() - 1);
    var b = Q.getCookie(a);
    if (b != null) {
        document.cookie = a + "=" + b + ";expires=" + c.toGMTString()
    }
};
Q.tag = function (d, a) {
    var c = document.createElement(d), a = a || {};
    for (var b in a) {
        Q.attr(c, b, a[b])
    }
    return c
};
Q._propFix = {"for": "htmlFor", "class": "className", tabindex: "tabIndex", readonly: "readOnly", cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", rowspan: "rowSpan", valign: "vAlign", usemap: "useMap", frameborder: "frameBorder", maxlength: "maxLength", contenteditable: "contentEditable"};
Q.attr = function (b, a, c) {
    b = Q(b);
    if ("style" == a) {
        if (c) {
            b.style.cssText = c;
            return b
        } else {
            return b.style.cssText
        }
    }
    a = Q._propFix[a] || a;
    if (c) {
        b.setAttribute(a, c);
        return b
    } else {
        return b.getAttribute(a)
    }
};
Q.getQuery = function (b, c) {
    var d = new RegExp("(^|&|\\?|#)" + c + "=([^&#]*)(&|$|#)", "");
    var a = b.match(d);
    if (a) {
        return a[2]
    }
    return null
};
Q.getData = function (a, b) {
    if (window.localStorage) {
        return window.localStorage[a]
    } else {
        return Q.getCookie(a)
    }
};
Q.delData = function (a) {
    if (window.localStorage) {
        return window.localStorage.removeItem(a)
    } else {
        return Q.delCookie(a)
    }
};
Q.setData = function (a, b) {
    if (window.localStorage) {
        window.localStorage[a] = b
    } else {
        Q.setCookie(a, b, {expires: new Date("2020-12-23")})
    }
};
Q._ua = function () {
    return navigator.userAgent.toLowerCase()
};
Q.webkit = function () {
    return/webkit/i.test(Q._ua()) ? true : false
};
Q.android = function () {
    return/android/i.test(Q._ua()) ? true : false
};
Q.ipad = function () {
    return/ipad/i.test(Q._ua()) ? true : false
};
Q.iphone = function () {
    return/iphone/i.test(Q._ua()) ? true : false
};
Q.on = function (b, c, d, a) {
    c = c.replace(/^on/i, "");
    if (b.addEventListener) {
        a = a ? a : false;
        b.addEventListener(c, d, a)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, function () {
                return d.call(b, window.event)
            })
        }
    }
};
Q.un = function (b, c, d, a) {
    c = c.replace(/^on/i, "").toLowerCase();
    if (b.removeEventListener) {
        a = a ? a : false;
        b.removeEventListener(c, d, a)
    } else {
        if (b.detachEvent) {
            b.detachEvent("on" + c, d)
        }
    }
};
Q.preventDefault = function (a) {
    if (a.preventDefault) {
        a.preventDefault()
    } else {
        a.returnValue = false
    }
};
Q.getTarget = function (a) {
    return a.target || a.srcElement
};
Q.getEvent = function () {
    if (window.event) {
        return window.event
    } else {
        var a = arguments.callee;
        do {
            if (/Event/.test(a.arguments[0])) {
                return a.arguments[0]
            }
        } while (a = a.caller);
        return null
    }
};
Q.parent = function (b, a) {
    b = Q(b);
    a = a ? a : function () {
        return true
    };
    while ((b = b.parentNode) && b.nodeType == 1) {
        if (a(b)) {
            return b
        }
    }
    return null
};
Q.subString = function (d, a) {
    var e = 0;
    var c = "";
    for (var b = 0; b < d.length; b++) {
        if (d.charCodeAt(b) > 128) {
            e += 2
        } else {
            e++
        }
        c += d.charAt(b);
        if (e >= a) {
            return c
        }
    }
    return c
};
Q.tap = function (d, h) {
    var a, f, c, e, b, g;
    a = "1.0.1";
    c = 2 * 1000;
    g = function (i, j) {
        return function () {
            return i.apply(j, arguments)
        }
    };
    d.addEventListener("click", function (i) {
        i.preventDefault()
    });
    d.addEventListener("touchstart", g(function (i) {
        e = new Date().getTime();
        f = false
    }, d));
    d.addEventListener("touchmove", g(function (i) {
        f = true
    }, d));
    d.addEventListener("touchend", g(function (i) {
        b = new Date().getTime();
        if (!f && ((b - e) < c)) {
            h(i)
        }
    }, d));
    d.addEventListener("touchcancel", g(function (i) {
        h(i)
    }, d))
};
Q.ajax = function (url, options) {
    var httpRequest, timeout, timer, key, eventHandlers = {}, method = options.method || "GET", data = options.data || null, arguments = options.arguments || null, async = ("async" in options) ? options.async : true, timeout = options.timeout ? options.timeout : 30000, dataType = options.dataType || "json", cache = options.cache || false;
    var defaultHeaders = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8", "X-Requested-With": "XMLHttpRequest"};
    var headers = options.headers || {};
    for (key in headers) {
        if (headers.hasOwnProperty(key)) {
            defaultHeaders[key] = headers[key]
        }
    }
    url = url || "";
    method = method.toUpperCase();
    function getXMLHttpRequest() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                }
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }

    function callHandler(type) {
        var handler = eventHandlers[type];
        if (handler) {
            if (timer) {
                clearTimeout(timer)
            }
            if (type != "onSuccess") {
                handler(httpRequest, arguments)
            } else {
                try {
                    httpRequest.responseText
                } catch (error) {
                    return handler(httpRequest, arguments)
                }
                if (dataType.toLowerCase() === "script") {
                    eval.call(window, httpRequest.responseText)
                }
                handler(httpRequest, arguments)
            }
        }
    }

    function stateChangeHandler() {
        if (httpRequest.readyState == 4) {
            try {
                var stat = httpRequest.status
            } catch (ex) {
                callHandler("onError");
                return
            }
            callHandler("on" + stat);
            if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
                callHandler("onSuccess")
            } else {
                callHandler("onError")
            }
            callHandler("onComplete");
            window.setTimeout(function () {
                httpRequest.onreadystatechange = function () {
                };
                if (async) {
                    httpRequest = null
                }
            }, 0)
        }
    }

    for (key in options) {
        eventHandlers[key] = options[key]
    }
    try {
        httpRequest = getXMLHttpRequest();
        if (data) {
            url += (url.indexOf("?") >= 0 ? "&" : "?") + data;
            data = null
        }
        if (!cache) {
            url += (url.indexOf("?") >= 0 ? "&" : "?") + "q" + (+new Date) + "=Q"
        }
        httpRequest.open(method, url, async);
        if (async) {
            httpRequest.onreadystatechange = stateChangeHandler
        }
        for (key in defaultHeaders) {
            if (defaultHeaders.hasOwnProperty(key)) {
                httpRequest.setRequestHeader(key, defaultHeaders[key])
            }
        }
        callHandler("onBeforeSend");
        httpRequest.send(options.data);
        if (timeout) {
            timer = window.setTimeout(function () {
                callHandler("onTimeout")
            }, timeout)
        }
    } catch (ex) {
        callHandler("onError")
    }
    return httpRequest
};
var webkitVote = {countDownNum: 60, countDownId: null, newsId: null, init: function () {
    if (!voteConfig) {
        return
    }
    if (Q.webkit()) {
        this.loadData()
    }
}, loading: function () {
    this.clean();
    if (voteConfig.loading) {
        var a = Q(voteConfig.container);
        Q.addClass(a, "voteLoading")
    }
}, clean: function () {
    var a = Q(voteConfig.container);
    Q.removeClass(a, "voteLoading");
    Q.removeClass(a, "voteError");
    Q.addClass(a, "voteContainer");
    a.innerHTML = ""
}, showErrorMsg: function (b) {
    this.clean();
    var a = Q(voteConfig.container);
    Q.addClass(a, "voteError");
    a.innerHTML = '<a href="javascript:webkitVote.loadData();">&nbsp;</a>'
}, loadData: function () {
    var a = this;
    if (!voteConfig.voteUrl) {
        return
    }
    if (voteConfig.newsId) {
        webkitVote.newsId = voteConfig.newsId.substring(0, voteConfig.newsId.length - 2)
    }
    this.loading();
    Q.loadJs({src: voteConfig.voteUrl, callback: function () {
        try {
            if (typeof getVoteInfo != "undefined") {
                a.clean();
                a.setCountDownNum();
                a.render();
                a.bindEvent();
                a.setCountDown();
                a.showhints()
            }
        } catch (b) {
            a.showErrorMsg()
        }
    }})
}, bindEvent: function () {
    if (!voteConfig.container) {
        return
    }
    var b = Q(voteConfig.container);
    if (Q.android() || Q.ipad() || Q.iphone()) {
        Q.tap(b, this.clickHandle);
        Q.on(b, "touchstart", this.mouseOverHandle);
        Q.on(b, "touchend", this.mouseOutHandle);
        Q.on(b, "touchmove", this.mouseOutHandle);
        Q.on(window, "orientationchange", this.orientationChangehandle)
    } else {
        Q.on(b, "click", this.clickHandle);
        Q.on(b, "mouseover", this.mouseOverHandle);
        Q.on(b, "mouseout", this.mouseOutHandle)
    }
    var a = document.querySelector(".submitBtn");
    if (a != null) {
        if (Q.android() || Q.ipad() || Q.iphone()) {
            Q.tap(a, webkitVote.submitClick)
        } else {
            Q.on(a, "click", webkitVote.submitClick)
        }
    }
}, mouseOverHandle: function (c) {
    var b = c.target;
    if (b.tagName.toLowerCase() == "p") {
        var a = b.parentNode;
        Q.addClass(a, "heightLight")
    }
}, mouseOutHandle: function (c) {
    var b = c.target;
    if (b.tagName.toLowerCase() == "p") {
        var a = b.parentNode;
        Q.removeClass(a, "heightLight")
    }
}, orientationChangehandle: function (b) {
    var a = document.getElementsByClassName("submitBtnDiv")[0];
    if (a) {
        Q.removeClass(a, "submitBtnDiv");
        setTimeout(function () {
            Q.addClass(a, "submitBtnDiv")
        }, 1000)
    }
}, clickHandle: function (d) {
    var c = d.target;
    var a = c.nodeType;
    var b;
    if (a === 3) {
        b = c.parentNode
    } else {
        b = c
    }
    if (b.tagName.toLowerCase() == "p") {
        Q.preventDefault(d);
        if (webkitVote.countDownNum >= 0) {
            if (Q.hasClass(b, "clickVote")) {
                Q.removeClass(b, "clickVote");
                Q.addClass(b, "clickChecked");
                webkitVote.submitVote()
            }
            if (Q.hasClass(b, "checkbox") || Q.hasClass(b, "checkboxChecked")) {
                webkitVote.checkboxSelect(b)
            }
            if (Q.hasClass(b, "radio") || Q.hasClass(b, "radioChecked")) {
                webkitVote.radioSelect(b)
            }
            if (Q.hasClass(b, "viewResult")) {
                webkitVote.renderResult()
            }
            if (Q.hasClass(b, "gotoVoteBtn")) {
                webkitVote.renderList()
            }
        }
    } else {
        if (b.id == "countdownDiv" || b.id == "countdownSpan") {
            webkitVote.countdownClick()
        }
    }
}, submitClick: function () {
    var g = document.querySelectorAll(".radioChecked");
    var r = webkitVote.getProject();
    var b = r.SUBPROJ;
    var t = 0, d = 0, q = b.length;
    for (var k = 0, a = g.length; k < a; k++) {
        var l = Q.parent(g[k], function (i) {
            return(i.tagName.toLowerCase() == "li") ? true : false
        });
        var f = Q.attr(l, "optionid");
        var p = f.split("_");
        for (var e = 0, c = b.length; e < c; e++) {
            if (b[e].ID == p[0]) {
                var o = b[e];
                for (var s in o) {
                    if (s.indexOf("OPTION") > -1) {
                        var h = o[s][0];
                        if (h.ID == p[1]) {
                            if (h.IS_RIGHT == 1) {
                                t++
                            } else {
                                d++
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    if (!voteConfig.answerUrl) {
        return false
    }
    webkitVote.submitVote();
    webkitVote.showResult(t, q);
    Q.loadJs({src: voteConfig.answerUrl + "?uin=" + Q.getQuery(window.location.href, "uin") + "&sid=" + Q.getQuery(window.location.href, "sid") + "&newsid=" + webkitVote.newsId + "&qcount=" + q + "&rcount=" + t + "&wcount=" + (q - t) + "&otype=jsonp", callback: function () {
        try {
            if (typeof PubAnswer != "undefined") {
                if (PubAnswer.ret == 0) {
                    var m = new Date().getTime();
                    var i = "SUCCESS_" + webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
                    Q.setData(i, m);
                    webkitVote.sendBoss("aiAnswerSubmit")
                } else {
                    webkitVote.showTips("鎻愪氦鍑洪敊锛岃鎵嬪姩鎻愪氦")
                }
            }
        } catch (j) {
            webkitVote.showTips("鎻愪氦鍑洪敊锛岃閲嶆柊鎻愪氦");
            console.log("error")
        }
    }})
}, submitVote: function () {
    var a = Q(voteConfig.container);
    var p = a.querySelectorAll(".voteList");
    var e = new Date().getTime();
    var b = [];
    for (var h = 0, c = p.length; h < c; h++) {
        var k = p[h];
        var q = Boolean(Number(Q.attr(k, "need")));
        var g = k.querySelectorAll(".checkboxChecked, .radioChecked, .clickChecked");
        for (var f = 0, d = g.length; f < d; f++) {
            var l = g[f].parentNode;
            var r = Q.attr(l, "optionid");
            var t = r.split("_");
            b.push("sbj_" + t[0] + "[]:" + t[1])
        }
    }
    var o = webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    Q.setData(o, e);
    b.push("PjtID:" + o);
    webkitVote.renderResult(false, true);
    if (webkitVote.postData) {
        webkitVote.postData(b)
    } else {
        webkitVote.postVote(b)
    }
}, postVote: function (a) {
    return;
    var d = Q(this.iframeId);
    if (!d) {
        d = this.createIframe()
    }
    if (!d) {
        return
    }
    var g = Q(this.formId);
    if (!g) {
        g = this.createSubmitForm()
    }
    this.createNewFormElement(g, "result", "1");
    this.createNewFormElement(g, "fmt", "json");
    for (var c = 0, f = a.length; c < f; c++) {
        var e = a[c].split(":");
        this.createNewFormElement(g, e[0], e[1])
    }
    var b = voteConfig.submitUrl;
    Q.attr(g, "action", b);
    g.submit()
}, iframeId: "AjaxFrame", formId: "AjaxForm", createIframe: function () {
    var a = Q.tag("iframe", {id: this.iframeId, style: "display:none", src: "about:blank"});
    document.body.appendChild(a);
    return a
}, createSubmitForm: function () {
    var a = Q.tag("FORM", {id: this.formId, target: this.iframeId});
    document.body.appendChild(a);
    a.method = "POST";
    return a
}, createNewFormElement: function (b, a, c) {
    var d = Q.tag("input", {name: a, type: "hidden"});
    b.appendChild(d);
    d.value = c;
    return d
}, checkboxSelect: function (e) {
    var a = Q.parent(e, function (g) {
        return Q.hasClass(g, "voteList") ? true : false
    });
    var b = Q.hasClass(e, "checkbox") ? true : false;
    var d = Number(Q.attr(a, "max"));
    var c = a.querySelectorAll(".checkboxChecked");
    var f = c.length;
    if (f == d && b && d > 0) {
        this.showTips("鏈鏈€澶氬彲閫夋嫨" + d + "涓€夐」");
        return
    }
    if (b) {
        Q.addClass(e, "checkboxChecked");
        Q.removeClass(e, "checkbox")
    } else {
        Q.removeClass(e, "checkboxChecked");
        Q.addClass(e, "checkbox")
    }
}, radioSelect: function (j) {
    var d = webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    if (Q.getData(d)) {
        webkitVote.showTips("宸茶秴鏃讹紝鏃犳硶淇敼閫夐」");
        return
    }
    var l = Q.hasClass(j, "radio") ? true : false;
    var h = Q.parent(j, function (i) {
        return(i.tagName.toLowerCase() == "ul") ? true : false
    });
    var k = h.querySelectorAll("p");
    var b = k.length;
    for (var f = 0; f < b; f++) {
        var g = k[f];
        Q.removeClass(g, "radioChecked");
        Q.addClass(g, "radio");
        var a = Q.parent(g, function (i) {
            return(i.tagName.toLowerCase() == "li") ? true : false
        });
        var e = Q.attr(a, "optionMark");
        Q.delData(e)
    }
    if (l) {
        Q.removeClass(j, "radio");
        Q.addClass(j, "radioChecked");
        var c = new Date().getTime();
        var a = Q.parent(j, function (i) {
            return(i.tagName.toLowerCase() == "li") ? true : false
        });
        var e = Q.attr(a, "optionMark");
        Q.setData(e, c)
    }
}, countdownClick: function () {
    var e = Q("countdownDiv");
    var a = document.querySelector(".submitBtnDiv");
    var b = e.getBoundingClientRect().top;
    var c = a.getBoundingClientRect().top;
    var d = b - c;
    if (d < 40 && d > -16) {
        webkitVote.submitClick()
    }
}, getProject: function () {
    var a = getVoteInfo.INFO.PROJECT[0];
    return a
}, render: function () {
    var i = this.getProject();
    var b = i.SUBPROJ[0];
    var a = "SUCCESS_" + webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    var f = Q.getData(a);
    var c = new Date(i.SERVER_TIME).getTime();
    var g = new Date(i.END_TIME).getTime();
    var d = new Date(i.BEGIN_TIME).getTime();
    var h = 0;
    for (var j in b) {
        if (j.indexOf("OPTION") > -1) {
            var e = b[j][0];
            h = h + Number(e.OP_COUNT)
        }
    }
    i.VOTE_TOTAL = h;
    if (c > g) {
        this.renderResult(true)
    } else {
        if (f) {
            this.renderResult(false, f)
        } else {
            this.renderList()
        }
    }
}, renderResult: function (k, C) {
    var c = this.getProject();
    var l = c.SUBPROJ;
    var o = [];
    o.push('<div class="voteBox voteAfter">');
    o.push('	<div class="voteIcon"> ');
    o.push("鐖辩瓟棰�");
    o.push("	</div>");
    var g = c.VOTE_TOTAL;
    if (C) {
        g = Number(c.VOTE_TOTAL) + 1
    }
    var s = voteConfig.subStr && Number(voteConfig.subStr) > 0;
    for (var y = 0, u = l.length; y < u; y++) {
        var z = l[y];
        var G = Number(z.ALLVOTES);
        var r = Boolean(Number(z.IS_NEED));
        var x = Number(z.SELECT_MAX);
        var e = Number(z.SBJ_TYPE);
        var E = z.VOTE_TYPE && Boolean(Number(z.VOTE_TYPE)) ? "1" : "0";
        if (y == u - 1) {
            o.push('<div class="voteList lastList">')
        } else {
            o.push('<div class="voteList">')
        }
        o.push('	  <div class="voteTitle">');
        if (u > 1) {
            o.push("<strong>" + Number(y + 1) + ".</strong>")
        }
        o.push(z.SBJ_TITLE);
        o.push("	  </div>");
        if (!E) {
            if (e == "1") {
                if (x > 1) {
                    o.push('	  <div class="voteTips">');
                    o.push("		(蹇呴€夊閫夐锛屾渶澶氬彲閫�" + x + "椤�)");
                    o.push("	  </div>")
                }
            } else {
                if (e == "0") {
                    if (u > 1) {
                        o.push('	  <div class="voteTips">');
                        o.push("		(蹇呴€夊崟閫夐)");
                        o.push("	  </div>")
                    }
                }
            }
        }
        var A = z.ID;
        var D = 0;
        for (var F in z) {
            if (F.indexOf("OPTION") > -1) {
                var q = z[F][0];
                q.OP_COUNT = 0;
                z.ALLVOTES = 0;
                var f = webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin") + "_" + q.ID;
                if (Q.getData(f) && C) {
                    z.ALLVOTES = Number(z.ALLVOTES) + 1;
                    z[F][0].OP_COUNT = Number(q.OP_COUNT) + 1;
                    z[F][0].voted = true
                }
                D++
            }
        }
        o.push("<ul>");
        var t = 0, w = 0;
        for (var F in z) {
            if (F.indexOf("OPTION") > -1) {
                var q = z[F][0];
                var m = Number(z.ALLVOTES);
                z.ALLVOTES = m == 0 ? "1" : m;
                if (w == D - 1) {
                    var b = 100 - t
                } else {
                    var b = Math.round(Number(q.OP_COUNT) / Number(z.ALLVOTES) * 100);
                    t = t + b
                }
                if (Number(q.OP_COUNT) == 0) {
                    b = 0
                }
                var d = Number(w % 6);
                var a = q.IS_RIGHT && Boolean(Number(q.IS_RIGHT)) ? "1" : "0";
                var v = z.VOTE_TYPE && Boolean(Number(z.VOTE_TYPE)) ? "1" : "0";
                var h = F.match(/\d+?$/gi)[0];
                var B = (h < 9) ? "0" + (Number(h) + 1) : Number(h) + 1;
                if (q.voted) {
                    o.push('<li class="voting"  r="' + a + '" vt="' + v + '">')
                } else {
                    o.push('<li r="' + a + '" vt="' + v + '">')
                }
                o.push('<div class="item">');
                o.push("<strong>" + B + "</strong> ");
                if (s) {
                    o.push(Q.subString(q.OP_TITLE, voteConfig.subStr))
                } else {
                    o.push(q.OP_TITLE)
                }
                o.push("</div>");
                o.push('<div class="animateItem">');
                o.push('<div class="listItem" style="width:' + b + '%">');
                o.push('    <span class="style' + d + '"><em>' + b + "%</em></span>");
                o.push("</div>");
                o.push("</div>");
                o.push("</li>");
                w++
            }
        }
        o.push("	  </ul>");
        o.push("</div>")
    }
    if (u > 1 || (e == 1 && u == 1)) {
        if (C) {
            o.push('<p class="submitCompleteBtn">鎰熻阿鎮ㄧ殑鍙備笌</p>')
        } else {
            o.push('<p class="submitCompleteBtn" style="visibility:hidden">鎰熻阿鎮ㄧ殑鍙備笌</p>')
        }
    }
    o.push("  </div>");
    Q(voteConfig.container).innerHTML = o.join("");
    this.voteAnimation()
}, renderList: function () {
    var p = this.getProject();
    var c = p.SUBPROJ;
    var k = [];
    k.push('<div class="voteBox voteBefore">');
    k.push('	<div class="voteIcon"> ');
    k.push("鐖辩瓟棰�");
    k.push("	</div>");
    var s = voteConfig.subStr && Number(voteConfig.subStr) > 0;
    for (var h = 0, b = c.length; h < b; h++) {
        var m = c[h];
        var f = Boolean(Number(m.IS_NEED));
        var a = Number(m.SELECT_MAX);
        var o = Number(m.SBJ_TYPE);
        var l = m.VOTE_TYPE && Boolean(Number(m.VOTE_TYPE)) ? "1" : "0";
        if (h == b - 1) {
            k.push('<div class="voteList lastList" max="' + a + '" need="' + m.IS_NEED + '" projectid="' + p.ID + '">')
        } else {
            k.push('<div class="voteList" max="' + a + '" need="' + m.IS_NEED + '" projectid="' + p.ID + '">')
        }
        k.push('	  <div class="voteTitle">');
        if (b > 1) {
            k.push("<strong>" + Number(h + 1) + ".</strong>")
        }
        k.push(m.SBJ_TITLE);
        k.push("	  </div>");
        if (!l) {
            if (o == "1") {
                if (a > 1) {
                    k.push('	  <div class="voteTips">');
                    k.push("		(蹇呴€夊閫夐锛屾渶澶氬彲閫�" + a + "椤�)");
                    k.push("	  </div>")
                }
            } else {
                if (o == "0") {
                    if (b > 1) {
                        k.push('	  <div class="voteTips">');
                        k.push("		(蹇呴€夊崟閫夐)");
                        k.push("	  </div>")
                    }
                }
            }
        }
        k.push('	  <ul class="listBtn">');
        for (var r in m) {
            if (r.indexOf("OPTION") > -1) {
                var g = m[r][0];
                var j = r.match(/\d+?$/gi)[0];
                var q = (j < 10) ? "0" + (Number(j) + 1) : Number(j) + 1;
                var d = m.ID + "_" + g.ID;
                var e = webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin") + "_" + g.ID;
                k.push('<li optionid="' + d + '" optionMark = "' + e + '">');
                if (b > 1 || (o == 1 && b == 1)) {
                    if (o == 0) {
                        if (Q.getData(e)) {
                            k.push('<h5></h5><p class="radioChecked">')
                        } else {
                            k.push('<h5></h5><p class="radio">')
                        }
                    } else {
                        k.push('<h5></h5><p class="checkbox">')
                    }
                } else {
                    k.push('<h5></h5><p class="radio">')
                }
                k.push("<strong>" + q + "</strong> ");
                if (s) {
                    k.push(Q.subString(g.OP_TITLE, voteConfig.subStr))
                } else {
                    k.push(g.OP_TITLE)
                }
                k.push("</p>");
                k.push("</li>")
            }
        }
        k.push("	  </ul>");
        k.push("  </div>")
    }
    if (Q.getQuery(window.location.href, "uin") != null) {
        k.push('<div class="submitBtnDiv">');
        k.push('<p class="submitBtn">鎻愪氦</p>');
        k.push("</div>");
        k.push('<div id="countdownDiv"><span id="countdownSpan"></span></div>')
    } else {
        if (Q.getQuery(window.location.href, "sid") != null) {
            k.push('<div class="submitBtnDiv">');
            k.push('<p class="disSubmitBtn">鍗囩骇QQ鑷虫渶鏂扮増鍙備笌鐖辩瓟棰�</p>');
            k.push("</div>")
        }
    }
    k.push("  </div>");
    Q(voteConfig.container).innerHTML = k.join("")
}, voteAnimation: function () {
    var a = Q(voteConfig.container);
    var b = a.querySelectorAll("span");
    for (var c = 0, f = b.length; c < f; c++) {
        var d = b[c];
        var e = Q.parent(d, function (g) {
            return(g.tagName.toLowerCase() == "li") ? true : false
        });
        this.votePlay(e)
    }
}, animationEnd: function (a) {
    var f = a.target;
    var d = Q.parent(f, function (i) {
        return(i.tagName.toLowerCase() == "li") ? true : false
    });
    var m = Q.parent(d, function (i) {
        return(i.tagName.toLowerCase() == "ul") ? true : false
    });
    var k = false;
    var o = m.querySelectorAll("li");
    for (var e = 0, c = o.length; e < c; e++) {
        if (Q.hasClass(o[e], "voting")) {
            k = true;
            break
        }
    }
    var l = Boolean(Number(d.getAttribute("vt")));
    var g = Q.hasClass(d, "voting");
    if (l) {
        if (k) {
            var j = Boolean(Number(d.getAttribute("r")));
            if (j) {
                if (g) {
                    Q.addClass(d, "rightChecked")
                } else {
                    var h = d.parentNode;
                    Q.addClass(d, "successChecked")
                }
            } else {
                if (g) {
                    Q.addClass(d, "wrongChecked")
                }
            }
        } else {
            Q.addClass(d, "dontChecked")
        }
    } else {
        if (g) {
            Q.addClass(d, "voted")
        }
    }
    var b = webkitVote.whichAnimationEvent();
    f.removeEventListener(b, webkitVote.transEnd)
}, whichAnimationEvent: function () {
    var a;
    var b = Q(voteConfig.container);
    var c = {animation: "animationEnd", WebkitAnimation: "webkitAnimationEnd"};
    for (a in c) {
        if (b.style[a] !== undefined) {
            return c[a]
        }
    }
}, votePlay: function (d) {
    var c = d.getElementsByTagName("span");
    if (c && c[0]) {
        var b = c[0];
        Q.addClass(b, "animate");
        var a = this.whichAnimationEvent();
        b.addEventListener(a, webkitVote.animationEnd, false)
    }
}, createTips: function () {
    var a = Q.tag("div", {id: "AlertTips"});
    a.className = "alertTips";
    document.body.appendChild(a);
    return a
}, tipTimer: null, alertEnd: function () {
    var a = Q("AlertTips");
    if (a) {
        a.style.display = "none";
        Q.removeClass(a, "alertAnimation")
    }
}, showTips: function (c) {
    var f = this;
    var d = Q("AlertTips");
    if (!d) {
        d = this.createTips()
    }
    d.innerHTML = "<p>" + c + "</p>";
    d.style.display = "block";
    d.style.width = "";
    var j = d.offsetHeight;
    var a = d.offsetWidth;
    var g = document;
    var i = g.documentElement.clientWidth;
    var e = Number(g.documentElement.clientHeight);
    var b = Number(g.body.scrollTop);
    d.style.left = (i / 2 - a / 2) + "px";
    d.style.top = (b + e / 2 - j / 2) + "px";
    d.style.width = a + "px";
    setTimeout(function () {
        d.style.display = "none"
    }, 3000)
}, hideTips: function () {
    var a = Q("AlertTips");
    Q.css(a, "visibility", "hidden")
}, setCountDown: function () {
    var a = document.querySelector(".submitBtn");
    var c = Q("countdownSpan");
    var b = webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    var d = "SUCCESS_" + webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    if (a) {
        if (Q.getData(b) && !Q.getData(d)) {
            c.style.display = "none";
            return
        }
        if (this.countDownNum > 0) {
            this.countDownNum -= 1;
            Q.setData(this.countDownId, this.countDownNum);
            c.innerHTML = this.countDownNum + "绉�";
            setTimeout(function () {
                webkitVote.setCountDown()
            }, 1000)
        } else {
            if (this.countDownNum == 0) {
                c.style.display = "none";
                webkitVote.submitClick();
                this.countDownNum -= 1;
                Q.setData(this.countDownId, this.countDownNum)
            }
        }
    }
}, setCountDownNum: function () {
    if (Q.getQuery(window.location.href, "uin") == null) {
        return
    }
    var a = this.getProject();
    this.countDownId = "countDown_" + webkitVote.newsId + "_" + Q.getQuery(window.location.href, "uin");
    this.countDownNum = Q.getData(this.countDownId);
    if (this.countDownNum == null) {
        Q.setData(this.countDownId, voteConfig.timeLimit);
        this.countDownNum = voteConfig.timeLimit
    }
}, sendBoss: function (c) {
    var b = document.location.href;
    var d = [];
    d.push("uin=" + Q.getQuery(window.location.href, "uin"));
    d.push("newsid=" + voteConfig.newsId);
    if (c) {
        d.push("sOp=" + c)
    }
    var a = new Image();
    a.onload = function () {
    };
    a.src = "http://btrace.qq.com/collect?" + d.join("&")
}, showResult: function (j, f) {
    var e = this;
    var c = Q("AlertTips");
    if (!c) {
        c = this.createTips()
    }
  //  c.innerHTML = '<p class="answerResult">绛斿锛�' + j + '</p><p class="answerResult">绛旈敊锛�' + (f - j) + "</p>";
    c.style.display = "block";
    c.style.width = "";
    var k = c.offsetHeight;
    var a = c.offsetWidth;
    var g = document;
    var i = g.documentElement.clientWidth;
    var d = Number(g.documentElement.clientHeight);
    var b = Number(g.body.scrollTop);
    c.style.left = (i / 2 - a / 2) + "px";
    c.style.top = (b + d / 2 - k / 2) + "px";
    c.style.width = a + "px";
    setTimeout(function () {
        c.style.display = "none"
    }, 3000)
}, showhints: function () {
    var b = this.getProject().SUBPROJ.length;
    var a = Q("answerHint");
   //a.innerHTML = "鏈绛旈鍏�<span>" + b + "</span>閬擄紝璇峰湪<span>" + voteConfig.timeLimit + "</span>绉掑唴瀹屾垚绛旈锛屽惁鍒欑郴缁熷皢浼氳嚜鍔ㄦ彁浜ゃ€�"
}, };
/*  |xGv00|c1781af59764e1096d51c065fd465de7 */