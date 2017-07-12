$(function () {
});



function chkIdClick() {
    $('.chkAll').click(function () {
        $('.chkId').attr('checked', $(this).attr('checked'));
        $('.chAll').attr('checked', $(this).attr('checked'));
    });

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

/*
 set blog default cat 
*/
function setBlogDefaultCat(id, callback) {
    $.ajax({
        url: "../set_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setblogdefaultcat',default_category_id:'" + id + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*
  set blog default permission
*/
function setBlogDefaultPermssion(id, callback) {
    $.ajax({
        url: "../set_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setblogdefaultpermission',default_permission:'" + id + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*添加关注*/
function focusBlog(blogId, link) {
    $(link).unbind('click', focusBlog);
    $(link).html('已关注');
}
