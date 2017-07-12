$(function () {
    var id = "";
    if (getQueryString("id") != null && getQueryString("id") != "undefined") {
        id = getQueryString("id");
    }
    ajaxfuncbyloadmsg("index_activity.axd", "{opertype:'activityindexpage',id:'" + id + "'}", ".event_plan", errorFunc, successFunc);
    function errorFunc(data) { alert("很抱歉，服务器繁忙！！！请稍后再试"); }
    function successFunc(data) {
        var strContent = "";
        if (data.result) {
            var imgPath = data.data.rootimgpath + "secitionpage/define.jpg";
            strContent += ("<h2 class='activity_index f-YH'>" + data.data.activity_name + "</h2>");
            strContent += ("<p class=\"event_plan_l\"><img src=\"" + imgPath + "\" width=245 height=223 ></p>");
            strContent += ("<div class=\"event_plan_r\">");
            strContent += ("<p><span>发起人：</span>" + data.data.create_name + "<i class=\"join_event_plan\">");
            if (data.data.cansingup === 0) {
                if (data.data.issignup === 1) {
                    strContent += ("<a class=\"join-button button\" >已经报名</a>&nbsp;&nbsp;");
                }
                else {
                    var d = new Date();
                    var d2 = new Date(data.data.report_end_datetime);
                    if (d2 === 'Invalid Date') {
                        strContent += ("<a class=\"join-button button\" >不允许报名</a>&nbsp;&nbsp;");
                    }
                    else {
                        if (d2 < d) {
                            strContent += ("<a class=\"join-button button\" >已过报名时间</a>&nbsp;&nbsp;");
                        }
                        else {
                            strContent += ("<a class=\"join-button button\" >不允许报名</a>&nbsp;&nbsp;");
                        }
                    }
                }
            }
            else {
                strContent += ("<a class=\"join-button button\" href=\"activity_signup.html?id=" + id + "\">参加活动</a>&nbsp;&nbsp;");
            }

            strContent += ("<a class=\"gay-button_110x28 button\" href=\"javascript:;\" onclick=\"copyUrl();\">复制活动链接</a></i></p>");
            strContent += ("<p><span>报名截止时间：</span>" + DateFormat(data.data.report_end_datetime, "yyyy-MM-dd") + "</p>");
            strContent += ("<p><span>活动时间：</span>" + DateFormat(data.data.begin_datetime, "yyyy-MM-dd") + "</p>");
            strContent += ("<p><span>活动地：</span>" + data.data.address + "</p>");
            strContent += ("<p><span>人数：</span>" + data.data.max_nbr + "</p>");
            //报名条件
            var vJoinConditions = "";
            if (data.data.JoinConditions != null && data.data.JoinConditions != "") {
                $.each(data.data.JoinConditions, function (i, msg) {
                    vJoinConditions += (msg.name + "：" + msg.value) + "&nbsp;/";
                });
                vJoinConditions = vJoinConditions.substr(0, vJoinConditions.length - 1);
            }
            if (vJoinConditions.length === 0) {
                vJoinConditions = "没有报名限制";
            }
            strContent += ("<p><span>报名条件：</span>" + vJoinConditions + "</p>");
            strContent += ("<p><span>初使费用：</span><i class=\"orange\">$" + data.data.prepay_nbr + "</i></p>");
            var vPayMethods = "";
            if (data.data.PayMethods != null) {
                $.each(data.data.PayMethods, function (i, msg) {
                    vPayMethods += (msg.pay_type_name + "&nbsp;/");
                });
                vPayMethods = vPayMethods.substr(0, vPayMethods.length - 1);

            }
            if (vPayMethods === "&nbsp;") {
                vPayMethods = "暂无缴费信息";
            }
            strContent += ("<p><span>缴费形式：</span>" + vPayMethods + "</p>");
            strContent += ("<p><span>报名方式：</span>" + data.data.apply_type_name + "</p>");
            strContent += ("</div>");
            $(".event_plan").html(strContent);
            $("#activityDes").html(data.data.description);
            //活动计划
            if (data.data.ActivityPlan != null && data.data.ActivityPlan != "") {
                strContent = ("<li><span class=\"ellipsis\">开始时间</span><span>结束时间</span><span>计划内容</span><span>备注</span></li>");
                $.each(data.data.ActivityPlan, function (i, msg) {
                    strContent += ("<li><span class=\"ellipsis\">" + msg.start_date + "</span><span>" + msg.end_date + "</span><span>" + msg.plan_content + "</span><span title=\"" + msg.note + "\">" + subPoints(msg.note, 24) + "</span></li>");
                });
                $("#ulactivityPlan").html(strContent);
            }
            //预算拟定
            if (data.data.ActivityBudget != null && data.data.ActivityBudget != "") {
                strContent = ("<li><span class=\"ellipsis\">缴费名目</span><span>详细描述</span><span>预算金额</span></li>");
                $.each(data.data.ActivityBudget, function (i, msg) {
                    strContent += ("<li><span class=\"ellipsis\">" + msg.item_content + "</span><span title=\"" + msg.item_description + "\">" + subPoints(msg.item_description, 30) + "</span><span>" + msg.budget_money + "</span></li>");
                });
                $("#ulactivityYusuan").html(strContent);
            }
            else {
                $("#ulactivityYusuan").html("<li>暂无预算信息</li>");
            }
        }
    }
});