(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {exports: {}};
        factory(mod.exports, mod);
        global.index = mod.exports;
    }
})(this, function (exports, module) {
    'use strict';
    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps)defineProperties(Constructor.prototype, protoProps);
            if (staticProps)defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }

    var Dialog = (function () {
        function Dialog(elem, options) {
            _classCallCheck(this, Dialog);
            this.$elem = $(elem);
            this.options = $.extend({}, Dialog.DEFAULTS, options);
            for (var i in this.options) {
                var p = this.$elem.data(i.replace(/[A-Z]+/g, '-$&').toLowerCase());
                this.options[i] = p == null ? this.options[i] : eval(p);
            }
            if (typeof this.options.animate == 'string') {
                this.options.animate = new Function(' return  ' + this.options.animate)();
                if (typeof this.options.animate != 'object')this.options.animate = {
                    show: this.options.animate,
                    hide: ''
                };
            }
            this.islockvisible = false;
            $(document).off('click.dialog').on('click.dialog', this.options.popup, function (e) {
                e.preventDefault();
                e.stopPropagation();
                $($(this).attr('href')).dialog('show');
            });
            var self = this;
            $(window).off('resize.dialog').on('resize.dialog', function (e) {
                self.center();
            });
            this.registerEvent();
        }

        _createClass(Dialog, [{
            key: 'registerEvent', value: function registerEvent() {
                var self = this;
                var events = ['on', 'off', 'trigger'];
                for (var i = 0; i < events.length; i++) {
                    var e = events[i];
                    this[e] = (function (e) {
                        return function () {
                            self.$elem[e].apply(self.$elem, arguments);
                            return self;
                        };
                    })(e);
                }
            }
        }, {
            key: 'getMask', value: function getMask() {
                var $mask = $('.dialog-mask').length == 0 ? $('<div class="dialog-mask"></div>').appendTo('body') : $('.dialog-mask');
                return $mask;
            }
        }, {
            key: 'getModule', value: function getModule(title, content) {
                var hasfoot = arguments[2] === undefined ? true : arguments[2];
                var $footer = $('<div>', {'class': 'dialog-footer clearfix'}), $btnOK = $('<a>', {
                    'class': 'btn btn-primary btn-ok',
                    'data-hide': 'true',
                    href: 'javascript:;'
                }).html('确定'), $btnCancel = $('<a>', {
                    'class': 'btn btn-default btn-cancel',
                    'data-hide': 'true',
                    href: 'javascript:;'
                }).html('取消');
                var $dialog = $('<div>', {'class': 'dialog'}), $container = $('<div>', {'class': 'dialog-container'}), $header = $('<div>', {'class': 'dialog-header clearfix'}).append('<h3 class="dialog-title"> ' + title + '</h3><div class="operate"><a href="javascript:;" class="dialog-hide" data-hide >×</a></div>'), $body = $('<div>', {'class': 'dialog-body dialog-message clearfix'}).html(content);
                $footer.append($btnOK).append($btnCancel);
                if (title != null) {
                    $container.append($header);
                }
                $container.append($body);
                hasfoot && $container.append($footer);
                $dialog.append($container);
                return $dialog;
            }
        }, {
            key: 'center', value: function center() {
                var $context = $(this.$elem.data('context') || this.options.context);
                var offset = $context.length ? $context.offset() : {left: 0, top: 0};
                var $container = $context.find('.dialog-container');
                var size = {width: $container.width(), height: $container.height()};
                var left = ($context.width() - size.width) / 2;
                var top = ($context.height() - size.height) / 2;
                var params = {};
                params['top'] = top + (offset && offset.top || 0) - $context.scrollTop();
                $context.find('.dialog-container').css(params);
                return this;
            }
        }, {
            key: 'show', value: function show() {
                var self = this;
                this.$container = this.$elem.find('.dialog-container').off('click.dialog').on('click.dialog', this.options.hide, function (e) {
                    self.relatedTarget = this;
                    self.hide();
                }).on('click.dialog', function (e) {
                    e.stopPropagation();
                });
                this.$elem.off('click.dialog').on('click.dialog', function () {
                    self.relatedTarget = this;
                    var backdrop = self.options.backdrop;
                    if (!backdrop) {
                        return;
                    }
                    self.hide();
                }).addClass('in');
                this.$container.removeClass(this.options.animate.hide).addClass(this.options.animate.show + ' animated');
                this.$elem.trigger($.Event('shown', {relatedTarget: this.relatedTarget}));
                if ($(document).height() > this.$container.height())this.$container.css('top', $(document).height() / 2 - this.$container.height() / 2);
                return this;
            }
        }, {
            key: 'lock', value: function lock() {
                this.islockvisible = true;
                return this;
            }
        }, {
            key: 'unlock', value: function unlock() {
                this.islockvisible = false;
                return this;
            }
        }, {
            key: 'hide', value: function hide() {
                var self = this;
                if (this.islockvisible)return this;
                this.$container.removeClass(this.options.animate.show).addClass(this.options.animate.hide);
                if (this.$container.animationEnd && this.options.animate.hide)this.$container.animationEnd(function (x) {
                    return self.$elem.removeClass('in');
                }); else self.$elem.removeClass('in');
                this.$elem.trigger($.Event('hidden', {relatedTarget: this.relatedTarget}));
                return this;
            }
        }, {
            key: 'toggle', value: function toggle() {
                return this.$elem.hasClass('in') ? this.hide() : this.show();
            }
        }, {
            key: 'alert', value: function alert(title, content, callback) {
                var self = this;
                this.remove();
                callback.bind(self.$elem);
                this.$elem = this.getModule(title, content).addClass('dialog-alert').appendTo('body');
                this.$elem.find('.btn-ok').click(function () {
                    callback && callback.call(self.$elem, {relatedTarget: this});
                });
                self.show();
                return this;
            }
        }, {
            key: 'load', value: function load() {
            }
        }, {
            key: 'confirm', value: function confirm(title, content, callback) {
                var self = this;
                this.remove();
                this.$elem = this.getModule(title, content).addClass('dialog-confirm').appendTo('body');
                var event = {};
                if (typeof callback == 'object') {
                    event = callback;
                } else {
                    event.ok = callback;
                }
                this.$elem.find('.btn-ok').removeAttr(this.options.hide.replace('[', '').replace(']', '')).click(function () {
                    event.ok && event.ok.call(self.$elem, {relatedTarget: this});
                }).end().find('.btn-cancel').click(function () {
                    event.cancel && event.cancel.call(self.$elem, {relatedTarget: this});
                });
                self.show();
                return this;
            }
        }, {
            key: 'blank', value: function blank(title, content) {
                var self = this;
                this.remove();
                this.$elem = this.getModule(title, content, false).appendTo('body');
                self.show();
                return this;
            }
        }, {
            key: 'remove', value: function remove() {
                this.$elem && this.$elem.remove();
            }
        }]);
        return Dialog;
    })();
    module.exports = Dialog;
    Dialog.DEFAULTS = {
        popup: '[data-popup]',
        hide: '[data-hide]',
        backdrop: true,
        animate: {show: 'bounceInDown', hide: 'bounceOutUp'},
        context: window
    };
    !(function ($) {
        $.fn.dialog = function (options) {
            var args = arguments;
            return $(this).each(function () {
                var data = $(this).data('dialog');
                if (!data) {
                    data = new Dialog(this, options);
                    $(this).data('dialog', data);
                }
                var g = [];
                for (var i = 1; i < args.length; i++) {
                    g.push(args[i]);
                }
                var fn = new Function('data', 'options', 'args', 'return data[ options ](args)');
                options && data[options] && fn(data, options, g.join(','));
            });
        };
        $.dialog = {};
        $.dialog.active = null;
        function createDialog(options) {
            $.dialog.active && $.dialog.active.remove();
            return new Dialog(null, options);
        }

        $.dialog.alert = function (title, content, callback, options) {
            return $.dialog.active = createDialog(options).alert(title, content, callback).$elem;
        };
        $.dialog.confirm = function (title, content, callback, options) {
            return $.dialog.active = createDialog(options).confirm(title, content, callback).$elem;
        };
        $.dialog.blank = function (title, content, options) {
            return $.dialog.active = createDialog(options).confirm(title, content).$elem;
        };
        $.dialog.mobileIsOri = function (message, callback, options) {
            $(window).on('orientationchange', function () {
                if (window.orientation == 90 || window.orientation == -90)$.dialog.alert('提示', message || '请坚屏浏览网页!', callback, options);
            });
            return this;
        };
        $.dialog.browserLowVersion = function (message, callback, options) {
            var browser = navigator.appName;
            if (browser == 'Microsoft Internet Explorer') {
                var b_version = navigator.appVersion;
                var version = b_version.split(';');
                var trim_Version = version[1].replace(/[ ]/g, '');
                if (trim_Version == 'MSIE7.0') {
                    $.dialog.alert(null, message || '您当前浏览器版本较低，为了更好的浏效果请更新至最新版本!', callback, options);
                } else if (trim_Version == 'MSIE6.0') {
                    $.dialog.alert(null, message || '您当前浏览器版本较低，为了更好的浏效果请更新至最新版本!', callback, options);
                }
            }
            return this;
        };
        $.fn.dialog.Constructor = Dialog;
        $.fn.confirm = function (title, content, callback, options) {
            return $(this).off('click.confirm').on('click.confirm', function () {
                $.dialog.confirm(title, content, callback, options);
            });
        };
        $.fn.alert = function (title, content, callback, options) {
            return $(this).off('click.confirm').on('click.confirm', function () {
                $.dialog.alert(title, content, callback, options);
            });
        };
    })(window.jQuery);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFxzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJpZ0NBd0JxQixNQUFNLGFBQ1osU0FETSxNQUFNLENBQ1YsSUFBSSxFQUFHLE9BQU8sQ0FBRyx1QkFEYixNQUFNLEVBRW5CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLElBQUksQ0FBRSxDQUFFLEFBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRyxPQUFPLENBQUUsQ0FBQyxBQUV6RCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FDdEIsSUFBSSxDQUFDLENBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxBQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FDNUQsQUFFRCxHQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFFLENBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksUUFBUSxDQUFDLFdBQVcsR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxFQUFFLENBQUMsQUFDMUUsR0FBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBRSxJQUFJLENBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFBLENBQ3pFLEFBRUQsSUFBSSxDQUFDLGFB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LEVBQUcsUUFBUSxFQUFHLE9BQU8sQ0FBRSxDQUM3RCxPQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBRSxPQUFPLENBQUUsQ0FBQyxLQUFLLENBQUUsS0FBSyxFQUFHLE9BQU8sRUFBRyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FDL0YsQ0FBQSxBQVVELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVUsS0FBSyxFQUFHLE9BQU8sRUFBRyxRQUFRLEVBQUcsT0FBTyxDQUFFLENBQy9ELE9BQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFFLE9BQU8sQ0FBRSxDQUFDLE9BQU8sQ0FBRSxLQUFLLEVBQUcsT0FBTyxFQUFFLFFBQVEsQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUNoRyxDQUFBLEFBU0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBVSxLQUFLLEVBQUcsT0FBTyxFQUFHLE9BQU8sQ0FBRSxDQUNsRCxPQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBRSxPQUFPLENBQUUsQ0FBQyxPQUFPLENBQUUsS0FBSyxFQUFHLE9BQU8sQ0FBRSxDQUFDLEtBQUssQ0FBQyxDQUN0RixDQUFBLEFBYUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsU0FBVSxPQUFPLEVBQUksUUFBUSxFQUFHLE9BQU8sQ0FBQyxDQUUzRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFDLFVBQVUsQ0FDdkMsR0FBSSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxDQUNyRCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUcsT0FBTyxJQUFJLFVBQVUsRUFBRyxRQUFRLEVBQUcsT0FBTyxDQUFDLENBQUMsQ0FDekUsQ0FBQyxDQUFBLEFBQ0YsT0FBTyxJQUFJLENBQUMsQ0FDZixDQUFBLEFBWUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxTQUFVLE9BQU8sRUFBSSxRQUFRLEVBQUcsT0FBTyxDQUFDLENBQ2pFLElBQUksT0FBTyxDQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQUFDaEMsR0FBSSxPQUFPLElBQUksNkJBQTZCLENBQUUsQ0FDMUMsSUFBSSxTQUFTLENBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxBQUNyQyxJQUFJLE9BQU8sQ0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEFBQ25DLElBQUksWUFBWSxDQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEFBQ2pELEdBQUksWUFBWSxJQUFFLFNBQVMsQ0FBQyxDQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUcsT0FBTyxJQUFJLDhCQUE4QixFQUFHLFFBQVEsRUFBRyxPQUFPLENBQUMsQ0FBQyxDQUMxRixLQUNJLEdBQUksWUFBWSxJQUFFLFNBQVMsQ0FBQyxDQUM3QixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxJQUFJLEVBQUcsT0FBTyxJQUFJLDhCQUE4QixFQUFHLFFBQVEsRUFBRyxPQUFPLENBQUMsQ0FBQyxDQUMxRixDQUNKLEFBRUQsT0FBTyxJQUFJLENBQUMsQ0FDZixDQUFBLEFBRUQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFJLE1BQU0sQ0FBQyxBQWFsQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBSSxTQUFVLEtBQUssRUFBRyxPQUFPLEVBQUcsUUFBUSxFQUFHLE9BQU8sQ0FBRyxDQUM3RCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQzdELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsUUFBUSxFQUFHLE9BQU8sQ0FBRSxDQUFDLENBQzVELENBQUMsQ0FBQSxDQUNMLENBQUEsQUFhRCxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBSSxTQUFVLEtBQUssRUFBRyxPQUFPLEVBQUcsUUFBUSxFQUFHLE9BQU8sQ0FBRyxDQUMzRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQzdELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLEtBQUssRUFBRyxPQUFPLEVBQUcsUUFBUSxFQUFHLE9BQU8sQ0FBRSxDQUFDLENBQzFELENBQUMsQ0FBQSxDQUNMLENBQUEsQ0FTSixDQUFBLENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImRpc3QvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB7YX0gZnJvbSBcInRlc3RcIjtcclxuLy9pbXBvcnQgYiBmcm9tIFwidGVzdDFcIjtcclxuLy9pbXBvcnQge2RlZmF1bHQgYXMgYn0gZnJvbSBcInRlc3QxXCI7XHJcbiAgICAvKipcclxuICAgICAqIOW8ueWHuueql+WPo1xyXG4gICAgICogQGNsYXNzIERpYWxvZ1xyXG4gICAgICogQG1haW4gRGlhbG9nXHJcbiAgICAgKiBAbW9kdWxlIHVpXHJcbiAgICAgKiBAZGVtbyBub2RlX21vZHVsZXMvYWxpZW5qcy1kaWFsb2cvZXhhbXBsZXMvaW5kZXguaHRtbFxyXG4gICAgICogQHVzZXMganF1ZXJ5XHJcbiAgICAgKiBAdXNlcyBqcXVlcnkuYW5pbWF0aW9uRW5kXHJcbiAgICAgKiBAcGFyYW0gZWxlbSB7c3RyaW5nfG9iamVjdH0g6YCJ5oup5ZmoXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMucG9wdXAge29iamVjdH0g6K6+572u6Kem5Y+R5qCH562+IEBkZWZhdWx0IFtkYXRhLXBvcHVwXVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGlkZSB7b2JqZWN0fSDorr7nva7op6blj5HpmpDol4/nmoTmoIfnrb4gQGRlZmF1bHQgW2RhdGEtaGlkZV1cclxuICAgICAqIEBwYXJhbSBvcHRpb25zLmJhY2tkcm9wIHtvYmplY3R9IOiuvue9ruaYr+WQpuWPr+S7peeCueWHu+mBrue9qeWxgumakOiXjyBAZGVmYXVsdCB0cnVlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hbmltYXRlIHtvYmplY3R9IOWKqOeUu+agt+W8j+exu+WQjSBAZGVmYXVsdCB7c2hvdyA6ICdib3VuY2VJbkRvd24nICwgaGlkZSA6ICdib3VuY2VPdXRVcCd9XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb250ZXh0IHtzdHJpbmd8b2JqZWN0fSDmiYDlnKjnmoTniLbnuqflrrnlmaggQGRlZmF1bHQgd2luZG93XHJcbiAgICAgKiBAcmV0dXJuIERpYWxvZyB7b2JqZWN0fVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuLypcclxuICAgICAgICBuZXcgYSgpO1xyXG4gICAgICAgIG5ldyBiKCk7Ki9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlhbG9nIHtcclxuICAgIGNvbnN0cnVjdG9yKCBlbGVtICwgb3B0aW9ucyApIHtcclxuICAgICAgICB0aGlzLiRlbGVtID0gJCggZWxlbSApIDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSAsIERpYWxvZy5ERUZBVUxUUyAsIG9wdGlvbnMgKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpIGluIHRoaXMub3B0aW9ucyl7XHJcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy4kZWxlbS5kYXRhKGkucmVwbGFjZSgvW0EtWl0rL2csJy0kJicpLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0gPSBwID09IG51bGwgPyB0aGlzLm9wdGlvbnNbaV0gOiBldmFsKHApIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCB0eXBlb2YgdGhpcy5vcHRpb25zLmFuaW1hdGUgPT0gJ3N0cmluZycgKXtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGUgPSBuZXcgRnVuY3Rpb24oXCIgcmV0dXJuICBcIisgdGhpcy5vcHRpb25zLmFuaW1hdGUgKSgpO1xyXG4gICAgICAgICAgICBpZiggdHlwZW9mIHRoaXMub3B0aW9ucy5hbmltYXRlICE9ICdvYmplY3QnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuaW1hdGUgPSB7IHNob3cgOiB0aGlzLm9wdGlvbnMuYW5pbWF0ZSAsIGhpZGUgOiAnJyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzbG9ja3Zpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgJCggZG9jdW1lbnQgKS5vZmYoJ2NsaWNrLmRpYWxvZycpLm9uKCdjbGljay5kaWFsb2cnLCB0aGlzLm9wdGlvbnMucG9wdXAgLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkKCQodGhpcykuYXR0cignaHJlZicpKS5kaWFsb2coJ3Nob3cnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIHRoaXMuJGVsZW0uYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICAgICAkKCB3aW5kb3cgKS5vZmYoJ3Jlc2l6ZS5kaWFsb2cnKS5vbigncmVzaXplLmRpYWxvZycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHNlbGYuY2VudGVyKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJFdmVudCgpe1xyXG4gICAgICAgIC8vIFRPRE8g5rOo5YaM5LqL5Lu2XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBldmVudHMgPSBbICdvbicgLCAnb2ZmJyAsICd0cmlnZ2VyJyBdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDAgOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIHZhciBlID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICB0aGlzW2VdID0gKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYXJndW1lbnRzIOS4uuS8oOWFpeWPguaVsFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsZW1bZV0uYXBwbHkoICBzZWxmLiRlbGVtICwgYXJndW1lbnRzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCBlICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0TWFzaygpe1xyXG4gICAgICAgIHZhciAkbWFzayA9ICQoJy5kaWFsb2ctbWFzaycpLmxlbmd0aCA9PSAwID8gJCgnPGRpdiBjbGFzcz1cImRpYWxvZy1tYXNrXCI+PC9kaXY+JykuYXBwZW5kVG8oJ2JvZHknKTogJCgnLmRpYWxvZy1tYXNrJyk7XHJcbiAgICAgICAgcmV0dXJuICAkbWFzaztcclxuICAgIH1cclxuICAgIGdldE1vZHVsZSggdGl0bGUgLCBjb250ZW50ICAsIGhhc2Zvb3QgPSB0cnVlICl7XHJcbiAgICAgICAgdmFyICRmb290ZXIgPSAkKCc8ZGl2PicsIHsgJ2NsYXNzJyA6IFwiZGlhbG9nLWZvb3RlciBjbGVhcmZpeFwiIH0pLFxyXG4gICAgICAgICAgICAkYnRuT0sgPSAkKCc8YT4nLCB7ICdjbGFzcycgOiBcImJ0biBidG4tcHJpbWFyeSBidG4tb2tcIiAsICdkYXRhLWhpZGUnIDogJ3RydWUnICxocmVmIDogXCJqYXZhc2NyaXB0OjtcIiAgfSkuaHRtbCgn56Gu5a6aJyksXHJcbiAgICAgICAgICAgICRidG5DYW5jZWwgPSAkKCc8YT4nLCB7ICdjbGFzcycgOiBcImJ0biBidG4tZGVmYXVsdCBidG4tY2FuY2VsXCIgLCAnZGF0YS1oaWRlJyA6ICd0cnVlJywgaHJlZiA6IFwiamF2YXNjcmlwdDo7XCIgfSkuaHRtbCgn5Y+W5raIJyk7XHJcblxyXG4gICAgICAgIHZhciAkZGlhbG9nID0gJCgnPGRpdj4nLCB7ICdjbGFzcycgOiBcImRpYWxvZ1wiIH0pLFxyXG4gICAgICAgICAgICAkY29udGFpbmVyID0gJCgnPGRpdj4nLCB7ICdjbGFzcycgOiBcImRpYWxvZy1jb250YWluZXJcIiB9KSxcclxuICAgICAgICAgICAgJGhlYWRlciA9ICQoJzxkaXY+JywgeyAnY2xhc3MnIDogXCJkaWFsb2ctaGVhZGVyIGNsZWFyZml4XCIgfSkuYXBwZW5kKCc8aDMgY2xhc3M9XCJkaWFsb2ctdGl0bGVcIj4gJysgdGl0bGUgKyc8L2gzPjxkaXYgY2xhc3M9XCJvcGVyYXRlXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIGNsYXNzPVwiZGlhbG9nLWhpZGVcIiBkYXRhLWhpZGUgPsOXPC9hPjwvZGl2PicpLFxyXG4gICAgICAgICAgICAkYm9keSA9ICQoJzxkaXY+JywgeyAnY2xhc3MnIDogXCJkaWFsb2ctYm9keSBkaWFsb2ctbWVzc2FnZSBjbGVhcmZpeFwiIH0pLmh0bWwoIGNvbnRlbnQgKTtcclxuXHJcbiAgICAgICAgJGZvb3Rlci5hcHBlbmQoICRidG5PSyApLmFwcGVuZCggJGJ0bkNhbmNlbCApIDtcclxuXHJcbiAgICAgICAgaWYoIHRpdGxlICE9IG51bGwgKXtcclxuICAgICAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoICRoZWFkZXIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKCAkYm9keSApO1xyXG5cclxuICAgICAgICBoYXNmb290ICYmICRjb250YWluZXIuYXBwZW5kKCAkZm9vdGVyICkgO1xyXG5cclxuICAgICAgICAkZGlhbG9nLmFwcGVuZCggJGNvbnRhaW5lciApO1xyXG4gICAgICAgIHJldHVybiAkZGlhbG9nO1xyXG4gICAgfVxyXG4gICAgY2VudGVyKCl7XHJcbiAgICAgICAgdmFyICRjb250ZXh0ID0gJCggdGhpcy4kZWxlbS5kYXRhKCdjb250ZXh0JykgfHwgdGhpcy5vcHRpb25zLmNvbnRleHQgKTtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gJGNvbnRleHQubGVuZ3RoID8gJGNvbnRleHQub2Zmc2V0KCkgOiB7IGxlZnQ6IDAsIHRvcDogMCB9O1xyXG4gICAgICAgIHZhciAkY29udGFpbmVyID0gJGNvbnRleHQuZmluZCgnLmRpYWxvZy1jb250YWluZXInKTtcclxuICAgICAgICB2YXIgc2l6ZSA9IHsgd2lkdGg6ICRjb250YWluZXIud2lkdGgoKSwgaGVpZ2h0OiAkY29udGFpbmVyLmhlaWdodCgpIH07XHJcbiAgICAgICAgdmFyIGxlZnQgPSAoICRjb250ZXh0LndpZHRoKCkgLSBzaXplLndpZHRoICkgLyAyO1xyXG4gICAgICAgIHZhciB0b3AgPSAoICRjb250ZXh0LmhlaWdodCgpIC0gc2l6ZS5oZWlnaHQgKSAvIDI7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xyXG4gICAgICAgIC8vICBwYXJhbXNbJ2xlZnQnXSA9IGxlZnQgKyAob2Zmc2V0LmxlZnQgfHwgMCk7XHJcbiAgICAgICAgcGFyYW1zWyd0b3AnXSA9IHRvcCArIChvZmZzZXQgJiYgb2Zmc2V0LnRvcCB8fCAwKSAtICRjb250ZXh0LnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICAkY29udGV4dC5maW5kKCcuZGlhbG9nLWNvbnRhaW5lcicpLmNzcyhwYXJhbXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLpcclxuICAgICAqIEByZXR1cm5zIHtEaWFsb2d9XHJcbiAgICAgKi9cclxuICAgIHNob3coKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gdGhpcy4kZWxlbS5maW5kKCcuZGlhbG9nLWNvbnRhaW5lcicpLm9mZignY2xpY2suZGlhbG9nJykub24oJ2NsaWNrLmRpYWxvZycsIHRoaXMub3B0aW9ucy5oaWRlICxmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgc2VsZi5yZWxhdGVkVGFyZ2V0ID0gdGhpcyA7XHJcbiAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xyXG4gICAgICAgIH0pLm9uKCdjbGljay5kaWFsb2cnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRlbGVtLm9mZignY2xpY2suZGlhbG9nJykub24oJ2NsaWNrLmRpYWxvZycsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZi5yZWxhdGVkVGFyZ2V0ID0gdGhpcyA7XHJcbiAgICAgICAgICAgIHZhciBiYWNrZHJvcCA9ICBzZWxmLm9wdGlvbnMuYmFja2Ryb3AgO1xyXG5cclxuICAgICAgICAgICAgaWYoICFiYWNrZHJvcCApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5oaWRlKCk7XHJcblxyXG4gICAgICAgIH0pLmFkZENsYXNzKCdpbicpO1xyXG5cclxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmFuaW1hdGUuaGlkZSkuYWRkQ2xhc3MoIHRoaXMub3B0aW9ucy5hbmltYXRlLnNob3cgKyBcIiBhbmltYXRlZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy4kZWxlbS50cmlnZ2VyKCAkLkV2ZW50KCdzaG93bicseyByZWxhdGVkVGFyZ2V0IDogdGhpcy5yZWxhdGVkVGFyZ2V0ICB9KSk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5jZW50ZXIoKVxyXG4gICAgICAgIGlmKCAkKGRvY3VtZW50KS5oZWlnaHQoKSA+IHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKSlcclxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcygndG9wJywgJChkb2N1bWVudCkuaGVpZ2h0KCkvMiAtIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKS8yKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6ZSB5a6a77yM6ZSB5a6a5ZCO5peg5rOV6ZqQ6JeP5oiW5pi+56S6XHJcbiAgICAgKiBAcmV0dXJucyB7RGlhbG9nfVxyXG4gICAgICovXHJcbiAgICBsb2NrKCl7XHJcbiAgICAgICAgdGhpcy5pc2xvY2t2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6Kej6ZSBXHJcbiAgICAgKiBAcmV0dXJucyB7RGlhbG9nfVxyXG4gICAgICovXHJcbiAgICB1bmxvY2soKXtcclxuICAgICAgICB0aGlzLmlzbG9ja3Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JePXHJcbiAgICAgKiBAcmV0dXJucyB7RGlhbG9nfVxyXG4gICAgICovXHJcbiAgICBoaWRlKCl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzIDtcclxuICAgICAgICBpZiggdGhpcy5pc2xvY2t2aXNpYmxlICkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcyh0aGlzLm9wdGlvbnMuYW5pbWF0ZS5zaG93KS5hZGRDbGFzcyggdGhpcy5vcHRpb25zLmFuaW1hdGUuaGlkZSApO1xyXG5cclxuICAgICAgICBpZiggdGhpcy4kY29udGFpbmVyLmFuaW1hdGlvbkVuZCAgJiYgdGhpcy5vcHRpb25zLmFuaW1hdGUuaGlkZSApXHJcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hbmltYXRpb25FbmQoICB4ID0+IHNlbGYuJGVsZW0ucmVtb3ZlQ2xhc3MoJ2luJykgKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNlbGYuJGVsZW0ucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcblxyXG4gICAgICAgIHRoaXMuJGVsZW0udHJpZ2dlciggJC5FdmVudCgnaGlkZGVuJyx7IHJlbGF0ZWRUYXJnZXQgOiB0aGlzLnJlbGF0ZWRUYXJnZXQgIH0pKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlXHJcbiAgICAgKiBAcmV0dXJucyB7RGlhbG9nfVxyXG4gICAgICovXHJcbiAgICB0b2dnbGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kZWxlbS5oYXNDbGFzcygnaW4nKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XHJcbiAgICB9XHJcbiAgICBhbGVydCggdGl0bGUgLCBjb250ZW50ICAsIGNhbGxiYWNrICl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgY2FsbGJhY2suYmluZCggc2VsZi4kZWxlbSApO1xyXG5cclxuICAgICAgICB0aGlzLiRlbGVtID0gdGhpcy5nZXRNb2R1bGUoIHRpdGxlICwgY29udGVudCkuYWRkQ2xhc3MoJ2RpYWxvZy1hbGVydCcpLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgdGhpcy4kZWxlbS5maW5kKCcuYnRuLW9rJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCggc2VsZi4kZWxlbSAsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNlbGYuc2hvdygpXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBsb2FkKCl7fVxyXG4gICAgY29uZmlybSggdGl0bGUgLCBjb250ZW50ICwgY2FsbGJhY2sgKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLiRlbGVtID0gdGhpcy5nZXRNb2R1bGUoIHRpdGxlICwgY29udGVudCApLmFkZENsYXNzKCdkaWFsb2ctY29uZmlybScpLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG4gICAgICAgIHZhciBldmVudCA9IHt9IDtcclxuICAgICAgICBpZih0eXBlb2YgY2FsbGJhY2sgPT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICBldmVudCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBldmVudC5vayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kZWxlbS5maW5kKCcuYnRuLW9rJykucmVtb3ZlQXR0ciggdGhpcy5vcHRpb25zLmhpZGUucmVwbGFjZSgnWycsJycpLnJlcGxhY2UoJ10nLCcnKSkuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZXZlbnQub2sgJiYgZXZlbnQub2suY2FsbCggc2VsZi4kZWxlbSAsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcclxuICAgICAgICB9KS5lbmQoKS5maW5kKCcuYnRuLWNhbmNlbCcpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGV2ZW50LmNhbmNlbCAmJiBldmVudC5jYW5jZWwuY2FsbCggc2VsZi4kZWxlbSAsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNlbGYuc2hvdygpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGJsYW5rKCB0aXRsZSAsIGNvbnRlbnQgKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLiRlbGVtID0gdGhpcy5nZXRNb2R1bGUoIHRpdGxlICwgY29udGVudCAgLCBmYWxzZSApLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgc2VsZi5zaG93KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICByZW1vdmUoKXtcclxuICAgICAgICB0aGlzLiRlbGVtICYmIHRoaXMuJGVsZW0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDphY3nva5cclxuICogQHR5cGUge3twb3B1cDogc3RyaW5nLCBoaWRlOiBzdHJpbmcsIGJhY2tkcm9wOiBib29sZWFuLCBhbmltYXRlOiB7c2hvdzogc3RyaW5nLCBoaWRlOiBzdHJpbmd9LCBjb250ZXh0OiBXaW5kb3d9fVxyXG4gKi9cclxuRGlhbG9nLkRFRkFVTFRTID0ge1xyXG4gICAgcG9wdXAgICA6ICdbZGF0YS1wb3B1cF0nLFxyXG4gICAgaGlkZSAgICA6ICdbZGF0YS1oaWRlXScsXHJcbiAgICBiYWNrZHJvcDogdHJ1ZSxcclxuICAgIGFuaW1hdGUgOiB7IHNob3cgOiAnYm91bmNlSW5Eb3duJyAsIGhpZGUgOiAnYm91bmNlT3V0VXAnfSxcclxuICAgIGNvbnRleHQgOiB3aW5kb3dcclxufTtcclxuXHJcbiEoZnVuY3Rpb24gKCQpIHtcclxuICAgIC8qKlxyXG4gICAgICog5by55Ye656qX5Y+jXHJcbiAgICAgKiBAY2xhc3MgZGlhbG9nXHJcbiAgICAgKiBAbW9kdWxlIGpxdWVyeS11aVxyXG4gICAgICogQG5hbWVzcGFjZSBqcXVlcnlcclxuICAgICAqIEBtYWluIGRpYWxvZ1xyXG4gICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyB7b2JqZWN0fVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMge29iamVjdH1cclxuICAgICAqIEByZXR1cm5zIGpxdWVyeSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICAkLmZuLmRpYWxvZyA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICByZXR1cm4gJCggdGhpcyApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2RpYWxvZycpO1xyXG4gICAgICAgICAgICBpZighZGF0YSApe1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IG5ldyBEaWFsb2coIHRoaXMgLCBvcHRpb25zICk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoJ2RpYWxvZycgLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoIHZhciBpID0gMSA7IGkgPCBhcmdzLmxlbmd0aCA7IGkgKysgKXtcclxuICAgICAgICAgICAgICAgIGcucHVzaChhcmdzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPIOaehOmAoOWHveaVsFxyXG4gICAgICAgICAgICB2YXIgZm4gPSBuZXcgRnVuY3Rpb24oICdkYXRhJyAsICdvcHRpb25zJyAsICdhcmdzJyAsJ3JldHVybiBkYXRhWyBvcHRpb25zIF0oYXJncyknKTtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMgJiYgZGF0YVsgb3B0aW9ucyBdICYmIGZuKCBkYXRhICwgb3B0aW9ucyAsIGcuam9pbignLCcpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgJC5kaWFsb2cgPSB7fSA7XHJcblxyXG4gICAgJC5kaWFsb2cuYWN0aXZlID0gbnVsbCA7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRGlhbG9nKCBvcHRpb25zICl7XHJcbiAgICAgICAgJC5kaWFsb2cuYWN0aXZlICYmICQuZGlhbG9nLmFjdGl2ZS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gIG5ldyBEaWFsb2coIG51bGwgLCBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8ueWHuuaPkOekuuahhlxyXG4gICAgICogQHBhcmFtIHRpdGxlICAge3N0cmluZ30gIOagh+mimFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgIHtzdHJpbmd9IOWGheWuuVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICB7ZnVuY3Rpb259IOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIHtvYmplY3R9IOmFjee9rlxyXG4gICAgICogQHJldHVybnMgeyp8SFRNTEVsZW1lbnR8VGFicy4kZWxlbXxDYWxlbmRhci4kZWxlbXxDb2xsYXBzZS4kZWxlbXxDYXJvdXNlbC4kZWxlbX1cclxuICAgICAqL1xyXG4gICAgJC5kaWFsb2cuYWxlcnQgPSBmdW5jdGlvbiggdGl0bGUgLCBjb250ZW50ICwgY2FsbGJhY2sgLCBvcHRpb25zICl7XHJcbiAgICAgICAgcmV0dXJuICAkLmRpYWxvZy5hY3RpdmUgPSBjcmVhdGVEaWFsb2coIG9wdGlvbnMgKS5hbGVydCggdGl0bGUgLCBjb250ZW50ICwgY2FsbGJhY2spLiRlbGVtIDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOehruiupOaPkOekuuahhlxyXG4gICAgICogQHBhcmFtIHRpdGxlICAge3N0cmluZ30gIOagh+mimFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgIHtzdHJpbmd9IOWGheWuuVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICB7ZnVuY3Rpb24gfG9iamVjdH0g5Zue6LCD5Ye95pWwIHwgeyBvayA6IHtmdW5jdGlvbn0gLCBjYW5jZWwgOiB7ZnVuY3Rpb259fVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIHtvYmplY3R9IOmFjee9rlxyXG4gICAgICogQHJldHVybnMgeyp8SFRNTEVsZW1lbnR8VGFicy4kZWxlbXxDYWxlbmRhci4kZWxlbXxDb2xsYXBzZS4kZWxlbXxDYXJvdXNlbC4kZWxlbX1cclxuICAgICAqL1xyXG4gICAgJC5kaWFsb2cuY29uZmlybSA9IGZ1bmN0aW9uKCB0aXRsZSAsIGNvbnRlbnQgLCBjYWxsYmFjayAsIG9wdGlvbnMgKXtcclxuICAgICAgICByZXR1cm4gICQuZGlhbG9nLmFjdGl2ZSA9IGNyZWF0ZURpYWxvZyggb3B0aW9ucyApLmNvbmZpcm0oIHRpdGxlICwgY29udGVudCAsY2FsbGJhY2sgKS4kZWxlbTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog56Gu6K6k5o+Q56S65qGGXHJcbiAgICAgKiBAcGFyYW0gdGl0bGUgICB7c3RyaW5nfSAg5qCH6aKYXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCAge3N0cmluZ30g5YaF5a65XHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgIHtmdW5jdGlvbn0g5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAge29iamVjdH0g6YWN572uXHJcbiAgICAgKiBAcmV0dXJucyB7KnxIVE1MRWxlbWVudHxUYWJzLiRlbGVtfENhbGVuZGFyLiRlbGVtfENvbGxhcHNlLiRlbGVtfENhcm91c2VsLiRlbGVtfVxyXG4gICAgICovXHJcbiAgICAkLmRpYWxvZy5ibGFuayA9IGZ1bmN0aW9uKCB0aXRsZSAsIGNvbnRlbnQgLCBvcHRpb25zICl7XHJcbiAgICAgICAgcmV0dXJuICAkLmRpYWxvZy5hY3RpdmUgPSBjcmVhdGVEaWFsb2coIG9wdGlvbnMgKS5jb25maXJtKCB0aXRsZSAsIGNvbnRlbnQgKS4kZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaPkOekuuWdmuWxj+a1j+iniOe9kemhteeql+WPo1xyXG4gICAgICogQGNsYXNzIGJyb3dzZXJMb3dWZXJzaW9uXHJcbiAgICAgKiBAbW9kdWxlIGpxdWVyeS11aVxyXG4gICAgICogQG5hbWVzcGFjZSBqcXVlcnlcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIHtzdHJpbmd9IOaPkOekuuS/oeaBr1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICB7ZnVuY3Rpb259IOWbnuiwg1xyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIHtzdHJpbmd9IOaPkOekuuS/oeaBr1xyXG4gICAgICogQHJldHVybnMganF1ZXJ5IHtvYmplY3R9XHJcbiAgICAgKi9cclxuXHJcbiAgICAkLmRpYWxvZy5tb2JpbGVJc09yaSA9IGZ1bmN0aW9uKCBtZXNzYWdlICAsIGNhbGxiYWNrICwgb3B0aW9ucyl7XHJcbiAgICAgICAgLy8gVE9ETyDmj5DnpLrkvb/nlKjlnZrlsY/mtY/op4jnvZHpobVcclxuICAgICAgICAkKHdpbmRvdykub24oJ29yaWVudGF0aW9uY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiggd2luZG93Lm9yaWVudGF0aW9uID09IDkwIHx8IHdpbmRvdy5vcmllbnRhdGlvbiA9PSAtOTApXHJcbiAgICAgICAgICAgICAgICAkLmRpYWxvZy5hbGVydCgn5o+Q56S6JyAsIG1lc3NhZ2UgfHwgJ+ivt+WdmuWxj+a1j+iniOe9kemhtSEnICwgY2FsbGJhY2sgLCBvcHRpb25zKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rWP6KeI5Zmo54mI5qOA5rWLIOacrOWwj+S6jmllNiBlaWU35o+Q56S656qX5Y+jXHJcbiAgICAgKiBAY2xhc3MgYnJvd3Nlckxvd1ZlcnNpb25cclxuICAgICAqIEBtb2R1bGUganF1ZXJ5LXVpXHJcbiAgICAgKiBAbmFtZXNwYWNlIGpxdWVyeVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2Uge3N0cmluZ30g5o+Q56S65L+h5oGvXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufSDlm57osINcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIHtvYmplY3R9IOaTjeS9nFxyXG4gICAgICogQHJldHVybnMganF1ZXJ5IHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgICQuZGlhbG9nLmJyb3dzZXJMb3dWZXJzaW9uID0gZnVuY3Rpb24oIG1lc3NhZ2UgICwgY2FsbGJhY2sgLCBvcHRpb25zKXtcclxuICAgICAgICB2YXIgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgICAgIGlmKCBicm93c2VyID09IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIgKXtcclxuICAgICAgICAgICAgdmFyIGJfdmVyc2lvbiA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xyXG4gICAgICAgICAgICB2YXIgdmVyc2lvbiA9IGJfdmVyc2lvbi5zcGxpdChcIjtcIik7XHJcbiAgICAgICAgICAgIHZhciB0cmltX1ZlcnNpb24gPSB2ZXJzaW9uWzFdLnJlcGxhY2UoL1sgXS9nLFwiXCIpO1xyXG4gICAgICAgICAgICBpZiggdHJpbV9WZXJzaW9uPT1cIk1TSUU3LjBcIil7XHJcbiAgICAgICAgICAgICAgICAkLmRpYWxvZy5hbGVydCggbnVsbCAsIG1lc3NhZ2UgfHwgJ+aCqOW9k+WJjea1j+iniOWZqOeJiOacrOi+g+S9ju+8jOS4uuS6huabtOWlveeahOa1j+aViOaenOivt+abtOaWsOiHs+acgOaWsOeJiOacrCEnICwgY2FsbGJhY2sgLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCB0cmltX1ZlcnNpb249PVwiTVNJRTYuMFwiKXtcclxuICAgICAgICAgICAgICAgICQuZGlhbG9nLmFsZXJ0KCBudWxsICwgbWVzc2FnZSB8fCAn5oKo5b2T5YmN5rWP6KeI5Zmo54mI5pys6L6D5L2O77yM5Li65LqG5pu05aW955qE5rWP5pWI5p6c6K+35pu05paw6Iez5pyA5paw54mI5pysIScgLCBjYWxsYmFjayAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAkLmZuLmRpYWxvZy5Db25zdHJ1Y3RvciA9ICBEaWFsb2c7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Hlrprkuo7lhYPntKDkuIrngrnlh7vkuovku7bvvIzlubblvLnlh7rlr7nor53nqpfkvZNcclxuICAgICAqIEBjbGFzcyBjb25maXJtXHJcbiAgICAgKiBAbW9kdWxlIGpxdWVyeS11aVxyXG4gICAgICogQG5hbWVzcGFjZSBqcXVlcnlcclxuICAgICAqIEBwYXJhbSB0aXRsZSAgIHtzdHJpbmd9ICDmoIfpophcclxuICAgICAqIEBwYXJhbSBjb250ZW50ICB7c3RyaW5nfSDlhoXlrrlcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAge2Z1bmN0aW9ufSDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBvcHRpb25zICB7b2JqZWN0fSDphY3nva5cclxuICAgICAqIEByZXR1cm5zIGpxdWVyeSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICAkLmZuLmNvbmZpcm0gID0gZnVuY3Rpb24oIHRpdGxlICwgY29udGVudCAsIGNhbGxiYWNrICwgb3B0aW9ucyAgKXtcclxuICAgICAgICByZXR1cm4gJCh0aGlzKS5vZmYoJ2NsaWNrLmNvbmZpcm0nKS5vbignY2xpY2suY29uZmlybScsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJC5kaWFsb2cuY29uZmlybSggdGl0bGUgLCBjb250ZW50ICwgY2FsbGJhY2sgLCBvcHRpb25zICk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7keWumuS6juWFg+e0oOS4iueCueWHu+S6i+S7tu+8jOW5tuW8ueWHuueql+S9k1xyXG4gICAgICogQGNsYXNzIGFsZXJ0XHJcbiAgICAgKiBAbW9kdWxlIGpxdWVyeS11aVxyXG4gICAgICogQG5hbWVzcGFjZSBqcXVlcnlcclxuICAgICAqIEBwYXJhbSB0aXRsZSAgIHtzdHJpbmd9ICDmoIfpophcclxuICAgICAqIEBwYXJhbSBjb250ZW50ICB7c3RyaW5nfSDlhoXlrrlcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAge2Z1bmN0aW9ufSDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBvcHRpb25zICB7b2JqZWN0fSDphY3nva5cclxuICAgICAqIEByZXR1cm5zIGpxdWVyeSB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICAkLmZuLmFsZXJ0ICA9IGZ1bmN0aW9uKCB0aXRsZSAsIGNvbnRlbnQgLCBjYWxsYmFjayAsIG9wdGlvbnMgICl7XHJcbiAgICAgICAgcmV0dXJuICQodGhpcykub2ZmKCdjbGljay5jb25maXJtJykub24oJ2NsaWNrLmNvbmZpcm0nLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQuZGlhbG9nLmFsZXJ0KCB0aXRsZSAsIGNvbnRlbnQgLCBjYWxsYmFjayAsIG9wdGlvbnMgKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4vKlxyXG4gICAgaWYoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICApe1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRGlhbG9nO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICB3aW5kb3cuRGlhbG9nID0gRGlhbG9nIDtcclxuICAgIH0qL1xyXG5cclxufSkod2luZG93LmpRdWVyeSk7XHJcblxyXG4iXX0=