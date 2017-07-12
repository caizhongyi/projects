
var oldimgpath;
var activityclass = "";
var activityclassname = "";
var blogclass = "";
var blogclassname = "";
var havepagination = false;
var haveactivity = false;
var isfirst = true;
var iseventfirst = true;
var isstyle = true;
$(document).ready(initData);

function initData() {
    getMenu(4);
    existgroup(groupid, initDataT);
}

function initDataT() {
    getgroupmanagetype(groupid);
    activitypagination("1", "0");
    getMyGroupMenu(1, false);
    setSelEvent();
    setPendingfilter();
    waitpagination();
    shareSetting();
    getGroupRoleforGroup(groupid, paginDiscuss);
}


function shareSetting() {
    $('li.sharetools').ShareTools({ showAcitivity: true, showGroup: false, showInformations: false, showBlog: true,
        activityHandler: function (data) {
            if (data) {
                activityclass = data.id;
                activityclassname = data.name;

            } else {
                activityclass = "";
                activityclassname = "";
            }
        },
        groupHandler: function (data) {

        },
        inforHandler: function (data) {

        },
        blogHandler: function (data) {
            if (data) {
                blogclass = data.id;
                blogclassname = data.name;
            } else {
                blogclass = "";
                blogclassname = "";
            }
        }
    });
}

function createActivity() {
    existgroup(groupid, createActivityT);
}


function createActivityT() {
    window.open("../Activity/Activity_create.aspx?gid=" + groupid);
}

var atype = "";

function activitySreach() {
    activitypagination("1",atype);
}
function activitypagination(currPage, type) {

    if (type == "0") {
        $("#activitymenu").addClass("tagf");
        $("#historyactivitymenu").removeClass("tagn");
    } else {
        $("#activitymenu").removeClass("tagf");
        $("#historyactivitymenu").addClass("tagn");
    }
    atype = type;


    $("#pageractivity").empty().myPagination({
        contentid: '.tips-panel', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: activitydatabind,
        //pagermore: true,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 3,
                opertype: 'getactivitybygroupidandactivitynameishistory',
                group_id: groupid,
                activity_name: $("#txt_activity_name").val(),
                ishistory: type
            }
        },
        info: {
            first_on: false,
            last_on: false,
            nextcls: 'next',
            next_on: false,
            prevcls: 'prev',
            prev_on: false,
            msg_on: false, //如果为true显示第几页以及总页数，否则不显示
            tipmsg: '第{tip}页'
        }
    });      
}

var vdata;
function activitydatabind(data) {
    vdata = data;
    existgroup(groupid, activitydatabindT);
}

function activitydatabindT() {
    var data = vdata;
    $('#activity_list').empty();
    if (data.result && data.rows) {
        var box = $('#activity_list');
        haveactivity = true;
        isfirst = false;
        $.each(data.rows, function (i, v) {
            var html = "<li class='h70 report'><div class='hd_tit'><span>" + v.begin_datetime + "</span><a href=\"javascript:viewActivity('" + v.id + "')\">" + v.activity_name + "</a> <font color='#cc0000'>(" + v.join_member_nbr + ")</font>" +
                       "</div><div class='hd_xx'><span class='mygroup_xq'><a href=\"javascript:viewActivity('" + v.id + "')\">查看详情</a>";
//            if (atype == "0") {
//                html += " | <a href=\"#\">加入</a>";
//            }

            html += "</span><i>活动地点：</i>" + v.address + "<i class='ml25'>预交金额：</i><a>$" + v.budget_cost + "</a> / <i>实际金额：</i><a>$" + v.actualcost + "</a></div></li>";
            box.append(html);
        });
        liMousemoveSearch();
    } else if (isfirst) {
        isfirst = false;
        activitypagination("1", "1");
    }
}


function viewActivity(activityid) {
    window.open("../activity/activity_index.html?id=" + activityid);
}


function paginDiscuss(currPage) {
    if (currPage == null) {
        currPage = "1";
    }
    //基础配置
    $(".discussPage").empty().myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: dataDiscussbind,
        pagermore: false,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'groupdiscuss',
                group_id: groupid,
                subject: $("#txt_Discusskey").val()
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
var vdata1;
function dataDiscussbind(data) {
    vdata1 = data;
    existgroup(groupid, dataDiscussbindT);
}

function dataDiscussbindT() {
    var data = vdata1;
    $('#discuss_list').empty();
    if (data.result && data.rows) {
        var box = $('#discuss_list');
        var varreplay = '';
        $.each(data.rows, function (i, v) {
            var html = "<li class='report'><img src=\"" + v.logo_small_path + "\"/><div class='report-detail'><div style='float:none' class='handle_view_pl cli_hf'>" +
                        "<font color='#0085C5'>" + v.name + "</font>&nbsp;&nbsp;&nbsp;" + v.subject + " <font color='#FF0000'></font></div>" +
                        "<div class='handle_view_con ' style='width:850px;' ><p>" + v.content + "</p></div>" +
                        "<div class='handle_view_data'>"+ v.post_date +"<span style='float:right;margin-right:10px'>  <a href='###' class='read-more'>查看更多</a>  <a href=\"javascript:options_reply('" + v.id + "')\">回复</a>  ";
            if (ismanagerforGroup || $.trim(v.user_id) == $.trim(wd_B.uin.uid)) {
                varreplay = 'group_' + v.id;
                html += "<a href=\"javascript:delDiscuss('" + v.id + "')\">删除</a>";
            }
            html += "</span></div> <div  class='replay-content' id='" + varreplay + "' style='display:none'></div></div></li>";
            box.append(html);
        });
        liMousemoveSearch();
    }
}


//回复功能
function options_reply(id) {
    $("#group_" + id).replycontent({
            second_disabled: true,
            posts_id: id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
            getreply:
            {
                getreplylistbyaxd: 'wandao_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                getreplyop: 'getgroupreply'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            deletereply:
            {
                delreplylistbyaxd: 'wandao_group.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                delreplyop: 'delgroupreply'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            addreply:
            {
                addreplylistbyaxd: 'wandao_group.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                addreplyop: 'addgroupreply'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            loadrecordlimit: 5, //加载条数限制
            replyconfig: {
                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        });
      
}


var discussid;
function delDiscuss(id) {
    discussid = id;
    existgroup(groupid, delDiscussT);
}

function delDiscussT() {
    new pop({ typename: 'confirm', msginfo: wanerdaoLangTip('relationship_00071'), callback: function () {
              $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'delgroupdiscuss',id:'" + discussid + "'}",
                error: function (data) {
                    // alert("error")
                },
                success: function (data) {
                    paginDiscuss("1");
                }
            });
    }
    });
}


function sreachpagination() {
    existgroup(groupid, sreachpaginationT);
}


function sreachpaginationT() {
    if ($("#waiteventmenu").hasClass("tagf")) {
        pagination(1);
    } else {
    eventrecord(1);
    }
}


function waitpagination() {
    if (!isstyle) {
        isstyle = true;
        setPendingfilter();
    }  
    pagination(1);
}

function recordeventrecord() {
    if (isstyle) {
        isstyle = false;
        setrecordfilter();
    }
    eventrecord(1);
    
}

function eventrecord(currPage) {
    $("#waiteventmenu").removeClass("tagf");
    $("#recordeventmenu").addClass("tagn");
    $('#events_List').empty();


    $("#eventpager").myPagination({
        contentid: '#events_List', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: datarecordbind,
        //pagermore: true,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 3,
                opertype: 'waitevent', //操作码
                user_id: wd_B.uin.uid,
                group_id: groupid,
                type: $("#sel_filterType").val(),
                sreachKey: $("#txt_sreachKey").val(),
                record: "true"
            }
        },
        info: {
            first_on: false,
            last_on: false,
            nextcls: 'next',
            next_on: false,
            prevcls: 'prev',
            prev_on: false,
            msg_on: false, //如果为true显示第几页以及总页数，否则不显示
            tipmsg: '第{tip}页'
        }
    });       

}

function pagination(currPage) {
    $("#waiteventmenu").addClass("tagf");
    $("#recordeventmenu").removeClass("tagn");
    $('#events_List').empty();

    $("#eventpager").myPagination({
        contentid: '#events_List', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: databind,
        //pagermore: true,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 3,
                opertype: 'waitevent', //操作码
                user_id: wd_B.uin.uid,
                group_id: groupid,
                type: $("#sel_filterType").val(),
                sreachKey: $("#txt_sreachKey").val()
            }
        },
        info: {
            first_on: false,
            last_on: false,
            nextcls: 'next',
            next_on: false,
            prevcls: 'prev',
            prev_on: false,
            msg_on: false, //如果为true显示第几页以及总页数，否则不显示
            tipmsg: '第{tip}页'
        }
    });        

}


function liMousemoveSearch() {

    $(".report_list .report").each(function (i) {
        $(this).attr('order', i);
        $(this).mouseout(
		function () {
		    color = '#DFDFDF';
		    order = $(this).attr('order');
		    $(".report_list .report").each(
				function (j) {
				    if (order - j == 1) {
				        $(this).css('border-bottom', '1px dashed ' + color);
				    }
				}
			);
		    $(this).css('border-bottom', '1px dashed ' + color);
		    $(this).css('background', '');
		    $(this).find('.mygroup_xq').hide();
		}
	);

        $(this).mouseover(
		function () {
		    color = '#5FB0D3';
		    order = $(this).attr('order');
		    $(".report_list .report").each(
				function (j) {
				    if (order - j == 1) {
				        $(this).css('border-bottom', '1px dashed ' + color);
				    }
				}
			);
		    $(this).css('border-bottom', '1px dashed ' + color);
		    $(this).css('background', '#EEF7FE');
		    $(this).find('.mygroup_xq').show();
		}
	);
});



    $('.log_view_pl p,.handle_view_con > p').each(function (i, n) {
        $(n).trunk8 && $(n).trunk8({
            lines: 3,
            fill: '&hellip;'
        });
    })
    $('.read-more').toggle(
         function () {
             $(this).closest('li').find('.log_view_pl p,.handle_view_con > p').trunk8('revert');
             $(this).html("收起更多");
         },
         function () {
             $(this).closest('li').find('.log_view_pl p,.handle_view_con > p').trunk8();
             $(this).html("查看更多");
          }

    )
//    $('.read-more').live('click', function (event) {
//        if ($.trim($(this).html()) == "查看更多") {
//            $(this).closest('li').find('.log_view_pl p,.handle_view_con > p').trunk8('revert');
//            $(this).html("收起更多");
//        } else {

//            $(this).closest('li').find('.log_view_pl p,.handle_view_con > p').trunk8();
//            $(this).html("查看更多");
//        }
//        return false;
//    });
}

var vdata2;
function datarecordbind(data) {
    vdata2 = data;
    existgroup(groupid, datarecordbindT);
}



function datarecordbindT() {
    var data = vdata2;
    $('#events_List').empty();
    iseventfirst = false;
    if (data.result && data.rows) {
        var box = $('#events_List');
        havepagination = true;
        $.each(data.rows, function (i, v) {
            var html = "<li class='report'><span>";
            if (v.manage_type_id != "f1ceb590-125a-11e1-9997-000c295f9365") {
                html += "<b>赞成：" + v.positive + " / 反对：" + v.negative + "</b>";
            }

            html += "创建人：<a>" + v.name + "</a><label>" + v.begin_date + "</label></span>" +
                    v.event_name + " <i>" + v.title + "</i>";
            if (v.enevtid == "364ef1eb-8a16-11e1-8de6-101f74b66417") {//收支预算
                html += "<i>&nbsp;&nbsp;&nbsp;";


                if (v.link_value3 == "1") {
                    html += wanerdaoLangTip('relationship_00046');
                } else if (v.link_value3 == "2") {
                    html += wanerdaoLangTip('relationship_00047');
                } else {
                    html += wanerdaoLangTip('relationship_00048');
                }
                if (v.link_value1 == "1") {
                    html += wanerdaoLangTip('relationship_00044');
                } else {
                    html += wanerdaoLangTip('relationship_00045');
                }
                html += v.link_value2 + "</i>";
            } else if (v.enevtid == "36639d9b-8a16-11e1-8de6-101f74b66417") {//超级管理员变动
                html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00049') + v.link_value2 + "</i>";
            } else if (v.enevtid == "366870f6-8a16-11e1-8de6-101f74b66417" || v.enevtid == "366d68da-8a16-11e1-8de6-101f74b66417") { //执行管理员变动,财务员变动
                html += "<i>&nbsp;&nbsp;&nbsp;";
                if (v.link_value1 == "1") {
                    html += wanerdaoLangTip('relationship_00050');
                } else if (v.link_value1 == "2") {
                    html += wanerdaoLangTip('relationship_00051');
                } else if (v.link_value1 == "3") {
                    html += wanerdaoLangTip('relationship_00052');
                } else if (v.link_value1 == "4") {
                    html += wanerdaoLangTip('relationship_00053');
                }
                html += v.link_value3 + "</i>";
            } else if (v.enevtid == "3659eb18-8a16-11e1-8de6-101f74b66417") {//活动专用预算
                html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00054') + ":" + v.link_value2 + "&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00055') + ":" + v.link_value1 + "</i>";
            } else if (v.enevtid == "3651d57b-8a16-11e1-8de6-101f74b66417") {//基本信息变更
                if (v.link_value1 == "0") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00056') + ":" + v.link_value2 + "</i>";
                } else if (v.link_value1 == "1") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00057') + ":" + v.link_value3 + "</i>";
                } else if (v.link_value1 == "2") {
                    if (v.link_value2 == "1") {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00058') + ":" + wanerdaoLangTip('relationship_00059') + "</i>";
                    } else {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00058') + ":" + wanerdaoLangTip('relationship_00060') + "</i>";
                    }
                } else if (v.link_value1 == "3") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00061') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "7") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00062') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "9") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00063') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "10") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00064') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "11") {
                    if (v.link_value2 == "1") {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00065') + ":" + wanerdaoLangTip('relationship_00066') + "&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00068') + ":" + v.link_value3  +"</i>";
                    } else {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00065') + ":" + wanerdaoLangTip('relationship_00067') + "</i>";
                    }
                }
            }
            html += "</li>";
            box.append(html);
        });
        liMousemoveSearch();
    } else if (!havepagination) {
   // $("#paginationhearDIV").hide();
    }

}

var vdata3;
function databind(data) {
    vdata3 = data;
    existgroup(groupid, databindT);
}


//分页数据绑定
function databindT() {
    var data = vdata3;
    $('#events_List').empty();
    if (data.result && data.rows) {
        var box = $('#events_List');
        havepagination = true;
        iseventfirst = false;
      
        $.each(data.rows, function (i, v) {

            var html = "<li class='report' id=\"event" + v.id + "\"><span><b>赞成：<i id=\"agree" + v.id + "\">" + v.positive + "</i> / 反对：<i id=\"against" + v.id + "\">" + v.negative + "</i></b>创建人：" + v.name + "<label>" + v.begin_date + "</label> ";
            if (v.process == "T") {
                if (v.gvid == null || v.gvid == "") {
                    html += "   <a href=\"javascript:eventopter('" + v.id + "','1','0')\" class='h_top'></a><a href=\"javascript:eventopter('" + v.id + "','0','1')\" class='h_bot'></a>";
                }
            }
            html += "</span>[<font color='#37922D'>" + v.process_name + "</font>] " + v.event_name + " <i title='" + v.title + "' style='width:100px;vertical-align:middle;display:inline-block' class='ellipsis'>" + v.title + "</i>";
             if (v.enevtid == "364ef1eb-8a16-11e1-8de6-101f74b66417") {//收支预算
                html += "<i>&nbsp;&nbsp;&nbsp;";


                if (v.link_value3 == "1") {
                    html += wanerdaoLangTip('relationship_00046');
                } else if (v.link_value3 == "2") {
                    html += wanerdaoLangTip('relationship_00047');
                } else {
                    html += wanerdaoLangTip('relationship_00048');
                }
                if (v.link_value1 == "1") {
                    html += wanerdaoLangTip('relationship_00044');
                } else {
                    html += wanerdaoLangTip('relationship_00045');
                }
                html += v.link_value2 + "</i>";
            } else if (v.enevtid == "36639d9b-8a16-11e1-8de6-101f74b66417") {//超级管理员变动
                html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00049') + v.link_value2 + "</i>";
            } else if (v.enevtid == "366870f6-8a16-11e1-8de6-101f74b66417" || v.enevtid == "366d68da-8a16-11e1-8de6-101f74b66417") { //执行管理员变动,财务员变动
                html += "<i>&nbsp;&nbsp;&nbsp;";
                if (v.link_value1 == "1") {
                    html += wanerdaoLangTip('relationship_00050');
                } else if (v.link_value1 == "2") {
                    html += wanerdaoLangTip('relationship_00051');
                } else if (v.link_value1 == "3") {
                    html += wanerdaoLangTip('relationship_00052');
                } else if (v.link_value1 == "4") {
                    html += wanerdaoLangTip('relationship_00053');
                }
                html += v.link_value3 + "</i>";
            } else if (v.enevtid == "3659eb18-8a16-11e1-8de6-101f74b66417") {//活动专用预算
                html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00054') + ":" + v.link_value2 + "&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00055') + ":" + v.link_value1 + "</i>";
            } else if (v.enevtid == "3651d57b-8a16-11e1-8de6-101f74b66417") {//基本信息变更
                if (v.link_value1 == "0") {
                    html += "<i title='" + v.link_value2 + "'  style='width:300px;vertical-align:middle;display:inline-block' class='ellipsis'>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00056') + ":" + v.link_value2 + "</i>";
                } else if (v.link_value1 == "1") {
                    html += "<i >&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00057') + ":" + v.link_value3 + "</i>";
                } else if (v.link_value1 == "2") {
                    if (v.link_value2 == "1") {
                        html += "<i >&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00058') + ":" + wanerdaoLangTip('relationship_00059') + "</i>";
                    } else {
                        html += "<i >&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00058') + ":" + wanerdaoLangTip('relationship_00060') + "</i>";
                    }
                } else if (v.link_value1 == "3") {
                    html += "<i >&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00061') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "7") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00062') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "9") {
                    html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00063') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "10") {
                    html += "<i style='width:300px;vertical-align:middle;display:inline-block' class='ellipsis'>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00064') + ":" + v.link_value2 + "</i>";
                }
                else if (v.link_value1 == "11") {
                    if (v.link_value2 == "1") {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00065') + ":" + wanerdaoLangTip('relationship_00066') + "&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00068') + ":" + v.link_value3  +"</i>";
                    } else {
                        html += "<i>&nbsp;&nbsp;&nbsp;" + wanerdaoLangTip('relationship_00065') + ":" + wanerdaoLangTip('relationship_00067') + "</i>";
                    }
                }
            }
            
             html +=" </li>";
            box.append(html);
        });
        liMousemoveSearch();
    } else if (!havepagination && iseventfirst) {
      recordeventrecord();
    }

}

var vid;
var vp;
var vn;

function eventopter(id, p, n) {
    vid = id;
    vp = p;
    vn = n;
    existgroup(groupid, eventopterT);
}


function eventopterT() {
    
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'eventopter',id:'" + vid + "',positive:'" + vp + "',negative:'" + vn + "'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            $("#event" + vid + " a").hide();
            if (vp == "1") {

                var x = $("#agree" + vid).html();
                x++;
                $("#agree" + vid).html(x)
            }
            if (vn == "1") {
                var x = $("#against" + vid).html();
                x++;
                $("#against" + vid).html(x)
            }
        }
    });
}


function setrecordfilter() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getrecordparam',param:'levelrecordList',group_id:'" + groupid + "'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            var box = $("#sel_filterType");
            box.empty();
            $.each(data.rows, function (i, v) {
                if (!jsSelectIsExitItem(box, v.value)) {
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                }
            });
            box.chosen();
        }
    });
}

function setPendingfilter() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getsysparam',param:'levelSysList',group_id:'" + groupid + "'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            var box = $("#sel_filterType");
            box.empty();
            $.each(data.rows, function (i, v) {
                if (!jsSelectIsExitItem(box, v.value)) {
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                }
            });
            box.chosen();
        }
    });
}
function setSelEvent(){

    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getevent',group_id:'" + groupid + "'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            var box = $("#sel_event");
            if (data.total == "0") {

                $("#eventopen").hide();
            } else {
                $.each(data.rows, function (i, v) {
                    if (v.ismanage != "T" || v.isEditdemocratic != "T")

                        $("<option value='" + v.id + "'>" + v.name + "</option>").appendTo(box);
                    $("#li_eventdescription").append("<label id='lab_eventdes" + v.id + "' style='display:none;width:500px' class='labevent'>" + v.event_description + "</label>");
                });
                box.chosen();
            }
            $("#mainoperateDIV").show();
        } /// <reference path="../../relationship/relationship_mygroup_member.aspx" />

    });
}

function checkbox2(id) {
    if ($('#' + id).attr('checked') == true) {
        $('#' + id).attr('checked', false);
    } else {
        $('#' + id).attr('checked', true);
    }
}

function setManagerName(data) {
    if (data != null) {
        $.each(data.rows, function (i, v) {
            $("#managerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
        });

    }
}


function setTreasurerName(data) {
    if (data != null) {
        $.each(data.rows, function (i, v) {
            $("#treasurerDIV").append("<span lang ='" + v.id + "'>" + v.name + "<b onclick='delThisUser(this)'>x</b></span>");
        });
    }
}

function delThisUser(obj) {
    $(obj).parent().remove();
}

function changeEvent() {
    existgroup(groupid, changeEventT);
}


function changeEventT() {
    var k = $("#sel_event").val();
    var t =  $("#sel_event").find('option:selected').text()
    $("#li_eventdescription .labevent").hide();
    $("#lab_eventdes"+k).show();
    var box = $("#events_bot");
    box.empty();
    switch (k) {
        case "":
            break;
        case "364ef1eb-8a16-11e1-8de6-101f74b66417": //收支预算
            box.load("../relationship/theBudget.htm", "", function () {
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getselparam',param:'budgetUnit'}",
                    error: function (data) {
                      //  alert("error")
                    },
                    success: function (data) {
                        var box = $("#sel_budgetunit");
                        $.each(data.rows, function (i, v) {
                            if (!jsSelectIsExitItem(box, v.value)) {
                                $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                            }
                        });
                        box.chosen();

                        $("#sel_budgettpye").chosen();
                    }
                });
            });
            break;
        case "3651d57b-8a16-11e1-8de6-101f74b66417": //基本信息变更
            box.load("../relationship/theBaseInfo.htm", "", function () {
                $("#pointbody dd").hide();
                $("#pointbody dt").hide();


                getDroupCategory();
                getManagerName(groupid);
                getTreasurerName(groupid);
                getprotectTime();
                setManagetype();
                getfeeUnit();
                definedUnit();
                intiswfu();
                $("#sel_point").chosen();
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'searchgroupinfo',group_id:'" + groupid + "'}",
                    error: function (data) {
                        //   alert("error")
                    },
                    success: function (data) {

                        $("#txt_groupName").val(data.rows[0].group_name);
                        $("#groupCateList").val(data.rows[0].category_id);
                        if (data.rows[0].is_public == "True") {
                            $("#chk_publie").attr("checked", "checked");
                        }
                        if (data.rows[0].join_method_id == "直接加入") {
                            $("#dicAdd").attr("checked", "checked");
                        } else {
                            $("#aprAdd").attr("checked", "checked");
                        }


                        $("#thumbnails").empty().append("<img src='../" + data.rows[0].logo_path + "' id='groupImage' width='220' height='150'>");


                        oldimgpath = data.rows[0].logo_path;


                        $("#txt_summary").val(data.rows[0].summary);
                        $("#txt_description").val(data.rows[0].description);
                        $("#txt_website").val(data.rows[0].website);
                        if (data.rows[0].member_nbr > "50") {
                            $("#input_6").attr("disabled", "");
                        }



                        if (data.rows[0].fee_unit.length == "1") {
                            $("#txt_fee").val(data.rows[0].join_fee).show();
                            $("#feeUnitList").val(data.rows[0].fee_unit);
                        } else {
                            $("#txt_defind").val(data.rows[0].join_fee).show();

                            $("#feeUnitList").val("4");
                            $("#definedUnitList").val(data.rows[0].fee_unit);
                            $("#definedUnitList").show();
                        }

                        $("#txt_transfer").val(data.rows[0].transfer_account);
                        $("#txt_transfer_description").val(data.rows[0].transfer_description);
                        if (data.rows[0].is_kick_protected == "True") {
                            $("#prote").attr("checked", "checked");
                            $("#protecttimeList").val(data.rows[0].kick_protected_duration);
                        }

                    }
                });


            });
            break;
        case "36555607-8a16-11e1-8de6-101f74b66417": //管理结构信息变更
            box.load("../relationship/ManagementStructrue.htm", "", function () {
                $("#managementDIV div").hide();
                $("#managementDIV h3").hide();
                setshiftcycle();
                setcyclesalary();

                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getgroupdemocratic',group_id:'" + groupid + "'}",
                    error: function (data) {
                      //  alert("error")
                    },
                    success: function (data) {

                        $("#txt_democracy_rate").val(data.rows[0].democracy_rate);
                        $("#txt_vote_life").val(data.rows[0].vote_life);
                        $("#txt_public_life").val(data.rows[0].public_life);
                        $("#txt_vote_pass_rate").val(data.rows[0].vote_pass_rate);
                        $("#sel_managercycle").val(data.rows[0].change_duration);
                        $("#sel_managersalary").val(data.rows[0].unit);
                        $("#txt_managersalary").val(data.rows[0].salary);

                        $("#sel_financialcycle").val(data.rows[0].change_duration2);
                        $("#sel_financialsalary").val(data.rows[0].unit2);
                        $("#txt_financialsalary").val(data.rows[0].salary2);

                    }
                });


            });
            break;
        case "3659eb18-8a16-11e1-8de6-101f74b66417": //活动专用预算
            box.load("../relationship/theapplyactivity.htm");
            break;
        case "365e8996-8a16-11e1-8de6-101f74b66417": //解散圈子
            box.load("../relationship/dismissGroup.htm");
            break;
        case "36639d9b-8a16-11e1-8de6-101f74b66417": //超级管理员变动
            box.load("../relationship/oversupermanager.htm", "", function () {
 
                $("#btngroup").click(function () {
                    wanerdaoPop({
                        comopts: { titleid: 'common_00012', typename: 'group', groupid: groupid, oneself: 'true', elementid: 'btnaddmanager', callback: showsupermanagerdata }
                    });
                });
                window.setTimeout(initoverlay, 2000);
            });

            break;
        case "366870f6-8a16-11e1-8de6-101f74b66417": //执行管理员变动
            box.load("../relationship/thePersonnelchanges.htm", "", function () {
                $("#btngroup").click(function () {
                    wanerdaoPop({
                        comopts: { titleid: 'common_00012', typename: 'group', groupid: groupid, elementid: 'btnaddmanager', callback: showManagerdata }
                    });
                });
                window.setTimeout(initoverlay, 2000);
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getselparam',param:'executionInfo'}",
                    error: function (data) {
                        //  alert("error")
                    },
                    success: function (data) {
                        var box = $("#sel_action");

                        $.each(data.rows, function (i, v) {
                            if (!jsSelectIsExitItem(box, v.value)) {
                                if (roleLevel.indexOf("0") != -1 ) {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                } else if (amanagetype == "f1ceb590-125a-11e1-9997-000c295f9365" && roleLevel.indexOf("1") != -1 && v.value == "4") {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                    $("#lipeople").hide();
                                } else if (amanagetype == "f1ceb590-125a-11e1-9997-000c295f9365" && roleLevel.indexOf("1") == -1 && v.value == "3") {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                    $("#lipeople").hide();
                                } else if (amanagetype == "f1da1c0f-125a-11e1-9997-000c295f9365" && (v.value == "1" || v.value == "3" || v.value == "4")) {
                                     $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                }
                            }
                        });

                        box.chosen();
                    }
                });
            });
            break;
        case "366d68da-8a16-11e1-8de6-101f74b66417": //财务员变动
            box.load("../relationship/thePersonnelchanges.htm", "", function () {
                $("#btngroup").click(function () {
                    wanerdaoPop({
                        comopts: { titleid: 'common_00012', typename: 'group', groupid: groupid, elementid: 'btnaddmanager', callback: showPersonneldata }
                    });
                });
                window.setTimeout(initoverlay, 2000);
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getselparam',param:'executionInfo'}",
                    error: function (data) {
                      //  alert("error")
                    },
                    success: function (data) {
                        var box = $("#sel_action");
                         $.each(data.rows, function (i, v) {
                            if (!jsSelectIsExitItem(box, v.value)) {
                                if (roleLevel.indexOf("0") != -1) {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                } else if (amanagetype == "f1ceb590-125a-11e1-9997-000c295f9365" && roleLevel.indexOf("4") != -1 && v.value == "4") {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                    $("#lipeople").hide();
                                } else if (amanagetype == "f1ceb590-125a-11e1-9997-000c295f9365" && roleLevel.indexOf("1") != -1 && (v.value == "1" || v.value == "2")) {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                    $("#lipeople").hide();
                                } else if (amanagetype == "f1ceb590-125a-11e1-9997-000c295f9365" && roleLevel.indexOf("1") == -1 && v.value == "3" ) {
                                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                    $("#lipeople").hide();
                                } else if (amanagetype == "f1da1c0f-125a-11e1-9997-000c295f9365" && (v.value == "1" || v.value == "3" || v.value == "4")) {
                                     $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(box);
                                }
                            }
                        });
                        box.chosen();
                    }
                });
            });
            break;
    }
}


function showsupermanagerdata(data) {
    $("#txt_peoplename").val(data.group[0].name);
    $("#hid_peopleid").val(data.group[0].id);
}
function showManagerdata(data) {
    var tn = "";
    var tid = "";
    var op = $("#sel_action").val();
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sreachManager',group_id:'" + groupid + "'}",
        error: function (data2) {
            // alert("error")
        },
        success: function (data2) {
            if (op == "1") {
                if (data2 != null) {
                    $.each(data2.rows, function (i2, v2) {
                        $.each(data.group, function (i, v) {
                            if (v.id != v2.id) {
                                tn += v.name + ",";
                                tid += v.id + ",";
                            }
                        });
                    });

                }
            } else {
                if (data2 != null) {
                    $.each(data2.rows, function (i2, v2) {
                        $.each(data.group, function (i, v) {
                            if (v.id == v2.id) {
                                tn += v.name + ",";
                                tid += v.id + ",";
                            }
                        });
                    });

                }
            }

            $("#txt_peoplename").val(tn);
            $("#hid_peopleid").val(tid);
        }
    });
  
  

}

function showPersonneldata(data) {
    var tn = "";
    var tid = "";
    var op = $("#sel_action").val();
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sreachtreasurer',group_id:'" + groupid + "'}",
        error: function (data2) {
            //alert("error")
        },
        success: function (data2) {
            if (op == "1") {
                if (data2 != null) {
                    $.each(data2.rows, function (i2, v2) {
                        $.each(data.group, function (i, v) {
                            if (v.id != v2.id) {
                                tn += v.name + ",";
                                tid += v.id + ",";
                            }
                        });
                    });

                }
            } else {
                if (data2 != null) {
                    $.each(data2.rows, function (i2, v2) {
                        $.each(data.group, function (i, v) {
                            if (v.id == v2.id) {
                                tn += v.name + ",";
                                tid += v.id + ",";
                            }
                        });
                    });

                }
            }

            $("#txt_peoplename").val(tn);
            $("#hid_peopleid").val(tid);
        }
    });

}

    function initoverlay() {
        try{
            $("#btngroup").overlay();
           }catch(e){
        
           }
    }

function setshiftcycle() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getselparam',param:'shiftcycle'}",
        error: function (data) {
        //    alert("error")
        },
        success: function (data) {
            var mbox = $("#sel_managercycle");
            var fbox = $("#sel_financialcycle");
            $.each(data.rows, function (i, v) {
                if (!jsSelectIsExitItem(mbox, v.value)) {
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(mbox);
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(fbox);
                }
            });
        }
    });
}

function setcyclesalary() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getselparam',param:'cyclesalary'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            var mbox = $("#sel_managersalary");
            var fbox = $("#sel_financialsalary");
            $.each(data.rows, function (i, v) {
                if (!jsSelectIsExitItem(mbox, v.value)) {
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(mbox);
                    $("<option value='" + v.value + "'>" + v.text + "</option>").appendTo(fbox);
                }
            });
        }
    });
}

function changepoint() {
    existgroup(groupid, changepointT);
}



function changepointT() {
    $("#pointbody dd").hide();
    $("#pointbody dt").hide();
    var v = $("#sel_point").val();
    var d = $("#pointbody dd").get(v);
    $(d).show();
    if ($(d).next().is("dt")) {
        $(d).next().show();
        if ($(d).next().next().is("dt")) {
            $(d).next().next().show();
        }
    }

}


function changemanagepoint() {
    existgroup(groupid, changemanagepointT);
}



function changemanagepointT() {
    $("#managementDIV div").hide();
    $("#managementDIV h3").hide();

    var d = $("#managementDIV div").get($("#sel_point").val());
    $(d).show();
    $(d).children("div").show();
    if ($(d).prev().is("h3")) {
        $(d).prev().show();
       
    }

}



function cancelEvent() {
    existgroup(groupid, cancelEventT);
}


function cancelEventT() {
    $("#events_bot").empty();
    $("#eventsDIV").hide();
 }

 function submitBudget() {
     existgroup(groupid, submitBudgetT);
 }


 function submitBudgetT() {
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_budgetTitle").val() + "',content:'" + $("#txt_budgetcomment").val() + "',link_value1:'" + $("#sel_budgettpye").val() + "',link_value2:'" + $("#txt_num").val() + "',link_value3:'" + $("#sel_budgetunit").val() + "'}",
         error: function (data) {
           //  alert("error")
         },
         success: function (data) {
             if (data.result) {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                 cancelEvent();
                 havepagination = true;
                 $("#paginationhearDIV").show();
                 if (isstyle) {
                     waitpagination();
                 } else {
                     recordeventrecord();
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }



 function submitBaseInfo() {
     existgroup(groupid, submitBaseInfoT);
 }


 function submitBaseInfoT() {
     var basekey = $("#sel_point").val();
     var link_value2 = "";
     var link_value3 = "";
     var validation = true;
     switch (basekey) {
         case "0":
             link_value2 = $("#txt_groupName").val();
             break;
         case "1":
             link_value2 = $("#groupCateList").val();
             link_value3 = $("#groupCateList").find('option:selected').text();
             break;
         case "2":
             if ($("#chk_publie").attr("checked")) {
                 link_value2 = "1";
             } else {
                 link_value2 = "0";
             }
             break;
         case "3":
             if ($("#dicAdd").attr("checked")) {
                 link_value2 = "直接加入";
             } else {
                 link_value2 = "批准加入";
             }
             break;
//         case "4":
//             $("#managerDIV span").each(function () {
//                 link_value2 += $(this).attr("lang") + ","
//             });
//             break;
//         case "5":
//             $("#treasurerDIV span").each(function () {
//                 link_value2 += $(this).attr("lang") + ","
//             });
//             break;
         case "4":
             if ($.trim($("#thumbnails").html()) != "") {
                 if ($("#cpRt").attr("checked")) {
                     newimgname = $("#thumbnails").children().attr("src");
                     newimgname = newimgname.substring(newimgname.lastIndexOf("/") + 1, newimgname.length);
                     var oldimgname = oldimgpath.substring(oldimgpath.lastIndexOf("/") + 1, oldimgpath.length);
                     if (oldimgname != newimgname) {
                         logoChange = true;
                         link_value2 = newimgname;
                     }
                 } else {
                     validation = false;
                     $("#msgcopyright").html(wanerdaoLangTip('relationship_00002'));
                 }
             }
             break;
         case "5":
             link_value2 = $.trim($("#txt_summary").val());
             if (link_value2 == "") {
                 validation = false;
                 $("#msgSummary").html(wanerdaoLangTip('relationship_00005'));
             }
             break;
         case "6":
             link_value2 = $.trim($("#txt_description").val());
             if (link_value2 == "") {
                 validation = false;
                 $("#msgdes").html(wanerdaoLangTip('relationship_00006'));
             }
             break;
         case "7":
             link_value2 = $.trim($("#txt_website").val());
             break;
         case "8":
             link_value2 = $("#feeUnitList").val();
             if (link_value2 != "0" && link_value2 != "4") {
                 link_value3 = $.trim($("#txt_fee").val());
                 if (link_value3 == "") {
                     validation = false;
                     $("#msgUnit").html(wanerdaoLangTip('relationship_00007'));
                 }
             } else if (link_value2 == "4") {
                 link_value3 = $.trim($("#txt_defind").val());
                 link_value2 = $("#definedUnitList").val();
                 if (vfee == "") {
                     validation = false;
                     $("#msgUnit").html(wanerdaoLangTip('relationship_00007'));
                 }
             }
             break;
         case "9":
             link_value2  = $("#txt_transfer").val();

             if (link_value2 == "") {
                 validation = false;
                 $("#msgTrans").html(wanerdaoLangTip('relationship_00008'));
             }
             break;
        
         case "10":
             link_value2  = $("#txt_transfer_description").val();           
             break;
         case "11":
             if ($("#prote").attr("checked")) {
                 link_value2 = "1";
             } else {
                 link_value2 = "0";
             }
             link_value3 = $("#protecttimeList").val();
             break;
     }
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_baseInfoTitle").val() + "',content:'" + $("#txt_baseInfoComment").val() + "',link_value1:'" + basekey + "',link_value2:'" + link_value2 + "',link_value3:'" + link_value3 + "'}",
         error: function (data) {
          //   alert("error")
         },
         success: function (data) {
             if (data.result) {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                 cancelEvent();
                 havepagination = true;
                 $("#paginationhearDIV").show();
                 if (isstyle) {
                     waitpagination();
                 } else {
                     recordeventrecord();
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }


 function submitmanage() {
     existgroup(groupid, submitmanageT);
 }


 function submitmanageT() {
     var basekey = $("#sel_point").val();
     var link_value2 = "";
     var link_value3 = "";
     var link_value4 = "";
     var validation = true;
     switch (basekey) {
         case "":
             validation = false;
             break;
         case "0":
             link_value2 = $("#txt_democracy_rate").val();
             break;
         case "1":
             link_value2 = $("#txt_vote_life").val();
             break;
         case "2":
             link_value2 = $("#txt_public_life").val();
             break;
         case "3":
             link_value2 = $("#txt_vote_pass_rate").val();
             break;
         case "4":
             link_value2 = $("#sel_managercycle").val();
             link_value3 = $("#sel_managersalary").val();
             link_value4 = $("#txt_managersalary").val();
             break;
         case "5":
             link_value2 = $("#sel_financialcycle").val();
             link_value3 = $("#sel_financialsalary").val();
             link_value4 = $("#txt_financialsalary").val();
             break;

     }
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_manageTitle").val() + "',content:'" + $("#txt_manageComment").val() + "',link_value1:'" + basekey + "',link_value2:'" + link_value2 + "',link_value3:'" + link_value3 + "',link_value4:'" + link_value4 + "'}",
         error: function (data) {
        //     alert("error")
         },
         success: function (data) {
             if (data.result) {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                 cancelEvent();
                 havepagination = true;
                 $("#paginationhearDIV").show();
                 if (isstyle) {
                     waitpagination();
                 } else {
                     recordeventrecord();
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }



 function submitactivity() {
     existgroup(groupid, submitactivityT);
 }


 function submitactivityT() {
   
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_activitytitle").val() + "',content:'" + $("#txt_activitycontent").val() + "',link_value1:'" + $("#txt_activitylink").val() + "',link_value2:'" + $("#txt_activitybudget").val() + "'}",
         error: function (data) {
          //   alert("error")
         },
         success: function (data) {
             if (data.result) {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                 cancelEvent();
                 havepagination = true;
                 $("#paginationhearDIV").show();
                 if (isstyle) {
                     waitpagination();
                 } else {
                     recordeventrecord();
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }


 function submitdismiss() {
     existgroup(groupid, submitdismissT);
 }

 function submitdismissT() {
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_dismisstitle").val() + "',content:'" + $("#txt_dismisscontent").val() + "'}",
         error: function (data) {
         //    alert("error")
         },
         success: function (data) {
             if (data.result) {
                 if (data.data == 1040) {
                     new pop({ typename: 'message', msginfo: wanerdaoLangTip('relationship_00040') });
               
                     window.location.href = "relationship_mygroup.html";
                 } else {
                                      $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                                      cancelEvent();
                                      havepagination = true;
                                      $("#paginationhearDIV").show();
                                      if (isstyle) {
                                          waitpagination();
                                      } else {
                                          recordeventrecord();
                                      }
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }

 function submitovermanager() {
     existgroup(groupid, submitovermanagerT);
 }

 function submitovermanagerT() {

     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_managertitle").val() + "',content:'" + $("#txt_managercontent").val() + "',link_value1:'" + $("#hid_peopleid").val() + "',link_value2:'" + $("#txt_peoplename").val() + "'}",
         error: function (data) {
           //  alert("error")
         },
         success: function (data) {
             if (data.result) {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                 cancelEvent();
                 havepagination = true;
                 $("#paginationhearDIV").show();
                 setSelEvent();
                 if (isstyle) {
                     waitpagination();
                 } else {
                     recordeventrecord();
                 }
             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }

 function submitchange() {
     existgroup(groupid, submitchangeT);
 }

 function submitchangeT() {
     $.ajax({
         url: "../wandao_group.axd",
         type: "POST",
         dataType: "json",
         cache: false,
         data: "{opertype:'submitbudget',event_id:'" + $("#sel_event").val() + "',group_id:'" + groupid + "',title:'" + $("#txt_managertitle").val() + "',content:'" + $("#txt_managercontent").val() + "',link_value1:'" + $("#sel_action").val() + "',link_value2:'" + $("#hid_peopleid").val() + "',link_value3:'" + $("#txt_peoplename").val() + "'}",
         error: function (data) {
             //    alert("error")
         },
         success: function (data) {
             if (data.result) {
                 if (data.data == "1034") {
                     $("#msgevent").html(wanerdaoLangTip('relationship_00034'));
                 } else if (data.data == "1035") {
                     $("#msgevent").html(wanerdaoLangTip('relationship_00035'));
                 } else {
                     $("#msgevent").html(wanerdaoLangTip('relationship_00032'));
                     if ($("#sel_action").val() == "4") {
                         window.location.href = "relationship_mygroup_main.html";
                     } else {
                         cancelEvent();
                         havepagination = true;
                         $("#paginationhearDIV").show();
                         setSelEvent();
                         if (isstyle) {
                             waitpagination();
                         } else {
                             recordeventrecord();
                         }
                     }
                 }

             } else {
                 $("#msgevent").html(wanerdaoLangTip('relationship_00033'));
             }
         }
     });
 }

 function displayePeople() {
     if ($("#sel_action").val() == "4") {
         $("#lipeople").hide();
     } else {
     $("#lipeople").show();
     }
 }
 function showCmment() {
     if ($("#addcommentDIV").is(":hidden")) {
         $("#addcommentDIV").show();
         $("#eventsDIV").hide();
     } else {
         $("#addcommentDIV").hide();
        }
   
}

function showEvent() {

    if ($("#eventsDIV").is(":hidden")) {
        $("#addcommentDIV").hide();
        $("#eventsDIV").show();
    } else {
        $("#eventsDIV").hide();
    }

   
 }


 function sub_comment() {
     existgroup(groupid, sub_commentT);
 }

 function sub_commentT() {
     var v = true;
     $("input.sharechk").each(function (v) {
         if (v == 0) {
             if ($(this).attr('checked') == false) {
                 activityclass = "";
                 activityclassname = "";
             }
         }
         if (v == 1) {
             if ($(this).attr('checked') == false) {
                 blogclass = "";
                 blogclassname = "";
             }
         }
     });
     if ($.trim($("#txt_title").val()) == "") {

         $("#msgtitle").html(wanerdaoLangTip('relationship_00030'));
        
         v = false;
     }
      if ($.trim($("#txt_comment").val()) == "") {
          $("#msgcomment").html(wanerdaoLangTip('relationship_00031'));
             v = false;
         }
  
     if (v) {
         $.ajax({
             url: "../wandao_group.axd",
             type: "POST",
             dataType: "json",
             cache: false,
             data: "{opertype:'addgroupdiscuss',activityclass:'" + activityclass + "',activityclassname:'" + activityclassname + "',blogclass:'" + blogclass + "',blogclassname:'" + blogclassname + "',group_id:'" + groupid + "',subject:'" + $("#txt_title").val() + " ',content:'" + $("#txt_comment").val() + "'}",
             error: function (data) {
               //  alert("error")
             },
             success: function (data) {
                 if (data.result) {
                     $("#txt_title").val("");
                     $("#txt_comment").val("");
                     paginDiscuss("1");
                     cancel_cmment();
                 } else {
                     $("#msgcomment").html(wanerdaoLangTip('relationship_00033'));
                 }
             }
         });
     }
}


function cancel_cmment() {
    existgroup(groupid, cancel_cmmentT);
}

function cancel_cmmentT() {
    $("#addcommentDIV").hide();
    $("#txt_title").val("");
    $("#txt_comment").val("");
    removeMsg();
}

function removeMsg() {
    $(".msgLabArr").html("");
}