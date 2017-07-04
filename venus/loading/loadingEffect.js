//overlay
$.overlay =  function(options) {
    var defaults = {
        zIndex: '1005',
        close: false,
        click: false,//��� overlay �ر� - ������������
        opacity: '0.5',//͸����
        zIndexRecords: false,//��¼�ı�ǰ��zIndexֵ
        backZIndex: false//����zIndexΪ�ı�ǰ����ֵ
    };
    var options = $.extend(defaults, options);
    if($('.overlay').length > 0 && options.close) {$('.overlay').hide();return false;}
    //����zIndexΪ֮ǰ����ֵ
    if(options.backZIndex) {
        if($('.overlay').data('zIndexRecords') == undefined) {return false;}
        $('.overlay').css('zIndex', $('.overlay').data('zIndexRecords'));
        return false;
    }
    //��¼�ı�ǰ��zIndexֵ
    if(options.zIndexRecords) {
        $('.overlay').data('zIndexRecords', $('.overlay').css('zIndex'));//��¼�ı�ǰ��zIndexֵ
    }
    //�����ھ����
    if($('.overlay').length <= 0) {
        $('body').append('<div class="overlay" style="display: none;position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: #000;"></div>');
    }
    //��ʾoverlay
    $('.overlay').css({'display': 'block', 'zIndex': options.zIndex, 'opacity': '0'}).show().animate({opacity: options.opacity}, 500);
    //overlay����¼� - ͬʱ���� close ���رպ�ִ��
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