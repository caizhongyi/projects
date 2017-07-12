/**
author:xiaoxubeii
email:xiaoxubeii@gmail.com
remark:调用必须传入的options为{transType:"blog",transId:1,transTitle:"默认标题"}。
transType为转发类型，共有blog、img、video、imgFolder、videoFolder五个值。transId为被转发的主键。transTitle为转发后的标题。
*/
(function ($) {

    $.fn.transmit = function (options) {

        var t = this;
        var $dialog;
        $(this).click(function () {

            var divId = t.attr("rel");

            if (divId) {
                var transType = { blog: wanerdaoLangTip("trans_00005"), img: wanerdaoLangTip("trans_00006"), video: wanerdaoLangTip("trans_00007"), videoFolder: wanerdaoLangTip("trans_00015"), imgFolder: wanerdaoLangTip("trans_00014") };
                var defaults = { popWidth: 490, transType: transType, transTitle: wanerdaoLangTip("trans_00008"), transHandler: bindTransHandler(), categoryHandler: bindCategoryHandler(), currType: "blog" };
                var opts = $.extend(defaults, options);
                render(opts, divId);
                show(divId);
            }
        });
    };

    function render(options, divId) {
        var popHtml = "<div class='pop' style='width: " + options.popWidth + "px; margin: 10px auto;'><div class='pop-bg'></div>";
        popHtml += '<div class="pop-container"><div class="pop-hd clearfix"><h3>' + wanerdaoLangTip("trans_00009") + '</h3><a href="javascript:;" class="close-3" title="关闭" id="close"></a></div>'
        popHtml += '<div class="pop-bd "><div class="form"><ul>';
        popHtml += '<li><label class="wraplabel">' + wanerdaoLangTip("trans_00010") + options.transType[options.currType] + ':<input readonly="readonly" style="width: 80%" class="text" type="text" value="' + options.transTitle + '" id="title"/></label></li><li><label class="wraplabel">' + wanerdaoLangTip("trans_00011") + ':<select id="category" style="width:100px"></select></label></li>';
        popHtml += '<li><span id="tranHint"></span></li></ul><div class="pop-ft"><a href="javascript:;" class="button button1" id="confirm">' + wanerdaoLangTip("common_00034") + '</a> <a href="javascript:;" class="button button1-disable" id="cancel">' + wanerdaoLangTip("common_00016") + '</a></div></div></div></div></div>';

        $main = $("#" + divId);
        $main.html(popHtml);
        //$main.find("#category").append("<option value='-1'>请选择</option>").chosen();
        bindDropDownListbyobject($main.find("#category"), [], false); //填充select默认值
        //加载转发分类
        options.categoryHandler[options.currType]($main.find("#category"));

        //转发
        $main.find("#confirm").click(function () {
            var transTitle = $main.find("#title").val();
            if (!transTitle) {
                hint(wanerdaoLangTip("trans_00001"), $main.find("#tranHint"));
                return false;
            }
            var categoryId = $("#category").val();
            if (!categoryId || categoryId.toString() == "-1" || categoryId.toString() == "-2") {
                hint(wanerdaoLangTip("trans_00002"), $main.find("#tranHint"));
                return false;
            }
            var dic = { id: options.transId, categoryId: categoryId, newName: transTitle };
            //转发函数
            options.transHandler[options.currType](dic, function () { hint(wanerdaoLangTip("trans_00003"), $main.find("#tranHint")); hide(divId); }, function () { hint(wanerdaoLangTip("trans_00004"), $main.find("#tranHint")); hide(divId); });
        });
        //        $popHtml.find("#cancel").click(function () {
        //            $("#" + divId).hide();
        //        });
        //        $popHtml.find("#close").click(function () {
        //            $("#" + divId).hide();
        //        });

    }

    function show(divId) {

        $dialog = new $.ui.dialog($("#" + divId), {
            callback: { hide: function () { destroy(divId); } },
            widget: {
                hide: '#cancel,#close'
            }
        }).show();
        //        var top = ($(window).height() - $(divId).height()) / 2;
        //        var left = ($(window).width() - $(divId).width()) / 2;
        //        var scrollTop = $(document).scrollTop();
        //        var scrollLeft = $(document).scrollLeft();
        //        $("#" + divId).css({ 'position': 'absolute', 'top': "25%", 'left': "25%", 'z-index': 1000 }).show();

    }
    function hide(divId) {
        $dialog.hide();
        destroy(divId)
    }
    function destroy(divId) {
        $("#" + divId).html("");
    }

    //绑定处理函数
    function bindTransHandler() {

        //转发日志至个人日志
        function transToBlog(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblogx',blogid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "',newName:'" + param["newName"] + "'}",
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
        //转发图片至相册
        function transToImg(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblogx',imageid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "',newName:'" + param["newName"] + "'}",
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

        //转发相册
        function transToImgFolder(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgfoldervdofolder_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgfoldervdofolder',imgfolderid:'" + param["id"] + "',isCreateFolder:0,folderIdOrName:'" + param["categoryId"] + "'}",
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

        //转发视频
        function transToVideoFolder(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgfoldervdofolder_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgfoldervdofolder',vdofolderid:'" + param["id"] + "',isCreateFolder:0,folderIdOrName:'" + param["categoryId"] + "'}",
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
        //转发视频至视频册
        function transToVideo(param, successBack, errorBack) {
            $.ajax({
                url: "/forwardimgvdoblog_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'forwardimgvdoblogx',videoid:'" + param["id"] + "',targetid:'" + param["categoryId"] + "',newName:'" + param["newName"] + "'}",
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

        return { blog: transToBlog, img: transToImg, video: transToVideo, imgFolder: transToImgFolder, videoFolder: transToVideoFolder };
    }

    function bindCategoryHandler() {
        //获取日志分类
        function getBlogCate($select) {
            $.ajax({
                url: "/getblogcategorybycurruser_blog.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getblogcategorybycurruserwithformat'}",
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        //                        $.each(data.rows, function (i, item) {
                        //                            $select.append("<option value='" + item.category_id + "'>" + item.category_name + "</option>");
                        //                        });
                        bindDropDownListbyobject($select, data.rows, true);
                    }
                    //$select.chosen();
                }
            });
        }
        //获取相册分类
        function getImgCate($select) {
            $.ajax({
                url: "/getphotoalbumlist_photoalbum.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getphotoalbumlistbycurruser',pagecurrent:1,pagesize:10}", //考虑到是下拉框，先传入10个
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        //                        $.each(data.rows, function (i, item) {
                        //                            $select.append("<option value='" + item.id + "'>" + item.folder_name + "</option>");
                        //                        });
                        bindDropDownListbyobject($select, data.rows, true);
                    }
                    //                    $select.chosen();
                }
            });
        }
        //获取视频分类
        function getVideoCate($select) {
            $.ajax({
                url: "/getpersonalvideofolder_video.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getpersonalvideofolder',pagecurrent:1,pagesize:10}", //考虑到是下拉框，先传入10个
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        //$(".category").html("");
                        //                        $.each(data.rows, function (i, item) {
                        //                            $select.append("<option value='" + item.id + "'>" + item.folder_name + "</option>");
                        //                        });
                        bindDropDownListbyobject($select, data.rows, true);
                    }
                    //                    $select.chosen();
                }
            });
        }
        return { blog: getBlogCate, img: getImgCate, video: getVideoCate, imgFolder: getImgCate, videoFolder: getVideoCate };
    }


})(jQuery);  
