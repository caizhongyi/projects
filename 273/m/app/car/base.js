/**
 * @desc 页面基类
 * @copyright (c) 2013 273 Inc
 * @author 马鑫 <maxin@273.cn>
 * @since 2013-06-24
 */

// dependences
var $ = require('zepto');
var Log    = require('/widget/log/js/log.js');

//var Uuid   = require('widget/uuid/js/uuid.js');
var Toast  = require('app/car/toast.js');
var plugin = require('widget/plugin/plugin.js');
//var AutoComplete = require('/widget/autocomplete/js/autocomplete.js');
// public
var Base = exports;

var Cookie = require('components/cookie/cookie.js');

//关键字搜索
var domain = $('#car_suggest').data('domain');
if (domain == '') {
    domain = 'www';
}

Base.domain = domain;

//new AutoComplete('#car_suggest', {
//    source: "http://data.273.cn/?_mod=AutoCompleteV2&domain=" + domain,
//    format: function (row) {
//        return "<li style='overflow: hidden'><span style='float: right;margin-right: 10px;line-height: 33px;'>" + row.count + "条</span><a href='" + row.value + "'>" + row.text + "</a></li>"
//    },
//    valueFormat : function($item){
//        return $item.find('a').text();
//    },
//    cache: false,
//    attachment: $('#car_suggest_form'),
//    type: 'default',
//    paramName: 'wd'
//});

// 顶部banner广告
Base.adBanner = function (config) {

    var $el = config.$el;
    var $close = $el.find('.js-close');
    var useCookie = config.cookie;
    if (useCookie && Cookie.get('ad_close')) {
        $el.hide();
    }
    $close.click(function () {
        $el.hide();
        if (useCookie) {
            var options = {};
            options.domain = '.m.273.cn';
            options.path = '/';
            options.expires = 3;//天
            Cookie.set('ad_close',1 ,options);
        }
    });
};

Base.init = function (param) {
    Base.toast = Toast;
    plugin.init();
    param || (param = {});
   // Uuid();
    Log.init(param['eqsch'], false);
};


