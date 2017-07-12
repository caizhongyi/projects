var setLayerCount = "2"; //回复层数
var commentCount = '2'; // 每一层回复显示个数(即第二层显示个数，如查询个数多余设置个数，显示更多)
function getleavmessage(aid) {
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: '#ulmessagebody', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
        callback: getleavemessagedetail,
        pagermore: true,
        ajax: {
            url: 'pop_common.axd', //此处必须填写，分页已没有固定处理工厂
            param: {
                pagecurrent: 1,
                pageSize: 5,
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                active_posts_id: aid,
                opertype: 'leavesinglemessage'//操作码

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
var follow_id ="";
var active_posts_id ="";
function getleavemessagedetail(data) {
    var vcontent="";
    if (data.total != "0" && data.result == "True") {
        $.each(data.rows, function (i, msg) {
            vcontent += ("<li><img class=\"photo mbUseravatar\" width=\"51\" height=\"51\" alt=\"\" src=\"" + msg.userlogo + "\"/>");
            vcontent += ("<div class=\"mbContent\">");
            vcontent += ("<div class=\"mbUsername\">" + msg.username + "<span class=\"addUser\"></span><span class=\"addReplay\"></span></div>");
            vcontent += ("<div class=\"mbMain\">");
            vcontent += ("<p>" + msg.content + "</p>");
            vcontent += ("<p class=\"mbTime\"><span class=\"f_right replayBtn\"><a href=\"###\" id=\"a" + msg.id + "\" action=\"a_restore\"  >回复</a></span>" + dateStr(msg.createdate) + "</p>");
            var twoLevelRows = msg.rows;
            if (twoLevelRows != null && twoLevelRows != undefined && twoLevelRows != "") {
                var twoLevelRowsJSON = $.parseJSON(twoLevelRows);
                if (twoLevelRowsJSON.result = "True") {
                    var currentTotal = twoLevelRowsJSON.rowCount; //当前的记录数；
                    vcontent += ("<div class=\"replay-content\"  action=\"restorediv\"><img class=\"arrowhead\" src=\"../images/home/ico_17x9.png\"/>");
                    vcontent += ("<input  type=\"text\"   class=\"text\"/>");
                    vcontent += ("<input  type=\"submit\"  action=\"restoresure\" id=\"" + msg.id + "\"  class=\"button button2\" value=\"回复\"/>");
                    vcontent += ("<input  type=\"submit\"  action=\"restorecancle\"  class=\"button btn_w56 btnGary_56 btn_h28\" value=\"取消\"/>");
                    vcontent += ("<ul>");
                    $.each(twoLevelRowsJSON.data, function (j, twomsg) {
                        follow_id = twomsg.follow_id;
                        active_posts_id = twomsg.active_posts_id;
                        vcontent += ("<li class=\"clearfix\"> <img  class=\"photo\" alt=\"" + twomsg.username + "\" title=\"" + twomsg.username + "\" width=\"51\" height=\"51\" src=\"" + twomsg.userlogo + "\"/>");
                        vcontent += ("<div class=\"overflow\">");
                        vcontent += ("<p>" + twomsg.content + "</p>");
                        vcontent += ("<div class=\"time\">"  +dateStr(twomsg.createdate)  + "</div>");
                        //vcontent += ("<div class=\"replay\"><a  href=\"###\">删除</a><a  href=\"javascript:void(0);\">回复</a></div>");
                        vcontent += ("</div>");
                        vcontent += ("</li>");
                    });
                    vcontent += ("</ul>");
                    vcontent += ("<div class=\"showall\">");
                    if (currentTotal > commentCount) {
                        vcontent += ("<a  href=\"###\" onclick=\"outspread_content(this,'" + currentTotal + "','" + active_posts_id + "','" + follow_id + "')\" class=\"replayshow\">更多回复</a>&nbsp;");
                    }
                    vcontent += ("<a  href=\"###\"  action=\"replaypackup\" class=\"replaypackup\">收起</a></div>");
                    vcontent += ("</div>");
                }
            }
            vcontent += ("</div>");
            vcontent += ("</div>");
            vcontent += ("</li>");
        });
        $("#ulmessagebody").html(vcontent);
    }
    else {
        $("#ulmessagebody").html("");
        $(".pageList").html("");
    }
}


//显示更多回复:rowTotalCount:该层回复的总个数，active_posts_id：活动id，follow_id:回复主题Id
function outspread_content(obj, rowTotalCount, active_posts_id, follow_id) {
    var vcontent = "";
    $.ajax({
        url: "leavemessage_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'displayleavemessage',active_posts_id:'" + active_posts_id +
                    "',follow_id:'" + follow_id + "',offsetcount:" + commentCount +
                     ",rcount:" + parseInt(parseInt(rowTotalCount) - parseInt(commentCount)) + "}",
        error: function (data) { },
        success: function (data) {
            $.each(data.rows, function (i, twomsg) {
                vcontent += ("<li class=\"clearfix\"> <img  class=\"photo\" alt=\"" + twomsg.username + "\" title=\"" + twomsg.username + "\" width=\"51\" height=\"51\" src=\""+twomsg.userlogo+"\"/>");
                vcontent += ("<div class=\"overflow\">");
                vcontent += ("<p>" + twomsg.content + "</p>");
                vcontent += ("<div class=\"time\">" +dateStr(twomsg.createdate) + "</div>");
                //vcontent += ("<div class=\"replay\"><a  href=\"###\">删除</a><a  href=\"###\">回复</a></div>");
                vcontent += ("</div>");
                vcontent += ("</li>");
            });
            $(obj).parent().prev().append(vcontent);
            $(obj).hide();
        }
    });
}

$("a[action=a_restore]").live("click", function () {
    var $obj = $(this);
    var aid = $obj.attr("id");
    var followid = aid.substr(1, aid.length); 
    var $objp = $obj.parent().parent();
    var restore = $objp.next().html();
    if (restore == null) {
        vcontent = "";
        vcontent += ("<div action=\"restorediv\" class=\"replay-content\"><img class=\"arrowhead\" src=\"../images/home/ico_17x9.png\"/>");
        vcontent += ("<input  type=\"text\" class=\"text\"/>");
        vcontent += ("<input  type=\"submit\" action=\"restoresure\" id=\"" + followid + "\" class=\"button button2\" value=\"回复\"/>");
        vcontent += ("<input  type=\"submit\"  action=\"restorecancle\" class=\"button btn_w56 btnGary_56 btn_h28\" value=\"取消\"/>");
        vcontent += ("</div>");
        $objp.after(vcontent);
    }
    else if ($objp.next("div").is(":hidden")) {
        $objp.next("div").show();
    }
});



/***************以下是二级回复相关操作**************/

$("input[action=restoresure]").live("click", function () {
    var objText = $(this).prev();
    var textfield = objText.val().replace(/\s/g, "");
    if (objText.val().replace(/\s/g, "") == "") {
        displayMessage($(this),"很抱歉，请输入回复信息", "0", -30, 30);
        objText.focus();

    }
    else if (textfield.length > 200) {
        displayMessage($(this), "很抱歉，回复内容不可以超过200字符！", "0", -60, 30);
        objText.focus();
    }
    else {
        var followid = $(this).attr("id");
        restoreAjax($(this), activity_id, followid, textfield, "2");
        var vcontent = "";
        var objNextContent = $(this).next().next().html();
        vcontent += ("<li class=\"clearfix\"> <img  class=\"photo\" alt=\"" + wd_B.uin.name + "\" title=\"" + wd_B.uin.name + "\" width=\"51\" height=\"51\" src=\"" + wd_B.uin.small_logo + "\"/>");
        vcontent += ("<div class=\"overflow\">");
        vcontent += ("<p>" + textfield + "</p>");
        vcontent += ("<div class=\"time\">" + dateStr(new Date()) + "</div>");
        //vcontent += ("<div class=\"replay\"><a  href=\"###\">删除</a><a  href=\"###\">回复</a></div>");
        vcontent += ("</div>");
        vcontent += ("</li>");
        if (objNextContent == null) {
            vcontent = "<ul>" + vcontent + "</ul>";
            $(this).next().after(vcontent)
        } else {
            $(this).next().next().prepend(vcontent);
        }
        objText.val("");
    }
});

$("input[action=restorecancle]").live("click", function () {
    $(this).parent().hide();
});

$("div[action=restorediv]").live("mouseout", function () {
     //$(this).hide();
}).live("mouseover", function () {
   $(this).show();
});

$("a[action=replaypackup]").live("click", function () {
    //alert(wd_B.uin.name);
    //alert(wd_B.uin.small_logo);
    $(this).parent().parent().hide();
});

/*************以上是二级回复相关操作**************/

//回复内容(一级回复）
$("#btnreplay").click(function () {
    var $objtextfield = $("#txtreplay");
    var $objbtn = $(this);
    var textfield = $objtextfield.val().replace(/\s/g, "");
    if (textfield == "") {
       displayMessage($objbtn,"很抱歉，请输入回复信息","0",8,3);
        $("#txtreplay").focus();
    }
    else if (textfield.length > 200) {
        displayMessage($objbtn,"很抱歉，回复内容不可以超过200字符！","0",8,3);
        objText.focus();
    }
    else {
        restoreAjax($objbtn,activity_id, "-1", textfield, "1")
        $("#txtreplay").val("");
    }
});

//显示提示信息
function displayMessage(obj,showmessage, messagetype,offsetleft, offsettop) {
    var strWidth = obj.width();
    var position =obj.offset();
   
    var left = position.left + strWidth;
    var top = position.top;
    var strMessage = "<span  style='color:green;font-size:14px; font-weight:bold;'>" + showmessage + "</span>";
    if (messagetype == "0") {
        strMessage = "<span style='color:red;font-size:14px; font-weight:bold;'>" + showmessage + "</span>";
    }
    $("#showMessage").html(strMessage).css("left", parseInt(left + offsetleft))
                 .css("top", parseInt(top + offsettop)).fadeIn(1000).fadeOut(4000);
}

 //type=1:一级回复，type=2: 二级回复
function restoreAjax(obj,active_posts_id, follow_id, content,type) {
    var pars = "{opertype:'insertactivitycomments',active_posts_id:'" + active_posts_id + "',follow_id:'" + follow_id + "',user_id:'" + wd_B.uin.uid + "',content:'" + content + "'}";
    $.ajax({
        url: "restore_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: pars,
        error: function (data) { },
        success: function (data) {
            if (data.result == true) {
                if (type == "1") {
                    displayMessage(obj, "恭喜保存成功！", "1", 8, 3);
                    getleavmessage(activity_id);
                }
                else (type == "2")
                {
                    displayMessage(obj, "恭喜保存成功！", "1", 6, 30);
                }
            } else {
                if (type == "1") {
                    displayMessage(obj, "很抱歉，保存失败！", "0", 8, 3);
                }
                else {
                    displayMessage(obj,"很抱歉，保存失败！", "0", 6, 30);
                }
            }
        }
    });
}
