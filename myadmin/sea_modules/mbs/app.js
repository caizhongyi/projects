/**
 * @desc 业管后台基础模块
 *
 * @author dutao@273.cn
 * @since 2015.02.03
 */

define(function(require, exports, module) {
    //加载jquery ,bootbox
    require('jquery');
    var bootbox = require('bootbox');

    exports.closeWin = function(reload) {
        reload = reload || true;
        //iframe 中给父窗口发送自定义事件，用于关闭弹窗
        parent.$("#mbs_box_modal").modal('hide');
        // var eventName = 'hideModalWindow';
        // if (parent.dispatchEvent) {
            // parent.dispatchEvent(new Event(eventName));
        // } else {
        // //todo 兼容IE8<
//         
        // }
        if (reload) {
            parent.location.reload();
        }
    };

    exports.message = function(options) {
        var obj = {
            content : '',
            time : 2000,
            css : "success"
        };
        if ( typeof options == "string") {
            obj.content = options;
        } else {
            obj = $.extend(obj, options);
        }
        var width = $(window).width() / 2 - 250;
        var dom = '<div class="alert alert-' + obj.css + '" id="mbs_show_info" style="position: fixed; width:500px; margin-left:' + width + 'px; bottom:-100px"></div>';
        $('#mbs_show_info').remove();
        $(dom).appendTo('body').html(obj.content).stop(true).animate({
            bottom : '150px'
        }).delay(obj.time).animate({
            bottom : '-100px'
        });
    };

    exports.message.success = function(string) {
        exports.message(string);
    };
    exports.message.info = function(string) {
        exports.message({
            content : string,
            css : 'info'
        });
    };
    exports.message.error = function(string) {
        exports.message({
            content : string,
            css : 'danger'
        });
    };
    exports.openIframe = function(options) {
        var obj = $.extend({
            title : '窗口',
            url : "#",
            width : 600,
            height : 550
        }, options);
        //强制限定 宽 高 不能超过屏幕可视区域，避免造成功能无法操作
        obj.width = obj.width >= $(window).width() ? $(window).width() - 60 : obj.width;
        obj.height = obj.height >= $(window).height() ? $(window).height() - 130 : obj.height;
        //alert(obj.height);
        var dialog = '<div id="mbs_box_modal" class="modal fade" data-backdrop="false">' + '<div class="modal-dialog" style="width:' + obj.width + 'px">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + '<h4 class="modal-title">Modal title</h4>' + '</div>' + '<div class="modal-body">' + '</div>' + '</div>' + '</div>' + '</div>';
        $('#mbs_box_modal').remove();
        $("body").append(dialog);
        $('#mbs_box_modal .modal-title').text(obj.title);
        $("#mbs_box_modal").find('.modal-body').html('<iframe class="iframe-body" frameborder="0" width="100%" height="' + obj.height + '" src="' + obj.url + '"></iframe>');
        //$('.iframe-body').attr({"height":height,"src":link_href});
        $("#mbs_box_modal").modal('toggle');
    };

    exports.confirm = function(options) {
        var obj = $.extend({
            text : '确定吗？',
            url : "#",
            reload : true
        }, options);
        bootbox.confirm(obj.text, function(result) {
            if (result) {
                $.ajax({
                    url : obj.url,
                    type : "GET",
                    cache : false,
                    dataType : "json",
                    success : function(r) {
                        if (r.status == 0) {
                            exports.message(r.message);
                            if (obj.reload) {
                                window.location.reload();
                            }
                        } else {
                            exports.message.error(r.message);
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        exports.message.error(r.message);
                    }
                });
            }
        });
    };
}); 