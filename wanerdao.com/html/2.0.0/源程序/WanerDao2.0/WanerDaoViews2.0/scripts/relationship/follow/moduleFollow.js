/**
* 活动关注页面的相关js，页面地址/relationship/follow/relationship_module_follow.aspx
* 
* 作者：徐蓓
* 时间: 2012/7/17 22:02
* 描述：活动模块页面的相关js
*/
//全局变量
var strLimit = 100; //字符串长度限制为100位
//更新邮件提醒
function updateDuration(id, isEmail, duration, callBack) {
    $.ajax({
        url: "/updateactivitymodulefollowduration_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'updateactivitymodulefollowduration',id:'" + id + "',isEmail:" + isEmail + ",emailDuration:" + duration + "}",
        error: function () {
        },
        success: function (data) {
            callBack(data);
        }
    });
}

//取消关注
function cancelFollow(moduleId, callBack) {
    $.ajax({
        url: "/cancelactivitymodulefollow_follow.axd",
        type: "POST",
        dataType: "json",
        cache: false,
        data: "{opertype:'cancelactivitymodulefollow',moduleId:'" + moduleId + "'}",
        error: function () {
        },
        success: function (data) {
            callBack(data);
        }
    });
}

$(function () {
    getMenu(3);
    getFollowMenu(3);
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
                    url: '/getactivitymodulefollows_follow.axd', //此处必须填写，分页已没有固定处理工厂
                    param: {
                        pagecurrent: 1,
                        pageSize: 10,
                        searchTitle: searchStr,
                        opertype: 'getactivitymodulefollows'//操作码
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
                $li.append("<a href='/activity/Activity_index.html?id=" + msg.activity_id + "' target='_blank'>" + msg.activity_name + "</a><font color='#CC0000'>（" + msg.join_member_nbr + "）</font>");


                $li.append("<div class='follow_list_con'/>");
                $li.find(".follow_list_con").append("<div class='follow_list_yj'/>");
                $li.find(".follow_list_yj").append("<input class='isEmail' type='checkbox' id='box18' />\n<label  onclick='checkbox2(\"box18\")'>邮件订阅</label>\n");
                $li.find(".follow_list_yj").append("<select class='duration' name='select' style='width:70px'></select>\n<label>更新</label><a href='javascript:;' class='cancelFollow unfollow_btn'>取消关注</a>");
                $li.find(".follow_list_con").append("<div class='follow_list_jd'><label class='ml12'>活动时间段：</label>" + DateFormat(msg.begin_datetime, "MM/dd hh") + " -  " + DateFormat(msg.end_datetime, "MM/dd hh") + "<label>活动地点：</label>" + msg.address + "</div>");


                var $slDuration = $li.find("select.duration");

                //邮件提醒更新
                $li.find(".isEmail").attr("checked", msg.is_email.toLowerCase() == "true" ? true : false).click(function () {
                    var duration = $slDuration.val();
                    var isEmail = $(this).attr("checked") == "checked" ? true : false;
                    updateDuration(msg.id, isEmail, duration, function (data) {
                        hint(data.msg, $("#hint"));
                    });
                });

                //取消关注
                $li.find(".cancelFollow").click(function () {
                    cancelFollow(msg.attention_id, function (data) {
                        if (data.result) {
                            $li.remove();
                        }
                        hint(data.msg, $("#hint"));
                    });
                });
                $pagecontent.append($li);

                var durationData = [{ id: 1, value: '每天' }, { id: 2, value: '每周' }, { id: 3, value: '每月'}]; //提醒间隔时间源数据
                bindDropDownListbyobject($slDuration, durationData, true);

                //加载是否邮件提醒
                if (msg.is_email) {
                    $slDuration.find("option").removeAttr("selected").each(function () {
                        if ($(this).val() == msg.email_duration) {
                            $(this).attr("selected", "selected");
                            $slDuration.chosen();
                            return false;
                        }
                    });
                }
            });


            _renderEffect();
        }

        //效果渲染
        function _renderEffect() {

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