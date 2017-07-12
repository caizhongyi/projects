var vcategory_name = "活动";
$(function () {
    $("#pageid").myPagination({
        currPage: 1,
        callback: getActivityCategoryItem,
        cssStyle: 'noll',
        sidebarpage: true,
        ajax: {
            url: 'pop_common.axd',
            param: {
                pageSize: 15,
                opertype: 'activitycategorypage',
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
    function getActivityCategoryItem(data) {
        var strContent = "";
        var rootImagepath = data.rootimgpath;
        $.each(data.rows, function (i, msg) {
            var v_Src = "";
             if (msg.name == "时令活动") v_Src = "activity_season_main.html?categoryid="+msg.id;
             else if (msg.name == "自定义活动") v_Src = "activity_define_main.html?categoryid=" + msg.id;
             else v_Src = "activity_item_main.html?categoryid="+msg.id;

            strContent += ("<li>");
            strContent += ("<a href=\"" + v_Src + "\" target=\"_blank\"><img  src=\"" + rootImagepath + msg.logo_path + "\" class=\"aPic\" width=\"185\" height=\"160\" /></a>");
            strContent += ("<i class=\"iTit\">");
            strContent += ("<i class=\"left yh\"><a href=\""+v_Src+"\" target=\"_blank\">" + msg.name + "</a></i>");
            strContent += ("<i class=\"rHeart emptyH\"></i>");
            strContent += ("</i>");
            strContent += ("<i class=\"mask\"></i>");
            var childData = $.parseJSON(msg.rowsChild);
            if (childData.rows != null && childData.rows != "") {
                strContent += ("<dl>");
                strContent += ("<dt>最新活动：</dt>");
                $.each(childData.rows, function (t, msgChild) {
                    strContent += ("<dd>");
                    strContent += ("<i class=\"siTit\"><span class=\"sDate\">" + msgChild.max_nbr + " " + getMonthAndDate(msgChild.begin_datetime) + "</span>·<a href=\"activity_index.html?id=" + msgChild.id + "\" title=\"" + msgChild.activity_name + "\" target=\"_blank\">" + subPoints(msgChild.activity_name, 10) + "</a></i>");
                    strContent += ("<p title=\"" + msgChild.description + "\">" + subPoints(msgChild.description, 20) + "</p>");
                    strContent += ("</dd>");
                });
                strContent += ("</dl>");
            }
           //else {
           //    strContent += ("<dd>");
           //    strContent += ("<i class=\"siTit\"><span class=\"sDate\">&nbsp;</span><a href=\"#\" target=\"_blank\">&nbsp;</a></i>");
           //    strContent += ("<p>暂无活动</p>");
           //     strContent += ("</dd>");
           // }
        
            strContent += ("<i class=\"infoMask pos\"></i>");
            strContent += ("<i class=\"pos info\">");
            strContent += ("<span><em class=\"icon_1\"></em>4521</span>");
            strContent += ("<span><em class=\"icon_2\"></em>56</span>");
            strContent += ("<span><em class=\"icon_3\"></em>23</span>");
            strContent += ("</i>");
            strContent += ("</li>");
        });
        $("#actList").html(strContent);
    }

    $(".actList li").live("mouseover", function () {
        $(this).addClass("mHover");
    });
    $(".actList li").live("mouseout", function () {
        $(this).removeClass("mHover");
    });


    $(".subChaTab> a").click(function () {
        var currentIndex = $(this).index();
        if (currentIndex == "0") { $("#main_2").attr("style", "display:none"); $("#main_1").attr("style", "display:block") }
        else if (currentIndex == "1") { $("#main_2").attr("style", "display:block"); $("#main_1").attr("style", "display:none") }
    });
});
	  