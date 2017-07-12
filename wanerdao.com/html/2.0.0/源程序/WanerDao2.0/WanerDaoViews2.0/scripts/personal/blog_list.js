
function showmenu(id, id2) {
    id = '#' + id;
    id2 = '#' + id2;
    left2 = $(id2).offset().left;
    top2 = $(id2).offset().top + $(id2).height() - 1;

    $(id).attr('style', 'position:absolute;top:' + top2 + 'px;left:' + left2 + 'px');
    $(id).show();

    $(id2).attr('hideid', id);
    $(id).attr('id2', id2);

    $(id).mouseout(
		function () {
		    $(id2).parent().hide();
		    $(id2).attr('show', '');
		    $(id).hide();
		}
	);

    $(id).mouseover(
		function () {
		    id2 = $(this).attr('id2');
		    $(this).show();
		    $(id2).attr('show', 1);
		    $(id2).parent().show();
		}
	);

}

jQuery.fn.extend({
    //blog category 
    blogCagegoryList: function (type) {
        $(this).find('li').each(function (i) {
            id = 'a__' + parseInt(i) + '__' + type;
            $(this).find('input').attr('id', id);

            $(this).mouseleave(function () {
                $(this).css("backgroundColor", "#fff");
                var show2 = $(this).find('.inp55').attr('show');
                if (show2 == '' || show2 == undefined) {
                    $(this).find(".ontab").hide();
                    //id2 = $(this).find('input').attr('hideid');
                    //$(id2).hide();
                    $(this).next().show();
                }

                $(this).find('.test_xl').hide();
            });

            $(this).mouseenter(function () {
                $(this).css("backgroundColor", "#f7f7f7");
                $(this).find(".ontab").show();
            });

            $(this).find('input').mouseover(function () {
                //id = $(this).attr('id');
                //showmenu('test_xl',id);
                $(this).next().show();
            }).mouseout(function () {
                $(this).next().hide();
            });


        });
    }
});


var uid;
var srhKey;
var srhCatId;
var srhTime;
$(function () {
    uid = getQueryString('uid');
    if (!uid) {
        uid = '';
    }

    bindPTab(uid);
    pagination('', (getQueryString('catid') == null ? '' : getQueryString('catid')), '');

    $('#srhcode').click(function () {
        pagination($('#sText').val(), '', '');
    });

    getBlogCountByArticleCat();
    getBlogCountByDateCat();
    getBlogNameAndDesc();
});

/*pagination*/
function pagination(key, catid, time) {
    srhKey = key;
    srhCatId = catid;
    srhtim = time;
    $(".pageList").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        //pagermore: true,
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: databind,
        ajax: {
            url: 'articleList_blog.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getbloglist',
                user_id: uid,
                titOrContent: key,
                category_id: catid,
                timeName: time
            }
        }
    });

  
}

function databind(data) {
    var box = $('#content').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var item = jQuery('<div class="log_manage_Rshow clearfix" style=" width: 732px; overflow-x:hidden;"></div>').appendTo(box);
            var log_show_le = jQuery('<div class="log_show_le"></div>').appendTo(item); //date，weather
            var log_show_ri = jQuery('<div class="log_show_ri"></div>').appendTo(item); //blog name and operate
            var log_view_page = jQuery('<div class="log_view_page" style="word-break: break-all"></div>').appendTo(item); //content 
            var log_view_box = jQuery('<div class="log_view_box" style="display:none;"></div>').appendTo(item); //

            //===================== weather 
            log_show_le.append($wd.format('<div class="log_show_data">{0}</div>'
                + '<div class="log_show_weather"><span class=""></span><a href="javascript:;"  style=" display: inline-block; width: 60px; overflow: hidden" title="{1}">{1}</a></div>'
                + '</div>', getLocationDateString(v.post_date, 'MM/dd/yyyy'), v.location));
            if (v.weather) {
                Weather({
                    call: 'getImagePath',
                    weatherName: v.weather,
                    callback: function (data) {
                        if (data.result) {
                            var img = jQuery('<img src="' + data.path + '" alt="' + data.name + '" style="width:23px; height:20px;"/>');
                            img.appendTo(log_show_le.find('.log_show_weather').find('span'));
                        }
                    }
                });
            }

            //===================== blog info
            var listType;
            var listParam;
            if (srhKey) {
                listType = 3;
                listParam = srhKey;
            } else if (srhTime) {
                listType = 2;
                listParam = srhTime;
            } else if (srhCatId) {
                listType = 1;
                listParam = srhCatId;
            } else {
                listType = 0;
                listParam = '';
            }

            log_show_ri.append($wd.format('<h2 ' + (v.is_transmit.toLowerCase() == 'true' ? '' : 'style="background:url(null);text-indent: 12px;"') + '>（<a href="javascript:;" onclick="pagination(\'\', \'' + v.category_id + '\',\'\');return;">' + v.category_name + '</a>）<a href="blog_view.html?id={1}&listType={2}&listParam={3}">{0}</a></h2>', v.title, v.id + (uid == '' ? '' : '&uid=' + uid), listType, listParam));

            var tools = jQuery('<dl class="clearfix"></dl>').appendTo(log_show_ri);
            //            var link_category = jQuery('<dd class="log_viewbg"><a href="javascript:void(0);"></a></dd>').appendTo(tools); //category name
            //            link_category.find('a').html(v.category_name);
            //            link_category.find('a').click(function () {
            //                pagination('', v.category_id, '');
            //                return false;
            //            });

            // tools.append($wd.format('<dd class="log_viewbg01"><a href="javascript:void(0);">关注（' + v.counter + '）</a></dd>')); //focus
            //focusBlog(\'{2}\',this)

            if (is_self) {
                var link_edit = jQuery('<dd class="log_viewbg02"><a href="javascript:void(0);">编辑</a></dd>').appendTo(tools);
                link_edit.click(function () {
                    location.href = 'blog_compose.html?blogId=' + v.id;
                });

            }

            if (!is_self) {
                var link_transmit = jQuery('<dd class="log_viewbg04" rel="transmit"><a href="javascript:;" >转发</a></dd>').appendTo(tools);
                link_transmit.transmit({ currType: "blog", transId: v.id });
            }

            var link_print = jQuery('<dd class="log_viewbg06"><a href="javascript:;">打印</a></dd>').appendTo(tools);
            link_print.click(function () {
                var str = "{opertype:'singleblogprint',printfile:'singleblog', printdatafile: 'PersonSQL', printdata_body: 'SelecPersonalBlogByBlogId',pagecurrent: 1,pageSize: 20,user_id:'" + uid + "',blogid:'" + v.id + "' }";
                window.open("../Common/print.aspx?jsonparam=" + str);
            });
            //            tools.append($wd.format('<dd class="log_viewbg05"><a href="#">保存</a></dd>'));
            //            tools.append($wd.format('<dd class="log_viewbg06"><a href="#">打印</a></dd>'));
            //            tools.append($wd.format('<dd class="log_viewbg07"><a href="#">收藏</a></dd>'));

            //===================== blog blog
            log_view_page.append(v.content);
            var comment_span = jQuery('<span></span>').appendTo(log_view_page);
            var comment_link = jQuery('<a href="javascript:void(0);" class="cli_pl">评论</a>').appendTo(comment_span);

            comment_link.unbind("click").click(function () {
                comment_span.replycontent({
                    posts_id: v.id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
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
        });
    }
}
/*pagination end*/

/*get cat by article */
function getBlogCountByArticleCat() {
    $.ajax({
        url: "../articlecat_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogcountbyarticle',user_id:'" + uid + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('#articlecat');
                $.each(data.rows, function (i, v) {
                    var li = jQuery('<li class="listM_li"><span class="ontab" style="display:none"><input type="text" class="inp55" readonly="readonly" value="操作" />'
                        + '<ul class="test_xl" style="width:42px; height:25px; display:none;">'
                    //  + '<li style="padding-left:0px;"><a href="javascript:;">保存</a></li>'
                            + '<li style="padding-left:0px;"><a href="javascript:;">打印</a></li>'
                        + '<ul></span></li>').appendTo(box);
                    var link = jQuery($wd.format('<a href="javascript:;">{0}({1})</a>', v.category_name, v.blogcount)).appendTo(box);
                    link.appendTo(li);

                    //                    li.find('li:eq(0)').click(function () {
                    //                        
                    //                    });

                    li.find('.test_xl').find('li:eq(0)').click(function () {
                        var str = "{opertype:'catblogprint',printfile:'blogbycat', printdatafile: 'PersonSQL', printdata_body2: 'SearchOfIndex',pagecurrent: 1,pageSize: 20,user_id: '" + uid + "', titOrContent:'',category_id:'" + v.id + "',timeName:''}";
                        printBlogList(str);
                    });

                    //category_id
                    link.click(function () {
                        pagination('', v.id, '');
                    });

                });
                $('#articlecat').parent().parent().show();
                box.blogCagegoryList('cat');
            }
        }
    });
    
}

/*get cat by date */
function getBlogCountByDateCat() {
    $.ajax({
        url: '../datecat_blog.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getblogcountbycatdate',user_id:'" + uid + "'}",
        error: function () {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('#datecat');
                $.each(data.rows, function (i, v) {
                    var li = jQuery('<li class="listM_li"><span class="ontab" style="display:none"><input type="text" class="inp55" readonly="readonly" value="操作" />'
                        + '<ul class="test_xl" style="width:42px; height:25px; display:none;">'
                    //  + '<li style="padding-left:0px;"><a href="javascript:;">保存</a></li>'
                        + '<li style="padding-left:0px;"><a href="javascript:;">打印</a></li>'
                        + '<ul></span></li>').appendTo(box);
                    var link = jQuery($wd.format('<a href="javascript:;">{0}({1})</a>', v.categorydate, v.count)).appendTo(box);
                    link.appendTo(li);
                    //category_id
                    link.click(function () {
                        pagination('', '', v.categorydate);
                    });

                    li.find('.test_xl').find('li:eq(0)').click(function () {
                        var str = "{opertype:'catblogprint',printfile:'blogbycat', printdatafile: 'PersonSQL', printdata_body2: 'SearchOfIndex',pagecurrent: 1,pageSize: 20,user_id: '" + uid + "', titOrContent:'',category_id:'',timeName:'" + v.categorydate + "'}";
                        printBlogList(str);
                    });

                });
                $('#datecat').parent().parent().show();
                box.blogCagegoryList('date');
            }
        }
    });
}


function getBlogNameAndDesc() {
    $.ajax({
        url: "../list_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblognameanddesc',user_id:'" + uid + "'}",
        error: function (data) {

        },
        success: function (data) {
            if (data.result) {
                if (data.name || data.description)
                    $('.log_manage_Rtit').append($wd.format('<h1>{0}</h1><p>{1}</p>', data.name, data.description)).show();
            }
        }
    });
}

/*get blogcomments by blog id*/
function getCommentByBlogId(id,callback) {

}

function printBlogList(str) {
    window.open("../Common/print.aspx?jsonparam=" + str);
}