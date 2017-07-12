jQuery.extend(Boxy, {
    AreaSettings: {
        loadmsg: '数据加载中...', //数据加载时提示信息
        errormsg: '数据加载错误', //数据加载错误时信息
        validatemsg: '选择地区不满足，国家+省州+市县3级策略', //当不满足国家省州市县3级条件时信息
        validatetitle: '提示信息', //效验警告框的标题
        nodatamsg: '暂无数据', //无数据时显示信息
        languagetype: 'cn',        //中英文地区，中文cn，英文en
        countrymsg: '国家：', //作为国家集合前面的标题
        statemsg: '的省州：', //作为省州集合前面的标题
        citymsg: '的市县：', //作为市县集合前面的标题
        footmsg: '备注：地区选择', //底部左侧的提示信息
        tipmsg: '您的选择', //选择后的提示信息
        areaokbtn: '确定', //确定按钮文字信息
        areacancelbtn: '取消'//取消按钮文字信息
    },
    // 地区选择器
    // callback 表示回调,回调函数参数为JSON格式字符串集合
    // option 为json格式的可选项的集合
    area: function (options, callback) {

        options = jQuery.extend({ modal: true, closeable: true, fixed: false },
                                options || {},
                                { show: true, unloadOnHide: true });
        options = $.extend(Boxy.AreaSettings, options);

        //国家选择结果集合
        var arrProSelItems = null;
        //省州选择结果集合
        var arrCitySelItems = null;
        //省州下属区域选择结果集合
        var arrDisSelItems = null;

        var area = jQuery('<div></div>').append('<div id="area-main"></div>').css("padding-bottom", "0");
        //获取工作地区主体句柄
        var main = jQuery("#area-main", area);
        //地区主体的head/body/foot三部分
        var head = jQuery("<div id='area-head' style='margin-bottom:5px;display:none;'></div>").html("<div class='area-title' style='font-weight:bold;height:16px;line-height:16px;'>" + options.tipmsg + "</div><ul id='area-result'></ul>");
        var body = jQuery("<div id='area-body'></div>");
        var foot = jQuery("<div id='area-foot'><span id='area-msg'>" + options.footmsg + "</span><span id='area-cancel' >" + options.areacancelbtn + "</span><span id='area-submit'>" + options.areaokbtn + "</span></div>");
        //国家
        var country = jQuery("<div id='pro-main'><div id='pro-text'><span>" + options.countrymsg + "</span></div><div id='pro-content'></div></div>");
        var countryContent = jQuery("#pro-content", country);
        //省州
        var state = jQuery("<div id='state-main'><div id='state-text'><span></span>" + options.statemsg + "</div><div id='state-content'></div></div>");
        var stateContent = jQuery("#state-content", state);
        //市县
        var city = jQuery("<div class='city-main'><div id='city-text'><span></span>" + options.citymsg + "</div><div id='city-content'></div></div>");
        var cityContent = jQuery("#city-content", city);

        //工作地区主体内容附加
        body.append(city).append(state).append(country);
        main.append(head).append(body).append(foot);

        new Boxy(area, options);

        //初始化国家选项
        GetcountryItems();
        //设置国家项
        function GetcountryItems() {
            ajaxinfo("country" + options.languagetype, "", countryContent);
        };

        //获取每个国家项的Html格式
        function countryOption(id, name) {
            var value = "<a id='proItem" + id + "' href='javascript:void(0);'><span style='padding-left: 5px;' id='proName" + id + "'>" + name + "</span></a>";
            return value;
        };
        var isinit = false;
        //更新显示省份下属城市或城市下属区域
        function showhead(isinit) {
            var element = jQuery("#area-result", head);
            //清空DOM中的选择结果
            element.empty();
            if (arrProSelItems == null && arrCitySelItems == null && arrDisSelItems == null) {
                head.slideUp(400);
            }
            else {
                if (isinit) {
                    head.show();
                }
                else {
                    head.slideDown(400);
                }
                var items = "";

                //循环添加省/市/区被选择项
                if (arrProSelItems != null) {
                    items += "<li class='jobResultItem'><div class='result-pad-left'></div><span id='proSel" + arrProSelItems.id + "' >" + arrProSelItems.name + "</span></li>";
                    //                    var countrystyle = jQuery("#proItem" + arrProSelItems.id, countryContent);
                    //                    //设置选中项的背景样式
                    //                    countrystyle.addClass("checkedStyle");
                }
                if (arrCitySelItems != null) {
                    items += "<li class='jobResultItem'><div class='result-pad-left'></div><span id='citySel" + arrCitySelItems.id + "' >" + arrCitySelItems.name + "</span></li>";
                    //                    var statestyle = jQuery("#cityName" + arrCitySelItems.id, stateContent);
                    //                    //设置选中项的背景样式
                    //                    statestyle.addClass("checkedStyle");
                }
                if (arrDisSelItems != null) {
                    items += "<li class='jobResultItem'><div class='result-pad-left'></div><span id='disSel" + arrDisSelItems.id + "' >" + arrDisSelItems.name + "</span></li>";
                    //                    var citystyle = jQuery("#disName" + arrDisSelItems.id, cityContent);
                    //                    //设置选中项的背景样式
                    //                    citystyle.addClass("checkedStyle");
                }
                if (items != "") {
                    element.append(items);
                    //为新添加项注册事件
                    jQuery(".jobResultItem", element).click(function (event) {
                        var ele = jQuery(event.target);
                        if (ele.attr("class") && ele.attr("class") == "jobResultItem") {
                            DelAreaSelItem(event);
                            showhead();
                        }
                    });
                }
            }
        };
        //从选择结果集合中移除指定项
        function DelAreaSelItem(event) {
            var ele = jQuery(event.currentTarget);
            var areaData = jQuery("span", ele).attr("id").split("Sel");

            switch (areaData[0]) {
                case "pro":
                    arrProSelItems = null;
                    stateContent.html("");
                    jQuery("#state-text>span", state).text("");
                    arrCitySelItems = null;
                    cityContent.html("");
                    jQuery("#city-text>span", city).text("");
                    arrDisSelItems = null;
                    break;
                case "city":
                    arrCitySelItems = null;
                    cityContent.html("");
                    jQuery("#city-text>span", city).text("");
                    arrDisSelItems = null;
                    break;
                default:
                    arrDisSelItems = null;
                    break;
            }
        };

        //国家项点击事件
        function countryClickListener(event) {
            var proId = $(event.currentTarget).attr("id").split("Item")[1];
            SetStates(proId);
        };
        //设置省州层内容
        function SetStates(proId) {
            state.attr("id", "proId" + proId);
            var countryname = jQuery("#proName" + proId, countryContent).text();
            jQuery("#state-text>span", state).text(countryname);
            isinit = true;
            arrProSelItems = jQuery.parseJSON('{"id":"' + proId + '","name":"' + countryname + '"}');
            arrCitySelItems = null;
            showhead(isinit);
            ajaxinfo("state" + options.languagetype, proId, stateContent);
        };

        //获取每个省州项的Html格式
        function StatesOption(id, name, hasSub) {
            var value;
            if (hasSub) {
                value = "<a id='cityItem" + id + "' href='javascript:void(0);' class='hasSub'><span style='padding-left: 5px;' id='cityName" + id + "'>" + name + "</span></a>";
            } else {
                value = "<a id='cityItem" + id + "' href='javascript:void(0);'><span style='padding-left: 5px;' id='cityName" + id + "'>" + name + "</span></a>";
            }
            return value;
        };
        //触发点击城市省州选项事件
        function StatesClickListener(event) {

            var curEle = jQuery(event.currentTarget);
            var cityId = curEle.attr("id").split("Item")[1];
            SetCitys(cityId);
        }

        //设置城市区域集合
        function SetCitys(cityId) {
            city.attr("id", "cityId" + cityId);
            var statename = jQuery("#cityName" + cityId, stateContent).text();
            jQuery("#city-text>span", city).text(statename);
            arrCitySelItems = jQuery.parseJSON('{"id":"' + cityId + '","name":"' + statename + '"}');
            arrDisSelItems = null;
            showhead(isinit);
            ajaxinfo("city" + options.languagetype, cityId, cityContent);
        };

        //获取城市每个区域项的Html格式
        function CityOption(id, name) {
            var value = "<a id='disItem" + id + "' href='javascript:void(0);'><span style='padding-left: 5px;' id='disName" + id + "'>" + name + "</span></a>";
            return value;
        };

        //点击触发城市区域事件
        function CityClickListener(event) {
            var disId = jQuery(event.currentTarget).attr("id").split("Item")[1];
            var cityname = jQuery("#disName" + disId, cityContent).text();
            arrDisSelItems = jQuery.parseJSON('{"id":"' + disId + '","name":"' + cityname + '"}');
            showhead(isinit);
        }
        //css设置hover样式在IE没什么效果，所以用程序设置
        var linkStyle = jQuery("a", body);
        linkStyle.hover(function (event) {
            jQuery(event.currentTarget).addClass("hoverStyle");
        }, function (event) {
            jQuery(event.currentTarget).removeClass("hoverStyle");
        });
        //提交事件
        jQuery("#area-submit", foot).click(function () {
            //国家
            if (arrProSelItems != null && arrCitySelItems != null && arrDisSelItems != null) {
                var data = '{"country":{"id":"' + arrProSelItems.id + '","name":"' + arrProSelItems.name + '"}';
                data += ',"state":{"id":"' + arrCitySelItems.id + '","name":"' + arrCitySelItems.name + '"}';
                data += ',"city":{"id":"' + arrDisSelItems.id + '","name":"' + arrDisSelItems.name + '"}}';

                data = jQuery.parseJSON(data);
                //返回选择结果
                var clicked = this;
                Boxy.get(this).hide(function () {
                    if (callback) callback(data);
                });
            }
            else {
                Boxy.alert(options.validatemsg, null, { title: options.validatetitle });
            }
        });

        //关闭选择器
        jQuery("#area-cancel", foot).click(function (event) {
            //隐藏工作地区选择器
            Boxy.get(this).hide();
        });
        //通用读取后台数据
        function ajaxinfo(otype, id, divid) {
            $.ajax({
                url: 'area_common.axd',
                type: 'POST',
                dataType: "json",
                async: true,
                data: "{opertype:'" + otype + "',id:'" + id + "'}",
                cache: false,
                timeout: 60000,
                beforeSend: function () {
                    divid.html(options.loadmsg);
                },
                error: function () {
                    divid.html(options.errormsg);
                },
                success: function (data) {
                    divid.html("");
                    var t = otype.substring(0, otype.length - 2);
                    var items = "";
                    switch (t) {
                        case "country":
                            if (data.total > 0) {
                                //将所有国家项添加到页面
                                $.each(data.rows, function (i) {
                                    items += countryOption(data.rows[i].id, data.rows[i].name);
                                });
                                divid.append(items);
                                //添加国家选择项触发事件
                                jQuery("a", divid).click(function (event) {
                                    countryClickListener(event);
                                });
                            }
                            else {
                                divid.append(options.nodatamsg);
                            }
                            break;
                        case "state":
                            if (data.total > 0) {
                                //将所有城市项添加到页面
                                $.each(data.rows, function (i) {
                                    items += StatesOption(data.rows[i].id, data.rows[i].name, true);
                                });
                                divid.append(items);
                                //添加城市选择项触发事件
                                jQuery("a", divid).click(function (event) {
                                    StatesClickListener(event);
                                });
                            }
                            else {
                                divid.append(options.nodatamsg);
                            }
                            break;
                        case "city":
                            if (data.total > 0) {
                                $.each(data.rows, function (i) {
                                    items += CityOption(data.rows[i].id, data.rows[i].name);
                                });
                                divid.append(items);
                                jQuery("a", divid).click(function (event) {
                                    CityClickListener(event);
                                });
                            }
                            else {
                                divid.append(options.nodatamsg);
                            }
                            break;
                        default:
                    }
                }
            })
        };
    }
});