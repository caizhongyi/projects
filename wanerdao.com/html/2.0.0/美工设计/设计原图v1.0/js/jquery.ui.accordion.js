/*
 depends :
 jquery.core.js
 */
;
(function ($) {
    $.lib.ui.accordion = $.lib.createClass({
        target:{
            header:'h3',
            content:'div'
        },
        options:{
            index:{ cur:0, temp:0},
            hide:{ attr:{ opacity:'hide' }, duration:'slow', easing:'easeOutExpo'  },
            show:{ attr:{ opacity:'show' }, duration:'slow', easing:'easeOutExpo'  },
            trunround:true, //鼠标移开对像后自动回缩
            event:"click",
            selected:{ header:'selected', panel:'selected' },
            height:{ min:'auto', max:'auto'}
        }
    }, {
        init:function (selector, options) {
            var _this = this;

            this.$.attr({ 'data-control': 'accordion' });

            this.target.content.css(this.initAttr());
            this.options.index.temp = this.options.index.cur;
            // 事件绑定
            var event = this.options.event + '.accordion';

            this.target.header.unbind(event).bind(event, function () {
                _this.to(_this.target.header.index(this));
            })

            //默认值

            this.show(this.index());

            return this;
        },
        length:function () {
            return this.target.content.length;
        },
        minheight:function (index) {
            return this.options.height.min == 'auto' || this.options.height.min ? 'hide' : this.options.height.min;
        },
        maxheight:function (index) {
            return this.options.height.max == 'auto' || this.options.height.max ? 'show' : this.options.height.max;
        },
        initAttr:function () {
            var attr = {};
            if ($.type(this.options.height.min) == 'number') {
                attr.height = this.options.height.min;
            }
            else {
                attr.display = 'none';
            }
            return  attr;
        },
        showAttr:function () {
            var maxheight = $.type(this.options.height.max) == 'number' ? this.options.height.max : 'show';
            return  { height:maxheight, opacity:'show' }
        },
        hideAttr:function () {
            var minheight = $.type(this.options.height.min) == 'number' ? this.options.height.min : 'hide';
            return  { height:minheight, opacity:($.type(this.options.height.min) == 'number' ? 1 : 'hide') }
        },
        show:function (index, callback) {
            var _this = this;
            this.index(index);
            var $obj = this.target.content.eq(this.index());
            this.target.header.eq(this.index()).addClass(this.options.selected.header);

            if (this.options.show) {
                this.options.show.attr = this.showAttr();
                this.animate($obj.show(), this.options.show, function () {
                })
            }
            else
                $obj.show();

            return this;
        },
        hide:function (index, callback) {
            var _this = this;
            var $obj = this.target.content.eq(index);
            this.target.header.eq(index).removeClass(this.options.selected.header);


            if (this.options.hide) {
                this.options.hide.attr = this.hideAttr();
                this.animate($obj, this.options.hide, function () {
                })
            }
            else
                $obj.hide();


            return this;
        },
        toggle:function (index) {
            if (this.target.header.eq(index).hasClass(this.options.selected.header))
                this.hide(index);
            else
                this.show(index);
        },
        to:function (index) {
            index = this.options.offset == null ? index : this.options.offset * index;
            if (index != this.tempIndex()) {
                this.show(index).hide(this.tempIndex());
            }
            else {
                this.toggle(index);
            }
            this.tempIndex(this.index());
            return this;
        }
    }).extend($.lib.ui.swobject);

    $.lib.ui.accordions = function (selector, options) {
        var arr = [];
        $(selector).each(function (i, n) {
            arr.push(new $.lib.ui.accordion(n, options));
        })
        return arr;
    }
})(jQuery);