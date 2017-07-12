
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

var default_permission = ''; //blog default permission
var default_cat = ''; //blog default category

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
            $('#selectPermission').chosen();
            default_permission = $('#selectPermission').val(); //set the first permission to save 

            select_permission.append(perOptions).chosen(); //保存日志操作日志下拉
            getDefaultPermission();

            canAddCustomPermissionForCurUser(function (data) {
                if (data.result) {
                    //   $('#selectPermission').append('<option value="0">自定义</option>');
                    //$('#selectPermission').chosen();
                } else {
                    $('#selectPermission').chosen();
                }
            });
        }
    });

    //update personalsettings - default category
    $('#selectPermission').change(function () {
        if ($(this).val()) {
            setBlogDefaultPermssion($(this).val(), function (data) {
                if (data.result) {
                    //default_permission
                } else {
                    $('#selectPermission').val(default_permission).chosen();
                }
            });
        }
    });

    //日志操作事件
    var toolsBar = $('#tools').empty();
    toolsBar.append('<input type="checkbox" class="chkAll" />');

    toolsBar.append('&nbsp;');
    var link_batchDel = jQuery('<a href="javascript:;">' + wanerdaoLangTip('common_00047') + '</a>').appendTo(toolsBar);
    link_batchDel.click(function () {
        batchDel();
        return false;
    });
    toolsBar.append('&nbsp;');
    var select_category = jQuery('<select id="moveToCat"><option value="">' + wanerdaoLangTip('common_00052') + '</option></select>').appendTo(toolsBar);
    select_category.change(function () {
        if ($(this).val())
            batchUpdateCat($(this).val());
    });
    select_category.chosen();

    toolsBar.append('&nbsp;');
    var select_permission = jQuery('<select id="updatePer"><option value="">' + wanerdaoLangTip('common_00053') + '</option></select>').appendTo(toolsBar);
    select_permission.change(function () {
        if ($(this).val()) {
            batchUpdatePer($(this).val(), $(this).find('option:selected').text());
        }
    });
    select_permission.chosen();

    //update personalsettings - default permission
    $('#selectCat').change(function () {
        if ($(this).val()) {
            setBlogDefaultCat($(this).val(), function (data) {
                if (data.result) {
                } else {
                    $('#selectCat').val(default_cat).chosen();
                }
            });
        }
    });

    getCurUserCat(); //get the blog article category of current user

    getBlogCountByArticleCat(); //按文章分类

    //日期选择
    $('#time1,#time2').dblclick(function () {
        $(this).val('');
    });
    var now = new Date();
    $('#time1').datetimepicker({
        showHour: false,
        showMinute: false,
        showTime: false,
        showTimepicker: false,
        onClose: function (dateText, inst) {
            var endDateTextBox = $('#time2');
            if (endDateTextBox.val() != '') {
                var testStartDate = new Date(dateText);
                var testEndDate = new Date(endDateTextBox.val());
                if (testStartDate > testEndDate)
                    endDateTextBox.val(dateText);
            }
            else {
                endDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            var start = $(this).datetimepicker('getDate');
            $('#time2').datetimepicker('option', 'minDate', new Date(start.getTime()));
            var testEndDateBox = $('#time2');
            if (testEndDateBox.val() != '') {
                var testStartDate = new Date(selectedDateTime);
                var testEndDate = new Date(testEndDateBox.val());
            }
        }
    }).attr('title', wanerdaoLangTip('common_00055'));
    $('#time2').datetimepicker({
        showHour: false,
        showMinute: false,
        showTime: false,
        showTimepicker: false,
        onClose: function (dateText, inst) {
            var startDateTextBox = $('#time1');
            if (startDateTextBox.val() != '') {
                var testStartDate = new Date(startDateTextBox.val());
                var testEndDate = new Date(dateText);
                if (testStartDate > testEndDate)
                    startDateTextBox.val(dateText);
            }
            else {
                startDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            var end = $(this).datetimepicker('getDate');
            $('#time1').datetimepicker('option', 'maxDate', new Date(end.getTime()));
            var startDateTextBox = $('#time1');
            var testStartDate = new Date(startDateTextBox.val());
            var testEndDate = new Date(selectedDateTime);
        }
    }).attr('title', wanerdaoLangTip('common_00055'));

    //搜索
    $('#srhButton').click(function () {
        pagination($('#key').val(), $('#sCat').val(), $('#time1').val(), $('#time2').val());
    });

    //新建日志分类
    $('#createCat').click(function () {
        var newCategory = $('#newcat').val();
        if (newCategory && newCategory != $('#newcat').attr('inputdefault')) {
            if (newCategory.length > 40) {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('blog_00001')
                });
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
                            $('#newcat').val('');
                            getCurUserCat();
                            getBlogCountByArticleCat();
                        }
                        $('#createCat').removeAttr('disabled');
                    }
                });
            }
        } else {
            $('#newcat').focus();
        }
    });

    pagination('', '', '', '');
});

function getCurUserCat() {
    //getcuruserblogcat
    $.ajax({
        url: "../getcuruserblogcat_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getcuruserblogcat'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                catOptions = '';
                $.each(data.rows, function (i, v) {
                    catOptions += $wd.format('<option value="{0}">{1}</option>', v.id, v.category_name);
                    //                    $('#selectCat').append($wd.format('<option value="{0}">{1}</option>', v.id, v.category_name));
                    //                    $('#sCat').append('<option value="' + v.id + '">' + v.category_name + '</option>');

                });

                $('#selectCat')[0].options.length = 0;
                $('#selectCat').append(catOptions).chosen();
                $('#sCat')[0].options.length = 1;
                $('#sCat').append(catOptions).chosen();
                $('#moveToCat')[0].options.length = 1;
                $('#moveToCat').append(catOptions).chosen();
                default_cat = $('#selectCat').val(); //set blog settings default categeory

                getDefaultCat();
            }
        }
    });
}

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
            if (data.result) {
                $('#selectCat').val(data.msg).chosen();
            }
        }
    });
}

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
                default_permission = data.default_permission;
            }
        }
    });
}

/*get cat by article */
function getBlogCountByArticleCat() {
    $.ajax({
        url: "../getblogcountbyarticle_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblogcountbyarticle',user_id:''}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('#blogcat').empty();
                $.each(data.rows, function (i, v) {
                    var li = jQuery('<li class="listM_li" style=" padding-top:3px;"></li>').appendTo(box);
                    var span_tool = jQuery('<span class="listbox_ri" style="display:none;""></span>').appendTo(li);
                    var link_per = jQuery('<a class="" href="javascript:void(0);"><img src="../images/managebg02.jpg"/></a>').appendTo(span_tool);
                    var link_update = jQuery('<a class="" href="javascript:void(0);"><img src="../images/managebg03.jpg"/></a>').appendTo(span_tool);
                    var link_del = jQuery('<a class="" href="javascript:void(0);"><img src="../images/managebg04.jpg"/></a>').appendTo(span_tool);

                    link_per.click(function () {
                        //updateBlogCatPermission(v.id,
                        setCustomPermission(function (data) {
                            ajaxfunc('permission_personal.axd', "{opertype:'updatepersonalprofilepermission',permission:'" + data.id + "'}", null, function (data) {
                                if (data.result) {
                                    new pop({ typename: 'success',
                                        msginfo: wanerdaoLangTip('blog_00017')
                                    });
                                } else {
                                    new pop({ typename: 'error',
                                        msginfo: wanerdaoLangTip('blog_00018')
                                    });
                                }
                            });
                        });
                        return false;
                    });

                    link_update.click(function () {
                        if (li.find('a.catName').is(':visible')) {
                            li.find('a.catName').hide();
                            li.find('input').show();
                        } else {
                            var catName = li.find('a.catName').html();
                            li.find('input').val(catName.substr(0, catName.indexOf('(')));
                            li.find('input').hide();
                            li.find('a.catName').show();
                        }
                        return false;
                    });

                    link_del.click(function () {
                        new pop({ typename: 'confirm',
                            msginfo: wanerdaoLangTip('common_00036'),
                            callback: function () {
                                delBlogCat(v.id, function () {
                                    li.remove();
                                });
                            },
                            cancelcallback: function () {

                            }
                        });
                        return false;
                    });
                    li.append($wd.format('<a href="javascript:;" class="catName">{0}({1})</a><input type="text" value="{0}" style="display: none; height: 16px; width: 80px" maxlength="50"/></span>', v.category_name, v.blogcount));

                    li.find('input').blur(function () {
                        if ($.trim($(this).val())) {
                            var cName = $.trim($(this).val());
                            $(this).hide();
                            li.find('a.catName').show();
                            updateBlogCat(v.category_id, cName, function () {

                            }, function () {
                                var nn = li.find('a.catName').html().replace(/[^(]*\(/, cName + '(');
                                li.find('a.catName').html(nn);
                                getCurUserCat();
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
    $('.chkAll').attr('checked', false);
    //string titOrContent,string category_id,string time1,string time2,string pagecurrent,string pageSize
    $(".pageList").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: databind,
        info: {},
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
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li = jQuery('<li class="listM_li"></li>').appendTo(box);
            li.append($wd.format('<span><a href="blog_view.html?id={0}" class="listbox_ri" style=" display:none">' + wanerdaoLangTip('common_00054') + '</a><i>{3}</i><i>{4}</i></span>'
            + '<input name="" type="checkbox" value="{0}" class="chkId" value="{0}">'
            + '<label><a href="javascript:;" id="c_yellow">[{2}]</a><a href="blog_view.html?id={0}">{1}</a></label>', v.id, v.title, v.category_name, v.permissionname, getLocationDateString(v.post_date, 'MM/dd/yyyy')));

            li.blogItemHover();
        });

        chkIdClick(); //checkbox bind check event
    }
}

/*pageinaition end*/
function batchDel() {
    var ids = getChkIds();
    //batchupdateblogpermission
    if (ids) {
        new pop({ typename: 'confirm',
            msginfo: wanerdaoLangTip('common_00036'),
            callback: function () {
                $.ajax({
                    url: "../batchdeleteblog_blog.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'batchdeleteblog',blogid:'" + ids + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            $('.chkId').each(function () {
                                if (ids.indexOf($(this).val()) > -1) {
                                    $(this).parent().remove();
                                    pagination($('#key').val(), $('#sCat').val(), $('#time1').val(), $('#time2').val());
                                }
                            });
                        }
                    }
                });
            },
            cancelcallback: function () {

            }
        });

    } else {
        new pop({ typename: 'warning',
            msginfo: wanerdaoLangTip('common_00004')
        });
    }
}

function batchUpdateCat(catId) {
    var ids = getChkIds();
    if (ids) {
        //batchupdateblogpermission
        if (ids) {
            $.ajax({
                url: "../batchupdateblogcategory_blog.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'batchupdateblogcategory',blogid:'" + ids + "',cid:'" + catId + "'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result) {
                        pagination($('#key').val(), $('#sCat').val(), $('#time1').val(), $('#time2').val());
                    }
                }
            });
        }
    } else {
        $('#moveToCat').val('');
        new pop({ typename: 'warning',
            msginfo: wanerdaoLangTip('common_00004')
        });
    }
}

function batchUpdatePer(permissionId, perName) {
    var ids = getChkIds();
    if (ids) {
        $.ajax({
            url: "../batchupdateblogpermission_blog.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'batchupdateblogpermission',blogid:'" + ids + "',permissionid:'" + permissionId + "'}",
            error: function (data) {
            },
            success: function (data) {
                if (data.result) {
                    $('.chkId').attr('checked', false);
                    $('.chkAll').attr('checked', false);
                    $('.chkId').each(function () {
                        if (ids.indexOf($(this).val()) != -1) {
                            $(this).parent().find('i:eq(0)').html(perName);
                        }
                    });

                }
            }
        });
    } else {
        $('#updatePer').val('');
        new pop({ typename: 'warning',
            msginfo: wanerdaoLangTip('common_00004')
        });
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
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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
                new pop({ typename: 'success',
                    msginfo: data.msg
                });
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