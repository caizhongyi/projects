$(document).ready(initData);

var currentPage;
var vgroup_name = "";

function initData() {
    getMenu(4);
    pagination("1");
}


function sreachgroup() {
    vgroup_name = $("#groupKey").val();
    if (vgroup_name == "请输入圈子名") {
        vgroup_name = "";
    }
    pagination("1");
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
                opertype: 'mygrouplist', //操作码,
                group_name: vgroup_name
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

var gid = "";
var gurl = "";
function ifjoingroup(id,url) {
    gid = id;
    gurl = url;
    ifexistgroup(id, joingroup);
}

function joingroup() {
    window.location.href = gurl +"?id=" +gid;
}


//分页数据绑定
function databind(data) {
    $('#fList').empty();
    if (data.result && data.rows) {
        var box = $('#fList');
        $.each(data.rows, function (i, v) {

            var html = "<li><div class='lMr3'><a href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_info.html')\"><img src='../" + v.logo_path + "' alt='' /></a></div>" +
					   "<div class='dTbc'><div class='fd_b_name'><a href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_info.html')\" class='fb'>" + v.name + "</a><i>(<span class='red'>" + v.member_nbr + "人</span>)</i></div>" +
					   "<div class='rm_Meta'>活动分类：<i>" + v.category_name + "</i></div></div>"

            if (v.followid != "") {
                html += "<div class='flAtteDiv'><a href='#' class='has_atten'>已关注</a></div>" +
                   "<div class='flBtnDiv'><p class='atteBtn clearfix'><a href='#' class='canc_atten'  onclick=\"followGroup('" + v.id + "',this,'-1')\">取消关注</a><a href='#' class='addAtte' style='display:none' onclick=\"followGroup('" + v.id + "',this,'1')\">关 注</a></p>"
            } else {
                html += "<div class='flAtteDiv'><a href='#' class='has_atten' style='display:none'>已关注</a></div>" +
                    "<div class='flBtnDiv'><p class='atteBtn clearfix'><a href='#' class='canc_atten' style='display:none' onclick=\"followGroup('" + v.id + "',this,'-1')\">取消关注</a><a href='#' class='addAtte' onclick=\"followGroup('" + v.id + "',this,'1')\">关 注</a></p>"
            }

            html += "<p class='atteLink'><a href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_main.html')\">发贴子讨论</a><i>|</i><a href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_settings.html')\" >圈子设定</a><i>|</i><a href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_member.html')\"  >成员管理</a><i>";
            if (v.level.indexOf("0") != -1 || v.level.indexOf("4") != -1) {
                html += "|</i><a  href=\"javascript:ifjoingroup('" + v.id + "','relationship_mygroup_finance.html')\">财务</a><i>";
            }
            html += "|</i><a href=\"javascript:quitGroup('" + v.id + "')\">离开圈子</a></p></div></li>"
            box.append(html);
        });
    }
    liMousemoveSearch();

}

function quitGroup(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'grouprole',group_id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.result) {
                $.ajax({
                    url: "../wandao_group.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'delgroup',group_id:'" + id + "'}",
                    error: function (data) {
                        alert("error")
                    },
                    success: function (data) {
                        if (data.result) {
                            alert(wanerdaoLangTip('relationship_00040'));
                            pagination("1");
                        } else {
                            alert(wanerdaoLangTip('relationship_00041'));
                        }

                    }
                });
            } else {
                if (data.rows[0].level == "0") {
                    alert(wanerdaoLangTip('relationship_00015'));
                    // $("#msgDIV").html();
                } else {
                    $.ajax({
                        url: "../wandao_group.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'quitgroup',group_id:'" + id + "'}",
                        error: function (data) {
                            alert("error")
                        },
                        success: function (data) {
                            if (data.result) {
                                alert(wanerdaoLangTip('relationship_00016'));
                                //$("#msgDIV").html(wanerdaoLangTip('relationship_00016'));
                                pagination("1");
                            } else {
                                alert(wanerdaoLangTip('relationship_00017'));
                                // $("#msgDIV").html(wanerdaoLangTip('relationship_00017'));
                            }

                        }
                    });
                }
            }
        }
    });
}

function jionMygroup(id) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'ifexpire',user_id:'" + wd_B.uin.uid + "',group_id:'" + id + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data == "true") {
                $("#msgDIV").html(wanerdaoLangTip('relationship_00018'));
            } else {
                window.location.href = "relationship_mygroup_info.html?id=" + id + "";
            }

        }
    });
    
}
var gobj;
var gaddvalue;

function followGroup(id, obj, addvalue) {
    gid = id;
    gobj = obj
    gaddvalue = addvalue;
    ifexistgroup(id, refollowGroup);
   
}

function refollowGroup(){
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupfollow',user_id:'" + wd_B.uin.uid + "',group_id:'" + gid + "',addvalue:'" + gaddvalue + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.result) {
                if (gaddvalue == "1") {
                    $(gobj).hide().prev().show().parent().parent().prev().children().show();
                } else {
                    $(gobj).hide().next().show().parent().parent().prev().children().hide();
                }
            }

        }
    });
} 

function liMousemoveSearch(){
    $(".groupList li").hover(function(){
		$(this).addClass("active");	
	},function(){
		$(this).removeClass("active");	
	})

}