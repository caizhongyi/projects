//overlay
$.overlay =  function(options) {
    var defaults = {
        zIndex: '1005',
        close: false,
        click: false,//点击 overlay 关闭 - 传入匿名函数
        opacity: '0.5',//透明度
        zIndexRecords: false,//记录改变前的zIndex值
        backZIndex: false//设置zIndex为改变前的数值
    };
    var options = $.extend(defaults, options);
    if($('.overlay').length > 0 && options.close) {$('.overlay').hide();return false;}
    //设置zIndex为之前的数值
    if(options.backZIndex) {
        if($('.overlay').data('zIndexRecords') == undefined) {return false;}
        $('.overlay').css('zIndex', $('.overlay').data('zIndexRecords'));
        return false;
    }
    //记录改变前的zIndex值
    if(options.zIndexRecords) {
        $('.overlay').data('zIndexRecords', $('.overlay').css('zIndex'));//记录改变前的zIndex值
    }
    //不存在就添加
    if($('.overlay').length <= 0) {
        $('body').append('<div class="overlay" style="display: none;position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: #000;"></div>');
    }
    //显示overlay
    $('.overlay').css({'display': 'block', 'zIndex': options.zIndex, 'opacity': '0'}).show().animate({opacity: options.opacity}, 500);
    //overlay点击事件 - 同时设置 close 将关闭后执行
    if(options.click) {
        $('.overlay').on('click', options.click());
        if($('.overlay').length > 0 && options.close) {$('.overlay').hide();return false;}
    }
    return false;
}

$.loadingEffect =  function(options) {
    var defaults = {
        zIndex: '3000',
        close: false
    };
    var options = $.extend(defaults, options);
    if (options.close){
        $.overlay({backZIndex: true});
        $.overlay({close: true});
        $('#loading').hide(300).remove();
        return false;
    }else{
        $.overlay({zIndexRecords: true, zIndex: '2000'});
        var s='<div id="loading" class="signal"></div>';
        $('body').append(s);
        return false;
    }
    return false;
}