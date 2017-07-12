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
var firstPage = true;

var sort_state = false;

var permissionList = '';
var permissionArr = [];
var albumArr = [];
$(function () {
    bindPTab('');

    albumId = getQueryString('albumId');
    if (albumId) {
        getAllVideoFolder('', null, function (data) {
            if (data.result) {
                var box = $('.alb_list_sVideo');
                var fName;
                var vCount;
                $.each(data.rows, function (i, v) {
                    if (v.id == albumId) {
                        fName = v.folder_name;
                        vCount = v.count;
                    }
                    /* cache album list */
                    albumArr.push({ id: v.id, name: v.folder_name });

                    var li_album = jQuery('<li></li>').appendTo(box);

                    var alb_info = jQuery('<div class="pers"></div>').appendTo(li_album);
                    alb_info.append($wd.format('<div class="pic"><a href="javascript:void(0);"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', '/images/photo1.gif'));
                    alb_info.find('a').click(function () {
                        bindAlbums(v.id, v.folder_name, v.count);
                        return false;
                    });

                    alb_info.append('<div class="bm_info"></div>');

                    //                    var link_forward = jQuery('<a href="javascript:void(0);" class="icon_edit" ></a>').appendTo(alb_info.find('.bm_info'));
                    //                    link_forward.click(function () {


                    //                    });

                    var link_alb = jQuery($wd.format('<a href="javascript:void(0);">{0}</a>', v.folder_name)).appendTo(alb_info.find('.bm_info'));
                    link_alb.click(function () {
                        bindAlbums(v.id, v.folder_name, v.count);
                        return false;
                    });
                    alb_info.find('.bm_info').append($wd.format('({0})', v.count));

                    li_album.albumHover();
                    ///////////////////////////////////////////////////

                });

                bindAlbums(albumId, fName, vCount); //bind album
             //   albumsScroll(); /* album list scroll*/
            }
        });

        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    permissionList += $wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME);
                    permissionArr.push({ id: v.ID, name: v.NAME });
                });

                $('#selectPer').append(permissionList);

                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        //  $('#selectPer').append('<option value="custom">自定义...</option>');
                    }
                });


                $('#selectPer').change(function () {
                    if ($(this).val()) {
                        var ids = getChkIds();
                        if (ids) {
                            batchUpdatePermissionOfVideo(ids, $(this).val(), function (data) {
                                if (data.result) {
                                    alert(data.msg);
                                }
                                $('#selectPer').val('');
                            });
                        } else {
                            $(this).val('');
                            alert(wanerdaoLangTip('video_00007'));
                        }
                    }
                });
            }

        });



        $('#selectFoder').change(function () {
            if ($(this).val()) {
                var ids = getChkIds();
                if (ids) {
                    batchUpdateAlbumOfVideo(ids, $(this).val(), function (data) {
                        if (data.result) {
                            alert(data.msg);
                        }
                        $('#selectFoder').val('');

                        videoPaginator(albumId, '', '', videoBind);
                    });
                } else {
                    $(this).val('');
                    alert(wanerdaoLangTip('video_00007'));
                }
            }
        });

        $('.photo_del').click(function () {
            var ids = getChkIds();
            if (ids) {
                if (confirm(wanerdaoLangTip('video_00008'))) {
                    batchDeleteVideo(ids, function (data) {
                        if (data.result) {
                            videoPaginator(albumId, '', '', videoBind);
                        }
                    });
                }
            } else {
                alert(wanerdaoLangTip('video_00007'));
            }
        });

        chkAllClick();

        $('.srhVideo').click(function () {
            videoPaginator(albumId, '', $('.txt').val(), videoBind);
        });
    }
    else {
        location.href = 'video_album.html';
    }

});

/* change album */
function bindAlbums(albId, albName, vCount) {
    $('.alb_name').html(albName);
    $('.alb_name').next('i').html('(' + vCount + ')');

    $('#selectFoder').empty();
    $('#selectFoder').append('<option value="">移动到</option>');
    $.each(albumArr, function (i, v) {
        if (v.id != albId) {
            $('#selectFoder').append('<option value="' + v.id + '">' + v.name + '</option>');
        }
    });
    albumId = albId;
    videoPaginator(albId, '', '', videoBind);
    var firstPage = true;
}

/* personal video bind*/
function videoBind(data) {
    firstPage = true;
    var box = $('.pe_list').children('ul').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li_photo = jQuery('<li></li>').appendTo(box);
            var table_box = jQuery('<table width="708" border="0" cellspacing="0" cellpadding="0"></table>').appendTo(li_photo);
            var tr_1 = jQuery('<tr></tr>').appendTo(table_box);
            tr_1.append('<td width="40" align="center" rowspan="2"><a href="javascript:;" class="icon icon-pic pic-flag"  title="封面"></a>'
                + '<input type="checkbox" name="" id="" /></td>');
            tr_1.append('<td width="180" align="center" rowspan="2"><img style="width:150px;" src="../images/photos/photo1.gif" alt=""></td>');
            tr_1.append('<td>序号：<input type="text" class="text" name="" id="" style="width:45px;" />'
                + '&nbsp;&nbsp;名称：<input type="text" class="text" name="" id="" /></td>');
            tr_1.append('<td width="140">上传时间：2011/12/23</td>');

            var tr_2 = jQuery('<tr></tr>').appendTo(table_box);
            tr_2.append('<td align="left">描述：<textarea name="" id="" cols="30" rows="4" style="vertical-align:text-top;" class="textarea"></textarea></td>'
                + '<td><div class="operatBox"> <a href="javascript:;" class="icon icon-pic" title="设为封面"></a><a href="javascript:;" class="icon icon-up" title="上移"></a><a href="javascript:;" class="icon icon-down" title="下移"></a> </div></td>');

            //            li.append($wd.format('<div class="ckBox"><input type="checkbox" class="chkId" value="{0}"/></div>', v.id));

            //            li.append($wd.format('<div class="pic"><div style=" width: 132px; height: 108px;">{0}</div></div>', v.video_code));

            //            var div_data = jQuery('<div class="form_data"></div').appendTo(li);
            //            div_data.append($wd.format('<div class="txt_w">'
            //                                    + '<div class="ser_num"><span class="tit">序号：</span></div>'
            //                                    + '<div class="name"><span class="tit"><span class="tit">名称：</span></span></div>'
            //                                    + '<div class="date">上传时间：{0}</div>'
            //                               + '</div>'
            //                               + '<div class="txa_w"><span class="tit">描述：</span></div>'
            //                               , DateFormat(v.upload_date, 'yyyy/MM/dd')));
            //            //Image Sort
            //            var input_seq = jQuery('<input type="text" class="txt_c3" />');

            //            input_seq.val(v.sequence);
            //            input_seq.attr('title', v.sequence);

            //            //input sequence order
            //            input_seq.blur(function () {
            //                if (/^\d$/.test($(this).val())) {
            //                    videoSortByInput(v.id, $(this).val(), function (data) {
            //                        if (data.result) {
            //                            input_seq.attr('title', input_seq.val());
            //                        } else {
            //                            input_seq.val(input_seq.attr('title'));
            //                        }
            //                    });
            //                }
            //            });

            //            div_data.find('.tit:eq(0)').after(input_seq);

            //            //Image Name
            //            var input_title = jQuery('<input type="text" class="txt_c3" />');
            //            input_title.val(v.video_name);
            //            input_title.attr('title', v.video_name);
            //            input_title.blur(function () {
            //                updatePersonalVideo(v.id, $(this).val(), '', function (data) {
            //                    if (data.result) {
            //                        input_title.attr('title', input_title.val());
            //                    } else {
            //                        input_title.val(input_title.attr('title'));
            //                    }
            //                }); //修改标题
            //            });

            //            div_data.find('.tit:eq(1)').after(input_title);

            //            //Image description
            //            var textarea_desc = jQuery('<textarea name="" id="" cols="30" rows="10" class="txa_c3"></textarea>');
            //            textarea_desc.val(v.description);
            //            textarea_desc.attr('title', v.description);
            //            div_data.find('.tit:eq(3)').after(textarea_desc);

            //            textarea_desc.blur(function () {
            //                updatePersonalVideo(v.id, '', $(this).val(), function (data) {
            //                    if (data.result) {
            //                        textarea_desc.attr('title', textarea_desc.val());
            //                    } else {
            //                        textarea_desc.val(textarea_desc.attr('title'));
            //                    }
            //                });  //修改描述
            //            });

            //            li.append('<div class="hover_box"><a href="javascript:;" class="upload"></a><a href="javascript:;" class="download"></a></div>');

            //            //            if (firstPage) {
            //            //                li.find('.hover_box').find('a:eq(0)').hide();
            //            //                firstPage = false;
            //            //            }
            //            //            else {
            //            //Sort UP
            //            li.find('.hover_box').find('a.upload').click(function () {
            //                if (!sort_state) {
            //                    sort_state = true;
            //                    videoSortByClick(v.id, 'up', function (data) {
            //                        if (data.result) {
            //                            li.after(li.prev());
            //                        }
            //                        sort_state = false;
            //                    });
            //                }
            //            });
            //            //            }

            //            //Sort Down
            //            li.find('.hover_box').find('a.download').click(function () {
            //                if (!sort_state) {
            //                    sort_state = true;
            //                    videoSortByClick(v.id, 'down', function (data) {
            //                        if (data.result) {
            //                            li.before(li.next());
            //                        }
            //                        sort_state = false;
            //                    });
            //                }
            //            });

            //            //            var div_cover = jQuery('<div class="cover_on"></div>').appendTo(li);

            //            //            div_cover.css('display', 'none');

            //            //            div_cover.click(function () {

            //            //            });

            //            li.bind("mouseenter mouseleave", function () {
            //                $(this).toggleClass("hover");
            //                //.find(".hover_box").toggle();
            //            })

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
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'personalvideosortbyclick',vid:'" + vid + "',dir:'" + dir + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
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

