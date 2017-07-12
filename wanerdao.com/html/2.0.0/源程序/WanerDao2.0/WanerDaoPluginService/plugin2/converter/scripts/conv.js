/**
* @author xiaoxubeii
*/

$(function () {
    //api主url
    var url = api.createUrl();
    var lid = getQueryString("lt");

    //转换器的api地址
    var convUrl = url + "Service/Common/UnitConverter.svc/";


    function getUnitCategories(callBack) {
        var url = convUrl + "Unit/Category/Get";
        if (lid) {
            url += "/" + lid;
        }
        $.getJSON(url, function (data) {
            callBack(JSON.parse(data));
        });
    }

    function getUnits(cateogryId, callBack) {
        var url = convUrl + "Unit/Get/" + cateogryId;
        if (lid) {
            url += "," + lid;
        }
        $.getJSON(url, function (data) {
            callBack(JSON.parse(data));
        });
    }
    function convert(categoryId, unitId, value, callBack) {
        var url = "";
        if (lid) {
            url = convUrl + "Unit/Convert/" + categoryId + "," + unitId + "," + lid + "/" + value;
        } else {
            url = convUrl + "Unit/Convert/" + categoryId + "," + unitId + "/" + value;
        }
        $.getJSON(url, function (data) {
            callBack(JSON.parse(data));
        });
    }

    function Converter() {
        this.render = render;

        function render() {
            _render();
        }

        function _render() {
            _renderConvType();
            _renderConvert();
        }

        function _init() {
            $(".unit").html("<option value='-1'>请选择</option>");
        }

        function _renderConvert() {
            $(".turn").click(function () {
                var value = $(".inputNum").val();
                var categoryId = $(".conType").val();
                var unitId = $(".unit").val();
                if (unitId == "-1") {
                    hint("请选择转换单位类别", $("#hint"));
                    return false;
                }
                if (categoryId == "-1") {
                    hint("请选择转换单位", $("#hint"));
                    return false;
                }
                if (!value) {
                    hint("请输入转换数值", $("#hint"));
                    return false;
                }
                convert(categoryId, unitId, value, function (data) {
                    $(".converter").css("left", "25%");
                    $('.converter .favRight').show();
                    var $ul = $(".converterRight ul").html("");
                    $.each(data.obj, function (i, item) {
                        var li = "<li><span class='fRight'>" + item.unit_name + "</span><input type='text' value='" + item.value + "' readonly='readonly'></li>";
                        $ul.append(li);
                    });
                });
            });
        }

        //加载转换单位类别
        function _renderConvType() {
            function _render(data) {
                var $conType = $(".conType");
                $.each(data.rows, function (i, item) {
                    $conType.append("<option value='" + item.id + "'>" + item.category_name + "</option>");
                });
                $conType.change(function () {
                    _renderUnit($(this).val());
                });
            }

            //加载单位
            function _renderUnit(categoryId) {
                function _render(data) {
                    var $unit = $(".unit");
                    $.each(data.rows, function (i, item) {
                        $unit.append("<option value='" + item.id + "'>" + item.unit_name + "</option>");
                    });
                }
                function _init() {
                    $('.converter .favRight').hide();
                    $(".converter").css("left", "50%");
                    if (categoryId == "-1") {
                        $(".unit").html("<option value='-1'>请选择</option>");
                    } else {
                        $(".unit").html("<option value='-1'>加载中</option>");
                        getUnits(categoryId, function (data) {
                            if (data.result) {
                                $(".unit option[value=-1]").text("请选择");
                                _render(data);
                            }
                        });
                    }
                }
                _init();
            }

            //初始化 
            function _init() {
                $(".conType").html("<option value='-1'>加载中</option>");
                _renderUnit($(".conType").val());
                getUnitCategories(function (data) {
                    if (data.result) {
                        $(".conType option[value=-1]").text("请选择");
                        _render(data);
                    }
                });
            }

            _init();
        }

    }

    var conv = new Converter();
    conv.render();
    document.conv.display.focus();
});


