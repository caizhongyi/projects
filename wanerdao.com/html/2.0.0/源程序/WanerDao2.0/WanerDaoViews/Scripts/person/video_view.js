jQuery.fn.extend({
    /*album hover*/
    linkHover: function () {
        $(this).hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        });
    }
});

var albumId;
var videoId;
var uid;
$(function () {
    albumId = getQueryString('albumId').replace('#', '');
    videoId = getQueryString('videoId');
    uid = getQueryString('uid');
    if (!uid) uid = '';

    bindPTab(uid);

    if (albumId) {
        getAllVideoFolder(uid, null, function (data) {
            if (data.result) {
                var box = $('ul.alb_list_sVideo');
                $('.album_count').html(data.rows.length); /* set albums*/

                $.each(data.rows, function (i, v) {
                    /*set current video folder name */

                    if (v.id.toLowerCase() == albumId) {
                        showAlbumVideo(v.id, v.folder_name);
                    }

                    var li_album = jQuery('<li></li>').appendTo(box);

                    var alb_info = jQuery('<div class="pers"></div>').appendTo(li_album);
                    alb_info.append($wd.format('<div class="pic"><a href="javascript:void(0);"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', '/images/photo1.gif'));
                    alb_info.find('a').click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                        return false;
                    });
                    alb_info.append('<div class="bm_info"></div>');

                    var link_forward = jQuery('<a href="javascript:void(0);" class="icon_edit" ></a>').appendTo(alb_info.find('.bm_info'));
                    link_forward.click(function () {


                    });

                    var link_alb = jQuery($wd.format('<a href="javascript:void(0);">{0}</a>', v.folder_name)).appendTo(alb_info.find('.bm_info'));
                    link_alb.click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                        return false;
                    });
                    alb_info.find('.bm_info').append($wd.format('({0})', v.count));

                    li_album.linkHover();
                });


            } albumsScroll(); /* album list scroll */
        });



        $('.reply').click(function () {
            var txt = $('.txt').val();
            if (txt) {
                addVideoComment(videoId, txt, '', $('.txt'));
            } else {
                alert(wanerdaoLangTip('video_00009'));
            }
        });

        $('.cancle').click(function () {
            $('.txt').val('');
        });
    }
    else {
        location.href = 'view_album.html';
    }


});


/*show album video*/
function showAlbumVideo(alId, albName) {
    $('.album_name').html(albName);
    $('.photo_detail').empty();
    $('.flashBox').find('div').empty();
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="ico_alb_edit"></a>').appendTo($('.pe_set'));

    getAllPersonalVideoByAlbum({ fold_id: alId, uid: uid }, null, videoBind);
}

/*  */
function videoBind(data) {
    if (data.result) {
        var box = $('.vlist').empty();
        $('.cc').html(data.rows.length);
        $('.tc').html(data.rows.length);
        $.each(data.rows, function (i, v) {
            //display current photo
            if (videoId && v.id == videoId) {
                $('.cc').html(i + 1);
                setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description });
            } else {
                if (i == 0) {
                    $('.cc').html(i + 1);
                    setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description });
                }
            }

            var li_video = jQuery('<li></li>').appendTo(box);

            li_video.append($wd.format('<a href="javascript:void(0);">{0}</a>', v.video_code)).css({ 'width': '148px', 'height': '104px' });
            if (videoId == v.id) {
                li_video.addClass('on');
            }
            var link_v = jQuery($wd.format('<i class="iTit"><a href="javascript:void(0);">{0}</a></i>', v.video_name)).appendTo(li_video);
            link_v.click(function () {
                $(this).parent().parent().find('li').each(function () {
                    if ($(this).hasClass('on')) {
                        $(this).removeClass('on');
                    }
                });
                li_video.addClass('on');
                $('.cc').html(i + 1);
                setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description });
            });
            li_video.append('<a href="javascript:void(0);" class="icon_video"></a>');

            li_video.linkHover();
        });

        videoScroll();

        //comment
        $('#m_reply').click(function () {
            var txt = $('.txt').val();
            if (txt) {
                addPhotoComment(videoId, txt);
            } else {
                alert(wanerdaoLangTip('video_00009'));
            }
        });

        $('.com_num').click(function () {
            $('.comments').toggle();
        });
    }
}

/* set video info */
function setVideo(model) {
    //<span class="photo_name"></span><em></em> <a href="javascript:void(0);" class="doc"></a>
    videoId = model.id;

    $('.flashBox').find('div').html(model.path);
    var video_detail = $('.photo_detail').empty();
    var hd = jQuery('<div class="hd"></div>').appendTo(video_detail);
    hd.append($wd.format('{0}<em>{1}</em>', model.name, model.date));
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="doc"></a>').appendTo(hd);
    var bd = jQuery('<div class="bd"></div>').appendTo(video_detail);
    bd.html(model.desc);
    getLeavmessage(model.id);
}


var setLayerCount = 1; //回复层数
var commentCount = '5'; // 每一层回复显示个数
/* comment */
function getLeavmessage(pid) {
    $(".alb_nav").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: false, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: getContent,
        ajax: {
            url: 'pagination_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 5,
                opertype: 'videosinglemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                id: pid
            }
        }
    });

    function getContent(data) {
        if (data.result) {
            $('.comment_count').html(data.total);
            var strContent = "";
            strContent = appendHtml(data.rows, 0, parseFloat(setLayerCount + 1));

            $('#messageContent').html(strContent);
        }
    }

    function appendHtml(Data, currentLayer, showLayer) {
        var strContent = "";
        if (parseInt(currentLayer) < parseInt(showLayer)) {
            $.each(Data, function (i, msg) {
                rowsDate = msg.rows;
                oneDate = "0";
                varRowTotalCount = "0";

                strContent += '<div><div class="reply_content">'
                strContent += '<div class="pic"><img src="' + msg.logo + '" width="37" height="37" alt="" /></div>'
                strContent += '<div class="rt_box">'
                strContent += '<div class="info">' + msg.content + '</div>'
                strContent += '<div class="meta"><a href="javascript:void(0);" class="reply">回复</a><a href="javascript:void(0);" class="delete">删除</a>' + dateStr(msg.date) + '</div>'
                strContent += '</div>'
                strContent += '</div>'
                //alert(
                oneDate = "0";
                varRowTotalCount = "0";
                if (msg.rows) {
                    var replyData = $.parseJSON(msg.rows);
                    $.each(replyData.data, function (i, v) {
                        strContent += '<div class="reply_content" style=" margin-left: 40px;">'
                        strContent += '<div class="pic"><img src="' + v.logo + '" width="37" height="37" alt="" /></div>'
                        strContent += '<div class="rt_box">'
                        strContent += '<div class="info">' + v.content + '</div>'
                        strContent += '<div class="meta"><a href="javascript:void(0);" class="reply">回复</a><a href="javascript:void(0);" class="delete">删除</a>' + dateStr(v.date) + '</div>'
                        strContent += '</div>'
                        strContent += '</div>'
                    });
                }

                strContent += '</div>';

                //                strContent += ("<div class=\"hdpj_g_box\">");
                //                strContent += ("<ul>");
                //                strContent += ("<li>");
                //                strContent += ("<span class=\"hd_pj_leftex\">&nbsp;&nbsp;<a href=\"#\">&nbsp;</a> <i style=\"display:none;\" class=\"page_state_wd\">[已读]</i></span>");
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
                //                strContent += ("<span class=\"pTime\">" + msg.date + "</span>");
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
                //                strContent += ("<input type=\"button\" name=\"button\" onclick=\"addVideoComment('" + videoId + "',$(this).prev().val(),'" + msg.id + "',$(this).prev())\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
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
                //                    strContent += ("<div class=\"huif_colse_an\"><a href=\"javascript:;\" onclick=\"hideDetReply(this);\">收起</a></div>");
                //                    strContent += ("<div class=\"huif_open_an\"><a href=\"javascript:;\"  onclick=\"outspreadContent(this,'" + varRowTotalCount + "','" + active_posts_id + "','" + follow_id + "')\">更多回复</a></div>");
                //                    strContent += ("</div>");
                //                }
                //                strContent += ("</div>");
                //                strContent += ("</div>");
                //                strContent += ("</div>");
                //                strContent += ("<div class=\"xia_b_xian\"></div>");
                //                strContent += ("</div>");
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
                strContent += ("<div class=\"huif_left\"><img src=\"" + msg.logo + "\" width=\"37\" height=\"37\" /></div>");
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
/* comment end */

//var setLayerCount = 1; //回复层数
//function getComment(id) {
//    $(function () {
//        $.ajax({
//            url: "leavesinglemessage_common.axd",
//            type: "POST",
//            dataType: "json",
//            cache: false,
//            data: "{opertype:'videosinglemessage',id:'" + id + "',SetLayer:'" + setLayerCount + "'}",
//            error: function (data) { },
//            success: function (data) {
//                databind(data);
//            }
//        });

//    });


//}


////以下为解析查询出来的数据
//function databind(data) {
//    var box = $('.comments').find('.items').empty();
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


/** add video comment **/
function addVideoComment(video_id, content,followId,$text) {
    $.ajax({
        url: "../view_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addvideocomment', id:'" + video_id + "',content:'" + content + "',followId:'" + followId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $text.val('');
            } else {
                alert(data.msg);
            }
        }
    });
}

/** delete video comment **/
function deleteVideoCommentById(imageId) {
    //deletephotocommentbyid
    $.ajax({
        url: "../view_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletevideocommentbyid', id:'" + video_id + "'}",
        error: function (data) {
        },
        success: function (data) {

        }
    });
}


/*album list scroll*/
function videoScroll() {
    var arrLeft = $(".ph_sPic_wp").find(".scr_lt");
    var arrRight = $(".ph_sPic_wp").find(".scr_rt");
    var _list = $(".vlist");
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
                if (-parseInt(_list.css("left")) == _plas * 160) {
                    return false;
                }
                else {
                    _list.animate({ left: "-=160" });
                }
            }
        }
    })
}