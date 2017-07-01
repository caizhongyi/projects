(function(){function m(e,b,f,g){b.split(" ").forEach(function(b){e.addEventListener(b,f,g||!1)})}function C(e,b,f,g){b.split(" ").forEach(function(b){e.removeEventListener(b,f,g||!1)})}function M(){function e(){n=0;Z=K;D=N;x=M;O=Y;q.text=p.text=r=0;q.x=p.x=400;$=Date.now()/1E3 | 0;
window.removeEventListener("resize", f, !1);
s.style.display = "none";
B()
}

function b() {
	y = Math.min(innerWidth / 640, innerHeight / 960);
	P = 640 * y | 0;
	Q = 960 * y | 0;
	R = (innerHeight - Q) / 2 | 0;
	S = (innerWidth - P) / 2 | 0;
	var d = E.style,
		c = {
			width: P + "px",
			height: Q +
				"px",
			left: S + "px",
			top: R + "px"
		},
		a;
	for (a in c) c.hasOwnProperty(a) && (d[a] = c[a])
}

function f() {
	var d = 640 / 960 * innerHeight | 0;
	s.style.width = d + "px";
	s.style.left = ((innerWidth - d) / 2 | 0) + "px";
	aa.style.fontSize = (34 / 960 * innerHeight | 0) + "px"
}

function g() {
	function d(a) {
		a.stopPropagation();
		switch (a.target.getAttribute("data-action")) {
			case "retry":
				C(s, "click", d);
				e();
				_hmt.push(["_trackEvent", "button", "gameReStart"]);
				break;
			case "share":
				F.style.display = "block", m(F, "click", function fa() {
					C(F, "click", fa);
					F.style.display = "none"
				}),
				_hmt.push(["_trackEvent", "button", "share"])
		}
	}
	f();
	window.addEventListener("resize", f, !1);
	k = 100 * (r / 80);
	k = isNaN(k) ? 0.1 : Math.max(0.1, Math.min(99.9, k));
	k = k.toFixed(1);
	for (var c = n, a = T.length - 1; - 1 < a; --a) {
		var ba = T[a],
			c = c - ba[0] * n;
		if (r >= c) {
			ca = ba[1];
			break
		}
	}
	aa.innerHTML = '我泼了男人袜陈老板 <span style="color:#f00;font-size:1.5em">' + r + "</span> 桶冰水，超过了" + k + "%的挑战者哦！<br /><span style='color:red'>" + ca + '</span><br />';
	da(r);
	s.style.display = "block";
	m(s, "click", d)
}

function L(d) {
	var c = new createjs.Bitmap(ga);
	c.x = d.x - ha / 2 - 13;
	c.y = d.y - ea - 14;
	l.addChild(c);
	var a = new createjs.Bitmap(ia);
	return {
		full: function() {
			var c = a.getBounds();
			a.x = d.x - c.width / 2 - 10;
			a.y = d.y - ea + 34;
			l.addChild(a)
		},
		clean: function() {
			l.removeChild(c);
			l.removeChild(a)
		}
	}
}

function z(d) {
	function c(a, d, e, t, b) {
		0 >= e ? b() : (--e, G.get(a).to({
			x: d
		}, t).to({
			x: d
		}, t).call(function() {
			c(a, d, e, t, b)
		}))
	}
	var a = d.person;
	if (!a || a.y > u - 10) return !1;
	d.hit = !0;
	++r;
	q.text = p.text = r;
	q.x = p.x =
		480 - p.getBounds().width;
	var e = d.y + a.y;
	G.removeTweens(a);
	var t = L({
		x: d._x,
		y: e
	});
	c(a, 5, 1, x / 8, function() {
		a.visible = !1;
		var e = h.getResult(a.wetId),
			b = new createjs.Bitmap(e);
		b.x = 0;
		b.y = a.y;
		d.addChild(b);
		t.full();
		c(b, 3, 2, x / 8, function() {
			setTimeout(function() {
				t.clean();
				G.get(b).to({
					y: u,
					x: 0
				}, O).call(function() {
					d.person = null;
					d.removeChild(a);
					d.removeChild(b);
					a.x = 0;
					a.y = u;
					d.shown = !1;
					d.hit = !1
				})
			}, x / 8)
		})
	});
	return !0
}

function ja() {
	for (var d = [], c = v.length - 1; - 1 < c; --c) {
		var a = v[c];
		a.shown || a.hit || d.push(a)
	}
	return d
}

function ka(d,
	c) {
	for (var a = d.slice(), e = Math.min(a.length, c), b = [], f = 0; f < e; ++f) {
		var g = a.length * Math.random() | 0;
		b.push(a[g]);
		a.splice(g, 1)
	}
	return b
}

function la() {
	var d = "person-" + U[U.length * Math.random() | 0],
		c = h.getResult(d),
		c = new createjs.Bitmap(c);
	c.wetId = d + "-wet";
	c.x = 0;
	c.y = u;
	return c
}

function w(d) {
	var c = ja();
	0 < c.length && c.length > v.length / 2 && (d = ka(c, d), n += d.length, d.forEach(function(a, d) {
		a.shown = !0;
		var c = a.person = la();
		a.addChild(c);
		G.get(c).wait(100 * d).to({
			y: 0
		}, Z).wait(x).to({
			y: u
		}, O).call(function() {
			a.person = null;
			a.removeChild(c);
			a.shown = !1
		})
	}))
}

function B() {
	var d = $ + V - (Date.now() / 1E3 | 0);
	0 >= d ? (A.text = '0"', setTimeout(g, 2E3)) : (10 >= d ? (D = 0.6 * N, w(2)) : (D = (0.5 + 0.5 * d / V) * N, w(1)), A.text = d + '"', setTimeout(B, D))
}
var E = document.getElementById("canvas"),
	l = new createjs.Stage(E),
	G = createjs.Tween,
	H = createjs.Ticker;
H.setFPS(30);
H.addEventListener("tick", l);
var v = [],
	u = 174,
	J = [516, 671, 835],
	H = [].concat.apply([], [118, 330, 538].map(function(d) {
		return J.map(function(c) {
			return [d, c]
		})
	})),
	K = 300,
	N = 600,
	M = 300,
	Y = 300,
	Z, D, x, O, r, V = 30,
	$, W = new createjs.Bitmap(h.getResult("bg"));
W.x = 0;
W.y = 0;
l.addChild(W);
var A = new createjs.Text(V + '"', "72px Arial", "#fff");
A.x = 130;
A.y = 28;
l.addChild(A);
var p = new createjs.Text(0, "148px Arial", "#fff"),
	q = new createjs.Text(0, "148px Arial", "#253574");
q.x = p.x = 400;
q.y = p.y = 28;
p.outline = 6;
l.addChild(p);
l.addChild(q);
var s = document.getElementById("board"),
	aa = document.getElementById("board-text"),
	P, Q, R, S, y;
b();
window.addEventListener("resize", b, !1);
var F = document.getElementById("share-tip");
(new Image).src = "files/share_tip.png?1408476074";
var ha = 114,
	ea =
	152,
	ga = h.getResult("bucket"),
	ia = h.getResult("water"),
	X = ["touchstart", "mousedown"],
	I;
m(E, X.join(" "), function c(a) {
	if (void 0 === I) {
		I = a.type;
		for (var e = X.length - 1; - 1 < e; --e) {
			var b = X[e];
			b !== I && C(E, b, c)
		}
	} else if (I !== a.type) return;
	a.stopPropagation();
	b = a.touches ? a.touches[0].pageX : a.pageX;
	a = a.touches ? a.touches[0].pageY : a.pageY;
	b = (b - S) / y | 0;
	a = (a - R) / y | 0;
	for (e = v.length - 1; - 1 < e; --e) {
		var f = v[e];
		if (!f.hit && f.shown) {
			var g = f.x,
				l = f.y;
			if (b >= g && (b <= g + 200 && a >= l && a <= l + 180) && z(f)) break
		}
	}
});
H.forEach(function(c) {
	var a = new createjs.Container,
		e = c[0];
	c = c[1];
	a._x = e;
	a._y = c;
	a.x = e - 71;
	a.y = c - u;
	var b = new createjs.Shape;
	b.setBounds(0, 0, 200, 200);
	b.graphics.drawCircle(100, 100, 100);
	b.x = e - 100;
	b.y = c - 200;
	a.mask = b;
	l.addChild(a);
	v.push(a)
});
e()
}

function da(e) {
	var b = "http://www.nanrenwa.com/game/4/4.php?f=wx&t=" + ((new Date).getTime() / 2E3 | 0);
	B("http://www.nanrenwa.com/game/4/files/bucket.png", b, "我泼了男人袜陈老板" + (typeof e == 'undefined' ? 0 : e) + "桶冰水,超过了" + k + "%人，快来挑战我!",
		"冰桶挑战：你想泼别人家的老板嘛，快来挑战我！", "http://wap.koudaitong.com/v2/showcase/homepage?alias=qwydf0")
}
var B;
! function() {
	var e = "",
		b = "",
		f = "",
		g = "",
		k = "";
	B = function(z, h, m, n, w) {
		"" != z && null != z ? e = z : "";
		"" != h && null != h ? b = h : "";
		"" != m && null != m ? f = m : "";
		"" != n && null != n ? g = n : "";
		"" != w && null != w ? k = w : ""
	};
	document.addEventListener("WeixinJSBridgeReady", function() {
		WeixinJSBridge.on("menu:share:appmessage", function(h) {
			WeixinJSBridge.invoke("sendAppMessage", {
				img_url: e,
				link: b,
				desc: g,
				title: f
			}, function(b) {
				document.location.href = k
			})
		});
		WeixinJSBridge.on("menu:share:timeline", function(h) {
			WeixinJSBridge.invoke("shareTimeline", {
				img_url: e,
				img_width: "300",
				img_height: "300",
				link: b,
				desc: g,
				title: f
			}, function(b) {
				document.location.href = k
			})
		});
		WeixinJSBridge.on("menu:share:weibo", function(e) {
			WeixinJSBridge.invoke("shareWeibo", {
				content: g,
				url: b
			}, function(b) {
				document.location.href = k
			})
		})
	}, !1)
}();
var Y = document.getElementById("loading"),
	J = document.getElementById("loading-progress");
J.innerHTML = "10";
var U = ["lj", "fs", "ldh"],
	K = [{
		src: "bg.png?1408476074",
		id: "bg"
	}, {
		src: "bucket.png?1408476074",
		id: "bucket"
	}, {
		src: "water-full.png?1408476074",
		id: "water"
	}];
U.forEach(function(e) {
	K.push({
		src: "person-" + e + ".png?1408476074",
		id: "person-" + e
	}, {
		src: "person-" + e + "-wet.png?1408476074",
		id: "person-" + e + "-wet"
	})
});
var h = new createjs.LoadQueue(!1, "files/");
h.loadManifest(K);
h.on("progress", function(e) {
	J.innerHTML = (100 * e.progress).toFixed(2)
});
m(document, "touchmove", function(e) {
	e.preventDefault();
	e.stopPropagation()
});
var k = 0.1,
	n = 0,
	T = [
		[0.1, "可是还不够解气呀，他的内裤都没湿呢，再来！"],
		[0.2, "哼，这是对陈伯乐卖袜子不送妹子的惩罚！我都当真了好不好！"],
		[0.3, "是不是很冰爽呀，伯乐，你要大声叫出来嘛！"],
		[0.3, "哈哈哈哈哈哈，随便欺负别人家的老板，这种感觉真好呢！"],
		[0.1, "浇了这么桶冰水，陈伯乐，我就不信你以后还能晨勃了"]
	],
	ca = T[0][1];
h.on("complete", function() {
	var e = document.getElementById("start"),
		b = document.getElementById("start-btn"),
		f = !1;
	m(b, "click", function L(h) {
		h.preventDefault();
		C(b, "click", L);
		e.style.display = "none";
		f || (f = !0, M(), _hmt.push(["_trackEvent", "button", "gameStart"]))
	});
	Y.style.display = "none"
});
da()
})();