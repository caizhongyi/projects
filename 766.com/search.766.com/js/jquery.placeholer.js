// 让不支持placeholder的浏览器实现此属性
;
(function ($) {

    $.fn.extend({
        placeholder:function () {
            if ('placeholder' in document.createElement('input')) {
                return this
            } else {
                return this.each(function () {
                    var _this = $(this),
                        this_placeholder = _this.attr('placeholder'),
                        color = _this.css('color');
                    function setcolor(setcolor){
                        if(color == '#000000' || color == "rgb(0, 0, 0)"){
                            _this.css('color',setcolor);
                        }
                    }
                    setcolor('#999');
                    _this.val(this_placeholder).focus(function () {
                        if (_this.val() === this_placeholder) {
                            _this.val('');
                            setcolor(color);
                        }
                    }).blur(function () {
                            if (_this.val().length === 0) {
                                _this.val(this_placeholder).css('color');
                                setcolor('#999');
                            }
                        })
                })
            }
        }
    })


    $.fn.animatePlaceholder = function (options) {
        var opts = $.extend(true, {}, {
            easing:'linear',
            duration:'fast'
        }, options);

        return $(this).each(function () {

            $(this).attr('my-placeholder', $(this).attr('placeholder'));

            if ('placeholder' in this) {
                $(this).removeAttr('placeholder');
            }

            var that = this;
            var blur = "blur.placeholder",
                keyup = 'keyup.placeholder',
                focus = 'focus.placeholder';

            var selector = $(this).val('').selector,
                $placeholderLabel = $('<span></span>')
                    .addClass('placeholder-label')
                    .css({
                        position:'absolute',
                        padding:$(this).padding(),
                        display:'inline-block',
                        width:$(this).width(),
                        height:$(this).height()
                    })
                    .on('click',function () {
                        $(that).focus();
                    }).text($(this).attr('my-placeholder'));

            $placeholderLabel.data('left', $placeholderLabel.css('left') == 'auto' ? 0 : $placeholderLabel.css('left'));

            $(this).wrap(
                $('<span></span>').css({
                    position:'relative',
                    display:'inline-block'
                })
            );
            $placeholderLabel.insertAfter(this);

            $(this).off(keyup).on(keyup,function () {
                $placeholderLabel.stop(true,true).animate({
                    opacity:'hide',
                    left:$(this).width()
                }, opts.duration, opts.easing)
            }).off(blur).on(blur, function () {
                    if ($(this).val() != '') {
                        return;
                    }

                    $placeholderLabel.stop(true,true).animate({
                        opacity:'show',
                        left:$placeholderLabel.data('left')
                    }, opts.duration, opts.easing)
                });
        });
    };

    $(function () {
        $('[placeholder]').placeholder();
    });
})(jQuery);
