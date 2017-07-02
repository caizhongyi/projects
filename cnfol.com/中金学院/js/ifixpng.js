jQuery(function() {
    $.fn.extend({
        FixIE6PNG: function() {
            if ($.browser.msie) {
                var ver = parseFloat($.browser.version);
                if (!isNaN(ver) && ver >= 7.0) {
                    return;
                }

                var backgroundImage = $(this).css("background-image");
                var srcImage = $(this).attr("src");
                if (backgroundImage && backgroundImage != 'none' && backgroundImage.match(/\.png/i) != null) {
                    var origUrl = backgroundImage.substring(5, backgroundImage.length - 2);
                    var blank = '/Images/blank.gif';
                    var backgroundPosition = $(this).css("background-position");
                    $(this).css("background-image", "url(" + blank + ")");
                    if (backgroundPosition) {
                        $(this).css("background-position", backgroundPosition);
                    }
                    $(this).css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + origUrl + "', sizingMethod='crop')");
                } else if (srcImage && srcImage.match(/\.png/i) != null) {
                    var blank = '/Images/blank.gif';
                    var height = $(this).height();
                    var width = $(this).width();
                    $(this).attr("src", blank);
                    $(this).css("width", width + "px");
                    $(this).css("height", height + "px");
                    $(this).css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + srcImage + "', sizingMethod='crop')");
                }
            }
        }
    });

});