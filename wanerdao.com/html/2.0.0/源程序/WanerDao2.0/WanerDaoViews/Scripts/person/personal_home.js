$(function () {
    $('.comments .replay-content').hide();
    $('.comments .replay').click(function () {
        $(this).parentsUntil('li').find('.replay-content').animate({ height: 'toggle' });
    });

    var minHeight = 20;
    var norHeight = 100;
    $('.panel-box').click(function () {
        var _this = this;
        $(this).stop(true, true).animate({ height: norHeight }, function () {
            $(_this).children().fadeIn();
        });
    }).hover(function () { }, function () {
        //var _this = this;
        //$(this).children().fadeOut(function(){
        //	$(_this).stop(true,true).animate({height:minHeight});
        //});

    }).height(minHeight).children().hide();
});

$(function () {

    //上部活动推荐切换
    function TopRecommendedActivity() {
        this.render = render;

        function _renderTopActivity(item, $ulMain, $ulPanel) {
            //右侧切换
            var $li = $("<li/>");
            $li.append("<img class='arrowhead' src='../images/home/ico_6x12.png'/>");
            $li.append("<h3 class='ellipsis'>" + item.activity_name + "</h3>");
            $li.append("<img src='../images/home_xing.gif'/><em>0</em>分<br/>");
            $li.append("<span>" + item.join_member_nbr + "参加</span><span>" + item.follow_score + "关注</span>");
            $ulPanel.append($li);

            //主切换
            $li = $("<li class='tabs-content' style='display:none;'/>");
            var img = item.imagepath;
            if (img == null || img == "") {
                img = "/UpPhoto/secitionpage/define.jpg";
            }
            $li.append("<div class='left'><img src='" + img + "' width='199px' height='199px'/></div>");
            var $main = $("<div class='main'/>");
            $main.append("<h3 class='ellipsis'>" + item.activity_name + "</h3>");
            $main.append("<label>推荐指数:</label><img src='../images/home_xing.gif'/><em>0</em>分<br/>");
            $main.append("<label>地点:</label>" + item.address + "<br/>");
            $main.append("<label>参与人数:</label><em>" + item.join_member_nbr + "</em>人<br/>");
            $main.append("<label>人均消费:</label>" + item.personcost + "<br/>");
            $main.append("<label>组织者:</label>" + item.name + "<br/>");
            $main.append("<a href='/activity/Activity_index.aspx?id=" + item.id + "' class='join' target='_blank'>立即报名</a>");

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
            $li.append("<img src='../images/home_xing.gif'/><em>0</em>分<br/>");
            $li.append("<span>0参加</span><span>0关注</span>");
            $ulPanel.append($li);

            //主切换
            $li = $("<li class='tabs-content' style='display:none;'/>");

            $li.append("<div class='left'><img src='/UpPhoto/secitionpage/define.jpg' width='199px' height='199px'/></div>");
            var $main = $("<div class='main'/>");
            $main.append("<h3>无</h3>");
            $main.append("<label>推荐指数:</label><img src='../images/home_xing.gif'/><em>0</em>分<br/>");
            $main.append("<label>地点:</label>无<br/>");
            $main.append("<label>参与人数:</label><em>0</em>人<br/>");
            $main.append("<label>人均消费:</label>0<br/>");
            $main.append("<label>组织者:</label>无<br/>");
            $main.append("<a href='javascript:void(0);' class='join'>立即报名</a>");

            $li.append($main);
            $li.append("<div class='clear'></div>");
            $li.append("<p>无</p>");
            $ulMain.append($li);
        }

        function _render(data) {

            var $ulMain = $(".activityMain");
            var $ulPanel = $(".activityPanel");

            var recommActCount1 = 0;
            var recommActCount2 = 0;

            var newestAndNearest = JSON.parse(data.newestAndNearest);
            var regionAndInterest = JSON.parse(data.regionAndInterest);

            if (newestAndNearest.result == "True") {
                recommActCount1 = newestAndNearest.total >= 3 ? 3 : recommActCount1;
                for (var i = 0; i < recommActCount1; i++) {
                    _renderTopActivity(newestAndNearest.rows[i], $ulMain, $ulPanel);
                }
            }

            if (regionAndInterest.result == "True") {
                recommActCount2 = regionAndInterest.total >= 1 ? 1 : recommActCount2;
                for (var i = 0; i < recommActCount2; i++) {
                    _renderTopActivity(regionAndInterest.rows[i], $ulMain, $ulPanel);
                }
            }

            for (var i = 0; i < 4 - (recommActCount1 + recommActCount2); i++) {
                _renderTopBlankActivity($ulMain, $ulPanel);
            }

            $ulPanel.find("li").eq(0).addClass("tabs-nav-cur");
            $ulMain.find("li").eq(0).removeAttr("style");

            new czy.ui.tabs('.tabs', { isauto: true });

            //右侧活动推荐切换
            if (newestAndNearest.total > 3) {
                recommActCount1 = newestAndNearest.total - 3;
                $(".rightRecommCount").text(recommActCount1);
                for (var i = newestAndNearest.total - recommActCount1; i < newestAndNearest.total; i++) {
                    _renderRightActivity(newestAndNearest.rows[i]);
                }
                $('.boxpager').jcarousel();
            } else {
                $(".rightRecomm").hide();
            }
        }

        function _renderRightActivity(item) {
            var $ul = $(".sidebox ul.jcarousel-list");
            var $li = $("<li/>");
            var $content = $("<div class='boxpager-content clearfix'/>");
            var img = item.imagepath;
            if (img == null || img == "") {
                img = "/UpPhoto/secitionpage/define.jpg";
            }
            $content.append("<div class='content-side'><img src='" + img + "' width='75px' height='80px'/></div>");
            $content.append("<div class='content-main'><h3>" + subPoints(item.activity_name, 5) + "</h3><div>" + item.join_member_nbr + "参与<br />" + item.follow_score + "人关注<br /><a href='/activity/Activity_index.aspx?id=" + item.id + "' class='joinit attend' target='_blank'>立即参加</a></div></div>");
            $li.append($content);
            $ul.append($li);
        }

        function _getResult(callBack) {
            $.ajax({
                url: "/pop_common.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getrecommendedactivity',newestAndNearestCount: 6,regionAndInterestCount: 1}",
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

    var ta = new TopRecommendedActivity();
    ta.render();

    var rv = new RecentVisitors();
    rv.render();

    var pf = new PossibleFriends();
    pf.render();

});

$(function () {
    //新版右侧活动推荐切换 
    function BaseActivityView() {
        var viewType = { aroundAct: new AroundActivity(), interestingAct: new InterestingActivity(), followAct: new FollowActivity() };

        this.render = function () {
            viewType["aroundAct"].render();
            $(".areabox .hd a").click(function () {
                $(".areabox .areabox-content ul").html("<img src='/images/loading.gif'/>");
                $(".areabox-content .sidepage span").text(0);
                $(".areabox-content .sidepage a.prev").removeClass("prev-disabled").addClass("prev-disabled");
                $(".areabox-content .sidepage a.next").removeClass("next-disabled").addClass("next-disabled");
                $(".mes_small_box_tab a").removeClass("active");
                viewType[$(".mes_small_box_tab a").attr("class")].render();
                $(this).addClass("active");
            });
        };
        function renderPage(options) {
            var defaults = { pageSize: 5, pageCurrent: 1, pageTotal: 0, countTotal: 0 };
            var opts = $.extends(defaults, options);

            var pageSize = opts.pageSize;
            var pageCurrent = opts.pageCurrent;
            var countTotal = opts.countTotal;
            var pageTotal = opts.pageTotal = opts.countTotal % opts.pageSize == 0 ? parseInt(opts.countTotal / opts.pageSize) : parseInt(opts.countTotal / opts.pageSize) + 1;

            $(".areabox-content .sidepage span.currPage").text(pageCurrent);
            $(".areabox-content .sidepage span.totalPage").text(pageTotal);

            if (pageCurrent <= 1) {
                $(".sidepage .prev").removeClass("prev-disabled").addClass("prev-disabled");
            }
            if (pageCurrent >= pageTotal) {
                $(".sidepage .next").removeClass("next-disabled").addClass("next-disabled");
            }

            $(".sidepage .prev").unbind("click").click(function () {
                if (pageCurrent > 1) {
                    pageCurrent--;
                    if (pageCurrent <= 1) {
                        $(".sidepage .prev").removeClass("prev-disabled").addClass("prev-disabled");
                    }
                    if (pageCurrent < pageTotal) {
                        $(".sidepage .next").removeClass("next-disabled");
                    }
                    opts.callBack(pageCurrent, pageSize, function (data) {
                        if (data.result == "True") {
                            $(".sidepage .currPage").text(pageCurrent);
                        }
                    });
                }
            });

            $(".sidepage .next").unbind("click").click(function () {
                if (pageCurrent < pageTotal) {
                    pageCurrent++;
                    if (pageCurrent >= pageTotal) {
                        $(".sidepage .next").removeClass("next-disabled").addClass("next-disabled");
                    }
                    if (pageCurrent > 1) {
                        $(".sidepage .prev").removeClass("prev-disabled");
                    }
                    opts.callBack(pageCurrent, pageSize, function (data) {
                        if (data.result == "True") {
                            $(".sidepage .currPage").text(pageCurrent);
                        }
                    });
                }
            });
        }


        function AroundView(options) {
            this.render = function () {
                _getResult(options, function (data) {
                    var opts = $.extends(options, { countTotal: data.total, callBack: _getResult });
                    renderPage(opts);
                });
            };
            function _getResult(pageCurrent, pageSize, callBack) {
                $.ajax({
                    url: "/getactivitybycurrentuserfollow_common.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'getactivitybycurrentuserfollow',pageCurrent:" + options.pageCurrent + ",pageSize:" + options.pageSize + "}",
                    error: function () {
                    },
                    success: function (data) {
                        _render(data);
                        if (callBack) {
                            callBack(data);
                        }
                    }
                });
            }
            function _render(data) {
                var $ul = $(".areabox .areabox-content .arealist").html("");
                var $li;
                $.each(data.rows, function (i, item) {
                    $li = $("<li/>");
                    $li.append("·<a href='/activity/activity_index.aspx?id=" + item.id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
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
                            data: "{opertype:'followactivity',attention_id:'" + item.id + "'}",
                            error: function () {
                            },
                            success: function (data) {
                                if (data.result == "True") {
                                    $(thisBtn).text("已关注");
                                    $(thisBtn).css({ "poorfish": "expression(this.onclick=function(){return false})" });
                                }
                                alert(data.msg);
                            }
                        });
                    });
                    $ul.append($li);
                });
            }

            function InterestingView(options) {
                this.render = function () {
                    _getResult(options, function (data) {
                        var opts = $.extends(options, { countTotal: data.total, callBack: _getResult });
                        renderPage(opts);
                    });
                };
                function _render(data) {
                    var $ul = $(".areabox .areabox-content .arealist").html("");
                    var $li;
                    $.each(data.rows, function (i, item) {
                        $li = $("<li/>");
                        $li.append("·<a href='/activity/activity_index.aspx?id=" + item.id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
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
                                    alert(data.msg);
                                }
                            });
                        });
                        $ul.append($li);
                    });
                }
                function _getResult(pageCurrent, pageSize, callBack) {
                    $.ajax({
                        url: "/getactivitybyuserinterest_common.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'getactivitybyuserinterest',pageCurrent:" + options.pageCurrent + ",pageSize:" + options.pageSize + "}",
                        error: function () {
                        },
                        success: function (data) {
                            _render(data);
                            if (callBack) {
                                callBack(data);
                            }
                        }
                    });
                }
            }

            function FolloView(options) {
                this.render = function () {
                    _getResult(options, function (data) {
                        var opts = $.extends(options, { countTotal: data.total, callBack: _getResult });
                        renderPage(opts);
                    });
                };
                function _render(data) {
                    var $ul = $(".areabox .areabox-content .arealist").html("");
                    var $li;
                    $.each(data.rows, function (i, item) {
                        $li = $("<li/>");
                        $li.append("·<a href='/activity/activity_index.aspx?id=" + item.activity_id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                        $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                        var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                        $li.append("&nbsp;&nbsp;" + beginDate.pattern("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.join_member_nbr + "人参与&nbsp;&nbsp;&nbsp;&nbsp关注度:" + item.follow_score);
                        $li.append("<a class='button cancelFollow' href='javascript:void(0);'>取消</a>");
                        $li.find(".cancelFollow").click(function () {
                            $.ajax({
                                url: "/cancelpersonalactivity_follow.axd",
                                type: "POST",
                                dataType: "json",
                                cache: false,
                                data: "{opertype:'cancelpersonalactivityfollow',id:'" + item.follow_id + "'}",
                                error: function () {
                                },
                                success: function (data) {
                                    if (data.result) {
                                        $li.remove();
                                    }
                                    alert(data.msg);
                                }
                            });
                        });
                        $ul.append($li);
                    });
                }
                function _getResult(pageCurrent, pageSize, callBack) {
                    $.ajax({
                        url: "/getactivitybycurrentuserfollow_common.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'getactivitybycurrentuserfollow',pageCurrent:" + options.pageCurrent + ",pageSize:" + options.pageSize + "}",
                        error: function () {
                        },
                        success: function (data) {
                            _render(data);
                            if (callBack) {
                                callBack(data);
                            }
                        }
                    });
                }
            }
        }
    }


    //周边活动
    function AroundActivity(option) {
        var _pageSize = 4;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            _totalCount = data.total;
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.aspx?id=" + item.id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.pattern("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'>" + item.join_member_nbr + "人参与</a>&nbsp;&nbsp;&nbsp;&nbsp<a href='javascript:void(0);'>关注度:" + item.follow_score + "</a>");
                $li.append("<a class='button follow' href='javascript:void(0);'>关注</a>");
                $li.find(".follow").click(function () {
                    var thisBtn = this;
                    $.ajax({
                        url: "/followactivity_follow.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'followactivity',attention_id:'" + item.id + "'}",
                        error: function () {
                        },
                        success: function (data) {
                            if (data.result == "True") {
                                $(thisBtn).text("已关注");
                                $(thisBtn).css({ "poorfish": "expression(this.onclick=function(){return false})" });
                            }
                            alert(data.msg);
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
                    if (data.result = "True") {
                        callBack(data, refreshPage);
                    }
                    //$(".areabox .areabox-content .arealist").html("");
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
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.aspx?id=" + item.id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.pattern("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'>" + item.join_member_nbr + "人参与</a>&nbsp;&nbsp;&nbsp;&nbsp<a href='javascript:void(0);'>关注度:" + item.follow_score + "</a>");
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
                            alert(data.msg);
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
        function _render(data, refreshPage) {
            var $ul = $(".areabox .areabox-content .arealist").html("");
            var $li;
            _totalCount = data.total;
            $.each(data.rows, function (i, item) {
                $li = $("<li/>");
                $li.append("·<a href='/activity/activity_index.aspx?id=" + item.activity_id + "'>" + subPoints(item.activity_name, 20) + "</a><br/>");
                $li.append("&nbsp;&nbsp;" + subPoints(item.description, 20) + "<br/>");
                var beginDate = new Date(Date.parse(item.begin_datetime.replace(/-/g, "/")));
                $li.append("&nbsp;&nbsp;" + beginDate.pattern("yyyy-MM-dd") + "&nbsp;&nbsp;&nbsp;&nbsp;" + item.join_member_nbr + "人参与&nbsp;&nbsp;&nbsp;&nbsp关注度:" + item.follow_score);
                $li.append("<a class='button cancelFollow' href='javascript:void(0);'>取消</a>");
                $li.find(".cancelFollow").click(function () {
                    $.ajax({
                        url: "/cancelpersonalactivity_follow.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'cancelpersonalactivityfollow',id:'" + item.follow_id + "'}",
                        error: function () {
                        },
                        success: function (data) {
                            if (data.result) {
                                $li.remove();
                            }
                            alert(data.msg);
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

    //右侧活动推荐实例
    var actInstance = { aroundAct: new AroundActivity(), interestingAct: new InterestingActivity(), followAct: new FollowActivity() };

    $(".areabox .hd a").click(function () {
        $(".areabox .areabox-content ul").html("<img src='/images/loading.gif'/>");
        $(".areabox-content .sidepage span").text(0);
        $(".areabox-content .sidepage a.prev").addClass("prev-disabled");
        $(".areabox-content .sidepage a.next").addClass("next-disabled");
        $(".areabox .hd a").removeClass("cur");
        actInstance[$(this).attr("class")].render();
        $(this).addClass("active");
    });

    actInstance["aroundAct"].render(); //默认周边活动显示

});
//共享
$(function () {
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

    //共享提交
    $(".commentbox .submit").click(function () {
        var curr = $(".commentbox .tabs-panel li:visible").attr("class");
        if (curr) {
            switch (curr) {
                //个人状态                                                            
                case "status":
                    addStatus();
                    break;
                //图片                                                           
                case "pic":
                    break;
                //连接                                                           
                case "link":
                    addLink();
                    break;
                //视频                                                          
                case "vedio":
                    break;

            }
        }
    });

    /*个人状态开始*/
    var oH2 = $("#spetit_word"); //提示文字 
    var oTextarea = $("#p_qa_content"); //输入框 
    var oButton = $(".submit"); //按钮 

    oTextarea.live("keyup", function () {
        Limit(oTextarea, 280, oH2);
    });

    var font_count = 0;

    function WordLength(obj) {
        var oVal = obj.val();
        var oValLength = 0;
        oVal.replace(/\n*\s*/, '') == '' ? oValLength = 0 : oValLength = oVal.match(/[^ -~]/g) == null ? oVal.length : oVal.length + oVal.match(/[^ -~]/g).length;
        return oValLength
    }
    function Error(obj) {
        var oTimer = null;
        var i = 0;
        oTimer = setInterval(function () {
            i++;
            i == 5 ? clearInterval(oTimer) : (i % 2 == 0 ? obj.css("background-color", "#ffffff") : obj.css("background-color", "#ffd4d4"));
        }, 100);
    }
    //obj-要检查的输入框, iNow-多少字, tit-提示框 
    function Limit(obj, iNow, tit) {
        var oValLength = WordLength(obj);
        font_count = Math.floor((iNow - oValLength) / 2);
        if (font_count >= 0) {
            tit.html("你还可以输入<strong>" + font_count + "</strong>字");
            return true;
        } else {
            tit.html("已超出<strong style='color:red'>" + Math.abs(font_count) + "</strong>字");
            return false;
        }
        return font_count;
    }
    //添加状态
    function addStatus() {
        var permission = "";
        if (font_count < 0 || font_count == null || font_count == 140) {
            Error(oTextarea);
        } else {
            ajaxCommon("/addnewfeeds_home.axd",
                            "{ opertype: 'addnewfeeds',coutent:'" + $("#p_qa_content").val() + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    alert(wanerdaoLangTip("share_00001"));
                                    $("#p_qa_content").val("");
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
        if (linkUrl == null || linkUrl == "") {
            alert(wanerdaoLangTip("share_00002"));
            return false;
        }
        if (!isURL(linkUrl)) {
            alert(wanerdaoLangTip("share_00002"));
            return false;
        }
        if (getStringLength(linkUrl) > 200) {
            aalert(wanerdaoLangTip("share_00003"));
            return false;
        }
        if (linkContent != "" && getStringLength(linkContent) > 200) {
            alert(wanerdaoLangTip("share_00004"));
            return false;
        }
        ajaxCommon("/addlinkfeeds_home.axd",
                            "{ opertype: 'addlinkfeeds',link:'" + linkUrl + "',description:'" + linkContent + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    alert(wanerdaoLangTip("share_00001"));
                                    $("#linkUrl").val("");
                                    $("#linkContent").val("");
                                }
                            });
    }

    /*图片共享开始*/
    var batchid = newGuid();
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
            button_width: 58,
            button_height: 25,
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
                initImgArea(info);
            } else {
                $("#message").html("照片空间已满！");
            }

        } catch (ex) {
            this.debug(ex);
        }
    }

    function initImgArea(info) {
        $("#uploadImgUrl").val(window.location.host + info[0]);
        $("#uploadImgDesc").val("http://" + info[2]);
    }

    function addImage() {
        var imgUrl = $("#uploadImgUrl").val();
        var imgContent = $("#uploadImgDesc").val();
        if (imgUrl == null || imgUrl == "") {
            alert(wanerdaoLangTip("share_00006"));
            return false;
        }
        if (!isURL(imgUrl)) {
            alert(wanerdaoLangTip("share_00007"));
            return false;
        }
        if (getStringLength(linkUrl) > 200) {
            alert(wanerdaoLangTip("share_00008"));
            return false;
        }
        if (imgContent != "" && getStringLength(imgContent) > 200) {
            alert(wanerdaoLangTip("share_00009"));
            return false;
        }
        ajaxCommon("/addpersonimage_home.axd",
                            "{ opertype: 'addpersonimage',link:'" + linkUrl + "',description:'" + linkContent + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    alert(wanerdaoLangTip("share_00001"));
                                    $("#uploadImgUrl").val("");
                                    $("#uploadImgDesc").val("")
                                }
                            });
    }
    initImageUpload();
    /*图片共享结束*/

    //视频共享
    function addVedio() {
        var vedioUrl = $("#vedioUrl").val();
        var vedioContent = $("#vedioDe").val();
        if (vedioUrl == null || vedioContent == "") {
            alert(wanerdaoLangTip("share_00010"));
            return false;
        }
        if (!isURL(vedioUrl)) {
            alert(wanerdaoLangTip("share_00011"));
            return false;
        }
        if (getStringLength(vedioUrl) > 200) {
            alert(wanerdaoLangTip("share_00012"));
            return false;
        }
        if (vedioContent != "" && getStringLength(vedioContent) > 200) {
            alert(wanerdaoLangTip("share_00013"));
            return false;
        }
        ajaxCommon("/addpersonvedio_home.axd",
                            "{ opertype: 'addpersonimage',link:'" + linkUrl + "',description:'" + linkContent + "',permission:'" + permission + "'}",
                            function (data) {
                                if (data.result) {
                                    alert('发布成功！');
                                    $("#vedioUrl").val("");
                                    $("#vedioDesc").val("");
                                }
                            });
    }
});