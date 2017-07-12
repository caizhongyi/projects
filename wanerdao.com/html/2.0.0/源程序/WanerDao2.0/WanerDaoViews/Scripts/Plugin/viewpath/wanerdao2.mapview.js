//加载google的map地图js
$(function () {
    //$(document).append('<script type=\"text/javascript\" src=\"https://maps.google.com/maps/api/js?sensor=false\"><\/script>');
    var gmapplugin = jQuery('<div id="gmaps" style="width:940px;margin: 0 auto; z-index:9999;display:none;"></div>');
    $(gmapplugin).appendTo(document.body);
    //initmap();
});
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
//function 
(function ($) {
    $.fn.wanerdaomap = function (options) {              
       $this=jQuery(this);
       var opts=$.extend({},jQuery.mapset,options);
       jQuery('#gmaps').empty().append(jQuery.getUI());       
       //$this.attr("rel","#gmaps");
       $this.overlay();//解决第2次点击才出现弹出框办法就是在生成所带标签的时候注册一次其$this.overlay();语句即可
//       $this.unbind("click");
//       $this.bind("click",function () {
//            $this.overlay();
//       });       
       jQuery.initmap();
       jQuery.addevent($this,opts);
    };
})(jQuery);
jQuery.extend({
    mapset: {
        start: '中国重庆',
        end: '中国四川省成都'
    },
    getUI: function () {
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
        ui += '  <div id="map_canvas" class="map-box"></div>';
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
        return ui;
    },
    addevent: function (obj,opts) {
        jQuery('#txtstartplace').val(opts.start);
        jQuery('#txtendplace').val(opts.end);
        jQuery('#mapclose').click(function () {
            $(obj).overlay().close();
        });
        
        var request = {
            origin: opts.start,
            destination: opts.end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //document.getElementById("Div1").innerText = route.toString();
                directionsDisplay.setDirections(response);
            }
        });
    },
    initmap: function () {
        directionsDisplay = new google.maps.DirectionsRenderer();
        var chicago = new google.maps.LatLng(41.850033, -87.6500523);
        var myOptions = {
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: chicago
        }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    }
});