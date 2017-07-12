<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Manage.aspx.cs" Inherits="PluginDemo_AcitivityManage_Manage" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var value = {
            "activityid": "da19df6383864028933c7d0506d05d9c",
            "createuserid": "123456",
            "creategroupid": "",
            "createusername": "",
            "creategroupname": "",
            "activityname": "活动名字苏州11",
            "activitytags": [
                { "id": "1234", "name": "篮球" },
                { "id": "123", "name": "棒球" }
             ],
            "placeset": {
                "countryid": "74ed9496-ea4c-11e0-8606-00306701b527",
                "provinceid": "bed770fb-068e-11e1-a7b3-00306701b527",
                "cityid": "00007afa-f4b4-11e0-b192-00306701b527",
                "zip": "0100",
                "addr": "地址一11"
            },
            "operationmanager": [
                { "phone": "15873181472", "email": "xubing@qq.com", "id": "7404d5cea55942bfa15ee20adad547a9", "name": "用户名3" }
            ],
            "financialmanager": [
                { "phone": "15873181472", "email": "xubing@qq.com", "id": "84a7175e85f9460782ee4e18b681959b", "name": "用户名1" }
            ],
            "begintime": "2012/2/11 18:33:19",
            "endtime": "2012/2/12 18:33:19",
            "desc": "描述11",
            "reportdatetime": "2012/2/11 18:33:19",
            "SignupInfo": {
                "cost": 13.0,
                "paytypeid": "baeb9939-1515-11e1-b7d1-000c295f9365",
                "paytypename": "银行网上汇款",
                "paydesc": "预计费用说明",
                "subsistdesc": "缴费方式说明11",
                "typeid": "2",
                "typename": "密码验证加入",
                "pass": "pass"
            },
            "limitcondition": [
                  { "id": "123", "name": "经验要求", "value": "12" }
                  ],
            "iskick": true,
            "kickduration": 2.0,
            "remark": null
        };

        function update() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "updateactivitymaininfo",
                    value: $.toJSON(value)
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data.msg);
                },
                success: function (data) {
                    alert(data.msg);
                }
            });
        }

        function getactivitymaininfoforjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivitymaininfoforjson",
                    activityid: "da19df6383864028933c7d0506d05d9c"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                    value = data.data;
                }
            });
        }

        //计划
        var planValue = {
            "AcitivtyId": "624484458e104db0a65a586679be6e97",
            "plans": [{
                "starttime": "2012/2/11 18:33:19",
                "endtime": "2012/2/12 18:33:19",
                "title": "计划2",
                "desc": "描述",
                "id": "1a2d88a2e4794ab49028e1a549e695a3"
            },
             {
                 "starttime": "2012/2/11 18:33:19",
                 "endtime": "2012/2/12 18:33:19",
                 "title": "计划5",
                 "desc": "描述",
                 "id": ""
             }
            ]
        };
        function updageactivityplanjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "updageactivityplanjson",
                    value: $.toJSON(planValue)
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data.msg);
                },
                success: function (data) {
                    alert(data.msg);
                }
            });
        }

        function getactivityplanmanageforjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getactivityplanmanageforjson",
                    activityid: "624484458e104db0a65a586679be6e97"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                success: function (data) {
                    alert($.toJSON(data));
                    //value = data.data;
                }
            });
        }

        //天气预报
        var weatherData = {
            "Current": // 当天情况
            {
            "condition": "Clear", //天气情况
            "temp_c": "20", //温度 ℃
            "temp_f": "68", //
            "humidity": "Humidity: 56%", //湿度
            "wind_condition": "Wind: S at 9 mph", //风向风速
            "picPath": "http://www.google.com/ig/images/weather/sunny.gif"
        },
        "Forecasts": // 未来情况
            [{
                "condition": "Mostly Sunny", //天气情况
                "day_of_week": "Tue", //星期
                "low": "54", //最低温度
                "high": "81", //最高温度
                "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif", //
                "DateTime": "2012/4/18"//日期
            }, { "condition": "Partly Sunny",
                "day_of_week": "Wed",
                "low": "54", "high": "82",
                "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif",
                "DateTime": "2012/4/19"
            },
             { "condition": "Chance of Storm",
                 "day_of_week": "Thu",
                 "low": "50",
                 "high": "81",
                 "picPath": "http://www.google.com/ig/images/weather/chance_of_storm.gif",
                 "DateTime": "2012/4/20"
             },
              { "condition": "Mostly Sunny",
                  "day_of_week": "Fri",
                  "low": "52",
                  "high": "77",
                  "picPath": "http://www.google.com/ig/images/weather/mostly_sunny.gif",
                  "DateTime": "2012/4/21"
              }
               ]
    };
    function getweatherinfojson() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "getweatherinfojson",
                cityname: "Delran"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }

    function getactivityweatherinfojson() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "getactivityweatherinfojson",
                activityid: "da19df6383864028933c7d0506d05d9c"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }

    function getactivitymemberpaging() {
        $.ajax({
            url: "pop_common.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: 'getactivitymemberpaging',
                activityid: "d7d4204bebd94f01a95428d86fb285fa",
                pagecurrent: "1",
                pageSize: "3"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
            }
        });
    }
    function signoutactivity() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "signoutactivity",
                activityid: "b5812b975fac4ef697b50df3d52fc7a0",
                userid: "11111", //用户ID
                season: "1212", //退出原因
                superid: "12345", //接班人，没有接班人时可以不填
                opttype: "0" // 0:退出，1：解散
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }


    //预算
    var budgetValue = {
        "id": "76f4def14c4b467e9bf00953905df5ab",
        "activity_id": "deaae22fda02485d82a28389a29349ac",
        "item_description": "睡觉",
        "item_content": "睡觉",
        "is_in": true,
        "budget_money": 122.0,
        "conver_unit": 0,
        "cover_note": "",
        "create_id": "",
        "create_date": "2012/6/3 11:48:53",
        "budgetopts": [
               { "update_date": "2012/6/3 16:17:16",
                   "name": null, "id": "234"
               },
               { "update_date": "2012/6/3 16:17:16",
                   "name": null, "id": "789"
               }
           ]
    };
    function addactivitybudget() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "addactivitybudget",
                value: $.toJSON(budgetValue)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data.msg);
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }
    function updateactivitybudget() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "updateactivitybudget",
                value: $.toJSON(budgetValue)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data.msg);
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }

    function getactivitybudgetmanageforjson() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "getactivitybudgetmanageforjson",
                budgetid: "3d33f66da4d54e51848bbe629f83e380"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }

    //收支项目
    var moneyFlowValue = {
        "moneyflowopts": [{  //执行人员
            "name": null,
            "id": "123"
        },
        {
            "name": null,
            "id": "12345"
        }
        ],
        "moneyflowpayers": [{ //付款人
            "name": null,
            "id": "f3e27676f0974ef4a69c5528075a33eb" 
            },
            {
                "name": null,
              "id": "12345"
         }],
         "id": "123",
         "activity_id": "123",
         "match_budget_id": "123",
         "item_content": "内容项",
         "description": "描述",
         "is_in": true,
         "sum_cost": 12.0,
         "money_ope_id": "123",
         "ope_date": "0001/1/1 0:00:00"
    } ;
    function addactivitymoneyflow() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "addactivitymoneyflow",
                value: $.toJSON(moneyFlowValue)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data.msg);
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }
    function updateactivitymoneyflow() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "updateactivitymoneyflow",
                value: $.toJSON(moneyFlowValue)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data.msg);
            },
            success: function (data) {
                alert(data.msg);
            }
        });
    }

    function getactivitymoneyflowmanageforjson() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "getactivitymoneyflowmanageforjson",
                moneyflowid: "123"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }
    function selectbudgetsumandflowsum() {
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "selectbudgetsumandflowsum",
                activityid: "deaae22fda02485d82a28389a29349ac"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
                value = data.data;
            }
        });
    }
    function getactvitybudgetpageformanage() {
        $.ajax({
            url: "pop_common.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: 'getactvitybudgetpageformanage',
                activityid: "deaae22fda02485d82a28389a29349ac",
                pagecurrent: "1",
                pageSize: "3"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
            }
        });
    }

    function getcurrentcarowercustomlist() {
        $.ajax({
            url: "pop_common.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: 'getcurrentcarowercustomlist',
                activityid: "0affd21396624a47bd4ecdb69120c068",
                pagecurrent: "1",
                pageSize: "3"
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
                alert(data);
            },
            success: function (data) {
                alert($.toJSON(data));
            }
        });
    }

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div>
            <div>
                <input type="button" onclick="getactivitymaininfoforjson();" value="获取活动主要信息" /></div>
            <br />
            <div>
                <input type="button" onclick="update();" value="修改活动主要信息" /></div>
        </div>
        <br />
        <div>
            <div>
                <input type="button" onclick="getactivityplanmanageforjson();" value="获取活动计划" /></div>
            <br />
            <div>
                <input type="button" onclick="updageactivityplanjson();" value="修改活动计划" /></div>
        </div>
        <br />
        <div>
            <div>
                <input type="button" onclick="getweatherinfojson();" value="获取天气预报" /></div>
            <div>
                <input type="button" onclick="getactivityweatherinfojson();" value="获取活动天气预报" /></div>
            <br />
        </div>
        <br />
        <div>
            <div>
                <input type="button" onclick="getweatherinfojson();" value="获取搭车信息" /></div>
            <div>
                <input type="button" onclick="getactivityweatherinfojson();" value="修改搭车信息" /></div>
            <br />
        </div>
        <div>
            <input type="button" onclick="getactivitymemberpaging();" value="活动成员" /></div>
        <div>
            <input type="button" onclick="signoutactivity();" value="活动退出或者解散" /></div>
        <br />
    </div>
    <div>
        <div>
            <input type="button" onclick="getactivitybudgetmanageforjson();" value="获取某条预算信息" /></div>
        <div>
            <input type="button" onclick="addactivitybudget();" value="添加某条预算信息" /></div>
        <div>
            <input type="button" onclick="updateactivitybudget();" value="修改某条预算信息" /></div>
        <br />
    </div>
    <div>
        <div>
            <input type="button" onclick="getactivitymoneyflowmanageforjson();" value="获取某条收支项目" /></div>
        <div>
            <input type="button" onclick="addactivitymoneyflow();" value="添加某条收支项目" /></div>
        
    </div>
<div>
            <input type="button" onclick="selectbudgetsumandflowsum();" value="查询预算和收支额度统计" /></div>
        <br />
    <div>
        <div>
            <input type="button" onclick="getactvitybudgetpageformanage();" value="预算分页" /></div>
        <br />
    </div>

    <div>
        <div>
            <input type="button" onclick="getcurrentcarowercustomlist();" value="获取车主搭车成员" /></div>
        <br />
    </div>

    </form>
</body>
</html>
