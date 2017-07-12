/**
 * 日志统计
 * e.gif 统计点击等事件
 * p.gif 统计pv
 *
 */

/**
 */


var Class = require('class') ;
var Cookie = require('cookie');
var Uri = require('/widget/uri/js/uri.js');
var $ = require('jquery');
var Uuid = require('./uuid');

var Log = Class.create({
    initialize : function( options ) {
        var config = $.extend({} ,{
            eqsch: $(document.body).data('eqsch') || window.__EQSCH__ || '' ,
            eqschver : 'A'
        }, options );
        // 一个页面只有一个Log实例
        if (Log.instance) {
            return Log.instance;
        }

        !config && (config = {});

        var eqsch = config.eqsch  ;
        var eqschver = config.eqschver;

        eqsch = $.trim(eqsch + ''); // to string

        if (!eqsch) {
            throw new Error('eqsch is missing');
        } else {
            eqsch = eqsch.replace(/&/g, '@');
        }

        // 页面属性描述
        // 格式：desc@attr1=xx@attr2=xx
        // 例如：/aodi/list@age=2@price=160000
        //
        if (!$.isPlainObject(eqsch)) {
            eqsch = this._parse(eqsch);
        }

        this.eqsch = eqsch;

        // AB测试
        this.eqschver = eqschver;

        // 页面id，与页面行为关联
        this.eqschid = this.guid();

        // session id
        this.sid = Cookie.get('sid') || Cookie.set('sid',this.guid());

        this.bindTrackEvent();

        this.baiduTrack();

        Log.instance = this;
    },
    SERVER :  'http://analytics.273.cn',
    DOMAIN : '273.cn',
    KEY : 'eqs_log',
    ENGINES : [
        ['images.google' , 'q'],
        ['google'        , 'q'],
        ['yahoo'         , 'p'],
        ['msn'           , 'q'],
        ['live'          , 'q'],
        ['soso'          , 'w'],
        ['360'           , 'q'],
        ['so'            , 'q'],
        ['bing'          , 'q'],
        ['baidu'         , 'word'],
        ['baidu'         , 'wd'],
        ['sogou'         , 'query']
    ],
    trackPageView : function () {

        if (!this._pvTracked) {
            this.sendTrack();
            this._pvTracked = true;
        }
    },
    bindTrackEvent : function () {

        var $body = $(document.body);
        var me = this;

        $body
            .off('click.log mouseenter.log show.log')
            .on('click.log mouseenter.log show.log', '[data-eqselog]', function (e) {

                var $this = $(this);
                var eqselog = $this.data('eqselog');
                var etype, type, temp, tag, $form, href;

                if (typeof eqselog === 'string') {
                    eqselog = me._parse(eqselog);
                    $this.data('eqselog', eqselog);
                }

                etype = eqselog.etype || [];
                type = e.type;

                if (type === 'mouseenter') {
                    type = 'hover';
                }

                if (etype.join().indexOf(type) == -1) {
                    return;
                }

                tag = this.tagName.toLowerCase();
                temp = $.extend({}, eqselog, {etype:type});

                if (tag === 'a') {
                    href = $this.attr('href') || '#';
                    if (href !== '#' && href !== 'javascript:;') {
                        temp.params.href = href;
                    }
                }

                if (type === 'hover') {
                    if (!$this.data('eqsloged')) {
                        me.sendTrack(temp);
                        $this.data('eqsloged', true);
                    }
                } else if (type === 'click') {

                    me.sendTrack(temp);

                    if (tag === 'a') {
                        if (!/^#|(javascript:)\w*/.test(href) && ($this.attr('target') || '_self') === '_self') {
                            window.setTimeout(function () {
                                window.location.href = href;
                            }, 200);
                            return false;
                        }
                    } else if (tag === 'button') {
                        $form = $this.parents('form');
                        if ($this.attr('type') === 'submit' && $form.length
                            && ($form.attr('target') || '_self') === '_self' ) {
                            window.setTimeout(function () {
                                $form.submit();
                            }, 200);
                            return false;
                        }
                    }

                } else {
                    me.sendTrack(temp);
                }
            });

        // show event
        $(function () {
            $('[data-eqselog]').each(function () {

                var $this = $(this);
                var eqselog = $this.data('eqselog') || '';
                var etype;

                if (typeof eqselog === 'string') {
                    eqselog = me._parse($this.data('eqselog'));
                    $this.data('eqselog', eqselog);
                }

                etype = eqselog.etype || [];

                if (etype.join().indexOf('show') > -1) {
                    $this.trigger('show.log');
                }
            });
        });
    },
    _parse : function (eqselog) {

        var o = {};

        o.params = {};

        // 元素属性描述（格式同eqsch）
        // 注意：多个etype用 | 分隔
        // 例如：/price/index@etype=click|hover@price=100
        // o : {
        //   etype : ['CLICK', 'HOVER'],
        //   params : {
        //       price : 100
        //   }
        // }
        eqselog = $.trim(eqselog + '');

        if (!eqselog) {
            return o;
        }

        eqselog = eqselog.replace(/&/g, '@').split(/[@\s]+/);

        eqselog.forEach(function (v, i) {

            if (i === 0 && v.indexOf('=') === -1) {
                o.code = v;
            } else if (v.indexOf('=') > -1) {

                v = v.split(/[=\s]+/);
                i = v[0].toLowerCase();
                if (i === 'etype') {
                    o.etype = v[1].split(/[|\s]+/);
                } else {
                    o.params[i] = v[1];
                }
            }
        });

        return o;
    },
    _stringify : function (eqselog) {

        var temp = [], code, etype, params;

        if ($.isPlainObject(eqselog)) {

            if (code = eqselog.code) {
                temp.push(code);
            }

            if (etype = eqselog.etype) {
                temp.push('etype=' + etype);
            }

            if (params = eqselog.params) {
                temp.push($.param(params).replace(/&/g, '@'));
            }

            return temp.join('@');
        }

        return '';
    },
    sendTrack : function (eqselog) {
        var _this = this;
        var params = {};
        var eqsch = this.eqsch;
        var gif, img, url, ca;

        if (!eqselog) {
            gif = 'p.gif';
        } else if ($.isPlainObject(eqselog)) {
            gif = eqselog.gif || 'e.gif';
            delete eqselog.gif;
        } else {
            gif = 'e.gif';
        }

        params.sid = this.sid;
        params.eqsch = this._stringify(eqsch);
        params.eqschid = this.eqschid;
        params.eqschver = this.eqschver;
        params.url = eqsch.params.url || document.location.href;
        params.refer = eqsch.params.refer || document.referrer || '-';
        params.domain = document.location.hostname.split('.')[0];

        // 外部跟踪四元组
        ca = this.getCa();
        params['ca_source'] = ca[0] || '-';
        params['ca_name']   = ca[1] || '-';
        params['ca_kw']     = ca[2] || '-';
        params['ca_id']     = ca[3] || '-';

        // 内部跟踪
        params['ifid'] = this.getIfid() || '-';

        // event log
        if (gif === 'e.gif') {
            params.eqselog = $.isPlainObject(eqselog) ? this._stringify(eqselog) : eqselog;
        }
        // pv log
        if (gif === 'p.gif') {
            params.fv = this.getFv(); // flash player version
            params.sc = this.getSc(); // screen width height
            params.ua = this.getUa(); // user agent
        }
        // 随机数
        params.rand = +new Date();
        // uuid异步获取
        Uuid.get().done(function (uuid) {
            params.uuid = uuid || '-';
            url = _this.SERVER + '/' + gif + '?'+ $.param(params);
            setTimeout(function () {
                img = new Image();
                img.src = url;
            }, 50);
        });
    },

    setEqsch : function (eqsch) {

        if (eqsch && typeof eqsch ===  'string') {
            this.eqsch = eqsch;
        }

        return this;
    },
    getEqsch : function () {
        return this.eqsch;
    },
    random : function(from, to){
       return parseInt(Math.random() * (to - from + 1) + from, 10);
    },
    guid : function(){
        var s = new Date();
        var e = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0);
        return (s.getTime() - e.getTime()) * 1000 + this.random(1000, 9999);
    },
    getFv : function(){
        var nav = window.navigator;
        var p = [0, 0, 0], d, f, a;

        if (nav.plugins && (f = nav.plugins['Shockwave Flash'])) {
            d = f.description;
            if (d && !(nav.mimeTypes && nav.mimeTypes['application/x-shockwave-flash'] &&
                !nav.mimeTypes['application/x-shockwave-flash'].enabledPlugin)) {

                d = d.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
                p[0] = parseInt(d.replace(/^(.*)\..*$/, '$1'), 10);
                p[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, '$1'), 10);
                p[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0;
            }
        } else if (window.ActiveXObject) {
            try {
                a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');

                if (a) {
                    d = a.GetVariable('$version');
                    if (d) {
                        d = d.split(' ')[1].split(',');
                        p[0] = parseInt(d[0], 10);
                        p[1] = parseInt(d[1], 10);
                        p[2] = parseInt(d[2], 10);
                    }
                }
            } catch(e) {}
        }
        return p.join('.');
    },
    getUa : function(){
        var ua =  {
            ie          : 0,
            opera       : 0,
            gecko       : 0,
            webkit      : 0,
            chrome      : 0,
            mobile      : null,
            air         : 0,
            ipad        : 0,
            iphone      : 0,
            ipod        : 0,
            ios         : null,
            android     : 0,
            os          : null
        };
        var nav = window.navigator;
        var temp = [], lang;

        $.each(ua, function (k ,v) {

            if (v) {
                temp.push(k + ':' + v);
            }
        });

        // language for chrome(..etc) : 'en-US'
        // browerLanguage for ie : 'zh-cn'
        lang = (window.navigator.language || window.navigator.browserLanguage).toLowerCase();

        if (lang){
            temp.push('lang:' + lang);
        }
        return temp.join('|');
    },
    getSc : function(){
        var sc = window.screen;
        var jv = window.java;

        if (sc) {
            return sc.width + ',' + sc.height;
        }
        // maybe for pad
        else if (jv) {
            try {
                sc = jv.awt.Toolkit.getDefaultToolkit().getScreenSize();
                return sc.width + ',' + sc.height;
            } catch (e) {}

        }

        return '';
    },
    getCa : function(){
        var cookie = Cookie.get(this.KEY)  || '{}' ;
        var refer = document.referrer;
        var temp = Uri.parse(window.location.href);
        var params = temp['params'];

        var source = cookie['ca_source'] || '';
        var name   = cookie['ca_name'] || '';
        var kw     = cookie['ca_kw'] || '';
        var id     = cookie['ca_id'] || '';
        var _kw;

        if (refer && !/273.cn/i.test(refer)) {

            temp = Uri.parse(refer);

            source = params['ca_source'] || temp.host;
            // 合作推广
            if (params['ca_name'] || params['ca_kw'] || params['ca_id']) {
                name   = params['ca_name'] || '';
                kw     = params['ca_kw'] || '';
                id     = params['ca_id'] || '';
            }

            // 搜索引擎
            else {
                $.each( this.ENGINES, function(i, v) {
                    if (new RegExp(v[0], 'i').test(temp.host)) {
                        _kw = temp.params[v[1]] || '';
                        if (_kw) {
                            if (/[\?&]\w+=utf/i.test(refer)) {
                                kw = _kw + '|utf8';
                            } else {
                                kw = _kw;
                            }
                            return;
                        }
                        source = temp.host;
                        name = 'se';
                        id = '';
                    }
                });
            }

            Cookie.set('ca_source', source);
            Cookie.set('ca_name', name);
            Cookie.set('ca_kw', kw);
            Cookie.set('ca_id', id);
        }

        return [source, name, kw, id]
    },
    getIfid : function(){
        var ifid = Cookie.get('ifid') || '';
        var params, _ifid;

        if (document.referrer) {
            params = Uri.parse(window.location.href)['params'];
            _ifid = params['ifid'] || '';

            if (_ifid && _ifid !== ifid) {
                ifid = _ifid;
                Cookie.set('ifid', ifid);
            }
        }

        return ifid;
    },
    uuid : function(){
        var tm = +new Date();
        var rm = this.random(10000000, 99999999);
        var s;

        function swich (s) {

            var ret = '';
            var len = s.length;

            while (len > 0) {

                len--;
                ret += s.substr(len, 1);
            }

            return ret;
        }

        s = swich(tm + '' + this.random(1, 9));

        s = (s * 1 + rm) + '' + rm;

        return s;
    },
    // 百度统计
    baiduTrack: function() {
        var _hmt = window._hmt || (window._hmt = []);
        var hm, s;

        $(function() {
            hm = document.createElement("script");
            hm.src = "http://hm.baidu.com/hm.js?0d65da9af6945a75cbbfc0ce0f80de20";
            s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        });
    }
});

module.exports = Log ;
