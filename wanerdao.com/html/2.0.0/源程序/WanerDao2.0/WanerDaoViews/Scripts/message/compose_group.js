
$(function () {
    $("#cgfc").inviter();

    $(".pager").myPagination({
        showmore: true, //是否显示加载更多
        showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
        contentid: 'showmore', //此处ID可以用来显示“加载更多”这个功能
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
        },
        //在出现2个导航条时，需要注意的事情就是自定义操作没有办法事件同步，所以需要程序自己来控制自定义事件的同步
        toolbar: [{ text: '全选', cls: 'chkall', type: 'checkbox', handler: function () {

        }
        }]
    });

    $('#sendInvite').click(function () {
        setActivityInvite();
    });

    $('#resetAll').click(function () {
        resetAll();
    });
});

/*Pagination*/

function databind(data) {
    //debugger;
    var box = $('#content').empty();
    $.each(data.rows, function (i, v) {
        var tr_itm = jQuery('<tr></tr>').appendTo(box);
        tr_itm.append('<td width="28" class="actCheck"><input type="checkbox" class="chkId" value="' + v.id + '"/></td>');
        tr_itm.append($wd.format('<td valign="top" width="62"><img class="bd_img" src="{0}" alt="" /></td>', v.logo_path));
        tr_itm.append('<td><dl class="actInfo"><dt>'
            + '<div class="pos_box" style="right:0px;top:0px;">'
            + '<div class="heat"><div class="tit">关注度：</div>'
            + '<div class="score"><i class="iBar"><i style="width:' + v.follow_score + '%;"></i><em>' + v.follow_score + '%</em></i></div>'
            + '<div class="tit">活跃度：</div>'
            + '<div class="score"><i class="iBar"><i style="width:' + v.activity_score + '%;"></i><em>' + v.activity_score + '%</em></i></div>'
            + '</div>'
            + '</div>'
            + '<a href="#" class="fb">' + v.name + '</a>　(<var>' + v.member_nbr + '</var>)</dt>'
            + '<dd class="actCon">' + v.desct + ' <span class="actView"><a href="#' + v.id + '" target="_blank">查看详细</a></span></dd>'
            + '</dl></td></tr>');

        tr_itm.hover(function () {
            $(this).addClass("hover");
        }, function () {
            $(this).removeClass("hover");
        })
    });

    chkIdClick();
}

/* 发送邀请*/
function setActivityInvite() {
    var sendAllFriend = $('#allfriends').attr('checked'); //是否向所有好友发送
    var sendAllGroup = $('#allgroups').attr('checked'); //是否向所有圈子发送

    var friendList = ''; //发送好友列表
    var groupList = ''; //发送圈子列表

    if (!sendAllFriend) { friendList = $.data(document.body, "frienddata"); }

    if (!sendAllGroup) { groupList = $.data(document.body, "groupdata"); }

    var sendList = getChkIds();

    if (!sendAllFriend && !sendAllGroup && !friendList && !groupList) {
        alert(wanerdaoLangTip('message_00006'));
    } else if (!sendList) {
        alert(wanerdaoLangTip('message_00008'));
    } else {
    $.ajax({
        url: '../invite_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'sendgroupinvite',allfriends:" + sendAllFriend + ",allgroups:" + (sendAllGroup ? 1 : 0) + ",sendfriends:'" + friendList + "',sendGroups:'" + groupList + "',recGroups:'" + sendList + "'}",
        error: function () {
        },
        success: function (data) {
            if (data.result) {
                location.reload();
            } else {
                alert(data.msg);
            }
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
    location.reload();

}

