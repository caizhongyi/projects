/**
 * 列表页更多品牌
 *
 * @version v4.0
 */
var $ = require('jquery');

function MoreBrand(options) {
    this.$container   = $('#js_more_brand');
    this.$fuzzyInput  = this.$container.find('form').find('input');
    this.$fuzzyResult = this.$container.find('.js_fuzzy_box');
    this.$char        = this.$container.find('.js_brand_char').find('li');
    this.$trigger     = this.$container.find('.more');
    // css class
    this.cls = {
        show_container: 'group-select-item-show',
        more_down: 'i-more-down',
        more_up: 'i-more-up'
    };
}

var proto = MoreBrand.prototype;

proto.show = function() {
    if (this.$trigger.find('a').find('i').hasClass('i-more-down')) {
        this.$container.addClass(this.cls.show_container);
        this.$trigger.find('a').html('收起'+'<i class="' + this.cls.more_up + '"></i>');
    } else {
        this.$container.removeClass(this.cls.show_container);
        this.$trigger.find('a').html('更多'+'<i class="' + this.cls.more_down + '"></i>');
    }
};

proto.getResultByChar = function($char) {
    var char = $char.data('key');
    var $charContent = $('[data-char="' + char + '"]');
    $charContent.show().siblings().hide();
    $char.find('a').addClass('current').end()
        .siblings('li').find('a').removeClass('current');
};
var timer ;
proto.fuzzySearch = function() {
    var self = this;
    function done() {
        this.$fuzzyResult.html('');

        // collect unique brand url_path
        var matchKey = [];
        var fuzzyMap = this.$fuzzyInput.data('map');
        var val = this.$fuzzyInput.val();

        for (var kw in fuzzyMap) {
            if (
                fuzzyMap.hasOwnProperty(kw) &&
                kw.indexOf(val) === 0 &&
                $.inArray(fuzzyMap[kw], matchKey) === -1
            ) {
                matchKey.push(fuzzyMap[kw]);
            }
        }

        var $t = this.$container.find('.brand-select');
        var self = this;

        var $collection = $();
        $.each(matchKey, function (k, v) {
            var $li = $t.find('[data-brand="' + v + '"]');
            if ($li.length) {
                var $el = $li.clone();
                $collection = $collection.add($el)
            }
        });
        self.$fuzzyResult.append($collection)
        .show().siblings('ul').hide();
        this.$char.find('a').removeClass('current');
    }

    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        done.call( self );
    }, 100)
};

proto.init = function() {
    var self = this, timer = null ;
   // this.$brands = this.$container.find('.js_fuzzy_box li[data-brand]');
    this.$trigger.on('click', $.proxy(this.show, this));
    this.$char.on('click', function() {
        self.getResultByChar($(this));
    });

    this.$fuzzyInput.on('keyup', $.proxy(this.fuzzySearch, this));
};

module.exports = MoreBrand;
