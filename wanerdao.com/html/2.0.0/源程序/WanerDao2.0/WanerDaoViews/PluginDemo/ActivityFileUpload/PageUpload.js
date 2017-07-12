

    var swfu;
    var batchid = newGuid();
    var allUploadFileId = "";
    var activity_id = "1111"; //活动id
    var fold_id = "0";//相册id
    function intiswfu() {
        var path = document.location.href;
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
            upload_complete_handler: uploadComplete,
            file_dialog_start_handler: file_dialog_start_handler, 
            // Button settings
            button_image_url: "../../images/upload_icon.gif", // Relative to the SWF file

            button_placeholder_id: "spanButtonPlaceholder",
            button_width: 118,
            button_height: 28,
            button_text: '',
            button_text_style: '',
            button_text_top_padding: 0,
            button_text_left_padding: 0,

            // Flash Settings
            flash_url: "../../Scripts/Plugin/Ablum/swfupload.swf", // Relative to this file
            custom_settings:{upload_target:"upload_target"},
            // Debug Settings
            debug: true
        });
    }

    function upload_button_event()
    {
        alert("upload_button_event");
    }
    function file_dialog_start_handler() {
        var param = {
            "opertype": "uploadtempfile", //业务代码
            "batchid": batchid, //批次ID
            "user_id": "111111" //用户ID
            //"activity_id": "1111" //活动ID
        };
        swfu.setPostParams(param);
    }

    //删除相片
    function deleteTempPhoto(obj, id) {
        allUploadFileId = allUploadFileId.replace(id + ",", "");
        //alert(allUploadImageId);
        var pj = $(obj).parent();
        pj.remove();
    }

    function submitUploadImage() {
        if (allUploadImageId == "") {
            alert("请先上传照片，然后提交");
            return false;
        }
        $.ajax({
                url: "pagination_common.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "submituploadimagefile",
                    imageIds: allUploadImageId
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
        alert("提交成功，共上传" + data.sucesscount+"张图片");
        allUploadImageId="";
    }

    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    }

    (function (window, undefined) {
        intiswfu();

    })(window)