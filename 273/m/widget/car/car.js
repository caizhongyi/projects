/**
 * 车型库选择
 *
 * 基础dom
 *  <div id="main">
 *      <button id="js_show_car">click</button>
 *  </main>
 *  <div id='brand'></div>
 *  <div id="series"></div>
 *  <div id="model"></div>
 *
 * 自定义setVal方法
 * new Car({
 *  setVal: function(data) {
 *      // data = {brand_id: 18, brand_name: "丰田", model_id: 355236, model_name: "1.8 无级 豪华版", series_id: 102, series_name: "卡罗拉"}
 *  }
 * });
 */

var $ = require('zepto');
var BrandTpl  = require('./brand_list.tpl');
var SeriesTpl = require('./series_list.tpl');
var ModelTpl  = require('./model_list.tpl');
var headerTpl = '<div id="pageheader" class="row"><span class="reback"><a href="javascript:;">返回</a></span><span class="pagetitle">车型品牌</span></div>';

var defaults = {
    // 触发组件的元素
    target: '#js_show_car',
    // 品牌最外层容器元素
    brand_box: '#brand',
    // 车系最外层容器元素
    series_box: '#series',
    // 车型最外层容器元素
    model_box: '#model',
    // 原始的容器元素，触发组件时需要隐藏该元素
    origin_box: '#main',
    // 对外回调方法，data为品牌车系车型相关信息
    setVal: function(data) {},
    // 是否开启车型
    enable_model: true
};

var Car = function(options) {
    this.options     = $.extend({} , defaults, options);
    this.$brandBox   = $(this.options.brand_box);
    this.$seriesBox  = $(this.options.series_box);
    this.$modelBox   = $(this.options.model_box);
    this.$originBox  = $(this.options.origin_box);
    this.val         = {};
    this.boxArr      = [];

    var self = this;
    $(this.options.target).on('click', function() {
        self.boxArr.push(self.$originBox);
        self.$originBox.hide();
        self.addHeader();
        self.renderBrand();
    });
};

var property = Car.prototype;

property.addHeader = function() {
    var self = this;
    $(document.body).prepend(headerTpl);
    $('#pageheader').find('a').on('click', function() {
        // boxArr中至少有两个值，一个是原始box，一个是品牌box
        self.boxArr.length == 2 && $('#pageheader').remove();
        self.boxArr.pop().hide();
        self.boxArr.pop().show();
    });
};

property.removeHeader = function() {
    $('#pageheader').remove();
};

property.destroy = function() {
    this.options.setVal(this.val);
    this.removeHeader();
    this.$originBox.show();
};

// 品牌
property.renderBrand = function() {
    var self = this;
    self.boxArr.push(self.$brandBox);
    self.$brandBox.html(BrandTpl([])).show().find('a').on('click', function() {
        var brandId = $(this).data('id');
        if (brandId) {
            self.renderSeries(brandId);
            self.val.brand_id = brandId;
            self.val.brand_name = $(this).text();
        }
    });
    $('img.lazy').lazyload();
};

// 车系
property.renderSeries = function(brandId) {
    var self = this;
    self.boxArr.push(self.$seriesBox);
    $.ajax({
        type: 'GET',
        url: 'http://m.273.cn/ajax.php?module=getModelSeriesV2',
        data: {
            type: 'series',
            brand: brandId
        },
        dataType: 'jsonp',
        success: function(data) {
            if (data) {
                self.$brandBox.hide();
                self.$seriesBox.html(SeriesTpl(data)).show().find('a').on('click', function() {
                    var seriesId = $(this).data('id');
                    if (seriesId) {
                        self.val.series_id = seriesId;
                        self.val.series_name = $(this).text();
                        if (self.options.enable_model) {
                            self.renderModel(seriesId);
                        }  else {
                            self.$seriesBox.hide();
                            self.destroy();
                        }
                    }
                });
            }
        },
        error: function(xhr, type) {
            alert('网络异常，未请求到数据，请检查网络或重试');
        }
    });
};

// 车型
property.renderModel = function(seriesId) {
    var self = this;
    self.boxArr.push(self.$modelBox);
    $.ajax({
        type: 'GET',
        url: 'http://m.273.cn/ajax.php?module=getModelSeriesV2',
        data: {
            type: 'model',
            series: seriesId
        },
        dataType: 'jsonp',
        success: function(data) {
            if (data) {
                self.$seriesBox.hide();
                self.$modelBox.html(ModelTpl(data)).show().find('a').on('click', function() {
                    var modelId = $(this).data('id');
                    if (modelId) {
                        self.val.model_id = modelId;
                        self.val.model_name = $(this).text();
                    }
                    self.$modelBox.hide();
                    self.destroy();
                });
            }
        },
        error: function(xhr, type) {
            alert('网络异常，未请求到数据，请检查网络或重试');
        }
    });
};

module.exports = Car;
