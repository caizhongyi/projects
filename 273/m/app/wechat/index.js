var $ = require('zepto');
var IScroll = require('iscroll');
var common = require('common');
var carType = require('widget/cartype/js/cartype');
require('mobiscroll');

var exp = {};

exp.mobiscroll =  function(){
    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.default = {
        theme: 'android-ics light',
        display: 'modal',
        mode: 'scroller',
        lang:'zh',
        dateFormat: 'yyyy年mm月',
        startYear:currYear - 15,
        endYear:currYear
    };

    var optDateTime = $.extend(opt['date'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime);

    return this;
}

exp.carType =  function(){

    new carType('#carType');
    return this;
}



exp.fileupload = function(){
    $('.piclist_upload').on('click','.i_close',function(){
        $(this).hide().closest('li').find('.img img').attr('src','image/piclist_upload_bg.gif');
    })
    return this;
}

$('.picshow').on('click','.slide',function(){
    $('.pic_view').show();
    common.showMask();
    common.initPosterView( $(this).closest('.slide').index() );
});

$("input[name=phone]").numeral(false);

module.exports = exp;

