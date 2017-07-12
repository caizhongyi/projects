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
                    box.append('<div class="log_view_top" style="display: none;"><span><nextblog style="display: none;">下一篇：<a ></a></nextblog></span><prevblog style="display: none;">上一篇：<a></a></prevblog></div>'); //blog navigation
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

                    //                    var link_category = jQuery('<dd class="log_viewbg"><a href="javascript:void(0);">分类名</a></dd>').appendTo(tools); //category
                    //                    link_category.find('a').html(blog.category_name);
                    //                    link_category.click(function () {
                    //                        location.href = 'blog.html?catid=' + blog.category_id + (uid == '' ? '' : '&uid=' + uid);
                    //                    });

                    // tools.append($wd.format(' <dd class="log_viewbg01"><a href="javascript:void(0);">关注（12）</a></dd>')); //focus

                    if (is_self) {
                        var link_edit = jQuery(' <dd class="log_viewbg02"><a href="javascript:void(0);">编辑</a></dd>').appendTo(tools); //edit
                        link_edit.click(function () {
                            location.href = 'blog_compose.html?blogId=' + blog.id;
                        });
                    }

                    if (!is_self) {
                        var link_transmit = jQuery('<dd class="log_viewbg04" rel="transmit"><a href="javascript:;" >转发</a></dd>').appendTo(tools);
                        link_transmit.transmit({ currType: "blog", transId: blog.id });
                    }

                    var link_print = jQuery('<dd class="log_viewbg06"><a href="javascript:;">打印</a></dd>').appendTo(tools);
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
                    log_view_page.append('<span><a href="javascript:void(0);" class="cli_pl" id="commentH">评论</a></span>');
               
                    $('.replay-content').remove();
                    $('#commentH', log_view_page).unbind("click").click(function () {
                        $('span', log_view_page).replycontent({
                            posts_id: blog.id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
                            getreply:
                            {
                                getreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                                getreplyop: 'blogsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                            },
                            deletereply:
                            {
                                delreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                                delreplyop: 'blogdelsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                            },
                            addreply:
                            {
                                addreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                                addreplyop: 'blogaddsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                            },
                            loadrecordlimit: 5, //加载条数限制
                            replyconfig: {
                                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
                            }
                        });
                    });

                    //                    var log_view_box = jQuery('<div class="log_view_box" ></div>').appendTo(box); //blog comment
                    //                    //     log_view_box.append('<a id="commentH" href="javascript:;">回复</a>');
                    //                    log_view_box.append('<div class="log_view_tabT"></div>'
                    //                                        + '<div class="log_view_tabC">'
                    //                                        + '<div class="log_view_hf"><input name="" type="text" class="inp06 txt"><input name="" type="button" class="inp07 reply" value="回复" ><input name="" type="button" class="inp08 cancle" value="取消">'
                    //                                        + '</div>'
                    //                                        + '<div id="messageContent"></div>'
                    //                    //+ '<div class="log_view_list clearfix"><ul></ul></div>'
                    //                                        + '<div class="log_view_bin clearfix"><a href="javascript:void(0);" class="log_viewbg09">收起</a><a href="javascript:void(0);" class="log_viewbg08">更多回复</a>'
                    //                                        + '</div></div>'
                    //                                        + '<div class="log_view_tabB"></div>');

                    //                    //hide comment box
                    //                    $('.log_viewbg09').click(function () {
                    //                        log_view_box.hide();
                    //                    });

                    //                    //show more blog
                    //                    $('.log_viewbg08').click(function () {

                    //                    });
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

                    box.append('<div class="log_view_top mt30"  style="display: none;"><span><nextblog style="display: none;">下一篇：<a ></a></nextblog></span><prevblog style="display: none;">上一篇：<a></a></prevblog></div>'); //blog navigation

                    //                    $('#commentH').replycontent({
                    //                        disabled: false, //是否禁用回复功能，如果为true，addreplylistbyaxd此属性不可用并且不显示回复留言框
                    //                        replylistbyid: blog.id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
                    //                        getreply:
                    //                        {
                    //                            getreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                    //                            getreplyop: 'blogsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                    //                        },
                    //                                    deletereply:
                    //                        {
                    //                            delreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                    //                            delreplyop: 'blogdelsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                    //                        },
                    //                                    addreply:
                    //                        {
                    //                            addreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                    //                            addreplyop: 'blogaddsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                    //                        },
                    //                        loadrecordlimit: 5, //加载条数限制
                    //                        replyconfig: {
                    //                            ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                    //                            limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
                    //                        }
                    //                    });

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
