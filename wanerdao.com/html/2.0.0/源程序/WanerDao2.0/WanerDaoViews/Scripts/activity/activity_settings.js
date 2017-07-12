  var saveActivity_id = "";
  function activitySettings(activity_id, activityName) {
      $("#divInfor").hide();
      $("#myactSet").show();
            saveActivity_id = activity_id;
            $("#activityname").html(activityName + "_活动设置");
            $("#txtcontact_email").val(""); 
            $("#is_email_event").attr("checked", false);
             $("#is_notice_event").attr("checked", false);
            $("#is_email_updates").attr("checked", false);
            $("#is_notice_updates").attr("checked", false);
            $("#drpUserName").empty();
        var strUserContent="";
        $.ajax({
            url: "activitysetting_activity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getactivitysetting',activity_id:'" + activity_id + "'}",
            error: function (data) { },
            success: function (data) {
                if (data.rows) {
                    $("#txtcontact_email").val(data.rows[0].contact_email);
                    if (data.rows[0].is_email_event.toLowerCase() == "true") $("#is_email_event").attr("checked", true);
                    if (data.rows[0].is_notice_event.toLowerCase() == "true") $("#is_notice_event").attr("checked", true);
                    if (data.rows[0].is_email_updates.toLowerCase() == "true") $("#is_email_updates").attr("checked", true);
                    if (data.rows[0].is_notice_updates.toLowerCase() == "true") $("#is_notice_updates").attr("checked", true);
                }
                if (data.rowsUser) {
                    strContent = "<option  value=\"0\">请选择</option>";
                    $.each(data.rowsUser, function (i, msg) {                      
                        strUserContent += "<option  value=\"" + msg.user_ID + "\">" + msg.name + "</option>";
                    });
                    $("#drpUserName").html(strUserContent);
                }
                $("#tdBtn").html("<a href=\"###\" type=\"btn\" class=\"btn_127x36\" onclick=\"saveActivitySetting()\">完成</a> <a href=\"###\"   onclick=\"cancleactivitySetting()\"    class=\"btn_127x36_gray\">取消</a>&nbsp;&nbsp;");
            }
        })
    }
    var array = [];
    $("#btnAdd").click(function () {
        $("#selectNamelist").show();
        var name = $("#drpUserName").children('option:selected').text();
        var id = $("#drpUserName").children('option:selected').val();
        var obj1 = { id:"67", name:"87" };
        array.push(obj1);
        var content = "<span>" + name + "<a href=\"#\" onclick=\"deleteName(this)\"><img src=\"../images/del_pep.png\"></a></span>";
        $("#selectNamelist").append(content);

    });

    function deleteName(obj) {
        
      
        var parentobj = $(obj).parent();
        parentobj.remove();
    }

        function saveActivitySetting() { 
            var pars = "{opertype:'saveactivitysetting',activity_id:'" + saveActivity_id + "',contact_email:'" + $("#txtcontact_email").val() + "',is_email_event:'" + (!!($("#is_email_event").attr("checked")) == true ? "1" : "0") + "',is_notice_event:'" + (!!($("#is_notice_event").attr("checked")) == true ? "1" : "0") + "',is_email_updates:'" + (!!($("#is_email_updates").attr("checked")) == true ? "1" : "0") + "',is_notice_updates:'" + (!!($("#is_notice_updates").attr("checked")) == true ? "1" : "0") + "'}";
            $.ajax({
                url: "activitysetting_activity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: pars,
                error: function (data) { },
                success: function (data) {
                    alert("保存成功");
                }
            })
        }
   


         var value = {
             "id":'', //主键
             "user_id": wd_B.uin.uid, //
             "user_email": $("#txtcontact_email").val(), //用户邮箱地址
             "activity_id": saveActivity_id, //
             "is_kick_protected": false, //是否启动搭车踢人防护
             "kick_carpool_duration": "", //踢人防护周期
             "contact_email":$("#txtcontact_email").val(), //联系邮箱
             "is_email_event":!!($("#is_email_event").attr("checked")), //是否通过邮件接受重要通知
             "is_notice_event": !!($("#is_notice_event").attr("checked")) , //是否通过站内信息接受重要通知
             "is_email_updates": !!($("#is_email_updates").attr("checked")), //是否通过邮件接受即时更新
             "is_notice_updates": !!($("#is_notice_updates").attr("checked")), //是否通过站内信息接受即时圈子更新
             "is_email_digest": !!($("#is_email_digest").attr("checked")), //是否通过邮件接受圈子简要
             "is_notice_digest": !!($("#is_notice_digest").attr("checked")), //是否通过站内信息接受圈子摘要
             "digest_duration":$("#timeSpan").val(), //接受圈子更新简要时间间隔
             "is_allow_msg": true, //是否允许短消息
             "persons": [  //例外名单
                    {"id": "111121", "name": "人名1" },
				    { "id": "11112", "name": "人名2" },
                    { "id": "11113", "name": "人名3" }
			    ]
         };

         function update() {
             value.persons = array;
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
                     activityid: saveActivity_id,
                     userid: wd_B.uin.uid
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


         function cancleactivitySetting() {
             $("#divInfor").show();
             $("#myactSet").hide();
         }
  