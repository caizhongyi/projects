/**
 * @desc wap车源详情页
 * @copyright (c) 2013 273 Inc
 * @author 陈朝阳 <chency@273.cn>
 * @since 2013-06-24
 */

var $ = require('zepto');
var Widget = require('app/car/common/widget.js');
var Base = require('app/car/base.js');
var _ = require('app/car/lib/underscore/underscore.js');
var Common = require('app/car/common/common.js');
var Swipe = require('widget/swipe/js/swipe.js');
var Detail = exports;
_.extend(Detail, Base);

//百度地图自定义html
var infoBoxHtml = '';

//详情页顶部图片滑动
Detail.swipePic = function (config){
    if (window.parent !== window) {
        $('#car-pics').width($(window).width());
    }
    var $elem = config.$el;
    var curIndex = 0;
    var blockCount = parseInt(config.count);
    var $imgs = $elem.find('img');
    var $numSpan =  $elem.find('span.more');
    
    loadImg($imgs, 0); //预加载第一张图片
    if (blockCount > 1) {
        //预加载下一张图片
        loadImg($imgs, 1);
    }
    window.slide = Swipe(document.getElementById('slider'), {
        auto: 0, //0为不自动播放
        continuous: true,
        callback: function(pos) {
            curIndex = pos;
            if (curIndex+1 < blockCount) {
                loadImg($imgs, curIndex+1);
            }
            $numSpan.html((curIndex+1) + '/' + blockCount);
        }
    });
    
    //全屏显示当前鼠标点击的图片
    $imgs.each(function(index) {
        $(this).click(function() {
            bindBigimgEvent(index);
        });
    });
};

//地图显示
Detail.bdMap = function (config) {
    var $elem = config.$el;
    //门店坐标
    var shopPoint = config.point;
    $elem.on('click',showMap);
    $('#dept_address').on('click',showMap);
    function showMap(e){
        $('#main').hide();
        $('#pageheader').hide();
        $('#viewmap').show();
        $('#address').height($(window).height());
        var map = new BMap.Map("address");                        // 创建Map实例
        if (shopPoint) {
            var srr = shopPoint.split(/,|，/);
            var point = new BMap.Point(parseFloat(srr[0]),parseFloat(srr[1]));
            map.centerAndZoom(point, 16);     // 初始化地图,设置中心点坐标和地图级别
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);         //添加中心点标志
            map.addControl(new BMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_ZOOM}));// 添加平移缩放控件
            
            var opts = {
                width : 150,
                enableCloseOnClick:false
            };
            var info = infoBoxHtml;
            var infoWindow = new BMap.InfoWindow(info, opts);
            marker.openInfoWindow(infoWindow);
        }
    };
    //地图返回事件
    $('#viewmap .btn_back').click(function(){
        $('#main').show();
        $('#pageheader').show();
        $('#viewmap').hide();
        slide.setup();
    });
    $(window).off('orientationchange.map').on('orientationchange.map', function() {
        setTimeout(function () {
             $('#address').height($(window).height());
        }, 400);
    });
};

//相同价格帖子和相同品牌帖切换
Detail.tapMore = function(config){
    var $elem = config.$el;
    $taps = $elem.find('.carlist-tab span a');
    $taps.click(function(){
        var index = $taps.index(this);
        $taps.removeClass('active');
        $(this).addClass('active');
        if (index == 1) {
            $elem.find('#more_family').hide();
            $elem.find('#more_price').show();
        } else if(index == 0) {
            $elem.find('#more_family').show();
            $elem.find('#more_price').hide();
        }
    });
};

//下架车页面热门车辆、相同价格帖子和相同品牌帖切换
Detail.saledTapMore = function(config){
    var $elem = config.$el;
    $taps = $elem.find('.carlist-tab-move span a');
    $taps.click(function(){
        var index = $taps.index($(this));
        $taps.removeClass('active');
        $(this).addClass('active');
        if (index == 0) {
            $elem.find('#same_price').hide();
            $elem.find('#same_family').hide();
            $elem.find('#car_hot').show();
        } else if(index == 2) {
            $elem.find('#same_price').show();
            $elem.find('#same_family').hide();
            $elem.find('#car_hot').hide();
        } else if(index == 1) {
            $elem.find('#car_hot').hide();
            $elem.find('#same_price').hide();
            $elem.find('#same_family').show();
        }
    });
};
//下架车源详细信息显示
function detailDisplay() {
    $('#cardetail').click(function() {
        $('#saledcarinfo').toggle();
    });
    // 右上角菜单触发临时加这
    $('#js_menu_btn').click(function() {
        $('#js_menu_in').toggle();
    });
}
//div居中显示
function centerDisplay(id) {
    var div = $(id);
    var winHeight = $(window).height();
    var divHeight = div.height();
    var top = (winHeight - divHeight) / 2 + $(window).scrollTop();
    div.css({ top: top + "px"});
}

//绑定大图事件
function bindBigimgEvent (index) {
    window.scroll(0, 0);
    var $bigImgs = $('#viewBigImage ul').find('img');
    //隐藏猪主页面
    $('#main').hide();
    //显示遮罩层
    $('#viewBigImagebg').css('height','100%');
    $('#viewBigImagebg').show();
    //显示图片窗
    $('#viewBigImage').show();
    //加载当前图片
    loadImg($bigImgs, index);
    var bigSlider = Swipe(document.getElementById('big_slider'), {
        startSlide: index,
        auto: 0, //0为不自动播放
        continuous: true,
        callback: function(pos) {
            loadImg($bigImgs, pos);
            $('#point_big .current').removeClass('current');
            $('#point_big a').eq(pos).addClass('current');
        }
    });
    //居中显示
    centerDisplay('#big_slider');
    //绑定返回按钮
    $('#viewBigImage .btn_back').off('click').on('click',function() {
        $('#main').show();
        $('#viewBigImagebg').hide();
        $('#viewBigImage').hide();
        slide.setup();
    });
}

function loadImg($imgs, index) {
    var img = $imgs[index];
    if (img.src != img.getAttribute("ref")) {
        img.src = img.getAttribute("ref");
    }
}

//服务保障图片展开
Detail.moreService = function(config) {
    var $el = config.$el;
    var titleHtml = $el.find('.gua_title').html();
    $el.find('.gua_content dl').last().addClass('last');
    $el.find('.gua_title').click(function(){
        if ($el.hasClass('service_gua_click')) {
            $el.removeClass('service_gua_click');
            $(this).html(titleHtml);
        } else {
            $el.addClass('service_gua_click');
            $(this).html('<em></em><span class="color-999">服务保障</span>');
        }
    });
};

/**
 * 弹出保障服务
 * */
Detail.detailService = function(config) {
	var $el = config.$el;
	$el.one('click', function() {
		require.async(['app/car/block/detailService.js'], function(detailService) {
			new detailService({ $el : $el});
		});
	});
};

/**
 * 弹出保障服务
 * */
Detail.maintenance = function(config) {
	var $el = config.$el;
	$el.on('click', function() {
		Base.toast('该功能即将开放，敬请期待', 5000);
		return false;
	});
};

//隐藏在线咨询
function hideOnlineContact() {
	$(".close-contact").click(function(){
		$("#contact-online").hide();
	})
};

Detail.start = function (param) {
    param || (param = {});
    if (param) {
        infoBoxHtml = param['infoBox'];
    }
    Base.init(param);
//    Widget.initWidgets();
    Common.lazyLoadPic();
    detailDisplay();
    hideOnlineContact();
};