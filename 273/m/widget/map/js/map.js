/**
 * 百度地图封装
 * @require.async ./tip.js
 */
var $ = require('zepto');
var Class = require('class');

var Map = Class.create( {
    // 静态图url
    STATIC_IMAGE_URL : 'http://api.map.baidu.com/staticimage?',
    // 动态地图url
    DYNAMIC_SERVER_URL : 'http://api.map.baidu.com/api?v=1.4&callback=',
    markerStyles : ['m,A','m,B','m,C','m,D','m,E','m,F','m,G','m,H','m,I','m,J','m,K','m,L','m,M','m,N','m,O','m,P','m,Q','m,R','m,S','m,T','m,U','m,V','m,W','m,X','m,Y','m,Z'],
    initialize : function( selector , config ) {
        var _this = this;
        this.$  = $( selector );
        this.cbs = [];
        this.controls = {};
        this.overlays = {};
        this.isReady = false;

        this.config = $.extend({
            minZoom : 3,
            maxZoom : 19,
            //  mapType : BMAP_NORMAL_MAP,
            enableHighResolution : true,
            enableAutoResize : true,
            enableMapClick : true
        }, {
            zoom : 16,
            controls : [],
            width : 0,
            height : 0,
            type : 'dynamic',
            autoZoom : true,
            enableScrollWheelZoom : false,
            enableDoubleClickZoom : true,
            enableKeyboard : false
        }, config );


        if (this.config.width > 0) {
            this.$.width(this.config.width);
        }

        if (this.config.height > 0) {
            this.$.height(this.config.height);
        }

        if ( this.config.type === 'static') {
            this.createStatic();
        } else if ( this.config.type === 'dynamic') {
            return this.createDynamic( function( map ){
                var center = map.formatPoint(_this.config.center) || map.formatPoint(_this.config.city) || map.formatPoint(_this.config.province) || '中国';
                map.map = new BMap.Map( _this.$[0], _this.config);
                // 地名字符
                map.map.centerAndZoom(center, config.autoZoom ? map.config.zoom : undefined);

                for (var i = 0, l =  _this.config.controls.length; i < l; i++) {
                    map.addControl({type : map.controls[i]});
                }

                if ( _this.config.enableScrollWheelZoom) {
                    map.enableScrollWheelZoom();
                } else {
                    map.disableScrollWheelZoom();
                }

                if ( _this.config.enableDoubleClickZoom) {
                    map.enableDoubleClickZoom();
                } else {
                    map.disableDoubleClickZoom();
                }

                if ( _this.config.enableKeyboard) {
                    map.enableKeyboard();
                } else {
                    map.disableKeyboard();
                }

                function onReady () {
                    if (!map.isReady) {
                        map.isReady = true;
                        map.ready();
                    }
                }

                map.map.addEventListener('load', onReady);
                map.map.addEventListener('tilesloaded', onReady);
            });
        }
    },
    // 创建静态图
    createStatic : function () {
        var $a = $('<a>');
        var $img = $('<img>');
        var $el = this.$;

        if (!$el.size()) return;

        var markers = this.config.markers || '';

        if ($.isArray(markers)) {
            this.config.markers = markers.join('|');
        }

        if (!this.config.width) {
            this.config.width = $el.width();
        }

        if (!this.config.height) {
            this.config.height = $el.height();
        }

        if (this.config.tip) {
            $a.attr('title', this.config.tip);
            delete this.config.tip;
        }

        if (!this.config.markerStyles) {
            this.config.markerStyles = this.markerStyles.join('|');
        }
        var url = this.STATIC_IMAGE_URL + $.param(this.config);
        $img.attr('src', url);
        $a.append($img);
        $el.append($a);
        return this;
    },
    createDynamic : function ( callback ){
        var _this = this;
        // 异步回调函数
        var EqsMapLoad = window.EqsMapLoad = function () {
            callback( _this );
        };
        var config = $.extend( { callback : 'EqsMapLoad' }, this.config || {});
        var $script = $('<script type="text/javascript" charset="utf-8" ></script>').attr('src' ,  this.DYNAMIC_SERVER_URL + config.callback );
        $script.appendTo('body');
        return this;
    },
    version: '1.4',
    // 创建静态图
    formatPoint: function ( point ) {
        if (arguments.length > 1) {
            return new BMap.Point(arguments[0], arguments[1]);
        }
        if (point instanceof BMap.Point) {
            return point;
        } else if (point === Object(point) && point.lng && point.lat) {

            return new BMap.Point(point.lng, point.lat);
        } else if ( typeof point == 'string' && point && (point.toLowerCase() !== 'null' && point.toLowerCase() !== 'undefined')) {

            var _point = point.trim().split(/[,\s，]+/);

            if (_point.length === 2) {
                return new BMap.Point(_point[0], _point[1]);
            }

            return point;
        }
        return null;
    },
    addControl: function ( param ) {

        var ctype = (param['ctype'] || '').toLowerCase();

        var control;

        delete param['ctype'];

        switch (ctype) {

            case 'navigation' :
                control = new BMap.NavigationControl(param);
                break;

            case 'overviewmap' :
                control = new BMap.OverviewMapControl(param);
                break;

            case 'scale' :
                control = new BMap.ScaleControl(param);
                break;

            case 'maptype' :
                control = new BMap.MapTypeControl(param);
                break;

            case 'copyright' :
                control = new BMap.CopyrightControl(param);
                break;

            case 'geolocation' :
                control = new BMap.GeolocationControl(param);
                break;

            default :
                break;
        }

        if (control) {
            this.controls[ctype] = control;
            this.map.addControl(control);
        }
        return this;
    },
    addOverlay : function ( param ) {
        var _this = this;
        var overlayModule = 'widget/map/js/' + param['type'] + '.js';

        require.async(overlayModule, function(Overlay) {
            _this.overlays = [];

            if( !(param instanceof  Overlay) ){
                param['point'] && (param['point'] = _this.formatPoint(param['point']));
                if (!param['point']) {
                    return;
                }
                delete param['type'];
                param = new Overlay(  param['point'] , param ) ;

            }

            _this.map.addOverlay(param);
            _this.overlays.push(param);
        });

        return _this;
    },
    removeControl: function (type) {

        type = (type || '').toLowerCase();

        var control = this.controls[type];

        if (control) {
            this.map.removeControl(control);
            delete this.controls[type];
        }

        return this;
    },
    ready: function (cb) {
        var cbs = this.cbs || [];
        var isReady = this.isReady;
        if (!cb && isReady) {
            for (var i = 0, l = cbs.length; i < l; i++) {
                cbs[i].apply(this);
            }
            this.cbs = [];
        }
        else if ( cb && $.isFunction(cb)) {
            if (isReady) {
                cb.apply(this);
            } else {
                this.cbs.push(cb);
            }
        }
        return this;
    },
    on: function (type, cb) {
        var me = this;
        if (type && $.isFunction(cb)) {
            this.ready(function () {
                me.map.addEventListener(type, function (e) {
                    cb.apply(me, [e]);
                });
            });
        }
        return this;
    },
    setCenter: function (point) {
        var point = this.formatPoint(point) || point;

        if (point) {
            this.map.setCenter(point);
        }
        return this;
    },
    setZoom: function (zoom) {

        if (!isNaN(zoom)) {
            this.map.setZoom(zoom);
        }
        return this;
    },

    // 设置视野
    setViewport: function (points) {

        if (!Array.isArray(points)) {
            points = [points];
        }

        for (var i = 0, l = points.length; i < l; i++) {
            points[i] = this.formatPoint(points[i])
        }

        this.map.setViewport(points);
    },

    enableScrollWheelZoom: function () {

        this.map.enableScrollWheelZoom()
        return this;
    },

    disableScrollWheelZoom: function () {
        this.map.disableScrollWheelZoom()
        return this;
    },

    enableDoubleClickZoom: function () {

        this.map.enableDoubleClickZoom();
        return this;
    },
    disableDoubleClickZoom: function () {

        this.map.disableDoubleClickZoom();
        return this;
    },

    enableKeyboard: function () {

        this.map.enableKeyboard();
        return this;
    },
    disableKeyboard: function () {

        this.map.disableKeyboard();
        return this;
    },

    autocomplete: function ( selector , options ) {

        !options && (options = {});

        var location, auto, $elem = $(selector);

        if (!$elem.length) throw new Error('el参数不正确');

        location = options.location || this.map;

        if (typeof location == 'string ') {
            location = this.formatPoint(location);
        }
        options.location = location;
        options = $.extend({
            input: $elem[0]
        }, options);

        auto = new BMap.Autocomplete(options);

        return auto;
    },
    route: function ( selector , options ) {

        !options && (options = {});

        var location, route, type,
            $el = $(selector), renderOptions;

        location = options.location || this.map

        if ( typeof location == 'string') {
            location = this.formatPoint(location);
        }

        delete options.location;

        renderOptions = options.renderOptions || {};

        if ($el.length) {
            renderOptions.panel = $el[0];
        }

        renderOptions.map = this.map;
        options.renderOptions = renderOptions;

        // todo: add other renderOptions

        type = (options.type || 'transit').toLowerCase();
        delete options.type;

        if (type === 'transit') {
            route = new BMap.TransitRoute(location, options);
        } else if (type === 'driving') {
            route = new BMap.DrivingRoute(location, options);
        }
        return route;
    },
    transitRoute: function ( selector , options ) {
        options.type = 'transit'
        return this.route( selector , options );
    },
    drivingRoute: function ( selector , options ) {
        options.type = 'driving'
        return this.route( selector , options );
    }

})

if(typeof module != 'undefined') module.exports = Map ;