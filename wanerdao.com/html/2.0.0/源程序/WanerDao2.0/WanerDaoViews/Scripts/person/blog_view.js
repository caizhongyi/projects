jQuery.fn.extend({
    blogComentToggle: function () {
        $(this).click(function () {
            obj = $(this).parent().parent().parent();
            //alert(obj.html());
            obj.hide();
        });
    }
});
var uid;
var id;
$(function () {
    uid = getQueryString('uid');
    if (!uid) {
        uid = '';
    }
    bindPTab(uid);
    id = getQueryString('id');

    $('.tagf').click(function () {
        window.location = 'blog.html' + (uid ? '?uid=' + uid : '');
    });

    if (id) {
        $.ajax({
            url: "../view_blog.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getblogbyid',user_id:'" + uid + "',blogid:'" + id + "'}",
            error: function (data) {
            },
            success: function (data) {
                if (data.result && data.rows) {
                    var blog = data.rows[0];
                    var box = jQuery('.log_viewinfo');
                    box.append('<div class="log_view_top"><span>下一篇：<a ></a></span>上一篇：<a></a></div>'); //blog navigation
                    //                    <dd class="log_viewbg01"><a href="#">关注（12）</a></dd>
                    //                                <dd class="log_viewbg02"><a href="#">编辑</a></dd>
                    //                                <dd class="log_viewbg03"><a href="#">回复（45）</a></dd>
                    //                                <dd class="log_viewbg04"><a href="#">转发（42）</a></dd>
                    //                                <dd class="log_viewbg05"><a href="#">保存</a></dd>
                    //                                <dd class="log_viewbg06"><a href="#">打印</a></dd>
                    //                                <dd class="log_viewbg07"><a href="#">收藏</a></dd>
                    //<dt><i>2011/11/12</i><label>太原</label><img src="images/list/viewbg07.jpg"/></dt>
                    //blog infomation
                    var log_view_con = jQuery('<div class="log_view_con"></div>').appendTo(box);
                    log_view_con.append($wd.format('<h1>{0}</h1>', blog.title));
                    var tools = jQuery('<dl></dl>').appendTo(log_view_con);

                    var link_category = jQuery('<dd class="log_viewbg"><a href="javascript:void(0);">分类名</a></dd>').appendTo(tools); //category
                    link_category.find('a').html(blog.category_name);
                    link_category.click(function () {
                        location.href = 'blog.html?catid=' + blog.category_id + (uid == '' ? '' : '&uid=' + uid);
                    });


                    // tools.append($wd.format(' <dd class="log_viewbg01"><a href="javascript:void(0);">关注（12）</a></dd>')); //focus

                    if (self) {
                        var link_edit = jQuery(' <dd class="log_viewbg02"><a href="javascript:void(0);">编辑</a></dd>').appendTo(tools); //edit
                        link_edit.click(function () {
                            location.href = 'blog_compose.html?blogId=' + blog.id;
                        });
                    }


                    var tlw = jQuery($wd.format('<dt><i>{0}</i><label>{1}</label></dt>', DateFormat(blog.post_date, 'yyyy/MM/dd'), blog.location)).appendTo(tools); //publish time,weather,location
                    if (blog.weather) {
                        Weather({
                            call: 'getImagePath',
                            weatherName: blog.weather,
                            callback: function (data) {
                                if (data.result) {
                                    var img = jQuery('<img src="' + data.path + '" alt="' + data.name + '" style="width:25px; height:25px;"/>');
                                    img.appendTo(tlw);
                                }
                            }
                        });
                    }

                    var log_view_page = jQuery('<div class="log_view_page"></div>').appendTo(box); //blog content
                    log_view_page.append(blog.content);
                    var blog_comment = jQuery('<span><a href="javascript:void(0);" class="cli_pl">评论（loading..）</a></span>').appendTo(log_view_page);

                    ///内容
                    blog_comment.click(function () {
                        obj = $(".log_view_box");
                        if (obj.css('display') == 'none') {
                            obj.show();
                        } else {
                            obj.hide();
                        }
                    });

                    //

                    //<span><a href="javascript:void(0);" class="cli_pl">评论（134）</a></span>

                    var log_view_box = jQuery('<div class="log_view_box" style="display:none;">').appendTo(box); //blog comment
                    log_view_box.append('<div class="log_view_tabT"></div>'
                    + '<div class="log_view_tabC">'
                    + '<div class="log_view_hf"><input name="" type="text" class="inp06 txt"><input name="" type="button" class="inp07 reply" value="回复" ><input name="" type="button" class="inp08 cancle" value="取消">'
                    + '</div>'
                    + '<div id="messageContent"></div>'
                    //+ '<div class="log_view_list clearfix"><ul></ul></div>'
                    + '<div class="log_view_bin clearfix"><a href="javascript:void(0);" class="log_viewbg09">收起</a><a href="javascript:void(0);" class="log_viewbg08">更多回复</a>'
                    + '</div></div>'
                    + '<div class="log_view_tabB"></div>');

                    //hide comment box
                    $('.log_viewbg09').click(function () {
                        log_view_box.hide();
                    });

                    //show more blog
                    $('.log_viewbg08').click(function () {

                    });
                    var log_view_tabC = log_view_box.find('.log_view_tabC');

                    getLeavmessage(blog.id);

                    $('.reply').click(function () {
                        var txt = $('.txt').val();
                        if (txt) {
                            addBlogComment(blog.id, txt, '', $('.txt'));
                        } else {
                            alert(wanerdaoLangTip('video_00009'));
                        }
                    });

                    $('.cancle').click(function () {
                        $('.txt').val('');
                    });
                    //                        	<div class="log_view_tabT"></div>
                    //                            <div class="log_view_tabC">
                    //                            	  <div class="log_view_hf">
                    //                                	<input name="" type="text" class="inp06"><input name="" type="button" class="inp07" value="回复"><input name="" type="button" class="inp08" value="取消">
                    //                                </div>
                    //                                <div class="log_view_list clearfix">

                    //                                </div>
                    //                                <div class="log_view_bin clearfix">
                    //                                    <a href="javascript:void(0);" class="log_viewbg09">收起</a>                                
                    //                                	<a href="#" class="log_viewbg08">更多回复</a>
                    //                                </div>
                    //                            </div>
                    //                            <div class="log_view_tabB"></div>
                    //                        

                    box.append('<div class="log_view_top mt30"><span>下一篇：<a ></a></span>上一篇：<a></a></div>'); //blog navigation


                } else {
                    // deal on here if not found blog
                }
            }
        });
    } else {
        location.href = '/';
    }
});



var setLayerCount = 2; //回复层数
var commentCount = '5'; // 每一层回复显示个数
/* comment */
function getLeavmessage(pid) {
    $(".other_action").myPagination({
        currPage: 1,
        callback: getContent,
        cssStyle: 'noll',
        sidebarpage: true,
        url: '../pagination_common.axd',
        ajax: {
            param: {
                pageSize: 5,
                opertype: 'blogsinglemessage',
                SetLayer: setLayerCount, //设置显示层数
                CommentCount: commentCount, //每一层回复显示个数
                id: pid
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
                strContent += ("<input type=\"button\" name=\"button\" onclick=\"addBlogComment('" + id + "',$(this).prev().val(),'" + msg.id + "', $(this).prev())\" id=\"buttonTwo\" value=\"回复\" class=\"picpl_hf_an01\" tyle=\"background-color: Transparent;\" onmouseover=\"this.style.backgroundImage='url(../images/picpl_hf_an01b.jpg)'\" onmouseout=\"this.style.backgroundImage='url(../images/picpl_hf_an01a.jpg)'\"  onfocus=\"this.blur()\"/>");
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

/** add blog comment **/
function addBlogComment(blog_id, content, followId,box) {
    $.ajax({
        url: "../view_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addblogcomment', id:'" + blog_id + "',content:'" + content + "',followId:'" + followId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                box.val('');
            } else {
                alert(data.msg);
            }
        }
    });
}

/** delete blog comment **/
function deleteBlogCommentById(blog_id) {
    $.ajax({
        url: "../view_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deleteblogcommentbyid', id:'" + blog_id + "'}",
        error: function (data) {
        },
        success: function (data) {

        }
    });
}

/* comment end */
