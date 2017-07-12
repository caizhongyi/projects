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
        var ui = '<div class="pop" style="width:550px; margin:10px auto;">';
        ui += ' <div class="pop-bg"></div>';
        ui += ' <div class="pop-container">';
        ui += '     <div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('common_00057') + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '     <div class="pop-bd">';
        ui += '         <div class="form">';
        ui += '         <form id="formpoplogin">';
        ui += '             <ul>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00059') + '</label><input type="text" class="text" maxlength="60" id="txtpopuname" name="txtpopuname"></li>';
        ui += '                 <li><label class="label">' + wanerdaoLangTip('common_00060') + ' </label><input type="password" class="text" maxlength="60" id="txtpopupass" name="txtpopupass"></li>';
        ui += '                 <li id="lipopmsg"><label class="label"></label><input type="checkbox" id="chkrememberme">&nbsp;<label for="chkrememberme">' + wanerdaoLangTip('common_00061') + ' </label></li>';
        //ui += '                 <li id="lipopmsg"></li>'; 
        ui += '             </ul>';
        ui += '             <div class="submit">';
        ui += '                 <a class="button button1" href="javascript:;" id="btnpoplogin">' + wanerdaoLangTip('common_00057') + ' </a>';
        ui += '                 <a class="button button1" href="javascript:;" id="btnpopregister">' + wanerdaoLangTip('common_00058') + ' </a>';
        ui += '                 <a class="button button1-disable" href="javascript:;" id="btnpopclose">' + wanerdaoLangTip('common_00016') + ' </a>';
        ui += '             </div>';
        ui += '         </form>';
        ui += '         </div>';
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
                _login(Trim($("#txtpopuname").val()), Trim($("#txtpopupass").val()), $("#chkrememberme").attr("checked"),_this,dialog);
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
        $('#btnpopregister').unbind("click").click(function () {
            dialog.remove();
            _this.dialog.hide();
            new wanerdaoregister();
        });
        $('#btnpopclose').unbind("click").click(function () {
            dialog.remove();
            _this.dialog.hide();
        });
    }
    function _login(account, pwd, issave,_this,dialog) {
        $('#lipopmsg').notice(wanerdaoLangTip('common_00071'), 2);
        $('#btnpoplogin').removeClass("button button1").addClass("button button1-disable").attr('disabled', true);
        var issl = 0;
        if (issave) {
            issl = 1;
        }
        var d="{opertype:'login',account:'" + account + "',password:'" + pwd + "',isSaveLogin:'" + issl + "'}";
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