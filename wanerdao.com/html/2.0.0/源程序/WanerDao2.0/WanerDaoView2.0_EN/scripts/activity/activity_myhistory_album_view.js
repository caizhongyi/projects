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
$(function () {
    $("#albumTotal").html("loading");
    $("#AlbumUl").html("loading");
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
                            break;
                        case "2":
                            content = $("<div class=\"album-box album-sys\"></div>").appendTo(li);
                            break;
                        case "3":
                            content = $("<div class=\"album-box album-share\"></div>").appendTo(li);
                            break;
                    }
                    content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                    content.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>({1})</div>', msg.folder_name, msg.image_count));
                    li.find('.album-label,.album-name').click(function () {
                        location.href = 'activity_photo_view.html?id=' + msg.id + '&aid=' + activity_id;
                    });
                });
                $('<div class=\"clear\"></div>').appendTo(box);
            }
        }
        $("#albumTotal").html(total);
    };
})
  