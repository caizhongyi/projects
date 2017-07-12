/**
author:xiaoxubeii
email:xiaoxubeii@gmail.com
*/
(function ($) {
    var _containerId;
    var _t;
    $.fn.wanerdaomap = function (options) {
        _t = this;
        var opts = $.extend(
        { origin: '中国重庆',
            dest: '中国四川省成都'
        }, options);
        _renderUI(opts);
        _loadMap(opts);
    };

    function _renderUI(options) {
        var ui = '<table class="pop_dialog_table" style="width: 100%; height: 100%;">';
        ui += '<tbody>';
        ui += '   <tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>';
        ui += '   <tr><td class="pop_border"></td><td class="pop_content">';
        ui += '   <div class="dialog_content">';
        ui += '   <h2>' + wanerdaoLangTip('active_00003') + ' <a href="javascript:;" id="mapclose" class="close" title=';
        ui += wanerdaoLangTip('common_00008') + '">' + wanerdaoLangTip('common_00008') + '</a></h2>';
        ui += '     <div class="dialog_body clearfix">';
        ui += '     <div class="dialog_left map">';
        ui += '     <div class="control clearfix">';
        ui += '     <ul class="c">';
        ui += '     <li><span>出发地：</span><input id="txtstartplace" type="text" class="input-text" value="中国重庆" disabled="false"/></li>';
        ui += '     <li><span>目的地：</span><input id="txtendplace" type="text" class="input-text" value="中国四川省成都" disabled="false"/></li>';
        ui += '     </ul>';
        ui += '</div>';
        ui += '  <div class="blank"></div>';
        ui += '  <div id="map" style="width:100%;height:479px"></div>';
        ui += '  </div>';
        ui += '    <div class="dialog_right map"><h3 class="title">地图路径</h3>';
        ui += '  <div id="directionsPanel"></div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div></td>';
        ui += '<td class="pop_border"></td></tr>';
        ui += '<tr><td class="pop_bottomleft"></td><td class="pop_border"></td>';
        ui += '<td class="pop_bottomright"></td></tr>';
        ui += '</tbody></table>';
        _containerId = $(_t).attr("rel");
        var _$main = $(_containerId);
        _$main.css({ "width": "940px", "z-index": "9999" });
        _$main.html(ui);
        _$main.find("#txtstartplace").val(options.origin);
        _$main.find("#txtendplace").val(options.dest);
        $(_t).overlay();
    }

    function _loadMap(options) {
        $(_containerId).find("#map").gmap3({
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
                }
            });
            }
        });
    }
})(jQuery);  
