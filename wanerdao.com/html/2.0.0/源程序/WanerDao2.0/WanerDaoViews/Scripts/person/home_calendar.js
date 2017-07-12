
$(function () {
    function clearTime(d) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }

    function addDays(d, n, keepTime) {// deals with daylight savings
        if (+d) {
            var dd = d.getDate() + n, check = cloneDate(d);
            check.setHours(9);
            // set to middle of day
            check.setDate(dd);
            d.setDate(dd);
            if (!keepTime) {
                clearTime(d);
            }
            fixDate(d, check);
        }
        return d;
    }

    function addMonths(d, n, keepTime) {// prevents day overflow/underflow
        if (+d) {// prevent infinite looping on invalid dates
            var m = d.getMonth() + n, check = cloneDate(d);
            check.setDate(1);
            check.setMonth(m);
            d.setMonth(m);
            if (!keepTime) {
                clearTime(d);
            }
            while (d.getMonth() != check.getMonth()) {
                d.setDate(d.getDate() + (d < check ? 1 : -1));
            }
        }
        return d;
    }

    function fixDate(d, check) {// force d to be on check's YMD, for daylight savings purposes
        if (+d) {// prevent infinite looping on invalid dates
            while (d.getDate() != check.getDate()) {
                d.setTime(+d + (d < check ? 1 : -1) * HOUR_MS);
            }
        }
    }

    function clearTime(d) {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
    }

    function cloneDate(d, dontKeepTime) {
        if (dontKeepTime) {
            return clearTime(new Date(+d));
        }
        return new Date(+d);
    }

    function _cellDate(row, col) {
        var dis = 1;
        var dit = 0;
        return addDays(cloneDate(visStart), row * 7 + col * dis + dit);
        // what about weekends in middle of week?
    }

    function indexDate(index) {
        return _cellDate(Math.floor(index / 7), index % 7);
    }

    var start = new Date();
    var visStart;

    function MonthView() {
        var t = this;
        t.render = render;
        function render() {
            $(".datepanel").removeClass().addClass("datepanel");
            $(".datepanel").html("").append("<div class='week datepicker-ui'><span>日</span><span class='current datepicker-ui'>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>");
            $(".datepanel").append("<div class='clearfix'><table class='left'><tbody/></table><div class='page'><a href='javascript:void(0);' class='prev datepicker-ui'></a><a href='javascript:void(0);' class='next datepicker-ui'></a></div><span class='month'></span></div>");
            _renderDate($(".datepanel .left tbody"), 5, 7);
            _updateCells();
            $(".datepicker .page .prev").unbind("click").click(function () {
                addMonths(start, -1);
                _updateCells();
            });
            $(".datepicker .page .next").unbind("click").click(function () {
                addMonths(start, 1);
                _updateCells();
            });
        }

        function _updateCells() {
            visStart = new Date(start.getFullYear(), start.getMonth(), 1);
            addDays(visStart, -((visStart.getDay() + 7) % 7));
            var $bodyCells = $(".datepanel .left tbody td");
            getActivityCount(visStart, 35, function (activityCount) {
                if (activityCount.result) {
                    var count = activityCount.data;
                    $bodyCells.each(function (i, item) {
                        $(this).find("span.tooltip").attr("title", count[i]);
                    });
                }
            });
            var month = start.getMonth();
            var today = clearTime(new Date());
            var cell;
            var date;
            $bodyCells.each(function (i, _cell) {
                cell = $(_cell);
                date = indexDate(i);
                if (date.getMonth() == month) {
                    cell.removeClass('fc-other-month');
                } else {
                    cell.addClass('fc-other-month');
                }
                if (+date == +today) {
                    //cell.addClass(tm + '-state-highlight fc-today');
                } else {
                    //cell.removeClass(tm + '-state-highlight fc-today');
                }
                $(".datepanel span.month").text(month + 1);
                cell.find("span.tooltip").text(date.getDate());
            });
            tooltip();

        }
        function _renderDate($container, row, col) {
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

    function WeekView() {
        var t = this;
        t.render = render;
        function render() {
            $(".datepanel").removeClass().addClass("datepanel").addClass("weekpanel");
            $(".datepanel").html("").append("<div class='week datepicker-ui'><span>日</span><span class='current datepicker-ui'>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>");
            $(".datepanel").append("<div class='clearfix'><table class='left'><tbody/></table><div class='page'><a href='javascript:void(0);' class='prev datepicker-ui'></a><a href='javascript:void(0);' class='next datepicker-ui'></a></div></div></div>");

            _renderDate($(".datepanel .left tbody"), 1, 7);
            _updateCells();
            $(".datepicker .page .prev").unbind("click").click(function () {
                addMonths(start, -1);
                _updateCells();
            });
            $(".datepicker .page .next").unbind("click").click(function () {
                addDays(start, 7);
                _updateCells();
            });
        }

        function _updateCells() {
            visStart = addDays(cloneDate(start), -((start.getDay() + 7) % 7));
            var $bodyCells = $(".datepanel .left tbody td");
            getActivityCount(visStart, 7, function (activityCount) {
                if (activityCount.result) {
                    var count = activityCount.data;
                    $bodyCells.each(function (i, _cell) {
                        if (count[i] > 0) {
                            $(this).find("div.worker").append("<a href='javascript:void(0);' class='mywork datepicker-ui'></a>");
                            $(this).find("a.mywork").text(count[i]);
                        }
                    });
                }
            });
            var month = start.getMonth();
            var today = clearTime(new Date());
            var cell;
            var date;
            $bodyCells.each(function (i, _cell) {
                cell = $(_cell);
                date = indexDate(i);
                if (date.getMonth() == month) {
                    cell.removeClass('fc-other-month');
                } else {
                    cell.addClass('fc-other-month');
                }
                if (+date == +today) {
                    //cell.addClass(tm + '-state-highlight fc-today');
                } else {
                    //cell.removeClass(tm + '-state-highlight fc-today');
                }
                $(".datepanel span.month").text(month + 1);
                cell.find(".day").text(date.getDate());
            });
        }
        function _renderDate($container, row, col) {
            var $tr;
            var $td;
            for (var i = 0; i < row; i++) {
                $tr = $("<tr/>");
                for (var j = 0; j < col; j++) {
                    $td = $("<td><div class='worker'><span class='day'></span></div></td>");
                    $tr.append($td);
                }
                $tr.find("td").first().addClass("weekend");
                $tr.find("td").last().addClass("weekend");
                $container.append($tr);
            }
            //$container.find("td").tooltip();
        }
    }

    function DayView() {
        var t = this;
        t.render = render;
        function render() {
            $(".datepanel").removeClass().addClass("datepanel").addClass("daypanel");
            $(".datepanel").html("").append("<div class='week'>" + start.pattern("EE") + "</div>");
            _updateCells();
        }
        function _updateCells() {
            var $day = $("<div class='day'/>").append(start.getDate());
            var $work = $("<span class='work'>(<span class='todayActivity'>0</span>)</span>").append("<a href='javascript:;' class='tips'><img alt='' src='../images/headarrow.png'>参加活动</a>");
            getActivityCount(start, 1, function (activityCount) {
                if (activityCount.result) {
                    $work.find(".todayActivity").text(activityCount.data[0]);
                }
            });
            $day.append($work);
            $(".datepanel").append($day).append("<div class='week datepicker-ui'><a href='javascript:;'>" + start.getFullYear() + "</a>年<a href='javascript:;'>" + (start.getMonth() + 1) + "</a>月</div>");
        }
    }

    //获取指定日期的活动数
    function getActivityCount(start, days, callBack) {
        $.ajax({
            url: "/selectactivitycount_activity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'selectactivitycountbydate',begindate:'" + parseDate(start) + "',length:" + days + "}",
            error: function () {
            },
            success: function (data) {
                callBack(data);
            }
        });
    }

    var view = {
        month: new MonthView(),
        week: new WeekView(),
        day: new DayView()
    };

    $(".datepicker .tabs a").click(function () {
        $(".datepicker .tabs a").removeClass("datepicker-ui").removeClass("current");
        var currView = $(this).attr("class");
        $(this).addClass("datepicker-ui").addClass("current");
        view[currView].render();
    });

    view["month"].render();

});