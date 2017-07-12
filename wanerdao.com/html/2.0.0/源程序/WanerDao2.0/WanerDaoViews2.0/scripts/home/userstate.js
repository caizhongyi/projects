

var pageIndex = 1; //当前页数
var pageSize = 5; //每页记录数
var pageCount = 0; //总页数
var stateCat = '';//

$(function () {
    if (!uid) uid = wd_B.uin.uid;

    if (is_self) { visitSelf(); }
    else { visitOther(); }

    $('.moreStateBar').click(function () {
        if (hasMore) {
            $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
            $(this).hide();
            getStateResultByType();
        }
    });

    $('.ref').click(function () {
        $('#statelist').empty();
        pageIndex = 1;
        //        getStateResult(pageIndex, pageSize, stateCat, function () { }, function (data) {
        //            callback(data);
        //        });
        $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
        ajaxfunc("userstate_home.axd", "{opertype:'gethtmlstateresult',pageCurrent:" + pageIndex + ",pageSize:" + pageSize + ",category:'" + stateCat + "',userId:'" + uid + "'}", function () {
            if (error) error();
        }, function (data) {
            $('.loading').empty();
            callback(data);
        });
    });
});

/*
    访问自己
*/
function visitSelf() {
    $('#stateTab').append('<a href="javascript:;" class="active">最新状态</a> <a href="javascript:;">留言</a> <a href="javascript:;">圈子</a> <a href="javascript:;">活动</a>');
    $('#stateTab').children('a').click(function () {
        $(this).parent().children('a').each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
    });

    Init('new');

    //最新更新
    $('#stateTab').children('a:eq(0)').click(function () {
        $(this).addClass('active');
        Init('new');
    });

    //留言
    $('#stateTab').children('a:eq(1)').click(function () {
        $(this).addClass('active');
        Init('message');
    });

    //圈子
    $('#stateTab').children('a:eq(2)').click(function () {
        $(this).addClass('active');
        Init('group');
    });

    //活动
    $('#stateTab').children('a:eq(3)').click(function () {
        $(this).addClass('active');
        Init('activity');
    });


    //    //资道
    //    $('#stateTab').children('a:eq(4)').click(function () {
    //        $(this).addClass('active');
    //        Init();
    //        getStateResultByType('posts');
    //    });

    var hs_option_set = jQuery('<a href="javascript:;" class="set"></a>').appendTo($('.options'));
    hs_option_set.click(function () {
        $('body').PersonalShield({});
    });
}

/*
    访问别人
*/
function visitOther() {
    $($('.main').children().get(0)).before('<div class="black10"></div><div class="mes_com_box_Tab"><a href="javascript:;" id="tab_zl">资料</a><a href="javascript:;" id="tab_rz">日志</a><a href="javascript:;" id="tab_xc">相册</a><a href="javascript:;" id="tab_sp">视频</a></div>');
    bindPTab(uid);
    $('#tab_home').addClass('active');
    $('#stateTab').append('<a href="javascript:;" class="active">最新留言</a>');
    Init('message');
}

var stateType;
var hasMore = true;
function getStateResultByType() {
    getStateResult(pageIndex, pageSize, stateType, function () { }, function (data) {
        $('.loading').empty();
        callback(data);
    });

}

/*
根据状态获取用户状态
string pageCurrent,string pageSize,string category(new,message,group,activity,posts)         

*/
function getStateResult(p_Index, p_Size, cat, error, success) {
    ajaxfunc("userstate_home.axd", "{opertype:'gethtmlstateresult',pageCurrent:" + p_Index + ",pageSize:" + p_Size + ",category:'" + cat + "',user_id:'" + uid + "'}", function () {
        if (error) error();
    }, function (data) {
        if (success) success(data);
    });
}

function Init(type) {
    stateCat = type;
    $('#statelist').empty();
    $('.moreStateBar').hide();
    $('.loading').html('<img src="/images/loading.gif"/>').css({ 'text-align': 'center', 'padding': '5px' });
    stateType = type;
    pageIndex = 1;
    hasMore = true;
    getStateResultByType();
}

/* 
回调 状态绑定
*/
function callback(data) {
    if (data.result) {
        $.each(data.data, function (i, v) {
            if (v.pageNo) {
                pageIndex = parseInt(v.pageNo) + 1;
                return true;
            }

            var $itm = jQuery(v.content).appendTo($('#statelist'));
            if (uid == wd_B.uin.uid) {
                bindEvent($itm, v.tab_id);
            }
        });

        $('.moreStateBar').show();
    } else {
        hasMore = false;
        $('.loading').html('<div style=" line-height:50px; color: #999;">没有更多更新了</div>');
        $('.moreStateBar').hide();
    }
}

/*
根据类型绑定 处理
*/
function bindEvent($obj, type) {
    $('#statelist').append($obj);

    if ($obj.find('.select').length == 1) {
        new czy.ui.select($obj.find('.select'));
    }

    switch (stateType) {
        case 'new': //最新状态
            BindEvent_New($obj, type);
            break;
        case 'message': //最新留言
            BindEvent_Msg($obj, type);
            break;
        case 'group': //圈子内更新

            break;
        case 'activity': //活动组更新

            break;
        case 'posts': //资道更新

            break;
    }

}

/* 最新 状态 */
function BindEvent_New($obj, type) {
    $obj.find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
    switch (type) {
        case 'publish_state': //发表状态
            options_reply($obj, type, 'newfeedsinglemessage', 'newfeeddelsinglemessage', 'newfeedaddsinglemessage');
            options_forward($obj);//转发
            $obj.find('.content').find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_link': //发表链接
            options_reply($obj, type, 'newfeedsinglemessage', 'newfeeddelsinglemessage', 'newfeedaddsinglemessage');
            options_forward($obj); //转发

            $obj.find('.content').find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_image': //发表图片
            options_reply($obj, type, 'photosinglemessage', 'delsinglemessage', 'addsinglemessage');
            options_forward($obj); //转发
            options_setBtn($obj, true, true, true, true, true); //设置按钮
            //$("a#example1").fancybox();

            $obj.find('p').find('a').fancybox();
            $obj.find('.content').find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_video': //发表视频
            options_reply($obj, type, 'videosinglemessage', 'videodelsinglemessage', 'videoaddsinglemessage');
            options_forward($obj); //转发
            options_setBtn($obj, true, true, true, true, true); //设置按钮

            $obj.find('.content').find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'publish_blog': //发表日志
            options_reply($obj, type, 'blogsinglemessage', 'blogdelsinglemessage', 'blogaddsinglemessage');
            options_forward($obj); //转发
            options_setBtn($obj, true, true, true, true, true); //设置按钮

            $obj.find('.content').find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case 'upload_image': //上传相册
            //options_reply($obj,'photosinglemessage');
            options_forward($obj); //转发

            break;
        case 'forward_state': //someone 转发 someone's 发表状态
            options_reply($obj, type, 'newfeedsinglemessage', 'newfeeddelsinglemessage', 'newfeedaddsinglemessage');
            options_forward($obj); //转发
     
            break;
        case 'forward_link': //someone 转发 someone's 发表链接
            options_reply($obj, type, 'newfeedsinglemessage', 'newfeeddelsinglemessage', 'newfeedaddsinglemessage');
            options_forward($obj); //转发

            break;
        case 'forward_image': //someone 转发 someone's 发表图片
            options_reply($obj, type, 'photosinglemessage', 'delsinglemessage', 'addsinglemessage');
            options_forward($obj); //转发

            break;
        case 'forward_video': //someone 转发 someone's 发表视频
            options_reply($obj, type, 'videosinglemessage', 'videodelsinglemessage', 'videoaddsinglemessage');
            options_forward($obj); //转发
            
            break;
        case 'forward_blog': //someone 转发 someone's 日志
            options_reply($obj, type, 'blogsinglemessage', 'blogdelsinglemessage', 'blogaddsinglemessage');
            options_forward($obj); //转发

            break;
        case 'forward_uploadimage': //someone 转发 someone's 相册
            //options_reply($obj, 'photosinglemessage', type);
            options_forward($obj); //转发

            break;
        case 'join_activity': //参加了 活动

            break;
        case 'join_group': //加入了 圈子

            break;
        case '': //添加了 好友

            break;
        case '': // 即将过生日

            break;
        case '': // 送礼物

            break;
        case '': // 姓名

            break;
    }
}


/* 最新 留言 */
function BindEvent_Msg($obj, type) {
    $obj.find('a:eq(0)').PersonalInfo({ uid: $obj.find('.uid').val() });
    switch (type) {
        case 'leave_message': //好友留言
            options_reply($obj, type, 'leavemessagesinglemessage', 'leavemessagedelsinglemessage', 'leavemessageaddsinglemessage');
            options_setBtn($obj, true, true, false, false, false); //设置按钮

            $obj.find('a:eq(1)').PersonalInfo({ uid: $obj.find('.uid').val() });
            break;
        case '': //好友送礼

            break;
        case '': //帖子回复

            break;
    }
}

/* 圈子 更新 */
function BindEvent_Group($obj, type) {
    switch (type) {
        case '': //someone 加入圈子

            break;
        case '': //someone 退出圈子

            break;
        case '': //圈子 发帖

            break;
        case '': //圈子更新

            break;
        case '': //圈子 发起投票

            break;
        case '': //圈子发起活动

            break;
    }
}

/* 活动 更新 */
function BindEvent_Activity($obj, type) {
    switch (type) {
        case '': //加入活动

            break;
        case '': //退出活动

            break;
        case '': //活动发言

            break;
        case '': //活动更新

            break;
        case '': //活动发起投票

            break;
    }
}


/* 资道 更新 
function BindEvent_Posts($obj, type) {
switch (type) {
case '': //资道 发帖

break;
}
}
*/

/* Tools Start*/

//回复功能
function options_reply($obj, category, operGetReply, operDelReply, operAddReply) {

    var tool_reply = jQuery('<a href="javascript:;" class="replay">回复</a>').appendTo($obj.find('.comments-options'));

    tool_reply.unbind("click").click(function () {
        $obj.find('.comments-options').next().replycontent({
            posts_id: $obj.find('.infoId').val(), //通过replylistbyid获取回复列表或添加回复信息，此属性不允许为空
            getreply:
            {
                getreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
                getreplyop: operGetReply//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            deletereply:
            {
                delreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理获取回复列表，此属性不允许为空
                delreplyop: operDelReply//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            addreply:
            {
                addreplylistbyaxd: 'replay_common.axd', //通过replylistbyid和axd处理添加回复信息，此属性不允许为空
                addreplyop: operAddReply//通过replylistbyid和axd处理获取回复列表，此属性不允许为空    
            },
            loadrecordlimit: 5, //加载条数限制
            replyconfig: {
                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        });
    });

}

/*
  转发状态
  @param $obj 项
*/
function options_forward($obj) {
    var uid = $obj.find('.uid').val();
    ///如果是自己不绑定
    if (wd_B.uin.uid == uid) {
        return;
    }
    var tool_forward = jQuery('<a href="javascript:;" class="enter"></a>').appendTo($obj.find('.comments-options'));

}

/*
  设置按钮  
*/
function options_setBtn($obj, ignore, ignoreAll, shield, focus, trash) {

    var uid = $obj.find('.uid').val();
    ///如果是自己不绑定
    if (wd_B.uin.uid == uid) {
        return;
    }
    var tool_setBtn = jQuery('<span class="settings" hoverable="true" ><a href="javascript:;" class="selector selector-shown"></a><ul class="settings-list"></ul></span>')
        .appendTo($obj.find('.comments-options'));

    //忽略该更新
    if (ignore) {
        var li_IgnoreThis = jQuery('<li>·忽略该更新</li>').appendTo(tool_setBtn.find('ul'));
        li_IgnoreThis.click(function () {
            $obj.fadeTo('slow', 0, function () {
                $(this).hide();
            });
        }).css('cursor', 'pointer');
    }
    //忽略该人的全部更新
    if (ignoreAll) {
        var li_IgnoreAll = jQuery('<li>·忽略该人的全部更新</li>').appendTo(tool_setBtn.find('ul'));
        li_IgnoreAll.click(function () {
            $('#statelist').children('li').each(function () {
                if ($(this).find('.uid').val() == uid) {
                    $(this).fadeTo('slow', 0, function () {
                        $(this).hide();
                    });
                }
            });

        }).css('cursor', 'pointer');
    }
    //屏蔽该人的更新
    if (shield) {
        var li_Shield = jQuery('<li>·屏蔽该人的更新</li>').appendTo(tool_setBtn.find('ul'));
        li_Shield.click(function () {
            //source_type_id,string target_user_id
            ajaxfunc('shield_home.axd', "{opertype:'shielddynamicstate',source_type_id:'" + $obj.find('.stateId').val() + "',target_user_id:'" + uid + "'}", null, function (data) {
                if (data.result) {
                    $('#statelist').children('li').each(function () {
                        if ($(this).find('.uid').val() == uid) {
                            $(this).fadeTo('slow', 0, function () {
                                $(this).hide();
                            });
                        }
                    });
                }
            });
        }).css('cursor', 'pointer');
    }
    //关注该人
//    if (focus) {
//        var li_Focus = jQuery('<li>·关注该人</li>').appendTo(tool_setBtn.find('ul'));
//        li_Focus.click(function () {

//        }).css('cursor', 'pointer');
//    }
//    //垃圾信息举报
//    if (trash) {
//        var li_Trash = jQuery('<li>·垃圾信息举报</li>').appendTo(tool_setBtn.find('ul'));
//        li_Trash.click(function () {
//            ajaxfunc('shield_home.axd', "{opertype:'dustinforeport',source_type_id:'" + $obj.find('.stateId').val() + "',target_user_id:'" + uid + "'}", null, function (data) {
//                if (data.result) {
//                    new pop({ typename: 'success', msginfo: '举报成功' });
//                }
//            });
//        }).css('cursor', 'pointer');
//    }
}
/*Tools End*/









