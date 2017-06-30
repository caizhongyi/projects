/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

//     keymaster.js
//     (c) 2011 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

define("utils/global", [], function () {
    var e = {win:$(window), viewport:$("#viewport"), slides:$("#tempSlide .slide"), prevSlideNum:"0", currentSlideNum:"-3", moveReady:!0};
    return e
}), define("utils/util", ["jquery", "utils/global"], function (e, t) {
    var n = {lockMoving:function () {
        t.moveReady = !1
    }, unlockMoving:function () {
        t.moveReady = !0
    }, resizeFlexibleBg:function () {
        var n = t.win.width(), r = t.win.height(), i = e(".bg-flexible").last(), s = 1920, o = 940, u, a, f, l;
        n > s ? (u = n, a = n / s * o) : (u = r / o * s, a = r, u < n && (u = n, a = u / s * o)), f = -(u / 2), l = -(a / 2), e(".bg-flexible").css({width:u, height:a, "margin-left":f, "margin-top":l})
    }, setBlind:function () {
        var t = e(".bg-flexible"), n = e('<div class="blind"></div>');
        n.insertAfter(t).css({opacity:0}).animate({opacity:.6}, 1e3, "easeInOutExpo", function () {
            e(this).addClass("blind-current")
        })
    }, removeBlind:function () {
        e(".blind-current").animate({opacity:0}, 1e3, "easeInOutExpo", function () {
            e(this).remove()
        })
    }};
    return n
}), define("slides/trailer", ["utils/global", "utils/util"], function (e, t) {
    document.location.hash = '#index';
    var n = [
        {id:"trailer", title:"트레일러", noUtil:!0, slideNum:{current:"-2", prev:"-2", next:"-1"}, action:{init:function () {
        }, inAct:function () {
            $("#nav").css({right:"-100%"}), $("#topbar").css({top:"-300px"})
        }, outAct:function () {
            $("#nav").css({right:"0"}), $("#topbar").animate({top:"0"}, "easeInOutExpo", function () {
            })
        }}}
    ];
    return n
}), define("slides/index", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"index", title:"메뉴", noUtil:!0, slideNum:{current:"-1", prev:"-1", next:"1"}, action:{init:function () {
            if (!Modernizr.csstransforms3d) {
                var t = 200;
                $(".index .section").hover(function () {
                    $(this).find(".front").animate({left:-250}, t, "easeInQuad").end().find(".back").animate({left:0}, t, "easeInQuad").end()
                }, function () {
                    $(this).find(".front").animate({left:0}, t, "easeInQuad").end().find(".back").animate({left:250}, t, "easeInQuad").end()
                })
            }
            e.win.height() < 769 && $(".index .content").css({marginTop:"-300px"}).find(".section, .event").css({marginBottom:"40px"}).end()
        }, inAct:function () {
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/world", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"world", link:"world", title:"2천년의 신화 <b>세계관</b>", slideNum:{current:"1", prev:"-1", next:"2"}, action:{init:function () {
            t.resizeFlexibleBg()
        }, inAct:function () {
            $("#world").find(".heros").css({opacity:0, marginTop:"100px"}).animate({opacity:1, marginTop:0}, 800, "easeInQuad")
        }, outAct:function () {
            $("#world").find(".heros").animate({opacity:0}, 400, "easeInQuad")
        }}}
    ];
    return n
}), define("slides/race", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"race", link:"race", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"2", prev:"1", next:"3"}, action:{init:function () {
            e.slides.filter(".race.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/job", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"job", link:"job", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"3", prev:"2", next:"4"}, action:{init:function () {
            e.slides.filter(".job.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/place", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"place", link:"place", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"4", prev:"3", next:"5"}, action:{init:function () {
            e.slides.filter(".ship.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/ship", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"ship", link:"ship", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"5", prev:"4", next:"6"}, action:{init:function () {
            e.slides.filter(".ship.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/trade", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"trade", link:"trade", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"6", prev:"5", next:"7"}, action:{init:function () {
            e.slides.filter(".trade.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/fly", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"fly", link:"fly", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"7", prev:"6", next:"8"}, action:{init:function () {
            e.slides.filter(".fly.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/justice", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"justice", link:"justice", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"8", prev:"7", next:"8"}, action:{init:function () {
            e.slides.filter(".justice.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}),
    define("slides/pvp", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"pvp", link:"pvp", title:"120가지의 가능성 <b>직업</b>", slideNum:{current:"2", prev:"1.4", next:"3"}, action:{init:function () {
            e.slides.filter(".pvp.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".char").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
        }}}
    ];
    return n
}), define("slides/life", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"life", link:"life-main", title:"생산의 중심 <b>주택과 농장</b>", slideNum:{current:"9", prev:"8.3", next:"9.1"}, action:{init:function () {
            e.slides.filter(".life.main").find(".bg-flexible").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            location.hash = "life-main"
        }, outAct:function () {
        }}},
        {id:"life-main", title:"주택", slideNum:{current:"9.1", prev:"8.3", next:"9.2"}, action:{init:function () {
        }, inAct:function () {
            var e = $("#helperSlide");
            e.find(".copy").css({opacity:0}).delay(600).animate({opacity:1}, 900, "easeOutQuad").end()
        }, outAct:function () {
            var e = $("#currentSlide");
            e.find(".copy").animate({opacity:0}, 300, "easeOutQuad").end()
        }}},
        {id:"life-house", title:"소품", slideNum:{current:"9.2", prev:"9.1", next:"10.1"}, action:{init:function () {
        }, inAct:function () {
            t.setBlind()
        }, outAct:function () {
            t.removeBlind()
        }}}
    ];
    return n
}), define("slides/siege", ["utils/global", "utils/util"], function (e, t) {
    var n = [
        {id:"siege", link:"siege-main", title:"영지쟁탈의 야망 <b>공성전</b>", slideNum:{current:"10", prev:"9.2", next:"10.1"}, action:{init:function () {
            e.slides.filter(".siege.main").find(".bg-rumble").clone().appendTo($("#helperUtil")), t.resizeFlexibleBg()
        }, inAct:function () {
            location.hash = "siege-main"
        }, outAct:function () {
        }}},
        {id:"siege-main", title:"공성전", slideNum:{current:"10.1", prev:"9.2", next:"10.2"}, action:{init:function () {
        }, inAct:function () {
            var e = $(".bg-rumble");
            e.jrumble({x:2, y:2}), setTimeout(function () {
                e.trigger("startRumble")
            }, 800), setTimeout(function () {
                e.trigger("stopRumble")
            }, 1400)
        }, outAct:function () {
        }}},
        {id:"siege-movie", title:"공성전 영상", slideNum:{current:"10.2", prev:"10.1", next:"10.2"}, action:{init:function () {
        }, inAct:function () {
            t.setBlind()
        }, outAct:function () {
            t.removeBlind()
        }}}
    ];
    return n
}), define("slides/slide", ["utils/global", "slides/trailer", "slides/index", "slides/world", "slides/race", "slides/job", "slides/place", "slides/ship", "slides/trade", "slides/fly", "slides/justice", "slides/pvp", "slides/life", "slides/siege"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
    var d = [].concat(t, n, r, i, s, o, u, a, f, l, c, h, p);
    return d
}), define("utils/slideUtil", ["jquery", "utils/global", "slides/slide"], function (e, t, n) {
    var r = {changeSlide:function (e) {
        var t = r.getSlide.byNum(e).id;
        t && r.changeHash(t)
    }, changeHash:function (e) {
        t.moveReady && (location.hash = e)
    }, getSlide:{byNum:function (e) {
        var t = n.length, r;
        for (r = 0; r < t; r++)if (n[r].slideNum.current == e)return n[r]
    }, byId:function (e) {
        var t = n.length, r;
        for (r = 0; r < t; r++)if (n[r].id == e)return n[r]
    }}, slideMenu:function () {
        var n = r.getSlide.byNum(t.currentSlideNum), i = {}, s = Handlebars.compile(e("#tempMenu").html()), o = {id:n.id, facebook:i.facebook, me2day:i.me2day, twitter:i.twitter, wiki:i.wiki}, u;
        return n.noUtil ? u = '<div class="menu" style="background: none; width: 0; height: 0;"></div>' : u = s(o), u
    }};
    return r
}), define("utils/nav", ["jquery", "utils/global", "utils/util", "utils/slideUtil"], function (e, t, n, r) {
    var i = {main:{init:function () {
        var n = t.slides.filter(".main"), i = n.length, s = Handlebars.compile(e("#tempNav").html()), o = {links:[]}, u, a, f;
        for (a = 0; a < i; a++)u = r.getSlide.byId(n.eq(a).attr("data-id")), o.links.push({link:"#" + u.link, slideNum:u.slideNum.current, title:u.title});
        e(s(o)).insertAfter(t.viewport.find("#topbar")).css({marginTop:-187})
    }, change:function () {
        var n = t.currentSlideNum.split(".")[0];
        e("#nav").find("li > a").removeClass("active").filter('[data-slide="' + n + '"]').addClass("active")
    }}, sub:{init:function (n) {
        var i = t.slides.filter('[data-id^="' + n + '-"]'), s = i.length, o = Handlebars.compile(e("#tempSubnav").html()), u = {links:[]}, a, f, l;
        for (l = 0; l < s; l++)f = r.getSlide.byId(i.eq(l).attr("data-id")), u.links.push({link:"#" + f.id, slideNum:f.slideNum.current, title:f.title});
        return s == 0 ? a = "" : a = o(u), a
    }, change:function () {
        e(".subnav").find(".links a").removeClass("active").filter('a[data-slide="' + t.currentSlideNum + '"]').addClass("active")
    }}};
    return i
}), define("utils/move", ["jquery", "utils/global", "utils/util", "utils/slideUtil", "utils/nav"], function (e, t, n, r, i) {
    var s = {trigger:function () {
        var t = e.param.fragment(), n = r.getSlide.byId(t).slideNum.current;
        s.to(n)
    }, to:function (r) {
        if (t.currentSlideNum == r)return;
        n.lockMoving(), t.prevSlideNum = t.currentSlideNum, t.currentSlideNum = r;
        var o = t.prevSlideNum.split(".")[0] != r.split(".")[0];
        s.sendMoveBeforeEvent(), e(".menu").remove(), o ? (s.toMainSlide(), i.main.change()) : s.toSubSlide()
    }, toSubSlide:function () {
        var o = r.getSlide.byNum(t.currentSlideNum).id, u = t.slides.filter('[data-id="' + o + '"]').clone(), a = t.win.width(), f = 1e3, l, c, h = parseFloat(t.currentSlideNum) > parseFloat(t.prevSlideNum), p = !(t.prevSlideNum + "").split(".")[1];
        u.attr("id", u.attr("data-id")), p ? (e("#helperSlide").html(u), s.sendMoveCompletedEvent(u)) : (h ? (l = a, c = -a) : (l = -a, c = a), e("#helperSlide").html(u.clone()).css({top:0, left:l}).animate({left:0}, f, "easeInOutExpo",function () {
            e(this).attr("id", "currentSlide").removeClass("helper").addClass("current")
        }).appendTo(e("#scrollPanel")), e("#currentSlide").css({top:0, left:0}).animate({left:c}, f, "easeInOutExpo", function () {
            e(this).attr("id", "helperSlide").removeClass("current").addClass("helper").html(""), n.unlockMoving(), s.sendMoveCompletedEvent(u), t.viewport.append(r.slideMenu)
        })), i.sub.change(), s.doAction()
    }, toMainSlide:function () {
        var o = r.getSlide.byNum(t.currentSlideNum).id, u = t.slides.filter('[data-id="' + o + '"]').clone(), a = t.win.height(), f = 1e3, l, c, h = parseFloat(t.currentSlideNum) > parseFloat(t.prevSlideNum), p = t.slides.filter('[data-id="' + o + '"]').attr("data-id").split("-")[0], d = i.sub.init(p);
        h ? (l = a, c = -a) : (l = -a, c = a), u.attr("id", u.attr("data-id")), e(".subnav").remove(), e("#viewport .helper").filter(".slide").html(u.clone()).end().filter(".util").html("").end().css({top:l, left:0}).animate({top:0}, f, "easeInOutExpo", function () {
            e("#helperSlide").attr("id", "currentSlide").removeClass("helper").addClass("current"), e("#helperUtil").attr("id", "currentUtil").removeClass("helper").addClass("current")
        }), e("#viewport .current").animate({top:c}, f, "easeInOutExpo", function () {
            var o = e(this).hasClass("util"), a = e(this).hasClass("slide");
            e(this).html("").removeClass("current").addClass("helper"), o ? (e(this).attr("id", "helperUtil"), t.viewport.append(d), t.viewport.append(r.slideMenu), i.sub.change(), n.unlockMoving()) : a && (e(this).attr("id", "helperSlide"), s.sendMoveCompletedEvent(u))
        }), s.doAction()
    }, doAction:function () {
        var n = r.getSlide.byId(e("#helperSlide .slide").attr("data-id")), i = r.getSlide.byId(e("#currentSlide .slide").attr("data-id")), s = (t.prevSlideNum + "").split(".")[0] != (t.currentSlideNum + "").split(".")[0];
        if (s) {
            var o = r.getSlide.byNum(n.slideNum.current.split(".")[0]);
            o && o.action.init()
        }
        n && n.action.inAct(), i && i.action.outAct()
    }, sendMoveCompletedEvent:function (e) {
        preview.moveCompleted && preview.moveCompleted(e)
    }, sendMoveBeforeEvent:function (e) {
        preview.moveBefore && preview.moveBefore()
    }};
    return s
}), define("utils/bgm", [], function () {
    var e, t, n, r, i, s, o, u = 60, a = 10, f = 100, l = 1e3, c = "0", h = "http://mp4vod-archeage.x-cdn.com/preview/res_1/bgm", p = [
        {title:"꿈의 유배자들", time:"4:28", url:h + "/01.mp3", aa:0},
        {title:"요정이 속삭이는 땅", time:"3:42", url:h + "/02.mp3"},
        {title:"풍요의 물결", time:"4:42", url:h + "/03.mp3"},
        {title:"질주하는 초원", time:"4:21", url:h + "/04.mp3"},
        {title:"왕좌의 행진", time:"5:14", url:h + "/05.mp3"},
        {title:"잊혀진 이름이여", time:"4:28", url:h + "/06.mp3"}
    ], d = p.length;
    t = document, r = t.createElement("audio"), i = r.play ? !0 : !1, $.browser.msie && parseInt($.browser.version, 10) < 10 && (i = !1), i && (s = r.canPlayType("audio/mpeg") ? !1 : !0);
    var v = {};
    v.flashPlayer = {onInit:function () {
        n.position = 0, n.ready = !0
    }}, v.audioPlayer = function () {
        function r() {
            n.position = parseInt(e.currentTime * l, 10), n.duration = parseInt(e.duration * l, 10), n.onUpdate()
        }

        function i(e) {
            clearInterval(t);
            var r = s ? e.replace(".mp3", ".ogg") : e;
            n.url = n.getEl().src = r
        }

        function o() {
            e = n.getEl(), t = setInterval(r, 500), e.play(), n.isPlaying = "true"
        }

        function u() {
            n.getEl().pause(), clearInterval(t), n.isPlaying = "false"
        }

        function a(e) {
            n.getEl().currentTime = parseInt(e / l, 10), n.position = e, n.onUpdate()
        }

        var e, t;
        return{setAudio:function () {
            var e = n.getEl();
            e.addEventListener("loadstart", function () {
                n.ready = !0, n.duration = n.getEl().duration * l
            }, !1), e.SetVariable = function (e, t) {
                switch (e) {
                    case"method:setUrl":
                        i(t);
                        break;
                    case"method:play":
                        o(t);
                        break;
                    case"method:pause":
                        u(t);
                        break;
                    case"method:setPosition":
                        a(t)
                }
            }
        }}
    }();
    var m = {change:[], publish:function () {
        var e;
        for (var t in this) {
            e = this[t].length;
            while (e--)this[t][e]()
        }
    }};
    return e = {url:null, isFirst:!0, position:0, duration:!1, isPlaying:null, volume:100, ready:!1, title:"", selectedBgm:1, onUpdate:function () {
        if (n.bytesPercent && n.bytesPercent != 100)return;
        n.duration - 500 < n.position && (n.nextBgm(), m.publish())
    }, trigger:function () {
        m.publish()
    }, bind:function (e, t) {
        m[e].push(t)
    }, getEl:function () {
        return t.getElementById(o + "Player")
    }, setSelectedBgm:function (e) {
        var t, r, i;
        t = n.selectedBgm, last = d - 1, e ? t == last ? i = 0 : i = ++t : t == 0 ? i = last : i = --t, n.selectedBgm = i, n.getEl().SetVariable("method:setUrl", p[n.selectedBgm].url)
    }, prevBgm:function () {
        n.setSelectedBgm(!1), n.play()
    }, nextBgm:function () {
        n.setSelectedBgm(!0), n.play()
    }, play:function () {
        if (!n.ready)return;
        n.position == 0 && n.setSelectedBgm(!1), n.getEl().SetVariable("method:play", ""), n.getEl().SetVariable("enabled", "true")
    }, pause:function () {
        n.getEl().SetVariable("method:pause", "")
    }, getTitle:function () {
        return p[n.selectedBgm].title
    }, initPlayer:function () {
    }, init:function () {
        var e;
        n = this, o = i ? "audio" : "flash", $.extend(n, v[o + "Player"]), e = $("#" + o + "_tmpl").html(), $("#musicPlayer").html(Handlebars.compile(e)), i && n.setAudio()
    }}, e
}), define("utils/bgmView", ["jquery", "utils/global", "utils/bgm"], function (e, t, n) {
    var r = !1, i = e("#bgmPlayer"), s = i.find(".toggle-play"), o = i.find(".nowplaying"), u = {_parent:null, init:function () {
        this._parent = n, n.init(), n.bind("change", function () {
            o.text(n.getTitle()).show(function () {
                setTimeout(function () {
                    o.hide()
                }, 1400)
            })
        }), i.hover(function () {
            o.show()
        },function () {
            o.hide()
        }).on("click", ".prev", u.prevBgm).on("click", ".next", u.nextBgm).on("click", ".play", u.play).on("click", ".pause", u.pause)
    }, play:function () {
        n.ready == 0 ? setTimeout(u.play, 200) : (r = !1, n.play(), o.text(n.getTitle()).show(), s.removeClass("play").addClass("pause"))
    }, autoPlay:function () {
        if (r)return;
        n.play()
    }, pause:function () {
        n.ready == 0 ? setTimeout(u.play, 200) : (r = !0, n.pause(), s.removeClass("pause").addClass("play"))
    }, autoPause:function () {
        n.pause()
    }, prevBgm:function () {
        n.prevBgm(), o.text(n.getTitle()), s.removeClass("play").addClass("pause")
    }, nextBgm:function () {
        n.nextBgm(), o.text(n.getTitle()), s.removeClass("play").addClass("pause")
    }};
    return u
}), function (e) {
    var t = new Array, n = new Array, r = function () {
    }, i = 0, s = {splashVPos:"35%", loaderVPos:"75%", splashID:"#jpreContent", showSplash:!0, showPercentage:!0, autoClose:!0, closeBtnText:"Start!", onetimeLoad:!1, debugMode:!1, splashFunction:function () {
    }}, o = function () {
        if (s.onetimeLoad) {
            var e = document.cookie.split("; ");
            for (var t = 0, n; n = e[t] && e[t].split("="); t++)if (n.shift() === "jpreLoader")return n.join("=");
            return!1
        }
        return!1
    }, u = function (e) {
        if (s.onetimeLoad) {
            var t = new Date;
            t.setDate(t.getDate() + e);
            var n = e == null ? "" : "expires=" + t.toUTCString();
            document.cookie = "jpreLoader=loaded; " + n
        }
    }, a = function () {
        jOverlay = e("<div></div>").attr("id", "jpreOverlay").css({position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:9999999}).appendTo("body");
        if (s.showSplash) {
            jContent = e("<div></div>").attr("id", "jpreSlide").appendTo(jOverlay);
            var t = e(window).width() - e(jContent).width();
            e(jContent).css({position:"absolute", top:s.splashVPos, left:Math.round(50 / e(window).width() * t) + "%"}), e(jContent).html(e(s.splashID).wrap("<div/>").parent().html()), e(s.splashID).remove(), s.splashFunction()
        }
        jLoader = e("<div></div>").attr("id", "jpreLoader").appendTo(jOverlay);
        var n = e(window).width() - e(jLoader).width();
        e(jLoader).css({position:"absolute", top:s.loaderVPos, left:Math.round(50 / e(window).width() * n) + "%"}), jBar = e("<div></div>").attr("id", "jpreBar").css({width:"0%", height:"100%"}).appendTo(jLoader), s.showPercentage && (jPer = e("<div></div>").attr("id", "jprePercentage").css({position:"relative", height:"100%"}).appendTo(jLoader).html("Loading...")), s.autoclose || (jButton = e("<div></div>").attr("id", "jpreButton").on("click",function () {
            p()
        }).css({position:"relative", height:"100%"}).appendTo(jLoader).text(s.closeBtnText).hide())
    }, f = function (n) {
        e(n).find("*:not(script)").each(function () {
            var n = "";
            if (e(this).css("background-image").indexOf("none") == -1 && e(this).css("background-image").indexOf("-gradient") == -1) {
                n = e(this).css("background-image");
                if (n.indexOf("url") != -1) {
                    var r = n.match(/url\((.*?)\)/);
                    n = r[1].replace(/\"/g, "")
                }
            } else e(this).get(0).nodeName.toLowerCase() == "img" && typeof e(this).attr("src") != "undefined" && (n = e(this).attr("src"));
            n.length > 0 && t.push(n)
        })
    }, l = function () {
        for (var e = 0; e < t.length; e++)c(t[e])
    }, c = function (t) {
        var r = new Image;
        e(r).load(function () {
            h()
        }).error(function () {
            n.push(e(this).attr("src")), h()
        }).attr("src", t)
    }, h = function () {
        i++;
        var n = Math.round(i / t.length * 100);
        e(jBar).stop().animate({width:n + "%"}, 500, "linear"), s.showPercentage && e(jPer).text(n + "%");
        if (i >= t.length) {
            i = t.length, u(), s.showPercentage && e(jPer).text("100%");
            if (s.debugMode)var r = d();
            e(jBar).stop().animate({width:"100%"}, 500, "linear", function () {
                s.autoClose ? p() : e(jButton).fadeIn(1e3)
            })
        }
    }, p = function () {
        e(jOverlay).fadeOut(800, function () {
            e(jOverlay).remove(), r()
        })
    }, d = function () {
        if (n.length > 0) {
            var e = "ERROR - IMAGE FILES MISSING!!!\n\r";
            e += n.length + " image files cound not be found. \n\r", e += "Please check your image paths and filenames:\n\r";
            for (var t = 0; t < n.length; t++)e += "- " + n[t] + "\n\r";
            return!0
        }
        return!1
    };
    e.fn.jpreLoader = function (t, n) {
        return t && e.extend(s, t), typeof n == "function" && (r = n), e("body").css({display:"block"}), this.each(function () {
            o() ? (e(s.splashID).remove(), r()) : (a(), f(this), l())
        })
    }
}(jQuery), define("lib/jpreloader.min", function () {
}), function (e) {
    function t(t) {
        var n = t || window.event, r = [].slice.call(arguments, 1), i = 0, s = !0, o = 0, u = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
    }

    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)for (var r = n.length; r;)e.event.fixHooks[n[--r]] = e.event.mouseHooks;
    e.event.special.mousewheel = {setup:function () {
        if (this.addEventListener)for (var e = n.length; e;)this.addEventListener(n[--e], t, !1); else this.onmousewheel = t
    }, teardown:function () {
        if (this.removeEventListener)for (var e = n.length; e;)this.removeEventListener(n[--e], t, !1); else this.onmousewheel = null
    }}, e.fn.extend({mousewheel:function (e) {
        return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    }, unmousewheel:function (e) {
        return this.unbind("mousewheel", e)
    }})
}(jQuery), define("lib/jquery.mousewheel.min", function () {
}), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {def:"easeOutQuad", swing:function (e, t, n, r, i) {
    return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
}, easeInQuad:function (e, t, n, r, i) {
    return r * (t /= i) * t + n
}, easeOutQuad:function (e, t, n, r, i) {
    return-r * (t /= i) * (t - 2) + n
}, easeInOutQuad:function (e, t, n, r, i) {
    return(t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
}, easeInCubic:function (e, t, n, r, i) {
    return r * (t /= i) * t * t + n
}, easeOutCubic:function (e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t + 1) + n
}, easeInOutCubic:function (e, t, n, r, i) {
    return(t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
}, easeInQuart:function (e, t, n, r, i) {
    return r * (t /= i) * t * t * t + n
}, easeOutQuart:function (e, t, n, r, i) {
    return-r * ((t = t / i - 1) * t * t * t - 1) + n
}, easeInOutQuart:function (e, t, n, r, i) {
    return(t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
}, easeInQuint:function (e, t, n, r, i) {
    return r * (t /= i) * t * t * t * t + n
}, easeOutQuint:function (e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t * t * t + 1) + n
}, easeInOutQuint:function (e, t, n, r, i) {
    return(t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
}, easeInSine:function (e, t, n, r, i) {
    return-r * Math.cos(t / i * (Math.PI / 2)) + r + n
}, easeOutSine:function (e, t, n, r, i) {
    return r * Math.sin(t / i * (Math.PI / 2)) + n
}, easeInOutSine:function (e, t, n, r, i) {
    return-r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
}, easeInExpo:function (e, t, n, r, i) {
    return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
}, easeOutExpo:function (e, t, n, r, i) {
    return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
}, easeInOutExpo:function (e, t, n, r, i) {
    return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
}, easeInCirc:function (e, t, n, r, i) {
    return-r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
}, easeOutCirc:function (e, t, n, r, i) {
    return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
}, easeInOutCirc:function (e, t, n, r, i) {
    return(t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
}, easeInElastic:function (e, t, n, r, i) {
    var s = 1.70158, o = 0, u = r;
    if (t == 0)return n;
    if ((t /= i) == 1)return n + r;
    o || (o = i * .3);
    if (u < Math.abs(r)) {
        u = r;
        var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return-(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
}, easeOutElastic:function (e, t, n, r, i) {
    var s = 1.70158, o = 0, u = r;
    if (t == 0)return n;
    if ((t /= i) == 1)return n + r;
    o || (o = i * .3);
    if (u < Math.abs(r)) {
        u = r;
        var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
}, easeInOutElastic:function (e, t, n, r, i) {
    var s = 1.70158, o = 0, u = r;
    if (t == 0)return n;
    if ((t /= i / 2) == 2)return n + r;
    o || (o = i * .3 * 1.5);
    if (u < Math.abs(r)) {
        u = r;
        var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
}, easeInBack:function (e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158), r * (t /= i) * t * ((s + 1) * t - s) + n
}, easeOutBack:function (e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158), r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
}, easeInOutBack:function (e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158), (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
}, easeInBounce:function (e, t, n, r, i) {
    return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
}, easeOutBounce:function (e, t, n, r, i) {
    return(t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
}, easeInOutBounce:function (e, t, n, r, i) {
    return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
}}), define("lib/jquery.easing.1.3", function () {
}), function (e) {
    function t(e, t) {
        var n = e.length;
        while (n--)if (e[n] === t)return n;
        return-1
    }

    function n(e) {
        var n, r, i, o, u;
        n = e.keyCode;
        if (n == 93 || n == 224)n = 91;
        if (n in p) {
            p[n] = !0;
            for (i in v)v[i] == n && (s[i] = !0);
            return
        }
        if (!s.filter.call(this, e))return;
        if (!(n in h))return;
        for (o = 0; o < h[n].length; o++) {
            r = h[n][o];
            if (r.scope == d || r.scope == "all") {
                u = r.mods.length > 0;
                for (i in p)if (!p[i] && t(r.mods, +i) > -1 || p[i] && t(r.mods, +i) == -1)u = !1;
                (r.mods.length == 0 && !p[16] && !p[18] && !p[17] && !p[91] || u) && r.method(e, r) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0))
            }
        }
    }

    function r(e) {
        var t = e.keyCode, n;
        if (t == 93 || t == 224)t = 91;
        if (t in p) {
            p[t] = !1;
            for (n in v)v[n] == t && (s[n] = !1)
        }
    }

    function i() {
        for (c in p)p[c] = !1;
        for (c in v)s[c] = !1
    }

    function s(e, t, n) {
        var r, i, s, o;
        n === undefined && (n = t, t = "all"), e = e.replace(/\s/g, ""), r = e.split(","), r[r.length - 1] == "" && (r[r.length - 2] += ",");
        for (s = 0; s < r.length; s++) {
            i = [], e = r[s].split("+");
            if (e.length > 1) {
                i = e.slice(0, e.length - 1);
                for (o = 0; o < i.length; o++)i[o] = v[i[o]];
                e = [e[e.length - 1]]
            }
            e = e[0], e = m[e] || e.toUpperCase().charCodeAt(0), e in h || (h[e] = []), h[e].push({shortcut:r[s], scope:t, method:n, key:r[s], mods:i})
        }
    }

    function o(e) {
        var t = (e.target || e.srcElement).tagName;
        return t != "INPUT" && t != "SELECT" && t != "TEXTAREA"
    }

    function u(e) {
        d = e || "all"
    }

    function a() {
        return d || "all"
    }

    function f(e) {
        var t, n, r;
        for (t in h) {
            n = h[t];
            for (r = 0; r < n.length;)n[r].scope === e ? n.splice(r, 1) : r++
        }
    }

    function l(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, function () {
            n(window.event)
        })
    }

    var c, h = {}, p = {16:!1, 18:!1, 17:!1, 91:!1}, d = "all", v = {"⇧":16, shift:16, "⌥":18, alt:18, option:18, "⌃":17, ctrl:17, control:17, "⌘":91, command:91}, m = {backspace:8, tab:9, clear:12, enter:13, "return":13, esc:27, escape:27, space:32, left:37, up:38, right:39, down:40, del:46, "delete":46, home:36, end:35, pageup:33, pagedown:34, ",":188, ".":190, "/":191, "`":192, "-":189, "=":187, ";":186, "'":222, "[":219, "]":221, "\\":220};
    for (c = 1; c < 20; c++)v["f" + c] = 111 + c;
    for (c in v)s[c] = !1;
    l(document, "keydown", n), l(document, "keyup", r), l(window, "focus", i), e.key = s, e.key.setScope = u, e.key.getScope = a, e.key.deleteScope = f, e.key.filter = o, typeof module != "undefined" && (module.exports = key)
}(this), define("lib/keymaster.min", function () {
}), function (e, t) {
    function L(e) {
        return typeof e == "string"
    }

    function A(e) {
        var t = r.call(arguments, 1);
        return function () {
            return e.apply(this, t.concat(r.call(arguments)))
        }
    }

    function O(e) {
        return e.replace(x, "$2")
    }

    function M(e) {
        return e.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function _(t, r, s, u, f) {
        var l, c, h, p, d;
        return u !== n ? (h = s.match(t ? x : /^([^#?]*)\??([^#]*)(#?.*)/), d = h[3] || "", f === 2 && L(u) ? c = u.replace(t ? S : E, "") : (p = a(h[2]), u = L(u) ? a[t ? g : m](u) : u, c = f === 2 ? u : f === 1 ? e.extend({}, u, p) : e.extend({}, p, u), c = o(c), t && (c = c.replace(T, i))), l = h[1] + (t ? C : c || !h[1] ? "?" : "") + c + d) : l = r(s !== n ? s : location.href), l
    }

    function D(e, t, r) {
        return t === n || typeof t == "boolean" ? (r = t, t = s[e ? g : m]()) : t = L(t) ? t.replace(e ? S : E, "") : t, a(t, r)
    }

    function P(t, r, i, o) {
        return!L(i) && typeof i != "object" && (o = i, i = r, r = n), this.each(function () {
            var n = e(this), u = r || p()[(this.nodeName || "").toLowerCase()] || "", a = u && n.attr(u) || "";
            n.attr(u, s[t](a, i, o))
        })
    }

    var n, r = Array.prototype.slice, i = decodeURIComponent, s = e.param, o, u, a, f, l = e.bbq = e.bbq || {}, c, h, p, d = e.event.special, v = "hashchange", m = "querystring", g = "fragment", y = "elemUrlAttr", b = "href", w = "src", E = /^.*\?|#.*$/g, S, x, T, N, C, k = {};
    s[m] = A(_, 0, M), s[g] = u = A(_, 1, O), s.sorted = o = function (t, n) {
        var r = [], i = {};
        return e.each(s(t, n).split("&"), function (e, t) {
            var n = t.replace(/(?:%5B|=).*$/, ""), s = i[n];
            s || (s = i[n] = [], r.push(n)), s.push(t)
        }), e.map(r.sort(),function (e) {
            return i[e]
        }).join("&")
    }, u.noEscape = function (t) {
        t = t || "";
        var n = e.map(t.split(""), encodeURIComponent);
        T = new RegExp(n.join("|"), "g")
    }, u.noEscape(",/"), u.ajaxCrawlable = function (e) {
        return e !== n && (e ? (S = /^.*(?:#!|#)/, x = /^([^#]*)(?:#!|#)?(.*)$/, C = "#!") : (S = /^.*#/, x = /^([^#]*)#?(.*)$/, C = "#"), N = !!e), N
    }, u.ajaxCrawlable(0), e.deparam = a = function (t, r) {
        var s = {}, o = {"true":!0, "false":!1, "null":null};
        return e.each(t.replace(/\+/g, " ").split("&"), function (t, u) {
            var a = u.split("="), f = i(a[0]), l, c = s, h = 0, p = f.split("]["), d = p.length - 1;
            /\[/.test(p[0]) && /\]$/.test(p[d]) ? (p[d] = p[d].replace(/\]$/, ""), p = p.shift().split("[").concat(p), d = p.length - 1) : d = 0;
            if (a.length === 2) {
                l = i(a[1]), r && (l = l && !isNaN(l) ? +l : l === "undefined" ? n : o[l] !== n ? o[l] : l);
                if (d)for (; h <= d; h++)f = p[h] === "" ? c.length : p[h], c = c[f] = h < d ? c[f] || (p[h + 1] && isNaN(p[h + 1]) ? {} : []) : l; else e.isArray(s[f]) ? s[f].push(l) : s[f] !== n ? s[f] = [s[f], l] : s[f] = l
            } else f && (s[f] = r ? n : "")
        }), s
    }, a[m] = A(D, 0), a[g] = f = A(D, 1), e[y] || (e[y] = function (t) {
        return e.extend(k, t)
    })({a:b, base:b, iframe:w, img:w, input:w, form:"action", link:b, script:w}), p = e[y], e.fn[m] = A(P, m), e.fn[g] = A(P, g), l.pushState = c = function (e, t) {
        L(e) && /^#/.test(e) && t === n && (t = 2);
        var r = e !== n, i = u(location.href, r ? e : {}, r ? t : 2);
        location.href = i
    }, l.getState = h = function (e, t) {
        return e === n || typeof e == "boolean" ? f(e) : f(t)[e]
    }, l.removeState = function (t) {
        var r = {};
        t !== n && (r = h(), e.each(e.isArray(t) ? t : arguments, function (e, t) {
            delete r[t]
        })), c(r, 2)
    }, d[v] = e.extend(d[v], {add:function (t) {
        function i(e) {
            var t = e[g] = u();
            e.getState = function (e, r) {
                return e === n || typeof e == "boolean" ? a(t, e) : a(t, r)[e]
            }, r.apply(this, arguments)
        }

        var r;
        if (e.isFunction(t))return r = t, i;
        r = t.handler, t.handler = i
    }})
}(jQuery, this), function (e, t, n) {
    function f(e) {
        return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
    }

    var r = "hashchange", i = document, s, o = e.event.special, u = i.documentMode, a = "on" + r in t && (u === n || u > 7);
    e.fn[r] = function (e) {
        return e ? this.bind(r, e) : this.trigger(r)
    }, e.fn[r].delay = 50, o[r] = e.extend(o[r], {setup:function () {
        if (a)return!1;
        e(s.start)
    }, teardown:function () {
        if (a)return!1;
        e(s.stop)
    }}), s = function () {
        function m() {
            var n = f(), i = v(u);
            n !== u ? (p(u = n, i), e(t).trigger(r)) : i !== u && (location.href = location.href.replace(/#.*/, "") + i), o = setTimeout(m, e.fn[r].delay)
        }

        var s = {}, o, u = f(), l = function (e) {
            return e
        }, p = l, v = l;
        return s.start = function () {
            o || m()
        }, s.stop = function () {
            o && clearTimeout(o), o = n
        }, e.browser.msie && !a && function () {
            var t, n;
            s.start = function () {
                t || (n = e.fn[r].src, n = n && n + f(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function () {
                    n || p(f()), m()
                }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function () {
                    try {
                        event.propertyName === "title" && (t.document.title = i.title)
                    } catch (e) {
                    }
                })
            }, s.stop = l, v = function () {
                return f(t.location.href)
            }, p = function (n, s) {
                var o = t.document, u = e.fn[r].domain;
                n !== s && (o.title = i.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n)
            }
        }(), s
    }()
}(jQuery, this), define("lib/jquery.ba-bbq.min", function () {
}), this.Handlebars = {}, function (e) {
    e.VERSION = "1.0.rc.1", e.helpers = {}, e.partials = {}, e.registerHelper = function (e, t, n) {
        n && (t.not = n), this.helpers[e] = t
    }, e.registerPartial = function (e, t) {
        this.partials[e] = t
    }, e.registerHelper("helperMissing", function (e) {
        if (arguments.length === 2)return undefined;
        throw new Error("Could not find property '" + e + "'")
    });
    var t = Object.prototype.toString, n = "[object Function]";
    e.registerHelper("blockHelperMissing", function (r, i) {
        var s = i.inverse || function () {
        }, o = i.fn, u = "", a = t.call(r);
        return a === n && (r = r.call(this)), r === !0 ? o(this) : r === !1 || r == null ? s(this) : a === "[object Array]" ? r.length > 0 ? e.helpers.each(r, i) : s(this) : o(r)
    }), e.K = function () {
    }, e.createFrame = Object.create || function (t) {
        e.K.prototype = t;
        var n = new e.K;
        return e.K.prototype = null, n
    }, e.registerHelper("each", function (t, n) {
        var r = n.fn, i = n.inverse, s = 0, o = "", u;
        n.data && (u = e.createFrame(n.data));
        if (t && typeof t == "object")if (t instanceof Array)for (var a = t.length; s < a; s++)u && (u.index = s), o += r(t[s], {data:u}); else for (var f in t)t.hasOwnProperty(f) && (u && (u.key = f), o += r(t[f], {data:u}), s++);
        return s === 0 && (o = i(this)), o
    }), e.registerHelper("if", function (r, i) {
        var s = t.call(r);
        return s === n && (r = r.call(this)), !r || e.Utils.isEmpty(r) ? i.inverse(this) : i.fn(this)
    }), e.registerHelper("unless", function (t, n) {
        var r = n.fn, i = n.inverse;
        return n.fn = i, n.inverse = r, e.helpers["if"].call(this, t, n)
    }), e.registerHelper("with", function (e, t) {
        return t.fn(e)
    }), e.registerHelper("log", function (t) {
        e.log(t)
    })
}(this.Handlebars);
var handlebars = function () {
    function e() {
        this.yy = {}
    }

    var t = {trace:function () {
    }, yy:{}, symbols_:{error:2, root:3, program:4, EOF:5, statements:6, simpleInverse:7, statement:8, openInverse:9, closeBlock:10, openBlock:11, mustache:12, partial:13, CONTENT:14, COMMENT:15, OPEN_BLOCK:16, inMustache:17, CLOSE:18, OPEN_INVERSE:19, OPEN_ENDBLOCK:20, path:21, OPEN:22, OPEN_UNESCAPED:23, OPEN_PARTIAL:24, params:25, hash:26, DATA:27, param:28, STRING:29, INTEGER:30, BOOLEAN:31, hashSegments:32, hashSegment:33, ID:34, EQUALS:35, pathSegments:36, SEP:37, $accept:0, $end:1}, terminals_:{2:"error", 5:"EOF", 14:"CONTENT", 15:"COMMENT", 16:"OPEN_BLOCK", 18:"CLOSE", 19:"OPEN_INVERSE", 20:"OPEN_ENDBLOCK", 22:"OPEN", 23:"OPEN_UNESCAPED", 24:"OPEN_PARTIAL", 27:"DATA", 29:"STRING", 30:"INTEGER", 31:"BOOLEAN", 34:"ID", 35:"EQUALS", 37:"SEP"}, productions_:[0, [3, 2], [4, 3], [4, 1], [4, 0], [6, 1], [6, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [7, 2], [17, 3], [17, 2], [17, 2], [17, 1], [17, 1], [25, 2], [25, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [26, 1], [32, 2], [32, 1], [33, 3], [33, 3], [33, 3], [33, 3], [33, 3], [21, 1], [36, 3], [36, 1]], performAction:function (e, t, n, r, i, s, o) {
        var u = s.length - 1;
        switch (i) {
            case 1:
                return s[u - 1];
            case 2:
                this.$ = new r.ProgramNode(s[u - 2], s[u]);
                break;
            case 3:
                this.$ = new r.ProgramNode(s[u]);
                break;
            case 4:
                this.$ = new r.ProgramNode([]);
                break;
            case 5:
                this.$ = [s[u]];
                break;
            case 6:
                s[u - 1].push(s[u]), this.$ = s[u - 1];
                break;
            case 7:
                this.$ = new r.BlockNode(s[u - 2], s[u - 1].inverse, s[u - 1], s[u]);
                break;
            case 8:
                this.$ = new r.BlockNode(s[u - 2], s[u - 1], s[u - 1].inverse, s[u]);
                break;
            case 9:
                this.$ = s[u];
                break;
            case 10:
                this.$ = s[u];
                break;
            case 11:
                this.$ = new r.ContentNode(s[u]);
                break;
            case 12:
                this.$ = new r.CommentNode(s[u]);
                break;
            case 13:
                this.$ = new r.MustacheNode(s[u - 1][0], s[u - 1][1]);
                break;
            case 14:
                this.$ = new r.MustacheNode(s[u - 1][0], s[u - 1][1]);
                break;
            case 15:
                this.$ = s[u - 1];
                break;
            case 16:
                this.$ = new r.MustacheNode(s[u - 1][0], s[u - 1][1]);
                break;
            case 17:
                this.$ = new r.MustacheNode(s[u - 1][0], s[u - 1][1], !0);
                break;
            case 18:
                this.$ = new r.PartialNode(s[u - 1]);
                break;
            case 19:
                this.$ = new r.PartialNode(s[u - 2], s[u - 1]);
                break;
            case 20:
                break;
            case 21:
                this.$ = [[s[u - 2]].concat(s[u - 1]), s[u]];
                break;
            case 22:
                this.$ = [[s[u - 1]].concat(s[u]), null];
                break;
            case 23:
                this.$ = [
                    [s[u - 1]],
                    s[u]
                ];
                break;
            case 24:
                this.$ = [
                    [s[u]],
                    null
                ];
                break;
            case 25:
                this.$ = [
                    [new r.DataNode(s[u])],
                    null
                ];
                break;
            case 26:
                s[u - 1].push(s[u]), this.$ = s[u - 1];
                break;
            case 27:
                this.$ = [s[u]];
                break;
            case 28:
                this.$ = s[u];
                break;
            case 29:
                this.$ = new r.StringNode(s[u]);
                break;
            case 30:
                this.$ = new r.IntegerNode(s[u]);
                break;
            case 31:
                this.$ = new r.BooleanNode(s[u]);
                break;
            case 32:
                this.$ = new r.DataNode(s[u]);
                break;
            case 33:
                this.$ = new r.HashNode(s[u]);
                break;
            case 34:
                s[u - 1].push(s[u]), this.$ = s[u - 1];
                break;
            case 35:
                this.$ = [s[u]];
                break;
            case 36:
                this.$ = [s[u - 2], s[u]];
                break;
            case 37:
                this.$ = [s[u - 2], new r.StringNode(s[u])];
                break;
            case 38:
                this.$ = [s[u - 2], new r.IntegerNode(s[u])];
                break;
            case 39:
                this.$ = [s[u - 2], new r.BooleanNode(s[u])];
                break;
            case 40:
                this.$ = [s[u - 2], new r.DataNode(s[u])];
                break;
            case 41:
                this.$ = new r.IdNode(s[u]);
                break;
            case 42:
                s[u - 2].push(s[u]), this.$ = s[u - 2];
                break;
            case 43:
                this.$ = [s[u]]
        }
    }, table:[
        {3:1, 4:2, 5:[2, 4], 6:3, 8:4, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 11], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {1:[3]},
        {5:[1, 16]},
        {5:[2, 3], 7:17, 8:18, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 19], 20:[2, 3], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {5:[2, 5], 14:[2, 5], 15:[2, 5], 16:[2, 5], 19:[2, 5], 20:[2, 5], 22:[2, 5], 23:[2, 5], 24:[2, 5]},
        {4:20, 6:3, 8:4, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 11], 20:[2, 4], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {4:21, 6:3, 8:4, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 11], 20:[2, 4], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {5:[2, 9], 14:[2, 9], 15:[2, 9], 16:[2, 9], 19:[2, 9], 20:[2, 9], 22:[2, 9], 23:[2, 9], 24:[2, 9]},
        {5:[2, 10], 14:[2, 10], 15:[2, 10], 16:[2, 10], 19:[2, 10], 20:[2, 10], 22:[2, 10], 23:[2, 10], 24:[2, 10]},
        {5:[2, 11], 14:[2, 11], 15:[2, 11], 16:[2, 11], 19:[2, 11], 20:[2, 11], 22:[2, 11], 23:[2, 11], 24:[2, 11]},
        {5:[2, 12], 14:[2, 12], 15:[2, 12], 16:[2, 12], 19:[2, 12], 20:[2, 12], 22:[2, 12], 23:[2, 12], 24:[2, 12]},
        {17:22, 21:23, 27:[1, 24], 34:[1, 26], 36:25},
        {17:27, 21:23, 27:[1, 24], 34:[1, 26], 36:25},
        {17:28, 21:23, 27:[1, 24], 34:[1, 26], 36:25},
        {17:29, 21:23, 27:[1, 24], 34:[1, 26], 36:25},
        {21:30, 34:[1, 26], 36:25},
        {1:[2, 1]},
        {6:31, 8:4, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 11], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {5:[2, 6], 14:[2, 6], 15:[2, 6], 16:[2, 6], 19:[2, 6], 20:[2, 6], 22:[2, 6], 23:[2, 6], 24:[2, 6]},
        {17:22, 18:[1, 32], 21:23, 27:[1, 24], 34:[1, 26], 36:25},
        {10:33, 20:[1, 34]},
        {10:35, 20:[1, 34]},
        {18:[1, 36]},
        {18:[2, 24], 21:41, 25:37, 26:38, 27:[1, 45], 28:39, 29:[1, 42], 30:[1, 43], 31:[1, 44], 32:40, 33:46, 34:[1, 47], 36:25},
        {18:[2, 25]},
        {18:[2, 41], 27:[2, 41], 29:[2, 41], 30:[2, 41], 31:[2, 41], 34:[2, 41], 37:[1, 48]},
        {18:[2, 43], 27:[2, 43], 29:[2, 43], 30:[2, 43], 31:[2, 43], 34:[2, 43], 37:[2, 43]},
        {18:[1, 49]},
        {18:[1, 50]},
        {18:[1, 51]},
        {18:[1, 52], 21:53, 34:[1, 26], 36:25},
        {5:[2, 2], 8:18, 9:5, 11:6, 12:7, 13:8, 14:[1, 9], 15:[1, 10], 16:[1, 12], 19:[1, 11], 20:[2, 2], 22:[1, 13], 23:[1, 14], 24:[1, 15]},
        {14:[2, 20], 15:[2, 20], 16:[2, 20], 19:[2, 20], 22:[2, 20], 23:[2, 20], 24:[2, 20]},
        {5:[2, 7], 14:[2, 7], 15:[2, 7], 16:[2, 7], 19:[2, 7], 20:[2, 7], 22:[2, 7], 23:[2, 7], 24:[2, 7]},
        {21:54, 34:[1, 26], 36:25},
        {5:[2, 8], 14:[2, 8], 15:[2, 8], 16:[2, 8], 19:[2, 8], 20:[2, 8], 22:[2, 8], 23:[2, 8], 24:[2, 8]},
        {14:[2, 14], 15:[2, 14], 16:[2, 14], 19:[2, 14], 20:[2, 14], 22:[2, 14], 23:[2, 14], 24:[2, 14]},
        {18:[2, 22], 21:41, 26:55, 27:[1, 45], 28:56, 29:[1, 42], 30:[1, 43], 31:[1, 44], 32:40, 33:46, 34:[1, 47], 36:25},
        {18:[2, 23]},
        {18:[2, 27], 27:[2, 27], 29:[2, 27], 30:[2, 27], 31:[2, 27], 34:[2, 27]},
        {18:[2, 33], 33:57, 34:[1, 58]},
        {18:[2, 28], 27:[2, 28], 29:[2, 28], 30:[2, 28], 31:[2, 28], 34:[2, 28]},
        {18:[2, 29], 27:[2, 29], 29:[2, 29], 30:[2, 29], 31:[2, 29], 34:[2, 29]},
        {18:[2, 30], 27:[2, 30], 29:[2, 30], 30:[2, 30], 31:[2, 30], 34:[2, 30]},
        {18:[2, 31], 27:[2, 31], 29:[2, 31], 30:[2, 31], 31:[2, 31], 34:[2, 31]},
        {18:[2, 32], 27:[2, 32], 29:[2, 32], 30:[2, 32], 31:[2, 32], 34:[2, 32]},
        {18:[2, 35], 34:[2, 35]},
        {18:[2, 43], 27:[2, 43], 29:[2, 43], 30:[2, 43], 31:[2, 43], 34:[2, 43], 35:[1, 59], 37:[2, 43]},
        {34:[1, 60]},
        {14:[2, 13], 15:[2, 13], 16:[2, 13], 19:[2, 13], 20:[2, 13], 22:[2, 13], 23:[2, 13], 24:[2, 13]},
        {5:[2, 16], 14:[2, 16], 15:[2, 16], 16:[2, 16], 19:[2, 16], 20:[2, 16], 22:[2, 16], 23:[2, 16], 24:[2, 16]},
        {5:[2, 17], 14:[2, 17], 15:[2, 17], 16:[2, 17], 19:[2, 17], 20:[2, 17], 22:[2, 17], 23:[2, 17], 24:[2, 17]},
        {5:[2, 18], 14:[2, 18], 15:[2, 18], 16:[2, 18], 19:[2, 18], 20:[2, 18], 22:[2, 18], 23:[2, 18], 24:[2, 18]},
        {18:[1, 61]},
        {18:[1, 62]},
        {18:[2, 21]},
        {18:[2, 26], 27:[2, 26], 29:[2, 26], 30:[2, 26], 31:[2, 26], 34:[2, 26]},
        {18:[2, 34], 34:[2, 34]},
        {35:[1, 59]},
        {21:63, 27:[1, 67], 29:[1, 64], 30:[1, 65], 31:[1, 66], 34:[1, 26], 36:25},
        {18:[2, 42], 27:[2, 42], 29:[2, 42], 30:[2, 42], 31:[2, 42], 34:[2, 42], 37:[2, 42]},
        {5:[2, 19], 14:[2, 19], 15:[2, 19], 16:[2, 19], 19:[2, 19], 20:[2, 19], 22:[2, 19], 23:[2, 19], 24:[2, 19]},
        {5:[2, 15], 14:[2, 15], 15:[2, 15], 16:[2, 15], 19:[2, 15], 20:[2, 15], 22:[2, 15], 23:[2, 15], 24:[2, 15]},
        {18:[2, 36], 34:[2, 36]},
        {18:[2, 37], 34:[2, 37]},
        {18:[2, 38], 34:[2, 38]},
        {18:[2, 39], 34:[2, 39]},
        {18:[2, 40], 34:[2, 40]}
    ], defaultActions:{16:[2, 1], 24:[2, 25], 38:[2, 23], 55:[2, 21]}, parseError:function (e, t) {
        throw new Error(e)
    }, parse:function (e) {
        function t(e) {
            i.length = i.length - 2 * e, s.length = s.length - e, o.length = o.length - e
        }

        function n() {
            var e;
            return e = r.lexer.lex() || 1, typeof e != "number" && (e = r.symbols_[e] || e), e
        }

        var r = this, i = [0], s = [null], o = [], u = this.table, a = "", f = 0, l = 0, c = 0, h = 2, p = 1;
        this.lexer.setInput(e), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
        var d = this.lexer.yylloc;
        o.push(d);
        var v = this.lexer.options && this.lexer.options.ranges;
        typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
        var m, g, y, b, w, E, S = {}, x, T, N, C;
        for (; ;) {
            y = i[i.length - 1];
            if (this.defaultActions[y])b = this.defaultActions[y]; else {
                if (m === null || typeof m == "undefined")m = n();
                b = u[y] && u[y][m]
            }
            if (typeof b == "undefined" || !b.length || !b[0]) {
                var k = "";
                if (!c) {
                    C = [];
                    for (x in u[y])this.terminals_[x] && x > 2 && C.push("'" + this.terminals_[x] + "'");
                    this.lexer.showPosition ? k = "Parse error on line " + (f + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + C.join(", ") + ", got '" + (this.terminals_[m] || m) + "'" : k = "Parse error on line " + (f + 1) + ": Unexpected " + (m == 1 ? "end of input" : "'" + (this.terminals_[m] || m) + "'"), this.parseError(k, {text:this.lexer.match, token:this.terminals_[m] || m, line:this.lexer.yylineno, loc:d, expected:C})
                }
            }
            if (b[0]instanceof Array && b.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + y + ", token: " + m);
            switch (b[0]) {
                case 1:
                    i.push(m), s.push(this.lexer.yytext), o.push(this.lexer.yylloc), i.push(b[1]), m = null, g ? (m = g, g = null) : (l = this.lexer.yyleng, a = this.lexer.yytext, f = this.lexer.yylineno, d = this.lexer.yylloc, c > 0 && c--);
                    break;
                case 2:
                    T = this.productions_[b[1]][1], S.$ = s[s.length - T], S._$ = {first_line:o[o.length - (T || 1)].first_line, last_line:o[o.length - 1].last_line, first_column:o[o.length - (T || 1)].first_column, last_column:o[o.length - 1].last_column}, v && (S._$.range = [o[o.length - (T || 1)].range[0], o[o.length - 1].range[1]]), E = this.performAction.call(S, a, l, f, this.yy, b[1], s, o);
                    if (typeof E != "undefined")return E;
                    T && (i = i.slice(0, -1 * T * 2), s = s.slice(0, -1 * T), o = o.slice(0, -1 * T)), i.push(this.productions_[b[1]][0]), s.push(S.$), o.push(S._$), N = u[i[i.length - 2]][i[i.length - 1]], i.push(N);
                    break;
                case 3:
                    return!0
            }
        }
        return!0
    }}, n = function () {
        var e = {EOF:1, parseError:function (e, t) {
            if (!this.yy.parser)throw new Error(e);
            this.yy.parser.parseError(e, t)
        }, setInput:function (e) {
            return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {first_line:1, first_column:0, last_line:1, last_column:0}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
        }, input:function () {
            var e = this._input[0];
            this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
            var t = e.match(/(?:\r\n?|\n).*/g);
            return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
        }, unput:function (e) {
            var t = e.length, n = e.split(/(?:\r\n?|\n)/g);
            this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
            var r = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
            var i = this.yylloc.range;
            return this.yylloc = {first_line:this.yylloc.first_line, last_line:this.yylineno + 1, first_column:this.yylloc.first_column, last_column:n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t}, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this
        }, more:function () {
            return this._more = !0, this
        }, less:function (e) {
            this.unput(this.match.slice(e))
        }, pastInput:function () {
            var e = this.matched.substr(0, this.matched.length - this.match.length);
            return(e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
        }, upcomingInput:function () {
            var e = this.match;
            return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
        }, showPosition:function () {
            var e = this.pastInput(), t = (new Array(e.length + 1)).join("-");
            return e + this.upcomingInput() + "\n" + t + "^"
        }, next:function () {
            if (this.done)return this.EOF;
            this._input || (this.done = !0);
            var e, t, n, r, i, s;
            this._more || (this.yytext = "", this.match = "");
            var o = this._currentRules();
            for (var u = 0; u < o.length; u++) {
                n = this._input.match(this.rules[o[u]]);
                if (n && (!t || n[0].length > t[0].length)) {
                    t = n, r = u;
                    if (!this.options.flex)break
                }
            }
            if (t) {
                s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {first_line:this.yylloc.last_line, last_line:this.yylineno + 1, first_column:this.yylloc.last_column, last_column:s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length}, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
                if (e)return e;
                return
            }
            return this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text:"", token:null, line:this.yylineno})
        }, lex:function () {
            var e = this.next();
            return typeof e != "undefined" ? e : this.lex()
        }, begin:function (e) {
            this.conditionStack.push(e)
        }, popState:function () {
            return this.conditionStack.pop()
        }, _currentRules:function () {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
        }, topState:function () {
            return this.conditionStack[this.conditionStack.length - 2]
        }, pushState:function (e) {
            this.begin(e)
        }};
        return e.options = {}, e.performAction = function (e, t, n, r) {
            var i = r;
            switch (n) {
                case 0:
                    t.yytext.slice(-1) !== "\\" && this.begin("mu"), t.yytext.slice(-1) === "\\" && (t.yytext = t.yytext.substr(0, t.yyleng - 1), this.begin("emu"));
                    if (t.yytext)return 14;
                    break;
                case 1:
                    return 14;
                case 2:
                    return t.yytext.slice(-1) !== "\\" && this.popState(), t.yytext.slice(-1) === "\\" && (t.yytext = t.yytext.substr(0, t.yyleng - 1)), 14;
                case 3:
                    return t.yytext = t.yytext.substr(0, t.yyleng - 4), this.popState(), 15;
                case 4:
                    return 24;
                case 5:
                    return 16;
                case 6:
                    return 20;
                case 7:
                    return 19;
                case 8:
                    return 19;
                case 9:
                    return 23;
                case 10:
                    return 23;
                case 11:
                    this.popState(), this.begin("com");
                    break;
                case 12:
                    return t.yytext = t.yytext.substr(3, t.yyleng - 5), this.popState(), 15;
                case 13:
                    return 22;
                case 14:
                    return 35;
                case 15:
                    return 34;
                case 16:
                    return 34;
                case 17:
                    return 37;
                case 18:
                    break;
                case 19:
                    return this.popState(), 18;
                case 20:
                    return this.popState(), 18;
                case 21:
                    return t.yytext = t.yytext.substr(1, t.yyleng - 2).replace(/\\"/g, '"'), 29;
                case 22:
                    return t.yytext = t.yytext.substr(1, t.yyleng - 2).replace(/\\'/g, "'"), 29;
                case 23:
                    return t.yytext = t.yytext.substr(1), 27;
                case 24:
                    return 31;
                case 25:
                    return 31;
                case 26:
                    return 30;
                case 27:
                    return 34;
                case 28:
                    return t.yytext = t.yytext.substr(1, t.yyleng - 2), 34;
                case 29:
                    return"INVALID";
                case 30:
                    return 5
            }
        }, e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[} ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], e.conditions = {mu:{rules:[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], inclusive:!1}, emu:{rules:[2], inclusive:!1}, com:{rules:[3], inclusive:!1}, INITIAL:{rules:[0, 1, 30], inclusive:!0}}, e
    }();
    return t.lexer = n, e.prototype = t, t.Parser = e, new e
}();
typeof require != "undefined" && typeof exports != "undefined" && (exports.parser = handlebars, exports.Parser = handlebars.Parser, exports.parse = function () {
    return handlebars.parse.apply(handlebars, arguments)
}, exports.main = function (e) {
    if (!e[1])throw new Error("Usage: " + e[0] + " FILE");
    var t, n;
    return typeof process != "undefined" ? t = require("fs").readFileSync(require("path").resolve(e[1]), "utf8") : t = require("file").path(require("file").cwd()).join(e[1]).read({charset:"utf-8"}), exports.parser.parse(t)
}, typeof module != "undefined" && require.main === module && exports.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args)), Handlebars.Parser = handlebars, Handlebars.parse = function (e) {
    return Handlebars.Parser.yy = Handlebars.AST, Handlebars.Parser.parse(e)
}, Handlebars.print = function (e) {
    return(new Handlebars.PrintVisitor).accept(e)
}, Handlebars.logger = {DEBUG:0, INFO:1, WARN:2, ERROR:3, level:3, log:function (e, t) {
}}, Handlebars.log = function (e, t) {
    Handlebars.logger.log(e, t)
}, function () {
    Handlebars.AST = {}, Handlebars.AST.ProgramNode = function (e, t) {
        this.type = "program", this.statements = e, t && (this.inverse = new Handlebars.AST.ProgramNode(t))
    }, Handlebars.AST.MustacheNode = function (e, t, n) {
        this.type = "mustache", this.escaped = !n, this.hash = t;
        var r = this.id = e[0], i = this.params = e.slice(1), s = this.eligibleHelper = r.isSimple;
        this.isHelper = s && (i.length || t)
    }, Handlebars.AST.PartialNode = function (e, t) {
        this.type = "partial", this.id = e, this.context = t
    };
    var e = function (e, t) {
        if (e.original !== t.original)throw new Handlebars.Exception(e.original + " doesn't match " + t.original)
    };
    Handlebars.AST.BlockNode = function (t, n, r, i) {
        e(t.id, i), this.type = "block", this.mustache = t, this.program = n, this.inverse = r, this.inverse && !this.program && (this.isInverse = !0)
    }, Handlebars.AST.ContentNode = function (e) {
        this.type = "content", this.string = e
    }, Handlebars.AST.HashNode = function (e) {
        this.type = "hash", this.pairs = e
    }, Handlebars.AST.IdNode = function (e) {
        this.type = "ID", this.original = e.join(".");
        var t = [], n = 0;
        for (var r = 0, i = e.length; r < i; r++) {
            var s = e[r];
            s === ".." ? n++ : s === "." || s === "this" ? this.isScoped = !0 : t.push(s)
        }
        this.parts = t, this.string = t.join("."), this.depth = n, this.isSimple = e.length === 1 && !this.isScoped && n === 0
    }, Handlebars.AST.DataNode = function (e) {
        this.type = "DATA", this.id = e
    }, Handlebars.AST.StringNode = function (e) {
        this.type = "STRING", this.string = e
    }, Handlebars.AST.IntegerNode = function (e) {
        this.type = "INTEGER", this.integer = e
    }, Handlebars.AST.BooleanNode = function (e) {
        this.type = "BOOLEAN", this.bool = e
    }, Handlebars.AST.CommentNode = function (e) {
        this.type = "comment", this.comment = e
    }
}();
var errorProps = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
Handlebars.Exception = function (e) {
    var t = Error.prototype.constructor.apply(this, arguments);
    for (var n = 0; n < errorProps.length; n++)this[errorProps[n]] = t[errorProps[n]]
}, Handlebars.Exception.prototype = new Error, Handlebars.SafeString = function (e) {
    this.string = e
}, Handlebars.SafeString.prototype.toString = function () {
    return this.string.toString()
}, function () {
    var e = {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#x27;", "`":"&#x60;"}, t = /[&<>"'`]/g, n = /[&<>"'`]/, r = function (t) {
        return e[t] || "&amp;"
    };
    Handlebars.Utils = {escapeExpression:function (e) {
        return e instanceof Handlebars.SafeString ? e.toString() : e == null || e === !1 ? "" : n.test(e) ? e.replace(t, r) : e
    }, isEmpty:function (e) {
        return typeof e == "undefined" ? !0 : e === null ? !0 : e === !1 ? !0 : Object.prototype.toString.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
    }}
}(), Handlebars.Compiler = function () {
}, Handlebars.JavaScriptCompiler = function () {
}, function (e, t) {
    e.prototype = {compiler:e, disassemble:function () {
        var e = this.opcodes, t, n = [], r, i;
        for (var s = 0, o = e.length; s < o; s++) {
            t = e[s];
            if (t.opcode === "DECLARE")n.push("DECLARE " + t.name + "=" + t.value); else {
                r = [];
                for (var u = 0; u < t.args.length; u++)i = t.args[u], typeof i == "string" && (i = '"' + i.replace("\n", "\\n") + '"'), r.push(i);
                n.push(t.opcode + " " + r.join(" "))
            }
        }
        return n.join("\n")
    }, guid:0, compile:function (e, t) {
        this.children = [], this.depths = {list:[]}, this.options = t;
        var n = this.options.knownHelpers;
        this.options.knownHelpers = {helperMissing:!0, blockHelperMissing:!0, each:!0, "if":!0, unless:!0, "with":!0, log:!0};
        if (n)for (var r in n)this.options.knownHelpers[r] = n[r];
        return this.program(e)
    }, accept:function (e) {
        return this[e.type](e)
    }, program:function (e) {
        var t = e.statements, n;
        this.opcodes = [];
        for (var r = 0, i = t.length; r < i; r++)n = t[r], this[n.type](n);
        return this.isSimple = i === 1, this.depths.list = this.depths.list.sort(function (e, t) {
            return e - t
        }), this
    }, compileProgram:function (e) {
        var t = (new this.compiler).compile(e, this.options), n = this.guid++, r;
        this.usePartial = this.usePartial || t.usePartial, this.children[n] = t;
        for (var i = 0, s = t.depths.list.length; i < s; i++) {
            r = t.depths.list[i];
            if (r < 2)continue;
            this.addDepth(r - 1)
        }
        return n
    }, block:function (e) {
        var t = e.mustache, n = e.program, r = e.inverse;
        n && (n = this.compileProgram(n)), r && (r = this.compileProgram(r));
        var i = this.classifyMustache(t);
        i === "helper" ? this.helperMustache(t, n, r) : i === "simple" ? (this.simpleMustache(t), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("blockValue")) : (this.ambiguousMustache(t, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("ambiguousBlockValue")), this.opcode("append")
    }, hash:function (e) {
        var t = e.pairs, n, r;
        this.opcode("push", "{}");
        for (var i = 0, s = t.length; i < s; i++)n = t[i], r = n[1], this.accept(r), this.opcode("assignToHash", n[0])
    }, partial:function (e) {
        var t = e.id;
        this.usePartial = !0, e.context ? this.ID(e.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", t.original), this.opcode("append")
    }, content:function (e) {
        this.opcode("appendContent", e.string)
    }, mustache:function (e) {
        var t = this.options, n = this.classifyMustache(e);
        n === "simple" ? this.simpleMustache(e) : n === "helper" ? this.helperMustache(e) : this.ambiguousMustache(e), e.escaped && !t.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
    }, ambiguousMustache:function (e, t, n) {
        var r = e.id, i = r.parts[0];
        this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.opcode("invokeAmbiguous", i)
    }, simpleMustache:function (e, t, n) {
        var r = e.id;
        r.type === "DATA" ? this.DATA(r) : r.parts.length ? this.ID(r) : (this.addDepth(r.depth), this.opcode("getContext", r.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
    }, helperMustache:function (e, t, n) {
        var r = this.setupFullMustacheParams(e, t, n), i = e.id.parts[0];
        if (this.options.knownHelpers[i])this.opcode("invokeKnownHelper", r.length, i); else {
            if (this.knownHelpersOnly)throw new Error("You specified knownHelpersOnly, but used the unknown helper " + i);
            this.opcode("invokeHelper", r.length, i)
        }
    }, ID:function (e) {
        this.addDepth(e.depth), this.opcode("getContext", e.depth);
        var t = e.parts[0];
        t ? this.opcode("lookupOnContext", e.parts[0]) : this.opcode("pushContext");
        for (var n = 1, r = e.parts.length; n < r; n++)this.opcode("lookup", e.parts[n])
    }, DATA:function (e) {
        this.options.data = !0, this.opcode("lookupData", e.id)
    }, STRING:function (e) {
        this.opcode("pushString", e.string)
    }, INTEGER:function (e) {
        this.opcode("pushLiteral", e.integer)
    }, BOOLEAN:function (e) {
        this.opcode("pushLiteral", e.bool)
    }, comment:function () {
    }, opcode:function (e) {
        this.opcodes.push({opcode:e, args:[].slice.call(arguments, 1)})
    }, declare:function (e, t) {
        this.opcodes.push({opcode:"DECLARE", name:e, value:t})
    }, addDepth:function (e) {
        if (isNaN(e))throw new Error("EWOT");
        if (e === 0)return;
        this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
    }, classifyMustache:function (e) {
        var t = e.isHelper, n = e.eligibleHelper, r = this.options;
        if (n && !t) {
            var i = e.id.parts[0];
            r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
        }
        return t ? "helper" : n ? "ambiguous" : "simple"
    }, pushParams:function (e) {
        var t = e.length, n;
        while (t--)n = e[t], this.options.stringParams ? (n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", n.string)) : this[n.type](n)
    }, setupMustacheParams:function (e) {
        var t = e.params;
        return this.pushParams(t), e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"), t
    }, setupFullMustacheParams:function (e, t, n) {
        var r = e.params;
        return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"), r
    }};
    var n = function (e) {
        this.value = e
    };
    t.prototype = {nameLookup:function (e, n, r) {
        return/^[0-9]+$/.test(n) ? e + "[" + n + "]" : t.isValidJavaScriptVariableName(n) ? e + "." + n : e + "['" + n + "']"
    }, appendToBuffer:function (e) {
        return this.environment.isSimple ? "return " + e + ";" : "buffer += " + e + ";"
    }, initializeBuffer:function () {
        return this.quotedString("")
    }, namespace:"Handlebars", compile:function (e, t, n, r) {
        this.environment = e, this.options = t || {}, Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!n, this.context = n || {programs:[], aliases:{}}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {list:[]}, this.compileStack = [], this.compileChildren(e, t);
        var i = e.opcodes, s;
        this.i = 0;
        for (o = i.length; this.i < o; this.i++)s = i[this.i], s.opcode === "DECLARE" ? this[s.name] = s.value : this[s.opcode].apply(this, s.args);
        return this.createFunctionContext(r)
    }, nextOpcode:function () {
        var e = this.environment.opcodes, t = e[this.i + 1];
        return e[this.i + 1]
    }, eat:function (e) {
        this.i = this.i + 1
    }, preamble:function () {
        var e = [];
        if (!this.isChild) {
            var t = this.namespace, n = "helpers = helpers || " + t + ".helpers;";
            this.environment.usePartial && (n = n + " partials = partials || " + t + ".partials;"), this.options.data && (n += " data = data || {};"), e.push(n)
        } else e.push("");
        this.environment.isSimple ? e.push("") : e.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = e
    }, createFunctionContext:function (e) {
        var t = this.stackVars.concat(this.registers.list);
        t.length > 0 && (this.source[1] = this.source[1] + ", " + t.join(", "));
        if (!this.isChild) {
            var n = [];
            for (var r in this.context.aliases)this.source[1] = this.source[1] + ", " + r + "=" + this.context.aliases[r]
        }
        this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
        var i = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
        for (var s = 0, o = this.environment.depths.list.length; s < o; s++)i.push("depth" + this.environment.depths.list[s]);
        if (e)return i.push(this.source.join("\n  ")), Function.apply(this, i);
        var u = "function " + (this.name || "") + "(" + i.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
        return Handlebars.log(Handlebars.logger.DEBUG, u + "\n\n"), u
    }, blockValue:function () {
        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
        var e = ["depth0"];
        this.setupParams(0, e), this.replaceStack(function (t) {
            return e.splice(1, 0, t), t + " = blockHelperMissing.call(" + e.join(", ") + ")"
        })
    }, ambiguousBlockValue:function () {
        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
        var e = ["depth0"];
        this.setupParams(0, e);
        var t = this.topStack();
        e.splice(1, 0, t), this.source.push("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
    }, appendContent:function (e) {
        this.source.push(this.appendToBuffer(this.quotedString(e)))
    }, append:function () {
        var e = this.popStack();
        this.source.push("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
    }, appendEscaped:function () {
        var e = this.nextOpcode(), t = "";
        this.context.aliases.escapeExpression = "this.escapeExpression", e && e.opcode === "appendContent" && (t = " + " + this.quotedString(e.args[0]), this.eat(e)), this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + t))
    }, getContext:function (e) {
        this.lastContext !== e && (this.lastContext = e)
    }, lookupOnContext:function (e) {
        this.pushStack(this.nameLookup("depth" + this.lastContext, e, "context"))
    }, pushContext:function () {
        this.pushStackLiteral("depth" + this.lastContext)
    }, resolvePossibleLambda:function () {
        this.context.aliases.functionType = '"function"', this.replaceStack(function (e) {
            return"typeof " + e + " === functionType ? " + e + ".apply(depth0) : " + e
        })
    }, lookup:function (e) {
        this.replaceStack(function (t) {
            return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
        })
    }, lookupData:function (e) {
        this.pushStack(this.nameLookup("data", e, "data"))
    }, pushStringParam:function (e) {
        this.pushStackLiteral("depth" + this.lastContext), this.pushString(e)
    }, pushString:function (e) {
        this.pushStackLiteral(this.quotedString(e))
    }, push:function (e) {
        this.pushStack(e)
    }, pushLiteral:function (e) {
        this.pushStackLiteral(e)
    }, pushProgram:function (e) {
        e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
    }, invokeHelper:function (e, t) {
        this.context.aliases.helperMissing = "helpers.helperMissing";
        var n = this.lastHelper = this.setupHelper(e, t);
        this.register("foundHelper", n.name), this.pushStack("foundHelper ? foundHelper.call(" + n.callParams + ") " + ": helperMissing.call(" + n.helperMissingParams + ")")
    }, invokeKnownHelper:function (e, t) {
        var n = this.setupHelper(e, t);
        this.pushStack(n.name + ".call(" + n.callParams + ")")
    }, invokeAmbiguous:function (e) {
        this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
        var t = this.setupHelper(0, e), n = this.lastHelper = this.nameLookup("helpers", e, "helper");
        this.register("foundHelper", n);
        var r = this.nameLookup("depth" + this.lastContext, e, "context"), i = this.nextStack();
        this.source.push("if (foundHelper) { " + i + " = foundHelper.call(" + t.callParams + "); }"), this.source.push("else { " + i + " = " + r + "; " + i + " = typeof " + i + " === functionType ? " + i + ".apply(depth0) : " + i + "; }")
    }, invokePartial:function (e) {
        var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
        this.options.data && t.push("data"), this.context.aliases.self = "this", this.pushStack("self.invokePartial(" + t.join(", ") + ");")
    }, assignToHash:function (e) {
        var t = this.popStack(), n = this.topStack();
        this.source.push(n + "['" + e + "'] = " + t + ";")
    }, compiler:t, compileChildren:function (e, t) {
        var n = e.children, r, i;
        for (var s = 0, o = n.length; s < o; s++) {
            r = n[s], i = new this.compiler, this.context.programs.push("");
            var u = this.context.programs.length;
            r.index = u, r.name = "program" + u, this.context.programs[u] = i.compile(r, t, this.context)
        }
    }, programExpression:function (e) {
        this.context.aliases.self = "this";
        if (e == null)return"self.noop";
        var t = this.environment.children[e], n = t.depths.list, r, i = [t.index, t.name, "data"];
        for (var s = 0, o = n.length; s < o; s++)r = n[s], r === 1 ? i.push("depth0") : i.push("depth" + (r - 1));
        return n.length === 0 ? "self.program(" + i.join(", ") + ")" : (i.shift(), "self.programWithDepth(" + i.join(", ") + ")")
    }, register:function (e, t) {
        this.useRegister(e), this.source.push(e + " = " + t + ";")
    }, useRegister:function (e) {
        this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
    }, pushStackLiteral:function (e) {
        return this.compileStack.push(new n(e)), e
    }, pushStack:function (e) {
        return this.source.push(this.incrStack() + " = " + e + ";"), this.compileStack.push("stack" + this.stackSlot), "stack" + this.stackSlot
    }, replaceStack:function (e) {
        var t = e.call(this, this.topStack());
        return this.source.push(this.topStack() + " = " + t + ";"), "stack" + this.stackSlot
    }, nextStack:function (e) {
        var t = this.incrStack();
        return this.compileStack.push("stack" + this.stackSlot), t
    }, incrStack:function () {
        return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), "stack" + this.stackSlot
    }, popStack:function () {
        var e = this.compileStack.pop();
        return e instanceof n ? e.value : (this.stackSlot--, e)
    }, topStack:function () {
        var e = this.compileStack[this.compileStack.length - 1];
        return e instanceof n ? e.value : e
    }, quotedString:function (e) {
        return'"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
    }, setupHelper:function (e, t) {
        var n = [];
        this.setupParams(e, n);
        var r = this.nameLookup("helpers", t, "helper");
        return{params:n, name:r, callParams:["depth0"].concat(n).join(", "), helperMissingParams:["depth0", this.quotedString(t)].concat(n).join(", ")}
    }, setupParams:function (e, t) {
        var n = [], r = [], i, s, o;
        n.push("hash:" + this.popStack()), s = this.popStack(), o = this.popStack();
        if (o || s)o || (this.context.aliases.self = "this", o = "self.noop"), s || (this.context.aliases.self = "this", s = "self.noop"), n.push("inverse:" + s), n.push("fn:" + o);
        for (var u = 0; u < e; u++)i = this.popStack(), t.push(i), this.options.stringParams && r.push(this.popStack());
        return this.options.stringParams && n.push("contexts:[" + r.join(",") + "]"), this.options.data && n.push("data:data"), t.push("{" + n.join(",") + "}"), t.join(", ")
    }};
    var r = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), i = t.RESERVED_WORDS = {};
    for (var s = 0, o = r.length; s < o; s++)i[r[s]] = !0;
    t.isValidJavaScriptVariableName = function (e) {
        return!t.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e) ? !0 : !1
    }
}(Handlebars.Compiler, Handlebars.JavaScriptCompiler), Handlebars.precompile = function (e, t) {
    t = t || {};
    var n = Handlebars.parse(e), r = (new Handlebars.Compiler).compile(n, t);
    return(new Handlebars.JavaScriptCompiler).compile(r, t)
}, Handlebars.compile = function (e, t) {
    function n() {
        var n = Handlebars.parse(e), r = (new Handlebars.Compiler).compile(n, t), i = (new Handlebars.JavaScriptCompiler).compile(r, t, undefined, !0);
        return Handlebars.template(i)
    }

    t = t || {};
    var r;
    return function (e, t) {
        return r || (r = n()), r.call(this, e, t)
    }
}, Handlebars.VM = {template:function (e) {
    var t = {escapeExpression:Handlebars.Utils.escapeExpression, invokePartial:Handlebars.VM.invokePartial, programs:[], program:function (e, t, n) {
        var r = this.programs[e];
        return n ? Handlebars.VM.program(t, n) : r ? r : (r = this.programs[e] = Handlebars.VM.program(t), r)
    }, programWithDepth:Handlebars.VM.programWithDepth, noop:Handlebars.VM.noop};
    return function (n, r) {
        return r = r || {}, e.call(t, Handlebars, n, r.helpers, r.partials, r.data)
    }
}, programWithDepth:function (e, t, n) {
    var r = Array.prototype.slice.call(arguments, 2);
    return function (n, i) {
        return i = i || {}, e.apply(this, [n, i.data || t].concat(r))
    }
}, program:function (e, t) {
    return function (n, r) {
        return r = r || {}, e(n, r.data || t)
    }
}, noop:function () {
    return""
}, invokePartial:function (e, t, n, r, i, s) {
    var o = {helpers:r, partials:i, data:s};
    if (e === undefined)throw new Handlebars.Exception("The partial " + t + " could not be found");
    if (e instanceof Function)return e(n, o);
    if (!Handlebars.compile)throw new Handlebars.Exception("The partial " + t + " could not be compiled when running in runtime-only mode");
    return i[t] = Handlebars.compile(e, {data:s !== undefined}), i[t](n, o)
}}, Handlebars.template = Handlebars.VM.template, define("lib/handlebars-1.0.rc.1.min", function () {
}), window.Modernizr = function (e, t, n) {
    function r(e) {
        m.cssText = e
    }

    function i(e, t) {
        return r(b.join(e + ";") + (t || ""))
    }

    function s(e, t) {
        return typeof e === t
    }

    function o(e, t) {
        return!!~("" + e).indexOf(t)
    }

    function u(e, t) {
        for (var r in e) {
            var i = e[r];
            if (!o(i, "-") && m[i] !== n)return t == "pfx" ? i : !0
        }
        return!1
    }

    function a(e, t, r) {
        for (var i in e) {
            var o = t[e[i]];
            if (o !== n)return r === !1 ? e[i] : s(o, "function") ? o.bind(r || t) : o
        }
        return!1
    }

    function f(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + E.join(r + " ") + r).split(" ");
        return s(t, "string") || s(t, "undefined") ? u(i, t) : (i = (e + " " + S.join(r + " ") + r).split(" "), a(i, t, n))
    }

    var l = "2.6.2", c = {}, h = !0, p = t.documentElement, d = "modernizr", v = t.createElement(d), m = v.style, g, y = {}.toString, b = " -webkit- -moz- -o- -ms- ".split(" "), w = "Webkit Moz O ms", E = w.split(" "), S = w.toLowerCase().split(" "), x = {}, T = {}, N = {}, C = [], k = C.slice, L, A = function (e, n, r, i) {
        var s, o, u, a, f = t.createElement("div"), l = t.body, c = l || t.createElement("body");
        if (parseInt(r, 10))while (r--)u = t.createElement("div"), u.id = i ? i[r] : d + (r + 1), f.appendChild(u);
        return s = ["&#173;", '<style id="s', d, '">', e, "</style>"].join(""), f.id = d, (l ? f : c).innerHTML += s, c.appendChild(f), l || (c.style.background = "", c.style.overflow = "hidden", a = p.style.overflow, p.style.overflow = "hidden", p.appendChild(c)), o = n(f, e), l ? f.parentNode.removeChild(f) : (c.parentNode.removeChild(c), p.style.overflow = a), !!o
    }, O = {}.hasOwnProperty, M;
    !s(O, "undefined") && !s(O.call, "undefined") ? M = function (e, t) {
        return O.call(e, t)
    } : M = function (e, t) {
        return t in e && s(e.constructor.prototype[t], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if (typeof t != "function")throw new TypeError;
        var n = k.call(arguments, 1), r = function () {
            if (this instanceof r) {
                var i = function () {
                };
                i.prototype = t.prototype;
                var s = new i, o = t.apply(s, n.concat(k.call(arguments)));
                return Object(o) === o ? o : s
            }
            return t.apply(e, n.concat(k.call(arguments)))
        };
        return r
    }), x.touch = function () {
        var n;
        return"ontouchstart"in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : A(["@media (", b.join("touch-enabled),("), d, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
            n = e.offsetTop === 9
        }), n
    }, x.opacity = function () {
        return i("opacity:.55"), /^0.55$/.test(m.opacity)
    }, x.cssanimations = function () {
        return f("animationName")
    }, x.csstransforms = function () {
        return!!f("transform")
    }, x.csstransforms3d = function () {
        var e = !!f("perspective");
        return e && "webkitPerspective"in p.style && A("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t, n) {
            e = t.offsetLeft === 9 && t.offsetHeight === 3
        }), e
    }, x.csstransitions = function () {
        return f("transition")
    };
    for (var _ in x)M(x, _) && (L = _.toLowerCase(), c[L] = x[_](), C.push((c[L] ? "" : "no-") + L));
    return c.addTest = function (e, t) {
        if (typeof e == "object")for (var r in e)M(e, r) && c.addTest(r, e[r]); else {
            e = e.toLowerCase();
            if (c[e] !== n)return c;
            t = typeof t == "function" ? t() : t, typeof h != "undefined" && h && (p.className += " " + (t ? "" : "no-") + e), c[e] = t
        }
        return c
    }, r(""), v = g = null, function (e, t) {
        function n(e, t) {
            var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }

        function r() {
            var e = g.elements;
            return typeof e == "string" ? e.split(" ") : e
        }

        function i(e) {
            var t = v[e[p]];
            return t || (t = {}, d++, e[p] = d, v[d] = t), t
        }

        function s(e, n, r) {
            n || (n = t);
            if (m)return n.createElement(e);
            r || (r = i(n));
            var s;
            return r.cache[e] ? s = r.cache[e].cloneNode() : c.test(e) ? s = (r.cache[e] = r.createElem(e)).cloneNode() : s = r.createElem(e), s.canHaveChildren && !l.test(e) ? r.frag.appendChild(s) : s
        }

        function o(e, n) {
            e || (e = t);
            if (m)return e.createDocumentFragment();
            n = n || i(e);
            var s = n.frag.cloneNode(), o = 0, u = r(), a = u.length;
            for (; o < a; o++)s.createElement(u[o]);
            return s
        }

        function u(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                return g.shivMethods ? s(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/\w+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(g, t.frag)
        }

        function a(e) {
            e || (e = t);
            var r = i(e);
            return g.shivCSS && !h && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), m || u(e, r), e
        }

        var f = e.html5 || {}, l = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, c = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, h, p = "_html5shiv", d = 0, v = {}, m;
        (function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", h = "hidden"in e, m = e.childNodes.length == 1 || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                }()
            } catch (n) {
                h = !0, m = !0
            }
        })();
        var g = {elements:f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS:f.shivCSS !== !1, supportsUnknownElements:m, shivMethods:f.shivMethods !== !1, type:"default", shivDocument:a, createElement:s, createDocumentFragment:o};
        e.html5 = g, a(t)
    }(this, t), c._version = l, c._prefixes = b, c._domPrefixes = S, c._cssomPrefixes = E, c.testProp = function (e) {
        return u([e])
    }, c.testAllProps = f, c.testStyles = A, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (h ? " js " + C.join(" ") : ""), c
}(this, this.document), define("lib/modernizr.custom.72077", function () {
}), function (e) {
    e.fn.jrumble = function (t) {
        var n = e.extend({x:2, y:2, rotation:1, speed:15, opacity:!1, opacityMin:.5}, t);
        return this.each(function () {
            var t = e(this), r = n.x * 2, i = n.y * 2, s = n.rotation * 2, o = n.speed === 0 ? 1 : n.speed, u = n.opacity, l = n.opacityMin, c, h, p = function () {
                var e = Math.floor(Math.random() * (r + 1)) - r / 2, n = Math.floor(Math.random() * (i + 1)) - i / 2, o = Math.floor(Math.random() * (s + 1)) - s / 2, a = u ? Math.random() + l : 1, e = e === 0 && r !== 0 ? Math.random() < .5 ? 1 : -1 : e, n = n === 0 && i !== 0 ? Math.random() < .5 ? 1 : -1 : n;
                t.css("display") === "inline" && (c = !0, t.css("display", "inline-block")), t.css({position:"relative", left:e + "px", top:n + "px", "-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + a * 100 + ")", filter:"alpha(opacity=" + a * 100 + ")", "-moz-opacity":a, "-khtml-opacity":a, opacity:a, "-webkit-transform":"rotate(" + o + "deg)", "-moz-transform":"rotate(" + o + "deg)", "-ms-transform":"rotate(" + o + "deg)", "-o-transform":"rotate(" + o + "deg)", transform:"rotate(" + o + "deg)"})
            }, d = {left:0, top:0, "-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)", filter:"alpha(opacity=100)", "-moz-opacity":1, "-khtml-opacity":1, opacity:1, "-webkit-transform":"rotate(0deg)", "-moz-transform":"rotate(0deg)", "-ms-transform":"rotate(0deg)", "-o-transform":"rotate(0deg)", transform:"rotate(0deg)"};
            t.bind({startRumble:function (e) {
                e.stopPropagation(), clearInterval(h), h = setInterval(p, o)
            }, stopRumble:function (e) {
                e.stopPropagation(), clearInterval(h), c && t.css("display", "inline"), t.css(d)
            }})
        })
    }
}(jQuery), define("lib/jrumble.min", function () {
}), require(["jquery", "utils/global", "utils/util", "utils/slideUtil", "utils/move", "utils/nav", "utils/bgmView", "lib/jpreloader.min", "lib/jquery.mousewheel.min", "lib/jquery.easing.1.3", "lib/keymaster.min", "lib/jquery.ba-bbq.min", "lib/handlebars-1.0.rc.1.min", "lib/modernizr.custom.72077", "lib/jrumble.min"], function (e, t, n, r, i, s, o) {
    e(function () {
        function u() {
            try {
                preview = new ArcheAge.Preview.Service
            } catch (t) {
                preview = {}
            }
            s.main.init(), a(), e("body").on("keydown", function (t) {
                t.keyCode == 27 && (e("#evtBridge").hide(), e("#topbar .btn-bridge").removeClass("active"))
            }), e("#preloader").remove(), e("#viewport").show(), location.hash ? e(this).trigger("hashchange") : location.hash = "#trailer", (!location.hash || location.hash != "#trailer#trailer") && preview.bgm.autoPlay()
        }

        function a() {
            e(window).on("hashchange",function () {
                i.trigger()
            }).on("resize", n.resizeFlexibleBg), e("#oldIE .btn-close").on("click", function () {
                e("#oldIE").remove()
            }), t.viewport.on("mousewheel",function (e, n) {
                e.preventDefault();
                var i = r.getSlide.byNum(t.currentSlideNum).slideNum, s = n > 0 ? i.prev : i.next;
                r.changeSlide(s)
            }).on("click", "a",function (t) {
                var n = e(this).attr("href");
                if (e.browser.msie && e.browser.version < 8)n = n.split("#")[1]; else if (!n.split("#")[0]) {
                    t.preventDefault();
                    if (n == location.hash.split("-")[0])return;
                    r.changeHash(n)
                }
            }).find("#nav").hover(function () {
                e("#nav").stop().animate({width:"170px"}, 200, "easeInExpo")
            },function () {
                e("#nav").stop().animate({width:"10px"}, 200, "easeOutExpo")
            }).on("focus", "a",function () {
                e("#nav").css({width:"170px"})
            }).on("blur", "a",function () {
                e("#nav").css({width:"10px"})
            }).end().on("hover focus", ".subnav a",function () {
                var n = e(this), r = n.text(), i = t.viewport.find(".subnav"), s = i.find(".tooltip"), o = s.find(".txt"), u;
                o.html(r), u = n.offset().left - 93, s.css({left:u}).show()
            }).on("mouseout blur", ".subnav a",function () {
                var e = t.viewport.find(".subnav"), n = e.find(".tooltip");
                n.hide()
            }).on("click", ".v-panel .btns a",function () {
                var t = e(this), n = t.parent().children(), r = n.index(t), i = 680, s = -(r * i), o = t.parent().parent().find(".pics .list");
                n.removeClass("active"), t.addClass("active"), o.animate({left:s}, 400, "easeInExpo")
            }).on("click", ".h-panel .btns a",function () {
                var t = e(this), n = t.parent().children(), r = n.index(t), i = 700, s = -(r * i), o = t.parent().parent().find(".pics .list");
                n.removeClass("active"), t.addClass("active"), o.animate({left:s}, 400, "easeInExpo")
            }).on("click", ".btn-bridge", function (t) {
                t.preventDefault(), e("#evtBridge").toggle(), e(this).toggleClass("active")
            }), e("#evtBridge").on("click", ".btn-close", function (t) {
                t.preventDefault(), e("#evtBridge").toggle(), e("#topbar .btn-bridge").removeClass("active")
            }), key("up, left, backspace, pageup", "viewport", function (e) {
                e.returnValue = !1, e.preventDefault && e.preventDefault();
                var n = r.getSlide.byNum(t.currentSlideNum).slideNum.prev;
                r.changeSlide(n)
            }), key("down, right, space, pagedown", "viewport", function (e) {
                e.returnValue = !1, e.preventDefault && e.preventDefault();
                var n = r.getSlide.byNum(t.currentSlideNum).slideNum.next;
                r.changeSlide(n)
            }), key.setScope("viewport"), preview.bgm = o, preview.bgm.init()
        }

        function f() {
            var t = e("#nav"), n = "-277px", r = t.find(".nav-box").css("height"), i = e("#evtStar"), s = i.find(".panel"), o = "90px";
            t.css({marginTop:n}), i.css({display:"block", marginTop:o}), i.on("click", ".banner",function () {
                s.animate({right:"0"}, 700, "easeOutExpo")
            }).on("click", ".btn-close", function () {
                s.animate({right:"-320px"}, 700, "easeOutExpo")
            })
        }

        e("body").jpreLoader({splashID:"#preloader", loaderVPos:"50%", splashVPos:"0", showPercentage:!1}, u)
    })
}), define("main", function () {
})