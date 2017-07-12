var msgTip = {
    reply_content_null: '请输入回复内容',
    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}


var albumId;
var photoId;
var uid;
var pList = [];
var currentIndex = 0;
$(function () {
    albumId = getQueryString('albumId');
    photoId = getQueryString('photoId');
    uid = getQueryString('uid');
    if (!uid) uid = '';
    bindPTab(uid);

    if (albumId) {
        getAlbumList();
    }
    else {
        location.href = 'photo_album.html';
    }

    $('.reply').click(function () {
        var txt = $('.txt').val();
        if (txt) {
            addPhotoComment(photoId, txt, '', $('.txt'));
        } else {
            new pop({ typename: 'warning',
                msginfo: wanerdaoLangTip('video_00009')
            });
        }
    });

    $('.cancle').click(function () {
        $('.txt').val('');
    });
});


/* get album list*/
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
                        showAlbumPhoto(v.id, v.folder_name);
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
                        showAlbumPhoto(v.id, v.folder_name);
                    });
                });

                albumsScroll(); /* album list scroll*/
            }
        }
    });
    photoScroll(); //滚动
}

/*show album photo*/
function showAlbumPhoto(alId, albName) {
    albumId = alId;

    $('#photo').find('img').parent().hide();

    var $alb = $('#albumopt').empty();
    $alb.append('<span class="album_name">' + albName + '</span>');

    if (!is_self) {
        var opt_transmit = jQuery('<a href="javascript:;" class="icon icon-file" rel="transmit"></a>').appendTo($alb);
        opt_transmit.transmit({ currType: "imgFolder", transId: albumId })
    }

    var opt_print = jQuery('<a href="javascript:;" class="icon icon-print"></a>').appendTo($alb);
    opt_print.click(function () {
        var str = "{opertype:'personalphotoalubmprint',printfile:'personalphotoalbum', pagecurrent: 1,pageSize: 20,guest_id:'" + uid + "', folder_id:'" + albumId + "' }";
        window.open("../Common/print.aspx?jsonparam=" + str);
    });
    
    $('.photo_detail').empty();
    $('.flashBox').find('div').empty();
    $('.replay-content').remove();
    $(".icon-talk").unbind("click");
    $('.vedio-tabs,.vedio-info').hide();

    getPhotoListByAlbum();
}

/* get photo list by album */
function getPhotoListByAlbum() {
    $.ajax({
        url: "../preview_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getphotoalbumphoto', pagecurrent:1, pageSize:1000000, folder_id:'" + albumId + "', guest_id:'" + uid + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            var box = $('.vedio-panel').empty();
            currentIndex = 0;
            pList = [];
            if (data.result) {
                $.each(data.rows, function (i, v) {
                    pList.push({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    //display current photo
                    if (photoId && v.id == photoId) {
                        setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    } else {
                        if (i == 0) {
                            setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                        }
                    }

                    var li = jQuery('<li style="float: left;" ></li>').appendTo(box);
                    li.append('<a href="javascript:;"><img src="' + v.image_small_path + '" alt="" style=" width: 205px; height: 145px;"><span class="icon player-icon" href="javascript:;"></span></a>');
                    li.append('<div class="vedio-name"><a href="javascript:;">' + v.image_name + '</a></div>');
                    li.click(function () {
                        setPhoto({ id: v.id, path: v.image_path, name: v.image_name, date: v.upload_date, desc: v.description, index: i });
                    });
                });
                new $.ui.tabs('.vedio-tabs', {
                    effect: 'x',
                    widget: {
                        panel: '.vedio-panel',
                        clip: '.vedio-clip',
                        prev: '.vedio-prev',
                        next: '.vedio-next'
                    }

                });

            }
        }
    });
}

function setPhoto(model) {
    $('.vedio-tabs, .vedio-info').show();
    $('.replay-content').remove();
    currentIndex = model.index;
    photoId = model.id;
    $('#photo').find('img').attr('src', model.path).parent().show();
    var photo_detail = $('.photo_detail').empty();
    photo_detail.append(model.name + '&nbsp;&nbsp;(' + getLocationDateString(model.date, 'yyyy/MM/dd') + ')&nbsp;&nbsp;');

    ///
    if (!is_self) {
        var opt_transmit = jQuery('<a href="javascript:;" class="icon icon-file" rel="transmit"></a>').appendTo(photo_detail);
        opt_transmit.transmit({ currType: "img", transId: model.id })
    }

    photo_detail.append('&nbsp;&nbsp;<a href="javascript:;" class="icon icon-save" style="display:none;"></a>&nbsp;&nbsp;<a href="javascript:;" class="icon icon-print"></a>');
    photo_detail.find('.icon-print').click(function () {
        var str = "{opertype:'personalphotoprint', printfile:'personalsinglephoto', printdatafile: 'PersonSQL', printdata_body: 'GetPersonalImageModelById', id:'" + model.id + "'}";
        window.open("../Common/print.aspx?jsonparam=" + str);
    });
    //selectpersonalimagebyimageid personalsinglephoto
    ///
    photo_detail.next('p').html(model.desc);

    //留言
    $(".icon-talk").unbind("click").click(function () {
        $(".info-opt").replycontent({
            posts_id: model.id, //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
            getreply:
            {
                getreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                getreplyop: 'photosinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            deletereply:
            {
                delreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                delreplyop: 'delsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            addreply:
            {
                addreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                addreplyop: 'addsinglemessage'//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            loadrecordlimit: 5, //加载条数限制
            replyconfig: {
                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        });
    });
}


/** add photo comment **/
function addPhotoComment(photo_id, content, followId) {
    $.ajax({
        url: "../view_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'addphotocomment', id:'" + photo_id + "',content:'" + content + "',followId:'" + followId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
                arguments[3].val('');
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
            }
        }
    });
}

/** delete photo comment **/
function deletePhotoCommentById(imageId) {
    //deletephotocommentbyid
    $.ajax({
        url: "../view_photoalbum.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'deletephotocommentbyid', image_id:'" + imageId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {

        }
    });
}



/*album list scroll*/
function photoScroll() {
    var arrLeft = $(".ph_sPic_wp").find(".scr_lt");
    var arrRight = $(".ph_sPic_wp").find(".scr_rt");
    var pre = $('#photo').find('.pager-prev');
    var next = $('#photo').find('.pager-next');

    //    var _list = $('div.ph_sPic').find('ul');
    //    var _li = _list.children();
    //    var _plas = _li.size() - 4;

    //    arrLeft.click(function () {
    //        if (!_list.is(":animated")) {
    //            if (_plas > 0) {
    //                if (!parseInt(_list.css("left")) == "0") {
    //                    _list.animate({ left: "+=160" })
    //                }
    //            }
    //        }
    //    })
    //    arrRight.click(function () {
    //        if (!_list.is(":animated")) {
    //            if (_plas > 0) {
    //                if (-parseInt(_list.css("left")) >= _plas * 160) {
    //                    return false;
    //                }
    //                else {
    //                    _list.animate({ left: "-=160" });
    //                }
    //            }
    //        }
    //    })

    //    $('.big_pic_wp').find('.scr_lt,.scr_rt').hover(function () {
    //        $(this).addClass('hover');
    //    }, function () {
    //        $(this).removeClass('hover');
    //    });

    pre.click(function () {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;

            setPhoto(pList[currentIndex]);
        }

        //        if (!_list.is(":animated")) {
        //            if (_plas > 0) {
        //                if (!parseInt(_list.css("left")) == "0") {
        //                    _list.animate({ left: "+=160" })
        //                }
        //            }
        //        }
    });

    next.click(function () {
        if (currentIndex < pList.length - 1) {
            currentIndex = currentIndex + 1;

            setPhoto(pList[currentIndex]);
        }

        //        if (!_list.is(":animated")) {
        //            if (_plas > 0) {
        //                if (-parseInt(_list.css("left")) >= _plas * 160) {
        //                    return false;
        //                }
        //                else {
        //                    _list.animate({ left: "-=160" });
        //                }
        //            }
        //        }
    });
}

