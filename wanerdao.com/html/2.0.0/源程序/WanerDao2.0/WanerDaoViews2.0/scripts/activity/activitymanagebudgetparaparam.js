//预算
var budgetValue = {
    "id": "76f4def14c4b467e9bf00953905df5ab",
    "activity_id": "deaae22fda02485d82a28389a29349ac",
    "item_description": "睡觉",
    "item_content": "睡觉",
    "is_in": true,
    "budget_money": 122.0,
    "conver_unit": 0,
    "cover_note": "",
    "create_id": "",
    "create_date": "2012/6/3 11:48:53",
    "budgetopts": [
               { "update_date": "2012/6/3 16:17:16",
                   "name": null, "id": "234"
               },
               { "update_date": "2012/6/3 16:17:16",
                   "name": null, "id": "789"
               }
           ]
};
var budgetcurid = "";
///预算列表
function getactvitybudgetpageformanage() {
    ajaxfunc("getactvitybudgetpageformanage_common.axd", "{opertype:'getactvitybudgetpageformanage',activityid:'" + activity_id + "',  pagecurrent:'1',pageSize: '50'}", errorFunc, function (data) {
        $("#tbbudgetlist").html("");
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
        $("#tbbudgetlist").html(v_content);
        var v_budgetgether = "预算总金额：" + budgetTotal + "$ 实际收总金额：0$ 实际支出总金额：0$ 结算金额：0$";
        $("#budgetgether").html(v_budgetgether);
    });
}

//活动财务设定
(function ($) {
    $.fn.basebudetparam = function () {
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
        //ui += '     <input type="text" class="text" value="1" id="txtactivitybudgetid" style="width:60px;" />';
        ui += '     <input type="text" class="text" id="txtactivitybudgetname" />';
        ui += '     &nbsp;预算金额&nbsp;<input type="text" class="text" id="txtactivitybudgetvalue" value="0"/>$';
        ui += '</dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">执行人：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="txtactivitybudgetexecuter" type="text" class="text" disabled="disabled"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">财务描述：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <textarea class="textarea" id="txtactivitybudgetmark" cols="69" rows="4"></textarea>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">&nbsp;</dd>';
        ui += ' <dd class="formMain">';
        ui += '     操作时间：<input id="tdactivitybudgettimer" type="text" class="text" disabled="disabled"/>';
        ui += '     财务人员：<input id="txtactivitybudgetpeople" type="text" class="text" disabled="disabled"/>';
        ui += '     <input id="btnactivitybudgetadd" type="button" value="添加预算名目" class="buttonG btn_w102 btn_h28 btnGary_102"/>';
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
                $("#txtactivitybudgetexecuter").val(data.data.name);
                $("#txtactivitybudgetpeople").val(data.data.name);
                $.cookies.set("txtactivitybudgetexecuter", data.data.name);
                $.cookies.set("txtactivitybudgetpeople", data.data.name);
            }
        });
        loadtimer();

        //预算编辑
        $("#tbbudgetlist tr td .listEdit").live("click",function(){
           $("#btnactivitybudgetadd").val("修改预算名目");
           var  objtr=$(this).parent().parent();
           budgetcurid=objtr.children().eq(1).attr("id");           
            var budgetname=objtr.children().eq(3).html();
            $("#txtactivitybudgetname").val(budgetname);            
            var budgetmark=objtr.children().eq(4).html();
            $("#txtactivitybudgetmark").val(budgetmark);            
            var budgetvalue=objtr.children().eq(5).html();
            $("#txtactivitybudgetvalue").val(budgetvalue);            
            var executerid=objtr.children().eq(6).attr("id");
            var executer=objtr.children().eq(6).html();
            $("#txtactivitybudgetexecuter").val(executer);            
            var financeid=objtr.children().eq(6).attr("id");
            var  financeer=objtr.children().eq(6).html();
            $("##txtactivitybudgetpeople").val(financeer);            
            var budgettimer=objtr.children().eq(8).html();
            $("#tdactivitybudgettimer").val(budgettimer);
        });
        //删除预算
         $("#tbbudgetlist tr td .listDel").live("click",function(){
               if (confirm("确定要删除吗")){
                  var  objtr=$(this).parent().parent();
                  budgetcurid=objtr.children().eq(1).attr("id"); 
                  //alert(budgetcurid);   
                 ajaxfunc("deleteactivitybudget_activity.axd", "{opertype:'deleteactivitybudget',budget_id:'" +budgetcurid+ "'}", errorFunc, function(){
                 });

               }
         });


        //添加、修改预算名目
        $("#btnactivitybudgetadd").click(function () {
            if ($("#txtactivitybudgetname").val()== '') { new pop({ typename: 'warning', msginfo: wanerdaoLangTip('active_00004')  });}
            else if ($("#txtactivitybudgetvalue").val()== '') { new pop({ typename: 'warning', msginfo: wanerdaoLangTip('active_00010')  });}
            else if ($("#btnactivitybudgetadd").val() == "添加预算名目") {editbudget('addactivitybudget');}
            else if ($("#btnactivitybudgetadd").val() == "修改预算名目") {editbudget('updateactivitybudget'); budgetinitialize();}
        });
    };
    function getcurrentbudget(){
         budgetValue.id=budgetcurid;
         budgetValue.activity_id=activity_id;
         budgetValue.budget_money= $("#txtactivitybudgetvalue").val();
         budgetValue.item_description=$("#txtactivitybudgetmark").val();
         budgetValue.item_content=$("#txtactivitybudgetname").val();
         budgetValue.is_in=true;
         budgetValue.create_date=$("#tdactivitybudgettimer").val();
     }
     function editbudget(opertype)
     {
            loadtimer();
               getcurrentbudget();
               $.ajax({
                        url: "addactivitybudget_activity.axd", type: 'POST',dataType: "json",
                        data: { opertype:opertype,value: $.toJSON(budgetValue)},
                        cache: false,  timeout: 60000,
                        error: function (data) {
                            alert(data.msg);
                        },
                        success: function (data) {
                            alert(data.msg);
                            getactvitybudgetpageformanage();
                        }
                    });
     }
     function budgetinitialize(){
           $("#btnactivitybudgetadd").val("添加预算名目");
            budgetcurid="";
            $("#txtactivitybudgetname").val("");
             $("#txtactivitybudgetmark").val("");
            var budgetvalue=objtr.children().eq(5).html();
            $("#txtactivitybudgetvalue").val(""); 
             $("#txtactivitybudgetexecuter").val("");
            $("##txtactivitybudgetpeople").val(""); 
 }
    function loadtimer() {
        $("#tdactivitybudgettimer").val(wanerdaoclienttimer("yyyy-MM-dd hh:mm:ss"));
    };
})(jQuery);