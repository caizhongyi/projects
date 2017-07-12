
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
                    var div_container = jQuery('<div class="album-box "></div>').appendTo(li);
                    if (v.share_key_id != '-1') {
                        li.addClass('album-sys');
                    }

                    div_container.append('<div class="album-label"></div>');
                    div_container.append($wd.format('<img alt="" class="album" src="{0}" style=" width: 205px; height: 145px;"/>', v.cover_path));
                    div_container.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>({1})</div>', v.folder_name, v.count));
              
                    li.click(function () {
                        showAlbum({ id: v.id, name: v.folder_name });
                    });


                });

                albumsScroll();
            }
        }
    });
}

function showAlbum(alb) {
    albumId = alb.id;
    var $alb = $('#albumopt').empty();
    $alb.append('<span class="album_name">' + alb.name + '</span>');
    
    if (!is_self) {
        var opt_transmit = jQuery('<a href="javascript:;" class="icon icon-file" rel="transmit"></a>').appendTo($alb);
        opt_transmit.transmit({ currType: "imgFolder", transId: alb.id })
    }

    var opt_print = jQuery('<a href="javascript:;" class="icon icon-print"></a>').appendTo($alb);
    opt_print.click(function () {
        var str = "{opertype:'personalphotoalubmprint',printfile:'personalphotoalbum', pagecurrent: 1,pageSize: 20,guest_id:'" + uid + "', folder_id:'" + albumId + "' }";
        window.open("../Common/print.aspx?jsonparam=" + str);
    });

    paginator();
}

function paginator() {
    $(".pageList").myPagination({
        // showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        //pagermore: true,
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: bindData,
        ajax: {
            url: 'manage_photoalbum.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'getphotoalbumphoto',
                guest_id: uid,
                folder_id: albumId
            }
        }
    });

}


function bindData(data) {
    var box = $('.preview_pic').empty();

    $.each(data.rows, function (i, v) {
        var li = jQuery('<li></li>').appendTo(box);
        var div_container = jQuery(' <div class="album-box "></div>').appendTo(li);
        div_container.append($wd.format('<img alt="" class="album" src="{0}" style=" width: 174px; height: 124px;" onclick="window.location=\'photo_view.html?albumid=' + albumId + '&photoid=' + v.id + (uid == '' ? '' : '&uid=' + uid) + '\';"/>', v.image_small_path));
        div_container.append($wd.format('<a href="photo_view.html?albumid=' + albumId + '&photoid=' + v.id + (uid == '' ? '' : '&uid=' + uid) + '" class="album-name" style="overflow:hidden;  white-space:nowrap">{0}</a>', v.image_name));
        div_container.append($wd.format('<div class="album-opt"></div>'));
        if (!is_self) {
            var opt_transmit = jQuery('<a href="javascript:;" class="icon icon-file" rel="transmit"></a>').appendTo(div_container.find('.album-opt'));
            opt_transmit.transmit({ currType: "img", transId: v.id });
        }
        div_container.find('.album-opt').append('<a href="javascript:;" class="icon icon-print"></a>');
        div_container.find('.icon-print').click(function () {
            var str = "{opertype:'personalphotoprint', printfile:'personalsinglephoto', printdatafile: 'PersonSQL', printdata_body: 'GetPersonalImageModelById', id:'" + v.id + "'}";
            window.open("../Common/print.aspx?jsonparam=" + str);
        });

        li.togglePhotoTip();

    });

}