<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SearchForJson.aspx.cs" Inherits="PluginDemo_ActivitySearch_SearchForJson" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="../../Scripts/jquery-1.4.2.min.js" type="text/javascript"></script>
    <script src="../../Scripts/common/wanerdaoutils.js" type="text/javascript"></script>
    <script src="../../Scripts/Plugin/SearchActivity/wanerdao2.searchactivity.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#btn_searchactivity").bind("click", searchactivity);
        })
        var reg = new RegExp(',', "g");
        function searchactivity() {
            wanerdaosearchactivity.searchactivity({
                success: createpagedata,
                param: {
                    pagecurrent: 1, //当前页  可以缺省默认1
                    pageSize: '10', //页码数 可以缺省默认10
                    opertype: "searchactivitybymanycondition", //业务处理类别                    
                    activityNames: $("#txt_activityNames").val().replace(reg, ':'), //活动名字串，用“:”分隔 可以缺省默认为空
                    catygoryNames: $("#txt_categoryNames").val().replace(reg, ':'), //分类名字串，用“:”分隔 可以缺省默认为空
                    friendsName: $("#txt_friendsName").val().replace(reg, ':'), //朋友名字串，用“:”分隔 可以缺省默认为空
                    groupNames: $("#txt_groupNames").val().replace(reg, ':'), //圈子名字串，用“:”分隔 可以缺省默认为空
                    sightNames: $("#txt_sightNames").val().replace(reg, ':'), //景点名字串，用“:”分隔 可以缺省默认为空
                    //注意，为什么要用“:” 分隔，是因为后台获取参数时的正则表达式只支持“:”分隔。
                    countryId: "", //国家 可以缺省默认为空
                    provinceId: "", //省份 可以缺省默认为空
                    cityId: ""//城市 可以缺省默认为空
                }
            });
        }
        //更改样式
        function createpagedata(data) {
            var pagecontent = $('<ul></ul>').appendTo("#div_pageContent");
            if (data.result == 'false') {
                $("#div_pageContent").html(data.msg);
                return;
            }
            $.each(data.rows, function (i, msg) {
                $('<li>' + msg.active_name + '' + msg.sight_name + '</li>').appendTo(pagecontent);
            });
        }

        
    </script>
</head>
<body>
    <div style="width: 300px;border:2px solid #6fc3df;">
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

    <div id="div_pageContent"></div>
    <hr/>
</body>
</html>

