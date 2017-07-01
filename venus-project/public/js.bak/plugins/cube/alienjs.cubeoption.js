!(function ($) {
    $.fn.cubeOption = function (options) {
        options = $.extend(true, {}, {
        }, options);

        return $(this).each(function () {
            var xAngle = 0, yAngle = 0 , self = this;
            $('body').keydown(function (evt) {
                switch (evt.keyCode) {
                    case 37: // left
                        yAngle -= 90;
                        break;

                    case 38: // up
                        xAngle += 90;
                        break;

                    case 39: // right
                        yAngle += 90;
                        break;

                    case 40: // down
                        xAngle -= 90;
                        break;
                }
                ;
                $(self).removeClass('show').css('transform', 'rotateX(' + xAngle + 'deg) rotateY(' + yAngle + 'deg)').css('-webkit-transform', 'rotateX(' + xAngle + 'deg) rotateY(' + yAngle + 'deg)');
            });

        })
    }
})(window.jQuery || Zepto);

