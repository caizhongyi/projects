(function ($) {
    var _defaultOptions = {
        positive: {
            text: "", callback: function () {
            }
        },
        negative: {
            text: "", callback: function () {
            }
        },
        title: "",
        content: ""
    };

    var _dialog;

    function _commonHtml(options) {
        var html = '<div class="dialog ui-dialog alert" data-options="handler:\'header\'">\
            <div class="bg"></div><div class="inner">\
                    <div class="hd" data-options="region:\'header\',handle:true">\
                        <h3 class="title"></h3>\
                        <a href="javascript:;" class="close" data-options="region:\'hide\'"></a>\
                    </div><div class="bd">\
                        <p><span class="custom-tip"><span class="content"></span></span></p>\
                        <input type="button" value="" class="btn btn-primary btn-mini positive">&nbsp;\
                        <input type="button" value="" class="btn btn-primary btn-mini negative">\
                        </div></div></div>';
        var $html = $(html);
        var o = $.extend({}, _defaultOptions, options);

        $html.find(".positive").val(o.positive.text).click(function () {
            _dialog.hide();

            if (typeof(o.positive.callback) === "function")
                o.positive.callback();
        });
        $html.find(".negative").val(o.negative.text).click(function () {
            _dialog.hide();

            if (typeof(o.negative.callback) === "function")
                o.negative.callback();
        });
        $html.find(".title").text(o.title);
        $html.find(".content").text(o.content);

        return $html;
    }

    var methods = {
        init: function () {

        },
        alert: function (options) {

            $(this).html(_commonHtml(options)).find(".custom-tip").prepend('<i class="icon icon-tip-info"></i>');

            new Class.dialog(".alert").show();
        },
        warn: function (options) {

            $(this).html(_commonHtml(options)).find(".custom-tip").prepend('<i class="icon icon-tip-warnning"></i>');

            _dialog = new Class.dialog(".alert").show();
        },
        error: function (options) {

            $(this).html(_commonHtml(options)).find(".custom-tip").prepend('<i class="icon icon-tip-error"></i>');

            new Class.dialog(".alert").show();
        }
    };

    $.fn.notification = function () {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pluginName');
            return this;
        }

        return method.apply(this, arguments);
    }

})(jQuery);