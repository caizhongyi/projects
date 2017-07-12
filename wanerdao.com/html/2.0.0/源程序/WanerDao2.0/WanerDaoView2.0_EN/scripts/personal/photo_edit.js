var albumId;
$(function () {
    bindPTab('');

    albumId = getQueryString('albumId');
    if (albumId) {
        $('#photo_list').click(function () {
            window.location = 'photo_edit_by_list.html?albumid=' + albumId;
            return false;
        });

        getAlbumList();

        $('input.btnsrh').click(function () {
            var srcValue = $('.txtsrh').val();
            if (srcValue == $('.txtsrh').attr('inputdefault')) {
                srcValue = '';
            }
            paginator(srcValue);
        });
    }
    else {
        location.href = 'photo_album_manage.html';
    }
    $(".miList li").live('mouseover', function () {
        $(this).addClass("on");
    }).live('mouseout', function () {
        $(this).removeClass("on");
    });
});

var albumArr = [];
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
                $.each(data.rows, function (i, v) {
                    if (v.id == albumId) {
                        bindAlbums(v.id, v.folder_name, v.count);
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
                    div_container.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>({1})</div>', v.folder_name, v.count));

                    li.click(function () {
                        bindAlbums(v.id, v.folder_name, v.count);
                        return false;
                    });
                });

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
    albumId = albId;
    paginator();
    var firstPage = true;
}

function paginator() {
    $('#items').empty().html('loading...');
    $.ajax({
        url: '../manage_photoalbum.axd',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getphotoalbumphoto',pagecurrent:1,pageSize:10000,folder_id:'" + albumId + "'}",
        error: function () {
        },
        success: function (data) {
            if(data.result)bindData(data);
        }
    });


}

var listIndex=[];
function bindData(data) {
    var box = $('#photoItems').empty();
    var pageIndex = 0;
    var p_Index_box;
    $.each(data.rows, function (i, v) {
        listIndex.push(v.id);
        if (i % 8 == 0) {
            pageIndex++;
            p_Index_box = jQuery('<div class="album-list clearfix" style=" width: 705px; height: 280px;"><h3>Page&nbsp;' + pageIndex + '</h3><ul></ul></div>').appendTo(box);
        }
        var li = jQuery('<li photoid="' + v.id + '"><span class="album-zoom"></span><img alt="" src="' + v.image_small_path + '"/></li>').appendTo(p_Index_box.find('ul'));
    });

    enableDrag();
}

function enableDrag() {
    var oExample = new PhotoWall(d$('photoItems'), [], function (drag_id, target_id, _callback) {
        if (drag_id != target_id) {
            photoSortByDrag(drag_id, target_id, function (data) {
                if (data.result) {
                    _callback(true);
                } else {
                    _callback(false);
                }
            });
        } else {
            _callback(false);
        }
    });

//    window.onresize = null;
//    window.onresize = function () {
//        oExample.changeLayout()
//    };
//    window.onresize();
}

//照片拖动排序 photosortbydrag
function photoSortByDrag(image_Id, target_Id, callback) {
    var zz = jQuery('<div id="zz"></div>').css({ 'position': 'absolute', 'z-index': '59999', 'width': $(document).width() + 'px', 'height': $(document).height() + 'px', 'background': '#333', 'top': '0', 'left': '0', 'fiter': 'alpha(opacity=50)', 'opacity': '0.5','text-align':'center','color':'#fff','font-size':'20px', 'line-height':'200px' }).appendTo($('body'));
    zz.html('请稍等，正在保存...');

    $.ajax({
        url: '../manage_photoalbum.axd',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: "{opertype:'photosortbydrag',image_id:'" + image_Id + "',target_image_id:'" + target_Id + "'}",
        error: function () {
        },
        success: function (data) {
            if (callback) callback(data);
            zz.remove();
        }
    });
}