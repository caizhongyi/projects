/****** 全选 取消*******/
function chkAllClick() {
    $('.chkAll').click(function () {
        $('.chkId').attr('checked', $(this).attr('checked'));
        $('.chAll').attr('checked', $(this).attr('checked'));
    });
}

/******** 项 checkbox 点击事件绑定 *********/
function chkIdClick() {

    $('.chkId').click(function () {
        if ($(this).attr('checked')) {
            var chk = true;
            $('.chkId').each(function () {
                if (!$(this).attr('checked')) {
                    chk = false;
                }
            });
            $('.chkAll').attr('checked', chk);
        }
        else {
            $('.chkAll').attr('checked', false);
        }
    });
}

/******** 获取选中的id集合 *********/
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




/// 转发日志或者照片或者视频或者杂烩
/// </summary>
/// <param name="dic">string 类型( Blog(日志id),ImageFolder(相册id),Image(照片id),VideoFolder(视频册id),Video(视频id),Information(杂烩id)),string Categoryid,string isCreateNewFolder(0或者1)
/// string imageFolderNameOrID</param>
/// 字典的key值为类型,对应的value值为id 
/// isCreateNewFolder 相册转发-是否创建新相册 为0或者1  0为不创建 1为创建
/// imageFolderNameOrID 当转发到某个已经存在的相册是,此为相册id,当新建相册时,为新建相册的名字
/// 视频转发:当转发的为视频时候imageFolderNameOrID代表:当转发到某个已经存在的视频册时,此为视频册id,当新建视频册时,为新建视频册的名字
function forwardbpvi(blogId) {
    //forwardofbpvi
    $.ajax({
        url: "foward_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'forwardofbpvi',Blog:'" + blogId + "',ImageFolder:'',Image:'',Video:'',Information:'',Categoryid:''"
        + ",isCreateNewFolder:'',imageFolderNameOrID:''}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {

            }
        }
    });
}


/* forward photo album */
function forwardPhotoAlbum(fold_Id, is_create_new, new_NameOrId,callback) {
    //forwardofbpvi
    $.ajax({
        url: "../foward_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'forwardofbpvi',ImageFolder:'" + fold_Id + "',isCreateNewFolder:'" + is_create_new + "',imageFolderNameOrID:'" + new_NameOrId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*、/currentuserjoinactivitypage*/
function getCurUserJoinActivity(callback) {
    $.ajax({
        url: "../activity_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'currentuserjoinactivitypage', pagecurrent: 1, pageSize: 10000}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*bind tab */
function bindPTab() {
    var p = '';
    if (arguments[0]) {
        p = '?uid=' + arguments[0];
    }

    $('#tab_zl').click(function () {
        window.location = 'personal_info.html' + p;
        return false;
    });
    $('#tab_rz').click(function () {
        window.location = 'blog.html' + p;
        return false;
    });
    $('#tab_xc').click(function () {
        window.location = 'photo_album.html' + p;
        return false;
    });
    $('#tab_sp').click(function () {
        window.location = 'video_album.html' + p;
        return false;
    });
}