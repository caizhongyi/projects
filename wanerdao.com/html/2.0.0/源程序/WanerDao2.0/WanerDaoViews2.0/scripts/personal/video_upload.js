

var videos = []; /* save upload video*/
var s_t = true; /* submit state*/
var videoSetting;
$(function () {

    bindPTab('');

    getVideoAlbumSetting(function () {
        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    $('#permissionlist').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
                });
                $('#permissionlist').chosen();


                $('#permissionlist').val(videoSetting.default_permission).chosen();

                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        // $('#permissionlist').append('<option value="custom">自定义...</option>');
                    }
                });

            }
        });

        getAllVideoFolder('', null, function (data) {
            if (data.result && data.rows.length > 0) {
                $.each(data.rows, function (i, v) {
                    $('#albums').append($wd.format('<option value="{0}">{1}</option>', v.id, v.folder_name));
                });
                $('#albums').val(videoSetting.default_folder_id).chosen();
            }
        });
    });



    $('#txtAdd').click(function () {
        $('#txtAdd').unnotice(1);
        var v = addVideo();
        if (v) {
            videos.push(v);
        } else {
            $('#txtAdd').notice(wanerdaoLangTip('video_00001'), 1);
        }
    });

    /* submit video */
    $('#txtSubmit').click(function () {
        $('#txtAdd').unnotice(1);
        if (s_t) {
            if (videos.length > 0) {
                var ifCreate;
                var idOrName;
                var albPer;
                if ($('#chkNewFolder').attr('checked')) {
                    ifCreate = 1;
                    if (!$('#txtNewAlbum').val()) {
                        $('#txtAdd').notice(wanerdaoLangTip('video_00003'), 1);
                        return false;
                    }
                    idOrName = $('#txtNewAlbum').val();
                } else {
                    ifCreate = 0;
                    idOrName = $('#albums').val();
                }

                albPer = $('#permissionlist').val();
                if (!albPer) {
                    $('#txtAdd').notice(wanerdaoLangTip('common_00037'), 1);
                    return false;
                }

                s_t = false;
                $.ajax({
                    url: "../upload_video.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'uploadvideo', videos:'[" + videos.toString().escapeSpecialchar() + "]',ifcreatealbum:'" + ifCreate + "', idorname: '" + idOrName + "',permission:'" + albPer + "'}",
                    error: function (data) {
                        $('#txtAdd').notice(wanerdaoLangTip('common_00001'), 1);
                        s_t = true;
                    },
                    success: function (data) {
                        if (data.result) {
                            $('.vlist').find('ul').empty();
                            if ($('#chkNewFolder').attr('checked')) {
                                $('#txtNewAlbum').val('');
                                $('#chkChooseFolder').attr('checked', true);
                            }

                        }
                        $('#txtAdd').notice(data.msg, 2);
                        $('.videos').empty();
                        $('#txtSubmit').hide();
                        s_t = true;
                        setTimeout(function () { $('#txtAdd').unnotice(2); }, 2000);
                        submitBtnToggle();
                    }
                });
            } else {
                $('#txtAdd').notice(wanerdaoLangTip('video_00002'), 1);
            }
        }
    });

});

//
function addVideo() {
    var source = $('#txtVideoCode').val();

    var video;
    var id = newGuid();
    if (source.indexOf('youku.com') != -1) {
        video = '{\"type\":"youku"';
    } else if (source.indexOf('tudou.com') != -1) {
        video = '{\"type\":"tudou"';
    } else if (source.indexOf('youtube.com') != -1) {
        video = '{\"type\":"youtube"';
    } else {
        return false;
    }

    video = video + ',\"id\":\"' + id + '\"';

    var m = source.match(/src\=\"([^"]+)\"/);

    source = source.replace(/width\=\"\d+\"/g, "width=\"100%\"").replace(/height\=\"\d+\"/g, "height=\"100%\"");

    video = video + ',source:\"' + m[1] + '\"}';

    var li_video = jQuery('<li class="videos-item"></li>').appendTo($('.videos'));
    li_video.attr('id', newGuid());
    li_video.append('<a class="icon close-5 videos-close"></a>');
    li_video.append($wd.format('<div class="videos-player" style=" width: 205px; height: 144px;"><a href="javascript:;">{0}</a></div>', source)); //<span class="icon player-icon"></span>
    li_video.append('<div class="videos-name"><label for="cb1">未命名</label></div>');
    li_video.find('.videos-close').click(function () {
        li_video.remove();
        $.each(videos, function (i) {
            if (video == videos[i]) {
                videos.splice(i, 1);
                submitBtnToggle();
                return false;
            }
        });
    });

    $('#txtVideoCode').val('');

    submitBtnToggle();
    return video;
}

function submitBtnToggle() {
    if ($('.videos').find('li').length == 0) {
        $('#txtSubmit').hide();
    } else {
        $('#txtSubmit').show();
    }
}

/*
    视频默认设置
*/
function getVideoAlbumSetting(success) {
    $.ajax({
        url: "../edit_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getvideosettings'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                videoSetting = data.obj;
                success();
            }
        }
    });
}