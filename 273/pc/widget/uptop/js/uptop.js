var Class = window.Class ||  require('class'),
    $ = require('jquery');

var UpTop = Class.create({
    initialize: function( selector , options ) {
        var $el = $(selector);
        var $top = $el.find('[data-uptop]');
        var $win = $(window);

        $win.on('scroll', function () {
            if ($win.scrollTop() >= 200) {
                $top.stop(true,true).fadeIn();
            } else {
                $top.stop(true,true).fadeOut();
            }
        });

        $top.click(function () {
            $('html, body').animate({
                scrollTop : '0px'
            }, 'fast');
        });

        $win.scroll();
    }
})

module.exports = UpTop;
