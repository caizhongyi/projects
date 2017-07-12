
$(function () {
    bindPTab('');

    getPhotoAlbums();

    /* bind permission*/
    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                $('#selectChoosePermission').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
            });
            $('#selectChoosePermission').chosen();

            getPhotoAlbumSetting(function () { });
        }
    });

    getCurUserActivity(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                $('#selectChooseActivity').append('<option value="' + v.id + '">' + v.activity_name + '</option>');
            });
            $('#selectChooseActivity').chosen();

            $('#selectChooseActivity').change(function () {
                var act_Name = '';
                if ($(this).val()) {
                    act_Name = $(this).find('option:selected').text();
                }
                $('#txtShareActivity').val(act_Name);
            });
        }
    });

    $('#submitPhoto').click(function () {
        submitUploadImage();
    });
   
    intiswfu();
});

function getPhotoAlbums() {
    ajaxfunc('../list_photoalbum.axd', "{opertype:'getphotoalbumlist',pagecurrent:1,pageSize:10000}", function () { }, function (data) {
        if (data.result && data.rows) {
            var box = $('#albumList').empty();
            $.each(data.rows, function (i, v) {
                box.append($wd.format('<option value="{0}">{1}</option>', v.id, v.folder_name));
            });
            box.chosen();

         
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
                $('#selectChoosePermission').val(data.obj.default_permission).chosen();
            }
        }
    });
}


//currentuserjoinactivitypage
function getCurUserActivity(success) {
    $.ajax({
        url: "getactivity_common.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "currentuserjoinactivitypage",
            pagecurrent: 1,
            pageSize: 5
        },
        cache: false,
        timeout: 60000,
        error: function (data) {

        },
        success: success
    });
}


var swfu;
var batchid = newGuid();
var upPhotoList = ''; //上传图片集合

function intiswfu() {
    var path = document.location.href;
    //path = path.substring(0, path.lastIndexOf("/")) + "/upload.aspx?uid=1";
    //path = "wandao_activity.axd";
    swfu = new SWFUpload({
        // Backend Settings
        upload_url: "photoupload_common.axd", // Relative to the SWF file
        post_params: {
            "opertype": "albumphotoupload", //业务代码
            "batchid": batchid //批次ID
        },

        // File Upload Settings
        file_size_limit: "10 MB",
        file_types: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
        file_types_description: "图片",
        file_upload_limit: "0",    // Zero means unlimited

        // Event Handler Settings - these functions as defined in Handlers.js
        //  The handlers are not part of SWFUpload but are part of my website and control how
        //  my website reacts to the SWFUpload events.
        file_queue_error_handler: fileQueueError,
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
        flash_url: "../Scripts/openplugin/swfupload/swfupload.swf", // Relative to this file

        custom_settings: {
            upload_target: "divFileProgressContainer",
            cancelButtonId: "btnCancelUpload"
        },
        // Debug Settings
        debug: false
    });
}

function submitUploadImage() {
    $('#divFileProgressContainer').html('');
    if (!upPhotoList) {

        new pop({ typename: 'warning',
            msginfo: "Please upload a photo, and then submit"
        });
        return false;
    }
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
        }
    }

    //是否选择相册
    if ($('#chkChooseFolder').attr('checked')) {
        if (!$('#albumList').val()) {
            $('.stip').notice(wanerdaoLangTip('photo_00003'), 1);
            $('#albumList').focus();
            return false;
        } else {
            folderId = $('#albumList').val();
        }
    }

    //是否选择权限
    if (!$('#selectChoosePermission').val()) {
        $('.stip').notice(wanerdaoLangTip('photo_00004'), 1);
        $('#selectChoosePermission').focus();
        return false;
    }
    permissionId = $('#selectChoosePermission').val();
   
    //是否共享到活动
    var shareActivity = '';
    if ($('#share').attr('checked')) {
        if (!$('#selectChooseActivity').val()) {
            $('.stip').notice(wanerdaoLangTip('photo_00005'), 1);
            $('#selectChooseActivity').focus();
            return false;
        }
        shareActivity = $('#selectChooseActivity').val();
    }

    $('#submitPhoto').attr('disabled', true);
    $.ajax({
        url: "sumbitphoto_common.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "albumphotosubmit",
            batchid: batchid,
            albumtype: 2,
            pList: upPhotoList.substr(0, upPhotoList.length - 1).escapeSpecialchar(),
            folderId: folderId,
            addFolderName: addFolderName,
            permissionId: permissionId,
            activityId: shareActivity
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            $('.stip').notice(wanerdaoLangTip('common_00001'));
            $('#submitPhoto').removeAttr('disabled')
        },
        success: submitUploadImageCallBack
    });
}
function submitUploadImageCallBack(data) {
    upPhotoList = '';
    $('.stip').unnotice(1);
    $('#photoList').empty();
    $('#chkNewFolder').attr('checked', true);
    $('#newAlbum').val('');
    $('#share').attr('checked', false);
    $('#selectChooseActivity').val('').chosen();
    $('#txtShareActivity').val('');

    submitBtnToggle();

    $('#submitPhoto').notice(data.msg, 2);
    setTimeout(function () { $('#submitPhoto').unnotice(2); }, 2000);
    $('#submitPhoto').removeAttr('disabled')
}


function submitBtnToggle() {
    if ($('#photoList').find('li').length == 0) {
        $('#submitPhoto').hide();
    } else {
        $('#submitPhoto').show();
    }
}