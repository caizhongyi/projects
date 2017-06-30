/**
 * 地域选择组件
 *
 * 基础dom
 *  <div id="main">
 *      <button id="js_show_location">click</button>
 *  </div>
 *  <div id="js_location_box"></div>
 *
 * 使用时自定义setVal方法
 * new Location({
 *  setVal: function(data) {
 *      // data = {city_name: "南京", city_id: 75, district_name: "", district_id: 0}
 *  }
 * });
 */
var $ = require('zepto');
var Data = require('./data.js');
var CityTpl = require('./city.tpl');
var headerTpl = '<div id="pageheader" class="row"><span class="reback"><a href="javascript:;">返回</a></span><span class="pagetitle">地区选择</span></div>';

var defaults = {
    // 触发组件的元素
    target: '#js_show_location',
    // 组件最外层容器元素
    box: '#js_location_box',
    // 原始的容器元素，触发组件时需要隐藏该元素
    origin_box: '#main',
    // 对外回调接口，data为地域相关信息
    setVal: function(data) {},
    // 是否开启县区
    enable_district: true
};

var Location = function(options) {
    this.options = $.extend({} , defaults, options);
    var self = this;
    this.$box = $(this.options.box);
    this.$originBox = $(this.options.origin_box);
    this.setVal = this.options.setVal;
    this.val = {};

    $(this.options.target).on('click', function() {
        self.$originBox.hide();
        self.addHeader();
        self.$box.show();
        self.renderCity();
        self.bindUI();
    });
};

var property = Location.prototype;

property.addHeader = function() {
    var self = this;
    $(document.body).prepend(headerTpl);
    $('#pageheader').find('a').on('click', function() {
        $('#pageheader').remove();
        self.$box.hide();
        self.$originBox.show();
    });
};

property.destroy = function() {
    this.setVal(this.val);
    this.$box.hide();
    $('#pageheader').remove();
    this.$originBox.show();
    this.$box.find('.district').remove();
};

// 城市
property.renderCity = function() {
    this.$box.html(CityTpl([]));
};

// 县区
property.renderDistrict = function(cityId) {
    var $districtBox = $('<div class="district"></div>');
    var districtArr = Data.city_dist[cityId];
    var liArr = ['<li><label><input type="radio" name="district" value="0" checked style="opacity: 0"/>县区</label></li>'];
    for(var i = 0, len = districtArr.length; i < len; i++ ){
        liArr.push('<li><label><input type="radio" name="district" value="'+ districtArr[i].id + '" data-name="'+ districtArr[i].name + '" style="opacity: 0"/>'+ districtArr[i].name +'</label></li>');
    }
    $districtBox.html('<ul class="district-list">' + liArr.join('') + '</ul>');
    $districtBox.addClass('in');
    this.$box.append($districtBox);
};

// 事件绑定
property.bindUI = function() {
    var $cityDl = $(this.$box).find('.js-area-list').find('dl');
    var self = this;
    $cityDl.find('a').on('click', function() {
        var cityId = $(this).data('id');
        var $this = $(this);
        self.val = {
            city_name: $this.text(),
            city_id: $this.data('id'),
            district_name: '',
            district_id: 0
        };
        if (cityId) {
            if (self.options.enable_district) {
                self.renderDistrict(cityId);
                $(self.$box).find('.district-list').find('[name="district"]').on('click', function() {
                    $this = $(this);
                    self.val.district_name = $this.data('name');
                    self.val.district_id = $this.val();
                    self.destroy();
                });
                $('.district').on('click', function() {
                    $(this).removeClass('in').remove();
                });
            } else {
                self.destroy();
            }
        }
    });
};

module.exports = Location;