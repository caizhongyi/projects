var $ = require('jquery');
var Tabs = require('/widget/tabs/js/tabs');
var Form = require('/widget/form/js/form');
var CountDown = require('/widget/countdown/js/countdown');
var DropdownGroup = require('/widget/dropdown-group/js/dropdown-group');

exports.init = function(urls) {
    switchMemberType(urls.imgCode);
    imgCode(urls.imgCode);
    telCode(urls.telCode);
    registerSubmit(urls.register);
    clearError();
    checkPassword();
    initUpload();
    addressSelector();
};

/**
 * @desc 切换注册会员类型（手机、邮箱、企业）
 */
var switchMemberType = function(url) {
    var tabs =  new Tabs('#register', {type: 'hash', activeClass: 'on'});
    tabs.on('change',function(e , args ){});
};

/**
 * @desc 图像验证码
 * @param imgCodeUrl
 */
var imgCode = function(url) {
    $(".js_code_img").attr('src', url +'?' + Math.random());

    $('.js_change_code').on('click', function() {
        $(".js_code_img").attr('src', url +'?' + Math.random());
        $('input[name="image_code"]').val('');
    })
};

/**
 * @desc 手机验证码
 * @param telCodeUrl
 */
var telCode = function (url) {
    _countDown('#get_tel_code', url);
    _countDown('#ent_get_tel_code', url);
};
var _countDown = function(selector, url) {
    var curForm = $(selector).parent().parent(),
        mobileInput = curForm.find('input[name="username"]'),
        imgCodeInput = curForm.find('input[name="image_code"]');

    new CountDown(selector,{
        auto    : false,
        time    : '0:00:59' ,
        format  : 'ss秒后可重新发送',
        beforeCallback : function () {
            var mobile = mobileInput.val(),
                imgCode = imgCodeInput.val();

            if(! /^1[3-9]\d{9}$/.test(mobile)) {
                mobileInput.focus();
                return false;
            }

            if (! /^\d{4}$/.test(imgCode)) {
                imgCodeInput.focus();
                return false;
            }
        },
        ajax    : function(runCountDown){$.ajax({
            url: 'http://out.api.273.cn/v4.0/uc/register/telcode',
            dataType: 'jsonp',
            jsonp: 'callbackp',
            data: {tel: mobileInput.val()},
            success: function(response) {
                switch(response.code) {
                    case 0:
                        runCountDown();
                        break;
                    case '10060001': //已被注册，请更换账号
                        mobileInput.focus();
                        break;
                    case '10050002'://发送过于频繁
                        alert(response.error);
                        break;
                    default :
                        alert(response.error);
                }
            },
            error: function(req, tStatus, eThrown) {

            }
        })}
    });
};

/**
 * @desc 提交注册信息
 * @param registerUrl
 */
var registerSubmit = function(registerUrl) {
    var telForm = _initForm('#tel'),
        emailForm = _initForm('#email'),
        enterpriseForm = _initForm('#enterprise');

    _registerSend('#tel', telForm);
    _registerSend('#email', emailForm);
    _registerSend('#enterprise', enterpriseForm);
};
var _registerSend = function(selector, form) {
    var isSendding = false;
    $(selector+' .btn button').on('click', function(){
        form.validate().done(function() {
            if(isSendding == true) {
                return;
            }
            isSendding = true;
            $(selector+' .btn button').text('注册中……');
            $.ajax({
                url: 'http://out.api.273.cn/v4.0/uc/register/save',
                dataType: 'jsonp',
                jsonp: 'callbackp',
                data: $(selector).serialize(),
                success: function(response) {
                    switch(parseInt(response.code)) {
                        case 0:
                            $('input[name="username"]').focus();
                            break;
                        case 10060001: //账号已被注册
                            alert(response.error);
                            $('input[name="username"]').val('').focus();
                            break;
                        case 10060003: //错误的短信验证码
                            $('input[name="tel_code"]').val('').focus();
                            break;
                        default :
                            alert(response.error);
                    }
                },
                error: function(xhr, tStatus, eThrown) {
                    $('input[name="username"]').focus();
                },
                complete: function (xhr, tStatus) {
                    isSendding = false;
                    $(selector+' .btn button').text('注册');
                }
            });
        });
    });
};

var _initForm = function(selector) {
    return new Form(selector, {
        fieldClass: 'ui-field',
        failClass: 'ui-field-fail',
        doneClass: 'ui-field-done',
        processClass: 'ui-field-process',
        focusClass: 'ui-field-focus'
    });
};

/**
 * @desc 清除错误提示
 */
var clearError = function() {
    $(".error_input").on('focus', function(){
        $(this).nextAll(".tips1").find(".error_span").empty();
    });
};

//检验两次密码是否一样
var checkPassword = function (){
    $('input[name="pw_check"]').blur(function() {
        var password = $(this).parent().parent().find('input[name="password"]').val(),
            checkpassword = $(this).val();
        if (password != checkpassword) {
            alert('两次密码不一致');
            return false;
        }
    });
};

var initUpload = function() {
    _createUploader('#idcard_photo');
    _createUploader('#license_photo');
};

var _createUploader = function(selector) {
    require('webuploader').create({
        auto: true,
        swf: 'http://asset.273.com.cn/components/webuploader/Uploader.swf',
        formData: {category: 'web_car'},
        accept:{title: 'Images', extensions: 'gif,jpg,jpeg,bmp,png', mimeTypes: 'image/*'},
        pick: {id: selector, multiple: false},
        server: 'http://upload.273.com.cn/', //http://out.api.273.cn/v4.0/file/upload/do
        resize: false
    }).on('fileQueued', function( file ) {
        $(selector).parent().removeClass('ui-field-fail').removeClass('ui-field-done');
        $($(selector).prev().data('tip-target')).html('');
        $(selector).next().find('.uploader-list').show().html(
            '<div id="'+file.id+'" class="item">'+'<h4 class="info">'+file.name+'</h4>'+
            '<p class="state">上传中...</p>' +
            '</div>'
        );
    }).on('uploadSuccess', function(file, response) {
        $(selector).parent().removeClass('ui-field-fail').addClass('ui-field-done');
        $( '#'+file.id ).find('p.state').text('');

        if(response.file_path) {
            $(selector).prev().val(response.file_path);
        }
    }).on( 'uploadError', function( file ) {
        $(selector).parent().removeClass('ui-field-done').addClass('ui-field-fail');
        $( '#'+file.id ).find('p.state').text('上传失败');
        $(selector).prev().val('');
        $(selector).next().find('.uploader-list').fadeOut(2000);
        this.reset();
    });
};

/**
 * 地址选择器
 */
var addressSelector = function() {
    new DropdownGroup('.address-group',{
        source : [
            'http://api.cherenmai.com/cache/location/getprovincelist',
            'http://api.cherenmai.com/cache/location/getcitylistbyprovinceid',
            'http://api.cherenmai.com/cache/location/getdestrictlistbycityid'
        ],
        format : function( row ){
            return '<li><a href="javascript:;" data-value="'+ row.id +'">'+ row.name +'</a></li>';
        }
    }).items[0].on('change',function(e , args ){})
};