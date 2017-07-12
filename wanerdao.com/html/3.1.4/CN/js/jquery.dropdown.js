!(function ($) {

    $.fn.dropdown = function (options) {
        options = $.extend({}, {
            pane: '.dropdown-pane',
            event: 'click',
            delegateTarget: ''
        }, options);

        return $(this).each(function () {
            var event = ($(this).data('event') || options.event) + '.dropdown' , self = this;
            if (event == 'click.dropdown') {
                $(this).off(event).on(event, options.delegateTarget, function (e) {
                    var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);
                    e.stopPropagation();
                    me.find(options.pane).eq(0).toggleClass('in');
                    $('.dropdown').not(this).find(options.pane).removeClass('in');
                    $(document).off(event + '_doc').on(event + '_doc', function () {
                        $('.dropdown').find(options.pane).removeClass('in');
                    })
                })

                $(options.pane).off('click.dropdown').on('click.dropdown', function (e) {
                    e.stopPropagation();
                })
            }
            else {
                $(this).off('mouseenter.dropdown').on('mouseenter.dropdown', options.delegateTarget,function (e) {
                    var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);
                    me.find(options.pane).eq(0).toggleClass('in');
                }).off('mouseleave.dropdown').on('mouseleave.dropdown', options.delegateTarget, function () {
                        var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);
                        me.find(options.pane).eq(0).removeClass('in');
                    })
            }
        })

    }

})(window.jQuery || Zepto);

