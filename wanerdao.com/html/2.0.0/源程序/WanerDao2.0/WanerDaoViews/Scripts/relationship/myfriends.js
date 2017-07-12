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


//绑定我的好友分组
function getMyfriendGroup() {
    $.ajax({
        url: "../wandao_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getFriendsGroup'}",
        error: function (data) {
            alert("error")
        },
        success: function (data) {
            if (data.result && data.rows) {
                var friendUL = $('#ul_friendsgroup');
                friendUL.empty();
                var sum = 0;
                $.each(data.rows, function (i, v) {
                    friendUL.append("<li><a href=\"javascript:searchByClass('" + v.id + "')\">" + v.name + "(" + v.num + ")" + "</a></li>");
                    sum -= -v.num;
                });
                friendUL.prepend("<li class='cur'><a href=\"javascript:searchByClass('')\">全部好友 <span class='fn'>(" + sum + ")</span></a></li>");
            }
        }
    });
}


//按分组查询
function searchByClass(classsid) {
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
                        opertype: 'getfriendsList',
                        titOrContent: key,
                        pyKey:pyKey,
                        class_id: classid
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

            var html = "<li><i class='cbtn'><input type='checkbox' class='checkFriend' value= '" + v.user_id + "' /></i> <i class='iPic'><a href='../personal/personal_info.html?uid=" + v.user_id + "' target='_blank' title='" + v.name + "'><img src='v.logo_small_path' alt='" + v.name + "' /></a></i>" +
                    "<dl class='fInfo'><dt><p class='makeRela'><a href=\"javascript:deleteMyfriend('" + v.user_id + "');\" class='btn_delrela'><img src='../images/btn_delrelation.png' /></a>" + 
                    "<p class='makeRela'>";
            if (v.attention_id != 'N') {
                html += "<a href='#' class='btn_focused'><img src='../images/btn_focused.png' /></a><a id='" + v.user_id + i + "' href=\"javascript:cancelfocus('" + v.user_id + i + "','" + v.user_id + "');\" class='btn_cancelfocus'><img src='../images/btn_cancelfocus.png' /></a>";
            } else {
                html += "<a href='#' class='btn_focused'><img src='../images/btn_focused.png' style='display:none' /></a><a id='" + v.user_id + i + "' href=\"javascript:cancelfocus('" + v.user_id + i + "','" + v.user_id + "');\" class='btn_cancelfocus'><img src='../images/btn_focus.png' /></a>";
            }
            html += "</p>[<a href='#' class='gray'>" + v.relation_name + "</a>] <a href='../personal/personal_info.html?uid=" + v.user_id + "' class='lblue'>" + v.name + "</a> </dt> <dd><p class='sign'>好友动态</p></dd></dl></li>";
            box.append(html);
        });
    }
    liMousemove();
   
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
            alert("error")
        },
        success: function (data) {
            if (data == "1") {
                
                $("#" + obj).html("<img src='../images/btn_focus.png' />").prev().children().hide();
            } else if (data == "2") {

                $("#" + obj).html("<img src='../images/btn_cancelfocus.png' />").prev().children().show();
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
            alert("error")
        },
        success: function (data) {
            pagination(currentPage, currentkey, currentpyKey, currentclassid);
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
                alert("error")
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
                alert("error")
            },
            success: function (data) {
                pagination(currentPage, currentkey, currentpyKey, currentclassid);
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
            alert("error")
        },
        success: function (data) {
            if (data.result && data.rows) {
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
    $('.layer').css({ position: "absolute", 'top': $(obj).offset().top + 20, 'left': $(obj).offset().left });
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
                alert("error")
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
       