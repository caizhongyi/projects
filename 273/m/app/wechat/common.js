var $ = require('zepto');
var IScroll = require('iscroll');
var browser = require('widget/browser/js/browser');

var posterViewSlide ;

var initPosterView = module.exports.initPosterView =  function( index ){
    if( posterViewSlide ) {
        posterViewSlide.goToPage( index || 0 ,0);
        return ;
    } ;

    var $view = $('.pic_view');
    $('.i_close' , $view ).click(function(){
        $('.pic_view,.mask').hide()
    })

    var width = $(window).width(), len = $('.slide' , $view).length;
    $('.slide,.warpper',$view).width( width);

    $('.scroller' ,$view).width( width * len )
    $('.indicator', $view).width( (6 + 5) * len - 5 )

    var myScroll = new IScroll('.pic_view .warpper', {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapSpeed: 400,
        keyBindings: true,
        indicators: {
            el: $('.indicator')[0],
            resize: false
        }
    });

    $('.warpper',$view).on('mouseenter',function(){
        myScroll.interval && clearInterval(myScroll.interval);
    }).on('mouseleave',function(){
        myScroll.auto();
    })
    myScroll.auto = function(){
        return myScroll.interval = setInterval(function(){
            if( myScroll.currentPage.pageX >= len - 1){
                myScroll.goToPage(0,0);
            }
            else{
                myScroll.next();
            }
        },5000)
    }
    myScroll.interval = myScroll.auto();

    myScroll.on('scrollEnd' , function(e ,params){
        console.log(this.currentPage.pageY)
    })

    posterViewSlide = myScroll;

    posterViewSlide.goToPage( index || 0 ,0);
    return this;
}

// 信息弹出窗口
var message = module.exports.message = function( message, onclose ){
    var html = '<div class="mask op70" id="alert-mask"></div><div style=" top: 100px; position: fixed" class="pop_box" id="alert">\
        <div class="con">\
    </div>\
    <div class="btn"><a href="javascript:void(0);" data-close>知道了</a></div>\
    </div>';

    if($('#alert').length ) return ;

    $(html).on('click','[data-close]',function(){
        $(this).closest('#alert').remove();
        $('#alert-mask').remove();
        if(onclose){
            onclose();
        }
    }).appendTo('body').show().find('.con').html(message);
    showMask($('#alert-mask'));
    return this;
}

module.exports.initSlider =  function(){
    var width = $('.con_area').width() , len = $('.slide', '.picshow').length, $scroller = $('.scroller','.picshow');
    $('.slide,.warpper', '.picshow').width( width );
    $scroller.width( width * len )

    var myScroll = new IScroll('.picshow .warpper', {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        preventDefault: false,
        eventPassthrough: true
    });

    $('.warpper', '.picshow').on('mouseenter',function(){
        myScroll.interval && clearInterval(myScroll.interval);
    }).on('mouseleave',function(){
        myScroll.auto();
    })
    myScroll.auto = function(){
        return myScroll.interval = setInterval(function(){
            if( myScroll.currentPage.pageX >= len - 1){
                myScroll.goToPage(0,0);
            }
            else{
                myScroll.next();
            }
        },5000)
    }
    myScroll.interval = myScroll.auto();

    myScroll.on('scrollEnd' , function(e ,params){
        $('.amount span').html((this.currentPage.pageX || 0) + 1)
    })

    $('img', '.picshow').eq(0).on('load', function(){
        $('.picshow').height($scroller.height());
    });

    $('.picshow ').on('click','.slide',function(){
        $('.pic_view').show();
        showMask();
        initPosterView( $(this).closest('.slide').index() );
    });
    return this;
}

var showMask = module.exports.showMask = function(elem) {
    if(! elem){
        elem = $('.mask');
    }
    elem.height(Math.max($(document).height(), $(window).height())).show();
}

module.exports.initWechatSDK = function(wx , config) {
    wx.config({
        // debug: true,
        appId: config.app_id,
        timestamp: config.timestamp,
        nonceStr: config.nonce_str,
        signature: config.signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'hideMenuItems'
        ]
    });
    
    wx.ready(function () {
        function success() {
            // 用户确认分享后执行的回调函数
            $('.share-guid').hide();
            $.post("/wechat/share/index", {car_id: config.car_id}, function(data){
                    if(data.id > 0) {
                        window.location.reload();
                    }
                }, 'json');
        }

        function cancel() {
            // 用户取消分享后执行的回调函数
            $('.share-guid').hide();
        }

        function fail() {
            $('.share-guid').hide();
            message(JSON.stringify(res));
        }

        wx.onMenuShareAppMessage({
            title : config.title, // 分享标题
            desc : config.desc,
            link : config.link, // 分享链接
            imgUrl : config.img_url, // 分享图标
            success: success,
            cancel: cancel,
            fail: fail,
        });

        wx.onMenuShareTimeline({
            title : config.desc, // 分享标题
            link : config.link, // 分享链接
            imgUrl : config.img_url, // 分享图标
            success: success,
            cancel: cancel,
            fail: fail,
        });

        wx.onMenuShareQQ({
            title : config.title, // 分享标题
            desc : config.desc,
            link : config.link, // 分享链接
            imgUrl : config.img_url, // 分享图标
            success: success,
            cancel: cancel,
            fail: fail,
        });

        wx.onMenuShareQZone({
            title : config.desc, // 分享标题
            desc : config.desc,
            link : config.link, // 分享链接
            imgUrl : config.img_url, // 分享图标
            success: success,
            cancel: cancel,
            fail: fail,
        });

        wx.hideMenuItems({
            menuList: [
                'menuItem:readMode', // 阅读模式
                'menuItem:openWithSafari', // 在Safari中打开
                'menuItem:copyUrl', // 复制链接
                'menuItem:share:email'
            ],
            success: function (res) {},
            fail: function (res) {}
        });
    });
}

var isMobile = module.exports.isMobile = function (phone) {
    return /^1[34587]\d{9}$/.test(phone);
}

$.fn.numeral = function(f) {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress",function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
        if(!browser.msie&&(e.keyCode==0x8))  //火狐下不能使用退格键
        {
            return ;
        }

        if(f){//浮点数
            if((this.value.length==0 || this.value.indexOf(".")!=-1) && code==46) return false;
            var vals = this.value.toString().split(".");
            if(vals.length > 1){
                if(vals[1].length >= 2){
                    return false;
                }
            }else{
                if(vals[0].length >= 3 && code!=46){
                    return false;
                }
            }
            return code >= 48 && code<=57 || code==46;
        }else{//整数
            return code >= 48 && code<= 57;
        }

    });
    this.bind("blur", function() {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    });
    this.bind("paste", function() {
        var s = clipboardData.getData('text');
        if (!/\D/.test(s));
        value = s.replace(/^0*/, '');
        return false;
    });
    this.bind("dragenter", function() {
        return false;
    });
    this.bind("keyup", function() {
        if (/(^0+)/.test(this.value)) {
            this.value = this.value.replace(/^0*/, '');
        }
        if(! f){
            return;
        }
        var vals = this.value.toString().split(".");
        if(vals.length > 1){
            if(vals[1].length >= 2){
                this.value = vals[0] + '.' + vals[1].substr(0, 2);
            }
        }else{
            if(vals[0].length >= 3){
                this.value = vals[0].substr(0, 3);
            }
        }
    });
};

$('.btn-prize').click(function(){
    $.post("/wechat/statistics/log", {name: 'want_gift'},
        function(data){
            $('#pop-share').show();
            showMask($('.mask.op70'));
        }, 'json');
})
$('.btn-share').click(function(){
    var name = $(this).hasClass('help') ? 'help_sell_btn' : 'shareFriend_btn';
    $.post("/wechat/statistics/log", {name: name},
        function(data){
            $('.share-guid').show();
        }, 'json');
})

$('.share-guid').click(function(){
    $(this).hide();
})

$('.btn-buy').click(function(){
    $.post("/wechat/statistics/log", {name: 'want_buy_btn'},
        function(data){
            $('#pop-call').show();
            showMask($('.mask.op70'));
        }, 'json');
})

var interval ;
$('#speakowner').click(function(){
    var _this = this;
    
    var car_id = $('input[name=car_id]').val();
    var phone = $('input[name=phone]').val();
    if(! phone || ! common.isMobile(phone)){
        $('#pop-call').hide();
        message('<p class="des">请输入正确的电话号码</p>', function(){
            $('#pop-call').show();
        });
        return;
    }
    
    var time = 0;
    var callrepeatcheck = 'enable';
    $.ajax({
        type: "POST",
        url: "/wechat/want/buy",
        data: {car_id:car_id, phone:phone, time: time},
        async: true,
        success: function(res) {
            if(! res.error) {
                $('#pop-call').hide();
                $('#pop-call-success').show();
                time = res.time;
            } else {
                $('#pop-call').hide();
                message('<p class="des">' + res.error + '</p>', function(){
                    $('#pop-call').show();
                });
            }
            callrepeatcheck = 'enable';
            clear();
        },
        error: function(XHR, TS, ET) {
            callrepeatcheck = 'enable';
            clear();
        },
        dataType: "json"
    });

    function clear(){
        clearInterval(interval);
        interval =  null;
        $(_this).html('转接车主')
    }
    
    if( interval ) return ;
    $(_this).addClass('btn-disabled').html('转接中...');
    var now ,end =  new Date().getTime() + 30 * 1000 ;

    interval = setInterval(function(){
        now = new Date().getTime();
        var last =  Math.round( (end - now) /1000) ;
        $(_this).html('转接中('+ last +'s)')
        if(last == 0 ){
            clear();
        }
    },1000);
})

$('[data-close]','.pop_box').click(function(){
    $(this).closest('.pop_box').hide();
    $('.mask').hide();
})