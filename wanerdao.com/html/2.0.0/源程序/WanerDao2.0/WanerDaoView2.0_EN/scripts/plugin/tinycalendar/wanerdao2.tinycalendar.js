/**
* 小型日历jquery插件
* 
* 作者：徐蓓
* 时间: 2012/7/24 22:02
* 描述：小型日历jquery插件（tooltip还没有添加），默认视图是month
*/

(function ($) {
    var _divId = "tcalendar";
    var _lastXhr;
    $.fn.tinycalendar = function (options) {
        var defaults = { handler: {} };
        var opts = $.extend(defaults, options);
        _render(opts);
    }

    function _render(options) {
        var $div = $("#" + _divId);
        var baseView = new BaseView(options);
        $div.append(baseView.render());
    }

    function BaseView(options) {
        var _t = this;
        _t.render = _render;
        var _visStart;
        var _defaults = { view: { day: new DayView(), week: new WeekView(), month: new MonthView()} };
        var _currType = "day";
        var _opts = $.extend(_defaults, options);
        var _$datepicker = $("<div class='datepicker datepicker-ui clearfix'><div id='datepickerPop' style='display:none;z-index:999;'></div></div>");
        function _render() {
            var $tab = $("<div class='datepicker-tabs left'><a href='javascript:;' class='day'>日</a> <a href='javascript:;' class='week'>周</a><a href='javascript:;' class='month'>月</a></div>");
            $tab.find("a[class='" + _currType + "']").addClass("datepicker-ui").addClass("current");

            //切换           
            $tab.find("a").click(function () {
                _$datepicker.find("a").removeClass("datepicker-ui").removeClass("current");
                var currType = $(this).attr("class");
                $(this).addClass("datepicker-ui").addClass("current");
                _switch(currType);
            });


            _$datepicker.append($tab);
            _switch(_currType);
            return _$datepicker;
        }
        function _switch(type) {
            if (!type) {
                type = _currType; //默认是month视图
            }
            _$datepicker.find(".datepanel").remove();
            _$datepicker.append(_opts.view[type].render());
        }

        function DayView() {
            var t = this;
            _now = new Date();
            t.render = _render;
            function _render() {
                var $datepanel = $("<div class='datepanel daypanel'/>");
                $datepanel.append("<div class='daypanel-val'><span class='day'>" + _now.getDate() + "<span class='work'>" + _now.format("ddd") + "<a class='datepicker-tips' href='javascript:;'>参加活动(<span id='aCount'>0</span>)</a></span></span></div>");
                $datepanel.append("<div class='week datepicker-ui'><a href='javascript:;' class='date date-year'>" + _now.getFullYear() + "</a><a href='javascript:;' class='date date-month'>" + (_now.getMonth() + 1) + "</a></div>");
//                var $dateyear = $datepanel.find(".date-year");
//                $dateyear.floatbox('click', { position: 'b', box: _$datepicker.find("#datepickerPop"), move: 'false', offset: { x: -100} });
//                $datepanel.find(".date-month").click(function (e) {
//                    e.stopPropagation();
//                    $dateyear.click();
//                });

                _$datepicker.find("#datepickerPop").datepicker({
                    onSelect: function (dateText, inst) {
                        _$datepicker.find("#datepickerPop").hide();
                        _now = new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
                        _switch(_currType);
                    }
                                });

                /* 日历浮动  */
                var dateyear = $datepanel.find(".date-year").click(function (e) {
                    e.stopPropagation();
                    _$datepicker.find("#datepickerPop").css({
                        left: $(this).offset().left - 80,
                        top: $(this).offset().top + 20,
                        position: 'absolute'
                    }).stop(true).fadeIn();
                });
                _$datepicker.find("#datepickerPop").click(function (e) {
                    e.stopPropagation();
                })
                $(document).click(function () {
                    _$datepicker.find("#datepickerPop").stop(true).fadeOut();
                })

                //   dateyear.floatbox('click',{ position : 'b' , box : '#datepicker' , move : 'false' , offset : { x: -80}})
                $datepanel.find(".date-month").click(function (e) {
                    e.stopPropagation();
                    dateyear.click();
                })
                /* end 日历浮动  */


                _getActivityCount(_now, 1, function (data) {
                    if (data.result) {
                        $datepanel.find("#aCount").text(data.data[0]);
                    }
                });
                return $datepanel;
            }
        }

        function WeekView() {
            var _t = this;
            _t.render = _render;
            _now = new Date();
            _actNow = _cloneDate(_now);
            function _render() {
                var $datepanel = $("<div class='datepanel weekpanel'/>");
                $datepanel.append("<div class='week datepicker-ui'><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>")
                if (_isSameDay(_now, _actNow)) {
                    $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                } else {
                    $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                }
                $datepanel.append("<div><table class='tweek'/><div class='clearfix'><div class='weekdate'></div><div class='datepicker-page'><a href='javascript:;' class='prev datepicker-ui'></a><a href='javascript:;' class='next datepicker-ui'></a></div></div></div>");
                var $weekTable = $datepanel.find("table.tweek");
                _renderDate($weekTable, 1, 7);
                _updateCells($weekTable);
                $datepanel.find(".prev").click(function () {
                    _addDays(_now, -7);
                    _updateCells($weekTable);
                    if (_isSameDay(_now, _actNow)) {
                        $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                    } else {
                        $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                    }
                });
                $datepanel.find(".next").unbind("click").click(function () {
                    _addDays(_now, 7);
                    _updateCells($weekTable);
                    if (_isSameDay(_now, _actNow)) {
                        $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                    } else {
                        $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                    }
                });
                return $datepanel;
            }
            function _updateCells($container) {
                _visStart = _addDays(_cloneDate(_now), -((_now.getDay() + 7) % 7));
                var visEnd = _cloneDate(_visStart);
                visEnd.setDate(visEnd.getDate() + 6);
                $container.parent().parent().find(".weekdate").html(_visStart.format("yyyy/MM/dd") + "&nbsp;&nbsp;-&nbsp;&nbsp;" + visEnd.format("yyyy/MM/dd"));
                _getActivityCount(_visStart, 7, function (activityCount) {
                    if (activityCount.result) {
                        var count = activityCount.data;
                        $container.find("tr td").each(function (i, _cell) {
                            if (count[i] > 0) {
                                var currDay = $(this).text();
                                $(this).html("<div class='worker'>" + currDay + "<span class='day'><a href='/activity/activity_myactivity.html' class='mywork datepicker-ui' target='_blank'></a></span></div>");
                                $(this).find("a.mywork").text(count[i]);
                            }
                        });
                    }
                });
                var month = _now.getMonth();
                var today = _clearTime(_actNow);
                var cell;
                var date;
                $container.find("tr td").each(function (i, _cell) {
                    cell = $(_cell);
                    date = _indexDate(i);
                    if (date.getMonth() == month) {
                        cell.removeClass('disable');
                    } else {
                        cell.addClass('disable');
                    }
                    if (+date == +today) {
                        cell.addClass("current");
                    } else {
                        cell.removeClass("current");
                    }
                    //$(".datepanel span.month").text(month + 1);
                    cell.text(date.getDate());
                });
            }
            function _renderDate($container, row, col) {
                var $tr;
                var $td;
                for (var i = 0; i < row; i++) {
                    $tr = $("<tr/>");
                    for (var j = 0; j < col; j++) {
                        $td = $("<td></td>");
                        $tr.append($td);
                    }
                    $tr.find("td").first().addClass("weekend");
                    $tr.find("td").last().addClass("weekend");
                    $container.append($tr);
                }
                //$container.find("td").tooltip();
            }
        }

        function MonthView() {
            var _t = this;
            _now = new Date();
            _actNow = _cloneDate(_now);
            _t.render = _render;
            function _render() {
                var $datepanel = $("<div class='datepanel monthpanel'/>");
                $datepanel.append("<div class='week datepicker-ui'><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>");
                if (_isSameDay(_now, _actNow)) {
                    $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                } else {
                    $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                }
                $datepanel.append("<div class='clearfix'><table class='f_left tmonth'></table><div class='datepicker-page'><a href='javascript:;' class='prev datepicker-ui'></a><a href='javascript:;' class='next datepicker-ui'></a></div><span class='month'>0</span></div>");
                var $monthTable = $datepanel.find("table.tmonth");
                _updateCells($monthTable);
                $datepanel.find(".prev").click(function () {
                    _addMonths(_now, -1);
                    _updateCells($monthTable);
                    if (_isSameDay(_now, _actNow)) {
                        $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                    } else {
                        $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                    }
                });
                $datepanel.find(".next").click(function () {
                    _addMonths(_now, 1);
                    _updateCells($monthTable);
                    if (_isSameDay(_now, _actNow)) {
                        $datepanel.find(".week span").eq(_actNow.getDay()).addClass("current").addClass("datepicker-ui");
                    } else {
                        $datepanel.find(".week span").removeClass("current").removeClass("datepicker-ui");
                    }
                });
                return $datepanel;
            }
            function _updateCells($container) {
                _renderDate($container, 5, 7);
                _visStart = new Date(_now.getFullYear(), _now.getMonth(), 1);
                _addDays(_visStart, -((_visStart.getDay() + 7) % 7));
                _getActivityCount(_visStart, 35, function (activityCount) {
                    if (activityCount.result) {
                        var count = activityCount.data;
                        $container.find("tr td").each(function (i, item) {
                            if (count[i] > 0) {
                                $(this).removeAttr("class").addClass("worker");
                            }
                            $(this).find("span.tooltip").attr("title", count[i]);
                        });
                    }
                });
                var month = _now.getMonth();
                var today = _clearTime(_actNow);
                var cell;
                var date;
                $container.find("tr td").each(function (i, _cell) {
                    cell = $(_cell);
                    date = _indexDate(i);
                    if (date.getMonth() == month) {
                        cell.removeClass('disable');
                    } else {
                        cell.addClass('disable');
                    }
                    if (+date == +today) {
                        cell.addClass("current");
                    } else {
                        cell.removeClass("current");
                    }
                    cell.find("span.tooltip").text(date.getDate());
                });
                $container.parent().find("span.month").text(month + 1);
                //tooltip();

            }
            function _renderDate($container, row, col) {
                $container.html("");
                var $tr;
                var $td;
                for (var i = 0; i < row; i++) {
                    $tr = $("<tr/>");
                    for (var j = 0; j < col; j++) {
                        $td = $("<td><span class='tooltip'/></td>");
                        $tr.append($td);
                    }
                    $tr.find("td").first().addClass("weekend");
                    $tr.find("td").last().addClass("weekend");
                    $container.append($tr);
                }
                //$container.find("td").tooltip();
            }
        }

        function _isSameDay(a, b) {
            return a.getFullYear() == b.getFullYear() && a.getMonth() == b.getMonth() && a.getDate() == b.getDate();
        }

        function _clearTime(d) {
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            return d;
        }

        function _getActivityCount(start, days, callBack) {
            //丢弃之前没有返回的ajax请求
            if (_lastXhr)
                _lastXhr.abort();
            _lastXhr = $.ajax({
                url: "/selectactivitycount_activity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'selectactivitycountbydate',begindate:'" + start.toBString() + "',length:" + days + "}",
                error: function () {
                },
                success: function (data) {
                    callBack(data);
                }
            });
        }

        function _addDays(d, n, keepTime) {// deals with daylight savings
            if (+d) {
                var dd = d.getDate() + n, check = _cloneDate(d);
                check.setHours(9);
                // set to middle of day
                check.setDate(dd);
                d.setDate(dd);
                if (!keepTime) {
                    _clearTime(d);
                }
                _fixDate(d, check);
            }
            return d;
        }

        function _addMonths(d, n, keepTime) {// prevents day overflow/underflow
            if (+d) {// prevent infinite looping on invalid dates
                var m = d.getMonth() + n, check = _cloneDate(d);
                check.setDate(1);
                check.setMonth(m);
                d.setMonth(m);
                if (!keepTime) {
                    _clearTime(d);
                }
                while (d.getMonth() != check.getMonth()) {
                    d.setDate(d.getDate() + (d < check ? 1 : -1));
                }
            }
            return d;
        }

        function _fixDate(d, check) {// force d to be on check's YMD, for daylight savings purposes
            if (+d) {// prevent infinite looping on invalid dates
                while (d.getDate() != check.getDate()) {
                    d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
                }
            }
        }

        function _clearTime(d) {
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
            return d;
        }

        function _cloneDate(d, dontKeepTime) {
            if (dontKeepTime) {
                return _clearTime(new Date(+d));
            }
            return new Date(+d);
        }

        function _cellDate(row, col) {
            var dis = 1;
            var dit = 0;
            return _addDays(_cloneDate(_visStart), row * 7 + col * dis + dit);
            // what about weekends in middle of week?
        }

        function _indexDate(index) {
            return _cellDate(Math.floor(index / 7), index % 7);
        }

        function _clearAjaxRequest() {

        }
    }
})(jQuery); 