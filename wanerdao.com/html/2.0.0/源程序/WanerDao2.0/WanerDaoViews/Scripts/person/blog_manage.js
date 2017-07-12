
jQuery.fn.extend({
    blogCategoryHover: function () {
        $(this).mouseout(
			function () {
			    $(this).css("backgroundColor", "#fff");
			    $(this).find(".listbox_ri").hide();
			}
		);

        $(this).mouseover(
			function () {
			    $(this).css("backgroundColor", "#f7f7f7");
			    $(this).find(".listbox_ri").show();
			}
		);
    },
    blogItemHover: function () {
        $(this).mouseout(
			function () {
			    $(this).css("backgroundColor", "#fff");
			    $(this).find(".listbox_ri").hide();
			}
		);

        $(this).mouseover(
			function () {
			    $(this).css("backgroundColor", "#f7f7f7");
			    $(this).find(".listbox_ri").show();
			}
		);

    }

});

var default_permission = '';//blog default permission
var default_cat = '';//blog default category

var perOptions = '';
var catOptions = '';
var catName = '';
$(function () {
    bindPTab('');
    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                $('#selectPermission').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
                perOptions += $wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME);
            });

            default_permission = $('#selectPermission').val(); //set the first permission to save 

            getDefaultPermission();

            canAddCustomPermissionForCurUser(function (data) {
                if (data.result) {
                 //   $('#selectPermission').append('<option value="0">自定义</option>');
                }
            });
        }
    });

    //update personalsettings - default category
    $('#selectPermission').change(function () {
        if ($(this).val()) {
            setBlogDefaultPermssion($(this).val(), function (data) {
                if (data.result) {
                } else {
                    $('#selectPermission').val(default_permission);
                }
            });
        }
    });

    //update personalsettings - default permission
    $('#selectCat').change(function () {
        if ($(this).val()) {
            setBlogDefaultCat($(this).val(), function (data) {
                if (data.result) {
                    $('#selectCat').val(default_cat);
                }
            });
        }
    });

    getCurUserCat(); //get the blog article category of current user

    getBlogCountByArticleCat();

    $('#srhButton').click(function () {
        pagination($('#key').val(), $('#sCat').val(), $('#time1').val(), $('#time2').val());
    });

    $('#createCat').click(function () {
        var newCategory = $('#newcat').val();
        if (newCategory) {
            if (newCategory.length > 40) {
                alert(wanerdaoLangTip('blog_00001'));
            } else {
                $(this).attr('disabled', true);
                $.ajax({
                    url: "../manage_blog.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'addblogcat',cyname:'" + newCategory + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            $('#newcat').val(data.msg);
                        }
                        $('#createCat').removeAttr('disabled');
                    }
                });
            }
        }
    });
});


function getCurUserCat() {
    //getcuruserblogcat
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcuruserblogcat'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $.each(data.rows, function (i, v) {
                    $('#selectCat').append($wd.format('<option value="{0}">{1}</option>', v.id, v.category_name));
                    $('#sCat').append('<option value="' + v.id + '">' + v.category_name + '</option>');

                });
                catOptions = $('#selectCat').clone().html();

                default_cat = $('#selectCat').val();//set blog settings default categeory

                getDefaultCat();
                pagination('', '', '', '');
            }
        }
    });

   
}

function getDefaultCat() {
    //getblogdefaultcategory
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogdefaultcategory'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $('#selectCat').val(data.msg);
            }
        }
    });
}

function getDefaultPermission() {
    //getblogdefaultpermission
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogdefaultpermission'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.msg) {
                $('#selectPermission').val(data.msg);
                default_permission = data.msg;
            }
        }
    });
}

/*get cat by article */
function getBlogCountByArticleCat() {

    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogcountbyarticle',user_id:''}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('#blogcat');
                $.each(data.rows, function (i, v) {

                    var li = jQuery('<li class="listM_li" style=" padding-top:3px;"></li>').appendTo(box);
                    var span_tool = jQuery('<span class="listbox_ri" style="display:none;""></span>').appendTo(li);
                    var link_per = jQuery('<a class="" href="javascript:void(0);"><img src="../images/list/managebg02.jpg"/></a>').appendTo(span_tool);
                    var link_update = jQuery('<a class="" href="javascript:void(0);"><img src="../images/list/managebg03.jpg"/></a>').appendTo(span_tool);
                    var link_del = jQuery('<a class="" href="javascript:void(0);"><img src="../images/list/managebg04.jpg"/></a>').appendTo(span_tool);

                    link_per.click(function () {
                        //updateBlogCatPermission(v.id,
                        setCustomPermission(function (data) {
                            ajaxfunc('permission_personal.axd', "{opertype:'updatepersonalprofilepermission',permission:'" + data.id + "'}", null, function (data) {
                                if (data.result) {
                                    alert('日志分类权限设置成功！');
                                } else {
                                    alert('日志分类权限设置失败！');
                                }
                            });
                        });
                        return false;
                    });

                    link_update.click(function () {
                        if (li.find('.listbox_li').find('a').is(':visible')) {
                            li.find('.listbox_li').find('a').hide();
                            li.find('.listbox_li').find('input').show();
                        } else {
                            var catName = li.find('.listbox_li').find('a').html();
                            li.find('.listbox_li').find('input').val(catName.substr(0, catName.indexOf('(')));
                            li.find('.listbox_li').find('input').hide();
                            li.find('.listbox_li').find('a').show();
                        }
                        return false;
                    });

                    link_del.click(function () {
                        if (confirm('确定删除吗？')) {
                            delBlogCat(v.id, function () {
                                li.remove();
                            });
                        }

                        return false;
                    });

                    li.append($wd.format('<span class="listbox_li" style="float: left;"><a href="javascript:;">{0}({1})</a><input type="text" value="{0}" style="display: none; height: 16px; width: 80px" maxlength="50"/></span>', v.category_name, v.blogcount));

                    li.find('.listbox_li').find('input').blur(function () {
                        if ($.trim($(this).val())) {
                            var cName = $.trim($(this).val());
                            $(this).hide();
                            li.find('.listbox_li').find('a').show();
                            updateBlogCat(v.category_id, cName, function () {

                            }, function () {
                                var nn = li.find('.listbox_li').find('a').html().replace(/[^(]*\(/, cName + '(');
                                li.find('.listbox_li').find('a').html(nn);
                            });
                        }
                    });

                    li.blogCategoryHover();
                });
            }
        }
    });

}

/*pageinaition*/
function pagination(key, catid, t1, t2) {
    //string titOrContent,string category_id,string time1,string time2,string pagecurrent,string pageSize
    $(".alb_nav").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: databind,
        ajax: {
            url: 'articleList_blog.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'blogmanagelist',
                titOrContent: key.escapeSpecialchar(),
                category_id: catid,
                time1: t1.escapeSpecialchar(),
                time2: t2.escapeSpecialchar()
            }
        }
    });

}

function databind(data) {
    var box = $('#content').empty();
    var toolsBar = $('#tools').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li = jQuery('<li class="listM_li"></li>').appendTo(box);
            li.append($wd.format('<span><a href="blog_view.html?id={0}" class="listbox_ri" style=" display:none">查看详细</a><i>{3}</i><i>{4}</i></span>'
            + '<input name="" type="checkbox" value="{0}" class="chkId" value="{0}">'
            + '<label><a href="javascript:;" id="c_yellow">[{2}]</a><a href="blog_view.html?id={0}">{1}</a></label>', v.id, v.title, v.category_name, v.permissionname, DateFormat(v.post_date, 'yyyy/MM/dd')));

            li.blogItemHover();
        });


        toolsBar.append('<input type="checkbox" class="chkAll" />');

        var link_batchDel = jQuery('<a href="javascript:;">删除</a>').appendTo(toolsBar);
        link_batchDel.click(function () {
            batchDel();
            return false;
        });

        var select_category = jQuery('<select id="moveToCat"><option value="">更改分类</option></select>').appendTo(toolsBar);
        select_category.append(catOptions);
        select_category.change(function () {
            if ($(this).val())
                batchUpdateCat($(this).val());
        });

        var select_permission = jQuery('<select id="updatePer"><option value="">更改权限</option></select>').appendTo(toolsBar);
        
        select_permission.append(perOptions);
        select_permission.change(function () {
            if ($(this).val())
                batchUpdatePer($(this).val());
        });

        chkIdClick(); //checkbox bind check event
    }
}

/*pageinaition end*/
function batchDel() {
    var ids = getChkIds();
    //batchupdateblogpermission
    if (ids) {
        alert('del');
        $.ajax({
            url: "../manage_blog.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'batchdeleteblog',blogid:'" + ids + "'}",
            error: function (data) {
            },
            success: function (data) {

                if (data.result) {
                }
            }
        });
    } else {
        alert(wanerdaoLangTip('common_00004'));
    }
}

function batchUpdateCat(catId) {
    var ids = getChkIds();
    if (ids) {
        //batchupdateblogpermission
        if (ids) {
            $.ajax({
                url: "../manage_blog.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'batchupdateblogcategory',blogid:'" + ids + "',cid:'" + catId + "'}",
                error: function (data) {
                },
                success: function (data) {

                    if (data.result) {
                        window.location.reload();
                    }
                }
            });
        }
    } else {
        $('#moveToCat').val('');
        alert(wanerdaoLangTip('common_00004'));
    }
}

function batchUpdatePer(permissionId) {

    var ids = getChkIds();
    if (ids) {
        $.ajax({
            url: "../manage_blog.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'batchupdateblogpermission',blogid:'" + ids + "',permissionid:'" + permissionId + "'}",
            error: function (data) {
            },
            success: function (data) {
                if (data.result) {
                    //alert(jQuery.parseJSON(data.msg));
                    //                var rows = jQuery.parseJSON(data.msg);
                    //                var count = rows.length;
                    //                $.each(rows, function (i, v) {
                    //                    $('#selectPermission').append('<option value="' + v.id + '">' + v.name + '</option>');
                    //                });
                }
            }
        });
    } else {
        $('#updatePer').val('');
        alert(wanerdaoLangTip('common_00004'));
    }
}

function getChkIds() {
    var ids = '';
    $('.chkId').each(function () {
        if ($(this).attr('checked')) {
            if (ids) ids += ',';
            ids += $(this).val();
        }
    });
    return ids;
}

//删除日志分类
function delBlogCat(catId, callback) {
    //delblogcat
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "html",
        cache: false,
        data: "{opertype:'delblogcat',cid:'" + catId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                callback();
            } else {
                alert(data.msg);
            }
        }
    });
}

//更新日志分类
function updateBlogCat(catId, newCatName, failCallBack, successCallBack) {
    //updateblogcat
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "html",
        cache: false,
        data: "{opertype:'updateblogcat',cid:'" + catId + "',cname:'" + newCatName + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                failCallBack();
            } else {
                successCallBack();
            }
        }
    });
}

function updateBlogCatPermission(catId, newPer) {
    //updateblogcatpermission
    $.ajax({
        url: "../manage_blog.axd",
        type: "POST",
        dataType: "html",
        cache: false,
        data: "{opertype:'updateblogcatpermission',cid:'" + catId + "',pid:'" + newPer + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                alert('权限修改成功！');
            }
        }
    });
}


/*选择权限*/
function setCustomPermission(_callback) {
    CustomPermission({ callback: function (data) {
        _callback(data);
    },
        overlayopts: {
            // custom top position
            top: 10,

            // some mask tweaks suitable for facebox-looking dialogs
            mask: {

                // you might also consider a "transparent" color for the mask
                color: '#fff',

                // load mask a little faster
                loadSpeed: 200,

                // very transparent
                opacity: 0.5
            },

            // disable this for modal dialog-type of overlays
            closeOnClick: false,

            // load it immediately after the construction
            load: true

        }
    });
}