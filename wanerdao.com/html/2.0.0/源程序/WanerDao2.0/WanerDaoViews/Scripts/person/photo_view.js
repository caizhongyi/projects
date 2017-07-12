var msgTip = {
    reply_content_null: '请输入回复内容',
    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}


var albumId;
var photoId;
var uid;
var pList = [];
var currentIndex = 0;
$(function () {
    albumId = getQueryString('albumId');
    photoId = getQueryString('photoId');
    uid = getQueryString('uid');
    if (!uid) uid = '';
    bindPTab(uid);

    if (albumId) {
        getAlbumList();
    }
    else {
        location.href = 'photo_album.html';
    }

    $('.reply').click(function () {
        var txt = $('.txt').val();
        if (txt) {
            addPhotoComment(photoId, txt, '', $('.txt'));
        } else {
            alert(wanerdaoLangTip('video_00009'));
        }
    });

    $('.cancle').click(function () {
        $('.txt').val('');
    });
});


/* get album list*/
function getAlbumList() {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumlist', pagecurrent:1, pageSize:1000000, guest_id:'" + uid + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                var box = $('ul.albums');
                $('.album_count').html('(' + data.rows.length + ')');

                $.each(data.rows, function (i, v) {
                    if (v.id.toLowerCase() == albumId) {
                        showAlbumPhoto(v.id, v.folder_name);
                    }
                    var li = jQuery('<li></li>').appendTo(box);
                    if (v.share_key_id == '-1') {
                        li.addClass('pers_bgc');
                    } else {
                        li.addClass('acti_bgc');
                    }

                    var div = jQuery('<div class="pers"></div>').appendTo(li);
                    div.append($wd.format('<div class="pic"><a href="javascript:;"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', v.cover_path));
                    div.append($wd.format('<div class="bm_info"><label>{0}</label><i>({1})</i></div>', v.folder_name, v.count));
                    div.append('<div class="per_hr_ico"></div>');
                    li.toggleAlbumTypeTip();
                    li.click(function () {
                        showAlbumPhoto(v.id, v.folder_name);
                    });

                });
                albumsScroll(); /* album list scroll*/
            }
        }
    });
}

/*show album photo*/
function showAlbumPhoto(alId, albName) {
    albumId = alId;
    $('.album_name').html(albName);
    $('.photo_detail').empty();
    $('.flashBox').find('div').empty();
    $('#photo').empty();
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="ico_alb_edit"></a>').appendTo($('.pe_set'));

    getPhotoListByAlbum();
}

/* get photo list by album */
function getPhotoListByAlbum() {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumphoto', pagecurrent:1, pageSize:1000000, folder_id:'" + albumId + "', guest_id:'" + uid + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            var box = $('div.ph_sPic').find('ul').empty();
            currentIndex = 0;
            pList = [];
            if (data.result) {
                $.each(data.rows, function (i, v) {
                    pList.push({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    //display current photo
                    if (photoId && v.id == photoId) {
                        setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    } else {
                        if (i == 0) {
                            setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                        }
                    }

                    var li = jQuery('<li></li>').css({ 'height': '140px', 'width': '140px' }).appendTo(box);
                    li.append('<a href="javascript:;"><img style="width:150px; height: 104px;" src="' + v.image_small_path + '" /></a>');
                    li.click(function () {
                        setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    });
                });

                photoScroll(); //滚动

                //comment
                $('#m_reply').click(function () {
                    var txt = $('.txt').val();
                    if (txt) {
                        addPhotoComment(photoId, txt, '', $('.txt'));
                    } else {
                        alert(msgTip.reply_content_null);
                    }
                });

                $('.com_num').click(function () {
                    $('.comments').toggle();
                });
            }
        }
    });
}

function setPhoto(model) {
    currentIndex = model.index;
    photoId = model.id;
    $('#photo').html('<img src="' + model.path + '" alt="' + model.name + '" width="700px" height="500px" />');
    var photo_detail = $('.photo_detail').empty();
    var hd = jQuery('<div class="hd"></div>').appendTo(photo_detail);
    hd.append($wd.format('{0}<em>{1}</em>', model.name, model.date));
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="doc"></a>').appendTo(hd);
    var bd = jQuery('<div class="bd"></div>').appendTo(photo_detail);
    bd.html(model.desc);

    getLeavmessage();
}

var setLayerCount = 2; //回复层数
var commentCount = '5'; // 每一层回复显示个数
/* comment */
function getLeavmessage() {
    $(".other_action").myPagination({
        currPage: 1,
        callback: getContent,
        cssStyle: 'noll',
        sidebarpage: true,
        url: '../pagination_common.axd',
        ajax: {
            param: {
                pageSize: 5,
                opertype: 'photosinglemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                id: photoId
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
        if (data.result && data.rows) {
            strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));

            $('#messageContent').html(strContent);
        }
    }

    function appendHtml(Data, currentLayer, showLayer) {
        var strContent = "";
        if (parseInt(currentLayer) < parseInt(showLayer)) {
            $.each(Data, function (i, msg) {
                strContent += ("<div class=\"hdpj_g_box\">");
                strContent += ("<ul>");
                strContent += ("<li>");
                strContent += ("<span class=\"hd_pj_leftex\">&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
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
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
                strContent += ("</p>");
                strContent += ("<span class=\"pTime\">" + msg.date + "</span>");
                strContent += ("</li>");
                strContent += ("</ul>");
                strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/img_43x43.png\" width=\"50\" height=\"50\" /></a></div>");
                strContent += ("<div class=\"hd_picpl_box_con hidden\">");
                strContent += ("<div class=\"hd_picpl_box\">");
                strContent += ("<ins></ins>");
                strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:760px;'>");
                strContent += ("<div class=\"picpl_form_box\">");
                strContent += ("<div>");
                strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
                strContent += ("<input type=\"button\" name=\"button\" onclick=\"addPhotoComment('" + photoId + "',$(this).prev().val(),'" + msg.id + "',$(this).prev())\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
                strContent += ("</div>");
                strContent += ("</div>");
                rowsDate = msg.rows;
                if (rowsDate != null && rowsDate != "") {
                    $.each(oneData.data, function (j, oneMsg) {
                        active_posts_id = oneMsg.active_posts_id;
                        follow_id = oneMsg.follow_id;
                        strContent += ("<div class=\"picpl_huif_box\">");
                        strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
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

//var setLayerCount = 1; //回复层数
//var commentCount = '5'; // 每一层回复显示个数
///* comment */
//function getLeavmessage(photoId) {
//    
//    $("#huifuid").myPagination({
//        currPage: 1,
//        callback: getContent,
//        cssStyle: 'noll',
//        sidebarpage: true,
//        ajax: {
//            param: {
//                pageSize: 5,
//                opertype: 'leavesinglemessage',
//                SetLayer: setLayerCount, //设置显示层数
//                CommentCount: commentCount, //每一层回复显示个数
//                photo_id: photoId
//            }
//        },
//        info: {
//            first: '首页',
//            last: '尾页',
//            next: '下一页',
//            prev: '上一页',
//            first_on: true,
//            last_on: true,
//            next_on: true,
//            prev_on: true,
//            showpageno: false,
//            tipmsg: '第{tip}页',
//            msg_on: false,
//            link: '#',
//            msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
//            text: {
//                width: '22px'
//            }
//        }

//    });

//    function getContent(data) {
//        //$('#totalMesage').html('(' + data.total + '条留言)');
//        var strContent = "";
//        strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));
//        $('#messageContent').html(strContent);

//    }

//    function appendHtml(Data, currentLayer, showLayer) {
//        var strContent = "";
//        if (parseInt(currentLayer) < parseInt(showLayer)) {
//            $.each(Data, function (i, msg) {
//                strContent += ("<div class=\"hdpj_g_box\">");
//                strContent += ("<ul>");
//                strContent += ("<li>");
//                strContent += ("<span class=\"hd_pj_leftex\"><a href=\"#\" class=\"blue\">" + msg.username + "</a>&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
//                strContent += ("</li>");
//                strContent += ("<li>" + msg.content + "</li>");
//                strContent += ("<li class=\"oInfo\">");
//                strContent += ("<p class=\"replyOpera\">");
//                rowsDate = msg.rows;
//                oneDate = "0";
//                varRowTotalCount = "0";
//                if (rowsDate != null && rowsDate != "") {
//                    oneData = $.parseJSON(rowsDate);
//                    varRowTotalCount = oneData.rowCount
//                }
//                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_1\"  onclick=\"showDetReply(this)\" title=\"展开\">(" + varRowTotalCount + ")</a>");
//                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_2\" title=\"标题\"></a>");
//                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_3\" title=\"标题\"></a>");
//                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_4\" title=\"标题\"></a>");
//                strContent += ("<a href=\"javascript:void(0);\" class=\"ico_5\" title=\"标题\"></a>");
//                strContent += ("</p>");
//                strContent += ("<span class=\"pTime\">" + msg.createdate + "</span>");
//                strContent += ("</li>");
//                strContent += ("</ul>");
//                strContent += ("<div class=\"pl_yuedu\"><a href=\"#\"><img src=\"../images/img_43x43.png\" width=\"50\" height=\"50\" /></a></div>");
//                strContent += ("<div class=\"hd_picpl_box_con hidden\">");
//                strContent += ("<div class=\"hd_picpl_box\">");
//                strContent += ("<ins></ins>");
//                strContent += ("<div class=\"hd_picpl_mid\" style='margin:0 40px 0 40px;width:760px;'>");
//                strContent += ("<div class=\"picpl_form_box\">");
//                strContent += ("<div>");
//                strContent += ("<input type=\"text\" name=\"textfield\" id=\"textTwofield\" class=\"picpl_hf_kuang\" hidefocus=\"ture\" style=\"outline:none;\"/>");
//                strContent += ("<input type=\"button\" name=\"button\" onclick=\"addPhotoComment('" + photoId + "',$(this).prev().val(),'" + msg.id + "',$(this).prev())\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
//                strContent += ("<input type=\"button\" name=\"button2\" id=\"buttonTwoCancel\" value=\"取消\" class=\"picpl_hf_an02\"tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an02b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an02a.jpg)'\"  onfocus=\"this.blur()\"/>");
//                strContent += ("</div>");
//                strContent += ("</div>");
//                rowsDate = msg.rows;
//                if (rowsDate != null && rowsDate != "") {
//                    $.each(oneData.data, function (j, oneMsg) {
//                        active_posts_id = oneMsg.active_posts_id;
//                        follow_id = oneMsg.follow_id;
//                        strContent += ("<div class=\"picpl_huif_box\">");
//                        strContent += ("<div class=\"huif_left\"><img src=\"../images/img_43x43.png\" width=\"37\" height=\"37\" /></div>");
//                        strContent += ("<div class=\"huif_right\" style=\"width:710px;\">");
//                        strContent += ("<div class=\"huif_text\">");
//                        strContent += oneMsg.content;
//                        strContent += ("</div>");
//                        strContent += ("<div class=\"huif_line\">");
//                        strContent += ("<span class=\"huif_time\">" + oneMsg.createdate + "</span>");
//                        strContent += ("<span class=\"huif_huif\"><a href=\"#\">回复</a></span>");
//                        strContent += ("<span class=\"huif_delete\"><a href=\"#\">删除</a></span>");
//                        strContent += ("</div>");
//                        strContent += ("</div>");
//                        strContent += ("</div>");
//                    });
//                    strContent += ("<div class=\"huif_more\">");
//                    strContent += ("<div class=\"huif_colse_an\"><a href=\"###\" onclick=\"hideDetReply(this);\">收起</a></div>");
//                    strContent += ("<div class=\"huif_open_an\"><a href=\"###\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
//                    strContent += ("</div>");
//                }
//                strContent += ("</div>");
//                strContent += ("</div>");
//                strContent += ("</div>");
//                strContent += ("<div class=\"xia_b_xian\"></div>");
//                strContent += ("</div>");
//            });
//        }
//        return strContent;
//    }
//}
/* comment end */

//function getComment(id) {
//    $(function () {
//        $.ajax({
//            url: "leavesinglemessage_common.axd",
//            type: "POST",
//            dataType: "json",
//            cache: false,
//            data: "{opertype:'photosinglemessage',id:'" + id + "',SetLayer:'" + setLayerCount + "'}",
//            error: function (data) { },
//            success: function (data) {
//                databind(data);
//            }
//        });

//    });


//}

////以下为解析查询出来的数据
//function databind(data) {
//    var box = $('.comments').find('.items');
//    box.empty();
//    if (data.rows) {
//        var comment_data = $.parseJSON(data.rows[0].rows);
//        if (comment_data.data && comment_data.result) {
//            $('.com_num').find('span').html('(' + comment_data.data.length + ')');

//            $.each(comment_data.data, function (i, v) {
//                var reply_div = jQuery('<div class="reply_content"></div>').appendTo(box);
//                reply_div.append('<div class="arr_top"></div>'
//                    + '<div class="pic"><img src="../images/head.jpg" alt="" /></div>'
//                   + '<div class="rt_box">'
//                   + '<div class="info">'
//                   + v.content
//                   + '</div>'
//                   + '<div class="meta"><a href="javascript:void(0);" class="reply">回复</a>'
//                   + ((uid == $('#uid').val() || uid == '') ? '<a href="javascript:void(0);" class="delete" onclick="deletePhotoCommentById(\'' + v.id + '\')">删除</a>' : '')
//                    + dateStr(v.date)
//                   + '</div>'
//                   + '</div>'
//                   + '</div>');
//            });

//        }
//    }
//    //    $('.com_num').find('span').html(data.total);
//    //    $('#totalMesage').html('(' + data.total + '条留言)');   //留言总数，赋给待显示的html控件
//    //    var strContent = "";
//    //    strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));  //循环递归解析回复的数据
//    //    $('#d6').html(strContent); //当前页的所有数据，通过拼接html 赋值给html控件。
//}



//function appendHtml(Data, currentLayer, showLayer) {
//    var strContent = "";
//    if (parseInt(currentLayer) < parseInt(showLayer)) {
//        varBotHtml = "";
//        varTopHtml = "<div class=\"newsList\">"
//        var topCSS;
//        if (currentLayer != 0) {
//            strContent += "<div style='margin-left:20px; margin-top:20px;'>";
//            varBotHtml = "</div>"
//            varTopHtml = "<div class=\"newsListHf\">"
//            Data = $.parseJSON(Data);
//            Data = Data.data;
//            topCSS = 1;
//        }
//        else { topCSS = 0; }
//        currentLayer++;
//        $.each(Data, function (i, msg) {
//            if (topCSS == 0) { varTopHtml = "<div class=\"newsList\">"; } else { varTopHtml = "<div class=\"newsListHf\">"; }
//            strContent += varTopHtml;
//            strContent += "<div class=\"avatar50\"><a href=\"#\"><img src=\"../../images/PluginImages/leavemessage/avatar.jpg\" width=\"50\" height=\"50\" alt=\"用户头像\"></a></div>";
//            strContent += "<div   class=\"newsSubject marginL10\">";
//            strContent += "<div class=\"overBox\">";
//            strContent += "<span class=\"linkList\">";
//            strContent += "<ul>";
//            strContent += "<li><a class=\"marginR5\" href=\"#\">愿古达</a></li>";
//            strContent += "<li><a title=\"加为好友\" href=\"#\">";
//            strContent += "<img src=\"../../images/PluginImages/leavemessage/addfrd.gif\" /></a></li>";
//            strContent += "<li><a title=\"发信息\" href=\"#\">";
//            strContent += "<img src='../../images/PluginImages/leavemessage/sendmsg.gif' /></a></li>";
//            strContent += "<li><a title=\"用户资料\" href=\"#\">";
//            strContent += "<img src=\"../../images/PluginImages/leavemessage/user_ifm.gif\" /></a></li>";
//            strContent += "<li><a>回复</a></li>";
//            strContent += "</ul>";
//            strContent += "</span><span class=\"floatRight gray9\"><span class=\"time03 marginR20\"><span class=\"act_attLv\">活跃度：</span><span title=\"45\" class=\"proWhite\"><span style=\"width:45%\" class=\"proYellow\"></span></span></span>发表时间：2010-12-30 07:35</span></div>";
//            strContent += "<div class=\"overBox\">" + msg.content + "</div>";

//            rowsDate = msg.rows;
//            if (rowsDate) {
//                strContent += appendHtml(rowsDate, currentLayer, showLayer);
//            }
//            strContent += "</div>";
//            strContent += "</div>";
//        })
//        strContent += varBotHtml;
//    }
//    return strContent;
//}

/** add photo comment **/
function addPhotoComment(photo_id, content, followId) {
    $.ajax({
        url: "../view_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addphotocomment', id:'" + photo_id + "',content:'" + content + "',followId:'" + followId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                arguments[3].val('');
            } else {
                alert(data.msg);
            }
        }
    });
}

/** delete photo comment **/
function deletePhotoCommentById(imageId) {
    //deletephotocommentbyid
    $.ajax({
        url: "../view_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletephotocommentbyid', image_id:'" + imageId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {

        }
    });
}



/*album list scroll*/
function photoScroll() {
    var arrLeft = $(".ph_sPic_wp").find(".scr_lt");
    var arrRight = $(".ph_sPic_wp").find(".scr_rt");
    var pre = $('.big_pic_wp').find('.scr_lt');
    var next = $('.big_pic_wp').find('.scr_rt');

    var _list = $('div.ph_sPic').find('ul');
    var _li = _list.children();
    var _plas = _li.size() - 4;

    arrLeft.click(function () {
        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (!parseInt(_list.css("left")) == "0") {
                    _list.animate({ left: "+=160" })
                }
            }
        }
    })
    arrRight.click(function () {
        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (-parseInt(_list.css("left")) >= _plas * 160) {
                    return false;
                }
                else {
                    _list.animate({ left: "-=160" });
                }
            }
        }
    })

    $('.big_pic_wp').find('.scr_lt,.scr_rt').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    pre.click(function () {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;

            setPhoto(pList[currentIndex]);
        }

        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (!parseInt(_list.css("left")) == "0") {
                    _list.animate({ left: "+=160" })
                }
            }
        }
    });

    next.click(function () {
        if (currentIndex < pList.length - 1) {
            currentIndex = currentIndex + 1;

            setPhoto(pList[currentIndex]);
        }

        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (-parseInt(_list.css("left")) >= _plas * 160) {
                    return false;
                }
                else {
                    _list.animate({ left: "-=160" });
                }
            }
        }
    });
}

