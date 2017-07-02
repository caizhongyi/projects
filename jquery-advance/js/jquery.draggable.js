;
(function ($) {
    $.fn.undraggable = function (setting) {
        $(document).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag');
        return $(this).off('mousedown.jdrag mousemove.jdrag mouseup.jdrag');
    }

    $.fn.draggable = function (opts) {
        var that = this;
        opts = $.extend(true, {}, {
            handler: undefined,
            opacity: 0.5,
            axis: '',
            containment: window, //'parent',
            delegateTarget: '',
            start: function (e) {
            },
            drag: function (e) {
            },
            stop: function (e) {
            }
        }, opts)

        return $(this).each(function () {
            var mousedown = false , pos , self = this;

            opts.axis = $(this).data('axis') || opts.axis ,
                opts.start = window[$(this).data('start')] || opts.start ,
                opts.drag = window[$(this).data('drag')] || opts.drag ,
                opts.stop = window[$(this).data('stop')] || opts.stop ,

                $(this).off('mousedown.jdrag')
                    .on('mousedown.jdrag', opts.handler || opts.delegateTarget, function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var me = opts.delegateTarget ? $(this).closest(opts.delegateTarget) : $(self);
                        $context = ( me.data('containment') || opts.containment ) == 'parent' ? me.parent() : $(me.data('containment') || opts.containment).css('position', 'relative'),
                            contextOffset = $context.offset() || { left: 0, top: 0 };
                        mousedown = true;
                        me.css({
                            'transition': 'none',
                            'animation': 'none',
                            opacity: opts.opacity
                        }).addClass('ondrag');

                        if (me.css('position') == 'static' || me.css('position') == 'relative') {
                            me.css({
                                position: 'absolute',
                                left: me.offset().left - contextOffset.left,
                                top: me.offset().top - contextOffset.top
                            })
                        }
                        opts.start && opts.start.call(that, e);
                        pos = { x: e.pageX, y: e.pageY};

                        $(document).off('mousemove.jdrag mouseup.jdrag').on('mousemove.jdrag',function (e) {
                            e.preventDefault();
                            if (mousedown) {
                                var diffX = e.pageX - pos.x ,
                                    diffY = e.pageY - pos.y;

                                function getLeft() {
                                    var left = $(this).position().left + diffX ,
                                        width = $(this).outerWidth() //+ parseFloat($(this).css('padding-left')) + parseFloat($(this).css('padding-right'));
                                    var fixeScrollLeft = 0;
                                    if (me.css('position') == 'fixed') {
                                        fixeScrollLeft = $context.scrollLeft();
                                    }
                                    ;
                                    if (width + left > $context.width() + $context.scrollLeft() - fixeScrollLeft) {
                                        left = $context.width() + $context.scrollLeft() - width - fixeScrollLeft;
                                    }
                                    else if (left < $context.scrollLeft() - fixeScrollLeft) {
                                        left = $context.scrollLeft() - fixeScrollLeft;
                                    }
                                    return left;
                                }

                                function getTop() {
                                    var top = $(this).position().top + diffY,
                                        height = $(this).outerHeight()// + parseFloat($(this).css('padding-top')) + parseFloat($(this).css('padding-bottom'));
                                    var fixeScrollTop = 0;
                                    if (me.css('position') == 'fixed') {
                                        fixeScrollTop = $context.scrollTop();
                                    }

                                    if (height + top > $context.height() + $context.scrollTop() - fixeScrollTop) {
                                        top = $context.height() + $context.scrollTop() - height - fixeScrollTop;
                                    }
                                    else if (top < $context.scrollTop() - fixeScrollTop) {
                                        top = $context.scrollTop() - fixeScrollTop;
                                    }
                                    return top;
                                }

                                if (opts.axis == 'x' || opts.axis == 'X') {
                                    me.css('left', getLeft);
                                }
                                else if (opts.axis == 'y' || opts.axis == 'Y') {
                                    me.css('top', getTop);
                                }
                                else {
                                    me.css({ left: getLeft, top: getTop });
                                }
                                pos = { x: e.pageX, y: e.pageY };
                                opts.drag && opts.drag.call(that, e);
                            }
                        }).on('mouseup.jdrag', function () {
                                if (mousedown) {
                                    me.removeClass('ondrag');
                                    opts.stop && opts.stop.call(that, e);
                                    mousedown = false;
                                    me.css({'transition': '', 'animation': ''});
                                    (opts.opacity != 1 || opts.opacity != "") && me.css({'opacity': ''});
                                }
                            })
                    });
        })

    };
})(jQuery);