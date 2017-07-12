<%@ Page Language="C#" AutoEventWireup="true" CodeFile="activityplacedemo.aspx.cs" Inherits="Scripts_Plugin_activitysight_activityplacedemo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <title>活动景点</title>
    <link rel='stylesheet' href="../../css/PluginCss/Area/boxy.css" type="text/css" />
    <script type="text/javascript" src="../../Scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="../../Scripts/OpenProjectPlugin/jquery.boxy.js"></script>
	<script type="text/javascript" src="../../Scripts/Plugin/ActivitySight/wanerdao2.acsight.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnarea").click(function () {
                Boxy.searchacsight({ title: "活动景点" }, function (data) {
                    //debugger;
                    $.each(data.sight, function (i, n) {
                        alert("你选择的是: " + data.sight[i].id + "|" + data.sight[i].name);
                    });

                });
                return false;
            });
        });
        
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <input type="button" id="btnarea" value="活动景点"/>
    </div>
    </form>
</body>
</html>
