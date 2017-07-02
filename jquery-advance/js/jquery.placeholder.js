/**
 * 让不支持placeholder的浏览器实现此属性
 * 支持 input[type=password]
 * 需 jquery .1.7.2 版本以上
 * */
;
(function ($) {

    $.fn.placeholder = function () {
        if ('placeholder' in document.createElement('input')) {
            return this
        }

        var that = this;

        function reset() {
            $(that).each(function () {
                if ($(this).data('placeholder'))
                    $(this).data('placeholder').css({ left: $(this).offset().left, top: $(this).offset().top });
            })
        }

        $(window).off('resize.placeholder').on('resize.placeholder',function () {
            reset();
        }).off('scroll.placeholder').on('scroll.placeholder', function () {
                reset();
            })

        $(this).each(function () {
            var placeholderColor = $(this).attr('data-placeholder-color') || '#999';
            var $that = $(this).data('placeholderColor', placeholderColor);
            if ($(this).attr('type') == 'password') {
                var $passwordPlaceholder = $('<div style="position:absolute;"></div>')
                    //.css($(this).css(['width','height','line-height','padding-left','padding-right','padding-top','padding-bottom','color']))
                    .css({
                        width: $(this).width(),
                        height: $(this).height(),
                        color: $(this).css('padding-color'),
                        'line-height': $(this).css('line-height'),
                        'padding-left': $(this).css('padding-left'),
                        'padding-right': $(this).css('padding-right'),
                        'padding-top': $(this).css('padding-top'),
                        'padding-bottom': $(this).css('padding-bottom'),
                        'z-index': $(this).attr('data-z-index') || 50
                    })
                    .css({ left: $(this).offset().left, top: $(this).offset().top, color: placeholderColor})
                    .appendTo('body').html($(this).attr('placeholder')).click(function () {
                        $that.focus();
                    });
                $(this).data('placeholder', $passwordPlaceholder);
                return this;
            }
            if ($(this).val() == '') {
                $(this).css('color', placeholderColor).val($(this).attr('placeholder'))
            }
            ;
        })

        $(document).off('focus.placeholder').on('focus.placeholder', '[placeholder]', function () {
            if ($(this).attr('type') == 'password') {
                $(this).data('placeholder').hide();
                return this;
            }
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('').css('color', '');
            }
        })
            .off('blur.placeholder').on('blur.placeholder', '[placeholder]', function () {
                if ($(this).attr('type') == 'password' && $(this).val() == '') {
                    $(this).data('placeholder').show();
                    return this;
                }
                if ($(this).val() == '') {
                    $(this).val($(this).attr('placeholder')).css('color', $(this).data('placeholderColor'));
                }
            });

        return this;
    }

    $(function () {
        $('[placeholder]').placeholder();
    });
})(jQuery);
