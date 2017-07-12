/**
* 个人首页js，页面地址/personal/personal_home.aspx
* 
* 作者：徐蓓
* 时间: 2012/7/25 13:10
* 描述：个人首页的相关js
*/

//通用的ajax封装
function ajaxCommon(url, param, callBack) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        cache: false,
        data: param,
        error: function () {
        },
        success: function (data) {
            callBack(data);
        }
    });
}

$(function () {
    //上部活动推荐切换
    function RecommendedActivity() {
        this.render = render;

        function _renderTopActivity(item, $ulMain, $ulPanel) {
            //右侧切换
            var $li = $("<li/>");
            $li.append("<img class='arrowhead' src='../images/home/ico_6x12.png'/>");
            $li.append("<h3 class='ellipsis'>" + item.activity_name + "</h3>");
            $li.append("<span class='star star5'></span><em>0</em>分<br/>");
            $li.append("<span>" + item.join_member_nbr + "参加</span><span>" + item.follow_score + "关注</span>");
            $ulPanel.append($li);

            //主切换
            $li = $("<li class='switch-content' style='display:none;'/>");
            var img = item.imagepath;
            if (img == null || img == "") {
                img = "/images/define.jpg";
            }
            $li.append("<div class='photo'><img src='" + img + "' width='199px' height='199px'/></div>");
            var $main = $("<div class='main'/>");
            $main.append("<h3 class='ellipsis'>" + item.activity_name + "</h3>");
            $main.append("<label>推荐指数:</label><span class='star star5   '></span><em>0</em>分<br/>");
            $main.append("<label>地点:</label>" + item.address + "<br/>");
            $main.append("<label>参与人数:</label><em>" + item.join_member_nbr + "</em>人<br/>");
            $main.append("<label>人均消费:</label>" + item.personcost + "<br/>");
            $main.append("<label>组织者:</label>" + item.name + "<br/>");
            $main.append("<a href='/activity/activity_index.html?id=" + item.id + "' class='button button3' target='_blank'>立即报名</a>");

            $li.append($main);
            $li.append("<div class='clear'></div>");
            $li.append("<p class='ellipsis'>" + item.description + "</p>");
            $ulMain.append($li);
        }

        function _renderTopBlankActivity($ulMain, $ulPanel) {
            //右侧切换
            var $li = $("<li/>");
            $li.append("<img class='arrowhead' src='../images/home/ico_6x12.png'/>");
            $li.append("<h3>无</h3>");
            $li.append("<span class='star star5'></span><em>0</em>分<br/>");
            $li.append("<span>0参加</span><span>0关注</span>");
            $ulPanel.append($li);

            //主切换
            $li = $("<li class='switch-content' style='display:none;'/>");

            $li.append("<div class='photo'><img src='/images/define.jpg' width='199px' height='199px'/></div>");
            var $main = $("<div class='main'/>");
            $main.append("<h3>无</h3>");
            $main.append("<label>推荐指数:</label><span class='star star5'></span><em>0</em>分<br/>");
            $main.append("<label>地点:</label>无<br/>");
            $main.append("<label>参与人数:</label><em>0</em>人<br/>");
            $main.append("<label>人均消费:</label>0<br/>");
            $main.append("<label>组织者:</label>无<br/>");
            $main.append("<a href='javascript:void(0);' class='button button3'>立即报名</a>");

            $li.append($main);
            $li.append("<div class='clear'></div>");
            $li.append("<p>无</p>");
            $ulMain.append($li);
        }

        function _render(data) {
            var $ulMain = $(".switch-panel");
            var $ulPanel = $(".switch-nav");

            var recommActCount1 = 0;
            var recommActCount2 = 0;

            var newestAndNearest = JSON.parse(data.newestAndNearest);
            var regionAndInterest = JSON.parse(data.regionAndInterest);

            var visible = false; //标示是否有数据

            if (newestAndNearest.result == "True") {
                recommActCount1 = newestAndNearest.total >= 3 ? 3 : parseInt(newestAndNearest.total);
                if (recommActCount1 > 0) {
                    visible = true;
                }
                for (var i = 0; i < recommActCount1; i++) {
                    _renderTopActivity(newestAndNearest.rows[i], $ulMain, $ulPanel);
                }
            }

            if (regionAndInterest.result == "True") {
                recommActCount2 = regionAndInterest.total >= 1 ? 1 : parseInt(regionAndInterest.total);
                if (recommActCount2 > 0) {
                    visible = true;
                }
                for (var i = 0; i < recommActCount2; i++) {
                    _renderTopActivity(regionAndInterest.rows[i], $ulMain, $ulPanel);
                }
            }

            if (visible) {
                for (var i = 0; i < 4 - (recommActCount1 + recommActCount2); i++) {
                    _renderTopBlankActivity($ulMain, $ulPanel);
                }
                $ulPanel.find("li").eq(0).addClass("switch-nav-cur");
                $ulMain.find("li").eq(0).removeAttr("style");

                new $.ui.tabs('.switch', {
                    cssSelected: 'switch-nav-cur',
                    //event			:   'hover',
                    auto: true,
                    widget: {
                        nav: '.switch-nav',
                        panel: '.switch-panel'
                    }
                });
                $(".switch").show();
            } else {
                $(".switch").hide();
            }

            //右侧活动推荐切换（暂时隐藏）
            //            if (newestAndNearest.total > 3) {
            //                recommActCount1 = newestAndNearest.total - 3;
            //                $(".rightRecommCount").text(recommActCount1);
            //                var $ulRight = $(".rightRecomm");
            //                for (var i = newestAndNearest.total - recommActCount1; i < newestAndNearest.total; i++) {
            //                    _renderRightActivity(newestAndNearest.rows[i], $ulRight);
            //                }
            //                new $.ui.tabs('.boxpager', {
            //                    effect: 'x'
            //                });
            //                $(".rRecomm").show();
            //            } else {
            //                $(".rRecomm").hide();
            //            }
        }

        function _renderRightActivity(item, $container) {
            var $li = $("<li/>");
            var $content = $("<div class='boxpager-content clearfix'/>");
            var img = item.imagepath;
            if (img == null || img == "") {
                img = "/images/home/pic_75x80.gif";
            }
            $content.append("<div class='content-side'><img src='" + img + "'/></div>");
            $content.append("<div class='content-main'><h3>" + subPoints(item.activity_name, 5) + "</h3><div>" + item.join_member_nbr + "参与<br />" + item.follow_score + "人关注<br /><a href='/activity/activity_index.html?id=" + item.id + "' class='joinit' target='_blank'>立即参加</a></div></div>");
            $li.append($content);
            $container.append($li);
        }

        function _getResult(callBack) {
            $.ajax({
                url: "/pop_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getrecommendedactivity',newestAndNearestCount: 3,regionAndInterestCount: 1}",
                error: function () {
                },
                success: function (data) {
                    callBack(data);
                }
            });
        }

        function render() {
            _getResult(_render);
        }
    }

    //最近来访
    function RecentVisitors() {
        var _pageSize = 12;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        function _render(data, refreshPage) {
            var $ul = $(".recentVisitor .bd ul").html("");
            var $li;
            _totalCount = data.total;
            if (_totalCount > 0) {
                $.each(data.rows, function (i, item) {
                    $li = $("<li/>");
                    $li.append("<img src='" + item.logo_small_path + "'/><br/>");
                    $li.append("<a href='/personal/personal_info.html?uid=" + item.user_id + "&infoType=1'>" + item.visit_user_name + "</a>");
                    $ul.append($li);
                });
                if (refreshPage) {
                    $(".recentVisitor .total").text(data.total);
                    _pageCurrent = 1;
                    _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;
                    if (_pageTotal <= 1) {
                        $(".recentVisitor .pager .next").addClass("next-disable");
                    }
                    $(".recentVisitor .pager .prev").click(function () {
                        if (_pageCurrent > 1) {
                            if (_pageCurrent == _pageTotal) {
                                $(".recentVisitor .pager .next").removeClass("next-disable");
                            }
                            _pageCurrent--;
                            if (_pageCurrent == 1) {
                                $(this).addClass("prev-disable");
                            }
                            _getResult(_render, false);
                        }
                    });
                    $(".recentVisitor .pager .next").click(function () {
                        if (_pageCurrent < _pageTotal) {
                            if (_pageCurrent == 1) {
                                $(".recentVisitor .pager .prev").removeClass("prev-disable");
                            }
                            _pageCurrent++;
                            if (_pageCurrent == _pageTotal) {
                                $(this).removeClass("next").addClass("next-disable");
                            }
                            _getResult(_render, false);
                        }
                    });
                }
                $(".recentVisitor").show();
            } else {
                $(".recentVisitor").hide();
            }
        }
        function _getResult(callBack, refreshPage) {
            $.ajax({
                url: "/getvisiteduser_home.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getvisiteduser',user_id:'" + wd_B.uin.uid + "',pageIndex:" + _pageCurrent + ",pageSize:" + _pageSize + "}",
                error: function () {
                },
                success: function (data) {
                    if (data.result = "True" && data.total > 0) {
                        callBack(data, refreshPage);
                    } else {
                        $(".recentVisitor").hide();
                    }
                }
            });
        }
        function render() {
            _getResult(_render, true);
        }
    }

    //可能朋友
    function PossibleFriends() {
        var _pageSize = 12;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        function _render(data, refreshPage) {
            var $ul = $(".possibleFriends .bd ul").html("");
            var $li;
            _totalCount = data.total;
            if (_totalCount) {
                $.each(data.rows, function (i, item) {
                    $li = $("<li/>");
                    $li.append("<img src='" + item.logo_small_path + "'/><br/>");
                    $li.append("<a href='/personal/personal_info.html?uid=" + item.user_id + "&infoType=1'>" + item.name + "</a>");
                    $ul.append($li);
                });
                if (refreshPage) {
                    $(".possibleFriends .total").text(data.total);
                    _pageCurrent = 1;
                    _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;
                    if (_pageTotal <= 1) {
                        $(".possibleFriends .pager .next").addClass("next-disable");
                    }
                    $(".possibleFriends .pager .prev").click(function () {
                        if (_pageCurrent > 1) {
                            if (_pageCurrent == _pageTotal) {
                                $(".possibleFriends .pager .next").removeClass("next-disable");
                            }
                            _pageCurrent--;
                            if (_pageCurrent == 1) {
                                $(this).addClass("prev-disable");
                            }
                            _getResult(_render, false);
                        }
                    });
                    $(".possibleFriends .pager .next").click(function () {
                        if (_pageCurrent < _pageTotal) {
                            if (_pageCurrent == 1) {
                                $(".possibleFriends .pager .prev").removeClass("prev-disable");
                            }
                            _pageCurrent++;
                            if (_pageCurrent == _pageTotal) {
                                $(this).removeClass("next").addClass("next-disable");
                            }
                            _getResult(_render, false);
                        }
                    });
                }
                $(".possibleFriends").show();
            } else {
                $(".possibleFriends").hide();
            }
        }
        function _getResult(callBack, refreshPage) {
            $.ajax({
                url: "/getpossiblefriends_home.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getmayknowfrieds',user_id:'" + wd_B.uin.uid + "'}",
                error: function () {
                },
                success: function (data) {
                    if (data.result = "True" && data.total > 0) {
                        callBack(data, refreshPage);
                    } else {
                        $(".possibleFriends").hide();
                    }
                }
            });
        }
        function render() {
            _getResult(_render, true);
        }
    }

    //周边活动
    function AroundActivity(option) {
        var _pageSize = 4;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        this.init = _init;
        function _init() {
            _pageSize = 4;
            _pageCurrent = 1;
            _pageTotal = 0;
            _totalCount = 0;
        }
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            _totalCount = data.total;
            if (_totalCount <= 0) {
                $ul.html(wanerdaoLangTip("home_00001"));
                return;
            }
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.html?id=" + item.id + "' target='_blank'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'>" + item.join_member_nbr + "人参与</a>&nbsp;&nbsp;&nbsp;&nbsp<a href='javascript:void(0);'>关注度:" + item.follow_score + "</a>");
                $li.append("<a class='button follow' href='javascript:void(0);'>关注</a>");
                $li.find(".follow").click(function () {
                    var thisBtn = this;
                    $.ajax({
                        url: "/followactivity_follow.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'followactivity',activityId:'" + item.id + "'}",
                        error: function () {
                        },
                        success: function (data) {
                            if (data.result == "True") {
                                $(thisBtn).text("已关注");
                                $(thisBtn).css({ "poorfish": "expression(this.onclick=function(){return false})" });
                            }
                            //alert(data.msg);
                            hint(data.msg, $("#rhint"));
                        }
                    });
                });
                $ul.append($li);
            });
            if (refreshPage) {
                _pageCurrent = 1;
                _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;

                var $page = $(".areabox .sidepage");
                if (_pageTotal == 0) {
                    $page.find(".currPage").text(0);
                } else {
                    $page.find(".currPage").text(_pageCurrent);
                }
                $page.find(".totalPage").text(_pageTotal);

                $page.find(".next").removeClass("next-disabled");
                $page.find(".prev").addClass("prev-disabled");
                if (_pageTotal <= 1) {
                    $page.find(".next").addClass("next-disabled");
                }
                $page.find(".prev").unbind("click").click(function () {
                    if (_pageCurrent > 1) {
                        if (_pageCurrent == _pageTotal) {
                            $page.find(".next").removeClass("next-disabled");
                        }
                        _pageCurrent--;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == 1) {
                            $(this).addClass("prev-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
                $page.find(".next").unbind("click").click(function () {
                    if (_pageCurrent < _pageTotal) {
                        if (_pageCurrent == 1) {
                            $page.find(".prev").removeClass("prev-disabled");
                        }
                        _pageCurrent++;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == _pageTotal) {
                            $(this).addClass("next-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
            }
        }
        function _getResult(callBack, refreshPage, cityId) {
            //var result = { rows: [1, 2, 3, 4], total: 10 };
            if (!cityId) {
                cityId = '-1';
            }
            $(".arealist").html("<img src='/images/loading.gif'/>");
            $.ajax({
                url: "/getactivitybycityid_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getactivitybycityid',city_id:'" + cityId + "',pageCurrent:" + _pageCurrent + ",pageSize:" + _pageSize + "}",
                error: function () {
                    $(".areabox .areabox-content .arealist").html("");
                },
                success: function (data) {
                    $(".areabox .areabox-content .arealist").html("");
                    if (data.result = "True") {
                        callBack(data, refreshPage);
                    }
                }
            });
        }
        function render(cityId) {
            $("#country").val("").show();
            _getResult(_render, true, cityId);
        }
    }

    //感兴趣活动
    function InterestingActivity() {
        var _pageSize = 4;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        this.init = _init;
        function _init() {
            _pageSize = 4;
            _pageCurrent = 1;
            _pageTotal = 0;
            _totalCount = 0;
        }
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            if (!data.total) {
                $ul.html(wanerdaoLangTip("home_00001"));
                return;
            }
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.html?id=" + item.id + "' target='_blank'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'>" + item.join_member_nbr + "人参与</a>&nbsp;&nbsp;&nbsp;&nbsp<a href='javascript:void(0);'>关注度:" + item.follow_score + "</a>");
                $li.append("<a class='button follow' href='javascript:void(0);'>关注</a>");
                $li.find(".follow").click(function () {
                    var thisBtn = this;
                    $.ajax({
                        url: "/followactivity_follow.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'followactivity',attention_id:" + item.id + "}",
                        error: function () {
                        },
                        success: function (data) {
                            if (data.result == "True") {
                                $(thisBtn).text("已关注");
                                $(thisBtn).css({ "poorfish": "expression(this.onclick=function(){return false})" });
                            }
                            hint(data.msg, $("#rhint"));
                            //alert(data.msg);
                        }
                    });
                });
                $ul.append($li);
            });
            if (refreshPage) {
                _totalCount = data.total;
                _pageCurrent = 1;
                _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;

                //$(".areabox .areabox-content .selectArea").append("<select class='select country'></select><select class='select province'></select><select class='select city'></select>");
                var $page = $(".areabox .sidepage");
                if (_pageTotal == 0) {
                    $page.find(".currPage").text(0);
                } else {
                    $page.find(".currPage").text(_pageCurrent);
                }
                $page.find(".totalPage").text(_pageTotal);
                $page.find(".next").removeClass("next-disabled");
                $page.find(".prev").addClass("prev-disabled");
                if (_pageTotal <= 1) {
                    $page.find(".next").addClass("next-disabled");
                }
                $page.find(".prev").unbind("click").click(function () {
                    if (_pageCurrent > 1) {
                        if (_pageCurrent == _pageTotal) {
                            $page.find(".next").removeClass("next-disabled");
                        }
                        _pageCurrent--;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == 1) {
                            $(this).addClass("prev-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
                $page.find(".next").unbind("click").click(function () {
                    if (_pageCurrent < _pageTotal) {
                        if (_pageCurrent == 1) {
                            $page.find(".prev").removeClass("prev-disabled");
                        }
                        _pageCurrent++;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == _pageTotal) {
                            $(this).addClass("next-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
            }
        }
        function _getResult(callBack, refreshPage) {
            //var result = { rows: [1, 2, 3, 4], total: 10 };
            $(".arealist").html("<img src='/images/loading.gif'/>");
            $.ajax({
                url: "/getactivitybyuserinterest_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getactivitybyuserinterest',pageCurrent:" + _pageCurrent + ",pageSize:" + _pageSize + "}",
                error: function () {
                    $(".areabox .areabox-content .arealist").html("");
                },
                success: function (data) {
                    $(".arealist").html("<img src='/images/loading.gif'/>");
                    if (data.result) {
                        callBack(data, refreshPage);
                    }
                }
            });
        }
        function render() {
            $("#country").hide();
            _getResult(_render, true);
        }
    }
    //关注活动
    function FollowActivity() {
        var _pageSize = 4;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        this.init = _init;
        function _init() {
            _pageSize = 4;
            _pageCurrent = 1;
            _pageTotal = 0;
            _totalCount = 0;
        }
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            _totalCount = data.total;
            if (_totalCount <= 0) {
                $ul.html(wanerdaoLangTip("home_00001"));
                return;
            }
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.html?id=" + item.activity_id + "' target='_blank'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.format("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.join_member_nbr + "人参与&nbsp;&nbsp;&nbsp;&nbsp关注度:" + item.follow_score);
                $li.append("<a class='button cancelFollow' href='javascript:void(0);'>取消</a>");
                $li.find(".cancelFollow").click(function () {
                    $.ajax({
                        url: "/cancelpersonalactivity_follow.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'cancelpersonalactivityfollow',activityId:'" + item.follow_id + "'}",
                        error: function () {
                        },
                        success: function (data) {
                            if (data.result) {
                                $li.remove();
                            }
                            hint(data.msg, $("#rhint"));
                            //alert(data.msg);
                        }
                    });
                });
                $ul.append($li);
            });
            if (refreshPage) {
                _pageCurrent = 1;
                _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;
                //$(".areabox .areabox-content .selectArea").append("<select class='select country'></select><select class='select province'></select><select class='select city'></select>");

                var $page = $(".areabox .sidepage");
                if (_pageTotal == 0) {
                    $page.find(".currPage").text(0);
                } else {
                    $page.find(".currPage").text(_pageCurrent);
                }
                $page.find(".totalPage").text(_pageTotal);
                $page.find(".next").removeClass("next-disabled");
                $page.find(".prev").addClass("prev-disabled");
                if (_pageTotal <= 1) {
                    $page.find(".next").addClass("next-disabled");
                }
                $page.find(".prev").unbind("click").click(function () {
                    if (_pageCurrent > 1) {
                        if (_pageCurrent == _pageTotal) {
                            $page.find(".next").removeClass("next-disabled");
                        }
                        _pageCurrent--;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == 1) {
                            $(this).addClass("prev-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
                $page.find(".next").unbind("click").click(function () {
                    if (_pageCurrent < _pageTotal) {
                        if (_pageCurrent == 1) {
                            $page.find(".prev").removeClass("prev-disabled");
                        }
                        _pageCurrent++;
                        $page.find(".currPage").text(_pageCurrent);
                        if (_pageCurrent == _pageTotal) {
                            $(this).addClass("next-disabled");
                        }
                        _getResult(_render, false);
                    }
                });
            }
        }
        function _getResult(callBack, refreshPage) {
            //var result = { rows: [1, 2, 3, 4], total: 10 };
            $(".arealist").html("<img src='/images/loading.gif'/>");
            $.ajax({
                url: "/getactivitybycurrentuserfollow_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getactivitybycurrentuserfollow',pageCurrent:" + _pageCurrent + ",pageSize:" + _pageSize + "}",
                error: function () {
                    $(".areabox .areabox-content .arealist").html("");
                },
                success: function (data) {
                    $(".arealist").html("<img src='/images/loading.gif'/>");
                    if (data.result = "True") {
                        callBack(data, refreshPage);
                    }
                    //$(".areabox .areabox-content .arealist").html("");
                }
            });
        }
        function render() {
            //$(".areabox .areabox-content .selectArea").html("");
            $("#country").hide();
            _getResult(_render, true);
        }
    }

    $(".mes_small_box_tab a").click(function () {
        $(".arealist").html("<img src='/images/loading.gif'/>");
        $(".areabox-content .sidepage span").text(0);
        $(".areabox-content .sidepage a.prev").unbind("click").addClass("prev-disabled");
        $(".areabox-content .sidepage a.next").unbind("click").addClass("next-disabled");
        $(".mes_small_box_tab a").removeClass("active");
        //actInstance[$(this).attr("class")].init();
        actInstance[$(this).attr("class")].render();
        $(this).addClass("active");
    });

    /*共享开始*/

    function wordLength(obj) {
        var oVal = obj.val();
        var oValLength = 0;
        oVal.replace(/\n*\s*/, '') == '' ? oValLength = 0 : oValLength = oVal.match(/[^ -~]/g) == null ? oVal.length : oVal.length + oVal.match(/[^ -~]/g).length;
        return oValLength;
    }
    function error(obj) {
        hint(wanerdaoLangTip("share_00014"), $("#hint"));
    }

    //obj-要检查的输入框, iNow-多少字, tit-提示框 
    function limit(obj, iNow, tit) {
        var oValLength = wordLength(obj);
        font_count = Math.floor((iNow - oValLength) / 2);
        if (font_count >= 0) {
            tit.html($wd.format(wanerdaoLangTip("share_00015"), font_count));
        } else {
            tit.html($wd.format(wanerdaoLangTip("share_00016"), Math.abs(font_count)));
        }
        tit.show();
    }

    if (is_self) {
        //初始化
        new $.ui.tabs('.commentbox', {
            effect: 'normal',
            cssSelected: 'tabs-nav-cur'
        });

        function refreshState() {
            $('#stateTab').children('a:eq(0)').addClass('active');
            Init('new');
        }
        //共享提交
        $(".commentbox .share").click(function () {
            var curr = $(".commentbox .tabs-panel li:visible").attr("class");
            if (curr) {
                switch (curr) {
                    //个人状态                                                                                                                                                                                                              
                    case "status":
                        addStatus();
                        break;
                    //图片                                                                                                                                                                                                             
                    case "pic":
                        addImage();
                        break;
                    //连接                                                                                                                                                                                                             
                    case "link":
                        addLink();
                        break;
                    //视频                                                                                                                                                                                                            
                    case "vedio":
                        addVedio();
                        break;

                }
            }
        });

        /*个人状态开始*/
        var defLimit = 280; //默认是280个字符，140个中文字符
        var font_count = defLimit / 2;
        var oH2 = $("#spetit_word"); //提示文字 
        var oTextarea = $("#p_qa_content"); //输入框 

        oTextarea.height(40).focus(function () {
            $(this).stop(true, true).animate({ 'height': '100' });
        }).blur(function () {
            if (font_count == defLimit / 2) {
                $(this).stop(true, true).animate({ 'height': '40' });
                oH2.hide();
            }
        });

        //var oButton = $(".share"); //按钮 
        oTextarea.live("keyup", function () {
            limit(oTextarea, defLimit, oH2);
        });

        //添加状态
        function addStatus() {
            var permission = "";
            if (font_count < 0 || font_count >= defLimit / 2) {
                error(oTextarea);
            } else {
                ajaxCommon("/addnewfeeds_home.axd",
                            "{ opertype: 'addnewfeeds',coutent:'" + $("#p_qa_content").val() + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    hint(wanerdaoLangTip("share_00001"), $("#hint"));
                                    oTextarea.stop(true, true).animate({ 'height': '40' });
                                    oH2.hide();
                                    oTextarea.val("");
                                    font_count = defLimit / 2;
                                    refreshState();
                                }
                            });
            }
        }
        /*个人状态结束*/

        //发布链接
        function addLink() {
            var permission = "";
            var linkUrl = $("#linkUrl").val();
            var linkContent = $("#linkContent").val();
            if (!linkUrl) {
                hint(wanerdaoLangTip("share_00002"), $("#hint"));
                return false;
            }
            if (!isURL(linkUrl)) {
                hint(wanerdaoLangTip("share_00003"), $("#hint"));
                return false;
            }
            if (getStringLength(linkUrl) > 200) {
                hint(wanerdaoLangTip("share_00004"), $("#hint"));
                return false;
            }
            if (linkContent != "" && getStringLength(linkContent) > 200) {
                hint(wanerdaoLangTip("share_00005"), $("#hint"));
                return false;
            }
            ajaxCommon("/addlinkfeeds_home.axd",
                            "{ opertype: 'addlinkfeeds',link:'" + encodeURIComponent(linkUrl) + "',description:'" + linkContent + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    hint(wanerdaoLangTip("share_00001"), $("#hint"));
                                    //alert('发布成功！');
                                    $("#linkUrl").val("http://");
                                    $("#linkContent").val("");
                                    refreshState();
                                }
                            });
        }

        /*图片共享开始*/
        var batchid = newGuid();
        var upPhotoList = "";
        function initImageUpload() {

            var path = document.location.href;
            //path = path.substring(0, path.lastIndexOf("/")) + "/upload.aspx?uid=1";
            //path = "wandao_activity.axd";
            swfu = new SWFUpload({
                // Backend Settings
                upload_url: "photoupload_common.axd", // Relative to the SWF file
                post_params: {
                    "opertype": "albumphotoupload", //业务代码
                    "batchid": batchid //批次ID
                },

                // File Upload Settings
                file_size_limit: "10 MB",
                file_types: "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
                file_types_description: "图片",
                file_upload_limit: "0",    // Zero means unlimited

                // Event Handler Settings - these functions as defined in Handlers.js
                //  The handlers are not part of SWFUpload but are part of my website and control how
                //  my website reacts to the SWFUpload events.
                file_queue_error_handler: fileQueueError,
                file_dialog_complete_handler: fileDialogComplete,
                upload_progress_handler: uploadProgress,
                upload_error_handler: uploadError,
                upload_success_handler: uploadImgSuccess,
                upload_complete_handler: uploadComplete,

                // Button settings
                button_image_url: "../images/PluginImages/Album/photo_upload_button2.gif", // Relative to the SWF file
                button_placeholder_id: "aButtonPlaceholder",
                button_width: 100,
                button_height: 30,
                button_text: '',
                button_text_style: '',
                button_text_top_padding: 0,
                button_text_left_padding: 0,

                // Flash Settings
                flash_url: "../Scripts/Plugin/Ablum/swfupload.swf", // Relative to this file

                // Debug Settings
                debug: false
            });
        }

        function uploadImgSuccess(file, serverData) {
            try {
                if (serverData != "no Space!") {
                    var data = jQuery.parseJSON(serverData);
                    var info = data.msg.split('|');
                    upPhotoList += info[1] + ',' + info[2] + ':';
                    initImgArea(info);
                } else {
                    $("#message").html("照片空间已满！");
                }

            } catch (ex) {
                this.debug(ex);
            }
        }

        function initImgArea(info) {
            $("#uploadImgUrl").val("http://" + window.location.host + info[0]);
            $("#uploadImgDesc").val(info[2]);
        }

        function addImage() {
            var imgUrl = $("#uploadImgUrl").val();
            var imgContent = $("#uploadImgDesc").val();
            var permission = "1"; //默认的权限，具体没做
            var albumtype = 1;
            if (!imgUrl) {
                hint(wanerdaoLangTip("share_00006"), $("#hint"));
                return false;
            }
            if (!isURL(imgUrl)) {
                hint(wanerdaoLangTip("share_00007"), $("#hint"));
                return false;
            }
            if (getStringLength(imgUrl) > 200) {
                hint(wanerdaoLangTip("share_00008"), $("#hint"));
                return false;
            }
            if (imgContent != "" && getStringLength(imgContent) > 200) {
                hint(wanerdaoLangTip("share_00009"), $("#hint"));
                return false;
            }
            ajaxCommon("/addpersonimage_home.axd",
                            "{ opertype: 'shareimage',batchid:'" + batchid + "',pList: '" + upPhotoList.substr(0, upPhotoList.length - 1).escapeSpecialchar() + "'}",
                            function (data) {
                                if (data.result) {
                                    hint(wanerdaoLangTip("share_00001"), $("#hint"));
                                    $("#uploadImgUrl").val("");
                                    $("#uploadImgDesc").val("");
                                    refreshState();
                                }
                            });
        }
        initImageUpload();
        /*图片共享结束*/

        //视频共享
        function addVedio() {
            //var permission = "1";//默认的权限，具体没做
            var videoCode = $("#videoCode").val();
            var videoDesc = $("#vedioDesc").val();
            if (!videoCode) {
                hint(wanerdaoLangTip("share_00010"), $("#hint"));
                return false;
            }
            //            if (!isURL(videoUrl)) {
            //                hint(wanerdaoLangTip("share_00011"), $("#hint"));
            //                return false;
            //            } else
            videoCode = videoCode.replace(/\?/g, "!~*");
            videoCode = videoCode.replace(/\=/g, "-_.");

            if (getStringLength(videoCode) > 2000) {
                hint(wanerdaoLangTip("share_00012"), $("#hint"));
                return false;
            }
            if (videoDesc != "" && getStringLength(videoDesc) > 200) {
                hint(wanerdaoLangTip("share_00013"), $("#hint"));
                return false;
            }
            ajaxCommon("/sharevideo_home.axd",
                            "{ opertype: 'sharevideo',videoCode:'" + videoCode + "',videoDesc:'" + videoDesc + "'}",
                            function (data) {
                                if (data.result) {
                                    hint(wanerdaoLangTip("share_00001"), $("#hint"));
                                    $("#videoCode").val("");
                                    $("#vedioDesc").val("");
                                    refreshState();
                                }
                            });
        }
        $(".leave-message-box").hide();
    } else {
        $(".isSelf").hide();

        /*留言开始*/
        var defLimit = 280; //默认是280个字符，140个中文字符
        var font_count = defLimit / 2;
        var oH2 = $("#inputWord"); //提示文字 
        var oTextarea = $("#commArea"); //输入框 

        oTextarea.live("keyup", function () {
            limit(oTextarea, defLimit, oH2);
        });

        oTextarea.height(40).focus(function () {
            $(this).stop(true, true).animate({ 'height': '100' });
        }).blur(function () {
            if (font_count == defLimit / 2) {
                $(this).stop(true, true).animate({ 'height': '40' });
            }
        });

        //提交留言
        function addComment() {
            if (font_count < 0 || font_count >= defLimit / 2) {
                error(oTextarea);
            } else {
                ajaxCommon("/leavemessages_home.axd",
                            "{ opertype: 'leavemessages',person_id:'" + userId + "',msgcontent:'" + $("#commArea").val() + "'}",
                            function (data) {
                                if (data.result) {
                                    hint(wanerdaoLangTip("commnet_00001"), $("#hint"));
                                    $("#commArea").val("").trigger("keyup");
                                    Init("Message");
                                }
                            });
            }
        }

        $("#comment").click(function () {
            addComment();
        });
        /*留言结束*/

        $(".leave-message-box").show();
    }
    /*共享结束*/

    /*全局初始化开始*/

    //全局变量
    var userId = getCurrentUserId();

    //这4个模块默认隐藏，有数据才展示
    $(".switch").hide();
    $(".recentVisitor").hide();
    $(".possibleFriends").hide();
    $(".rRecomm").hide(); //右侧活动推荐模块暂时隐藏

    //如果不是本人访问，只保留访问人的最近访问人模块，和下面的活动分类推荐模块
    if (is_self) {//是本人
        //推荐活动
        var ra = new RecommendedActivity();
        ra.render();

        //可能朋友模块
        var pf = new PossibleFriends();
        pf.render();

        //右上角小日历插件
        $("#tcalendar").tinycalendar();


    } else {
        userId = getQueryString("uid");
        $(".join").hide();
    }

    //最近访问者
    var rv = new RecentVisitors();
    rv.render();

    //右侧活动推荐实例
    var actInstance = { aroundAct: new AroundActivity(), interestingAct: new InterestingActivity(), followAct: new FollowActivity() };
    actInstance["aroundAct"].render(); //默认周边活动显示

    /*全局初始化结束*/

});