var Class = window.Class ||  require('class'),
    $ = require('zepto');

var UpTop = Class.create({
    initialize: function( selector , options ) {
        var $el = $(selector);
        var $top = $el.find('[data-uptop]');
        var $win = $(window);

        $win.on('scroll', function () {
            if ($win.scrollTop() >= 200) {
                $top.show();
            } else {
                $top.hide();
            }
        });

        $top.click(function () {
            $('html, body').scrollTop(0);
        });

        $win.scroll();
    }
})

module.exports = UpTop;
