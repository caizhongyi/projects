var fid = "0"; //当前相册ID
var activity_id = '0';
var setLayerCount = "2"; //回复层数
var commentCount = '5'; // 每一层回复显示个数
var currentPhtoId = "";
var picsJson = "";
var pList = [];
var currentIndex = 0;
$(function () {
    if (getQueryString("id") != null && getQueryString("id") != "undefined") {
        fid = getQueryString("id");
    }
    if (getQueryString("aid") != null && getQueryString("aid") != "undefined") {
        activity_id = getQueryString("aid");
    }
    $("#uploadalbum").attr("href", $("#uploadalbum").attr("href").replace("{0}", activity_id));
    $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", activity_id));
    $("#editphoto").attr("href", $("#editphoto").attr("href").replace("{0}", activity_id));
    $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", activity_id));
    //我的周末派对<span class="num">(24)</span>
    $.ajax({
        url: "photo_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivityimagebyfoldid', folder_id:'" + fid + "'}",
        beforeSend: function () {
            $('.vedio-panel').html('<li style="float: left;">loading.... </li>');
        },
        error: function (data) { },
        success: function (data) {
            $('.album-title').html(data.foldername + '<span class="num">(' + data.total + ')</span>');
            if (data.result === "True") {
                if (data.rows.length > 0) {                    
                    currentIndex = 0;
                    var box = $('.vedio-panel').empty();
                    $.each(data.rows, function (i, v) {
                        pList.push({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                        if (i === 0) {
                            setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                        }
                        var li = jQuery('<li style="float: left;" ></li>').appendTo(box);
                        li.append('<a href="javascript:;"><img src="' + v.image_small_path + '" alt="' + v.image_name + '" style=" width: 205px; height: 145px;"><span class="icon player-icon" href="javascript:;"></span></a>');
                        li.click(function () {
                            setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                        });
                    });
                    if (data.rows.length > 1) {
                        $('.pager-next').show();
                    }
                    new $.ui.tabs('.vedio-tabs', {
                        effect: 'x',
                        widget: {
                            panel: '.vedio-panel',
                            clip: '.vedio-clip',
                            prev: '.vedio-prev',
                            next: '.vedio-next'
                        }

                    });
                    photoScroll();
                }
                else {
                    $('.vedio-panel').html('<li style="float: left;">' + wanerdaoLangTip('common_00005') + '</li>');
                }
            }
            else {
                //<li style="float: left;"> <a href="javascript:;"><img src="../images/photos/photo1.gif" alt=""><span class="icon player-icon" href="javascript:;"></span></a> </li>
                $('.vedio-panel').html('<li style="float: left;">' + wanerdaoLangTip('common_00005') + '</li>');
            }

        }
    });

});

function setPhoto(model) {
    currentIndex = model.index;
    prenext();
    $('.yellow-pager').find('img').attr('src', model.path).attr('alt', model.name);
    //$('.yellow-pager').html($wd.format('<img alt="{0}" src="{1}" width="960px"/>', model.name, model.path));
    $('h3').html($wd.format('{0}&nbsp;&nbsp;({1})&nbsp;&nbsp;', model.name, model.date));
    if (model.desc.length > 0) {
        $("#picinfo").html(model.desc);
    }
    else {
        $("#picinfo").html(wanerdaoLangTip('common_00079'));
    }
    //getphotoinfor(model.id);
    $('.replay-content').remove();
    $("#activityreplay a").unbind("click").click(function () {
        $("#activityreplay").replycontent({
            posts_id: model.id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
            getreply:
            {
                getreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                getreplyop: 'photosinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            deletereply:
            {
                delreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                delreplyop: 'delsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            addreply:
            {
                addreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                addreplyop: 'addsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            loadrecordlimit: 5, //加载条数限制
            replyconfig: {
                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        });
    });
}
function prenext() {
    if (pList.length===1) {
        $('.yellow-pager').find('.pager-prev').hide();
        $('.yellow-pager').find('.pager-next').hide();
    }
    else if (currentIndex === 0 ) {
        $('.yellow-pager').find('.pager-prev').hide();
        $('.yellow-pager').find('.pager-next').show();
    }
    else if (currentIndex < pList.length - 1) {
        $('.yellow-pager').find('.pager-prev').show();
        $('.yellow-pager').find('.pager-next').show();
    }
    else {
        $('.yellow-pager').find('.pager-prev').show();
        $('.yellow-pager').find('.pager-next').hide();
    }
}

function photoScroll() {
    var pre = $('.yellow-pager').find('.pager-prev');
    var next = $('.yellow-pager').find('.pager-next');
    pre.click(function () {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;
            setPhoto(pList[currentIndex]);
        }
    });

    next.click(function () {
        if (currentIndex < pList.length - 1) {
            currentIndex = currentIndex + 1;
            setPhoto(pList[currentIndex]);
        }
    });
}
function getphotoinfor(pid) {
    currentPhtoId = pid;
    getLeavmessage(pid);
}
function getLeavmessage(pid) {
    $("#huifuid").myPagination({
        currPage: 1,
        callback: getContent,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            param: {
                pageSize: 5,
                opertype: 'leavesinglemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                active_posts_id: pid
            }
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
            showpageno: false,
            tipmsg: '第{tip}页',
            msg_on: false,
            link: '#',
            msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
            text: {
                width: '22px'
            }
        }

    });

    function getContent(data) {
        //$('#totalMesage').html('(' + data.total + '条留言)');
        var strContent = "";
        strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));
        $('#messageContent').html(strContent);

    }



    function appendHtml(Data, currentLayer, showLayer) {
        var strContent = "";
        if (parseInt(currentLayer) < parseInt(showLayer)) {
            $.each(Data, function (i, msg) {
                strContent += ("<div class=\"hdpj_g_box\">");
                strContent += ("<ul>");
                strContent += ("<li>");
                strContent += ("<span class=\"hd_pj_leftex\"><a href=\"#\" class=\"blue\">" + msg.username + "</a>&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
                strContent += ("</li>");
                strContent += ("<li>" + msg.content + "</li>");
                strContent += ("<li class=\"oInfo\">");
                strContent += ("<p class=\"replyOpera\">");
                rowsDate = msg.rows;
                oneDate = "0";
                varRowTotalCount = "0";
                if (rowsDate != null && rowsDate != "") {
                    oneData = $.parseJSON(rowsDate);
                    varRowTotalCount = oneData.rowCount
                }
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
                //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
                //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
                //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
                //strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
                strContent += ("</p>");
                strContent += ("<span class=\"pTime\">" + msg.createdate + "</span>");
                strContent += ("</li>");
                strContent += ("</ul>");
                strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/talk_peo_img.png\" width=\"50\" height=\"50\" /></a></div>");
                strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                strContent += ("<div class=\"hd_picpl_box\">");
                strContent += ("<ins></ins>");
                strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:760px;'>");
                strContent += ("<div class=\"picpl_form_box\">");
                strContent += ("<div>");
                strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
                strContent += ("<input type=\"button\" name=\"button\" onclick=\"twoLeavelHuifu('" + msg.id + "')\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("</div>");
                strContent += ("</div>");
                rowsDate = msg.rows;
                if (rowsDate != null && rowsDate != "") {
                    $.each(oneData.data, function (j, oneMsg) {
                        active_posts_id = oneMsg.active_posts_id;
                        follow_id = oneMsg.follow_id;
                        strContent += ("<div class=\"picpl_huif_box\">");
                        strContent += ("<div class=\"huif_left\"><img src=\"../images/talk_peo_img.png\" width=\"37\" height=\"37\" /></div>");
                        strContent += ("<div class=\"huif_right\" style=\"width:710px;\">");
                        strContent += ("<div class=\"huif_text\">");
                        strContent += oneMsg.content;
                        strContent += ("</div>");
                        strContent += ("<div class=\"huif_line\">");
                        strContent += ("<span class=\"huif_time\">" + oneMsg.createdate + "</span>");
                        strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
                        strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
                        strContent += ("</div>");
                        strContent += ("</div>");
                        strContent += ("</div>");
                    });
                    strContent += ("<div class=\"huif_more\">");
                    strContent += ("<div class=\"huif_colse_an\"><a href=\"###\" onclick=\"hideDetReply(this);\">收起</a></div>");
                    strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
                    strContent += ("</div>");
                }
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("<div class=\"xia_b_xian\"></div>");
                strContent += ("</div>");
            });
        }
        return strContent;
    }
}

$(".hdpj_g_box").live("mouseout", function () {
    $(this).removeClass("hdpj_mhover")
}).live("mouseover", function () {
    $(this).addClass("hdpj_mhover")
});

$("a[type =hide]").live('click', function () {
    $(this).parent().hide();
    $parent = $(this).parent().prevAll();
    $.each($parent, function (i) {
        var currentIndex = $(this).index();
        if (currentIndex > parseInt(commentCount)) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });
});
function showDetReply(obj) {
    var reObj = $(obj).parent().parent().parent().parent().find(".hd_picpl_box_con").eq(0)
    var fObj = reObj.parent();
    if (reObj.hasClass("hidden")) {
        $(obj).attr("title", "隐藏");
        reObj.removeClass("hidden");
        fObj.addClass("hdpj_on");
    }
    else {
        reObj.addClass("hidden");
        fObj.removeClass("hdpj_on");
        $(obj).attr("title", "展开")
    }
}
function hideDetReply(obj) {
    var reObj = $(obj).parent().parent().parent().parent().parent();
    var fObj = reObj.parent();
    reObj.addClass("hidden");
    fObj.removeClass("hdpj_on");
}

function outspreadContent(obj, rowTotalCount, active_posts_id, follow_id) {
    var strContent = "";
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
            $.each(data.rows, function (i, msg) {
                strContent += ("<div class=\"picpl_huif_box\">");
                strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
                strContent += ("<div class=\"huif_right\" style=\"width:710px;\" >");
                strContent += ("<div class=\"huif_text\">");
                strContent += msg.content;
                strContent += ("</div>");
                strContent += ("<div class=\"huif_line\">");
                strContent += ("<span class=\"huif_time\">" + msg.createdate + "</span>");
                strContent += ("<span class=\"huif_huif\"><a href=\"###\">回复</a></span>");
                strContent += ("<span class=\"huif_delete\"><a href=\"###\">删除</a></span>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</div>");
            });

            $(obj).parent().parent().prev().after(strContent);
            $(obj).hide();
        }
    });
}
function oneLeavalHuifu() {
    var textfield = $("#textfield").val().replace(/\s/g, "");
    if (textfield != "") {
        huifuAjax(currentPhtoId, "-1", textfield)
        $("#textfield").val("");
    }
    else {
        alert("请输入回复信息");
        $("#textfield").focus();
    }
}

function twoLeavelHuifu(follow_id) {
    var textfield = $("#textTwofield").val().replace(/\s/g, "");
    if (textfield != "") {
        huifuAjax(currentPhtoId, follow_id, textfield)
        $("#textTwofield").val("");
    }
    else {
        alert("请输入回复信息");
        $("#textTwofield").focus();
    }
}
$("input[type=button][class=picpl_hf_an02]").live("click", function () {
    $(this).parent().children("input").eq(0).val("");
});

function huifuAjax(active_posts_id, follow_id, content) {
    var pars = "{opertype:'insertactivitycomments',active_posts_id:'" + active_posts_id + "',follow_id:'" + follow_id + "',user_id:'" + wd_B.uin.uid + "',content:'" + content + "'}";
    $.ajax({
        url: "huifu_activity.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: pars,
        error: function (data) { },
        success: function (data) {
            if (data.msg == "恭喜，保存成功") {
                alert("恭喜，保存成功！");
                getLeavmessage(currentPhtoId);
            }
        }
    });
}
