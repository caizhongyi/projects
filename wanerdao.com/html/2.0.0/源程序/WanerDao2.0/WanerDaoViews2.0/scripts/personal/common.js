$(function () {
    $('.chkAll').live('click', function () {
        if ($(this).attr('checked')) {
            $('.chkId').attr('checked', true);
            $('.chkAll').attr('checked', true);
        } else {
            $('.chkId').attr('checked', false);
            $('.chkAll').attr('checked', false);
        }
    });
});

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
function getCurUserJoinActivity(callback, pageSize) {
    var pSize = 10000;
    if (pageSize) {
        pSize = pageSize;
    }
    $.ajax({
        url: "../activity_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'currentuserjoinactivitypage', pagecurrent: 1, pageSize: " + pSize + "}",
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

    if (arguments[0] && !is_self) {
        var tab_home = jQuery('<a href="javascript:;" id="tab_home">' + wanerdaoLangTip('personal_00086') + '</a>');
        $('#tab_zl').before(tab_home);
        tab_home.click(function () {
            window.location = '/personal/index.html' + p;
            return false;
        });
    }

    $('#tab_zl').click(function () {
        window.location = '/personal/personal_info.html' + p;
        return false;
    });
    $('#tab_rz').click(function () {
        window.location = '/personal/blog.html' + p;
        return false;
    });
    $('#tab_xc').click(function () {
        window.location = '/personal/photo_album.html' + p;
        return false;
    });
    $('#tab_sp').click(function () {
        window.location = '/personal/video_album.html' + p;
        return false;
    });
}

/*
    1.配置打印模板：demo路径：WanerDaoWorkDir\printConfig\demo.xml
    打印模板统一放在printConfig文件夹下，打印模板中每个节点名（比如demo.xml中的test1\test2）对应传入参数名（后面有介绍），动态字段数据用$WDXXX$WD代替，$WD为标示符号。XXX为SQL查询出的字段名，用于数据替换匹配
    2.调用方法：Common/print.aspx?jsonparam={opertype:'print',printfile:'demo', printdatafile: 'GroupSQL', 
    printdata_test1: 'Select_GroupNormalManage', printdata_test2: 'Select_GroupKickDuration', group_id: 123456, role_name: 'user',
    language_id:'xxx' }
    opertype统一设置'print';printfile为打印模板名称；printdatafile: 打印数据来源，SQL配置文件名；printdata_test1，
    printdata_test2: 打印SQL，prrintdata固定参数，test1\test2于打印模板节点名配置，该参数对于SQL查出的数据对应绑定到该打印模板节点
    后面的就全是SQL查询的参数，
    var str = "{opertype:'print',printfile:'groupfinance', printdatafile: 'GroupSQL', printdata_body2: 'groupmoneyflow', group_id: '" + groupid + "', sre_name: 'fuzque" + v_sre_name + "fuzque',sre_id:'fuzque" + v_sre_id + "fuzque',start_time:'" + starttime + "',end_time:'" + endtime + "' }";
*/
function goPrint(data) {
    window.open("../Common/print.aspx?jsonparam=" + data);
}