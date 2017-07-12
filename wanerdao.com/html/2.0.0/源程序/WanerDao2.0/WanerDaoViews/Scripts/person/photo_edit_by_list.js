var msgTip = {

    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}

var albumId;
var firstPage = true;

var sort_state = false;
var albumArr = [];
$(function () {
    bindPTab(''); /*绑定功能选择卡*/

    albumId = getQueryString('albumId');

    if (albumId) {

        $('#photo_th').click(function () {
            window.location = 'photo_edit.html?albumid=' + albumId;
            return false;
        });

        $('input.btnsrh').click(function () {
            paginator($('input.txtsrh').val());
        });

        getAlbumList();

        /* bind permission*/
        getCurUserPermission(function (data) {
            if (data.result && data.rows) {
                $.each(data.rows, function (i, v) {
                    $('#selectPer').append($wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME));
                });

                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        //                        $('#selectPer').append('<option value="custom">自定义...</option>');
                    }
                });
            }

        });

        $('.photo_del').click(function () {
            var ids = getChkIds();
            if (ids) {
                batchDeletePhoto(ids);
            }
        });

        $('#selectPer').change(function () {
            if ($(this).val()) {
                var ids = getChkIds();
                if (ids) {
                    var perId = $(this).val();
                    $(this).val('');
                    batchUpdatPhotoPermission(ids, perId, function (data) {
                        if (data.result) {
                            alert(data.msg);
                        }
                    });
                } else {
                    $(this).val('');
                    alert(wanerdaoLangTip('photo_00001'));
                }
            }
        });

        $('#selectFoder').change(function () {
            if ($(this).val()) {
                var ids = getChkIds();
                if (ids) {
                    var folderId = $(this).val();
                    $(this).val('');

                    changeAlbumOfPhoto(ids, folderId, function (data) {
                        if (data.result) {
                            alert(data.msg);
                        }
                        $('#selectFoder').val('');
                        $('.chkAll').attr('checked', false);
                        paginator('');
                    });
                } else {
                    $(this).val('');
                    alert(wanerdaoLangTip('photo_00001'));
                }
            }

        });
    }
    else {
        location.href = 'photo_album_manage.html';

    }

    chkAllClick();
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('ul.albums');
                $('.album_count').html('(' + data.rows.length + ')');
                var fName;
                var vCount;
                $.each(data.rows, function (i, v) {
                    if (v.id == albumId) {
                        fName = v.folder_name;
                        vCount = v.count;
                    }
                    /* cache album list */
                    albumArr.push({ id: v.id, name: v.folder_name });

                    var li = jQuery('<li></li>').appendTo(box);
                    if (v.share_key_id == '-1') {
                        li.addClass('pers_bgc');
                    } else {
                        li.addClass('acti_bgc');
                    }
                    var div = jQuery('<div class="pers"></div>').appendTo(li);
                    div.append($wd.format('<div class="pic"><a href="javascript:;"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', v.cover_path));
                    div.append($wd.format('<div class="bm_info"><label>{0}</label><i>({1})</i></div>', v.folder_name, v.count));
                    div.append('<div class="per_hr_ico"></div>');
                    li.toggleAlbumTypeTip();
                    li.click(function () {
                        bindAlbums(v.id, v.folder_name, v.count);
                        return false;
                    });

                    if (albumId.toLowerCase() != v.id.toLowerCase()) {
                        $('#selectFoder').append($wd.format('<option value="{0}">{1}</option>', v.id, v.folder_name));
                    }
                    ///////////////////////////////////////////////////

                });

                bindAlbums(albumId, fName, vCount); //bind album
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
    $('#selectFoder').append('<option value="">移动到</option>');
    $.each(albumArr, function (i, v) {
        if (v.id != albId) {
            $('#selectFoder').append('<option value="' + v.id + '">' + v.name + '</option>');
        }
    });
    albumId = albId;
    paginator('');
    var firstPage = true;
}



function paginator(key) {
    $(".alb_nav").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
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

function bindData(data) {
    var box = $('.pe_list').children('ul').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li = jQuery('<li></li>').appendTo(box);
            li.append($wd.format('<div class="ckBox"><input type="checkbox" class="chkId" value="{0}"/></div>', v.id));

            li.append($wd.format('<div class="pic"><img src="{0}" alt="" style=" width: 132px; height: 108px;" /></div>', v.image_small_path));

            var div_data = jQuery('<div class="form_data"></div').appendTo(li);
            div_data.append($wd.format('<div class="txt_w">'
                                    + '<div class="ser_num"><span class="tit">序号：</span></div>'
                                    + '<div class="name"><span class="tit"><span class="tit">名称：</span></span></div>'
                                    + '<div class="date">上传时间：{0}</div>'
                               + '</div>'
                               + '<div class="txa_w"><span class="tit">描述：</span></div>'
                               , DateFormat(v.upload_date, 'yyyy/MM/dd')));
            //Image Sort
            var input_seq = jQuery('<input type="text" class="txt_c3" />');

            input_seq.val(v.sequence);

            input_seq.blur(function () {

                //updateImageProperty(v.id,$(this).val(),'','','');//排序
            });

            div_data.find('.tit:eq(0)').after(input_seq);

            //Image Name
            var input_title = jQuery('<input type="text" class="txt_c3" />');
            input_title.val(v.image_name);

            input_title.blur(function () {
                updateImageProperty(v.id, '', $(this).val(), '', ''); //修改标题
            });

            div_data.find('.tit:eq(1)').after(input_title);

            //Image description
            var textarea_desc = jQuery('<textarea name="" id="" cols="30" rows="10" class="txa_c3"></textarea>');
            textarea_desc.val(v.description);
            div_data.find('.tit:eq(3)').after(textarea_desc);

            textarea_desc.blur(function () {
                updateImageProperty(v.id, '', '', $(this).val(), ''); //修改描述
            });

            li.append('<div class="hover_box"><a href="javascript:;" class="cover"></a><a href="javascript:;" class="upload"></a><a href="javascript:;" class="download"></a></div>');

            //Set Cover
            li.find('.hover_box').find('a:eq(0)').click(function () {
                setPhotoBeCover(v.id, function () {
                    li.parent().find('.cover_on').each(function () {
                        $(this).css('display', 'none');
                        $(this).parent().find('.hover_box').find('a:eq(0)').show();
                    });

                    li.find('.hover_box').find('a:eq(0)').hide();
                    li.find('.cover_on').show();
                });
            });
            //Sort UP
            li.find('.hover_box').find('a:eq(1)').click(function () {
                if (!sort_state) {
                    photoSoftByClick(v.id, 0, function () {

                        li.after(li.prev());
                    });
                }
            });
            if (firstPage) {
                li.find('.hover_box').find('a:eq(1)').hide();
                firstPage = false;
            }
            //Sort Down
            li.find('.hover_box').find('a:eq(2)').click(function () {
                if (!sort_state) {
                    photoSoftByClick(v.id, 1, function () {
                        //alert(li_clone);
                        li.before(li.next());
                        //                        var li_clone = li;
                        //                        li = li.next();
                        //                        li = li_clone;
                        //                        alert(li_clone.html());
                    });
                }
            });

            var div_cover = jQuery('<div class="cover_on"></div>').appendTo(li);
            if (v.is_cover.toLowerCase() == 'true') {
                li.find('.hover_box').find('a:eq(0)').hide();
            } else {
                div_cover.css('display', 'none');
            }
            div_cover.click(function () {
                updateImageProperty(v.id, '', '', '', 0, function (data) {
                    if (data.result) {
                        div_cover.css('display', 'none');
                        div_cover.parent().find('.hover_box').find('a:eq(0)').show();
                    }
                });
            });

            li.bind("mouseenter mouseleave", function () {
                $(this).toggleClass("hover");
            })

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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
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
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}

function DeletePhoto(ids) {
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletepersonalphoto', image_id:'" + ids + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}

/** batch delete photo  **/
function batchDeletePhoto(ids) {
    //batchdelepersonalphoto
    $.ajax({
        url: "../edit_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'batchdelepersonalphoto', iamge_id:'" + ids + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
        }
    });
}