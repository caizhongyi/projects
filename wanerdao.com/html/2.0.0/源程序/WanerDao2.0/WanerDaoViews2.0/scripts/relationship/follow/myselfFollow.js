/**
 * 朋友关注页面的相关js，页面地址/relationship/follow/relationship_myself_follow.aspx
 * 
 * 作者：徐蓓
 * 时间: 2012/7/17 22:02
 * 描述：个人被关注页面的相关js
 */
//全局变量
var strLimit = 100; //字符串长度限制为100位
//关注好友
function createFollow(attentionId, callBack) {
    $.ajax({
        url: "/cancelpersonalmyself_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'createpersonalmyselffollow',attentionId:'" + attentionId + "'}",
        error: function () {
        },
        success: function (data) {
            callBack(data);
        }
    });
}
//拒绝被关注 
function cancelMyselfFollow(friendId, callBack) {
    $.ajax({
        url: "/cancelpersonalmyself_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'cancelpersonalmyselffollow',friendId:'" + friendId + "'}",
        error: function () {
        },
        success: function (data) {
            callBack(data);
        }
    });
}
$(function () {
    getMenu(3);
    getFollowMenu(4);
    //加载页面数据
    function PageRender() {

        //公有函数
        this.render = _render;

        function _render(str) {
            var searchStr = str ? str : ""; //初始化搜索字符串
            //分页
            $(".pagewrap").myPagination({
                showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                contentid: '#content', //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
                callback: _renderContent,
                ajax: {
                    url: '/getpersonalmyself_follow.axd', //此处必须填写，分页已没有固定处理工厂
                    param: {
                        pagecurrent: 1,
                        pageSize: 10,
                        followName: searchStr,
                        opertype: 'getpersonalmyselffollow'//操作码
                    },
                    info: {
                        first: '首页',
                        last: '尾页',
                        next: '下一页',
                        prev: '上一页',
                        first_on: true,
                        last_on: true,
                        next_on: true,
                        prev_on: true,
                        msg_on: true, //如果为true显示第几页以及总页数，否则不显示
                        tipmsg: '第{tip}页'
                    }
                }
            });

        }

        //加载渲染数据
        function _renderContent(data, total) {
            $("#content").html(""); //初始化数据显示区域
            var $pagecontent = $('<ul id="report_list"></ul>').appendTo("#content");
            $.each(data.rows, function (i, msg) {
                var $li = $("<li class='report'/>");
                $li.append("<img src='" + msg.logo_small_path + "' />");
                $li.append("<div class='fd_b_name'><a href='javascript:;'>" + msg.name + "</a> <i class='level'>等级 <b>" + msg.experience + "</b> 级</i></div>");
                $li.append("<div class='follow_list_con'/>");
                $li.find(".follow_list_con").append("<div class='follow_list_yj'><a href='javascript:;' class='bg03 createFollow'></a><a href='javascript:;' class='bg02 refuseFollow'></a></div>");
                $li.find(".follow_list_con").append("<div class='follow_list_jd'><label>活跃度：</label><div class='score'><i class='iBar'><i style='width: " + (msg.activity_score * 100) + "%;'></i><em>" + (msg.activity_score * 100) + "%</em></i></div></div>");
                $li.find(".follow_list_con").append("<div class='follow_list_jd'><label>关注度：</label><div class='score'><i class='iBar'><i style='width: " + (msg.follow_score * 100) + "%;'></i><em>" + (msg.follow_score * 100) + "%</em></i></div></div>");

                //关注他
                $li.find(".createFollow").click(function () {
                    createFollow(msg.id, function (data) {
                        hint(data.msg, $("#hint"));
                    });
                });

                //拒绝被关注
                $li.find(".refuseFollow").click(function () {
                    cancelMyselfFollow(msg.id, function (data) {
                        if (data.result) {
                            $li.remove();
                        }
                        hint(data.msg, $("#hint"));
                    });
                });

                $pagecontent.append($li);

            });

            _renderEffect();
        }

        //效果渲染
        function _renderEffect() {

            $(".duration").chosen(); //select样式有问题，暂时没有绑定

            $(".drop_down").toggle(function () {
                $(".drop_down i").width(0);
                $(".drop_down i").css("display", "none");
                $(this).children("i").width($(this).width() + 25);
                $(this).children("i").css("display", "block");
            }, function () {
                $(this).children("i").css("display", "none");
            });
            $(document).mousedown(function () {
                $(".drop_down i").css("display", "none");
            });
            $("#report_list .report").each(function (i) {
                $(this).attr('order', i);
                $(this).mouseout(
			function () {
			    color = '#DFDFDF';
			    order = $(this).attr('order');
			    $("#report_list .report").each(
					function (j) {
					    if (order - j == 1) {
					        $(this).css('border-bottom', '1px dashed ' + color);
					    }
					}
				);
			    $(this).css('border-bottom', '1px dashed ' + color);
			    $(this).css('background', '');
			    $(this).find('.follow_list_yj').hide();
			}
		);

                $(this).mouseover(
			function () {
			    color = '#5FB0D3';
			    order = $(this).attr('order');
			    $("#report_list .report").each(
					function (j) {
					    if (order - j == 1) {
					        $(this).css('border-bottom', '1px dashed ' + color);
					    }
					}
				);
			    $(this).css('border-bottom', '1px dashed ' + color);
			    $(this).css('background', '#EEF7FE');
			    $(this).find('.follow_list_yj').show();
			}
		);
            });
        }
    }

    //页面初始化
    var page = new PageRender();
    page.render("");
    var searchDefault = $("#searchStr").val();
    //页面事件绑定
    $("#search").click(function () {
        var searchStr = $("#searchStr").val() != searchDefault ? $("#searchStr").val() : "";
        if (getStringLength(searchStr) > strLimit) {
            hint(wanerdaoLangTip("follow_00001"), $("#hint"));
            return false;
        }
        page.render(searchStr);
    });
});