//周期订制
(function ($) {
    $.fn.baseparam = function () {
        return this.each(function () {
            $this = $(this);
            //构建页面
            $this.append(_getbaseparamUI());
            _loadEvent();
        });
    };
    function _getbaseparamUI() {
        var ui = '<h4 id="activitybase1"><label for="customCycleSwitch"><input type="checkbox" class="checkbox" id="customCycleSwitch" /><b>定制周期</b></label></h4>';
        ui += '<h4 id="activitybase2"><label for="addressSetSwitch"><input type="checkbox" class="checkbox" id="addressSetSwitch" /><b>设定地址</b></label></h4>';
        ui += '<h4 id="activitybase3"><label for="activityparamSwitch"><input type="checkbox" class="checkbox" id="activityparamSwitch" /><b>设定活动参数</b></label></h4>';
        ui += '<h4 id="activitybase4"><label for="activityplanSwitch"><input type="checkbox" class="checkbox" id="activityplanSwitch" /><b>拟定计划</b></label></h4>';
        return ui;
    };
    function _loadEvent() {
        $("#customCycleSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#divactivitybase1")[0]) {
                    $("#divactivitybase1").slideDown();
                }
                else {
                    $("#activitybase1").after(_aUI());
                    $("#divactivitybase1").slideDown();
                    _aEvent();
                }
            }
            else {
                $("#divactivitybase1").slideUp();
            }
        });
        $("#addressSetSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#divactivitybase2")[0]) {
                    $("#divactivitybase2").slideDown();
                }
                else {
                    $("#activitybase2").after(_bUI());
                    $("#divactivitybase2").slideDown();
                    _bEvent();
                }
            }
            else {
                $("#divactivitybase2").slideUp();
            }
        });
        $("#activityparamSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#divactivitybase3")[0]) {
                    $("#divactivitybase3").slideDown();
                }
                else {
                    $("#activitybase3").after(_cUI());
                    $("#divactivitybase3").slideDown();
                    _cEvent();
                }
            }
            else {
                $("#divactivitybase3").slideUp();
            }
        });
        $("#activityplanSwitch").click(function () {
            if ($(this).attr("checked")) {
                if ($("#divactivitybase4")[0]) {
                    $("#divactivitybase4").slideDown();
                }
                else {
                    $("#activitybase4").after(_dUI());
                    $("#divactivitybase4").slideDown();
                    _dEvent();
                }
                if ($("#txtactivitystartday")[0] && $("#txtactivitystartday").val() !== '' && $('#txtactivityendday').val() !== '') {
                    var testStartDate = new Date($("#txtactivitystartday").val());
                    var testEndDate = new Date($('#txtactivityendday').val());
                    var sDate = Math.floor((testEndDate - testStartDate) / (24 * 3600 * 1000)) + 1;
                    _bindddlactivitydaylist(testStartDate, testEndDate, $("#txtactivitytotalday").val());
                }
                else {
                    $(this).attr("checked", false);
                    $("#divactivitybase4").slideUp();
                    new pop({ typename: 'error', msginfo: wanerdaoLangTip('active_00063') });
                }
            }
            else {
                $("#divactivitybase4").slideUp();
            }
        });
    }
    function _aEvent() {
        //活动周期定制
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityduration'}", function (data) { }, function (data) {
            if (data.result) {
                bindDropDownListNoDefault("ddlactivityduration", data.data, true);
            }
            else
                bindDropDownListNoDefault("ddlactivityduration", null, false);
        });
        $("#ddlactivityduration").change(function () {
            if ($(this).children('option:selected').val() === "1") {//一次性
                //获取以前参加活动的信息
                //获取用户信息
                $("#dlbookduration").hide();
                $("#dldy0,#dldy1,#dldy2").hide();
            }
            else if ($(this).children('option:selected').val() === "2") {//订制固定周期
                $("#txtBookTime").defaultvalue("点击预定周期");
                var now = new Date();
                $('#txtBookTime').datetimepicker({
                    showHour: false,
                    showMinute: false,
                    showTime: false,
                    showTimepicker: false,
                    minDate: now,
                    onClose: function (dateText, inst) {
                        $.cookies.set("txtBookTime", $("#txtBookTime").val());
                    },
                    onSelect: function (selectedDateTime) {
                        $.cookies.set("txtBookTime", $("#txtBookTime").val());
                    }
                });
                $("#dlbookduration").show();
                $("#dldy0,#dldy1,#dldy2").hide();
            }
            else { //订制浮动周期
                $("#dlbookduration").hide();
                $("#dldy0,#dldy1,#dldy2").show();
            }
            $.cookies.set("ddlactivityduration", $("#ddlactivityduration").children('option:selected').val());
        });
        //间隔周期
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityintervalduration'}", function (data) { }, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivityperiod", data.data, true);
            }
            else
                bindDropDownList("ddlactivityperiod", null, false);
        });
        //活动周期创建形式
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluecreatemode'}", function (data) { }, function (data) {
            if (data.result) {
                bindDropDownList("ddlbuild", data.data, true);
            }
            else
                bindDropDownList("ddlbuild", null, false);
        });
        $("#ckactivityemail").change(function () {
            if ($(this).attr("checked")) {
                if ($("#ddlactivityemail")[0]) {
                    $("#ddlactivityemail_chzn").fadeIn();
                }
                else {
                    $("#ddactivityemail").append('<select id="ddlactivityemail" />');
                    loademaildata();
                }
            }
            else {
                $("#ddlactivityemail_chzn").fadeOut();
            }
            $.cookies.set("ckactivityemail", $("#ckactivityemail").attr("checked") !== false ? "on" : "off");
        });
        $("#ckactivityinbox").change(function () {
            if ($(this).attr("checked")) {
                if ($("#ddlactivityinbox")[0]) {
                    $("#ddlactivityinbox_chzn").fadeIn();
                }
                else {
                    $("#ddactivityinbox").append('<select id="ddlactivityinbox" />');
                    loadinboxdata();
                }
            }
            else {
                $("#ddlactivityinbox_chzn").fadeOut();
            }
            $.cookies.set("ckactivityinbox", $("#ckactivityinbox").attr("checked") !== false ? "on" : "off");
        });
    }
    function _bEvent() {
        //listWarp Hide&Show
        $("#switchBtn").click(function () {
            if ($(this).hasClass("hideBox_Btn")) {
                if (type == 'list') {
                    $("#listSch_Btn").removeClass("fCgray3").addClass("currentSch");
                    $(".listschWarp").fadeIn();
                } else {
                    $("#mapSch_Btn").removeClass("fCgray3").addClass("currentSch");
                    $(".mapschWarp").fadeIn();
                }
                $(this).removeClass("hideBox_Btn").addClass("showBox_Btn").siblings($("#addreesSchWarp").slideDown());
            }
            else {
                $(this).removeClass("showBox_Btn").addClass("hideBox_Btn").siblings($("#addreesSchWarp").slideUp());
                if (type == 'list') {
                    $("#listSch_Btn").removeClass("fCgray3").addClass("currentSch");
                } else {
                    $("#mapSch_Btn").removeClass("fCgray3").addClass("currentSch");
                }
            }
        })
        var type = "list";
        //listschWarp Hide&Show
        $("#listSch_Btn").click(function () {
            type = "list";
            $(this).removeClass("fCgray3").addClass("currentSch");
            $("#mapSch_Btn").removeClass("currentSch").addClass("fCgray3");
            $("#addreesSchWarp").css("display", "block");
            $("#switchBtn").removeClass("hideBox_Btn").addClass("showBox_Btn");
            $(".mapschWarp").hide();
            if ($(".listschWarp").css("display", "none")) {
                $(this).siblings($("#addreesSchWarp").find(".listschWarp").fadeIn()).addClass("currentSch");
            }
        })
        //mapschWarp Hide&Show
        $("#mapSch_Btn").click(function () {
            type = "map";
            $(this).removeClass("fCgray3").addClass("currentSch");
            $("#listSch_Btn").removeClass("currentSch").addClass("fCgray3");
            $("#addreesSchWarp").css("display", "block");
            $("#switchBtn").removeClass("hideBox_Btn").addClass("showBox_Btn");
            $(".listschWarp").hide();
            if ($(".mapschWarp").css("display", "none")) {
                $(this).siblings($("#addreesSchWarp").find(".mapschWarp").fadeIn()).addClass("currentSch");
            }            
            var mBuilder = new MapBuilder();
            mBuilder.init({}, []);
            $("#map").show();
        })
        //列表查找中的滚动切换效果
        new $.ui.tabs('.listSchBar', {
            effect: 'x',
            widget: {
                clip: '.catList-panel',
                next: '.nextBtn',
                prev: '.prevBtn',
                panel: '.AC_catList'
            }
        });
        //加载我的位置
        ajaxfunc("create_activity.axd", "{opertype:'getuseraddressinfo'}", function (data) { }, function (data) {
            if (data.result) {
                $("#spanactivitypersonaddress").val(data.data.address);
                $("#spanactivitypersonpostid").val(data.data.zip);
                $("#txtactivitypersonarea").val(data.data.city_name + " " + data.data.state_name + " " + data.data.country_name);
                $("#hidepersoncountryid").val(data.data.country_id);
                $("#hidepersonstateid").val(data.data.state_id);
                $("#hidepersoncityid").val(data.data.city_id);
            }
        });
        $("#txtactivitypersonarea").click(function (event) {
            event.stopPropagation();
            new wanerdaoArea({ comopts: { elementid: "#txtactivitypersonarea", callback: function (data) {
                if (data.result) {
                    $("#hidepersoncountryid").val(data.country.id);
                    $.cookies.set("hidepersoncountryid", data.country.id);
                    $("#hidepersonstateid").val(data.state.id);
                    $.cookies.set("hidepersonstateid", data.state.id);
                    $("#hidepersoncityid").val(data.city.id);
                    $.cookies.set("hidepersoncityid", data.city.id);
                }
            }
            }
            });
        });
        _loadlistdata("getjsonactivityplacecategorychild", '');
        //绑定地区
        $("#txtarea").click(function (event) {
            event.stopPropagation();
            new wanerdaoArea({ comopts: { elementid: "#txtarea", callback: function (data) {
                if (data.result) {
                    $("#hidecountryid").attr("value", data.country.id);
                    $.cookies.set("hidecountryid", data.country.id);
                    $("#hidestateid").attr("value", data.state.id);
                    $.cookies.set("hidestateid", data.state.id);
                    $("#hidecityid").attr("value", data.city.id);
                    $.cookies.set("hidecityid", data.city.id);
                }
            }
            }
            });
        });
        loadcache();
    }
    function _loadlistdata(otypename, id) {
        var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        if (id !== '') {
            $(".backBtn").show().unbind("click").click(function () {
                _loadlistdata("getjsonactivityplacecategorychild", '');
            });
        }
        else {
            $(".backBtn").hide();
        }
        ajaxfunc("create_activity.axd", otype, function (data) { }, function (data) {
            if (data.result && data.data.length > 0) {
                $("#ulactivitycategory").empty();
                $.each(data.data, function (i, n) {
                    var aa = '<li id="{0}" istop="{1}" isbottom="{2}" parent_id="{3}"><a href="javascript:;" class="cat_btn">{4}</a></li>';
                    aa = aa.replace("{0}", data.data[i].id);
                    aa = aa.replace("{1}", data.data[i].istop);
                    aa = aa.replace("{2}", data.data[i].isbottom);
                    aa = aa.replace("{3}", data.data[i].parent_id);
                    aa = aa.replace("{4}", data.data[i].category_name);
                    $("#ulactivitycategory").append(aa);
                });
                $('#ulactivitycategory li').click(function () {
                    $('#ulactivitycategory li a').removeClass("cat_btn cat_btn-selected").addClass("cat_btn");
                    $(this).find("a").removeClass("cat_btn").addClass("cat_btn cat_btn-selected");
                    if ($(this).attr("isbottom") == "true") {
                        $(".pageList").myPagination({
                            showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                            contentid: '#sightlist',
                            callback: _bindlistpage,
                            ajax: {
                                url: 'acplace_common.axd',
                                param: {
                                    pagecurrent: 1,
                                    pageSize: 5,
                                    opertype: 'getactivityplacesearch',
                                    placecategoryid: $(this).attr("id")
                                }
                            }
                        });
                    }
                    else {
                        _loadlistdata('getjsonactivityplacecategorychild', $(this).attr("id"));
                    }
                });
            }
            else {
                $('#ulactivitycategory').empty().append(wanerdaoLangTip('common_00005'));
            }
        });
    }
    function _bindlistpage(data, total, more) {
        $('#sightlist').empty();
        if (data.result && data.total > 0) {
            $.each(data.rows, function (i, msg) {
                var ui = '<li class="fCgray3">';
                ui += '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-fixed">';
                ui += '  <tbody>';
                ui += '     <tr>';
                ui += '         <td width="64" align="right" class="fCblue square_small">地点名:</td>'; //地址名称
                ui += '         <td width="600">{0}</td>';
                ui += '     </tr>';
                ui += '     <tr>';
                ui += '          <td align="right" class="fCblue">地址：</td>'; //地址名称
                ui += '         <td cid="{1}" cname="{2}" sid="{3}" sname="{4}" cityid="{5}" cityname="{6}" zip="{7}" >{8}</td>';
                ui += '     </tr>';
                ui += '     <tr  style="">';
                ui += '          <td valign="top" align="right" class="fCblue">描述：</td>'; //地址名称
                ui += '         <td><p class="descript">{9}</p></td>'; //地址
                //ui += '         <td>{9}</td>'; //地址
                ui += '     </tr>';
                ui += '  </tbody>';
                ui += '</table>';
                ui += '<a id="{10}" href="javascript:;" class="button blue-button">选择</a> ';
                ui += '</li>';
                ui = ui.replace("{0}", data.rows[i].place_name).replace("{1}", data.rows[i].country_id);
                ui = ui.replace("{2}", data.rows[i].country_name).replace("{3}", data.rows[i].state_id);
                ui = ui.replace("{4}", data.rows[i].state_name).replace("{5}", data.rows[i].city_id);
                ui = ui.replace("{6}", data.rows[i].city_name).replace("{7}", data.rows[i].zip); //.replace("{7}", data.rows[i].address);
                ui = ui.replace("{8}", data.rows[i].address + " " + data.rows[i].city_name + " " + data.rows[i].state_name + " " + data.rows[i].country_name);
                ui = ui.replace("{9}", data.rows[i].description);
                ui = ui.replace("{10}", data.rows[i].id);
                //ui = ui.replace("{11}", data.rows[i].address);
                $('#sightlist').append(ui);
            });
            $('#sightlist li a').unbind("click").click(function () {
                $("#hideaddressid").val($(this).attr("id"));
                $.cookies.set("hideaddressid", $(this).attr("id"));

                var p = $(this).parent().find("tr:eq(1)").find("td:eq(1)");
                $("#txtactivityaddress").val(p.text()); //地址
                $.cookies.set("txtactivityaddress", p.text());
                var postid = p.attr("zip");
                $("#txtactivitypostid").val(postid); //邮编
                $.cookies.set("txtactivitypostid", postid);

                $("#hidecountryid").attr("value", p.attr("cid"));
                $.cookies.set("hidecountryid", p.attr("cid"));

                $("#hidestateid").attr("value", p.attr("sid"));
                $.cookies.set("hidestateid", p.attr("sid"));

                $("#hidecityid").attr("value", p.attr("cityid"));
                $.cookies.set("hidecityid", p.attr("cityid"));
                $("#txtarea").val(p.attr("cityname") + " " + p.attr("sname") + " " + p.attr("cname"));
            });
        }
    }
    function _cEvent() {
        $("#txtactivitytitle,#txtactivitymark").defaultvalue(wanerdaoLangTip('active_00056'), wanerdaoLangTip('active_00057'));
        //加载用户信息
        $("#txtactivitytitle").change(function () {
            if ($(this).val().length > 60) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('active_00081')
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        //活动简介长度不能大于200个字符
        $("#txtactivitymark").change(function () {
            if ($(this).val().length > 200) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('active_00082')
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        var now = new Date();
        //活动参数设定-活动时间
        $('#txtactivitystartday').datetimepicker({
            showHour: false,
            showMinute: false,
            showTime: false,
            showTimepicker: false,
            minDate: now,
            onClose: function (dateText, inst) {
                var endDateTextBox = $('#txtactivityendday');
                if (endDateTextBox.val() != '') {
                    var testStartDate = new Date(dateText);
                    var testEndDate = new Date(endDateTextBox.val());
                    if (testStartDate > testEndDate)
                        endDateTextBox.val(dateText);
                }
                else {
                    endDateTextBox.val(dateText);
                }
                $.cookies.set("txtactivitystartday", $("#txtactivitystartday").val());
            },
            onSelect: function (selectedDateTime) {
                var start = $(this).datetimepicker('getDate');
                $('#txtactivityendday').datetimepicker('option', 'minDate', new Date(start.getTime()));
                var testEndDateBox = $('#txtactivityendday');
                if (testEndDateBox.val() != '') {
                    var testStartDate = new Date(selectedDateTime);
                    var testEndDate = new Date(testEndDateBox.val());
                    var sDate = Math.floor((testEndDate - testStartDate) / (24 * 3600 * 1000)) + 1;
                    $("#txtactivitytotalday").val(sDate);
                    $.cookies.set("txtactivitytotalday", sDate);
                }
            }
        });
        $('#txtactivityendday').datetimepicker({
            showHour: false,
            showMinute: false,
            showTime: false,
            showTimepicker: false,
            onClose: function (dateText, inst) {
                var startDateTextBox = $('#txtactivitystartday');
                if (startDateTextBox.val() != '') {
                    var testStartDate = new Date(startDateTextBox.val());
                    var testEndDate = new Date(dateText);
                    if (testStartDate > testEndDate)
                        startDateTextBox.val(dateText);
                }
                else {
                    startDateTextBox.val(dateText);
                }
                $.cookies.set("txtactivityendday", $("#txtactivityendday").val());
            },
            onSelect: function (selectedDateTime) {
                var end = $(this).datetimepicker('getDate');
                $('#txtactivitystartday').datetimepicker('option', 'maxDate', new Date(end.getTime()));
                var startDateTextBox = $('#txtactivitystartday');
                var testStartDate = new Date(startDateTextBox.val());
                var testEndDate = new Date(selectedDateTime);
                var sDate = Math.floor((testEndDate - testStartDate) / (24 * 3600 * 1000)) + 1;
                $("#txtactivitytotalday").val(sDate);
                $.cookies.set("txtactivitytotalday", sDate);
            }
        });
        $("#btnactivityac").click(function () {
            new wanerdaoac({ alphopts: { elementid: 'btnactivityac', callback: function (data) {
                if (data.result) {
                    $('#divaclist li').remove();
                    $.each(data.acs, function (i, n) {
                        var temp = '<li id="{0}">{1}<a class="icon close-2" href="javascript:;"></a></li>';
                        temp = temp.replace("{0}", data.acs[i].id);
                        temp = temp.replace("{1}", data.acs[i].name);
                        if (!($('#divaclist li[id="' + data.acs[i].id + '"]') != null
                            && $('#divaclist li[id="' + data.acs[i].id + '"]').length >= 1)) {
                            $('#divaclist').append(temp);
                        }
                    });
                    $('#divaclist li a').click(function () {
                        $(this).parent().remove();
                        var ac = $.data(document.body, 'btnactivityacac')
                        ac.find('#btnactivityacbar a[id="' + $(this).parent().attr("id") + '"]').remove();
                        saveactivitycategorylist();
                    });
                    saveactivitycategorylist();
                }
            }
            }
            });
        });
    }
    function _dEvent() {
        $("#txtactivityplantitle,#txtactivityplanmark").defaultvalue("计划拟定单条标题", "请输入此项计划详细描述可以让大家更好的了解您的活动行程安排");
        $("#txtactivityplantitle").change(function () {
            if ($(this).val().length > 100) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('active_00083')
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        //活动简介长度不能大于200个字符
        $("#txtactivityplanmark").change(function () {
            if ($(this).val().length > 200) {
                new pop({ typename: 'error',
                    msginfo: wanerdaoLangTip('active_00084')
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        //计划拟定-时间
        $('#txtactivityplanstarttimer').timepicker({
            onSelect: function (selectedDateTime) {
                if ($('#txtactivityplanendtimer').val() != '') {
                    if (_validplantimer(selectedDateTime, $("#txtactivityplanendtimer").val())) {
                        $('#txtactivityplanstarttimer').focus().val("");
                    }
                }
            }
        });

        $('#txtactivityplanendtimer').timepicker({
            onSelect: function (selectedDateTime) {
                if (_validplantimer($("#txtactivityplanstarttimer").val(), selectedDateTime)) {
                    $('#txtactivityplanendtimer').focus().val("");
                }
            }
        });
        //计划拟定-新增 btnactivityplan
        $("#btnactivityplan").click(function () {
            if ($(this).val() == "添加") {
                var _title = $("#txtactivityplantitle").val();
                var _timeduration = $("#ddlactivityplandaylist").children('option:selected').val() + '(' + $("#txtactivityplanstarttimer").val() + '-' + $("#txtactivityplanendtimer").val() + ')';
                if (_title.length > 100) {
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('active_00083')
                    });
                    return false;
                }
                if ($("#txtactivityplanmark").val().length > 200) {
                    new pop({ typename: 'error',
                        msginfo: wanerdaoLangTip('active_00084')
                    });
                    return false;
                }
                if (_title != '') {
                    var obj = $("#tableplanlist tr");
                    var _f = true;
                    $.each(obj, function (i, n) {
                        var o = $(obj[i]);
                        if (o.find("td:eq(0)").text() === _title) {
                            _f = false;
                            return false;
                        }
                        if (o.find("td:eq(2)").text() === _timeduration) {
                            _f = false;
                            return false;
                        }
                    });
                    if (!_f) {
                        new pop({ typename: 'warning',
                            msginfo: wanerdaoLangTip('active_00085')
                        });
                    }
                    else {
                        var trtemp = '<tr id="tr' + $("#txtactivityplantitle").val() + '">';
                        trtemp += '<td>' + $("#txtactivityplantitle").val() + '</td>';
                        trtemp += '<td>' + $("#txtactivityplanmark").val() + '</td>';
                        if ($("#ddlactivityplandaylist").children('option:selected').val() != "-1"
                        && $("#ddlactivityplandaylist").children('option:selected').val() != "-2"
                        && $('#txtactivityplanstarttimer').val() != ''
                        && $('#txtactivityplanendtimer').val() != ''
                        && $("#txtactivityplantitle").val() != ''
                        && $("#txtactivityplanmark").val() != '') {
                            var d = $("#ddlactivityplandaylist").children('option:selected').val();
                            trtemp += '<td>' + d + '(' + $("#txtactivityplanstarttimer").val() + '-' + $("#txtactivityplanendtimer").val() + ')</td>';
                            trtemp += '<td  class="table-opt"><a href="javascript:;" class="listEdit" title="编辑"></a> ';
                            trtemp += '<a href="javascript:;" class="listDel" title="删除"></a></td></tr>';
                            $("#tableplanlist").append(trtemp);
                            $("#ultimer p").each(function () {
                                if ($(this).text() === d) {
                                    var i = $(this).attr("id");
                                    i = i.replace("timer", "timercontent");
                                    $("#" + i).append("<p id='p" + $("#txtactivityplantitle").val() + "'>" + $("#txtactivityplanstarttimer").val() + '-' + $("#txtactivityplanendtimer").val() + "  " + $("#txtactivityplantitle").val() + "</p>");
                                }
                            });
                            savetableplanlist();
                        }
                        else {
                            new pop({ typename: 'warning',
                                msginfo: wanerdaoLangTip('active_00007')
                            });
                        }
                    }
                }
                else {
                    new pop({ typename: 'warning',
                        msginfo: wanerdaoLangTip('active_00006')
                    });
                }
                $('#tableplanlist tr td:last-child a').click(function () {
                    if ($(this).attr("title") == "删除") {
                        var _p = $(this).parent().parent();
                        var _x = _p.attr("id").replace("tr", "");
                        $("#p" + _x).remove();
                        _p.remove();
                        savetableplanlist();
                    }
                    else {
                        $("#btnactivityplan").val("保存");
                        var p = $(this).parent().parent();
                        var t = p.find("td:lt(3)");
                        $.each(t, function (i) {
                            if (i == 0) {
                                $("#txtactivityplantitle").val($(t[i]).text());
                            }
                            if (i == 1) {
                                $("#txtactivityplanmark").val($(t[i]).text());
                            }
                        });
                        $.data(document.body, "planedit", p);
                    }
                });
            }
            else {
                var p = $.data(document.body, "planedit");
                p.find("td:eq(0)").html($("#txtactivityplantitle").val());
                p.find("td:eq(1)").html($("#txtactivityplanmark").val());
                $("#txtactivityplantitle").val("");
                $("#txtactivityplanmark").val("");
                savetableplanlist();
                $("#btnactivityplan").val("添加");
            }
        });
        $("#btnactivityclearplan").click(function () {
            $("#txtactivityplantitle").val("");
            $("#txtactivityplanmark").val("");
        });
    }
    function _aUI() {
        var ui = '<div id="divactivitybase1" class="setmodList basicSet">';
        ui += '<dl>';
        ui += ' <dd class="formTitle">活动周期定制：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <select id="ddlactivityduration"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl id="dlbookduration" style="display:none">';
        ui += ' <dd class="formTitle">选择预定周期：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtBookTime" style="width:277px;" readonly="readonly" />';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl id="dldy0" style="display:none">';
        ui += ' <dd class="formTitle">间隔周期：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <select id="ddlactivityperiod" /><select id="ddlbuild"/>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl id="dldy1" style="display:none">';
        ui += ' <dd class="formTitle"> <input type="checkbox" id="ckactivityemail" /><dd>';
        ui += ' <dd class="formMain" id="ddactivityemail"><label for="ckactivityemail">周期时间临近时，发送邮件通知创建人</label>';
        //ui += '    <select id="ddlactivityemail" /> ';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl id="dldy2" style="display:none">';
        ui += ' <dd class="formTitle"> <input type="checkbox" id="ckactivityinbox" /><dd>';
        ui += ' <dd class="formMain" id="ddactivityinbox"><label for="ckactivityinbox">周期时间临近，发送站内信息通知创建人</label>';
        // ui += '    <select id="ddlactivityemail" /> ';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    };
    function _bUI() {
        var ui = '<div id="divactivitybase2" class="setmodList addressSet">';
        ui += '<ul class="setBar">';
        ui += ' <li><span id="listSch_Btn" class="currentSch">列表查找</span></li>';
        ui += ' <li><span id="mapSch_Btn" class="fCgray3">地图查找</span></li>';
        ui += ' <li><span id="switchBtn" class="buttonW showBox_Btn"></span></li>';
        ui += '</ul>';
        ui += '<div class="address-show">';
        ui += ' <div class="MapSchBar">';
        ui += '     <label for="spanactivitypersonaddress">我的位置：<input type="text" class="text" id="spanactivitypersonaddress" /></label>';
        ui += '     <label for="spanactivitypersonpostid">邮编：<input type="text" class="text" id="spanactivitypersonpostid" /></label>';
        ui += '     <input type="text" class="text" id="txtactivitypersonarea" style="width:240px;" />';
        ui += '     <input id="hidepersoncountryid" type="hidden">';
        ui += '     <input id="hidepersonstateid" type="hidden">';
        ui += '     <input id="hidepersoncityid" type="hidden"><a href="javascript:void(0);" class="btn_search" id="search">查找</a>';
        ui += ' </div>';
        ui += '</div>';
        ui += '<div id="addreesSchWarp" class="addreesSchWarp clearfix" >';
        ui += ' <div class="listschWarp">';
        ui += '     <div class="listSchBar">';
        ui += '         <ul class="activityCat">';
        ui += '             <li> <a href="javascript:viod(0);" class="prevBtn"></a> </li>';
        ui += '             <li class="tabs-clip" style="width:540px; overflow:hidden">';
        ui += '                 <ul class="AC_catList"  id="ulactivitycategory"> </ul>';
        ui += '             <li> <a href="javascript:viod(0);" class="nextBtn"></a> </li>';
        ui += '             <li> <a href="javascript:viod(0);" class="backBtn" style="display:none"></a> </li>';
        ui += '         </ul>';
        ui += '     </div>';
        ui += '     <div class="listSchMain">'; //列表
        ui += '         <div class="listSchContent">';
        ui += '             <div class="pageList"></div>';
        ui += '             <ul id="sightlist"></ul>';
        ui += '             <div class="pageList"></div>';
        ui += '         </div>';
        ui += '     </div>';
        ui += '</div>';
        ui += '<div class="mapschWarp">';
        ui += ' <div class="MapSchL" id="map" style="width:447px;height:462px"></div> <input id="locationId" type="hidden" /><input id="latLng" type="hidden" />';
        ui += ' <div class="MapSchR">';
        ui += '<div id="distHint"></div>'
        ui += '     <ul>';
        ui += '         <li><input type="checkbox" class="vInput" id="setHomeAddress" /><label for="setHomeAddress">同步该地址为家庭地址</label></li>';
        ui += '         <li><small class="icon16 square fSize-12">离家距离:</small><select style="width: 116px;" id="disToHome"></select></li>';
        ui += '         <li><small class="icon16 square fSize-12">分类:</small><input type="button" class="buttonG btn_w56 btn_h28 btnGary_56" value="' + wanerdaoLangTip('common_00019') + '" id="addCategory" />';
        ui += '             <div class="tips_G tipW_190"><span class="upArrow_G"></span><div class="tips_G_main tipW_190">';
        ui += '                 <ul id="categoryArea"></ul></div></div>';
        ui += '         </li>';
        ui += '         <li><small class="icon16 square fSize-12"><input type="checkbox" class="vInput" id="mapallFriend" checked="checked"/><label for="mapallFriend">所有好友参加的活动</label></small>';
        ui += '             <span class="chooseFriend"><br/>向好友发送邀请：<input type="button" class="buttonG btn_w56 btn_h28 btnGary_56" value="' + wanerdaoLangTip('common_00019') + '" id="addCusFriend" />';
        ui += '             <div class="tips_G tipW_190"><span class="upArrow_G"></span><div class="tips_G_main tipW_190">';
        ui += '                 <ul id="cusFriendArea"></ul></div></div></span> ';
        ui += '          </li>';
        ui += '         <li><small class="icon16 square fSize-12"><input type="checkbox" class="vInput" id="mapallGroup" checked="checked"/><label for="mapallGroup">所有圈子参加的活动</label></small>';
        ui += '             <span class="chooseGroup"><br/>向成员发送邀请：<input type="button" class="buttonG btn_w56 btn_h28 btnGary_56" value="' + wanerdaoLangTip('common_00019') + '" id="addCusGroup" />';
        ui += '             <div class="tips_G tipW_190"><span class="upArrow_G"></span><div class="tips_G_main tipW_190">';
        ui += '                 <ul id="cusGroupArea"></ul></div></div></span> ';
        ui += '          </li>';
        ui += '          <li>';
        ui += '          <small class="icon16 square fSize-12"> <input type="checkbox" class="vInput" id="filterPlace" /><label for="filter">过滤掉去过的地方</label></small>';
        ui += '          </li>';
        ui += '     </ul>';
        ui += ' </div>';
        ui += ' <div class="clear2"></div>';
        ui += ' <div class="MapNote">';
        ui += '     <p class="mapNote"><b>注释:</b><img src="/images/icons/mapschNote.png" alt=""/><font class="fCgray3">活动地点</font></p>';
        ui += ' </div>';
        ui += '</div>';
        ui += '</div>';
        ui += '<dl class="clearfix">';
        ui += ' <dd class="formTitle">位置：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivityaddress" style="width:300px;"/>';
        ui += '         <input id="hideaddressid" type="hidden">';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clearfix">';
        ui += ' <dd class="formTitle">邮编：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" id="txtactivitypostid" style="width:300px;"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">地区：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input type="text" class="text" readonly="readonly" id="txtarea" style="width:300px;"/>';
        ui += '         <input id="hidecountryid" type="hidden">';
        ui += '         <input id="hidestateid" type="hidden">';
        ui += '         <input id="hidecityid" type="hidden">';
        //ui += '     <input type="button" class="buttonG btn_w56 btn_h28 btnGary_56"  id="btnchoosearea"  value="选择地区" />';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    };
    function _cUI() {
        var ui = '<div id="divactivitybase3" class="setmodList activityParameter">';
        ui += '<dl  class="clearfix">';
        ui += ' <dd class="formTitle">活动时间：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="txtactivitystartday" readonly="readonly" type="text" class="text" />到<input id="txtactivityendday" type="text" class="text" readonly="readonly"/>';
        ui += '     共<input id="txtactivitytotalday" value="0" type="text" class="text" disabled="disabled"/>天';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl  class="clearfix">';
        ui += ' <dd class="formTitle">分类标记：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="btnactivityac" type="button"  value="选择"  class="buttonG btn_w56 btn_h28 btnGary_56"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl  class="clearfix">';
        ui += ' <dd class="formTitle">&nbsp;</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <div class="tips-1" style="width:500px;">';
        ui += '         <ul id="divaclist" class="conditions"></ul>';
        ui += '     </div>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl  class="clearfix">';
        ui += ' <dd class="formTitle">活动标题：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <input id="txtactivitytitle" type="text" class="text" style="width:446px;"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl  class="clearfix">';
        ui += ' <dd class="formTitle">活动简介：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <textarea id="txtactivitymark" class="textarea" cols="69" rows="4"></textarea>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '</div>';
        return ui;
    };
    function _dUI() {
        var ui = '<div id="divactivitybase4" class="setmodList preparedPlan">';
        ui += '<div class="timelineWarp">'; //时间线
        ui += ' <div class="timelineMain">';
        ui += '     <ul id="ultimer"></ul>';
        ui += ' </div>';
        ui += '</div>'; //时间线结束
        ui += '<div class="tabWarp_Gray">'; //计划列表开始
        ui += ' <table id="tableplanlist" cellpadding="0" cellspacing="0" border="0" background="#ededed" width="662" class="preparedList fSize-12 fCgray3" >';
        ui += ' </table>';
        ui += '</div>'; //计划列表结束
        ui += '<dl>';
        ui += ' <dd class="formTitle">时间：</dd>';
        ui += ' <dd class="formMain">';
        ui += '     <select id="ddlactivityplandaylist"/>&nbsp;从&nbsp;<input type="text" class="text" id="txtactivityplanstarttimer" readonly="readonly" />';
        ui += '     &nbsp;到&nbsp;<input type="text" class="text" id="txtactivityplanendtimer"  readonly="readonly"/>';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle"> 安排：<dd>';
        ui += ' <dd class="formMain"><input type="text" class="text" id="txtactivityplantitle" /> ';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">备注：<dd>';
        ui += ' <dd class="formMain">';
        ui += '    <textarea class="textarea" id="txtactivityplanmark" cols="69" rows="4"></textarea> ';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '<dl>';
        ui += ' <dd class="formTitle">&nbsp;<dd>';
        ui += ' <dd class="formMain">';
        ui += '    <input type="button" id="btnactivityplan" value="添加" class="buttonG btn_w56 btn_h28 btnGary_56" /> ';
        ui += '    <input type="button" id="btnactivityclearplan" value="清空" class="buttonG btn_w56 btn_h28 btnGary_56" />';
        ui += ' </dd>';
        ui += '</dl>';
        ui += '<dl class="clear2"/>';
        ui += '</div>';
        return ui;
    };
    //计划拟定-开始与结束时间效验
    function _validplantimer(starttimer, endtimer) {
        var flg = false;
        endtimer = endtimer.substring(0, endtimer.indexOf(":"));
        endtimer = parseInt(endtimer);
        starttimer = starttimer.substring(0, starttimer.indexOf(":"));
        starttimer = parseInt(starttimer);
        if (starttimer >= endtimer) {
            flg = true;
            new pop({ titleid: 'common_00022', typename: 'error',
                msginfo: wanerdaoLangTip('active_00005')
            });
        }
        return flg;
    };
    //计划拟定-绑定计划拟定的天数列表
    function _bindddlactivitydaylist(testStartDate, testEndDate, sDate) {
        var items = '[';
        $("#ultimer").empty();
        for (var i = 0; i <= sDate; i++) {
            var s = new Date(Date.parse(testStartDate.format('MM/dd/yyyy')) + 86400000 * i);
            if (s <= testEndDate) {
                var t = s.format('MM/dd/yyyy');
                items += '{"id":"' + t + '","value":"' + t + '"},';
                //tabWarp_Gray
                var tli = '<li class="current timelineBtm timelineTop">';
                tli += '<p class="tips_B fCwhite fSize-12" id="timer{0}">{1}</p>';
                tli += '<div class="tipsWarp">';
                tli += '<div class="tipsTop"></div>';
                tli += '<div class="tipsMain fSize-12 fCgray3" id="timercontent{2}"></div>';
                tli += '<div class="tipsBottom">&nbsp;</div>';
                tli += '</div>';
                tli += '</li>';
                tli = tli.replace("{0}", i).replace("{1}", t).replace("{2}", i);
                //                var tli = '<div class="timelineMain"><ul>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>';
                //                tli += '</ul></div>';
                //                $(".timelineWarp").append(tli);
                $("#ultimer").append(tli);
            }
        }
        items = items.substring(0, items.length - 1);
        items += ']';
        items = $.parseJSON(items);
        bindDropDownList("ddlactivityplandaylist", items, true);
        $.cookies.set("activityplandaylist", $("#ddlactivityplandaylist").html());
    };
    function loademaildata() {
        //发送email周期性
        ajaxfunc("create_activity.axd", "{opertype:'getactivityemailduration'}", function (data) { }, function (data) {
            if (data.result) {
                bindDropDownListbyname("ddlactivityemail", data.data, true).change(function () {
                    $.cookies.set("ddlactivityemail", $("#ddlactivityemail").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivityemail", null, false);
        });
    };
    function loadinboxdata() {
        //发送站内信息周期性
        ajaxfunc("create_activity.axd", "{opertype:'getsitemessageduration'}", function (data) { }, function (data) {
            if (data.result) {
                bindDropDownListbyname("ddlactivityinbox", data.data, true).change(function () {
                    $.cookies.set("ddlactivityinbox", $("#ddlactivityinbox").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivityinbox", null, false);
        });
    };
    //活动分类集合
    function saveactivitycategorylist() {
        $.cookies.set("activitycategorylist", $('#divaclist').html());
    };
    //活动计划列表
    function savetableplanlist() {
        $.cookies.set("activityplanlist", $('#tableplanlist').html());
    };
    function loadcache() {
        if ($.cookies.get("ddlactivityduration") != null) {//人数限制
            $("#ddlactivityduration").cookieBind();
            if ($.cookies.get("ddlactivityduration") == "1" && $.cookies.get("ddlactivityduration") != "-2") {
                //获取以前参加活动的信息
                //获取用户信息
                $("#tablezhouqi tr:gt(0)").hide();
            }
            else {
                $("#tablezhouqi tr:gt(0)").show();
                if ($.cookies.get("ddlactivityperiod") != null) {//报名结束日期
                    $("#ddlactivityperiod").cookieBind();
                }
                if ($.cookies.get("ddlbuild") != null) {
                    $("#ddlbuild").cookieBind();
                }

                if ($.cookies.get("ckactivityemail") != null) {
                    $("#ckactivityemail").cookieBind();
                    $("#ddlactivityemail").fadeIn();
                    if ($("#ddlactivityemail option").length <= 0) {
                        loademaildata();
                        if ($.cookies.get("ddlactivityemail") != null) {
                            $("#ddlactivityemail").cookieBind();
                        }
                    }
                }
                if ($.cookies.get("ckactivityinbox") != null) {
                    $("#ckactivityinbox").cookieBind();
                    $("#ddlactivityinbox").fadeIn();
                    if ($("#ddlactivityinbox option").length <= 0) {
                        loadinboxdata();
                        if ($.cookies.get("ddlactivityinbox") != null) {
                            $("#ddlactivityinbox").cookieBind();
                        }

                    }
                }
            }
        }
        if ($.cookies.get("txtactivityaddress") != null) {//景点地址
            $("#txtactivityaddress").cookieBind();
        }
        if ($.cookies.get("txtactivitypostid") != null) {//景点邮编
            $("#txtactivitypostid").cookieBind();
        }
        if ($.cookies.get("txtactivitycountryid") != null) {//国家名
            $("#txtactivitycountryid").cookieBind();
        }
        if ($.cookies.get("hidecountryid") != null) {//国家ID
            $("#hidecountryid").cookieBind();
        }
        if ($.cookies.get("txtactivitystateid") != null) {//直接加入报名
            $("#txtactivitystateid").cookieBind();
        }
        if ($.cookies.get("hidestateid") != null) {//申请加入报名
            $("#hidestateid").cookieBind();
        }
        if ($.cookies.get("txtactivitycityid") != null) {//城市名称
            $("#txtactivitycityid").cookieBind();
        }
        if ($.cookies.get("hidecityid") != null) {//城市ID
            $("#hidecityid").cookieBind();
        }

        if ($.cookies.get("txtactivitystartday") != null) {//活动开始时间
            $("#txtactivitystartday").cookieBind();
        }
        if ($.cookies.get("txtactivityendday") != null) {//活动结束时间
            $("#txtactivityendday").cookieBind();
        }
        if ($.cookies.get("txtactivitytotalday") != null) {//活动总天数
            $("#txtactivitytotalday").cookieBind();
        }
        if ($.cookies.get("activitycategorylist") != null) {//分类标记
            $('#divaclist').empty().append($.cookies.get("activitycategorylist"));
        }
        if ($.cookies.get("txtactivitytitle") != null) {//活动标题
            $("#txtactivitytitle").cookieBind();
        }
        if ($.cookies.get("txtactivitymark") != null) {//活动简介
            $("#txtactivitymark").cookieBind();
        }
    }
})($);

/*2012-8-29 活动地图（徐蓓添加）*/
function MapBuilder() {

    //公共变量
    this.markers = []; //传入的数据格式

    //公共函数
    this.init = init;
    this.loadMap = loadMap;

    //私有变量
    var t = this;
    var panel = new MapPanel();
    var _defLocation = new google.maps.LatLng(32.07, 118.78); //默认经纬度

    //获取当前用户地址
    function _getCurrentLocation(options, callBack) {
        var initLocation = _defLocation; //默认经纬度
        var myLocation = $("#txtactivitypersonarea").val() + $("#spanactivitypersonaddress").val();
        var opts = $.extend({}, options);
        _getUserCurrPlace(myLocation, function (data) {//首先根据用户信息当前地址获取经纬度
            if (!myLocation) {
                $("#spanactivitypersonaddress").val(data.address);
                $("#hidepersoncountryid ").val(data.country_id);
                $("#hidepersonstateid ").val(data.state_id);
                $("#hidepersoncityid ").val(data.city_id);
                $("#locationId").val(data.country_id + "," + data.state_id + "," + data.city_id);
                $("#txtactivitypersonarea").text(data.partAddr);
                $("#spanactivitypersonpostid").val(data.zip);
            }
            if (data.latLng) {
                _defLocation = data.latLng;
                opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                callBack(opts);
            } else {
                if (navigator.geolocation) {//根据用户浏览器获取经纬度
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        var coords = pos.coords;
                        _defLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
                        opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                        //                            _getAddress({ lat: _defLocation.lat(), lng: _defLocation.lng() }, function (address) {
                        //                                $("#myLocation").val(address);
                        //                                
                        //                            });
                        $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                        callBack(opts);
                    }, function () {
                        _defLocation = _getUserLatLngByIp();
                        opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                        $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                        callBack(opts);
                    });
                } else {//根据用户ip获取经纬度（因没有ip库暂时没有实现）
                    _defLocation = _getUserLatLngByIp();
                    opts = $.extend(opts, { center: [_defLocation.lat(), _defLocation.lng()] });
                    $("#latLng").val(_defLocation.lat() + "," + _defLocation.lng());
                    callBack(opts);
                }

            }

        });

    }

    /*
    获取用户当前地址。如果用户没有在我的位置处输入，则以用户信息的当前地址为准。
    callback的参数为
    {
    address:"xxx",
    city_id:"xxx",city_name:"xxx",
    country_id:"xxx",country_name:"xxx"
    state_id:"xxx",state_name:"xxx",zip:"xxx",
    partAddr:"xxx",
    detailAddr:"xxx",
    latLng:google.maps.LatLng,
    }
    */
    function _getUserCurrPlace(address, callBack) {
        if (address) {
            _getLatLng(address, function (data) {
                callBack(data);
            })
        } else {
            $.ajax({
                url: "getuseraddressinfo_activity.axd",
                type: 'POST',
                dataType: "json",
                data: {
                    opertype: "getuseraddressinfo"
                },
                cache: false,
                timeout: 60000,
                error: function (data) {
                    alert(data);
                },
                /*
                参数格式：
                {
                data:{
                address:"xxx",
                city_id:"xxx",city_name:"xxx",
                country_id:"xxx",country_name:"xxx"
                state_id:"xxx",state_name:"xxx",zip:"xxx"
                },
                result:true 
                } 
                */
                success: function (data) {
                    if (data.result) {
                        var addr = data.data;
                        var rAddr = _formatAddress(addr); //格式化地址
                        $.extend(addr, rAddr);
                        if (addr.detailAddr) {
                            _getLatLng(addr.detailAddr, function (data) {
                                $.extend(addr, data);
                                callBack(addr);
                            });
                        } else {
                            callBack(addr);
                        }
                    }
                }
            });
        }

    }
    /*
    参数格式：{country_name:"xxx",state_name:"xxx",city_name:"xxx",address:"xxx",country_id:"xxx"}
    返回格式：{detailAddr:"xxx",partAddr:"xxx",address:"xxx"}
    */
    function _formatAddress(data) {
        var address; //地址（不包含国家省城市）
        var detailAddr; //详细地址（包含国家省城市）
        var partAddr; //格式为包含国家、省、城市的字符串
        switch (data.country_id) {
            case language["zh-cn"]: //中国地址。格式为国家,省,城市,地址
                partAddr = data.country_name + "," + data.state_name + "," + data.city_name;
                detailAddr = partAddr + data.address;
                break;
            case language["en-us"]: //美国地址。格式为地址,城市,州,国家
                partAddr = data.country_name + "," + data.state_name + "," + data.country_name + "," + data.state_name + ",";
                detailAddr = data.address + "," + partAddr;
                break;
            default: partAddr = detailAddr = "";
                break;
        }
        var cstr = /[undefined|NaN|null]/g; //设定非法的字符串值
        partAddr = partAddr.replace(cstr, "");
        detailAddr = detailAddr.replace(cstr, "");
        return { detailAddr: detailAddr, partAddr: partAddr, address: data.address };
    }

    //同步家庭地址
    function _syncUserAddress(addInfo) {
        $.ajax({
            url: "setuseraddressinfo_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "setuseraddressinfo",
                address: addInfo.address,
                country_id: addInfo.countryId,
                state_id: addInfo.stateId,
                city_id: addInfo.cityId,
                zip: addInfo.zip
            },
            cache: false,
            timeout: 60000,
            error: function (data) {
            },
            success: function (data) {
                hint(data.msg, $("#distHint"), 2);
            }
        });
    }

    //通过详细地址获取经纬度，callback的参数为{ latLng: google.maps.LatLng class }
    function _getLatLng(address, callBack) {
        $('#map').gmap3(
                { action: 'getLatLng',
                    address: address,
                    callback: function (result) {
                        var latLng;
                        if (result) {
                            latLng = result[0].geometry.location;
                        }
                        callBack({ latLng: latLng });
                    }
                });
    }

    //通过经纬度获取地址，参数latLng为{lat:xxx,lng:xxx}。callBack参数为address：详细地址
    function _getAddress(latLng, callBack) {
        var glatLng = new google.maps.LatLng(latLng.lat, latLng.lng);
        $("#map").gmap3({
            action: 'getAddress',
            latLng: glatLng,
            callback: function (result) {
                var address = result && result[0] ? result && result[0].formatted_address : "no address";
                callBack(address);
            }
        });
    }
    //通过Ip获取经纬度
    function _getUserLatLngByIp() {
        var initLocation = _defLocation; //默认经纬度
        //在此添加根据Ip获取对应市区经纬度逻辑
        return initLocation;
    }

    //通过邮编获取经纬度
    function _getUserLatLngByPostcode() {
        var initLocation = _defLocation; //默认经纬度
        //在此添加根据邮编获取对应市区经纬度逻辑
        return initLocation;
    }

    //搜索活动
    function _searchActivity(callBack) {
        var param = {};

        param.syncAddress = false;
        param.placeset = { latLng: $("#latLng").val() };

        var dist = $("#disToHome").val();
        //            if (dist == -2) {
        //                hint(wanerdaoLangTip("actmap_00001"), $("#distHint"));
        //                return false;
        //            }
        param.fromHomeDistance = dist == -2 ? 0 : dist * 1000; //单位是米

        var categoryIds = "";
        $("#categoryArea li").each(function () {
            categoryIds += $(this).attr("id") + ",";
        });
        param.category = categoryIds.replace(/,$/g, "");

        param.allFriendAttend = $("#mapallFriend").attr("checked") == "checked";
        param.allGroupAttend = $("#mapallGroup").attr("checked") == "checked";

        if (!param.allFriendAttend) {
            var friendIds = "";
            $("#cusFriendArea li").each(function () {
                friendIds += $(this).attr("id") + ",";
            });
            param.friendAttend = friendIds.replace(/,$/g, "");
        }

        if (!param.allGroupAttend) {
            var groupIds = "";
            $("#cusGroupArea li").each(function () {
                groupIds += $(this).attr("id") + ",";
            });
            param.groupAttend = groupIds.replace(/,$/g, "");
        }

        param.filterBeenPlace = $("#filterPlace").attr("checked") == "checked";

        $.ajax({
            url: "searchactivitymap_activity.axd",
            type: 'POST',
            dataType: "json",
            data: {
                opertype: "searchactivitymap",
                /*
                参数格式：
                {"syncAddress":false,"placeset":{"latLng":"22.527189,113.91810199999998"},
                "fromHomeDistance":10000,"category":"25ee9602-1431-11e1-ae3c-000c295f9365,27a1d044-1431-11e1-ae3c-000c295f9365",
                "allFriendAttend":false,"allGroupAttend":false,"friendAttend":"1,2,","groupAttend":"3,4,","filterBeenPlace":true}
                */
                value: JSON.stringify(param)
            },
            cache: false,
            timeout: 60000,
            error: function (data) {

            },
            success: function (data) {
                //查询活动后的回调函数
                callBack(data);
            }
        });

    }

    //加载地图
    function loadMap(options, markers) {
        $("#map").gmap3({ action: "clear", name: ["marker", "circle"] });
        var opt = $.extend({
            center: [_defLocation.lat(), _defLocation.lng()],
            fillColor: "#FFAF9F", strokeColor: "#FF512F"
        }, options);
        if (markers) {
            t.markers = markers;
        }
        //加载google map地图
        $('#map').gmap3(
            { action: 'addCircle',
                circle: {
                    options: opt
                }
            },
            { action: 'addMarker',
                map: {
                    center: true, zoom: 14
                },
                //可以自定义marker
                marker: {
                },
                latLng: [opt.center[0], opt.center[1]]
            },
            { action: 'addMarkers',
                markers: t.markers,
                marker: {
                    options: {
                        draggable: false
                    }, events: {
                        click: function (marker, event, content) {
                            var map = $(this).gmap3('get'),
                                        infowindow = $(this).gmap3({ action: 'get', name: 'infowindow' });
                            if (infowindow) {
                                infowindow.open(map, marker);
                                infowindow.setContent(content);
                            } else {
                                $(this).gmap3({ action: 'addinfowindow', anchor: marker, options: { content: content} });
                            }
                        }
                    }
                }
            }
            );
    }

    //    //通过google map api获取address
    //    function _getAddress($map, latLng, callBack) {
    //        $map.gmap3({
    //            action: 'getAddress',
    //            latLng: latLng,
    //            callback: callBack
    //        });
    //    }

    //初始化builder
    function init(options, markers) {
        _buildMap(options, markers);
        panel.render();
    }

    function _buildMap(options, markers) {
        if (markers) {
            t.markers = markers;
        }
        //        //默认捕获回车
        //        $("#myLocation,#postcode").keydown(function (e) {
        //            var keynum;
        //            if (window.event) // IE    
        //            {
        //                keynum = e.keyCode;
        //            }
        //            else if (e.which) // Netscape/Firefox/Opera    
        //            {
        //                keynum = e.which;
        //            }
        //            if (keynum == 13) {//捕获回车
        //                _getCurrentLocation(loadMap);
        //            }
        //        });

        //初始化经纬度
        if (currLtFlag) {
            currLtFlag = false;
            _getCurrentLocation(options, function (options) {
                currLtFlag = true;
                loadMap(options);
            });
        }
    }


    function MapPanel() {
        this.render = render;


        function _isDuplicate($iArray, id) {
            var result = false;
            $iArray.each(function () {
                if ($(this).attr("id") == id) {
                    result = true;
                }
            });
            return result;
        }

        function render() {
            //地址选择框
            $("#txtactivitypersonarea").click(function () {
                new wanerdaoArea({ comopts: { elementid: "#txtactivitypersonarea", callback: function (data) {
                    var addr = _formatAddress({ country_name: data.country.name, state_name: data.state.name, city_name: data.city.name, country_id: data.country.id });
                    $("#txtactivitypersonarea").text(addr.partAddr);
                    $("#locationId").val(data.country.id + "," + data.state.id + "," + data.city.id);
                }
                }
                });
            });
            //同步该地址为家庭地址
            $("#setHomeAddress").click(function () {
                if ($(this).attr("checked") == "checked") {
                    //同步函数
                    var zip = $("#zip").val();
                    var address = $("#address").val();
                    var locationId = $("#locationId").val().split(",");
                    if (!locationId) {
                        hint(wanerdaoLangTip("actmap_00004"), $("#distHint"), 2);
                        return false;
                    }
                    if (!address) {
                        hint(wanerdaoLangTip("actmap_00002"), $("#distHint"), 2);
                        return false;
                    }
                    if (!zip) {
                        hint(wanerdaoLangTip("actmap_00003"), $("#distHint"), 2);
                        return false;
                    }
                    var addInfo = { zip: zip, address: address, countryId: locationId[0], stateId: locationId[1], cityId: locationId[2] };
                    _syncUserAddress(addInfo);
                }
            });

            //离家距离
            var distance = [{ id: 10, value: 10 }, { id: 20, value: 20 }, { id: 30, value: 30}];
            bindDropDownList("disToHome", distance, true);

            //分类
            $("#addCategory").click(function () {
                new wanerdaoac({ alphopts: { elementid: 'addCategory', callback: function (data) {
                    if (data.result) {
                        $('#categoryArea li').remove();
                        $.each(data.acs, function (i, n) {
                            var temp = '<li id="{0}"  class="delBtn">{1}</li>';
                            temp = temp.replace("{0}", data.acs[i].id);
                            temp = temp.replace("{1}", data.acs[i].name);
                            if (!($('#categoryArea li[id="' + data.acs[i].id + '"]') != null
                            && $('#categoryArea li[id="' + data.acs[i].id + '"]').length >= 1)) {
                                $('#categoryArea').append(temp);
                            }
                        });
                        $('#categoryArea li').click(function () {
                            $(this).remove();
//                            var ac = $.data(document.body, 'btnactivityacac')
//                            ac.find('#btnactivityacbar a[id="' + $(this).parent().attr("id") + '"]').remove();
                        });
                    }
                }
                }
                });
            });
            $("#mapallFriend").attr("checked")  ? $(".chooseFriend").hide() : $(".chooseFriend").show();
            $("#mapallFriend").click(function () {
                $(this).attr("checked")? $(".chooseFriend").hide() : $(".chooseFriend").show();
            });

            $("#mapallGroup").attr("checked")  ? $(".chooseGroup").hide() : $(".chooseGroup").show();
            $("#mapallGroup").click(function () {
                $(this).attr("checked")  ? $(".chooseGroup").hide() : $(".chooseGroup").show();
            });

            //自定义好友
            $("#addCusFriend").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00011', typename: 'friends', elementid: 'addCusFriend', callback: function (data) {
                        $.each(data.friends, function (i, n) {
                            var temp = '<li id="{0}" class="delBtn"><a href="/personal/personal_info.html?uid={1}" target="_blank">{2}</a></li>';
                            temp = temp.replace("{0}", data.friends[i].id);
                            temp = temp.replace("{1}", data.friends[i].id);
                            temp = temp.replace("{2}", data.friends[i].name);
                            if (!($('#cusFriendArea li[id="' + data.friends[i].id + '"]') != null
                            && $('#cusFriendArea li[id="' + data.friends[i].id + '"]').length >= 1)) {
                                //$('#friendnewlist').empty();
                                $('#cusFriendArea').append(temp);
                            }

                        });
                        $('#cusFriendArea li').click(function () {
                            $(this).remove();
                        });
                    }
                    }
                });
            });
            //自定义圈子
            $("#addCusGroup").click(function () {
                wanerdaoPop({
                    comopts: { titleid: 'common_00012', typename: 'group', elementid: 'addCusGroup', callback: function (data) {
                        $.each(data.group, function (i, n) {
                            var temp = '<li id="{0}" class="delBtn"><a href="/personal/personal_info.html?uid={1}" target="_blank">{2}</a></li>';
                            temp = temp.replace("{0}", data.group[i].id);
                            temp = temp.replace("{1}", data.group[i].id);
                            temp = temp.replace("{2}", data.group[i].name);
                            if (!($('#cusGroupArea li[id="' + data.group[i].id + '"]') != null
                            && $('#cusGroupArea li[id="' + data.group[i].id + '"]').length >= 1)) {
                                $('#cusGroupArea').append(temp);
                            }
                        });
                        $('#cusGroupArea li').click(function () {
                            $(this).remove();
                        });
                    }
                    }
                });
            });
            $("#search").click(function () {
                if (getActFlag) {
                    getActFlag = false;
                    _searchActivity(function (data) {
                        if (data.result) {
                            var markers = [];
                            var latLng = [];
                            var content = "";
                            $.each(data.data, function (i, item) {
                                latLng = item.latLng.split(";");
                                content = wanerdaoLangTip('active_00046') + "：<a href='/activity_index.html?id=" + item.activityId + "' target='_blank'>" + item.activityName + "</a><br/>" + wanerdaoLangTip('active_00047') + "：" + item.activityAddress;
                                markers.push({ lat: latLng[0], lng: latLng[1], data: content });
                            });

                            var dist = $("#disToHome").val();
                            r = dist == -2 ? 0 : dist * 1000;
                            _buildMap({ radius: r }, markers);
                        }
                        getActFlag = true;
                    });
                }
            });
        }
    }
}

var currLtFlag = true; // 全局变量，判断获取用户位置的ajax是否已经返回（暂时异步返回的解决方法）
var getActFlag = true; // 全局变量，判断根据用户位置获取活动的ajax是否已经返回（暂时异步返回的解决方法）
