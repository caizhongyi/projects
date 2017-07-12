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
    var box = $('.videos').empty();
    if (data.result && data.rows.length) {
        $('.alb_count').html(data.rows.length);
        $.each(data.rows, function (i, v) {
            var li_video = jQuery("<li></li>").appendTo(box);
            li_video.append('<img src="../images/photos/photo1.gif" alt="">');
            li_video.append($wd.format('<div class="videos-name"><label for="cb1" onclick="window.location=\'video_album_preview.html?albumId={2}{3}\'">{0}&nbsp;({1})</label></div>', v.folder_name, v.count, v.id, (uid == '' ? '' : '&uid=' + uid)));
            if (!is_self) {
                li_video.append('<div class="videos-options clearfix"><a class="icon icon-file" rel="transmit" href="javascript:;"></a></div>');
                li_video.find('.icon-file').transmit({ currType: "videoFolder", transId: v.id, transTitle: v.folder_name });
            }

            li_video.find('img,.videos-name').click(function () {
                window.location = 'video_album_preview.html?albumId=' + v.id + (uid == '' ? '' : '&uid=' + uid);
            });
        });
    } else {
        $('.alb_count').html(0);
    }
}
