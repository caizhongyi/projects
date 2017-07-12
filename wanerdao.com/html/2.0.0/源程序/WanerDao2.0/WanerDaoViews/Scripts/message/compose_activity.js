
$(function () {
    $("#cgfc").inviter();

    //currentuserjoinactivitypage

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
                opertype: 'currentuserjoinactivitypage'
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
        tr_itm.append('<td width="584"><dl class="actInfo"><dt><a href="#" class="fb">周未登上珠木狼马峰</a> [纽约市/纽约州/美国]　(<var>256人</var>)</dt>'
            + '<dd class="actCon">通过我们的日记功能来分享故事、表达观点或写任何你想要表达的事情。你也可以通过手机来发布日志。</dd>'
            + '<dd class="actMeta"><span>活动时间：<i>04/03-04/05</i></span>     <span>报名截止时间：<i>04/08</i></span>     <span>预交费用：<i>100$</i></span></dd>'
            + '<dl>'
            + '</td>'
            + '<td class="actView"><a href="#">查看详细</a></td>');

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
        alert(wanerdaoLangTip('message_00007'));
    } else {
    $.ajax({
        url: '../invite_message.axd',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: "{opertype:'sendactivityinvite',allfriends:" + sendAllFriend + ",allgroups:" + sendAllGroup + ",sendfriends:'" + friendList + "',sendGroups:'" + groupList + "',recGroups:'" + sendList + "'}",
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

