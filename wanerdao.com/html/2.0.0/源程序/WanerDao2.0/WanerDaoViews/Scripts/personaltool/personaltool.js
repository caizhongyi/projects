$(function () {

    //已安装应用
    function SetupTools(userId) {

        //私有变量
        var _pageSize = 10;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;

        //公共函数
        this.render = render;
        this.renderRow = renderRow;
        this.addToolBar = addToolBar;

        function _getResult(callBack) {
            $.ajax({
                url: "/getpersonaltoolsbyuserid_tool.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'getpersonaltoolsbyuserid',userId:'" + userId + "',pageSize:" + _pageSize + ",pageCurrent:" + _pageCurrent + "}",
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        callBack(data);
                    }
                }
            });
        }
        function render() {
            _init();
            _getResult(_render);
        }
        function _init() {
            $(".footBar .cbLeft ul").html("");
            $(".footBar .funcBox").html("");
        }
        function _render(data) {
            var $ul = $(".footBar .cbLeft ul");
            $.each(data.rows, function (i, item) {
                $ul.append(renderRow(item));
            });
        }

        function renderRow(item) {
            var $li = $("<li><a href='javascript:void(0);'><img src='" + item.logo_location + "' width='13' height='13' />" + item.tool_name + "</a><span class='cbDelete'></span></li>");
            //卸载应用工具
            $li.find(".cbDelete").click(function () {
                $.ajax({
                    url: "/unloadpersonaltool_tool.axd",
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    data: "{opertype:'unloadpersonaltool',id:'" + item.id + "'}",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.result) {
                            $li.remove();
                            setups.render();
                            closeWin(".popDate");
                        }
                        alert(data.msg);
                    }
                });
            });
            $li.hover(function () {
                $(this).addClass("selected");
            }, function () {
                $(this).removeClass("selected");
            });

            //判断是否将工具放出到工具栏
            if (item.is_onbar == "True") {
                addToolBar(item);
            }

            return $li;
        }

        function addToolBar(tool) {
            //需要统一弹出窗口
            var $cell = $("<a href='javascript:void(0);'><img src='" + tool.logo_location + "' width='30' height='30' /></a>");
            $cell.click(function () {
                $("iframe.pop").attr("src", tool.url + "?uid=" + getCurrentUserId());
                openWin("r1", tool.tool_name, "iframe.pop");
            });
            $(".footBar .funcBox").append($cell);
        }

    }

    //所有应用
    function AllTools() {
        var _pageSize = 10;
        var _pageCurrent = 1;
        var _pageTotal = 0;
        var _totalCount = 0;
        this.render = render;
        function render() {
            _getResult(_render);
        }
        function _getResult(callBack) {
            $.ajax({
                url: "/getalltools_tool.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'gettools',pageSize:" + _pageSize + ",pageCurrent:" + _pageCurrent + "}",
                error: function () {
                },
                success: function (data) {
                    if (data.result == "True") {
                        callBack(data);
                    }
                }
            });
        }
        function _render(data) {
            var $ul = $(".footBar .cbcBoxRight .cbRightL ul");
            $.each(data.rows, function (i, item) {
                var $li = $("<li/>");
                $li.append("<a href='javascript:void(0);'>" + item.tool_name + "</>");
                $li.find("a").click(function () {
                    $(this).unbind("click");
                    var $rightUl = $(".footBar .cbcBoxRight .cbRightR");
                    var $lir = $("<li><a href='javascript:void(0);'>" + item.tool_name + "</a><span class='cbAdd'></span></li>");

                    //安装个人工具
                    $lir.find(".cbAdd").click(function () {
                        $.ajax({
                            url: "/setuppersonaltool_tool.axd",
                            type: "POST",
                            dataType: "json",
                            cache: false,
                            data: "{opertype:'setuppersonaltool',userId:'" + getCurrentUserId() + "',toolId:'" + item.id + "'}",
                            error: function () {
                            },
                            success: function (data) {
                                if (data.result) {
                                    $lir.remove();
                                    $(".footBar .cbLeft ul").append(setups.renderRow(item));
                                    setups.render();
                                }
                                alert(data.msg);
                            }
                        });
                    });
                    $lir.hover(function () {
                        $(this).addClass("selected");
                    }, function () {
                        $(this).removeClass("selected");
                    });
                    $rightUl.append($lir);
                });
                $ul.append($li);
            });
        }

    }

    var setups = new SetupTools(getCurrentUserId());
    setups.render();

    var tools = new AllTools();
    tools.render();

});