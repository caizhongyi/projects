(function ($) {
    uploadavatar = function (settings, callback) {
        var imgwidth = 0;
        var imgheight = 0;
        var imgName;
        var cutposition = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
        };
        var defaults = {
            width: 300,
            height: 400,
            photobasepath: '',
            notselectmsg: '请先选择剪裁区域',
            requestfail: '请求失败！',
            file_null: '请选择要上传的照片！',
            file_ext_error: '请选择图片文件(jpg|jpeg|gif|bmp|png)！'
        };

        var options = $.extend(defaults, settings);

        var jbg = jQuery('<div id="uploadbg"></div>').appendTo('body');

        var jUploadAvatarBox = jQuery('<div id="upload-avatar-container"></div>').appendTo('body');
        var jCutAvatar = jQuery('<div id="cutAvatar"><div><img src="" id="Artwork"/></div><div><img src="" id="smailavatar"/></div><br/><div><input type="button" value=" 剪 裁 " id="docut"/><div></div>').appendTo(jUploadAvatarBox);
        jCutAvatar.css('display', 'none');
        jCutAvatar.find('div:eq(0)').css({ 'width': (options.width + 2) + 'px', 'height': (options.height + 2) + 'px', 'margin': '0', 'padding': '0', 'float': 'left', 'border': 'solid 1px #ddd' });
        jCutAvatar.find('div:eq(1)').css({ 'width': '100px', 'height': '100px', 'margin': '0', 'padding': '0', 'float': 'left', 'position': 'relative', 'overflow': 'hidden', 'border': 'solid 1px #ddd', 'margin-left': '10px' });
        jCutAvatar.find('div:eq(2)').css({ 'width': '100px', 'height': '260px', 'margin': '0', 'padding': '0', 'float': 'left', 'position': 'relative', 'overflow': 'hidden', 'border': 'solid 1px #fff', 'margin-left': '10px', 'margin-top': '10px' });
        $('#Artwork').css({ 'position': 'relative' });
        $('#smailavatar').css({
            'position': 'relative',
            'float': 'left',
            'overflow': 'hidden'
        });

        var iCutImg = jCutAvatar.find('img#Artwork');
        jbg.css({ 'position': 'absolute', 'left': '0', 'top': '0', 'z-index': '9999', 'display': 'none', 'background-color': '#999' });
        jUploadAvatarBox.css({ 'position': 'absolute', 'padding': '10px', 'border': 'solid 1px #ddd', 'display': 'none', 'background-color': '#fff', 'z-index': '99999', 'text-align': 'center', 'line-height': '30px' });
        jUploadAvatarBox.append('<form id="upavatar" name="upavatar" method="post" enctype="multipart/form-data"  target="iavatar" action="../uploadavatar_common.axd">选择图片：<input type="file" name="avatar" id="javatar"><br/><input type="hidden" name="opertype" value="uploadpersonalavatar"/><input type="submit" value="确定上传"/><input type="button" value="关 闭"/></form><iframe name="iavatar" id="iavatar">');
        jUploadAvatarBox.find('form>input[type="button"]').click(function () {
            remove();
        });
        var jwait = jQuery('<span>正在上传....</span>').css('display', 'block');
        jUploadAvatarBox.find('form').submit(function () {
            if (!$(this).find('input#javatar').val()) {
                alert(options.file_null);
                return false;
            }
            var fileName = $(this).find('input#javatar').val();
            var fileExtName = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
            if (fileExtName == "jpg" || fileExtName == "jpeg" || fileExtName == "gif" || fileExtName == "bmp" || fileExtName == "png") {
                $(this).css('display', 'none');
                jUploadAvatarBox.append(jwait);
            } else {
                alert(options.file_ext_error);
                return false;
            }
        });
        $('#iavatar').css('display', 'none');
        $('#iavatar').load(function () {
            jUploadAvatarBox.find('form').hide();
            jwait.remove();
            var _result = $(this.contentWindow.document.body).text();
            if (_result != null && _result != "") {
                var obj = jQuery.parseJSON(_result);

                if (obj.result) {
                    jCutAvatar.css('display', 'block');

                    imgName = obj.msg;
                    selectSmallAvatar();
                } else {
                    alert(obj.msg);
                    jUploadAvatarBox.find('form').show();
                }
            }
        });
        jUploadAvatarBox.find('input[type="file"]').css('width', '140px');
        jbg.css({ 'width': $(document).width(), 'height': $(document).height() }).fadeTo('slow', 0.5);
        jUploadAvatarBox.css({ position: 'absolute', 'top': (($(window).height() - jUploadAvatarBox.height()) / 2) + $(document).scrollTop(), 'left': (($(window).width() - jUploadAvatarBox.width()) / 2) }).fadeTo('slow', 1);

        if (parseInt(jUploadAvatarBox.css('top')) < 0) {
            jUploadAvatarBox.css('top', 0);
        }

        $(window).resize(function () {
            jbg.css({ 'width': $(document).width(), 'height': $(document).height() });
            jUploadAvatarBox.css({ 'top': (($(window).height() - jUploadAvatarBox.height()) / 2), 'left': (($(window).width() - jUploadAvatarBox.width()) / 2) });
            if (parseInt(jUploadAvatarBox.css('top')) < 0) {
                jUploadAvatarBox.css('top', 0);
            }
        });

        function selectSmallAvatar() {
            var imgpath = imgName;
            $('#smailavatar').attr('src', imgpath);
            iCutImg.attr('src', imgpath);

            var opImg = document.createElement('img');
            opImg.onload = function () {
                var oW = this.width;
                var oH = this.height;
                var tax = 1;
                if (oW > options.width || oH > options.height)
                    tax = (oW / oH) > (options.width / options.height) ? (options.width / oW) : (options.height / oH);

                iCutImg.css('margin-Left', (options.width - Math.floor(oW * tax)) / 2 + "px");
                iCutImg.css('margin-Top', (options.height - Math.floor(oH * tax)) / 2 + "px");

                iCutImg.width(oW * tax);
                iCutImg.height(oH * tax);

                $('#smailavatar').width(oW * tax);
                $('#smailavatar').height(oH * tax);
                $('#smailavatar').css('margin-left', '102px');

                imgwidth = iCutImg.width()
                imgheight = iCutImg.height();

                iCutImg.imgAreaSelect({
                    aspectRatio: '1:1',
                    handles: true,
                    onInit: getSelectAreaInit,
                    onSelectEnd: getPoint
                });
                $(window).resize();
                jCutAvatar.find('input').bind('click', cutPicture);
            }
            opImg.src = imgpath;
        }

        function cutPicture() {
            if (cutposition.x1 == 0 && cutposition.x2 == 0 && cutposition.y1 == 0 && cutposition.y2 == 0) {
                alert(options.notselectmsg);
            } else {
                ajaxCut();
            }
        }

        function ajaxCut() {
            jCutAvatar.find('input[type="button"]').parent().append(jwait);
            $.ajax({
                url: "../cutavatar_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'cutpersonalsmallavatar',width:" + imgwidth + ",height:" + imgheight + ",x1:" + cutposition.x1 + ",y1:" + cutposition.y1 + ",x2:" + cutposition.x2 + ",y2:" + cutposition.y2 + ",imgname:'" + imgName + "'}",
                error: function (data) {
                    jwait.remove();
                    alert(options.requestfail);
                },
                success: function (data) {
                    if (jwait) jwait.remove();
                    if (data.result) {
                        iCutImg.imgAreaSelect({ remove: true });
                        remove();
                        if (callback) callback(imgName);
                    } else {
                        alert(options.requestfail);
                    }
                }
            });
        }

        function getPoint(img, selection) {
            var scaleX = 100 / (selection.width || 1);
            var scaleY = 100 / (selection.height || 1);

            $('#smailavatar').css({
                width: Math.round(scaleX * imgwidth) + 'px',
                height: Math.round(scaleY * imgheight) + 'px',
                marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
                marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
            });

            cutposition = $.extend(cutposition, selection);
        }

        function getSelectAreaInit(img, selection) {
            cutposition = $.extend(cutposition, selection);
        }

        function remove() {
            jbg.remove();
            jUploadAvatarBox.remove();
        }

        $('form#upavatar').css('display', 'block');
        alert($('form#upavatar').css('display'));
    }
})(jQuery);