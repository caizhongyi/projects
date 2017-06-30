define(function (require, exports, module) {

    var eventSplitter = /\s+/;

    function Events() {
    }

    Events.prototype.on = function (events, callback, context) {
        var cache, event, list;
        if (!callback) return this;

        cache = this.__events || (this.__events = {});
        events = events.split(eventSplitter);

        while (event = events.shift()) {
            list = cache[event] || (cache[event] = []);
            list.push(callback, context);
        }

        return this;
    }

    Events.prototype.off = function (events, callback, context) {
        var cache, event, list, i;
        if (!(cache = this.__events)) return this;
        if (!(events || callback || context)) {
            delete this.__events;
            return this;
        }

        events = events ? events.split(eventSplitter) : Object.keys(cache);
        while (event = events.shift()) {
            list = cache[event];
            if (!list) continue;

            if (!(callback || context)) {
                delete cache[event];
                continue;
            }

            for (i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback ||
                    context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }

        return this;
    }

    Events.prototype.trigger = function (events) {
        var cache, event, all, list, i, len, rest = [], args;
        if (!(cache = this.__events)) return this;

        events = events.split(eventSplitter);

        for (i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }

        while (event = events.shift()) {
            if (all = cache.all) all = all.slice();
            if (list = cache[event]) list = list.slice();

            if (list) {
                for (i = 0, len = list.length; i < len; i += 2) {
                    list[i].apply(list[i + 1] || this, rest);
                }
            }

            if (all) {
                args = [event].concat(rest);
                for (i = 0, len = all.length; i < len; i += 2) {
                    all[i].apply(all[i + 1] || this, args);
                }
            }
        }

        return this;
    }

    Events.prototype.emit = Events.prototype.trigger;

    Events.mixTo = function (receiver) {
        receiver = receiver.prototype || receiver;
        var proto = Events.prototype;

        for (var p in proto) {
            if (proto.hasOwnProperty(p)) {
                receiver[p] = proto[p];
            }
        }
    };

    var swfUrl = 'http://style.273.cn/sea_modules/imageCroper/swf/image_croper.swf';

    var swfHtml = '' +
        '<object id="{{swfID}}" type="application/x-shockwave-flash" data="{{swfUrl}}" width="100%" height="100%">' +
        '<param name="wmode" value="transparent" />' +
        '<param name="menu" value="false" />' +
        '<param name="scale" value="noScale" />' +
        '<param name="movie" value="{{swfUrl}}"/>' +
        '<param name="quality" value="high" />' +
        '<param name="allowScriptAccess" value="always"/>' +
        '<param name="allowFullscreen" value="true">' +
        '<param name="flashvars" value="{{flashVars}}"/>' +
        '</object>';

    function template(str, obj) {
        return str.replace(/{{\s*(\w+)\s*}}/g, function (match, field) {
            return (obj[field] || '');
        });
    }


    var defaults = {
        picSize: 5 * 1024 * 1024, //5M
        avatarSize: '170,217',
        avatarLabel: ' ',
        avatarSizeLabel: '170X217像素',
        js_handler: '__IMAGE__CROPER__',
        avatarAPI: 'http://upload.273.com.cn/upload2.php',
        sourceAvatar: "http://sta.273.com.cn/widget/imageCroper/default.png"
    };

    var counter = 0;

    function ImageCroper(config) {

        !config && (config = {});

        options = $.extend({swfID: '__IMAGE__CROPER__' + (counter++)}, defaults);

        if (config.maxSize) {
            options.picSize = config.maxSize;
        }

        if (config.cropSize) {
            options.picSize = config.cropSize;
        }

        if (config.uploadTo) {
            options.avatarAPI = config.uploadTo;
        }

        if (config.initVal) {
            options.sourceAvatar = config.initVal;
        }

        var $el = $(config.el);

        if (!$el.length) {
            throw new Error('argument el is incorrect');
        }

        $el.html('正在加载...');

        $el.html(template(swfHtml, {
            swfUrl: swfUrl,
            swfID: options.swfID,
            flashVars: $.param(options)
        }));

        this.$el = $el;
        ImageCroper.instances[options.swfID] = this;
    }

    ImageCroper.instances = {};
    Events.mixTo(ImageCroper.prototype = {constructor: ImageCroper});


    window.__IMAGE__CROPER__ = function (obj) {

        var instance = ImageCroper.instances[obj.source];

        if (!instance) return;

        switch (obj.type) {

            case 'init' :
                instance.emit('ready');
                break;

            case 'cancel' :
                instance.emit('cancel');
                break;

            case 'avatarSuccess' :
                instance.emit('success', obj.data || {});
                break;

            case 'avatarError' :
                instance.emit('error', obj.data || {});
                break;
        }
    };

    exports.ImageCroper = ImageCroper;
});
