$(document).ready(initData);

var settingID = "";
var vname = "";
function initData() {
    getMenu(4);
    getMyGroupMenu(2, true);
   
  
   
}

function refFun() {
    pagination(1);
}

function sreachMember() {
    vname = $("#txt_key").val();
    if (vname == "请输入关键字") {
        vname = "";
    }
    pagination(1);
}

function pagination(currPage) {
    //基础配置
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: databind,
        pagermore: true,
        ajax: {
            url: 'wandao_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'mygroupmemeber',
                name: vname,
                group_id: groupid
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

var lock = true;

var newArray = new Array;

//分页数据绑定
function databind(data) {
    $('#fList').empty();
    if (data.result && data.rows) {
        var box = $('#fList');

  
        $.each(data.rows, function (i, v) {
            newArray[i] = new Array;
            newArray[i][0] = v.is_authorized;
            newArray[i][1] = v.user_id;
            newArray[i][2] = v.logo_small_path;
            newArray[i][3] = v.name;
            newArray[i][4] = v.current_place;
            newArray[i][5] = v.home;
            newArray[i][6] = v.displaycontellation;
            newArray[i][7] = v.school;
            newArray[i][8] = v.work_place;
            $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'grouproleimg',group_id:'" + groupid + "',user_id:'" + v.user_id + " '}",
                error: function (data) {
                  //  alert("error")
                },
                success: function (data) {
                    $.each(data.rows, function (xi, xv) {
                        newArray[i][9+xi] = xv.roleimg;
                    })

                }
            });

        });






        $.each(data.rows, function (i, v) {
            var html = "";
            if (v.is_authorized == "False") {
                html = "<li class='liw_bg'><dl><dt><a href='../personal/personal_info.html?uid=" + v.user_id + "'><img src='" + v.logo_small_path + "' alt='' /></a></dt>" +
                       "<dd><a href='../personal/personal_info.html?uid=" + v.user_id + "'>" + v.name + "</a></dd></dl>" +
                       "<div class='se_center'>" +
                       "<span><font color='#999999'>现&nbsp;居&nbsp;地：</font> " + v.current_place + "</span> " +
                       "<span><font color='#999999'>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</font> " + v.home + "</span> " +
                       "<span><font color='#999999'>星&nbsp;&nbsp;&nbsp;&nbsp;座：</font> " + v.displaycontellation + "</span> " +
                       "<span><font color='#999999'>毕业学校：</font> " + v.school + "</span> " +
                       "<span><font color='#999999'>工作单位：</font> " + v.work_place + "</span> " +
                       "</div><div class='se_righbtn'>";
                if (roleLevel.indexOf("0") != -1 || roleLevel.indexOf != ("1")) {
                    html += "<a href=\"javascript:AgreedAdd('" + v.user_id + "')\"  class='button radius-blue-button'><span class='icon icon-blue-ratify'></span>批准</a> <a href=\"javascript:RefusedAdd('" + v.user_id + "')\" class='button radius-blue-button'><span class='icon icon-blue-del'></span>拒绝</a>";
                }
                html += " </div></li>";
            } else {
                html = "<li class=''><dl><dt><a href='#'><img src='" + v.logo_small_path + "' alt='' /></a></dt></dl>" +
                       "<div class='se_center'> <span id='" + v.user_id + "img'>";

                var roleimgs = v.roleimg.split(",");
                for (var vi = 0; vi < roleimgs.length; vi++) {
                    if (roleimgs[vi] != "") {
                        html += "<img src='../images/img/" + roleimgs[vi] + "' /> ";
                    }
                }
                //                $.ajax({
                //                    url: "../wandao_group.axd",
                //                    type: "POST",
                //                    dataType: "json",
                //                    cache: false,
                //                    data: "{opertype:'grouproleimg',group_id:'" + groupid + "',user_id:'" + v.user_id + " '}",
                //                    error: function (data) {
                //                        alert("error")
                //                    },
                //                    success: function (data) {
                //                        $.each(data.rows, function (i, xv) {
                //                            $("#" + v.user_id + "img").prepend("<img src='../images/img/" + xv.roleimg + "' /> ");
                //                        })

                //                    }
                //                });

                html += "<a href='#' style='color:#0085c5'>" + v.name + "</a></span></div>";

                if ($.trim(v.user_id) != $.trim(wd_B.uin.uid)) {
                    html += "<div class='se_righbtn'>";
                    if (v.inboxid == "") {
                        html += "<a href=\"javascript:addFriend('" + $.trim(v.user_id) + "')\" class='button radius-blue-button'  id='groupfriend" + $.trim(v.user_id) + "'> <span class='icon icon-blue-friends'></span>交友</a>";
                    } else {
                        html += "  <a href=\"javascript:;\" class='button radius-gay-button'><span class='icon icon-gay-love'></span>已发申请</a>  "
                    }

                    if ($.trim(roleLevel) != "" && (roleLevel.indexOf("0") != -1 || roleLevel.indexOf != ("1"))) {
                        if (v.role_level.indexOf("0") == -1 && v.role_level.indexOf("1") == -1) {
                            html += "<a href=\"javascript:delMember('" + $.trim(v.user_id) + "')\" class='button radius-blue-button'><span class='icon icon-blue-del'></span>踢出</a>";
                        }
                    }
                    if (v.attention_id != 'N') {
                        html += "  <a  id='" + $.trim(v.user_id) + i + "' href=\"javascript:cancelfocus('" + $.trim(v.user_id) + i + "','" + v.user_id + "');\" class=\"button radius-blue-button\"><span class=\"icon icon-blue-attention\"></span><i>已关注</i></a>  ";
                    }
                    else {
                        html += "<a  id='" + $.trim(v.user_id) + i + "' href=\"javascript:cancelfocus('" + $.trim(v.user_id) + i + "','" + v.user_id + "');\" class='button radius-blue-button'><span class='icon icon-blue-attention'></span><i>关注</i></a> </div>";
                    }

                }
                html += "</li>";
            }

            box.append(html);
        });
    }
    liMousemoveSearch();

}

function iswait() {
    if (lock) {
        //alert("s");
        window.setInterval('iswait()', 10000);
    }
    //alert("x");
}

//取消\关注
function cancelfocus(obj, id) {
    $.ajax({
        url: "../wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'cancelfriendsfollow',attention_id:'" + id + "'}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {
            if (data == "1") {
                $("#" + obj).children("i").html("关注");
            } else if (data == "2") {

                $("#" + obj).children("i").html("已关注");
            }
        }
    });
}



function addFriend(id) {
    
    $.ajax({
        url: "../wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'sendinvite',send_id:'" + id + "',msgtype:'3',content:'申请加你为好友'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            $("#groupfriend" + id).hide().parent().prepend("<a href=\"javascript:;\" class='button radius-gay-button'><span class='icon icon-gay-love'></span>" + wanerdaoLangTip('relationship_00028') + "</a>");
        }
    });
}


function RefusedAdd(user_id) {
    if (confirm("确定拒绝该用户申请？")) {
        $.ajax({
            url: "../wandao_group.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'refusedjoingroup',group_id:'" + groupid + "',user_id:'" + user_id + " '}",
            error: function (data) {
               // alert("error")
            },
            success: function (data) {
                if (data.result) {
                    pagination(1);
                }
            }
        });
    }
}

function AgreedAdd(user_id) {
        $.ajax({
            url: "../wandao_group.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'agreedjoingroup',group_id:'" + groupid + "',user_id:'" + user_id + " '}",
            error: function (data) {
               // alert("error")
            },
            success: function (data) {
                if (data.result) {
                    pagination(1);
                }
            }
        });
}

function liMousemoveSearch() {
    $(".list_member li").hover(function () {
        $(this).addClass("liw_bg_blue");
    }, function () {
        $(this).removeClass("liw_bg_blue");
    })

}

function delMember(user_id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'delmember',group_id:'" + groupid + "',member_id:'" + user_id + " '}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {
            if (data.result) {
                pagination(1);
            }
        }
    });
}