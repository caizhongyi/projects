/*on read*/
var revertName = ''; //memory the blog name for revert
var revertDesc = ''; //memory the blog desc for revert 
var cacheName = ''; //memory the blog name for update
var cacheDesc = ''; //memory the blog desc for update
$(function () {
    bindPTab();

    getBlogNameAndDesc();

    $('#txtBlogDesc').keyup(function () {
        var fontCount = $(this).val().length;
        if (fontCount > parseInt(wanerdaoLangTip('blog_00002')))
            $('span.font_count').html('<span style="color:#f00">' + fontCount + '</span>/' + wanerdaoLangTip('blog_00002'));
        else
            $('span.font_count').html(fontCount + '/' + wanerdaoLangTip('blog_00002'));
    });

    $('#btnSave').click(function () {
        $('#btnSave').unnotice(1);
        $('#btnCancel').unnotice(2);
        var blogName = $('#txtBlogName').val();
        var blogDesc = $('#txtBlogDesc').val();
        if (blogDesc.length < parseInt(wanerdaoLangTip('blog_00002'))) {
            if (!(blogName == cacheName && blogDesc == cacheDesc)) {
                SaveBlogNameAndDesc(blogName, blogDesc, function () {
                    //revert settings
                    revertName = cacheName;
                    revertDesc = cacheDesc;

                    //cache settings
                    cacheName = blogName;
                    cacheDesc = blogDesc;
                    $('#btnCancel').notice(wanerdaoLangTip('common_00033'), 2);
                });
            } else {
                $('#btnSave').notice(wanerdaoLangTip('blog_00003'), 1);
            }
        }
    });

    $('#btnCancel').click(function () {

        if (revertName && revertDesc) {
            SaveBlogNameAndDesc(revertName, revertDesc, function () {
                $('#txtBlogName').val(revertName);
                $('#txtBlogDesc').val(revertDesc);

                cacheName = revertName;
                cacheDesc = revertDesc;

                revertName = '';
                revertDesc = '';
            });
        }
    });
});

/* get blog settings */
function getBlogNameAndDesc() {
    $.ajax({
        url: "../set_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getblognameanddesc'}",
        error: function (data) {

        },
        success: function (data) {
            if (data.result) {
                $('#txtBlogName').val(data.name);
                $('#txtBlogDesc').val(data.description);
                //设定缓存
                cacheName = data.name;
                cacheDesc = data.description;

                $('span.font_count').html(cacheName.length + '/' + parseInt(wanerdaoLangTip('blog_00002')));
            }
        }
    });
}

/***save blog name and desc*/
function SaveBlogNameAndDesc(blogName,blogDesc,callback) {
    $.ajax({
        url: "../setting_blog.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatenameanddescofblogsetting',bname:'" + blogName + "',bdescription:'" + blogDesc + "'}",
        error: function (data) {

        },
        success: function (data) {
            if (data.result) {
               // alert(data.msg);
                if (callback) callback();
            }
        }
    });
}