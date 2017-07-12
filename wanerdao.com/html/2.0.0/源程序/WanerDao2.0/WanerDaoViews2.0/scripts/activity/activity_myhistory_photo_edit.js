var activity_id = "4566777";
var pagecurrent = 1;
var firstPage = true;
var lastPage = true;
var sort_state = false;
var albumArr = [];
var t;
if (getQueryString("id") != null && getQueryString("id") != "undefined") {
    activity_id = getQueryString("id");
    $("#viewalbum").attr("href", $("#viewalbum").attr("href").replace("{0}", activity_id));
    $("#gobackindex").attr("href", $("#gobackindex").attr("href").replace("{0}", activity_id));
    $("#uploadalbum").attr("href", $("#uploadalbum").attr("href").replace("{0}", activity_id));
    $("#viewmanagerblog").attr("href", $("#viewmanagerblog").attr("href").replace("{0}", activity_id));
}
$(function () {   
   getAlbumList();
});

/*相册列表*/
function getAlbumList() {
    $.ajax({
        url: "albumedit_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getactivitymanageimagetotal', activityIds: '" + activity_id + "'}",
        error: function (data) {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip('common_00001') });
        },
        success: function (data) {
            if (data.result && data.rows.length > 0) {
                $("#albumtotal").html(data.rows[0].imgfoldertotal);
                $("#photototal").html(data.rows[0].imgtotal);
                t = data.rows[0].t;
                if (t === "1") {
                    ajaxfunc("historyablum_common.axd", "{opertype:'getactivityimagefolder',activityIds:'" + activity_id + "',pagecurrent:1,pageSize: 50,searchType: '25',isSearchBlock: '0',orderByFileds:'',sort: ''}", function (data) {
                    }, _bindAlbums);
                }
                else {
                    ajaxfunc("historyablum_common.axd", "{opertype:'getactivitymanagebygstaff',activityIds:'" + activity_id + "'}", function (data) {
                    }, _bindAlbums);
                }
            }
        }
    });
}
function _bindAlbums(data) {
    var box = $('ul.album-panel').empty();
    $.each(data.rows, function (i, msg) {
        albumArr.push({ id: msg.id, name: msg.folder_name, ftype: msg.folderType, imagenum: msg.image_count });
        if (i === 0) {
            setPhoto({ id: msg.id, name: msg.folder_name, ftype: msg.folderType, imagenum: msg.image_count });
        }
        var imagepath = "../images/default/album.png"; //默认图片
        if (msg.image_small_path != "") {
            imagepath = msg.image_small_path;
        }
        var li = $('<li></li>').appendTo(box);
        li.click(function () {
            setPhoto({ id: msg.id, name: msg.folder_name, ftype: msg.folderType, imagenum: msg.image_count });
        });
        var content = null;
        switch (msg.folderType) {
            case "1":
                content = $("<div class=\"album-box\"></div>").appendTo(li);
                content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                content.append($wd.format('<label class="album-name">{0}({1})</label>', msg.folder_name, msg.image_count));
                break;
            case "2":
                content = $("<div class=\"album-box album-sys\"></div>").appendTo(li);
                content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                content.append($wd.format('<label class="album-name">{0}({1})</label>', subPoints(msg.folder_name, 8), msg.image_count));
                break;
            case "3":
                content = $("<div class=\"album-box album-share\"></div>").appendTo(li);
                content.append($wd.format('<div class="album-label"></div><img alt="{1}" class="album" src="{0}" style="width:204px; height:145px;"/>', imagepath, msg.folder_name));
                content.append($wd.format('<label class="album-name">{0}({1})</label>', msg.folder_name, msg.image_count));
                break;
        }
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
}
function setPhoto(model) {
    _delAlbumAction(model.id)
    _searchphotos(model.id);
    _deletepohotos(model.id);
    _blockphotos(model.id);
    btnAllSelect();
    $("#spanalbumname").html(model.name);
    $("#span2").html(model.imagenum);
    if (model.ftype === "2") {
        $("#delAlbumAction").hide();
    }
    else if (model.ftype === "3") {
        $("#disableAlbumAction").show();
    }
    else {
        $("#delAlbumAction").show();
    }    
    ajaxfunc("historyablum_common.axd", "{opertype:'getactivityimagecount',folder_id:'" + model.id + "'}", function (data) {
    }, function (data) {
        if (data.result) {
            $("#span1").html(data.rows[0].imagetotal);
            if (t === "1") {
                Paginate('getactivityimagebyadmin', model.id);
            }
            else {
                Paginate('getactivityimagebyfoldidanduserid', model.id);
            }
        }
    });
}
function _delAlbumAction(ablumId) {
    $("#delAlbumAction,#disableAlbumAction").unbind("click").click(function () {
        new pop({ titleid: 'common_00023', typename: 'confirm',
            msginfo: wanerdaoLangTip('common_00036'),
            callback: function () {
                ajaxfunc('albumbrowse_common.axd', "{opertype:'deleteactivityimagefolder',folder_id:'" + ablumId + "'}", function (data) {
                }, function (data) {
                    if (data.result) {
                        new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg });
                        //重新加载
                        location.reload(true);
                    }
                    else {
                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                    }
                });
            }
        });
    });
}
function Paginate(op, albumId) {
    firstPage = true;
    lastPage = true;
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: bindData,
        ajax: {
            url: 'photo_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: op,
                folder_id: albumId,
                searchkey: getSearchKey()
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
function _updateImageProperty(id, imagesproperty, callback) {
    $.ajax({
        url: "../preview_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatephotoproperty', id:'"+id+"'," + imagesproperty + "}",
        error: function (data) {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip('common_00001') });
        },
        success: function (data) {
            if (callback) callback(data);
        }
    });
}
function _blockphotos(ablumid) {
    $('#blkphotos').unbind("click").click(function () {
        var ids = getChkIds();
        if (ids.length > 0) {
            new pop({ titleid: 'common_00023', typename: 'confirm',
                msginfo: wanerdaoLangTip('common_00081'),
                callback: function () {
                    ajaxfunc('albumbrowse_common.axd', "{opertype:'blockimageidrange',id:'" + ids + "'}", function (data) {
                    }, function (data) {
                        if (data.result) {
                            new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg });
                            if (t === "1") {
                                Paginate('getactivityimagebyadmin', ablumid);
                            }
                            else {
                                Paginate('getactivityimagebyfoldidanduserid', ablumid);
                            }
                        }
                        else {
                            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                        }
                    });
                }
            });
        }
        else {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip('common_00004') });
        }
    });
}
function _searchphotos(ablumid) {
    $(".btnsrh").unbind("click").click(function () {
        if (t === "1") {
            Paginate('getactivityimagebyadmin', ablumid);
        }
        else {
            Paginate('getactivityimagebyfoldidanduserid', ablumid);
        }
    });    
}
function getChkIds() {
    var ids = '';
    $('.photoListMain :checkbox').each(function () {
        if ($(this).attr('checked')) {
            if (ids) ids += ',';
            ids += $(this).attr("id");
        }
    });
    //ids = ids.substring(0, ids.length - 1);
    return ids;
}
function btnAllSelect() {
    $("#chkAllSelect").unbind("click").click(function () {
        if ($(this).attr("checked")) {
            $('.photoListMain :checkbox').each(function () {
                if (!$(this).attr('checked')) {
                    $(this).attr('checked', true);
                }
            });
        }
        else {
            $('.photoListMain :checkbox').each(function () {
                if ($(this).attr('checked')) {
                    $(this).attr('checked', false);
                }
            });
        }
    });
}
function _deletepohotos(ablumid) {
    $('#delphotos').unbind("click").click(function () {
        var ids = getChkIds();
        if (ids.length > 0) {
            new pop({ titleid: 'common_00023', typename: 'confirm',
                msginfo: wanerdaoLangTip('common_00036'),
                callback: function () {
                    ajaxfunc('albumbrowse_common.axd', "{opertype:'deleteimageidrange',id:'" + ids + "'}", function (data) {
                    }, function (data) {
                        if (data.result) {
                            new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg });
                            if (t === "1") {
                                Paginate('getactivityimagebyadmin', ablumid);
                            }
                            else {
                                Paginate('getactivityimagebyfoldidanduserid', ablumid);
                            }
                        }
                        else {
                            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                        }
                    });
                }
            });
        }
        else {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip('common_00004') });
        }
    });
}
function photoSoftByClick(id,secondid, type, callback) {
    sort_state = true;
    $.ajax({
        url: "albumbrowse_common.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'photosortbyclick', image_id:'" + id + "',secondid_image_id:'" + secondid + "',type:'" + type + "'}",
        error: function (data) {
            sort_state = false;
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
        },
        success: function (data) {
            if (data.result) {
                if (callback) callback();
            }
            sort_state = false;
        }
    });
}
//paginator(getSearchKey())
function bindData(data) {
    var box = $('.photoListMain').empty();
    if (data.result && data.rows) {
        var rowstotal = data.rows.length;
        $.each(data.rows, function (i, v) {
            var li_photo = jQuery('<li></li>').appendTo(box);
            if (firstPage && i == 0) {
                li_photo.attr('index', 'first');
            }
            if (lastPage && i == data.rows.length - 1) {
                li_photo.attr('index', 'last');
            }
            var table_box = jQuery('<table width="708" border="0" cellspacing="0" cellpadding="0"></table>').appendTo(li_photo);

            var tr_1 = jQuery('<tr></tr>').appendTo(table_box);
            tr_1.append('<td width="40"  align="center" rowspan="2"><input type="checkbox" id="' + v.id + '" /></td>');
            if (t === "1") {
                tr_1.append('<td width="140" align="center" rowspan="2"><img src="' + v.image_small_path + '" width="130" height="106" alt="' + v.image_name + '(' + v.name + ')" /></td>');
            }
            else {
                tr_1.append('<td width="140" align="center" rowspan="2"><img src="' + v.image_small_path + '" width="130" height="106" alt="' + v.image_name + '" /></td>');
            }
            tr_1.append('<td>序号：<input type="text" class="text" id="iseq' + i + '" value="' + v.sequence + '" style="width:20px;" />' +
                         '&nbsp;&nbsp;名称：<input type="text" class="text" value="' + v.image_name + '" id="txtimagename' + i + '" />');
            if (v.is_block === "False") {
                tr_1.append('<td width="225px"><span class=".itm-per">公开</span>&nbsp;上传时间：' + v.upload_date + '</td>');
            }
            else {
                tr_1.append('<td width="225px"><span class=".itm-per">已被屏蔽</span>&nbsp;上传时间：' + v.upload_date + '</td>');
            }
            var tr_2 = jQuery('<tr></tr>').appendTo(table_box);
            tr_2.append('<td align="left">描述：<textarea cols="30" rows="4" style="vertical-align:text-top;">' + v.description + '</textarea></td>');
            var tr_2_td = $('<td></td>').appendTo(tr_2);
            var tr_2_td_div = $('<div class="operatBox"></div>').appendTo(tr_2_td);
            if (v.is_block === "False") {
                tr_2_td_div.append('<a href="javascript:;" class="disable" id="disableAction_' + v.id + '" title="屏蔽">屏蔽</a>');
            }
            else {
                tr_2_td_div.append('<a href="javascript:;" class="disable" id="disableAction_' + v.id + '"" title="解除屏蔽">解除屏蔽</a>');
            }
            //tr_2_td_div.append('<a href="javascript:;" class="moveUp" title="上移">上移</a><a href="javascript:;" class="moveDown" title="下移">下移</a>');
            if (rowstotal > 1) {
                if (i === 0) {
                    tr_2_td_div.append('<a href="javascript:;" class="moveUp" title="上移" style="display:none;">上移</a><a href="javascript:;" class="moveDown" title="下移">下移</a>');
                }
                else if (i === (rowstotal - 1)) {
                    tr_2_td_div.append('<a href="javascript:;" class="moveDown" title="上移">上移</a><a href="javascript:;" class="moveUp" title="下移" style="display:none;">下移</a>');
                }
                else {
                    tr_2_td_div.append('<a href="javascript:;" class="moveUp" title="上移">上移</a><a href="javascript:;" class="moveDown" title="下移">下移</a>');
                }
            }
            //排序 //排序
            var photo_seq = li_photo.find('#iseq' + i);
            photo_seq.val(v.sequence);
            photo_seq.attr('title', v.sequence);
            photo_seq.blur(function () {
                if (/^\d+$/.test($(this).val())) {
                    var _seq = "seq:" + $(this).val();
                    _updateImageProperty(v.id, _seq, function (data) {
                        if (data.result) {
                            photo_seq.attr('title', photo_seq.val());
                        } else {
                            photo_seq.val(photo_seq.attr('title'));
                        }
                    });
                }
            });

            //Image Name//修改标题
            var photo_name = li_photo.find('#txtimagename' + i);
            photo_name.val(v.image_name);
            photo_name.attr('title', v.image_name);
            photo_name.blur(function () {
                var _name = "iname:'" + $(this).val() + "'";
                _updateImageProperty(v.id, _name, function (data) {
                    if (data.result) {
                        photo_name.attr('title', photo_name.val());
                    } else {
                        photo_name.val(photo_name.attr('title'));
                    }
                });
            });
            //Image Description//修改描述
            var photo_desc = li_photo.find('textarea');
            photo_desc.val(v.description);
            photo_desc.attr('title', v.description);
            photo_desc.blur(function () {
                var _desc = "desc:'" + $(this).val() + "'";
                _updateImageProperty(v.id, _desc, function (data) {
                    if (data.result) {
                        photo_desc.attr('title', photo_desc.val());
                    } else {
                        photo_desc.val(photo_desc.attr('title'));
                    }
                });
            });

            //解除屏蔽或屏蔽
            li_photo.find('.operatBox').find('a:eq(0)').click(function () {
                var _block = "bk:";
                var clickobj = $(this);
                var tmpname = clickobj.attr("title");
                if (tmpname === "屏蔽") {
                    _block += "1";
                }
                else {
                    _block += "0";
                }
                _updateImageProperty(v.id, _block, function (data) {
                    if (tmpname === "屏蔽") {
                        clickobj.text("解除屏蔽").attr("title", "解除屏蔽");
                        clickobj.parent().parent().parent().parent().find("span").text("已被屏蔽");
                    }
                    else {
                        clickobj.text("屏蔽").attr("title", "屏蔽");
                        clickobj.parent().parent().parent().parent().find("span").text("公开");
                    }
                });
            });

            //Sort UP
            li_photo.find('.operatBox').find('a:eq(1)').click(function () {
                if (!sort_state) {
                    photoSoftByClick(v.id, li_photo.prev().find(':checkbox').attr("id"), 0, function () {
                        if (li_photo.prev()) {
                            var itm_index = li_photo.prev().attr('index');
                            if (itm_index === 'first') {
                                if (li_photo.attr('index') === "last") {
                                    li_photo.prev().attr('index', 'last');
                                    li_photo.prev().find('.operatBox').find('a:eq(1)').show();
                                    li_photo.prev().find('.operatBox').find('a:eq(2)').hide();
                                }
                                else {
                                    li_photo.prev().attr('index', '');
                                    li_photo.prev().find('.operatBox').find('a:eq(1)').show();
                                    li_photo.prev().find('.operatBox').find('a:eq(2)').show();
                                }
                                li_photo.attr('index', 'first');
                                li_photo.find('.operatBox').find('a:eq(1)').hide();
                                li_photo.find('.operatBox').find('a:eq(2)').show();
                            }
                            else {
                                if (li_photo.attr('index') === "last") {
                                    li_photo.attr('index', '');
                                    li_photo.find('.operatBox').find('a:eq(1)').show();
                                    li_photo.find('.operatBox').find('a:eq(2)').show();
                                    li_photo.prev().attr('index', 'last');
                                    li_photo.prev().find('.operatBox').find('a:eq(1)').show();
                                    li_photo.prev().find('.operatBox').find('a:eq(2)').hide();
                                }
                                else {
                                    li_photo.attr('index', 'first');
                                    li_photo.find('.operatBox').find('a:eq(1)').hide();
                                    li_photo.find('.operatBox').find('a:eq(2)').show();
                                    li_photo.prev().attr('index', '');
                                    li_photo.prev().find('.operatBox').find('a:eq(1)').show();
                                    li_photo.prev().find('.operatBox').find('a:eq(2)').show();
                                }
                            }
                            var x = $(li_photo.find(':text')[0]).val();
                            x = parseInt(x);
                            $(li_photo.prev().find(':text')[0]).val(x);
                            $(li_photo.prev().find(':text')[0]).attr("title", x);
                            $(li_photo.find(':text')[0]).val(x - 1);
                            $(li_photo.find(':text')[0]).attr("title",( x - 1));
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
                    photoSoftByClick(v.id, li_photo.next().find(':checkbox').attr("id"), 1, function () {
                        if (li_photo.next()) {
                            var itm_index = li_photo.attr('index');
                            if (itm_index === 'first') {
                                if (li_photo.next().attr('index') === "last") {
                                    li_photo.attr('index', 'last');
                                    li_photo.find('.operatBox').find('a:eq(1)').show();
                                    li_photo.find('.operatBox').find('a:eq(2)').hide();
                                }
                                else {
                                    li_photo.attr('index', '');
                                    li_photo.find('.operatBox').find('a:eq(1)').show();
                                    li_photo.find('.operatBox').find('a:eq(2)').show();
                                }
                                li_photo.next().attr('index', 'first');
                                li_photo.next().find('.operatBox').find('a:eq(1)').hide();
                                li_photo.next().find('.operatBox').find('a:eq(2)').show();
                            }
                            else {
                                if (li_photo.next().attr('index') === "last") {
                                    li_photo.attr('index', 'last');
                                    li_photo.find('.operatBox').find('a:eq(1)').show();
                                    li_photo.find('.operatBox').find('a:eq(2)').hide();
                                }
                                else {
                                    li_photo.attr('index', '');
                                    li_photo.find('.operatBox').find('a:eq(1)').show();
                                    li_photo.find('.operatBox').find('a:eq(2)').show();
                                }
                                li_photo.next().find('.operatBox').find('a:eq(1)').show();
                                li_photo.next().find('.operatBox').find('a:eq(2)').show();
                            }
                            var x = $(li_photo.find(':text')[0]).val();
                            x = parseInt(x);
                            $(li_photo.next().find(':text')[0]).val(x);
                            $(li_photo.next().find(':text')[0]).attr("title", x);
                            $(li_photo.find(':text')[0]).val(x + 1);
                            $(li_photo.find(':text')[0]).attr("title",(x + 1));
                            li_photo.before(li_photo.next());
                        } else {
                            paginator(getSearchKey());
                        }
                    });
                }
            });
        });
    }
}
