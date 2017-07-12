//全局变量
var searchKey = getQueryStringWithES("q");
$(function () {

    //提示信息
    function hint(str) {
        var $hintCon = $("#hint");
        $hintCon.text(str);
        $hintCon.show();
        //默认延迟时间是1秒
        setTimeout(function () {
            $hintCon.hide();
        }, 1000);
    }


    function addLoading(isAppend) {
        if (isAppend) {
            $("ul.results").append("<img class='loading' src='/images/loading.gif'/>");
        } else {
            $("ul.results").html("<img class='loading' src='/images/loading.gif'/>");
        }
    }

    function cancelLoading() {
        $("ul.results img.loading").remove();
    }

    function BaseSearch(type, renderCallBack) {
        var t = this;
        t.render = render;

        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _pageSize = 5;
        var _totalCount = 0

        t.type = type;
        t.renderCallBack = renderCallBack;

        function render(pageRefresh, isAppend) {
            _getResult(_render, pageRefresh, isAppend);
        }

        function _getResult(callBack, pageRefresh, isAppend) {
            addLoading(isAppend);
            $.ajax({
                url: "/getsearchresult_home.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getsearchresult',searchStr:'" + searchKey + "',categroy:'" + t.type + "',pageNum:" + _pageCurrent + ",pageCount:" + _pageSize + "}",
                error: function () {
                    cancelLoading();
                },
                success: function (data) {
                    cancelLoading();
                    if (data.result && data.total > 0) {
                        callBack(data, pageRefresh, isAppend);
                    } else {
                        $("ul.results").text(wanerdaoLangTip("search_00002"));
                    }
                }
            });
        }

        function _render(data, dataRefresh, isAppend) {
            if (dataRefresh) {
                _renderPage(data);
            }
            t.renderCallBack(data, isAppend);
        }

        function _renderPage(data) {
            _totalCount = data.total;
            _pageTotal = _totalCount % _pageSize == 0 ? parseInt(_totalCount / _pageSize) : parseInt(_totalCount / _pageSize) + 1;
            var $page = $(".pageList");
            $page.find("a").unbind("click");
            $(".currentPage").val(0);
            $(".totalPage").text(0);
            $page.find(".totalPage").text(_pageTotal);
            $page.find(".totalCount").text(_totalCount);
            if (_pageTotal <= 0) {
                $page.find(".currentPage").val(0);
            } else {
                $page.find(".currentPage").val(_pageCurrent);
            }
            if (_pageCurrent <= 1) {
                $page.find(".first,.prev").removeClass("disable").addClass("disable");
            } else {
                $page.find(".first,.prev").removeClass("disable");
            }

            if (_pageCurrent >= _pageTotal) {
                $page.find(".last,.next").removeClass("disable").addClass("disable");
            } else {
                $page.find(".last,.next").removeClass("disable");
            }

            //            //显示更多
            //            $(".viewMore").click(function () {
            //                if (_pageCurrent >= _pageTotal) {
            //                    alert("当前为最后一页");
            //                } else {
            //                    _pageCurrent++;
            //                    $page.find(".currentPage").text(_pageCurrent);
            //                    t.render(false, true);
            //                }
            //            });

            //分页
            $(".first").click(function () {
                if (_pageCurrent > 1) {
                    _pageCurrent = 1;
                    $page.find(".first,.prev").removeClass("disable").addClass("disable");
                    $page.find(".last,.next").removeClass("disable");
                    $page.find(".currentPage").val(_pageCurrent);
                    t.render(false, false);
                }
            });
            $(".last").click(function () {
                if (_pageCurrent < _pageTotal) {
                    _pageCurrent = _pageTotal;
                    $page.find(".first,.prev").removeClass("disable");
                    $page.find(".last,.next").removeClass("disable").addClass("disable");
                    $page.find(".currentPage").val(_pageCurrent);
                    t.render(false, false);
                }
            })
            $(".prev").click(function () {
                if (_pageCurrent > 1) {
                    _pageCurrent--;
                    $page.find(".last,.next").removeClass("disable");
                    $page.find(".currentPage").val(_pageCurrent);
                    t.render(false, false);
                }
                if (_pageCurrent <= 1) {
                    $(".first,.prev").removeClass("disable").addClass("disable");
                }

            });
            $(".next").click(function () {
                if (_pageCurrent < _pageTotal) {
                    _pageCurrent++;
                    $page.find(".first,.prev").removeClass("disable");
                    $page.find(".currentPage").val(_pageCurrent);
                    t.render(false, false);
                }
                if (_pageCurrent >= _pageTotal) {
                    $(".last,.next").removeClass("disable").addClass("disable");
                }
            });

            $(".currentPage").keydown(function (e) {
                var keynum;
                if (window.event) // IE    
                {
                    keynum = e.keyCode;
                }
                else if (e.which) // Netscape/Firefox/Opera    
                {
                    keynum = e.which;
                }
                if (keynum == 13) {
                    var pageCurrent = parseInt($(this).val());
                    if (pageCurrent > 0 && pageCurrent < _pageTotal + 1) {
                        _pageCurrent = pageCurrent;
                        $(".currentPage").val(_pageCurrent);
                        t.render(false, false);
                    }
                }
            });
        }
    }

    function personRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $("ul.results");
        } else {
            $ul = $("ul.results").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='clearfix'/>");
            var img = "<img src='/default image/48-48.jpg' class='results-photo'>";
            if (item.logo_small_path) {
                img = "<img src='" + item.logo_small_path + "' class='results-photo'>";
            }
            var $dl = $("<dl/>");
            $dl.append("<dt><a href='/personal/personal_info.html?uid=" + item.user_id + "' target='_blank'>" + item.name + "</a></dt>"); //用户中心页面
            $dl.append("<dd><span class='label'>现&nbsp;居&nbsp;地：</span>" + item.current_address + "</dd>");
            $dl.append("<dd><span class='label'>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</span>" + item.hometown + "</dd>");
            $dl.append("<dd><span class='label'>星&nbsp;&nbsp;&nbsp;&nbsp;座：</span>" + item.constellation + "</dd>");
            $dl.append("<dd><span class='label'>毕业学校：</span>" + item.school_name + "</dd>");
            $dl.append("<dd><span class='label'>工作单位：</span>" + item.company_name + "</dd>");

            $li.append(img).append($dl).append("<a href='/personal/personal_info.html?uid=" + item.user_id + "' target='_blank' class='button results-detail'>查看详细</a>");

            $ul.append($li);

        });
    }

    function groupRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $("ul.results");
        } else {
            $ul = $("ul.results").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='clearfix'></li>");

            var img = "<img src='/default image/48-48.jpg' class='results-photo'>";

            if (item.logo_path) {
                img = "<img src='" + item.logo_path + "' class='results-photo'>";
            }


            var $dl = $("<dl/>");

            $dl.append("<dt><a href='/relationship/relationship_mygroup_info.html?id=" + item.id + "' target='_blank'>" + item.group_name + "</a>&nbsp;<em>" + item.member_nbr + "人</em></dt>");

            $dl.append("<dd><span class='label'>分类：</span>" + item.category_name + " </dd>");

            $dl.append("<dd><span class='label'>描述：</span><p class='desc'>" + subPoints(item.summary, 20) + "</p></dd>");

            $li.append(img).append($dl).append("<a href='/relationship/relationship_mygroup_info.html?id=" + item.id + "' target='_blank' class='button results-detail'>查看详细</a>");

            $ul.append($li);

        });
    }

    function activityRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $("ul.results");
        } else {
            $ul = $("ul.results").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='clearfix'></li>");

            var $dl = $("<dl/>");

            $dl.append("<dt><a href='/activity/activity_index.html?id=" + item.id + "' target='_blank'>" + item.activity_name + "</a>&nbsp;<em>" + item.join_member_nbr + "人</em></dt>");

            $dl.append("<dd><span class='label'>描述：</span><p class='des'>" + subPoints(item.description, 20) + "</p></dd>");

            $dl.append("<dd><span class='label'>活动时间：</span>" + item.begin_datetime + "-" + item.end_datetime + " </dd>");

            $li.append($dl).append("<a href='/activity/activity_index.html?id=" + item.id + "' target='_blank' class='button results-detail'>查看详细</a>");

            $ul.append($li);
        });
    }
    function postsRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $("ul.results");
        } else {
            $ul = $("ul.results").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='clearfix'></li>");

            var $dl = $("<dl/>");

            $dl.append("<dt><a href='javascript:;'>" + item.subject + "</a></dt>");

            $dl.append("<dd><span class='label'>描述：</span><p class='des'>" + subPoints(item.content, 20) + "</p></dd>");

            $li.append($dl).append("<a href='javascript:;' target='_blank' class='button results-detail'>查看详细</a>");

            $ul.append($li);
        });

    }

    function getSearchCount(category, callBack) {
        $.ajax({
            url: "/getsearchcount_home.axd",
            type: "POST",
            dataType: "json",
            cache: false,
            data: "{opertype:'getsearchcount',term:'" + searchKey + "',category:'" + category + "'}",
            error: function () {
                cancelLoading();
            },
            success: function (data) {
                if (data.result) {
                    callBack(data);
                }
            }
        });
    }

    function searchCountRender() {
        //var category = "person,group,activity";
        var category = "";
        $(".sidenav li").each(function () {
            category += $(this).attr("id") + ",";
        });
        if (category) {
            category = category.substr(0, category.length - 1);
        }
        getSearchCount(category, function (data) {
            var count = data.data;
            var all = 0;
            for (var name in count) {
                all += count[name];
            }
            $(".search-textbox .allCount").text(all);
            $("ul.sidenav li").each(function () {
                $(this).find("span.searchCount").text(count[$(this).attr("id")]);
            });
        });
    }

    function search() {
        if (searchKey) {

            $(".pageList a").unbind("click");
            $(".currentPage").val(0);
            $(".totalCount").text(0);
            $(".totalPage").text(0);
            $("#searchKey").val(searchKey);
            var type = $("ul.sidenav li[class=cur]").attr("id");
            searchType[type].render(true, false);
            searchCountRender();
        } else {
            hint(wanerdaoLangTip("search_00001"));
        }
    }


    //左侧切换
    $("ul.sidenav li").click(function () {

        $("ul.sidenav li").removeClass("cur");
        $(this).addClass("cur");

        searchType[$(this).attr("id")].render(true, false);
    });

    $("#search").click(function () {
        searchKey = $("#searchKey").val();
        search();
        //window.location.href = "/search.html?q=" + escape(searchKey);
    });

    var searchType = { person: new BaseSearch("person", personRender), group: new BaseSearch("group", groupRender), posts: new BaseSearch("posts", postsRender), activity: new BaseSearch("activity", activityRender) }; //搜索类型
    search();
});