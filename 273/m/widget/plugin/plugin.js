/**
 * @desc 插件基类
 * @copyright (c) 2013 273 Inc
 */
//var Event = require('lib/event/event.js');
var $ = require('zepto');

// 初始化组件
var Plugin =  function (el) {
    var $el = $(el);
    var config = $el.data();
    var plugins = $.trim(config.plugin) || '';
    var roles = {};

    config.$el = $el;

    // 自动收集元素, 例如: config.$btn
    $el.find('[data-role]').each(function () {
        var role = $(this).data('role');

        if (!roles[role]) {
            roles[role] = [];
        }
        roles[role].push(this);
    });

    $.each(roles, function (key, role) {
        config['$' + key] = $(role);
    });

    $.each(plugins.split(/[,\s]+/), function (index, url) {
        if (!url) {
            return true;
        }

        var path = url, method;

        if (url.indexOf('#') !== -1) {
            url = url.split('#');
            path    = url[0];
            method = url[1];
        }
        var Plugin ;

        if( typeof require )
        var Plugin = require(path);

        if (method) {
            Plugin = Plugin[method];
        }

        if (typeof Plugin != 'function') {
            console && console.log(url);
        }

        Plugin(config);
    });
};

// 初始化所有页面组件
Plugin.init = function () {
    $('[data-plugin]').each(function () {
        Plugin(this);
    });
};

// 自定义组件
Plugin.define = function (options) {
    options = $.extend({
        name : '',
        attrs : {},
        events : {},
        init : function () {}
    }, options);

    var EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

    var Plugin = function (config) {
        $.extend(this, options, config || {});

        if (this.$el.size() === 0 ) {
            throw new Error('el is incorrect');
        }
    };

    Plugin.prototype.delegateEvents = function (events) {
        var self = this;
        var $el = this.$el;

        events = events || this.events || {};

        $.each(events, function (key, handler) {

            var match = key.match(EVENT_SPLITTER);

            if (!match) return;

            var eventType = match[1];
            var selector = match[2] || undefined; // undefined for zepto

            var callback = function () {
                if ($.isFunction(handler)) {
                    return handler.apply(self, [].slice.apply(arguments));
                } else {
                    return self[handler].apply(self, [].slice.apply(arguments));
                }
            };

            if (selector) {
                $el.on(eventType, selector, callback);
            } else {
                $el.on(eventType, callback);
            }
        });
    };

    Plugin.prototype.getAttr = function (name) {
        if (!name) {
            return this.attrs;
        } else {
            return this.attrs[name] || null;
        }
    };

    return function (config) {
        var $el = config.$el || (config.$el = $(config.el));

        var name = options.name;

        var plugin = $el.data(name);

        if (!plugin) {

            plugin = new Plugin(config);

            plugin.delegateEvents();

            plugin.init();

            if (name) {

                $el.data(name, plugin[name] || plugin);
            }
        }

        return plugin[name] || plugin;
    };
};

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed

Plugin.template = function (str, data){
    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    var fn = new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") +
            "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
};

if(typeof module != 'undefined') module.exports = Plugin ;