var msgTip = {
    education_null: 'No education information',
    work_null: 'No job information',
    per_name_null: 'Permission name is empty',
    per_allow_and_refuse_null: 'Allow and Deny list is empty',
    request_fail: 'Request fails！'
}

function setMsgTip(options) {
    msgTip = $.extend(msgTip, options);
}

var options;
var cp_count_out = true;
$(function () {
    $('#add_per').click(function () {
        $('#per_box').toggle();
        return false;
    });

    getCurUserPermission(function (data) {
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                options += $wd.format('<option value="{0}">{1}</option>', v.ID, v.NAME);
            });

            $('#baseinfoPer').append(options);
            $('#interestPer').append(options);
            $('#contactPer').append(options);
            $('#canMsgMe').append(options);
            $('#canFriendRequest').append(options);

            $('#baseinfoPer').chosen();
            $('#interestPer').chosen();
            $('#contactPer').chosen();
            $('#canMsgMe').chosen();
            $('#canFriendRequest').chosen();

            getBaseInfoPer();
            getInterestsPer();
            getContactPer();
            getEducationPer();
            getWorkPer();

            //            canAddCustomPermissionForCurUser(function (data) {
            //                $('#selectPermission').append('<option value="more">自定义...</option>');
            //            });
        }
    });

    selectCustomPermissionList();

    $('#baseinfoPer').change(function () {
        updateBaseInfoPer($(this).val());
    });

    $('#interestPer').change(function () {
        updateInterestsPer($(this).val());
    });

    $('#contactPer').change(function () {
        updateContactPer($(this).val());
    });

    $('#educationPer').change(function () {
        updateEducationPer($(this).val());
    });

    $('#workPer').change(function () {
        updateWorkPer($(this).val());
    });

    $('#canMsgMe').change(function () {
        updateWhoCanMsgToMe($(this).val());
    });

    $('#canFriendRequest').change(function () {
        updateWhoCanSendFriendRequestToMe($(this).val());
    });

    $('#canFindMe').change(function () {
        updateIfCanSearch($(this).val());
    });

    getGroup(); //group

    getFriendGroup(); //getFriendGroup

    $('.submit').click(function () {
        saveCustomPer();
    });

    $('.cancel').click(function () {
        clearPerPanel();
        $('#per_box').hide();
    });

    $('#addAllow').click(function () {
        addPerItem('user', $('#allowUser').attr('per'), $('#allowUser').val(), $('#allowlist'));
        $('#allowUser').attr('per', '');
        $('#allowUser').val('');
    });

    $('#addRefuse').click(function () {
        addPerItem('user', $('#refuseUser').attr('per'), $('#refuseUser').val(), $('#refuselist'));
        $('#refuseUser').attr('per', '');
        $('#refuseUser').val('');
    });

    $('#allowUser').fgAutoCompelte({
        nofind: wanerdaoLangTip('personal_00017'),
        fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
        displayValueField: 'user_id',
        displayTextField: 'name',
        displayCommentField: 'relation_name',
        callback: addAllowFriend,
        getData: searchFriend
    }, $('#allowUser'));


    $('#refuseUser').fgAutoCompelte({
        nofind: wanerdaoLangTip('personal_00017'),
        fingMsg: wanerdaoLangTip('personal_00018'), /*提示栏的信息*/
        displayValueField: 'user_id',
        displayTextField: 'name',
        displayCommentField: 'relation_name',
        callback: addRefuseFriend,
        getData: searchFriend
    }, $('#refuseUser'));

    $('#chooseAllowUser').click(function () {
        wanerdaoPop({
            comopts: { titleid: 'common_00011', typename: 'friends', elementid: 'chooseAllowUser', callback: function (data) {
                $.each(data.friends, function (i, v) {
                    addPerItem('Friends', v.id, v.name, $('#allowlist'));
                });
            }
            }
        });
    });

    $('#chooseRefuseUser').click(function () {
        wanerdaoPop({
            comopts: { titleid: 'common_00011', typename: 'friends', elementid: 'chooseRefuseUser', callback: function (data) {
                $.each(data.friends, function (i, v) {
                    addPerItem('Friends', v.id, v.name, $('#refuselist'));
                });
            }
            }
        });
    });

});

function selectCustomPermissionList() {
    getCustomOfCur(function (data) {
        var box = $('.custom_box').empty();
        if (data.result && data.rows) {
            $.each(data.rows, function (i, v) {
                var li_custom = jQuery('<li></li>').appendTo(box);
                li_custom.append(v.NAME);

                var link_update = jQuery('<a href="javascript:;" class="edit"></a>').appendTo(li_custom);
                link_update.click(function () {
                    getCustomPermissionDetail(v.ID, function (data) {
                        clearPerPanel();

                        $('#per_box').show();
                        $('#per_id').val(v.ID);
                        $('#per_name').val(v.NAME);
                        if (data.rows) {
                            $.each(data.rows, function (i, v) {
                                var p = v.obj.split('-,-');
                                if (p[0] == 1) {
                                    addPerItem(p[1], p[2], p[3], $('#allowlist'));
                                } else {
                                    addPerItem(p[1], p[2], p[3], $('#refuselist'));
                                }
                            });
                        }
                    });
                });

                var link_del = jQuery('<a href="javascript:;" class="del"></a>').appendTo(li_custom);
                link_del.click(function () {
                    delCustomPermission(v.ID, function (data) {
                        if (data.result) {
                            li_custom.fadeTo('slow', 0, function (data) {
                                $(this).remove();
                            });
                        }
                    });
                });

            });
        }

        canAddCustomPermissionForCurUser(function (data) {
            if (data.result) {
                cp_count_out = false;
            }
        });
    });
}

/** Get BaseInfo Permission ***/
function getBaseInfoPer() {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalprofile'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.obj) {
                $('#baseinfoPer').val(data.obj.permission);
                $('#canFriendRequest').val(data.obj.friend_request);
                $('#canMsgMe').val(data.obj.is_msg_me);
                $('#canFindMe').val(data.obj.is_find_me ? '1' : '0');


                $('#baseinfoPer').chosen();
                $('#canFriendRequest').chosen();
                $('#canMsgMe').chosen();
                $('#canFindMe').chosen();
            }
        }
    });
}

/** Get Interest Permission ***/
function getInterestsPer() {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalinterests'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.obj) {
                $('#interestPer').val(data.obj.permission);
                $('#interestPer').chosen();
            }
        }
    });
}

/** Get Contact Permission ***/
function getContactPer() {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getpersonalcontact'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.obj) {
                $('#contactPer').val(data.obj.permission);
                $('#contactPer').chosen();
            }
        }
    });
}

/** Get Education Permission ***/
function getEducationPer() {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'geteducationpermission'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.obj) {
                $('#educationPer').append(options);
                $('#educationPer').val(data.obj.permission);
            } else {
                $('#educationPer').append('<option value="">' + msgTip.education_null + '</option>').attr('disabled', true);
            }
            $('#educationPer').chosen();
        }
    });
}

/** Get Work Permission ***/
function getWorkPer() {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getworkpermission'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.obj) {
                $('#workPer').append(options);
                $('#workPer').val(data.obj.permission);
            } else {
                $('#workPer').append('<option value="">' + msgTip.work_null + '</option>').attr('disabled', true);
            }
            $('#workPer').chosen();
        }
    });
}

/** updatea base info Permission ***/
function updateBaseInfoPer(perId) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonalprofilepermission',permission:'" + perId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}

/** updatea education Permission ***/
function updateEducationPer(perId) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonaleduationpermission',permission:'" + perId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}


/** updatea Work Permission ***/
function updateWorkPer(perId) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonalworkpermission',permission:'" + perId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}
/** updatea INterests Permission ***/
function updateInterestsPer(perId) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonalinterestspermission',permission:'" + perId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}
/** updatea Contact Permission ***/
function updateContactPer(perId) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatepersonalcontactpermission',permission:'" + perId + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}


/** if can be search by out man**/
function updateIfCanSearch(findme) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updateifcanoutsearch',findme:'" + findme + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}


/** who can msg to me **/
function updateWhoCanMsgToMe(msgme) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatecanmsgpermission',msgme:'" + msgme + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
            }
        }
    });
}

/** who can msg to me **/
function updateWhoCanSendFriendRequestToMe(request) {
    $.ajax({
        url: "../privateset_personal.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updatesendfriendrequestpermission',request:'" + request + "'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result) {
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
                    var li = jQuery($wd.format('<option value="{0}">{1}</option>', v.id, v.name)).appendTo(box);
                });
                $('#group').chosen();

                box.change(function () {
                    if ($(this).val()) {
                        addPerItem('group', $(this).val(), $(this).find('option:selected').text(), $('#allowlist'));
                        $(this).val('');
                        $(this).chosen();
                    }
                });

            }
        }
    });
}

///friend
function getFriendGroup() {
    $.ajax({
        url: "../fgroup_friend.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'getfriendsgroup'}",
        error: function (data) {
            // $('#sendmsg').notice(msgTip.request_fail, 1);
        },
        success: function (data) {
            if (data.result && data.rows) {
                var box = $('#friendgroup');
                $.each(data.rows, function (i, v) {
                    var li = jQuery($wd.format('<option value="{0}">{1}</option>', v.id, v.name)).appendTo(box);

                });
                $('#friendgroup').chosen();

                box.change(function () {
                    if ($(this).val()) {
                        addPerItem('friends', $(this).val(), $(this).find('option:selected').text(), $('#allowlist'));
                        $(this).val('');
                        $(this).chosen();
                    }
                });
            }
        }
    });
}

/* add per item */
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
            var item = jQuery($wd.format('<li per="{0}--{1}--{2}">{2}</li>', type, id, name)).appendTo(jBox);
            var span_remove = jQuery('<a href="javascript:;" class="icon close-2"></a>').appendTo(item);
            span_remove.click(function () {
                item.fadeTo('slow', 0, function () {
                    $(this).remove();
                });
            });
        }
    }
}


/*clear permission panel*/
function clearPerPanel() {
    $('#allowlist').empty();
    $('#refuselist').empty();
    $('#per_id').val('');
    $('#per_name').val('');
}

/* save custom permission*/
function saveCustomPer() {
    var p_id = $('#per_id').val();
    var p_name = $('#per_name').val();
    var p_allow = getPerItems($('#allowlist'));
    var p_refuse = getPerItems($('#refuselist'));

    if (!p_name) {
        new pop({ typename: 'warning',
            msginfo: msgTip.per_name_null
        });
        return false;
    }

    if (!p_allow && !p_refuse) {
        new pop({ typename: 'warning',
            msginfo: msgTip.per_allow_and_refuse_null
        });
        return false;
    }

    if (p_id) {
        updateCustomPermission({
            perId: p_id,
            perName: p_name,
            allowList: p_allow,
            refuseList: p_refuse,
            setDefault: 1
        }, function (data) {
            if (data.result) {
                selectCustomPermissionList();
                clearPerPanel();
                $('#per_box').hide();
            } else {
                new pop({ typename: 'error',
                    msginfo: data.msg
                });
            }
        });
    } else {
        if (!cp_count_out) {
            addCustomPermission({
                perName: p_name,
                allowList: p_allow,
                refuseList: p_refuse,
                setDefault: 1
            }, function (data) {
                if (data.result) {
                    selectCustomPermissionList();
                    clearPerPanel();
                    $('#per_box').hide();
                } else {
                    new pop({ typename: 'error',
                        msginfo: data.msg
                    });
                }
            });
        } else {
            new pop({ typename: 'warning',
                msginfo: wanerdaoLangTip('personal_00013')
            });
        }
    }
}

/*get items*/
function getPerItems(jBox) {
    var items = '';
    jBox.children('li').each(function () {
        if (items) items += '-,-';
        items += $(this).attr('per');
    });
    return items;
}



/*search friend*/
function searchFriend(str, callback) {
    $.ajax({
        url: '../fgroup_common.axd',
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


/**　Add Allow Rriend **/
function addAllowFriend(data) {
    addPerItem('user', data.value, data.text, $('#allowlist'));
    $('#allowUser').val('');
}

/**　Add Refuse Rriend **/
function addRefuseFriend(data) {
    addPerItem('user', data.value, data.text, $('#refuselist'));
    $('#refuseUser').val('');
}