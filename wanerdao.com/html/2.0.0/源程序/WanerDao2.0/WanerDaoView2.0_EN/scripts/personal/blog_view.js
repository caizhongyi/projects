jQuery.fn.extend({
    blogComentToggle: function () {
        $(this).click(function () {
            obj = $(this).parent().parent().parent();
            obj.hide();
        });
    }
});
var uid;
var id;
var listType;
var listParam;
$(function () {
    uid = getQueryString('uid');
    if (!uid) {
        uid = '';
    }
    bindPTab(uid);
    id = getQueryString('id');
    listType = getQueryString('listType');
    listParam = getQueryString('listParam');

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
                    box.append('<div class="log_view_top" style="display: none;"><span><nextblog style="display: none;">Next：<a ></a></nextblog></span><prevblog style="display: none;">Prev：<a></a></prevblog></div>'); //blog navigation
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
                    log_view_con.append($wd.format('<h1>（<a href="javascript:;" onclick="location.href = \'blog.html?catid=' + blog.category_id + (uid == '' ? '' : '&uid=' + uid) + '\';">{1}</a>）{0}</h1>', blog.title.descapeSpecialchar(), blog.category_name));
                    var tools = jQuery('<dl></dl>').appendTo(log_view_con);

//                    var link_category = jQuery('<dd class="log_viewbg"><a href="javascript:void(0);">Category</a></dd>').appendTo(tools); //category
//                    link_category.find('a').html(blog.category_name);
//                    link_category.click(function () {
//                        location.href = 'blog.html?catid=' + blog.category_id + (uid == '' ? '' : '&uid=' + uid);
//                    });

                    // tools.append($wd.format(' <dd class="log_viewbg01"><a href="javascript:void(0);">关注（12）</a></dd>')); //focus

                    if (is_self) {
                        var link_edit = jQuery(' <dd class="log_viewbg02"><a href="javascript:void(0);">Edit</a></dd>').appendTo(tools); //edit
                        link_edit.click(function () {
                            location.href = 'blog_compose.html?blogId=' + blog.id;
                        });
                    }

                    if (!is_self) {
                        var link_transmit = jQuery('<dd class="log_viewbg04" rel="transmit"><a href="javascript:;" >Forward</a></dd>').appendTo(tools);
                        link_transmit.transmit({ currType: "blog", transId: blog.id });
                    }

                    var link_print = jQuery('<dd class="log_viewbg06"><a href="javascript:;">Print</a></dd>').appendTo(tools);
                    link_print.click(function () {
                        var str = "{opertype:'singleblogprint',printfile:'singleblog', printdatafile: 'PersonSQL', printdata_body: 'SelecPersonalBlogByBlogId', user_id:'" + uid + "',blogid:'" + blog.id + "' }";
                        window.open("../Common/print.aspx?jsonparam=" + str);
                    });

                    var tlw = jQuery($wd.format('<dt><i>{0}</i><label>{1}</label></dt>', getLocationDateString(blog.post_date, 'MM/dd/yyyy'), blog.location.descapeSpecialchar())).appendTo(tools); //publish time,weather,location
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

                    var log_view_page = jQuery('<div class="log_view_page" style="overflow-x:hidden; word-break: break-all"></div>').appendTo(box); //blog content
                    log_view_page.append(blog.content.descapeSpecialchar());
                    //var blog_comment = jQuery('<span><a href="javascript:void(0);" class="cli_pl">评论（loading..）</a></span>').appendTo(log_view_page);

                    //                    ///内容
                    //                    blog_comment.click(function () {
                    //                        obj = $(".log_view_box");
                    //                        if (obj.css('display') == 'none') {
                    //                            obj.show();
                    //                        } else {
                    //                            obj.hide();
                    //                        }
                    //                    });

                    //

                    //<span><a href="javascript:void(0);" class="cli_pl">评论（134）</a></span>

                    var log_view_box = jQuery('<div class="log_view_box" style="display:none;">').appendTo(box); //blog comment
                    log_view_box.append('<div class="log_view_tabT"></div>'
                    + '<div class="log_view_tabC">'
                    + '<div class="log_view_hf"><input name="" type="text" class="inp06 txt"><input name="" type="button" class="inp07 reply" value="Reply" ><input name="" type="button" class="inp08 cancle" value="Cancel">'
                    + '</div>'
                    + '<div id="messageContent"></div>'
                    //+ '<div class="log_view_list clearfix"><ul></ul></div>'
                    + '<div class="log_view_bin clearfix"><a href="javascript:void(0);" class="log_viewbg09">Pack up</a><a href="javascript:void(0);" class="log_viewbg08">More reply</a>'
                    + '</div></div>'
                    + '<div class="log_view_tabB"></div>');

                    //hide comment box
                    $('.log_viewbg09').click(function () {
                        log_view_box.hide();
                    });

                    //show more blog
                    $('.log_viewbg08').click(function () {

                    });
                  //  var log_view_tabC = log_view_box.find('.log_view_tabC');

                    //getLeavmessage(blog.id);

//                    $('.reply').click(function () {
//                        var txt = $('.txt').val();
//                        if (txt) {
//                            addBlogComment(blog.id, txt, '', $('.txt'));
//                        } else {
//                            alert(wanerdaoLangTip('video_00009'));
//                        }
//                    });

//                    $('.cancle').click(function () {
//                        $('.txt').val('');
//                    });
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

                    box.append('<div class="log_view_top mt30"  style="display: none;"><span><nextblog style="display: none;">Next：<a ></a></nextblog></span><prevblog style="display: none;">Prev：<a></a></prevblog></div>'); //blog navigation

                    getPrevAndNext();
                } else {
                    window.location.href = 'blog.html?uid=' + uid;
                    // deal on here if not found blog
                }
            }
        });

    } else {
        location.href = '/';
    }
});

function getPrevAndNext() {
    //GetPrevAndNextBlogByIdType
    ajaxfunc("blog_blog.axd", "{opertype:'getprevandnextblogbyidtype',blog_id:'" + id + "',type:'" + listType + "',param:'" + listParam + "'}", function () {

    }, function (data) {
        if (data.result && data.rows.length > 0) {
            $('.log_view_top').show();
            $.each(data.rows, function (i, blog) {
                if (blog.type == 'prev') {
                    $('.log_view_top').find('a:eq(1)').html(blog.title).attr('href', 'blog_view.html?id=' + blog.id + '&listType=' + listType + '&listParam=' + listParam + (uid == '' ? '' : '&uid=' + uid));
                    $('.log_view_top').find('prevblog').show();
                } else {
                    $('.log_view_top').find('a:eq(0)').html(blog.title).attr('href', 'blog_view.html?id=' + blog.id + '&listType=' + listType + '&listParam=' + listParam + (uid == '' ? '' : '&uid=' + uid));
                    $('.log_view_top').find('nextblog').show();
                }
            });
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
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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
