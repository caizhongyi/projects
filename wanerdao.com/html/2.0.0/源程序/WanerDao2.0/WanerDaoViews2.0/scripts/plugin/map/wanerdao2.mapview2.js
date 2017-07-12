/**
author:xiaoxubeii
email:xiaoxubeii@gmail.com
*/
(function ($) {
    var _t;
    $.fn.wanerdaomap = function (options) {
        _t = this;
        var opts = $.extend(
        { origin: '中国重庆',
            dest: '中国四川省成都'
        }, options);
        $("#directionsPanel").html("");
        //_t.html("");
        _loadMap(opts);
    };
    function _destroyMap() {
        _t.gmap3({
            action: 'destroy'
        });

        var container = _t.parent();
        _t.remove();

        _t = $('<div class="linemapL" id="mainMap"/>');
        container.prepend(_t);
    }
    function _loadMap(options) {
        _destroyMap();
        _t.gmap3({
            action: 'getRoute',
            options: {
                origin: options.origin,
                destination: options.dest,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            },
            callback: function (results) {
                if (!results) return;
                var route = results.routes[0];
                var center = route.overview_path[parseInt((route.overview_path.length / 2))];
                $(this).gmap3(
                    { action: 'init',
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        streetViewControl: true,
                        center: [center.lat(), center.lng()]
                    },
            { action: 'addDirectionsRenderer',
                panelId: 'directionsPanel',
                options: {
                    preserveViewport: true,
                    draggable: true,
                    directions: results
                },
                callback: function (render) {

                }
            });
            }

        });
    }
})(jQuery);  
