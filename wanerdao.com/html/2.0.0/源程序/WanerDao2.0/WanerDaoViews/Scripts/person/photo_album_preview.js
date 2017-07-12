var msgTip = {

    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}

var albumId;
var uid;
$(function () {
    albumId = getQueryString('albumId');
    uid = getQueryString('uid');
    if (!uid) uid = '';
    bindPTab(uid);

    if (albumId) {
        getAlbumList();

    }
    else {
        location.href = 'photo_album.html';

    }
});


/*相册列表*/
function getAlbumList() {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumlist', pagecurrent:1, pageSize:1000000, guest_id:'" + uid + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                var box = $('ul.albums');
                $('.album_count').html('(' + data.rows.length + ')');

                $.each(data.rows, function (i, v) {
                    if (v.id.toLowerCase() == albumId) {
                        showAlbum({ id: v.id, name: v.folder_name });
                    }

                    var li = jQuery('<li></li>').appendTo(box);
                    if (v.share_key_id == '-1') {
                        li.addClass('pers_bgc');
                    } else {
                        li.addClass('acti_bgc');
                    }
                    var div = jQuery('<div class="pers"></div>').appendTo(li);
                    div.append($wd.format('<div class="pic"><a href="javascript:;"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', v.cover_path));
                    div.append($wd.format('<div class="bm_info"><label>{0}</label><i>({1})</i></div>', v.folder_name, v.count));
                    div.append('<div class="per_hr_ico" ></div>');
                    li.click(function () {
                        showAlbum({ id: v.id, name: v.folder_name });
                    });

                }); albumsScroll();
            }
        }
    });
}

function showAlbum(alb) {
    albumId = alb.id;
    $('.album_name').html(alb.name);
    paginator();
}

function paginator() {
    $(".alb_nav").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: bindData,
        ajax: {
            url: 'manage_photoalbum.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getphotoalbumphoto',
                user_id: uid,
                folder_id: albumId
            }
        }
    });

}


function bindData(data) {
    var box = $('.preview_pic').empty();
    
    $.each(data.rows, function (i, v) {
        var li = jQuery('<li></li>').appendTo(box);
        var div = jQuery('<div class="pers"></div>').appendTo(li);
        div.append($wd.format('<div class="pic"><a href="javascript:;" onclick="location.href=\'photo_view.html?albumid=' + albumId + '&photoid=' + v.id + (uid == '' ? '' : '&uid=' + uid) + '\';"><img src="{0}" alt="" style="width:176px; height:126px;" /></a></div>', v.image_small_path));
        div.append('<div class="bm_info"><a href="#" class="pri"></a><a href="#" class="doc"></a><label>' + v.image_name + '</label></div>');
        
        li.togglePhotoTip();

    });

}