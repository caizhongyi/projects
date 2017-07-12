
var blogId;
var saveTimer;
var onCloseSave = true;
$(function () {
    bindPTab();

    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                $('#selectPermission').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
            });

            $('#selectPermission').chosen();
            //judge if can add custom permission
            canAddCustomPermissionForCurUser(function (data) {
                if (data.result) {
                    //$('#selectPermission').append('<option value="more">自定义...</option>');
                    $('#selectPermission').chosen();
                }
            });

            getDefaultPermission();
        }
    });

    $('#selectPermission').change(function () {
        if ($(this).val()) {
            if ($(this).val() == 'more') {
            } else {
            }
        }
    });

    blogId = getQueryString('blogId');
    getCurUserCat(); //获取日志分类列表

    /*加载*/
    if (blogId) {
        $('div.msgtip').html(wanerdaoLangTip('blog_00008'));
        loadBlog();
    } else {
        $('div.msgtip').html(wanerdaoLangTip('blog_00010'));
        getBlogDraft();
        getLocationWeather(); //获取天气
        getLocation(); //获取所在地

        $('.sharetools').ShareTools({ showAcitivity: true, showGroup: true, showInformations: false, showBlog: false,
            activityHandler: function (data) {
                if (data) {
                    $('#sharetoactivity').val(data.id);
                } else {
                    $('#sharetoactivity').val('');
                }
            },
            groupHandler: function (data) {
                if (data) {
                    $('#sharetogroup').val(data.id);
                } else {
                    $('#sharetogroup').val('');
                }
            },
            inforHandler: null,
            blogHandler: null
        });
    }


    $('#weather').click(function () {
        Weather({
            call: 'selector',
            callback: function (data) {
                var weather = data.value;
                Weather({
                    call: 'getImagePath',
                    weatherName: data.value,
                    callback: function (data) {
                        if (data.result) {
                            $('#weather').html('<img src="' + data.path + '" alt="' + data.name + '" name="' + weather + '"/>');
                        }
                    }
                });
            }
        });
    });

    $('#selectCat').change(function () {
        if ($(this).val())
            $('#txtNewCat').hide();
        else $('#txtNewCat').show();
    });


    $('#chkShowWeather').click(function () {
        if ($(this).attr('checked'))
            $('#weather').show();
        else
            $('#weather').hide();
    });

    $('#chkShowLocaiton').click(function () {
        if ($(this).attr('checked')) {
            $('#txtLocation').removeAttr('disabled');
        }
        else {
            $('#txtLocation').val('');
            $('#txtLocation').attr('disabled', true);
        }
    });
    $('#txtLocation').click(function (event) {
        event.stopPropagation();
        new wanerdaoArea({ comopts: { elementid: "#txtLocation", callback: function (data) {
            //$('#txtLocation').attr('ids', data.country.id + ',' + data.state.id + ',' + data.city.id);
        }
        }
        });
    });

    $('#btnPreview').click(function () {

        if (valid()) {
            clearInterval(saveTimer);

            $('div.log_postinfo').hide();

            var preview_box = $('.log_show').show();
            preview_box.append('<div class="log_show_le">'
                + '<div class="log_show_data"></div><div class="log_show_weather"><span class=""></span><a href="javascript:;" style=" display: inline-block; width: 60px; overflow: hidden"></a></div>'
                + '</div>'
                + '<div class="log_show_ri">'
                + '<h2></h2>'
                + '<div class="log_flei"></div>'
                + '<div class="log_content" style="overflow-x:hidden; word-break: break-all"></div>'
                + '<div class="log_show_inp"></div>');


            var btnPublish = jQuery('<input type="button" class="buttonB btn_w135 btn_h36 btnBlue_135 fSize-14 pulish" value="发 布" id="publish">').appendTo(preview_box.find('.log_show_inp'));
            preview_box.find('.log_show_inp').append("&nbsp;");
            var btnCancel = jQuery('<input type="button" class="buttonB btn_w97 btn_h36 btnGary_97 fSize-14 cancelp" value="取 消" id="cancelPreview">').appendTo(preview_box.find('.log_show_inp'));

            //get data
            var weatherImg = '';

            //string cid,title,neirong,tianqi,weizhi,quanxian 权限,cname,activeid,groupid,infoid
            var blog_title = $('#txtTitle').val(); //日志标题
            var blog_content = $('#txtContent').val(); //日志内容

            var blog_publishLocationWeather = ''; //发表地天气
            if ($('#chkShowWeather').attr('checked')) {
                weatherImg = '<img src="' + $('#weather').find('img').attr('src') + '"/>';
                blog_publishLocationWeather = $('#weather').find('img').attr('name');
            }

            var blog_publishLocation = $('#txtLocation').val(); //发表地
            //            if ($('#chkShowLocaiton').attr('checked')) {
            //                var blog_publishLocation = $('#txtLocation').val(); //发表地
            //            }
            var blog_permissionId = $('#selectPermission').val(); //日志权限编号
            var blog_categoryId = $('#selectCat').val(); //日志分类编号
            var blog_categoryName = ''; //分类名称
            var blog_categoryNew = ''; //新分类名称
            if (blog_categoryId) {
                blog_categoryName = $('#selectCat').find('option:selected').text();
            } else {
                blog_categoryNew = $('#txtNewCat').val();
                blog_categoryName = blog_categoryNew;
            }
            var blog_shareActivityId = $('#sharetoactivity').val(); //分享的活动编号
            var blog_shareGroupId = $('#sharetogroup').val(); //分享的
            var blog_shareInforId = $('#sharetoinfor').val()

            //绑定
            preview_box.find('div.log_show_data').html(wanerdaoclienttimer('MM/dd/yyyy')); //publish date
            preview_box.find('div.log_show_weather').find('span').html(weatherImg); //publish location weather
            preview_box.find('div.log_show_weather').find('img').css({ 'width': '23px', 'height': '20px' });
            preview_box.find('div.log_show_weather').find('a').html(blog_publishLocation); //publish location
            preview_box.find('h2').html(blog_title); //blog title
            preview_box.find('div.log_flei').html(blog_categoryName); //blog category name
            preview_box.find('div.log_content').html(blog_content.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')); //blog content

            btnPublish.click(function () {
                blog_title = blog_title.escapeSpecialchar();
                blog_content = blog_content.escapeSpecialchar().textToHTML();
                if (!blogId) {
                    /*****============*****发表日志***===========***/
                    $.ajax({
                        url: "../write_blog.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'addpersonalblog',title:'" + blog_title + "',neirong:'" + blog_content + "',tianqi:'" + blog_publishLocationWeather
                    + "',weizhi:'" + blog_publishLocation.escapeSpecialchar() + "',quanxian:'" + blog_permissionId + "',cid:'" + blog_categoryId + "',cname:'" + blog_categoryNew
                    + "',activeid:'" + blog_shareActivityId + "',groupid:'" + blog_shareGroupId + "',infoid:'" + blog_shareInforId + "'}",
                        error: function () {
                            saveTimer = setInterval(autoSaveDraft, 300000);
                        },
                        success: function (data) {
                            if (data.result) {
                                onCloseSave = false;

                                location.href = 'blog.html';
                            } else {
                                btnPublish.notice(data.msg, 1);
                                saveTimer = setInterval(autoSaveDraft, 300000);
                            }
                        }
                    });
                } else {
                    /*****============*****修改日志***===========***/

                    //updatepersonalbog
                    $.ajax({
                        url: "../write_blog.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'updatepersonalbog',bid:'" + blogId + "', title:'" + blog_title + "',neirong:'" + blog_content + "',tianqi:'" + blog_publishLocationWeather
                                        + "',weizhi:'" + blog_publishLocation.escapeSpecialchar() + "',quanxian:'" + blog_permissionId + "',cid:'" + blog_categoryId + "',cname:'" + blog_categoryNew
                                        + "'}",
                        error: function () {
                            saveTimer = setInterval(autoSaveDraft, 300000);
                        },
                        success: function (data) {
                            if (data.result) {
                                onCloseSave = false;

                                location.href = 'blog.html';
                            } else {
                                btnPublish.notice(data.msg, 1);
                                saveTimer = setInterval(autoSaveDraft, 300000);
                            }
                        }
                    });
                }
            });

            btnCancel.click(function () {
                preview_box.hide();
                preview_box.empty();
                $('div.log_postinfo').show();
            });
        }
    });

    $('#btnCancel').click(function () {
        window.location = 'blog.html';
    });

    //300000
    saveTimer = setInterval(autoSaveDraft, 300000);
});

function loadBlog() {
    $.ajax({
        url: "../view_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogbyid',blogid:'" + blogId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.rows) {
                $('div.msgtip').empty();
                var blog = data.rows[0];

                $('#txtTitle').val(blog.title.descapeSpecialchar());
                $('#txtContent').val(blog.content.htmlToTEXT().descapeSpecialchar());
                if (blog.weather) {
                    var weather = blog.weather;
                    Weather({
                        call: 'getImagePath',
                        weatherName: blog.weather,
                        callback: function (data) {
                            if (data.result) {
                                $('#chkShowWeather').attr('checked', true);
                                $('#weather').show();
                                $('#weather').html('<img src="' + data.path + '" alt="' + data.name + '" name="' + blog.weather + '"/>');
                            }
                        }
                    });
                } else {
                    $('#chkShowWeather').attr('checked', false);
                    $('#weather').hide();
                }
                if (blog.location) {
                    $('#chkShowLocaiton').attr('checked', true);
                    $('#txtLocation').val(blog.location.descapeSpecialchar());
                } else {
                    $('#chkShowLocaiton').attr('checked', false);
                    $('#txtLocation').attr('disabled', true);
                }

                $('#txtNewCat').hide();
                $('#selectCat').val(blog.category_id);
                $('#selectPermission').val(blog.permission);

                $('#selectCat').chosen();
                $('#selectPermission').chosen();

            } else {
                $('div.msgtip').html(wanerdaoLangTip('blog_00008'));
            }
        }
    });
}

function valid() {
    if (validTitle() & validContent() & validLocation() & validWeather() & validBlogCat()) {
        return true;
    } return false;
}

function validTitle() {
    if (!$.trim($('#txtTitle').val())) {
        $('#txtTitle').error(wanerdaoLangTip('blog_00004'));
        return false;
    }
    $('#txtTitle').unerror();
    return true;
}

function validContent() {
    if (!$.trim($('#txtContent').val())) {
        $('#txtContent').error(wanerdaoLangTip('blog_00005'));
        return false;
    }
    $('#txtContent').unerror();
    return true;
}

function validWeather() {
    if ($('#chkShowWeather').attr('checked') && $('#weather').find('img').length == 0) {
        $('#weather').error(wanerdaoLangTip('blog_00006'));
        return false;
    }
    $('#weather').unerror();
    return true;
}

function validLocation() {
    if ($('#chkShowLocaiton').attr('checked') && !$.trim($('#txtLocation').val())) {
        $('#txtLocation').error(wanerdaoLangTip('blog_00007'));
        return false;
    }
    $('#txtLocation').unerror();
    return true;
}

function validBlogCat() {
    if (!$('#selectCat').val() && !$('#txtNewCat').val()) {
        $('#txtNewCat').error(wanerdaoLangTip('blog_00015'));
        return false;
    }
    $('#txtNewCat').unerror();
    return true;
}

var oldTitle;
var oldContent;
/* Auto Save */
function autoSaveDraft() {
    if ($("#txtContent").val()) {
        if ($("#txtTitle").val() != oldTitle || $("#txtContent").val() != oldContent) {
            oldTitle = $("#txtTitle").val();
            oldContent = $("#txtContent").val();
            $.ajax({
                url: "../write_blog.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'autosavedraft',title:'" + oldTitle.escapeSpecialchar() + "',content:'" + oldContent.escapeSpecialchar().textToHTML() + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        $('.stip').html(data.msg);
                        $('.stip').append('<a href="javascript:void(0);" onclick="this.parentNode.style.display=\'none\'"  class="close" onclick="$(this).parent().hide();return false;"></a>');
                        $('.stip').show();
                        setTimeout(function () {
                            $('.stip').hide();
                        }, 5000);
                    }
                }
            });
        }
    }
}

/* Get Blog Draft*/
function getBlogDraft() {
    $.ajax({
        url: "../write_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogdraft'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows.length > 0) {
                var blog = data.rows[0];
                $('div.msgtip').html('');
                oldTitle = blog.title;
                oldContent = blog.content;
                $('#txtTitle').val(blog.title.descapeSpecialchar());
                $('#txtContent').val(blog.content.descapeSpecialchar().htmlToTEXT());

            } else {
                $('div.msgtip').html(wanerdaoLangTip('blog_00011'));
                setTimeout(function () {
                    $('div.msgtip').html('');
                }, 3000);
            }
        }
    });
}

if (window != top) {



} else {

    if (window.Event) {

        window.onunload = function (event) {
            if (onCloseSave) {
                autoSaveDraft();
            }
            return false;
        }
    } else {

        window.onunload = function () {
            if (onCloseSave) {
                autoSaveDraft();
            }
            return false;
        }

    }
}

/* Get Weather */
function getLocationWeather() {
    //$('#weather').html('loading');
    //getlocationweather
    $.ajax({
        url: "../weather_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getlocationweather'}",
        error: function (data) {
            //  $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                var weather = data.msg;
                Weather({
                    call: 'getImagePath',
                    weatherName: data.msg,
                    callback: function (data) {
                        if (data.result) {
                            $('#chkShowWeather').attr('checked', true);
                            $('#weather').show();
                            $('#weather').html('<img src="' + data.path + '" alt="' + data.name + '" name="' + weather + '"/>');
                        }
                    }
                });
            } else {

            }
        }
    });
}

/*获取地址*/
function getLocation() {
    $.ajax({
        url: "../weather_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcurrentlocation'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                $('#chkShowLocaiton').attr('checked', true);
                $('#txtLocation').val(data.msg);
            }
        }
    });
}

/* get blog article category of current user*/
function getCurUserCat() {
    //getcuruserblogcat
    $.ajax({
        url: "../write_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcuruserblogcat'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                $.each(data.rows, function (i, v) {
                    $('#selectCat').append($wd.format('<option value="{0}">{1}</option>', v.id, v.category_name));
                });
                $('#selectCat').chosen();
                getDefaultCat();
            }
        }
    });
}


/*
获取默认日志权限
*/
function getDefaultPermission() {
    //getblogdefaultpermission
    $.ajax({
        url: "../getblogdefaultpermission_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogdefaultpermission'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.default_permission) {
                $('#selectPermission').val(data.default_permission).chosen();
            }
        }
    });
}

/*
获取默认日志分类
*/
function getDefaultCat() {
    //getblogdefaultcategory
    $.ajax({
        url: "../getblogdefaultcategory_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogdefaultcategory'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.msg) {
                $('#selectCat').val(data.msg).chosen().change();
            }
        }
    });
}