$(document).ready(initData);

var currentPage;
var vgroup_name = "";

function initData() {
    getMenu(4);
    pagination("1");
}


function sreachgroup() {
    vgroup_name = $("#groupKey").val();
    if (vgroup_name == "请输入关键字") {
        vgroup_name = "";
    }
    pagination("1");
}
function pagination(currPage) {
    $("#pager1").myPagination({
          showmore: true, //是否显示加载更多
                showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
                callback: databind,
                ajax: {
                    url: '../wandao_common.axd',//此处必须填写，分页已没有固定处理工厂
                    param: {
                        pagecurrent: currPage,
                        pageSize: 10,
                      opertype: 'mygrouplist',
                        group_name: vgroup_name
                    }
                }
    });
}


//分页数据绑定
function databind(data) {
    $('#fList').empty();
    if (data.result && data.rows) {
        var box = $('#fList');
        $.each(data.rows, function (i, v) {

            var html = "<li><div class='lMr3'><a href='relationship_mygroup_info.aspx?id="+v.id+"'><img src='../" + v.logo_path + "' alt='' /></a></div>" +
					   "<div class='dTbc'><div class='fd_b_name'><a href='relationship_mygroup_info.aspx?id=" + v.id + "' class='fb'>" + v.name + "</a><i>(<span class='red'>" + v.member_nbr + "人</span>)</i></div>" +
					   "<div class='rm_Meta'>活动分类：<i>" + v.category_name + "</i></div></div>"

            if (v.followid != "") {
                html += "<div class='flAtteDiv'><a href='#' class='has_atten'>已关注</a></div>" +
                   "<div class='flBtnDiv'><p class='atteBtn clearfix'><a href='#' class='canc_atten'  onclick=\"followGroup('" + v.id + "',this,'-1')\">取消关注</a><a href='#' class='addAtte' style='display:none' onclick=\"followGroup('" + v.id + "',this,'1')\">关 注</a></p>"
            } else {
                html += "<div class='flAtteDiv'><a href='#' class='has_atten' style='display:none'>已关注</a></div>" +
                    "<div class='flBtnDiv'><p class='atteBtn clearfix'><a href='#' class='canc_atten' style='display:none' onclick=\"followGroup('" + v.id + "',this,'-1')\">取消关注</a><a href='#' class='addAtte' onclick=\"followGroup('" + v.id + "',this,'1')\">关 注</a></p>"
            }

            html += "<p class='atteLink'><a href=\"relationship_mygroup_main.aspx?id=" + v.id + "\">发贴子讨论</a><i>|</i><a href=\"relationship_mygroup_settings.aspx?id=" + v.id + "\">圈子设定</a><i>|</i><a href=\"relationship_mygroup_member.aspx?id=" + v.id + "\">成员管理</a><i>|</i>" +
                       "<a href=\"relationship_mygroup_finance.aspx?id=" + v.id + "\">财务</a><i>|</i><a href=\"javascript:quitGroup('" + v.id + "')\">离开圈子</a></p></div></li>";
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
            if (data.rows[0].level == "0") {
                alert("超级管理员不能退出圈子！");
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
                            alert("退出圈子成功！");
                            pagination("1");
                        } else {
                            alert("退出圈子失败！");
                        }

                    }
                });
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
                alert("会费过期,请先续费.");
            } else {
                window.location.href = "relationship_mygroup_info.aspx?id=" + id + "";
            }

        }
    });
    
}

function followGroup(id, obj, addvalue) {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupfollow',user_id:'" + wd_B.uin.uid + "',group_id:'" + id + "',addvalue:'" + addvalue + "'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.result) {
                if (addvalue == "1") {
                    $(obj).hide().prev().show().parent().parent().prev().children().show();
                } else {
                    $(obj).hide().next().show().parent().parent().prev().children().hide();
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