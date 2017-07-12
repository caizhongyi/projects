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
                var box = $('ul.album-panel');
                $('.num').html('(' + data.total + ')'); /* set albums*/

                $.each(data.rows, function (i, v) {
                    /*set current video folder name */
                    if (v.id.toLowerCase() == albumId) {
                        showAlbumVideo(v.id, v.folder_name);
                    }

                    var li_album = jQuery('<li></li>').appendTo(box);
                    li_album.append('<img alt="" src="../images/photos/photo1.gif">');
                    li_album.append($wd.format('<div class="videos-name"><label for="cb1">{0}({1})</label></div>', v.folder_name, v.count));
                    if (!is_self) {
                        li_album.append('<div class="videos-options clearfix"><a href="javascript:;" class="icon icon-file" rel="transmit"></a></div>');
                        li_album.find('.icon-file').transmit({ currType: "videoFolder", transId: v.id, transTitle: v.folder_name });
                    }
                    li_album.find('img,.videos-name').click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                    });
                });

                new $.ui.tabs('.album-tabs', {
                    effect: 'y',
                    widget: {
                        panel: '.album-panel',
                        clip: '.album-clip',
                        prev: '.album-prev',
                        next: '.album-next'
                    }

                });

            } albumsScroll(); /* album list scroll */
        });

    }
    else {
        location.href = 'video_album.html';
    }
});

/*show album video*/
function showAlbumVideo(albId,albName) {
    $('.pe_set').empty();
    $('.pe_set').html(albName);
    if (!is_self) {
        var link_forwardTo = jQuery('<a class="icon icon-file" rel="transmit"></a>').appendTo($('.pe_set'));
        link_forwardTo.transmit({ currType: "videoFolder", transId: albId, transTitle: albName });
    }
    videoPaginator(albId, uid, '', videoBind);
}

/* personal video bind*/
function videoBind(data) {
    var box = $('.right-videos').empty();

    $.each(data.rows, function (i, v) {
        var li_video = jQuery('<li class="videos-item"></li>').appendTo(box);

        li_video.append($wd.format('<div class="videos-player" style=" width: 205px; height: 144px;"><a href="javascript:;">{0}<span href="javascript:;" class="icon player-icon"></span></a></div>', v.video_code));
        li_video.append($wd.format('<div class="clearfix videos-footer">'
        + '<div  class="videos-name"><label for="cb1">{0}</label></div>'
        + (is_self ? '' : '<div class="videos-options"><a href="javascript:;" class="icon icon-file" rel="transmit"></a></div>')
        + '</div>', v.video_name));

        li_video.find('.videos-player,.videos-name').click(function () {
            window.location.href = 'video_view.html?albumid=' + albumId + '&videoid=' + v.id + (uid == '' ? '' : '&uid=' + uid);
        });
        if (!is_self) {
            li_video.find('.icon-file').transmit({ currType: "vedio", transId: v.id });
        }
    });
}


