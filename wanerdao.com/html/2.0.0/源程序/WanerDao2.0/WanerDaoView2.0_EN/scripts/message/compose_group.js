
$(function () {
    $("#cgfc").inviter();

    pageing();

    $('#sendInvite').click(function () {
        setGroupInvite();
    });

    $('#resetAll').click(function () {
        resetAll();
    });
});

var firstPage = true;
/*Pagination*/
function pageing() {
    firstPage = true;
    $(".pageList").myPagination({
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        callback: databind,
        ajax: {
            url: 'group_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'mygrouplist',
                group_name: '',
                summary: ''
            }
        }
    });
}

function databind(data) {
    //debugger;
    var $box = $('#content').empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            var tr_itm = jQuery('<tr></tr>').appendTo($box);
            tr_itm.append('<td width="28" class="actCheck"><input type="checkbox" class="chkId" value="' + v.id + '"/></td>');
            tr_itm.append($wd.format('<td valign="top" width="62"><img class="bd_img" src="/{0}" alt="" /></td>', v.logo_path));
            tr_itm.append('<td><dl class="actInfo"><dt>'
            + '<div class="pos_box" style="right:0px;top:0px;">'
            + '<div class="heat"><div class="tit">Subscribed score：</div>'
            + '<div class="score"><i class="iBar"><i style="width:' + v.follow_score + '%;"></i><em>' + v.follow_score + '%</em></i></div>'
            + '<div class="tit">Activity score：</div>'
            + '<div class="score"><i class="iBar"><i style="width:' + v.activity_score + '%;"></i><em>' + v.activity_score + '%</em></i></div>'
            + '</div>'
            + '</div>'
            + '<a href="/relationship/relationship_mygroup_info.html?id=' + v.id + '" class="fb" target="_blank">' + v.name + '</a>　(<var>' + v.member_nbr + '</var>)</dt>'
            + '<dd class="actCon">' + v.desct + ' <span class="actView"><a href="/relationship/relationship_mygroup_info.html?id=' + v.id + '" target="_blank">View detail</a></span></dd>'
            + '</dl></td></tr>');

            tr_itm.hover(function () {
                $(this).addClass("grohover");
            }, function () {
                $(this).removeClass("grohover");
            })
        }); 
        if (firstPage) firstPage = false;
        chkIdClick();
    } else {
        firstPage = false;
        $box.append('<tr><td style="text-align: center; border-width: 0; line-height: 62px; height: 62px; color: #666;">' + wanerdaoLangTip('message_00017') + '</td></tr>');
    }
}

/* 发送邀请*/
function setGroupInvite() {
    var sendAllFriend = $('#allfriends').attr('checked'); //是否向所有好友发送
    var sendAllGroup = $('#allgroups').attr('checked'); //是否向所有圈子发送

    var friendList = ''; //发送好友列表
    var groupList = ''; //发送圈子列表

    if (!sendAllFriend) { friendList = $.data(document.body, "frienddata"); }
    if (!sendAllGroup) { groupList = $.data(document.body, "groupdata"); }

    friendList = friendList == undefined ? '' : friendList;
    groupList = groupList == undefined ? '' : groupList;

    var sendList = getChkIds();

    if (!sendAllFriend && !sendAllGroup && !friendList && !groupList) {
//        $('#sendInvite').notice(wanerdaoLangTip('message_00006'), 1);
    } else if (!sendList) {
//        $('#sendInvite').notice(wanerdaoLangTip('message_00007'), 1);
    } else {

    $('#sendInvite').attr('disabled', true);
    $.ajax({
        url: '../invite_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'sendgroupinvite',allFriends:" + (sendAllFriend ? 1 : 0) + ",allGroups:" + (sendAllGroup ? 1 : 0) + ",friend:'" + friendList + "',sendGroup:'" + groupList + "',recGroup:'" + sendList + "'}",
        error: function () {
            $('#sendInvite').removeAttr('disabled', true);
        },
        success: function (data) {
            if (data.result) {
                $('#resetAll').notice(data.msg, 2);
                resetAll();
            } else {
                $('#sendInvite').notice(data.msg, 1);
            }

            setTimeout(function () {
                $('#resetAll').unnotice(2);
                $('#sendInvite').unnotice(1);
            }, 2000);
            $('#sendInvite').removeAttr('disabled', true);
        }
    });
    }
}

/******** 获取选中的id集合 *********/
function getChkIds() {
    var ids = '';
    $('.chkId').each(function () {
        if ($(this).attr('checked')) {
            if (ids) ids += ',';
            ids += $(this).val();
        }
    });
    return ids;
}

/*重置*/
function resetAll() {
    $("#cgfc").empty().inviter();
    pageing();
}

