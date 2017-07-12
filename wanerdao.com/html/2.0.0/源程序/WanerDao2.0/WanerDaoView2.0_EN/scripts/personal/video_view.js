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

var albumId;
var videoId;
var uid;
$(function () {
    albumId = getQueryString('albumId').replace('#', '');
    videoId = getQueryString('videoId');
    uid = getQueryString('uid');
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
                    li_album.append('<div class="videos-options clearfix"><a href="javascript:;" class="icon icon-file"></a></div>');
                    li_album.find('.icon-file').click(function () {

                    });

                    li_album.click(function () {
                        showAlbumVideo(v.id, v.folder_name);
                    });

                });


            } albumsScroll(); /* album list scroll */
        });



        $('.reply').click(function () {
            var txt = $('.txt').val();
            if (txt) {
                addVideoComment(videoId, txt, '', $('.txt'));
            } else {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('video_00009')
                });
            }
        });

        $('.cancle').click(function () {
            $('.txt').val('');
        });
    }
    else {
        location.href = 'view_album.html';
    }


});


/*show album video*/
function showAlbumVideo(alId, albName) {
    $('.alb_name').html(albName);
    $('.vedio-info').empty();
    $('.flashplayer').empty();
    var link_forwardTo = jQuery('<a href="javascript:void(0);" class="ico_alb_edit"></a>').appendTo($('.pe_set'));

    getAllPersonalVideoByAlbum({ fold_id: alId, uid: uid }, null, videoBind);
}

/*  */
function videoBind(data) {
    if (data.result) {
        var box = $('.vedio-panel').empty();
        $('.cc').html(data.rows.length);
        $('.tc').html(data.rows.length);
        $.each(data.rows, function (i, v) {
            //display current photo
            if (videoId && v.id == videoId) {
                $('.cc').html(i + 1);
                setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description, index: (i + 1) });
            } else {
                if (i == 0) {
                    $('.cc').html(i + 1);
                    setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description });
                }
            }

            var li_video = jQuery('<li class="videos-item" style="float: left;" index="' + (i + 1) + '"></li>').appendTo(box);
            li_video.append($wd.format('<div class="videos-player" style=" width: 205px; height: 144px;"><a href="javascript:;">{0}<span class="icon player-icon" href="javascript:;"></span></a></div>', v.video_code));
            li_video.append($wd.format('<div class="vedio-name"><a href="javascript:;">{0}</a></div>', v.video_name));

            li_video.click(function () {
                $('.cc').html(i + 1);
                setVideo({ id: v.id, path: v.video_code, name: v.video_name, date: v.upload_date, desc: v.description, index: $(this).attr('index') });
            });
        });

        new $.ui.tabs('.vedio-tabs', {
            effect: 'x',
            widget: {
                panel: '.vedio-panel',
                clip: '.vedio-clip',
                prev: '.vedio-prev',
                next: '.vedio-next'
            }
        });
        videoScroll();

        //comment
        $('#m_reply').click(function () {
            var txt = $('.txt').val();
            if (txt) {
                addPhotoComment(videoId, txt);
            } else {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('video_00009')
                });
            }
        });

        $('.com_num').click(function () {
            $('.comments').toggle();
        });
    }
}

/* set video info */
function setVideo(model) {
    videoId = model.id;
    $('.flashplayer').html(model.path).css({ 'height': '400px' });
    var video_detail = $('.vedio-info').empty();
    video_detail.append('<h3>' + model.name + '&nbsp;&nbsp;(' + getLocationDateString(model.date, 'yyyy/MM/dd') + ')</h3>');
    var link_forward = jQuery('<a href="javascript:;" class="icon icon-file"></a>').appendTo(video_detail.find('h3'));
    video_detail.append('<p>' + model.desc + '</p>');
    //getLeavmessage(model.id);
}



/** add video comment **/
function addVideoComment(video_id, content, followId, $text) {
    $.ajax({
        url: "../view_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addvideocomment', id:'" + video_id + "',content:'" + content + "',followId:'" + followId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                $text.val('');
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
            }
        }
    });
}

/** delete video comment **/
function deleteVideoCommentById(imageId) {
    //deletephotocommentbyid
    $.ajax({
        url: "../view_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletevideocommentbyid', id:'" + video_id + "'}",
        error: function (data) {
        },
        success: function (data) {

        }
    });
}


/*album list scroll*/
function videoScroll() {
    var arrLeft = $(".ph_sPic_wp").find(".scr_lt");
    var arrRight = $(".ph_sPic_wp").find(".scr_rt");
    var _list = $(".vlist");
    var _li = _list.children();
    var _plas = _li.size() - 4;
    arrLeft.click(function () {
        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (!parseInt(_list.css("left")) == "0") {
                    _list.animate({ left: "+=160" })
                }
            }
        }
    })
    arrRight.click(function () {
        if (!_list.is(":animated")) {
            if (_plas > 0) {
                if (-parseInt(_list.css("left")) == _plas * 160) {
                    return false;
                }
                else {
                    _list.animate({ left: "-=160" });
                }
            }
        }
    })
}