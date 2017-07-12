/*
*	地区插件3.0
*作者：金广亮
*时间：2012-8-6
*摘要：
*1.此地区插件依赖以下js文件
<link rel="stylesheet" type="text/css" href="/css/layout.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/table.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/icon.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/form.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/pop.css" media="all" />
<link rel="stylesheet" type="text/css" href="/css/pager.css" media="all" />
*     <script type="text/javascript" src="/scripts/plugin/cookie/wanerdao2.cookies.js"></script>
<script type="text/javascript" src="/Scripts/multipleLanguage/loader.js"></script>
<script type="text/javascript" src="/scripts/common/wanerdaoutils.js"></script>
<script type="text/javascript" src="/scripts/jquery.core.js"></script>
<script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
<script type="text/javascript" src="/scripts/jquery.center.js"></script>
<script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
<script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
<script type="text/javascript" src="/scripts/plugin/pagination/wanerdao2.pager.js"></script>
2.调用方式
$("#txtAcArea(如果是标签ID请带上#；如果是类请带上.)").click(function () {
new wanerdaoArea({ comopts: { elementid: "#txtAcArea(如果是标签ID请带上#；如果是类请带上.)", callback: function (data) {
alert(data.country.id);
}} });
如果回调正确返回数据格式为：
{"result":"true","country":{"id":国家ID,"name":国家名},"state":{"id":省州ID,"name":省州名},"city":{"id":城市ID,"name":城市名}}
否则{"result":"false"}
3.demo地址/plugindemo/area/area.htm
*/
function wanerdaoArea(options) {
    var defaults = {
        elementid: '', //关联操作弹出层的元素ID
        callback:null,
        autocomplete: true//如果为true表示自动补全，否则为false
    };
    var me = this;    
    var _pid = "";
    //初始化
    if (options != undefined && options.comopts != undefined) {
        me.opts = $.extend({}, defaults, options.comopts || {});
    }
    var optionid = me.opts.elementid.substring(1, me.opts.elementid.length);
    if ($(me.opts.elementid + 'areaplugin').length <= 0) {
        var html = _getUI(optionid);
        $dialog = $(html).appendTo($('body'));

        //$.floatbox({ move: false, position: 'b', box: me.opts.elementid + 'areaplugin' });   
        _regEvent();
        //事件注册
        $(me.opts.elementid + "areaplugin .tips-nav a").click(function () {
            $(me.opts.elementid + "areaplugin .tips-nav a").removeClass("current");
            var $this = $(this);
            $this.addClass("current");
            _loadRemoteData($this.text(), _pid, $this.attr("atype"));
        });
        _loadRemoteData($(me.opts.elementid + "areaplugin .tips-nav a[class='current']").text(), _pid, "country");
    }
    var b = me.opts.elementid + 'areaplugin';
    $(me.opts.elementid).floatbox('click', { move: false, position: 'b', box: b });
    function _regEvent() {
        $(me.opts.elementid + 'areaplugin .close-3').click(function () { $('.addresslayer').stop().fadeOut() });  
    }
    function _getUI(eid) {
        var ui = '<div id="' + eid + 'areaplugin" class="address-tips addresslayer">';
        ui += '<div class="tips-header">' + wanerdaoLangTip('common_00007') + '<a class="icon close-3 f_right" href="javascript:;" title="' + wanerdaoLangTip('common_00008') + '"></a></div>';
        ui += '<div class="tips-nav" style="display:none;">';
        ui += '     <a class="current" href="javascript:;" atype="country">A-D</a><a href="javascript:;" atype="country">E-H</a><a href="javascript:;" atype="country">I-L</a><a href="javascript:;" atype="country">M-P</a>';
        ui += '     <a href="javascript:;" atype="country">Q-T</a><a href="javascript:;" atype="country">U-X</a><a href="javascript:;" atype="country">Y-Z</a>';
        ui += ' </div>';
        ui += '<div class="tips-panel"></div>';
        ui += '<div class="clearfix"><a style="display:none;" href="javascript:;" class="button return" title="' + wanerdaoLangTip('common_00039') + '">' + wanerdaoLangTip('common_00039') + '</a><div class="pager f_right"></div></div>';
        ui += '</div>';
        ui += '<input type="hidden" id="' + eid + 'country" hiddenname="" hiddenid="">';
        ui += '<input type="hidden" id="' + eid + 'state" hiddenname="" hiddenid="">';
        ui += '<input type="hidden" id="' + eid + 'city" hiddenname="" hiddenid="">';
        return ui;
    }
    function _getCallBack() {
        var returndata = '{"result":"false"}';
        if ($(me.opts.elementid + "country").attr("hiddenname").length > 0) {
            returndata = '{"result":"true",';
            returndata += '"country":{"id":"' + $(me.opts.elementid + "country").attr("hiddenid") + '","name":"' + $(me.opts.elementid + "country").attr("hiddenname") + '"},';
            returndata += '"state":{"id":"' + $(me.opts.elementid + "state").attr("hiddenid") + '","name":"' + $(me.opts.elementid + "state").attr("hiddenname") + '"},';
            returndata += '"city":{"id":"' + $(me.opts.elementid + "city").attr("hiddenid") + '","name":"' + $(me.opts.elementid + "city").attr("hiddenname") + '"}}';
        }
        returndata = $.parseJSON(returndata);
        var callback = me.opts.callback(returndata);
        eval(callback || function () { });
    }
    function _statecontrol(parentid) {
        $(me.opts.elementid + "areaplugin .tips-nav").show();
        $(me.opts.elementid + 'areaplugin').attr("cid", parentid);
        $(me.opts.elementid + "areaplugin .tips-nav a").attr('atype', 'state');
        $(me.opts.elementid + "areaplugin .button").show().unbind("click").click(function () {
            _loadRemoteData($(me.opts.elementid + "areaplugin .tips-nav a[class='current']").text(), "", "country");
            $(this).hide();
        });
    }
    function _citycontrol() {
        $(me.opts.elementid + "areaplugin .tips-nav").show();
        $(me.opts.elementid + "areaplugin .tips-nav a").attr('atype', 'city');
        $(me.opts.elementid + "areaplugin .button").show().unbind("click").click(function () {
            _loadRemoteData($(me.opts.elementid + "areaplugin .tips-nav a[class='current']").text(), $(me.opts.elementid + 'areaplugin').attr("cid"), "state");
        });
    }
    function _loadRemoteData(atext, parentid, typeparam) {
        $(".pager").myPagination({
            contentid: me.opts.elementid + "areaplugin .tips-panel", //此处ID或者样式类名或者用来加载提示信息或者可以用来显示“加载更多”这个功能
            callback: function (data, total, more) {
                if (total >= 1) {
                    $(me.opts.elementid + "areaplugin .tips-panel").empty();
                    switch (typeparam) {
                        case "country":
                            $(me.opts.elementid + "areaplugin .tips-nav").hide();
                            $.each(data.rows, function (i, msg) {
                                $('<a href="javascript:;" id="' + msg.country_id + '" title="' + msg.country_name + '" atype="country">' + msg.country_name + '</a>').appendTo($(me.opts.elementid + "areaplugin .tips-panel")); //subPoints(msg.country_name, 8)
                            });
                            _pid = "";
                            $(me.opts.elementid + "areaplugin .tips-nav a").attr('atype', 'country');
                            break;
                        case "state":
                            $.each(data.rows, function (i, msg) {
                                $('<a href="javascript:;" id="' + msg.state_id + '" title="' + msg.state_name + '" atype="state">' + msg.state_name + '</a>').appendTo($(me.opts.elementid + "areaplugin .tips-panel")); //subPoints(msg.state_name, 4)
                            });
                            _pid = parentid;
                            _statecontrol(parentid);
                            break;
                        case "city":
                            $.each(data.rows, function (i, msg) {
                                $('<a href="javascript:;" id="' + msg.city_id + '" title="' + msg.city_name + '" atype="city">' + msg.city_name + '</a>').appendTo($(me.opts.elementid + "areaplugin .tips-panel")); //subPoints(msg.city_name, 4)
                            });
                            _pid = parentid;
                            _citycontrol();
                            break;
                    }
                    $(me.opts.elementid + "areaplugin .tips-panel a").click(function () {
                        var $this = $(this);
                        $(me.opts.elementid + $this.attr("atype")).attr("hiddenname", $this.attr("title")).attr("hiddenid", $this.attr("id"));
                        if ($this.attr("atype") === "country") {
                            _pid = $this.attr("id");
                            if (me.opts.autocomplete) {
                                if ($this.attr("title") === "美国") {
                                    $(me.opts.elementid).val("United States");
                                }
                                else if ($this.attr("title") === "China") {
                                    $(me.opts.elementid).val("中国大陆");
                                }
                                else {
                                    $(me.opts.elementid).val($this.attr("title"));
                                }
                            }
                            _loadRemoteData($(me.opts.elementid + "areaplugin .tips-nav a[class='current']").text(), $this.attr("id"), "state");
                            $(me.opts.elementid + "areaplugin .button").attr("id", $this.attr("id"));
                        }
                        if ($this.attr("atype") === "state") {
                            _pid = $this.attr("id");
                            if (me.opts.autocomplete) {
                                if (clientLanguage === "zh-cn") {
                                    $(me.opts.elementid).val($(me.opts.elementid).val() + " " + $this.attr("title"));
                                }
                                else {
                                    $(me.opts.elementid).val($(me.opts.elementid).val() + "," + $this.attr("title"));
                                }
                            }

                            _loadRemoteData($(me.opts.elementid + "areaplugin .tips-nav a[class='current']").text(), $this.attr("id"), "city");
                            $(me.opts.elementid + "areaplugin .button").attr("id", $this.attr("id"));
                        }
                        if ($this.attr("atype") === "city") {
                            if (me.opts.autocomplete) {
                                if (clientLanguage === "zh-cn") {
                                    var zh = $(me.opts.elementid).val().split(" ");
                                    if (zh.length > 3) {
                                        $(me.opts.elementid).val(zh[0] + " " + zh[1] + " " + $this.attr("title"));
                                    }
                                    else {
                                        $(me.opts.elementid).val($(me.opts.elementid).val() + " " + $this.attr("title"));
                                    }
                                }
                                else {
                                    var en = $(me.opts.elementid).val().split(",");
                                    if (en.length >3) {
                                        $(me.opts.elementid).val(en[0] + "," + en[1] + "," + $this.attr("title"));
                                    }
                                    else {
                                        $(me.opts.elementid).val($(me.opts.elementid).val() + "," + $this.attr("title"));
                                    }
                                }
                            }
                            $(me.opts.elementid + 'areaplugin').stop(true).hide();
                        }
                        _getCallBack();
                    });
                }
                else {
                    $(me.opts.elementid + "areaplugin .tips-panel").empty().append(wanerdaoLangTip('common_00005'));
                    switch (typeparam) {
                        case "state":
                            _statecontrol(parentid);
                            break;
                        case "city":
                            _citycontrol();
                            break;
                    }

                }
            },
            //pagermore: true,
            ajax: {
                url: 'area_common.axd', //此处必须填写，分页已没有固定处理工厂
                param: {
                    pagecurrent: 1,
                    pageSize: 20,
                    opertype: typeparam, //操作码
                    p: atext,
                    pid: parentid
                }
            },
            info: {
                first_on: false,
                last_on: false,
                nextcls: 'next',
                next_on: false,
                prevcls: 'prev',
                prev_on: false,
                msg_on: false, //如果为true显示第几页以及总页数，否则不显示
                tipmsg: '第{tip}页'
            }
        });        
    }    
}