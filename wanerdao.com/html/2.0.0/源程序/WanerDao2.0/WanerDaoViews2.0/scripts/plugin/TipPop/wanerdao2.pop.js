//警告或者确定弹出层
function pop(options) {
    var defaults = {
        //titleid: '', //弹出层文本标题(此处错误标题请从multipleLanguage\zh-cn.js获取)此版本已被废弃
        /*    common_00021: '信息警告',
        common_00022: '信息错误',
        common_00023: '信息确认',
        common_00024: '信息提示',
        common_00025: '信息成功',*/
        typename: 'confirm', //warning是警告弹出层，error是错误弹出层，confirm是确认弹出层,success是成功，message是信息提示
        msginfo: '',
        callback: null, //回调函数只适用于确认弹出层、success是成功，message是信息提示（后面2种应胥鑫的要求做出修改）
        cancelcallback:null//此回调函数用于cancel或者关闭按钮时候
    };
    if (options != undefined) {
        this.opts = jQuery.extend({}, defaults, options);
    }
    infopop = {
        dialog: null,
        show: function (opts) {
            var _this = this;
            var html = '<div  class="pop" style="width:550px; margin:10px auto;">';
            html += '<div class="pop-bg"></div>';
            html += '<div class="pop-container">';
            html += '	<div class="pop-bd pop-dialog clearfix" >';
            html += '    <span class="icon ' + opts.typename + '" >';
            html += opts.msginfo + '</span></div>';
//            html += '    <span class="icon ' + opts.typename + '" style="margin-left:50px;"></span>';
//            html += '<span class="overflow" style="width:300px; display:inline-block;vertical-align:middle;" >';
//            html += opts.msginfo + '</span></div>';
            html += '  <div class="pop-ft">';
            html += '       <a href="javascript:;" class="button button1" id="btnpopOK">' + wanerdaoLangTip("common_00034") + '</a>';
            if (opts.typename === 'confirm') {
                html += '<a href="javascript:;"  class="button button1-disable" id="btnpopCancel" >' + wanerdaoLangTip("common_00016") + '</a>';
            }
            html += '     </div>';
            html += '</div>';
            html += '</div>';
            var $dialog = $(html).appendTo($('body'));
            if (opts.typename === 'confirm' | opts.typename === 'success' | opts.typename === 'message') {
                $("#btnpopOK").unbind("click").click(function () {
                    if (opts.callback !== null) {
                        var callback = opts.callback();
                        eval(callback || function () { });
                    }
                    _this.hide();
                });
                this.dialog = new $.ui.dialog($dialog, {
                    callback: { hide: function () {
                        if (opts.cancelcallback !== null) {
                            var cancelcallback = opts.cancelcallback();
                            eval(cancelcallback || function () { });
                        }                        
                        $dialog.remove();
                    } 
                    },
                    widget: {
                        hide: '#btnpopCancel'
                    }
                }).show();
            }
            else {
                this.dialog = new $.ui.dialog($dialog, {
                    callback: { hide: function () { $dialog.remove() } },
                    widget: {
                        hide: '#btnpopOK'
                    }
                }).show();
                //                $("#btnpopOK").unbind("click").click(function () {
                //                    _this.hide();
                //                });
            }
        },
        hide: function () {
            this.dialog && this.dialog.hide();
        }
    };
    infopop.show(this.opts);
};