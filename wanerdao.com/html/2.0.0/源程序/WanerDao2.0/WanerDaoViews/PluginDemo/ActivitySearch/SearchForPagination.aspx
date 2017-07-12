<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SearchForPagination.aspx.cs" Inherits="Activity_ActivitySearchDemo_SearchForPagination" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../css/PluginCss/Pagination/Pagination.css" />
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/Pagination/wanerdao2.pagination.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/SearchActivity/wanerdao2.searchactivity.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#btn_searchactivity").bind("click", searchactivity);
        })
        var reg = new RegExp(',', "g");
        var options = new Object({
            currPage: 1,
            callback: createpagedata,
            toolbar: [{ text: '全选', cls: 'checkbox', type: 'checkbox', handler: function () {
                alert("全选");
            }
            },
                { text: '提醒缴费', cls: '', type: 'button', handler: function () {
                    alert("提醒缴费");
                }
                }],
            ajax: {
                param: null
            }
        });
        function createoption() {
            var param = wanerdaosearchactivity.initparam(
                        {
                            pagecurrent: 1, //当前页
                            opertype: "searchactivitybymanycondition", //业务处理类别
                            pageSize: '3', //页码数
                            activityNames: $("#txt_activityNames").val().replace(reg, ':'), //活动名字串，用“:”分隔
                            catygoryNames: $("#txt_categoryNames").val().replace(reg, ':'), //分类名字串，用“:”分隔
                            friendsName: $("#txt_friendsName").val().replace(reg, ':'), //朋友名字串，用“:”分隔
                            groupNames: $("#txt_groupNames").val().replace(reg, ':'), //圈子名字串，用“:”分隔
                            sightNames: $("#txt_sightNames").val().replace(reg, ':'), //景点名字串，用“:”分隔
                            countryId: "", //国家
                            provinceId: "", //省份
                            cityId: ""//城市
                        });
            options.ajax.param = param;
        }
        //分页控件查询
        $(function () {
            createoption();
            $("#div_pagePaginationContentToolBar").myPagination(options);
        })
        function searchactivity() {
            createoption();
            $("#div_pagePaginationContentToolBar").myPagination(options);
        }
        //创建活动页面
        function createpagedata(data) {
            if (data.result == 'false') {
                $("#div_pagePaginationContent").html(data.msg);
                return;
            }
            $("#div_pagePaginationContent").html('');
            var pagecontent = $('<div></div>').appendTo("#div_pagePaginationContent");

            $.each(data.rows, function (i, msg) {
                var activitydiv = $('<div style="border:2px solid #6fc3df;"><div>').appendTo(pagecontent);
                $('<div>活动名字：' + msg.active_name + '</div>').appendTo(activitydiv);
                $('<div>活动景点：' + msg.sight_name + '</div>').appendTo(activitydiv);
                $('<div>活动地址：' + msg.address + '</div>').appendTo(activitydiv);
                $('<div>参加人数：' + msg.join_member_nbr + '</div>').appendTo(activitydiv);
                $('<div>初始费用：' + msg.prepay_nbr + '</div>').appendTo(activitydiv);
                $('<div>活动时间：' + msg.begin_datetime + '-' + msg.end_datetime + '</div>').appendTo(activitydiv);
                $('<div>报名时间：' + msg.report_datetime + '</div>').appendTo(activitydiv);
                $('<div>活动描述：' + msg.description + '</div>').appendTo(activitydiv);
            });
        }
        
    </script>
</head>
<body>
    <div style="width: 300px; border:2px solid #6fc3df;">
        <div>
            <input type="button" id="btn_searchactivity" name="" value="搜索活动" /></div>
        <div>
            <input type="text" id="txt_activityNames" name="" /></div><div>用“,”分隔,可多条件模糊查询</div>
        <div>
            <input type="text" id="txt_categoryNames" name="" /><input type="button" value="选择分类" /></div><div>用“,”分隔,可多条件模糊查询</div>
        <div>
            <input type="text" id="txt_friendsName" name="" /><input type="button" value="选择好友" /></div><div>用“,”分隔,可多条件模糊查询</div>
        <div>
            <input type="text" id="txt_groupNames" name="" /><input type="button" value="选择圈子" /></div><div>用“,”分隔,可多条件模糊查询</div>
        <div>
            <input type="text" id="txt_sightNames" name="" /><input type="button" value="选择景点" /></div><div>用“,”分隔,可多条件模糊查询</div>
        
    </div>
    <div id="div_pagePaginationContentToolBar"></div>
    <div id="div_pagePaginationContent"></div>
</body>
</html>
