/**
 * 主站列表页js
 *
 * @version v4.0
 */
var $ = require('jquery');
var Cookie  = require('cookie');
var Storage = require('storage');
var Base = require('./base.js');
var MoreBrand = require('./list-more-brand.js');
var SearChSave = require('./list-search-save.js');
var KeyControl = require('/widget/keyboard/key-control.js');
var List = {};
$.extend(List, Base);

var CLASS_DOWN_ON = 'comm-down-on';
var CLASS_RANGE_FOCUS = 'range-input-focus';

// drop down menu
$('.comm-down').hover(
    function() {
        $(this).addClass(CLASS_DOWN_ON);
    },
    function() {
        $(this).removeClass(CLASS_DOWN_ON);
    }
);

// range input
var $range = $('.range-input');
var $rangeInput = $range.find('input');

$rangeInput.on('focusin', function() {
    $(this).parents('.range-input').addClass(CLASS_RANGE_FOCUS);
});

// only number allowed
$rangeInput.on('keyup', function() {
    this.value = this.value.replace(/\D/gi, '');
});
$range.on('mouseleave', function() {
    $(this).removeClass(CLASS_RANGE_FOCUS);
    $(this).find('input').blur();
});
$range.find('button').on('click', function() {
    var $inputs = $(this).parents('.range-input').find('input');
    var min = ~~$inputs.get(0).value;
    var max = ~~$inputs.get(1).value;
    var temp;

    if (min > max) {
        temp = min;
        min  = max;
        max  = temp;
    }
    if (max == 0) {
        return false;
    }
    max = max <= 2000 ? max : 2000;
    var link = $(this).data('link');
    if (link != '') {
        link = link.replace(/%min%/, min).replace(/%max%/, max);
        // @TODO js log
        window.location.href = link;
    }
});

// 我要出价
$('.js_depreciate').on('click', function() {
    var carId = $(this).data('id');
    require.async('./_depreciate.js', function(M) {M(carId, 'orange');});
});

// @TODO 是否最近浏览
//var carIdStr = Storage.get('history_car_id');
//if (carIdStr != '') {
//    var historyCarIdArr = JSON.parse(carIdStr);
//    $('.js_browser').each(function() {
//        var carId = $(this).data('car-id');
//        if ($.inArray(carId, historyCarIdArr)) {
//            $(this).append('<span class="browse">最近浏览过</span>');
//        }
//    });
//}

// more series
function moreSeries() {
    var $box = $('#js_more_series');
    $box.find('.more').on('click', function() {
        if ($(this).find('a').find('i').hasClass('i-more-down')) {
            $box.addClass('group-select-item-show');
            $(this).find('a').html('收起'+'<i class="i-more-up"></i>');
        } else {
            $box.removeClass('group-select-item-show');
            $(this).find('a').html('更多'+'<i class="i-more-down"></i>');
        }
    });
}


List.pageTurn = function(config) {
    var $el = config.$el;

    var left = KeyControl({
        key : 'left',
        context : this,
        callback : function() {
            var url = $el.find('#js_page_prev').attr('href');
            if (url) {
                window.location.href = url;
            }
        }
    });

    var right = KeyControl({
        key : 'right',
        context : this,
        callback : function() {
            var url = $el.find('#js_page_next').attr('href');
            if (url) {
                window.location.href = url;
            }
        }
    });
};

List.fix = function(config) {
    var $el = config.$el;
    var top = $el.offset().top;
    var fixCss = {position:'fixed', top: 0, 'z-index': 100, width: '1188px'};
    var noFixCss = {position:'', top: '', 'z-index':'', width: ''};
    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        if (scrollTop >= top) {
            $el.css(fixCss);
        } else {
            $el.css(noFixCss);
        }
    });
};

List.run = function(param) {
    param || (param = {});
    this.init(param);
    // 筛选面板更多品牌
    (new MoreBrand()).init();
    // 搜索条件保存
    (new SearChSave()).init();
    moreSeries();
};

module.exports = List;
