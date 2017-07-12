var vcategory_name = "活动";
$(function () {
    $("#pageid").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#actList', //#actList此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: getActivityCategoryItem,
        //pagermore: true,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 15,
                opertype: 'activitycategorypage'//操作码
            },
            info: {
                first: '首页',
                last: '尾页',
                next: '下一页',
                prev: '上一页',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            }
        }
    });
    function getActivityCategoryItem(data, total) {
        // alert(total);
        var v_content = "";
        var rootImagepath = data.rootimgpath;
        $.each(data.rows, function (i, msg) {
            var v_Src = "";
            if (msg.name == "时令活动" || msg.name.toLowerCase() == "season") v_Src = "activity_season_main.html?categoryid=" + msg.category_id;
            else if (msg.name == "自定义活动" || msg.name.toLowerCase() == "define") v_Src = "activity_define_main.html?categoryid=" + msg.category_id;
            else v_Src = "activity_item_main.html?categoryid=" + msg.category_id;
            v_content += ("<li>");
            v_content += ("<a href=\"" + v_Src + "\" target=\"_blank\"><img  src=\"" + rootImagepath + msg.logo_path + "\" class=\"aPic\" width=\"185\" height=\"160\" /></a>");
            v_content += ("<i class=\"iTit\">");
            v_content += ("<i class=\"left yh\"><a href=\"" + v_Src + "\" target=\"_blank\">" + msg.name + "</a></i>");
            if (msg.isfollow == "1") {
                v_content += ("<i class=\"rHeart fullH\"></i>");
            }
            else {
                v_content += ("<i class=\"rHeart emptyH\"></i>");
            }
            v_content += ("</i>");
            v_content += ("<i class=\"mask\"></i>");
            var childData = $.parseJSON(msg.rowsChild);
            if (childData.rows != null && childData.rows != "") {
                v_content += ("<dl>");
                v_content += ("<dt>"+ wanerdaoLangTip('active_00012') + "：</dt>");
                $.each(childData.rows, function (t, msgChild) {
                    v_content += ("<dd>");
                    v_content += ("<i class=\"siTit\"><span class=\"sDate\">" + msgChild.max_nbr + "人 " + getMonthAndDate(msgChild.begin_datetime) + "</span>·<a href=\"activity_index.html?id=" + msgChild.id + "\" title=\"" + msgChild.activity_name + "\" target=\"_blank\">" + subPoints(msgChild.activity_name, 10) + "</a></i>");
                    v_content += ("<p title=\"" + msgChild.description + "\">" + subPoints(msgChild.description, 20) + "</p>");
                    v_content += ("</dd>");
                });
                if (childData.rows.length >= 5) {
                    v_content += ('<dd class="more" ><a href="' + v_Src + '">' + wanerdaoLangTip('active_00009') + '</a></dd>');
                }
                v_content += ("</dl>");
            }
            else {
                v_content += ("<dl>");
                v_content += ("<dt>" + wanerdaoLangTip('active_00011') + "</dt>");
                v_content += ("</dl>");
            }
            v_content += ("<i class=\"infoMask pos\"></i>");
            v_content += ("<i class=\"pos info\">");
            v_content += ("<span title='" + wanerdaoLangTip('active_00013').replace("{0}", msg.followcount) + "'><em class=\"icon_1\"></em>" + msg.followcount + "</span>");
            v_content += ("<span title='" + wanerdaoLangTip('active_00014').replace("{0}", msg.recentcount) + "'><em class=\"icon_2\"></em>" + msg.recentcount + "</span>");
            v_content += ("<span title='" + wanerdaoLangTip('active_00015').replace("{0}", msg.opencount) + "'><em class=\"icon_3\"></em>" + msg.opencount + "</span>");
            v_content += ("</i>");
            v_content += ("</li>");
        });
        $("#actList").html(v_content);
    }

    /*2012-8-29 活动地图（徐蓓添加）*/
    function MapBuilder() {

        //公共变量
        this.markers = []; //传入的数据格式

        //公共函数
        this.init = init;
        this.loadMap = loadMap;

        //私有变量
        var t = this;
        var panel = new MapPanel();
        var _defLocation = new google.maps.LatLng(32.07, 118.78); //默认经纬度

        //获取当前用户地址
        function _getCurrentLocation(options, callBack) {
            var initLocation = _defLocation; //默认经纬度
            var myLocation = $("#area").text() + $("#address").val();
            var opts = $.extend({}, options);
            _getUserCurrPlace(myLocation, function (data) {//首先根据用户信息当前地址获取经纬度
                if (!myLocation) {
                    $("#address").val(data.address);
                    $("#locationId").val(data.country_id + "," + data.state_id + "," + data.city_id);
                    $("#area").text(data.partAddr);
                    $("#zip").val(data.zip);
                }
                if (data.latLng) {
                    _defLocation = data.latLng;
                    opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                    $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                    callBack(opts);
                } else {
                    if (navigator.geolocation) {//根据用户浏览器获取经纬度
                        navigator.geolocation.getCurrentPosition(function (pos) {
                            var coords = pos.coords;
                            _defLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
                            opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                            //                            _getAddress({ lat: _defLocation.lat(), lng: _defLocation.lng() }, function (address) {
                            //                                $("#myLocation").val(address);
                            //                                
                            //                            });
                            $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                            callBack(opts);
                        }, function () {
                            _defLocation = _getUserLatLngByIp();
                            opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                            $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                            callBack(opts);
                        });
                    } else {//根据用户ip获取经纬度（因没有ip库暂时没有实现）
                        _defLocation = _getUserLatLngByIp
                        opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                        $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                        callBack(opts);
                    }

                }

            });

        }

        /*
        获取用户当前地址。如果用户没有在我的位置处输入，则以用户信息的当前地址为准。
        callback的参数为
        {
        address:"xxx",
        city_id:"xxx",city_name:"xxx",
        country_id:"xxx",country_name:"xxx"
        state_id:"xxx",state_name:"xxx",zip:"xxx",
        partAddr:"xxx",
        detailAddr:"xxx",
        latLng:google.maps.LatLng,
        }
        */
        function _getUserCurrPlace(address, callBack) {
            if (address) {
                _getLatLng(address, function (data) {
                    callBack(data);
                })
            } else {
                $.ajax({
                    url: "getuseraddressinfo_activity.axd",
                    type: 'POST',
                    dataType: "json",
                    data: {
                        opertype: "getuseraddressinfo"
                    },
                    cache: false,
                    timeout: 60000,
                    error: function (data) {
                        alert(data);
                    },
                    /*
                    参数格式：
                    {
                    data:{
                    address:"xxx",
                    city_id:"xxx",city_name:"xxx",
                    country_id:"xxx",country_name:"xxx"
                    state_id:"xxx",state_name:"xxx",zip:"xxx"
                    },
                    result:true 
                    } 
                    */
                    success: function (data) {
                        if (data.result) {
                            var addr = data.data;
                            var rAddr = _formatAddress(addr); //格式化地址
                            $.extend(addr, rAddr);
                            if (addr.detailAddr) {
                                _getLatLng(addr.detailAddr, function (data) {
                                    $.extend(addr, data);
                                    callBack(addr);
                                });
                            } else {
                                callBack(addr);
                            }
                        }
                    }
                });
            }

        }
        /*
        参数格式：{country_name:"xxx",state_name:"xxx",city_name:"xxx",address:"xxx",country_id:"xxx"}
        返回格式：{detailAddr:"xxx",partAddr:"xxx",address:"xxx"}
        */
        function _formatAddress(data) {
            var address; //地址（不包含国家省城市）
            var detailAddr; //详细地址（包含国家省城市）
            var partAddr; //格式为包含国家、省、城市的字符串
            switch (data.country_id) {
                case language["zh-cn"]: //中国地址。格式为国家,省,城市,地址
                    partAddr = data.country_name + "," + data.state_name + "," + data.city_name;
                    detailAddr = partAddr + data.address;
                    break;
                case language["en-us"]: //美国地址。格式为地址,城市,州,国家
                    partAddr = data.country_name + "," + data.state_name + "," + data.country_name + "," + data.state_name + ",";
                    detailAddr = data.address + "," + partAddr;
                    break;
                default: partAddr = detailAddr = "";
                    break;
            }
            var cstr = /[undefined|NaN|null]/g; //设定非法的字符串值
            partAddr = partAddr.replace(cstr, "");
            detailAddr = detailAddr.replace(cstr, "");
            return { detailAddr: detailAddr, partAddr: partAddr, address: data.address };
        }

        //同步家庭地址
        function _syncUserAddress(addInfo) {
            $.ajax({
                url: "setuseraddressinfo_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "setuseraddressinfo",
                    address: addInfo.address,
                    country_id: addInfo.countryId,
                    state_id: addInfo.stateId,
                    city_id: addInfo.cityId,
                    zip: addInfo.zip
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                },
                success: function (data) {

                }
            });
        }

        //通过详细地址获取经纬度，callback的参数为{ latLng: google.maps.LatLng class }
        function _getLatLng(address, callBack) {
            $('#map').gmap3(
                { action: 'getLatLng',
                    address: address,
                    callback: function (result) {
                        var latLng;
                        if (result) {
                            latLng = result[0].geometry.location;
                        }
                        callBack({ latLng: latLng });
                    }
                });
        }

        //通过经纬度获取地址，参数latLng为{lat:xxx,lng:xxx}。callBack参数为address：详细地址
        function _getAddress(latLng, callBack) {
            var glatLng = new google.maps.LatLng(latLng.lat, latLng.lng);
            $("#map").gmap3({
                action: 'getAddress',
                latLng: glatLng,
                callback: function (result) {
                    var address = result && result[0] ? result && result[0].formatted_address : "no address";
                    callBack(address);
                }
            });
        }
        //通过Ip获取经纬度
        function _getUserLatLngByIp() {
            var initLocation = _defLocation; //默认经纬度
            //在此添加根据Ip获取对应市区经纬度逻辑
            return initLocation;
        }

        //通过邮编获取经纬度
        function _getUserLatLngByPostcode() {
            var initLocation = _defLocation; //默认经纬度
            //在此添加根据邮编获取对应市区经纬度逻辑
            return initLocation;
        }

        //搜索活动
        function _searchActivity(callBack) {
            var param = {};

            param.syncAddress = false;
            param.placeset = { latLng: $("#latLng").val() };

            var dist = $("#disToHome").val();
            //            if (dist == -2) {
            //                hint(wanerdaoLangTip("actmap_00001"), $("#distHint"));
            //                return false;
            //            }
            param.fromHomeDistance = dist == -2 ? 0 : dist * 1000; //单位是米

            var categoryIds = "";
            $("#categoryArea i").each(function () {
                categoryIds += $(this).attr("id") + ",";
            });
            param.category = categoryIds.replace(/,$/g, "");

            param.allFriendAttend = $("#allFriend").attr("checked") == "checked";
            param.allGroupAttend = $("#allGroup").attr("checked") == "checked";

            if (!param.allFriendAttend) {
                var friendIds = "";
                $("#cusFriendArea i").each(function () {
                    friendIds += $(this).attr("id") + ",";
                });
                param.friendAttend = friendIds.replace(/,$/g, "");
            }

            if (!param.allGroupAttend) {
                var groupIds = "";
                $("#cusGroupArea i").each(function () {
                    groupIds += $(this).attr("id") + ",";
                });
                param.groupAttend = groupIds.replace(/,$/g, "");
            }

            param.filterBeenPlace = $("#filterPlace").attr("checked") == "checked";

            $.ajax({
                url: "searchactivitymap_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "searchactivitymap",
                    /*
                    参数格式：
                    {"syncAddress":false,"placeset":{"latLng":"22.527189,113.91810199999998"},
                    "fromHomeDistance":10000,"category":"25ee9602-1431-11e1-ae3c-000c295f9365,27a1d044-1431-11e1-ae3c-000c295f9365",
                    "allFriendAttend":false,"allGroupAttend":false,"friendAttend":"1,2,","groupAttend":"3,4,","filterBeenPlace":true}
                    */
                    value: JSON.stringify(param)
                },
                cache: false,
                timeout: 60000,
                error: function (data) {

                },
                success: function (data) {
                    //查询活动后的回调函数
                    callBack(data);
                }
            });

        }

        //加载地图
        function loadMap(options, markers) {
            $("#map").gmap3({ action: "clear", name: ["marker", "circle"] });
            var opt = $.extend({
                center: [_defLocation.lat(), _defLocation.lng()],
                fillColor: "#FFAF9F", strokeColor: "#FF512F"
            }, options);
            if (markers) {
                t.markers = markers;
            }
            //加载google map地图
            $('#map').gmap3(
            { action: 'addCircle',
                circle: {
                    options: opt
                }
            },
            { action: 'addMarker',
                map: {
                    center: true, zoom: 14
                },
                //可以自定义marker
                marker: {
            },
            latLng: [opt.center[0], opt.center[1]]
        },
            { action: 'addMarkers',
                markers: t.markers,
                marker: {
                    options: {
                        draggable: false
                    }, events: {
                        click: function (marker, event, content) {
                            var map = $(this).gmap3('get'),
                                        infowindow = $(this).gmap3({ action: 'get', name: 'infowindow' });
                            if (infowindow) {
                                infowindow.open(map, marker);
                                infowindow.setContent(content);
                            } else {
                                $(this).gmap3({ action: 'addinfowindow', anchor: marker, options: { content: content} });
                            }
                        }
                    }
                }
            }
            );
    }

    //    //通过google map api获取address
    //    function _getAddress($map, latLng, callBack) {
    //        $map.gmap3({
    //            action: 'getAddress',
    //            latLng: latLng,
    //            callback: callBack
    //        });
    //    }

    //初始化builder
    function init(options, markers) {
        _buildMap(options, markers);
        panel.render();
    }

    function _buildMap(options, markers) {
        if (markers) {
            t.markers = markers;
        }
        //        //默认捕获回车
        //        $("#myLocation,#postcode").keydown(function (e) {
        //            var keynum;
        //            if (window.event) // IE    
        //            {
        //                keynum = e.keyCode;
        //            }
        //            else if (e.which) // Netscape/Firefox/Opera    
        //            {
        //                keynum = e.which;
        //            }
        //            if (keynum == 13) {//捕获回车
        //                _getCurrentLocation(loadMap);
        //            }
        //        });

        //初始化经纬度
        if (currLtFlag) {
            currLtFlag = false;
            _getCurrentLocation(options, function (options) {
                currLtFlag = true;
                loadMap(options);
            });
        }
    }


    function MapPanel() {
        this.render = render;


        function _isDuplicate($iArray, id) {
            var result = false;
            $iArray.each(function () {
                if ($(this).attr("id") == id) {
                    result = true;
                }
            });
            return result;
        }

        function render() {
            //地址选择框
            $("#area").click(function () {
                new wanerdaoArea({ comopts: { elementid: "#area", callback: function (data) {
                    var addr = _formatAddress({ country_name: data.country.name, state_name: data.state.name, city_name: data.city.name, country_id: data.country.id });
                    $("#area").text(addr.partAddr);
                    $("#address").val("");
                    $("#locationId").val(data.country.id + "," + data.state.id + "," + data.city.id);
                }
                }
                });
            });
            //同步该地址为家庭地址
            $("#setHomeAddress").click(function () {
                if ($(this).attr("checked") == "checked") {
                    //同步函数
                    var zip = $("#zip").val();
                    var address = $("#address").val();
                    var locationId = $("#locationId").val().split(",");
                    if (!locationId) {
                        hint(wanerdaoLangTip("actmap_00004"), $("#distHint"), 2);
                        return false;
                    }
                    if (!address) {
                        hint(wanerdaoLangTip("actmap_00002"), $("#distHint"), 2);
                        return false;
                    }
                    if (!zip) {
                        hint(wanerdaoLangTip("actmap_00003"), $("#distHint"), 2);
                        return false;
                    }
                    var addInfo = { zip: zip, address: address, countryId: locationId[0], stateId: locationId[1], cityId: locationId[2] };
                    _syncUserAddress(addInfo);
                }
            });

            //离家距离
            var distance = [{ id: 10, value: 10 }, { id: 20, value: 20 }, { id: 30, value: 30}];
            bindDropDownList("disToHome", distance, true);

            //分类
            $("#addCategory").click(function () {
                new wanerdaoac({ alphopts: { elementid: 'addCategory', callback: function (data) {
                    $.each(data.acs, function (i, n) {
                        if (!_isDuplicate($("#categoryArea").find("i"), n.id)) {
                            var $i = $("<i id='" + n.id + "'>" + n.name + "<a href='javascript:;'/></i>");
                            $i.find("a").click(function () {
                                $(this).parent().remove();
                            });
                            $("#categoryArea").append($i);
                        }
                    });
                }
                }
                });
            });
            $("#categoryArea i a").click(function () {
                $(this).parent().remove();
            });

            $("#allFriend").attr("checked") == "checked" ? $(".chooseFriend").hide() : $(".chooseFriend").show();
            $("#allFriend").click(function () {
                $(this).attr("checked") == "checked" ? $(".chooseFriend").hide() : $(".chooseFriend").show();
            });

            $("#allGroup").attr("checked") == "checked" ? $(".chooseGroup").hide() : $(".chooseGroup").show();
            $("#allGroup").click(function () {
                $(this).attr("checked") == "checked" ? $(".chooseGroup").hide() : $(".chooseGroup").show();
            });

            var defFValue = $("#cusFriend").val();
            //自定义好友
            $("#addCusFriend").click(function () {
                var cusFriend = $("#cusFriend").val();
                $("#cusFriend").val("");
                if (cusFriend == defFValue) {
                    return false;
                }
                if (cusFriend && !_isDuplicate($("#cusFriendArea").find("i"), cusFriend)) {
                    var $i = $("<i id='" + cusFriend + "'>" + cusFriend + "<a href='javascript:;'/></i>");
                    $i.find("a").click(function () {
                        $(this).parent().remove();
                    })
                    $("#cusFriendArea").append($i);
                }
            });

            var defGValue = $("#cusGroup").val();
            //自定义圈子
            $("#addCusGroup").click(function () {
                var cusGroup = $("#cusGroup").val();
                $("#cusGroup").val("");
                if (defGValue == cusGroup) {
                    return false;
                }
                if (cusFriend && !_isDuplicate($("#cusGroupArea").find("i"), cusGroup)) {
                    var $i = $("<i id='" + cusGroup + "'>" + cusGroup + "<a href='javascript:;'/></i>");
                    $i.find("a").click(function () {
                        $(this).parent().remove();
                    })
                    $("#cusGroupArea").append($i);
                }
            });
            $("#search").click(function () {
                if (getActFlag) {
                    getActFlag = false;
                    _searchActivity(function (data) {
                        if (data.result) {
                            var markers = [];
                            var latLng = [];
                            var content = "";
                            $.each(data.data, function (i, item) {
                                latLng = item.latLng.split(";");
                                content = "活动名称：<a href='/activity_index.html?id=" + item.activityId + "' target='_blank'>" + item.activityName + "</a><br/>" + "活动地点：" + item.activityAddress;
                                markers.push({ lat: latLng[0], lng: latLng[1], data: content });
                            });

                            var dist = $("#disToHome").val();
                            r = dist == -2 ? 0 : dist * 1000;
                            _buildMap({ radius: r }, markers);
                        }
                        getActFlag = true;
                    });
                }
            });
        }
    }
}

var currLtFlag = true; // 全局变量，判断获取用户位置的ajax是否已经返回（暂时异步返回的解决方法）
var getActFlag = true; // 全局变量，判断根据用户位置获取活动的ajax是否已经返回（暂时异步返回的解决方法）

$("#boxTab a").click(function () {
    $("#boxTab a").removeClass("active");
    var oClass = $(this).attr("class");
    $(this).attr("class", oClass).addClass("active");
    $(".content").hide();
    $("#" + oClass).show();
    if (oClass == "mapSearch") {
        var mBuilder = new MapBuilder();
        mBuilder.init({}, []);
    }
});
})