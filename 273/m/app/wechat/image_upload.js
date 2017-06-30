var $ = require('zepto');
var Class = require('components/class/class.js');
var common = require('common');

module.exports = Class.create({
    initialize: function(open, close, input, fileupload, loading) {
        this.open = open;
        this.close = close;
        this.input = input;
        this.fileupload = fileupload;
        this.loading = loading;

        var $this = this;
        fileupload.on('change', function(e){
            var file = e.target.files[0];
            if (! file) {
                return;
            }

            if (/^image\//i.test(file.type)) {
                $this.loading.removeClass('load_hide');
                readFile(file, function(data){
                    $this.onChange(data);
                });
            }
        });

        open.on('click', function(){
            $this.chooseImage();
        });
        close.on('click', function(){
            $this.onClose();
        });
    },
    onChange : function(data){
        this.open.before('<div class="uploaded-img" style="background-image: url(' + data.url + ')"><img src="' + data.url + '" alt="" class="sr-only"></div>');
        this.close.show();
        this.input.val(data.org_url);
    },
    onClose : function(){
        this.close.hide();
        this.loading.addClass('load_hide');
        this.open.prev().remove();
        this.input.val('');
        this.fileupload.val('');
    },
    chooseImage : function(callback){
        if(this.input.val()){
            return false;
        }
        var id = this.input.attr('name');
        $('#file_' + id ).click();
    },
});

function readFile(file, callback) {
    var reader = new FileReader();

    reader.onloadend = function () {
        processFile(reader.result, file, callback);
    }

    reader.onerror = function () {
        common.message('不是有效的图片');
    }

    reader.readAsDataURL(file);
}

function processFile(dataURL, file, callback) {
    var image = new Image();
    image.src = dataURL;

    image.onload = function () {
        var width = image.width;
        var height = image.height;
        var w = width >= height ? width / 100 : height / 100;
        width /= w;
        height /= w;
        sendFile(file, width, height, callback);
    };

    image.onerror = function () {
        common.message('不是有效的图片');
    };
}

function sendFile(file, width, height, callback) {
    var formData = new FormData();
    formData.append('thumbWidth', parseInt(width));
    formData.append('thumbHeight', parseInt(height));

    formData.append('category', 'web_car');
    formData.append('file', file);

    $.ajax({
        type: 'POST',
        url: 'http://upload.273.com.cn/',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            if (! data.error) {
                if(callback){
                    callback(data);
                }

            } else {
                common.message(data.text);
            }
        },
        error: function (data) {
            common.message('图片上传失败');
        }
    });
}