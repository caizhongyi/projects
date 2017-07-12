<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivityCreate.aspx.cs" Inherits="PluginDemo_ActivityCreate_ActivityCreate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var value = {
            "createtype": "1234561",  //发起活动者，如果XX为个人xx字符串就创建类型ID，如果为圈子创建，就是 “创建类型ID +|+圈子ID”
            "telephone": "15873181472",
            "email": "xubing@qq.com",
            "activityvisible": true,  // 是否可见

            "activityschedulelist": {
                "typeid": "1",
                "isdirectlybuild": "1", //是否直接创建
                "gapperiod": "1",
                "floatcycle": "", //浮动周期，用‘，’分隔
                "tellemail": true,
                "tellinbox": false,
                "emaildates":"2",
                "inboxdates":"-2"
                 },

            "placeset": {
                "countryid": "74ed9496-ea4c-11e0-8606-00306701b527",
                "provinceid": "11111",
                "cityid": "00007afa-f4b4-11e0-b192-00306701b527",
                "zip": "0100",
                "addr": "地址一"
            },
            "activitybegintime": "2012/2/11 18:33:19",
            "activityendtime": "2012/2/12 18:33:19",
            //"activitydays": 3,
            "activitytags": [
								{
								    "id": "123", //id:为分类ID
								    "name": "棒球"
								},
								{
								    "id": "1234",
								    "name": "篮球"
								}
					],
            //"activitytitle": "活动标题", 
            "activityname":"地图查找用(2)9-3",
            "activitydesc": "描述",
            "plan": [
							{
							    "starttime": "2012/2/11 18:33:19",
							    "endtime": "2012/2/12 18:33:19",
							    "title": "计划1",
							    "desc": "描述"
							},
							{
							    "starttime": "2012/2/11 18:33:19",
							    "endtime": "2012/2/12 18:33:19",
							    "title": "计划2",
							    "desc": "描述"
							}
					],
            "activitylimit": 20, //活动人员限制
            "activityovertime": "2012/2/11 18:33:19", //报名结束日期
            "signuptype": "2", //报名方式
            "signuppass": "pass", //密码
            "protectpeople": 2,  //踢人保护时限 启动踢人保护   xx(如果xx为0标识不启用，否则xx就是启动踢人保护的天数)
            "activitycost": 0, //报名预交费用，允许支付总额一部分或者不交 ，现在默认为0，以后用于网页报名必须支付的数目。
            "pay_nbr": 12.0, // 报名支付总额
            "activitysubsistdesc": "预计费用说明",
            "pay_description": "报名最低缴费金额",
            "is_pay_need": true,// 是否必须交
            
            "limitcondition": [
								{
								    "id": "123",
								    //"name": "人品要求",
								    "value": "12"
								},
								{
								    "id": "123",
								    //"name": "人品要求",
								    "value": "12"
								}
					],
            "budget": [ 
							{
							    //"id": "1",
							    "receipt": "吃饭",
							    "budgetcost": 12.0,
							    //"executor": "11111", //执行人ID
							    "budgetdesc": "吃饭"
							},
							{
							    //"id": "2",
							    "receipt": "睡觉",
							    "budgetcost": 122.0,
							    // "executor": "11111", //执行人ID
							    "budgetdesc": "睡觉"
							}
					],
            "invite": {
                "isallgroup": false,
                "isallfriend":false,
                "groupinvite": [
				    { "id": "11111", "name": "圈子1" },
				    { "id": "11112", "name": "圈子2" }
			    ],
                "friendinvite": [
				    { "id": "11111", "name": "好友1" },
				    { "id": "11112", "name": "好友2" }
			    ]
            },
            "vehicletype": {
                "vehicletypeid": "11111",
                "isauto": true,
                "providercar": {
                    "ispermit": true,
                    //"bycarusers": null,
                    "carpooltypeid": "11111",
                    "carpoolmoney": 12.5,
                    "autobrandid": "11111",
                    "automodelid": "11111",
                    "autoplate": "110",
                    "autoyear": "2001",
                    "carpoolnbr": 4
                }
                //"bycar": null
            },
            "archivesname": "活动参数67",
            "committype": 0, //0 只保存活动 1 只保存参数 3都保存
            "paymethodsinfo": [
              {
                  "pay_type_id": "baeb9939-1515-11e1-b7d1-000c295f9365",
                  "pay_address": "abc",
                  "name": "中国银行",
                  "description": "中国银行",
                  "notice": "办卡人：**，办卡地址：**"
              },
              {
                  "pay_type_id": "baeb9939-1515-11e1-b7d1-000c295f9365",
                  "pay_address": "acb2",
                  "name": "中国银行",
                  "description": "中国银行",
                  "notice": "办卡人：**，办卡地址：**"
              }
           ]
        };

        function ActivityCreateTest2() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitycreatepage",
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

        function getjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitycreatepagetest"
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

        function TestJson() {
            var array = [];
            var obj1 = { id: "11", name: "11" };
            var obj2 = { id: "12", name: "12" };
            array.push(obj1);
            array.push(obj2);
            alert(array[1].name);

        }

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div> <input type="button" onclick="ActivityCreateTest2();" value="activityCreateTestJson" /></div>
    </div>

<div> <input type="button" onclick="getjson();" value="getCreateJson" /></div>
    </div>

    <div> <input type="button" onclick="TestJson();" value="otherTest" /></div>
    </div>

    </form>
</body>
</html>
