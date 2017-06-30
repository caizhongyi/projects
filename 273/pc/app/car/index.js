/**
 * pc首页
 *
 * @author: 王煜 <wangyu@273.cn>
 * @since:  2015-11-11
 * @copyright Copyright (c) 2003-2015 Inc. (http://www.273.cn)
 */

var Index = {};
var Map = require('/widget/map/js/map.js');
var $ = require('jquery');
var Slider = require('/widget/slider/js/slider.js');
var Base = require('./base.js');

// 城市门店地图
Index.deptMap = function(config) {
    var $el = config.$el;

    var $mapDiv = $el.find('.index_map');
    var $mapLi = $el.find('.shoplist ul li');
    var param = {
        center : $mapDiv.data('center') || '',
        width : $mapDiv.data('width') || 0,
        height : $mapDiv.data('height') || 0,
        type : 'dynamic',
        enableScrollWheelZoom:false,
        maxZoom : 16
    };

    var markers = $mapDiv.data('markers') || [];

    var map = new Map($mapDiv, param);

    map.ready(function() {
        $mapDiv.removeClass('lazy_load');
        this.addControl({
            ctype:'navigation',
            type : BMAP_NAVIGATION_CONTROL_ZOOM
        });

        var marker;
        var points = [];

        for (var i = 0, l = markers.length; i < l; i++) {
            marker = markers[i];
            this.addOverlay({
                type : 'tip',
                point: marker['point'],
                letter: marker['letter'],
                text : marker['text'],
                url : marker['url'],
                width : 20,
                onClick :function (data) {
                    deptClick($('#shop_' + data.letter));
                    turnPageByNum(data.letter);
                }
            });

            if (marker['point']) {
                points.push(marker['point']);
            }
        }
        $mapLi.each(function(index){
            $(this).click(function(){
                deptClick($(this));
                var point = $(this).data('point');
                if (point) {
                    map.setCenter(point);
                    map.setZoom(16);
                }
            });
        });
        this.setViewport(points);
    });

    //上一页
    $el.find('.prev-btn').on('click', function(){
        var curPage = $el.find('.slide-nav li.on').data('page');
        if (curPage - 1 > 0) {
            turnPage(curPage-1);
        }
    });

    //下一页
    $el.find('.next-btn').on('click', function(){
        var curPage = $el.find('.slide-nav li.on').data('page');
        if (curPage + 1 <= $el.find('.slide-nav li').length) {
            turnPage(curPage+1);
        }
    });

    $el.find('.slide-nav li').on('click', function(){
        var page = $(this).data('page');
        turnPage(page);
    });

    function deptClick($clickEl) {
        $clickEl.siblings().removeClass('on');
        $clickEl.addClass('on');
    }

    function turnPageByNum(num){
        num = parseInt(num);
        var page = Math.ceil(num/6);
        turnPage(page);
    }

    function turnPage(page) {
        //显示当前页
        var $curPage = $el.find('.js_shoplist ul[data-page=' + page + ']');
        $curPage.show();
        $curPage.siblings('ul').hide();
        //显示当前页的底部标识
        var $curTag = $el.find('.slide-nav li[data-page=' + page + ']');
        $curTag.siblings('li').removeClass('on');
        $curTag.addClass('on');
    }
};

// 轮播大图
Index.bigBanner = function(config) {
    var $el = config.$el;
    new Slider($el);
};

// 对外入口
Index.run = function(options) {
    var opt = options || {};
    Base.init(options);
};

module.exports = Index;
