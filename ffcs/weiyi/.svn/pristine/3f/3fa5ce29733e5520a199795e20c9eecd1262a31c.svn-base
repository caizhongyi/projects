KindEditor.ready(function (K) {
    var editor = K.editor({
        themeType: "simple",
        uploadJson : "index.php?act=attachment&do=upload",
        allowFileManager: true
    });
    K('#insertimage').click(function () {
        editor.loadPlugin('image', function () {
            editor.plugin.imageDialog({
                imageUrl: K('#thumb').val(),
                clickFn: function (url, title, width, height, border, align) {
                    K('#thumb').val(url);
                    if (K('#thumb_img')) {
                        K('#thumb').hide();
                        K('#thumb_img').attr('src', url);
                        K('#thumb_img').show();
                    }
                    editor.hideDialog();
                }
            });
        });
    });
});