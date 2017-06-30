/**
 * 主站首页js
 *
 * @version v4.0
 */
var $ = require('jquery');
var Map = require('widget/map/js/map.js');
var CarTpl = require('./car.tpl');
var Slide = require('/widget/slider/js/slide.js');
var Cookie  = require('cookie');
var Base = require('./base.js');
var Index = {};
$.extend(Index, Base);

// 大banner
var $bigBannerBox = $('#js_big_banner');
var bigBannerCount = $bigBannerBox.find('[data-banner]').length;

var index = 1;
var TIME = 5000;
var timer = setInterval(function () {
    showBanner(index++ % bigBannerCount);
}, TIME);

function showBanner(id, $nav, currentId) {
    if (!$nav) {
        $nav = $bigBannerBox.find('[data-banner-index=' + id + ']');
    }
    var $banner = $bigBannerBox.find('[data-banner=' + id + ']');

    $nav.addClass('on').siblings().removeClass('on');

    $banner.siblings().fadeOut('normal', function() {
        $banner.fadeIn('normal', $.noop).addClass('on')
    }).removeClass('on');
}

$bigBannerBox.find('.mod-slider-nav').find('a').on('click', function () {
    var id = $(this).data('banner-index');
    showBanner(id);
    clearInterval(timer);
    timer = setInterval(function () {
        showBanner(++id % bigBannerCount);
    }, TIME);
});

// 热门品牌
var $brandBox = $('#js_hot_brand');
var $brandContent = $brandBox.find('.bd');
// 先缓存php直接渲染的最新车源，必须先去除懒加载的标识
var cache = {0: $brandContent.html().replace(/data-src/g, 'src').replace(/lazy-load/g, '')};
var noCarTpl = '<div class="mod-nocar"><div class="mod-nocar-con"><strong>很抱歉，没有找到相关车辆！</strong><span>您可以查看其他品牌车辆</span></div></div>';

$brandBox.find('[data-target]').on('click', function () {
    $(this).addClass('on').siblings().removeClass('on');
    var target = $(this).data('target');
    if (cache[target] == undefined) {
        renderBrand(target);
    } else {
        $brandContent.html(cache[target]);
    }
});

function renderBrand(id) {
    $.ajax({
        url: '/ajax/getbrandcars/index/',
        type: 'GET',
        dataType: 'json',
        data: {brand_id: id, site_info: Index.siteInfo}
    }).done(function (data) {
        if (data['car_list'].length) {
            cache[id] = CarTpl(data);
        } else {
            cache[id] = noCarTpl;
        }
        $brandContent.html(cache[id]);
    });
}

// 门店地图
Index.map = function(config) {
    var $mapDiv = config.$el;
    var $deptBox = $('#js_dept_list');
    var param = {
        el: $mapDiv,
        center: $mapDiv.data('center') || '',
        width: $mapDiv.data('width') || 0,
        height: $mapDiv.data('height') || 0,
        type: 'dynamic',
        enableScrollWheelZoom: false,
        maxZoom: 16
    };
    var map = new Map($mapDiv, param);

    // 显示某个门店
    function showDept(id, $dept) {
        var $deptLi = $dept || $('[data-dept=' + id + ']');
        $deptLi.addClass('on');
        if ($deptLi.siblings()) {
            $deptLi.siblings().removeClass('on');
        }
        $deptLi.parent('ul').show().siblings('ul').hide();
    }

    // 翻页
    $deptBox.find('.mod-slider-nav-ex').find('a').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        showDept($(this).data('index'));
    });

    // 点击某个门店
    $deptBox.find('li').on('mouseenter', function () {
        showDept(null, $(this));
        var point = $(this).data('point');
        if (point) {
            map.setCenter(point);
            map.setZoom(16);
        }
    });

    // 地图标记
    var markers = $mapDiv.data('markers') || [];
    map.ready(function () {
        $mapDiv.removeClass('lazy-load');
        this.addControl({
            ctype: 'navigation',
            type: BMAP_NAVIGATION_CONTROL_ZOOM
        });

        var marker;
        var points = [];

        for (var i = 0, l = markers.length; i < l; i++) {
            marker = markers[i];
            this.addOverlay({
                type: 'tip',
                point: marker['point'],
                letter: marker['letter'],
                text: marker['text'],
                url: marker['url'],
                width: 20,
                onClick: function (data) {
                    showDept(data.letter);
                }
            });

            if (marker['point']) {
                points.push(marker['point']);
            }
        }

        this.setViewport(points);
    });
};

// 左右滚动banner
Index.slide = function(config) {
    var $el = config.$el;
    Slide({
        el: $el,
        images: $el.data('images'),
        width: $el.data('width'),
        height: $el.data('height'),
        interval: 10000
    });
};

Index.run = function(param) {
    param || (param = {});
    this.init(param);
};

module.exports = Index;
