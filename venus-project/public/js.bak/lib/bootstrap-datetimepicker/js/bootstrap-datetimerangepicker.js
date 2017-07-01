!(function ($) {
    /**
     * depends datetimepicker.js
     * */
    $.fn.datetimerangepicker = function (options) {
        var start = $(this).eq(0), end = $(this).eq(1);
        options.endDate = end.val();
        start.datetimepicker(options).on('changeDate', function (ev) {
            options.startDate = start.val();
            options.endDate = '';
            end.datetimepicker('remove').datetimepicker(options);
        })
        options.startDate = start.val();
        options.endDate = '';
        end.datetimepicker(options).on('changeDate', function (ev) {
            options.startDate = '';
            options.endDate = end.val();
            console.log(options);
            start.datetimepicker('remove').datetimepicker(options);
        })
        return this;
    }
})(jQuery);