
var permissionList = '';
var permissionArr = [];
var acitivityArr = [];
var photoSetting;
$(function () {

    bindPTab('');

    /* bind permission*/
    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                permissionList += $wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME);
                permissionArr.push({ id: v.ID, name: v.NAME });
            });

            $('#setdefaultpermission').append(permissionList);
            $('#updatePer').append(permissionList);
            $('#setdefaultpermission').chosen();
            $('#updatePer').chosen();
            canAddCustomPermissionForCurUser(function (data) {
                //                if (data.result) {
                //                    $('#setdefaultpermission').append('<option value="custom">自定义...</option>');
                //                    $('#setdefaultpermission').chosen();
                //                }
            });

            getPhotoAlbumSetting(function () {

            });
            //  getPhotoAlbumDefaultPermission();
        }


        getCurUserJoinActivity(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    acitivityArr.push({ id: v.id, name: v.activity_name });
                });
            }
            paginator(getSearchKey()); //相册分页
        }, 5);

    });

    /* Create New PhotoAlbum*/
    $('#newalbum').click(function () {
        var newName = $.trim($('#albumname').val());
        if (newName && newName != $('#albumname').attr('inputdefault')) {
            addPhotoAlbum(newName);
        } else {
            $('#albumname').focus();
        }
    });

    /* Set Photo Default Permission */
    $('#setdefaultpermission').change(function () {
        if ($(this).val()) {
            var perId = $(this).val();
            setPhotoAlbumDefaultPermission(perId, function (data) {
                if (!data.result) {
                    $('#setdefaultpermission').val(photoSetting.default_permission).chosen();
                } else {
                    videoSetting.default_permission = perId;
                }
            });
        }
    });

    /* Search Album By Key*/
    $('#srhAlbum').click(function () {
        paginator(getSearchKey());
    });

    /* Update Permission */
    $('#updatePer').change(function () {
        if ($(this).val()) {
            var ids = getChkIds();
            if (ids) {
                batchUpdateAlbumPermission(ids, $(this).val(), function (data) {
                    if (data.result) {
                        $('.chkId').each(function () {
                            if (ids.indexOf($(this).val()) != -1) {
                                $(this).parent().parent().find('.edit-all:eq(0)').html(getValuByKey(permissionArr, $('#updatePer').val(), 'id', 'name'));
                            }
                        });
                    } else {
                        new pop({ typename: 'error',
                            msginfo: data.msg
                        });
                    }

                    $('.chkId').attr('checked', false);
                    $('.chkAll').attr('checked', false);
                    $('#updatePer').val('').chosen();
                });
            } else {
                $(this).val('').chosen();
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('photo_00001')
                });
            }
        }
    });

    $('#batchDelAlbums').click(function () {
        batchDelAlbum(getChkIds());
    });

});


/* Add Photo Album */
function addPhotoAlbum(name) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addphotoalbum', folder_name:'" + name + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $('#albumname').val($('#albumname').attr('inputdefault'));
                window.location.reload();
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
            }
        }
    });
}

/* Set Photo Album Default Permission */
function setPhotoAlbumDefaultPermission(per, success) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setphotoalbumsetting',default_permission:'" + per + "'}",
        error: function (data) {
        },
        success: function (data) {
            success(data);
        }
    });
}


function paginator(key) {
    $(".pageList").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // pagermore: true,
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: bindData,
        ajax: {
            url: 'manage_photoalbum.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getphotoalbumlist',
                folder_name: key
            }
        }
    });
}

function bindData(data, total) {
    var box = $('.alb_list').empty();
    if (data.result && data.rows.length) {
        $('.alb_set').find('a:eq(0)').html($('.alb_set').find('a:eq(0)').html().replace(/\(loading\)/, '(' + total + ')'));

        $.each(data.rows, function (i, v) {
            var li_photo = jQuery("<li></li>").appendTo(box);
            var div_container = jQuery('<div class="album-box clearfix"></div>').appendTo(li_photo);

            if (v.share_key_id != '-1') {
                div_container.addClass('album-sys');
            }

            var div_edit = jQuery('<div class="edit-box"></div>').appendTo(div_container);
            var div_edit_box = jQuery('<div class="edit-layer"></div>').appendTo(div_edit);

            div_edit.append($wd.format('<img src="{0}" class="album" alt="" style=" width: 205px; height: 145px;">', v.cover_path));

            div_edit_box.append('<div class="layer-content">'
                + '<div class="edit-inner">'
                + '<div class="edit-right">'
                + '<label>Permission:</label>'
                + '<select class="select_per" style="width: 100px;"><option value="">Edit permission</option></select>'
                + '</div>'
                + '<span class="edit-all">&nbsp;</span>'
                + '<div class="edit-right">'
                + '<label>Share:</label>'
                + '<select class="select_act"><option value="">Share activity</option></select>'
                + '</div>'
                + '<span class="edit-all">&nbsp;</span></div>'
                + '<div class="clearfix"><span class="f_left">' + getLocationDateString(v.create_date, 'yyyy/MM/dd')
                + '</span><a href="photo_edit_by_list.html?albumid=' + v.id + '" class="button">Into the album</a></div>'
                + '</div>');

            //选择权限
            var select_per = div_edit_box.find('select.select_per');
            select_per.append(permissionList);
            select_per.chosen();
            select_per.change(function () {
                if ($(this).val()) {
                    batchUpdateAlbumPermission(v.id, $(this).val(), function () {
                        select_per.parent().next('.edit-all').html(getValuByKey(permissionArr, select_per.val(), 'id', 'name'));
                        select_per.val('').chosen();
                    });
                }
            });
            $.each(permissionArr, function (ii, per) {
                if (per.id == v.permission) {
                    select_per.parent().next('.edit-all').html(per.name);
                    return false;
                }
            });

            //选择活动
            var select_activity = div_edit_box.find('select.select_act');
            select_activity.chosen();
            if (acitivityArr) {
                $.each(acitivityArr, function (ii, s_act) {
                    select_activity.append($wd.format('<option value="{0}">{1}</option>', s_act.id, s_act.name));
                    if (s_act.id == v.share_key_id) {
                        select_activity.parent().next('.edit-all').html(s_act.name);
                        return false;
                    }
                });
                // select_activity.append('<option value="more">查看更多</option>');
                select_activity.chosen();
                select_activity.change(function () {
                    var actId = $(this).val();
                    if (actId) {
                        if (actId != 'more') {
                            photoAlbumShareToActivity(v.id, $(this).val(), function () {
                                select_activity.parent().next('.edit-all').html(getValuByKey(acitivityArr, select_activity.val(), 'id', 'name'));
                                select_activity.val('').chosen();
                            });
                        } else {
                            select_activity.val('').chosen();
                        }
                    }
                });
            }
            if (i.share_key_id != -1) {
                $.each(acitivityArr, function (ii, act) {
                    if (act.id == act.id) {
                        select_per.parent().next('.edit-all').html(act.activity_name);
                        return false;
                    }
                });
            }

            div_container.append($wd.format('<div class="album-name ellipsis"><input type="checkbox" class="chkId" value="{0}"/><span><a href="javascript:;">{1}</a>({2})</span></div>', v.id, v.folder_name, v.count));

            var album_opt = jQuery('<div class="album-opt"></div>').appendTo(div_container);
            var link_update = jQuery('<a href="javascript:;" class="icon icon-tool"></a>').appendTo(album_opt);
            link_update.click(function () {
                if (album_opt.find('.newname').length == 0) {
                    var div_albname = div_container.find('.ellipsis');
                    var fName = div_albname.find('span').find('a');
                    fName.parent().hide();
                    var fNameValue = fName.html();

                    var newName = jQuery('<input type="text" class="newname" style="height:12px; border:solid 1px #eee;" />').appendTo(div_albname);
                    newName.val(fNameValue);
                    newName.blur(function () {
                        newName.remove();
                        var newNameValue = $(this).val();
                        if (newNameValue != fNameValue) {
                            renamePhotoAlbum(v.id, newNameValue, function (data) {
                                if (data.result) {
                                    fName.html(newNameValue);
                                    fName.parent().show();
                                } else {
                                    fName.html(fNameValue);
                                    fName.parent().show();
                                }
                            });
                        } else {
                            fName.parent().show();
                        }
                    });
                }

            });

            if (v.is_system.toLowerCase() != 'true') {
                var link_del = jQuery('<a href="javascript:;" class="icon icon-delete"></a>').appendTo(album_opt);
                link_del.click(function () {
                    var is_share = false;
                    if (i.share_key_id != -1) {
                        is_share = true;
                    }
                    delAlbum(v.id, is_share);
                });
            }
        });
        chkIdClick();
    }
}

/* 重命名 相册*/
function renamePhotoAlbum(albumId, name, callback) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatephotoalbum', folder_id:'" + albumId + "', folder_name:'" + name + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* 删除 相册*/
function delAlbum(id, is_share) {
    if (id) {
        new pop({ typename: 'confirm',
            msginfo: wanerdaoLangTip(is_share ? 'common_00036' : 'photo_00006'),
            callback: function () {
                $.ajax({
                    url: "../edit_photoalbum.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'delphotoalbum', folder_id:'" + id + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            paginator(getSearchKey());
                        }
                    }
                });
            },
            cancelcallback: function () {

            }
        });
    }
}


/* 批量 删除 相册*/
function batchDelAlbum(ids) {
    if (ids) {
        new pop({ typename: 'confirm',
            msginfo: wanerdaoLangTip('photo_00007'),
            callback: function () {
                $.ajax({
                    url: "../edit_photoalbum.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'batchdelphotoalbum', folder_id:'" + ids + "'}",
                    error: function (data) {
                    },
                    success: function (data) {
                        if (data.result) {
                            $('.chkAll').attr('checked', false);
                            paginator(getSearchKey());
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

/* update album permsiion*/
function batchUpdateAlbumPermission(ids, permissionId, callback) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchsetphotoalbumpermission', folder_id:'" + ids + "',permission:'" + permissionId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback(data);
            }
        }
    });
}


/******   getphotoalbumsetting   ******/
function getPhotoAlbumSetting(success) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumsetting'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $('#setdefaultpermission').val(data.obj.default_permission).chosen();
            }
        }
    });
}


/* get photo album default permission */
function getPhotoAlbumDefaultPermission() {
    $.ajax({
        url: "../wanerdao_permission.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumdefaultpermission'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}

/*
share to activity
*/

/*
获取 搜索值
*/
function getSearchKey() {
    var srhKey = $('#srhkey').val();
    if (srhKey == $('#srhkey').attr('inputdefault')) {
        srhKey = '';
    }
    return srhKey;
}

/*
分享到活动 sharetoactivity
*/
function photoAlbumShareToActivity(albId, actId, success, error) {
    ajaxfunc("../edit_photoalbum.axd", "{opertype:'sharetoactivity',albumId:'" + albId + "',actId:'" + actId + "'}", null, function () {

    });
}