var Class = window.Class || require('class');
var $ = window.jQuery || require('jquery');
/*var Cookie = window.Cookie || require('Cookie');*/

/**
 * 图片轮播组件
 * @param selector {jquery|selector} 选择器
 * @param config.interval {number} 播放间隔
 * @param config.duration {number} 动画间隔
 * */
var Slide = Class.create({
    initialize: function (selector, config) {
        this.config = config = $.extend({
           // images: [],
            interval: 5000,
            duration: 500
        }, config);

        this.$ = $( selector );

        if (this.$.size() === 0) {
            throw new Error('el参数不可以为空');
        }

        // 索引
        this.index = 1;

        this.createDom()
            .bindEvent()
            .setInterval();
    },
    createDom: function () {
        var config = this.config;
        var self = this;
        var $el = this.$;
        this.$picDiv = $el.find('.slider');
        var $numDiv = $('<div>');
        var $pic =  this.$picDiv.find('ul');
        var $num = $('<ol>');

        this.$picDiv.attr('class', 'slider')
            .css({
                width: config.width,
                height: config.height
            });

        $numDiv.attr('class', 'num');

        $pic.css({
            width: config.width * this.$picDiv.length,
            height: config.height
        });

        $.each( this.$.find('ul > li ') , function (index, value) {
            //href为#时，不新页面打开
            if( index == 0 ){
                $num.append("<li class='on'></li>");
            }
            else{
                $num.append("<li></li>");
            }

        });

        this.$numLi = $num.find('li');
        this.$num = $num;
        this.$picLi = $pic.find('li');

        this.$picLi.eq(0).siblings('li').hide();
        $el.append($numDiv.append($num));

        if ( this.$picLi &&  this.$picLi.length > 1) {
            var imagesCount =  this.$picLi.length;
            $el.hover(function () {
                $el.find('.btn').show();
            }, function () {
                $el.find('.btn').hide();
            });
            //当前显示图片的索引值
            var getCurIndex = function () {
                return $el.find('.slider ul li:visible').index();
            };
            //图片左滚动
            $el.find('.btn .btn-left').on('click', function () {
                var curIndex = getCurIndex();
                if (curIndex >= 0) {
                    var nextIndex = ((curIndex - 1) + imagesCount) % imagesCount;
                    self.turnPic(nextIndex);
                }
            });
            //图片右滚动
            $el.find('.btn .btn-right').on('click', function () {
                var curIndex = getCurIndex();
                if (curIndex >= 0) {
                    var nextIndex = ((curIndex + 1) + imagesCount) % imagesCount;
                    self.turnPic(nextIndex);
                }
            });
        }
        return this;
    },
    bindEvent: function () {

        var me = this;
        var $numLi = this.$numLi;
        this.curIndex = 0;

        function clickTurn() {
            var i = $(this).index();
            me.turnPic(i);
        }
        this.$num.on('click.slide', 'li',clickTurn);

       /* //键盘事件
        var left = KeyContorl({
            key: 'left',
            callback: function () {
                left.cancel();
                right.cancel();
                me.curIndex = me.curIndex <= 0 ? length - 1 : --me.curIndex;
                me.turnPic(me.curIndex, function () {
                    left.start();
                    right.start();
                });
            }
        });
        var right = KeyContorl({
            key: 'right',
            callback: function () {
                left.cancel();
                right.cancel();
                me.curIndex = me.curIndex >= length - 1 ? 0 : ++me.curIndex;
                me.turnPic(me.curIndex, function () {
                    left.start();
                    right.start();
                });

            }
        });*/

        return this;
    },
    turnPic: function (i, callback) {
        var me = this;
        if (!callback) {
            callback = $.noop;
        }
        //$.proxy(me.clearInterval, me)();
        me.curIndex = i;
        var $this = me.$numLi.eq(i);
       /* $picLi = me.$picLi.eq(i);
        $oPicLi = $picLi.prevAll('li');*/
        $this.addClass('on').siblings().removeClass('on');

        var $nowPic = $();
        me.$picLi.each(function () {
            if ($(this).is(':visible')) {
                $nowPic = $(this);
                return false;
            }
        });

        $nowPic.fadeOut('normal', $.proxy(function () {
            me.$picLi.eq(i).fadeIn('normal', callback);
        }, this));
        //   $.proxy(me.setInterval, me)();
    },
    setInterval: function () {

        var me = this;
        var length = this.$picDiv.find('ul > li').length;
        if (this.config.interval) {
            this.interval = window.setInterval(function () {
                me.curIndex++;
                me.turnPic(me.curIndex % length);
//            $(me.$numLi[me.curIndex%length]).trigger('click');
            }, this.config.interval);
        }
    },
    clearInterval: function () {
        if (this.interval) {
            window.clearInterval(this.interval);
        }
    }
});

if (typeof module != 'undefined') module.exports = Slide;


