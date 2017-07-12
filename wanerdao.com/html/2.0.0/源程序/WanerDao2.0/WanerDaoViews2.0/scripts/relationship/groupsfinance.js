$(document).ready(initData);


function initData() {
    getMenu(4);
    existgroup(groupid, initDataT);

}


function initDataT() {
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
           // alert("error")
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

var vi;
function sreach_submit(i) {
    vi = i;
    existgroup(groupid, sreach_submitT);

}



function sreach_submitT() {
    v_sre_name = $.trim($("#sre_name").val());
    v_sre_id = $.trim($("#sre_id").val());
    starttime = $("#txt_starttime").val();
    endtime = $("#txt_endtime").val();
    if (vi == 1){
        pagination(1);
        setSreachFinancialstatus();
    } else {
        goPrint();
    }
}


function setSreachFinancialstatus() {
    existgroup(groupid, setSreachFinancialstatusT);

}



function setSreachFinancialstatusT() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getsremoney',group_id:'" + groupid + "',id:'" + v_sre_id + "',item_name:'" + v_sre_name + "'}",
        error: function (data) {
           // alert("error")
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

var vdata;
function databind(data) {
    vdata = data;
    existgroup(groupid, databindt);

}



//分页数据绑定
function databindt() {
    var data = vdata;
    var box = $('#fList');
    box.empty();
    if (data.result && data.rows) {
        box.append("<li class='lsz_second '><dl><dt style='width:75px'>序号</dt><dd style='width:200px'>流水名目</dd><dd  style='width:350px'>描述</dd><dd>金额</dd><dd>交易人</dd><dd>操作人</dd><dd>时间</dd></dl> </li>");
        $.each(data.rows, function (i, v) {
            var d = "&nbsp;";
            if (v.description != "") {
                d = v.description
            }
            var html = "<li class='lsz_third report'> <dl> <dt  style='width:75px' >" + v.id + "</dt><dd class='ellipsis' style='width:200px' >" + v.item_name + "</dd>"
                        + "<dd class='ellipsis' style='width:350px'>" + d + "</dd><dd>" + v.item_money + "</dd><dd id='ope" + i + "'></dd><dd>"
                        + v.name + "</dd>" + "<dd>" + v.ope_date + "</dd></dl>"
                        + "<ul class='report-detail'><li><span>流水名目：" + v.item_name + "</span></li>"
                        + "<li><span>描    述：" + d + "</span></li>"
                        + "<li><span>附    件：";
            var filepath = v.store_path.split(",");
           
            var filename = v.file_name.split(",");
            for (var pi = 0; pi < filepath.length; pi++) {
                html += "<a href='" + filepath[pi] + "'>" + filename[pi] + "</a>";
            }
            html += "</span></li></ul></li>";

            box.append(html);
            getflowpayer(i, v.id);
           // getflowfile(i, v.id);
        });
    }
    liMousemoveSearch();
}



function getflowpayer(vindex, vid) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getflowpayer',flow_id:'" + vid + "'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            var p ="";
            if (data.total == 0) {

            } else if (data.total == 1) {
                p = data.rows[0].name;
            } else {
                p = data.rows[0].name + "等" + data.total + "人";
            }
            $("#ope" + vindex).html(p);
        }
    });
}
var vindex1;
var vid1;
function getflowfile(index, id) {
    vindex1 = index;
    vid1 = id;
    existgroup(groupid, getflowfilet);

}


function getflowfilet() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getflowattachedfile',flow_id:'" + vid1 + "'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            var f ="" ;
            if (data.total != 0) {
                f = "<a href='" + data.rows[0].store_path + "'>附件</a>";
            }

            $("#attchment" + vindex1).html(f);
        }
    });
}

function refFun() {
    existgroup(groupid, refFunT);

}

function isitemname() {
    var itemname = $.trim($("#txt_itemname").val())
    if (itemname != "") {
        $("#msgname").html("");
    } else {
        $("#msgname").html(wanerdaoLangTip('relationship_00024'));
    }
}


function ismoney() {
    var money = $.trim($("#txt_money").val())
    if (money != "") {
        $("#msgmoney").html("");
    } else {
        $("#msgmoney").html(wanerdaoLangTip('relationship_00027'));
    }
}

function refFunT() {
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
var vname;
var vid3;
function delFile(name, id) {
    vname = name;
    vid3 = id;
    existgroup(groupid, delFileT);

}

function delFileT() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'delfile',filename:'" + vname + "'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {

            if (data.result) {
                $("#" + vid3).remove();
            }
        }
    });
 }
function showAdd() {
    $("#MoneyFlowUL").show();
}


function cancelFlow() {
    existgroup(groupid, cancelFlowt);

}


function cancelFlowt() {
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
    existgroup(groupid, changeTypeT);

}


function changeTypeT() {
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
    existgroup(groupid, changeobjT);

}


function changeobjT() {
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

var delobj;
function delThisUser(obj) {
    delobj = obj;
    existgroup(groupid, delThisUserT);

}

function delThisUserT() {
    $(delobj).parent().remove();
    calculate();
 
}

var vdata1;
function addpayUser(data) {
    vdata1 = data;
    existgroup(groupid, addpayUserT);

}

function addpayUserT() {
    var data = vdata1;
    $.each(data.group, function (i, v) {
        $("#payUserDIV").append("<span lang ='" + v.id + "'>" + v.name + "<a href='#' onclick='delThisUser(this)'><img src='../images/list/set_icon06.jpg' ></a></span>");
        });
    calculate();
    ispayuser();
}


function ispayuser() {
    var payUser = "";
    $("#payUserDIV span").each(function () {
        payUser += $(this).attr("lang") + ","
    });
    if (payUser == "") {
     //  $("#msgpay").html(wanerdaoLangTip('relationship_00026'));
    } else {
        $("#msgpay").html("");
    }
}

function calculate() {
    existgroup(groupid, calculateT);

}

function calculateT() {
    var v = $("#sel_flowtype").val();
    if (v != "2") {
        if ($("#sel_obj").val() == "1") {
            var money = $("#txt_money").val();
            $("#lab_item_money").html($("#payUserDIV span").size() * money);
        }
    }
}
var vdata2;
function addexecutor(data) {
    vdata2 = data;
    existgroup(groupid, addexecutorT);

}

function addexecutorT() {
    var data = vdata2;
    $.each(data.group, function (i, v) {
        $("#executorDIV").append("<span lang ='" + v.id + "'>" + v.name + "<a href='#' onclick='delThisUser(this)'><img src='../images/list/set_icon06.jpg' ></a></span>");
    });
   }

   function goPrint() {
       existgroup(groupid, goPrintT);

   }

function goPrintT() {
    if (starttime == "") {
        starttime = "1900-01-01";
    }
    if (endtime == "") {
        endtime = "2900-01-01"
    } else {
       // alert(endtime)
    }
    var str = "{opertype:'groupprint',printfile:'groupfinance', printdatafile: 'GroupSQL', printdata_body2: 'groupmoneyflow', group_id: '" + groupid + "', sre_name: 'fuzque" + v_sre_name + "fuzque',sre_id:'fuzque" + v_sre_id + "fuzque',start_time:'" + starttime + "',end_time:'" + endtime + "' }";
    window.open("../Common/print.aspx?jsonparam=" + str);
}

function saveFlow() {
    existgroup(groupid, saveFlowT);

}

function saveFlowT() {
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
                summoney = $("#txt_money").val();
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
                files += $(this).attr("lang") + ",,"
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
                       // alert("error")
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

$('.finance_lsz_list').on('mouseenter', 'li', function () {
    $(this).find('.report-detail').stop(true).slideDown();
}).on('mouseleave', 'li', function () {
    $(this).find('.report-detail').stop(true).slideUp();
})
}