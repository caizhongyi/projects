        $(".rcLine .more").hover(function () {
            $(this).addClass("sMore");
            $(this).parent().parent().css("zIndex", "2");
        }, function () {
            $(this).removeClass("sMore");
            $(this).parent().parent().css("zIndex", "1");
        })
        $(".tim_mark_tale tr").hover(function () {
            $(this).addClass("active");
        }, function () {
            $(this).removeClass("active");
        })

        $(".actList li").click(function () {
            $(this).addClass("mHover").siblings().removeClass("mHover");
        })

        $(".actList li a").click(function (event) {
            event.stopPropagation();
        });

        $(".szList tr").hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        })

        $(".liftMap li").hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        })


        $(".dTit .iSmark a").click(function () {
            var conObj = $(this).parent().parent().parent().find(".dCon").eq(0);
            if ($(this).hasClass("down")) {
                $(this).removeClass("down");
                conObj.removeClass("hidden")
            } else {
                $(this).addClass("down");
                conObj.addClass("hidden")
            }
        })


        $("#ileavemessage").click(function () {
            if ($(this).hasClass("down")) {
             $(this).addClass("down");
                $(".hd_picpl_box_con").hide();
            } else {
                $(this).removeClass("down");
                $(".hd_picpl_box_con").show();
            }
        })

        $(".leaveMsg .msgCon").hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        })
	    $(".mydl .aSubReply").click(function(){
		    var showObj =  $(this).parent().parent().parent().find("dd").eq(2);
		    var showObjParent =  showObj.parent().parent();
		    showObj.removeClass("hidden");
		    showObjParent.addClass("on")
		
	    })
	    $(".replyMore .zs").click(function(){
		    var Obj =  $(this).parent().parent().parent();
		    var objParent = Obj.parent().parent();
		    Obj.addClass("hidden");
		    objParent.removeClass("on");
	    })

		$(".tim_mark_tale tr").live("mouseover", function () {
		    $(this).addClass("active");
		});
        
        $(".tim_mark_tale tr").live("mouseout", function () {
		    $(this).removeClass("active");
		});
    

    
        var value = {
            "activityid": "1111",
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
                "provinceid": "11111",
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



        var planValue = {
            "AcitivtyId": "1111",
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

          //var saveActivity_id = "";
           var countryid = "";
          var stateid = "";
          var cityid = "";
          var arrayobj = [];
          function editIndexShow(activityId) {
              $("#divActivityInfor").hide();
              $("#activityDes").hide();
              $("#activityIndexEdit").show();
              $("#divActivityDes").attr("style", "margin-top:0px");
          }

          function btnEditSave() {
              alert(saveActivity_id);
              value.activityid = saveActivity_id;
              value.activityname = $("#txtActivityName").val(),
              value.desc = $("#txtActivityIndex").val();
              value.placeset.addr = $("#txtArea").val(); 
              value.placeset.countryid = countryid;
              value.placeset.provinceid = stateid;
              value.placeset.cityid = cityid;
              value.placeset.zip = $("#txtZip").val();
                    
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

          function btnEditCancel() {
              $("#divActivityInfor").show();
              $("#activityDes").show();
              $("#activityIndexEdit").hide();
              $("#divActivityDes").attr("style", "");
          }
         $("#selectArea").click(function () {
             wanerdaoArea({
                 alphopts: { title: '地区选择框', id: 'tt', elementid: 'selectArea', callback: showdata }
             });
         });
 
        
         function showdata(data) {
             if (data.result) {
                 $("#txtactivitycountryName").val(data.country.name);
                 $("#txtactivitystateName").val(data.state.name);
                 $("#txtactivitycityName").val(data.city.name);
                 countryid = data.country.id;
                 stateid = data.state.id;
                 cityid = data.city.id;
             }
         }



         function getActivityInfor(activity_id, activityName) {
             $("#divActivityInfor").show();
             $("#activityDes").show();
             $("#activityIndexEdit").hide();
             $("#divActivityDes").attr("style", "");
             $("#divInfor").show();
             $("#myactSet").hide();
             saveActivity_id = activity_id;
             if (isType == "2") {
                 $(".aEdit").attr("class", "aEditHistory");
             }
             else if (isType == "1") {
                 $(".aEditHistory").attr("class", "aEdit");
             }

             // 活动简介
             var strContent = "";
             $.ajax({
                 url: "index_activity.axd",
                 type: "POST",
                 dataType: "json",
                 cache: false,
                 data: "{opertype:'getactivitymaininfoforjson',activityid:'" + activity_id + "'}",
                 error: function (data) { },
                 success: function (data) {
                     value = data.data;
                     var vPrepay_nbr = value.SignupInfo.cost;
                     var vP_nbr = "";
                     if (vPrepay_nbr != null && vPrepay_nbr != "") {
                         vP_nbr = vPrepay_nbr + "$";
                     } else { vP_nbr = ""; }
                     strContent += ("<dl>");
                     strContent += ("<dt><span class=\"linkArea\"><a href=\"#\"><img src=\"../images/activity/btn_copylink.png\" /></a> <a href=\"#\"><img src=\"../images/activity/btn_focus.png\" /></a></span><a href=\"#\" target=\"_blank\" class=\"fb f14\">" + value.activityname + "</a></dt>");
                     strContent += ("<dd class=\"myActOpera\">");
                     strContent += ("<b class=\"fcent\">关注度：</b> <i class=\"iCentBar\"><i style=\"width:12%;\"></i><em>12%</em></i>");
                     if (isType == "1") {
                         strContent += ("<a href=\"javascript:void(0);\" onclick=\"activitySettings('"+activity_id+"', '" + value.activityname + "')\" class=\"ico icon_1\" title=\"设置\"></a>");
                         strContent += ("<a href=\"javascript:void(0);\" class=\"ico icon_2\" title=\"打印\"></a>");
                         strContent += ("<a href=\"javascript:void(0);\"  onclick=\"editIndexShow('" + activity_id + "')\" class=\"ico icon_3\" title=\"编辑\"></a>");
                         strContent += ("<a href=\"javascript:void(0);\" class=\"ico icon_4\" title=\"退出\"></a>");
                         strContent += ("<a href=\"javascript:void(0);\" class=\"ico icon_5\" title=\"解散\"></a>");
                     }
                     strContent += ("</dd>");
                     strContent += ("<dd><b>活动地：</b>" + value.placeset.addr + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>活动时间：</b>" + getMonthAndDate(value.begintime) + "-" + getMonthAndDate(value.endtime) + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     if (value.activitytags != null) {
                         strContent += ("<b>活动分类：</b>" + value.creategroupname + "");
                     }
                     strContent += ("</dd>");
                     strContent += ("<dd><b>发起人：</b>" + value.createusername + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>创建时间：</b>" + value.createdatetime + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>联系电话：</b>" + value.createuserphone + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>邮箱：</b>" + value.createuseremail + "</dd>");
                     strContent += ("<dd><b>报名截止时间：</b>" + value.reportenddatetime + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>报名方式：</b>" + value.SignupInfo.typename + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     var vCondition = "无条件";
                     if (value.limitcondition != null) {
                         vCondition = "";
                         $.each(value.limitcondition, function (i, msg) {
                             vCondition += msg.name;
                         });
                     }
                     strContent += ("<b>报名条件：</b>" + vCondition + "</dd>");
                     //                    strContent += ("<dd><b>人数：</b>" + value.join_member_nbr + "/" + value.max_nbr + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>初始费用：</b>" + vP_nbr + "&nbsp;&nbsp;&nbsp;&nbsp;");
                     strContent += ("<b>缴费性质：</b>" + value.SignupInfo.paytypename + "</dd>");

                     $("#txtBmCreate").val(value.reportdatetime) //报名时间
                     $("#txtStartTime").val(value.begintime)  //开始时间
                     $("#txtEndTime").val(value.endtime)  //结束时间

                     var operName = "";
                     var financeName = "";
                     if (value.operationmanager != null) {
                         operName = value.operationmanager.name;
                     }
                     if (value.financialmanager != null) {
                         financeName = value.operationmanager.name;
                     }

                     strContent += ("<dd><b>管理员：</b>" + operName + "</dd>");
                     strContent += ("<dd><b>财务员：</b>" + financeName + "</dd>");
                     strContent += ("</dl>");
                     $("#aclickEdit").click(function () {
                         editIndexShow(activity_id);
                     });
                     var vActivityTag = ("<img src=\"../images/this_pep.png\" class=\"this_pep2\">");
                     if (value.activitytags != null) {
                         $.each(value.activitytags, function (i, msg) {
                             vActivityTag += ("<span style=\"width:auto;\"><a href=\"#\" id=\"" + msg.id + "\">" + msg.name + "</a><a href=\"#\"><img src=\"../images/del_pep.png\"></a></span>");
                         });
                     }

                     $("#divActivityTag").html(vActivityTag);
                     $("#txtActivityName").val(value.activityname);
                     //   $("#txtBmCreate").val(value.createTime); 报名时间
                     $("#divActivityInfor").html(strContent);
                     $("#activityDes").html(value.desc);
                     $("#txtActivityIndex").html(value.desc);
                     var vCost = ""; var vZip = "";
                     if (value.SignupInfo != null) {
                         vCost = value.SignupInfo.cost;
                     }
                     if (value.placeset != null) {
                         vZip = value.placeset.zip;
                         $("#txtArea").val(value.placeset.addr);
                         $("#txtZip").val(vZip);
                         countryid = value.placeset.countryid;
                         stateid = value.placeset.provinceid;
                         cityid = value.placeset.cityid;
                         $("#txtactivitycountryName").val(value.placeset.countryname);
                         $("#txtactivitystateName").val(value.placeset.provincename);
                         $("#txtactivitycityName").val(value.placeset.cityname);
                     }
                     $("#txtCost").val(vCost);
                 }
             });


             $("#tablecar").html("");
             //$("#signup").selfsignupparam();

             //获取活动计划
             getActivityPlan();

             //获取天气预报
             ajaxfunc("signup_activity.axd", "{opertype:'getactivityweatherinfojson', activityid: '" + activity_id + "'}", function (data) { }, function (data) {
                 weatherData = data.data;
                 var v_content = "";
                 if (weatherData != null) {
                     // var myDate = new Date();
                     // var currentYear = myDate.getYear();
                     // var currentYeah=myDate.getMonth()+1;      
                     // var currentDay=myDate.getDate();         
                     // var currentWeek=myDate.getDay()+1;
                     // var currentDate = currentYear + "-" + currentYeah + "-" + currentDay + "( 周" + currentWeek + ")"
                     // v_content += ("<li>");
                     // v_content += ("<i class=\"iInfo\">" + currentDate + "</i>");
                     // v_content += ("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
                     // v_content += ("<tr>");
                     // v_content += ("<td><img src=\"../images/activity/icon_weather.png\" /></td>");
                     // v_content += ("</tr>");
                     // v_content += ("</table>");
                     // v_content += ("<i class=\"iInfo\">" + weatherData.Current.condition + "  " + weatherData.Current.temp_c + "～" + weatherData.Current.temp_f + "  </i>"); //" + weatherData.Current.wind_condition + "
                     // v_content += ("</li>");
                     $.each(weatherData.Forecasts, function (i, msg) {
                         if (i < 3) {
                             v_content += ("<li>");
                             v_content += ("<i class=\"iInfo\">" + msg.DateTime + "(" + msg.day_of_week + ")</i>");
                             v_content += ("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
                             v_content += ("<tr>");
                             v_content += ("<td><img src=\"../images/activity/icon_weather.png\" /></td>");
                             v_content += ("</tr>");
                             v_content += ("</table>");
                             v_content += ("<i class=\"iInfo\">" + msg.condition + "  " + msg.low + "～" + msg.high + "  </i>");
                             v_content += ("</li>");
                         }
                     });
                 }
                 $("#myactWeather").html(v_content);
             });
             //获取参加人数
              getActivityMember(activity_id)

             //留言板
             getLeavmessage(activity_id);
         }



         function getActivityMember(aid) {
              $("#pageMemberid").myPagination({
                 callback: getMemberContent,
                 cssStyle: 'noll',
                 sidebarpage: true,
                 ajax: {
                     url: 'pop_common.axd',
                     param: {
                         pageSize: 5,
                         opertype: 'getactivitymemberpaging',
                         activityid: aid,
                         pagecurrent:1
                     }
                 },
                 info: {
                     first: '首页',
                     last: '尾页',
                     next: '下一页',
                     prev: '上一页',
                     first_on: true,
                     last_on: true,
                     next_on: true,
                     prev_on: true,
                     showpageno: false,
                     tipmsg: '第{tip}页',
                     msg_on: false,
                     link: '#',
                     msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                     text: {
                         width: '22px'
                     }
                 }

             });
         }

         function getMemberContent(data) {
             var strContent = "";  
             if ( data.result==true && data.rows != null && data.rows != "") {
                 $.each(data.rows, function (i, msg) {
                     strContent += ("<tr>");
                     strContent += ("<td width=\"32\"></td>");
                     strContent += ("<td width=\"54\"><img src=\"../images/activity/a1.gif\" width=\"38\" height=\"38\" /></td>");
                     strContent += ("<td width=\"68\"><span class=\"orange\">我自己</span></td>");
                     strContent += ("<td width=\"68\"><img src=\"../images/img/pic_poll2.jpg\" /></td>");
                     strContent += ("<td width=\"54\"><span class=\"lblue\">已交</span></td>");
                     strContent += ("<td width=\"110\">有车/愿意提供</td>");
                     strContent += ("<td width=\"68\">100公里</td>");
                     strContent += ("<td width=\"110\">火星出发地</td>");
                     strContent += ("<td width=\"68\">12/18</td>");
                     strContent += ("<td width=\"60\">");
                     strContent += ("<i class=\"iOpera\" onmouseout=\"this.className='iOpera'\" onmouseover=\"this.className +=' oCur';\">");
                     strContent += ("<i class=\"selName\" onclick=\"this.parentNode.className += ' oCur'\"></i>");
                     strContent += ("<p class=\"vMenu\">");
                     strContent += ("<a href=\"javascript:void(0);\" class=\"fb\">批准</a>");
                     strContent += ("<a href=\"javascript:void(0);\" class=\"\">拒绝</a>");
                     strContent += ("</p>");
                     strContent += ("</i>");
                     strContent += ("</td>");
                     strContent += ("<td><a href=\"javascript:void(0);\"><img src=\"images/activity/icon_edit.png\" /></a></td>");
                     strContent += ("</tr>");

                 });
                 strContent += ("<tr class=\"last\">");
                 strContent += ("<td width=\"32\"><input type=\"checkbox\" /></td>");
                 strContent += ("<td width=\"54\"><img src=\"../images/activity/a1.gif\" width=\"38\" height=\"38\" /></td>");
                 strContent += ("<td width=\"68\"><span class=\"orange\">周星驰</span></td>");
                 strContent += ("<td width=\"68\"><img src=\"../images/img/pic_poll1.jpg\" /></td>");
                 strContent += ("<td width=\"54\"><span class=\"red\">未交</span></td>");
                 strContent += ("<td width=\"110\">有车/愿意提供</td>");
                 strContent += ("<td width=\"68\">100公里</td>");
                 strContent += ("<td width=\"110\">火星出发地</td>");
                 strContent += ("<td width=\"68\">12/18</td>");
                 strContent += ("<td width=\"60\">");
                 strContent += ("<i class=\"iOpera\" onmouseout=\"this.className='iOpera'\" onmouseover=\"this.className +=' oCur';\">");
                 strContent += ("<i class=\"selName\" onclick=\"this.parentNode.className += ' oCur'\"></i>");
                 strContent += ("<p class=\"vMenu\">");
                 strContent += ("<a href=\"javascript:void(0);\" class=\"fb\">批准</a>");
                 strContent += ("<a href=\"javascript:void(0);\" class=\"\">拒绝</a>");
                 strContent += ("</p>");
                 strContent += ("</i>");
                 strContent += ("</td>");
                 strContent += ("<td>&nbsp;</td>");
                 strContent += ("</tr>");

             }
             $("#tblMember").html(strContent);
         }







         var setLayerCount = "2"; //回复层数
         var commentCount = '5'; // 每一层回复显示个数
         function getLeavmessage(pid) {
             $("#huifuid").myPagination({
                 callback: getContent,
                 ajax: { 
                 url: 'pop_common.axd',
                     param: {
                         pageSize: 5,
                         opertype: 'leavesinglemessage',
                         SetLayer: setLayerCount, //设置显示层数
                         CommentCount: commentCount, //每一层回复显示个数
                         active_posts_id: pid,
                         pagecurrent:1
                     }
                 },
                 info: {
                     first: '首页',
                     last: '尾页',
                     next: '下一页',
                     prev: '上一页',
                     first_on: true,
                     last_on: true,
                     next_on: true,
                     prev_on: true,
                     showpageno: false,
                     tipmsg: '第{tip}页',
                     msg_on: false,
                     link: '#',
                     msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                     text: {
                         width: '22px'
                     }
                 }

             });

             function getContent(data) {
                 //$('#totalMesage').html('(' + data.total + '条留言)');
                 var strContent = "";
                 if (data.result == true) {
                     strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));
                 }
                 $('#messageContent').html(strContent);
             }



             function appendHtml(Data, currentLayer, showLayer) {
                 var strContent = "";
                 if (parseInt(currentLayer) < parseInt(showLayer)) {
                     $.each(Data, function (i, msg) {
                         strContent += ("<div class=\"hdpj_g_box\">");
                         strContent += ("<ul>");
                         strContent += ("<li>");
                         strContent += ("<span class=\"hd_pj_leftex\"><a href=\"#\" class=\"blue\">" + msg.username + "</a>&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
                         strContent += ("</li>");
                         strContent += ("<li>" + msg.content + "</li>");
                         strContent += ("<li class=\"oInfo\">");
                         strContent += ("<p class=\"replyOpera\">");
                         rowsDate = msg.rows;
                         oneDate = "0";
                         varRowTotalCount = "0";
                         if (rowsDate != null && rowsDate != "") {
                             oneData = $.parseJSON(rowsDate);
                             varRowTotalCount = oneData.rowCount
                         }
                         strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
                         //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
                         //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
                         //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
                         //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
                         strContent += ("</p>");
                         strContent += ("<span class=\"pTime\">" + msg.createdate + "</span>");
                         strContent += ("</li>");
                         strContent += ("</ul>");
                         strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/talk_peo_img.png\" width=\"50\" height=\"50\" /></a></div>");
                         strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                         strContent += ("<div class=\"hd_picpl_box\">");
                         strContent += ("<ins></ins>");
                         strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:600px;'>");
                         strContent += ("<div class=\"picpl_form_box\">");
                         strContent += ("<div>");
                         strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
                         strContent += ("<input type=\"button\" name=\"button\" onclick=\"twoLeavelHuifu('" + msg.id + "')\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
                         strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
                         strContent += ("</div>");
                         strContent += ("</div>");
                         rowsDate = msg.rows;
                         if (rowsDate != null && rowsDate != "") {
                             $.each(oneData.data, function (j, oneMsg) {
                                 active_posts_id = oneMsg.active_posts_id;
                                 follow_id = oneMsg.follow_id;
                                 strContent += ("<div class=\"picpl_huif_box\">");
                                 strContent += ("<div class=\"huif_left\"><img src=\"../images/talk_peo_img.png\" width=\"37\" height=\"37\" /></div>");
                                 strContent += ("<div class=\"huif_right\" style=\"width:550px;\">");
                                 strContent += ("<div class=\"huif_text\">");
                                 strContent += oneMsg.content;
                                 strContent += ("</div>");
                                 strContent += ("<div class=\"huif_line\">");
                                 strContent += ("<span class=\"huif_time\">" + oneMsg.createdate + "</span>");
                                 strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
                                 strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
                                 strContent += ("</div>");
                                 strContent += ("</div>");
                                 strContent += ("</div>");
                             });
                             strContent += ("<div class=\"huif_more\">");
                             strContent += ("<div class=\"huif_colse_an\"><a href=\"###\" onclick=\"hideDetReply(this);\">收起</a></div>");
                             strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
                             strContent += ("</div>");
                         }
                         strContent += ("</div>");
                         strContent += ("</div>");
                         strContent += ("</div>");
                         strContent += ("<div class=\"xia_b_xian\"></div>");
                         strContent += ("</div>");
                     });
                 }
                 return strContent;
             }
         }


         $(".hdpj_g_box").live("mouseout", function () {
             $(this).removeClass("hdpj_mhover")
         }).live("mouseover", function () {
             $(this).addClass("hdpj_mhover")
         });

         $("a[type =hide]").live('click', function () {
             $(this).parent().hide();
             $parent = $(this).parent().prevAll();
             $.each($parent, function (i) {
                 var currentIndex = $(this).index();
                 if (currentIndex > parseInt(commentCount)) {
                     $(this).hide();
                 }
                 else {
                     $(this).show();
                 }
             });
         });
         function showDetReply(obj) {
             var reObj = $(obj).parent().parent().parent().parent().find(".hd_picpl_box_con").eq(0)
             var fObj = reObj.parent();
             if (reObj.hasClass("hidden")) {
                 $(obj).attr("title", "隐藏");
                 reObj.removeClass("hidden");
                 fObj.addClass("hdpj_on");
             }
             else {
                 reObj.addClass("hidden");
                 fObj.removeClass("hdpj_on");
                 $(obj).attr("title", "展开")
             }
         }
         function hideDetReply(obj) {
             var reObj = $(obj).parent().parent().parent().parent().parent();
             var fObj = reObj.parent();
             reObj.addClass("hidden");
             fObj.removeClass("hdpj_on");
         }

         function outspreadContent(obj, rowTotalCount, active_posts_id, follow_id) {
             var strContent = "";
             $.ajax({
                 url: "leavemessage_activity.axd",
                 type: "POST",
                 dataType: "json",
                 cache: false,
                 data: "{opertype:'displayleavemessage',active_posts_id:'" + active_posts_id +
                    "',follow_id:'" + follow_id + "',offsetcount:" + commentCount +
                     ",rcount:" + parseInt(parseInt(rowTotalCount) - parseInt(commentCount)) + "}",
                 error: function (data) { },
                 success: function (data) {
                     $.each(data.rows, function (i, msg) {
                         strContent += ("<div class=\"picpl_huif_box\">");
                         strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                         strContent += ("<div class=\"huif_right\" style=\"width:550px;\" >");
                         strContent += ("<div class=\"huif_text\">");
                         strContent += msg.content;
                         strContent += ("</div>");
                         strContent += ("<div class=\"huif_line\">");
                         strContent += ("<span class=\"huif_time\">" + msg.createdate + "</span>");
                         strContent += ("<span class=\"huif_huif\"><a href=\"###\">回复</a></span>");
                         strContent += ("<span class=\"huif_delete\"><a href=\"###\">删除</a></span>");
                         strContent += ("</div>");
                         strContent += ("</div>");
                         strContent += ("</div>");
                     });

                     $(obj).parent().parent().prev().after(strContent);
                     $(obj).hide();
                 }
             });
         }
         function oneLeavalHuifu() {
             var textfield = $("#textfield").val().replace(/\s/g, "");
             if (textfield != "") {
                 huifuAjax(saveActivity_id, "-1", textfield)
                 $("#textfield").val("");
             }
             else {
                 alert("请输入回复信息");
                 $("#textfield").focus();
             }
         }

         function twoLeavelHuifu(follow_id) {
             var textfield = $("#textTwofield").val().replace(/\s/g, "");
             if (textfield != "") {
                 huifuAjax(saveActivity_id, follow_id, textfield)
                 $("#textTwofield").val("");
             }
             else {
                 alert("请输入回复信息");
                 $("#textTwofield").focus();
             }
         }
         $("input[type=button][class=picpl_hf_an02]").live("click", function () {
             $(this).parent().children("input").eq(0).val("");
         });

         function huifuAjax(active_posts_id, follow_id, content) {
             var pars = "{opertype:'insertactivitycomments',active_posts_id:'" + active_posts_id + "',follow_id:'" + follow_id + "',user_id:'" + wd_B.uin.uid + "',content:'" + content + "'}";
             $.ajax({
                 url: "huifu_activity.axd",
                 type: "POST",
                 dataType: "json",
                 cache: false,
                 data: pars,
                 error: function (data) { },
                 success: function (data) {
                     if (data.msg == "恭喜，保存成功") {
                         alert("恭喜，保存成功！");
                         getLeavmessage(saveActivity_id);
                     }
                 }
             });
         }


         //编辑活动计划的显示与隐藏
         function editActivityplan() {
             $("#activityPlanEdit").attr("style", "display:''");
             $("#activityPlanView").attr("style", "display:none");
         }
         var isArrayID = "0";
         function updageactivityplanjson() {
             var plansstarttime = $("#txtStartPlanDate").val();
             var plansendtime = $("#txtEndPlanDate").val();
             var plansitle = $("#txtPlanTitle").val();
             var plansdesc = $("#txtPlanDes").val();
             if (isArrayID == "0") {
                 var obj1 = { "starttime": plansstarttime, "endtime": plansendtime, "title": plansitle, "desc": plansdesc, "id": "" }
                 arrayobj.push(obj1);
             }
             else {
                 arrayobj[isArrayID].starttime = plansstarttime;
                 arrayobj[isArrayID].endtime = plansendtime;
                 arrayobj[isArrayID].title = plansitle;
                 arrayobj[isArrayID].desc = plansdesc;
             }
             planValue.plans = arrayobj;
             updageactivityplanAjax();
         }

         function updageactivityplanAjax() {
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
                     getActivityPlan()
                 }
             });

         }


         function getActivityPlan() {
             $.ajax({
                 url: "pagination_activity.axd",
                 type: 'POST',
                 dataType: "json",
                 data: {
                     opertype: "getactivityplanmanageforjson",
                     activityid: saveActivity_id
                 },
                 cache: false,
                 timeout: 60000,
                 error: function (data) {
                     alert(data);
                 },
                 success: function (data) {

                     planValue = data.data;
                     var strContent = "";
                     var strContentView = "";
                     if (planValue != null) {
                         arrayobj = planValue.plans;
                         if (planValue.plans != null) {
                             if (isType == 1) {
                                 strContent = getPlanContent(arrayobj);
                             }
                             strContentView = getPlanContentView(arrayobj);
                         }
                     }
                     $("#activityPlan").html(strContentView);
                     $("#activityEditPlan").html(strContent);
                 }
             });
         }

         function getPlanContent(data) {
             var strContent = "";             
             $.each(data, function (i, msg) {
                 strContent += ("<tr>");
                 strContent += ("<td align=\"center\">" + msg.title + "</td>");
                 strContent += ("<td>" + msg.desc + "</td>");
                 strContent += ("<td>" + msg.starttime + "</td>");
                 strContent += ("<td>" + msg.endtime + "</td>");
                 strContent += ("<td width=\"120\">");
                 strContent += ("<p class=\"opera\">");
                 //strContent += ("<a href=\"javascript:void(0);\" class=\"icon_Up\" title=\"上\"></a>");
                 //strContent += ("<a href=\"javascript:void(0);\" class=\"icon_Down\" title=\"下\"></a>");
                 strContent += ("<a href=\"javascript:void(0);\" onclick=\"planSingleEdit('" + i + "','" + msg.id + "')\" class=\"icon_Edit\" title=\"编辑\"></a>");
                 strContent += ("<a href=\"javascript:void(0);\"  onclick=\"planSingleDel('" + i + "','" + msg.id + "')\"class=\"icon_Del\" title=\"删除\"></a>");
                 strContent += ("</p>");
                 strContent += ("</td>");
                 strContent += ("</tr>");
             });
             return strContent;
         }

         function getPlanContentView(data) {
             var strContent = "";
             $.each(data, function (i, msg) {
                 strContent += ("<tr>");
                 strContent += ("<td align=\"center\">" + msg.title + "</td>");
                 strContent += ("<td>" + msg.desc + "</td>");
                 strContent += ("<td>" + msg.starttime + "</td>");
                 strContent += ("<td>" + msg.endtime + "</td>");
                 strContent += ("</tr>");
             });
             return strContent;
         }

         function planSingleEdit(i, id) {
             $("#txtStartPlanDate").val("");
             $("#txtEndPlanDate").val("");
             $("#txtPlanTitle").val("");
             $("#txtPlanDes").val("");
             $("#txtStartPlanDate").val(arrayobj[i].starttime);
             $("#txtEndPlanDate").val(arrayobj[i].endtime);
             $("#txtPlanTitle").val(arrayobj[i].title);
             $("#txtPlanDes").val(arrayobj[i].desc);
            
             isArrayID =i;          
         }
         function planSingleDel(i, id) {
             arrayobj.splice(i, 1);
             planValue.plans = arrayobj;
             updageactivityplanAjax();
         }

         function setPlanNull() {
             $("#txtStartPlanDate").val("");
             $("#txtEndPlanDate").val("");
             $("#txtPlanTitle").val("");
             $("#txtPlanDes").val("");
             isArrayID = "0";
         }


        