$(document).ready(initData);

var currentPage;
var vgroup_name = "";
var vcategory_id = "";
var vhobbysearch = "";
var gethobbyBool = false;
var vhobby = "";
var getMyfriendGroupBool = false;
var vfriendLikes = "";
var getmygroupBool = false;
var vmyGroup = "";


function initData() {
    getMenu(5);
    getGroupCategory();
    getMygroup();
}

function getGroupCategory() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'groupcategory'}",
        error: function (data) {
         //   alert("error")
        },
        success: function (data) {
            var groupCate = $("#groupCateList");
            $("<option value=''>请选择圈子分类</option>").appendTo(groupCate);
            $.each(data.rows, function (i, v) {
                $("<option value='" + v.id + "'>" + v.value + "</option>").appendTo(groupCate);
            });
            groupCate.chosen();
        }
    });
}

function getMygroup() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getalljiongroup',user_id:'" + wd_B.uin.uid + "'}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {

            $.each(data.rows, function (i, v) {
                vmyGroup += "'" + v.id + "',";
            });

            vmyGroup = vmyGroup.substring(0, vmyGroup.length - 1);
            getmygroupBool = true;
            pagination("1");
        }
    });
}


function getMyfriendGroup(){
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'friendjoingroup',user_id:'" + wd_B.uin.uid + "'}",
        error: function (data) {
            //alert("error")
        },
        success: function (data) {

            $.each(data.rows, function (i, v) {
                vfriendLikes += "'" + v.group_id + "',";

            });
            vfriendLikes = vfriendLikes.substring(0, vfriendLikes.length - 1);
            getMyfriendGroupBool=true
            if (getmygroupBool) {
                pagination("1");
            }
            else {
                getMygroup();
            }
        }
    });
    
}

function getHobby() {
    $.ajax({
        url: "../wandao_group.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'gethobby'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            if (data.result) {
                vhobby = data.obj.hobby;
                if (vhobby == null) {
                    vhobby = "";
                }
            }
            gethobbyBool = true
            if (getmygroupBool) {
                pagination("1");
            }
            else {
                getMygroup();
            }
        }
    });
    
}
function sreachGroup() {
    vhobbysearch = false;
    vgroup_name = $.trim($("#txt_name").val());
    vfriendLikes = "";
    if (vgroup_name == "请输入关键字") {
        vgroup_name = "";
    }
    vcategory_id = $("#groupCateList").val();
    if (getmygroupBool) {
        pagination("1");
    }
    else {
        getMygroup();
    }
    
}

function sreachbyHobby() {
    vgroup_name ="";
    vcategory_id = "";
    vfriendLikes = "";
    vhobbysearch = true;
    if (gethobbyBool) {
        pagination("1");
     } else {
        getHobby();
    }
}

function sreachbyfriend() {
    vhobbysearch = false;
    vgroup_name="";
    vcategory_id = "";
    if (getMyfriendGroupBool) {
        pagination("1");
    } else {
        getMyfriendGroup();
    }
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
                opertype: 'groupsearch', //操作码,
                group_name: vgroup_name,
                category_id: vcategory_id,
                hobbysearch: vhobbysearch,
                hobby: vhobby,
                friendLikes: vfriendLikes,
                myGroup: vmyGroup
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
    $('#fList').empty();
    if (data.result && data.rows) {
        var box = $('#fList');
        $.each(data.rows, function (i, v) {
            var lpath = v.logo_path;
            if (lpath == "") {
                lpath = "images/default/64-64.jpg"
            }
            var html = "<li><div class='lMr2'><a href='relationship_mygroup_info.html?id=" + v.id + "'><img src='../" + lpath + "' alt='' /></a></div>" +
					   "<div class='dTbc'><table border='0' cellspacing='0' cellpadding='0'><tbody>" +
					   "<tr><td colspan='2' class='fd_b_name 'style='position:relative;' ><a class = 'ellipsis' title ='" + v.group_name + "' style='width:350px;display:inline-block' href='relationship_mygroup_info.html?id=" + v.id + "'>" + v.group_name + "</a> <i class='red' style='position:absolute; right:100;'>" + v.member_nbr + "人</i></td></tr>" +
                       "<tr><td class='fd_tit'>分&emsp;&emsp;类：</td><td>" + v.category_name + "</td></tr>" +
                       "<tr><td colspan='2'><div class='heat'><div class='tit'>关&ensp;注&ensp;度：</div><div class='score'><i class='iBar'><i style='width:" + v.follow_score + "%;'></i><em>" + v.follow_score + "%</em></i></div>" +
                       "<div class='tit'>活&ensp;跃&ensp;度：</div><div class='score'><i class='iBar'><i style='width:" + v.activity_score + "%;'></i><em>" + v.activity_score + "%</em></i></div>" +
                       "</div></td></tr>" +
                       "<tr><td class='fd_tit'>圈子描述：</td><td ><p  title ='" + v.summary + "'  class = 'ellipsis' style='width:500px;display:inline-block' >" + v.summary + "</p></td></tr></tbody>" +
                       "</table></div><div class='flBtnDiv'>";

            if (v.is_authorized == "") {
                html += " <a href=\"javascript:joinGroup('" + v.id + "','" + v.is_kick_protected + "','" + v.join_method_id + "','" + v.join_fee + "')\" class='add' id='group" + v.id + "'>申请加入</a>";
            } else if (v.is_authorized == "False") {
                html += "等待审核";
            } else if (v.join_fee != "0" && v.is_pay == "False") {
                html += "等待审核";
            }

            html += " <a href='relationship_mygroup_info.html?id=" + v.id + "' class='greet'>了解更多</a></div></li>";
            box.append(html);
          
        });
    }
    liMousemoveSearch();
   
}


function liMousemoveSearch() {
    $(".search_result li").hover(function () {
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
    })

}

var joinid;
function joinGroup(id, bo, method, fee) {
    joinid = id;
   
    if (bo == "True") {
        
        $.ajax({
            url: "../wandao_group.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'ifcanjoin',group_id:'" + id + "',user_id:'" + wd_B.uin.uid + " '}",
            error: function (data) {
               // alert("error")
            },
            success: function (data) {
                successcanaddfun(data.result, method, fee);
            }
        });


    } else {
        successcanaddfun("True", method, fee);
    }
}


function successcanaddfun(data, method, fee) {
    
    if (data) {
      
        if (method == "直接加入") {
            $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'directlyjoin',group_id:'" + joinid + "',user_id:'" + wd_B.uin.uid + " '}",
                error: function (data) {
                  //  alert("error")
                },
                success: function (data) {
                    successaddfun(data);
                }
            });
        } else {
           
            $.ajax({
                url: "../wandao_group.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'waitjoin',group_id:'" + joinid + "',user_id:'" + wd_B.uin.uid + " '}",
                error: function (data) {
                  //  alert("error")
                },
                success: function (data) {
                    successaddfun(data);
                }
            });
        }

    } else {
        $("#group" + joinid).hide().parent().prepend(wanerdaoLangTip('relationship_00012')); 
    }
}


function successaddfun(data) {
    if (data.msg == "wait") {
        $("#group" + joinid).hide().parent().prepend(wanerdaoLangTip('relationship_00013'));
    } else if (data.msg == "nojoin") {
        $("#group" + joinid).hide().parent().prepend(wanerdaoLangTip('relationship_00012')); 
    } else {
        window.location.href = "relationship_mygroup_info.html?id=" + joinid;
    }
}