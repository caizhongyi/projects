var swfu;
var batchid = newGuid();
var upPhotoList = ''; //上传图片集合
var activity_id = getQueryString("id");
var albumtype = 1;
var fold_id = "0"; //相册id
var newAlbumName = "" //相册名称
var isaddfolder = "" //是否是新建相册 1：新建，0：不是新建
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
    }
    return guid;
} 
function intiswfu() {
    var path = document.location.href;
    //path = path.substring(0, path.lastIndexOf("/")) + "/upload.aspx?uid=1";
    //path = "wandao_activity.axd";
    swfu = new SWFUpload({
        // Backend Settings
        upload_url: "photoupload_common.axd", // Relative to the SWF file
       
        // File Upload Settings
        file_size_limit: "10 MB",
        file_types: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
        file_types_description: "图片",
        file_upload_limit: "0",    // Zero means unlimited

        // Event Handler Settings - these functions as defined in Handlers.js
        //  The handlers are not part of SWFUpload but are part of my website and control how
        //  my website reacts to the SWFUpload events.
        file_queue_error_handler: fileQueueError,
        file_dialog_start_handler: file_dialog_start_handler,
        file_dialog_complete_handler: fileDialogComplete,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccess,
        upload_complete_handler: uploadComplete,

        // Button settings
        button_image_url: "/scripts/openplugin/swfupload/photo_upload_button_blue.png", // Relative to the SWF file
        button_placeholder_id: "spanButtonPlaceholder",
        button_width: 130,
        button_height: 36,
        button_text: '',
        button_text_style: '',
        button_text_top_padding: 0,
        button_text_left_padding: 0,

        // Flash Settings
        flash_url: "../scripts/openplugin/swfupload/swfupload.swf", // Relative to this file
        custom_settings: {
            upload_target: "divFileProgressContainer",
            cancelButtonId: "btnCancelUpload"
        },
        // Debug Settings
        debug: false
    });
}

function file_dialog_start_handler() {
    newAlbumName = $('#newAlbum').val();
    isaddfolder = $(":radio[name='folder']").val();
    var param = {
        "opertype": "albumphotoupload", //业务代码
        "batchid": batchid, //批次ID
        "fold_id": fold_id,  //相册ID(上传到已存在的相册才有用)
        "activity_id": activity_id,  //活动ID（只当新建活动相册时才有用）
        "addfoldname": newAlbumName,  //相册名字
        "isaddfolder": isaddfolder, //是否是新建相册 0不是新建相册， 1是新建相册
        "imagetype": "1", //相片类型：1:活动相册，2：个人相册
        "uid": wd_B.uin.uid
    };
    swfu.setPostParams(param);
}

$(function () {
    //bindPTab(''); 
    if (activity_id != null && activity_id != "0") {
        $("#viewalbum").attr("href", $("#viewalbum").attr("href").replace("{0}", activity_id));
        $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", activity_id));
        $("#editphoto").attr("href", $("#editphoto").attr("href").replace("{0}", activity_id));
        $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", activity_id));
        $.ajax({
            url: "pagination_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "activityindexpage",
                id: activity_id
            },
            cache: false,
            timeout: 60000,
            error: function (data) {

            },
            success: function (data) {
                if (data.result) {
                    $('#activityName').html(data.data.activity_name);
                }
                else {
                    $('#activityName').html(data.msg);
                }
            }
        });
        intiswfu();
        getactivityalbumbyid();
        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    $('#selectChoosePermission').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
                });
                $('#selectChoosePermission').chosen();
            }
        });
        $('#submitPhoto').click(function () {
            submitUploadImage();
        });
    }
    else {
        $("#viewalbum").attr("href", $("#viewalbum").attr("href").replace("{0}", 0));
        $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", 0));
        $("#editphoto").attr("href", $("#editphoto").attr("href").replace("{0}", 0));
        $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", 0));
        $(".albumUploadSetmod,.photoViewBox").hide();
        $(".AM_albumUpload_Main").html(wanerdaoLangTip('common_00028'));
    }
    $(":radio").click(function () {
        if ($(this).attr("id") === "chkNewFolder") {
            $("#dlpermission,#newAlbum").fadeIn();
            //$("#albumlist").fadeOut();
            $("#albumlist_chzn").fadeOut();
        }
        else {
            $("#dlpermission,#newAlbum").fadeOut();
            //$("#albumlist").fadeIn();
            $("#albumlist_chzn").fadeIn();
        }
    });
});
//绑定相册列表。
function getactivityalbumbyid() {
    $("#albumlist").empty();
    $.ajax({
        url: "activityalbum_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivityalbumbyactivityid',activity_id:'" + activity_id + "'}",
        error: function (data) { },
        success: function (data) {
            if (data.rows.length === 0) {
                $("#albumlist").append("<option  value=\"0\">" + wanerdaoLangTip('common_00005') + "</option>");
            }
            else {
                $.each(data.rows, function (i, msg) {
                    $('#albumlist').append($wd.format('<option value="{0}">{1}</option>', msg.id, msg.folder_name));
                });
                $('#albumlist').chosen();
            }            
        }
    });
}
function submitUploadImage() {

    var addFolderName = '';
    var folderId = '';
    var permissionId = '';
    var acitvityId = '';

    //是否输入新相册名
    if ($('#chkNewFolder').attr('checked')) {
        if (!$('#newAlbum').val()) {
            $('.stip').notice(wanerdaoLangTip('photo_00002'), 1);
            $('#newAlbum').focus();
            return false;
        } else {
            addFolderName = $('#newAlbum').val();
            //albumtype = 2;
        }
        //是否选择权限
        if (!$('#selectChoosePermission').val()) {
            $('.stip').notice(wanerdaoLangTip('photo_00004'), 1);
            $('#selectChoosePermission').focus();
            return false;
        }
        permissionId = $('#selectChoosePermission').val();        
    }

    //是否选择相册
    if ($('#chkChooseFolder').attr('checked')) {
        if (!$('#albumlist').val()) {
            $('.stip').notice(wanerdaoLangTip('photo_00003'), 1);
            $('#albumlist').focus();
            return false;
        } else {
            folderId = $('#albumlist').val();
            addFolderName = $("#albumlist").children('option:selected').text();
            //albumtype = 1;
        }
    }

    


    $('.stip').unnotice(1);

    $.ajax({
        url: "sumbitphoto_common.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "albumphotosubmit",
            batchid: batchid,
            albumtype: albumtype,
            pList: upPhotoList.substr(0, upPhotoList.length - 1).escapeSpecialchar(),
            folderId: folderId,
            addFolderName: addFolderName,
            permissionId: permissionId,
            activityId: activity_id,
            imageIds: upPhotoList,
            uid: wd_B.uin.uid
        },
        cache: false,
        timeout: 60000,
        beforeSend: function () {
            $('#submitPhoto').attr("disabled", true);
            $('#submitPhoto').notice(wanerdaoLangTip('common_00071'), 2);
        },
        error: function (data) {
            $('#submitPhoto').notice(wanerdaoLangTip('common_00001'), 2);
            $('#submitPhoto').removeAttr('disabled');
            setTimeout(function () { $('#submitPhoto').unnotice(2); }, 2000);
        },
        success: submitUploadImageCallBack
    });
}
function submitUploadImageCallBack(data) {
    $('#submitPhoto').notice(data.msg, 2);
    $('#submitPhoto').attr("disabled", false);
    upPhotoList = '';
    $('#thumbnails').empty();
    submitBtnToggle();
    if (isaddfolder === "1") {
        getactivityalbumbyid();
    }
    
    setTimeout(function () { $('#submitPhoto').unnotice(2); }, 1000);
    $('#submitPhoto').removeAttr('disabled');
   // location.reload(true);
}


function submitBtnToggle() {
    if ($('#thumbnails').find('li').length == 0) {
        $('#submitPhoto').hide();
    } else {
        $('#submitPhoto').show();
    }
}