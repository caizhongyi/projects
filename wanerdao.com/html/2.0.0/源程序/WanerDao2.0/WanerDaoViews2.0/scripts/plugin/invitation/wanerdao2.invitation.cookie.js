//邀请模块
/*
*	以前所有的邀请都统一使用此版本邀请，本邀请插件分为有cookie版和无cookie版，从文件名即可区分,
*  使用方法不变。
*/
(function ($) {
    $.fn.inviter = function () {
        return this.each(function () {
            var $this = $(this);
            $this.append(_getUI());
            _regevent();
        });
        //UI
        function _getUI() {
            var ui = '<div class="setmodList sendInvite">';
            ui += '  <dl>';
            ui += '     <dd class="formTitle">&nbsp;</dd> ';
            ui += '     <dd class="formMain"> ';
            ui += '         <label for="allfriends"><input type="checkbox"  checked="checked" id="allfriends" />向所有好友发送邀请</label> ';
            ui += '         <label for="allgroups"><input type="checkbox"  checked="checked" id="allgroups" />向所有圈子发送邀请</label> ';
            ui += '     </dd>';
            ui += '  </dl>';
            ui += '  <dl class="clear2"></dl>';
            ui += '  <dl id="divgroup" style="display:none">';
            ui += '     <dd class="formTitle">向部分圈子成员发送邀请：</dd>';
            ui += '     <dd class="formMain"> <input id="btngroup" type="button" value="' + wanerdaoLangTip('common_00019') + '" class="buttonG btn_w56 btn_h28 btnGary_56" /></dd>';
            ui += '  </dl>';
            ui += '  <dl class="clear2"></dl>';
            ui += '  <dl  id="divgroup_select" style="display:none">';
            ui += '     <dd class="formTitle">已添加：</dd>';
            ui += '     <dd class="formMain">';
            ui += '         <div class="tips_G tipW_430 fCgray3">';
            ui += '                 <div class="tips_G_main tipW_430">';
            ui += '                     <ul id="groupnewlist"></ul>';
            ui += '                 </div>';
            ui += '         </div>';
            ui += '     </dd>';
            ui += '  </dl>';
            ui += '  <dl class="clear2"></dl>';
            ui += '  <dl id="divfriend" style="display:none">';
            ui += '     <dd class="formTitle">向指定好友发送邀请：</dd>';
            ui += '     <dd class="formMain"> <input id="btnfriend" type="button" value="' + wanerdaoLangTip('common_00019') + '" class="buttonG btn_w56 btn_h28 btnGary_56" /></dd>';
            ui += '  </dl>';
            ui += '  <dl class="clear2"></dl>';
            ui += '  <dl id="divfriend_select" style="display:none">';
            ui += '     <dd class="formTitle">已添加：</dd>';
            ui += '     <dd class="formMain">';
            ui += '         <div class="tips_G tipW_430 fCgray3">';
            ui += '                 <div class="tips_G_main tipW_430">';
            ui += '                     <ul id="friendnewlist"></ul>';
            ui += '                 </div>';
            ui += '         </div>';
            ui += '     </dd>';
            ui += '  </dl>';
            ui += '  <dl class="clear2"></dl>';
            ui += '</div> ';
            return ui;
        }
        function _savefrienddata() {
            var t = '';
            $('#friendnewlist li').each(function () {
                t += $(this).attr("id") + ',';
            });
            t = t.substring(0, t.length - 1);
            $.data(document.body, "frienddata", t);
        }
        function _savegroupdata() {
            var t = '';
            $('#groupnewlist li').each(function () {
                t += $(this).attr("id") + ',';
            });
            t = t.substring(0, t.length - 1);
            $.data(document.body, "groupdata", t);
        }
        function _regevent() {
            $('#allfriends').click(function () {
                if (!$(this).attr("checked")) {
                    $('#divfriend').fadeIn();
                    $('#divfriend_select').fadeIn();
                }
                else {
                    $('#divfriend').fadeOut();
                    $('#divfriend_select').fadeOut();
                }
            });
            $('#allgroups').click(function () {
                if (!$(this).attr("checked")) {
                    $('#divgroup').fadeIn();
                    $('#divgroup_select').fadeIn();
                }
                else {
                    $('#divgroup').fadeOut();
                    $('#divgroup_select').fadeOut();
                }
            });
            _savefrienddata();
            _savegroupdata();
            $("#btnfriend").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', elementid: 'btnfriend', callback: function (data) {
                        $.each(data.friends, function (i, n) {
                            var temp = '<li id="{0}" class="delBtn"><a href="/personal/personal_info.html?uid={1}" target="_blank">{2}</a></li>';
                            temp = temp.replace("{0}", data.friends[i].id);
                            temp = temp.replace("{1}", data.friends[i].id);
                            temp = temp.replace("{2}", data.friends[i].name);
                            if (!($('#friendnewlist li[id="' + data.friends[i].id + '"]') != null
                            && $('#friendnewlist li[id="' + data.friends[i].id + '"]').length >= 1)) {
                                //$('#friendnewlist').empty();
                                $('#friendnewlist').append(temp);
                            }

                        });
                        $('#friendnewlist li').click(function () {
                            $(this).remove();
                            _savefrienddata();
                        });
                        _savefrienddata();
                    }
                    }
                });
            });
            $("#btngroup").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00012', typename: 'group', elementid: 'btngroup', callback: function (data) {
                        $.each(data.group, function (i, n) {
                            var temp = '<li id="{0}" class="delBtn"><a href="/personal/personal_info.html?uid={1}" target="_blank">{2}</a></li>';
                            temp = temp.replace("{0}", data.group[i].id);
                            temp = temp.replace("{1}", data.group[i].id);
                            temp = temp.replace("{2}", data.group[i].name);
                            if (!($('#groupnewlist li[id="' + data.group[i].id + '"]') != null
                            && $('#groupnewlist li[id="' + data.group[i].id + '"]').length >= 1)) {
                                $('#groupnewlist').append(temp);
                            }
                        });
                        $('#groupnewlist li').click(function () {
                            $(this).remove();
                            _savegroupdata();
                        });
                        _savegroupdata();
                    }
                    }
                });
            });
        }
    };
})($);