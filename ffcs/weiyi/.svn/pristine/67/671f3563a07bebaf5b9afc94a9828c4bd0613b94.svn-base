(function (a) {
    a.fn.dialog = function (b) {
        var d = {show: "true", target: "[href]", interval: 4000};
        b = a.extend(true, {}, d, b);
        a(this).appendTo("body");
        var c = this;
        a(this).off("click.dialogclose").on("click.dialogclose", "[data-close]",function (f) {
            f.stopPropagation();
            f.preventDefault();
            a(c).removeClass("shown")
        }).off("click.dialog").on("click.dialog", function (f) {
            f.stopPropagation()
        });
        var e;
        a(document).off("click.dialogclose").on("click.dialogclose",function (f) {
          //  a(".dialog").removeClass("shown");
            e && clearTimeout(e)
        }).off("click.dialog").on("click.dialog", b.target, function (g) {
            g.stopPropagation();
            var f = a(this).attr("href");
            a(f).addClass("shown");
            if (a(f).hasClass("dialog-hint")) {
                e = setTimeout(function () {
                    a(f).removeClass("shown")
                }, b.interval)
            }
        });
        return a(this).each(function () {
            if (b.show) {
                a(this).addClass("shown");
                if (a(this).hasClass("dialog-hint")) {
                    e = setTimeout(function () {
                        a(c).removeClass("shown")
                    }, b.interval)
                }
            } else {
                a(this).removeClass("shown")
            }
        })
    }
})(jQuery);