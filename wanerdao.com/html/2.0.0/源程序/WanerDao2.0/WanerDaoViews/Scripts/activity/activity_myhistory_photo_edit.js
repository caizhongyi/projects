var activity_id = "0";
if (getQueryString("activity_id") != null && getQueryString("activity_id") != "undefined") {
    activity_id = getQueryString("activity_id");}
$(function () {
    $("#pageid").myPagination({
        currPage: 1,
        callback: albumlist,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            param: {
                pageSize: 25,
                opertype: 'getactivityimagefolder',
                searchType: "25",
                userIds: wd_B.uin.uid,
                activityIds: activity_id,
                isSearchBlock: "",
                orderByFileds: "",
                sort: "",
                pagecurrent: "1"

            }
        },
        info: {
            first: '首页',
            last: '尾页',
            next: '下一页',
            prev: '上一页',
            first_on: true,
            last_on: true,
            next_on: true,
            prev_on: true,
            showpageno: false,
            tipmsg: '第{tip}页',
            msg_on: false,
            link: '#',
            msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
            text: {
                width: '22px'
            }
        }
    });
    function albumlist(data) {
        var strContent = "";
        var total = "0";
        if (data != null && data != "") {
            total = data.total;
            $.each(data.rows, function (i, msg) {
                var imagepath = "../images/photo1.gif"; //默认图片
                if (msg.image_small_path != "") imagepath = msg.image_small_path;
                strContent += ("<li class=\"acti_lbBg\">");
                strContent += ("<div class=\"pers\">");
                strContent += ("<div class=\"pic\"><a href=\"###\" onclick=\"getPhotoByAlbumId('" + msg.id + "')\"><img src=\"" + imagepath + "\" width=202 height=144 alt=\"\" /></a></div>");
                strContent += ("<div class=\"bm_info\">");
                strContent += ("<a href=\"###\"><img src=\"../images/icon_tool.png\" /></a>");
                strContent += ("<label>" + msg.folder_name + "</label><i>(" + msg.image_count + ")</i>");
                strContent += ("</div>");
                strContent += ("</div>");
                strContent += ("</li>");
                if (i == 0) { getPhotoByAlbumId(msg.id); }
            });

        }
        $('#albList').html(strContent);
    }

});
function getPhotoByAlbumId(fid) {
    var strContent = "";
    $.ajax({
        url: "photo_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivityimagebyfoldid', fold_id:'" + fid + "'}",
        error: function (data) { },
        success: function (data) {
            $.each(data.rows, function (i, msg) {
                strContent += ("<li>");
                strContent += ("<div class=\"ckBox\"><input type=\"checkbox\" /></div>");
                strContent += ("<div class=\"pic\"><img src=\"" + msg.image_small_path + "\" width=130 height=106 alt=\"\" /></div>");
                strContent += ("<div class=\"form_data\">");
                strContent += ("<form action=\"\">");
                strContent += ("<div class=\"txt_w\">");
                var vBlur = "onChange=\"updatePhoto('" + msg.sequence + "','" + msg.image_name + "','" + msg.description + "','" + msg.id + "','" + fid + "')\"";
                strContent += ("<div class=\"ser_num\"><span  class=\"tit\">序号：</span><input type=\"text\" id=\"sequence_" + msg.id + "\" value=\"" + msg.sequence + "\" " + vBlur + "  class=\"txt_c3\" /></div>");
                strContent += ("<div class=\"name\"><span class=\"tit\"><span class=\"tit\">名称：</span></span><input type=\"text\" id=\"img_" + msg.id + "\" value=\"" + msg.image_name + "\"  " + vBlur + " class=\"txt_c3\" /></div>");
                var dtDate = msg.upload_date.split(" ");
                var dtArr = dtDate[0].split("-");
                var date = (dtArr[0] + "/" + dtArr[1] + "/" + dtArr[2]);
                strContent += ("<div class=\"date\">上传时间：" + date + "</div>");
                strContent += ("</div>");
                strContent += ("<div class=\"txa_w\"><span class=\"tit\">描述：</span><textarea value=\"" + msg.description + "\" id=\"des_" + msg.id + "\" " + vBlur + " cols=\"30\" rows=\"10\" class=\"txa_c3\">" + msg.description + "</textarea></div>");
                strContent += ("</form>");
                strContent += ("</div>");
                strContent += ("<div class=\"hover_box\"><a href=\"#\" class=\"stop\"></a><a href=\"#\" class=\"upload\"></a><a href=\"#\" class=\"download\"></a></div>");
                strContent += ("</li>");
            });
            $("#photoList").html(strContent);
        }
    });
}

function updatePhoto(oldsequence, oldImageName, olderDes, id, fid) {
    var newSequence = $("#sequence_" + id).val();
    var newImageName = $("#img_" + id).val();
    var newDes = $("#des_" + id).val();
    if ((newSequence != oldsequence) || (newImageName != oldImageName) || (newDes != olderDes)) {
        var pars = "{opertype:'updatephoto',image_name:'" + newImageName + "',sequence:'" + newSequence + "',description:'" + newDes + "',id:'" + id + "'}";
        $.ajax({
            url: "activitysetting_activity.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: pars,
            error: function (data) { },
            success: function (data) {
                alert(wanerdaoLangTip('activity_001'));
                getPhotoByAlbumId(fid);
            }
        })
    }
}