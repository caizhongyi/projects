jQuery.fn.extend({
    videoHover: function () {
        $(this).hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        })
    }
});

var uid;
$(function () {
    uid = getQueryString('uid');
    if (!uid) uid = '';
    bindPTab(uid);
    albumPaginator(uid, '', videoAlbumBind); //Video Album Pageing

});


//Video ALbum Bind
function videoAlbumBind(data) {
    var box = $('.alb_list_sVideo').empty();
    if (data.result && data.rows.length) {
        $.each(data.rows, function (i, v) {
            var li_video = jQuery("<li></li>").appendTo(box);

            var div = jQuery('<div class="pers"></div>').appendTo(li_video);

            div.append($wd.format('<div class="pic"><a href="javascript:void(0);" onclick="window.location=\'video_album_preview.html?albumId={1}{2}\'"><img src="{0}" alt="" style="width: 205px; height: 145px;"/></a></div>', '/images/photo1.gif', v.id, (uid == '' ? '' : '&uid=' + uid))); //add Image
            div.append($wd.format('<div class="bm_info"><a href="javascript:void(0);" class="icon_edit"></a><a href="javascript:void(0);" onclick="window.location=\'video_album_preview.html?albumId={2}{3}\'">{0}</a>({1})</div>', v.folder_name, v.count, v.id, (uid == '' ? '' : '&uid=' + uid)));

            li_video.videoHover();
        });

    }
}
