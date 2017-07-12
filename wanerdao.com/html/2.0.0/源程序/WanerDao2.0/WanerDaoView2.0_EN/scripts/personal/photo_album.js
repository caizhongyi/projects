
var uid;
$(function () {
    uid = getQueryString('uid');
    if (!uid) uid = '';
    if (uid == '' || uid == wd_B.uin.uid) { self = true; }

    bindPTab(uid);

    paginator();

});

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
                opertype: 'getphotoalbumlist',
                guest_id: uid
            }
        }
    });
}

function bindData(data, totalCount) {
    if (data.result && data.rows) {
        $('.alb_set').find('a:eq(0)').html($('.alb_set').find('a:eq(0)').html().replace(/\(loading\)/, '(' + totalCount + ')'));
       
        var box = $('.alb_list').empty();
        $.each(data.rows, function (i, v) {
            var li = jQuery('<li></li>').appendTo(box);
            var div_albumContainer = jQuery('<div class="album-box "></div>').appendTo(li);
            if (v.share_key_id != '-1') {
                div_albumContainer.addClass('album-sys');
            }
            div_albumContainer.append($wd.format('<div class="album-label"></div><img alt="" class="album" src="{0}" style="width:204px; height:145px;"/>', v.cover_path));
            div_albumContainer.append($wd.format('<div class="album-name"><a href="javascript:;">{0}</a>({1})</div>', v.folder_name, v.count));
            div_albumContainer.append('<div class="album-opt"></div>');
            if (!is_self) {
                var opt_transmit = jQuery('<a href="javascript:;" class="icon icon-file" rel="transmit"></a>').appendTo(div_albumContainer.find('.album-opt'));
                opt_transmit.transmit({ currType: "imgFolder", transId: v.id });
            }
            div_albumContainer.find('.album-opt').append('<a href="javascript:;" class="icon icon-save" style="display:none;"></a> <a href="javascript:;" class="icon icon-print"></a>');

            div_albumContainer.find('.icon-print').click(function () {
                var str = "{opertype:'personalphotoalubmprint',printfile:'personalphotoalbum', pagecurrent: 1,pageSize: 20,guest_id:'" + uid + "', folder_id:'" + v.id + "' }";
                window.open("../Common/print.aspx?jsonparam=" + str);
            });

            // li.toggleAlbumTypeTip();
            li.find('.album-label,.album-name').click(function () {
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