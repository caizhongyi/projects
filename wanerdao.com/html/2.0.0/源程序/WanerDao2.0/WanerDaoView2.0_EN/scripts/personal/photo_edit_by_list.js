var albumId;
var firstPage = true;

var sort_state = false;
var albumArr = [];
var permissionArr = [];
$(function () {
    bindPTab(''); /*绑定功能选择卡*/

    albumId = getQueryString('albumId');

    if (albumId) {

        $('#photo_th').click(function () {
            window.location = 'photo_edit.html?albumid=' + albumId;
            return false;
        });

        $('input.btnsrh').click(function () {
            paginator(getSearchKey());
        });


        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    $('#selectPer').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
                    permissionArr.push({ id: v.ID, name: v.NAME });
                });
                $('#selectPer').chosen();

                getAlbumList();

                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        //                        $('#selectPer').append('<option value="custom">自定义...</option>');
                    }
                });
            }
        });

        $('.photo_del').click(function () {
            var ids = getChkIds();
            if (ids && confirm(wanerdaoLangTip('common_00036'))) {
                batchDeletePhoto(ids, function () {
                    $('.photoListMain').find('li').each(function () {
                        if (ids.indexOf($(this).find('.chkId').val()) != -1) {
                            $(this).fadeTo('slow', 0, function () {
                                $(this).remove();
                            });
                        }
                    });

                    var videoCount = ids.split(',').length;
                    $('#alb_' + albumId).find('albc').html(parseInt($('#alb_' + albumId).find('albc').html()) - videoCount);
                    paginator(getSearchKey());
                });
            }
        });

        $('#selectPer').change(function () {
            if ($(this).val()) {
                var ids = getChkIds();
                if (ids) {
                    var perId = $(this).val();
                    $('#selectPer').val('').chosen();
                    batchUpdatPhotoPermission(ids, perId, function (data) {
                        if (data.result) {
                            $('.chkId').each(function () {
                                if (ids.indexOf($(this).val()) != -1) {
                                    $(this).parent().parent().parent().find('..itm-per').html(getValuByKey(permissionArr, perId, 'id', 'name'));
                                }
                            });
                            // new pop({ typename: 'success', msginfo: data.msg });
                        }
                    });
                } else {
                    $(this).val('').chosen();
                }
            }
        });

        $('#selectFoder').change(function () {
            var fldId = $(this).val();
            if (fldId) {
                var ids = getChkIds();
                $(this).val('').chosen();
                if (ids) {
                    changeAlbumOfPhoto(ids, fldId, function (data) {
                        if (data.result) {
                            $('.chkAll').attr('checked', false);
                            var videoCount = ids.split(',').length;
                            $('#alb_' + albumId).find('albc').html(parseInt($('#alb_' + albumId).find('albc').html()) - videoCount);
                            $('#alb_' + fldId).find('albc').html(parseInt($('#alb_' + fldId).find('albc').html()) + videoCount);

                            paginator(getSearchKey());
                        }
                    });
                } else {
                    $(this).val('').chosen();
                }
            }

        });
    }
    else {
        location.href = 'photo_album_manage.html';

    }
});


/*相册列表*/
function getAlbumList() {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumlist', pagecurrent:1, pageSize:1000000}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('ul.albums');
                $('.album_count').html('(' + data.total + ')');
                var floderName = '';
                var vCount = 0;
                $.each(data.rows, function (i, v) {
                    if (v.id == albumId) {
                        floderName = v.folder_name;
                        vCount = v.count;
                    }

                    /* cache album list */
                    albumArr.push({ id: v.id, name: v.folder_name });

                    var li = jQuery('<li id="alb_' + v.id + '"></li>').appendTo(box);
                    var div_container = jQuery('<div class="album-box "></div>').appendTo(li);
                    if (v.share_key_id != '-1') {
                        li.addClass('album-sys');
                    }

                    div_container.append('<div class="album-label"></div>');
                    div_container.append($wd.format('<img alt="" class="album" src="{0}" style=" width: 205px; height: 145px;"/>', v.cover_path));
                    div_container.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>(<albc>{1}</albc>)</div>', v.folder_name, v.count));

                    li.click(function () {
                        bindAlbums(v.id, v.folder_name, v.count);
                        return false;
                    });
                });

                bindAlbums(albumId, floderName, vCount);
                albumsScroll(); /* album list scroll*/
            }
        }
    });
}


/* change album */
function bindAlbums(albId, albName, vCount) {
    $('.alb_name').html(albName);
    $('.alb_name').next('i').html('(' + vCount + ')');

    $('#selectFoder').empty();
    $('#selectFoder').append('<option value="">Move to</option>');
   
    $.each(albumArr, function (i, v) {
        if (v.id != albId) {
            $('#selectFoder').append('<option value="' + v.id + '">' + v.name + '</option>');
        }
    });
    $('#selectFoder').chosen();
    albumId = albId;
    paginator('');
}



function paginator(key) {
    $('.chkAll').attr('checked', false);
    firstPage = true;
    $(".pageList").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        //pagermore: true,
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: bindData,
        ajax: {
            url: 'editphoto_photoalbum.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getphotoalbumphoto',
                folder_id: albumId,
                image_name: key
            }
        }
    });

}

function bindData(data, totalCount) {
    $('.photoAlbumName').find('i:eq(0)').html('(' + totalCount + ')');
    var box = $('.photoListMain').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li_photo = jQuery('<li></li>').appendTo(box);
            if (firstPage && i == 0) {
                li_photo.attr('index', 'first');
            }
            var table_box = jQuery('<table width="708" border="0" cellspacing="0" cellpadding="0"></table>').appendTo(li_photo);

            var tr_1 = jQuery('<tr></tr>').appendTo(table_box);
            tr_1.append('<td width="40"  align="center" rowspan="2">'
                + '<a href="javascript:;" class="icon icon-pic pic-flag"  title="封面"></a>'
                + '<input type="checkbox" class="chkId" value="' + v.id + '" /></td>');
            tr_1.append('<td width="180" align="center" rowspan="2"><img style="width:150px; height: 112px;" src="' + v.image_small_path + '" alt=""></td>');
            tr_1.append('<td>序号：<input type="text" class="text photoSort" style="width:45px;" maxlength="10" readonly="readonly" />'
                + '&nbsp;&nbsp;名称：<input type="text" class="text photoName" maxlength="60" /></td>');

            var tr_2 = jQuery('<tr></tr>').appendTo(table_box);
            tr_2.append('<td align="left"><div  style="height: 80px;">描述：<textarea cols="30" rows="2" style="vertical-align:text-top; color: #666; height:45px;" class="textarea photoDesc" ></textarea></div>'
                + '<div class="clearfix">'
                + '<div class="f_left"><span class=".itm-per">' + getValuByKey(permissionArr, v.permission, 'id', 'name') + '</span>&nbsp;&nbsp;&nbsp;&nbsp;上传时间：' + getLocationDateString(v.upload_date, 'yyyy/MM/dd') + '</div>'
                + '<div class="operatBox f_right"><a href="javascript:;" class="icon icon-pic" title="封面"></a><a href="javascript:;" class="icon icon-up" title="上移"></a><a href="javascript:;" class="icon icon-down" title="下移"></a> </div>'
                + '</div>'
                + '</td>');

            //封面
            var photo_cover = li_photo.find('.pic-flag');
            if (v.is_cover.toLowerCase() == 'true') {
                li_photo.find('.operatBox').find('a:eq(0)').hide();
            } else {
                photo_cover.hide();
                //photo_cover.css('display', 'none');
            }

            photo_cover.click(function () {
                updateImageProperty(v.id, '', '', '', 0, function (data) {
                    if (data.result) {
                        li_photo.find('.operatBox').find('a:eq(0)').show();
                        photo_cover.css('display', 'none');
                    }
                });
            });

            //排序
            var photo_seq = li_photo.find('.photoSort');
            photo_seq.val(v.sequence);
            photo_seq.attr('title', v.sequence);
            //            photo_seq.blur(function () {
            //                if (/^\d+$/.test($(this).val())) {
            //                    updateImageProperty(v.id, $(this).val(), '', '', '', function () {
            //                        if (data.result) {
            //                            photo_seq.attr('title', photo_seq.val());
            //                        } else {
            //                            photo_seq.val(photo_seq.attr('title'));
            //                        }
            //                    });
            //                }
            //            });

            //Image Name//修改标题
            var photo_name = li_photo.find('.photoName');
            photo_name.val(v.image_name);
            photo_name.attr('title', v.image_name);
            photo_name.blur(function () {
                updateImageProperty(v.id, '', $(this).val(), '', '', function () {
                    if (data.result) {
                        photo_name.attr('title', photo_name.val());
                    } else {
                        photo_name.val(photo_name.attr('title'));
                    }
                });
            });

            //Image Description//修改描述
            var photo_desc = li_photo.find('.photoDesc');
            photo_desc.val(v.description);
            photo_desc.attr('title', v.description);
            photo_desc.blur(function () {
                updateImageProperty(v.id, '', '', $(this).val(), '', function () {
                    if (data.result) {
                        photo_desc.attr('title', photo_desc.val());
                    } else {
                        photo_desc.val(photo_desc.attr('title'));
                    }

                });
            });

            //Set Cover
            li_photo.find('.operatBox').find('a:eq(0)').click(function () {
                setPhotoBeCover(v.id, function () {
                    li_photo.parent().find('li').each(function () {
                        $(this).find('.pic-flag').css('display', 'none');
                        $(this).parent().find('.operatBox').find('a:eq(0)').show();
                    });

                    li_photo.find('.operatBox').find('a:eq(0)').hide();
                    li_photo.find('.pic-flag').show();
                });
            });

            //Sort UP
            li_photo.find('.operatBox').find('a:eq(1)').click(function () {
                if (!sort_state) {
                    photoSoftByClick(v.id, 0, function () {
                        if (li_photo.prev()) {
                            var itm_index = li_photo.prev().attr('index');
                            if (itm_index == 'first') {
                                li_photo.attr('index', 'first');
                                li_photo.prev('index', '');
                                li_photo.prev().find('.operatBox').find('a:eq(1)').show();
                                li_photo.find('.operatBox').find('a:eq(1)').hide();
                            }
                            li_photo.after(li_photo.prev());
                        } else {
                            paginator(getSearchKey());
                        }
                    });
                }
            });
            if (firstPage) {
                li_photo.find('.operatBox').find('a:eq(1)').hide();
                firstPage = false;
            }
            //Sort Down
            li_photo.find('.operatBox').find('a:eq(2)').click(function () {
                if (!sort_state) {
                    photoSoftByClick(v.id, 1, function () {
                        if (li_photo.next()) {
                            var itm_index = li_photo.attr('index');
                            if (itm_index == 'first') {
                                li_photo.next().attr('index', 'first');
                                li_photo.attr('index', '');
                                li_photo.next().find('.operatBox').find('a:eq(1)').hide();
                                li_photo.find('.operatBox').find('a:eq(1)').show();
                            }
                            li_photo.before(li_photo.next());
                        } else {
                            paginator(getSearchKey());
                        }
                    });
                }
            });
        });

        chkIdClick();
    }
}

//photo soft by click
function photoSoftByClick(id, type, callback) {
    sort_state = true;
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'photosortbyclick', image_id:'" + id + "',type:'" + type + "'}",
        error: function (data) {
            sort_state = false;
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
            sort_state = false;
        }
    });
}

//图片id(string image_id),排序号(sequence_id),图片名称(image_name),图片描述(image_description),设为封面(setcover:0为取消,1为设定)

//Cancel Photo Album Cover
function updateImageProperty(id, sort_Id, name, desc, is_cancel_cover,callback) {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatephotoproperty', image_id:'" + id + "',image_name:'" + name + "'"
        + ",sequence_id:'" + sort_Id + "',image_description:'" + desc + "',setcover:'" + is_cancel_cover + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/* update album permsiion*/
function batchUpdatPhotoPermission(ids, permissionId, callback) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchupdatephotopermission', image_id:'" + ids + "',permission:'" + permissionId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

//change album of photo
function changeAlbumOfPhoto(ids, folderId, callback) {
    //changealbumofphoto
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'changealbumofphoto', image_id:'" + ids + "',folder_id:'" + folderId + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}

/*  Set Photo Be Cover */
function setPhotoBeCover(id, callback) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'setpersonalphotobecover', image_id:'" + id + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}

function DeletePhoto(ids,callback) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletepersonalphoto', image_id:'" + ids + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}

/** batch delete photo  **/
function batchDeletePhoto(ids,callback) {
    //batchdelepersonalphoto
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchdelepersonalphoto', image_id:'" + ids + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}

function getSearchKey() {
    var srcValue = $('.txtsrh').val();
    if (srcValue == $('.txtsrh').attr('inputdefault')) {
        srcValue = '';
    }
    return srcValue;
}