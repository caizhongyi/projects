$(function () {
    var id = "";
    if (getQueryString("id") != null && getQueryString("id") != "undefined") {
        id = getQueryString("id");
    }
    $.ajax({
        url: "index_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'activityindexpage',id:'" + id + "'}",
        error: function (data) { },
        success: function (data) {
            var vRootimgpath = data.rootimgpath;
            var vImgLogo = data.logo;
            var vImgSrc = "";
            if (vImgLogo != null && vImgLogo != "") {
                vImgSrc = vRootimgpath + vImgLogo;
            } else { vImgSrc = vRootimgpath + "secitionpage/define.jpg"; }

            var vPrepay_nbr = data.prepay_nbr;
            var vP_nbr = "";
            var max_nbr = "";
            if (data.max_nbr != "-1") max_nbr = data.max_nbr;
            if (vPrepay_nbr != null && vPrepay_nbr != "") {
                vP_nbr = "<i class='orange'>$" + data.prepay_nbr + "</i>";
            } else { vP_nbr = ""; }


            var vSingup = "<a href=\"activity_signup.html?id=" + id + "\"><img src=\"../images/activity/none.gif\" /></a>";
            // if (data.original_id == wd_B.uin.uid) {
            // vSingup = "<a href=\"###\">&nbsp;</a>";
            //  }
            if (data.cansingup == "0") {
                vSingup = "<a href=\"###\">&nbsp;</a>";
            }


            var strTitle = "<p><span>发起人：</span>" + data.create_name + "</p>"
                  + "<p><span>报名截止时间：</span>" + data.report_end_datetime + "</p>"   // DateFormat(data.report_end_datetime, 'yyyy/MM/dd') 
                  + "<p><span>活动时间：</span>" + data.begin_datetime + "</p>"
                  + "<p><span>活动地：</span>" + data.address + "</p>"
                  + "<p><span>人数：</span>" + max_nbr + "</p>"
                  + "<p><span>报名条件：</span>" + data.condition_name + "</p>"
                  + "<p><span>初使费用：</span>" + vP_nbr + "</p>"
                  + "<p><span>缴费形式：</span>" + data.pay_type_name + "</p>"
                  + "<p><span>报名方式：</span>" + data.apply_type_name + ""
                  + " <i class=\"join_event_plan\">" + vSingup + ""
                  + " <a href=\"#\" class=\"noneA\" onclick=\"copyUrl();\"><img src=\"../images/activity/none.gif\" /></a></i></p>";
            $("#activity_name").html(data.activity_name);
            $("#event_plan_r").html(strTitle);
            $("#activityDes").html(data.description);
            var strContent = "";
            if (data.ActivityPlan != null && data.ActivityPlan != "") {
                strContent += ("<table style='margin-left:22px;'>");
                strContent += ("<tr><td>开始时间</td><td>结束时间</td><td >计划内容</td><td style='padding-left:35px;'>备注</td></tr>");
                $.each(data.ActivityPlan, function (i, msg) {
                    strContent += ("<tr>");
                    strContent += ("<td  style='width:150px;'>" + msg.start_date + "</td>");
                    strContent += ("<td  style='width:150px;'>" + msg.end_date + "</td>");
                    strContent += ("<td >" + msg.plan_content + "</td>");
                    strContent += ("<td style='padding-left:35px;'>" + msg.note + "</td>");

                    strContent += ("</tr>");
                });
                strContent += ("</table>");
            }


            var strbudgetContent = "";
            if (data.ActivityBudget != null && data.ActivityBudget != "") {
                strbudgetContent += ("<table  style='margin-left:22px;'>");
                strbudgetContent += ("<tr><td style='width:150px;'>缴费名目</td><td style='width:150px;'>详细描述</td><td style='padding-right:15px;'>预算金额</td></tr>");
                $.each(data.ActivityBudget, function (i, msg) {
                    strbudgetContent += ("<tr>");
                    strbudgetContent += ("<td  style='width:150px;'>" + msg.item_content + "</td>");
                    strbudgetContent += ("<td  style='width:150px;'>" + msg.item_description + "</td>");
                    strbudgetContent += ("<td  style='padding-right:15px;'>" + msg.budget_money + "</td>");
                    strbudgetContent += ("</tr>");
                });
                strbudgetContent += ("</table>");
            }

            $("#activityPlan").html(strContent);
            $("#activityBudget").html(strbudgetContent);
            $("#activityImg").html("<img src=" + vImgSrc + " width='245' height='220' />");

        }
    });

});
