/*  get all video album  */
function getAllVideoFolder(uid, error_back, success_back) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'vodeofolderpaging',pagecurrent:1,pageSize:10000,user_id: '" + uid + "'}",
        error: function (data) {
            if (error_back) error_back();
        },
        success: function (data) {
            if (success_back) success_back(data);
        }
    });
}


/*  video album paging  */
function albumPaginator(uid, skey, callback) {
    $(".pageList").myPagination({
        //showmore: false, //是否显示加载更多
        //pagermore:true,
       // showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
       // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: callback,
        ajax: {
            url: 'album_video.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'vodeofolderpaging',
                user_id: uid,
                folder_name: skey
            }
        }
    });

}

/*  get all Personal video by album  */
function getAllPersonalVideoByAlbum(p,error_back, success_back) {
    $.ajax({
        url: "../album_video.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'personalvideopaging',pagecurrent:1,pageSize:10000,fold_id:'"+p.fold_id+"',user_id:'"+p.uid+"'}",
        error: function (data) {
            if (error_back) error_back();
        },
        success: function (data) {
            if (success_back) success_back(data);
        }
    });
}

/*  video paging  */
function videoPaginator(foldid, uid, skey, callback) {
    $(".pageList").myPagination({
        showmore: false, //是否显示加载更多
        //pagermore: true,
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        // contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
        callback: callback,
        ajax: {
            url: 'album_video.axd',
            param: {
                pagecurrent: 1,
                pageSize: 20,
                opertype: 'personalvideopaging',
                fold_id: foldid,
                user_id: uid,
                vname: skey
            }
        }
    });
}

jQuery.fn.extend({
    toggleAlbumTypeTip: function () {
        $(this).bind("mouseenter mouseleave", function () {
            $(this).find(".per_hr_ico").toggle();
        });
    },
    albumEditHover: function () {
        $(this).bind("mouseenter mouseleave", function () {
            $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
        })
    },
    togglePhotoTip: function () {
        $(this).bind("mouseenter mouseleave", function () {
            $(this).find(".bm_info").toggle();
        })
    }
});

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


