var msgTip = {
    select_count_zero: '请至少选择一项',
    delete_confirm: '确认删除吗？',
    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}


var permissionList = '';
var permissionArr = [];
var acitivityArr = [];
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
            getCountOfCustomPermissionOfCurUSer(function (data) {
                if (data.result && parseInt(data.msg) < 5) {
                    $('#setdefaultpermission').append('<option value="custom">自定义...</option>');
                }
            });

            getPhotoAlbumSetting();
            //getPhotoAlbumDefaultPermission();
        }


        getCurUserJoinActivity(function (data) {
            if (data.result && data.rows) {

                $.each(data.rows, function (i, v) {
                    acitivityArr.push({ id: v.id, name: v.active_name });
                });

            }
            paginator(''); //相册分页
        });

    });

    /* Create New PhotoAlbum*/
    $('#newalbum').click(function () {
        if ($('#albumname').val()) {
            addPhotoAlbum($('#albumname').val());
        } else {
            alert('please anter the new album name');
        }
    });

    /* Set Photo Default Permission */
    $('#setdefaultpermission').change(function () {
        if ($(this).val()) {
            setPhotoAlbumDefaultPermission($(this).val());
        }
    });

    /* Search Album By Key*/
    $('#srhAlbum').click(function () {
        paginator($('#srhkey').val());
    });

    chkAllClick();

    /* Update Permission */
    $('#updatePer').change(function () {
        if ($(this).val()) {
            var ids = getChkIds();
            if (ids) {
                batchUpdateAlbumPermission(ids, $(this).val(), function (data) {
                    if (data.result) {
                        $('.chkId').each(function () {
                            if (ids.indexOf($(this).val()) != -1) {
                                $(this).parent().parent().find('.t_des').html(getValuByKey(permissionArr, $('#updatePer').val(), 'id', 'name'));
                            }
                        });
                    } else {
                        alert(data.msg);
                    }

                    $('#updatePer').val('');
                });
            } else {
                $(this).val('');
                alert(wanerdaoLangTip('photo_00001'));
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                $('#albumname').val('');
                window.location.reload();
            } else {
                alert(data.msg);
            }
        }
    });
}

/* Set Photo Album Default Permission */
function setPhotoAlbumDefaultPermission(per) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setphotoalbumsetting',default_permission:'" + per + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {

            }
        }
    });
}


function paginator(key) {
    $(".alb_nav").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
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

function bindData(data) {
    var box = $('.alb_list').empty();
    if (data.result && data.rows.length) {
        $.each(data.rows, function (i, v) {
            var li_photo = jQuery("<li></li>").appendTo(box);

            if (v.share_key_id == '-1') {
                li_photo.addClass('pers_bgc');
            } else {
                li_photo.addClass('acti_bgc');
            }

            var div = jQuery('<div class="pers"></div>').appendTo(li_photo);

            div.append($wd.format('<div class="pic"><img src="{0}" alt="" style="width: 204px; height: 146px;"/></div>', v.cover_path)); //add Image

            var div_info = jQuery('<div class="bm_info"></div>').appendTo(div);

            var link_del = jQuery('<a href="javascript:;" class="delete"></a>').appendTo(div_info);
            link_del.click(function () {
                delAlbum(v.id);
            });

            var link_update = jQuery('<a href="javascript:;" class="set"></a>').appendTo(div_info);
            link_update.click(function () {
                if (div_info.find('.newname').length == 0) {
                    var fName = div_info.find('label');
                    fName.hide();
                    var fNameValue = fName.html();

                    var newName = jQuery('<input type="text" class="newname" style="height:12px; border:solid 1px #eee;" />').appendTo(div_info);
                    newName.val(fNameValue);
                    newName.blur(function () {
                        var newNameValue = $(this).val();
                        if (newNameValue != fNameValue) {
                            renamePhotoAlbum(v.id, newNameValue, function (data) {
                                if (data.result) {
                                    fName.html(newNameValue);
                                    newName.remove();
                                    fName.show();
                                } else {
                                    fName.html(fNameValue);
                                    newName.remove();
                                    fName.show();
                                }
                            });
                        } else {
                            newName.remove();
                            fName.show();
                        }
                    });
                }


                //                var newName = $(this).parent().find('.newname').val();

                //                renamePhotoAlbum(v.id, newName);
            });

            div_info.append($wd.format('<input type="checkbox" class="chkId" value="{0}"/><label>{1}</label>', v.id, v.folder_name));

            var div_edit = jQuery('<div class="hr_wp"></div>').appendTo(div);
            div_edit.append('<div class="hover_bg"></div>');

            var div_edit_box = jQuery($wd.format('<div class="hover_box">'
                                        + '<div>权限</div>'
                                        + '<div class="t_des show_per"></div>'
                                        + '<div>共享</div>'
                                         + '<div class="t_des show_act"></div>'
                                         + '<div class="date_atn"><a href="javascript:;" onclick="window.location=\'photo_edit_by_list.html?albumid={0}\';" class="enter">进入相册</a>{1}</div>'
                                    + '</div>', v.id, DateFormat(v.create_date, 'yyyy/MM/dd'))).appendTo(div_edit);



            var select_per = jQuery('<select class="sel_c3"></select>').appendTo(div_edit_box.find('div:eq(0)'));
            select_per.append('<option value="">选择权限</option>');
            select_per.append(permissionList);

            select_per.change(function () {
                if ($(this).val()) {
                    batchUpdateAlbumPermission(v.id, $(this).val(), function () {
                        select_per.parent().next('.show_per').html(getValuByKey(permissionArr, select_per.val(), 'id', 'name'));
                        $(this).val('');
                    });
                }
            });

            $.each(permissionArr, function (i, per) {
                if (per.id == v.permission) {
                    select_per.parent().next('.show_per').html(per.name);
                    return false;
                }
            });


            var select_activity = jQuery('<select class="sel_c3"></select>').appendTo(div_edit_box.find('div:eq(2)'));
            select_activity.append('<option value="">选择活动</option>');
            if (acitivityArr) {
                $.each(acitivityArr, function (i, v) {
                    select_activity.append($wd.format('<option value="{0}">{1}</option>', v.id, v.name));
                });

                select_activity.change(function () {
                    if ($(this).val()) {

                    }
                });
            }


            li_photo.albumEditHover();
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* 删除 相册*/
function delAlbum(id) {
    if (id) {
        if (confirm(msgTip.delete_confirm)) {
            $.ajax({
                url: "../edit_photoalbum.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'delphotoalbum', folder_id:'" + id + "'}",
                error: function (data) {
                    // $('#sendmsg').notice(msgTip.request_fail, 1);
                },
                success: function (data) {
                    if (data.result) {

                    }
                }
            });
        }
    }
}


/* 批量 删除 相册*/
function batchDelAlbum(ids) {
    if (ids) {
        if (confirm(msgTip.delete_confirm)) {
            $.ajax({
                url: "../edit_photoalbum.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'batchdelphotoalbum', folder_id:'" + ids + "'}",
                error: function (data) {
                    // $('#sendmsg').notice(msgTip.request_fail, 1);
                },
                success: function (data) {
                    if (data.result) {

                    }
                }
            });
        }
    } else {
        alert(msgTip.select_count_zero);
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback(data);
            }
        }
    });
}


/******   getphotoalbumsetting   ******/
function getPhotoAlbumSetting() {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumsetting'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                $('#setdefaultpermission').val(data.obj.default_permission);
            }
        }
    });
}