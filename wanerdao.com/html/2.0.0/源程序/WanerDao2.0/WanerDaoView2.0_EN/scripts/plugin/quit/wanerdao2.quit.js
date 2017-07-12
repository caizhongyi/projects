/*!
* 登录弹出层
* 
* 作者：jgglg
* email:jgglg@163.com
* Date: 2012/10/2 23:33
* 用法描述： 
* 1.当没有回调函数时，默认刷新当前页面
* 2.当有回调时，执行回调函数不刷新当前页面
*/
function wanerdaologin(options) {
    var me = this;
    var defaults = {
        quittype:0,//0为活动，1为圈子
        callback: null//回调函数
    };
    if (options != undefined) {
        me.opts = $.extend({}, defaults, options || {});
    }
    infopop = {
        dialog: null,
        show: function () {
            var _this = this;
            var $dialog = null;
            var html = _getUI();
            $dialog = $(html).appendTo($('body'));
            _this.dialog = new $.ui.dialog($dialog, {
                callback: { hide: function () {
                    $dialog.remove()
                }
                },
                widget: {
                    hide: '.close-3'
                }
            }).show();
            _regevent(_this, $dialog);
        }
    };
    infopop.show();
    function _getUI() {
        var ui = '<div class="pop" style="width:660px; margin:10px auto;">';
        ui += ' <div class="pop-bg"></div>';
        ui += ' <div class="pop-container">';
        ui += '     <div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('common_00072') + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '     <div class="pop-bd">';
        ui += '         <div class="dialog_content exit-popup">';
        ui += '             <p class="f14" id="popquitinfo">';
        if (me.opts.quittype === 0) {
            ui += wanerdaoLangTip('common_00073');
        }
        else {
            ui += wanerdaoLangTip('common_00074');
        }
        ui += '             </p>';
        ui += '             <div class="dialog_content exit-popup">此处待完善';
        ui += wanerdaoLangTip('common_00076');
        ui += '             </p>';
        ui += '             </p>';
        ui += '             <textarea class="textarea" id="txtquitdesc"></textarea>';
        ui += '           </div>';
        ui += '             <div class="pop-ft">';
        ui += '                 <a class="button button1" href="javascript:;" id="btnpopquitok">' + wanerdaoLangTip('common_00034') + ' </a>';
        ui += '                 <a class="button button1-disable" href="javascript:;" id="btnpopquitclose">' + wanerdaoLangTip('common_00016') + ' </a>';
        ui += '             </div>';
        ui += '     </div>';
        ui += ' </div>';
        ui += '</div>';
        return ui;
    }
    function _regevent(_this, dialog) {
        $("#formpoplogin").validate({
            rules: {
                txtpopuname: "required",
                txtpopupass: {
                    required: true,
                    rangelength: [8, 20]
                }
            },
            messages: {
                txtpopuname: wanerdaoLangTip('acc_00001'),
                txtpopupass: {
                    required: wanerdaoLangTip('acc_00002'),
                    rangelength: wanerdaoLangTip('acc_00008')
                }
            },
            submitHandler: function (form) {
                _login(Trim($("#txtpopuname").val()), Trim($("#txtpopupass").val()), $("#chkrememberme").attr("checked"), _this, dialog);
            }
        });
        $("#txtpopuname").focus();
        $('#btnpoplogin').click(function () {
            $("#formpoplogin").submit();
        });

        $('#txtpopuname,#txtpopupass,#chkrememberme').keydown(function (e) {
            if (e.keyCode == '13') {
                $("#formpoplogin").submit();
            }
        });

        $('#btnpopquitclose').unbind("click").click(function () {
            dialog.remove();
            _this.dialog.hide();
        });
    }
    function _login(account, pwd, issave, _this, dialog) {
        $('#lipopmsg').notice(wanerdaoLangTip('common_00071'), 2);
        $('#btnpoplogin').removeClass("button button1").addClass("button button1-disable").attr('disabled', true);
        var issl = 0;
        if (issave) {
            issl = 1;
        }
        var d = "{opertype:'login',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}";
        ajaxfunc("wanerdao_login.axd", d, function (data) {
            $('#lipopmsg').notice(wanerdaoLangTip('common_00001'), 2);
            $('#btnpoplogin').removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
        }, function (data) {
            if (data.result) {
                $('#lipopmsg').notice(wanerdaoLangTip('common_00070'), 2);
                if (me.opts != undefined) {
                    dialog.remove();
                    _this.dialog.hide();
                    var callback = me.opts.callback();
                    eval(callback || function () { });
                }
                else {
                    window.location.reload();
                }
            }
            else {
                $('#lipopmsg').notice(data.msg, 2);
                $('#btnpoplogin').removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
            }
        });
    }
}