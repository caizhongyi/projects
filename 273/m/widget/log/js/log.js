/**
 *@brief 日志统计js代码
 *@date 2013-2-28
 *@author <miaosq@273.cn>
*/

var $ = require('zepto');
var urlModule = require('/widget/uri/js/uri');
var cookieModule = require('cookie');
var Uuid = require('uuid');


var logCollect = exports;


var actionHover = 'data-273-hover-log';
var actionClick = 'data-273-click-log';
var actionShow = 'data-273-show-log';

var counter = 0;

logCollect.eqsch = '';
logCollect.eqschver = 'A';

//TODO暂时改为测试域名
logCollect.server = 'analytics.273.cn';
//标示pv是否统计过
logCollect.hasCollected = false;

//执行统计
logCollect.init = function(ch, notPv){
    logCollect.eqsch = ch;
    if (!notPv) {
        // 为true时不发送pv、uv;默认发送
        logCollect.collectPageView();
    }
    logCollect.collectAllEvent();
    logCollect.baiduTrack();
};

//pv统计函数
logCollect.collectPageView = function(eqsch) {
    if (logCollect.hasCollected) {
        return false;
    } else {
        logCollect.hasCollected = true;
    }
    if (eqsch) {
        logCollect.eqsch = eqsch;
    }
    var org = getOrganicInfo(),
        urls = [
                "http://" + logCollect.server + "/p.gif?eqsch=" + (logCollect.eqsch || '-'),
                "eqschid=" + createUid(),
                "uuid=" + (Uuid.get() || '-'),
                "sid=" + getSessionId(),
                "ca_source=" + (org[0] || '-'),
                "ca_name=" + (org[1] || '-'),
                "ca_kw=" + (org[2] || '-'),
                "ca_id=" + (org[3] || '-'),
                "ifid=" + (getInnerFromId() || '-'),
                "refer=" + (document.referrer ? encodeURIComponent(document.referrer) : '-'),
                "domain=" + document.location.hostname.split('.')[0],
                "url=" + (encodeURIComponent(document.URL)), 
                "ua=" + uaFormat(),
                "fv=" + flashPlayerVersion(),
                "sc=" + screenFormart()
                ];
    urls.push("eqschver=" + logCollect.eqschver);
    postByImg(urls.join('&'));
};

//日志事件统计
logCollect.collectAllEvent = function() {
    $('body').on('click', '['+actionClick+'],[data-eqselog]', function(){
        var o ;
        if( $(this).data('eqselog') ){
            o = parseCode($(this).data('eqselog'))
        }
        else if( $(this).data('273-click-log') ) {
            o = parseCode($(this).data('273-click-log'));
        }

        if( !o ) return ;
        sendTrackEvent($(this), o, 'click');
    }).on('hover', '['+actionHover+'],[data-eqselog]', function(){
        var o ;
        if( $(this).data('eqselog') ){
            o = parseCode($(this).data('eqselog'))
        }
        else if( $(this).data('273-click-log') ) {
            o = parseCode($(this).data('273-click-log'));
        }

        if( !o ) return ;

        sendTrackEvent($(this), o, 'hover');
    });

    //遍历show日志事件，并绑定
    $("["+actionShow+"]").each(function(){
        var $el = $(this),
            eqselog = $el.data('273-show-log'),
            o = parseCode(eqselog);
        sendTrackEvent($el, o, 'show');
    });
};

//取得并保存搜索引擎（推广）信息
function getOrganicInfo(){
    var caSource = getLogCookie('ca_source'), 
        caName = getLogCookie('ca_name'), 
        caKw = getLogCookie('ca_kw'), 
        caId = getLogCookie('ca_id'),
        ref = document.referrer && !/273.cn/i.test(document.referrer) ? document.referrer : null, 
        selfUrlData = urlModule.parse(window.location.href),
        caNameFromUrl = selfUrlData.params['ca_name'] || selfUrlData.params['fromid'] || selfUrlData.params['kwid'] || '',
        handler = function(){
            var refUrlData = urlModule.parse(document.referrer),
                organics = getOrganics(),
                kw,
                isUtf8 = /[\?&]\w+=utf/i.test(document.referrer),
                noCaSource = !caSource ? true : false;
            caSource = selfUrlData.params['ca_source'] || (ref && refUrlData.host) || 'unknown';
            caName = caNameFromUrl;
            caKw = selfUrlData.params['ca_kw'] || '';
            caId = selfUrlData.params['ca_id'] || '';

            if (ref && (noCaSource || !caKw)){
                $.each(organics, function(k, v){
                    if (new RegExp(v[0],"i").test(refUrlData.host)){
                        kw = refUrlData.params[v[1]];
                        if (kw) {
                            caKw = kw + "|" + (isUtf8 ? 'utf8' : '');
                            if (!caName){
                                caName = 'se';
                            }
                            return false;
                        }
                    }
                });    
            }

            setLogCookie('ca_source', caSource);
            setLogCookie('ca_name', caName);
            setLogCookie('ca_kw', caKw);
            setLogCookie('ca_id', caId);
        };
  
    if (caSource){
        if (caNameFromUrl && (!caName || caName == 'se')){
            handler();
        }
    }
    else {
        if (ref || caNameFromUrl) {
            handler();
        }
    }

    return [caSource, caName, caKw, caId];
};
function getOrganics(){ //分析默认的搜索引擎
    //var s = "baidu:wd,baidu:wd,daum:q,eniro:search_word,naver:query,images.google:q,google:q,yahoo:p,msn:q,bing:q,aol:query,aol:encquery,lycos:query,ask:q,altavista:q,netscape:query,cnn:query,about:terms,mamma:query,alltheweb:q,voila:rdata,virgilio:qs,live:q,baidu:wd,alice:qs,yandex:text,najdi:q,aol:q,mama:query,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,pchome:q,kvasir:q,sesam:q,ozu:q,terra:query,mynet:q,ekolay:q,rambler:words";    
    return [
        ["baidu"         , "wd"],
        ["baidu"         , "word"],
        ["images.google" , "q"],
        ["google"        , "q"],
        ["yahoo"         , "p"],
        ["msn"           , "q"],
        ["live"          , "q"],
        ["soso"          , "w"],
        ["sogou"         , "query"],
        ["360"           , "q"],
        ["so"            , "q"],
        ["bing"          , "q"]
    ];
};

function _parse(eqselog) {

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
}

//获取cookie，做异常处理
function getLogCookie(name){
    try {
        var cookie = cookieModule.get('_eqs_logCollect'),
            ret    = cookie ? JSON.parse(cookie) : {};
        return name ? (ret[name] || null) : ret;
    } catch (e){
        return null;
    }
};

//写入日志cookie
function setLogCookie(name, value){
    var options = {};
    options.domain = '.273.cn';
    var cookie = getLogCookie();
    cookie[name] = value;
    cookieModule.set('_eqs_logCollect', JSON.stringify(cookie), options);
};

function random (from, to){
    return parseInt(Math.random() * (to - from + 1) + from, 10);
}

//生成uid
function createUid() {
    var date = new Date(),time = date.getTime(),
        dates = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    return (time-dates.getTime()) * 1000 + random(1000, 9999);
};

//获取sessionid
function getSessionId() {
    var sessionId = getLogCookie('sid');
    if (!sessionId) {
        sessionId = createUid();
        setLogCookie('sid', sessionId);
    }
    return sessionId;
};

function getInnerFromId() {
    var ifid_old = getLogCookie('ifid');
    if (document.referrer) {
        var selfUrlData = urlModule.parse(window.location.href),
            ifid_new = selfUrlData.params['ifid'] || '';
        if (ifid_new && ifid_new != ifid_old) {
            ifid_old = ifid_new;
            setLogCookie('ifid', ifid_old);
        }
    }
    return ifid_old || '';
};

//初始化系类参数的相关方法
function flashPlayerVersion() {
    var playerVersion = [0,0,0],
        d = null;
    if (typeof window.navigator.plugins != 'undefined' && typeof window.navigator.plugins['Shockwave Flash'] == 'object') {
        d = window.navigator.plugins['Shockwave Flash'].description;
        if (d && !(typeof window.navigator.mimeTypes != 'undefined' && window.navigator.mimeTypes["application/x-shockwave-flash"] && !window.navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) { 
            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
            playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
            playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
            playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
        }
    }
    else if (typeof window.ActiveXObject != 'undefined') {
        try {
            var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (a) {
                d = a.GetVariable("$version");
                if (d) {
                    d = d.split(" ")[1].split(",");
                    playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                }
            }
        }
        catch(e) {}
    }
    return playerVersion.join('.');
};

function uaFormat(){
    var data = [],
        lang, 
        getLang = function(n){
            return n ? n.toLowerCase() : null;
        };
    /*****  User Agent  *****/

    function numberify ( str ) {
        var count = 0;
        return parseFloat( str.replace( /\./g, function() {
            return ( count++ == 1 ) ? '' : '.';
        } ) );
    }
    var ua = {
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

    var UA = window.navigator.userAgent;

    if ( /windows|win32/i.test( UA ) ) {
        ua.os = 'windows';
    } else if ( /macintosh/i.test( UA ) ) {
        ua.os = 'macintosh';
    } else if ( /rhino/i.test( UA )) {
        ua.os = 'rhino';
    }

    if ( /KHTML/.test( UA ) ) {
        ua.webkit = true;
    }

    var match = UA.match( /AppleWebKit\/([^\s]*)/ );
    if ( match && match[1] ) {
        ua.webkit = numberify( match[1] );

        if ( / Mobile\//.test( UA ) ) {
            ua.mobile = "Apple";

            match = UA.match( /OS ([^\s]*)/ );
            if ( match && match[1] ) {
                match = numberify( match[1].replace( '_', '.' ) );
            }
            ua.ipad   = ( navigator.platform === 'iPad' )   ? match : 0;
            ua.ipod   = ( navigator.platform === 'iPod' )   ? match : 0;
            ua.iphone = ( navigator.platform === 'iPhone' ) ? match : 0;
            ua.ios    = ua.ipad || ua.iphone || ua.ipod;
        } else {
            match = UA.match( /NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/ );
            if ( match ) {
                ua.mobile = match[0];
            }
            if ( / Android/.test( ua ) ) {
                ua.mobile = 'Android';
                match = UA.match( /Android ([^\s]*);/ );
                if ( match && match[1] ) {
                    ua.android = numberify( match[1] );
                }
            }
        }

        match = UA.match( /Chrome\/([^\s]*)/ );
        if ( match && match[1] ) {
            ua.chrome = numberify( match[1] );
        } else {
            match = UA.match( /AdobeAIR\/([^\s]*)/ );
            if ( match ) {
                ua.air = match[0];
            }
        }
    }

    if ( !ua.webkit ) {
        match = UA.match( /Opera[\s\/]([^\s]*)/ );
        if ( match && match[1] ) {
            ua.opera = numberify( match[1] );
            match = UA.match( /Opera Mini[^;]*/ );
            if ( match ) {
                ua.mobile = match[0];
            }
        } else {
            match = UA.match( /MSIE\s([^;]*)/ );
            if ( match && match[1] ) {
                ua.ie = numberify( match[1] );
            } else {
                match = UA.match( /Gecko\/([^\s]*)/ );
                if ( match ) {
                    ua.gecko=1;
                    match = UA.match( /rv:([^\s\)]*)/ );
                    if ( match && match[1] ) {
                        ua.gecko = numberify( match[1] );
                    }
                }
            }
        }
    }

    $.each(ua, function(k, v){
        if (v){
            data.push(k+":"+v);
        }
    });
    if ((lang = getLang(window.navigator.language || window.navigator.browserLanguage))){
        data.push('lang:' + lang);
    }
    return data.join('|');
};

function screenFormart(){
    if (window.screen) {
        return screen.width + "," + screen.height;
    } else if (window.java) {
        var j = java.awt.Toolkit.getDefaultToolkit();
        var s = j.getScreenSize();
        return s.width + "," + s.height;
    }
    return '';
};


// 发送图片到服务器
function postByImg(url){
    var img = new Image();
    img.onload = function() {
        img.onload = null;
    };
    img.src = url;
};

//拆分log插码字符串
function parseCode(eqslog){
    var p = eqslog.replace('&', '@').split('@'), 
        o = {
            code : p.shift(),
            params : {}
        };
    $.each(p, function(k, v){
        v = v.split('=');
        if (v[0]) {
            o.params[v[0]] = v[1];
        }
    });
    return o;
};

//执行事件发送
function sendTrackEvent($el, o, eventType){
    if($el != null) {
        var tagName = $el[0].tagName.toLowerCase();
        if (tagName == 'a' && $el[0].target.toLowerCase() == '_self'){
            o.redirectUrl = $el.attr('href');
        }
    }
    if (eventType == 'click'){
        if (tagName == 'form'){
            trackEvent(o);
            return true;
        }
        else {
            trackEvent(o);
            if (o.redirectUrl){
                later(function(){
                    window.location.href = o.redirectUrl;
                }, 300);
                return false;
            }
            return true;
        }
    } else if(eventType == 'show'){
        trackEvent(o);
    }
    else if (eventType == 'hover'){
        if (!$el.data('gl_over_tracked')) {
            trackEvent(o);
            $el.data('gl_over_tracked', 1);
        }
        return true;
    }
};

//发送事件
function trackEvent(o){
    var org = getOrganicInfo(),
        urls = [
            "http://" + logCollect.server + "/" + "e.gif?eqsch=" + (logCollect.eqsch || '-'),
            "eqschid=" + createUid(),
            "eqselog=" + (getActionInfo(o) || '-'),
            "uuid=" + (Uuid.get() || '-'),
            "sid=" + getSessionId(),
            "ca_source=" + (org[0] || '-'),
            "ca_name=" + (org[1] || '-'),
            "ca_kw=" + (org[2] || '-'),
            "ca_id=" + (org[3] || '-'),
            "ifid=" + (getInnerFromId() || '-'),
            "refer=" + (document.referrer ? encodeURIComponent(document.referrer) : '-'),
            "domain=" + document.location.hostname.split('.')[0],
            "url=" + (encodeURIComponent(document.URL)), 
            "r=" + counter++
        ];

    if (logCollect.eqschver){
        urls.push("eqschver=" + logCollect.eqschver);
    }
    postByImg(urls.join('&'));
};

//拼凑eqselog
function getActionInfo(o){
    var p=[];
    if (o.code) {
        p.push(o.code);
    }
    $.each(o.params, function(k, v){
        p.push(k+"="+v);
    });
    return p.join('@');
};

//延时
function later(fn, when, loop){
    when = when || 0;
    var r = null,
    run = function(){
        r = r || (loop) ? setInterval(fn, when) : setTimeout(fn, when);
    };
    run();
    return {
        run : run,
        cancel: function(){
            if (r){
                if (loop){
                    clearInterval(r);
                } else {
                    clearTimeout(r);
                }
                r = null;
            }
        }
    };
};

// 百度统计
logCollect.baiduTrack = function() {
    var _hmt = window._hmt || (window._hmt = []);
    var hm, s;

    $(function() {
        hm = document.createElement("script");
        hm.src = "http://hm.baidu.com/hm.js?83a358933f481d7cd6e202e3e0786c7f";
        s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    });
};

//为了满足一些特殊的地方直接传log参数，发送统计参数
//eqslog为插码内容，el为当前元素，etype为事件统计类型（click、hover、show）
logCollect.trackEventByEqslog = function(eqslog, el, etype){
    o = parseCode(eqslog);
    sendTrackEvent(el, o, etype);
};

