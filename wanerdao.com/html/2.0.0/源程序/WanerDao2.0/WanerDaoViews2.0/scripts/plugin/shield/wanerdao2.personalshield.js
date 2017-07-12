(function ($) {

    var fClassOverLoad = false; //好友分组是否已经获取
    var fClassList = []; //好友分组
    $.fn.PersonalShield = function (opts) {
        var defaults = {
            aa: ''
        };

        //if (fClassOverLoad) {
        getFriendsGroup(function () { }, function () {
            renderUI();
        });
        //        } else {

        //        }

    }
    /*UI 呈现*/
    function renderUI() {
        if ($('body').find('#personal_shield_win').length == 0) {
            var uiHTML = '<div id="personal_shield_win" class="pop" style="width:550px; margin:10px auto;">'
                        + '<div class="pop-bg"></div>'
                        + '<div class="pop-container"">'
                            + '<div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('plugin_00001') + '</h3><a href="javascript:;" class="close-3" title="关闭"></a></div>'
                            + '<div class="pop-bd  address-tips">'
                                + '<div class="tips-nav" >'
                                    + '<a class="current" href="javascript:;" id="shield_state_set" style="width: 60px;">' + wanerdaoLangTip('plugin_00002') + '</a>'
                                    + '<a href="javascript:;" id="shield_group_set" style="width: 60px;">' + wanerdaoLangTip('plugin_00003') + '</a>'
                                    + '<a href="javascript:;" id="shield_activity_set" style="width: 60px;">' + wanerdaoLangTip('plugin_00004') + '</a>'
                                + '</div>'
                                + '<div class="myactiveinfo clearfix" id="shield_state_set_container"><img src="/images/loading.gif" style=" width:20px; height:20px;"/>'
                                    + '<div class="info-side"  style="height:300px; overflow-y:auto; display:none;">'
                                    + '</div>'
                                    + '<div class="info-content" style=" display:none;">'
                                    + '</div>'
                                + '</div>'
                                + '<div class="myactiveinfo clearfix" id="shield_group_set_container" style="display:none;"><img src="/images/loading.gif" style=" width:20px; height:20px;"/>'
                                    + '<div class="info-side"  style="height:300px; overflow-y:auto; display:none;"><img src="/images/loading.gif" style=" width:20px; height:20px;"/>'
                                    + '</div>'
                                    + '<div class="info-content" style=" display:none;">'
                                    + '</div>'
                                + '</div>'
                                + '<div class="myactiveinfo clearfix" id="shield_activity_set_container" style="display:none;"><img src="/images/loading.gif" style=" width:20px; height:20px;"/>'
                                    + '<div class="info-side"  style="height:300px; overflow-y:auto; display:none;"><img src="/images/loading.gif" style=" width:20px; height:20px;"/>'
                                    + '</div>'
                                    + '<div class="info-content" style=" display:none;">'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>';
            jQuery(uiHTML).appendTo($('body'));

            bindEvent($('body').find('#personal_shield_win'));
        }

        var $personalShieldWin = $('body').find('#personal_shield_win');

        /**弹出 模式对话**/
        $dialogBox = new $.ui.dialog($personalShieldWin, {
            callback: { hide: function () {
                $personalShieldWin.remove();
            }
            },
            widget: {
                hide: '.close-3'
            }
        }).show();
    }

    /*绑定事件*/
    function bindEvent($win) {
        getShieldFriendListByState('new', $('#shield_state_set'), function () {
            //error

        }, function () {
            //success
            $win.find('#shield_group_set').removeClass('current');
            $win.find('#shield_activity_set').removeClass('current');
            $('#shield_state_set').addClass('current');
            $('#shield_state_set_container').show();
            $('#shield_group_set_container').hide();
            $('#shield_activity_set_container').hide();
        });
        bindTab($win);
    }

    /*切换选项卡*/
    function bindTab($win) {
        $win.find('#shield_state_set').click(function () {
            if (!$(this).hasClass('current')) {
                if ($(this).attr('overload') != '1') {
                    getShieldFriendListByState('new', $('#shield_state_set'), function () {
                        //error

                    }, function () {
                        //success
                        $win.find('#shield_group_set').removeClass('current');
                        $win.find('#shield_activity_set').removeClass('current');
                        $win.find('#shield_state_set').addClass('current');
                        $('#shield_state_set_container').show();
                        $('#shield_group_set_container').hide();
                        $('#shield_activity_set_container').hide();
                    });
                } else {
                    $win.find('#shield_group_set').removeClass('current');
                    $win.find('#shield_activity_set').removeClass('current');
                    $win.find('#shield_state_set').addClass('current');
                    $('#shield_state_set_container').show();
                    $('#shield_group_set_container').hide();
                    $('#shield_activity_set_container').hide();
                }
            }
        });

        $win.find('#shield_group_set').click(function () {
            if (!$(this).hasClass('current')) {
                if ($(this).attr('overload') != '1') {
                    getShieldFriendListByState('group', $('#shield_group_set'), function () {
                        //error

                    }, function () {
                        //success
                        $win.find('#shield_state_set').removeClass('current');
                        $win.find('#shield_activity_set').removeClass('current');
                        $win.find('#shield_group_set').addClass('current');
                        $('#shield_state_set_container').hide();
                        $('#shield_group_set_container').show();
                        $('#shield_activity_set_container').hide();
                    });
                } else {
                    $win.find('#shield_state_set').removeClass('current');
                    $win.find('#shield_activity_set').removeClass('current');
                    $win.find('#shield_group_set').addClass('current');
                    $('#shield_state_set_container').hide();
                    $('#shield_group_set_container').show();
                    $('#shield_activity_set_container').hide();
                }
            }
        });
        $win.find('#shield_activity_set').click(function () {
            if (!$(this).hasClass('current')) {
                if ($(this).attr('overload') != '1') {
                    getShieldFriendListByState('active', $('#shield_activity_set'), function () {
                        //error

                    }, function () {
                        //success
                        $win.find('#shield_state_set').removeClass('current');
                        $win.find('#shield_group_set').removeClass('current');
                        $win.find('#shield_activity_set').addClass('current');
                        $('#shield_state_set_container').hide();
                        $('#shield_group_set_container').hide();
                        $('#shield_activity_set_container').show();
                    });
                } else {
                    $win.find('#shield_state_set').removeClass('current');
                    $win.find('#shield_group_set').removeClass('current');
                    $win.find('#shield_activity_set').addClass('current');
                    $('#shield_state_set_container').hide();
                    $('#shield_group_set_container').hide();
                    $('#shield_activity_set_container').show();
                }
            }
        });

    }

    /*获取好友分组*/
    function getFriendsGroup(error, success) {
        ajaxfunc("friendgroup_friend.axd", "{opertype:'getfriendsgroup'}", function () {
            error();
        }, function (data) {
            if (fClassOverLoad) {
                success();
            } else {
                if (data.result && data.rows.length >= 0) {
                    fClassOverLoad = true;
                    fClassList = [];
                    $.each(data.rows, function (i, v) {
                        fClassList.push({ id: v.id, name: v.name });
                    });

                    success();
                } else {
                    error();
                }

            }

        });

    }


    /*获取好友分组*/
    function getFriendsByGroup($handler, fgId, error, success, type) {
        ajaxfunc("friendgroup_friend.axd", "{opertype:'getfriendsbyclass',class_id:'" + fgId + "'}", function () {
            error();
        }, function (data) {
            if (data.result && data.rows.length >= 0) {
                var $friendBox = jQuery('<ul></ul>');

                $.each(data.rows, function (i, v) {
                    var li_friend = jQuery('<div fId="' + v.id + '">' + v.name + '</div>').css({ 'cursor': 'pointer', 'padding': '2px 10px' }).appendTo($friendBox);
                    li_friend.click(function () {
                        var $shield = $friendBox.parent().parent().next('.info-content');
                        if ($shield.find('div[fid="' + v.id + '"]').length == 0) {
                            ajaxfunc('shield_home.axd', "{opertype:'shielddynamicstate',source_type_id:'" + type + "',target_user_id:'" + v.id + "'}", null, function (data) {
                                if (data.result) {
                                    var $div_shield_itm = jQuery($wd.format('<div fid="{0}">{1}</div>', v.id, v.name)).css({ 'cursor': 'pointer', 'padding': '2px 10px' }).appendTo($shield);
                                    //删除屏蔽
                                    $div_shield_itm.deleteSheild(type);
                                }
                            });
                        }
                    });
                });

                $handler.after($friendBox);

                success();
            } else {
                error();
            }
        });
    }

    /*根据状态id查询好友屏蔽列表*/
    function getShieldFriendListByState(type, $handler, error, success) {
        ajaxfunc("friendgroup_home.axd", "{opertype:'getshieldstatelist',source_type_id:'" + type + "'}", function () {
            error();
        }, function (data) {
            if (data.result) {
                $handler.attr('overload', '1');
                var boxId = $handler.attr('id') + '_container';
                var $box = $('#' + boxId);
                var $friendClassBox = $box.find('.info-side').empty();
                var $shieldBox = $box.find('.info-content').empty();
                $box.children().first().remove();

                $.each(fClassList, function (i, v) {
                    $friendClassBox.append('<div><h3 fclassid="' + v.id + '" class="ui-accordion-header" style="cursor:pointer;" >' + v.name + '</h3></div>');
                });

                $friendClassBox.find('h3').click(function () {
                    var $h3 = $(this);
                    if ($(this).attr('overload') != '1') {
                        getFriendsByGroup($(this), $(this).attr('fclassid'), function () {
                        }, function () {
                            $h3.attr('overload', '1');
                            $h3.next().show();
                        }, type);
                    } else {
                        $(this).next().toggle();
                    }
                });

                $.each(data.rows, function (i, v) {
                    var $div_shield_itm = jQuery($wd.format('<div fid="{0}">{1}</div>', v.block_id, v.name)).css({ 'cursor': 'pointer', 'padding': '2px 10px' }).appendTo($shieldBox);
                    //删除屏蔽
                    $div_shield_itm.deleteSheild(type);
                });

                $box.children().show();
                success();
            } else {
                error();
            }
        });
    }

    jQuery.fn.extend({
        //删除好友屏蔽
        deleteSheild: function (type) {
            var $this = $(this);
            var uid = $(this).attr('fid');
            $(this).click(function () {
                //delshielddynstate
                ajaxfunc('shield_home.axd', "{opertype:'delshielddynstate',sourceType:'" + type + "',targetUserId:'" + uid + "'}", null, function (data) {
                    if (data.result) {
                        $this.remove();
                    }
                });
            });
        }
    });

})(jQuery);