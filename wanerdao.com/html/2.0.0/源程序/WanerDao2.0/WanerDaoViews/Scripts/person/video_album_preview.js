jQuery.fn.extend({
    /*album hover*/
    linkHover: function () {
        $(this).hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        });
    }
});

var uid;
var albumId;
$(function () {
    uid = getQueryString('uid');
    albumId = getQueryString('albumId');
    if (!uid) uid = '';

    bindPTab(uid);

    if (albumId) {
        getAllVideoFolder(uid, null, function (data) {
            if (data.result) {
                var box = $('ul.alb_list_sVideo');
                $('.album_count').html(data.rows.length); /* set albums*/

                $.each(data.rows, function (i, v) {
                    /*set current video folder name */
                    if (v.id.toLowerCase() == albumId) {
                        showAlbumVideo(v.id, v.folder_name);
                    }

                    var li_album = jQuery('<li></li>').appendTo(box);

                    var alb_info = jQuery('<div class="pers"></div>').appendTo(li_album);
                    alb_info.append($wd.format('<div class="pic"><a href="javascript:void(0);"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', '/images/photo1.gif'));
                    alb_info.find('a').click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                        return false;
                    });
                    alb_info.append('<div class="bm_info"></div>');

                    var link_forward = jQuery('<a href="javascript:void(0);" class="icon_edit" ></a>').appendTo(alb_info.find('.bm_info'));
                    link_forward.click(function () {


                    });

                    var link_alb = jQuery($wd.format('<a href="javascript:void(0);">{0}</a>', v.folder_name)).appendTo(alb_info.find('.bm_info'));
                    link_alb.click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                        return false;
                    });
                    alb_info.find('.bm_info').append($wd.format('({0})', v.count));

                    li_album.linkHover();
                });


            } albumsScroll(); /* album list scroll */
        });

    }
    else {
        location.href = 'video_album.html';
    }
});

/*show album video*/
function showAlbumVideo(alId,albName) {
    $('.pe_set').empty();
    $('.pe_set').html(albName);
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="ico_alb_edit"></a>').appendTo($('.pe_set'));
    videoPaginator(alId, uid, '', videoBind);
}

/* personal video bind*/
function videoBind(data) {
    var box = $('.listView').empty();

    $.each(data.rows, function (i, v) {
        var li_video = jQuery('<li></li>').appendTo(box);

        li_video.append($wd.format('<div class="pic"><a href="javascript:;" onclick="location.href=\'video_view.html?albumid=' + albumId + '&videoid=' + v.id + (uid == '' ? '' : '&uid=' + uid) + '\';">{0}</a></div>', v.video_code));
        var v_info = jQuery('<div class="info"></div>').appendTo(li_video);
        var link_forward = jQuery('<a href="javascript:void(0);" class="icon_edit"></a>').appendTo(v_info);
        var link_title = jQuery($wd.format('<a href="javascript:void(0);" onclick="location.href=\'video_view.html?albumid=' + albumId + '&videoid=' + v.id + (uid == '' ? '' : '&uid=' + uid) + '\';">{0}ff </a>', v.video_name)).appendTo(v_info);

        li_video.append('<a class="icon_video" href="javascript:void(0);"></a>');

        li_video.linkHover();
    });
}


