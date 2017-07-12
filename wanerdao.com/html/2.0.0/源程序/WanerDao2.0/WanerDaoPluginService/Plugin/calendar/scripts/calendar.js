/**
* 个人日历相关js脚本（暂时版本，3期将整合为一个jquery的控件）
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：个人日历相关js脚本
*/
function initTimeFields(timeSpan) {
    var time = new Date();
    time.setFullYear(1999, 0, 1);
    time.setHours(0);
    time.setMinutes(0);
    var times = [];
    for (var i = 0; time.getDate() < 2; i++) {
        time.setMinutes(time.getMinutes() + timeSpan);
        times[i] = { time: new Date(time) };
    }
    return times;
}
function setupTimeFields($select, date) {
    var temp = date.pattern("HH:mm");
    $select.find("option[selected=selected]").removeAttr();
    $select.find("option").each(function (index) {
        if ($(this).text() == temp) {
            $(this).attr("selected", "selected");
            return false;
        }
    });
}
//转化格式1999-1-1 00:00:00
function string2Date(dateString) {
    var date = new Date(Date.parse(dateString.replace(/-/g, "/")));
    return date;
}

//后台事件实体转化为前台事件实体
function affair2Event(affair) {
    var event = affair;
    event.start = affair.begin_date;
    event.end = affair.end_date;
    event.begin_date = undefined;
    event.end_date = undefined;
    return event;
}

//前台事件实体转化为后台事件实体
function event2Affair(event) {
    var affair = event;
    affair.begin_date = event.start;
    affair.end_date = event.end;
    affair.start = undefined;
    affair.end = undefined;
    return affair;
}
//api主url
var url = api.createUrl();
var events = [{
    id: 1,
    title: 'All Day Event',
    start: new Date(2011, 11, 1)
}];

var userId = uid;
//获得日程
function getAgenda(userId, callBack) {
    $.get(url + "Service/Person/PersonalCalendar.svc/PersonalCalendarAgenda/Get/userId=" + userId,
                    function (data, textStatus) {
                        if (textStatus == "success")
                            callBack($.parseJSON(data));
                    });
}


//获得日历
function getCalendar(userId, callBack) {
    $.get(url + "Service/Person/PersonalCalendar.svc/PersonalCalendar/Get/userId=" + userId,
                    function (data, textStatus) {
                        if (textStatus == "success")
                            callBack($.parseJSON(data));
                    });
}
//添加日历
function addCalendar(event, callBack) {
    $.ajax({
        type: "POST",
        url: url + "Service/Person/PersonalCalendar.svc/PersonalCalendar/Add",
        data: JSON.stringify(event),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callBack($.parseJSON(data));
        },
        error: function (xhr) {
            //debugger;
        }
    });
}
//添加简单日历
function addSimpleCalendar(simpleEvent, callBack) {
    $.ajax({
        type: "POST",
        url: url + "Service/Person/PersonalCalendar.svc/SimplePersonalCalendar/Add",
        data: JSON.stringify(simpleEvent),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callBack($.parseJSON(data));
        },
        error: function (xhr) {
            debugger;
        }
    });
}

//修改日历
function modCalendar(event, callBack) {
    $.ajax({
        type: "POST",
        url: url + "Service/Person/PersonalCalendar.svc/PersonalCalendar/Mod",
        data: JSON.stringify(event),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callBack($.parseJSON(data));
            //alert("修改日历成功！");
        },
        error: function (xhr) {
            debugger;
        }
    });
}
//修改简单日历
function modSimpleCalendar(simpleEvent, callBack) {
    $.ajax({
        type: "POST",
        url: url + "Service/Person/PersonalCalendar.svc/SimplePersonalCalendar/Mod",
        data: JSON.stringify(simpleEvent),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callBack($.parseJSON(data));
        },
        error: function (xhr) {
            debugger;
        }
    });
}
//删除日历
function delCalendar(id, callBack) {
    $.ajax({
        type: "POST",
        url: url + "Service/Person/PersonalCalendar.svc/PersonalCalendar/Del",
        data: JSON.stringify(id),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callBack($.parseJSON(data), id);
        },
        error: function (xhr) {
            debugger;
        }
    });
}
//判断是否是一天
function isAllDay(start, end) {
    var result = false;
    if (start.getHours() == 0 && start.getMinutes() == 0)
        if (end.getHours() == 23 && end.getMinutes() == 59)
            result = true;
    return result;
}

$(function () {
    $(".datePop").css("display", "inherit");
    showDate('.normal');

    var times = initTimeFields(30);
    var s = "";
    for (var i = 0; i < times.length; i++) {
        s += "<option>" + times[i].time.pattern("HH:mm") + "</option>";
    }
    $(".popDateEdit .startTime").html(s);
    $(".popDateEdit .endTime").html(s);
    $("#datepicker").datepicker({
        onSelect: function (dateText, inst) {
            var date = $.datepicker.parseDate('yy-mm-dd', dateText);
            $('#calendar').fullCalendar('changeView', 'agendaDay');
            $('#calendar').fullCalendar('gotoDate', date.getFullYear(), date.getMonth(), date.getDate());

            $(".datePop .fRight .sBtn").removeClass("selected");
            $(".dateTitle .fRight a").eq(0).addClass("selected");
        }
    });
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $("#dialog:ui-dialog").dialog("destroy");

    var calendar = $('#calendar').fullCalendar({
        unselectCancel: ".popDateTips,.popDateEdit",
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventClick: function (event, jsEvent, view) {
            // opens events in a popup window
            var selectedElement = $(jsEvent.target);
            var popDateTips = $(".popDateTips");

            var height = 40;
            //计算位置
            var l1;
            var l2;
            if (parseInt(selectedElement.parent().css("top")) < height) {
                $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 164 + popDateTips.height();
            } else {
                $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
            }

            l2 = selectedElement.offset().left - selectedElement.parents(".datePop").offset().left - popDateTips.width() - 95;


            if (popDateTips.is(":hidden")) {
                popDateTips.css({ "top": l1, "left": l2, "z-index": 999 }).show();
            } else {
                popDateTips.hide();
            }

            $(".popDateTips .del").show();
            $(".popDateTips .del").unbind("click").click(function () {
                delCalendar(event.id, function (data, id) {
                    alert(data.msg);
                    if (data.result) {
                        calendar.fullCalendar('removeEvents', id);
                    }
                    $(".popDateTips").hide();
                });
            });

            //$("#dialog-simpleForm :input").val("");
            $(".popDateTips .popTipsArea").val("");
            var time = "";
            if (event.allDay) {
                time = event.start.pattern("yyyy年MM月dd日(EE)") + "-" + event.end.pattern("yyyy年MM月dd日(EE)");
            } else
                time = event.start.pattern("yyyy年MM月dd日HH时") + "-" + event.end.pattern("HH时");

            //事件
            $(".popDateTips .popTipsArea").val(event.record_event);
            //标题事件
            $(".popDateTips .time").text(time);
            $(".popDateTips .save").unbind("click");
            $(".popDateTips .save").click(function () {
                var affair = $(".popDateTips .popTipsArea").val();
                var title = affair;
                if (title) {
                    var end;
                    var start = event.start;
                    if (event.allDay) {
                        end = new Date();
                        end.setTime(start.getTime());
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);
                        event.end = end;
                    } else {
                        end = event.end;
                    }
                    var e = { id: event.id, user_id: userId, title: title, record_event: affair, begin_date: parseDate(start), end_date: parseDate(end) };
                    modSimpleCalendar(e, function (data) {
                        if (data.result) {
                            event.title = e.title;
                            event.record_event = e.record_event;
                            calendar.fullCalendar('updateEvent', event);
                        }
                        alert(data.msg);
                    });
                }
                popDateTips.hide();
            });
            $(".popDateTips .detail").unbind("select");
            $(".popDateTips .detail").click(function () {
                var popDateEdit = $(".popDateEdit");


                //清空数据
                $(".popDateEdit :text").val("");
                $(".popDateEdit textArea").val("");
                $(".popDateEdit :checkbox").removeAttr("checked");
                $(".popDateEdit select option").removeAttr("selected", "selected").eq(0).attr("selected", "selected");


                var datePattern = "yyyy-MM-dd";
                $(".popDateEdit .startDate").val(event.start.pattern(datePattern));
                $(".popDateEdit .endDate").val(event.end.pattern(datePattern));
                $(".popDateEdit .startDate").addClass("focus");
                $(".popDateEdit .endDate").addClass("focus");
                if (event.allDay) {
                    $(".popDateEdit .startTime").hide();
                    $(".popDateEdit .endTime").hide();
                } else {
                    $(".popDateEdit .startTime").show();
                    $(".popDateEdit .endTime").show();
                    setupTimeFields($(".popDateEdit .startTime"), event.start);
                    setupTimeFields($(".popDateEdit .endTime"), event.end);
                }

                if (event.title) {
                    $(".popDateEdit .title").val(event.title);
                }
                if (event.record_event) {
                    $(".popDateEdit .event").val(event.record_event);
                }
                if (event.destination) {
                    $(".popDateEdit .destination").val(event.destination);
                }
                if (event.is_agenda == "True") {
                    $(".popDateEdit .agenda:checkbox").attr("checked", "checked");
                }
                if (event.is_hint == "True") {
                    $(".popDateEdit .hint:checkbox").attr("checked", "checked");
                    $(".popDateEdit .hintDuration").val(event.hint_duration);
                    $(".popDateEdit .hintUnit").find("option").removeAttr("select");
                    var select = "option[value='" + event.hint_duration + "']";
                    $(".popDateEdit .hintUnit").find(select).attr("select", true);
                }
                if (event.is_email == "True") {
                    $(".popDateEdit .email:checkbox").attr("checked", "checked");
                    $(".popDateEdit .emailDuration").val(event.hint_duration);
                    $(".popDateEdit .emailUnit").find("option").removeAttr("select");
                    var select = "option[value='" + event.email_duration + "']";
                    $(".popDateEdit .emailUnit").find(select).attr("select", true);
                }

                $(".popDateEdit .return").unbind("click");
                $(".popDateEdit .return").click(function () {
                    popDateTips.show();
                });

                $(".popDateEdit .cancel").unbind("click");
                $(".popDateEdit .cancel").click(function () {
                    popDateEdit.hide();
                });

                //保存
                $(".popDateEdit .save").unbind("click");
                $(".popDateEdit .save").click(function () {

                    var start = string2Date($(".popDateEdit .startDate").val() + " " + $(".popDateEdit .startTime").val());
                    var end = string2Date($(".popDateEdit .endDate").val() + " " + $(".popDateEdit .endTime").val());

                    var affair = $(".popDateEdit .event").val();
                    var title = $(".popDateEdit .title").val();
                    var destination = $(".popDateEdit .destination").val();
                    var isHint = $(".popDateEdit .hint").attr("checked") ? true : false;
                    var hintDuration = 0;
                    var hintUnit = 0;
                    if (isHint) {
                        hintDuration = $(".popDateEdit .hintDuration").val();
                        hintUnit = $(".popDateEdit .hintUnit").val();
                    }
                    var isAgenda = $(".popDateEdit .agenda").attr("checked") ? true : false;
                    var isEmail = $(".popDateEdit .email").attr("checked") ? true : false;
                    var emailDuration = 0;
                    var emailUnit = 0;
                    if (isEmail) {
                        emailDuration = $(".popDateEdit .emailDuration").val();
                        emailUnit = $(".popDateEdit .emailUnit").val();
                    }
                    var e = { id: event.id, user_id: userId, title: title, destination: destination, record_event: affair, begin_date: parseDate(start), end_date: parseDate(end), is_agenda: isAgenda, is_email: isEmail, email_duration: emailDuration, email_unit: emailUnit, is_hint: isHint, hint_duration: hintDuration, hint_unit: hintUnit };
                    modCalendar(e, function (data) {
                        if (data.result == "True") {
                            e = affair2Event(e);
                            e.id = data.id;
                            e.start = start;
                            e.end = end;
                            calendar.fullCalendar('renderEvent', e, true // make the event "stick"
										        );
                        }
                        alert(data.msg);
                    });
                    popDateEdit.hide();
                });
                popDateTips.hide();
                popDateEdit.show();
            });
            return false;
        },
        selectable: true,
        selectHelper: true,
        //创建个人日历
        select: function (start, end, allDay, jsEvent, view) {

            var selectedElement = $(jsEvent.target);
            var popDateTips = $(".popDateTips");

            //判断是否是第一行
            var height = 20;

            //计算位置
            var l1;
            var l2;
            if (selectedElement.position().top < height) {
                $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 113 + popDateTips.height();
            } else {
                $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
            }

            l2 = selectedElement.offset().left - selectedElement.parents(".datePop").offset().left - popDateTips.width() - 95;
            if (popDateTips.is(":hidden")) {
                popDateTips.css({ "top": l1, "left": l2, "z-index": 999 }).show();
            } else {
                popDateTips.hide();
            }

            $(".popDateTips .del").hide();

            var time = "";

            //清空数据
            $(".popDateTips .popTipsArea").val("");

            if (allDay) {
                if (start.getTime() != end.getTime())
                    time = start.pattern("yyyy年MM月dd日(EE)") + "-" + end.pattern("yyyy年MM月dd日(EE)");
                else
                    time = start.pattern("yyyy年MM月dd日(EE)");
            } else
                time = start.pattern("yyyy年MM月dd日HH时") + "-" + end.pattern("HH时");

            //标题
            $(".popDateTips .time").text(time);
            $(".popDateTips .save").unbind("click");
            $(".popDateTips .save").click(function () {
                var event = $(".popDateTips .popTipsArea").val();
                var title = event;
                if (title) {
                    if (allDay) {
                        end.setTime(end.getTime());
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);
                    }
                    var e = { allDay: allDay, user_id: userId, title: title, record_event: event, begin_date: parseDate(start), end_date: parseDate(end) };
                    addSimpleCalendar(e, function (data) {
                        if (data.result == "True") {
                            e = affair2Event(e);
                            e.id = data.id;
                            e.start = start;
                            e.end = end;
                            calendar.fullCalendar('renderEvent', e, true);
                        }
                        alert(data.msg);
                    });
                }
                popDateTips.hide();
                calendar.fullCalendar("unselect");
            });
            $(".popDateTips .detail").unbind("click");
            $(".popDateTips .detail").click(function () {
                var popDateEdit = $(".popDateEdit");


                //清空数据
                $(".popDateEdit :text").val("");
                $(".popDateEdit textArea").val("");
                $(".popDateEdit :checkbox").removeAttr("checked");
                $(".popDateEdit select option").removeAttr("selected", "selected").eq(0).attr("selected", "selected");

                var datePattern = "yyyy-MM-dd";
                $(".popDateEdit .startDate").val(start.pattern(datePattern));
                $(".popDateEdit .endDate").val(end.pattern(datePattern));
                $(".popDateEdit .startDate").addClass("focus");
                $(".popDateEdit .endDate").addClass("focus");

                if (allDay) {
                    $(".popDateEdit .startTime").hide();
                    $(".popDateEdit .endTime").hide();
                } else {
                    $(".popDateEdit .startTime").show();
                    $(".popDateEdit .endTime").show();
                    setupTimeFields($(".popDateEdit .startTime"), start);
                    setupTimeFields($(".popDateEdit .endTime"), end);
                }

                $(".popDateEdit .return").unbind("click");
                $(".popDateEdit .return").click(function () {
                    popDateEdit.hide();
                    popDateTips.show();
                });
                $(".popDateEdit .cancel").unbind("click");
                $(".popDateEdit .cancel").click(function () {
                    popDateEdit.hide();
                });
                $(".popDateEdit .save").unbind("click");
                $(".popDateEdit .save").click(function () {
                    var start = string2Date($(".popDateEdit .startDate").val() + " " + $(".popDateEdit .startTime").val());
                    var end = string2Date($(".popDateEdit .endDate").val() + " " + $(".popDateEdit .endTime").val());
                    var event = $(".popDateEdit .event").val();
                    var title = event;
                    var destination = $(".popDateEdit .destination").val();
                    var isHint = $(".popDateEdit .hint").attr("checked") ? true : false;
                    var hintDuration = 0;
                    var hintUnit = 0;
                    if (isHint) {
                        hintDuration = $(".popDateEdit .hintDuration").val();

                        hintUnit = $(".popDateEdit .hintUnit").val();
                    }
                    var isAgenda = $(".popDateEdit .agenda").attr("checked") ? true : false;
                    var isEmail = $(".popDateEdit .email").attr("checked") ? true : false;
                    var emailDuration = 0;
                    var emailUnit = 0;
                    if (isEmail) {
                        emailDuration = $(".popDateEdit .emailDuration").val();
                        emailUnit = $(".popDateEdit .emailUnit").val();
                    }
                    if (allDay) {
                        end.setTime(end.getTime());
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);

                        start.setTime(start.getTime());
                        start.setHours(0);
                        start.setMinutes(0);
                        start.setSeconds(0);
                    }
                    var e = { user_id: userId, title: title, destination: destination, record_event: event, begin_date: parseDate(start), end_date: parseDate(end), is_agenda: isAgenda, is_email: isEmail, email_duration: emailDuration, email_unit: emailUnit, is_hint: isHint, hint_duration: hintDuration, hint_unit: hintUnit };
                    addCalendar(e, function (data) {
                        if (data.result == "True") {
                            e = affair2Event(e);
                            e.id = data.id;
                            e.start = start;
                            e.end = end;
                            calendar.fullCalendar('renderEvent', e, true // make the event "stick"
										            );
                        }
                        alert(data.msg);
                    });
                    popDateEdit.hide();
                });

                popDateEdit.show();
                popDateTips.hide();
            });
        },
        editable: true
    });
    var event;
    var eventsSource;
    getCalendar(uid,
                function (datas) {
                    var events = new Array();
                    $.each(datas.rows,
                        function (index, data) {
                            //由于fullcalendar的事件实体与本项目事件实体不符合，所以在此转化

                            data.start = string2Date(data.begin_date);
                            data.end = string2Date(data.end_date);
                            data.end_date = undefined;
                            data.begin_date = undefined;
                            data.allDay = isAllDay(data.start, data.end);
                            events.push(data);
                        });
                    eventsSource = {
                        events: events
                    };
                    calendar.fullCalendar('addEventSource', eventsSource);
                }
            );

    $(".dateTitle .iFresh").click(function () {
        getCalendar(uid,
                function (datas) {
                    var events = new Array();
                    calendar.fullCalendar('removeEventSource', eventsSource);
                    $.each(datas.rows,
                        function (index, data) {
                            //由于fullcalendar的事件实体与本项目事件实体不符合，所以在此转化

                            data.start = string2Date(data.begin_date);
                            data.end = string2Date(data.end_date);
                            data.end_date = undefined;
                            data.begin_date = undefined;
                            data.allDay = isAllDay(data.start, data.end);
                            events.push(data);
                        });
                    eventsSource = {
                        events: events
                    };
                    calendar.fullCalendar('addEventSource', eventsSource);
                }
            );
    });
});
