!function () {
    function a() {
        return b(location.search, "?", "&")
    }

    function b(a, b, c) {
        var f, g, h, d = a.replace(b, "").split(c), e = {};
        for (f = 0, g = d.length; g > f; f++)h = d[f].split("="), e[h[0]] = h[1];
        return e
    }

    window.shaketv || (window.shaketv = {}), shaketv.wxShare = function (b, c, d, e) {
        function f() {
            var f, g;
            return e || (-1 == window.location.href.indexOf(".qq.com") ? e = window.location.href : (f = a(), e = "http://yao.qq.com/tv/entry?redirect_uri={#r#}&cb41faa22e731e9b={#cb41faa22e731e9b#}", e = e.replace("{#r#}", encodeURIComponent(window.location.href)).replace("{#cb41faa22e731e9b#}", f["cb41faa22e731e9b"]))), b || (g = document.getElementsByTagName("IMG"), g.length && (b = encodeURIComponent(g[0].src))), {
                img_url: b,
                link: e,
                desc: d,
                title: c
            }
        }

        var g = function () {
            WeixinJSBridge.on("menu:share:appmessage", function () {
                WeixinJSBridge.invoke("sendAppMessage", f(), function () {
                })
            }), WeixinJSBridge.on("menu:share:timeline", function () {
                WeixinJSBridge.invoke("shareTimeline", f(), function () {
                })
            }), WeixinJSBridge.on("menu:share:weibo", function () {
                var a = f();
                a = {
                    url: a.link,
                    content: "【" + a.title + "】" + " " + a.desc + " " + a.link,
                    img_url: a.img_url
                }, WeixinJSBridge.invoke("shareWeibo", a, function () {
                })
            }), WeixinJSBridge.on("menu:share:facebook", f(), function () {
            })
        };
        window.WeixinJSBridge ? g() : document.addEventListener("WeixinJSBridgeReady", g, !1)
    }
}();