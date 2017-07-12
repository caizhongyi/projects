/*
 *	授权弹出层
 *  用法：
 *  var _defaults = {
        params: {
            keyid:'',//后台所要检索的ID
            optype:'',//操作码
            urlaxd:'' //所用axd文件
        },
        callback: null //授权成功后的回调函数
    };
    传递后台数据格式
    var d = "{opertype:'" + me.params.optype + "',keyid:'" + me.params.keyid + "',password:'" + $("#txtauthorizationpwd").val() + "'}";
    keyid:'',//后台所要检索的ID,password：授权密码
    后台返回数据格式
    成功：{result:true,msg:转向的URL地址}
    失败：{result:false,msg:失败信息}
    依赖的js：jquery.ui.xxx.js、wanerdao2.pop.js、多语言文件、wanerdaoutils.js
 */
function authorization(options) {
    var me = this;
    var _defaults = {
        params: {
            keyid:'',
            optype:'',
            urlaxd:''            
        },
        callback: null //回调函数只适用于确认弹出层、success是成功，message是信息提示（后面2种应胥鑫的要求做出修改）
    };
    if (options != undefined) {
        me.opts = jQuery.extend({}, _defaults, options);
    }
    _diplayUI();
    function _post(dialogObj,btnObj,tipObj) {
        var d = "{opertype:'" + me.opts.params.optype + "',keyid:'" + me.opts.params.keyid + "',password:'" + $("#txtauthorizationpwd").val() + "'}";
        ajaxfuncbybefore(me.opts.params.urlaxd, d, function () {
            tipObj.html(wanerdaoLangTip('common_00090'));
            btnObj.removeClass("button button1").addClass("button button1-disable").attr("disabled", true);
        }, function (data) {
            tipObj.html(wanerdaoLangTip('common_00001'));
            btnObj.removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
        }, function (data) {
            if (data.result) {
                tipObj.html(wanerdaoLangTip('common_00091'));
                if (me.opts != undefined) {
                    dialogObj.hide();
                    var callback = me.opts.callback(data);
                    eval(callback || function () { });
                }
            }
            else {
                tipObj.html(data.msg);
                btnObj.removeClass("button button1-disable").addClass("button button1").removeAttr("disabled");
            }
        }); 
    };
    function _regEvent(dialogObj) {
        $("#btnauthorization").unbind("click").click(function () {
            if ($("#txtauthorizationpwd").length < 2) {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: wanerdaoLangTip('active_00086')
                });
                return false;
            }
            else {
                _post(dialogObj, $("#btnauthorization"), $(".checktips"));
            }
        });
    }
    function _diplayUI() {
        $(_getUI()).appendTo($('body'));
        var dialogObj = new $.ui.dialog('#check_authorization_popup', { overlay: false });
        dialogObj.show();
        _regEvent(dialogObj);
    };
    function _getUI() {
        var htext = '<div id="check_authorization_popup" class="pop" style="width:450px; ">';
        htext += '<div class="pop-bg"></div>';
        htext += '<div class="pop-container">';
        htext += '<div class="pop-hd clearfix"><h3>' + wanerdaoLangTip("common_00087") + '</h3>';
        htext += '<a href="javascript:;" class="dialog-hide close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        htext += '  <div class="pop-bd check-authorization-form">';
        htext += '	    <ul>';
        htext += '		    <li><label for="txtauthorizationpwd">' + wanerdaoLangTip("common_00088") + ':</label><input type="password" class="text" maxlength="20" id="txtauthorizationpwd"></li>';
        htext += '		</ul>';
        htext += '  <div class="form-btns">';
        htext += '	    <span class="checktips"></span><input type="button" class="button button1" value="' + wanerdaoLangTip("common_00089") + '" id="btnauthorization">';
        htext += '	  </div>';
        htext += '	</div>';
        htext += '</div>';
        htext += '</div>';
        return htext;
    };
}