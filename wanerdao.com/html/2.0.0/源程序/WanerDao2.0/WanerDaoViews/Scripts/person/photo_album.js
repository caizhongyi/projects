var msgTip = {
    select_count_zero: '请至少选择一项',
    delete_confirm: '确认删除吗？',
    request_fail: '请求失败！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}
var uid;
$(function () {
    uid = getQueryString('uid');
    if (!uid) uid = '';

    bindPTab(uid);

    paginator();

});

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
                opertype: 'getphotoalbumlist',
                guest_id: uid
            }
        }
    });
}

function bindData(data) {
    if (data.result && data.rows) {
        var box = $('.alb_list').empty();
        $.each(data.rows, function (i, v) {
            var li = jQuery('<li></li>').appendTo(box);
            if (v.share_key_id == '-1') {
                li.addClass('pers_bgc');
            } else {
                li.addClass('acti_bgc');
            }
            var div = jQuery('<div class="pers"></div>').appendTo(li);
            div.append($wd.format('<div class="pic"><a href="javascript:;"><img src="{0}" alt=""  style="width:204px; height:145px;" /></a></div>', v.cover_path));
            div.append($wd.format('<div class="bm_info"><label>{0}</label><i>({1})</i><div class="bm_info01 clearfix"><a href="#" class="doc"></a><a href="#" class="pri"></a><a href="#" class="wj"></a></div></div>', v.folder_name, v.count));
            div.append('<div class="per_hr_ico"></div>');
            // li.toggleAlbumTypeTip();
            li.click(function () {
                location.href = 'photo_album_preview.html?albumId=' + v.id + (uid == '' ? '' : '&uid=' + uid);
            });
        });
    }
}

$(".alb_pre_wp01").find('li').live('mouseout', function () {
        $(this).find('.bm_info01').hide();
        $(this).find('.per_hr_ico').hide();
        
    });

    $(".alb_pre_wp01").find('li').live('mouseover', function () {
        $(this).find('.bm_info01').show();
        $(this).find('.per_hr_ico').show();
    });