(function () {
    var imgwidth = 0;
    var imgheight = 0;
    var imgName = '';
    var cutCallBack = null;
    var cutposition = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
    var defaults = {
        width: 300,
        height: 400,
        notselectmsg: '请先选择剪裁区域',
        requestfail: '请求失败！',
        file_null: '请选择要上传的照片！',
        text_choose_photo_btn: '选择照片',
        text_upload_btn: '确定上传',
        text_uploading: '正在上传....',
        text_cut_avatar_btn: '剪 切',
        text_reupload_btn: '重新上传',
        file_ext_error: '请选择有效的图片文件(有效格式：jpg|jpeg|gif|bmp|png)！',
        callback: null,
        class_upload_btn: 'uploadBtn',
        overlayopts: {
            left: 0
        }
    };

    $.personAvatarUpload = function (opts) {

        var defaults = $.extend(defaults, opts);

        if (defaults.callback) {
            cutCallBack = defaults.callback;
        }
        $('#personAvatar').remove();

        var box = jQuery('<div id="personAvatar" ></div>').appendTo($('body'));
        var table = $('<table class="pop_dialog_table" style="width: 100%; height: 100%;"><tbody></tbody></table').appendTo(box);
        table.append('<tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>');

        var tr_box = $('<tr></tr>').appendTo(table);
        tr_box.append('<td class="pop_border"></td>');
        /******实现********/
        var td_box = $('<td style=" background-color: #fff;"></td>').appendTo(tr_box);

        /******实现****/
        tr_box.append('<td class="pop_border"></td>');
        table.append('<tr><td class="pop_bottomleft"></td><td class="pop_border"></td><td class="pop_bottomright"></td></tr>');

        //显示权限框
        box.overlay(opts.overlayopts);

        setPosition(box);
        $(window).resize(function () {
            setPosition(box);
        });

        doUpload(box, td_box);
    }

    /* 设置位置 */
    function setPosition($obj) {
        $obj.css('left', (($(window).width() - $obj.width()) / 2));
        if ($obj.height() < $(window).height()) {
            $obj.css('top', (($(window).height() - $obj.height()) / 2));
        }
    }

    /***** 上传头像 *****/
    function doUpload($main, $obj) {
        $obj.empty();
        $main.css({ 'width': '235px', 'height': '90px' });
        $obj.css({ 'padding': '0px 20px' });
        setPosition($main);

        var $upload_box = jQuery('<div id="jBoxUpload"></div>').appendTo($obj);
        $upload_box.append('<form id="jFormAvatar" name="jFormAvatar" method="post" enctype="multipart/form-data"  target="iavatar" action="uploadavatar_common.axd"><div style="text-align: right; "><a href="javascript:;" class="closethis">X</a></div>'
        + '<span class="' + defaults.class_upload_btn + '"><span>' + defaults.text_choose_photo_btn + '</span><input type="file" name="avatar" id="javatar" /></span>'
        + '<input type="hidden" name="opertype" value="uploadpersonalavatar"/><input type="submit" id="btnUploadAvatar" value="' + defaults.text_upload_btn + '" style=" border-width: 1px; background-color: #39f; width: 80px; height: 32px; color: #fff; font-size: 18px; margin-left: 10px; display:none;" /></form>'
        + '<iframe name="iavatar" id="iavatar" style="display:none;">');

        $('.closethis').mouseover(function () {
            $(this).css('color', '#39f');
        }).mouseout(function () {
            $(this).css('color', '#000');
        }).click(function () {
            $main.find('.close').trigger('click');
        });

        $upload_box.find('#javatar').css({
            position: 'absolute',
            // in Opera only 'browse' button
            // is clickable and it is located at
            // the right side of the input
            right: 0,
            top: 0,
            fontFamily: 'Arial',
            // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
            fontSize: '118px',
            margin: 0,
            padding: 0,
            cursor: 'pointer',
            opacity: 0
        });

        $upload_box.find('#javatar').change(function () {
            var fileName = $(this).val();
            if (fileName.indexOf('\\') != -1) {
                fileName = fileName.substr(fileName.lastIndexOf('\\') + 1);
            }
            $(this).prev().html(fileName).css('font-size', '12px');
            $upload_box.find('#btnUploadAvatar').show();
        });


        $upload_box.submit(function () {
            var fileName = $(this).find('input#javatar').val();
            if (!fileName) {
                alert(defaults.file_null);
                return false;
            }

            var fileExtName = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
            if (fileExtName == "jpg" || fileExtName == "jpeg" || fileExtName == "gif" || fileExtName == "bmp" || fileExtName == "png") {
                $(this).css('display', 'none');
                $upload_box.append('<span class="msgtip">' + defaults.text_uploading + '</span>');
            } else {
                alert(defaults.file_ext_error);
                return false;
            }
        });

        /*上传结果*/
        $upload_box.find('#iavatar').load(function () {
            $upload_box.find('.msgtip').remove();
            var _result = $(this.contentWindow.document.body).text();
            if (_result != null && _result != "") {
                var _resultObj = jQuery.parseJSON(_result);

                if (_resultObj.result) {
                    doCut($main, $obj, _resultObj.msg);
                    //                    jCutAvatar.css('display', 'block');
                    //                    imgName = obj.msg;
                    //selectSmallAvatar();
                } else {
                    alert(_resultObj.msg);
                    $upload_box.find('form').show();
                }
            }
        });


    }

    /**** 剪切小头像 *****/
    function doCut($main, $obj, imgPath) {
        $obj.empty();
        $main.css({ 'width': '450px', 'height': '410px' });
        $obj.css({ 'padding': '5px' });
        setPosition($main);
        imgName = imgPath;
        var jCutAvatar = jQuery('<div id="cutAvatar"><div><img src="" id="Artwork"/></div><div><img src="" id="smailavatar"/></div><br/><div><input type="button" value="' + defaults.text_cut_avatar_btn + '" id="docut" style="border-width: 1px; background-color:#39f; color:#fff;"/><br/><input type="button" id="reUpload" value="' + defaults.text_reupload_btn + '" style="color:#fff; border-width: 1px; background-color: #ddd; margin-top: 5px; "/><div></div>').appendTo($obj);
        jCutAvatar.find('div:eq(0)').css({ 'width': '302px', 'height': 402 + 'px', 'margin': '0', 'padding': '0', 'float': 'left', 'border': 'solid 1px #ddd' });
        jCutAvatar.find('div:eq(1)').css({ 'width': '100px', 'height': '100px', 'margin': '0', 'padding': '0', 'float': 'left', 'position': 'relative', 'overflow': 'hidden', 'border': 'solid 1px #ddd', 'margin-left': '10px' });
        jCutAvatar.find('div:eq(2)').css({ 'width': '100px', 'height': '260px', 'margin': '0', 'padding': '0', 'float': 'left', 'position': 'relative', 'overflow': 'hidden', 'border': 'solid 1px #fff', 'margin-left': '10px', 'margin-top': '10px' });
        $('#Artwork').css({ 'position': 'relative' });
        $('#smailavatar').css({
            'position': 'relative',
            'float': 'left',
            'overflow': 'hidden'
        });

        jCutAvatar.find('#reUpload').click(function () {
            jCutAvatar.find('img#Artwork').imgAreaSelect({ remove: true });
            doUpload($main, $obj);
        });

        var iCutImg = jCutAvatar.find('img#Artwork');
        $('#smailavatar').attr('src', imgPath);
        iCutImg.attr('src', imgPath);

        var opImg = document.createElement('img');
        opImg.onload = function () {
            var oW = this.width;
            var oH = this.height;
            var tax = 1;
            if (oW > defaults.width || oH > defaults.height)
                tax = (oW / oH) > (defaults.width / defaults.height) ? (defaults.width / oW) : (defaults.height / oH);

            iCutImg.css('margin-Left', (defaults.width - Math.floor(oW * tax)) / 2 + "px");
            iCutImg.css('margin-Top', (defaults.height - Math.floor(oH * tax)) / 2 + "px");

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

            jCutAvatar.find('input#docut').bind('click', function () {
                cutPicture(jCutAvatar);
            });
        }
        opImg.src = imgPath;
    }

    function cutPicture($obj) {
        if (cutposition.x1 == 0 && cutposition.x2 == 0 && cutposition.y1 == 0 && cutposition.y2 == 0) {
            alert(defaults.notselectmsg);
        } else {
            ajaxCut($obj);
        }
    }

    function ajaxCut(jCutAvatar) {
        $.ajax({
            url: "../cutavatar_common.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'cutpersonalsmallavatar',width:" + imgwidth + ",height:" + imgheight + ",x1:" + cutposition.x1 + ",y1:" + cutposition.y1 + ",x2:" + cutposition.x2 + ",y2:" + cutposition.y2 + ",imgname:'" + imgName + "'}",
            error: function (data) {

                alert(defaults.requestfail);
            },
            success: function (data) {
                if (data.result) {
                    jCutAvatar.find('img#Artwork').imgAreaSelect({ remove: true });
                    if (cutCallBack) { cutCallBack(imgName); }
                    $('#personAvatar').remove();
                } else {
                    alert(defaults.requestfail);
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
})(jQuery);