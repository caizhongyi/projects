$(document).ready(initData);

function initData() {
    getMenu(4);
    getMyGroupMenu(3, true);
   
    setFinancialstatus();
    pagination(1);

    $('#txt_starttime').datetimepicker({
        showHour: false,
        showMinute: false,
        showTime: false,
        timeFormat: ''
    });

    $('#txt_endtime').datetimepicker({
        showHour: false,
        showMinute: false,
        showTime: false,
        timeFormat: ''
    });

}

function setFinancialstatus() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getmoney',group_id:'" + groupid + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {

            var ic = data.rows[0].m;
            var p;
            if (data.rows.length == 1) {
                p = data.rows[0].m;
            } else {
                p = data.rows[1].m;
            }
           
            $("#lab_income").html(ic);
            $("#lab_pay").html(p);
            $("#lab_settlement").html(ic - p);
            $("#lab_sreincome").html(ic);
            $("#lab_srepay").html(p);
            $("#lab_sresettlement").html(ic - p);
        }
    });
}


function showcurrent() {
    $("#addMoneyFlowDD").show();
    $("#sreachDIV").hide();
}

function showsreach() {
    $("#addMoneyFlowDD").hide();
    $("#sreachDIV").show();
}

var v_sre_name = "";
var v_sre_id = "";
var starttime = "";
var endtime = "";
function sreach_submit(i) {
    v_sre_name = $.trim($("#sre_name").val());
    v_sre_id = $.trim($("#sre_id").val());
    starttime = $("#txt_starttime").val();
    endtime = $("#txt_endtime").val();
    if (i == 1){
        pagination(1);
        setSreachFinancialstatus();
    } else {
        goPrint();
    }
}

function setSreachFinancialstatus() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getsremoney',group_id:'" + groupid + "',id:'" + v_sre_id + "',item_name:'" + v_sre_name + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.total == 2) {
                var ic = data.rows[0].m;
                var p = data.rows[1].m;
                $("#lab_sreincome").html(ic);
                $("#lab_srepay").html(p);
                $("#lab_sresettlement").html(ic - p);
            } else {
                $("#lab_sreincome").html(0);
                $("#lab_srepay").html(0);
                $("#lab_sresettlement").html(0);
            }

        }
    });
}




function pagination(currPage) {
    //基础配置
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: databind,
        pagermore: false,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'groupmoneyflow', //操作码,
                group_id: groupid,
                sre_name: v_sre_name,
                sre_id: v_sre_id,
                start_time: starttime,
                end_time: endtime
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
                msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            }
        }
    });


}


//分页数据绑定
function databind(data) {
    var box = $('#fList');
    box.empty();
    if (data.result && data.rows) {
        box.append("<li class='lsz_second'><dl><dt>序号</dt><dd class='w160'>流水名目</dd><dd class='w340'>描述</dd><dd>金额</dd><dd>交易人</dd><dd>操作人</dd><dd>时间</dd><dd>附件</dd></dl> </li>");
        $.each(data.rows, function (i, v) {
            var d = "&nbsp;";
            if (v.description != "") {
                d = v.description
            }
            var html = "<li class='lsz_third report'> <dl> <dt>" + v.id + "</dt><dd class='w160'>" + v.item_name + "</dd>"
                        + "<dd class='w340'>" + d + "</dd><dd>" + v.item_money + "</dd><dd id='ope" + i + "'></dd><dd>"
                        + v.name + "</dd>" + "<dd>" + v.ope_date + "</dd><dd id='attchment" + i + "'></dd></dl></li>";

            box.append(html);
            getflowpayer(i, v.id);
            getflowfile(i, v.id);
        });
    }
    liMousemoveSearch();
}

function getflowpayer(index,id){
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getflowpayer',flow_id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            var p ="";
            if (data.total == 0) {

            } else if (data.total == 1) {
                p = data.rows[0].name;
            } else {
                p = data.rows[0].name + "等" + data.total + "人";
            }
            $("#ope" + index).html(p);
        }
    });
}

function getflowfile(index,id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getflowattachedfile',flow_id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            var f ="" ;
            if (data.total != 0) {
                f = "<a href='" + data.rows[0].store_path + "'>附件</a>";
            }

            $("#attchment" + index).html(f);
        }
    });
}



function refFun() {
    if (roleLevel.indexOf("4") != -1 ) {
        $("#addMoneyFlowDD").load("../relationship/AddMoneyFlow.htm", "", function () {
            intiswfu("*.*", "financefile");
            var myDate = new Date();
            $("#operateTime").html(myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate());
            $("#operateUser").html(wd_B.uin.name);

            $("#btnpayUser").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00012', typename: 'group', groupid: groupid, elementid: 'btnaddmanager', callback: addpayUser }
                });
            });

            //  $("#addpay").overlay();

            $("#addexecutor").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00012', typename: 'group', groupid: groupid, elementid: 'btnaddmanager', callback: addexecutor }
                });
            });

            //$("#addexecutor").overlay();
        });
    }
}

function delFile(name,id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'delfile',filename:'" + name + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {

            if (data.result) {
                $("#" + id).remove();
            }
        }
    });
 }
function showAdd() {
    $("#MoneyFlowUL").show();
}

function cancelFlow() {
    $("#MoneyFlowUL").hide();
    $("#txt_itemname").val("");
    $("#sel_flowtype").val("1");
    $("#txt_money").val("");
    $("#sel_obj").val("1");
    $("#payUserDIV").html("");
    $("#txt_description").val("");
    $("#executorDIV").html("");
    $("#thumbnails").html("");
    changeType();
}
function changeType() {
    var v = $("#sel_flowtype").val();
    if (v == "2") {
        $("#payUser").hide();
        $("#payUserLi").hide();
        $("#executor").show();
        $("#executorLi").show();
        $("#sel_obj").hide();
    } else {
        $("#payUser").show();
        $("#payUserLi").show();
        $("#executor").hide();
        $("#executorLi").hide();
        $("#sel_obj").show();
    }
}

function changeobj() {
    if ($("#sel_obj").val() == "1") {
        $("#addpay").show();
        $("#payUserDIV").empty();
        $("#lab_item_money").show().html("");
    } else {
        $("#addpay").hide();
        $("#payUserDIV").empty().append("<span lang ='all'>全部</span>");
        $("#lab_item_money").hide();
    }
}

function delThisUser(obj) {
    $(obj).parent().remove();
    calculate();
}


function addpayUser(data) {
    $.each(data.group, function (i, v) {
        $("#payUserDIV").append("<span lang ='" + v.id + "'>" + v.name + "<a href='#' onclick='delThisUser(this)'><img src='../images/list/set_icon06.jpg' ></a></span>");
        });
     calculate();
}


function calculate() {
    var v = $("#sel_flowtype").val();
    if (v != "2") {
        if ($("#sel_obj").val() == "1") {
            var money = $("#txt_money").val();
            $("#lab_item_money").html($("#payUserDIV span").size() * money);
        }
    }
}
function addexecutor(data) {
    $.each(data.group, function (i, v) {
        $("#executorDIV").append("<span lang ='" + v.id + "'>" + v.name + "<a href='#' onclick='delThisUser(this)'><img src='../images/list/set_icon06.jpg' ></a></span>");
    });
   }

function goPrint() {
    if (starttime == "") {
        starttime = "1900-01-01";
    }
    if (endtime == "") {
        endtime = "2900-01-01"
    } else {
        alert(endtime)
    }
    var str = "{opertype:'groupprint',printfile:'groupfinance', printdatafile: 'GroupSQL', printdata_body2: 'groupmoneyflow', group_id: '" + groupid + "', sre_name: 'fuzque" + v_sre_name + "fuzque',sre_id:'fuzque" + v_sre_id + "fuzque',start_time:'" + starttime + "',end_time:'" + endtime + "' }";
    window.open("../Common/print.aspx?jsonparam=" + str);
}


function saveFlow() {
    var v = $("#sel_flowtype").val();
    var summoney = "";
    var sumpayer_nbr = "";
    var executor = "";
    var payUser = "";
    var files = "";
    var v = true;
    if ($.trim($("#txt_itemname").val()) == "") {
        $("#msgname").html(wanerdaoLangTip('relationship_00024'));
       
        v = false;
    } 
        if (v == "2") {
            summoney = $("#txt_money").val();
            $("#executorDIV span").each(function () {
                executor += $(this).attr("lang") + ","
            });
            if (executor == "") {
                $("#msgexecut").html(wanerdaoLangTip('relationship_00025'));
                v = false; 
            }
        } else {
            if ($("#sel_obj").val() == "1") {
                summoney = $("#lab_item_money").html();
                sumpayer_nbr = $("#payUserDIV span").size();
                $("#payUserDIV span").each(function () {
                    payUser += $(this).attr("lang") + ","
                });
                if (payUser == "") {
                    $("#msgpay").html(wanerdaoLangTip('relationship_00026'));
                    v = false;
                }
            } else {
                summoney = $("#txt_money").val();
                sumpayer_nbr = "all";
                payUser = "all";
            }
        }
        if (summoney == "" || summoney == "0") {
            $("#msgmoney").html(wanerdaoLangTip('relationship_00027'));
            v = false;
        } 
            $("#thumbnails i").each(function () {
                files += $(this).attr("lang") + ","
            });

            if (v) {
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'saveflow',group_id:'" + groupid + "',item_name:'" + $("#txt_itemname").val() + "',description:'" + $("#txt_description").val() + "',is_in:'" +
                $("#sel_flowtype").val() + "',is_per_payer:'" + $("#sel_obj").val() + "',payer_nbr:'" + sumpayer_nbr + "',item_money:'" + summoney + "',payUser:'" + payUser + "'," +
                "executor:'" + executor + "',files:'" + files + "'}",
                    error: function (data) {
                        alert("error")
                    },
                    success: function (data) {
                        pagination(1);
                        cancelFlow();

                    }
                });
            }
    
}
function liMousemoveSearch() {

    $("#report_list .report").each(function (i) {
        $(this).attr('order', i);
        $(this).mouseout(
		function () {
		    color = '#DFDFDF';
		    order = $(this).attr('order');
		    $("#report_list .report").each(
				function (j) {
				    if (order - j == 1) {
				        $(this).css('border-bottom', '1px solid ' + color);
				    }
				}
			);
		    $(this).css('border-bottom', '1px dashed ' + color);
		    $(this).css('background', '');
		    $(this).find('.inp_hf').hide();
		}
	);

        $(this).mouseover(
		function () {
		    color = '#5FB0D3';
		    order = $(this).attr('order');
		    $("#report_list .report").each(
				function (j) {
				    if (order - j == 1) {
				        $(this).css('border-bottom', '1px dashed ' + color);
				    }
				}
			);
		    $(this).css('border-bottom', '1px dashed ' + color);
		    $(this).css('background', '#EEF7FE');
		    $(this).find('.inp_hf').show();
		}
	);
    });

}