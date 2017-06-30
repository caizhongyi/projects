/**
 * 主站车购宝详情页js
 *
 * @version v4.0
 */
var $ = require('jquery');
var ImageSlide = require('./car-image-slide.js');
var Luck  = require('/widget/luck/luck.js');
var Base = require('./base.js');
var Detail = {};
$.extend(Detail, Base);

var carId = $('input[name="js_car_id"]').val();

// 轮播相册
var pageNum = $('[name="js_photo_page"]').val();
(new ImageSlide({page_num: pageNum})).init();

// 预约看车
$('#js_reservation').on('click', function() {
    require.async('./_reservation.js', function(M) {M(carId);});
});

// 我要出价
$('#js_depreciate').on('click', function() {
    require.async('./_depreciate.js', function(M) {M(carId);});
});

// 免费发送到手机
$('#js_send').on('click', function() {
    require.async('./_send.js', function(M) {M(carId);});
});

// 举报车源
$('#js_complaint').on('click', function() {
    require.async('./_complaint.js', function(M) {M(carId);});
});

// 手机看车二维码
require.async('/widget/qrcode/qrcode.js', function (QrCode) {
    var text = $('#js_qrcode').data('text');
    if (text == '') {
        text = 'http://m.273.cn/';
    }
    try {
        QrCode({
            el: '#js_qrcode',
            render: "table",
            typeNumber: 4,
            correctLevel: 1,
            text: text,
            width: 98,
            height: 98
        });
    } catch(e) {
        console && console.log(e.message);
    }
});

// tab
var tabFixedClass = 'mod-tit-ex2';
var $tab = $('#js_fixed_tab');
var top = $tab.offset().top;
var $tabLi = $tab.find('li');
$(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    if (scrollTop >= top) {
        $tab.addClass(tabFixedClass);
        $tab.find('.mod-tit-r').show();
        $tabLi.each(function() {
            var $t = $('#' + $(this).data('hash'));
            if ($t.length > 0) {
                var t = $t.offset().top - 20;
                if (scrollTop >= t) {
                    $(this).addClass('on').siblings().removeClass('on');
                }
            }
        });
    } else {
        $tab.removeClass(tabFixedClass);
        $tab.find('.mod-tit-r').hide();
    }
});
$tabLi.on('click', function() {
    $(this).addClass('on').siblings().removeClass('on');
    window.location.hash = $(this).data('hash');
});

Detail.run = function(param) {
    this.bdShare();
    param || (param = {});
    this.init(param);
};

module.exports = Detail;
