/**
* 个人日历公用函数和全局变量
* 
* 作者：徐蓓
* 时间: 2012/9/12 21:41
* 描述：个人日历公用函数和全局变量
*
*/
var uid = getQueryString("uid"); //用户id

function initTimeFields(timeSpan) {
    var time = new Date();
    time.setFullYear(1999, 0, 1);
    time.setHours(0);
    time.setMinutes(0);
    var times = [time];
    for (var i = 1; time.getDate() < 2; i++) {
        time.setMinutes(time.getMinutes() + timeSpan);
        times[i] = new Date(time);
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
//api主url
var url = api.createUrl();

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

