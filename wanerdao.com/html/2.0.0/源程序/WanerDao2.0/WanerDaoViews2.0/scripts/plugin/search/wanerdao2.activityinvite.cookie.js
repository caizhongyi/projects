//邀请模块
(function ($) {
    $.fn.inviter = function () {
        return this.each(function () {
            $this = $(this);
            $this.after(getUI());
            $("#btngroup").overlay();
            $("#btnfriend").overlay();
            addevent();
            loadcache();
        });
    };
    function getUI() {
        var ui = '<div id="divstep4">';
        ui += '<div class="select_pep_bot" style=" width:500px; margin:0px auto;">';
        ui += ' <p>';
        ui += '   <input id="allfriends" type="checkbox" checked="checked">';
        ui += '   <label for="allfriends">向所有好友发送邀请</label>';
        ui += '   <input id="allgroups" type="checkbox" checked="checked">';
        ui += '   <label for="allgroups">向所有圈子发送邀请</label></p>';
        ui += '<div id="divgroup" style="display:none">';
        ui += ' 向部分圈子成员发送邀请 &nbsp;&nbsp;';
        ui += ' <input id="btngroup" type="button" rel="#gg" class="button" value="' + wanerdaoLangTip('common_00019') + '">';
        ui += ' <div class="select_pep_name">';
        ui += '  <div class="select_name_list clearfix" style="margin-left:60px;" id="groupnewlist">';
        ui += '<img class="this_pep1" src="/images/this_pep.png" style="margin-left:60px;">  </div>';
        ui += '  </div>';
        ui += '</div>';
        ui += '<div id="divfriend" style="display:none">';
        ui += '  向指定好友发送邀请 &nbsp;&nbsp;';
        ui += '  <input id="btnfriend" type="button" rel="#ff" class="button" value="' + wanerdaoLangTip('common_00019') + '">';
        ui += '  <div class="select_pep_name">';
        ui += '    <div class="select_name_list clearfix" style="margin-left:60px;" id="groupnewlist" id="friendnewlist">';
        ui += '<img class="this_pep2" src="/images/this_pep.png"></div>';
        ui += '  </div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';
        return ui;
    };
    function savefrienddata() {
        var t = '';
        jQuery('#friendnewlist span').each(function () {
            t += jQuery(this).attr("id") + ',';
        });
        t = t.substring(0, t.length - 1);
        data(document.body, "frienddata", t);
    };
    function savegroupdata() {
        var t = '';
        jQuery('#groupnewlist span').each(function () {
            t += jQuery(this).attr("id") + ',';
        });
        t = t.substring(0, t.length - 1);
        data(document.body, "groupdata", t);
    };
    function addevent() {
        jQuery('#allfriends').click(function () {
            $.cookies.set("allfriends", $("#allfriends").attr("checked") !== false ? "on" : "off");
            if (!jQuery(this).attr("checked")) {
                jQuery('#divfriend').fadeIn();
            }
            else {
                jQuery('#divfriend').fadeOut();
            }
        });
        jQuery('#allgroups').click(function () {
            $.cookies.set("allgroups", $("#allgroups").attr("checked") !== false ? "on" : "off");
            if (!jQuery(this).attr("checked")) {
                jQuery('#divgroup').fadeIn();
            }
            else {
                jQuery('#divgroup').fadeOut();
            }
        });

        jQuery("#btnfriend").click(function () {
            wanerdaoPop({
                comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'btnfriend', callback: function (data) {
                    jQuery.each(data.friends, function (i, n) {
                        var temp = '<span id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", data.friends[i].id);
                        temp = temp.replace("{1}", data.friends[i].id);
                        temp = temp.replace("{2}", data.friends[i].name);
                        if (!(jQuery('#friendnewlist span[id="' + data.friends[i].id + '"]') != null
                            && jQuery('#friendnewlist span[id="' + data.friends[i].id + '"]').length >= 1)) {
                            jQuery('#friendnewlist').append(temp);
                        }

                    });
                    jQuery('#friendnewlist span').unbind("click").click(function () {
                        jQuery(this).remove();
                        savefrienddata();
                        savefriendcachedata();
                    });
                    savefrienddata();
                    savefriendcachedata();
                }
                }
            });
        });
        jQuery("#btngroup").click(function () {
            wanerdaoPop({
                comopts: { titleid: 'common_00012', typename: 'group', id: 'gg', elementid: 'btngroup', callback: function (data) {
                    jQuery.each(data.group, function (i, n) {
                        var temp = '<span id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                        temp = temp.replace("{0}", data.group[i].id);
                        temp = temp.replace("{1}", data.group[i].id);
                        temp = temp.replace("{2}", data.group[i].name);
                        if (!(jQuery('#groupnewlist span[id="' + data.group[i].id + '"]') != null
                            && jQuery('#groupnewlist span[id="' + data.group[i].id + '"]').length >= 1)) {
                            jQuery('#groupnewlist').append(temp);
                        }
                    });
                    jQuery('#groupnewlist span').unbind("click").click(function () {
                        jQuery(this).remove();
                        savegroupdata();
                        savegroupscachedata();
                    });
                    savegroupdata();
                    savegroupscachedata()
                }
                }
            });
        });
    };
    function savefriendcachedata() {
        var v = $('#friendnewlist').html();
        $.cookies.set("activityfriendslist", v);
    };
    function savegroupscachedata() {
        var v = $('#groupnewlist').html();
        $.cookies.set("activitygroupslist", v);
    };
    //加载cache
    function loadcache() {
        if ($.cookies.get("allfriends") != null) {//向所有好友发送邀请
            $("#allfriends").cookieBind();
            if (!$("#allfriends").attr("checked")) {
                jQuery('#divfriend').fadeIn();
                if ($.cookies.get("activityfriendslist") != null) {//向所有好友发送邀请
                    jQuery('#friendnewlist').append($.cookies.get("activityfriendslist"));
                    jQuery('#friendnewlist span').unbind("click").click(function () {
                        jQuery(this).remove();
                        savefrienddata();
                        savefriendcachedata();
                    });
                }
            }
            else {
                jQuery('#divfriend').fadeOut();
            }
        }
        if ($.cookies.get("allgroups") != null) {//向所有圈子发送邀请
            $("#allgroups").cookieBind();
            if (!$("#allgroups").attr("checked")) {
                jQuery('#divgroup').fadeIn();
                if ($.cookies.get("activitygroupslist") != null) {//向所有好友发送邀请
                    jQuery('#groupnewlist').append($.cookies.get("activitygroupslist"));
                    jQuery('#groupnewlist span').unbind("click").click(function () {
                        jQuery(this).remove();
                        savefrienddata();
                        savefriendcachedata();
                    });
                }
            }
            else {
                jQuery('#divgroup').fadeOut();
            }
        }
    };
})(jQuery);
