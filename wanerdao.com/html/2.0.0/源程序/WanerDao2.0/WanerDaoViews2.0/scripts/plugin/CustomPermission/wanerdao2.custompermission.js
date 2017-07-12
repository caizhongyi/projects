(function () {
    CustomPermission = function (opts) {
        var defaults = {
            callback: null,
            chooseOrEdit: 'choose'//choose edit
        };
        var readyCustomState = false; //读取自定义权限的状态 false 则进行读取
        var $f_box;
        opts = $.extend(defaults, opts);
        $('#wanerdaoCustomPer').remove();
        var $custom_per_win = $('<div id="wanerdaoCustomPer" class="pop" style="width:700px; margin:10px auto;" ></div>').appendTo(document.body);
        $custom_per_win.append('<div class="pop-bg"></div>');
        $custom_per_win.append('<div class="pop-container">'
        + '<div class="pop-hd clearfix"><h3>' + wanerdaoLangTip('personal_00077') + '</h3><a href="javascript:;" class="close-3" title="' + wanerdaoLangTip('common_00008') + '"></a></div>'
        + '<div class="pop-bd customer_per_box">'
        + '</div></div>');
        $box = $custom_per_win.find('.customer_per_box');

        /**弹出 模式对话**/
        $f_box = new $.ui.dialog($custom_per_win, {
            callback: { hide: function () {
                $custom_per_win.remove();
            }
            },
            widget: {
                hide: '.close-3'
            }
        }).show();

        init();

        function init() {
            $box.append('<div class="box-panel right-setting">'
                + '<div><label>' + wanerdaoLangTip('personal_00080') + '：</label><select class="plg_select_per" style="width: 200px;"><option>-' + wanerdaoLangTip('personal_00080') + '-</option></select></div>'
                + '<ul class="rights plg_custom_list">'
                + '</ul>'
                + '<h3 class="plg_add_per" style=" cursor: pointer;"><span>+</span>&nbsp;' + wanerdaoLangTip('personal_00081') + '</h3>'
                + '<div style="display:none;" class="plg_add_per_box">'
                + '<div><label>' + wanerdaoLangTip('personal_00082') + '：</label><input class="text plg_per_name"/><input type="hidden" class="plg_per_id" /></div>'
                + '<p>' + wanerdaoLangTip('personal_00076') + '</p>'
                + '<ul class="steps">'
                    + '<li class="steps-item1"><select id="sel5GL" class="friendgroup"><option>' + wanerdaoLangTip('personal_00078') + '</option></select></li>'
                    + '<li class="steps-item2"><select id="selIN5" class="group"><option>' + wanerdaoLangTip('personal_00079') + '</option></select></li>'
                    + '<li class="steps-item3"><div class="labeltext plg_allowUser"><input type="text" class="plg_allowUser_inp"><img src="../images/personal.png" alt=""></div>'
                    + '<input type="button" value="' + wanerdaoLangTip('common_00013') + '" class="button" style="display: none;"/></li>'
                + '</ul>'
                + '<div class="tips-1">'
                    + '<div style="left:80%;" class="arrowhead"></div>'
                    + '<ul class="conditions plg_allowlist">'
                    + '</ul>'
                + '</div>'
                + '<p>' + wanerdaoLangTip('personal_00071') + '</p>'
                + '<div class="labeltext plg_RefuseUser"><input type="text" class="plg_RefuseUser_inp"/><img src="../images/personal.png" alt=""></div><input type="button" value="' + wanerdaoLangTip('common_00013') + '" class="button" style="display: none;"/>'
                + '<div class="tips-1">'
                    + '<div class="arrowhead"></div>'
                    + '<ul class="conditions plg_refuselist">'
                    + '</ul>'
                + '</div>'
                + '<div><input type="checkbox" id="plg_saveperset" /> <label for="plg_saveperset">' + wanerdaoLangTip('personal_00072') + '</label></div>'
                + '</div>'
                + '</div>'
                + '<div class="pop-ft plg_add_per_btn_box" style="display:none;">'
                + '<a href="javascript:;" class="button button1 saveper" >' + wanerdaoLangTip('common_00034') + '</a>'
                + '<a href="javascript:;"  class="button button1-disable cancelper" >' + wanerdaoLangTip('common_00016') + '</a>'
                + '</div>');

            $('select').chosen();
            bindEvent();
        }

        ////绑定事件
        function bindEvent() {
            //绑定权限
            bindPermission(function () { });
            getFriendGroup(); //加载好友分组信息
            getGroup(); //加载圈子信息

            //*加载自定义权限**/
            getCustomOfCur(function (data) {
                var $plg_custom_list = $('.plg_custom_list', $box).empty();
                if (data.result && data.rows) {
                    $.each(data.rows, function (i, v) {
                        var li_custom = jQuery('<li></li>').appendTo($plg_custom_list);
                        li_custom.append(v.NAME);

                        var link_update = jQuery('<a class="edit" href="javascript:;"></a>').appendTo(li_custom);
                        link_update.click(function () {
                            getCustomPermissionDetail(v.ID, function (data) {
                                clearPerPanel();

                                $('.plg_add_per_box', $box).show();
                                $('.plg_add_per_btn_box', $box).show();
                                $('.plg_per_id').val(v.ID);
                                $('.plg_per_name').val(v.NAME);
                                $('#plg_saveperset').attr('checked', true);
                                $('#plg_saveperset').attr('disabled', true);
                                if (data.rows) {
                                    $.each(data.rows, function (i, v) {
                                        var p = v.obj.split('-,-');
                                        if (p[0] == 1) {
                                            addPerItem(p[1], p[2], p[3], $('.plg_allowlist', $custom_per_win));
                                        } else {
                                            addPerItem(p[1], p[2], p[3], $('.plg_refuselist', $custom_per_win));
                                        }
                                    });
                                }
                            });
                        });

                        var link_del = jQuery('<a class="del" href="javascript:;"></a>').appendTo(li_custom);
                        link_del.click(function () {
                            delCustomPermission(v.ID, function (data) {
                                if (data.result) {
                                    li_custom.fadeTo('slow', 0, function (data) {
                                        bindPermission();
                                        $(this).remove();
                                    });
                                }
                            });
                        });
                    });
                }
            });

            //显示/隐藏 自定义权限部分
            $('.plg_add_per', $custom_per_win).click(function () {
                $('.plg_add_per_box', $custom_per_win).toggle();
                $('.plg_add_per_btn_box', $custom_per_win).toggle();
                if ($(this).find('span').html() == '-') {
                    $(this).find('span').html('+');
                } else {
                    $(this).find('span').html('-');
                }

                if (!readyCustomState) {

                }

            });


            $('#chooseAllowUser').click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'chooseAllowUser', callback: function (data) {
                        $.each(data.friend, function (i, v) {
                            addPerItem('friend', v.id, v.name, $('.plg_allowlist', $custom_per_win));
                        });
                    }
                    }
                });
            });

            $('#chooseRefuseUser').click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'chooseRefuseUser', callback: function (data) {
                        $.each(data.friend, function (i, v) {
                            addPerItem('friend', v.id, v.name, $('.plg_refuselist', $custom_per_win));
                        });
                    }
                    }
                });
            });

            $('.plg_allowUser', $custom_per_win).fgAutoCompelte({
                nofind: wanerdaoLangTip('personal_00017'),
                fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
                displayValueField: 'user_id',
                displayTextField: 'name',
                displayCommentField: null,
                callback: addAllowFriend,
                getData: searchFriend,
                showTip: false
            }, $('.plg_allowUser_inp'));


            $('.plg_RefuseUser', $custom_per_win).fgAutoCompelte({
                nofind: wanerdaoLangTip('personal_00017'),
                fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
                displayValueField: 'user_id',
                displayTextField: 'name',
                displayCommentField: null,
                callback: addRefuseFriend,
                getData: searchFriend,
                showTip: false
            }, $('.plg_RefuseUser_inp', $custom_per_win));

            ///保存/修改自定义权限
            $('.saveper', $custom_per_win).click(function () {
                saveCustomPer();
            });

            ///取消
            $('.cancelper', $custom_per_win).click(function () {
                clearPerPanel();
                $('.plg_add_per_box', $custom_per_win).hide();
                $('.plg_add_per_btn_box', $custom_per_win).hide();
            });

        }
        /*还原 自定义权限面板*/
        function clearPerPanel() {
            $('.plg_allowlist', $custom_per_win).empty();
            $('.plg_refuselist', $custom_per_win).empty();
            $('.plg_per_id', $custom_per_win).val('');
            $('.plg_per_name', $custom_per_win).val('');
            $('#plg_saveperset').removeAttr('checked');
            $('#plg_saveperset').removeAttr('disabled');

            if ($('.plg_add_per', $custom_per_win).find('span').html() == '-') {
                $('.plg_add_per', $custom_per_win).find('span').html('+');
            } else {
                $('.plg_add_per', $custom_per_win).find('span').html('-');
            }
        }


        /* 绑定权限 */
        function bindPermission(_callback) {
            $('.plg_select_per', $box).get(0).options.length = 1;

            //绑定权限
            getCurUserPermission(function (data) {
                if (data.result && data.rows) {
                    $.each(data.rows, function (i, v) {
                        $('.plg_select_per', $box).append('<option value="' + v.ID + '">' + v.NAME + '</option>');
                    });
                    $('.plg_select_per', $box).chosen()
                    //绑定选择自定义权限事件
                    $('.plg_select_per', $box).change(function () {
                        //                        if (opts.callback) {
                        //                            opts.callback({ id: $(this).val(), name: $(this).find('option:selected').text() });
                        //                            $f_box.hide();
                        //                        }
                        $f_box.hide();
                    });

                    if (_callback) _callback();
                }
            });
        }

        /** 获取当前用户权限 **/
        function getCurUserPermission(callback) {
            $.ajax({
                url: "../permission_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getcurrentuserpermission'}",
                error: function (data) {

                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        //获取当前用户的自定义权限
        function getCustomOfCur(callback) {
            $.ajax({
                url: '../permission_common.axd',
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getcustomofcur'}",
                error: function () {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }


        // 判断是否还能添加自定义权限
        function canAddCustomPermissionForCurUser(callback) {
            $.ajax({
                url: '../permission_common.axd',
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'canaddcustompermissionforcuruser'}",
                error: function () {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        //获取自定义权限详细信息
        function getCustomPermissionDetail(id, callback) {
            $.ajax({
                url: '../permission_common.axd',
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getcustompermissiondetail',perid:'" + id + "'}",
                error: function () {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        /* 保存自定义权限*/
        function saveCustomPer() {
            var p_id = $('.plg_per_id', $custom_per_win).val();
            var p_name = $('.plg_per_name', $custom_per_win).val();
            var p_allow = getPerItems($('.plg_allowlist', $custom_per_win));
            var p_refuse = getPerItems($('.plg_refuselist', $custom_per_win));

            if (!p_name) {
                $('.saveper', $custom_per_win).notice(wanerdaoLangTip('personal_00073'), 1);
                return false;
            }

            if (!p_allow && !p_refuse) {
                $('.saveper', $custom_per_win).notice(wanerdaoLangTip('personal_00074'), 1);
                return false;
            }
            var setDefault = $('#plg_saveperset').attr('checked') ? 1 : 0;

            clearPerPanel();
            $('.plg_add_per_box', $custom_per_win).hide();
            $('.plg_add_per_btn_box', $custom_per_win).hide();
            if (p_id) {
                updateCustomPermission({
                    perId: p_id,
                    perName: p_name,
                    allowList: p_allow,
                    refuseList: p_refuse,
                    setDefault: 1
                }, function (data) {
                    if (data.result) {

                    } else {
                        $('.saveper', $custom_per_win).notice(data.msg, 1);
                    }
                });
            } else {
                if (setDefault) {
                    canAddCustomPermissionForCurUser(function (data) {
                        if (data.result) {
                            addCustomPermission({
                                perName: p_name,
                                allowList: p_allow,
                                refuseList: p_refuse,
                                setDefault: setDefault
                            }, function (data) {
                                if (data.result) {
                                    $f_box.hide();
                                    if (opts.callback) opts.callback({ id: data.msg, name: p_name });
                                } else {
                                    $('.saveper', $custom_per_win).notice(data.msg, 1);
                                }
                            });
                        } else {
                            $('.saveper', $custom_per_win).notice(wanerdaoLangTip('personal_00075'), 1);
                        }
                    });
                } else {
                    addCustomPermission({
                        perName: p_name,
                        allowList: p_allow,
                        refuseList: p_refuse,
                        setDefault: 0
                    }, function (data) {
                        if (data.result) {
                            $f_box.hide();
                            if (opts.callback) opts.callback({ id: data.msg, name: p_name });
                        } else {
                            $('.saveper', $custom_per_win).notice(data.msg, 1);
                        }
                    });
                }
            }
        }

        /*获取允许/拒绝项*/
        function getPerItems(jBox) {
            var items = '';
            jBox.children('li').each(function () {
                if (items) items += '-,-';
                items += $(this).attr('per');
            });
            return items;
        }

        /*
        //addcustompermission
        allowObj为允许的对象，
        规则：
        对象为好友分组时：Friends--XXX(分组ID)
        对象为圈子时：Group--XXX(圈子ID)，
        对象为个人时：User--XXX(用户ID)。各对象组之间用-,-隔开
        refuseObj为拒绝对象。规则：User--XXX(用户ID)。各对象组之间用-,-隔开
        */
        function addCustomPermission(opts, callback) {
            $.ajax({
                url: '../permission_common.axd',
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'addcustompermission',pername:'" + opts.perName + "',allow:'" + opts.allowList + "',refuse:'" + opts.refuseList + "',setdefault:'" + opts.setDefault + "'}",
                error: function () {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        /*
        修改用户自定义权限
        */
        function updateCustomPermission(opts, callback) {
            $.ajax({
                url: '../permission_common.axd',
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'updatecustompermission',oldper:'" + opts.perId + "',pername:'" + opts.perName + "',allow:'" + opts.allowList + "',refuse:'" + opts.refuseList + "',setdefault:'" + opts.setDefault + "'}",
                error: function () {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        ///friend group 好友分组
        function getFriendGroup() {
            $.ajax({
                url: "../fgroup_friend.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getfriendsgroup'}",
                error: function (data) {
                },
                success: function (data) {
                    if (data.result && data.rows) {
                        var $friend_group_box = $('.friendgroup', $custom_per_win);
                        $.each(data.rows, function (i, v) {
                            var li = jQuery('<option value="' + v.user_id + '">' + v.name + '</option>').appendTo($friend_group_box);
                        });
                        $friend_group_box.chosen();

                        $friend_group_box.change(function () {
                            if ($(this).val()) {
                                addPerItem('friends', $(this).val(), $(this).find('option:selected').text(), $('.plg_allowlist', $custom_per_win));
                                $(this).val('');
                                $(this).chosen();
                            }
                        });
                    }
                }
            });
        }

        //group
        function getGroup() {
            $.ajax({
                url: "../group_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'mygrouplist',pagecurrent: 1,pageSize: 10000}",
                error: function (data) {
                    // $('#sendmsg').notice(msgTip.request_fail, 1);
                },
                success: function (data) {
                    if (data.result && data.rows) {
                        var $group_box = $('.group', $custom_per_win);
                        $.each(data.rows, function (i, v) {
                            var li = jQuery('<option value="' + v.id + '">' + v.name + '</option>').appendTo($group_box);
                        });
                        $group_box.chosen();

                        $group_box.change(function () {
                            if ($(this).val()) {
                                addPerItem('group', $(this).val(), $(this).find('option:selected').text(), $('.plg_allowlist', $custom_per_win));
                                $(this).val('');
                                $(this).chosen();
                            }
                        });

                    }
                }
            });
        }

        /*search friend*/
        function searchFriend(str, callback) {
            $.ajax({
                url: '../searchfriend_common.axd',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: "{opertype:'getfriendslist',titOrContent:'" + str + "',class_id:'',pyKey:'',pagecurrent:'1',pageSize:'6'}",
                error: function (data) {

                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        /**　Add Allow Friend **/
        function addAllowFriend(data) {
            addPerItem('user', data.value, data.text, $('.plg_allowlist', $custom_per_win));
            $('.plg_allowUser').val('');
        }

        /**　Add Refuse Friend **/
        function addRefuseFriend(data) {
            addPerItem('user', data.value, data.text, $('.plg_refuselist', $custom_per_win));
            $('.plg_RefuseUser').val('');
        }

        /* 添加权限项到 允许/拒绝 列表 */
        function addPerItem(type, id, name, jBox) {
            if (id && name) {
                var add = true;
                jBox.children('li').each(function () {
                    if ($(this).attr('per') == (type + '--' + id + '--' + name)) {
                        add = false;
                        return false;
                    }
                });

                if (add) {
                    var li = jQuery('<li per="' + type + '--' + id + '--' + name + '">' + name + '</li>').appendTo(jBox);
                    var span_remove = jQuery('<a class="icon close-2" href="javascript:;"></a>').appendTo(li);
                    span_remove.click(function () {
                        li.remove();
                        return false;
                    });
                }
            }
        }
    }

})(jQuery);