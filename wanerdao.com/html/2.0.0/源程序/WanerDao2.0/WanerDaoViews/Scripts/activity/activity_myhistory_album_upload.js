var swfu;
var batchid = newGuid();
var allUploadImageId = "";
var activity_id = "0";
if (getQueryString("activity_id") != null && getQueryString("activity_id") != "undefined") {
    activity_id = getQueryString("activity_id");}
var fold_id = "0"; //相册id
var newAlbumName = "" //相册名称
var radAlbum = "" //是否是新建相册 1：新建，0：不是新建
function intiswfu() {
    var path = document.location.href;
    fold_id = $("#albumlist").val() == null ? "" : $("#albumlist").val();
    newAlbumName = $("#newAlbumName").val() == null ? "" : $("#newAlbumName").val();
    radAlbum = $("#radAlbum").val() == null ? "" : $("#radAlbum").val();
    swfu = new SWFUpload({
        // Backend Settings
        upload_url: "pagination_common.axd", // Relative to the SWF file
        // File Upload Settings
        file_size_limit: "10 MB",
        file_types: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
        file_types_description: "图片",
        file_upload_limit: "0",    // Zero means unlimited
        file_queue_error_handler: fileQueueError,
        file_dialog_complete_handler: fileDialogComplete,
        upload_progress_handler: uploadProgress,
        upload_error_handler: uploadError,
        upload_success_handler: uploadSuccess,
        file_dialog_start_handler: file_dialog_start_handler,
        upload_complete_handler: uploadComplete,

        // Button settings
        button_image_url: "../images/upload_icon.gif", // Relative to the SWF file
        button_placeholder_id: "spanButtonPlaceholder",
        button_width: 118,
        button_height: 28,
        button_text: '',
        button_text_style: '',
        button_text_top_padding: 0,
        button_text_left_padding: 0,

        // Flash Settings
        flash_url: "../../Scripts/Plugin/Ablum/swfupload.swf", // Relative to this file
        // Debug Settings
        debug: false
    });
}


function file_dialog_start_handler() {
    var radAlbum = $('input[name=radAlbum]:checked').val();
    newAlbumName = $("#newAlbumName").val().replace(/\s/g, "")
    if (radAlbum == "1") {
        newAlbumName = $("#newAlbumName").val(); //.replace(/\s/g, "");
        if (newAlbumName == "") {
            alert("新建相册不能为空！");
            uploadError(swfu,'','error');
            return false;
        }
    }
    else if (radAlbum == "0") {
        fold_id = $("#albumlist").val();
        if ($("#albumlist").val() == "0") { alert("请选择相册名称"); return false; }
    }

    var param = {
        "opertype": "uploadimagefile", //业务代码
        "batchid": batchid, //批次ID
        "fold_id": fold_id,  //相册ID(上传到已存在的相册才有用)
        "activity_id": activity_id,  //活动ID（只当新建活动相册时才有用）
        "addfoldname": newAlbumName,  //相册名字
        "isaddfolder": radAlbum, //是否是新建相册 0不是新建相册， 1是新建相册
        "imagetype": "1", //相片类型：1:活动相册，2：个人相册
        "uid": wd_B.uin.uid
    };
    swfu.setPostParams(param);

}

$(function () {
    intiswfu();
    getactivityalbumbyid();
    $("#albumlist").click(function () {
        var radAlbum = $('input[name=radAlbum]:checked').val();
    });
});

//删除相片
function deleteTempPhoto(obj, id) {
    allUploadImageId = allUploadImageId.replace(id + ",", "");
    //alert(allUploadImageId);
    var pj = $(obj).parent();
    pj.remove();
}

//上传相册
function submitUploadImage() {
    if (allUploadImageId == "") {
        alert("请先上传照片，然后提交");
      // uploadError(
    }
    $.ajax({
        url: "pagination_common.axd",
        type: 'POST',
        dataType: "json",
        data: {
            opertype: "submituploadimagefile",
            imageIds: allUploadImageId,
            uid: wd_B.uin.uid
        },
        cache: false,
        timeout: 60000,
        error: function (data) {
            alert(data);
        },
        success: submitUploadImageCallBack
    });
}
//上传照片提示信息
function submitUploadImageCallBack(data) {
    alert("提交成功，共上传" + data.sucesscount + "张图片");
    allUploadImageId = "";
}

function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
    }
    return guid;
}
//绑定相册列表。
function getactivityalbumbyid() {
    strUserContent = "<option  value=\"0\">请选择</option>";
    $.ajax({
        url: "activityalbum_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivityalbumbyid',activity_id:'" + activity_id + "'}",
        error: function (data) { },
        success: function (data) {
            $.each(data.rows, function (i, msg) {
                strUserContent += "<option  value=\"" + msg.id + "\">" + msg.folder_name + "</option>";
            });
            $("#albumlist").html(strUserContent);
        }
    });
}


 