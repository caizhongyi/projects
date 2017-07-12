

var videos = []; /* save upload video*/
var s_t = true; /* submit state*/
$(function () {

    bindPTab('');

    /* bind permission*/
    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                $('#permissionlist').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
            });

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
                $('#alubms').append($wd.format('<option value="{0}">{1}</option>', v.id, v.folder_name));
            });
        }
    });

    $('#txtAdd').click(function () {
        var v = addVideo();
        if (v) {
            videos.push(v);
        } else {
            alert(wanerdaoLangTip('video_00001'));
        }
    });

    /* submit video */
    $('#txtSubmit').click(function () {
        if (s_t) {
            if (videos.length > 0) {
                s_t = false;
                var ifCreate;
                var idOrName;
                if ($('#chkNewFolder').attr('checked')) {
                    ifCreate = 1;
                    if (!$('#txtNewAlbum').val()) {
                        alert(wanerdaoLangTip('video_00003'));
                        return false;
                    }
                    idOrName = $('#txtNewAlbum').val();
                } else {
                    ifCreate = 0;
                    idOrName = $('#alubms').val();
                }
                $.ajax({
                    url: "../upload_video.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'uploadvideo', videos:'[" + videos.toString().escapeSpecialchar() + "]',ifcreatealbum:'" + ifCreate + "', idorname: '" + idOrName + "',permission:'" + $('#permissionlist').val() + "'}",
                    error: function (data) {
                        s_t = true;
                    },
                    success: function (data) {
                        if (data.result) {
                            $('.vlist').find('ul').empty();
                            if ($('#chkNewFolder').attr('checked')) {
                                $('#txtNewAlbum').val('');
                                $('#chkChooseFolder').attr('checked', true);
                            }
                            alert(data.msg);

                        } else {
                            alert(data.msg);
                        }
                        s_t = true;
                    }
                });
            } else {
                alert(wanerdaoLangTip('video_00002'));
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

    var li = jQuery('<li></li>').appendTo($('.vlist').find('ul'));
    li.attr('id', newGuid());
    li.append($wd.format('<div class="pic"><a href="javascript:;">{0}</a></div>',source));
    li.append('<div class="info"><a href="#">未命名</a></div>');
    var link_del = jQuery('<a href="javascript:void(0);" class="delete"></a>').appendTo(li);
    link_del.click(function () {
        li.remove();
        //
        $.each(videos, function (i) {
            if (video == videos[i]) {
                videos.splice(i, 1);
                return false;
            }
        });

        return false;
    });
    li.append('<a href="javascript:void(0);" class="icon_video"></a>');
    $('#txtVideoCode').val('');
    return video;
}



//$(function () {
//    $('#txtVideoCode').change(function () {
//        if ($(this).val() && $(this).val().indexOf('youku.com')) {
//            getData($(this).val());
//        }
//    });
//});
//var videoinfo = [];
//function getData(videoUrl) {
//    $.ajax({
//        url: "../upload_video.axd",
//        type: "POST",
//        dataType: "json",
//        cache: false,
//        data: "{opertype:'uploadvideo', video_url:'" + videoUrl + "'}",
//        error: function (data) {
//            // $('#sendmsg').notice(msgTip.request_fail, 1);
//        },
//        success: function (data) {
//            if (data.result) {
//                //videoinfo.push($wd.format('{source:"{0}",title:"{0}",logo:"{1}"}', "youku", data.data.data[0].title, data.data.data[0].logo));
//                videoinfo.push($wd.format('{source:"{0}",title:"{0}",logo:"{1}"}', "youku", data.data.data[0].title, data.data.data[0].logo));
//                alert(videoinfo);
//            }
//        }
//    });
//}

