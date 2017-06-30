/**
 * 主站基础js
 *
 * @version v4.0
 */
var Log = require('widget/log/js/log.js');
var Plugin = require('/widget/plugin/plugin.js');
var AutoComplete = require('/widget/autocomplete/js/autocomplete.js');
var Cookie  = require('cookie');
var Tabs  = require('/widget/tabs/js/tabs.js');
require('/components/jquery/lazyload.js');
require('/components/jquery/placeholder.js');
var $ = require('jquery');
var Base = {};

// 图片延迟加载
function lazyload() {
    var $jsScroll = $('.js_lazy');
    if ($jsScroll.length != 0) {
        $jsScroll.lazyload({
            effect: 'fadeIn',
            data_attribute: 'src',
            skip_invisible: false,
            load: function () {
                $(this).parents('.lazy-load').removeClass('lazy-load');
            }
        });
    }
}

// 关键字搜索
var $carSuggest = $('#car_suggest');
var domain = $carSuggest.data('domain');
var siteType = $carSuggest.data('site-type');
var siteId = $carSuggest.data('site-id');
if (domain == '') {
    domain = 'www';
}

// 站点基础信息
Base.siteInfo = JSON.parse($('#js_site_info').val());

if ($carSuggest.length) {
    new AutoComplete($carSuggest, {
        source: "http://data.273.cn/?_mod=AutoCompleteV2&domain=" + domain,
        format: function (row) {
            return "<li style='overflow: hidden'><a href='" + row.value + "'>" + row.text + "</a></li>"
        },
        valueFormat : function($item){
            return $item.find('a').text();
        },
        cache: false,
        attachment: $('#car_suggest_form'),
        type: 'default',
        paramName: 'wd'
    });
    $carSuggest.parent('form').submit(function(e) {
        var kw = $carSuggest.val();
        if (kw == '') {
            e.preventDefault();
            return false;
        }
        // redirect to detail page
        if (/^x?\d{6,}$/.test(kw)) {
            e.preventDefault();
            window.location.href = 'http://' + domain + '.273.cn/car/' + kw + '.html';
            return false;
        }
    });
}


// 鼠标经过显示内容，离开隐藏内容
function hover(target, callback) {
    var $target = $(target);
    $target.hover(function () {
        typeof callback == 'function' && callback();
        $target.addClass('on');
    }, function () {
        $target.removeClass('on');
    });
}

hover('#js_app_download');
hover('#js_top_nav');
hover('#js_change_city', renderChangeCity);

// 城市切换
var $changeCity = $('#js_change_city');
var $cityContent = $('.down-city');

function renderChangeCity() {
    if ($cityContent.text() != '') {
        return;
    }
    var data = {
        'type': Base.siteInfo.type,
        'name': Base.siteInfo.name,
        'id': Base.siteInfo.id,
        'p_id': Base.siteInfo.p_id
    };
    var path = $('#js_change_city').data('path');
    $.ajax({
        type: 'GET',
        url: '/ajax/getchangecity/index/',
        data: {site_info: data},
        dataType: 'JSON'
    }).done(function (data) {
        var html = getChangeCityHtml(data, path);
        $cityContent.append(html);
    });
}

function getChangeCityHtml(data, path) {
    var html = '';
    var $sale = path.length != 0 ? path : '/';
    if (data['city'].length) {
        html += '<dl class="mod-city-list" data-273-click-log="/city@etype=click@city=zbcs">';
        html += '<dt>周边省市</dt>';
        for (var i = 0 , count = data['city'].length; i < count; i++) {
            if (data['city'][i]['name'] == data['current_name']) {
                html += '<dd><a class="current" data-273-click-log="/city@etype=click@city=' + data['city'][i]["domain"] + '" title="' + data['city'][i]['name'] + '" href="http://' + data['city'][i]["domain"] + '.273.cn' + $sale + '">' + data['city'][i]["name"].substring(0, 4) + '</a></dd>';
            } else {
                html += '<dd><a data-273-click-log="/city@etype=click@city=' + data['city'][i]["domain"] + '" title="' + data['city'][i]['name'] + '" href="http://' + data['city'][i]["domain"] + '.273.cn' + $sale + '">' + data['city'][i]["name"].substring(0, 4) + '</a></dd>';
            }
        }
        html += '</dl>';
    }
    if (data['hot'].length) {
        if (data['city'].length) {
            html += '<dl class="mod-city-list mod-city-list-ex" data-273-click-log="/city@etype=click@city=rmcs">';
        } else {
            html += '<dl class="mod-city-list" data-273-click-log="/city@etype=click@city=rmcs">';
        }
        html += '<dt>热门省市</dt>';
        for (i = 0 , count = data['hot'].length; i < count; i++) {
            html += '<dd><a data-273-click-log="/city@etype=click@city=' + data['hot'][i]["domain"] + '" title="' + data['hot'][i]['name'] + '" href="http://' + data['hot'][i]["domain"] + '.273.cn' + $sale + '">' + data['hot'][i]["name"].substring(0, 4) + '</a></dd>';
        }
        html += '</dl>';
    }
    html += '<div class="down-city-more"><a data-273-click-log="/city@etype=click@city=more" href="http://www.273.cn/city.html">更多省市</a></div>';
    return html;
}


// 统计
function logTracker(param) {

    var log = new Log(param || {});

    log.bindTrackEvent();

    log.trackPageView();
}

// 会员登录信息
function setUserInfo() {
    var mt = Cookie.get('MEMBER_TYPE');
    var mu = Cookie.get('MEMBER_NAME');
    if (!mt || !mu || mt == 0 || mu == 0) {
        return false;
    }

    $('#js_log_index').show().find('a').html('您好，' + mu);
    $('#js_logout').show();
    $('#js_login').hide();
}

// js链接跳转
Base.jsLinks = function(config) {
    var $elem = config.$el;
    $elem.on('click', '[data-jslink]', function(e){
        // flag标记为1的元素不触发js链接跳转
        var $this = $(this);
        var $target = $(e.target);
        var flag = $target.data('flag');
        if (!flag) {
            var target = $this.data('target');
            var url = $this.data('jslink');
            if (url) {
                if (target == '_blank') {
                    window.open(url);
                } else {
                    window.location.href = url;
                }
            }
            return false;
        }
    });
    $elem.on('mouseenter', '[data-jslink]', function(e){
        $(this).css('cursor', 'pointer');
    });
};

// 百度分享
Base.bdShare = function() {
    var doc = document;

    window.bds_config = {
        bdText : '#273二手车交易网#' + document.title
    };

    var shareNode = doc.createElement("script");
    var shellNode = doc.createElement("script");
    var url = 'http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=' + Math.ceil(new Date()/3600000);

    shareNode.setAttribute('type', 'text/javascript');
    shareNode.setAttribute('id', 'bdshare_js');
    shareNode.setAttribute('data', 'type=button&amp;uid=688050');

    shellNode.setAttribute('type', "text/javascript");
    shellNode.setAttribute('id', 'bdshell_js');

    var headNode = doc.getElementsByTagName("head")[0];

    headNode.appendChild(shareNode);
    headNode.appendChild(shellNode);

    shellNode.src = url;
};

Base.isMobile = function(mobile) {
    return /^1[3-9]\d{9}$/.test(mobile)
};

Base.isNum = function(str) {
    return /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/.test(str);
};

// 初始化
Base.init = function(param) {
    Plugin.init();
    setUserInfo();
    lazyload();
    logTracker(param);
    // 底部链接
    new Tabs('#js_link', {type: 'hash', activeClass: 'on'});
    $('input, textarea').placeholder();
};

module.exports = Base;
