jQuery.fn.extend({
    videoAlbumHover: function () {
        $(this).bind("mouseenter mouseleave", function () {
            $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
        })
    }
});
var permissionList = '';
var permissionArr = [];
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

            canAddCustomPermissionForCurUser(function (data) {
                if (data.result) {
                    // $('#setdefaultpermission').append('<option value="custom">自定义...</option>');
                }
            });


            getVideoAlbumSetting();
            //getPhotoAlbumDefaultPermission();
        }

        albumPaginator('', '', videoAlbumBind); //Video Album Pageing

    });

    $(".alb_edit li").bind("mouseenter mouseleave", function () {
        $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
    })

    ///Set Personal Video Setting Default Permission
    $('#setdefaultpermission').change(function () {
        if ($(this).val()) {
            upatePermissionOfVideoSettings($(this).val(), function (data) {
                if (!data.result) {
                    $('#setdefaultpermission').val(videoSetting.default_permission);
                }
            });
        }
    });

    /* Create New Video Album*/
    $('#newalbum').click(function () {
        if ($('#albumname').val()) {
            addVideoAlbum($('#albumname').val());
        } else {
            alert(wanerdaoLangTip('video_00005'));
        }
    });

    /* Search Video By Key*/
    $('#srhAlbum').click(function () {
        albumPaginator('', $('#srhkey').val(), videoAlbumBind); //相册分页
    });


    chkAllClick(); //check control

    $('#updatePer').change(function () {
        if ($(this).val()) {
            var ids = getChkIds();
            if (ids) {
                batchUpdatePermissionOfVideoAlbum(ids, $(this).val(), function (data) {
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
                alert(wanerdaoLangTip('video_00004'));
            }
        }
    });

    $('#batchDelAlbums').click(function () {
        var ids = getChkIds();
        if (ids) {
            batchDeleteVideoAlbum(ids, function (data) {
                if (data.result) {
                    if (data.result) {
                        $('.chkId').each(function () {
                            if (ids.indexOf($(this).val()) != -1) {
                                $(this).parent().parent().fadeTo('slow', 0, function () {
                                    $(this).remove();
                                });
                            }
                        });
                    } else {
                        alert(data.msg);
                    }
                } else {
                    alert(data.msg);
                }
            });
        } else {
            alert(wanerdaoLangTip('video_00004'));
        }
    });
});


//Video ALbum Bind
function videoAlbumBind(data) {
    var box = $('.alb_list').empty();
    if (data.result && data.rows.length) {
        $.each(data.rows, function (i, v) {
            var li_video = jQuery("<li></li>").appendTo(box); //item

            var div = jQuery('<div class="pers"></div>').appendTo(li_video);

            div.append($wd.format('<div class="pic"><img src="{0}" alt="" style="width: 205px; height: 145px;"/></div>', '/images/photo1.gif')); //add Image

            var div_info = jQuery('<div class="bm_info"></div>').appendTo(div);

            var link_del = jQuery('<a href="javascript:;" class="delete"></a>').appendTo(div_info);
            link_del.click(function () {
                if (v.is_system == 'True') {
                    alert(wanerdaoLangTip('video_00006'));
                } else {
                    if (confirm(wanerdaoLangTip('video_00010'))) {
                        delAlbum(v.id, function (data) {
                            if (data.result) {
                                li_video.fadeTo('slow', 0, function () {
                                    li_video.remove();
                                });
                            }
                        });
                    }
                }
                return false;
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
                            renameOfVideoAlbum(v.id, newNameValue, function (data) {
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
            });

            div_info.append($wd.format('<input type="checkbox" class="chkId vInput" value="{0}"/><label>{1}</label>', v.id, v.folder_name));

            var div_edit = jQuery('<div class="hr_wp"></div>').appendTo(div);
            div_edit.append('<div class="hover_bg"></div>');

            var div_edit_box = jQuery($wd.format('<div class="hover_box">'
                                        + '<div>权限</div>'
                                        + '<div class="t_des"></div>'
                                         + '<div class="date_atn"><a href="javascript:;" onclick="window.location=\'video_manage.html?albumid={0}\';" class="enter">进入相册</a>{1}</div>'
                                    + '</div>', v.id, DateFormat(v.create_date, 'yyyy/MM/dd'))).appendTo(div_edit);

            var select_per = jQuery('<select class="sel_c3" style="width:180px;"></select>').appendTo(div_edit_box.find('div:eq(0)'));
            select_per.append('<option value="">选择权限</option>');
            select_per.append(permissionList);

            select_per.change(function () {
                if ($(this).val()) {
                    updatePermissionOfVideoAlbum(v.id, $(this).val(), function (data) {
                        if (data.result) {
                            select_per.parent().next('.t_des').html(getValuByKey(permissionArr, select_per.val(), 'id', 'name'));
                            $(this).val('');
                        } else {
                            $(this).val('');
                        }
                    });
                }
            });

            $.each(permissionArr, function (i, per) {
                if (per.id == v.permission) {
                    select_per.parent().next('.t_des').html(per.name);
                    return false;
                }
            });

            li_video.videoAlbumHover();
        });

        chkIdClick();
    }
}

/******   getphotoalbumsetting   ******/
function getVideoAlbumSetting() {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getvideosettings'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                videoSetting = data.obj;
                $('#setdefaultpermission').val(data.obj.default_permission);
            }
        }
    });
}

/* Add Video Album */
function addVideoAlbum(name) {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addvideoalbum', folder_name:'" + name + "'}",
        error: function (data) {
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


/* Update Personal Video Setting Default Permission */
function upatePermissionOfVideoSettings(permission, callback) {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatevideosettings', permission:'" + permission + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}


/*Update Video Album's Permission*/
function updatePermissionOfVideoAlbum(id, per, callback) {
    //updatevideoalbumbyid
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatevideoalbumbyid',folder_id:'" + id + "',permission:'" + per + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}


/*ReName Video Album */
function renameOfVideoAlbum(id, name, callback) {
    //updatevideoalbumbyid
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatevideoalbumbyid',folder_id:'" + id + "',folder_name:'" + name + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* delete album id */
function delAlbum(id, callback) {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletevideofolderbyid',folder_id:'" + id + "',folder_name:'" + name + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//batch Update Permission Of Video Album
function batchUpdatePermissionOfVideoAlbum(ids, permissionId, callback) {
    //batchupdatepermissionofvideoalbum
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchupdatepermissionofvideoalbum',folder_id:'" + ids + "',permission:'" + permissionId + "'}",
        error: function (data) {
            ;
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}


/* batch Delete Video Album*/
function batchDeleteVideoAlbum(ids, callback) {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchdeletevideoalbum',folder_id:'" + ids + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}