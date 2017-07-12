var msgTip = {

    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}

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

function paginator() {
    $('#items').empty().html('正在加载。。。');
    $.ajax({
        url: '../manage_photoalbum.axd',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: "{opertype:'getphotoalbumphoto',pagecurrent:1,pageSize:16,folder_id:'" + albumId + "'}",
        error: function () {
        },
        success: function (data) {
            if(data.result)bindData(data);
        }
    });


}

var listIndex=[];
function bindData(data) {
    var box = $('#items').empty();

    $.each(data.rows, function (i, v) {
        listIndex.push(v.id);
        var li = jQuery('<li class="sortableitem" photoid="'+v.id+'"></li>').appendTo(box);
        li.append('<img src="' + v.image_small_path + '" width="142" height="100" />');
        li.append('<a href="javascript:void(0);"></a><ins></ins>');
    });
   
    enableSort();
}

function enableSort() {
    $('.pList').find('ul').dragsort({ dragSelector: "img", dragBetween: false, dragEnd: saveOrder, placeHolderTemplate: "<li class='placeHolder'><div></div></li>" });
    
    
}
function saveOrder(o) {
    //获取最新排序列表
    var newList = [];
    var newIndex = $("#items li").map(function (i) { return $(this).attr('photoid'); }).get();

    var firstObj = null;
    var lastObj = null;
    var first_UnQue_Index = -1; //
    //获取位置不同的列表
    var dirrentList = [];
    $.each(listIndex, function (i, v) {
        if (newIndex[i] != v) {
            dirrentList.push(newIndex[i]);
            if (first_UnQue_Index == -1) {
                first_UnQue_Index = i;
                firstObj = $('#items').find('li[photoid="' + v + '"]');
            }
        }
    });

    lastObj = $('#items').find('li[index="' + dirrentList[dirrentList.length - 1] + '"]');

    //判断排序方向，获取拖动的照片编号，和替换目标编号
    var dir; //方向
    var drag_id;
    var target_id;

    if (listIndex[first_UnQue_Index] == dirrentList[dirrentList.length - 1] && listIndex[first_UnQue_Index + 1] == dirrentList[0]) {//排序号变大,向下
        drag_id = dirrentList[dirrentList.length - 1];
        target_id = dirrentList[dirrentList.length - 2];
        dir = 'down';
    }
    else {
        drag_id = dirrentList[0];
        target_id = dirrentList[1];
        dir = 'up';

    }
    if (dirrentList.length >= 2) {
        //提交
        photoSortByDrag(drag_id, target_id, function (data) {
      
            if (data.result) {
               
                listIndex = newIndex;
            } else {
                //排序失败
                if (dir == 'down') {
                    $('#items').find('li[photoid="' + dirrentList[0] + '"]').before($('#items').find('li[photoid="' + drag_id + '"]'));
                } else {
                    $('#items').find('li[photoid="' + dirrentList[dirrentList.length - 1] + '"]').after($('#items').find('li[photoid="' + drag_id + '"]'));
                }
            }
        });
    }
}


//照片拖动排序 photosortbydrag
function photoSortByDrag(image_Id, target_Id, callback) {
    var zz = jQuery('<div id="zz"></div>').css({ 'position': 'absolute', 'z-index': '59999', 'width': $(document).width() + 'px', 'height': $(document).height() + 'px', 'background': '#009', 'top': '0', 'left': '0', 'fiter': 'alpha(opacity=50)', 'opacity': '0.5','text-align':'center','color':'#fff','font-size':'20px', 'line-height':'200px' }).appendTo($('body'));
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