!(function ($) {
    $.fn.html5draggable = function (options) {
        options = $.extend(true, {}, {
            target: ''
        }, options);

        $(options.target).on('drop',function (e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("Text");
            e.target.appendChild(data);
        }).on('dragover', function (e) {
                e.preventDefault();
            })

        return $(this).each(function () {
            $(this).attr('draggable', true).on('drag', function (e) {
                e.dataTransfer.setData("Text", this);
            })
        })
    }
})(window.jQuery || Zepto);

