<%@ Page Title="" Language="C#" MasterPageFile="~/WanerDaoMasterPage.master" AutoEventWireup="true" CodeFile="Activity_myactivity_settings.aspx.cs" Inherits="Activity_Activity_myactivity_settings" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<link href="../style/activity.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="main jz">
    	<div class="mCon relate" style="padding:0px 15px;">
        	<div class="main_share myactivity">
            	<div class="blank10px"></div>
                <div class="subChaTab">
                  <a href="#">活动信息</a>
                  <a href="#" class="active">我的活动</a>
                </div>
                <div class="blank10px"></div>                 
                 <div class="actTotal">
                	<a href="#" class="fuNow" onclick="getActivitybyClick(this,1)"><span>未来及现在活动</span><span id="newTotal">（78）</span></a> <a href="#" class="before" onclick="getActivitybyClick(this,2)"><span>历史活动</span><span id="oldTotal">（123）</span></a>
                </div>

                 <div class="box221 left">
                	<div class="">
                    	<div class="lsDtit lrArrow">
                        	<p id="searchTitle">未来及现在活动</p>
                  			<span id="pageid"><a href="javascript:void(0);"><img src="../images/none.gif" class='pre'/></a> <a href="javascript:void(0);"><img src="../images/none.gif" class='next hasMore'/></a></span>
                        </div>
                        <div class="actBox">
                        <ul class="actList" id="actList"> </ul>
                        </div>
                    </div>
                </div>


                <div class="box736 right myactSet" style="height:580px;">
                    <div class="myactSet">
                    	<div class="actTit icon_edit " id="activityname">活动名设置</div>
                        <div class="setCon">
                        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td>设定接收邮箱：<input type="text" id="txtcontact_email" class="txtInt" style="width:280px;"/></td>
                              </tr>
                              <tr>
                                <td>
                                <label for="check_1" class="labMarR">重要活动通知</label>
                                <input type="checkbox" class="vInput" id="is_email_event"  /><label for="check_2" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_event" /><label for="check_3">站内信息</label></td>
                              </tr>
                              <tr>
                                <td>
                               <label for="check_4" class="labMarR">订阅活动动态更新</label>
                                <input type="checkbox" class="vInput" id="is_email_updates" /><label for="check_5" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_updates" /><label for="check_6">站内信息</label>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                <label for="check_7" class="labMarR">订阅信息摘要</label>                                
                                <input type="checkbox" class="vInput" id="is_email_digest" /><label for="check_8" class="labMarR">邮件</label>
                                <input type="checkbox" class="vInput" id="is_notice_digest" /><label for="check_9">站内信息</label>
                               时间间隔： <input type="text" id="timeSpan"  class="txtInt tc labMarR" value="2011/12/12 - 2011/12/20" style="width:155px; color:#7F7F7F;"/>  

                                </td>
                              </tr>
                              <tr>
                                <td><label for="check_10">接受圈内人的即时信息</label></td>
                              </tr>
                              <tr>
                                <td>
                                	<div style="padding-left:16px" id="divNameList">
                                	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>例外名单：
                                    <select id="drpUserName"><option value=""></option></select> <input type="button" id="btnAdd" value="添加" class="button" /></td>
                                      </tr>
                                      <tr>
                                        <td><div class="select_pep_name">
                  <div id="selectNamelist" class="select_name_list clearfix" style="width:430px; display:none;" >
                   <img src="../images/this_pep.png" class="this_pep1">
                     </div>
                </div></td>
                                      </tr>
                                      <tr>
                                        <td id="tdBtn"><a href="#" class="btn_127x36">完成</a> <a href="#" class="btn_127x36_gray">取消</a>&nbsp;&nbsp;</td>
                                      </tr>
                                    </table>

                                	</div>
                                </td>
                              </tr>
                            </table>

                        </div>
                    </div>
                </div>
                <!--main end-->
                <div class="blank10px"></div>
            </div>
        </div>
    </div>
    <div class="mBtm jz"></div>
    <script src="../Scripts/activity/activity_common.js" type="text/javascript"></script>
    <script src="../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>    
    <script src="../Scripts/activity/activity_leftsidebar.js" type="text/javascript"></script> 
    <script type="text/javascript"> 
        var saveActivity_id = "";
        function getActivitySetting(activity_id, activityName) {
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
                $("#tdBtn").html("<a href=\"###\" type=\"btn\" class=\"btn_127x36\" onclick=\"saveActivitySetting()\">完成</a> <a href=\"###\" class=\"btn_127x36_gray\">取消</a>&nbsp;&nbsp;");
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
    </script>
</asp:Content>

