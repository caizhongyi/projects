var activity_id = "";
//var userIds = "28dfaf0b31824f6598bf06f2986a3ecc";
if (getQueryString("id") != null && getQueryString("id") != "undefined") {
    activity_id = getQueryString("id");
    $("#uploadalbum").attr("href", $("#uploadalbum").attr("href").replace("{0}", activity_id));
    $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", activity_id));
    $("#editphoto").attr("href", $("#editphoto").attr("href").replace("{0}", activity_id));
    $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", activity_id));
}
else {
    $("#uploadalbum").attr("href", $("#uploadalbum").attr("href").replace("{0}", 0));
    $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", 0));
    $("#editphoto").attr("href", $("#editphoto").attr("href").replace("{0}", 0));
    $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", 0));
}
function _isevaluateactivity() {
    ajaxfunc('albumbrowse_activity.axd', "{opertype:'isevaluateactivity',activityid:'" + activity_id + "'}", function (data) {
    }, function (data) {
        if (data.data) {
            $(":radio").attr("disabled", true);
        }
        else {
            $(":radio").attr("disabled", false);
        }
    });
}
$(function () {
    $("#albumTotal").html("loading");
    $("#AlbumUl").html("loading");
    _isevaluateactivity();
    $("#viewresult").click(function () {
        ajaxfunc('albumbrowse_activity.axd', "{opertype:'getactivityevaluatetotal',activityid:'" + activity_id + "'}", function (data) {
        }, function (data) {
            if (data.result === "True") {
                var chartdata = [];
                chartdata.push({
                    "label": data.aname,
                    "data": [[1, data.likeit], [2, data.sosoit], [3, data.dislikeit]]
                });
                var options = {
                    lines: { show: true },
                    points: { show: true },
                    grid: { hoverable: true, clickable: true },
                    xaxis: { ticks: [[1, wanerdaoLangTip('active_00018')], [2, wanerdaoLangTip('active_00019')], [3, wanerdaoLangTip('active_00020')]], min: 1, max: 3 },
                    yaxis: { ticks: 1, min: 0 }
                };

                new wanerdaochart({
                    titleid: 'active_00008',
                    tooltip: true,
                    local: {
                        data: chartdata
                    },
                    chart: options
                });
            }
        });
    })
    $(":radio").click(function () {
        var x = 0;
        if ($(this).attr("id") === "like") {
            x = 1;
        }
        else if ($(this).attr("id") === "dontlike") {
            x = 3;
        }
        else {
            x = 2;
        }
        ajaxfunc('albumbrowse_activity.axd', "{opertype:'evaluateactivity',activityid:'" + activity_id + "',evaluateflag:"+x+"}", function (data) {
        }, function (data) {
            if (data.data) {
                $(":radio").attr("disabled", true);
                new pop({ titleid: 'common_00025', typename: 'success', msginfo: wanerdaoLangTip('active_00016') });
            }
            else {
                $(":radio").attr("disabled", false);
                new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip('active_00017') });
            }
        });
    });
    $(".pageid").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        pagermore: true,
        //contentid: '#AlbumUl', //此处ID可以用来显示“加载更多”这个功能
        callback: bindData,
        ajax: {
            url: 'albumbrowse_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 12,
                opertype: 'getactivityimagefolder',
                searchType: "25",
                activityIds: activity_id,
                isSearchBlock: "0",
                orderByFileds: "",
                sort: ""
            }
        }
    });
    function bindData(data) {
        var total = "0";
        if (data != null && data != "") {
            total = data.total;
            if (total === "0") {
                $('#AlbumUl').html(wanerdaoLangTip('common_00005') + " <div class=\"clear\"></div>");
            }
            else {
                var box = $('#AlbumUl').empty();
                $.each(data.rows, function (i, msg) {
                    var imagepath = "../images/default/album.png"; //默认图片
                    if (msg.image_small_path != "") {
                        imagepath = msg.image_small_path;
                    }
                    var li = $('<li></li>').appendTo(box);
                    var content = null;
                    switch (msg.folderType) {
                        case "1":
                            content = $("<div class=\"album-box\"></div>").appendTo(li);
                            content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                            if (msg.is_block === "True") {
                                content.append($wd.format('<label class="album-name"><a href="' + 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id + '" target ="_blank">{0}</a>({1})</label>', msg.folder_name, msg.image_count));

                            }
                            else {
                                content.append($wd.format('<label class="album-name"><a href="' + 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id + '" target ="_blank">{0}</a>({1})</label>', '(' + wanerdaoLangTip('common_00080') + ')' + msg.folder_name, msg.image_count));
                            }
                            if (msg.roletype === "1") {
                                if (msg.is_block === "True") {
                                    content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-file"></a><a id="' + msg.id + '" href="javascript:;"  type="t" class="icon icon-disallow"></a></div>');
                                }
                                else {
                                    content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-file"></a><a id="' + msg.id + '" href="javascript:;"  type="t" class="icon icon-success"></a></div>');
                                }
                            }
                            else {
                                content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-edit"></div>');
                            }
                            break;
                        case "2":
                            content = $("<div class=\"album-box album-sys\"></div>").appendTo(li);
                            content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                            content.append($wd.format('<label class="album-name"><a href="' + 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id + '" target ="_blank">{0}</a>({1})</label>', msg.folder_name, msg.image_count));
                            if (msg.roletype === "1") {
                                content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-edit"><a href="javascript:;" class="icon icon-file"></a></div>');
                            }
                            break;
                        case "3":
                            if (msg.is_block === "True") {
                                content = $("<div class=\"album-box album-share\"></div>").appendTo(li);
                                content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                                content.append($wd.format('<label class="album-name"><a href="' + 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id + '" target ="_blank">{0}</a>({1})</label>', msg.folder_name, msg.image_count));
                                if (msg.roletype === "1") {
                                    content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-file"></a><a id="' + msg.id + '" href="javascript:;" type="t" class="icon icon-disallow"></a></div>');
                                }
                                else {
                                    content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-file"></a></div>');
                                }
                            }
                            if (msg.is_block !== "True" && msg.roletype === "1") {
                                content = $("<div class=\"album-box album-share\"></div>").appendTo(li);
                                content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                                content.append($wd.format('<label class="album-name"><a href="' + 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id + '" target ="_blank">{0}</a>({1})</label>', msg.folder_name, msg.image_count));
                                content.append('<div class="album-opt"><a href="javascript:;" class="icon icon-file"></a><a id="' + msg.id + '" href="javascript:;" type="t" class="icon icon-success"></a></div>');
                            }
                            break;
                    }
                });
                $('<div class=\"clear\"></div>').appendTo(box);
                $("a[type='t']").click(function () {
                    var xxx = $(this).attr("id");
                    var ts = $(this);
                    if (ts.hasClass("icon-disallow")) {
                        new pop({ titleid: 'common_00023', typename: 'confirm',
                            msginfo: wanerdaoLangTip('common_00081'),
                            callback: function () {
                                ajaxfunc('albumbrowse_common.axd', "{opertype:'blockactivityimagefolder',fid:'" + xxx + "'}", function (data) {
                                }, function (data) {
                                    if (data.result) {
                                        new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg });
                                        ts.removeClass('icon icon-disallow').addClass("icon icon-success");
                                    }
                                    else {
                                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        ajaxfunc('albumbrowse_common.axd', "{opertype:'restoreblockactivityimagefolder',fid:'" + xxx + "'}", function (data) {
                        }, function (data) {
                            if (data.result) {
                                new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg });
                                ts.removeClass('icon icon-success').addClass("icon icon-disallow");
                            }
                            else {
                                new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                            }
                        });
                    }
                });
            }
        }
        $("#albumTotal").html(total);
    };
})
  