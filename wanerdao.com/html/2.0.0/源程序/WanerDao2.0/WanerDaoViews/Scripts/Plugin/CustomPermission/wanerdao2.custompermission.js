(function () {
    CustomPermission = function (opts) {
        var defaults = {
            callback: null,
            overlayopts: {
                left: 0
            }
        };
        var readyCustomState = false; //读取自定义权限的状态 false 则进行读取

        opts = $.extend(defaults, opts);
        $('#wanerdaoCustomPer').remove();
        var box = $('<div id="wanerdaoCustomPer" style="width:710px;" ></div>').appendTo(document.body);

        init();

        //显示权限框
        box.overlay(opts.overlayopts);

        function init() {
            box.empty();

            var table = $('<table class="pop_dialog_table" style="width: 100%; height: 100%;"><tbody></tbody></table').appendTo(box);
            table.append('<tr><td class="pop_topleft"></td><td class="pop_border"></td><td class="pop_topright"></td></tr>');

            var tr_box = $('<tr></tr>').appendTo(table);
            tr_box.append('<td class="pop_border"></td>');

            var td_box = $('<td class="pop_content" style="background:#F9FDFF;"></td>').appendTo(tr_box);
            td_box.append('<h2>选择权限<a href="javascript:;" class="close" title="关闭">关闭</a></h2>');

            var sFrist_box = $('<div id="Sfrist_box" class="Sfrist_box" style="width:auto; margin:0 10px 10px 10px;"></div>').appendTo(td_box);
            sFrist_box.append('权限：<select id="plg_select_per"><option value="">请选择</option></select>');
            sFrist_box.append('<div><span class="custom_tit" id="plg_custom_per" style=" cursor: pointer; line-height: 30px;" > 　自定义权限</span></div>');

            var sFrist_box_con = $('<div class="Ssecond_box_con" style=" padding:10px; border:none; display:none;"></div>').appendTo(sFrist_box);

            var show_custom_box = $('<div class="custom_box clearfix" id=""></div>').appendTo(sFrist_box_con);
            show_custom_box.append('<ul></ul>');
            var add_custom_box = $('<div class="custom_box01 clearfix"></div>').appendTo(sFrist_box_con);
            var oc_handler = $('<span class="custom_tit" id="plg_add_per" style=" cursor: pointer;" > 　添加/修改自定义权限</span>').appendTo(add_custom_box);
            //修改/添加自定义权限框
            add_custom_box.append('<ul id="plg_per_box" style=" margin-top: 10px; display:none;">'
            + '<li class="custom_qx"><input type="hidden" id="plg_per_id" /><label>权限名：</label><input name="plg_per_name" id="plg_per_name" type="text"></li>'
            + '<li class="custom_ts">对他们可见 <font color="#E84C4F">(可多条件输入，结果为所有条件的并集)</font></li>'
            + '<li class="custom_friend clearfix" >'
                + '<label>1</label><select name="friendgroup" id="friendgroup"><option value="">好友分组</option></select>'
                + '<label>2</label><select name="group" id="group"><option value="">我的圈子</option></select>'
                + '<label>3</label><input name="" type="text" class="cus_inp" id="plg_allowUser"><input type="button" id="chooseAllowUser" class="cus_choose_user"/>'
                + '<input name="" type="button" value="添加" class="cus_but" id="addAllow">'
            + '</li>'
            + '<li class="custom_tj" id="plg_allowlist"></li>'
            + '<li>对他们不可见<font color="#E84C4F">(可多条件输入，结果为所有条件的并集)</font></li>'
            + '<li class="custom_xz clearfix">'
                + '<input name="" type="text" class="cus_inp m0" id="plg_refuseUser"><input type="button" id="chooseRefuseUser" ref="#ff" class="cus_choose_user"/>'
                + '<input name="" type="button" value="添加" class="cus_but" id="addRefuse">'
            + '</li>'
            + '<li class="custom_tj" id="plg_refuselist"></li>'
            + '<li><input type="checkbox" id="plg_saveperset" />保存该设定</li>'
            + '<li><input name="" type="button" value="保存" class="hobby_but  saveper"><input name="" type="button" value="取消" class="hobby_but01  cancelper"></li>');

            tr_box.append('<td class="pop_border"></td>');
            table.append('<tr><td class="pop_bottomleft"></td><td class="pop_border"></td><td class="pop_bottomright"></td></tr>');



            bindEvent();
        }

        function bindEvent() {
            //绑定权限
            bindPermission();
            getFriend();
            getGroup();

            //显示/隐藏 自定义权限部分
            $('#plg_custom_per', box).click(function () {
                $('.Ssecond_box_con', box).toggle();
                if (!readyCustomState) {
                    getCustomOfCur(function (data) {
                        var box = $('.custom_box', box).empty();
                        if (data.result && data.rows) {
                            $.each(data.rows, function (i, v) {
                                var li_custom = jQuery('<li></li>').appendTo(box);
                                li_custom.append('<label>' + v.NAME + '</label>');

                                var link_update = jQuery('<a href="javascript:;"></a>').appendTo(li_custom);
                                link_update.click(function () {
                                    getCustomPermissionDetail(v.ID, function (data) {
                                        clearPerPanel();

                                        $('#plg_per_box').show();
                                        $('#plg_per_id').val(v.ID);
                                        $('#plg_per_name').val(v.NAME);
                                        $('#plg_saveperset').attr('checked', true);
                                        $('#plg_saveperset').attr('disabled', true);
                                        if (data.rows) {
                                            $.each(data.rows, function (i, v) {
                                                var p = v.obj.split('-,-');
                                                if (p[0] == 1) {
                                                    addPerItem(p[1], p[2], p[3], $('#plg_allowlist'));
                                                } else {
                                                    addPerItem(p[1], p[2], p[3], $('#plg_refuselist'));
                                                }
                                            });
                                        }
                                    });
                                });

                                var link_del = jQuery('<a href="javascript:;" class="custom_bg"></a>').appendTo(li_custom);
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
                }

            });

            /*clear permission panel*/
            function clearPerPanel() {
                $('#plg_allowlist').empty();
                $('#plg_refuselist').empty();
                $('#plg_per_id').val('');
                $('#plg_per_name').val('');
            }

            $('#chooseAllowUser').click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'chooseAllowUser', callback: function (data) {
                        $.each(data.friend, function (i, v) {
                            addPerItem('friend', v.id, v.name, $('#plg_allowlist'));
                        });
                    }
                    }
                });
            });

            $('#chooseRefuseUser').click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', id: 'ff', elementid: 'chooseRefuseUser', callback: function (data) {
                        $.each(data.friend, function (i, v) {
                            addPerItem('friend', v.id, v.name, $('#plg_refuselist'));
                        });
                    }
                    }
                });
            });

            $('#plg_allowUser').fgAutoCompelte({
                nofind: wanerdaoLangTip('personal_00017'),
                fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
                displayValueField: 'user_id',
                displayTextField: 'name',
                displayCommentField: 'relation_name',
                callback: addAllowFriend,
                getData: searchFriend
            }, $('#plg_allowUser'));


            $('#plg_refuseUser').fgAutoCompelte({
                nofind: wanerdaoLangTip('personal_00017'),
                fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
                displayValueField: 'user_id',
                displayTextField: 'name',
                displayCommentField: 'relation_name',
                callback: addRefuseFriend,
                getData: searchFriend
            }, $('#plg_refuseUser'));



            $('#plg_add_per', box).click(function () {
                $('#plg_per_box').toggle();
                if (!$('#plg_per_id').val()) {
                    $('#plg_saveperset').removeAttr('checked');
                    $('#plg_saveperset').removeAttr('disabled');
                }
                return false;
            });

            $('.saveper', box).click(function () {
                saveCustomPer();
            });


            $('.cancelper', box).click(function () {
                clearPerPanel();
                $('#plg_per_box').hide();
            });

        }

        /* 绑定权限 */
        function bindPermission() {
            $('#plg_select_per').get(0).options.length = 1;
            //绑定权限
            getCurUserPermission(function (data) {
                if (data.result && data.rows) {
                    $.each(data.rows, function (i, v) {
                        $('#plg_select_per').append('<option value="' + v.ID + '">' + v.NAME + '</option>');
                    });

                    //绑定选择自定义权限事件
                    $('#plg_select_per').change(function () {
                        if (opts.callback) opts.callback({ id: $(this).val(), name: $(this).find('option:selected').text() });
                        $('.close').trigger('click');
                        box.remove();
                        //$(this).val('');
                    });
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
            var p_id = $('#plg_per_id').val();
            var p_name = $('#plg_per_name').val();
            var p_allow = getPerItems($('#plg_allowlist'));
            var p_refuse = getPerItems($('#plg_refuselist'));

            if (!p_name) {
                alert('权限名为空');
                return false;
            }

            if (!p_allow && !p_refuse) {
                alert('允许和拒绝的列表都为空');
                return false;
            }
            var setDefault = $('#plg_saveperset').attr('checked') ? 1 : 0;
            if (p_id) {
                updateCustomPermission({
                    perId: p_id,
                    perName: p_name,
                    allowList: p_allow,
                    refuseList: p_refuse,
                    setDefault: 1
                }, function (data) {
                    if (data.result) {
                        init();
                        $('.Ssecond_box_con', box);
                    } else {
                        alert(data.msg);
                    }
                });
            } else {
                canAddCustomPermissionForCurUser(function (data) {
                    if (data.result) {
                        addCustomPermission({
                            perName: p_name,
                            allowList: p_allow,
                            refuseList: p_refuse,
                            setDefault: setDefault
                        }, function (data) {
                            if (data.result) {
                                if (opts.callback) opts.callback({ id: data.msg, name: p_name });
                                $('.close').trigger('click'); box.remove();
                            } else {
                                alert(data.msg);
                            }
                        });
                    } else {
                        alert('添加被拒绝！你可添加的自定义权限数量已到最大数');
                    }
                });
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

        ///friend
        function getFriend() {
            $.ajax({
                url: "../friend_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getfriendslist',pagecurrent: 1,pageSize: 10000,class_id:'',pyKey:'',titOrContent:''}",
                error: function (data) {
                    // $('#sendmsg').notice(msgTip.request_fail, 1);
                },
                success: function (data) {
                    if (data.result && data.rows) {
                        var box = $('#friendgroup');
                        $.each(data.rows, function (i, v) {
                            var li = jQuery('<option value="' + v.user_id + '">' + v.name + '</option>').appendTo(box);

                        });

                        box.change(function () {
                            if ($(this).val()) {
                                addPerItem('friend', $(this).val(), $(this).find('option:selected').text(), $('#allowlist'));
                                $(this).val('');
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
                        var box = $('#group');
                        $.each(data.rows, function (i, v) {
                            var li = jQuery('<option value="' + v.id + '">' + v.name + '</option>').appendTo(box);
                        });

                        box.change(function () {
                            if ($(this).val()) {
                                addPerItem('group', $(this).val(), $(this).find('option:selected').text(), $('#allowlist'));
                                $(this).val('');
                            }
                        });

                    }
                }
            });
        }

        /*search friend*/
        function searchFriend(str, callback) {
            $.ajax({
                url: '../searchfriend_message.axd',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: "{opertype:'searchfriendsbyname',fname:'" + str + "'}",
                error: function (data) {

                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }

        /**　Add Allow Friend **/
        function addAllowFriend(data) {
            addPerItem('user', data.value, data.text, $('#plg_allowlist'));
        }

        /**　Add Refuse Friend **/
        function addRefuseFriend(data) {
            addPerItem('user', data.value, data.text, $('#plg_refuselist'));
        }

        /* 添加权限项到 允许/拒绝 列表 */
        function addPerItem(type, id, name, jBox) {
            if (id && name) {
                //<span>条件1<a href="#"><img src="../images/list/set_icon06.jpg"></a></span>
                var add = true;
                jBox.children('li').each(function () {
                    if ($(this).attr('per') == (type + '--' + id)) {
                        add = false;
                        return false;
                    }
                });

                if (add) {
                    var li = jQuery('<li per="' + type + '--' + id + '--' + name + '">' + name + '</li>').appendTo(jBox);
                    var span_remove = jQuery('<a href="javascript:;"><img src="/images/list/set_icon06.jpg"></a>').appendTo(li);
                    span_remove.click(function () {
                        li.remove();
                    });
                }
            }
        }
    }


})(jQuery);