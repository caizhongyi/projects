//全局变量
var searchKey = getQueryString("q");
$(function () {

    function addLoading(isAppend) {
        if (isAppend) {
            $(".listM_ri ul").append("<img class='loading' src='/images/loading.gif'/>");
        } else {
            $(".listM_ri ul").html("<img class='loading' src='/images/loading.gif'/>");
        }
    }

    function cancelLoading() {
        $(".listM_ri ul img.loading").remove();
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
                    if (data.result) {
                        cancelLoading();
                        callBack(data, pageRefresh, isAppend);
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
            var $page = $(".alb_nav");
            $page.find("span").unbind("click");
            $(".currentPage").text(0);
            $(".totalPage").text(0);
            $page.find(".totalPage").text(_pageTotal);
            if (_pageTotal <= 0) {
                $page.find(".currentPage").text(0);
            } else {
                $page.find(".currentPage").text(_pageCurrent);
            }

            //显示更多
            $(".viewMore").click(function () {
                if (_pageCurrent >= _pageTotal) {
                    alert("当前为最后一页");
                } else {
                    _pageCurrent++;
                    $page.find(".currentPage").text(_pageCurrent);
                    t.render(false, true);
                }
            });

            //分页
            $(".first").click(function () {
                _pageCurrent = 1;
                $page.find(".currentPage").text(_pageCurrent);
                t.render(false, false);
            });
            $(".last").click(function () {
                _pageCurrent = _pageTotal;
                $page.find(".currentPage").text(_pageCurrent);
                t.render(false, false);
            })
            $(".prev").click(function () {
                if (_pageCurrent <= 1) {
                    alert("当前为第一页");
                } else {
                    _pageCurrent--;
                    $page.find(".currentPage").text(_pageCurrent);
                    t.render(false, false);
                }
            });
            $(".next").click(function () {
                if (_pageCurrent >= _pageTotal) {
                    alert("当前为最后一页");
                } else {
                    _pageCurrent++;
                    $page.find(".currentPage").text(_pageCurrent);
                    t.render(false, false);
                }
            });
        }
    }

    function personRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $(".listM_ri ul");
        } else {
            $ul = $(".listM_ri ul").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='listM_li'><div class='listinfo clearfix'/></li>");

            var img = "<div class='listimg'><img src='" + item.logo_small_path + "' /></div>";

            var $listBox = $("<div class='listbox'/>");
            $listBox.append("<h1><a href='/personal/personal_info?id=" + item.id + "'>" + item.name + "</a></h1>"); //用户中心页面
            $listBox.append("<div class='listjs'><b>现 居 地：</b>" + item.current_address + "</div>");
            $listBox.append("<div class='listjs'><b>家&nbsp;&nbsp;&nbsp;&nbsp;乡：</b>" + item.hometown + "</div>");
            $listBox.append("<div class='listjs'><b>星&nbsp;&nbsp;&nbsp;&nbsp;座：</b>" + item.constellation + "</div>");
            $listBox.append("<div class='listjs'><b>毕业学校：</b>" + item.school_name + "</div>");
            $listBox.append("<div class='listjs m0'><b>工作单位：</b>" + item.company_name + "</div>");

            $li.find(".listinfo").append(img).append($listBox).append("<div class='listbox_ri' id='subDiv1'><a href='#' class='viewDetail'>查看详细</a></div>");

            $li.find(".viewDetail").click(function () {

            });

            $ul.append($li);

        });
    }

    function groupRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $(".listM_ri ul");
        } else {
            $ul = $(".listM_ri ul").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='listM_li'><div class='listinfo clearfix'/></li>");

            var img = "<div class='listimg'><img src='" + item.logo_path + "' /></div>";

            var $listBox = $("<div class='listbox'/>");

            $listBox.append("<h1><a href='/relationship/relationship_mygroup_info.aspx?id=" + item.id + "'>" + item.group_name + "</a><span>" + item.member_nbr + "人</span></h1>");

            $listBox.append("<div class='listfl'><b>分类：</b>" + item.category_name + " </div>");

            $listBox.append("<div class='listbody'><span class='des'>描述：</span><span class='con'>" + item.summary + "</span></div>");

            $li.find(".listinfo").append(img).append($listBox).append("<div class='listbox_ri' id='subDiv1'><a href='javascript:void(0);' class='viewDetail'>查看详细</a></div>");

            $li.find(".viewDetail").click(function () {

            });

            $ul.append($li);

        });
    }

    function activityRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $(".listM_ri ul");
        } else {
            $ul = $(".listM_ri ul").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='listM_li'><div class='listinfo clearfix'/></li>");

            var $listBox = $("<div class='listbox'/>");

            $listBox.append("<h1><a href='/activity/activity_index.aspx?id=" + item.id + "'>" + item.activity_name + "</a><span>" + item.join_member_nbr + "人</span></h1>");

            $listBox.append("<div class='listbody'><span class='des'>描述：</span><span class='con'>" + item.description + "</span></div>");

            $listBox.append("<div class='listend'><b>活动时间：</b>" + item.begin_datetime + "-" + item.end_datetime + " </div>");

            $li.find(".listinfo").append($listBox).append("<div class='listbox_ri' id='subDiv1'><a href='javascript:void(0);' class='viewDetail'>查看详细</a></div>");

            $li.find(".viewDetail").click(function () {
                //打开活动详情页面
            });

            $ul.append($li);
        });
    }
    function postsRender(data, isAppend) {
        var $ul;
        if (isAppend) {
            $ul = $(".listM_ri ul");
        } else {
            $ul = $(".listM_ri ul").html("");
        }
        $.each(data.data, function (i, item) {
            var $li = $("<li class='listM_li'><div class='listinfo clearfix'/></li>");

            var $listBox = $("<div class='listbox'/>");

            $listBox.append(" <h1><a href='javascript:void(0);'>" + item.subject + "</a>[" + item.category_name + "]<span>412人</span></h1>");

            $listBox.append("<div class='listbody'><span class='des'>简述：</span><span class='con'>" + subPoints(item.content, 20) + "</span></div>");

            $li.find(".listinfo").append($listBox).append("<div class='listbox_ri' id='subDiv1'><a href='javascript:void(0);' class='viewDetail'>查看详细</a></div>");

            $li.find(".viewDetail").click(function () {

            });

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
        var category = "person,group,activity";
        getSearchCount(category, function (data) {
            var count = data.data;
            var all = 0;
            for (var name in count) {
                all += count[name];
            }
            $(".searchbox .totalCount").text(all);
            $(".listM_le li").each(function () {
                $(this).find("span.searchCount").text(count[$(this).find("a").attr("class")]);
            });
        });
    }

    function search() {
        if (searchKey) {

            $(".alb_nav span a").unbind("click");
            $(".currentPage").text(0);
            $(".totalPage").text(0);

            var type = $(".listM_le ul [id=current] a").attr("class");
            searchType[type].render(true, false);
            searchCountRender();
        } else {
            alert("请输入搜索关键词");
        }
    }

    //左侧切换
    $(".listM_le ul li").click(function () {

        $(".listM_le ul li").removeAttr("id");
        $(this).attr("id", "current");

        searchType[$(this).find("a").attr("class")].render(true, false);
    });

    $(".search").click(function () {
        searchKey = $(".sea_inp").val();
        search();
    });

    var searchType = { person: new BaseSearch("person", personRender), group: new BaseSearch("group", groupRender), posts: new BaseSearch("posts", postsRender), activity: new BaseSearch("activity", activityRender) }; //搜索类型
    search();
});