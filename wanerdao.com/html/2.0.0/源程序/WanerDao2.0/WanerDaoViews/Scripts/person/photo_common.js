
jQuery.fn.extend({
    toggleAlbumTypeTip: function () {
        $(this).live('mouseout', function () {
            $(this).find('.bm_info01').hide();
            $(this).find('.per_hr_ico').hide();

        });

        $(this).live('mouseover', function () {
            $(this).find('.bm_info01').show();
            $(this).find('.per_hr_ico').show();
        });

    },
    albumEditHover: function () {
        $(this).bind("mouseenter mouseleave", function () {
            $(this).toggleClass("hover")
			.find(".hr_wp").toggle();
        })
    },
    togglePhotoTip: function () {
        $(this).bind("mouseout mouseover", function () {
            $(this).find(".bm_info").toggle();
        })
    }
});


/****** 获取 专辑 列表 *****/
function getAlbumList(callback) {

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

