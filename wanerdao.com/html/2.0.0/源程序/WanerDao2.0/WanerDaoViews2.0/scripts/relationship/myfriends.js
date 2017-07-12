$(document).ready(initData);

var currentPage;
var currentclassid = "";
var currentkey = "";
var currentpyKey = "";
function initData() {
    getMenu(0);
    getMyfriendGroup();
    pagination(1, currentkey, currentpyKey, currentclassid);
    currentPage = 1;


}

function showupdateClassName(id) {
    $("#span" + id).hide();
    $("#input" + id).show();
}

function updateClassName(id) {
    $.ajax({
        url: "/wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updateclassname',class_id:'" + id + "',relation_name:'" + $("#input" + id).val() + "'}",
        error: function (data) {
            // alert("error")
        },
        success: function (data) {
            if (data.result) {
                $("#span" + id).html($("#input" + id).val()).show();
                $("#input" + id).hide();
            } else {
                $("#span" + id).show();
                $("#input" + id).hide();
            }
        }
    });
   
}
function delClass(num, id) {
    if (num == 0) {
        new pop({ typename: 'confirm', msginfo: wanerdaoLangTip('relationship_00071'), callback: function () {
                $.ajax({
                    url: "/wandao_friend.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'deletemyclass',class_id:'" + id + "'}",
                    error: function (data) {
                        // alert("error")
                    },
                    success: function (data) {
                        getMyfriendGroup();
                    }
                });
            } 
        });
      
    } else {
        new pop({ typename: 'message', msginfo: wanerdaoLangTip('relationship_00070') });
    }
}

//绑定我的好友分组
function getMyfriendGroup() {
    $.ajax({
        url: "/wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getFriendsGroup'}",
        error: function (data) {
            // alert("error")
        },
        success: function (data) {
            if (data.result && data.rows) {
                var friendUL = $('#ul_friendsgroup');
                friendUL.empty();
                var sum = 0;
                $.each(data.rows, function (i, v) {
                    var x = i - (-1);

                    friendUL.append("<li  style='position:relative;' ><input style='width:150px;display:inline-block;display:none' onblur=\"updateClassName('" + v.id + "')\"  id='input" + v.id + "' value='" + v.name + "'></input><a title = '" + v.name + "' href=\"javascript:searchByClass('" + x + "','" + v.id + "')\"><span style='width:150px;display:inline-block' class='ellipsis' id='span" + v.id + "'>" + v.name + "</span><em style='position:absolute; right:30;'>(" + v.num + ")</em>"
                                 + "</a><a class='icon icon-edit grop-edit' title='编辑' href=\"javascript:showupdateClassName('" + v.id + "')\" ></a><a class='icon icon-blue-close grop-del' title='删除' href=\"javascript:delClass('" + v.num + "','" + v.id + "')\" ></a></li>");
                    sum -= -v.num;
                });
                friendUL.prepend("<li class='cur'><a href=\"javascript:searchByClass(0,'')\">全部好友 <span class='fn'>(" + sum + ")</span></a></li>");
            }
        }
    });
}


//按分组查询
function searchByClass(obj, classsid) {
    $('#ul_friendsgroup li').removeClass("cur");
    $('#ul_friendsgroup li:eq('+obj+')').addClass("cur");
    pagination(1, currentkey, currentpyKey, classsid);
    currentclassid = classsid;
}

//按字母查询
function searchByPY(py) {
    pagination(1, currentkey, py, currentclassid);
    currentpyKey = py;
}





/*pagination*/
function pagination(currPage,key,pyKey, classid) {
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
                opertype: 'getfriendsList', //操作码,
                titOrContent: key,
                pyKey: pyKey,
                class_id: classid
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

            var html = "<li><i class='cbtn'><input type='checkbox' class='checkFriend' value= '" + v.user_id + "' /></i> <i class='iPic'><a href='../personal/personal_info.html?uid=" + v.user_id + "' target='_blank' title='" + v.name + "'><img src='"+v.logo_small_path+"' alt='" + v.name + "' /></a></i>" +
                    "<dl class='fInfo'><dt><p class='makeRela' ><a href=\"javascript:deleteMyfriend('" + v.user_id + "');\" class='btn_delrela'><img src='../images/btn_delrelation.png' /></a> </p>" +
                    "<p class='makeRela' >";
            if (v.attention_id != 'N') {
                html += "<a  href='#'  class='btn_focused'><img src='../images/btn_focused.png' /></a><a id='" + v.user_id + i + "' href=\"javascript:focus('" + v.user_id + i + "','" + v.user_id + "',false);\" class='btn_cancelfocus'><img src='../images/btn_cancelfocus.png' /></a>";
            } else {
                html += "<a  href='#'  class='btn_focused'><img src='../images/btn_focused.png' style='display:none' /></a><a id='" + v.user_id + i + "' href=\"javascript:focus('" + v.user_id + i + "','" + v.user_id + "',true);\" class='btn_cancelfocus'><img src='../images/btn_focus.png' /></a>";
            }
            html += "</p>[<a href='#' class='gray'>" + v.relation_name + "</a>] <a href='../personal/personal_info.html?uid=" + v.user_id + "' class='lblue'>" + v.name + "</a> </dt> <dd><p class='sign'>好友动态</p></dd></dl></li>";
            box.append(html);
        });
    }
    liMousemove();
   
}

//关注操作，type为true是关注，为type为false是取消关注
function focus(obj, id, type) {
    if (type)
        follow(obj, id);
    else
        cancelFollow(obj, id);
}

//取消
function follow(obj, id) {
    $.ajax({
        url: "createpersonalfriendsfollow_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'createpersonalfriendsfollow',friendId:'" + id + "'}",
        error: function (data) {
            // alert("error")
        },
        success: function (data) {
            if (data.result)
                $("#" + obj).attr('href', "javascript:focus('" + obj + "','" + id + "',false)").html("<img src='../images/btn_cancelfocus.png' />").prev().children().show();
        }
    });
}

//取消
function cancelFollow(obj, id) {
    $.ajax({
        url: "cancelpersonalfriends_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'cancelpersonalfriendsfollow',friendId:'" + id + "'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            if (data.result) {
                $("#" + obj).attr('href', "javascript:focus('" + obj + "','" + id + "',true)").html("<img src='../images/btn_focus.png' />").prev().children().hide();   
            }
        }
    });
}


//删除我的好友
function deleteMyfriend(userID) {
    $.ajax({
        url: "../wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deleteMyfriend',friend_id:'" + userID + "'}",
        error: function (data) {
           // alert("error")
        },
        success: function (data) {
            pagination(currentPage, currentkey, currentpyKey, currentclassid);
            getMyfriendGroup();
        }
    });
}


function liMousemove() {
    $(".fList li").hover(function () {
        $(this).addClass("mHover");
    }, function () {
        $(this).removeClass("mHover");
    })
}



//添加好友分组
function addGroup() {
    var txtgroupName = $("#txt_addGroup");
    if(txtgroupName.val()!="请输入分组名称"){
        $.ajax({
            url: "../wandao_friend.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'addFriendsGroup',relation_name:'" + txtgroupName.val() + "'}",
            error: function (data) {
              //  alert("error")
            },
            success: function (data) {
                getMyfriendGroup();
                txtgroupName.val("");
            }
        })
    }

}

function changeCheck(obj) {
    if ($(obj).is(":checked")) {
        $(".checkFriend").attr("checked", true);
    } else {
        $(".checkFriend").attr("checked", '');
    }
}

//批量删除好友
function deleteAllFriend() {
    var idStr = "";
    $(".checkFriend").each(function () {
        if ($(this).is(":checked") && $(this).val() !="on") {
            idStr += $(this).val()+","
        }
    });
    if (idStr != "") {
        $.ajax({
            url: "../wandao_friend.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'deleteAllMyfriend',friend_id:'" + idStr + "'}",
            error: function (data) {
               // alert("error")
            },
            success: function (data) {
                pagination(currentPage, currentkey, currentpyKey, currentclassid);
                getMyfriendGroup();
            }
        });
    }
}

//修改分组
function mouseupdeal() {
    $.ajax({
        url: "../wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getFriendsGroup'}",
        error: function (data) {
          //  alert("error")
        },
        success: function (data) {
            if (data.result && data.rows) {
                $('#selectclassUL').empty();
                var classUL = $('#selectclassUL');
                $.each(data.rows, function (i, v) {
                    classUL.append(" <li><a href=\"javascript:setClass('" + v.id + "')\">" + v.name + "</a></li>");
                  
                });
            }
        }
    });

    $('.layer').show().click(EX.stop);
    setTimeout(function () { EX.addEvent.call(document, 'click', hidesuggest); });
}

function hidesuggest() {
    $('.layer').hide();
    EX.removeEvent.call(document, 'click', hidesuggest);
}


function mousedowndeal(obj) {
    $('#selectclassUL').empty();
    $(obj).parent().parent().css({ position: "relative" });
    $(obj).parent().parent().find(".layer").css({ display: "block" });
    $(obj).parent().parent().find(".layer").css({ position: "absolute", 'top': $(obj).offset().top + 20, 'left': $(obj).offset().left });

   // $('.layer').css({ position: "absolute", 'top': $(obj).offset().top + 20, 'left': $(obj).offset().left });
}


function setClass(id) {
    var idStr = "";
    $(".checkFriend").each(function () {
        if ($(this).is(":checked") && $(this).val() != "on") {
            idStr += $(this).val() + ","
        }
    });
    if (idStr != "") {
        $.ajax({
            url: "../wandao_friend.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'updateclass',friend_id:'" + idStr + "',class_id:'"+id+"'}",
            error: function (data) {
              //  alert("error")
            },
            success: function (data) {
                pagination(currentPage, currentkey, currentpyKey, currentclassid);
                getMyfriendGroup();
            }
        });
    }
    hidesuggest();
}
var EX = {
    addEvent: function (k, v) {
        var me = this;
        if (me.addEventListener)
            me.addEventListener(k, v, false);
        else if (me.attachEvent)
            me.attachEvent("on" + k, v);
        else
            me["on" + k] = v;
    },
    removeEvent: function (k, v) {
        var me = this;
        if (me.removeEventListener)
            me.removeEventListener(k, v, false);
        else if (me.detachEvent)
            me.detachEvent("on" + k, v);
        else
            me["on" + k] = null;
    },
    stop: function (evt) {
        evt = evt || window.event;
        evt.stopPropagation ? evt.stopPropagation() : evt.cancelBubble = true;
    }
};
       