!(function ($) {

    $.fn.checkall = function (options) {
        options = $.extend({}, {
            bind : '',
            delegateTarget: ''
        }, options);

        return $(this).each(function () {
            $(this).off('click.checkall').on('click.checkall', options.delegateTarget, function (e) {
                var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self);
                var $target = $( $(this).data('bind') || options.bind );

                $target.prop('checked' , $( this).prop('checked'));
            })
        })

    }

})(window.jQuery || Zepto);

