var activity_id = "4566777";
var userIds = "28dfaf0b31824f6598bf06f2986a3ecc";
var pagecurrent = 1;
var albumId;
var albumArr = [];
var firstPage = true;

if (getQueryString("activity_id") != null && getQueryString("activity_id") != "undefined") {
    activity_id = getQueryString("activity_id");
}
$(function () {
    albumId = getQueryString('albumId');
    getAlbumList();
});

/*相册列表*/
function getAlbumList() {
    $.ajax({
        url: "albumedit_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivityimagefolder', pagecurrent:1,isSearchBlock: '1',orderByFileds:'',sort:'',activityIds: '" + activity_id + "', pageSize:1000000,searchType: '11',userIds: '" + userIds + "'}",
        error: function (data) {
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('ul.albums');
                //$('.album_count').html('(' + data.total + ')');
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
                    var div_container = jQuery('<div class="album-box "></div>').appendTo(li);
                    //                    if (v.share_key_id != '-1') {
                    //                        li.addClass('album-sys');
                    //                    }

                    div_container.append('<div class="album-label"></div>');
                    div_container.append($wd.format('<img alt="" class="album" src="{0}" style=" width: 205px; height: 145px;"/>', v.image_small_path));
                    div_container.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>({1})</div>', v.folder_name, v.image_count));

                    li.click(function () {
                        bindAlbums(v.id, v.folder_name, v.image_count);
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

//                bindAlbums(albumId, fName, vCount); //bind album
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
    $('#selectFoder').chosen();
    albumId = albId;
    Paginate();
    var firstPage = true;
}

/*album list scroll*/
function albumsScroll() {
    $(".scrTop_pic li").bind("mouseenter mouseleave", function () {
        $(this).find(".per_hr_ico").toggle();
    })
    var arrTop = $(".scroll_pic_wp").find(".arr_top");
    var arrBm = $(".scroll_pic_wp").find(".arr_bm");
    var _list = $(".scrTop");
    var _li = _list.children();
    var _plas = _li.size() - 4;
    arrTop.click(function () {
        if (!_list.is(":animated")) {
            if (!parseInt(_list.css("top")) == "0") {
                _list.animate({ top: "+=205" })
            }
        }
    })
    arrBm.click(function () {
        if (!_list.is(":animated")) {
            if (-parseInt(_list.css("top")) == _plas * 205) {
                return false;
            }
            else {
                _list.animate({ top: "-=205" });
            }
        }
    })
}

function Paginate() {
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: bindData,
        ajax: {
            url: 'photo_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getactivityimagebyfoldid',
                folder_id: albumId
            }
        }
    });
}

function bindData(data) {
    var box = $('.photoListMain').empty();
    if (data.result && data.rows) {
        $.each(data.rows, function (i, v) {
            var li_photo = jQuery('<li></li>').appendTo(box);
            var table_box = jQuery('<table width="708" border="0" cellspacing="0" cellpadding="0"></table>').appendTo(li_photo);

            var tr_1 = jQuery('<tr></tr>').appendTo(table_box);
            tr_1.append('<td width="40"  align="center" rowspan="2"><input type="checkbox" name="" id="" /></td>');
            tr_1.append('<td width="140" align="center" rowspan="2"><img src="' + v.image_small_path + '" width="130" height="106" alt="" /></td>');
            tr_1.append('<td>序号：<input type="text" class="text" name="" id="" style="width:45px;" />'+
                         '&nbsp;&nbsp;名称：<input type="text" class="text" name="' + v.image_name + '" id="" />');
            tr_1.append('<td width="140">上传时间：' + v.upload_date + '</td>');

            var tr_2 = jQuery('<tr></tr>').appendTo(table_box);
            tr_2.append('<td align="left">描述：<textarea cols="30" rows="4" style="vertical-align:text-top;"></textarea></td>'
                + '<td><div class="operatBox"><a href="javascript:;" class="disable" title="禁用">禁用</a><a href="javascript:;" class="moveUp" title="上移">上移</a><a href="javascript:;" class="moveDown" title="下移">下移</a> </div></td>');
           //排序 //排序
            var photo_seq = li_photo.find('.photoSort');
            photo_seq.val(v.sequence);
            photo_seq.attr('title', v.sequence);
            photo_seq.blur(function () {
                updateImageProperty(v.id, $(this).val(), '', '', '', function () {
                    if (data.result) {
                        photo_seq.attr('title', photo_seq.val());
                    } else {
                        photo_seq.val(photo_seq.attr('title'));
                    }
                });
            });

            //Image Name//修改标题
            var photo_name = li_photo.find('.photoName');
            photo_name.val(v.image_name);
            photo_name.attr('title', v.image_name);
            photo_name.blur(function () {
                if (/^\d+$/.test($(this).val())) {
                    updateImageProperty(v.id, '', $(this).val(), '', '', function () {
                        if (data.result) {
                            photo_name.attr('title', photo_name.val());
                        } else {
                            photo_name.val(photo_name.attr('title'));
                        }
                    });
                }

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
                    li_photo.parent().find('.pic-flag').each(function () {
                        $(this).css('display', 'none');
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
                        li_photo.after(li_photo.prev());
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
                        li_photo.before(li_photo.next());
                    });
                }
            });



        });

        //chkIdClick();
    }
}
