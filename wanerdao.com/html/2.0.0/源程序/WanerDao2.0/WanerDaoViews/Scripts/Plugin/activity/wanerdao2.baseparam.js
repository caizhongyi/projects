//周期订制
(function ($) {
    $.fn.baseparam = function () {
        return this.each(function () {
            $this = $(this);
//            var loadmsg = $('<img src="/images/loading12.gif" alt="' + wanerdaoLangTip('common_00009') + '" title="' + wanerdaoLangTip('common_00009') + '"/>');
//            $this.after(loadmsg);
            //构建页面
            $this.after(getbaseparamUI());
            //loadmsg.remove();
            //加载数据
            loadbaseparamdata();
            //注册事件
            addbaseparamevent();
            //加载cache数据
            loadcache();
        });
    };
    function getbaseparamUI() {
        var ui = '<div id="divstep2">';
        ui += '<h3 class="activity_h3">周期订制</h3>';
        ui += '  <div class="blank10px"></div>';
        //活动周期定制
        ui += ' <table width="100%" border="0" cellspacing="1" id="tablezhouqi">';
        ui += ' <tr>';
        ui += '   <td width="25%" align="right">活动周期定制：</td>';
        ui += '   <td width="75%">';
        ui += '     <select id="ddlactivityduration" name="ddlactivityduration" class="combobox w123px" />';
        ui += '   </td>';
        ui += ' </tr>';
        ui += ' <tr style="display:none">';
        ui += '  <td align="right">间隔周期：</td>';
        ui += '  <td><select id="ddlactivityperiod" name="ddlactivityperiod" class="combobox w123px" /><select id="ddlbuild" name="ddlbuild" class="combobox w123px" /></td>';
        ui += ' </tr>';
        ui += ' <tr style="display:none">';
        ui += '  <td align="right"><input type="checkbox" id="ckactivityemail"/> &nbsp;</td>';
        ui += '  <td><label for="ckactivityemail">周期时间临近，发送邮件通知创建人</label>';
        ui += '  <select id="ddlactivityemail" name="ddlactivityemail" class="combobox w123px"  style="display:none"/></td>';
        ui += ' </tr>';
        ui += ' <tr style="display:none">';
        ui += '  <td align="right"><input type="checkbox" id="ckactivityinbox"/>&nbsp;</td>';
        ui += '  <td><label for="ckactivityinbox">周期时间临近，发送站内信息通知创建人</label>';
        ui += '  <select id="ddlactivityinbox" name="ddlactivityinbox" class="combobox w123px"  style="display:none"/></td>';
        ui += ' </tr>';
        ui += ' </table>';

        //地址设定

        ui += '<h3 class="activity_h3">地址设定</h3>';
        ui += '<div class="activity_map">';
        ui += '<div class="show_map"> <span class="cur">列表查询</span> &nbsp; &nbsp; ';
        ui += '<span>地图查找</span> &nbsp; &nbsp; <a href="javascript:;" class="accordion">';
        ui += '<img  src="/images/activity/map_l.png" /></a> </div>';
        ui += '<div class="addressSet address-content " style="display:none;">';
        ui += ' <div data-index= "0">';
        ui += '  <div class="addrBox adtivity_select" style="position:relative;">';
        ui += '    <div class="addScroll" style="position:absolute;">';
        ui += '      <ins class="addrLeft"></ins>';
        ui += '      <div class="ulBox">';
        ui += '        <ul id="ulactivitycategory">';
        ui += '        </ul>';
        ui += '      </div>';
        ui += '      <ins class="addrRight"></ins>';
        ui += '    </div>';
        ui += '    <a class="toTop" href="javascript:void(0)" style="display:none;position:absolute; float:none;z-index:999;right:20px;"></a>';
        ui += ' </div>';
        ui += '     <div class="blank"></div>';
        ui += '     <div class="select-box hauto" style="overflow-y:hidden;">'; //信息列表开始
        ui += '         <div class="pagediv clearfix"></div>';
        ui += '         <div class="blank"></div>';
        ui += '         <div class="sight-list clearfix">';
        ui += '         </div>';
        ui += '         <div class="blank"></div>';
        ui += '         <div class="pagediv clearfix"></div>';
        ui += '     </div>';
        ui += '</div> ';
        ui += '<div class="addressSet" style="display:none;"  data-index= "1"> ';
        ui += '   <div class="searBar">';
        ui += '     <span class="left"> 我的位置：<input id="spanactivitypersonaddress" type="text" style="width:160px;" class="txtInput">&nbsp; ';
        ui += '     邮编：<input id="spanactivitypersonpostid" type="text" style="width:60px;" class="txtInput">&nbsp;';
        ui += '     地区：';
        ui += '     <input id="txtactivitypersoncountryid" type="text" style="width:53px;" class="txtInput" disabled="disabled">';
        ui += '     <input id="hidepersoncountryid" type="hidden">';
        ui += '     <input id="txtactivitypersonstateid" type="text" style="width:53px;" class="txtInput" disabled="disabled">';
        ui += '     <input id="hidepersonstateid" type="hidden">';
        ui += '     <input id="txtactivitypersoncityid" type="text" style="width:53px;" class="txtInput" disabled="disabled">';
        ui += '     <input id="hidepersoncityid" type="hidden">';
        ui += '     <input id="btnactivitypersonarea" type="button" value="请选择地区" class="button" rel="#tt">';
        ui += '     </span>';
        ui += '    </div>';
        ui += '    <div class="mapSearch"> ';
        ui += '     <div class="map left"><img width="447" height="462" src="/images/activity/map.jpg"></div>';
        ui += '     <div class="mapCondition right">';
        ui += '         <p class="item lh24">';
        ui += '         <input type="checkbox" id="setHomeAddress" class="vInput"/><label for="setHomeAddress">同步该地址为家庭地址</label>';
        ui += '         </p>';
        ui += '         <p class="item icon">离家距离：';
        ui += '         <select style="width:116px;">';
        ui += '             <option value="1">1公里</option>';
        ui += '             <option value="5">5公里</option>';
        ui += '             <option value="10">10公里</option>';
        ui += '             <option value="20">20公里</option>';
        ui += '             <option value="50">50公里</option>';
        ui += '             <option value="100">100公里</option>';
        ui += '         </select>';
        ui += '         </p>';
        ui += '         <p class="item icon">分类：';
        ui += '             <input id="btnactivitypersonac" type="button" value="请选择分类" class="button" rel="#ac">';
        ui += '         </p>';
        ui += '         <div class="tipShow"><ins style="left:140px;"></ins>';
        ui += '             <p class="tCon"></p>';
        ui += '         </div>';
        ui += '     </div>';
        ui += '     <div class="explain"> <b class="lblue">注释：</b><i class="iLocat">活动景点地址</i> </div>';
        ui += '    </div> ';
        ui += '   </div> ';
        ui += ' </div>';
        ui += '<div class="address_info" style="background-color:#fff;"> ';
        ui += ' <table width="580" border="0" style="border:0; margin:10px auto;" cellspacing="1" cellpadding="0">';
        ui += '   <tr>';
        ui += '     <td width="40">位置：</td>';
        ui += '     <td width="270"><input id="txtactivityaddress" type="text" class="txtInt" style="width:240px;" /></td>';
        ui += '         <input id="hideaddressid" type="hidden">';
        ui += '     <td width="40">邮编：</td>';
        ui += '     <td ><input id="txtactivitypostid" type="text" class="txtInt" value="邮编" onclick="if(this.value==this.defaultValue){this.value=\'\';this.style.color=\'#000\'}" onblur="if(this.value==\'\'){this.value=this.defaultValue; this.style.color=\'#B6B6B6\'}" style="width:120px; color:#B6B6B6;" /></td>';
        ui += '   </tr> ';
        ui += '   <tr>';
        ui += '     <td >地区：</td>';
        ui += '     <td>';
        ui += '         <input id="txtactivitycountryid" type="text" class="txtInt" disabled="disabled" style="width:120px;" />';
        ui += '         <input id="hidecountryid" type="hidden">';
        ui += '         <input id="txtactivitystateid" type="text" class="txtInt" disabled="disabled" style="width:120px;" />';
        ui += '         <input id="hidestateid" type="hidden">';
        ui += '     </td>';
        ui += '     <td colspan="2">';
        ui += '         <input id="txtactivitycityid" type="text" class="txtInt" disabled="disabled" style="width:100px;" />';
        ui += '         <input id="hidecityid" type="hidden">';
        ui += '         <input id="btnchoosearea" style="height:29px;" value="选择地区" class="button" type="button" rel="#tt"/></td>';
        ui += '   </tr> ';
        ui += ' </table>';
        ui += ' </div>';
        ui += '</div> ';

        //活动参数设定
        ui += '<div class="blank10px"></div>';
        ui += '<h3 class="activity_h3">活动参数设定</h3>';
        ui += '<table width="100%" border="0" cellspacing="1">';
        ui += ' <tr>';
        ui += '     <td width="22%" align="right">活动时间：</td>';
        ui += '     <td width="78%">从';
        ui += '     <input id="txtactivitystartday" type="text" class="txtInt" value="" style="width:120px;" />';
        ui += '     到';
        ui += '     <input id="txtactivityendday" type="text" class="txtInt" value="" style="width:120px;" disabled="disabled"/>';
        ui += '     共<input id="txtactivitytotalday" value="0" type="text" class="txtInt" value="" style="width:58px;"  disabled="disabled"/>';
        ui += '     天 </td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right">分类标记：</td>';
        ui += '     <td><input id="btnactivityac" class="button"  type="button"  value="选择" rel="#ac" /></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right">&nbsp;</td>';
        ui += '     <td>';
        ui += '         <div class="select_pep_name">';
        ui += '             <div class="select_name_list clearfix" id="divaclist">';
        ui += '                 <img class="this_pep1" src="/images/this_pep.png" alt="边框"/>'; //此处填充<span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> 
        ui += '             </div>';
        ui += '         </div>';
        ui += '     </td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right">活动标题：</td>';
        ui += '     <td><input id="txtactivitytitle" type="text" class="txtInt" style="width:342px;" /></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right" valign="top">活动简介：</td>';
        ui += '     <td><textarea id="txtactivitymark" class="txtInt" style="height:88px; width:452px;"></textarea></td>';
        ui += ' </tr>';
        ui += '</table>';
        //计划拟定
        ui += '<div class="blank10px"></div>';
        ui += '<h3 class="activity_h3">计划拟定 <span class="fn"><input type="checkbox" id="ckactivityplan" /><label for="ckactivityplan">现在拟定活动计划</label></span></h3>';
        ui += '<div class="richeng" style="display:none"></div>'; //时间线
        ui += '<div class="activity_mark" style="display:none">';
        ui += ' <div class="tim_mark_tale">';
        ui += '     <table id="tableplanlist" width="100%"   height="170" border="0" cellpadding="0" cellspacing="0">';
        ui += '         <tr>';
        ui += '             <th>序号</th><th>计划标题</th><th>计划备注</th><th>操作时间</th><th>&nbsp;</th>';
        ui += '         </tr>';
        ui += '     </table>'; //具体活动日程
        ui += ' </div>';
        ui += '</div>';
        ui += '<table id="tableactivityplan" width="80%" border="0" cellspacing="1" style="display:none">';

        ui += ' <tr>';
        ui += '     <td align="right">序号：</td>';
        ui += '     <td><input id="txtactivityplanid" value="1" type="text" class="txtInt"  disabled="disabled"/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right">安排：</td>';
        ui += '     <td><input id="txtactivityplantitle" type="text" class="txtInt"  value="计划拟定单条标题" onclick="if(this.value==this.defaultValue){this.value=\'\';this.style.color=\'#000\'}" onblur="if(this.value==\'\'){this.value=this.defaultValue; this.style.color=\'#B6B6B6\'}" style="width:120px; color:#B6B6B6;" /></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td width="25%" align="right">时间：</td>';
        ui += '     <td width="75%"><select id="ddlactivityplandaylist" name="ddlactivityplandaylist" class="combobox w123px" />从';
        ui += '     <input id="txtactivityplanstarttimer" type="text" class="txtInt"  disabled="disabled"/>到<input id="txtactivityplanendtimer" type="text" class="txtInt"  disabled="disabled"/></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td align="right" valign="top">备注：</td>';
        ui += '     <td><textarea  id="txtactivityplanmark" value="计划备注" name="txtactivityplanmark" class="txtInt" style="height:88px; width:452px;"></textarea></td>';
        ui += ' </tr>';
        ui += ' <tr>';
        ui += '     <td>&nbsp;</td>';
        ui += '     <td><input id="btnactivityplan" type="button" class="button" value="添加" />&nbsp;&nbsp;';
        ui += '     <input id="btnactivityclearplan" type="button" class="button" value="清空"  /></td>';
        ui += ' </tr>';
        ui += '</table>';
        ui += '</div>';
        return ui;
    };
    function loadbaseparamdata() {
        //活动周期定制
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityduration'}", function(data){}, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivityduration", data.data, true);
            }
            else
                bindDropDownList("ddlactivityduration", null, false);
        });
        //间隔周期
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvalueactivityintervalduration'}", function(data){}, function (data) {
            if (data.result) {
                bindDropDownList("ddlactivityperiod", data.data, true);
            }
            else
                bindDropDownList("ddlactivityperiod", null, false);
        });
        //活动周期创建形式
        ajaxfunc("create_activity.axd", "{opertype:'getkeyvaluecreatemode'}", function(data){}, function (data) {
            if (data.result) {
                bindDropDownList("ddlbuild", data.data, true);
            }
            else
                bindDropDownList("ddlbuild", null, false);
        });
        //加载我的位置
        ajaxfunc("create_activity.axd", "{opertype:'getuseraddressinfo'}", function(data){}, function (data) {
            if (data.result) {
                $("#spanactivitypersonaddress").val(data.address);
                $("#spanactivitypersonpostid").val(data.zip);
                $("#txtactivitypersoncountryid").val(data.country_name);
                $("#hidepersoncountryid").val(data.country_id);
                $("#txtactivitypersonstateid").val(data.state_name);
                $("#hidepersonstateid").val(data.state_id);
                $("#txtactivitypersoncityid").val(data.city_name);
                $("#hidepersoncityid").val(data.city_id);
            }
        });
        loadac("getjsonactivityplacecategorychild", '');
    };
    function loadac(otypename, id) {
        var otype = "{opertype:'" + otypename + "',id:'" + id + "'}";
        if (id !== '') {
            jQuery(".toTop").attr("id", id).show().unbind("click").click(function () {
                $(this).hide();
                loadac('selectactivityplacecategoryupperlayer', $(this).attr("id"));
            });
        }
        else {
            jQuery(".toTop").hide();
        }
        //ulactivitycategory
        ajaxfunc("create_activity.axd", otype, function(data){}, function (data) {
            if (data.result && data.data.length > 0) {
                $("#ulactivitycategory").empty();
                $.each(data.data, function (i, n) {
                    var aa = '<li id="{0}" istop="{1}" isbottom="{2}" parent_id="{3}" style="overflow: hidden; float: left; width: 58px; height: 22px;"><a href="javascript:;">{4}</a></li>';
                    aa = aa.replace("{0}", data.data[i].id);
                    aa = aa.replace("{1}", data.data[i].istop);
                    aa = aa.replace("{2}", data.data[i].isbottom);
                    aa = aa.replace("{3}", data.data[i].parent_id);
                    aa = aa.replace("{4}", data.data[i].category_name);
                    $("#ulactivitycategory").append(aa);
                    /*滚动插件*/

                });
                //                $(".addScroll").jCarouselLite({
                //                    btnNext: ".addrLeft",
                //                    btnPrev: ".addrRight",
                //                    auto: false,
                //                    scroll: 1,
                //                    visible: 9,
                //                    speed: 300
                //                });
                jQuery('#ulactivitycategory li').click(function () {
                    if ($(this).attr("isbottom") == "true") {
                        $(this).addClass('active');
                        $(".pagediv").myPagination({
                            showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
                            contentid: '.sight-list',
                            callback: showacplace,
                            ajax: {
                                url: 'acplace_common.axd',
                                param: {
                                    pagecurrent: 1,
                                    pageSize: 10,
                                    opertype: 'getactivityplacesearch',
                                    placecategoryid: $(this).attr("id")
                                }
                            }
                        });
                    }
                    else {
                        loadac('getjsonactivityplacecategorychild', $(this).attr("id"));
                    }
                });
                //bindDropDownList("ddlbuild", data.data, true);toTop
            }
            else {
                jQuery('#ulactivitycategory').empty().append(wanerdaoLangTip('common_00005'));
            }   //bindDropDownList("ddlbuild", null, false);
        });
    };
    function showacplace(data) {
        $('.sight-list').empty();
        if (data.result && data.total > 0) {
            $.each(data.rows, function (i, msg) {
                var ui = '<div class="item">';
                ui += ' <p class="c-999">{0} </p>'; //地址名称
                ui += ' <span>国家：<em class="lblue" id="{1}">{2}</em></span>';
                ui += ' <span>省州：<em class="lblue" id="{3}">{4}</em></span>';
                ui += ' <span>城市：<em class="lblue" id="{5}">{6}</em></span><br/>';
                ui += ' <span>邮编：<em class="lblue">{8}</em></span>';
                ui += ' <span>位置：<em class="lblue" style="height:22px;width:300px;display:inline-block; overflow:hidden;vertical-align:middle">{7}</em></span>'; //地址
                ui += ' <p class="c-999">{9} </p>'; //描述
                ui += ' <a id="{10}" href="javascript:;" class="selected">选择</a> ';
                ui += '</div>';
                ui = ui.replace("{0}", data.rows[i].place_name).replace("{1}", data.rows[i].country_id);
                ui = ui.replace("{2}", data.rows[i].country_name).replace("{3}", data.rows[i].state_id);
                ui = ui.replace("{4}", data.rows[i].state_name).replace("{5}", data.rows[i].city_id);
                ui = ui.replace("{6}", data.rows[i].city_name).replace("{7}", data.rows[i].address);
                ui = ui.replace("{8}", data.rows[i].zip).replace("{9}", data.rows[i].description);
                ui = ui.replace("{10}", data.rows[i].id)
                //alert(msg.name);
                $('.sight-list').append(ui);

            });
            $('.sight-list div a').unbind("click").click(function () {
                $("#hideaddressid").attr("value", $(this).attr("id"));
                var parentel = $(this).parent();
                $("#txtactivityaddress").val(parentel.find("p:first").text()); //地址
                $.cookies.set("txtactivityaddress", parentel.find("p:first").text());
                $("#txtactivitypostid").val(parentel.find("span em:eq(3)").text()); //邮编
                $.cookies.set("txtactivitypostid", parentel.find("span em:eq(3)").text());

                $("#txtactivitycountryid").val(parentel.find("span em:eq(0)").text());
                $.cookies.set("txtactivitycountryid", parentel.find("span em:eq(0)").text());
                $("#hidecountryid").attr("value", parentel.find("span em:eq(0)").attr("id"));
                $.cookies.set("hidecountryid", parentel.find("span em:eq(0)").attr("id"));

                $("#txtactivitystateid").val(parentel.find("span em:eq(1)").text());
                $.cookies.set("txtactivitystateid", parentel.find("span em:eq(1)").text());
                $("#hidestateid").attr("value", parentel.find("span em:eq(1)").attr("id"));
                $.cookies.set("hidestateid", parentel.find("span em:eq(1)").attr("id"));

                $("#txtactivitycityid").val(parentel.find("span em:eq(2)").text());
                $.cookies.set("txtactivitycityid", parentel.find("span em:eq(2)").text());
                $("#hidecityid").attr("value", parentel.find("span em:eq(2)").attr("id"));
                $.cookies.set("hidecityid", parentel.find("span em:eq(2)").attr("id"));
            });
        }
        else {
            $('.sight-list').append(wanerdaoLangTip('common_00005'));
        }
    };
    function loademaildata() {
        //发送email周期性
        ajaxfunc("create_activity.axd", "{opertype:'getactivityemailduration'}", function(data){}, function (data) {
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
        ajaxfunc("create_activity.axd", "{opertype:'getsitemessageduration'}", function(data){}, function (data) {
            if (data.result) {
                bindDropDownListbyname("ddlactivityinbox", data.data, true).change(function () {
                    $.cookies.set("ddlactivityinbox", $("#ddlactivityinbox").children('option:selected').val());
                });
            }
            else
                bindDropDownList("ddlactivityinbox", null, false);
        });
    };
    function addbaseparamevent() {
        $("#txtactivityaddress,#txtactivitypostid").change(function () {
            $.cookies.set($(this).attr("id"), $(this).val());
        });
        $("#txtactivitytitle").change(function () {
            if ($(this).val().length > 60) {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: "活动标题长度不能大于60个字符"
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        $("#txtactivitymark").change(function () {
            if ($(this).val().length > 200) {
                new pop({ titleid: 'common_00022', typename: 'error',
                    msginfo: "活动标题长度不能大于200个字符"
                });
                return false;
            }
            else {
                $.cookies.set($(this).attr("id"), $(this).val());
            }
        });
        $("#ddlbuild").change(function () {
            $.cookies.set("ddlbuild", $("#ddlbuild").children('option:selected').val());
        });
        $('.show_map span').each(function (i, n) {
            $(n).click(function () {
                $('.show_map span').removeClass('cur');
                $(this).addClass('cur');
                var list = $('.address-content').children('[data-index]');
                list.filter('[data-index=' + i + ']').stop(true, true).fadeIn();
                list.filter(':not(:[data-index=' + i + '])').stop(true, true).fadeOut();
            })
        });

        $('.show_map .accordion').toggle(
	function () { $(this).find('img').attr('src', '/images/activity/map_l_active.png') },
	function () { $(this).find('img').attr('src', '/images/activity/map_l.png'); }
	).click(function () {
	    $(this).closest('.show_map').next().stop(true, true).animate({ height: 'toggle' });
	});
        $("#setHomeAddress").change(function () {
            if ($(this).attr("checked")) {
                var o = "{opertype:'setuseraddressinfo',address:'";
                o += ("#spanactivitypersonaddress").val() + "',zip:'";
                o += ("#spanactivitypersonpostid").val() + "',country_id:'";
                o += ("#hidepersoncountryid").val() + "',state_id:'";
                o += ("#hidepersonstateid").val() + "',city_id:'";
                o += ("#hidepersoncityid").val() + "'}";
                ajaxfunc("create_activity.axd", o, function(data){}, function (data) {
                    if (data.result) {
                        new pop({ titleid: 'common_00025', typename: 'success',
                            msginfo: "修改成功"
                        });
                    }
                });
            }
        });
        $("#btnchoosearea").overlay();
        $("#btnchoosearea").click(function () {
            wanerdaoArea({
                alphopts: { title: '地区选择框', id: 'tt', elementid: 'btnchoosearea', callback: function (data) {
                    if (data.result) {
                        $("#txtactivitycountryid").val(data.country.name);
                        $.cookies.set("txtactivitycountryid", data.country.name);
                        $("#hidecountryid").attr("value", data.country.id);
                        $.cookies.set("hidecountryid", data.country.id);

                        $("#txtactivitystateid").val(data.state.name);
                        $.cookies.set("txtactivitystateid", data.state.name);
                        $("#hidestateid").attr("value", data.state.id);
                        $.cookies.set("hidestateid", data.state.id);

                        $("#txtactivitycityid").val(data.city.name);
                        $.cookies.set("txtactivitycityid", data.city.name);
                        $("#hidecityid").attr("value", data.city.id);
                        $.cookies.set("hidecityid", data.city.id);
                    }
                }
                }
            });
        });
        $("#btnactivitypersonarea").overlay();
        $("#btnactivitypersonarea").click(function () {
            wanerdaoArea({
                alphopts: { title: '地区选择框', id: 'tt', elementid: 'btnactivitypersonarea', callback: function (data) {
                    if (data.result) {
                        $("#txtactivitypersoncountryid").val(data.country.name);
                        $("#hidepersoncountryid").attr("value", data.country.id);
                        $("#txtactivitypersonstateid").val(data.state.name);
                        $("#hidepersonstateid").attr("value", data.state.id);
                        $("#txtactivitypersoncityid").val(data.city.name);
                        $("#hidepersoncityid").attr("value", data.city.id);
                    }
                }
                }
            });
        });
        //活动参数设定-分类标记
        $("#btnactivitypersonac").overlay();
        $("#btnactivitypersonac").click(function () {
            wanerdaoac({
                alphopts: { title: '活动分类', id: 'ac', elementid: 'btnactivitypersonac', callback: function (data) {
                    if (data.result) {
                        $('.tCon').empty();
                        //此处填充<span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> 
                        $.each(data.acs, function (i, n) {
                            var temp = '<i id="{0}">{1}<a href="javascript:;"></a></i>';
                            // var temp = '<span id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                            temp = temp.replace("{0}", data.acs[i].id);
                            temp = temp.replace("{1}", data.acs[i].name);
                            if (!($('.tCon i[id="' + data.acs[i].id + '"]') != null
                            && $('.tCon i[id="' + data.acs[i].id + '"]').length >= 1)) {
                                $('.tCon').append(temp);
                            }

                        });
                        $('.tCon i a').click(function () {
                            $(this).parent().remove();
                            //savefrienddata();
                        });
                    }
                }
                }
            });
        });
        $("#ddlactivityduration").change(function () {
            if ($(this).children('option:selected').val() == "1" && $(this).children('option:selected').val() != "-2") {
                //获取以前参加活动的信息
                //获取用户信息
                $("#tablezhouqi tr:gt(0)").hide();
            }
            else {
                $("#tablezhouqi tr:gt(0)").show();
            }
            $.cookies.set("ddlactivityduration", $("#ddlactivityduration").children('option:selected').val());
        });
        $("#ckactivityinbox").change(function () {
            if ($(this).attr("checked")) {
                $("#ddlactivityinbox").fadeIn();
                loadinboxdata();
            }
            else {
                $("#ddlactivityinbox").fadeOut();
            }
            $.cookies.set("ckactivityinbox", $("#ckactivityinbox").attr("checked") !== false ? "on" : "off");
        });
        $("#ckactivityemail").change(function () {
            if ($(this).attr("checked")) {
                $("#ddlactivityemail").fadeIn();
                //发送email周期性
                loademaildata();
            }
            else {
                $("#ddlactivityemail").fadeOut();
            }
            $.cookies.set("ckactivityemail", $("#ckactivityemail").attr("checked") !== false ? "on" : "off");
        });
        var now = new Date();
        //alert(now.getDate());
        //活动参数设定-活动时间
        $('#txtactivitystartday').datetimepicker({
            showHour: false,
            showMinute: false,
            showTime: false,
            showTimepicker: false,
            minDate: new Date(now.toLocaleString()),
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
                    var signupday = $("#txtactivitysignupenddatetime");
                    if (signupday != undefined || signupday != null) {
                        var d = new Date(testEndDate - 86400000);
                        signupday.datetimepicker('option', 'minDate', new Date($('#txtactivitystartday').datetimepicker('getDate').getTime()));
                        signupday.datetimepicker('option', 'maxDate', new Date($('#txtactivityendday').datetimepicker('getDate').getTime()));
                        signupday.val(d.format('MM/dd/yyyy'));
                    }
                    _bindddlactivitydaylist(testStartDate, testEndDate, sDate);
                }
                testEndDateBox.attr("disabled", "");
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
                var signupday = $("#txtactivitysignupenddatetime");
                if (signupday != undefined || signupday != null) {
                    var d = new Date(testEndDate - 86400000);
                    signupday.datetimepicker('option', 'minDate', new Date($('#txtactivitystartday').datetimepicker('getDate').getTime()));
                    signupday.datetimepicker('option', 'maxDate', new Date($('#txtactivityendday').datetimepicker('getDate').getTime()));
                    signupday.val(d.format('MM/dd/yyyy'));
                }
                _bindddlactivitydaylist(testStartDate, testEndDate, sDate);
            }
        });
        //活动参数设定-分类标记
        $("#btnactivityac").overlay();
        $("#btnactivityac").click(function () {
            wanerdaoac({
                alphopts: { title: '活动分类', id: 'ac', elementid: 'btnactivityac', callback: function (data) {
                    if (data.result) {
                        $('#divaclist span').remove();
                        //此处填充<span><a href="#">周华建</a><a href="#"><img src="images/del_pep.png"></a></span> 
                        $.each(data.acs, function (i, n) {
                            var temp = '<span id="{0}"><a href="{1}" target="_blank">{2}</a><a href="javascript:;"><img src="/images/del_pep.png"/></a></span>';
                            temp = temp.replace("{0}", data.acs[i].id);
                            temp = temp.replace("{1}", data.acs[i].id);
                            temp = temp.replace("{2}", data.acs[i].name);
                            if (!($('#divaclist span[id="' + data.acs[i].id + '"]') != null
                            && $('#divaclist span[id="' + data.acs[i].id + '"]').length >= 1)) {
                                $('#divaclist').append(temp);
                            }

                        });
                        $('#divaclist span').click(function () {
                            $(this).remove();
                            //savefrienddata();
                            saveactivitycategorylist();
                        });
                        saveactivitycategorylist();
                    }
                }
                }
            });
        });
        //计划拟定-现在拟定活动计划
        $("#ckactivityplan").change(function () {
            if ($(this).attr("checked")) {
                //                $(".richeng").fadeIn();
                $(".activity_mark").fadeIn();
                $("#tableactivityplan").fadeIn();
            }
            else {
                $(".richeng").fadeOut();
                $(".activity_mark").fadeOut();
                $("#tableactivityplan").fadeOut();
            }
            $.cookies.set("ckactivityplan", $("#ckactivityplan").attr("checked") !== false ? "on" : "off");
        });
        bindDropDownList("ddlactivityplandaylist", null, false).change(function () {
            if ($(this).children('option:selected').val() != "-1" && $(this).children('option:selected').val() != "-2") {
                $('#txtactivityplanstarttimer').attr("disabled", "");
            }
        });
        //计划拟定-时间
        //$('#txtactivityplanstarttimer').timepicker({});
                $('#txtactivityplanstarttimer').timepicker({
//                    hourGrid: 3,
//                    minuteGrid: 10,
                    onSelect: function (selectedDateTime) {
                        //                var starttimer = selectedDateTime.substring(0, selectedDateTime.indexOf(":"));
                        //                starttimer = parseInt(starttimer);
                        //alert("sss");
                        $('#txtactivityplanendtimer').attr("disabled", "");
                        if ($('#txtactivityplanendtimer').val() != '') {
                            if (_validplantimer(selectedDateTime, $("#txtactivityplanendtimer").val())) {
                                $('#txtactivityplanstarttimer').focus().val("");
                            }
                        }
                    }
                });
        
        $('#txtactivityplanendtimer').timepicker({
//        hourGrid: 3,
//        minuteGrid: 10,
        onSelect: function (selectedDateTime) {
        if (_validplantimer($("#txtactivityplanstarttimer").val(), selectedDateTime)) {
        $('#txtactivityplanendtimer').focus().val("");
        }
        }
        });
        
        //计划拟定-新增 btnactivityplan
        $("#btnactivityplan").click(function () {
            if ($(this).val() == "添加") {
                if ($("#txtactivityplantitle").val() != '') {
                    var trtemp = '<tr><td align="center">';
                    trtemp += $("#txtactivityplanid").val();
                    trtemp += '</td>';
                    trtemp += '<td>' + $("#txtactivityplantitle").val() + '</td>';
                    trtemp += '<td>' + $("#txtactivityplanmark").val() + '</td>';
                    if ($("#ddlactivityplandaylist").children('option:selected').val() != "-1"
                        && $("#ddlactivityplandaylist").children('option:selected').val() != "-2"
                        && $('#txtactivityplanstarttimer').val() != ''
                        && $('#txtactivityplanendtimer').val() != ''
                        && $("#txtactivityplantitle").val() != ''
                        && $("#txtactivityplanmark").val() != '') {
                        trtemp += '<td>' + $("#ddlactivityplandaylist").children('option:selected').val() + '(' + $("#txtactivityplanstarttimer").val() + '-' + $("#txtactivityplanendtimer").val() + ')</td>';
                        trtemp += '<td width="120"><p class="opera"><a href="javascript:void(0);" class="icon_Edit" title="编辑"></a> ';
                        trtemp += '<a href="javascript:void(0);" class="icon_Del" title="删除"></a></p></td></tr>';
                        $("#tableplanlist").append(trtemp);
                        savetableplanlist();
                        var i = parseInt($("#txtactivityplanid").val());
                        $("#txtactivityplanid").val(i + 1);
                        $(".activity_mark").fadeIn();
                    }
                    else {
                        new pop({ titleid: 'common_00021', typename: 'warning',
                            msginfo: wanerdaoLangTip('active_00007')
                        });
                    }

                }
                else {
                    new pop({ titleid: 'common_00021', typename: 'warning',
                        msginfo: wanerdaoLangTip('active_00006')
                    });
                }
                $("#tableplanlist tr").hover(function () {
                    $(this).addClass("active");
                }, function () {
                    $(this).removeClass("active");
                });
                $('#tableplanlist tr td:last-child p a').click(function () {
                    if ($(this).attr("title") == "删除") {
                        $(this).parent().parent().parent().remove();
                        savetableplanlist();
                    }
                    else {
                        $("#btnactivityplan").val("保存");
                        var p = $(this).parent().parent().parent();
                        var t = p.find("td:lt(3)");
                        $.each(t, function (i) {
                            if (i == 0) {
                                $("#txtactivityplanid").val($(t[i]).text());
                            }
                            if (i == 1) {
                                $("#txtactivityplantitle").val($(t[i]).text());
                            }
                            if (i == 2) {
                                $("#txtactivityplanmark").val($(t[i]).text());
                            }
                        });
                        $.data(document.body, "planedit", p);
                        //$("#txtactivitybudgetid").attr("disabled", "disabled");
                    }
                });
            }
            else {
                var p = $.data(document.body, "planedit");
                p.find("td:eq(1)").html($("#txtactivityplantitle").val());
                p.find("td:eq(2)").html($("#txtactivityplanmark").val());
                var i = parseInt($("#tableplanlist tr:last td:eq(0)").text());
                $("#txtactivityplanid").val(i + 1); //.attr("disabled", "");
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
        for (var i = 0; i <= sDate; i++) {
            var s = new Date(Date.parse(testStartDate.format('MM/dd/yyyy')) + 86400000 * i);
            if (s <= testEndDate) {
                items += '{"id":"' + s.format('MM/dd/yyyy') + '","value":"' + s.format('MM/dd/yyyy') + '"},';
            }
        }
        items = items.substring(0, items.length - 1);
        items += ']';
        items = $.parseJSON(items);
        bindDropDownList("ddlactivityplandaylist", items, true);
        $.cookies.set("activityplandaylist", $("#ddlactivityplandaylist").html());
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

        if ($.cookies.get("ckactivityplan") != null) {//计划拟定 
            $("#ckactivityplan").cookieBind();
            if ($("#ckactivityplan").attr("checked")) {
                $(".activity_mark").fadeIn();
                $("#tableactivityplan").fadeIn();
                if ($.cookies.get("activityplandaylist") != null) {//计划天数list
                    $('#ddlactivityplandaylist').empty().append($.cookies.get("activityplandaylist"));
                }
                if ($.cookies.get("activityplanlist") != null) {//计划拟定列表
                    $('#tableplanlist').empty().append($.cookies.get("activityplanlist"));
                }
            }
        }

    }
})(jQuery);
