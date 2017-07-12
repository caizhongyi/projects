/**
    author:xiaoxubeii
    email:xiaoxubeii@gmail.com
    remark:调用必须传入的options为{transType:"blog",transId:1,transTitle:"默认标题"}。
           transType为转发类型，共有blog、img、vedio四个值。transId为被转发的主键。transTitle为转发后的标题。
*/
(function ($) {

    $.fn.transmit = function (options) {

        var t = this;

        $(this).click(function () {

            var divId = t.attr("rel");

            if (divId) {
                var transType = { blog: "日志", img: "相册", vedio: "视频" };
                var defaults = { popWidth: 490, transType: transType, transTitle: "默认标题", transHandler: bindTransHandler(), categoryHandler: bindCategoryHandler(), currType: "blog" };
                var opts = $.extend(defaults, options);
                render(opts, divId);
                show(divId);
            }
        });


    };

    function render(options, divId) {

        var popHtml = "<div style='width: " + options.popWidth + "px;margin:0 auto;'>";
        popHtml += "<table class='pop_dialog_table' style='width: 100%; height: 100%;'><tbody>";
        popHtml += "<tr><td class='pop_topleft'></td><td class='pop_border'></td><td class='pop_topright'></td></tr>";
        popHtml += "<tr><td class='pop_border'></td>";
        popHtml += "<td class='pop_content'><div class='dialog_content transmit'><h2>转发设定 <a href='javascript:;' class='close'title='关闭'>关闭</a></h2>";
        popHtml += "<div class='dialog_body'><p class='t'><span>将" + options.transType[options.currType] + "</span><input type='text' class='input-text title' value='" + options.transTitle + "'></p>";
        popHtml += "<p class='t'><span>转发到</span><select class='t category'><option value='-1'>请选择</option></select></p>";
        popHtml += "</div><div class='dialog_buttons tc'><input type='button' class='input-submit large'><input type='button' class='input-cancel large'></div></div></td>";
        popHtml += "<td class='pop_border'></td></tr>";
        popHtml += "<tr><td class='pop_bottomleft'></td><td class='pop_border'></td><td class='pop_bottomright'></td></tr>";
        popHtml += "</tbody></table></div>";
        $popHtml = $(popHtml);

        //加载转发分类
        options.categoryHandler[options.currType]();

        $popHtml.find(".input-submit").click(function () {
            var transTitle = $("input.title").val();
            if (!transTitle) {
                alert("请填写转发标题！");
                return false;
            }
            var categoryId = $(".category").val();
            if (categoryId == -1) {
                alert("请选择转发分类！");
                return false;
            }
            var dic = { id: options.transId, categoryId: categoryId };
            //转发函数
            options.transHandler[options.currType](dic, function () { alert("关注成功"); hide(divId); }, function () { alert("关注失败"); hide(divId); });
        });
        $popHtml.find(".input-cancel").click(function () {
            $("#" + divId).hide();
        });
        $popHtml.find(".close").click(function () {
            $("#" + divId).hide();
        });

        $("#" + divId).html($popHtml);
    }

    function show(divId) {
        var top = ($(window).height() - $(divId).height()) / 2;
        var left = ($(window).width() - $(divId).width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $("#" + divId).css({ 'position': 'absolute', 'top': "25%", 'left': "25%", 'z-index': 1000 }).show();

    }
    function hide(divId) {
        $("#" + divId).hide();
    }

    //绑定处理函数
    function bindTransHandler() {

        //转发至个人日志
        function transToBlog(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblog',blogid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "'}",
                error: function () {
                    errorBack();
                },
                success: function (data) {
                    if (data.result) {
                        successBack();
                    } else {
                        errorBack();
                    }
                }
            });
        }
        //转发至相册
        function transToImg(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblog',imageid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "'}",
                error: function () {
                    errorBack();
                },
                success: function (data) {
                    if (data.result) {
                        successBack();
                    } else {
                        errorBack();
                    }
                }
            });
        }
        //转发至视频
        function transToVideo(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblog',videoid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "'}",
                error: function () {
                    errorBack();
                },
                success: function (data) {
                    if (data.result) {
                        successBack();
                    } else {
                        errorBack();
                    }
                }
            });
        }

        return { blog: transToBlog, img: transToImg, vedio: transToVideo };
    }

    function bindCategoryHandler() {
        //获取日志分类
        function getBlogCate() {
            $.ajax({
                url: "/getblogcategorybycurruser_blog.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getblogcategorybycurruser'}",
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        $.each(data.rows, function (i, item) {
                            $(".category").append("<option value='" + item.category_id + "'>" + item.category_name + "</option>");
                        });
                    }
                }
            });
        }
        //获取相册分类
        function getImgCate() {
            $.ajax({
                url: "/getphotoalbumlist_photoalbum.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getphotoalbumlist',pagecurrent:1,pageSize:10}", //考虑到是下拉框，先传入10个
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        $.each(data.rows, function (i, item) {
                            $(".category").append("<option value='" + item.id + "'>" + item.folder_name + "</option>");
                        });
                    }
                }
            });
        }
        //获取视频分类
        function getVedioCate() {
            $.ajax({
                url: "/getpersonalvediofolder_video.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getpersonalvideofolder',pagecurrent:1,pagesize:10}", //考虑到是下拉框，先传入10个
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        $.each(data.rows, function (i, item) {
                            $(".category").append("<option value='" + item.id + "'>" + item.folder_name + "</option>");
                        });
                    }
                }
            });
        }
        return { blog: getBlogCate, img: getImgCate, vedio: getVedioCate };
    }


})(jQuery);  
