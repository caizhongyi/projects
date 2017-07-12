(function (a) {
    a.fn.textarea = function (c) {
        var d = a.extend(true, {}, {maxheight: 150, minheight: 50}, c);
        var b = {max: a(this).css("maxheight") || c.maxheight, min: a(this).css("minheight") || c.minheight};
        a(this).data("height", b).on({focus: function () {
            a(this).stop().animate({height: a(this).data("height").max})
        }, blur: function () {
            if (a(this).val() == "") {
                a(this).stop().animate({height: a(this).data("height").min})
            }
        }})
    }
})(jQuery);
(function (g) {
    var c, a, f = {center: "center", left: "left", right: "right"}, e = {auto: "auto"};

    function b(h) {
        this.$element = g(h);
        this.original_text = this.$element.html();
        this.settings = g.extend({}, g.fn.trunk8.defaults)
    }

    b.prototype.updateSettings = function (h) {
        this.settings = g.extend(this.settings, h)
    };
    function d() {
        var n = this.data("trunk8"), l = n.settings, h = l.width, p = l.side, t = l.fill, s = a.getLineHeight(this) * l.lines, q = n.original_text, i = q.length, j = "", m, r, k, o;
        this.html(q);
        if (h === e.auto) {
            if (this.height() <= s) {
                return
            }
            m = 0;
            r = i - 1;
            while (m <= r) {
                k = m + ((r - m) >> 1);
                o = a.eatStr(q, p, i - k, t);
                this.html(o);
                if (this.height() > s) {
                    r = k - 1
                } else {
                    m = k + 1;
                    j = (j.length > o.length) ? j : o
                }
            }
            this.html("");
            this.html(j);
            if (l.tooltip) {
                this.attr("title", q)
            }
        } else {
            if (!isNaN(h)) {
                k = i - h;
                o = a.eatStr(q, p, k, t);
                this.html(o);
                if (l.tooltip) {
                    this.attr("title", q)
                }
            } else {
                g.error('Invalid width "' + h + '".')
            }
        }
    }

    c = {init: function (h) {
        return this.each(function () {
            var j = g(this), i = j.data("trunk8");
            if (!i) {
                j.data("trunk8", (i = new b(this)))
            }
            i.updateSettings(h);
            d.call(j)
        })
    }, update: function (h) {
        return this.each(function () {
            var i = g(this);
            if (h) {
                i.data("trunk8").original_text = h
            }
            d.call(i)
        })
    }, revert: function () {
        return this.each(function () {
            var h = g(this).data("trunk8").original_text;
            g(this).html(h)
        })
    }, getSettings: function () {
        return this.get(0).data("trunk8").settings
    }};
    a = {eatStr: function (o, k, j, n) {
        var m = o.length, i = a.eatStr.generateKey.apply(null, arguments), h, l;
        if (a.eatStr.cache[i]) {
            return a.eatStr.cache[i]
        }
        if ((typeof o !== "string") || (m === 0)) {
            g.error('Invalid source string "' + o + '".')
        }
        if ((j < 0) || (j > m)) {
            g.error('Invalid bite size "' + j + '".')
        } else {
            if (j === 0) {
                return o
            }
        }
        if (typeof(n + "") !== "string") {
            g.error("Fill unable to be converted to a string.")
        }
        switch (k) {
            case f.right:
                return a.eatStr.cache[i] = g.trim(o.substr(0, m - j)) + n;
            case f.left:
                return a.eatStr.cache[i] = n + g.trim(o.substr(j));
            case f.center:
                h = m >> 1;
                l = j >> 1;
                return a.eatStr.cache[i] = g.trim(a.eatStr(o.substr(0, m - h), f.right, j - l, "")) + n + g.trim(a.eatStr(o.substr(m - h), f.left, l, ""));
            default:
                g.error('Invalid side "' + k + '".')
        }
    }, getLineHeight: function (l) {
        var i = g(l), n = i.css("float"), h = i.css("position"), j = i.html(), k = "line-height-test", m;
        if (n !== "none") {
            i.css("float", "none")
        }
        if (h === "absolute") {
            i.css("position", "static")
        }
        i.html("i").wrap('<div id="' + k + '" />');
        m = g("#" + k).innerHeight();
        i.html(j).css({"float": n, position: h}).unwrap();
        return m
    }};
    a.eatStr.cache = {};
    a.eatStr.generateKey = function () {
        return Array.prototype.join.call(arguments, "")
    };
    g.fn.trunk8 = function (h) {
        if (c[h]) {
            return c[h].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof h === "object" || !h) {
                return c.init.apply(this, arguments)
            } else {
                g.error("Method " + h + " does not exist on jQuery.trunk8")
            }
        }
    };
    g.fn.trunk8.defaults = {fill: "&hellip;", lines: 1, side: f.right, tooltip: true, width: e.auto}
})(jQuery);
(function (b) {
    function a(e, d) {
        var c = parseInt(e.css(d));
        if (isNaN(c)) {
            return false
        }
        return c
    }

    Class.dragbox = Class.get({EVENT_DRAGGING: "ondragging", EVENT_BEFOREDRAG: "beforedrag", EVENT_AFTERDRAG: "afterdrag", initialize: function (c, d) {
        var e = this;
        this.opts = b.extend(true, {}, {context: b(window), handler: null}, d);
        this.$ = b(c);
        this.$handler = b(this.opts.handler).css({"-moz-user-select": "none", "-khtml-user-select": "none", "user-select": "none"});
        this.$context = b(this.opts.context);
        this.isInHandler = false;
        this.drag(this.$);
        return
    }, drag: function (g, c) {
        var f = this;
        var e = b.extend({zIndex: 20, opacity: 1, handler: this.opts.handler, context: this.opts.context, onMove: function () {
        }, onDrop: function () {
        }}, c);
        var d = {drag: function (i) {
            var h = i.data.dragData;
            var j = {left: h.left + i.pageX - h.offLeft, top: h.top + i.pageY - h.offTop};
            if (j.left < 0) {
                j.left = 0
            }
            if (j.top < 0) {
                j.top = 0
            }
            if (j.left + f.$.outerWidth() >= f.$context.width()) {
                j.left = f.$context.width() - f.$.outerWidth()
            }
            if (j.top + f.$.outerHeight() >= f.$context.height()) {
                j.top = f.$context.outerHeight() - f.$.outerHeight()
            }
            h.target.css({left: j.left, top: j.top});
            h.handler.css({cursor: "move"});
            h.onMove(i)
        }, drop: function (i) {
            var h = i.data.dragData;
            h.target.css(h.oldCss);
            h.handler.css("cursor", h.oldCss.cursor);
            h.onDrop(i);
            b(document).unbind("mousemove.dragbox", d.drag).unbind("mouseup.dragbox", d.drop)
        }};
        return g.each(function () {
            var i = this;
            var h = null;
            if (typeof e.handler == "undefined" || e.handler == null) {
                h = b(i)
            } else {
                h = (typeof e.handler == "string" ? b(e.handler, this) : e.handler)
            }
            h.bind("mousedown.dragbox", {e: i}, function (k) {
                var n = b(k.data.e);
                var m = {};
                if (n.css("position") != "absolute" && n.css("position") != "fixed") {
                    try {
                        n.position(m)
                    } catch (j) {
                    }
                    n.css("position", "absolute")
                }
                m.opacity = a(n, "opacity") || 1;
                var l = {left: m.left || a(n, "left") || 0, top: m.top || a(n, "top") || 0, width: n.width() || a(n, "width"), height: n.height() || a(n, "height"), offLeft: k.pageX, offTop: k.pageY, oldCss: m, onMove: e.onMove, onDrop: e.onDrop, handler: h, target: n};
                n.css("opacity", e.opacity);
                h.css("cursor", "move");
                b(document).bind("mousemove.dragbox", {dragData: l}, d.drag).bind("mouseup.dragbox", {dragData: l}, d.drop)
            })
        })
    }})
})(jQuery);
(function (b) {
    var a = {height: function () {
        var d, c;
        d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
        if (d < c) {
            return b(window).height() + "px"
        } else {
            return d + "px"
        }
    }, width: function () {
        var c, d;
        c = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
        if (c < d) {
            return b(window).width() + "px"
        } else {
            return c + "px"
        }
    }};
    Class.dialog = Class.get({initialize: function (c, d) {
        this.options = b.extend(true, {}, {effect: "fade", easing: "linear", duration: "fast", event: "click", context: b(window), close: false, iframe: false, resizable: false, target: ".showdialog", overlay: ".overlay"}, d);
        var i = this;
        this.$ = b(c);
        this.effects = Class.dialog.effects;
        this.$dialogbox = b(this.$).css("position", "fixed");
        this.$overlay = null;
        if (this.$dialogbox.css("z-index") == "auto" || !this.$dialogbox.css("z-index")) {
            this.$dialogbox.css("z-index", 10)
        }
        if (this.options.hasIframe) {
            var h = parseInt(this.$dialogbox.css("z-index"));
            this.$dialogbox = this.$dialogbox.add(b('<iframe  class="dialog-iframe" scrolling="no" frameborder="0"></iframe>').appendTo("body").css({"z-index": h - 1}).hide())
        }
        this.$dialogbox.data("size", {width: this.$dialogbox.width(), height: this.$dialogbox.height()});
        if (!this.$.attr("id")) {
            this.$.attr("id", "dialog_" + parseInt(Math.random() * 10000))
        }
        this.id = this.$.attr("id");
        if (this.options.overlay) {
            Class.dialog.$overlay = this.$overlay = this._getOverLay()
        } else {
            this.$.attr("nolayer", true)
        }
        this.$dialogbox.fixed && this.$dialogbox.fixed();
        var f = this.$.getRegion("header"), g = b([]);
        f && f.each(function () {
            if (b(this).parseOptions().handle != false) {
                g = g.add(this)
            }
        });
        if (g.length && !this.options.hasIframe) {
            if (this.$dialogbox.draggable) {
                this.$dialogbox.draggable({handle: g, containment: "document", scroll: false, opacity: 0.8, cursor: "move", drag: function (j, k) {
                }})
            } else {
                Class.dragbox && new Class.dragbox(this.$, {handler: g})
            }
        }
        if (this.options.resizable) {
            this.$dialogbox.resizable && this.$dialogbox.resizable()
        }
        var e = this.options.event + ".dialog";
        b(document).off(e + this.id).on(e + this.id, this.options.target, function () {
            i.show()
        });
        this.$dialogbox.off("click.dilaog").on("click.dilaog", "[data-options]", function (j) {
            j.stopPropagation();
            if($(this).parseOptions().region == 'hide'){
               i.hide()
           }
        });
        this.center();
        this._setOverlay();
        b(window).resize(function () {
            i.center();
            i._setOverlay()
        });
        if (this.options.layclick) {
            this.$overlay && this.$overlay.off("click.dilaog").on("click.dilaog", function () {
                for (var j = 0; j < Class.dialog.items.length; j++) {
                    Class.dialog.items[j].hide()
                }
            })
        }
        this.$overlay && Class.dialog.items.push(this);
        return this
    }, _getOverLay: function () {
        if (Class.dialog.$overlay && Class.dialog.$overlay.length) {
            return Class.dialog.$overlay
        }
        var c = b(this.options.overlay);
        if (b.ishtml(this.options.overlay)) {
            c.appendTo(b("body"))
        } else {
            if (!c.length) {
                c = b('<div class="dialog-overlay"></div>').css({}).appendTo(b("body"))
            }
        }
        c.css({"z-index": parseInt(this.$dialogbox.css("z-index")) - 1});
        c.fixed && c.fixed();
        c.css({top: 0, left: 0}).attr("data-opacity", c.css("opacity")).hide();
        return c
    }, _setOverlay: function () {
        if (!this.$overlay) {
            return this
        }
        if (this.$overlay.fixed) {
            this.$overlay.css({width: b(window).width(), height: b(window).height()})
        } else {
            this.$overlay.css({width: a.width(), height: a.height()})
        }
        return this
    }, centerPos: function (d) {
        var h = d.offset() || {};
        var c = this.$dialogbox.data("size");
        var f = (d.width() - c.width) / 2;
        var e = (d.height() - c.height) / 2;
        var g = {};
        g.left = f + (h.left || 0);
        g.top = e + (h.top || 0);
        return g
    }, center: function () {
        this.$dialogbox.css(this.centerPos(b(this.options.context)));
        return this
    }, show: function () {
        b.proxy(this.effects[this.options.effect].show, this)(this.centerPos(b(this.options.context)), this.$dialogbox);
        if (this.$overlay && !this.$overlay.attr("data-lock") && !this.$.attr("nolayer")) {
            this.$overlay && this.$overlay.stop(true, true).show().animate({opacity: 0.5})
        }
        return this
    }, hide: function () {
        b.proxy(this.effects[this.options.effect].hide, this)(this.$dialogbox);
        if (this.$overlay && !this.$overlay.attr("data-lock") && !this.$.attr("nolayer")) {
            this.$overlay && this.$overlay.stop(true, true).fadeOut()
        }
        return this
    }, html: function (c) {
        return this.$.html(c)
    }});
    Class.dialog.items = [];
    Class.dialog.$overlay = null;
    Class.dialog.effects = {enlarge: {show: function (g, c) {
        var f = c;
        var e = {left: b(window).width() / 2, top: b(window).height() / 2};
        var d = {width: f.width(), height: f.height()};
        f.css(e).css({width: 0, height: 0}).hide().stop(true).animate({opacity: "show", left: g.left, top: g.top, width: d.width, height: d.height}, this.options.duration, this.options.easing, function () {
        });
        return this
    }, hide: function (c) {
        var e = c;
        var d = {left: e.width() / 2 + e.position().left, top: e.height() / 2 + e.position().top};
        e.stop(true).animate({opacity: "hide", left: d.left, top: d.top, width: "hide", height: "hide"}, this.options.duration, this.options.easing);
        return this
    }}, fall: {show: function (d, c) {
        c.css("top", 0).stop(true).animate(this.centerPos(b(this.options.context)), this.options.duration, this.options.easing);
        return this
    }, hide: function (c) {
        c.stop(true).animate({top: 0}, this.options.duration, this.options.easing);
        return this
    }}, fade: {show: function (d, c) {
        c.stop(true).fadeIn(this.options.duration, this.options.easing);
        return this
    }, hide: function (c) {
        c.stop(true).fadeOut(this.options.duration, this.options.easing);
        return this
    }}, "default": {show: function (d, c) {
        c.stop(true).fadeIn(this.options.duration, this.options.easing);
        return this
    }, hide: function (c) {
        c.stop(true).fadeOut(this.options.duration, this.options.easing);
        return this
    }}};
    Class.dialogs = Class.get({initialize: function (c, d) {
    }})
})(jQuery);

(function (a) {
    Class.tabs = Class.get({EVENT_CHANGE: "onchange", initialize: function (c, e) {
        var b = {effect: "horizontal", easing: "easeInOutExpo", duration: "normal", offset: 1, interval: 3000, auto: false, disable: "disable", index: 0, event: "click"}, h = this;
        this.options = a.extend(true, {}, b, e);
        this.$ = a(c);
        this.effects = Class.tabs.effects;
        this.$regions = this.$.getRegion();
        this.$nav = a(this.$regions.nav);
        this.$panel = a(this.$regions.panel);
        this.$clip = a(this.$regions.clip);
        this.$view = a(this.$regions.view);
        this.$prev = a(this.$regions.prev);
        this.$next = a(this.$regions.next);
        this.$navPrev = a(this.$regions.carouselPrev);
        this.$navNext = a(this.$regions.carouselNext);
        this.$navClip = a(this.$regions.carouselClip);
        if (!this.$nav.length) {
            this.$nav = a(this.$regions.carousel);
            a("<div></div>").css({overflow: "hidden", position: "relative"}).addClass("carousel-clip");
            this.$navClip = this.$.find('.carousel-clip');
            this.$nav.wrap(this.$navClip);
            this.$nav.data("isCarousel", true)
        }
        if (!this.$view.find("img").length) {
            this.$view.append("<img/>")
        }
        this.navChildrenSelector = this.$nav.parseOptions().item || "a";
        this.panelChildrenSelector = this.$panel.parseOptions().item || "li";
        this.$panels = this.getPanelChildren();
        this.$navs = this.getNavChildren();
        this.pIndex = 0;
        this.index = 0;
        this.tempIndex = -1;
        var d = (this.options.event == "hover" ? "mouseenter" : this.options.event) + ".tabs", g = {mouseenter: "mouseenter.tabs", mouseleave: "mouseleave.tabs"}, h = this;
        this.$nav.off(d).on(d, this.navChildrenSelector,function (i) {
            a.console("tabs nav click!");
            i.preventDefault();
            h.page(a(this).index())
        }).css("position", "relative").parent().css("position", "relative");
        if (this.options.auto) {
            this.$panel.off(g.mouseenter).on(g.mouseenter, this.panelChildrenSelector,function (i) {
                h.stop()
            }).off(g.mouseleave).on(g.mouseleave, this.panelChildrenSelector, function (i) {
                h.start()
            });
            this.$view.off(g.mouseenter).on(g.mouseenter,function (i) {
                h.stop()
            }).off(g.mouseleave).on(g.mouseleave, function (i) {
                h.start()
            })
        }
        var f = "click.tabs";
        this.$prev.off(f).on(f, function (i) {
            a.console("tabs click prev!");
            h.navPrev()
        });
        this.$next.off(f).on(f, function (i) {
            a.console("tabs click next!");
            h.navNext()
        });
        a.proxy(Class.tabs.init[this.options.effect], this)();
        this.page(this.index = this.options.index);
        this.$panel.stop(true).fadeIn();
        this.start();
        a.console("tabs init!")
    }, childrenWidth: function (b) {
        return this.itemWidth(b) * (b.length)
    }, childrenHeight: function (b) {
        return this.itemHeight(b) * b.length
    }, setClip: function () {
        if (!this.$clip.length) {
            a("<div></div>").wrapAll(this.$panel).addClass("tabs-clip");
            this.$clip = $(this).find('.tabs-clip');
        }
        return this
    }, length: function () {
        var len = 0 ;
        if( this.options.effects == 'vertical'){
            var count = parseInt( this.$panel.outerHeight() / this.$panel.parent().height());
            len =  this.$panel.parent().height() % this.$panels.outerHeight() > 1 ? count + 1  : count;
        }
        else{
            var count = parseInt( this.$panel.outerWidth() / this.$panel.parent().width());
            len =  this.$panel.parent().width() % this.$panels.outerWidth() > 1 ? count + 1  : count;
            console.log(count);
        }
        return len;
    }, getNavChildren: function () {
        var b = this.$nav.children(this.navChildrenSelector);
        var c = this.$nav.parseOptions().axis || "x";
        if (c == "x" && this.$nav.data("isCarousel")) {
            this.$nav.width(this.childrenWidth(b))
        }
        return b
    }, getPanelChildren: function () {
        var b = this.$panel.children(this.panelChildrenSelector);
        return b
    }, itemWidth: function (c) {
        var b = parseFloat(c.css("margin-left")) + parseFloat(c.css("margin-right"));
        return(c.outerWidth() + b)
    }, itemHeight: function (c) {
        var b = parseFloat(c.css("margin-top")) + parseFloat(c.css("margin-bottom"));
        return(c.outerHeight() + b)
    }, page: function (b) {
        if (b < 0 && this.tempIndex == b) {
            return this
        }
        this.btnStyle(b);
        this.index = b;
        this.$navs = this.getNavChildren();
        this.$panels = this.getPanelChildren();
        var c = this.$nav.parseOptions().selected || "selected";
        if (this.tempIndex >= 0) {
            this.$navs.eq(this.tempIndex).removeClass(c)
        }
        this.$navs.eq(this.index).addClass(c);
        a.proxy(this.effects[this.options.effect], this)({current: this.index, temp: this.tempIndex}, this.options.offset);
        this.view(this.index);
        this.tempIndex = this.index;
        this.trigger(this.EVENT_CHANGE, [this.index, this.length()]);
        return this
    }, btnStyle: function (c) {
        var b = this.$prev.parseOptions().disable;
        var d = this.$next.parseOptions().disable;
        if (c >= this.length() - 1) {
            d && this.$next.addClass(d);
            b && this.$prev.removeClass(b)
        } else {
            if (c <= 0) {
                b && this.$prev.addClass(b);
                d && this.$next.removeClass(d)
            } else {
                b && this.$prev.removeClass(b);
                d && this.$next.removeClass(d)
            }
        }
        return this
    }, count: function () {
        var b = this.$navs.length;
        var c = parseInt(b / this.options.offset);
        return b % this.options.offset > 0 ? c + 1 : c
    }, next: function () {
        var b = this.index + 1;
        if (b < this.length()) {
            this.page(b)
        } else {
            if (this.$prev.parseOptions().disable) {
                return this
            }
            this.page(0)
        }
        return this
    }, prev: function () {
        var b = this.index - 1;
        if (b >= 0) {
            this.page(b)
        } else {
            if (this.$next.parseOptions().disable) {
                return this
            }
            this.page(this.length() - 1)
        }
        return this
    }, navPrev: function () {
        this.prev();
        return this.navPage(this.pIndex - 1)
    }, navNext: function () {
        this.next();
        return this.navPage(this.pIndex + 1)
    }, navPage: function (c) {
        a.console("tabs navPage index:" + c + "!");
        var f = this.getNavChildren(), b = this.$nav.parseOptions();
        axis = b.axis, offset = b.offset || 1;
        var d = 0;
        if (axis == "y") {
            d = Math.round(this.$nav.parent().height() / this.itemHeight(f))
        } else {
            d = Math.round(this.$nav.parent().width() / this.itemWidth(f))
        }
        var e = d;
        e = f.length - e;
        if (e < 0) {
            return
        }
        if (c < 0) {
            c = e
        } else {
            if (c > e) {
                c = e
            }
        }
        if (this.index == 0) {
            c = 0
        }
        if (axis == "y") {
            this.vertical({current: c}, this.$nav, f, offset)
        } else {
            this.horizontal({current: c}, this.$nav, f, offset)
        }
        this.pIndex = c;
        return this
    }, view: function (e) {
        var d = this.$navs.eq(e).length ? this.$navs.eq(e) : this.$panels.eq(e), f = d.attr("title"), b = d.attr("rel"), c = d.attr("href");
        this.$view.attr({href: c, title: f}).find("img").hide().attr({src: b, alt: f}).stop(true, false).fadeIn();
        return this
    }, start: function () {
        var b = this;
        if (this.options.auto) {
            this.autoPlay = setInterval(function () {
                b.navNext()
            }, this.options.interval)
        }
        return this
    }, stop: function () {
        clearInterval(this.autoPlay);
        return this
    }, horizontal: function (c, d, b, e ) {
        var width =  this.itemWidth(b) , clip = d.parent();offset = clip.width() / width >= 2 ?  clip.width() :  width ;
        var e = (c.current * offset);
        if (e != null) {
            d.stop(true).animate({left: -e}, this.options.duration, this.options.easing)
        }
        return this
    }, vertical: function (d, e, c, f) {
        var height =  this.itemHeight(c) , clip = e.parent();offset = clip.height() / height >= 2 ?  clip.height() :  height ;
        var b = c.outerHeight();
        var f = (d.current * offset);
        if (f != null) {
            e.stop(true).animate({top: -f}, this.options.duration, this.options.easing)
        }
        return this
    }});
    Class.tabs.init = {horizontal: function () {
        this.$panel.css({position: "absolute"}).parent().css("position", "relative");
        this.$panels.css({"float": "left"}).show();
        this.$panel.width(this.childrenWidth(this.$panels));
        return this
    }, horizontal_accordion: function () {
        var d = this;
        var c = this.$panel.width(), b = this.$panels.length;
        this.$panels.width(function () {
            return parseFloat(c / b) - parseFloat(d.$panels.css("border-left-width")) - parseFloat(d.$panels.css("border-right-width"))
        });
        this.$panel.css({"background-position": "0 0", "background-repeat": "no-repeat"}).off("mouseover.tabs").on("mouseover.tabs", (this.$panel.parseOptions().item || "li"), function (f) {
            d.page(a(this).index())
        });
        return this
    }, vertical: function () {
        this.$panel.css("position", "absolute").parent().css("position", "relative");
        this.getPanelChildren().show();
        return this
    }, "default": function () {
        return this
    }, fade: function () {
        return this
    }, swap: function () {
    }};
    Class.tabs.effects = {horizontal: function (c, d) {
        var b = this.getPanelChildren();
        this.$panel.width(this.childrenWidth(b));
        return this.horizontal(c, this.$panel, b, d)
    }, horizontal_accordion: function (f, d) {
        var e = this;
        var j = this.getPanelChildren().eq(f.current);
        var i = j.summary || a("");
        if (this.$panel.data("summary")) {
            this.$panel.data("summary").stop(true).fadeOut()
        }
        this.$panel.data("summary", i.stop(true).fadeIn());
        var c = "url(" + this.$navs.eq(f.current).attr("href") + ")";
        var b = this.$panel.width(), g = this.$panels.length;
        var h = this.$panels.width();
        e.$panels.css({"background-image": c, "background-repeat": "no-repeat"});
        if (!this.$panels.is(":animated")) {
            e.$panels.css({"background-position": "0 0"})
        }
        this.$panels.stop(true).each(function (k) {
            if (f.current > f.temp) {
                a(this).css({"background-position": b + "px 0px"}).animate({backgroundPosition: "(-" + (k * h) + " 0px)"}, k * 100 + 300, e.options.easing, function () {
                    e.$panel.css({"background-image": c})
                })
            } else {
                a(this).css({"background-position": -b + "px 0px"}).animate({backgroundPosition: "(-" + (k * h) + " 0px)"}, (100 * g - k * 100) + 300, e.options.easing, function () {
                    e.$panel.css({"background-image": c})
                })
            }
        });
        return this
    }, vertical: function (c, d) {
        var b = this.getPanelChildren();
        return this.vertical(c, this.$panel, b, d)
    }, "default": function (b, c) {
        this.$panels.eq(b.current).show();
        this.$panels.eq(b.temp).hide();
        return this
    }, fade: function (b, c) {
        this.$panels.eq(b.current).stop(true).fadeIn(this.options.duration, this.options.easing);
        this.$panels.not(":eq(" + b.current + ")").stop(true).hide();
        return this
    }, swap: function (b, c) {
    }}
})(jQuery);
(function (a) {
    Class.textarea = Class.get({initialize: function (c, d) {
        var f = this;
        this.$ = a(c);
        var e = a.extend(true, {}, {maxheight: 100, minheight: 50, maxlength: 100}, d);
        if (this.$[0].tagName != "TEXTAREA") {
            this.$control = this.$;
            this.$ = this.$control.find("textarea");
            var g = this.$control.getRegion();
            this.$len = a(g.len).text(e.maxlength);
            this.$cur = a(g.cur).text(0)
        }
        var b = {max: e.maxheight, min: e.minheight};
        this.$.css({height: b.min});
        this.$.data("height", b).off("focus.textarea blue.textarea keyup.textarea").on({"focus.textarea": function () {
            a(this).stop().animate({height: a(this).data("height").max})
        }, "blur.textarea": function () {
            if (a(this).val() == "") {
                a(this).stop().animate({height: a(this).data("height").min})
            }
        }, "keyup.textarea": function () {
            if (!f.$cur) {
                return
            }
            var h = a(this).val().length;
            if (h > e.maxlength) {
                f.$cur.css("color", "red")
            } else {
                f.$cur.css("color", "")
            }
            f.$cur.text(a(this).val().length)
        }})
    }})
})(jQuery);
(function (a) {
    Class.floatbox = Class.get({EVENT_BEFORESHOW: "beforeshow", EVENT_AFTERSHOW: "aftershow", EVENT_ONSHOW: "onshow", EVENT_BEFOREHIDE: "beforehide", EVENT_AFTERHIDE: "afterhide", initialize: function (c, d) {
        var f = this;
        var b = {effect: "default", easing: "linear", duration: "normal", context: a(window), target: null, event: "click", position: "bl", offset: {left: 0, top: 0}};
        this.effects = Class.floatbox.effects;
        this.options = a.extend(true, {}, b, d);
        this.$ = a(c).css("position", "absolute");
        this.$context = a(this.options.context).css({position: "relative"});
        this.$target = a(this.options.target);
        if (!this.$.attr("id")) {
            this.$.attr("id", "floatbox_" + parseInt(Math.random() * 10000))
        }
        this.id = this.$.attr("id");
        Class.floatbox.$items = Class.floatbox.$items.add(this.$);
        this.$.off("click.flaotbox").on("click.flaotbox", function (g) {
            g.stopPropagation()
        });
        a(window).off("resize.flaotbox").on("resize.flaotbox", function () {
            if (Class.floatbox.$target && Class.floatbox.$target.length) {
                f.show(Class.floatbox.$target)
            }
        });
        var e = this.options.event + ".floatbox" + this.id;
        if (this.options.target) {
            if (typeof this.options.target == "object") {
                this.options.target.off(e).on(e, function (g) {
                    g.stopPropagation();
                    f.hideAll();
                    f.show(a(this))
                })
            } else {
                a(document).off(e).on(e, this.options.target, function (g) {
                    g.stopPropagation();
                    f.hideAll();
                    f.show(a(this))
                })
            }
        }
        a(document).off(e + "doc").on(e + "doc", function (g) {
            f.hideAll()
        });
        return this
    }, getPos: function (c) {
        var b = this.$context.offset() || {left: 0, top: 0}, h = {}, f = {}, g = c.offset() || {left: 0, top: 0}, d = this.options.position.split("");
        d[0] = d[0] || "b";
        d[1] = d[1] || "l";
        var e = {left: this.$context.width() / 2 + this.$context.scrollLeft(), top: this.$context.height() / 2 + this.$context.scrollTop()};
        if (g.left > e.left) {
            if (d[0] == "b" || d[0] == "t") {
                h = this.targetPos(d[0] + "r", c)
            } else {
                h = this.targetPos("l" + d[1], c)
            }
        } else {
            if (d[0] == "b" || d[0] == "t") {
                h = this.targetPos(d[0] + "l", c)
            } else {
                h = this.targetPos("r" + d[1], c)
            }
        }
        if (g.top > e.top) {
            if (d[0] == "b" || d[0] == "t") {
                f = this.targetPos("t" + d[1], c)
            } else {
                f = this.targetPos(d[0] + "b", c)
            }
        } else {
            if (d[0] == "b" || d[0] == "t") {
                f = this.targetPos("b" + d[1], c)
            } else {
                f = this.targetPos(d[0] + "t", c)
            }
        }
        g = {left: h.left, top: f.top};
        return g
    }, targetPos: function (f, c) {
        var c = c || this.$target, e = c.offset() || {left: 0, top: 0}, b = this.$context.offset() || {left: 0, top: 0}, d = {left: 0, top: 0};
        e.left = e.left;
        e.top = e.top;
        switch (f) {
            case"lt":
                d = {left: e.left - this.options.offset.left - this.$.outerWidth(), top: e.top + this.options.offset.top};
                break;
            case"tr":
                d = {left: e.left - this.options.offset.left + c.outerWidth() - this.$.outerWidth(), top: e.top - this.options.offset.top - this.$.outerHeight()};
                break;
            case"br":
                d = {left: e.left - this.options.offset.left + c.outerWidth() - this.$.outerWidth(), top: e.top + this.options.offset.top + c.outerHeight()};
                break;
            case"lb":
                d = {left: e.left - this.options.offset.left - this.$.outerWidth(), top: e.top - this.options.offset.top - this.$.outerHeight() + c.outerHeight()};
                break;
            case"tl":
                d = {left: e.left + this.options.offset.left, top: e.top - this.options.offset.top - this.$.outerHeight()};
                break;
            case"rt":
                d = {left: e.left + this.options.offset.left + c.outerWidth(), top: e.top + this.options.offset.top};
                break;
            case"rb":
                d = {left: e.left + this.options.offset.left + c.outerWidth(), top: e.top - this.options.offset.top - this.$.outerHeight() + c.outerHeight()};
                break;
            case"bl":
                d = {left: e.left + this.options.offset.left, top: e.top + this.options.offset.top + c.outerHeight()};
                break
        }
        return d
    }, show: function (b) {
        b = b || this.$target;
        b = a(b);
        this.trigger(this.EVENT_BEFORESHOW);
        a.proxy(Class.floatbox.effects[this.options.effect].show, this)(b);
        this.trigger(this.EVENT_AFTERSHOW);
        Class.floatbox.$target = b;
        return this
    }, hide: function () {
        this.trigger(this.EVENT_BEFOREHIDE, {});
        a.proxy(Class.floatbox.effects[this.options.effect].hide, this)();
        this.trigger(this.EVENT_AFTERHIDE, {});
        return this
    }, hideAll: function () {
        a.proxy(Class.floatbox.effects[this.options.effect].hide, this)(Class.floatbox.$items.filter(':visible'));
        return this
    }, toggle: function (b) {
        if (this.$panels.eq(b).is(":hidden")) {
            a.proxy(this.effects[this.options.effect].show, this)(b)
        } else {
            this.hide(b)
        }
        return this
    }});
    Class.floatbox.$items = a([]);
    Class.floatbox.$target = a("");
    Class.floatbox.effects = {"default": {show: function (b) {
        var c = this.getPos(b);
        this.$.css(c);
        this.$.stop(true, true).fadeIn(this.options.duration, this.options.easing);
        return this
    }, hide: function (b) {
        b = b && b.length ? b : this.$;
        a(b).stop(true, true).fadeOut(this.options.duration, this.options.easing);
        return this
    }}, slider: {show: function (b) {
        var d = this.options.offset;
        if (this.options.position.indexOf("b") != -1 || this.options.position.indexOf("t") != -1) {
            this.options.offset.top += 100
        } else {
            this.options.offset.left += 100
        }
        var e = this.getPos(b);
        this.$.css(e);
        this.options.offset = d;
        var c = this.getPos(b);
        c.opacity = "show";
        this.$.stop(true, true).animate(c, this.options.duration, this.options.easing);
        return this
    }, hide: function (b) {
        b = b.length ? b : this.$;
        a(b).stop(true, true).fadeOut(this.options.duration, this.options.easing);
        return this
    }}}
})(jQuery);
(function (a) {
    Class.previewImage = Class.get({EVENT_CHANGE: "onchange", initialize: function (c, d) {
        var e = a(this);
        var b = {url: "", params: {}, size: 10, page: 0};
        this.effects = Class.previewImage.effects;
        this.options = a.extend(true, {}, b, d);
        var f = this;
        this.$ = a(c).css({position: "relative"});
        this.index = 0;
        this.tempIndex = 0;
        this.$view = null;
        this.$prev = null;
        this.$next = null;
        this.page = this.options.page;
        this.size = this.options.size;
        this.total = 0;
        this.$.find("[data-options]").each(function () {
            var g = a(this).parseOptions();
            switch (g.region) {
                case"prev":
                    f.$prev = a(this);
                    break;
                case"next":
                    f.$next = a(this);
                    break;
                case"view":
                    f.$view = a(this);
                    break
            }
        });
        if (!this.$view || !this.$view.length) {
            this.$view = a("<img/>").appendTo(this.$)
        }
        if (!this.$next || !this.$next.length) {
            this.$next = a('<a href="javascript:void(0)" class="previewImage-next"/>').appendTo(this)
        }
        if (!this.$prev || !this.$prev.length) {
            this.$prev = a('<a href="javascript:void(0)" class="previewImage-prev"/>').appendTo(this)
        }
        this.$view.wrap(a('<div class="previewImage-wrap"></div>')).css("position", "absolute");
        this.$wrap = this.$view.parent();
        this.getData({page: this.options.page, size: this.options.size});
        this.$.off("click.previewImage").on("click.previewImage", function (k) {
            var j = f.$view;
            var g = a(k.target), i = g.parseOptions();
            switch (i.region) {
                case"prev":
                    if (f.index != 0) {
                        var h = f.$.data("previewImage-data")[--f.index];
                        j.attr({src: h.url, title: h.title}).hide()
                    }
                    break;
                case"next":
                    if (f.index < f.$.data("previewImage-data").length - 1) {
                        var h = f.$.data("previewImage-data")[++f.index];
                        j.attr({src: h.url, title: h.title}).hide()
                    } else {
                        if (f.$.data("previewImage-data").length - 1 <= f.index < total - 1) {
                            f.page++;
                            f.getData({size: f.size, page: f.page})
                        }
                    }
                    break
            }
        });
        this.$view.off("load.previewImage").on("load.previewImage", function () {
            f.loadImage()
        })
    }, update: function () {
        var b = this;
        return this
    }, getData: function (d) {
        var b = this.options, e = this;
        if (d) {
            for (var c in d) {
                b.params[c] = d[c]
            }
        }
        if (typeof b.url == "string") {
            a.get(b.url, b.params, function (h) {
                if (!e.$.data("previewImage-data")) {
                    e.$.data("previewImage-data", h.rows)
                } else {
                    var g = e.$.data("previewImage-data");
                    for (var f = 0; f < h.rows.length; f++) {
                        g.push(h.rows[f])
                    }
                    e.$.data("previewImage-data", g)
                }
                total = h.total
            })
        } else {
            e.$.data("previewImage-data", b.url.rows);
            total = b.url.total
        }
    }, prev: function () {
    }, next: function () {
    }, loadImage: function () {
        var f = this;
        var c = parseFloat(this.$view.outerWidth() / this.$view.outerHeight());
        this.$view.hide();
        var e = (this.$.width() - this.$view.outerWidth()) / 2 - parseFloat(this.$wrap.css("padding-left")) + this.$.scrollLeft();
        var d = (this.$.height() - this.$view.outerHeight()) / 2 - parseFloat(this.$wrap.css("padding-top")) + this.$.scrollTop();
        var b = {width: this.$view.outerWidth(), height: this.$view.outerHeight()};
        if (this.$view.outerWidth() > this.$view.outerHeight() && this.$view.outerWidth() > this.$.width()) {
            b.width = this.$.width();
            b.height = b.width / c
        }
        if (this.$view.outerHeight() > this.$view.outerWidth() && this.$view.outerHeight() > this.$.height()) {
            b.height = this.$.height();
            b.width = b.height * c
        }
        this.$wrap.stop(true).animate({left: e, top: d, width: b.width + "px", height: b.height + "px"}, function () {
            f.$view.stop(true).fadeIn()
        });
        return this
    }});
    Class.previewImage.effects = {"default": {show: function () {
        this.show()
    }, hide: function () {
        this.hide()
    }}}
})(jQuery);
(function (a) {
    Class.combo = Class.get(
        /**
         * @lends Class.accordion
         * */
        {
            /**
             * @type event
             * @description 显示事件
             * */
            EVENT_SHOW:'onshow',
            /**
             * @type event
             * @description 关闭事件
             * */
            EVENT_HIDE:'onhide',
            EVENT_CHANGE:'onchange',
            initialize : function(selector , options){
                var _this = this;
                var _options = {
                    effect     : 'default',
                    easing     : 'linear',
                    duration   : 'normal'
                };
                this.effects = Class.combo.effects;
                this.options = $.extend(true,{},_options, options);
                this.$ = $(selector);
                this.eventElement = null;
                if(this.$[0].tagName == "SELECT"){
                    this.$list = $('<div class="combo-list" data-region="list"><ul></ul></div>').appendTo('body');

                    var $options = this.$.hide().children().each(function(){
                        _this.add({
                            text :$(this).text(),
                            val : $(this).val()
                        });
                    });
                    this.$list.appendTo('body');

                    this.$control = $('<span class="combo" data-loader="combo"></span>')
                        .append('<span class="combo-input" data-region="val"></span>')
                        .append('<a href="javascript:void(0)"  class="combo-icon" data-region="icon"></a>')
                        .append('<input type="hidden" data-region="hidden" id="'+ this.$.attr('id') +'" name="'+ this.$.attr('name') +'"/>')
                        .addClass(this.$.attr('class'))
                        .width(this.$.width())
                        .insertAfter(this.$)
                        .off('click.combo').on('click.combo',function(){
                            // _this.show();
                        })
                }
                else{
                    this.$control = this.$;
                    this.$list = this.$.find('.combo-list').appendTo('body');
                    this.$inputHidden = this.$.find('.combo-input-hidden');
                }

                this.$input = this.$control.find('.combo-input');
                this.$list.off('click.combo').on('click.combo','li',function(){
                    _this.eventElement = _this;
                    if($(this).attr('value'))
                        _this.val($(this).attr('value').toString());
                    else
                        _this.val(parseInt($(this).index()))
                    _this.hide();
                   // _this.trigger(_this.EVENT_CHANGE);
                });

                var $target = this.$control.find('a'),
                    $text =  this.$input;

                $text.width(this.$.width() - $target.outerWidth() - parseFloat($text.css('padding-left')) - parseFloat($text.css('padding-right')) );
                this.$list.width(this.$control.width() + parseFloat(this.$control.css('padding-left')) + parseFloat(this.$control.css('padding-right')));

                this.flatbox =  new Class.floatbox(this.$list,{
                    position    : 'bl',
                    event       : 'click',
                    context	    : $(window),
                    target      : this.$control,
                    effect      : this.options.effect,
                    duration    : this.options.duration,
                    easing      : this.options.easing
                });

                this.$.attr('data-target',this.flatbox.$.attr('id'));

                this.flatbox.off('beforeshow').on('beforeshow',function(){
                    _this.resetListHeight();
                });
                this.val(0);
                return this;
            },
            bindEvents : function(){
                /*    var events = ['click','mouseover','mouseenter','mouseleave','dbclick','change','focus','blur'];
                 for(var i = 0 ; i < events.length; i ++){
                 if(events[i] == 'change'){

                 }
                 this.$control.bind();
                 }*/
            },
            resetListHeight : function(){
                if(this.$list.height() > 150){
                    this.$list.children('ul').height(150);
                }
                else{
                    this.$list.height('auto');
                }
                return this;
            },
            show : function(){
                this.resetListHeight();
                this.flatbox.show();
                return this;
            },
            hide : function(){
                this.flatbox.hide();
                return this;
            },
            exist : function(val){
                if(typeof val == 'object'){
                    val = val.val;
                }
                return this.get(val).length ? true : false;
            },
            add : function(val){
                if(this.exist(val)){
                    return false;
                }

                var $elem =  $('<li></li>'),
                    $ul =  this.$list.children('ul');

                if(typeof val == 'object'){
                    $elem.attr('value', $.trim(val.val)).text(val.text).appendTo($ul);
                }
                else{
                    $elem.attr('value', $.trim(val)).text(val).appendTo($ul);
                }

                if(this.val() == '' || this.val() == null ){
                    this.val(0)
                }
                return $elem;
            },
            get : function(val){
                var $items = $(),
                    $ul =  this.$list.children('ul');
                switch (typeof val){
                    case 'number' :
                        $items =  $ul.find('li:eq('+ val +')');
                        break;
                    case 'string' :
                        val = $.trim(val);
                        $items =  $ul.find('li[value='+ val +']');
                        break;
                }
                return $items;
            },
            index : function(){
                return this.$input.attr('data-index');
            },
            remove : function(val){
                this.get(val).remove();
                this.val(0);
                return this;
            },
            setVal : function(val ,text , index){
                this.$input.attr('data-val' , val);
                this.$input.attr('data-index' , index);
                this.$input.text(text);
                this.$inputHidden && this.$inputHidden.val(val);
                this.$.val(val);
                (this.eventElement == this) && this.trigger(this.EVENT_CHANGE, { val : val , text : text , index : index});
                this.eventElement = null;
                return this;
            },
            val : function(val){
                if( val == null ){
                    return  this.$input.attr('data-val');
                }
                else{
                    if(!this.exist(val)){
                        return this;
                    }

                    var $item = this.get(val),
                        value =  $item.attr('value') || '',
                        text = $item.text() || '';
                        index = $item.index();
                    this.setVal (value ,text ,index );
                    //this.trigger(this.EVENT_CHANGE, { val : value , text : text });
                }
                return this;
            },
            text : function(val ){
                if( val == null ){
                    return  this.$input.text();
                }
                else{
                    var $item = $();
                    this.$list.children('ul').find('li').each(function(){
                        if($.trim($(this).text()) == $.trim(val)) {
                            $item.push($(this));
                        }
                    });

                    if(!$item.length){
                        return this;
                    }

                    var value =  $item.attr('value');
                    text = $item.text();

                    this.setVal ( value ,text , $item.index() );
                    //this.trigger(this.EVENT_CHANGE, { val : value , text : text });
                }
                return this;
            },
            empty: function(){
                this.$list.find('ul').empty();
                return this;
            },
            removeAt: function(val){
                var $ul = this.$list.children('ul');
                $ul.find('li:gt('+ val +')').remove();
                $ul.find('li:eq('+ val +')').remove();
                if(this.index() > val){
                    this.val(0);
                }
                
                this.setVal ('' , '' ,'' );
                return this;
            }
        });
})(jQuery);
$(function () {
    $("body").loader() ;
});