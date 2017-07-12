//收支项目
var moneyFlowValue = {
    "moneyflowopts": [{  //执行人员
        "name": null,
        "id": "123"
    },
        {
            "name": null,
            "id": "12345"
        }
        ],
    "moneyflowpayers": [{ //付款人
        "name": null,
        "id": "f3e27676f0974ef4a69c5528075a33eb"
    },
            {
                "name": null,
                "id": "12345"
            }],
    "id": "123",
    "activity_id": "123",
    "match_budget_id": "123",
    "item_content": "内容项",
    "description": "描述",
    "is_in": true,
    "sum_cost": 12.0,
    "money_ope_id": "123",
    "ope_date": "0001/1/1 0:00:00"
};
var moneyflowcurid = "";
///收支列表
function getactivitymoneyflowmanageforjson() {
    ajaxfunc("getactivitymoneyflowmanageforjson_activity.axd", "{opertype:'getactivitymoneyflowmanageforjson',moneyflowid:'" + activity_id + "',  pagecurrent:'1',pageSize: '50'}", errorFunc, function (data) {
        //alert($.toJSON(data));
        $("#tbMoneyList").html("");
        var v_content = ("<tr><th width=\"27\">&nbsp;</th><th width=\"32\">序号</th><th width=\"32\">附件</th><th width=\"90\">收支名目</th><th width=\"100\">描述</th><th width=\"70\">收支金额</th><th width=\"90\">计划执行人名</th><th width=\"60\">财务人名</th><th width=\"80\">修改时间</th>");
        if (isfinance == "1" || isSuperAdmin == "1") {
            v_content += ("<th class=\"lrArrow\"><a href=\"#\" class=\"pre\"></a><a href=\"#\" class=\"next hasMore\"></a></th>");
        }
        v_content += ("</tr>");
         var budgetTotal = 0;
        if (data.result == "True" && data.rows != null && data.rows != "") {
            $.each(data.rows, function (i, msg) {
                v_content += ("<tr>");
                v_content += ("<td align=\"center\"><img src=\"../images/icons/paper.png\" /></td>");
                v_content += ("<td id=\"" + msg.id + "\">" + (i + 1) + "</td>");
                v_content += ("<td align=\"center\"><img src=\"../images/icons/shuqian.png\" /></td>");
                v_content += ("<td>" + msg.item_content + "</td>");
                v_content += ("<td>" + msg.item_description + "</td>");
                budgetTotal = parseFloat(budgetTotal) + parseFloat(msg.budget_money)
                v_content += ("<td>" + msg.budget_money + "</td>");
                v_content += ("<td id=\"" + msg.create_id + "\">" + msg.username + "</td>");
                v_content += ("<td  id=\"" + msg.create_id + "\">" + msg.username + "</td>");
                v_content += ("<td>" + msg.create_date + "</td>");
                if (isfinance == "1" || isSuperAdmin == "1") {
                    v_content += ("<td><a href=\"javascript:void(0);\" class=\"listEdit\">&nbsp;</a> <a href=\"javascript:void(0);\" class=\"listDel\">&nbsp;</a></td>");
                }
                v_content += ("</tr>");
            });
        }
        $("#tbMoneyList").html(v_content);
        var v_budgetgether = "收支总金额：" + budgetTotal + "$ 实际收总金额：0$ 实际支出总金额：0$ 结算金额：0$";
        //$("#budgetgether").html(v_budgetgether);
    });
}

//活动财务设定
(function ($) {
    $.fn.moneyflowparam = function () { 
        return this.each(function () {
            var $this = $(this);
             $this.html(_dUI());
            _loadEvent();
        });
    };
    function _dUI() {
        var  ui= '<dl>';
        ui += ' <dd class="formTitle">收支明目:</dd>';
        ui += ' <dd class="formMain">';
        //ui += '     <input type="text" class="text" value="1" id="txtactivitymoneyflowid" style="width:60px;" />';
        ui += '     <input type="text" class="text" id="txtactivitymoneyflowname" />';
        ui += '     &nbsp;收支金额&nbsp;<input type="text" class="text" id="txtactivitymoneyflowvalue" value="0"/>$';
        ui += '</dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">执行人：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="txtactivitymoneyflowexecuter" type="text" class="text" disabled="disabled"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">财务描述：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <textarea class="textarea" id="txtactivitymoneyflowmark" cols="69" rows="4"></textarea>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">&nbsp;</dd>';
        ui += ' <dd class="formMain">';
        ui += '     操作时间：<input id="tdactivitymoneyflowtimer" type="text" class="text" disabled="disabled"/>';
        ui += '     财务人员：<input id="txtactivitymoneyflowpeople" type="text" class="text" disabled="disabled"/>';
        ui += '     <input id="btnactivitymoneyflowadd" type="button" value="添加收支名目" class="buttonG btn_w102 btn_h28 btnGary_102"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
       
        return ui;
    }
    function _loadEvent() {
       _dEvent();
    }

    function _dEvent() {
        //获取用户信息
        ajaxfunc("create_activity.axd", "{opertype:'getcreateactivitypersonalinfo'}", function (data) {
        }, function (data) {
            if (data.result) {
                $("#txtactivitymoneyflowexecuter").val(data.data.name);
                $("#txtactivitymoneyflowpeople").val(data.data.name);
                $.cookies.set("txtactivitymoneyflowexecuter", data.data.name);
                $.cookies.set("txtactivitymoneyflowpeople", data.data.name);
            }
        });
        loadtimer();

        //收支编辑
        $("#tbmoneyflowlist tr td .listEdit").live("click",function(){
           $("#btnactivitymoneyflowadd").val("修改收支名目");
           var  objtr=$(this).parent().parent();
           moneyflowcurid=objtr.children().eq(1).attr("id");           
            var moneyflowname=objtr.children().eq(3).html();
            $("#txtactivitymoneyflowname").val(moneyflowname);            
            var moneyflowmark=objtr.children().eq(4).html();
            $("#txtactivitymoneyflowmark").val(moneyflowmark);            
            var moneyflowvalue=objtr.children().eq(5).html();
            $("#txtactivitymoneyflowvalue").val(moneyflowvalue);            
            var executerid=objtr.children().eq(6).attr("id");
            var executer=objtr.children().eq(6).html();
            $("#txtactivitymoneyflowexecuter").val(executer);            
            var financeid=objtr.children().eq(6).attr("id");
            var  financeer=objtr.children().eq(6).html();
            $("##txtactivitymoneyflowpeople").val(financeer);            
            var moneyflowtimer=objtr.children().eq(8).html();
            $("#tdactivitymoneyflowtimer").val(moneyflowtimer);
        });
        //删除收支
         $("#tbmoneyflowlist tr td .listDel").live("click",function(){
               if (confirm("确定要删除吗")){
                  var  objtr=$(this).parent().parent();
                  moneyflowcurid=objtr.children().eq(1).attr("id"); 
                  //alert(moneyflowcurid);   
                 ajaxfunc("deleteactivitymoneyflow_activity.axd", "{opertype:'deleteactivitymoneyflow',moneyflow_id:'" +moneyflowcurid+ "'}", errorFunc, function(){
                 });

               }
         });

        //添加、修改收支名目
        $("#btnactivitymoneyflowadd").click(function () {
            if ($("#txtactivitymoneyflowname").val()== '') { new pop({ typename: 'warning', msginfo: wanerdaoLangTip('active_00004')  });}
            else if ($("#txtactivitymoneyflowvalue").val()== '') { new pop({ typename: 'warning', msginfo: wanerdaoLangTip('active_00010')  });}
            else if ($("#btnactivitymoneyflowadd").val() == "添加收支名目") { editmoneyflow('addactivitymoneyflow'); }
            else if ($("#btnactivitymoneyflowadd").val() == "修改收支名目") {editmoneyflow('updateactivitymoneyflow'); moneyflowinitialize();}
        });
    };
    function getcurrentmoneyflow(){

    moneyFlowValue.activity_id=activity_id;;
    moneyFlowValue.description=$("#txtactivitymoneyflowmark").val();
   moneyFlowValue.id=moneyflowcurid;
   moneyFlowValue.item_content=$("#txtactivitymoneyflowname").val();
   moneyFlowValue.is_in==true;
          
          moneyFlowValue.sum_cost= $("#txtactivitymoneyflowvalue").val();
         
      
         moneyFlowValue.ope_date=$("#tdactivitymoneyflowtimer").val();

          
     }
     function editmoneyflow(opertype)
     {
            loadtimer();
               getcurrentmoneyflow();
               $.ajax({
                        url: "addactivitymoneyflow_activity.axd", type: 'POST',dataType: "json",
                        data: { opertype:opertype,value: $.toJSON(moneyFlowValue)},
                        cache: false,  timeout: 60000,
                        error: function (data) {
                            alert(data.msg);
                        },
                        success: function (data) {
                            alert(data.msg);
                            getactivitymoneyflowmanageforjson();
                             
                        }
                    });
     }
     function moneyflowinitialize(){
           $("#btnactivitymoneyflowadd").val("添加收支名目");
            moneyflowcurid="";
            $("#txtactivitymoneyflowname").val("");
             $("#txtactivitymoneyflowmark").val("");
            var moneyflowvalue=objtr.children().eq(5).html();
            $("#txtactivitymoneyflowvalue").val(""); 
             $("#txtactivitymoneyflowexecuter").val("");
            $("##txtactivitymoneyflowpeople").val(""); 
 }
    function loadtimer() {
        $("#tdactivitymoneyflowtimer").val(wanerdaoclienttimer("yyyy-MM-dd hh:mm:ss"));
    };
})(jQuery);