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
            $('#setdefaultpermission').chosen();
            $('#updatePer').chosen();
            canAddCustomPermissionForCurUser(function (data) {
                if (data.result) {
                    // $('#setdefaultpermission').append('<option value="custom">自定义...</option>');
                }
            });


            getVideoAlbumSetting();
            //getPhotoAlbumDefaultPermission();
        }

        albumPaginator('', getSearchKey(), videoAlbumBind); //Video Album Pageing

    });

    $(".alb_edit li").bind("mouseenter mouseleave", function () {
        $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
    })

    ///Set Personal Video Setting Default Permission
    $('#setdefaultpermission').change(function () {
        if ($(this).val()) {
            var perId = $(this).val();
            upatePermissionOfVideoSettings(perId, function (data) {
                if (!data.result) {
                    $('#setdefaultpermission').val(videoSetting.default_permission).chosen();
                } else {
                    videoSetting.default_permission = perId;
                }
            });
        }
    });

    /* Create New Video Album*/
    $('#newalbum').click(function () {
        if ($('#albumname').val() && $('#albumname').val() != $('#albumname').attr('inputdefault')) {
            addVideoAlbum($('#albumname').val());
        } else {
            $('#albumname').focus();
        }
    });

    /* Search Video By Key*/
    $('#srhAlbum').click(function () {
        albumPaginator('', getSearchKey(), videoAlbumBind); //相册分页
    });

    $('#updatePer').change(function () {
        if ($(this).val()) {
            var ids = getChkIds();
            if (ids) {
                batchUpdatePermissionOfVideoAlbum(ids, $(this).val(), function (data) {
                    if (data.result) {
                        $('.chkId').each(function () {
                            if (ids.indexOf($(this).val()) != -1) {
                                $(this).parent().parent().find('.edit-all:eq(0)').html(getValuByKey(permissionArr, $('#updatePer').val(), 'id', 'name'));
                                //$(this).parent().parent().find('.t_des').html(getValuByKey(permissionArr, $('#updatePer').val(), 'id', 'name'));
                            }
                        });
                    } else {
                        new pop({ typename: 'warning',
                            msginfo: data.msg
                        });
                    }
                    $('.chkId').attr('checked', false);
                    $('.chkAll').attr('checked', false);
                    $('#updatePer').val('').chosen();
                });
            } else {
                $(this).val('');
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('video_00004')
                });
            }
        }
    });

    $('#batchDelAlbums').click(function () {
        var ids = getChkIds();
        if (ids) {
            new pop({ typename: 'confirm',
                msginfo: wanerdaoLangTip('personal_00006'),
                callback: function () {
                    batchDeleteVideoAlbum(ids, function (data) {
                        if (data.result) {
                            $('.chkId').each(function () {
                                if (ids.indexOf($(this).val()) != -1) {
                                    $(this).parent().parent().fadeTo('slow', 0, function () {
                                        $(this).remove();
                                    });
                                }
                            });
                            $('.chkAll').attr('checked', false);
                            albumPaginator('', getSearchKey(), videoAlbumBind); //Video Album Pageing
                        } else {
                            new pop({ typename: 'error',
                                msginfo: data.msg
                            });
                        }

                    });
                },
                cancelcallback: function () {

                }
            });
        } else {
            new pop({ typename: 'error',
                msginfo: wanerdaoLangTip('video_00004')
            });
        }
    });
});


//Video ALbum Bind
function videoAlbumBind(data) {
    var box = $('.videos-edit').empty();
    if (data.result && data.rows.length) {
        $.each(data.rows, function (i, v) {
            var li_video = jQuery("<li></li>").appendTo(box); //item
            var div_edit_box = jQuery('<div class="edit-box"></div>').appendTo(li_video);

            div_edit_box.append($wd.format('<div class="edit-layer">'
                + '<div class="layer-content">'
                + '<div class="edit-inner">'
                + '<div class="edit-right"><label>Permission:</label><select class="sel_per" style="width:100px;"><option value="">Edit permission</option></select></div>'
                + '<span class="edit-all"></span>'
                + '</div>'
                + '<div class="clearfix"><span class="f_left">{1}</span><a href="javascript:;" class="button" onclick="window.location=\'video_manage.html?albumid={0}\';">Into the album</a></div>'
                + '</div>'
                + '</div>'
                + '<img alt=""  src="../images/photos/photo1.gif"/>', v.id, getLocationDateString(v.create_date, 'yyyy/MM/dd')));

            var sel_per = div_edit_box.find('.sel_per');
            sel_per.append(permissionList);
            sel_per.chosen();
            sel_per.change(function () {
                if ($(this).val()) {
                    updatePermissionOfVideoAlbum(v.id, $(this).val(), function (data) {
                        if (data.result) {
                            sel_per.parent().next('.edit-all').html(getValuByKey(permissionArr, sel_per.val(), 'id', 'name'));
                        }
                        sel_per.val('');
                        sel_per.chosen();
                    });
                }
            });

            sel_per.parent().next('.edit-all').html(getValuByKey(permissionArr, v.permission, 'id', 'name'));

            li_video.append($wd.format('<div  class="videos-name">'
                + '<input type="checkbox" class="checkbox chkId" value="{0}" id="chk_{0}"/>'
                + '<label for="chk_{0}">{1}</label>'
                + '</div>', v.id, v.folder_name));

            li_video.append('<div class="videos-options clearfix"> <a href="javascript:;" class="icon icon-tool"></a> </div>');

            if (v.is_system.toLowerCase() != 'true') {
                var link_del = jQuery('<a href="javascript:;" class="icon icon-delete"></a>').appendTo(li_video.find('.videos-options'));
                link_del.click(function () {
                    new pop({ typename: 'confirm',
                        msginfo: wanerdaoLangTip('personal_00006'),
                        callback: function () {
                            delAlbum(v.id, function (data) {
                                if (data.result) {
                                    li_video.fadeTo('slow', 0, function () {
                                        li_video.remove();
                                    });
                                }
                            });
                        },
                        cancelcallback: function () {

                        }
                    });
                });
            }


            //修改
            li_video.find('.icon-tool').click(function () {
                var $albNameBox = $('.videos-name');
                if ($albNameBox.find('.newname').length == 0) {
                    var fName = $albNameBox.find('label');
                    fName.hide();
                    var fNameValue = fName.html();

                    var newName = jQuery('<input type="text" class="newname" style="height:12px; width:80px; border:solid 1px #eee;" />').appendTo($albNameBox);
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
                $('#setdefaultpermission').val(videoSetting.default_permission).chosen();
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
                $('#srhkey').val('');
                albumPaginator('', '', videoAlbumBind);
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
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

/*
获取 搜索值
*/
function getSearchKey() {
    var srcValue = $('#srhkey').val();
    if (srcValue == $('#srhkey').attr('inputdefault')) {
        srcValue = '';
    }
    return srcValue;
}