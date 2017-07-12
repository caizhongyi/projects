jQuery.fn.extend({
    //得到 提示框距上方的高度
    marginTop: function () {
        var position = $(this).position();
        return parseInt(position.top);
    },
   
    //提示信息展示1 warn msg  position:prev,2 alert msg position:next
    notice: function (txt, type) {
        if (type == 1) {
            if ($(this).prev('.notice').length == 0) {
                $(this).before('<span class="notice"></span>');
            }
            $(this).prev('.notice').css({ 'display': 'block', 'color': '#f00' }).html(txt);
        } else if (type == 2) {
            if ($(this).next('.notice').length == 0) {
                $(this).after('<span class="notice"></span>');
            }
            $(this).next('.notice').css({ 'display': 'inline-block', 'color': '#8e8e8e' }).html(txt);
        }
    },
    unnotice: function (type) {
        if (type == 1) {
            $(this).prev('.notice').css('display', 'none');
        } else {
            $(this).next('.notice').css('display', 'none');
        }
    },
    error: function (txt) {
        if ($(this).next('.wrong').length == 0) {
            $(this).after('<span class="wrong"></span>');
        }
        $(this).next('.wrong').css({ 'display': 'inline-block', 'color': '#f00' }).html(txt);
    },
    unerror: function () {
        $(this).next('.wrong').css('display', 'none');
    },
    wait: function (txt) {
        if ($(this).next('.wait').length == 0) {
            $(this).after('<span class="wait"></span>');
        }
        $(this).next('.wait').css({ 'display': 'inline-block' }).html('<img src="/images/write.gif"/>' + txt);
    },
    unwait: function () {
        $(this).next('.wait').css('display', 'none');
    },
    // 正侧判断是否为邮箱
    exist_mail: function () {
        var patrn = /^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)$/;
        if (!patrn.exec($(this).val())) {
            return false;
        } else {
            return true;
        }
    }
});
