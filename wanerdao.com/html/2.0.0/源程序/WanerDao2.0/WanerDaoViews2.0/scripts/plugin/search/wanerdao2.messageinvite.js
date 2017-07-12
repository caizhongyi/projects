
(function ($) {
    $.fn.inviter = function () {        
        return this.each(function () {
            $this=$(this);
            $this.after(jQuery.getUI());
            $("#btngroup").overlay();
            $("#btnfriend").overlay();
            jQuery.addevent();
        });
    };
})(jQuery);
jQuery.extend({
    getUI: function () {
        var ui = '<div class="prPubW">';
        ui += ' <div class="pubTit">';
        ui += '   <div class="formTit clearfix">';
        ui += '   <input id="allfriends" type="checkbox">';
        ui += '   <label for="allfriends">向所有好友发送邀请</label>';
        ui += '   <input id="allgroups" type="checkbox">';
        ui += '   <label for="allgroups">向所有圈子发送邀请</label>';
        ui += '   </div>';
        ui += ' </div>';
        ui += '<div id="divfriend" style="display:none">';
        ui += '<div class="fmLine1">';
        ui += '<div class="c1Name">选择好友：</div>';
        ui += '<div class="dTbc">';
        ui += '  <input id="btnfriend" type="button" rel="#ff" class="button" value="' + wanerdaoLangTip('common_00019') + '">';
        ui += '</div>';
        ui += '</div>';
        ui += '<div class="fmLine2 alter">';
        ui += '<div class="c1Name">已选好友：</div>';
        ui += '<div class="dTbc">';
        ui += '<div class="inpW_l">';
        ui += '<div class="t"></div>';
        ui += '<div class="m">';
        ui += '<ul class="clearfix" id="friendnewlist"></ul>';
        ui += '</div>';
        ui += '<div class="b"></div>';        
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';
        ui += '<div id="divgroup" style="display:none">';
        ui += '<div class="fmLine1">';
        ui += '<div class="c1Name">选择圈子：</div>';
        ui += '<div class="dTbc">';
        ui += ' <input id="btngroup" type="button" rel="#gg" class="button" value="' + wanerdaoLangTip('common_00019') + '">';
        ui += '</div>';
        ui += '</div>';
        ui += '<div class="fmLine2">';
        ui += '<div class="c1Name">已选圈子：</div>';
        ui += '<div class="dTbc">';
        ui += '<div class="inpW_l">';
        ui += '<div class="t"></div>';
        ui += '<div class="m">';
        ui += '<ul class="clearfix" id="groupnewlist"></ul>';
        ui += '</div>';
        ui += '<div class="b"></div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';
        ui += '</div>';

        return ui;
    },
    savefrienddata: function () {
        var t = '';
        jQuery('#friendnewlist li').each(function () {
            t += jQuery(this).attr("id") + ',';
        });
        t = t.substring(0, t.length - 1);
        jQuery.data(document.body, "frienddata", t);
    },
    savegroupdata: function () {
        var t = '';
        jQuery('#groupnewlist li').each(function () {
            t += jQuery(this).attr("id") + ',';
        });
        t = t.substring(0, t.length - 1);
        jQuery.data(document.body, "groupdata", t);
    },
    addevent: function () {
        jQuery('#allfriends').click(function () {
            if (!jQuery(this).attr("checked")) {
                jQuery('#divfriend').fadeIn();
            }
            else {
                jQuery('#divfriend').fadeOut();
            }
        });
        jQuery('#allgroups').click(function () {
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
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><b></b></li>';
                        temp = temp.replace("{0}", data.friends[i].id);
                        temp = temp.replace("{1}", data.friends[i].id);
                        temp = temp.replace("{2}", data.friends[i].name);
                        if (!(jQuery('#friendnewlist li[id="' + data.friends[i].id + '"]') != null
                            && jQuery('#friendnewlist li[id="' + data.friends[i].id + '"]').length >= 1)) {
                            jQuery('#friendnewlist').append(temp);
                        }

                    });
                    jQuery('#friendnewlist li').click(function () {
                        jQuery(this).remove();
                        jQuery.savefrienddata();
                    });
                    jQuery.savefrienddata();
                }
                }
            });
        });
        jQuery("#btngroup").click(function () {
            wanerdaoPop({
                comopts: { titleid: 'common_00012', typename: 'group', id: 'gg', elementid: 'btngroup', callback: function (data) {
                    jQuery.each(data.group, function (i, n) {
                        var temp = '<li id="{0}"><a href="{1}" target="_blank">{2}</a><b></b></li>';
                        temp = temp.replace("{0}", data.group[i].id);
                        temp = temp.replace("{1}", data.group[i].id);
                        temp = temp.replace("{2}", data.group[i].name);
                        if (!(jQuery('#groupnewlist li[id="' + data.group[i].id + '"]') != null
                            && jQuery('#groupnewlist li[id="' + data.group[i].id + '"]').length >= 1)) {
                            jQuery('#groupnewlist').append(temp);
                        }
                    });
                    jQuery('#groupnewlist li').click(function () {
                        jQuery(this).remove();
                        jQuery.savegroupdata();
                    });
                    jQuery.savegroupdata();
                }
                }
            });
        });
    }
});