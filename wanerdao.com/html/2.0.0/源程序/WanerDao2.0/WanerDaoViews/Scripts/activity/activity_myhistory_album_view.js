var activity_id = "1111";
if (getQueryString("activity_id") != null && getQueryString("activity_id") != "undefined") {
    activity_id = getQueryString("activity_id");
}
$(function () {
    $("#pageid").myPagination({
        currPage: 1,
        callback: albumlist,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            param: {
                pageSize: 16,
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
                strContent += ("<li class=\"create\" c=\"create\">");
                strContent += ("<a href=\"Activity_myhistory_photo_view.aspx?fid="+msg.id+"\" class=\"img\"><img width='205' height='144' src='" + imagepath + "' /></a>");
                strContent += ("<div class=\"chose\"><input type=\"checkbox\" id=\""+msg.id+"\" /><a href=\"\">" + msg.folder_name + "<span>(" + msg.image_count + ")</span></a></div>");
                strContent += ("<div class=\"doit\">");
                strContent += ("<a href=\"\" class=\"edit\"></a>");
                strContent += ("<a href=\"\" class=\"move\"></a>");
                strContent += ("<a href=\"\" class=\"add\"></a>");
                strContent += ("<a href=\"\" class=\"stop\"></a>");
                strContent += ("<a href=\"\" class=\"drop\"></a>");
                strContent += ("</div>");
                strContent += ("<div class=\"you\"></div>");
                strContent += ("</li>");
            });
        }
        $("#albumTotal").html("(" + total + ")");
        $('#AlbumUl').html(strContent + " <div class=\"clear\"></div>");
    };
    $("#list li").live("mouseover", function () {
        var a = $(this).attr("c");
        $(this).removeClass(a).addClass(a + '_all').find(".doit").show();
    }).live("mouseout", function () {
        var a = $(this).attr("c");
        $(this).removeClass(a + '_all').addClass(a).find(".doit").hide();
    });
    $("#chose_all").click(function () {
        $("#list input").attr({ 'checked': true });
    })
    $("#chose_other").click(function () {
        $("#list input").each(function () {
            if ($(this).attr('checked')) {
                $(this).attr({ 'checked': false });
            } else {
                $(this).attr({ 'checked': true });
            }
        })
    });
})
  