$(function () {
    //工具栏初始为down状态
    $(".doSlideDown").trigger("click");
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
            $.each(data.rows, function (i, item) {
                renderRow(item);
            });
        }

        function renderRow(item) {
            var $ul = $(".footBar .cbLeft ul");
            if ($ul.find("li[id='" + item.id + "']").length <= 0) {
                var $li = $("<li id='" + item.id + "'><a href='javascript:void(0);'><img src='" + item.logo_location + "' width='13' height='13' />" + item.tool_name + "</a><span class='cbDelete'></span></li>");
                //卸载应用工具
                $li.find(".cbDelete").click(function () {
                    $li.remove();
                    $("#funcBoxTd .funcBox a[id='" + item.id + "']").remove();
                    if ($("#funcBoxTd .funcBox a").length <= 0) {
                        $("#funcBoxTd").remove();
                    }
                    closeWin("div.pop");
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
                                //setups.render();
                                //                                $("#funcBoxTd .funcBox a[id='" + item.id + "']").remove();
                                //                                if ($("#funcBoxTd .funcBox a").length <= 0) {
                                //                                    $("#funcBoxTd").remove();
                                //                                }
                                //                                closeWin("div.pop");
                            }
                            //alert(data.msg);
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
                $ul.append($li);
            }
        }

        function addToolBar(tool) {
            if ($("#funcBoxTd").length <= 0) {
                $("<td id='funcBoxTd'><div class='funcBox'></div></td>").insertAfter("#configTd");
            }
            //需要统一弹出窗口
            var $cell = $("<a href='javascript:void(0);' id='" + tool.id + "'><img src='" + tool.logo_location + "' width='30' height='30' /></a>");
            $cell.click(function () {
                if ($("div.pop").is(":hidden")) {
                    $("#popFrame").attr("src", tool.url + "?uid=" + getCurrentUserId() + "&lt=" + getCurrentLangType());
                }
                openWin("r1", tool.tool_name, "div.pop");
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
            //            $.ajax({
            //                url: "/getalltools_tool.axd",
            //                type: "POST",
            //                dataType: "json",
            //                cache: false,
            //                data: "{opertype:'gettools',pageSize:" + _pageSize + ",pageCurrent:" + _pageCurrent + "}",
            //                error: function () {
            //                },
            //                success: function (data) {
            //                    if (data.result == "True") {
            //                        callBack(data);
            //                    }
            //                }
            //            });
            $.ajax({
                url: "/getalltoolcategory_tool.axd",
                type: "POST",
                dataType: "json",
                cache: false,
                data: "{opertype:'gettoolscategory',pagesize:" + _pageSize + ",pagecurrent:" + _pageCurrent + "}",
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
            var $ul = $(".footBar .cbcBoxRight .cbRightL ul").html("");
            $.each(data.rows, function (i, item) {
                var $li = $("<li/>");
                $li.append("<a href='javascript:void(0);'>" + item.category_name + "</>");
                $li.find("a").hover(function () {
                    $(".footBar .cbcBoxRight .cbRightR ul").html("");
                    $.ajax({
                        url: "/gettoolsbycate_tool.axd",
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        data: "{opertype:'gettoolsbycate',pagecurrent:" + _pageCurrent + ",pagesize:" + _pageSize + ",cateid:'" + item.category_id + "'}",
                        error: function () {
                        },
                        success: function (data) {
                            var $rightUl = $(".footBar .cbcBoxRight .cbRightR ul").html("");
                            if (data.result) {
                                $.each(data.rows, function (i, item) {
                                    var $lir = $("<li id='" + item.id + "'><a href='javascript:void(0);'>" + item.tool_name + "</a><span class='cbAdd'></span></li>");
                                    //安装个人工具
                                    $lir.find(".cbAdd").click(function () {
                                        $lir.remove();
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
                                                    //$(".footBar .cbLeft ul").append(setups.renderRow(item));
                                                    $.extend(item, { is_onbar: "True" });
                                                    setups.renderRow(item);
                                                }
                                                //alert(data.msg);
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
                            }
                        }
                    });
                }, function () { });
                $ul.append($li);
            });
        }

    }

    var setups = new SetupTools(getCurrentUserId());
    setups.render();

    var tools = new AllTools();
    tools.render();

});