/**
 * @desc 首页
 * @copyright (c) 2013 273 Inc
 * @author 陈朝阳 <chency@273.cn>
 * @since 2013-06-24
 */

var $ = require('zepto');
//var Widget = require('app/car/common/widget.js');
var Common = require('app/car/common/common.js');
var Base = require('app/car/base.js');
var MatchBox = require('app/car/matchBox.js');
var BrandTpl = require('app/car/tpl/brand.tpl');
var Swipe = require('widget/swipe/js/swipe.js');
var Cookie = require('components/cookie/cookie.js');

var _ = require('app/car/lib/underscore/underscore.js');
require('app/car/common/footer.js');

var Index = exports;

var domain = '';
//extend
_.extend(Index, Base);

//进入全国站时的地理定位
Index.location = function() {
    Common.location( function(city) {
        if (city) {
            $.ajax({
                type: 'POST',
                url: '/ajax.php?module=getCityByName',
                data: { name: city },
                dataType: 'json',
                timeout: 800,
                success: function(data){
                    if (data && data.url) {
                        window.location.href = data.url;
                    }
                },
                error: function(xhr, type){
                    alert('无法定位您的位置，可手动选择城市');
                }
            });
        }
    });
};


//新版首页头部广告轮播
Index.slide = function(config) {
    var $el = config.$el;
    var $numSpan = $el.find('.banner-num span');
    var $slider =  $('#slider');
    window.slide = Swipe(document.getElementById('slider'), {
        auto: 5000, //0为不自动播放,大于0表示毫秒
        continuous: true,
        callback: function(pos) {
            $numSpan.removeClass('on');
            $($numSpan[pos]).addClass('on');
        }
    });
    $slider.height('auto')

};

Index.mslide = function(config) {
    
	var $slider =  $('.mslider');
    $slider.each(function(i , n){
    
    	var $numSpan = $(this).find('.banner-num span');
    
    	window.mslide = Swipe($(this)[0], {
            auto: 5000, //0为不自动播放,大于0表示毫秒
            continuous: true,
            callback: function(pos) {
                $numSpan.removeClass('on');
                $($numSpan[pos]).addClass('on');
            }
        });
    })
    
    $slider.height('auto')

};

//更多品牌选择
Index.moreBrand = function(config) {
    var $el = config.$el;
    //所有品牌数据，以json格式存于js中
    var brandData = null;
    //当前屏幕宽度
    var pageWidth = $(window).width();
    $el.on('click', function() {
        pageWidth = $(window).width();
        if (!brandData) {
            brandData = require('app/car/brand.js');
        }
        var $moreBrand = $('#more_brand');
        //隐藏其他div
        $('.js_div').hide();
        $moreBrand.css({width:pageWidth, height:'100%', right:-pageWidth});
        if ($moreBrand.children().length > 0) {
            $moreBrand.show();
        } else {
            $moreBrand.html(BrandTpl(brandData));
            $('body').append($moreBrand);
            bindBrandEvent();
        }
        setTimeout(function () {
            $moreBrand.css({right:'0'});
        }, 10);
        //滚动到顶部
        window.scroll(0, 0);
        //绑定屏幕旋转事件
        $(window).off('orientationchange.brand').on('orientationchange.brand', function() {
            setTimeout(function () {
                 $moreBrand.css({width:$(window).width()});
            }, 400);
        });
    });
    
    function bindBrandEvent() {
        //绑定锚点
        Common.anchor($('#more_brand .area-list .letter'));
        
        $('#more_brand .brand-item').on('click', function(){
            var uri = $(this).attr('data-brand-url');
            window.location.href = '/' + uri + '/';
        });
        
        $('#more_brand .reback .first').on('click', function(){
            $('#more_brand').css({right:-pageWidth});
            //解除屏幕旋转事件
            $(window).off('orientationchange.brand');
            setTimeout(function () {
                 $('.js_div').show();
                 $('#more_brand').hide();
                 slide.setup();
            }, 400);
        });
    }
};

//更多价格
Index.morePrice = function(config) {
    var $el   = config.$el,
        $box  = $('#index_more_price_box'),
        $main = $('#main'),
        width = $(window).width();

    $el.on('click', function() {
        $box.css({right:-width}).show();
        //滚动到顶部
        window.scroll(0, 0);
        $box.css({right:'0'});
        $main.hide();
    });
    //价格返回
    $box.find('.reback').on('click', function() {
        $main.show();
        $box.css({right: -width});
    });
    //价格范围
    $box.find('.range-btn').on('click', function() {
        var min = parseInt($box.find('.range-input').find('input').eq(0).val());
        var max = parseInt($box.find('.range-input').find('input').eq(1).val());
        if (isNaN(min)) min = 0;
        if (isNaN(max)) max = 0;
        if (!min && !max) {
            location.href = '/car/';
            return;
        }
        var tmp;
        if (min > max) {
            tmp = max;
            max = min;
            min = tmp;
        }
        location.href = '/i' + min + '_a' + max +'/';
    });
};

Index.appDownloadClose = function(config) {
    var $el = config.$el;
    $el.find('.close').on('click', function() {
        $el.hide();
        Cookie.set('APP_DOWNLOAD_IS_READ', 1, {'expires' : 10, 'domain' : '.273.cn', 'path' : '/'});
    });
};

Index.bannerClose = function(config) {
    var $el = config.$el;
    $el.find('.topbanner-close').on('click', function() {
        $el.hide();
        Cookie.set('TOP_BANNER_IS_READ', 1, {'expires' : 1, 'domain' : '.273.cn', 'path' : '/'});
    });
};


//首页入口函数
Index.start = function (param) {
    param || (param = {});
    Base.init(param);
//    Widget.initWidgets();
    Common.lazyLoadPic();
    if (param) {
        domain = param['domain'];
        if (param['domain'] == 'www' && param['auto_jump']) {
            Index.location();
        }
    }
};