var $ = require('zepto');
var common = require('common');
var ImageUpload = require('app/wechat/image_upload');
var o = require('app/wechat/index');

function showMessage(msg) {
    common.message('<p class="des">' + msg + '</p>');
}

$(function(){
    $("input[name=phone]").numeral(false);
    $("input[name=kilometre]").numeral(true);
    $("input[name=price]").numeral(true);
    
    $('.piclist_upload_item').each(function(){
        var $this   = $(this);
        var open    = $this.find('.img .i_img');
        var close   = $this.find('.i_close');
        var input   = $this.find('input[type=hidden]');
        var file    = $('#file_' + input.attr('name'));
        var loading = $this.find('.piclist_upload_loading');
        
        new ImageUpload(open, close, input, file, loading);
    });

    $('#recar').on('submit', function() {
    	submitForm();
    	return false;
	});

    o.carType().mobiscroll();
});

function submitForm() {
	var front       = $("input[name=front]").val();
    var side        = $("input[name=side]").val();
    var backside    = $("input[name=backside]").val();
    var frontrow    = $("input[name=frontrow]").val();
    var control     = $("input[name=control]").val();
    var other       = $("input[name=other]").val();

    if(!front && !side && !backside && !frontrow && !control && !other) {
    	showMessage('请上传一张车辆照片');
    	return false;
    }

    var brand       = $("input[name=brand]").val();
    var buy_time    = $("input[name=buy_time]").val();
    var kilometre   = $("input[name=kilometre]").val();
    var price       = $("input[name=price]").val();
    var phone       = $("input[name=phone]").val();
  
    if(! brand){
        showMessage('请选择品牌车系');
    	return false;
    }

    if(! buy_time){
        showMessage('请填写上牌时间');
    	return false;
    }

    if(! kilometre){
        showMessage('请填写公里数');
    	return false;
    }

    if(! price){
        showMessage('请填写价格');
    	return false;
    }

    if(! phone || ! common.isMobile(phone)){
        showMessage('请输入正确的电话号码');
    	return false;
    }

    $.ajax({
        type: "POST",
        url: "/wechat/car/sell",
        dataType: "json",
        data: $('#recar').serialize(),
        success: function(res) {
            if(! res.error && res.id) {
                window.location.href = '/wechat/share/car/id/' + res.id;
            } else {
                showMessage(res.error);
            }
        },
    });
    return false;
}