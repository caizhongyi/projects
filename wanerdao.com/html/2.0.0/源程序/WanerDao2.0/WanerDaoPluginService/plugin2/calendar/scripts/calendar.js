/**
* 个人日历相关js脚本（暂时版本，3期将整合为一个jquery的控件）
* 
* 作者：徐蓓
* 时间: 2012/5/11 15:00
* 描述：个人日历相关js脚本
*/
$(function () {
    $(".datePop").css("display", "inherit");
    showDate('.normal');


    //初始化详细编辑中的时间选择框
    var times = initTimeFields(30);
    var s = "";
    for (var i = 0; i < times.length; i++) {
        s += "<option>" + times[i].pattern("HH:mm") + "</option>";
    }


    $(".popDateEdit .startTime").html(s);
    $(".popDateEdit .endTime").html(s);
    $("#datepicker").datepicker({
        onSelect: function (dateText, inst) {
            showDate(".normal");
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

            //计算位置
            //var l1 = selectedElement.offset().top - 95 - popDateTips.height();
            var l1;
            var l2 = parseInt($(selectedElement).parents(".fc-event").css("left")) + $(selectedElement).parents(".fc-event").width() / 2 - popDateTips.width() / 2;


            if (view.name == "month") {//如果当前是月
                if (selectedElement.offset().top < 130) {
                    $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 164 + popDateTips.height();
                } else {
                    $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
                }
            } else {//其他
                if (selectedElement.offset().top < 140) {
                    $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top + selectedElement.height() - 53;
                } else {
                    $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
                }
            }
            if (popDateTips.is(":hidden")) {
                popDateTips.css({ "top": l1, "left": l2, "z-index": 999 }).show();
            } else {
                popDateTips.hide();
            }

            $(".popDateTips .del").show();
            $(".popDateTips .del").unbind("click").click(function () {
                delCalendar(event.id, function (data, id) {
                    //alert(data.msg);
                    if (data.result) {
                        calendar.fullCalendar('removeEvents', id);
                    }
                });
                $(".popDateTips").hide();
            });

            //$("#dialog-simpleForm :input").val("");
            $(".popDateTips .popTipsArea").val("");
            var time = "";
            if (event.allDay) {
                if (event.end) {
                    time = event.start.pattern("MM月dd日(EE)") + "-" + event.end.pattern("MM月dd日(EE)");
                } else {
                    time = event.start.pattern("MM月dd日(EE)");
                }

            } else
                time = event.start.pattern("MM月dd日HH时mm分") + "-" + event.end.pattern("HH时mm分");

            //事件
            $(".popDateTips .popTipsArea").val(event.record_event);
            //标题事件
            $(".popDateTips .time").text(time);
            $(".popDateTips .save").unbind("click");
            $(".popDateTips .save").click(function () {
                var title = $(".popDateTips .popTipsArea").val();
                if (title) {
                    var end = event.end;
                    var start = event.start;
                    if (event.allDay && !end) {
                        end = new Date(start.getTime());
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);
                    } else {
                        end = event.end;
                    }
                    var e = { start: start, end: end, id: event.id, user_id: userId, title: title, record_event: title, begin_date: convertDateToWCFDate(start), end_date: convertDateToWCFDate(end) };
                    modSimpleCalendar(e, function (data) {
                        if (data.result) {
                            $.extend(event, e);
                            calendar.fullCalendar('updateEvent', event);
                        }
                    });
                }
                popDateTips.hide();
            });
            $(".popDateTips .detail").unbind("click");
            $(".popDateTips .detail").click(function () {
                var popDateEdit = $(".popDateEdit");


                //清空数据
                $(".popDateEdit :text").val("");
                $(".popDateEdit textArea").val("");
                $(".popDateEdit :checkbox").removeAttr("checked");
                $(".popDateEdit select.emailUnit option").removeAttr("selected", "selected").eq(0).attr("selected", "selected");
                $(".popDateEdit select.hintUnit option").removeAttr("selected", "selected").eq(0).attr("selected", "selected");

                var datePattern = "yyyy-MM-dd";
                $(".popDateEdit .startDate").val(event.start.pattern(datePattern));
                if (event.end) {
                    $(".popDateEdit .endDate").val(event.end.pattern(datePattern));
                } else {
                    $(".popDateEdit .endDate").val(event.start.pattern(datePattern));
                }

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
                if (event.is_agenda == "True" || event.is_agenda == true) {
                    $(".popDateEdit .agenda:checkbox").attr("checked", "checked");
                }
                if (event.is_hint == "True" || event.is_hint == true) {
                    $(".popDateEdit .hint:checkbox").attr("checked", "checked");
                    $(".popDateEdit .hintDuration").val(event.hint_duration);
                    $(".popDateEdit .hintUnit").find("option").removeAttr("selected");
                    var select = "option[value='" + event.hint_unit + "']";
                    $(".popDateEdit .hintUnit").find(select).attr("selected", "selected");
                }
                if (event.is_email == "True" || event.is_email == true) {
                    $(".popDateEdit .email:checkbox").attr("checked", "checked");
                    $(".popDateEdit .emailDuration").val(event.email_duration);
                    $(".popDateEdit .emailUnit").find("option").removeAttr("selected");
                    var select = "option[value='" + event.email_unit + "']";
                    $(".popDateEdit .emailUnit").find(select).attr("selected", "selected");
                }

                //保存
                $(".popDateEdit .save").unbind("click");
                $(".popDateEdit .save").click(function () {

                    var start = new Date($(".popDateEdit .startDate").val() + " " + $(".popDateEdit .startTime").val());
                    var end = new Date($(".popDateEdit .endDate").val() + " " + $(".popDateEdit .endTime").val());

                    if (event.allDay) {
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);

                        start.setHours(0);
                        start.setMinutes(0);
                        start.setSeconds(0);
                    }

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
                    var e = { start: start, end: end, id: event.id, user_id: userId, title: title, destination: destination, record_event: affair, begin_date: convertDateToWCFDate(start), end_date: convertDateToWCFDate(end), is_agenda: isAgenda, is_email: isEmail, email_duration: emailDuration, email_unit: emailUnit, is_hint: isHint, hint_duration: hintDuration, hint_unit: hintUnit };
                    modCalendar(e, function (data) {
                        if (data.result) {
                            $.extend(event, e);
                            calendar.fullCalendar('updateEvent', event);
                        }
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

            //计算位置
            //var l1;
            //var l2;
            //l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();

            //判断是否是第一行
            var l1;
            var l2;
            if (view.name == "month") {//如果当前是月
                if (selectedElement.position().top < 20) {
                    $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 113 + popDateTips.height();
                } else {
                    $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
                }
            } else {//其他
                if (selectedElement.offset().top < 150) {
                    $(".popFlag").css({ "bottom": "", "top": "-7px", "background": "url('images/popImg/popFlag_up.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top + selectedElement.height() - 53;
                } else {
                    $(".popFlag").css({ "bottom": "-7px", "top": "", "background": "url('images/popImg/popFlag.gif') no-repeat left top" });
                    l1 = selectedElement.offset().top - selectedElement.parents(".datePop").offset().top - 95 - popDateTips.height();
                }
            }
            switch (view.name) {
                case "month":
                    l2 = parseInt($(selectedElement).css("left")) + $(selectedElement).width() / 2 - popDateTips.width() / 2;
                    break;
                case "agendaWeek":

                    if ($(selectedElement).parents(".fc-event").length > 0) {
                        l2 = parseInt($(selectedElement).parents(".fc-event").css("left")) + $(selectedElement).width() / 2 - popDateTips.width() / 2 - 9; //60是x方向偏移
                    } else {
                        l2 = parseInt($(selectedElement).css("left")) + $(selectedElement).width() / 2 - popDateTips.width() / 2 - 9; //60是x方向偏移
                    }
                    break;
                case "agendaFivedayWeek":

                    if ($(selectedElement).parents(".fc-event").length > 0) {
                        l2 = parseInt($(selectedElement).parents(".fc-event").css("left")) + $(selectedElement).width() / 2 - popDateTips.width() / 2 - 9; //60是x方向偏移
                    } else {
                        l2 = parseInt($(selectedElement).css("left")) + $(selectedElement).width() / 2 - popDateTips.width() / 2 - 9; //60是x方向偏移
                    }
                    break;
                case "agendaDay":

                    l2 = 60 + $(selectedElement).width() / 2 - popDateTips.width() / 2; //60是x方向偏移
                    break;
            }


            popDateTips.css({ "top": l1, "left": l2, "z-index": 999 }).show();

            $(".popDateTips .del").hide();

            var time = "";

            //清空数据
            $(".popDateTips .popTipsArea").val("");

            if (allDay) {
                if (start.getTime() != end.getTime())
                    time = start.pattern("MM月dd日(EE)") + "-" + end.pattern("MM月dd日(EE)");
                else
                    time = start.pattern("yyyy年MM月dd日(EE)");
            } else
                time = start.pattern("MM月dd日HH时mm分") + "-" + end.pattern("HH时mm分");

            //标题
            $(".popDateTips .time").text(time);

            $(".popDateTips .save").unbind("click");
            $(".popDateTips .save").click(function () {
                var event = $(".popDateTips .popTipsArea").val();
                var title = event;
                if (title) {
                    if (!validateStrLng(title, 100)) {
                        hint(wanerdaoLangTip("app_00001"), $("#tipHint"));
                        return;
                    }

                    if (allDay) {//如果选择全天
                        end.setHours(23);
                        end.setMinutes(59);
                        end.setSeconds(59);

                        start.setHours(0);
                        start.setMinutes(0);
                        start.setSeconds(0);
                    }

                    var e = { start: start, end: end, allDay: allDay, user_id: userId, title: title, record_event: event, begin_date: convertDateToWCFDate(start), end_date: convertDateToWCFDate(end) };
                    addSimpleCalendar(e, function (data) {
                        if (data.result == "True") {
                            //e = affair2Event(e);
                            e.id = data.id;
                            calendar.fullCalendar('renderEvent', e, true);
                        }
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


                $(".popDateEdit .save").unbind("click");
                $(".popDateEdit .save").click(function () {
                    var start = new Date($(".popDateEdit .startDate").val() + " " + $(".popDateEdit .startTime").val());
                    var end = new Date($(".popDateEdit .endDate").val() + " " + $(".popDateEdit .endTime").val());
                    var event = $(".popDateEdit .event").val();
                    var title = $(".popDateEdit .title").val();
                    if (title) {
                        var destination = $(".popDateEdit .destination").val();

                        if (!validateStrLng(title, 100)) {
                            hint(wanerdaoLangTip("app_00001"), $("#editTip"));
                            return;
                        }
                        if (!validateStrLng(destination, 100)) {
                            hint(wanerdaoLangTip("app_00001"), $("#editTip"));
                            return;
                        }
                        if (!validateStrLng(event, 500)) {
                            hint(wanerdaoLangTip("app_00001"), $("#editTip"));
                            return;
                        }
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
                            end.setHours(23);
                            end.setMinutes(59);
                            end.setSeconds(59);

                            start.setHours(0);
                            start.setMinutes(0);
                            start.setSeconds(0);
                        }
                        var e = { start: start, end: end, user_id: userId, title: title, destination: destination, record_event: event, begin_date: convertDateToWCFDate(start), end_date: convertDateToWCFDate(end), is_agenda: isAgenda, is_email: isEmail, email_duration: emailDuration, email_unit: emailUnit, is_hint: isHint, hint_duration: hintDuration, hint_unit: hintUnit };
                        addCalendar(e, function (data) {
                            if (data.result == "True") {
                                e.id = data.id;
                                calendar.fullCalendar('renderEvent', e, true // make the event "stick"
										            );
                            }
                            //alert(data.msg);
                        });
                    }

                    popDateEdit.hide();
                    calendar.fullCalendar("unselect");
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

                            data.start = new Date(data.begin_date + " GMT");
                            data.end = new Date(data.end_date + " GMT");
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
                            data.start = new Date(data.begin_date + " GMT");
                            data.end = new Date(data.end_date + " GMT");
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
