var $ = require('zepto');
var IScroll = require('iscroll');
var common = require('common');
            
$(function(){
    var myScroll;

    $('.slide-item').height($(window).height())
    myScroll = new IScroll('.warpper', {
        scrollX: false,
        scrollY: true,
        snap:  true,
        click : true,
        deceleration : 10,
        taps:true
    });

    myScroll.on('scrollEnd' , function(e ,params){
        console.log(this.currentPage.pageY)
    })


    $(window).resize(function(){
        $('.slide-item').height($(window).height())
    })

    common.initSlider();
})