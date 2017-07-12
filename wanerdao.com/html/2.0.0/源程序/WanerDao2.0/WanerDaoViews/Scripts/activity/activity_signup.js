     var id = ""; var otype = "{opertype:'{0}'}";
        if (getQueryString("id") != null && getQueryString("id") != "undefined") {
            id = getQueryString("id");
        }
        $(function () {
            $.ajax({
                url: "signup_activity.axd",
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

                    var strPlanContent = "";
                    if (data.ActivityPlan != null && data.ActivityPlan != "") {
                        strPlanContent += ("<table style='margin-left:55px;'>");
                        strPlanContent += ("<tr><td>开始时间</td><td>结束时间</td><td >计划内容</td><td style='padding-left:35px;'>备注</td></tr>");
                        $.each(data.ActivityPlan, function (i, msg) {
                            strPlanContent += ("<tr>");
                            strPlanContent += ("<td  style='width:150px;padding-top:15px'>" + msg.start_date + "</td>");
                            strPlanContent += ("<td  style='width:150px;padding-top:15px'>" + msg.end_date + "</td>");
                            strPlanContent += ("<td style='padding-top:15px' >" + msg.plan_content + "</td>");
                            strPlanContent += ("<td style='padding-top:15px;padding-left:35px;'>" + msg.note + "</td>");
                            strPlanContent += ("</tr>");
                        });
                        strPlanContent += ("</table>");
                    }
                    var strContent = "";
                    strContent += ("<div class=\"event_plan\">");
                    strContent += ("<p class=\"event_plan_l\"><img src=\"" + vImgSrc + "\" width=\"110\" height=\"100\"/></p>");
                    strContent += ("<div class=\"event_plan_r\">");
                    strContent += ("<h2>" + data.activity_name + "</h2>");
                    strContent += ("<table width=\"99%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
                    strContent += ("<tr height=\"22\">");
                    strContent += ("<td colspan=\"3\"><b>活动地点：</b>" + data.address + "</td>");
                    strContent += ("</tr>");
                    strContent += ("<tr height=\"22\">");
                    strContent += ("<td width=\"30%\"><b>发起人：</b>" + data.create_name + "</td>");
                    strContent += ("<td width=\"34%\"><b>报名截止时间：</b>" + data.report_end_datetime + "</td>");
                    strContent += ("<td width=\"36%\"><b>报名方式：</b>" + data.apply_type_name + "</td>");
                    strContent += ("</tr>");
                    strContent += ("<tr height=\"22\">");
                    strContent += ("<td><b>人数：</b>" + data.join_member_nbr + "/" + data.max_nbr + "</td>");
                    var vPrepay_nbr = data.prepay_nbr;
                    var vP_nbr = "";
                    if (vPrepay_nbr != null && vPrepay_nbr != "") {
                        vP_nbr = data.prepay_nbr + "$";
                    } else { vP_nbr = ""; }
                    strContent += ("<td><b>初始费用：</b>" + vP_nbr + "</td>");
                    strContent += ("<td><b>缴费性质：</b>" + data.pay_type_name + "</td>");
                    strContent += ("</tr>");
                    strContent += ("</table>");
                    strContent += ("</div>");
                    strContent += ("</div>");
                    strContent += ("<div class=\"blank10px\"></div>");
                    strContent += ("<p class=\"plan_info\"><span>报名条件：</span>" + data.value + "</p>");
                    strContent += ("<p class=\"plan_info\"><span>活动描述：</span>" + data.description + "</p>");
                    strContent += ("<p class=\"plan_info\"><span>活动计划：</span>" + strPlanContent + "</p>");
                    // strContent += ("<p class=\"plan_info\"><span>活动预算：</span>" + data.ActivityBudget + "</p>");
                    strContent += ("<p class=\"join_event_plan\"><a href=\"#\" onclick=\"displaysignup()\"><img src=\"../images/none.gif\"/></a> <a href=\"#\" class='noneA' onclick='copyUrl();'><img src=\"../images/none.gif\"/></a></p>");
                    $("#activityInfo").html(strContent);
                }
            });

            $.ajax({
                url: "index_activity.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getkeyvaluejsonallvehicletype'}",
                error: function (data) { },
                success: function (data) {
                    var strContent = "<option  value=\"-1\">请选择</option>";
                    if (data.result == true) {
                        $.each(data.data, function (i, msg) {
                            strContent += "<option  value=\"" + msg.id + "\">" + msg.value + "</option>";
                        });
                    }
                    $("#drpvehicletype").html(strContent);
                }
            });

            $(".select_pep_bot").inviter();
            $("#activity_signup_options").selfsignupparam();
            $("#selectArea").click(function () {
                wanerdaoArea({
                    alphopts: { title: '地区选择框', id: 'tt', elementid: 'selectArea', callback: showdata }
                });
            });

            //获取搭车费用
            ajaxfunc("create_activity.axd", otype.replace("{0}", "getkeyvaluejsonallcarpooltype"), function (data) { }, function (data) {
                bindDropDownList("takeFare", data.data, true);
            });

            //获取车牌
            ajaxfunc("signup_activity.axd", otype.replace("{0}", "getkeyvaluejsonallautobrand"), function (data) { }, function (data) {
                bindDropDownList("licensePlate", data.data, true);
            });

            //费用列表
            ajaxfunc("signup_activity.axd", "{opertype:'searchactivitybudgetbyactivityid',id:'" + id + "'}", function (data) { }, function (data) {
                var vContent = "";
                var vTotal = "0";
                $.each(data.ActivityBudget, function (i, msg) {
                    vTotal = parseFloat(vTotal) + parseFloat(msg.budget_money);
                    vContent += ("<tr>");
                    vContent += ("<td>");
                    vContent += ("<i><b>收支名目：</b>" + msg.item_content + "</i>");
                    vContent += ("<i><b>预算收支金额：</b>" + msg.budget_money + "$</i>");
                    vContent += ("<i><b>操作人名：</b>" + msg.username + "</i>");
                    vContent += ("<i><b>财务人名：</b>" + msg.username + "</i>");
                    vContent += ("</td>");
                    vContent += ("<td style=\"padding-left:35px;\" valign=\"bottom\">" + msg.create_date + "</td>");
                    vContent += ("</tr>");
                });
                $("#tbbudget").html(vContent);
                $("#totalMoney").html("金额计算：" + vTotal + "$");
                $("#emTotalMoney").html(vTotal + "$");
                $("#opePerson").html("");
            });


        });

        $("#takeFare").change(function () {
            var seletText = $(this).children('option:selected').text();
            if (seletText == "车主定价" || seletText == "cost based on auto owner") {
                $("[tt=feiyong]").show();
            }
            else {
                $("[tt=feiyong]").hide();
            }
        });

        $("#chkpersonAddress").click(function () {
            if ($("#chkpersonAddress").attr("checked") == true) {
                $("#pAddress").hide();
            }
            else {
                $("#pAddress").show();
            }
        });

        jQuery("#licensePlate").change(function () {
            if (jQuery(this).children('option:selected').val() !== "-2") {
                $("[tt=carinfor]").show();
                //获取车型
                ajaxfunc("signup_activity.axd", "{opertype:'getkeyvaluejsonallautomodelbybrandid',brandid:'" + jQuery(this).children('option:selected').val() + "'}", function (data) { }, function (data) {
                    bindDropDownList("model", data.data, true);
                });
            }
        });

     var address ="";
     var countryid ="";
     var stateid ="";
     var cityid = "";
     var v_CheckValue="";
     function showdata(data) {
         if (data.result) {
             //address = data.country.name + "  " + data.state.name + "  " + data.city.name;
                $("#txtactivitycountryName").val(data.country.name);
                $("#txtactivitystateName").val(data.state.name);
                $("#txtactivitycityName").val(data.city.name);
             countryid = data.country.id;
             stateid = data.state.id;
             cityid = data.city.id;
         }
     }
 
        function displaysignup() {
            if ($("#signup").is(":hidden")) { $("#signup").show(); }
            else { $("#signup").hide(); }
        }
        var vcategory_name = "活动";
        var value = {
            "id": null,
            "activityid": id,
            "userid": wd_B.uin.uid,
            "username": "",
            "roleid": "",
            "rolename": "",
            "vehicletype": {
                "vehicletypeid": $("#drpvehicletype").children('option:selected').val(),
                "isauto": $("#drpishavecar").children('option:selected').val() == "1" ? true : false,
                "providercar": {
                    "ispermit": $("#drpishavecar").children('option:selected').val() == "1" ? true : false,
                    "bycarusers": [
				        { "userid": "11111", "username": "乘车人名字1" },
				        { "userid": "11112", "username": "乘车人名字2" }
			        ],
                    "carpooltypeid":"",
                    "carpoolmoney":"0", //$("#carpooltypeid").val(),
                    "autobrandid":"",
                    "automodelid":"",
                    "autoplate":"",
                    "autoyear":"",
                    "carpoolnbr":"0" //$("#carpoolnbr").val()   
                },
                "bycar": {
                     "isneedcarpool": $("#drpnocar").children('option:selected').val() == "0" ? true : false,
                    "carpoolid":"",//搭车人号 如果不填写默认当前登录用户
                    "providercarpoolid": "" //车主人号
                }
            },
            "startaddress": {
                     "address": address,
                     "countryid": countryid,
                     "stateid": stateid,
                     "cityid": cityid,
                "zip": ""
            },
            "contact": {
                "phone":$("#txtPhone").val().replace(/\s/g,""),
                "email": $("#txtEmail").val().replace(/\s/g, "")
            },
            "paystatus": "11111",
            "invite": {
                "isallgroup": false,
                "isallfriend": false,
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
        function ActivitySignup() {
           value.activityid = id;
           value.userid = wd_B.uin.uid;
           value.startaddress.address=address;
           value.startaddress.countryid = countryid;
           value.startaddress.stateid = stateid;
           value.startaddress.cityid = cityid;
           value.startaddress.zip = ""
           value.contact.phone = $("#txtPhone").val().replace(/\s/g, "");
           value.contact.email = $("#txtEmail").val().replace(/\s/g, "");
           var vehicletypeid=$("#drpvehicletype").children('option:selected').val()
           if (vehicletypeid != -1) {
               value.vehicletype.vehicletypeid = $("#drpvehicletype").children('option:selected').val();
           }
           if (vehicletypeid == "0329e2cc-8ae2-11e1-a95e-101f74b66417") {
              var isauto=$("#drpishavecar").children('option:selected').val() == "1" ? true : false;
              value.vehicletype.isauto = isauto;
              if (isauto == true) {
                   var ispermit=$("#drphavecar").children('option:selected').val() == "1" ? true : false;
                   value.vehicletype.providercar.ispermit = ispermit;
                   if (ispermit == true) {
                       var takeFare = $("#takeFare").children('option:selected').val(); //
                       if (takeFare != "-2") {
                           value.vehicletype.providercar.carpooltypeid = takeFare;
                           if (value == "a0a72d9f-599e-11e1-9350-101f74b66417"){ //车主定价
                           $("#carpooltypeid").val()
                            value.vehicletype.providercar.carpoolmoney=$("#carpooltypeid").val();
                           }
                    }
                    var licensePlate = $("#licensePlate").children('option:selected').val();
                    if (licensePlate != "-2") {
                        value.vehicletype.providercar.autobrandid = licensePlate;
                        var model = $("#model").children('option:selected').val();
                        if (model == "-2") {
                            value.vehicletype.providercar.automodelid = model;
                            value.vehicletype.providercar.autoplate = $("#autoplate").val();
                        }
                    }
                    value.vehicletype.providercar.autoyear = $("#autoyear").val();
                    value.vehicletype.providercar.carpoolnbr = $("#carpoolnbr").val(); 
                   }
              }
               
           }
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
                   //{"result":false,"data":"\r\n        您已经已经参加了此活动\r\n    "}
                   if (data.result == false) {
                       alert(data.data);
                   } else if (data.result == true) {
                       alert(data.msg);
                   }
               }
           });
        }   
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            //是否选择汽车
                  $("#drpvehicletype").change(function () {
                      var seletText=$(this).children('option:selected').text();
                      if (seletText == "汽车" || seletText == "Bus") {
                          $("#spishavecar").show();
                          $("#drpishavecar").show();
                          $("#drphavecar").show();
                          $("#divSelectPerson").show();
                          $("#divSelectPersonCarInfor1").show();
                          $("#divSelectPersonCarInfor2").show();
                          $("[tt=carinfor]").hide();
                          $("[tt=feiyong]").hide();
                          $("#drpSelectPerson").show();

                      }
                      else {
                          $("#spishavecar").hide();
                          $("#drpishavecar").hide();
                          $("#drpishavecar").val("1");
                          $("#drphavecar").hide();
                          $("#drpnocar").hide();
                          $("#drpSelectPerson").hide();
                          $("#divSelectPerson").hide();
                          $("#divSelectPersonCarInfor1").hide();
                          $("#divSelectPersonCarInfor2").hide();
                          $("#divnocardache").hide();
                          $("[tt=carinfor]").hide();
                          $("[tt=feiyong]").hide();
                      }
                  });

            //选择汽车后，是否选择有车，无车
            $("#drpishavecar").change(function () {
                if ($(this).val() == "0") {  //无车
                    $("#drpnocar").show();
                    $("#drphavecar").hide();
                    $("#drpSelectPerson").hide();
                    $("#divSelectPerson").hide();
                    $("#divSelectPersonCarInfor1").hide();
                    $("#divSelectPersonCarInfor2").hide();
                    $("#divnocardache").show();
                    $("[tt=carinfor]").hide();
                    $("[tt=feiyong]").hide();
                    
                }
                else { //有车
                    $("#drphavecar").show();
                    $("#drpnocar").hide();
                    $("#drpSelectPerson").show();
                    $("#divSelectPerson").show();
                    $("#divSelectPersonCarInfor1").show();
                    $("#divSelectPersonCarInfor2").show();
                    $("#divnocardache").hide();
                    $("[tt=carinfor]").hide();
                    $("[tt=feiyong]").hide();
                }
            });

             

            //是否需要搭车
            $("#drpnocar").change(function () {
                if ($(this).val() == "0") {
                    $("#divnocardache").show();
                    $("#drpSelectPerson").hide();
                    $("#divSelectPerson").hide();
                    $("#divSelectPersonCarInfor1").hide();
                    $("#divSelectPersonCarInfor2").hide();
                }
                else {
                    $("#divnocardache").hide();
                    $("#drpSelectPerson").hide();
                    $("#divSelectPerson").hide();
                    $("#divSelectPersonCarInfor1").hide();
                    $("#divSelectPersonCarInfor2").hide();
                }
            });

           
            $("#drphavecar").change(function () {
                if ($(this).val() == "0") {
                    $("#drpSelectPerson").show();
                    $("#divSelectPerson").show();
                    $("#divSelectPersonCarInfor1").show();
                    $("#divSelectPersonCarInfor2").show();
                }
                else {
                    $("#drpSelectPerson").hide();
                    $("#divSelectPerson").hide();
                    $("#divSelectPersonCarInfor1").hide();
                    $("#divSelectPersonCarInfor2").hide();
                }
            }); 