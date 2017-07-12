$(function () {
    var id = "";
    if (getQueryString("id") != null && getQueryString("id") != "undefined") {
        id = getQueryString("id");
    }
    ajaxfuncbyloadmsg("index_activity.axd", "{opertype:'activityindexpage',id:'" + id + "'}", ".event_plan", errorFunc, successFunc);
    function errorFunc(data) { alert(wanerdaoLangTip('common_00082')); }
    function successFunc(data) {
        var strContent = "";
        if (data.result) {
            var imgPath = data.data.rootimgpath + "secitionpage/define.jpg";
            strContent += ("<h2 class='activity_index f-YH'>" + data.data.activity_name + "</h2>");
            strContent += ("<p class=\"event_plan_l\"><img src=\"" + imgPath + "\" width=245 height=223 ></p>");
            strContent += ("<div class=\"event_plan_r\">");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00041') + "：</span>" + data.data.create_name + "<i class=\"join_event_plan\">");
            if (data.data.cansingup === 1) {
                if (data.data.issignup === 1) {
                    strContent += ("<a class=\"join-button button\" >" + wanerdaoLangTip('active_00021') + "</a>&nbsp;&nbsp;");
                }
                else {
                    var d = new Date();
                    var d2 = new Date(data.data.report_end_datetime);
                    if (d2 === 'Invalid Date') {
                        strContent += ("<a class=\"join-button button\" >" + wanerdaoLangTip('active_00022') + "</a>&nbsp;&nbsp;");
                    }
                    else {
                        if (d2 < d) {
                            strContent += ("<a class=\"join-button button\" >" + wanerdaoLangTip('active_00023') + "</a>&nbsp;&nbsp;");
                        }
                        else {
                            strContent += ("<a class=\"join-button button\" >" + wanerdaoLangTip('active_00022') + "</a>&nbsp;&nbsp;");
                        }
                    }
                }
            }
            else {
                if (data.data.apply_pass.length > 0) {
                    strContent += ("<a class=\"join-button button\" id='pass'>" + wanerdaoLangTip('active_00086') + "</a>&nbsp;&nbsp;");
                }
                else {
                    strContent += ("<a class=\"join-button button\" href=\"activity_signup.html?id=" + id + "\">" + wanerdaoLangTip('active_00024') + "</a>&nbsp;&nbsp;");
                }
            }

            strContent += ("<a class=\"gay-button_110x28 button\" href=\"javascript:;\" onclick=\"copyUrl();\">" + wanerdaoLangTip('active_00025') + "</a></i></p>"); //复制活动链接
            strContent += ("<p><span>" + wanerdaoLangTip('active_00026') + "：</span>" + DateFormat(data.data.report_end_datetime, "yyyy-MM-dd") + " ~ " + DateFormat(data.data.begin_datetime, "yyyy-MM-dd") + "</p>");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00027') + "：</span>" + DateFormat(data.data.begin_datetime, "yyyy-MM-dd") + " ~ " + DateFormat(data.data.end_datetime, "yyyy-MM-dd") + "</p>");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00028') + "：</span>" + data.data.address + "</p>");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00029') + "：</span>" + data.data.join_member_nbr1 + "/" + data.data.max_nbr + "</p>");
            //报名条件
            var vJoinConditions = "";
            if (data.data.JoinConditions != null && data.data.JoinConditions != "") {
                $.each(data.data.JoinConditions, function (i, msg) {
                    vJoinConditions += (msg.name + "：" + msg.value) + "&nbsp;/";
                });
                vJoinConditions = vJoinConditions.substr(0, vJoinConditions.length - 1);
            }
            if (vJoinConditions.length === 0) {
                vJoinConditions = wanerdaoLangTip('active_00030');
            }
            strContent += ("<p><span>" + wanerdaoLangTip('active_00031') + "：</span>" + vJoinConditions + "</p>");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00032') + "：</span><i class=\"orange\">$" + data.data.prepay_nbr + "</i></p>"); // 初使费用
            var vPayMethods = "";
            if (data.data.PayMethods != null) {
                $.each(data.data.PayMethods, function (i, msg) {
                    vPayMethods += (msg.pay_type_name + "&nbsp;/");
                });
                vPayMethods = vPayMethods.substr(0, vPayMethods.length - 1);

            }
            if (vPayMethods === "&nbsp;") {
                vPayMethods = wanerdaoLangTip('active_00033');
            }
            strContent += ("<p><span>" + wanerdaoLangTip('active_00034') + "：</span>" + vPayMethods + "</p>");
            strContent += ("<p><span>" + wanerdaoLangTip('active_00035') + "：</span>" + data.data.apply_type_name + "</p>");
            strContent += ("</div>");
            $(".event_plan").html(strContent);
            $("a[id='pass']").click(function () {
               // alert(1);
                //弹出层如果正确设置成参加活动按钮
                new authorization({
                    params: {
                        keyid: id, //后台所要检索的ID
                        optype: 'checkauthorization', //操作码
                        urlaxd: 'index_activity.axd' //所用axd文件
                    },
                    callback: function (data) {
                        window.location.href = data.msg + id;
                    }
                });
            });
            $("#activityDes").html(subPoints(data.data.description, 480));
            //活动计划
            if (data.data.ActivityPlan != null && data.data.ActivityPlan != "") {
                strContent = ("<li><span class=\"ellipsis\">" + wanerdaoLangTip('active_00036') + "</span><span class=\"ellipsis\">" + wanerdaoLangTip('active_00037') + "</span><span class=\"ellipsis\">" + wanerdaoLangTip('active_00038') + "</span><span class=\"ellipsis\">" + wanerdaoLangTip('active_00039') + "</span></li>");
                $.each(data.data.ActivityPlan, function (i, msg) {
                    strContent += ("<li><span class=\"ellipsis\">" + msg.start_date + "</span><span class=\"ellipsis\">" + msg.end_date + "</span><span class=\"ellipsis\" title=\"" + msg.plan_content + "\">" + subPoints(msg.plan_content, 26) + "</span><span class=\"ellipsis\" title=\"" + msg.note + "\">" + subPoints(msg.note, 24) + "</span></li>");
                });
                $("#ulactivityPlan").html(strContent);
            }
            //预算拟定
            if (data.data.ActivityBudget != null && data.data.ActivityBudget != "") {
                strContent = ("<li><span class=\"ellipsis\">" + wanerdaoLangTip('active_00040') + "</span><span class=\"ellipsis\">" + wanerdaoLangTip('active_00042') + "</span><span class=\"ellipsis\">" + wanerdaoLangTip('active_00043') + "</span></li>");
                $.each(data.data.ActivityBudget, function (i, msg) {
                    strContent += ("<li><span class=\"ellipsis\" title=\"" + msg.item_content + "\">" + subPoints(msg.item_content, 15) + "</span><span class=\"ellipsis\" title=\"" + msg.item_description + "\">" + subPoints(msg.item_description, 30) + "</span><span class=\"ellipsis\">" + msg.budget_money + "</span></li>");
                });
                $("#ulactivityYusuan").html(strContent);
            }
            else {
                $("#ulactivityYusuan").html("<li>" + wanerdaoLangTip('active_00044') + "</li>");
            }
        }
    } 
});