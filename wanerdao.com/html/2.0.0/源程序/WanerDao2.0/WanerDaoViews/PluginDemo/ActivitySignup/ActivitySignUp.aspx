<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ActivitySignUp.aspx.cs" Inherits="PluginDemo_ActivitySignup_ActivitySignUp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var value = {
            "id": null,
            "recommenduserid":"1111",//推荐人ID
            "activityid": "b5812b975fac4ef697b50df3d52fc7a0",
            "userid": "12345", //如果不填 默认为当前登录用户
            "username": "用户名", //可不填写
            "roleid": "1111", //如果不填 默认为普通用户
            "rolename": "角色名", //可不填写
            "vehicletype": {
                "vehicletypeid": "11111",
                "isauto": true,
                "providercar": {
                    "ispermit": true,
                    "bycarusers": [
				        { "userid": "11111", "username": "乘车人名字1" },
				        { "userid": "11112", "username": "乘车人名字2" }
			        ],
                    "carpooltypeid": "11111",
                    "carpoolmoney": 12.5,
                    "autobrandid": "11111",
                    "automodelid": "11111",
                    "autoplate": "110",
                    "autoyear": "2001",
                    "carpoolnbr": 4
                },
                "bycar": {
                    "isneedcarpool": true,
                    "carpoolid":"",//搭车人号 如果不填写默认当前登录用户
                    "providercarpoolid": "11111" //车主人号
                }
            },
            "startaddress": {
                "address": "湖南省长沙市",
                "countryid": "11111",
                "stateid": "11111",
                "cityid": "11111",
                "zip": "0731"
            },
            "contact": {
                "phone": "15873181478",
                "email": "111@qq.com"
            },
            "paystatus": "11111",
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
            }
        };

        var bb = {};
        function ActivitySignup() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "activitysignup",
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
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div> <input type="button" onclick="ActivitySignup();" value="活动报名TEST" /></div>
    </div>
    </form>
</body>
</html>
