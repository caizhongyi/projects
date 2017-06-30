/**
 * 车源图片轮播
 *
 * @version v4.0
 */
require('/components/jquery/lazyload.js');
var $ = require('jquery');

function Slide(options) {
    // 总页数
    this.page_num = options.page_num;
    this.current_page = 1;
    this.$container = $('.car-photo');
    this.$imageBox = this.$container.find('.b-img').find('ul');
    this.$thumbBox = this.$container.find('.scroll-in');
    this.$prev = this.$container.find('.prev').find('a');
    this.$next = this.$container.find('.next').find('a');
}

var proto = Slide.prototype;

proto.getCurrentPage = function() {
    if (this.current_page > this.page_num) {
        this.current_page = this.page_num;
    } else if (this.current_page < 1) {
        this.current_page = 1;
    }

    return this.current_page;
};

proto.go2Page = function() {
    var page = this.getCurrentPage();
    var self = this;
    var DISABLE_CLASS = 'none';
    this.$thumbBox.animate({marginLeft: -470 * (page - 1)}, 500, 'swing', function() {
        if (page <= 1) {
            self.$prev.addClass(DISABLE_CLASS);
            self.page_num > 1 && self.$next.removeClass(DISABLE_CLASS);
        } else if (page >= self.page_num) {
            self.$prev.removeClass(DISABLE_CLASS);
            self.$next.addClass(DISABLE_CLASS);
        } else {
            self.$prev.removeClass(DISABLE_CLASS);
            self.$next.removeClass(DISABLE_CLASS);
        }
    });
};

proto.setIndex = function(index) {
    var num = index + 1;
    this.$container.find('.amount').find('span').text(num);
};

proto.next = function() {
    this.current_page = this.current_page + 1;
    this.go2Page();
};

proto.prev = function() {
    this.current_page = this.current_page - 1;
    this.go2Page();
};

proto.lazyload = function($img) {
    $img.lazyload({
        event: 'click',
        effect: 'fadeIn',
        data_attribute: 'src',
        skip_invisible: false,
        load: function () {
            $(this).parents('.lazy-load').removeClass('lazy-load');
        }
    }).trigger('click');
};

proto.showImage = function(index) {
    var $image = this.$imageBox.find('[data-index=' + index + ']');
    $image.addClass('active').siblings().removeClass('active');
    this.setIndex(index);
    this.lazyload($image.find('img'));
};

proto.init = function() {
    this.$prev.on('click', $.proxy(this.prev, this));
    this.$next.on('click', $.proxy(this.next, this));
    var $thumb = this.$thumbBox.find('li');
    var $numSpan = this.$container.find('.amount').find('span');
    var self = this;
    $thumb.hover(function () {
        $(this).find('span').attr('class', 'border');
        $(this).siblings().find('span').attr('class', 'bg');
        var index = $(this).data('index');
        self.showImage(index);
    }, function() {
        $(this).find('span').attr('class', 'border');
        $(this).siblings().find('span').attr('class', 'bg');
    });
};

module.exports = Slide;