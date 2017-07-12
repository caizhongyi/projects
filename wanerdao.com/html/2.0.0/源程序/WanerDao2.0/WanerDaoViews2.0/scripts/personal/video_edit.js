jQuery.fn.extend({
    /*album hover*/
    albumHover: function () {
        $(this).hover(function () {
            $(this).addClass("mHover");
        }, function () {
            $(this).removeClass("mHover");
        });
    }
});

var albumId;
var firstPage = true; //第一页

var sort_state = false;

var permissionList = '';
var permissionArr = [];
var albumArr = [];
$(function () {
    bindPTab('');

    albumId = getQueryString('albumId');
    if (albumId) {

        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    permissionList += $wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME);
                    permissionArr.push({ id: v.ID, name: v.NAME });
                });

                $('#selectPer').append(permissionList);
                $('#selectPer').chosen();

                getAlbumList();

                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        //  $('#selectPer').append('<option value="custom">自定义...</option>');
                    }
                });


                $('#selectPer').change(function () {
                    if ($(this).val()) {
                        var ids = getChkIds();
                        if (ids) {
                            var perId = $(this).val();
                            $('#selectPer').val('').chosen();
                            batchUpdatePermissionOfVideo(ids, perId, function (data) {
                                if (data.result) {
                                    $('.chkId').each(function () {
                                        if (ids.indexOf($(this).val()) != -1) {
                                            $(this).parent().parent().parent().find('.itm-per').html(getValuByKey(permissionArr, perId, 'id', 'name'));
                                        }
                                    });
                                    // new pop({ typename: 'success', msginfo: data.msg });
                                }
                            });
                        } else {
                            $(this).val('').chosen();
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('video_00007')
                            });
                        }
                    }
                });
            }

        });

        $('#selectFoder').change(function () {
            var fldId = $(this).val();
            if (fldId) {
                var ids = getChkIds();
                $('#selectFoder').val('').chosen();
                if (ids) {
                    batchUpdateAlbumOfVideo(ids, fldId, function (data) {
                        if (data.result) {
                            firstPage = true;
                            $('.chkAll').attr('checked', false);
                            videoPaginator(albumId, '', getSearchKey(), videoBind);
                            var videoCount = ids.split(',').length;
                            $('#alb_' + albumId).find('albc').html(parseInt($('#alb_' + albumId).find('albc').html()) - videoCount);
                            $('#alb_' + fldId).find('albc').html(parseInt($('#alb_' + fldId).find('albc').html()) + videoCount);
                        }
                    });
                } else {
                    $(this).val('').chosen();
                    new pop({ typename: 'warning',
                        msginfo: wanerdaoLangTip('video_00007')
                    });
                }
            }
        });

        $('#photo_del').click(function () {
            var ids = getChkIds();
            if (ids) {
                new pop({ typename: 'confirm',
                    msginfo: wanerdaoLangTip('personal_00006'),
                    callback: function () {
                        batchDeleteVideo(ids, function (data) {
                            if (data.result) {
                                firstPage = true;
                                $('.chkAll').attr('checked', false);
                                videoPaginator(albumId, '', getSearchKey(), videoBind);
                            }
                        });
                    },
                    cancelcallback: function () {

                    }
                });
            } else {
                new pop({ typename: 'warning',
                    msginfo: wanerdaoLangTip('video_00007')
                });
            }
        });

        $('.srhVideo').click(function () {
            firstPage = true;
            videoPaginator(albumId, '', getSearchKey(), videoBind);
        });
    }
    else {
        location.href = 'video_album.html';
    }

});

function getAlbumList() {
    getAllVideoFolder('', null, function (data) {
        if (data.result) {
            var box = $('.album-panel');
            var fName;
            var vCount;
            $.each(data.rows, function (i, v) {
                if (v.id == albumId) {
                    fName = v.folder_name;
                    vCount = v.count;
                }
                /* cache album list */
                albumArr.push({ id: v.id, name: v.folder_name });

                var li_album = jQuery('<li id="alb_' + v.id + '"></li>').appendTo(box);
                li_album.append('<img alt="" src="../images/photos/photo1.gif">');
                li_album.append($wd.format('<div class="videos-name"><label for="cb1">{0}(<albc>{1}</albc>)</label></div>', v.folder_name, v.count));
                //li_album.append('<div class="videos-options clearfix"><a href="javascript:;" class="icon icon-file"></a></div>');
                li_album.find('.icon-file').click(function () {

                });

                li_album.click(function () {
                    bindAlbums(v.id, v.folder_name, v.count);
                    return false;
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

            bindAlbums(albumId, fName, vCount); //bind album
            //   albumsScroll(); /* album list scroll*/
        }
    });
}


/* change album */
function bindAlbums(albId, albName, vCount) {
    $('.alb_name').html(albName);
    $('.video_count').html(vCount);

    $('#selectFoder').empty();
    $('#selectFoder').append('<option value="">Move to</option>');
    $.each(albumArr, function (i, v) {
        if (v.id != albId) {
            $('#selectFoder').append('<option value="' + v.id + '">' + v.name + '</option>');
        }
    });
    $('#selectFoder').chosen();
    albumId = albId;
    firstPage = true;
    videoPaginator(albumId, '', getSearchKey(), videoBind);
}

/* personal video bind*/
function videoBind(data, totalCount) {
    $('.photoAlbumName').find('i:eq(0)').html('(' + totalCount + ')');
    var box = $('.photoListMain').empty();
    $('.video_count').html(data.total);
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li_video = jQuery('<li></li>').appendTo(box);
            if (firstPage && i == 0) {
                li_video.attr('index', 'first');
            }
            var table = jQuery('<table width="708" border="0" cellspacing="0" cellpadding="0"></table>').appendTo(li_video);
            var tr_1 = jQuery('<tr></tr>').appendTo(table);
            tr_1.append($wd.format('<td width="40"  align="center" rowspan="2"><input type="checkbox" class="chkId" value="{0}" /></td>', v.id));
            tr_1.append($wd.format('<td width="180" align="center" rowspan="2">'
                + '<div class="videos-item" >'
                + '<div class="videos-player" style=" width: 148px; height: 106px;"><a href="javascript:;">{0}<span class="icon player-icon" href="javascript:;"></span></a></div>'
                + '</div></td>', v.video_code));
            tr_1.append($wd.format('<td>序号：<input type="text" class="text vSeq" style="width:45px;" maxlength="60" title="{0}" value="{0}"/>'
                + '&nbsp;&nbsp;名称：<input type="text" class="text vName"  maxlength="60" title="{1}" value="{1}"/></td>'
                + '</tr>', v.sequence, v.video_name));

            var tr_2 = jQuery('<tr></tr>').appendTo(table);
            tr_2.append($wd.format('<td align="left"><div  style="height: 80px;">Desc：<textarea  cols="30" rows="2" style="vertical-align:text-top; color: #666; height:45px;" class="textarea vDesc" title="{0}">{0}</textarea></div>'
                + '<div class="clearfix"><div class="f_left"><span class="itm-per">' + getValuByKey(permissionArr, v.permission, 'id', 'name') + '</span>&nbsp;&nbsp;&nbsp;&nbsp;Upload date：{1}</div>'
                + '<div class="operatBox f_right"> <a href="javascript:;" class="icon icon-up" title="Up"></a><a href="javascript:;" class="icon icon-down" title="Down"></a> </div>'
                + '</div></td>', v.description, getLocationDateString(v.upload_date, 'yyyy/MM/dd')));

            li_video.find('.player-icon').click(function () {
                window.location.href = 'video_view.html?albumid=' + albumId + '&videoid=' + v.id;
            });

            //修改排序
            //            var input_seq = tr_1.find('.vSeq');
            //            input_seq.blur(function () {
            //                if (/^\d+$/.test($(this).val())) {
            //                    videoSortByInput(v.id, $(this).val(), function (data) {
            //                        if (data.result) {
            //                            input_seq.attr('title', input_seq.val());
            //                        } else {
            //                            input_seq.val(input_seq.attr('title'));
            //                        }
            //                    });
            //                }
            //            });

            //修改标题
            var input_title = tr_1.find('.vName');
            input_title.blur(function () {
                updatePersonalVideo(v.id, $(this).val(), '', function (data) {
                    if (data.result) {
                        input_title.attr('title', input_title.val());
                    } else {
                        input_title.val(input_title.attr('title'));
                    }
                });
            });

            //修改描述
            var textarea_desc = tr_2.find('.vDesc');
            textarea_desc.blur(function () {
                updatePersonalVideo(v.id, '', $(this).val(), function (data) {
                    if (data.result) {
                        textarea_desc.attr('title', textarea_desc.val());
                    } else {
                        textarea_desc.val(textarea_desc.attr('title'));
                    }
                });
            });

            //Sort UP
            li_video.find('.operatBox').find('a.icon-up').click(function () {
                if (!sort_state) {
                    videoSortByClick(v.id, 'up', function (data) {
                        if (li_video.prev()) {
                            var itm_index = li_video.prev().attr('index');
                            if (itm_index == 'first') {
                                li_video.attr('index', 'first');
                                li_video.prev('index', '');
                                li_video.prev().find('.operatBox').find('a:eq(0)').show();
                                li_video.find('.operatBox').find('a:eq(0)').hide();
                            }
                            li_video.after(li_video.prev());
                        } else {
                            firstPage = true;
                            videoPaginator(albumId, '', getSearchKey(), videoBind);
                        }
                    });
                }
            });

            if (firstPage) {
                li_video.find('.operatBox').find('a.icon-up').hide();
                firstPage = false;
            }

            //Sort Down
            li_video.find('.operatBox').find('a.icon-down').click(function () {
                if (!sort_state) {
                    videoSortByClick(v.id, 'down', function (data) {
                        if (li_video.next()) {
                            var itm_index = li_video.attr('index');
                            if (itm_index == 'first') {
                                li_video.next().attr('index', 'first');
                                li_video.attr('index', '');
                                li_video.next().find('.operatBox').find('a:eq(0)').hide();
                                li_video.find('.operatBox').find('a:eq(0)').show();
                            }
                            li_video.before(li_video.next());
                        } else {
                            firstPage = true;
                            videoPaginator(albumId, '', getSearchKey(), videoBind);
                        }
                    });
                }
            });

        });

        chkIdClick();
    }
}

//updatepersonalvideo
function updatePersonalVideo(vid, vname, vdesc, callback) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonalvideo',vid:'" + vid + "',vname:'" + vname + "',vdesc:'" + vdesc + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//personalvideosortbyclick
function videoSortByClick(vid, dir, callback) {
    sort_state = true;
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'personalvideosortbyclick',vid:'" + vid + "',dir:'" + dir + "'}",
        error: function () {
            sort_state = false;
        },
        success: function (data) {
            if (data.result) { callback(data); }
            sort_state = false;
        }
    });
}


//videoSortByInput
function videoSortByInput(vid, seq, callback) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'personalvideosortbyinput',vid:'" + vid + "',input_seq:'" + seq + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*batch Update Album Of Video*/
function batchUpdateAlbumOfVideo(ids, foldId, callback) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchupdatealbumofvideo',video_id:'" + ids + "',fold_id:'" + foldId + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*batch Update permission Of Video*/
function batchUpdatePermissionOfVideo(ids, permission, callback) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchupdatepermissionofvideo',video_id:'" + ids + "',permission:'" + permission + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*batch delete Video*/
function batchDeleteVideo(ids, callback) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchdeletepersonalvideo',video_id:'" + ids + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

function getSearchKey() {
    var srcValue = $('.srcTxt').val();
    if (srcValue == $('.srcTxt').attr('inputdefault')) {
        srcValue = '';
    }
    return srcValue;
}