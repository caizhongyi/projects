
$(function () {
    $("#cgfc").inviter();
    
    pageing();

    $('#sendInvite').click(function () {
        setActivityInvite();
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
            url: 'act_common.axd',
            param: {
                pagecurrent: 1,
                pageSize: 10,
                opertype: 'currentuserjoinactivitypage'
            }
        }
    });
}

//a.id,a.activity_name,a.address,a.prepay_nbr,join_member_nbr,a.begin_datetime,a.end_datetime,a.report_datetime,a.description
function databind(data) {
    //debugger;
    var $box = $('#actlist').empty();
    if (data.rows && data.total > 0) {
        $.each(data.rows, function (i, v) {
            var act_itm = jQuery('<div class="imporInfoLi"></div>').appendTo($box);
            act_itm.append('<div class="actCheck"><input type="checkbox" class="chkId" value="' + v.id + '"/></div>');
            act_itm.append('<dl class="actInfo"><dt><a href="/activity/activity_index.html?id=' + v.id + '" class="fb" target="_blank">' + v.activity_name + '</a> ' + (v.address ? '[' + v.address + ']' : '') + '　(<var>' + v.join_member_nbr + '人</var>)</dt>'
            + '<dd class="actCon">' + v.description + '</dd>'
            + '<dd class="actMeta"><span>活动时间：<i>' + getLocationDateString(v.begin_datetime, 'yyyy/MM/dd') + '-' + getLocationDateString(v.end_datetime, 'yyyy/MM/dd') + '</i></span>     <span>报名截止时间：<i>' + getLocationDateString(v.report_datetime, 'yyyy/MM/dd') + '</i></span>     <span>预交费用：<i>' + v.prepay_nbr + '$</i></span></dd>'
            + '<dl>'
            + '<div class="actBtn"><a href="/activity/activity_index.html?id=' + v.id + '" target="_blank">查看详细</a></div>'
            + '<div class="clear"></div>');

            act_itm.hover(function () {
                $(this).addClass("acthover");
            }, function () {
                $(this).removeClass("acthover");
            })
        });
        if (firstPage) firstPage = false;
        chkIdClick();
    } else {
        firstPage = false;
        $box.append('<div style="text-align: center; border-width: 0; line-height: 62px; height: 62px; color: #666;">' + wanerdaoLangTip('message_00018') + '</div>');
    }
}

/* 发送邀请*/
function setActivityInvite() {
    $('#sendInvite').unnotice(1);
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
        //$('#sendInvite').notice(wanerdaoLangTip('message_00006'), 1);
    } else if (!sendList) {
        // $('#sendInvite').notice(wanerdaoLangTip('message_00008'), 1);
    } else {

        $('#sendInvite').attr('disabled', true);
    $.ajax({
        url: '../invite_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'sendactivityinvite',allFriends:" + (sendAllFriend ? 1 : 0) + ",allGroups:" + (sendAllGroup ? 1 : 0) + ",friend:'" + friendList + "',sendGroup:'" + groupList + "',recGroup:'" + sendList + "'}",
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

