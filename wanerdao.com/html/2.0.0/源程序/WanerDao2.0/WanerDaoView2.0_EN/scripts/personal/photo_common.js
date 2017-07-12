
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

