$(function () {
    $("#pageid").myPagination({
        currPage: 1,
        callback: test1,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            param: {
                pageSize: 16,
                opertype: 'getactivityimagefolder',
                searchType: "11",
                userIds: "111111",
                activityIds: "111111",
                isSearchBlock: "",
                orderByFileds: "",
                sort: "",
                pagecurrent: "1",
                pageSize: "10"
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
    function test1(data) {
        albumDate = data;
        var strContent = "";

        $.each(data.rows, function (i, msg) {
            strContent += "<li>";
            strContent += "<div class=\"photo_album\">";
            var path = msg.image_small_path;
            //if (path == "") path = "Upload/Photo.jpg";
            strContent += "<a href=\"ActivityPhotoPreview.aspx?fid=" + msg.id + "\"  ><img src=" + path + "/></a>";
            strContent += "<div class=\"columnNews\">";
            strContent += "<span class=\"floatLeft blog_diaryName\"><a href=\"###\">" + msg.folder_name + "</a>";
            strContent += "<span class=\"gray9\">(" + msg.image_count + ")</span></span>";
            strContent += "</div>";
            strContent += "</div>";
            strContent += "</li>";
        });
        $('#photo_albumUl').html(strContent);
    }
})