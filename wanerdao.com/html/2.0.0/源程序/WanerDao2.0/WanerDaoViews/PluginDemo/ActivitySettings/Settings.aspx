<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Settings.aspx.cs" Inherits="Scripts_Plugin_ActivitySettings_Settings" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/OpenProjectPlugin/jquery.json-2.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var value = {
            "id": "31e7b77d4426421dacc01a1f68833cd8", //主键
            "user_id": "1111", //
            "user_email": "", //用户邮箱地址
            "activity_id": "1adf56b0d30d48b99f34657dfd2c0dd1", //
            "is_kick_protected": false, //是否启动搭车踢人防护
            "kick_carpool_duration": "", //踢人防护周期
            "contact_email": "", //联系邮箱
            "is_email_event": true, //是否通过邮件接受重要通知
            "is_notice_event": false, //是否通过站内信息接受重要通知
            "is_email_updates": false, //是否通过邮件接受即时更新
            "is_notice_updates": true, //是否通过站内信息接受即时圈子更新
            "is_email_digest": false, //是否通过邮件接受圈子简要
            "is_notice_digest": false, //是否通过站内信息接受圈子摘要
            "digest_duration": 0, //接受圈子更新简要时间间隔
            "is_allow_msg": true, //是否允许短消息
            "persons": [  //例外名单
                    {"id": "111121", "name": "人名1" },
				    { "id": "11112", "name": "人名2" },
                    { "id": "11113", "name": "人名3" }
			    ]
        };

        function update() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "updatepersongactivitysettings",
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

        function getpersongactivitysettingsjosnforjson() {
            $.ajax({
                url: "pagination_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getpersongactivitysettingsjosnforjson",
                    activityid: "1adf56b0d30d48b99f34657dfd2c0dd1",
                    userid: "1111"
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
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div> <input type="button" onclick="getpersongactivitysettingsjosnforjson();" value="获取活动参数" /></div>
        <br />
        <div> <input type="button" onclick="update();" value="活动参数修改" /></div>
    </div>
    </form>
</body>
</html>
